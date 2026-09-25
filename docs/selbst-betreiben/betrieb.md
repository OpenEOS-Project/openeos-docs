---
sidebar_position: 6
title: Betrieb
description: Sicherung, Aktualisierung und Fehlersuche im laufenden Betrieb.
---

# Betrieb

## Sicherung

Zwei Dinge sind unersetzlich: die **Datenbank** und die **hochgeladenen
Bilder**. Alles andere lässt sich neu erzeugen.

```bash
cd /opt/openeos
mkdir -p backups

# Datenbank
sudo docker compose exec -T postgres \
  pg_dump -U openeos openeos | gzip > backups/db-$(date +%F).sql.gz

# Bilder (Produkt- und Kategoriebilder, Profilbilder)
sudo docker run --rm \
  -v openeos_uploads:/from -v "$PWD/backups":/to alpine \
  tar czf /to/uploads-$(date +%F).tar.gz -C /from .
```

Sichern Sie zusätzlich die Datei `.env` — ohne
`TWO_FACTOR_ENCRYPTION_KEY` sind hinterlegte Zwei-Faktor-Geheimnisse nach
einer Wiederherstellung wertlos.

Täglich um 3 Uhr, mit Aufbewahrung von 14 Tagen:

```bash
sudo crontab -e
```

```cron
0 3 * * * cd /opt/openeos && docker compose exec -T postgres pg_dump -U openeos openeos | gzip > backups/db-$(date +\%F).sql.gz && find backups -name 'db-*.sql.gz' -mtime +14 -delete
```

:::warning Eine Sicherung, die nie zurückgespielt wurde, ist keine
Spielen Sie die Sicherung einmal auf einem Testsystem ein, **bevor** Sie sie
brauchen. Ein Fest ist der falsche Moment, um festzustellen, dass die Datei
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
(`DATABASE_MIGRATIONS_RUN=true`). **Sichern Sie vorher die Datenbank** —
Migrationen lassen sich nicht ohne Weiteres rückgängig machen.

Nicht während einer laufenden Veranstaltung aktualisieren: Kassen verlieren
kurz die Verbindung.

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

Steht dort nicht Ihre Serveradresse, korrigieren Sie `API_URL` in der `.env`
und starten Sie neu:

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

## Datensparsamkeit

Eine selbst betriebene Installation sendet **nichts** nach außen. Optionale
Anbindungen bleiben aus, solange Sie keine Zugangsdaten hinterlegen:
Fehlerberichte (Sentry), Kartenzahlung (SumUp, PayPal) und der Mailversand.

Eine Ausnahme, die man kennen sollte: Versendete E-Mails binden das
OpenEOS-Logo von `openeos.de` ein. Das lädt der Browser des **Empfängers**,
nicht Ihr Server — es betrifft also nur eingeschaltete Mailbenachrichtigungen.

## Hilfe

Der Support-Chat gehört zum gehosteten Angebot und ist hier nicht verfügbar.
Für selbst betriebene Installationen:

- **Fehler und Fragen**: [GitHub Issues](https://github.com/OpenEOS-Project)
- **Handbuch**: die übrigen Kapitel gelten unverändert
