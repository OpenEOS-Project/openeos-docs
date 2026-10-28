---
sidebar_position: 5
title: Drucker-Agent für die eigene Installation
description: Den Drucker-Agent auf den eigenen Server zeigen lassen; Speicherorte, Konfiguration, udev, Docker.
---

# Drucker-Agent für die eigene Installation

Der Drucker-Agent ist für app.openeos.de und für deine eigene Installation
**dasselbe Programm**. Installation, Kopplung per Code, Übernehmen der
gefundenen Drucker, Testdruck und Zuordnung stehen im
[Drucker-Kapitel](../drucker.md) des Handbuchs – das gilt eins zu eins auch
für dich. Hier steht nur, was beim Einzelbetrieb dazukommt: die
Server-Adresse und ein paar Einzelheiten für den Betrieb.

## Die Server-Adresse

Ohne Angabe verbindet sich der Agent mit `https://api.openeos.de/api`. Für
deine Installation gibst du beim ersten Start die Adresse **deiner** API an,
**mit** `/api` am Ende:

```bash
# Linux, Binärdatei
./openeos-printer-agent-linux-x64 run --server-url https://kasse.mein-verein.de/api

# Linux, Dienst über install.sh
sudo ./install.sh --server-url https://kasse.mein-verein.de/api --binary ./openeos-printer-agent-linux-x64

# Windows, Dienst (Eingabeaufforderung als Administrator)
openeos-printer-agent-windows-x64.exe install-service --server-url https://kasse.mein-verein.de/api
```

| Installation | `--server-url` |
|---|---|
| Eigener Server im Festnetz | `http://192.168.1.50:3000/api` |
| Eigener Server hinter Reverse-Proxy | `https://kasse.mein-verein.de/api` |

`--server-url` wird in die `config.yaml` geschrieben (`server_url`), der
Dienst braucht danach keine Parameter mehr. Der Agent muss den Server
dauerhaft erreichen – auch per WebSocket, siehe
[Installation](./installation.md).

## Speicherorte

**Linux, Dienst über `install.sh`**

- Konfiguration: `/opt/openeos-printer-agent/config/config.yaml`
- Daten (Kopplung `device.json`, Auftragswarteschlange, Vorlagen-Cache): `/var/lib/openeos-printer`
- Protokoll: `/var/log/openeos-printer/agent.log` und `journalctl -u openeos-printer`
- Dienst: `systemctl status openeos-printer`

**Linux, Binärdatei ohne Root-Rechte**

- Konfiguration, Daten und Protokoll (`logs/agent.log`) in `~/.local/share/openeos-printer`

**Windows**

- Konfiguration, Daten und Protokoll (`logs\agent.log`) in `%ProgramData%\OpenEOS Printer Agent`
- Dienst „OpenEOS Printer Agent“ in der Diensteverwaltung

Die Verzeichnisse lassen sich mit den Umgebungsvariablen
`OPENEOS_PRINTER_DATA_DIR` (Daten) und `OPENEOS_PRINTER_LOG_DIR` (Protokoll)
verlegen. Bei einem Update wird nur die Programmdatei getauscht; Kopplung
und Konfiguration bleiben (Windows: `remove-service`, Datei ersetzen,
`install-service`; Linux: Binärdatei nach `/opt/openeos-printer-agent/`
kopieren und `systemctl restart openeos-printer`).

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
  # subnet: "192.168.1.0/24"   # welches /24 die Netzwerksuche prüft (Vorgabe: eigenes Netz)
  # subnet_scan_on_schedule: false

cash_drawer_pin: 2              # Pin für den Kassenladen-Impuls (meist 2, manche Laden 5)
```

Gesucht wird in dieser Reihenfolge: `--config DATEI`, `config.yaml` im
Datenverzeichnis, `./config/config.yaml`, `/etc/openeos-printer/config.yaml`.
`discovery.subnet` brauchst du, wenn der Agent-PC mehrere Netze hat oder ein
VPN die Standardroute übernimmt; größer als /24 geht nicht.

## Status prüfen

```bash
openeos-printer-agent status            # fragt den laufenden Agent
openeos-printer-agent status --json     # dasselbe als JSON, z. B. für Monitoring
```

Bei der Linux-Installation heißt der Befehl
`/opt/openeos-printer-agent/openeos-printer-agent status`, unter Windows
`openeos-printer-agent-windows-x64.exe status`. Dasselbe zeigt die Statusseite
`http://<agent-ip>:8080`; `/health` eignet sich für Monitoring.

## USB-Rechte unter Linux

Der Agent läuft als Benutzer `openeos` ohne Root-Rechte und darf USB-Drucker
nur über die udev-Regel in `/etc/udev/rules.d/99-openeos-printer.rules`
ansprechen. Sie erfasst Geräte der USB-Druckerklasse und diese Hersteller:
Epson `04b8`, Star `0519`, Bixolon `1504`, Custom `0dd4`, Winbond `0416`
(viele No-Name-Drucker), GD `28e9`, STMicroelectronics `0483`, `6868`
(generische China-Drucker), NXP `1fc9`.

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

## Im Container

Ein fertiges Image gibt es nicht; das Repository enthält ein `Dockerfile`:

```bash
docker build -t openeos-printer-agent .
docker run -d --name openeos-printer --network host \
  -v openeos-printer-data:/var/lib/openeos-printer \
  -e OPENEOS_PRINTER_DATA_DIR=/var/lib/openeos-printer \
  openeos-printer-agent run --server-url https://kasse.mein-verein.de/api
```

`--network host` ist nötig, damit mDNS und die Netzwerksuche funktionieren;
für USB-Drucker reichst du das Gerät mit `--device` durch. Den Code zeigt
`docker logs openeos-printer`.

## Ohne Hardware testen

- `run --dummy-printer` – jeder übernommene Drucker schreibt den fertigen Bon
  als Text ins Protokoll statt auf Hardware.
- `tools/fake_printer.py` aus dem Repository – ein Netzwerkdrucker-Emulator
  (TCP 9100, erscheint in der Suche als „OPENEOS FAKE-9100“, schreibt jeden
  Bon lesbar auf die Konsole; nur Standardbibliothek, Python ≥ 3.8):
  ```bash
  python tools/fake_printer.py --port 9100 --log-file /tmp/fake-printer.log
  ```

Was zu tun ist, wenn nichts ankommt, steht unter
[Wenn etwas nicht klappt](../drucker.md#wenn-etwas-nicht-klappt); bei der
eigenen Installation prüfst du zuerst, ob `server_url` mit `/api` endet und ob
`curl https://kasse.mein-verein.de/api/health` vom Agent-PC aus antwortet.
