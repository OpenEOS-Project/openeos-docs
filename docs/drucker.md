---
sidebar_position: 12
title: Drucker
description: Drucker-Agent installieren und verbinden, gefundene Drucker übernehmen, Testdruck, Zuordnung zu Standorten und Kassen.
---

# Drucker

Im Bereich **Drucker** verbindest du deine Bondrucker mit OpenEOS und legst fest, wie und wohin gedruckt wird. Der Bereich hat drei Reiter: **Drucker**, **Vorlagen** und **Bon-Workflows**.

OpenEOS druckt auf gängigen **ESC/POS-Bondruckern** – Epson, Star, Bixolon und die meisten No-Name-Geräte mit 58 oder 80 mm Papier – per USB oder über das Netzwerk. Die Verbindung zwischen Drucker und OpenEOS stellt der **Drucker-Agent** her. Diese Seite führt dich einmal durch: Agent installieren, verbinden, Drucker übernehmen, Testdruck, Zuordnung.

## Der Drucker-Agent

Der Drucker-Agent ist ein kleines Programm, das auf einem **Windows- oder Linux-PC** (auch einem Raspberry Pi) im selben Netz wie deine Drucker läuft. Er

- findet angeschlossene **USB-Drucker**, in Windows eingerichtete **Windows-Drucker** und **Netzwerkdrucker** von selbst und meldet sie an OpenEOS,
- hält die Verbindung zu OpenEOS und druckt die Bons, die OpenEOS ihm schickt,
- merkt sich angenommene Aufträge und druckt sie nach einem Neustart nach.

Welcher Drucker wofür zuständig ist, stellst du nicht am PC ein, sondern hier in der Web-App. Auf dem PC gibt es nach dem Verbinden nichts mehr zu konfigurieren. Ein Agent bedient beliebig viele Drucker; stehen Drucker in getrennten Netzen – etwa Küche und Ausschank mit eigenem WLAN –, läuft an jedem Ort ein eigener Agent.

:::info[Eigener Server]
Der Agent ist für app.openeos.de und für eine eigene Installation derselbe. Ohne weitere Angabe verbindet er sich mit app.openeos.de. Betreibst du OpenEOS selbst, gibst du beim Start einmal `--server-url https://<dein-host>/api` an – siehe [Drucker-Agent für die eigene Installation](./selbst-betreiben/drucker.md).
:::

## Agent herunterladen und installieren

