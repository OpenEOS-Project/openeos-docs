---
sidebar_position: 2
title: Installation
description: Server, Datenbank und Dashboard mit Docker Compose einrichten.
---

# Installation

Diese Anleitung richtet einen vollständigen OpenEOS-Server ein. Alle Befehle
laufen auf dem Server, auf dem OpenEOS später arbeitet.

## 1. Verzeichnis und Zugangsdaten

```bash
sudo mkdir -p /opt/openeos && cd /opt/openeos
```

Drei Geheimnisse werden gebraucht. Erzeuge sie **jetzt** und bewahre
sie auf — insbesondere `TWO_FACTOR_ENCRYPTION_KEY`: Geht er verloren, sind
hinterlegte Zwei-Faktor-Geheimnisse nicht mehr entschlüsselbar, und ohne
eigenen `INTEGRATION_ENCRYPTION_KEY` (siehe unten) auch gespeicherte
Zugangsdaten für SumUp und PayPal und die Geheimnisse der Webhooks — die
müssten dann neu eingetragen werden.

Optional kannst du für diese Zugangsdaten einen eigenen Schlüssel
`INTEGRATION_ENCRYPTION_KEY` setzen (erzeugen mit `openssl rand -base64 32`).
Ohne ihn verschlüsselt der Server sie mit `TWO_FACTOR_ENCRYPTION_KEY`. Sichere
ihn wie die anderen Geheimnisse und ändere ihn nach dem ersten Start nicht
mehr.

Empfohlen ist außerdem `PIN_PEPPER` für die Kassen-PINs von Mitgliedern und
[Bedienungen](../bedienungen.md) (mindestens 16 Zeichen, erzeugen mit
`openssl rand -base64 32`). Ohne ihn leitet der Server den Wert aus
`TWO_FACTOR_ENCRYPTION_KEY` ab und warnt beim Start. Setze ihn, bevor die
erste PIN vergeben wird: Ein späterer Wechsel macht alle PINs ungültig.

```bash
umask 077
cat > .env <<EOF
# Betriebsart — das ist der entscheidende Schalter
DEPLOYMENT_MODE=selfhosted

# Adressen, unter denen Dashboard und Server erreichbar sind.
# Im lokalen Netz die IP des Servers eintragen, sonst den Domainnamen.
APP_URL=http://192.168.1.50:3001
API_URL=http://192.168.1.50:3000

# Zugangsdaten
DATABASE_PASSWORD=$(openssl rand -base64 24 | tr -d '/+=')
JWT_SECRET=$(openssl rand -base64 64 | tr -d '\n')
TWO_FACTOR_ENCRYPTION_KEY=$(openssl rand -base64 32 | tr -d '\n')
# Optional: eigener Schlüssel für SumUp-/PayPal-Zugangsdaten und Webhooks
INTEGRATION_ENCRYPTION_KEY=$(openssl rand -base64 32 | tr -d '\n')
# Empfohlen: Pepper für die Kassen-PINs (vor der ersten PIN setzen)
PIN_PEPPER=$(openssl rand -base64 32 | tr -d '\n')
# Optional: eigener Einrichtungscode für die Ersteinrichtung
# (ohne ihn steht ein Code im Protokoll der API)
SETUP_TOKEN=
EOF
```

Prüfe die Datei und **trage deine eigenen Adressen ein**:

```bash
cat .env
```

:::warning[Die Adressen müssen stimmen]
`API_URL` ist die Adresse, unter der **der Browser der Kassen** den Server
erreicht — nicht `localhost`. Steht dort `localhost`, funktioniert das
Dashboard nur auf dem Server selbst, und jede Kasse im Netz bleibt leer.
:::

## 2. Die Dienste beschreiben

