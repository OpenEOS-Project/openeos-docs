---
sidebar_position: 18
title: Einstellungen
description: Persönliche Einstellungen und Organisationseinstellungen verwalten.
---

# Einstellungen

Unter **Einstellungen** verwaltest du deine persönlichen Daten sowie die Einstellungen deiner Organisation. Du erreichst sie über das Menü unter deinem Namen unten links in der Seitenleiste. Der Bereich ist in zwei Reiter gegliedert: **Persönlich** und **Organisation**.

Jeder Unterreiter besteht aus Karten mit demselben Kopf: einem Symbol, dem Titel und einer kurzen Erklärung, was du dort einstellst.

![Einstellungen – Profil](/img/screens/de/settings.png)

## Persönlich

Der Reiter **Persönlich** ist in mehrere Unterbereiche gegliedert:

- **Profil** – Profilbild, Vorname und Nachname pflegen. Die E-Mail-Adresse steht hier nur zur Ansicht.
- **Konto** – die Karten **E-Mail ändern** und **Passwort ändern** (beide mit deinem aktuellen Passwort), [Neuigkeiten per E-Mail](./daten-und-loeschung.md#newsletter) an- oder abbestellen und [Konto löschen](./daten-und-loeschung.md#konto-loeschen).
- **Sicherheit** – **Zwei-Faktor-Authentifizierung**, **Vertrauenswürdige Geräte** und **Aktive Sitzungen**.
- **Einstellungen** – **Erscheinungsbild** (**Hell**, **Dunkel** oder **System**), **Sprache**, **Benachrichtigungen** (**E-Mail-Benachrichtigungen**, **Push-Benachrichtigungen**) und der **Rundgang** durch die Oberfläche, den du mit **Erneut starten** noch einmal ansiehst.
- **Über OpenEOS** – Version, Lizenz und ein Link zum Quellcode dieser Installation.

In **Profil** und **Konto** übernimmst du Änderungen über den Knopf der jeweiligen Karte, etwa **Änderungen speichern**. Unter **Einstellungen** wirkt eine Auswahl sofort.

### Sicherheit

Im Unterbereich **Sicherheit** richtest du die Zwei-Faktor-Authentifizierung ein (**2FA aktivieren**, per **Authenticator App** oder **E-Mail**), entfernst vertrauenswürdige Geräte und meldest Sitzungen ab – einzeln mit **Abmelden** oder mit **Alle anderen Sitzungen beenden**. Dein Passwort änderst du unter **Konto**.

![Einstellungen – Sicherheit](/img/screens/de/settings-security.png)

## Organisation

Im Reiter **Organisation** verwaltest du die Stammdaten deiner Organisation. Er hat die Unterreiter **Allgemein**, **Kontakt**, **Steuerangaben**, **Betriebsart**, **Assistent**, **Zugänge**, **Webhooks**, **Benachrichtigungen** und **Rechtliche Angaben**. Ändern können die Angaben nur Admins der Organisation.

### Allgemein

Grundlegende Informationen deiner Organisation:

- **Logo** – wird auf der öffentlichen [Helferplan-Seite](./schichtplaene.md) und im Shop angezeigt (PNG, JPG oder WEBP, max. 5 MB).
- **Name** – erscheint auf Rechnungen und Bons.
- **Beschreibung** – optionaler Zusatztext.
- **Keine Umsatzsteuer** – für Vereine und Kleinunternehmer nach § 19 UStG. Ist die Option an, tragen alle Produkte 0 % und es gibt keine Steuersatz-Auswahl.
- **Organisation löschen** – eigene Karte unter den Angaben, nur für Administratoren. Danach ist die Organisation 30 Tage nur lesend nutzbar, damit du alle Daten exportieren kannst; dann wird sie endgültig gelöscht. Vorher kommen E-Mails (Ankündigung, 10 Tage und einen Tag vorher), und bis dahin kannst du die Löschung abbrechen. Mehr dazu unter [Konto, Newsletter und Löschung](./daten-und-loeschung.md#organisation-loeschen).

![Organisationseinstellungen – Allgemein](/img/screens/de/settings-organisation.png)

### Kontakt

Unter **Kontakt** hinterlegst du Adresse, PLZ, Stadt, Telefon und Website deiner Organisation. Das Land siehst du hier nur zur Ansicht; es wird einmal festgelegt (unter **Betriebsart**) und danach nur über den Support geändert, siehe [Land der Organisation](./betriebsarten.md#land).

Die Anschrift ist zugleich die Rechnungsanschrift für das [Bezahlen einer Veranstaltung](./veranstaltungen.md#pflichtangaben). Fehlt sie beim ersten Kauf, fragt der Bezahldialog sie ab und speichert sie hier.

### Steuerangaben {/* #steuerangaben */}

Unter **Steuerangaben** trägst du **Offizieller Name** (nur wenn er vom Namen der Organisation abweicht), **Steuernummer** und/oder **USt-IdNr.** ein. Eine der beiden Nummern genügt. Für die [Cloud-TSE](./integrationen/cloud-tse.md) sind Steuernummer oder USt-IdNr. zusammen mit der Anschrift unter **Kontakt** Pflicht, siehe [Organisation: Steuerangaben](./organisation.md#steuerangaben).

### Betriebsart {/* #betriebsart */}

Unter **Betriebsart** wählst du, wie deine Organisation arbeitet: **Nur Bons**, **Bargeldlos** oder **Alle Funktionen** (nur Admins). Darunter stehen der Verlauf aller Wechsel und – in Deutschland bei „Nur Bons“ und „Bargeldlos“ – der Knopf für die Herstellerbescheinigung. Alles dazu unter [Betriebsarten](./betriebsarten.md).

### Assistent

Unter **Assistent** schaltest du die **Assistent-Funktionen** ein oder aus (nur Admins): Speisekarte importieren und Icon-Vorschläge. Darunter siehst du das Tageskontingent. Was der Assistent kann und was mit deinen Daten passiert, steht unter [Assistent](./assistent.md).

### Zugänge

Unter **Zugänge** legen Admins API-Tokens für Skripte, Automatisierungen und KI-Agenten an (**Zugang anlegen**) und widerrufen sie. Die Liste zeigt je Zugang Name, Schlüsselanfang, Berechtigungen, wann er angelegt und zuletzt genutzt wurde, den Ablauf und den Status. Alles dazu unter [API-Zugänge](./api-zugaenge.md) und [KI-Agenten verbinden](./ki-agenten.md).

### Webhooks

Unter **Webhooks** richten Admins Adressen ein, an die OpenEOS bei Bestellungen, Zahlungen und anderen Ereignissen sofort eine Nachricht schickt (**Webhook anlegen**). Alles dazu unter [Webhooks](./integrationen/webhooks.md).

### Benachrichtigungen {/* #benachrichtigungen */}

Unter **Benachrichtigungen** legst du fest, welche **Erinnerungen zu Veranstaltungen** OpenEOS an alle Admins deiner Organisation schickt (nur Admins können das ändern, alles ist anfangs an):

- **Eine Woche vorher – „Dein Fest rückt näher“:** eine Checkliste aus deinen echten Daten, jeder Punkt mit ✓ oder ✗ und einem Link an die richtige Stelle: Kassen verbunden, Drucker online und Testdruck, Bedienungen und PIN-Zettel, Produkte und Preise, Impressum und Datenschutzhinweis (wenn Shop oder QR-Bestellung genutzt werden), Betriebsart und Land, Cloud-TSE. Dazu der Hinweis, dass bis zum Verkaufsstart alles im Testbetrieb läuft.
- **Am Vortag – „Morgen geht's los“:** ab wann echt verkauft wird, dass die Testbestellungen dann gelöscht werden, die Nummer des [Notfall-Supports](./support.md) und der Stand der Cloud-TSE.
- **Nach dem Fest – „Danke! So lief dein Fest“:** Bestellungen, Umsatz (bei „Nur Bons“ nur Mengen) und die drei meistverkauften Produkte, ohne Testbestellungen, mit Links zu Berichten, CSV-Export und Kellnerabrechnungen.
- **Noch nicht freigeschaltet:** eine Woche vorher, wenn die Veranstaltung noch im Testmodus ist, mit Link zum Freischalten und der Stornofrist (kostenlos nur bis 7 Tage vor Beginn).

Die Mails gehen zu festen Zeiten (meist 9 Uhr) und werden nachgeholt, solange sie noch passen. Verschiebst du eine Veranstaltung auf einen anderen Tag, kommen die Erinnerungen für den neuen Termin noch einmal. Nur für dich schaltest du sie unter **Persönlich → Einstellungen → Erinnerungen zu Veranstaltungen** ab; ist dort **E-Mail-Benachrichtigungen** aus, bekommst du sie ebenfalls nicht. Auf einer eigenen Installation gibt es die Mails nur mit eingerichtetem E-Mail-Versand und ohne „Noch nicht freigeschaltet“.

### Rechtliche Angaben {/* #rechtliche-angaben */}

Unter **Rechtliche Angaben** hinterlegst du **Impressum** und **Datenschutzhinweis** deines Vereins, jeweils als **Link** oder als **Text**, dazu optional einen **Kontakt für Datenschutzfragen**. Beides erscheint in der Fußzeile des Shops und der Helferseiten; die **Vorschau der Fußzeile** zeigt, wie das aussieht. Übernommen wird mit **Speichern**.

Solange Impressum oder Datenschutzhinweis fehlen, nimmt dein Shop keine Bestellungen an, auch im Testmodus nicht, und auch die Bestellung per QR-Code am Tisch geht nicht. Für den Datenschutzhinweis gibt es eine Vorlage: **Vorlage für den Datenschutzhinweis verwenden** führt zu [Rechtliches → Rechtstexte für deinen Shop](#rechtliches).

:::note
OpenEOS prüft die Texte nicht und leistet keine Rechtsberatung. Im Zweifel lass sie von einer fachkundigen Stelle prüfen.
:::

### Was du hier nicht mehr findest

Frühere Versionen hatten weitere Unterreiter. Diese Einstellungen liegen jetzt dort, wo sie gebraucht werden:

- **Kassiermodus** (**Sofort kassieren** oder **Auf Deckel buchen**) und die **Tische** legst du je Veranstaltung fest, im Dialog der [Veranstaltung](./veranstaltungen.md). Wie das an der Kasse aussieht, steht unter [Kasse](./kasse.md#senden-oder-kassieren).
- **SumUp** richtest du als [Integration](./integrationen/sumup.md) ein: unter **Integrationen** aktivieren und danach auf der eigenen Seite **SumUp** konfigurieren.
- **Rechnungen** findest du unter **Rechnungen** in der Seitenleiste. Die Rechnungsanschrift ist die Anschrift unter [Kontakt](#kontakt).
- Den **bargeldlosen Modus** aus dem früheren Unterreiter **Zahlungen** gibt es nicht mehr als eigenen Schalter. Er ist jetzt die Betriebsart **Bargeldlos** unter [Betriebsart](#betriebsart).

## Rechtliches {/* #rechtliches */}

Im Menü unter deinem Namen unten links steht neben **Einstellungen** der Eintrag **Rechtliches**. Dort findest du:

- **Verträge und Rechtstexte von OpenEOS** – AGB, Auftragsverarbeitungsvertrag (AVV), Datenschutzerklärung und Impressum in der aktuellen Fassung mit PDF. Bei AGB und AVV steht, welche Fassung du wann akzeptiert hast. Ältere Fassungen bleiben unter ihrem Datum abrufbar. Dazu der Link zu den **Unterauftragsverarbeitern (AVV Anhang B)**.
- **Angaben für die Finanzamt-Meldung (ELSTER)** – nur für Admins: Software, Seriennummer der Kasse, Betriebsstätte und TSE, also die Werte, die du in ELSTER einträgst, jeweils mit Kopierknopf. Fehlen Anschrift oder Steuernummer, verweist die Seite auf die Einstellungen.
- **Rechtstexte für deinen Shop** – eine Vorlage für den Datenschutzhinweis im Shop und auf den Helferseiten. Name, Anschrift und E-Mail deiner Organisation sind vorbelegt; die gelb markierten Stellen füllst du selbst aus. Admins bestätigen **Ich habe den Text geprüft und an unseren Verein angepasst.** und übernehmen ihn mit **Als Datenschutzhinweis übernehmen** in die [Rechtlichen Angaben](#rechtliche-angaben).

Ändern sich AGB oder AVV, bestätigen Admins die neuen Fassungen einmal nach der Anmeldung, siehe [Neue AGB bestätigen](./registrierung-login.md#neue-agb).

## Darstellung und Sprache

Schneller als über die Einstellungen geht es über das Menü unter deinem Namen unten links:

- **Erscheinungsbild:** **Hell**, **Dunkel** oder **System** (folgt deinem Gerät).
- **Sprache:** **Deutsch** oder **English**.