Alle Dateien liegen auf der [Download-Seite](https://github.com/OpenEOS-Project/openeos-printer-agent/releases/latest); die Knöpfe **Download Windows** und **Download Linux** im Reiter **Drucker** führen dorthin.

| Datei | Für |
|---|---|
| `openeos-printer-agent-windows-x64.exe` | Windows 10/11, 64 Bit |
| `openeos-printer-agent-linux-x64` | Linux-PC, 64 Bit |
| `openeos-printer-agent-linux-arm64` | Raspberry Pi 4/5 mit 64-Bit-Raspberry-Pi-OS |

### Windows

1. Lege die EXE an einem festen Ort ab, z. B. `C:\Program Files\OpenEOS\`.
2. Starte sie per Doppelklick. Ein Fenster öffnet sich und zeigt den **sechsstelligen Code** – gib ihn in OpenEOS ein (nächster Abschnitt). Danach schließt du das Fenster mit `Strg+C`.
3. Damit der Agent künftig mit Windows startet, richtest du ihn als Dienst ein: Eingabeaufforderung **als Administrator** öffnen (Rechtsklick → *Als Administrator ausführen*) und ausführen:
   ```
   cd "C:\Program Files\OpenEOS"
   openeos-printer-agent-windows-x64.exe install-service
   ```
   Der Dienst **OpenEOS Printer Agent** läuft ab sofort im Hintergrund und merkt sich die Verbindung aus Schritt 2. Hast du den Code noch nicht eingegeben, zeigt ihn der Dienst in `%ProgramData%\OpenEOS Printer Agent\logs\agent.log` und auf `http://localhost:8080`.

USB-Drucker bindest du unter Windows über die **Windows-Druckereinrichtung** an: Richte den Drucker in Windows ein – mit dem Treiber des Herstellers oder dem eingebauten Treiber **Generic / Text Only** am USB-Anschluss – und drucke eine Windows-Testseite. Der Agent meldet ihn dann als Windows-Drucker.

### Linux und Raspberry Pi

`install.sh` aus dem Quellverzeichnis richtet den Agent als Dienst ein (Autostart, USB-Rechte), wahlweise mit der fertigen Binärdatei oder aus dem Quellcode:

```bash
git clone https://github.com/OpenEOS-Project/openeos-printer-agent.git
cd openeos-printer-agent
sudo ./install.sh --binary ./openeos-printer-agent-linux-x64   # oder -linux-arm64 auf dem Pi
# ohne --binary: Installation aus dem Quellcode (Python ≥ 3.11)
```

Den Code liest du danach im Protokoll (`sudo journalctl -u openeos-printer -f`) oder im Browser auf `http://<ip-des-pcs>:8080` ab. Zum Ausprobieren reicht auch die Binärdatei allein – `chmod +x`, starten, fertig.

**Raspberry Pi:** Auf einem Pi 4 oder 5 mit 64-Bit-System nimm die `arm64`-Datei. Auf einem Pi 3 oder einem 32-Bit-System installierst du aus dem Quellcode (`install.sh` ohne `--binary`).

### Der Code

Beim ersten Start meldet sich der Agent bei OpenEOS an und zeigt einen **sechsstelligen Code** – im Fenster, im Protokoll und auf seiner Statusseite `http://localhost:8080`. Er wartet dann, bis du den Code eingegeben hast.

![Statusseite des Agents mit dem sechsstelligen Code](/img/screens/de/printer-agent-status-page.png)

:::note[Warum ein Code]
Am Drucker-PC muss sich niemand anmelden. Der Agent zeigt eine Zahl, du gibst sie in deinem Konto ein – so gehört der Agent eindeutig zu deiner Organisation, und niemand sonst kann über ihn drucken.
:::

## Agent in der Web-App verbinden

Solange kein Agent verbunden ist, zeigt der Reiter **Drucker** die Schritte und die Download-Links.

![Reiter Drucker ohne Agent: Schritte und Download-Links](/img/screens/de/printers-empty.png)

1. Klicke auf **Drucker-Agent verbinden**.
2. Gib den Code ein und klicke auf **Gerät suchen**.
3. Vergib einen Namen, etwa „Drucker-PC Küche“, und klicke auf **Verknüpfen**.

![Dialog „Drucker-Agent verbinden“ mit eingegebenem Code](/img/screens/de/printers-connect-agent.png)

Nach wenigen Sekunden erscheint der Agent in der Liste mit Rechnername, Betriebssystem und Version, meldet sich **Online** und sucht sofort nach Druckern. Beim nächsten Start braucht er keinen Code mehr.

## Gefundene Drucker

Unter jedem Agent zeigt der Reiter **Drucker** den Bereich **Gefundene Drucker**: alles, was der Agent entdeckt hat, mit Bezeichnung, Verbindung, **Gefunden per** (USB, mDNS, Netzwerksuche, Windows-Spooler) und **zuletzt gesehen**. Gefunden werden

- **USB-Drucker**, die am PC des Agents angeschlossen und eingeschaltet sind (Linux);
- **Windows-Drucker**: alle in Windows eingerichteten Drucker. Virtuelle Drucker wie „Microsoft Print to PDF“ bleiben außen vor;
- **Netzwerkdrucker**, die sich per mDNS/Bonjour im Netz bekannt machen.

Es funktionieren nur **ESC/POS-Bondrucker**. Bürodrucker (Laser, Tintenstrahl) und Geräte, die auf die Modellabfrage des Agents nicht antworten, blendet die Liste deshalb aus und zeigt nur einen Hinweis wie „2 weitere Geräte ausgeblendet“. Mit **Alle gefundenen Geräte anzeigen** siehst du auch diese Einträge, markiert mit **Kein Bondrucker** – übernehmen kannst du sie trotzdem, auf eigenes Risiko.

![Agent online mit dem Bereich „Gefundene Drucker“](/img/screens/de/printers-agent-discovered.png)

Der Agent sucht beim Start und danach alle fünf Minuten. Mit **Neu suchen** stößt du die Suche sofort an. Schaltest du dabei **Auch Netzwerk durchsuchen (Port 9100)** ein, prüft der Agent zusätzlich alle Adressen seines Netzes auf Port 9100 – das findet auch Netzwerkdrucker, die sich nicht von selbst melden, dauert aber ein paar Sekunden länger.

Steckst du einen USB-Drucker an einen anderen Anschluss oder bekommt ein Netzwerkdrucker eine neue IP-Adresse, erkennt ihn der Agent in der Regel wieder – an der Seriennummer bzw. der MAC-Adresse.

## Drucker übernehmen

Ein gefundener Drucker ist noch nicht nutzbar. Erst mit **Übernehmen** wird er zu einem Drucker deiner Organisation:

1. Klicke beim gefundenen Drucker auf **Übernehmen**.
2. Vergib einen **Namen**, z. B. „Küche“ oder „Theke“.
3. Wähle den **Druckertyp**: **Kassenbon** für Bons an Gäste, **Küchenbon** für Produktionsbons an Küche, Grill oder Theke, **Etikett** für Etikettendrucker.
4. Wähle die **Papierbreite** (58 oder 80 mm) und schalte **Kassenlade angeschlossen** ein, wenn eine Kassenlade am Drucker hängt. Nur dann kann die Kasse die Lade bei Barzahlung über diesen Drucker öffnen.
5. Bestätige mit **Übernehmen**. Der Drucker erscheint in der Liste seines Agents.

![Dialog „Drucker übernehmen“ mit Name, Typ und Papierbreite](/img/screens/de/printers-adopt-dialog.png)

Schon übernommene Drucker sind im Bereich **Gefundene Drucker** mit **Übernommen** markiert.

## Drucker manuell anlegen

Findet der Agent einen Netzwerkdrucker nicht – etwa weil er in einem anderen Netz steht –, legst du ihn mit **Drucker manuell anlegen** an. Du gibst **IP-Adresse** und **Port** (fast immer 9100) ein, dazu Name, Typ, Papierbreite und Kassenlade wie beim Übernehmen. Der Drucker muss vom PC des Agents aus erreichbar sein.

Manuell lassen sich nur Netzwerkdrucker anlegen. USB- und Windows-Drucker kann nur der Agent finden; dort hilft der Abschnitt [Wenn etwas nicht klappt](#wenn-etwas-nicht-klappt).

## Testdruck

Neben jedem übernommenen Drucker steht **Testdruck**. OpenEOS schickt einen kurzen Bon über den Agent an den Drucker; kommt er heraus, stimmt die ganze Kette aus Agent, Verbindung und Drucker. Mach den Testdruck nach dem Übernehmen und noch einmal vor dem Fest, wenn Drucker umgezogen sind.

![Übernommener Drucker online, Testdruck gesendet](/img/screens/de/printers-test-print.png)

## Drucker bearbeiten und entfernen

Über **Bearbeiten** änderst du Name, Typ, Papierbreite und Kassenlade jederzeit; bei Netzwerkdruckern auch IP-Adresse und Port. Mit dem Schalter **Drucker aktiv** nimmst du einen Drucker vorübergehend aus dem Betrieb: Deaktivierte Drucker bekommen keine Bons und lassen sich nicht mehr zuordnen.

**Löschen** entfernt den Drucker und löst seine Zuordnungen in Standorten, Bon-Workflows und Kassen; findet der Agent ihn weiterhin, kannst du ihn später erneut übernehmen.

## Drucker zuordnen

Ein übernommener Drucker druckt erst, wenn etwas an ihn gerichtet wird. Drei Stellen legen das fest:

- **Standorte** – jeder [Standort](./standorte.md) (Küche, Grill, Ausgabe) hat seinen Drucker; dort landen die Küchenbons der Produkte, die über Kategorie oder Produkt zu diesem Standort gehören.
- **Bon-Workflows** – im Reiter [Bon-Workflows](#bon-workflows) bestimmst du, welche Bon-Arten automatisch gedruckt werden, und kannst je Bon-Art einen festen Drucker setzen.
- **Kassen-Gerät** – im Reiter **Drucker** eines [Geräts](./geraete.md#drucker) wählst du den **Standarddrucker** der Kasse (für Kassenbons und als Rückfall, wenn kein Standort passt) und den Drucker, an dem die **Kassenlade** hängt.

![Standort anlegen mit ausgewähltem Drucker „Küche“](/img/screens/de/stations-dialog-printer.png)

:::tip[Standortdrucker brauchen „1 Bon pro Standort“]
Der Drucker eines Standorts wird nur benutzt, wenn der Küchenbon im Reiter **Bon-Workflows** im Modus **1 Bon pro Standort** (oder **1 Bon pro Produkt**) läuft. Im Modus **1 Bon pro Bestellung** geht der ganze Bon an den Standarddrucker der Kasse bzw. den Override-Drucker – die Standortdrucker bleiben still.
:::

In all diesen Auswahllisten stehen nur übernommene Drucker. Gefundene, aber noch nicht übernommene Drucker tauchen dort nicht auf.

## Status und Online

Agent und Drucker zeigen in der Liste, ob sie **Online** sind, dazu **zuletzt gesehen**. Der Agent meldet sich alle 30 Sekunden; bleibt die Meldung aus, gilt er als **Offline** – der PC ist aus, der Agent läuft nicht oder hat keine Verbindung ins Internet. Ein Drucker gilt als Offline, wenn der Agent ihn nicht erreicht: ausgeschaltet, abgesteckt oder nicht im Netz.

Aufträge, die der Agent schon angenommen hat, gehen bei einem Neustart nicht verloren; er druckt sie nach, sobald der Drucker wieder da ist. Taucht ein Bereich **Drucker ohne Agent** auf, hängen diese Drucker an keinem verbundenen Agent mehr – etwa weil der Agent-PC ausgetauscht wurde. Entferne sie und übernimm die Drucker beim neuen Agent.

Die Seite funktioniert auch auf dem Telefon – praktisch, um am Festtag kurz nachzusehen, ob alles Online ist:

<img src="/img/screens/de/printers-phone.png" alt="Die Seite „Drucker“ auf dem Telefon mit Agent und Drucker online" width="320" />

## Agent entfernen

**Agent entfernen** löscht den Agent mit allen seinen Druckern aus deiner Organisation; Zuordnungen in Standorten, Bon-Workflows, Kassen und Produkten werden gelöst. Der Agent auf dem PC kann danach nicht mehr drucken.

Soll derselbe PC später wieder drucken, musst du dort nichts löschen oder neu starten: Der laufende Agent merkt, dass er entfernt wurde, und zeigt von selbst einen **neuen Code** – im Protokoll und auf `http://localhost:8080`. Den gibst du wie oben ein. Ein in der Geräteliste **gesperrter** Agent koppelt sich dagegen nicht neu: Er wartet, prüft alle 60 Sekunden, ob die Sperre aufgehoben wurde, und verbindet sich dann wieder.

## Vorlagen

Im Reiter **Vorlagen** legst du fest, wie Bons aussehen – etwa Küchenbon, Getränkebon oder Kassenbon. Vorlagen bestimmen Inhalt und Layout des Ausdrucks (Kopfzeile, Positionen, Hinweise, Fußzeile).

![Drucker – Vorlagen](/img/screens/de/printers-templates.png)

## Bon-Workflows

Im Reiter **Bon-Workflows** legst du fest, welche Bons automatisch gedruckt werden. Es gibt drei Bon-Arten, jede mit eigenem Schalter:

- **Küchenbon** – bei neuen Bestellungen für die Küche. Wähle den **Modus**: **1 Bon pro Bestellung**, **1 Bon pro Produkt mit Barcode** oder **1 Bon pro Standort** (nötig, damit Standortdrucker benutzt werden).
- **Bestellbon** – für den Ausgabebereich oder zur Bestellbestätigung.
- **Kassenbon** – nach der Zahlung. Als **Auslöser** wählst du **Bei Zahlung**, **Bei Bestellungsabschluss** oder **Manuell**.

Ist eine Bon-Art ausgeschaltet, steht dort **Diese Bons werden nicht automatisch gedruckt.** Für jede Bon-Art wählst du außerdem:

- **Override-Drucker** – ein fester Drucker. Ohne Angabe gilt die **Routing-Kette**: Drucker des Produkt-Standorts, sonst des Kategorie-Standorts, sonst der Standarddrucker des Geräts.
- **Standard-Vorlage** – eine eigene [Vorlage](#vorlagen) oder die eingebaute.

Mit **Speichern** übernimmst du die Einstellungen einer Bon-Art.

![Drucker – Bon-Workflows](/img/screens/de/printers-workflows.png)

## Wenn etwas nicht klappt

**Der Agent erscheint nach der Code-Eingabe nicht oder bleibt Offline.** Läuft der Agent noch? Beim Handstart beendet ihn das Schließen des Fensters – richte ihn als Dienst ein. Prüfe, ob der PC ins Internet kommt. Den Code findest du jederzeit auf der Statusseite `http://localhost:8080` des Agents oder in seinem Protokoll (Windows: `%ProgramData%\OpenEOS Printer Agent\logs\agent.log`, Linux: `journalctl -u openeos-printer`).

**USB-Drucker wird unter Linux nicht gefunden oder druckt nicht.** Meist fehlen die Rechte. `install.sh` legt dafür udev-Regeln für die gängigen Hersteller an; ohne passende Regel sieht der Agent den Drucker höchstens als Kennung, kann aber nicht drucken. `lsusb` zeigt, ob der Drucker überhaupt da ist und welche Kennung er hat. Fehlt sein Hersteller in der Regel, ergänzt du ihn – wie, steht unter [USB-Rechte unter Linux](./selbst-betreiben/drucker.md#usb-rechte-unter-linux).

**USB-Drucker wird unter Windows nicht gefunden.** Unter Windows nutzt der Agent die eingerichteten Windows-Drucker. Richte den Drucker in Windows ein – mit dem Treiber des Herstellers oder mit dem eingebauten Treiber **Generic / Text Only** am USB-Anschluss –, drucke eine Windows-Testseite und klicke dann auf **Neu suchen**.

**Netzwerkdrucker wird nicht gefunden.** Die Suche braucht mDNS (UDP 5353) und, mit eingeschalteter Netzwerksuche, Port 9100 ins lokale Netz; eine Firewall auf dem Agent-PC kann beides blockieren. Lege den Drucker dann [manuell](#drucker-manuell-anlegen) mit seiner IP-Adresse an. Am Drucker muss der Rohdruck auf Port 9100 aktiv sein (oft „RAW“ oder „JetDirect“ genannt).

**Der Drucker steht in einem anderen Netz.** Die automatische Suche sieht nur das Netz des Agent-PCs. Lege den Drucker manuell per IP-Adresse an, wenn er von dort erreichbar ist; sonst stell einen zweiten Agent in das andere Netz.

**Der Agent-PC hängt in einem VPN.** Übernimmt das VPN die Standardroute, sucht der Agent im falschen Netz. Trag in seiner Konfiguration `discovery.subnet` mit dem Netz der Drucker ein (siehe [Konfiguration](./selbst-betreiben/drucker.md#die-konfiguration)) oder lege die Drucker manuell per IP an.

**Der Testdruck kommt nicht.** Ist der Drucker in der Liste Online? Papier drin, Deckel zu? Hast du bei Windows-Druckern den richtigen Eintrag übernommen (derselbe Drucker kann einmal als Windows-Drucker und einmal als USB-Drucker erscheinen – nimm den Windows-Drucker)? Hilft das nicht, zeigt das Protokoll des Agents den Fehler.
