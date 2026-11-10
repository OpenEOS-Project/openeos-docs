---
sidebar_position: 18
title: Einstellungen
description: Persönliche Einstellungen und Organisationseinstellungen verwalten.
---

# Einstellungen

Unter **Einstellungen** verwaltest du deine persönlichen Daten sowie die Einstellungen deiner Organisation. Du erreichst sie über das Menü unter deinem Namen unten links in der Seitenleiste. Der Bereich ist in zwei Reiter gegliedert: **Persönlich** und **Organisation**.

![Einstellungen – Profil](/img/screens/de/settings.png)

## Persönlich

Der Reiter **Persönlich** ist in mehrere Unterbereiche gegliedert:

- **Profil** – Profilbild, Vorname und Nachname pflegen. Die E-Mail-Adresse steht hier nur zur Ansicht.
- **Konto** – E-Mail-Adresse und Passwort ändern, [Neuigkeiten per E-Mail](./daten-und-loeschung.md#newsletter) an- oder abbestellen und das [Konto löschen](./daten-und-loeschung.md#konto-loeschen).
- **Sicherheit** – Zwei-Faktor-Authentifizierung und angemeldete Sitzungen verwalten.
- **Einstellungen** – **Erscheinungsbild** (Hell, Dunkel oder wie das System), **Sprache**, Benachrichtigungen und der **Rundgang** durch die Oberfläche zum erneuten Ansehen.

Änderungen übernimmst du jeweils über **Änderungen speichern**.

### Sicherheit

Im Unterbereich **Sicherheit** richtest du die Zwei-Faktor-Authentifizierung ein und behältst die Sitzungen deines Kontos im Blick. Dein Passwort änderst du unter **Konto**.

![Einstellungen – Sicherheit](/img/screens/de/settings-security.png)

## Organisation

Im Reiter **Organisation** verwaltest du die Stammdaten deiner Organisation. Dazu gehören unter anderem die Unterreiter **Allgemein**, **Kontakt**, **Betriebsart**, **Assistent** und **Benachrichtigungen**.

### Allgemein

Grundlegende Informationen deiner Organisation:

- **Logo** – wird auf der öffentlichen [Helferplan-Seite](./schichtplaene.md) und im Shop angezeigt (PNG, JPG oder WEBP, max. 5 MB).
- **Name** – erscheint auf Rechnungen und Bons.
- **Beschreibung** – optionaler Zusatztext.
- **Keine Umsatzsteuer** – für Vereine und Kleinunternehmer nach § 19 UStG. Ist die Option an, tragen alle Produkte 0 % und es gibt keine Steuersatz-Auswahl.
- **Organisation löschen** – nur für Administratoren. Danach ist die Organisation 30 Tage nur lesend nutzbar, damit du alle Daten exportieren kannst; dann wird sie endgültig gelöscht. Vorher kommen E-Mails (Ankündigung, 10 Tage und einen Tag vorher), und bis dahin kannst du die Löschung abbrechen. Mehr dazu unter [Konto, Newsletter und Löschung](./daten-und-loeschung.md#organisation-loeschen).

![Organisationseinstellungen – Allgemein](/img/screens/de/settings-organisation.png)

### Kontakt

Unter **Kontakt** hinterlegst du Adresse, PLZ, Stadt, Telefon und Website deiner Organisation. Das Land siehst du hier nur zur Ansicht; es wird einmal festgelegt, siehe [Land der Organisation](./betriebsarten.md#land).

Die Rechnungsadresse für die Abrechnung einer Veranstaltung gibst du beim [Bezahlen der Veranstaltung](./veranstaltungen.md) an, nicht hier.

### Betriebsart {/* #betriebsart */}

Unter **Betriebsart** wählst du, wie deine Organisation arbeitet: **Nur Bons**, **Bargeldlos** oder **Alle Funktionen** (nur Admins). Darunter stehen der Verlauf aller Wechsel und – in Deutschland bei „Nur Bons“ und „Bargeldlos“ – der Knopf für die Herstellerbescheinigung. Alles dazu unter [Betriebsarten](./betriebsarten.md).

### Assistent

Unter **Assistent** schaltest du die **Assistent-Funktionen** ein oder aus (nur Admins): Speisekarte importieren und Icon-Vorschläge. Darunter siehst du das Tageskontingent. Was der Assistent kann und was mit deinen Daten passiert, steht unter [Assistent](./assistent.md).

### Benachrichtigungen {/* #benachrichtigungen */}

Unter **Benachrichtigungen** legst du fest, welche **Erinnerungen zu Veranstaltungen** OpenEOS an alle Admins deiner Organisation schickt (nur Admins können das ändern, alles ist anfangs an):

- **Eine Woche vorher – „Dein Fest rückt näher“:** eine Checkliste aus deinen echten Daten, jeder Punkt mit ✓ oder ✗ und einem Link an die richtige Stelle: Kassen verbunden, Drucker online und Testdruck, Bedienungen und PIN-Zettel, Produkte und Preise, Impressum und Datenschutzhinweis (wenn Shop oder QR-Bestellung genutzt werden), Betriebsart und Land, Cloud-TSE. Dazu der Hinweis, dass bis zum Verkaufsstart alles im Testbetrieb läuft.
- **Am Vortag – „Morgen geht's los“:** ab wann echt verkauft wird, dass die Testbestellungen dann gelöscht werden, die Nummer des [Notfall-Supports](./support.md) und der Stand der Cloud-TSE.
- **Nach dem Fest – „Danke! So lief dein Fest“:** Bestellungen, Umsatz (bei „Nur Bons“ nur Mengen) und die drei meistverkauften Produkte, ohne Testbestellungen, mit Links zu Berichten, CSV-Export und Kellnerabrechnungen.
- **Noch nicht freigeschaltet:** eine Woche vorher, wenn die Veranstaltung noch im Testmodus ist, mit Link zum Freischalten und der Stornofrist (kostenlos nur bis 7 Tage vor Beginn).

Die Mails gehen zu festen Zeiten (meist 9 Uhr) und werden nachgeholt, solange sie noch passen. Verschiebst du eine Veranstaltung auf einen anderen Tag, kommen die Erinnerungen für den neuen Termin noch einmal. Nur für dich schaltest du sie unter **Persönlich → Einstellungen → Erinnerungen zu Veranstaltungen** ab; ist dort **E-Mail-Benachrichtigungen** aus, bekommst du sie ebenfalls nicht. Auf einer eigenen Installation gibt es die Mails nur mit eingerichtetem E-Mail-Versand und ohne „Noch nicht freigeschaltet“.

### Was du hier nicht mehr findest

Frühere Versionen hatten weitere Unterreiter. Diese Einstellungen liegen jetzt dort, wo sie gebraucht werden:

- **Kassiermodus** (**Sofort kassieren** oder **Auf Deckel buchen**) und die **Tische** legst du je Veranstaltung fest, im Dialog der [Veranstaltung](./veranstaltungen.md). Wie das an der Kasse aussieht, steht unter [Kasse](./kasse.md#senden-oder-kassieren).
- **SumUp** richtest du als [Integration](./integrationen/sumup.md) ein: unter **Integrationen** aktivieren und danach auf der eigenen Seite **SumUp** konfigurieren.
- **Rechnungen** und die Rechnungsadresse findest du unter **Rechnungen** in der Seitenleiste bzw. beim Bezahlen der Veranstaltung.
- Den **bargeldlosen Modus** aus dem früheren Unterreiter **Zahlungen** gibt es nicht mehr als eigenen Schalter. Er ist jetzt die Betriebsart **Bargeldlos** unter [Betriebsart](#betriebsart).

## Darstellung und Sprache

Schneller als über die Einstellungen geht es über das Menü unter deinem Namen unten links:

- **Erscheinungsbild:** **Hell**, **Dunkel** oder **System** (folgt deinem Gerät).
- **Sprache:** **Deutsch** oder **English**.
