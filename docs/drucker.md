---
sidebar_position: 12
title: Drucker
description: Drucker-Agent installieren (Windows-Installer, Linux), Fenster und Infobereich, verbinden, gefundene Drucker übernehmen, Testdruck, Zuordnung zu Standorten und Kassen.
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
| `openeos-printer-agent-setup-windows-x64.exe` | **Windows 10/11 – empfohlen:** Installer mit Hintergrunddienst und Programmfenster |
| `openeos-printer-agent-windows-x64.exe` | Windows, nur der Dienst ohne Fenster (für Admins, Kommandozeile) |
| `openeos-printer-agent-linux-x64` | Linux-PC, 64 Bit (Ubuntu 22.04 oder neuer, Debian 11 oder neuer) |
| `openeos-printer-agent-linux-arm64` | Raspberry Pi 4/5 mit 64-Bit-Raspberry-Pi-OS |
| `openeos-printer-agent-ui-linux-x64` / `-arm64` | Programmfenster für Linux-Rechner mit Bildschirm (Ubuntu 22.04+, Debian 12+, Raspberry Pi OS Bookworm mit Desktop) |

### Windows

1. Lade `openeos-printer-agent-setup-windows-x64.exe` herunter und starte die Datei per Doppelklick. Windows fragt, ob die App Änderungen vornehmen darf – bestätige mit **Ja**.

   :::note[„Der Computer wurde durch Windows geschützt“]
   Der Installer ist noch nicht digital signiert. Erscheint diese Meldung, klickst du auf **Weitere Informationen** und dann auf **Trotzdem ausführen**.
   :::

2. Lass **Beim Anmelden im Infobereich starten** angehakt – dann ist das Fenster nach jedem Neustart unten rechts in der Taskleiste. Eine Verknüpfung auf dem Desktop ist optional.

   ![Installer: Aufgaben auswählen](/img/screens/de/printer-agent-setup-tasks.png)

3. **Server:** Nutzt du app.openeos.de, lässt du die Adresse so. Nur wenn du OpenEOS selbst betreibst, trägst du hier die Adresse deiner API ein (siehe [Drucker-Agent für die eigene Installation](./selbst-betreiben/drucker.md)).

   ![Installer: Server-Adresse](/img/screens/de/printer-agent-setup-server.png)

4. Klicke auf **Installieren** und am Ende auf **Fertigstellen**. Der Installer richtet den Hintergrunddienst **OpenEOS Printer Agent** ein (er startet mit Windows und druckt auch, wenn niemand angemeldet ist) und öffnet das Fenster **OpenEOS Drucker-Agent**.

   ![Installer: fertig](/img/screens/de/printer-agent-setup-finish.png)

Für ein Update startest du einfach den neuen Installer: Kopplung, Server und Drucker bleiben erhalten. Deinstallieren kannst du den Agent unter **Einstellungen → Apps**; auch dann bleiben Kopplung und Einstellungen in `%ProgramData%\OpenEOS Printer Agent` liegen, ein späteres Neuinstallieren braucht keinen neuen Code.

USB-Drucker bindest du unter Windows über die **Windows-Druckereinrichtung** an: Richte den Drucker in Windows ein – mit dem Treiber des Herstellers oder dem eingebauten Treiber **Generic / Text Only** am USB-Anschluss – und drucke eine Windows-Testseite. Der Agent meldet ihn dann als Windows-Drucker.

### Linux-PC oder Laptop mit Bildschirm

`install.sh` aus dem Quellverzeichnis richtet den Agent als Dienst ein (Autostart, USB-Rechte). Findet es einen Desktop, installiert es zusätzlich das Programmfenster mit Eintrag im Anwendungsmenü und Autostart im Infobereich. Lege dafür beide Dateien in denselben Ordner:

```bash
git clone https://github.com/OpenEOS-Project/openeos-printer-agent.git
cd openeos-printer-agent
# openeos-printer-agent-linux-x64 und openeos-printer-agent-ui-linux-x64 hierher herunterladen
sudo ./install.sh --binary ./openeos-printer-agent-linux-x64
```

Danach findest du **OpenEOS Drucker-Agent** im Anwendungsmenü; nach der nächsten Anmeldung startet es von selbst im Infobereich. Das Fenster ist dasselbe wie unter Windows:

