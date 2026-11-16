---
sidebar_position: 6
title: Betrieb
description: Sicherung, Aktualisierung und Fehlersuche im laufenden Betrieb.
---

# Betrieb

## Sicherung

Zwei Dinge sind unersetzlich: die **Datenbank** und die **hochgeladenen
Dateien**. Alles andere lässt sich neu erzeugen.

```bash
cd /opt/openeos
mkdir -p backups

# Datenbank
sudo docker compose exec -T postgres \
  pg_dump --clean --if-exists -U openeos openeos | gzip > backups/db-$(date +%F).sql.gz

# Dateien (Produkt- und Kategoriebilder, Profilbilder, mit Cloud-TSE die TSE-Exporte)
sudo docker run --rm \
  -v openeos_uploads:/from -v "$PWD/backups":/to alpine \
  tar czf /to/uploads-$(date +%F).tar.gz -C /from .
```

Sichere zusätzlich die Datei `.env` — ohne
`TWO_FACTOR_ENCRYPTION_KEY` sind hinterlegte Zwei-Faktor-Geheimnisse nach
einer Wiederherstellung wertlos. Ist kein eigener
`INTEGRATION_ENCRYPTION_KEY` gesetzt, gilt das auch für gespeicherte
SumUp-Zugangsdaten und die Webhook-Geheimnisse, und ohne eigenen
`PIN_PEPPER` für alle Kassen-PINs. Sind diese Schlüssel gesetzt, gehören sie
ebenso in die Sicherung, mit Cloud-TSE auch `TSE_ENCRYPTION_KEY`.

Täglich um 3 Uhr, mit Aufbewahrung von 14 Tagen:

```bash
sudo crontab -e
```

```cron
0 3 * * * cd /opt/openeos && docker compose exec -T postgres pg_dump --clean --if-exists -U openeos openeos | gzip > backups/db-$(date +\%F).sql.gz && find backups -name 'db-*.sql.gz' -mtime +14 -delete
```

:::warning[Eine Sicherung, die nie zurückgespielt wurde, ist keine]
Spiele die Sicherung einmal auf einem Testsystem ein, **bevor** du sie
brauchst. Ein Fest ist der falsche Moment, um festzustellen, dass die Datei
leer war.
:::

### Zurückspielen

```bash
sudo docker compose stop api web
gunzip -c backups/db-2026-09-25.sql.gz | \
  sudo docker compose exec -T postgres psql -U openeos -d openeos
sudo docker compose start api web
```

## Aktualisieren

```bash
cd /opt/openeos
sudo docker compose pull
sudo docker compose up -d
```

Datenbank-Migrationen laufen beim Start automatisch mit
(`DATABASE_MIGRATIONS_RUN=true`). **Sichere vorher die Datenbank** —
Migrationen lassen sich nicht ohne Weiteres rückgängig machen.

Nicht während einer laufenden Veranstaltung aktualisieren: Mit nur einer
Instanz verlieren die Kassen kurz die Verbindung.

### Ohne Unterbrechung aktualisieren (optional)

