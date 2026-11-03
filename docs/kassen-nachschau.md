---
title: Kassen-Nachschau und DSFinV-K
description: Was du dem Finanzamt bei einer Kassen-Nachschau oder Prüfung übergibst — DSFinV-K-Export, TSE-Export und Verfahrensdokumentation — und wie die Kassenabschlüsse entstehen.
---

# Kassen-Nachschau und DSFinV-K

Das Finanzamt darf ohne Ankündigung zur **Kassen-Nachschau** kommen (§ 146b AO), etwa mitten auf deinem Fest. Dann will der Prüfer die Kassendaten in zwei festen Formaten sehen. Mit der [Cloud-TSE](./integrationen/cloud-tse.md) erzeugt OpenEOS beides für dich – du lädst es mit zwei Klicks herunter.

:::info[Nur mit Cloud-TSE]
Kassenabschlüsse und DSFinV-K gibt es für Organisationen mit aktiver Cloud-TSE (Deutschland, Betriebsart **Alle Funktionen** mit Bargeld).
:::

## Was du übergibst {/* #uebergabe */}

| Unterlage | Was drin ist | Wo du sie bekommst |
|---|---|---|
| **DSFinV-K-Export** (ZIP) | Alle Vorgänge der Kasse in der „Digitalen Schnittstelle der Finanzverwaltung für Kassensysteme“ (DSFinV-K 2.4): Belege mit Positionen, Steuersätzen und Zahlarten, Kassenabschlüsse, Stammdaten, TSE-Angaben. 20 CSV-Dateien mit `index.xml`, die der Prüfer direkt in seine Prüfsoftware einliest. | **Cloud-TSE → Kassen-Nachschau → DSFinV-K exportieren** |
| **TSE-Export** (TAR) | Die signierten Protokolle der TSE nach TR-03153. Damit prüft das Finanzamt, dass die Daten echt sind. | **Cloud-TSE → Kassen-Nachschau → TSE-Export (TAR)** |
| **Verfahrensdokumentation** | Wie deine Kasse aufgebaut ist und wie ihr damit arbeitet (Geräte, Abläufe, Verantwortliche, Kassenanweisung). | Erstellst du als Verein; OpenEOS liefert die technischen Angaben (Kasse `OEOS-…`, TSE, Ausfallprotokoll) auf der Seite Cloud-TSE. |

Dazu kommen auf Nachfrage die Bons selbst – auf jedem Bon steht ein QR-Code, den der Prüfer mit einer Prüf-App einlesen kann. Funktioniert die Prüfung damit, ist die Nachschau oft schon beendet.

## So exportierst du {/* #export */}

1. In der Seitenleiste **Cloud-TSE** öffnen und zum Abschnitt **Kassen-Nachschau** scrollen.
2. Den **Zeitraum** wählen. Standard ist der heutige Geschäftstag (6 bis 6 Uhr).
3. **DSFinV-K exportieren** klicken. Gehört der heutige Tag dazu, schließt OpenEOS die offenen Vorgänge vorher ab (siehe unten) – der Export enthält dann alles bis zu diesem Moment.
4. **TSE-Export (TAR)** klicken. Du bekommst ein ZIP mit den TAR-Dateien des Zeitraums. Fehlt der heutige Tag noch, startest du mit **Export jetzt starten** einen neuen TSE-Export und lädst ihn nach ein paar Minuten herunter.
5. Beide Dateien dem Prüfer geben, z. B. auf einem USB-Stick.

Neben jeder Datei siehst du eine **Prüfsumme (SHA-256)**. Damit lässt sich später zeigen, dass die übergebene Datei unverändert ist.

## Kassenabschlüsse {/* #abschluss */}

Die DSFinV-K ordnet jeden Vorgang einem **Kassenabschluss** zu (früher „Z-Bon“). OpenEOS erstellt ihn **automatisch** für jeden Geschäftstag (6 bis 6 Uhr) kurz nach dessen Ende. Jeder Abschluss bekommt eine fortlaufende **Z-Nummer** und lässt sich danach nicht mehr ändern.

Die Liste unter **Kassen-Nachschau** zeigt je Abschluss die Z-Nr., den Geschäftstag, den Umsatz, davon bar, und die Zahl der Vorgänge. Mit **Herunterladen** bekommst du den DSFinV-K-Export genau dieses Abschlusses.

Mit **Kassenabschluss jetzt erstellen** schließt du alle offenen Vorgänge bis zu diesem Moment sofort ab – etwa wenn der Prüfer gerade vor dir steht. Am Ende des Geschäftstags folgt für den Rest automatisch ein weiterer Abschluss.

:::tip[Bargeld gehört auch dazu]
Für einen vollständigen Abschluss trägst du an der Kasse das **Wechselgeld** zu Beginn und das **Abschöpfen** in den Tresor ein – siehe [Kassenbuch](./kassenbuch.md). Sonst passt der Bargeldbestand im Abschluss nicht zu dem, was in der Kasse liegt.
:::

## Was im Export steht {/* #inhalt */}

- **Eine Kasse** je Organisation: die Kasse `OEOS-…` mit der Cloud-TSE. Eure Tablets und Handys stehen als **Terminals** im Export; an jeder Position steht, an welchem Gerät sie gebucht wurde.
- **Jeder Vorgang**: Verkäufe (auch Teil- und Sammelzahlungen), Rabatte, Varianten, Pfand und Pfandrückgaben, Trinkgeld, Erstattungen und Stornos mit Verweis auf den ursprünglichen Beleg, Bestellungen im Tischbetrieb, Kassenbuch-Buchungen und Trainingsbuchungen aus dem Testmodus.
- **TSE-Ausfälle**: Vorgänge ohne Signatur stehen mit dem Hinweis „TSE ausgefallen“ im Export – so verlangt es die DSFinV-K.
- **Nicht** im Export: Online-Bestellungen, die im Shop vorab bezahlt wurden. Sie laufen nicht über die Kasse.

Damit der Export vollständig ist, brauchst du in den [Organisations-Einstellungen](./organisation.md#steuerangaben) die **Steuernummer** oder **USt-IdNr.** und die Anschrift. Ohne diese Angaben lässt sich die Cloud-TSE nicht einrichten.

## Trinkgeld {/* #trinkgeld */}

Unter **Kassen-Nachschau** legst du fest, an wen Trinkgeld geht:

- **Verein** (Standard): Trinkgeld zählt als Einnahme der Organisation (DSFinV-K „TrinkgeldAG“).
- **Helfer**: Trinkgeld wird an die Helfer weitergegeben (DSFinV-K „TrinkgeldAN“).

Kläre die richtige Einstellung mit deiner Steuerberatung.

## Aufbewahrung {/* #aufbewahrung */}

OpenEOS bewahrt Kassenabschlüsse, DSFinV-K- und TSE-Exporte **zehn Jahre** auf (§ 147 AO), auch wenn du die Cloud-TSE später deaktivierst.

:::note
Das ist keine Steuerberatung. Im Einzelfall entscheidet dein Finanzamt; bist du unsicher, sprich mit deiner Steuerberatung.
:::

## Siehe auch

- [Cloud-TSE](./integrationen/cloud-tse.md)
- [Kassenbuch](./kassenbuch.md)
