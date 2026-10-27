---
sidebar_position: 5
title: Drucker-Agent installieren
description: Den Drucker-Agent auf Windows oder Linux als Dienst einrichten und mit der eigenen Installation verbinden.
---

# Drucker-Agent installieren

Bons druckt OpenEOS nicht direkt, sondern über den **Drucker-Agent**: ein
kleines Programm auf einem Windows- oder Linux-PC (auch einem Raspberry Pi)
neben den Druckern. Es findet USB- und Netzwerkdrucker selbst, meldet sie an
den Server und wartet über eine dauerhafte Verbindung auf Druckaufträge.
Welche Drucker benutzt werden und wofür, legt die Organisation in der
Web-App fest — der Ablauf steht im [Drucker-Kapitel](../drucker.md) des Handbuchs.

Diese Seite beschreibt die Installation als Dienst. Für den Einzelbetrieb
ändert sich gegenüber app.openeos.de nur eines: die Server-Adresse.

## Die Server-Adresse

Der Agent braucht genau eine Angabe, `server_url`: die Adresse **deiner**
API, **mit** `/api` am Ende.

| Installation | `server_url` |
|---|---|
| Eigener Server im Festnetz | `http://192.168.1.50:3000/api` |
| Eigener Server hinter Reverse-Proxy | `https://kasse.mein-verein.de/api` |
| app.openeos.de | `https://api.openeos.de/api` |

Der Agent muss den Server dauerhaft erreichen — auch per WebSocket, siehe
[Installation](./installation.md). Alles Weitere (Druckerliste, Zuordnung)
kommt vom Server; auf dem PC wird nichts konfiguriert.

## Download

