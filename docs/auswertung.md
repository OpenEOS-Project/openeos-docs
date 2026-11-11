---
sidebar_position: 15
title: Auswertung
description: Umsatz, Bestellungen, Top-Produkte und Zahlarten analysieren und als CSV exportieren.
---

# Auswertung

Die **Auswertung** zeigt Umsatz, Bestellungen und Produktanalysen im Überblick. Hier wertest du deine Veranstaltung aus – während des Betriebs und für die Abrechnung danach. In der Betriebsart [Nur Bons](./betriebsarten.md#nur-bons) gibt es keine Umsätze; die Auswertung zeigt dann nur Mengen.

![Auswertung](/img/screens/de/reports.png)

## Zeitraum und Veranstaltung wählen

Oben filterst du die Auswertung nach **Veranstaltung** und **Zeitraum**; voreingestellt ist die aktive Veranstaltung. Für den Zeitraum stehen Schnellauswahlen **Heute**, **Gestern** und **Gesamt** zur Verfügung; alternativ wählst du ein **Von**- und **Bis**-Datum.

## Kennzahlen

| Kennzahl | Bedeutung |
| --- | --- |
| **Gesamtumsatz** | Umsatz aus bezahlten Bestellungen |
| **Bestellungen** | Anzahl der Bestellungen / verkaufte Artikel |
| **Ø-Bestellwert** | Durchschnitt pro bezahlter Bestellung |
| **Pfand (Saldo)** | kassiertes minus ausgezahltes Pfand |
| **Storno-Quote** | Anteil stornierter Bestellungen |

## Detailauswertungen

- **Top-Produkte** – deine Produkte mit Kategorie, Menge, Umsatz und Ø-Preis, netto und nach Umsatz sortiert.
- **Zahlarten** – Aufschlüsselung des Umsatzes nach Zahlungsmethode mit Anzahl, Betrag und Anteil. Mit Marken bezahlte Beträge stehen in der Zeile **Wertmarken**.
- **Wertmarken** – verkauft, eingelöst, zurückgegeben, zurückgetauscht und im Umlauf je Markentyp und Veranstaltung, siehe [Wertmarken](./wertmarken.md#bericht).
- **Umsatzsteuer** – Ware, Pfand und Pfand-Rückgaben je Steuersatz, siehe [unten](#umsatzsteuer).
- **Umsatz nach Kanal** – Kasse, Online-Shop und QR-Bestellung im Vergleich.
- **Top-Kategorien** – Menge und Umsatz je Kategorie, netto und nach Umsatz sortiert.
- **Umsatz je Kasse** – welches Gerät wie viel kassiert hat.
- **Bedienungen** – Zahlen je Bedienung, siehe [unten](#bedienungen).
- **Stundenverlauf** – Umsatz pro Stunde (0–23 Uhr), ideal um Stoßzeiten zu erkennen.

Top-Produkte und Top-Kategorien rechnen **netto**: Stornos und erstattete Mengen sind abgezogen, Rabatte anteilig verteilt, Pfand ist nicht enthalten. Unter der Tabelle stehen **Summe Produkte** bzw. **Summe Kategorien**, **Erstattungen ohne Position**, **Trinkgeld**, gegebenenfalls **Rundung (Rabatt anteilig)** und der **Umsatz netto** der Veranstaltung. In [Nur Bons](./betriebsarten.md#nur-bons) sind beide nach Menge sortiert.

## Umsatzsteuer {/* #umsatzsteuer */}

Die Karte **Umsatzsteuer** zeigt je **Steuersatz** die Spalten **Ware**, **Pfand**, **Pfand-Rückgabe**, **Brutto**, **Netto** und **Umsatzsteuer**, darunter die **Summe**. Pfand gehört zum Entgelt und steht beim Satz seines [Pfand-Typs](./pfand.md#umsatzsteuer); Pfand-Rückgaben mindern ihn. [Trinkgeld](./trinkgeld.md) an den Verein gehört seit November 2026 ebenfalls zum Entgelt und wird anteilig beim Satz der Ware versteuert; Trinkgeld angestellter Bedienungen ist kein Entgelt des Vereins.

![Auswertung: Umsatzsteuer je Satz](/img/screens/de/reports-vat.png)

- Weist deine Organisation keine Umsatzsteuer aus (z. B. Kleinunternehmer), stehen alle Beträge bei 0 % ohne Steuer.
- Pfand von vor November 2026 wurde ohne Umsatzsteuer gebucht und steht unverändert bei 0 %. Pfand-Rückgaben gegen diesen [Altsaldo](./pfand.md#altsaldo) stehen ebenfalls bei 0 %.
- Mit [Wertmarken](./wertmarken.md#umsatzsteuer): Die Spalte **Einzweck-Marken** zeigt Einzweckmarken, deren Umsatzsteuer beim Verkauf der Marken entsteht. Mehrzweckmarken sind beim Verkauf kein Umsatz; das zeigt eine Info-Zeile, ihre Umsatzsteuer steckt beim Einlösen in der Ware.
- Die Karte gibt es auch als CSV (**CSV exportieren**) und im PDF. In [Nur Bons](./betriebsarten.md#nur-bons) fehlt sie.

## Bedienungen {/* #bedienungen */}

Arbeitest du mit [Bedienungen](./bedienungen.md), zeigt der Bericht **Bedienungen** je Bedienung – und je Mitglied, das mit seiner Mitglieds-PIN kassiert hat. Die Karte erscheint, sobald im Zeitraum eine Bedienung gebucht hat.

![Auswertung: Bedienungen](/img/screens/de/reports-waiters.png)

| Spalte | Inhalt |
| --- | --- |
| **Bestellungen**, **Positionen** | was die Person aufgenommen hat |
| **Kassiert** | kassierter Betrag, aufgeteilt in **Bar** und **Karte** |
| **Trinkgeld** | kassiertes Trinkgeld |
| **Storno/Erst.** | was die Person storniert oder erstattet hat |
| **Pfand** | ausgezahltes Pfand |
| **Abrechnungen** | [Abrechnungen](./bedienungen.md#abrechnung) im Zeitraum |
| **Offene Tische** | Tische, die noch nicht bezahlt sind |

Die CSV-Datei enthält zusätzlich **Umsatz** und **Sonstige** (Zahlarten außer Bar und Karte).

- Die Zeile **Ohne Bedienung** sammelt Buchungen, die niemandem zugeordnet sind – etwa aus dem Online-Shop oder von Kassen ohne Bedienungen.
- Testbuchungen zählen nicht mit. Der Zeitraum richtet sich nach der Buchungszeit.
- In [Nur Bons](./betriebsarten.md#nur-bons) zeigt der Bericht nur Mengen.
- Exportieren kannst du ihn wie die anderen Berichte als CSV, siehe [Export](#export).
- Den Bericht gibt es nur in der Verwaltung, nicht über [API-Zugänge](./api-zugaenge.md) oder [KI-Agenten](./ki-agenten.md): Er enthält Personendaten des Kassenpersonals.

## Export

Jede Detailauswertung lässt sich über **CSV exportieren** herunterladen. So kannst du die Daten in Excel oder deiner Buchhaltung weiterverarbeiten.

:::tip[Abrechnung nach dem Fest]
Wähle nach dem Fest den Zeitraum **Gesamt** und exportiere Top-Produkte, Zahlarten und Umsatzsteuer als CSV – das erleichtert die Endabrechnung und die Auswertung für den Vorstand.
:::

## Als PDF ausgeben

Über **PDF-Export** oben rechts erzeugst du eine fertige Zusammenfassung des gewählten Zeitraums — geeignet zum Ausdrucken, für die Kassenabrechnung oder die Vorstandssitzung.

Das PDF enthält:

- **Kopf** mit Organisation und Zeitraum
- **Kennzahlen**: Umsatz, Bestellungen, Ø Bon, Pfand und Storno-Quote
- **Stunden-Umsatz** als Balkendiagramm — daran siehst du, wann der Andrang war
- **Zahlarten** mit Anzahl, Betrag und Anteil
- **Umsatzsteuer** je Steuersatz
- **Top-Produkte** mit Kategorie, Menge, Umsatz und Durchschnittspreis je Produkt
- **Umsatz nach Kanal** (Kasse, Online-Shop, QR-Bestellung)
- **Top-Kategorien** und **Umsatz je Kasse**

Der Bericht **Bedienungen** steht nicht im PDF; ihn exportierst du als CSV.

Die Datei heißt nach dem Zeitraum, etwa `openeos-auswertung-sommerfest-2026.pdf`, und lädt direkt herunter. Die Erstellung passiert im Browser; bei vielen Bestellungen dauert sie einen Moment, währenddessen steht *Wird erstellt…*.

:::tip[Für die Abrechnung]
Nimm den Zeitraum **Gesamt** (oder **Von**/**Bis** über alle Festtage) statt *Heute*, wenn das Fest über mehrere Tage ging — sonst fehlen die anderen Tage.
:::

Neben dem PDF gibt es **CSV exportieren** für die Weiterverarbeitung in einer Tabellenkalkulation.
