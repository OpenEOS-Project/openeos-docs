---
sidebar_position: 6
title: Produkte
description: Produkte anlegen, bepreisen, mit Icons versehen und per CSV oder aus der Speisekarte importieren.
---

# Produkte

Unter **Produkte** verwaltest du das Sortiment deiner aktiven Veranstaltung – also alles, was an der Kasse verkauft wird. Jedes Produkt hat mindestens einen Namen und einen Preis und kann einer Kategorie zugeordnet werden.

:::warning[Aktive Veranstaltung nötig]
Produkte gehören immer zu einer Veranstaltung. Ist keine aktiv, erscheint der Hinweis „Keine aktive Veranstaltung“. Aktiviere zuerst eine [Veranstaltung](./veranstaltungen.md).
:::

![Produktübersicht](/img/screens/de/products.png)

## Produkt erstellen

1. Klicke oben rechts auf **Produkt erstellen** (Plus-Symbol).
2. Fülle die Felder aus:
   - **Name** (Pflicht)
   - **Kategorie** (Pflicht) – Zuordnung zu einer [Kategorie](./kategorien.md); über das Plus daneben legst du direkt eine neue an
   - **Beschreibung** – optionaler Zusatz (z. B. „Frisch gezapft“)
   - **Preis** (Pflicht)
   - **Mehrwertsteuer** – Regelsatz, ermäßigter Satz oder **0 % (nicht steuerbar)**, etwa für Spenden oder Mitgliedsbeiträge. Weist deine Organisation keine Umsatzsteuer aus (Kleinunternehmer), gibt es nur **0 % (steuerfrei, § 19 UStG)**.
   - **Standort** – leer lassen, dann gilt der [Standort](./standorte.md) der Kategorie
   - **Pfand-Typ** – optional, siehe [Pfand](./pfand.md)
