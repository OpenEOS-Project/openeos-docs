---
sidebar_position: 6
title: Produkte
description: Produkte anlegen, bepreisen, mit Icons versehen und per CSV importieren.
---

# Produkte

Unter **Produkte** verwaltest du das Sortiment deiner aktiven Veranstaltung – also alles, was an der Kasse verkauft wird. Jedes Produkt hat mindestens einen Namen und einen Preis und kann einer Kategorie zugeordnet werden.

:::warning[Aktive Veranstaltung nötig]
Produkte gehören immer zu einer Veranstaltung. Ist kein Event aktiv, erscheint der Hinweis „Kein aktives Event“. Aktiviere zuerst eine [Veranstaltung](./veranstaltungen.md).
:::

![Produktübersicht](/img/screens/de/products.png)

## Produkt erstellen

1. Klicke auf **Produkt erstellen**.
2. Fülle die Felder aus:
   - **Name** (Pflicht)
   - **Kategorie** – Zuordnung zu einer [Kategorie](./kategorien.md)
   - **Beschreibung** – optionaler Zusatz (z. B. „Frisch gezapft“)
   - **Preis** (Pflicht)
3. Optional: Wähle ein **Produkt-Icon** oder lade ein **Bild hoch** (siehe [Icons und Bilder](#icons)).
4. Optional: Schalte **Favorit** ein, damit das Produkt an der Kasse ganz oben steht (siehe [Favoriten](#favoriten)).
5. Optional: Füge über **+ Gruppe hinzufügen** Optionsgruppen hinzu (z. B. „Beilage“ mit Auswahlmöglichkeiten).
6. Klicke auf **Erstellen**.

![Produkt erstellen](/img/screens/de/products-dialog.png)

## Produktliste

Die Tabelle zeigt pro Produkt **Name**, **Kategorie**, **Preis**, **Bestand** und **Status** (z. B. *Verfügbar*). Über die Aktions-Schaltflächen am Zeilenende **bearbeitest** oder **löschst** du ein Produkt. Der **Stern** in der Zeile macht ein Produkt zum Favoriten oder nimmt es wieder heraus.

## Favoriten {/* #favoriten */}

Was am häufigsten verkauft wird, markierst du als **Favorit** — mit dem Stern in der Produktliste oder dem Schalter **Favorit** im Produktdialog. An der Kasse erscheint dann ganz oben die Kategorie **Favoriten** mit genau diesen Produkten; beim ersten Öffnen ist sie gleich ausgewählt. So liegen Bier, Bratwurst und Pommes einen Tipp entfernt, egal in welcher Kategorie sie stehen.

Gibt es keinen Favoriten, fehlt die Kategorie, und die Kasse beginnt mit der ersten Kategorie. Favoriten gelten für alle Kassen der Veranstaltung.

## Icons und Bilder {/* #icons */}

An der Kasse hat jedes Produkt ein kleines Bild in der Kachel. Dafür gibt es zwei Wege:

- **Produkt-Icon wählen** — öffnet die Auswahl mit farbigen Produktbildern: Bier, Radler, Wein und Schorlen, Softdrinks als Glas oder Flasche, Wurst, Steak, Burger, Pommes, Crêpes und mehr. Ohne Suche stehen sie nach Getränken und Speisen geordnet; die Suche findet sie mit deutschen oder englischen Begriffen, zum Beispiel „Pils“, „Bratwurst“ oder „fries“.
- **Bild hochladen** — ein Foto des Produkts. Es füllt die Fläche des Icons aus.

Hat ein Produkt beides, zeigt die Kasse das Produkt-Icon. Hat es keines von beiden, übernimmt sie das Icon seiner [Kategorie](./kategorien.md) — für Kaffee oder Kuchen etwa, für die es kein eigenes Produktbild gibt. Produkte, die noch ein Icon aus der Vorversion haben, zeigt die Kasse mit dem passenden Produktbild (etwa Bier als Pils, Bratwurst als Grillwurst im Brötchen) oder, wenn es keins gibt, mit dem Icon der Kategorie.

![Auswahl der Produkt-Icons](/img/screens/de/products-icon-picker.png)

Für die zweite Zeile der Kachel nimmt die Kasse die erste Zeile der **Beschreibung** — schreib dort zum Beispiel „0,5 l“ oder „im Brötchen“.

## Bestandsverfolgung

Die Spalte **Bestand** zeigt, wie viele Einheiten eines Produkts laut System noch vorhanden sind. So erkennt das Kassenpersonal frühzeitig, wenn ein Produkt zur Neige geht.

So funktioniert die Bestandsverfolgung:

- **Verkauf reduziert den Bestand.** Wird ein Produkt an der Kasse verkauft, sinkt sein Bestand automatisch um die verkaufte Menge.
- **Kein Bestand hinterlegt (`-`).** Steht in der Spalte ein Strich, wird für dieses Produkt **kein** Bestand geführt – es bleibt unabhängig von der Menge verkaufbar. Das ist sinnvoll für Artikel ohne sinnvolle Stückzahl (z. B. frisch zubereitete Speisen).
- **Status.** Der Status (z. B. *Verfügbar*) signalisiert, ob ein Produkt aktuell an der Kasse angeboten wird.

### Zusammenhang mit der Inventur

Den Anfangsbestand und spätere Korrekturen erfasst du über das Modul **[Inventur](./inventur.md)**:

1. **Anfangsbestand erfassen** – Lege vor dem Fest eine Inventur an und trage die vorhandenen Mengen je Produkt ein. Dieser Wert erscheint anschließend in der Spalte **Bestand**.
2. **Laufender Betrieb** – Während des Verkaufs zählt OpenEOS die verkauften Mengen vom Bestand ab. Du siehst also jederzeit den rechnerisch verbleibenden Bestand.
3. **Schlussinventur** – Nach dem Fest erfasst du den tatsächlich verbliebenen Bestand. Die Differenz zwischen erwartetem und gezähltem Bestand hilft, **Verbrauch und Schwund** nachzuvollziehen.

:::tip[Bestand gezielt einsetzen]
Führe Bestände vor allem für Produkte, bei denen die Stückzahl wichtig ist (z. B. Getränkekisten, Pfandbecher). Für frei zubereitete Speisen kannst du die Bestandsführung weglassen, indem du keinen Anfangsbestand erfasst.
:::

## Produkte importieren

Statt jedes Produkt einzeln anzulegen, kannst du über **Importieren** mehrere Produkte gleichzeitig per **CSV-Datei** einlesen. Im Import-Dialog ordnest du die Spalten deiner Datei den OpenEOS-Feldern zu (Name, Preis, Kategorie usw.) und siehst vorab eine Vorschau, bevor der Import ausgeführt wird.
