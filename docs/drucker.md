---
sidebar_position: 12
title: Drucker
description: Bondrucker, Vorlagen und Bon-Workflows verwalten.
---

# Drucker

Im Bereich **Drucker** verwalten Sie Ihre Bondrucker sowie deren Vorlagen und Druck-Abläufe. OpenEOS unterstützt ESC/POS-Drucker, die über den OpenEOS Drucker-Agent angebunden werden. Der Bereich ist in drei Reiter gegliedert: **Drucker**, **Vorlagen** und **Bon-Workflows**.

![Drucker](/img/screens/de/printers.png)

## Drucker

Im Reiter **Drucker** sehen Sie die Ihrer Organisation zugewiesenen Geräte. Jeder Drucker ist mit einem **Drucker-Agent** (dem OpenEOS Drucker-Agent auf einem Raspberry Pi oder Linux-Rechner) verknüpft, der den eigentlichen Druck übernimmt. Solange noch kein Drucker eingerichtet ist, erscheint hier ein entsprechender Hinweis.

Ein Drucker-Agent kann auf zwei Wegen an Ihre Organisation angebunden werden:

- **Vorab eingerichtet durch den Plattform-Administrator**: Der Agent wird mit einem festen Gerätetoken konfiguriert und ist damit von Anfang an Ihrer Organisation zugeordnet. Wenden Sie sich an Ihren Administrator, wenn Sie diesen Weg nutzen möchten.
- **Selbstregistrierung des Agents**: Läuft ein Drucker-Agent ohne konfiguriertes Gerätetoken, meldet er sich beim Start selbstständig an und zeigt einen **Verifizierungscode** an (z. B. auf der lokalen Status-Seite oder im Log). Diesen Code geben Sie im OpenEOS-Dashboard ein, um den Agent Ihrer Organisation zuzuweisen. Danach steht der Agent im Reiter **Drucker** beim Anlegen eines neuen Druckers zur Auswahl.

## Vorlagen

Im Reiter **Vorlagen** legen Sie fest, wie Bons aussehen – etwa Küchenbon, Getränkebon oder Kassenbon. Vorlagen bestimmen Inhalt und Layout des Ausdrucks (Kopfzeile, Positionen, Hinweise, Fußzeile).

![Drucker – Vorlagen](/img/screens/de/printers-templates.png)

## Bon-Workflows

Im Reiter **Bon-Workflows** definieren Sie, welche Bons bei welchem Ereignis gedruckt werden – z. B. „Bei neuer Bestellung Küchenbon am Standort Küche drucken". So steuern Sie automatisiert, dass die richtigen Bons an der richtigen Stelle ausgegeben werden.

![Drucker – Bon-Workflows](/img/screens/de/printers-workflows.png)

## Zusammenspiel mit Standorten

Drucker entfalten ihren Nutzen im Zusammenspiel mit [Standorten](./standorte.md): Bestellpositionen werden an den zuständigen Standort weitergeleitet und dort über die hinterlegte Vorlage und den passenden Workflow gedruckt.
