---
sidebar_position: 13
title: Bestellungen
description: Alle Bestellungen der Organisation überwachen, filtern und nachverfolgen.
---

# Bestellungen

Unter **Bestellungen** siehst du alle Bestellungen deiner Organisation im Überblick – unabhängig davon, ob sie an der Kasse, am Tisch oder online aufgegeben wurden. Jede Zeile zeigt Nummer, Tisch (falls vorhanden), Kanal und Kasse, Artikel, Status, Zahlung, Betrag und Zeit. Der Bereich dient der Live-Überwachung während des Betriebs und der Nachverfolgung einzelner Vorgänge.

![Bestellübersicht](/img/screens/de/orders.png)

## Kennzahlen

Am oberen Rand siehst du zusammengefasst:

| Kennzahl | Bedeutung |
| --- | --- |
| **Bestellungen** | Anzahl der Bestellungen im aktuellen Filter |
| **Umsatz** | Gesamtumsatz der angezeigten Bestellungen |
| **Ø Bon** | Durchschnittlicher Bestellwert |
| **Pfand** | Im Zeitraum angefallenes Pfand |

## Filtern

Über die Felder filterst du die Liste nach:

- **Suche** – Bestell- oder Tagesnummer, Tisch, Name oder Produkt
- **Status** – wie an der Kasse: in Küche, fertig, abgeschlossen, offen (nicht bezahlt), storniert, teilweise erstattet oder erstattet
- **Zahlungen** – bar, Karte, SumUp oder Rabatt-Bon
- **Kanäle** – **Bedienung** (am Tisch), **Bon-Kasse** (an der Theke) oder **Online**
- **Zeitraum** – **Von (Datum)** und **Bis (Datum)** (Kalendertage)
- **Veranstaltungen** – nach Veranstaltung

Die Kennzahlen oben und der Export richten sich nach denselben Filtern. Mit dem Symbol **Aktualisieren** lädst du die Liste neu.

## Als CSV exportieren

Über das Symbol **Als CSV exportieren** (Pfeil nach unten, neben *Aktualisieren*) lädst du die gefilterten Bestellungen als CSV-Datei herunter – alle Treffer, nicht nur die aktuelle Seite. Das Menü nennt oben, wie viele gefilterte Bestellungen in der Datei landen. Du wählst zwischen zwei Dateien:

![Bestellungen mit Zeitraum und geöffnetem Export](/img/screens/de/orders-export.png)

| Datei | Inhalt | Wofür |
| --- | --- | --- |
| **Bestellungen** | eine Zeile je Bestellung: Bestellnummer, Tagesnummer, Datum, Uhrzeit, Veranstaltung, Status, Kanal (Kasse, Online-Shop, QR-Bestellung), Ausgabe (am Tisch, Abholung), Tisch, Gerät, Bedienung, Anzahl Artikel, Zahlart, Zahlungsanbieter, Zahlungsreferenz, Zwischensumme, Rabatt, Pfand, Trinkgeld, Gesamt, Bezahlt, Erstattet, Erstattungsreferenz, enthaltene MwSt, Testbestellung, Gastname, Anmerkung | Abgleich mit Kasse und Konto, Abrechnung |
| **Positionen** | eine Zeile je Artikel: Bestellnummer, Datum, Uhrzeit, Veranstaltung, Tisch, Produkt, Kategorie, Variante, Menge, erstattete Menge, Einzelpreis, MwSt-Satz, Pfand je Stück, MwSt-Satz des Pfands, Positionssumme, Status, Station, Testbestellung, Anmerkung | Auswertung nach Produkt, Kategorie oder Station, Pivot-Tabellen |

Die Dateien sind für Excel vorbereitet: Semikolon als Trennzeichen, UTF-8 (Umlaute stimmen), Dezimalkomma, Datum und Uhrzeit in deutscher Zeit. Die älteste Bestellung steht oben. Bei **Positionen** ist der Bestellrabatt nicht auf die Artikel verteilt – Rabatt, Trinkgeld und Erstattungen stehen in der Datei **Bestellungen**.

- **Wer darf exportieren?** Administratoren und Mitglieder mit dem Recht **Bestellungen** (wie für Storno und Erstattung). Andere sehen das Symbol nicht.
- **[Nur Bons](./betriebsarten.md#nur-bons):** Die Dateien enthalten nur Mengen – keine Preise, Beträge oder Zahlarten.
- **Zahlungs- und Erstattungsreferenz:** die Transaktions-ID beim Zahlungsanbieter (SumUp; bei älteren Bestellungen auch PayPal), mehrere durch Komma getrennt. Damit gleichst du Bestellungen mit den Abrechnungen von SumUp ab – in der Betriebsart [Bargeldlos](./betriebsarten.md#bargeldlos-bedingungen) gehört dieser Abgleich zu den Bedingungen für den Betrieb ohne TSE. PayPal ist seit Version 1.8 nicht mehr angebunden: Eine frühere PayPal-Zahlung erstattest du selbst in deinem PayPal-Konto, OpenEOS bucht sie dann als „manuell erstattet“.
- **Bedienung:** die verantwortliche [Bedienung](./bedienungen.md) des Tisches, sonst die Bedienung, die die Bestellung aufgenommen hat. Leer, wenn keine Bedienung beteiligt war, etwa bei Bestellungen aus dem Online-Shop.
- **Gästedaten:** Name und Anmerkung des Gastes stehen nur in der Datei, solange OpenEOS sie noch speichert – 30 Tage nach dem Ende der Veranstaltung werden sie gelöscht (siehe [Daten und Löschung](./daten-und-loeschung.md#fristen)). Telefonnummern sind nie enthalten.
- **Per API:** Dieselbe Datei liefert `GET /organizations/{organizationId}/orders/export` mit einem [API-Token](./api-zugaenge.md) (Scope `read`, `variant=orders` oder `variant=items`, dieselben Filter wie die Liste).

:::tip[Steuerberater und Vorstand]
Stell den Zeitraum auf den Monat oder die Veranstaltung ein und exportiere **Bestellungen** – damit lassen sich Kasse, Kartenzahlungen und Erstattungen Zeile für Zeile abgleichen.
:::

## Bestelldetails

Wähle eine Bestellung aus, um die Details einzusehen: Kanal und Status, **Erstellt** und **Erstellt von** (Gerät, Bedienung oder Mitglied), Tisch, Gast und Notiz, die Positionen mit **Zwischensumme**, **Rabatt**, **Pfand**, **Trinkgeld** und **Gesamt**. Darunter stehen die **Zahlungen**, die **Erstattungen** mit Beleg und Grund und der **Verlauf** der Bestellung, mit Cloud-TSE auch die TSE-Angaben. So lassen sich Rückfragen klären oder einzelne Vorgänge nachvollziehen.

Mit dem Recht **Bestellungen** kannst du hier auch nachträglich korrigieren:

- **Positionen stornieren** – für noch nicht bezahlte Positionen.
- **Stornieren & erstatten** – storniert bezahlte Positionen und erstattet sie in einem Schritt.
- **Erstatten** – erstattet nach **Positionen**, als **Betrag** oder **Alles**, ohne zu stornieren.

Zu jeder Erstattung entsteht ein Gegenbeleg; über **Gegenbeleg nachdrucken** druckst du ihn erneut. An der Kasse geht das ebenso im [Bestellverlauf](./kasse.md#bestellverlauf).

:::tip[Echtzeit]
Neue Bestellungen erscheinen dank WebSocket-Verbindung praktisch in Echtzeit. Lass die Bestellübersicht während des Betriebs geöffnet, um den Überblick zu behalten.
:::
