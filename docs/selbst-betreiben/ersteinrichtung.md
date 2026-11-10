---
sidebar_position: 3
title: Ersteinrichtung
description: Administrator und Organisation anlegen und die erste Veranstaltung freigeben.
---

# Ersteinrichtung

Nach dem ersten Start ist die Installation leer. Der Einrichtungsassistent legt
in einem Schritt den Administrator und die Organisation an.

## Den Assistenten aufrufen

Öffne das Dashboard im Browser — bei der Beispielkonfiguration aus der
[Installation](./installation.md) also `http://192.168.1.50:3001`. Du landest
automatisch auf der Einrichtungsseite.

Der Assistent zeigt im Einzelbetrieb direkt das Formular **Einzelbetrieb**;
eine Auswahl zwischen Betriebsarten gibt es nicht, weil es hier nur eine gibt.

Trage ein:

- **Vorname, Nachname, E-Mail-Adresse** des Administrators
- **Passwort** — mindestens 8 Zeichen, mit Groß-, Kleinbuchstabe und Ziffer —
  und dasselbe noch einmal unter **Passwort bestätigen**
- **Name der Organisation** — dein Verein, z. B. „Musikverein Testdorf“

Ein Klick auf **Einrichtung abschließen**, und das Konto steht.

:::info[Die E-Mail-Adresse muss nicht existieren]
Dieses erste Konto gilt sofort als bestätigt — es wird keine Mail versendet und
keine erwartet. Eine Adresse wie `admin@verein.local` ist in Ordnung, solange
du sie dir merkst: Sie ist dein Anmeldename.
:::

## Anmelden

Danach wirst du zur Anmeldung geleitet. Im Einzelbetrieb zeigt die Maske
direkt die Passwort-Anmeldung, weil der Weg über einen zugesandten Link einen
Mailserver voraussetzt.

## Was dieses Konto darf

Der so angelegte Administrator verwaltet die Installation **vollständig**: die
Organisation, alle Veranstaltungen, Geräte, Drucker, Mitglieder — und
zusätzlich die technischen Bereiche (Geräteliste aufräumen, Drucker zuordnen,
gesperrte Benutzer entsperren, Protokoll einsehen).

Es gibt bewusst **keine zweite Ebene darüber**. In der gehosteten Variante
existiert eine Betreiberrolle über den Kunden; im Einzelbetrieb wärst du das
selbst, also fällt die Trennung weg.

Die technischen Seiten stehen deshalb nicht in der Seitenleiste. Die
Benutzerliste mit **Entsperren** öffnest du direkt über die Adresse
`/users`, also z. B. `http://192.168.1.50:3001/users`.

## Land und Betriebsart

Die Organisation startet als **Alle Funktionen (Bestand)**: mit Bargeld,
Karte und Online-Zahlung. Im Dashboard bittet OpenEOS dich, das Land deiner
Organisation festzulegen:

1. Wähle im Hinweis **Land deiner Organisation** dein Land.
2. Klicke auf **Land festlegen** und bestätige mit **Festlegen**.

Das Land legst du nur einmal fest. Die Betriebsart wählst du unter
**Einstellungen → Organisation → Betriebsart**. Als Betreiber der eigenen
Installation verantwortest du selbst, ob deine Kasse in Deutschland Bargeld
ohne TSE erfassen darf. Wechselst du in Deutschland zu **Nur Bons** oder
**Bargeldlos**, kommst du ohne eingerichtete Cloud-TSE nicht mehr zu **Alle
Funktionen** zurück. Mehr unter [Betriebsarten](../betriebsarten.md#selbst-betreiben).

## Die erste Veranstaltung

Lege unter **Veranstaltungen** eine Veranstaltung an und klicke auf
**Aktivieren**. Eine Freischaltung brauchst du nicht — keine Kosten, keine
Obergrenze für Bestellungen.

Hat die Veranstaltung ein Datum, gelten wie im gehosteten Angebot die
[Phasen](../veranstaltungen.md#phasen): Bis 12 Stunden vor dem ersten
Veranstaltungstag ist sie **Geplant** und die Kasse bucht Testbestellungen,
hier ohne Obergrenze. Danach wird echt verkauft, und 6 Stunden nach dem
letzten Veranstaltungstag ist sie **Beendet**. Willst du länger verkaufen,
verlängere einfach das Ende. Die Zeiten stellst du mit `EVENT_EARLY_START_HOURS`
und `EVENT_GRACE_HOURS` im `environment:`-Block des Dienstes `api` ein; mit
`EVENT_DATE_PHASES=false` ist eine aktive Veranstaltung sofort und ohne Ende
echt aktiv.

Den **Testmodus** gibt es weiterhin, aber er hat hier eine andere Bedeutung:
Er ist keine begrenzte Kostprobe, sondern ein Probelauf. Beim Aktivieren und
noch einmal zum Verkaufsstart werden die Testbestellungen gelöscht — so übst
du mit dem Team, ohne dass Übungsbuchungen in der Auswertung landen.

:::warning[Verlangt OpenEOS Geld?]
Erscheint beim Aktivieren ein Kauf-Dialog oder die Meldung *„Die
Veranstaltung ist noch nicht freigeschaltet. Bitte bestelle zuerst die
Freischaltung.“*, läuft die Installation nicht im Einzelbetrieb.
Prüfe:

```bash
curl http://localhost:3000/api/setup/status
```

Dort muss `"mode":"selfhosted"` stehen. Sonst fehlt `DEPLOYMENT_MODE` — siehe
[Installation, Schritt 4](./installation.md#4-prüfen-ob-es-läuft).
:::

## Weiter

- [Benutzer anlegen](./benutzer.md) — Team aufnehmen
- Alles Weitere — Produkte, Kassen, Displays — steht im
  [Handbuch](../intro.md) und gilt unverändert.