3. Optional: Wähle ein **Produkt-Icon** oder lade ein **Bild hoch** (siehe [Icons und Bilder](#icons)).
4. Optional: Füge über **Gruppe hinzufügen** Optionsgruppen hinzu (z. B. „Beilage“ mit Auswahlmöglichkeiten) – als **Einfachauswahl**, **Mehrfachauswahl** oder **Zutatenliste**.
5. Optional: Schalte **Favorit** ein, damit das Produkt an der Kasse ganz oben steht (siehe [Favoriten](#favoriten)). **Aktiv** und **Verfügbar** sind voreingestellt; **Bestand verfolgen** siehe [Bestandsverfolgung](#bestandsverfolgung).
6. Klicke auf **Erstellen**.

![Produkt erstellen](/img/screens/de/products-dialog.png)

## Produktliste

Die Tabelle zeigt pro Produkt **Name**, **Kategorie**, **Preis**, **Bestand** und **Status** (*Verfügbar*, *Nicht verfügbar*, *Ausverkauft* oder *Inaktiv*). Über die Symbole am Zeilenende **bearbeitest** du ein Produkt, **passt den Bestand an** (nur mit Bestandsverfolgung) oder **löschst** es. Der **Stern** in der Zeile macht ein Produkt zum Favoriten oder nimmt es wieder heraus.

Oben rechts über der Liste stehen drei Symbole: **Kategorien bearbeiten** (siehe [Kategorien](./kategorien.md)), **Importieren** (siehe [Produkte importieren](#produkte-importieren)) und **Produkt erstellen**.

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

- **Einschalten.** Im Produktdialog schaltest du **Bestand verfolgen** ein und trägst **Lagerbestand** und **Einheit** (z. B. Stück) ein.
- **Verkauf reduziert den Bestand.** Wird ein Produkt an der Kasse verkauft, sinkt sein Bestand automatisch um die verkaufte Menge.
- **Bestand anpassen.** Über das Symbol in der Zeile buchst du Wareneingänge oder Korrekturen: **Anpassungsmenge** und **Grund** eintragen, dann **Hinzufügen** oder **Abziehen**.
- **Kein Bestand (`-`).** Steht in der Spalte ein Strich, ist **Bestand verfolgen** aus – das Produkt bleibt unabhängig von der Menge verkaufbar. Das ist sinnvoll für Artikel ohne sinnvolle Stückzahl (z. B. frisch zubereitete Speisen).
- **Status.** *Verfügbar* heißt, das Produkt wird an der Kasse angeboten. Schaltest du **Verfügbar** aus, steht es als *Nicht verfügbar* da; ist der verfolgte Bestand aufgebraucht, als *Ausverkauft*.

### Zusammenhang mit der Inventur

Den Anfangsbestand und spätere Korrekturen erfasst du über das Modul **[Inventur](./inventur.md)**:

1. **Anfangsbestand erfassen** – Lege vor dem Fest eine Inventur an und trage die vorhandenen Mengen je Produkt ein. Die Inventur nimmt alle Produkte mit **Bestand verfolgen** auf; nach dem Abschließen erscheint der gezählte Wert in der Spalte **Bestand**.
2. **Laufender Betrieb** – Während des Verkaufs zählt OpenEOS die verkauften Mengen vom Bestand ab. Du siehst also jederzeit den rechnerisch verbleibenden Bestand.
3. **Schlussinventur** – Nach dem Fest erfasst du den tatsächlich verbliebenen Bestand. Die Differenz zwischen erwartetem und gezähltem Bestand hilft, **Verbrauch und Schwund** nachzuvollziehen.

:::tip[Bestand gezielt einsetzen]
Führe Bestände vor allem für Produkte, bei denen die Stückzahl wichtig ist (z. B. Getränkekisten, Pfandbecher). Für frei zubereitete Speisen lässt du **Bestand verfolgen** einfach aus.
:::

## Produkte importieren

Statt jedes Produkt einzeln anzulegen, öffnest du über das Symbol **Importieren** den Dialog **Produkte importieren**. Er hat zwei Reiter: **Speisekarte** (Fotos, PDF oder Text, siehe [unten](#aus-speisekarte-importieren)) und **CSV**. Ist der [Assistent](./assistent.md) aus, gibt es nur den Reiter **CSV**.

Im Reiter **CSV**:

1. Wähle unter **CSV-Datei oder Text** eine Datei aus (**Datei auswählen**) oder füge den Inhalt direkt ein. **Vorlage herunterladen** liefert eine Beispieldatei mit den passenden Spalten; welche das sind, erklärt **Spalten-Erklärung** (Pflicht sind `category`, `name` und `price`).
2. Lege unter **Duplikat-Behandlung** fest, was mit Produkten passiert, die es schon gibt: **Überspringen**, **Aktualisieren** oder **Immer neu anlegen**.
3. Klicke auf **Vorschau**. Die Tabelle zeigt je Zeile, ob angelegt, aktualisiert, übersprungen wird oder ein Fehler vorliegt, und welche Kategorien und Pfand-Typen neu angelegt werden.
4. Klicke auf **Import durchführen**.

## Aus Speisekarte importieren

Hast du deine Speisekarte schon – als Aushang, Flyer oder PDF –, musst du sie nicht abtippen. Im Reiter **Speisekarte** liest OpenEOS sie ein und macht daraus einen Vorschlag für Kategorien und Produkte, den du prüfst und dann in einem Schritt anlegst. Diese Funktion gehört zum [Assistenten](./assistent.md); ein Admin schaltet ihn unter **Einstellungen → Organisation → Assistent** ein. Solange er aus ist, sehen Admins über der Produktliste den Hinweis *Speisekarte importieren? Schalte dafür die Assistent-Funktionen ein.* mit dem Link **Zu den Einstellungen**.

:::info[Vorschläge können Fehler enthalten]
Der Vorschlag ist ein Entwurf. Preis, Steuersatz oder Kategorie können danebenliegen – prüfe die Tabelle, bevor du anlegst. Es wird nichts angelegt, was du nicht ausgewählt hast.
:::

### Ablauf

1. Klicke auf der Produktseite auf **Importieren** und wähle den Reiter **Speisekarte**. Der Import gilt für die aktive Veranstaltung.
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