```bash
cat > docker-compose.yml <<'EOF'
services:
  postgres:
    image: postgres:16-alpine
    restart: unless-stopped
    environment:
      POSTGRES_USER: openeos
      POSTGRES_PASSWORD: ${DATABASE_PASSWORD:?DATABASE_PASSWORD fehlt}
      POSTGRES_DB: openeos
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U openeos -d openeos']
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    restart: unless-stopped
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    healthcheck:
      test: ['CMD', 'redis-cli', 'ping']
      interval: 10s
      timeout: 5s
      retries: 5

  api:
    image: ghcr.io/openeos-project/openeos-api:latest
    restart: unless-stopped
    ports:
      - '3000:3000'
    environment:
      NODE_ENV: production
      DEPLOYMENT_MODE: selfhosted
      PORT: 3000
      APP_URL: ${APP_URL}
      DATABASE_HOST: postgres
      DATABASE_USER: openeos
      DATABASE_PASSWORD: ${DATABASE_PASSWORD:?DATABASE_PASSWORD fehlt}
      DATABASE_NAME: openeos
      # Migrationen laufen bei jedem Start automatisch mit
      DATABASE_MIGRATIONS_RUN: 'true'
      REDIS_HOST: redis
      JWT_SECRET: ${JWT_SECRET:?JWT_SECRET fehlt}
      TWO_FACTOR_ENCRYPTION_KEY: ${TWO_FACTOR_ENCRYPTION_KEY:?TWO_FACTOR_ENCRYPTION_KEY fehlt}
      # Optional; leer = TWO_FACTOR_ENCRYPTION_KEY verschlüsselt auch SumUp/PayPal
      INTEGRATION_ENCRYPTION_KEY: ${INTEGRATION_ENCRYPTION_KEY:-}
      # Leer = aus TWO_FACTOR_ENCRYPTION_KEY abgeleitet; Wechsel macht alle PINs ungültig
      PIN_PEPPER: ${PIN_PEPPER:-}
      # Leer = Code im Protokoll der API (Ersteinrichtung)
      SETUP_TOKEN: ${SETUP_TOKEN:-}
      # Das Dashboard muss den Server aufrufen dürfen
      CORS_ORIGINS: ${APP_URL}
      EMAIL_ENABLED: 'false'
    volumes:
      - uploads:/app/uploads
    depends_on:
      postgres: { condition: service_healthy }
      redis: { condition: service_healthy }

  web:
    image: ghcr.io/openeos-project/openeos-web:latest
    restart: unless-stopped
    ports:
      - '3001:3000'
    environment:
      NODE_ENV: production
      # Wird zur Laufzeit gelesen — das Abbild muss nicht neu gebaut werden
      API_URL: ${API_URL}
    depends_on:
      - api

volumes:
  postgres_data:
  redis_data:
  uploads:
EOF
```

## 3. Starten

```bash
sudo docker compose pull
sudo docker compose up -d
```

Der erste Start legt das Datenbankschema an. Das dauert einige Sekunden.

## 4. Prüfen, ob es läuft

```bash
curl http://localhost:3000/api/health
```

Erwartete Antwort:

```json
{"data":{"status":"ok","timestamp":"…","uptime":12.3,"version":"…"}}
```

Ob Datenbank und Redis wirklich erreichbar sind, verrät der ausführlichere
Endpunkt:

```bash
curl http://localhost:3000/api/health/ready
```

Und die Betriebsart:

```bash
curl http://localhost:3000/api/setup/status
```

```json
{"data":{"required":true,"reason":"Keine Benutzer vorhanden…",
 "deployment":{"mode":"selfhosted","billingEnabled":false,"multiTenant":false,"limits":{…}}}}
```

Steht dort `"mode":"saas"`, wurde `DEPLOYMENT_MODE` nicht übernommen — dann
verlangt OpenEOS später Geld für die Freischaltung. Prüfe die `.env` und
starte mit `sudo docker compose up -d --force-recreate api` neu.

Weiter mit der [Ersteinrichtung](./ersteinrichtung.md).

## Mit eigener Domain und HTTPS

