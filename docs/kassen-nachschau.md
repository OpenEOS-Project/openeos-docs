---
title: Kassen-Nachschau und DSFinV-K
description: Was du dem Finanzamt bei einer Kassen-Nachschau oder Prüfung übergibst — DSFinV-K-Export, TSE-Export und Verfahrensdokumentation — und wie die Kassenabschlüsse entstehen.
---

import TseComingSoon from '@site/src/components/TseComingSoon';

# Kassen-Nachschau und DSFinV-K

Das Finanzamt darf ohne Ankündigung zur **Kassen-Nachschau** kommen (§ 146b AO), etwa mitten auf deinem Fest. Dann will der Prüfer die Kassendaten in zwei festen Formaten sehen. Mit der [Cloud-TSE](./integrationen/cloud-tse.md) erzeugt OpenEOS beides für dich – du lädst es mit zwei Klicks herunter.

:::info[Nur mit Cloud-TSE]
Kassenabschlüsse und DSFinV-K gibt es für Organisationen mit aktiver Cloud-TSE (Deutschland, [Betriebsart](./betriebsarten.md) **Alle Funktionen** mit Bargeld).
:::

<TseComingSoon />

## Was du übergibst {/* #uebergabe */}

| Unterlage | Was drin ist | Wo du sie bekommst |
|---|---|---|
| **DSFinV-K-Export** (ZIP) | Alle Vorgänge der Kasse in der „Digitalen Schnittstelle der Finanzverwaltung für Kassensysteme“ (DSFinV-K 2.4): Belege mit Positionen, Steuersätzen und Zahlarten, Kassenabschlüsse, Stammdaten, TSE-Angaben. 20 CSV-Dateien mit `index.xml`, die der Prüfer direkt in seine Prüfsoftware einliest. | **Cloud-TSE → Kassen-Nachschau → DSFinV-K exportieren** |
| **TSE-Export** (TAR) | Die signierten Protokolle der TSE nach TR-03153. Damit prüft das Finanzamt, dass die Daten echt sind. | **Cloud-TSE → Kassen-Nachschau → TSE-Export (TAR)** |
| **Verfahrensdokumentation** | Wie deine Kasse aufgebaut ist und wie ihr damit arbeitet (Geräte, Abläufe, Verantwortliche, Kassenanweisung). | Erstellst du als Verein, am besten mit unserer [Vorlage](./verfahrensdokumentation.md); OpenEOS liefert die technischen Angaben (Kasse `OEOS-…`, TSE, Ausfallprotokoll) auf der Seite Cloud-TSE. |

Dazu kommen auf Nachfrage die Bons selbst – auf jedem Bon steht ein QR-Code, den der Prüfer mit einer Prüf-App einlesen kann. Funktioniert die Prüfung damit, ist die Nachschau oft schon beendet.