Auf der [Release-Seite](https://github.com/OpenEOS-Project/openeos-printer-agent/releases/latest)
liegen drei fertige Dateien ohne weitere Abhängigkeiten, dazu `SHA256SUMS`:

| Datei | Für |
|---|---|
| `openeos-printer-agent-windows-x64.exe` | Windows 10/11, 64 Bit |
| `openeos-printer-agent-linux-x64` | Linux-PC, 64 Bit |
| `openeos-printer-agent-linux-arm64` | Raspberry Pi 4/5 mit 64-Bit-Raspberry-Pi-OS |

Alternativ läuft der Agent aus dem Quellcode (`pip install .`, Python ≥ 3.11)
oder im Container, siehe unten.

## Windows

1. Lege die EXE an einem festen Ort ab, z. B. `C:\Program Files\OpenEOS\`.
2. Koppeln: Eingabeaufforderung öffnen und den Agent einmal im Vordergrund
   starten, damit du den Code siehst:
   ```
   cd "C:\Program Files\OpenEOS"
   openeos-printer-agent-windows-x64.exe run --server-url https://kasse.mein-verein.de/api
   ```
   Gib den sechsstelligen Code in der Web-App unter **Drucker → Drucker-Agent
   verbinden** ein. Sobald „Paired“ erscheint, beendest du den Agent mit
   `Strg+C`. (`pair` statt `run` tut dasselbe und beendet sich nach dem
   Koppeln von selbst.)
3. Dienst einrichten: Eingabeaufforderung **als Administrator** öffnen
   (Rechtsklick → *Als Administrator ausführen*):
   ```
   openeos-printer-agent-windows-x64.exe install-service --server-url https://kasse.mein-verein.de/api
   ```
   Der Dienst **OpenEOS Printer Agent** startet sofort und künftig mit Windows.
4. Entfernen: `openeos-printer-agent-windows-x64.exe remove-service`, ebenfalls
   als Administrator.

Alles, was der Agent speichert, liegt in `%ProgramData%\OpenEOS Printer Agent`:
`config.yaml`, `device.json` (die Kopplung), `print-jobs.db` (offene Aufträge)
und `logs\agent.log`. Der Dienst zeigt kein Fenster — den Code und den Zustand
siehst du im Log und auf `http://localhost:8080`.

:::info[USB-Drucker unter Windows]
Unter Windows druckt der Agent über die **Windows-Druckerwarteschlange**.
Richte den Drucker in Windows ein — mit dem Treiber des Herstellers oder mit
dem eingebauten Treiber **Generic / Text Only** am USB-Anschluss —, drucke eine
Windows-Testseite, und der Agent meldet ihn als Windows-Drucker. Ein
WinUSB-Treiber ist nicht nötig. Virtuelle Drucker (PDF, XPS, OneNote, Fax)
werden nicht gemeldet.
:::

## Linux und Raspberry Pi

`install.sh` aus dem Quellverzeichnis richtet alles ein — wahlweise mit der
fertigen Binärdatei oder aus dem Quellcode mit Python:

```bash
git clone https://github.com/OpenEOS-Project/openeos-printer-agent.git
cd openeos-printer-agent

# mit Binärdatei (kein Python nötig):
sudo ./install.sh --server-url https://kasse.mein-verein.de/api --binary ./openeos-printer-agent-linux-x64

# oder aus dem Quellcode:
sudo ./install.sh --server-url https://kasse.mein-verein.de/api
```

Das Skript legt den Systembenutzer `openeos` an, installiert udev-Regeln für
USB-Bondrucker, schreibt `/opt/openeos-printer-agent/config/config.yaml` und
startet den systemd-Dienst `openeos-printer` (Autostart). Den Code liest du
danach im Protokoll oder auf der Statusseite ab:

```bash
sudo journalctl -u openeos-printer -f      # Code steht groß im Protokoll
# oder im Browser: http://<ip-des-pi>:8080
```

| Was | Wo |
|---|---|
| Konfiguration | `/opt/openeos-printer-agent/config/config.yaml` |
| Daten (Kopplung, Auftragswarteschlange, Vorlagen-Cache) | `/var/lib/openeos-printer` |
| Protokoll | `/var/log/openeos-printer/agent.log` und `journalctl -u openeos-printer` |
| Dienst | `systemctl status openeos-printer` |

**Raspberry Pi:** Auf einem Pi 4 oder 5 mit 64-Bit-Raspberry-Pi-OS nimm die
`arm64`-Binärdatei. Auf einem Pi 3 oder einem 32-Bit-System gibt es keine
Binärdatei — dort installierst du aus dem Quellcode (`install.sh` ohne
`--binary`). Ein Pi Zero reicht nicht.

### USB-Rechte unter Linux

Der Agent läuft als Benutzer `openeos` ohne Root-Rechte und darf USB-Drucker
nur über die udev-Regel in `/etc/udev/rules.d/99-openeos-printer.rules`
ansprechen. Sie erfasst Geräte der USB-Druckerklasse und diese Hersteller:

| Vendor-ID | Hersteller |
|---|---|
| `04b8` | Epson |
| `0519` | Star Micronics |
| `1504` | Bixolon |
| `0dd4` | Custom |
| `0416` | Winbond (viele No-Name-Drucker) |
| `28e9` | GD Microelectronics |
| `0483` | STMicroelectronics |
| `6868` | generische China-Drucker |
| `1fc9` | NXP |

Fehlt dein Drucker, zeigt `lsusb` seine Kennung (`ID xxxx:yyyy`, der erste
Teil ist die Vendor-ID). Ergänze eine Zeile nach demselben Muster und lade
die Regeln neu:

```bash
lsusb
sudo nano /etc/udev/rules.d/99-openeos-printer.rules
sudo udevadm control --reload-rules && sudo udevadm trigger
ls -l /dev/bus/usb/*/*       # Gruppe plugdev, Rechte rw
sudo systemctl restart openeos-printer
```

Ohne passende Regel listet der Agent den Drucker zwar (nur mit Kennung, ohne
Seriennummer), kann aber nicht auf ihm drucken.

### Binärdatei ohne Dienst

Zum Ausprobieren reicht die Binärdatei allein; ohne Root-Rechte landen die
Daten in `~/.local/share/openeos-printer`:

```bash
curl -LO https://github.com/OpenEOS-Project/openeos-printer-agent/releases/latest/download/openeos-printer-agent-linux-x64
chmod +x openeos-printer-agent-linux-x64
./openeos-printer-agent-linux-x64 run --server-url https://kasse.mein-verein.de/api
```

### Im Container

Ein fertiges Image gibt es nicht; das Repository enthält ein `Dockerfile`:

```bash
docker build -t openeos-printer-agent .
docker run -d --name openeos-printer --network host \
  -v openeos-printer-data:/var/lib/openeos-printer \
  -e OPENEOS_PRINTER_DATA_DIR=/var/lib/openeos-printer \
  openeos-printer-agent run --server-url https://kasse.mein-verein.de/api
```

`--network host` ist nötig, damit mDNS und der Netzwerk-Scan funktionieren;
für USB-Drucker reichst du das Gerät mit `--device` durch. Den Code zeigt
`docker logs openeos-printer`.

## Die Konfiguration

Pflicht ist nur `server_url`. Alles andere hat sinnvolle Vorgaben; ein
vollständiges Beispiel liegt im Repository unter `config/config.example.yaml`.

```yaml
server_url: "https://kasse.mein-verein.de/api"

logging:
  level: INFO                   # DEBUG, INFO, WARNING, ERROR

local_server:
  port: 8080                    # Statusseite und Code

discovery:
  interval_s: 300               # automatische Suche alle 5 Minuten
  # subnet: "192.168.1.0/24"   # welches /24 der Netzwerk-Scan prüft (Vorgabe: eigenes Netz)
  # subnet_scan_on_schedule: false

cash_drawer_pin: 2              # Pin für den Kassenladen-Impuls (meist 2, manche Laden 5)
```

Gesucht wird in dieser Reihenfolge: `--config DATEI`, `config.yaml` im
Datenverzeichnis, `./config/config.yaml`, `/etc/openeos-printer/config.yaml`.
`--server-url` auf der Kommandozeile geht vor; gibt es noch keine Datei,
schreibt der Agent sie damit ins Datenverzeichnis — deshalb reicht beim ersten
Start der Parameter.

`discovery.subnet` brauchst du, wenn der Agent-PC mehrere Netze hat oder ein
VPN die Standardroute übernimmt: Trag das /24 ein, in dem die Drucker stehen.
Größer als /24 geht nicht.

Die Verzeichnisse lassen sich mit Umgebungsvariablen verlegen:
`OPENEOS_PRINTER_DATA_DIR` (Daten) und `OPENEOS_PRINTER_LOG_DIR` (Protokoll).
Vorgaben: Linux `/var/lib/openeos-printer` (ohne Schreibrecht
`~/.local/share/openeos-printer`) und `/var/log/openeos-printer`; Windows
`%ProgramData%\OpenEOS Printer Agent`.

## Status prüfen

```bash
openeos-printer-agent status            # fragt den laufenden Agent
openeos-printer-agent status --json     # dasselbe als JSON
```

Unter Windows heißt der Befehl `openeos-printer-agent-windows-x64.exe status`,
bei der Linux-Installation `/opt/openeos-printer-agent/openeos-printer-agent status`
(aus dem Quellcode: `/opt/openeos-printer-agent/venv/bin/python -m src.main status`).
Die Ausgabe zeigt Version, Server, Verbindung, Organisation, übernommene und
gefundene Drucker — vor der Kopplung stattdessen den Code.

Dasselbe zeigt die Statusseite `http://<agent-ip>:8080` im Browser, dazu
Warteschlange und Systemwerte; `/health` eignet sich für Monitoring.

## Aktualisieren

Die Kopplung (`device.json`) und die Konfiguration bleiben bei einem Update
erhalten; nur die Programmdatei wird getauscht.

- **Windows:** neue EXE herunterladen, dann als Administrator
  `remove-service`, Datei ersetzen, `install-service` erneut ausführen.
- **Linux mit Binärdatei:**
  ```bash
  sudo install -m 0755 openeos-printer-agent-linux-x64 /opt/openeos-printer-agent/openeos-printer-agent
  sudo systemctl restart openeos-printer
  ```
- **Linux aus dem Quellcode:** `git pull` im Checkout und `install.sh` erneut
  ausführen — die vorhandene `config.yaml` bleibt stehen.

Die laufende Version steht in der Agent-Liste der Web-App und in
`openeos-printer-agent --version`.

## Ohne Hardware testen

Zwei Hilfen, damit du den Ablauf prüfen kannst, bevor die Drucker da sind:

- `run --dummy-printer` — jeder übernommene Drucker schreibt den fertigen Bon
  als Text ins Protokoll statt auf Hardware.
- `tools/fake_printer.py` aus dem Repository — ein Netzwerkdrucker-Emulator.
  Er lauscht auf TCP 9100, antwortet auf die Modellabfrage (erscheint in der
  Suche als „OPENEOS FAKE-9100“) und schreibt jeden empfangenen Bon lesbar auf
  die Konsole. Nur Standardbibliothek, Python ≥ 3.8:
  ```bash
  python tools/fake_printer.py                        # 0.0.0.0:9100
  python tools/fake_printer.py --port 9101 --log-file /tmp/fake-printer.log --model "TM-T88V"
  ```
  In der Web-App findet ihn **Neu suchen** mit Netzwerk-Scan (oder du legst
  ihn manuell mit IP und Port an); nach **Übernehmen** landet der Testdruck in
  seiner Ausgabe.

## Wenn nichts ankommt

```bash
# Läuft der Agent, und was sagt er?
sudo journalctl -u openeos-printer -f       # Linux
# Windows: %ProgramData%\OpenEOS Printer Agent\logs\agent.log

# Zustand des Agents
openeos-printer-agent status
```

Die häufigsten Ursachen, in dieser Reihenfolge:

1. **`/api` fehlt** in `server_url` — der Agent findet den Server nicht.
2. **Server nicht erreichbar** — vom Agent-PC aus prüfen:
   `curl https://kasse.mein-verein.de/api/health`
3. **Agent nicht gekoppelt** — der Code wurde nie eingegeben oder der Agent
   wurde in der Web-App entfernt. Zum neu Koppeln `device.json` im
   Datenverzeichnis löschen, Agent neu starten, neuen Code eingeben.
4. **Drucker nicht übernommen** — gefundene Drucker drucken erst nach
   **Übernehmen** in der Web-App.
5. **Kein Standort oder Gerät zugeordnet** — ohne Zuordnung entsteht kein
   Auftrag; siehe [Drucker zuordnen](../drucker.md#drucker-zuordnen).
6. **USB-Rechte** (Linux) — `lsusb` zeigt den Drucker, aber der Agent kann
   nicht drucken: [udev-Regel](#usb-rechte-unter-linux) prüfen.
7. **Windows-Dienst startet nicht** — die EXE einmal mit `run` in einer
   Konsole starten, dort steht der Fehler. `install-service` muss als
   Administrator laufen.
8. **Netzwerkdrucker nicht gefunden** — mDNS (UDP 5353) oder Port 9100 ins
   LAN werden von Firewall oder VPN blockiert, oder der Drucker steht in einem
   anderen Netz: `discovery.subnet` setzen oder den Drucker manuell per IP
   anlegen. Am Drucker muss Rohdruck auf Port 9100 („RAW“, „JetDirect“)
   aktiv sein.
