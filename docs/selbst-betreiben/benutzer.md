---
sidebar_position: 4
title: Benutzer anlegen
description: Weitere Konten anlegen — mit und ohne eigenen Mailserver.
---

# Benutzer anlegen

Im Einzelbetrieb gibt es **keine Selbstregistrierung**. Konten legt die
Mitgliederverwaltung an. Das hat zwei Gründe: eine Registrierung würde jedes
Mal eine weitere Organisation anlegen, und sie setzt einen funktionierenden
Mailversand voraus — ohne den bliebe das neue Konto unbestätigt und damit
dauerhaft ausgesperrt.

## Ohne Mailserver (Normalfall)

**Mitglieder → Mitglied hinzufügen**. Geben Sie zu einer Adresse, für die es
noch kein Konto gibt, zusätzlich an:

- **Vorname** und **Nachname**
- ein **Startpasswort** (mind. 8 Zeichen, Groß-, Kleinbuchstabe, Ziffer)

Das Konto wird angelegt, gilt sofort als bestätigt und ist unmittelbar
anmeldebereit. Geben Sie das Startpasswort persönlich weiter; die Person kann
es danach unter **Einstellungen → Konto** selbst ändern.

Fehlt eines der drei Felder, meldet OpenEOS:

> Zu dieser E-Mail-Adresse gibt es noch kein Konto. Bitte Vorname, Nachname und
> ein Startpasswort angeben, um es anzulegen.

Existiert bereits ein Konto zu der Adresse, wird es der Organisation einfach
hinzugefügt — Name und Passwort werden dann ignoriert.

### Rolle und Berechtigungen

Beim Hinzufügen wählen Sie:

- **Administrator** — darf alles in der Organisation
- **Mitglied** — sieht nur die Module, die Sie einzeln freischalten
  (Produkte, Veranstaltungen, Geräte, Mitglieder, Schichtpläne, Rabatte,
  Pfand, Auswertungen, Inventur)

Für Helfer an der Kasse genügt in der Regel ein Mitglied ohne besondere
Berechtigungen — die Kasse selbst läuft ohnehin über ein
[gekoppeltes Gerät](/geraete), nicht über ein Benutzerkonto.

## Mit eigenem Mailserver

Ist ein Mailserver vorhanden, funktionieren zusätzlich Einladungen,
„Passwort vergessen" und die Anmeldung per zugesandtem Link. Ergänzen Sie die
`.env` und starten Sie den Server neu:

```bash
EMAIL_ENABLED=true
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=openeos@verein.example
EMAIL_PASSWORD=...
EMAIL_FROM=openeos@verein.example
EMAIL_FROM_NAME=OpenEOS Musikverein
```

Diese Werte gehören zusätzlich in den `environment:`-Block des Dienstes `api`
in der `docker-compose.yml`, sonst erreichen sie den Container nicht.

```bash
sudo docker compose up -d --force-recreate api
```

:::warning Vorsicht bei der Umstellung
Sobald `EMAIL_ENABLED=true` gesetzt ist, verschickt OpenEOS auch tatsächlich
Mails — an die hinterlegten Adressen. Wenn Sie bis dahin mit erfundenen
Adressen wie `admin@verein.local` gearbeitet haben, laufen diese Zustellungen
ins Leere. Das ist harmlos, aber die Funktion „Passwort vergessen" hilft
diesen Konten dann nicht weiter.
:::

## Wenn Sie sich ausgesperrt haben

Nach fünf Fehlversuchen sperrt OpenEOS ein Konto für 15 Minuten. Warten genügt.

Ist das Administrator-Passwort verloren und kein Mailversand eingerichtet,
hilft nur der direkte Weg über die Datenbank. Ein neues Passwort setzen Sie so
— der Hash wird dabei im Container erzeugt, das Klartextpasswort landet nicht
in der Datenbank:

```bash
# 1. Hash für das neue Passwort erzeugen
sudo docker compose exec api node -e \
  "console.log(require('bcrypt').hashSync('NeuesPasswort123', 12))"

# 2. Den ausgegebenen Hash eintragen
sudo docker compose exec postgres psql -U openeos -d openeos -c \
  "UPDATE users SET password_hash='<HASH>', failed_login_attempts=0,
   locked_until=NULL WHERE email='admin@verein.local';"
```

Ist ein Konto unbestätigt und kommt keine Mail an, genügt:

```bash
sudo docker compose exec postgres psql -U openeos -d openeos -c \
  "UPDATE users SET email_verified_at=now() WHERE email='...';"
```
