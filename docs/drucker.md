---
sidebar_position: 12
title: Drucker
description: Bondrucker, Vorlagen und Bon-Workflows verwalten.
---

# Drucker

Im Bereich **Drucker** verwaltest du deine Bondrucker sowie deren Vorlagen und Druck-Abläufe. OpenEOS unterstützt ESC/POS-Drucker, die über den OpenEOS Drucker-Agent angebunden werden. Der Bereich ist in drei Reiter gegliedert: **Drucker**, **Vorlagen** und **Bon-Workflows**.

![Drucker](/img/screens/de/printers.png)

## Drucker

Im Reiter **Drucker** siehst du die deiner Organisation zugewiesenen Drucker. Jeder Drucker ist mit einem **Drucker-Agent** (dem OpenEOS Drucker-Agent auf einem Raspberry Pi oder Linux-Rechner) verknüpft, der den eigentlichen Druck übernimmt. Solange noch kein Drucker eingerichtet ist, steht hier **Noch keine Drucker registriert**.

Ein Drucker-Agent kann auf zwei Wegen an deine Organisation angebunden werden:

- **Vorab eingerichtet durch den Plattform-Administrator**: Der Agent wird mit einem festen Gerätetoken konfiguriert und ist damit von Anfang an deiner Organisation zugeordnet. Wende dich an deinen Administrator, wenn du diesen Weg nutzen möchtest.
- **Selbstregistrierung des Agents**: Läuft ein Drucker-Agent ohne konfiguriertes Gerätetoken, meldet er sich beim Start selbstständig an und zeigt einen **Verifizierungscode** an (z. B. auf der lokalen Status-Seite oder im Log). Diesen Code gibst du im OpenEOS-Dashboard ein, um den Agent deiner Organisation zuzuweisen. Danach steht der Agent im Reiter **Drucker** beim Anlegen eines neuen Druckers zur Auswahl.

## Vorlagen

Im Reiter **Vorlagen** legst du fest, wie Bons aussehen – etwa Küchenbon, Getränkebon oder Kassenbon. Vorlagen bestimmen Inhalt und Layout des Ausdrucks (Kopfzeile, Positionen, Hinweise, Fußzeile).

![Drucker – Vorlagen](/img/screens/de/printers-templates.png)

## Bon-Workflows

Im Reiter **Bon-Workflows** legst du fest, welche Bons automatisch gedruckt werden. Es gibt drei Bon-Arten, jede mit eigenem Schalter:

- **Küchenbon** – bei neuen Bestellungen für die Küche. Wähle den **Modus**: **1 Bon pro Bestellung**, **1 Bon pro Produkt mit Barcode** oder **1 Bon pro Standort**.
- **Bestellbon** – für den Ausgabebereich oder zur Bestellbestätigung.
- **Kassenbon** – nach der Zahlung. Als **Auslöser** wählst du **Bei Zahlung**, **Bei Bestellungsabschluss** oder **Manuell**.

Ist eine Bon-Art ausgeschaltet, steht dort **Diese Bons werden nicht automatisch gedruckt.** Für jede Bon-Art wählst du außerdem:

- **Override-Drucker** – ein fester Drucker. Ohne Angabe gilt die **Routing-Kette**: Drucker des Produkt-Standorts, sonst des Kategorie-Standorts, sonst der Standard-Drucker des Geräts.
- **Standard-Vorlage** – eine eigene [Vorlage](#vorlagen) oder die eingebaute.

Mit **Speichern** übernimmst du die Einstellungen einer Bon-Art.

![Drucker – Bon-Workflows](/img/screens/de/printers-workflows.png)

## Zusammenspiel mit Standorten

Drucker entfalten ihren Nutzen im Zusammenspiel mit [Standorten](./standorte.md): Bestellpositionen werden an den zuständigen Standort weitergeleitet und dort über die hinterlegte Vorlage und den passenden Bon-Workflow gedruckt. Den Drucker eines Standorts wählst du im Dialog des Standorts.
