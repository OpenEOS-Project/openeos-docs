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

1. Öffnen Sie **Mitglieder** und klicken Sie auf **Mitglied hinzufügen**.
2. Wechseln Sie im Dialog auf den Reiter **Konto direkt anlegen**.
3. Geben Sie **Vorname**, **Nachname** und **E-Mail-Adresse** ein.
4. Legen Sie ein **Startpasswort** fest und wiederholen Sie es unter
   **Startpasswort bestätigen**. Es gelten dieselben Regeln wie bei der
   Registrierung: mindestens 8 Zeichen, Groß- und Kleinbuchstaben sowie eine
   Zahl.
5. Wählen Sie Rolle und Berechtigungen (siehe unten) und klicken Sie auf
   **Konto anlegen**.

Das Konto gilt sofort als bestätigt und ist unmittelbar anmeldebereit; eine
E-Mail wird nicht verschickt. Geben Sie das Startpasswort persönlich weiter.
Die Person kann es nach der Anmeldung unter **Einstellungen → Konto** selbst
ändern — erzwungen wird das nicht.

Konten direkt anlegen können nur **Administratoren**. Mitglieder mit der
Berechtigung „Mitglieder“ sehen den Reiter nicht, können nur einladen und
dabei weder die Administrator-Rolle noch Berechtigungen vergeben, die sie
selbst nicht haben.

Gibt es zu der Adresse bereits ein Konto, legt OpenEOS kein zweites an und
meldet:

> Zu dieser E-Mail-Adresse gibt es bereits ein Konto. Sie können es ohne
> Startpasswort hinzufügen – das bisherige Passwort bleibt gültig.

Klicken Sie dann auf **Vorhandenes Konto hinzufügen**. Das Konto wird mit der
gewählten Rolle und den Berechtigungen in die Organisation aufgenommen; Name
und Startpasswort aus dem Formular werden dabei nicht übernommen.

:::note[Einladen ohne Mailserver]
Der Reiter **Einladen** verschickt eine E-Mail mit einem Link, über den die
Einladung angenommen wird. Ohne Mailversand kommt dieser Link nicht an —
nutzen Sie dann **Konto direkt anlegen**.
:::

### Rolle und Berechtigungen

In beiden Reitern wählen Sie:

- den Schalter **Administrator** — darf alles in der Organisation
- ohne den Schalter ein **Mitglied** — sieht nur die Module, die Sie unter
  **Berechtigungen** einzeln freischalten
  (Produkte, Veranstaltungen, Geräte, Mitglieder, Schichtpläne, Rabatt-Bons,
  Pfand, Auswertung, Inventur)

Für Helfer an der Kasse genügt in der Regel ein Mitglied ohne besondere
Berechtigungen — die Kasse selbst läuft ohnehin über ein
[gekoppeltes Gerät](/geraete), nicht über ein Benutzerkonto.

## Mit eigenem Mailserver

Ist ein Mailserver vorhanden, funktionieren zusätzlich Einladungen per
E-Mail (Reiter **Einladen** im Dialog **Mitglied hinzufügen**),
„Passwort vergessen“ und die Anmeldung per zugesandtem Link. Ergänzen Sie die
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

:::warning[Vorsicht bei der Umstellung]
Sobald `EMAIL_ENABLED=true` gesetzt ist, verschickt OpenEOS auch tatsächlich
Mails — an die hinterlegten Adressen. Wenn Sie bis dahin mit erfundenen
Adressen wie `admin@verein.local` gearbeitet haben, laufen diese Zustellungen
ins Leere. Das ist harmlos, aber die Funktion „Passwort vergessen“ hilft
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
