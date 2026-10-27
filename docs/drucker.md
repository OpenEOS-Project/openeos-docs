---
sidebar_position: 12
title: Drucker
description: Drucker-Agent verbinden, gefundene Drucker übernehmen, Vorlagen und Bon-Workflows verwalten.
---

# Drucker

Im Bereich **Drucker** verbindest du deine Bondrucker mit OpenEOS und legst fest, wie und wohin gedruckt wird. Der Bereich ist in drei Reiter gegliedert: **Drucker**, **Vorlagen** und **Bon-Workflows**.

OpenEOS druckt auf gängigen **ESC/POS-Bondruckern** – Epson, Star, Bixolon und die meisten No-Name-Geräte mit 58 oder 80 mm Papier – per USB oder über das Netzwerk. Die Verbindung zwischen Drucker und OpenEOS stellt der **Drucker-Agent** her.

## Der Drucker-Agent

Der Drucker-Agent ist ein kleines Programm, das auf einem **Windows- oder Linux-PC** (auch einem Raspberry Pi) im selben Netz wie deine Drucker läuft. Er

- findet angeschlossene **USB-Drucker**, in Windows eingerichtete **Windows-Drucker** und **Netzwerkdrucker** von selbst und meldet sie an OpenEOS,
- hält die Verbindung zu OpenEOS und druckt die Bons, die OpenEOS ihm schickt,
- merkt sich angenommene Aufträge und druckt sie nach einem Neustart nach.

Welcher Drucker wofür zuständig ist, stellst du nicht am PC ein, sondern hier in der Web-App. Auf dem PC gibt es nach dem Verbinden nichts mehr zu konfigurieren.

Ein Agent bedient beliebig viele Drucker. Stehen Drucker in getrennten Netzen – etwa Küche und Ausschank mit eigenem WLAN –, läuft an jedem Ort ein eigener Agent.

## Drucker-Agent verbinden

