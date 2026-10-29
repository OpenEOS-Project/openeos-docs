---
sidebar_position: 17
title: Assistent
description: Speisekarte importieren und Icon-Vorschläge – was der Assistent kann, wie du ihn einschaltest und was mit deinen Daten passiert.
---

# Assistent

Der **Assistent** nimmt dir beim Einrichten einer Veranstaltung Arbeit ab. Er ist je Organisation ausgeschaltet, bis ein Admin ihn einschaltet, und taucht danach nur dort auf, wo er hilft: bei den Produkten.

## Was der Assistent kann

- **Speisekarte importieren** – Du lädst Fotos oder eine PDF deiner Speisekarte hoch oder fügst sie als Text ein. Daraus entsteht ein Vorschlag für Kategorien und Produkte mit Preis, Mehrwertsteuer, Pfand, Größenvarianten und Icon, den du in einer Tabelle prüfst, anpasst und erst dann anlegst. Schritt für Schritt beschrieben unter [Produkte → Aus Speisekarte importieren](./produkte.md#aus-speisekarte-importieren).
- **Icon-Vorschläge** – Im Produktformular steht neben dem Icon-Feld der Knopf **Vorschlag**. Er schlägt zum Produktnamen bis zu drei passende [Produkt-Icons](./produkte.md#icons) vor; ein Tipp übernimmt eines. Beim Speisekarten-Import bekommt jede Zeile automatisch solche Vorschläge.

Mehr macht der Assistent nicht. Er bestellt nichts, kassiert nichts und ändert nichts, was du nicht vorher in einer Vorschau bestätigt hast.

:::info[Vorschläge können Fehler enthalten]
Preise, Steuersätze oder Zuordnungen können danebenliegen – vor allem bei schlecht lesbaren Fotos. Prüfe die Vorschau, bevor du Produkte anlegst. Zeilen, bei denen sich der Assistent nicht sicher ist, sind in der Vorschau markiert.
:::

## Einschalten

1. Öffne **Einstellungen → Organisation → Assistent**.
2. Schalte **Assistent-Funktionen** ein.

Ein- und ausschalten können nur **Admins** der Organisation; der Schalter wird im Protokoll festgehalten. Danach sehen alle, die Produkte bearbeiten dürfen, auf der Produktseite den Knopf **Aus Speisekarte importieren** und im Produktformular den Knopf **Vorschlag**.

Solange der Assistent aus ist, steht für Admins auf der Produktseite ein kurzer Hinweis mit Link zu den Einstellungen.

:::note[„Nicht eingerichtet“]
Steht in den Einstellungen statt des Schalters der Hinweis **Nicht eingerichtet**, ist auf diesem Server kein Anbieter für den Assistenten hinterlegt. Auf [app.openeos.de](https://app.openeos.de) ist das erledigt; wer OpenEOS selbst betreibt, richtet ihn nach [Assistent einrichten](./selbst-betreiben/assistent.md) ein.
:::

## Tageskontingent

Damit der Assistent für alle bezahlbar bleibt, gibt es je Organisation und Kalendertag ein Kontingent:

| Funktion | Standard je Tag |
|---|---|
| Speisekarten-Importe | 5 |
| Icon-Vorschläge | 500 |

Wie viel heute noch übrig ist, zeigt der Abschnitt **Tageskontingent** in den Einstellungen und – beim Import – der Fuß des Dialogs („Heute noch 3 Importe“). Um Mitternacht (deutsche Zeit) beginnt der Zähler von vorn. Ein Import, der fehlschlägt, kostet kein Kontingent. Die meisten Icon-Vorschläge kommen ohne Anfrage an den Anbieter aus und zählen gar nicht erst.

Wer OpenEOS selbst betreibt, legt die Grenzen selbst fest.

## Datenschutz

Für diese Funktionen werden die hochgeladenen Inhalte – Speisekarten als Foto, PDF oder Text sowie Produktnamen – an einen **externen Anbieter** übertragen und dort verarbeitet. Dabei gilt:

- Übertragen wird nur, was für die jeweilige Funktion nötig ist: die Speisekarte beziehungsweise die Produktnamen. Keine Bestellungen, keine Umsätze, keine Mitgliederdaten.
- Der Anbieter speichert die Inhalte nur für die Dauer der Verarbeitung und nutzt sie **nicht zum Trainieren** seiner Modelle.
- Auf dem OpenEOS-Server liegen hochgeladene Dateien nur, bis du den Vorschlag übernimmst oder verwirfst – spätestens **nach 24 Stunden** werden sie gelöscht. Der Vorschlag selbst (die erkannte Liste) bleibt 30 Tage, falls du ihn noch einmal brauchst. Die Dateien sind nicht öffentlich erreichbar.

Welcher Anbieter das ist und auf welcher Grundlage die Verarbeitung erfolgt, steht in der [Datenschutzerklärung](https://openeos.de/privacy). Wer den Assistenten nicht nutzen möchte, lässt ihn einfach ausgeschaltet – alles andere in OpenEOS funktioniert unverändert.