![Das Fenster des Drucker-Agents unter Linux (Xfce)](/img/screens/de/printer-agent-linux.png)

Unter GNOME braucht der Infobereich die Erweiterung *AppIndicator* (bei Ubuntu schon dabei).

### Raspberry Pi ohne Bildschirm

Auf einem Pi, der nur neben dem Drucker steht, läuft der Agent ohne Fenster als Dienst – genau wie bisher:

```bash
git clone https://github.com/OpenEOS-Project/openeos-printer-agent.git
cd openeos-printer-agent
sudo ./install.sh --binary ./openeos-printer-agent-linux-arm64
# ohne --binary: Installation aus dem Quellcode (Python ≥ 3.11), z. B. auf einem Pi 3 oder 32-Bit-System
```

Den Code liest du danach im Protokoll (`sudo journalctl -u openeos-printer -f`) oder im Browser eines anderen Geräts im selben Netz auf `http://<ip-des-pi>:8080`. Auf einem Pi 4 oder 5 mit 64-Bit-System nimm die `arm64`-Datei.

### Der Code

Beim ersten Start meldet sich der Agent bei OpenEOS an und zeigt einen **achtstelligen Code** – groß im Fenster, dazu im Protokoll und auf seiner Statusseite. Er wartet dann, bis du den Code eingegeben hast. Ein Code gilt 15 Minuten; danach zeigt der Agent von selbst einen neuen.

![Das Fenster des Drucker-Agents zeigt den Code](/img/screens/de/printer-agent-window-code.png)

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

Nach wenigen Sekunden erscheint der Agent in der Liste mit Rechnername, Betriebssystem und Version, meldet sich **Online** und sucht sofort nach Druckern. Das Fenster auf dem PC wechselt gleichzeitig von selbst zur Übersicht: **Verbunden**, mit dem Namen deiner Organisation. Beim nächsten Start braucht er keinen Code mehr.

![Zwei verbundene Agents: ein Windows-Laptop und ein Raspberry Pi, jeweils mit übernommenem Drucker](/img/screens/de/printers-agent-online.png)

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

Den gleichen Testdruck startest du auch direkt am PC: im Fenster des Agents über **Testdruck** neben dem Drucker. Der kommt ohne Umweg über den Server heraus – praktisch, um beim Aufbau zu prüfen, welcher Drucker welcher ist.

## Das Fenster des Drucker-Agents

Das Fenster zeigt auf einen Blick, ob am PC alles läuft:

![Fenster des Drucker-Agents: verbunden, ein Drucker online](/img/screens/de/printer-agent-window-connected.png)