Für den Betrieb über das Internet gehört ein Reverse-Proxy davor, der die
Verschlüsselung übernimmt. Mit [Traefik](https://traefik.io) sieht das so aus —
die Ports `3000:3000` und `3001:3000` entfallen dann:

```yaml
  api:
    # ports: entfernen
    networks: [frontend, default]
    labels:
      - 'traefik.enable=true'
      - 'traefik.http.routers.openeos-api.rule=Host(`api.verein.example`)'
      - 'traefik.http.routers.openeos-api.entrypoints=websecure'
      - 'traefik.http.routers.openeos-api.tls.certresolver=letsencrypt'
      - 'traefik.http.services.openeos-api.loadbalancer.server.port=3000'
      # Ohne feste Zuordnung brechen die WebSocket-Verbindungen der Kassen ab
      - 'traefik.http.services.openeos-api.loadbalancer.sticky.cookie=true'
      - 'traefik.http.services.openeos-api.loadbalancer.sticky.cookie.name=io'
      - 'traefik.http.services.openeos-api.loadbalancer.sticky.cookie.secure=true'

  web:
    # ports: entfernen
    networks: [frontend, default]
    labels:
      - 'traefik.enable=true'
      - 'traefik.http.routers.openeos-web.rule=Host(`kasse.verein.example`)'
      - 'traefik.http.routers.openeos-web.entrypoints=websecure'
      - 'traefik.http.routers.openeos-web.tls.certresolver=letsencrypt'
      - 'traefik.http.services.openeos-web.loadbalancer.server.port=3000'

networks:
  frontend:
    external: true
```

`APP_URL` und `API_URL` in der `.env` dann auf die `https://`-Adressen setzen.

:::info[Warum die feste Zuordnung?]
Kassen, Displays und Drucker hängen an einer dauerhaften WebSocket-Verbindung.
Ohne `sticky.cookie` verteilt der Proxy die Anfragen und die Verbindung
scheitert — sichtbar wird das erst im Betrieb, wenn Bestellungen nicht mehr
auf den Displays ankommen.
:::

## Online-Shop (optional)

```yaml
  shop:
    image: ghcr.io/openeos-project/openeos-shop:latest
    restart: unless-stopped
    ports:
      - '3004:3004'
    environment:
      NODE_ENV: production
      # Achtung: hier MIT /api am Ende
      API_URL: ${API_URL}/api
```

Zusätzlich muss die Shop-Adresse in `CORS_ORIGINS` des Servers stehen, mehrere
durch Komma getrennt:

```bash
CORS_ORIGINS: ${APP_URL},http://192.168.1.50:3004
```

Damit die Shop-Links im Dashboard auf deinen Shop zeigen und nicht auf
`shop.openeos.de`, setzt du beim Dienst `web` die Shop-Adresse:

```yaml
  web:
    environment:
      # … bestehende Variablen …
      SHOP_URL: http://192.168.1.50:3004
```

Bezahlen Gäste im Shop online mit SumUp, braucht der Dienst `api` zusätzlich
die Rücksprungadresse des Shops und seine eigene öffentliche Adresse (ohne
`/api`). Ohne sie schickt SumUp den Gast nach dem Bezahlen und die
Zahlungsbestätigung an openeos.de statt an deinen Server. Die API-Adresse
muss dafür aus dem Internet erreichbar sein:

```yaml
  api:
    environment:
      # … bestehende Variablen …
      SHOP_RETURN_URL_BASE: https://shop.verein.example
      API_PUBLIC_URL: https://api.verein.example
      # Ziel der QR-Codes der API (<basis>/scan/<code>)
      ONLINE_ORDER_BASE_URL: https://shop.verein.example
```

Alle drei stehen ohne eigenen Wert auf den gehosteten Adressen von openeos.de (`shop.openeos.de`, `api.openeos.de`, `order.openeos.de`); kommentiert stehen sie auch in `.env.example` und `docker-compose.prod.yml` der API.

:::note[Erst mit Impressum und Datenschutzhinweis]
Der Shop und die Bestellung per QR-Code am Tisch nehmen erst Bestellungen an,
wenn deine Organisation ein Impressum und einen Datenschutzhinweis hinterlegt
hat (**Einstellungen → Organisation → Rechtliche Angaben**). Das gilt auch im
Einzelbetrieb und auch im Testmodus, siehe
[Shop und QR-Bestellung](../veranstaltungen.md#shop-rechtliches).
:::
