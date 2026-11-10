---
sidebar_position: 15
title: Auswertung
description: Umsatz, Bestellungen, Top-Produkte und Zahlarten analysieren und als CSV exportieren.
---

# Auswertung

Die **Auswertung** zeigt Umsatz, Bestellungen und Produktanalysen im Überblick. Hier wertest du deine Veranstaltung aus – während des Betriebs und für die Abrechnung danach. In der Betriebsart [Nur Bons](./betriebsarten.md#nur-bons) gibt es keine Umsätze; die Auswertung zeigt dann nur Mengen.

![Auswertung](/img/screens/de/reports.png)

## Zeitraum und Veranstaltung wählen

Oben filterst du die Auswertung nach **Veranstaltung** und **Zeitraum**. Für den Zeitraum stehen Schnellauswahlen **Heute**, **Gestern** und **Gesamt** zur Verfügung; alternativ wählst du ein **Von**- und **Bis**-Datum.

## Kennzahlen

| Kennzahl | Bedeutung |
| --- | --- |
| **Gesamtumsatz** | Umsatz aus bezahlten Bestellungen |
| **Bestellungen** | Anzahl der Bestellungen / verkaufte Artikel |
| **Ø-Bestellwert** | Durchschnitt pro bezahlter Bestellung |
| **Pfand (Saldo)** | kassiertes minus ausgezahltes Pfand |
| **Storno-Quote** | Anteil stornierter Bestellungen |

## Detailauswertungen

- **Top-Produkte** – deine meistverkauften Produkte mit Menge, Umsatz und Durchschnittspreis, sortiert nach Menge.
- **Top-Kategorien** – Umsatz je Kategorie.
- **Zahlarten** – Aufschlüsselung des Umsatzes nach Zahlungsmethode.
- **Umsatzsteuer** – je Steuersatz Ware, Pfand, Pfandrückgaben, Brutto, Netto und enthaltene Umsatzsteuer. Pfand gehört zum Entgelt und steht beim Satz seines [Pfand-Typs](./pfand.md#umsatzsteuer); Pfandrückgaben gegen den [Altsaldo](./pfand.md#altsaldo) und Pfand von vor November 2026 stehen bei 0 %. [Trinkgeld](./trinkgeld.md) an den Verein steht anteilig beim Satz der Ware, Trinkgeld angestellter Bedienungen nur nachrichtlich. Ohne Umsatzsteuer (Kleinunternehmer) steht alles bei 0 %.
- **Umsatz nach Kanal** – Kasse, Online-Shop und QR-Bestellung im Vergleich.
- **Umsatz je Kasse** – welches Gerät wie viel kassiert hat.
- **Stundenverlauf** – Umsatz pro Stunde (0–23 Uhr), ideal um Stoßzeiten zu erkennen.

## Bedienungen {/* #bedienungen */}

Arbeitest du mit [Bedienungen](./bedienungen.md), zeigt der Bericht **Bedienungen** je Bedienung – und je Mitglied, das mit seiner Mitglieds-PIN kassiert hat:

| Spalten | Inhalt |
| --- | --- |
| **Aufgenommen** | Bestellungen, Positionen, Umsatz |
| **Kassiert** | Bar, Karte, Sonstige, Trinkgeld |
| **Storno/Erstattungen** | was die Person storniert oder erstattet hat |
| **Pfand ausgezahlt** | ausgezahltes Pfand |
| **Abrechnungen** | [Abrechnungen](./bedienungen.md#abrechnung) im Zeitraum |
| **Offene Tische** | Tische, die noch nicht bezahlt sind |

- Die Zeile **Ohne Bedienung** sammelt Buchungen, die niemandem zugeordnet sind – etwa aus dem Online-Shop oder von Kassen ohne Bedienungen.
- Testbuchungen zählen nicht mit. Der Zeitraum richtet sich nach der Buchungszeit.
- In [Nur Bons](./betriebsarten.md#nur-bons) zeigt der Bericht nur Mengen.
- Exportieren kannst du ihn wie die anderen Berichte, siehe [Export](#export).
- Den Bericht gibt es nur in der Verwaltung, nicht über [API-Zugänge](./api-zugaenge.md) oder [KI-Agenten](./ki-agenten.md): Er enthält Personendaten des Kassenpersonals.

## Export

Jede Detailauswertung lässt sich über **CSV exportieren** herunterladen. So kannst du die Daten in Excel oder deiner Buchhaltung weiterverarbeiten.

:::tip[Abrechnung nach dem Fest]
Wähle nach dem Fest den Zeitraum **Gesamt** und exportiere Top-Produkte und Zahlarten als CSV – das erleichtert die Endabrechnung und die Auswertung für den Vorstand.
:::

## Als PDF ausgeben

Über **PDF-Export** oben rechts erzeugst du eine fertige Zusammenfassung des gewählten Zeitraums — geeignet zum Ausdrucken, für die Kassenabrechnung oder die Vorstandssitzung.

Das PDF enthält:

- **Kopf** mit Organisation und Zeitraum
- **Kennzahlen**: Umsatz und Anzahl der Bestellungen
- **Stunden-Umsatz** als Balkendiagramm — daran siehst du, wann der Andrang war
- **Zahlarten** mit Anzahl, Betrag und Anteil
- **Top-Produkte** mit Menge, Umsatz und Durchschnittspreis je Produkt
- **Umsatz nach Kanal** (Kasse, Online-Shop)

Die Datei heißt nach dem Zeitraum, etwa `openeos-auswertung-sommerfest-2026.pdf`, und lädt direkt herunter. Die Erstellung passiert im Browser; bei vielen Bestellungen dauert sie einen Moment, währenddessen steht *Wird erstellt…*.

:::tip[Für die Abrechnung]
Nimm den Zeitraum **Gesamt** (oder **Von**/**Bis** über alle Festtage) statt *Heute*, wenn das Fest über mehrere Tage ging — sonst fehlen die anderen Tage.
:::

Neben dem PDF gibt es **CSV exportieren** für die Weiterverarbeitung in einer Tabellenkalkulation.