- **Oben rechts** der Zustand: *Verbunden* (grün), *Noch nicht verbunden* mit Code (blau), *Drucker-Problem* (orange) oder *Keine Verbindung* / *Agent läuft nicht* (rot).
- **Verbindung:** Organisation, Server und ob der Hintergrunddienst läuft.
- **Drucker:** alle übernommenen Drucker mit Anschluss, *Online*/*Offline*, offenen, gedruckten und fehlgeschlagenen Aufträgen seit dem Start, wann zuletzt gedruckt wurde – und je Drucker der Knopf **Testdruck**.
- **Fehler und Warnungen:** die letzten Meldungen der vergangenen 24 Stunden, etwa „Drucker nicht erreichbar“.
- **Ruhezustand:** ob der Agent den Rechner gerade wach hält (siehe unten).
- Unten **OpenEOS öffnen** (die Web-App, Reiter Drucker), **Statusseite**, **Protokolle** (öffnet den Ordner mit den Protokolldateien) und **Dienst neu starten** – über den kleinen Pfeil daneben auch *Dienst starten* und *Dienst stoppen*.

Das Fenster ist nur die Anzeige. Gedruckt wird vom **Hintergrunddienst** – auch wenn das Fenster geschlossen ist oder niemand angemeldet ist. Ist der Dienst gestoppt, sagt das Fenster das deutlich und bietet **Dienst starten** an:

![Fenster: der Hintergrunddienst ist gestoppt](/img/screens/de/printer-agent-window-stopped.png)

### Infobereich

Schließt du das Fenster mit dem **X**, verschwindet es nur in den **Infobereich** unten rechts neben der Uhr. Das Symbol zeigt den Zustand mit einem farbigen Punkt – grün, orange, blau oder rot wie oben. Ein Klick auf das Symbol öffnet das Fenster wieder, ein Rechtsklick zeigt das Menü:

![Infobereich mit dem Symbol des Drucker-Agents und seinem Menü](/img/screens/de/printer-agent-tray.png)

**Beenden** schließt nur das Fenster-Programm; gedruckt wird weiter. Siehst du das Symbol nicht, steckt es hinter dem kleinen Pfeil **^** – zieh es von dort in die Taskleiste, dann hast du es immer im Blick. Geht die Verbindung verloren oder fällt ein Drucker aus, meldet sich der Agent dort auch mit einer kurzen Nachricht.

## Laptop und Ruhezustand

Ein Laptop, der in den Ruhezustand geht, druckt nicht. Unter Windows verhindert der Agent deshalb, dass der Rechner **von selbst** einschläft, solange er mit OpenEOS verbunden ist; der Bildschirm darf trotzdem ausgehen. Im Fenster steht das im Reiter **Ruhezustand**:

![Reiter Ruhezustand im Fenster des Agents](/img/screens/de/printer-agent-window-power.png)

Was der Agent **nicht** verhindern kann – Windows schickt den Laptop trotzdem schlafen, wenn

- du den **Deckel zuklappst** und in den Energieoptionen für das Zuklappen „Energie sparen“ eingestellt ist,
- jemand den **Ein-/Aus-Knopf** drückt oder **Start → Energie sparen** wählt,
- der **Akku** leer wird.

Für das Fest stellst du deshalb einmal in Windows unter **Systemsteuerung → Energieoptionen → Auswählen, was beim Zuklappen des Computers geschehen soll** „Beim Zuklappen: **Nichts unternehmen**“ (mit Netzteil) ein – der Knopf **Energieoptionen** im Reiter Ruhezustand führt direkt dorthin – und lässt den Laptop am Netzteil. Bei manchen WLAN- und Netzwerkadaptern lohnt außerdem: **Geräte-Manager → Netzwerkadapter → Eigenschaften → Energieverwaltung**, Haken bei „Computer kann das Gerät ausschalten, um Energie zu sparen“ entfernen.

Ist der Laptop doch eingeschlafen, verbindet sich der Agent nach dem Aufwachen sofort neu und druckt, was inzwischen wartet.

Unter Linux hält der Agent den Rechner nur wach, wenn `install.sh` einen Desktop gefunden hat (oder `power.keep_awake: true` in der Konfiguration steht); das Zuklappen schickt den Laptop auch dort trotzdem schlafen.

## Drucker bearbeiten und entfernen

Über **Bearbeiten** änderst du Name, Typ, Papierbreite und Kassenlade jederzeit; bei Netzwerkdruckern auch IP-Adresse und Port. Mit dem Schalter **Drucker aktiv** nimmst du einen Drucker vorübergehend aus dem Betrieb: Deaktivierte Drucker bekommen keine Bons und lassen sich nicht mehr zuordnen.

**Löschen** entfernt den Drucker und löst seine Zuordnungen in Standorten, Bon-Workflows und Kassen; findet der Agent ihn weiterhin, kannst du ihn später erneut übernehmen.

## Drucker zuordnen

Ein übernommener Drucker druckt erst, wenn etwas an ihn gerichtet wird. Drei Stellen legen das fest:

- **Standorte** – jeder [Standort](./standorte.md) (Küche, Grill, Ausgabe) hat seinen Drucker; dort landen die Küchenbons der Produkte, die über Kategorie oder Produkt zu diesem Standort gehören.
- **Bon-Workflows** – im Reiter [Bon-Workflows](#bon-workflows) bestimmst du, welche Bon-Arten automatisch gedruckt werden, und kannst je Bon-Art einen festen Drucker setzen.
- **Kassen-Gerät** – im Reiter **Drucker** eines [Geräts](./geraete.md#drucker) wählst du den **Standarddrucker** der Kasse (für Kassenbons und als Rückfall, wenn kein Standort passt) und unter **Kassenschublade** den Drucker, an dem die Kassenlade hängt.

![Standort anlegen mit ausgewähltem Drucker „Küche“](/img/screens/de/stations-dialog-printer.png)

:::tip[Standortdrucker brauchen „1 Bon pro Standort“]
Der Drucker eines Standorts wird nur benutzt, wenn der Küchenbon im Reiter **Bon-Workflows** im Modus **1 Bon pro Standort** (oder **1 Bon pro Produkt mit Barcode**) läuft. Im Modus **1 Bon pro Bestellung** geht der ganze Bon an den Standarddrucker der Kasse bzw. den Override-Drucker – die Standortdrucker bleiben still.
:::

In all diesen Auswahllisten stehen nur übernommene Drucker. Gefundene, aber noch nicht übernommene Drucker tauchen dort nicht auf.

## Status und Online

Agent und Drucker zeigen in der Liste, ob sie **Online** sind, dazu **zuletzt gesehen**. Der Agent meldet sich alle 30 Sekunden; bleibt die Meldung aus, gilt er als **Offline** – der PC ist aus, der Agent läuft nicht oder hat keine Verbindung ins Internet. Ein Drucker gilt als Offline, wenn der Agent ihn nicht erreicht: ausgeschaltet, abgesteckt oder nicht im Netz.

Aufträge, die der Agent schon angenommen hat, gehen bei einem Neustart nicht verloren; er druckt sie nach, sobald der Drucker wieder da ist. Taucht ein Bereich **Drucker ohne Agent** auf, hängen diese Drucker an keinem verbundenen Agent mehr – etwa weil der Agent-PC ausgetauscht wurde. Entferne sie und übernimm die Drucker beim neuen Agent.

Die Seite funktioniert auch auf dem Telefon – praktisch, um am Festtag kurz nachzusehen, ob alles Online ist:

<img src="/img/screens/de/printers-phone.png" alt="Die Seite „Drucker“ auf dem Telefon mit Agent und Drucker online" width="320" />

## Agent entfernen

**Agent entfernen** löscht den Agent mit allen seinen Druckern aus deiner Organisation; Zuordnungen in Standorten, Bon-Workflows, Kassen und Produkten werden gelöst. Der Agent auf dem PC kann danach nicht mehr drucken.

Soll derselbe PC später wieder drucken, musst du dort nichts löschen oder neu starten: Der laufende Agent merkt, dass er entfernt wurde, und zeigt von selbst einen **neuen Code** – im Fenster, im Protokoll und auf seiner Statusseite. Den gibst du wie oben ein. Ein in der Geräteliste **gesperrter** Agent koppelt sich dagegen nicht neu: Er wartet, prüft alle 60 Sekunden, ob die Sperre aufgehoben wurde, und verbindet sich dann wieder.

## Vorlagen

Im Reiter **Vorlagen** legst du fest, wie Bons aussehen – etwa Küchenbon, Getränkebon oder Kassenbon. Vorlagen bestimmen Inhalt und Layout des Ausdrucks (Kopfzeile, Positionen, Hinweise, Fußzeile).

![Drucker – Vorlagen](/img/screens/de/printers-templates.png)

### Bedienung und Gerät auf dem Bon

Mit den Elementen **Bedienung** und **Gerät** (Gruppe **Bestellung**) siehst du auf dem Bon, wer die Bestellung aufgenommen hat. So weiß die Küche oder Theke, wen sie bei Rückfragen ansprechen kann.

![Bon-Editor: Elemente „Bedienung“ und „Gerät“](/img/screens/de/printers-template-waiter.png)

- **Bedienung** – wer die Bestellung aufgenommen hat. Arbeitet die Kasse mit [Bedienungen](./bedienungen.md), steht hier die erste vorhandene Angabe: wer die Runde gesendet hat ▸ verantwortliche Bedienung des Tisches ▸ angemeldetes Mitglied ▸ Name des Geräts. Ob der Kurzname oder der volle Name erscheint, legst du unter [Name auf Bons](./bedienungen.md#einstellungen) fest. Ohne Bedienungen steht hier der **Name des Geräts**; gehört ein Bestellgerät fest einer Person, gib ihm unter **Geräte** einfach ihren Namen, etwa „Handy Markus“. Bei Bestellungen, die jemand in der Verwaltung (ohne Gerät) anlegt, steht hier dessen Name.
- **Gerät** – immer der Name des Geräts, mit dem die Bestellung aufgenommen wurde.

Wie andere Felder kannst du beide frei platzieren, ausrichten, **fett** oder **groß** drucken und die Beschriftung ändern (Standard: „Bedienung: “ bzw. „Gerät: “). Ohne Namen – etwa bei Online- und QR-Bestellungen – fällt die Zeile samt Beschriftung weg.

Der Standard-Küchenbon zeigt die Bedienung unter der Bestellzeit. Auf dem Kassenbon für Gäste steht sie nur, wenn du das Element selbst in deine Vorlage ziehst.

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

**Der Agent erscheint nach der Code-Eingabe nicht oder bleibt Offline.** Schau ins Fenster des Agents: Steht dort *Agent läuft nicht*, klicke auf **Dienst starten**; steht dort *Keine Verbindung*, kommt der PC nicht ins Internet. Den Code zeigt das Fenster, solange der Agent nicht verbunden ist. Ohne Fenster findest du ihn auf der Statusseite `http://localhost:8080` oder im Protokoll (Windows: `%ProgramData%\OpenEOS Printer Agent\logs\agent.log`, Linux: `journalctl -u openeos-printer`).

**Der Agent ist abends Offline, morgens wieder da.** Fast immer ist der Laptop eingeschlafen – siehe [Laptop und Ruhezustand](#laptop-und-ruhezustand).

**Das Fenster sagt „Agent antwortet nicht“, obwohl der Dienst läuft.** Ein anderes Programm belegt wahrscheinlich Port 8080. Klicke auf **Dienst neu starten**; hilft das nicht, schau mit **Protokolle** in `agent.log`, und stelle bei Bedarf in der Konfiguration einen anderen Port ein (`local_server.port`).

**USB-Drucker wird unter Linux nicht gefunden oder druckt nicht.** Meist fehlen die Rechte. `install.sh` legt dafür udev-Regeln für die gängigen Hersteller an; ohne passende Regel sieht der Agent den Drucker höchstens als Kennung, kann aber nicht drucken. `lsusb` zeigt, ob der Drucker überhaupt da ist und welche Kennung er hat. Fehlt sein Hersteller in der Regel, ergänzt du ihn – wie, steht unter [USB-Rechte unter Linux](./selbst-betreiben/drucker.md#usb-rechte-unter-linux).

**USB-Drucker wird unter Windows nicht gefunden.** Unter Windows nutzt der Agent die eingerichteten Windows-Drucker. Richte den Drucker in Windows ein – mit dem Treiber des Herstellers oder mit dem eingebauten Treiber **Generic / Text Only** am USB-Anschluss –, drucke eine Windows-Testseite und klicke dann auf **Neu suchen**.

**Netzwerkdrucker wird nicht gefunden.** Die Suche braucht mDNS (UDP 5353) und, mit eingeschalteter Netzwerksuche, Port 9100 ins lokale Netz; eine Firewall auf dem Agent-PC kann beides blockieren. Lege den Drucker dann [manuell](#drucker-manuell-anlegen) mit seiner IP-Adresse an. Am Drucker muss der Rohdruck auf Port 9100 aktiv sein (oft „RAW“ oder „JetDirect“ genannt).

**Der Drucker steht in einem anderen Netz.** Die automatische Suche sieht nur das Netz des Agent-PCs. Lege den Drucker manuell per IP-Adresse an, wenn er von dort erreichbar ist; sonst stell einen zweiten Agent in das andere Netz.

**Der Agent-PC hängt in einem VPN.** Übernimmt das VPN die Standardroute, sucht der Agent im falschen Netz. Trag in seiner Konfiguration `discovery.subnet` mit dem Netz der Drucker ein (siehe [Konfiguration](./selbst-betreiben/drucker.md#die-konfiguration)) oder lege die Drucker manuell per IP an.

**Der Testdruck kommt nicht.** Ist der Drucker in der Liste Online? Papier drin, Deckel zu? Hast du bei Windows-Druckern den richtigen Eintrag übernommen (derselbe Drucker kann einmal als Windows-Drucker und einmal als USB-Drucker erscheinen – nimm den Windows-Drucker)? Hilft das nicht, zeigt das Protokoll des Agents den Fehler.