1. Lade den Agent von der [Download-Seite](https://github.com/OpenEOS-Project/openeos-printer-agent/releases/latest) herunter: für Windows `openeos-printer-agent-windows-x64.exe`, für Linux `openeos-printer-agent-linux-x64`, für einen Raspberry Pi 4/5 mit 64-Bit-System `openeos-printer-agent-linux-arm64`. Der Knopf **Drucker-Agent verbinden** oben im Reiter **Drucker** zeigt dieselben Links.
2. Starte den Agent einmal von Hand, damit du den Code siehst:
   - **Windows**: Eingabeaufforderung öffnen, in den Ordner der Datei wechseln und ausführen:
     ```
     openeos-printer-agent-windows-x64.exe run --server-url https://api.openeos.de/api
     ```
   - **Linux**: Terminal öffnen, Datei ausführbar machen und starten:
     ```bash
     chmod +x openeos-printer-agent-linux-x64
     ./openeos-printer-agent-linux-x64 run --server-url https://api.openeos.de/api
     ```
3. Der Agent zeigt einen **sechsstelligen Code** – groß im Fenster und zusätzlich auf seiner Statusseite unter `http://localhost:8080`.
4. Klicke in OpenEOS unter **Drucker** auf **Drucker-Agent verbinden**, gib den Code ein und vergib einen Namen, etwa „Drucker-PC Küche“.
5. Nach wenigen Sekunden erscheint der Agent in der Liste mit Rechnername, Betriebssystem und Version, meldet sich **Online** und sucht sofort nach Druckern.

Der Agent merkt sich die Verbindung; beim nächsten Start braucht er keinen Code mehr. Damit er von selbst mit dem PC startet, richtest du ihn danach als Dienst ein:

- **Windows**: Eingabeaufforderung **als Administrator** öffnen und `openeos-printer-agent-windows-x64.exe install-service --server-url https://api.openeos.de/api` ausführen. Der Dienst „OpenEOS Printer Agent“ startet ab jetzt mit Windows.
- **Linux**: `sudo ./install.sh --server-url https://api.openeos.de/api --binary ./openeos-printer-agent-linux-x64` aus dem [Quellverzeichnis](https://github.com/OpenEOS-Project/openeos-printer-agent) richtet einen systemd-Dienst samt USB-Rechten ein.

Alle Einzelheiten – Speicherorte, Protokolle, Raspberry Pi, Aktualisieren – stehen unter [Drucker-Agent installieren](./selbst-betreiben/drucker.md). Die Anleitung dort gilt auch für app.openeos.de; die Server-Adresse ist dann `https://api.openeos.de/api`.

:::note[Warum ein Code]
Am Drucker-PC muss sich niemand anmelden. Der Agent zeigt eine Zahl, du gibst sie in deinem Konto ein – so gehört der Agent eindeutig zu deiner Organisation, und niemand sonst kann über ihn drucken.
:::

## Gefundene Drucker

Unter jedem Agent zeigt der Reiter **Drucker** den Bereich **Gefundene Drucker**: alles, was der Agent entdeckt hat, mit Bezeichnung, Verbindung und **zuletzt gesehen**. Gefunden werden

- **USB-Drucker**, die am PC des Agents angeschlossen und eingeschaltet sind (Linux);
- **Windows-Drucker**: alle in Windows eingerichteten Drucker – so bindest du unter Windows auch USB-Drucker an. Virtuelle Drucker wie „Microsoft Print to PDF“ bleiben außen vor;
- **Netzwerkdrucker**, die sich per mDNS/Bonjour im Netz bekannt machen.

Der Agent sucht beim Start und danach alle fünf Minuten. Mit **Neu suchen** stößt du die Suche sofort an. Setzt du dabei das Häkchen **Auch Netzwerk durchsuchen (Port 9100)**, prüft der Agent zusätzlich alle Adressen seines Netzes auf Port 9100 – das findet auch Netzwerkdrucker, die sich nicht von selbst melden, dauert aber ein paar Sekunden länger.

Ein gefundener Drucker ist noch nicht nutzbar. Erst mit **Übernehmen** wird er zu einem Drucker deiner Organisation:

1. Klicke beim gefundenen Drucker auf **Übernehmen**.
2. Vergib einen **Namen**, z. B. „Küche“ oder „Kasse Theke“.
3. Wähle den **Typ**: **Kassenbon** für Bons an Gäste, **Küchenbon** für Produktionsbons an Küche, Grill oder Theke, **Etikett** für Etikettendrucker.
4. Wähle die **Papierbreite** (58 oder 80 mm) und kreuze **Kassenschublade angeschlossen** an, wenn eine Kassenlade am Drucker hängt. Nur dann kann die Kasse die Lade bei Barzahlung über diesen Drucker öffnen.
5. Bestätige. Der Drucker erscheint in der Liste seines Agents.

Schon übernommene Drucker sind im Bereich **Gefundene Drucker** mit **Übernommen** markiert; bei jedem Eintrag steht außerdem, wie er gefunden wurde (USB, mDNS, Netzwerksuche, Windows-Spooler). Steckst du einen USB-Drucker an einen anderen Anschluss oder bekommt ein Netzwerkdrucker eine neue IP-Adresse, erkennt ihn der Agent in der Regel wieder – an der Seriennummer bzw. der MAC-Adresse.

## Drucker manuell anlegen

Findet der Agent einen Netzwerkdrucker nicht – etwa weil er in einem anderen Netz steht –, legst du ihn mit **Drucker manuell anlegen** an. Du gibst **IP-Adresse** und **Port** (fast immer 9100) ein, dazu Name, Typ, Papierbreite und Kassenlade wie beim Übernehmen. Der Drucker muss vom PC des Agents aus erreichbar sein.

Manuell lassen sich nur Netzwerkdrucker anlegen. USB- und Windows-Drucker kann nur der Agent finden; dort hilft der Abschnitt [Wenn etwas nicht klappt](#wenn-etwas-nicht-klappt).

## Testdruck

Neben jedem übernommenen Drucker steht **Testdruck**. OpenEOS schickt einen kurzen Bon über den Agent an den Drucker; kommt er heraus, stimmt die ganze Kette aus Agent, Verbindung und Drucker. Mach den Testdruck nach dem Übernehmen und noch einmal vor dem Fest, wenn Drucker umgezogen sind.

Über **Drucker bearbeiten** änderst du Name, Typ, Papierbreite und Kassenschublade jederzeit; bei Netzwerkdruckern auch IP-Adresse und Port. Mit dem Schalter **Drucker aktiv** nimmst du einen Drucker vorübergehend aus dem Betrieb: Deaktivierte Drucker bekommen keine Bons und lassen sich nicht mehr zuordnen. **Drucker entfernen** löscht den Drucker und löst seine Zuordnungen in Standorten, Bon-Workflows und Kassen; findet der Agent ihn weiterhin, kannst du ihn später erneut übernehmen.

## Drucker zuordnen

Ein übernommener Drucker druckt erst, wenn etwas an ihn gerichtet wird. Drei Stellen legen das fest:

- **Standorte** – jeder [Standort](./standorte.md) (Küche, Grill, Ausgabe) hat seinen Drucker; dort landen die Küchenbons der Produkte, die über Kategorie oder Produkt zu diesem Standort gehören.
- **Bon-Workflows** – im Reiter [Bon-Workflows](#bon-workflows) bestimmst du, welche Bon-Arten automatisch gedruckt werden, und kannst je Bon-Art einen festen Drucker setzen.
- **Kassen-Gerät** – im Reiter **Drucker** eines [Geräts](./geraete.md#drucker) wählst du den **Standarddrucker** der Kasse (für Kassenbons und als Rückfall, wenn kein Standort passt) und den Drucker, an dem die **Kassenschublade** hängt.

In all diesen Auswahllisten stehen nur übernommene Drucker. Gefundene, aber noch nicht übernommene Drucker tauchen dort nicht auf.

## Status und Online

Agent und Drucker zeigen in der Liste, ob sie **Online** sind, dazu **zuletzt gesehen**. Der Agent meldet sich alle 30 Sekunden; bleibt die Meldung aus, gilt er als **Offline** – der PC ist aus, der Agent läuft nicht oder hat keine Verbindung ins Internet. Ein Drucker gilt als Offline, wenn der Agent ihn nicht erreicht: ausgeschaltet, abgesteckt oder nicht im Netz.

Aufträge, die der Agent schon angenommen hat, gehen bei einem Neustart nicht verloren; er druckt sie nach, sobald der Drucker wieder da ist.

Taucht ein Bereich **Drucker ohne Agent** auf, hängen diese Drucker an keinem verbundenen Agent mehr und können nicht drucken – etwa weil der Agent-PC ausgetauscht wurde. Entferne sie und übernimm die Drucker beim neuen Agent.

## Agent entfernen

**Agent entfernen** löscht den Agent mit allen seinen Druckern aus deiner Organisation; Zuordnungen in Standorten, Bon-Workflows, Kassen und Produkten werden gelöst. Der Agent auf dem PC kann danach nicht mehr drucken.

Soll derselbe PC später wieder drucken, lösche dort die Datei `device.json` im Datenverzeichnis des Agents (Windows `%ProgramData%\OpenEOS Printer Agent`, Linux `/var/lib/openeos-printer`) und starte den Agent neu – er zeigt dann einen neuen Code, den du wie oben eingibst.

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

## Wenn etwas nicht klappt

**Der Agent erscheint nach der Code-Eingabe nicht oder bleibt Offline.** Läuft der Agent noch? Beim Handstart beendet ihn das Schließen des Fensters – richte ihn als Dienst ein. Prüfe, ob der PC ins Internet kommt, und ob die Server-Adresse mit `/api` endet. Den Code findest du jederzeit auf der Statusseite `http://localhost:8080` des Agents oder in seinem Protokoll.

**USB-Drucker wird unter Linux nicht gefunden oder druckt nicht.** Meist fehlen die Rechte. `install.sh` legt dafür udev-Regeln an; ohne sie sieht der Agent den Drucker höchstens als Kennung, kann aber nicht drucken. `lsusb` zeigt, ob der Drucker überhaupt da ist. Was zu tun ist, steht unter [USB-Rechte unter Linux](./selbst-betreiben/drucker.md#usb-rechte-unter-linux).

**USB-Drucker wird unter Windows nicht gefunden.** Unter Windows nutzt der Agent die eingerichteten Windows-Drucker. Richte den Drucker in Windows ein – mit dem Treiber des Herstellers oder mit dem eingebauten Treiber **Generic / Text Only** am USB-Anschluss –, drucke eine Windows-Testseite und klicke dann auf **Neu suchen**.

**Netzwerkdrucker wird nicht gefunden.** Die Suche braucht mDNS (UDP 5353) und, mit Häkchen, Port 9100 ins lokale Netz; eine Firewall oder ein VPN auf dem Agent-PC kann beides blockieren. Lege den Drucker dann [manuell](#drucker-manuell-anlegen) mit seiner IP-Adresse an. Am Drucker muss der Rohdruck auf Port 9100 aktiv sein (oft „RAW“ oder „JetDirect“ genannt).

**Der Drucker steht in einem anderen Netz.** Die automatische Suche sieht nur das Netz des Agent-PCs. Lege den Drucker manuell per IP-Adresse an, wenn er von dort erreichbar ist; sonst stell einen zweiten Agent in das andere Netz.

**Der Testdruck kommt nicht.** Ist der Drucker in der Liste Online? Papier drin, Deckel zu? Hast du bei Windows-Druckern den richtigen Eintrag übernommen (derselbe Drucker kann einmal als Windows-Drucker und einmal als USB-Drucker erscheinen – nimm den Windows-Drucker)? Hilft das nicht, zeigt das Protokoll des Agents den Fehler; wo es liegt, steht unter [Drucker-Agent installieren](./selbst-betreiben/drucker.md#wenn-nichts-ankommt).
