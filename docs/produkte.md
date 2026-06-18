---
sidebar_position: 6
title: Produkte
description: Produkte anlegen, bepreisen, mit Icons versehen und per CSV importieren.
---

# Produkte

Unter **Produkte** verwalten Sie das Sortiment Ihrer aktiven Veranstaltung – also alles, was an der Kasse verkauft wird. Jedes Produkt hat mindestens einen Namen und einen Preis und kann einer Kategorie zugeordnet werden.

:::warning[Aktive Veranstaltung nötig]
Produkte gehören immer zu einer Veranstaltung. Ist kein Event aktiv, erscheint der Hinweis „Kein aktives Event". Aktivieren Sie zuerst eine [Veranstaltung](./veranstaltungen.md).
:::

![Produktübersicht](/img/screens/de/products.png)

## Produkt erstellen

1. Klicken Sie auf **Produkt erstellen**.
2. Füllen Sie die Felder aus:
   - **Name** (Pflicht)
   - **Kategorie** – Zuordnung zu einer [Kategorie](./kategorien.md)
   - **Beschreibung** – optionaler Zusatz (z. B. „Frisch gezapft")
   - **Preis** (Pflicht)
3. Optional: Laden Sie ein **Bild hoch** oder wählen Sie ein **Icon** aus der Icon-Bibliothek.
4. Optional: Fügen Sie über **+ Gruppe hinzufügen** Optionsgruppen hinzu (z. B. „Beilage" mit Auswahlmöglichkeiten).
5. Klicken Sie auf **Erstellen**.

![Produkt erstellen](/img/screens/de/products-dialog.png)

## Produktliste

Die Tabelle zeigt pro Produkt **Name**, **Kategorie**, **Preis**, **Bestand** und **Status** (z. B. *Verfügbar*). Über die Aktions-Schaltflächen am Zeilenende **bearbeiten** oder **löschen** Sie ein Produkt.

## Bestandsverfolgung

Die Spalte **Bestand** zeigt, wie viele Einheiten eines Produkts laut System noch vorhanden sind. So erkennt das Kassenpersonal frühzeitig, wenn ein Produkt zur Neige geht.

So funktioniert die Bestandsverfolgung:

- **Verkauf reduziert den Bestand.** Wird ein Produkt an der Kasse verkauft, sinkt sein Bestand automatisch um die verkaufte Menge.
- **Kein Bestand hinterlegt (`-`).** Steht in der Spalte ein Strich, wird für dieses Produkt **kein** Bestand geführt – es bleibt unabhängig von der Menge verkaufbar. Das ist sinnvoll für Artikel ohne sinnvolle Stückzahl (z. B. frisch zubereitete Speisen).
- **Status.** Der Status (z. B. *Verfügbar*) signalisiert, ob ein Produkt aktuell an der Kasse angeboten wird.

### Zusammenhang mit der Inventur

Den Anfangsbestand und spätere Korrekturen erfassen Sie über das Modul **[Inventur](./inventur.md)**:

1. **Anfangsbestand erfassen** – Legen Sie vor dem Fest eine Inventur an und tragen Sie die vorhandenen Mengen je Produkt ein. Dieser Wert erscheint anschließend in der Spalte **Bestand**.
2. **Laufender Betrieb** – Während des Verkaufs zählt OpenEOS die verkauften Mengen vom Bestand ab. Sie sehen also jederzeit den rechnerisch verbleibenden Bestand.
3. **Schlussinventur** – Nach dem Fest erfassen Sie den tatsächlich verbliebenen Bestand. Die Differenz zwischen erwartetem und gezähltem Bestand hilft, **Verbrauch und Schwund** nachzuvollziehen.

:::tip[Bestand gezielt einsetzen]
Führen Sie Bestände vor allem für Produkte, bei denen die Stückzahl wichtig ist (z. B. Getränkekisten, Pfandbecher). Für frei zubereitete Speisen können Sie die Bestandsführung weglassen, indem Sie keinen Anfangsbestand erfassen.
:::

## Produkte importieren

Statt jedes Produkt einzeln anzulegen, können Sie über **Importieren** mehrere Produkte gleichzeitig per **CSV-Datei** einlesen. Im Import-Dialog ordnen Sie die Spalten Ihrer Datei den OpenEOS-Feldern zu (Name, Preis, Kategorie usw.) und sehen vorab eine Vorschau, bevor der Import ausgeführt wird.

:::tip[Icons und Bilder]
Produkte ohne Foto wirken mit einem passenden **Icon** aus der Bibliothek übersichtlicher an der Kasse. Wählen Sie beim Anlegen einfach **Icon wählen**.
:::