Arbeitet ihr mit [Bedienungen](./bedienungen.md), zeigt der [Live-Kassensturz](./bedienungen.md#live-kassensturz) dem Prüfer, wie viel Bargeld jede Bedienung gerade haben muss. Den Bestand der Schubladen zeigt das [Kassenbuch](./kassenbuch.md).

## So exportierst du {/* #export */}

1. In der Seitenleiste **Cloud-TSE** öffnen und zum Abschnitt **Kassen-Nachschau** scrollen.
2. Den **Zeitraum** mit **Von** und **Bis** wählen. **Heute** setzt den heutigen Geschäftstag (6 bis 6 Uhr).
3. **DSFinV-K exportieren** klicken. Gehört der heutige Tag dazu, schließt OpenEOS die offenen Vorgänge vorher ab (siehe unten) – der Export enthält dann alles bis zu diesem Moment.
4. **TSE-Export (TAR)** klicken. Du bekommst ein ZIP mit den TAR-Dateien des Zeitraums. Fehlt der heutige Tag noch, startest du mit **Export jetzt starten** einen neuen TSE-Export und lädst ihn nach ein paar Minuten herunter.
5. Beide Dateien dem Prüfer geben, z. B. auf einem USB-Stick.

Neben jedem TSE-Export siehst du eine Prüfsumme („SHA-256 …“). Damit lässt sich später zeigen, dass die übergebene Datei unverändert ist.

## Kassenabschlüsse {/* #abschluss */}

Die DSFinV-K ordnet jeden Vorgang einem **Kassenabschluss** zu (früher „Z-Bon“). OpenEOS erstellt ihn **automatisch** für jeden Geschäftstag (6 bis 6 Uhr), jeden Morgen um 6 Uhr. Jeder Abschluss bekommt eine fortlaufende **Z-Nummer** und lässt sich danach nicht mehr ändern.

Die Liste **Kassenabschlüsse** zeigt je Abschluss **Z-Nr.**, **Geschäftstag**, **Umsatz brutto**, **Bargeld** (alle Bargeldbewegungen, auch Anfangsbestand, Einlagen und Entnahmen) und die Zahl der **Vorgänge**; von Hand erstellte Abschlüsse sind mit „von Hand“ markiert. Mit **ZIP** lädst du den DSFinV-K-Export genau dieses Abschlusses herunter. Darüber steht, was seit dem letzten Abschluss offen ist, etwa „Offen seit …: 12 Vorgänge“.

Mit **Kassenabschluss jetzt erstellen** schließt du alle offenen Vorgänge bis zu diesem Moment sofort ab – etwa wenn der Prüfer gerade vor dir steht. Am Ende des Geschäftstags folgt für den Rest automatisch ein weiterer Abschluss.

:::tip[Bargeld gehört auch dazu]
Für einen vollständigen Abschluss trägst du an der Kasse das **Wechselgeld** zu Beginn und das **Abschöpfen** in den Tresor ein – siehe [Kassenbuch](./kassenbuch.md). Sonst passt der Bargeldbestand im Abschluss nicht zu dem, was in der Kasse liegt.
:::

## Was im Export steht {/* #inhalt */}

- **Eine Kasse** je Organisation: die Kasse `OEOS-…` mit der Cloud-TSE. Eure Tablets und Handys stehen als **Terminals** im Export; an jeder Position steht, an welchem Gerät sie gebucht wurde.
- **Jeder Vorgang**: Verkäufe (auch Teil- und Sammelzahlungen), Rabatte, Varianten, Pfand und Pfandrückgaben, [Trinkgeld](./trinkgeld.md) (an den Verein anteilig je Steuersatz), Erstattungen und Stornos mit Verweis auf den ursprünglichen Beleg, Bestellungen ohne sofortige Zahlung, Kassenbuch-Buchungen, Kellnerabrechnungen, Trinkgeld-Auszahlungen, Verkauf, Einlösung und Rücktausch von [Wertmarken](./wertmarken.md#umsatzsteuer) (`MehrzweckgutscheinKauf`/`-Einloesung` bzw. `EinzweckgutscheinKauf`/`-Einloesung`) und Trainingsbuchungen aus dem Testmodus.
- **Online-Bestellungen**: Zahlungen im Online-Shop und bei der Bestellung per QR-Code signiert die Cloud-TSE seit November 2026 beim Zahlungseingang; sie stehen als Beleg mit der Zahlart „Zahlungsdienstleister“ (z. B. SumUp Online) im Export. Ältere Online-Bestellungen sind nicht enthalten.
- **TSE-Ausfälle**: Vorgänge ohne Signatur stehen mit dem Hinweis „TSE ausgefallen“ im Export – so verlangt es die DSFinV-K. Kam die Signatur erst nach dem Druck an, steht der Vorgang mit den Signaturdaten und dem Vermerk „Signatur nach Belegausgabe“ darin (siehe [Cloud-TSE](./integrationen/cloud-tse.md#spaete-signatur)).
- **Umsatzsteuer-Schlüssel**: 1 (19 %), 2 (7 %), 5 (nicht steuerbar: Kassenbuch, Trinkgeld angestellter Bedienungen, Pfandrückgaben gegen den [Altsaldo](./pfand.md#altsaldo), Mehrzweck-Wertmarken) und 6 für [Kleinunternehmer](./integrationen/cloud-tse.md#kleinunternehmer).

Damit der Export vollständig ist, brauchst du in den [Organisations-Einstellungen](./organisation.md#steuerangaben) die **Steuernummer** oder **USt-IdNr.** und die Anschrift. Ohne diese Angaben lässt sich die Cloud-TSE nicht einrichten.

## Trinkgeld {/* #trinkgeld */}

Wem das Trinkgeld gehört, entscheidet seit November 2026 die Bedienung, die kassiert: Trinkgeld gehört dem Verein (DSFinV-K „TrinkgeldAG“, mit dem Steuersatz der Waren), außer die Bedienung ist als **„Arbeitnehmer (Lohnkonto)“** gekennzeichnet (DSFinV-K „TrinkgeldAN“). Einzelheiten und ein Rechenbeispiel stehen unter [Trinkgeld](./trinkgeld.md).

Die frühere Einstellung **Trinkgeld geht an** (**Verein** oder **Helfer**) unter **Kassen-Nachschau** gilt nur noch für ältere Vorgänge, die so signiert wurden.

## Aufbewahrung {/* #aufbewahrung */}

OpenEOS bewahrt Kassenabschlüsse, DSFinV-K- und TSE-Exporte, Trainingsbuchungen, die Daten zu TSE-Ausfällen und die Kellnerabrechnungen **zehn Jahre** auf (§ 147 AO), auch wenn du die Cloud-TSE später deaktivierst. Digitale Belege, die ein Gast nie abgerufen hat, musst du nicht als Bild aufbewahren: OpenEOS erzeugt sie jederzeit inhaltsgleich aus den gespeicherten Daten neu. Deine Verfahrensdokumentation bewahrst du ebenfalls zehn Jahre auf.

:::note
Das ist keine Steuerberatung. Im Einzelfall entscheidet dein Finanzamt; bist du unsicher, sprich mit deiner Steuerberatung.
:::

## Siehe auch

- [Cloud-TSE](./integrationen/cloud-tse.md)
- [Kassenbuch](./kassenbuch.md)
- [Verfahrensdokumentation – Vorlage](./verfahrensdokumentation.md)
