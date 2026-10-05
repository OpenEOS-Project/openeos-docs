---
sidebar_position: 3
title: Ersteinrichtung
description: Administrator und Organisation anlegen und die erste Veranstaltung freigeben.
---

# Ersteinrichtung

Nach dem ersten Start ist die Installation leer. Der Einrichtungsassistent legt
in einem Schritt den Administrator und die Organisation an.

## Den Assistenten aufrufen

Öffnen Sie das Dashboard im Browser — bei der Beispielkonfiguration aus der
[Installation](./installation.md) also `http://192.168.1.50:3001`. Sie landen
automatisch auf der Einrichtungsseite.

Der Assistent zeigt im Einzelbetrieb direkt das Formular **Einzelbetrieb**;
eine Auswahl zwischen Betriebsarten gibt es nicht, weil es hier nur eine gibt.

Tragen Sie ein:

- **Vorname, Nachname, E-Mail-Adresse** des Administrators
- **Passwort** — mindestens 8 Zeichen, mit Groß-, Kleinbuchstabe und Ziffer
- **Name der Organisation** — Ihr Verein, z. B. „Musikverein Testdorf“

Ein Klick auf **Einrichtung abschließen**, und das Konto steht.

:::info[Die E-Mail-Adresse muss nicht existieren]
Dieses erste Konto gilt sofort als bestätigt — es wird keine Mail versendet und
keine erwartet. Eine Adresse wie `admin@verein.local` ist in Ordnung, solange
Sie sie sich merken: Sie ist Ihr Anmeldename.
:::

## Anmelden

Danach werden Sie zur Anmeldung geleitet. Im Einzelbetrieb zeigt die Maske
direkt die Passwort-Anmeldung, weil der Weg über einen zugesandten Link einen
Mailserver voraussetzt.

## Was dieses Konto darf

Der so angelegte Administrator verwaltet die Installation **vollständig**: die
Organisation, alle Veranstaltungen, Geräte, Drucker, Mitglieder — und
zusätzlich die technischen Bereiche (Geräteliste aufräumen, Drucker zuordnen,
gesperrte Benutzer entsperren, Protokoll einsehen).

Es gibt bewusst **keine zweite Ebene darüber**. In der gehosteten Variante
existiert eine Betreiberrolle über den Kunden; im Einzelbetrieb wären Sie das
selbst, also fällt die Trennung weg.

## Die erste Veranstaltung

Legen Sie unter **Veranstaltungen** eine Veranstaltung an und klicken Sie auf
**Aktivieren**. Sie ist sofort aktiv — ohne Freischaltung, ohne Kosten, ohne
Obergrenze für Bestellungen.

Den **Testmodus** gibt es weiterhin, aber er hat hier eine andere Bedeutung:
Er ist keine begrenzte Kostprobe, sondern ein Probelauf. Beim Aktivieren werden
die im Testmodus erfassten Bestellungen gelöscht — so üben Sie mit dem Team,
ohne dass Übungsbuchungen in der Auswertung landen.

:::warning[Verlangt OpenEOS Geld?]
Erscheint beim Aktivieren ein Kauf-Dialog oder die Meldung *„Veranstaltung ist
noch nicht freigeschaltet“*, läuft die Installation nicht im Einzelbetrieb.
Prüfen Sie:

```bash
curl http://localhost:3000/api/setup/status
```

Dort muss `"mode":"selfhosted"` stehen. Sonst fehlt `DEPLOYMENT_MODE` — siehe
[Installation, Schritt 4](./installation.md#4-prüfen-ob-es-läuft).
:::

## Weiter

- [Benutzer anlegen](./benutzer.md) — Team aufnehmen
- Alles Weitere — Produkte, Kassen, Displays — steht im
  [Handbuch](/) und gilt unverändert.
