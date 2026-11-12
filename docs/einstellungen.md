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
- **Konto** – die Karten **E-Mail ändern** und **Passwort ändern** (beide mit deinem aktuellen Passwort). Meldest du dich nur per Anmeldelink an, fragt keine der beiden nach einem Passwort, und statt **Passwort ändern** steht **Passwort festlegen**. Eine neue E-Mail-Adresse gilt erst, wenn du den Bestätigungslink in der Mail an diese Adresse öffnest; bis dahin meldest du dich mit der bisherigen an. Außerdem: [Neuigkeiten per E-Mail](./daten-und-loeschung.md#newsletter) an- oder abbestellen und [Konto löschen](./daten-und-loeschung.md#konto-loeschen).
- **Sicherheit** – **Zwei-Faktor-Authentifizierung**, **Vertrauenswürdige Geräte** und **Aktive Sitzungen**.
- **Einstellungen** – **Erscheinungsbild** (**Hell**, **Dunkel** oder **System**), **Sprache**, **Benachrichtigungen** (**E-Mail-Benachrichtigungen**, **Push-Benachrichtigungen**) und der **Rundgang** durch die Oberfläche, den du mit **Erneut starten** noch einmal ansiehst.
- **Über OpenEOS** – Version, Lizenz und ein Link zum Quellcode dieser Installation.

In **Profil** und **Konto** übernimmst du Änderungen über den Knopf der jeweiligen Karte, etwa **Änderungen speichern**. Unter **Einstellungen** wirkt eine Auswahl sofort.

### Sicherheit

Im Unterbereich **Sicherheit** richtest du die Zwei-Faktor-Authentifizierung ein (**2FA aktivieren**, per **Authenticator App** oder **E-Mail**), entfernst vertrauenswürdige Geräte und meldest Sitzungen ab – einzeln mit **Abmelden** oder mit **Alle anderen Sitzungen beenden**. Dein Passwort änderst du unter **Konto**.

![Einstellungen – Sicherheit](/img/screens/de/settings-security.png)

## Organisation

Im Reiter **Organisation** verwaltest du die Stammdaten deiner Organisation. Er hat die Unterreiter **Allgemein**, **Kontakt**, **Steuerangaben**, **Betriebsart**, **Assistent**, **Zugänge**, **Webhooks**, **Benachrichtigungen** und **Rechtliche Angaben**. Ändern können die Angaben nur Admins der Organisation; andere Mitglieder sehen Allgemein, Kontakt, Steuerangaben und Rechtliche Angaben nur zum Nachlesen (mit Hinweis, ohne **Speichern**).

### Allgemein {/* #allgemein */}

Grundlegende Informationen deiner Organisation:

- **Logo** – wird auf der öffentlichen [Helferplan-Seite](./schichtplaene.md) und im Shop angezeigt (PNG, JPG oder WEBP, max. 5 MB).
- **Name** – erscheint auf Rechnungen und Bons.
- **Beschreibung** – optionaler Zusatztext.
- **Keine Umsatzsteuer** – für Vereine und Kleinunternehmer nach § 19 UStG. Ist die Option an, tragen alle Produkte 0 % und es gibt keine Steuersatz-Auswahl. Kassenbon, Erstattungsbeleg und Pfandrückgabe tragen dann den Hinweis „Steuerfrei nach § 19 Abs. 1 UStG (Kleinunternehmer)“ und nie einen Steuerbetrag. Erreicht dein Umsatz in OpenEOS 80 % der 100.000-€-Grenze, warnt das Dashboard. Hat deine Organisation schon Vorgänge mit der [Cloud-TSE](./integrationen/cloud-tse.md#kleinunternehmer), wechselst du den Steuerstatus nicht mit diesem Schalter, sondern über **Steuerstatus ändern**: OpenEOS erstellt vorher einen Kassenabschluss.
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
- **Noch nicht freigeschaltet:** 10 Tage vorher, wenn die Veranstaltung noch im Testmodus ist, mit Link zum Freischalten und der Stornofrist. So früh, dass du nach dem Buchen noch kostenlos stornieren kannst (bis 7 Tage vor Beginn); nachgeholt wird sie nur bis 8 Tage vorher.

Die Mails gehen zu festen Zeiten (meist 9 Uhr) und werden nachgeholt, solange sie noch passen. Verschiebst du eine Veranstaltung auf einen anderen Tag, kommen die Erinnerungen für den neuen Termin noch einmal. Nur für dich schaltest du sie unter **Persönlich → Einstellungen → Erinnerungen zu Veranstaltungen** ab; ist dort **E-Mail-Benachrichtigungen** aus, bekommst du sie ebenfalls nicht. Auf einer eigenen Installation gibt es die Mails nur mit eingerichtetem E-Mail-Versand und ohne „Noch nicht freigeschaltet“.

### Rechtliche Angaben {/* #rechtliche-angaben */}

Unter **Rechtliche Angaben** hinterlegst du **Impressum** und **Datenschutzhinweis** deines Vereins, jeweils als **Link** oder als **Text**, dazu optional einen **Kontakt für Datenschutzfragen**. Beides erscheint in der Fußzeile des Shops und der Helferseiten; die **Vorschau der Fußzeile** zeigt, wie das aussieht. Übernommen wird mit **Speichern**.

![Rechtliche Angaben: Impressum und Datenschutzhinweis des Vereins](/img/screens/de/settings-legal-info.png)

Solange Impressum oder Datenschutzhinweis fehlen, nimmt dein Shop keine Bestellungen an, auch im Testmodus nicht, und auch die Bestellung per QR-Code am Tisch geht nicht. Für den Datenschutzhinweis gibt es eine Vorlage: **Vorlage für den Datenschutzhinweis verwenden** führt zu [Rechtliches → Rechtstexte für deinen Shop](#rechtliches).

:::note
OpenEOS prüft die Texte nicht und leistet keine Rechtsberatung. Im Zweifel lass sie von einer fachkundigen Stelle prüfen.
:::

#### Widerrufsrecht für Bestellungen {/* #widerrufsrecht */}

Ganz unten steht der Schalter **Für Bestellungen besteht ein Widerrufsrecht** – standardmäßig aus. Seit dem 19. Juni 2026 müssen Online-Shops, deren Kunden ein Widerrufsrecht haben, eine elektronische **Widerrufsfunktion** anbieten (§ 356a BGB).

Für die typischen Bestellungen im Vereinsshop besteht **in aller Regel kein Widerrufsrecht**:

- Speisen und Getränke, die schnell verderben oder zubereitet werden, sind ausgenommen (§ 312g Abs. 2 Nr. 2 BGB).
- Die Lieferung von Speisen und Getränken und andere Leistungen im Zusammenhang mit Freizeitveranstaltungen zu einem festen Termin sind ebenfalls ausgenommen (§ 312g Abs. 2 Nr. 9 BGB) – das gilt auch für den Vorverkauf zu einem Fest.
- Ein Widerrufsrecht haben nur Verbraucher gegenüber Unternehmern. Ob dein Verein beim Verkauf als Unternehmer handelt, hängt vom Einzelfall ab.

Anders kann es aussehen, wenn du im Shop Waren ohne festen Veranstaltungsbezug verkaufst, etwa Vereins-T-Shirts oder andere Fanartikel. Ob für deine Bestellungen ein Widerrufsrecht besteht, **entscheidest und verantwortest du als Verkäufer** – OpenEOS stellt nur die Funktion bereit und leistet keine Rechtsberatung.

Ist der Schalter an:

- Steht in der Fußzeile jeder Shop-Seite deiner Veranstaltung gut sichtbar **Vertrag widerrufen**. Die Bestellbestätigung per E-Mail enthält denselben Link.
- Auf der Seite **Vertrag widerrufen** geben Gäste Name, E-Mail-Adresse und Bestellnummer an (weitere Angaben freiwillig) und schicken den Widerruf mit **Widerruf bestätigen** ab. Die Seite bleibt auch nach dem Ende der Veranstaltung erreichbar, solange die Widerrufsfrist läuft.
- Der Gast bekommt sofort eine **Eingangsbestätigung** mit dem Inhalt seines Widerrufs sowie Datum und Uhrzeit des Eingangs per E-Mail.
- Der Widerruf geht per E-Mail an deinen **Kontakt für Datenschutzfragen** (falls hinterlegt) und an alle Admins deiner Organisation, mit dem Hinweis, ob Bestellnummer und E-Mail-Adresse zu einer Bestellung in deinem Shop passen. Die Erstattung machst du wie gewohnt über die [Bestellungen](./bestellungen.md) (Stornieren mit Erstattung), innerhalb von 14 Tagen.

Widerrufe werden 36 Monate nach dem Eingang gelöscht.

#### Inhalt melden {/* #inhalt-melden */}

In der Fußzeile des Shops und der Helferseiten steht der Link **Inhalt melden**. Darüber kann jeder Inhalte melden, die er für rechtswidrig hält (Melde- und Abhilfeverfahren nach dem Digital Services Act). OpenEOS prüft jede Meldung. Wird ein Inhalt deines Vereins eingeschränkt – etwa ein Artikel entfernt oder der Shop bzw. die Helferseite gesperrt –, bekommen die Admins deiner Organisation eine Begründung per E-Mail: welche Maßnahme, auf Grund welcher Tatsachen und welcher Grundlage, und wie du widersprechen kannst. Wer gemeldet hat, nennen wir nicht. Zentrale Kontaktstelle für Behörden und Nutzer ist hello@openeos.de (Deutsch, Englisch).

### Was du hier nicht mehr findest

Frühere Versionen hatten weitere Unterreiter. Diese Einstellungen liegen jetzt dort, wo sie gebraucht werden:

- **Kassiermodus** (**Sofort kassieren** oder **Auf Deckel buchen**) und die **Tische** legst du je Veranstaltung fest, im Dialog der [Veranstaltung](./veranstaltungen.md). Wie das an der Kasse aussieht, steht unter [Kasse](./kasse.md#senden-oder-kassieren).
- **SumUp** richtest du als [Integration](./integrationen/sumup.md) ein: unter **Integrationen** aktivieren und danach auf der eigenen Seite **SumUp** konfigurieren.
- **Rechnungen** findest du unter **Rechnungen** in der Seitenleiste. Die Rechnungsanschrift ist die Anschrift unter [Kontakt](#kontakt).
- Den **bargeldlosen Modus** aus dem früheren Unterreiter **Zahlungen** gibt es nicht mehr als eigenen Schalter. Er ist jetzt die Betriebsart **Bargeldlos** unter [Betriebsart](#betriebsart).

## Rechtliches {/* #rechtliches */}

Im Menü unter deinem Namen unten links steht neben **Einstellungen** der Eintrag **Rechtliches**. Dort findest du:

![Rechtliches: Verträge, ELSTER-Angaben, Vorlage für den Shop](/img/screens/de/legal.png)

- **Verträge und Rechtstexte von OpenEOS** – AGB mit **Anlage 1 (Leistungsbeschreibung und Preisliste)**, Auftragsverarbeitungsvertrag (AVV), Datenschutzerklärung und Impressum in der aktuellen Fassung mit PDF. Bei AGB und AVV steht, welche Fassung du wann akzeptiert hast. Ältere Fassungen bleiben unter ihrem Datum abrufbar. Dazu die Links zu den **Unterauftragsverarbeitern (AVV Anhang B)** und zur Seite **Data Act** (wo deine Daten verarbeitet werden, Exportformate, Anbieterwechsel).
- **Einsatzbedingungen der Cloud-TSE (Umgebungsschutzkonzept)** – nur, wenn die Cloud-TSE verfügbar ist: die Bedingungen des TSE-Herstellers Swissbit, die du beim Kassieren mit Cloud-TSE einhältst. Bis Swissbit sie bereitstellt, steht dort ein Hinweis.
- **Angaben für die Finanzamt-Meldung (ELSTER)** – nur für Admins: Software, Seriennummer der Kasse, Betriebsstätte und TSE, also die Werte, die du in ELSTER einträgst, jeweils mit Kopierknopf. Fehlen Anschrift oder Steuernummer, verweist die Seite auf die Einstellungen.
- **Rechtstexte für deinen Shop** – eine Vorlage für den Datenschutzhinweis im Shop und auf den Helferseiten. Name, Anschrift und E-Mail deiner Organisation sind vorbelegt; die gelb markierten Stellen füllst du selbst aus. Admins bestätigen **Ich habe den Text geprüft und an unseren Verein angepasst.** und übernehmen ihn mit **Als Datenschutzhinweis übernehmen** in die [Rechtlichen Angaben](#rechtliche-angaben).

Die geltenden Fassungen von AGB und AVV akzeptierst du bei der Registrierung und bei jeder kostenpflichtigen Buchung. Bei einer wesentlichen Änderung kann OpenEOS Admins bitten, die neuen Fassungen einmal nach der Anmeldung zu bestätigen, siehe [Neue AGB bestätigen](./registrierung-login.md#neue-agb).

## Darstellung und Sprache

Schneller als über die Einstellungen geht es über das Menü unter deinem Namen unten links:

- **Erscheinungsbild:** **Hell**, **Dunkel** oder **System** (folgt deinem Gerät).
- **Sprache:** **Deutsch** oder **English**.
