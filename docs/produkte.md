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
3. Optional: Lade ein **Bild hoch** oder wähle ein **Icon** aus der Icon-Bibliothek.
4. Optional: Füge über **+ Gruppe hinzufügen** Optionsgruppen hinzu (z. B. „Beilage“ mit Auswahlmöglichkeiten).
5. Klicke auf **Erstellen**.

![Produkt erstellen](/img/screens/de/products-dialog.png)

## Produktliste

Die Tabelle zeigt pro Produkt **Name**, **Kategorie**, **Preis**, **Bestand** und **Status** (z. B. *Verfügbar*). Über die Aktions-Schaltflächen am Zeilenende **bearbeitest** oder **löschst** du ein Produkt.

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

:::tip[Icons und Bilder]
Produkte ohne Foto wirken mit einem passenden **Icon** aus der Bibliothek übersichtlicher an der Kasse. Wähle beim Anlegen einfach **Icon wählen**.
:::
