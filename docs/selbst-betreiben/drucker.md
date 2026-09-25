---
sidebar_position: 5
title: Drucker anbinden
description: Den Drucker-Agenten mit der eigenen Installation verbinden.
---

# Drucker anbinden

Bons druckt OpenEOS nicht direkt, sondern über den **Drucker-Agenten**: ein
kleines Programm, das neben dem Drucker läuft — typischerweise auf einem
Raspberry Pi — und über eine dauerhafte Verbindung auf Druckaufträge wartet.

Für den Einzelbetrieb ändert sich daran nur eines: die Serveradresse.

## Installation auf einem Raspberry Pi

```bash
git clone https://github.com/OpenEOS-Project/openeos-printer-agent.git
cd openeos-printer-agent
sudo ./install.sh

sudo cp /opt/openeos-printer-agent/config/config.example.yaml \
        /opt/openeos-printer-agent/config/config.yaml
sudo nano /opt/openeos-printer-agent/config/config.yaml
```

## Die Konfiguration

Entscheidend ist `server.url` — sie zeigt auf **Ihren** Server und endet
**mit** `/api`:

```yaml
agent:
  id: 'kasse-pr01'
  name: 'Drucker Ausschank'

server:
  # Ihre eigene Installation, mit /api am Ende
  url: 'http://192.168.1.50:3000/api'

printers:
  - localId: 'kasse-pr01'
    name: 'Kassenbon-Drucker'
    type: 'receipt'           # receipt | kitchen | label
    connectionType: 'usb'     # usb | network | bluetooth
    usbVendorId: '0x04b8'     # Beispiel: Epson
    usbProductId: '0x0202'
    paperWidth: 80            # 58 oder 80 mm
```

Für einen Netzwerkdrucker stattdessen:

```yaml
  - localId: 'kueche-pr01'
    name: 'Kuechen-Drucker'
    type: 'kitchen'
    connectionType: 'network'
    ipAddress: '192.168.1.100'
    port: 9100
    paperWidth: 80
```

## Starten und freigeben

```bash
sudo systemctl enable --now openeos-printer
sudo systemctl status openeos-printer
```

Der Agent meldet sich von selbst beim Server an. Geben Sie ihn dann im
Dashboard unter **Drucker** frei und ordnen Sie ihn einem Standort zu — der
Ablauf ist derselbe wie im [Drucker-Kapitel](/drucker) des Handbuchs.

## Wenn nichts ankommt

```bash
# Läuft der Agent, und was sagt er?
sudo journalctl -u openeos-printer -f

# Eigene Statusseite des Agenten
curl http://localhost:8080
```

Die häufigsten Ursachen, in dieser Reihenfolge:

1. **`/api` fehlt** in `server.url` — der Agent findet den Server nicht.
2. **Server nicht erreichbar** — vom Pi aus prüfen:
   `curl http://192.168.1.50:3000/api/health`
3. **Drucker nicht freigegeben** — im Dashboard unter *Drucker* erledigen.
4. **Kein Standort zugeordnet** — ohne Zuordnung entsteht kein Auftrag.
5. **USB-Kennungen falsch** — `lsusb` auf dem Pi zeigt die tatsächlichen Werte.

:::tip Drucker im Container
Der Agent lässt sich auch mit Docker betreiben; das USB-Gerät muss dann
durchgereicht werden:

```bash
docker run -d --name openeos-printer \
  -v ./config/config.yaml:/app/config/config.yaml:ro \
  -p 8080:8080 --device /dev/usb/lp0 \
  ghcr.io/openeos-project/openeos-printer-agent:latest
```
:::