Mit einem Reverse-Proxy (siehe
[Installation](./installation.md#mit-eigener-domain-und-https)) kannst du auch
während eines Festes aktualisieren. Die neue Version startet dann neben der
alten und übernimmt erst, wenn sie bereit ist. Dafür:

1. Entferne beim Dienst `api` die festen `ports:` und setze
   `DATABASE_MIGRATIONS_RUN: 'false'`.
2. Ergänze einen `healthcheck` und `stop_grace_period: 30s` beim Dienst `api`
   sowie den einmaligen Dienst `migrate`, der die Migrationen vorab ausführt.
   Vorlagen für beides stehen in `docker-compose.prod.yml` im Repository der
   API:

   ```yaml
     migrate:
       image: ghcr.io/openeos-project/openeos-api:latest
       profiles: ['tools']
       restart: 'no'
       command: ['node', 'node_modules/typeorm/cli.js', 'migration:run', '-d', 'dist/src/config/data-source.js']
       environment:
         NODE_ENV: production
         DATABASE_HOST: postgres
         DATABASE_USER: openeos
         DATABASE_PASSWORD: ${DATABASE_PASSWORD:?DATABASE_PASSWORD fehlt}
         DATABASE_NAME: openeos
       depends_on:
         postgres: { condition: service_healthy }
   ```

3. Installiere das Docker-Plugin
   [docker-rollout](https://github.com/wowu/docker-rollout).
4. Aktualisiere so:

   ```bash
   sudo docker compose pull api
   sudo docker compose run --rm migrate
   sudo docker rollout api
   ```

Wird die neue Instanz nicht gesund, bleibt die alte aktiv. Die Migrationen von
OpenEOS sind so gebaut, dass die bisherige Version mit dem neuen Schema
weiterläuft. Details stehen in der README der API unter „Mehrere Instanzen“.

### Prüfen, ob gerade verkauft wird

Für eigene Update-Skripte gibt es einen Endpunkt, der meldet, ob eine aktive
Veranstaltung in den letzten 30 Minuten echte Bestellungen hatte. Setze dafür
beim Dienst `api` ein `DEPLOY_GUARD_TOKEN` (mindestens 32 Zeichen, z. B.
`openssl rand -hex 32`):

```bash
curl -H "Authorization: Bearer <DEPLOY_GUARD_TOKEN>" \
  http://localhost:3000/api/internal/deploy-guard
```

Steht in der Antwort `"busy":true`, warte mit dem Update. Ohne Token antwortet
der Endpunkt mit `404`.

## Fehlersuche

```bash
# Was sagen die Dienste?
sudo docker compose logs -f api
sudo docker compose ps

# Sind Datenbank und Redis erreichbar?
curl http://localhost:3000/api/health/ready
```

### Der Server startet nicht

| Meldung im Protokoll | Ursache |
|---|---|
| `JWT_SECRET is required` | Der Wert fehlt in der `.env`. |
| `TWO_FACTOR_ENCRYPTION_KEY … not set` | Ebenso; mind. 32 Zeichen. |
| Verbindungsfehler zu Redis | Redis läuft nicht. Ohne Redis startet der Server nicht. |
| `ECONNREFUSED … 5432` | PostgreSQL ist noch nicht bereit — meist löst ein erneuter Start das Problem. |

### Das Dashboard bleibt leer

Fast immer ist `API_URL` falsch: Sie muss die Adresse enthalten, unter der
**der Browser** den Server erreicht, nicht `localhost`.

```bash
# Was reicht der Webdienst an den Browser weiter?
curl -s http://192.168.1.50:3001/login | grep -o '__OPENEOS_RUNTIME_CONFIG__={[^<]*}'
```

Steht dort nicht deine Serveradresse, korrigiere `API_URL` in der `.env`
und starte neu:

```bash
sudo docker compose up -d --force-recreate web
```

Zweithäufigste Ursache: Die Adresse fehlt in `CORS_ORIGINS` des Servers. Im
Browser steht dann in der Entwicklerkonsole ein CORS-Fehler.

### Kassen und Displays aktualisieren sich nicht

Die dauerhafte Verbindung steht nicht. Hinter einem Reverse-Proxy fehlt meist
die feste Zuordnung (`sticky.cookie`, siehe
[Installation](./installation.md#mit-eigener-domain-und-https)). Bei eigener
Content-Security-Policy im Proxy muss `wss:` erlaubt sein — `https:` deckt es
**nicht** mit ab.

### OpenEOS verlangt Geld

```bash
curl http://localhost:3000/api/setup/status
```

Steht dort `"mode":"saas"`, greift `DEPLOYMENT_MODE=selfhosted` nicht. Die
Variable muss sowohl in der `.env` als auch im `environment:`-Block des
Dienstes `api` stehen.

## Höchstzahlen anpassen

Der gehostete Betrieb begrenzt, wie viele Organisationen ein Konto haben darf
(5) und wie viele Mitglieder eine Organisation hat (10, aktive Mitglieder plus
offene Einladungen). Im Einzelbetrieb gibt es ohnehin nur eine Organisation;
die Mitgliedergrenze gilt aber auch dort. Ausgenommen ist nur der
Administrator aus der Ersteinrichtung, wenn er selbst Konten anlegt oder
einlädt. Dazu kommt eine technische Grenze für
[Bedienungen](../bedienungen.md) (200 je Organisation). Die Werte setzt du in
der `.env` und im `environment:`-Block des API-Dienstes, `0` heißt
unbegrenzt:

```bash
ORGANIZATIONS_PER_USER_LIMIT=5
MEMBERS_PER_ORGANIZATION_LIMIT=0
WAITERS_PER_ORGANIZATION_LIMIT=200
```

Danach den API-Dienst neu starten
(`sudo docker compose up -d --force-recreate api`).

## Notfallnummer für dein Team

Mit `OPERATOR_EMERGENCY_PHONE` beim Dienst `api` hinterlegst du eine
Rufnummer für kritische Störungen, zum Beispiel die deiner Technik. Sie
erscheint, solange eine Veranstaltung geplant ist oder läuft, im Dashboard,
bei den Veranstaltungen und an der Kasse im Menü unter **Notfall-Support**.
Leer gelassen erscheint sie nirgends.

## Aufbewahrung und Löschung

Die nächtliche automatische Löschung personenbezogener Daten (Gästedaten,
Schichtanmeldungen, Bedienungen, abgelaufene Anmeldelinks) ist im
Einzelbetrieb **aus** — hier entscheidest du als Betreiber. Zum Einschalten
setzt du beim Dienst `api` `RETENTION_ENABLED: 'true'`; ohne
`RETENTION_DRY_RUN: 'false'` zählt der Lauf nur und löscht nichts. Fristen
und alle Variablen stehen in der README der API unter „Aufbewahrung und
Löschung“.

## Datensparsamkeit

Eine selbst betriebene Installation sendet **nichts** nach außen. Optionale
Anbindungen bleiben aus, solange du keine Zugangsdaten hinterlegst:
Fehlerberichte (Sentry), Kartenzahlung (SumUp), der Mailversand, der
[Assistent](./assistent.md) und die Cloud-TSE. Webhooks schicken nur dann
Daten hinaus, wenn ein Admin unter **Einstellungen → Organisation →
Webhooks** einen Empfänger anlegt. Standardmäßig nehmen sie nur öffentliche
`https://`-Adressen an; einen Empfänger im eigenen Netz erlaubst du beim
Dienst `api` mit `WEBHOOKS_ALLOW_PRIVATE_NETWORKS: 'true'` (und für
`http://` mit `WEBHOOKS_ALLOW_HTTP: 'true'`).

Eine Ausnahme, die man kennen sollte: Versendete E-Mails binden das
OpenEOS-Logo von `openeos.de` ein. Das lädt der Browser des **Empfängers**,
nicht dein Server — es betrifft also nur eingeschaltete Mailbenachrichtigungen.

## Hilfe

Der Support-Chat gehört zum gehosteten Angebot und ist hier nicht verfügbar.
Für selbst betriebene Installationen:

- **Fehler und Fragen**: [GitHub Issues](https://github.com/OpenEOS-Project)
- **Handbuch**: die übrigen Kapitel gelten unverändert
