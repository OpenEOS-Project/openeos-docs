---
sidebar_position: 6
title: Produkte
description: Produkte anlegen, bepreisen, mit Icons versehen und per CSV oder aus der Speisekarte importieren.
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

Ist der [Assistent](./assistent.md) eingeschaltet, steht neben dem Icon-Feld zusätzlich **Vorschlag**: Gib zuerst den Namen ein, dann zeigt OpenEOS bis zu drei passende Produkt-Icons, die du antippst.

![Icon-Vorschlag im Produktformular](/img/screens/de/product-icon-suggestion.png)

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

## Aus Speisekarte importieren

Hast du deine Speisekarte schon – als Aushang, Flyer oder PDF –, musst du sie nicht abtippen. Mit **Aus Speisekarte importieren** liest OpenEOS sie ein und macht daraus einen Vorschlag für Kategorien und Produkte, den du prüfst und dann in einem Schritt anlegst. Diese Funktion gehört zum [Assistenten](./assistent.md); ein Admin schaltet ihn unter **Einstellungen → Organisation → Assistent** ein. Solange er aus ist, steht an dieser Stelle ein Hinweis mit Link zu den Einstellungen.

:::info[Vorschläge können Fehler enthalten]
Der Vorschlag ist ein Entwurf. Preis, Steuersatz oder Kategorie können danebenliegen – prüfe die Tabelle, bevor du anlegst. Es wird nichts angelegt, was du nicht ausgewählt hast.
:::

### Ablauf

1. Klicke auf der Produktseite auf **Aus Speisekarte importieren**. Der Import gilt für die aktive Veranstaltung.
2. Wähle, woher die Speisekarte kommt:
   - **Fotos oder PDF** – zieh die Dateien in das Feld oder wähle sie aus. Bis zu **6 Bilder** (JPG, PNG, WebP) oder **eine PDF**, jeweils höchstens 10 MB. Eine PDF geht nur allein, nicht gemischt mit Bildern.
   - **Text** – füge die Speisekarte als Text ein, so wie sie dasteht, zum Beispiel aus einer Tabelle oder einer E-Mail. Überschriften werden zu Kategorien, „0,3 l 3,00 / 0,5 l 4,00“ zu Varianten, „zzgl. 2 € Pfand“ zum Pfand-Hinweis.

   ![Speisekarte hochladen](/img/screens/de/products-menu-import-upload.png)

3. Klicke auf **Auswerten**. Das Lesen dauert meist unter einer Minute; du kannst den Dialog so lange offen lassen oder mit **Abbrechen** verwerfen.
4. Prüfe die **Vorschau** – eine Tabelle mit allen erkannten Produkten:

   ![Vorschau des Speisekarten-Imports](/img/screens/de/products-menu-import-preview.png)

   - **Übernehmen** – das Häkchen am Zeilenanfang. Nur angehakte Zeilen werden angelegt; über den Kopf der Spalte wählst du alle aus oder ab.
   - **Name** – frei änderbar. Ein farbiger Punkt daneben bedeutet, dass sich der Assistent bei Preis oder Zuordnung nicht sicher war (*Unsicher bei Preis oder Zuordnung* bzw. *Geraten – bitte besonders prüfen*); fahr mit der Maus darüber.
   - **Kategorie** – die Auswahl zeigt die vorhandenen [Kategorien](./kategorien.md) der Veranstaltung und die neu erkannten mit dem Zusatz **neu**. Neue Kategorien werden beim Anlegen mit erstellt.
   - **Preis (€)** und **MwSt.** – wie auf der Karte erkannt, mit Steuersatz-Vorschlag. Hat deine Organisation **Keine Umsatzsteuer** eingestellt, stehen alle Zeilen auf 0 %.
   - **Pfand** – stand auf der Karte ein Pfand („+ 2 € Pfand“), zeigt die Zeile *Auf der Karte: 2,00 € Pfand*. Wähle den passenden [Pfand-Typ](./pfand.md) aus; gibt es noch keinen, lege ihn vorher an.
   - **Varianten** – Größen wie 0,3 l und 0,5 l werden zu **einem** Produkt mit Varianten zusammengefasst, jeweils mit Name und **Aufpreis** gegenüber dem Grundpreis. Du kannst Varianten ergänzen oder entfernen; sie landen als Optionsgruppe am Produkt.
   - **Icon** – ein Produkt-Icon ist meist schon vorgeschlagen; daneben stehen bis zu drei Alternativen zum Antippen. Mit **Produkt-Icon wählen** öffnest du die volle Auswahl.
   - **bereits vorhanden** – gibt es in der Veranstaltung schon ein Produkt mit diesem Namen, bekommt die Zeile diese Markierung und eine Auswahl **Aktualisieren** (übernimmt Preis, Steuersatz, Varianten und Icon in das bestehende Produkt) oder **Neu anlegen**.

   Fehlt einer Zeile etwas Wichtiges (*Name fehlt*, *Preis unlesbar*, *Kategorie fehlt*), steht das rot an der Zeile; ergänze es oder nimm das Häkchen heraus. Über der Tabelle stehen unter **Hinweise** Dinge, die dem Assistenten aufgefallen sind, etwa ein unleserlicher Preis.
5. Klicke auf **N Produkte anlegen** (bzw. **… anlegen, … aktualisieren**). Danach erscheinen die Produkte in der Liste und eine Meldung fasst zusammen, wie viele Produkte und Kategorien angelegt wurden.

Bestand, Favoriten und Beschreibungen bearbeitest du anschließend wie gewohnt im Produkt. Im Fuß des Dialogs siehst du, wie viele Importe dir heute noch bleiben – standardmäßig fünf je Tag, siehe [Tageskontingent](./assistent.md#tageskontingent).

### Tipps für gute Fotos

- **Eine Seite je Foto**, gerade von oben, ohne Finger oder Spiegelungen. Lieber sechs Einzelfotos als ein Foto der ganzen Tafel.
- **Scharf und hell** – im Zweifel das Foto kurz anschauen: Kannst du die Preise lesen, kann es der Assistent auch.
- **Nah ran** – die Speisekarte soll das Bild ausfüllen, nicht der Tisch drumherum.
- **Handschrift und Kreidetafeln** funktionieren, wenn sie gut lesbar sind; bei krakeliger Schrift sind die markierten Zeilen genauer zu prüfen.
- Hast du die Karte als Datei (Word, Excel, PDF), nimm die **PDF** oder kopiere den **Text** – das ist genauer als ein Foto vom Bildschirm.

