---
sidebar_position: 5
title: Connecting printers
description: Connect the printer agent to your own installation.
---

# Connecting printers

OpenEOS does not print receipts directly, but via the **printer agent**: a
small program that runs next to the printer — typically on a
Raspberry Pi — and waits for print jobs over a persistent connection.

For Single Organization mode only one thing changes: the server address.

## Installation on a Raspberry Pi

```bash
git clone https://github.com/OpenEOS-Project/openeos-printer-agent.git
cd openeos-printer-agent
sudo ./install.sh

sudo cp /opt/openeos-printer-agent/config/config.example.yaml \
        /opt/openeos-printer-agent/config/config.yaml
sudo nano /opt/openeos-printer-agent/config/config.yaml
```

## The configuration

The key setting is `server.url` — it points to **your** server and ends
**with** `/api`:

```yaml
agent:
  id: 'kasse-pr01'
  name: 'Drucker Ausschank'

server:
  # Your own installation, with /api at the end
  url: 'http://192.168.1.50:3000/api'

printers:
  - localId: 'kasse-pr01'
    name: 'Kassenbon-Drucker'
    type: 'receipt'           # receipt | kitchen | label
    connectionType: 'usb'     # usb | network | bluetooth
    usbVendorId: '0x04b8'     # Example: Epson
    usbProductId: '0x0202'
    paperWidth: 80            # 58 or 80 mm
```

For a network printer, use this instead:

```yaml
  - localId: 'kueche-pr01'
    name: 'Kuechen-Drucker'
    type: 'kitchen'
    connectionType: 'network'
    ipAddress: '192.168.1.100'
    port: 9100
    paperWidth: 80
```

## Starting and approving

```bash
sudo systemctl enable --now openeos-printer
sudo systemctl status openeos-printer
```

The agent registers with the server on its own. Then approve it in the
dashboard under **Printers** and assign it to a location — the
process is the same as in the [Printers chapter](/drucker) of the manual.

## If nothing arrives

```bash
# Is the agent running, and what does it say?
sudo journalctl -u openeos-printer -f

# The agent's own status page
curl http://localhost:8080
```

The most common causes, in this order:

1. **`/api` is missing** from `server.url` — the agent cannot find the server.
2. **Server not reachable** — check from the Pi:
   `curl http://192.168.1.50:3000/api/health`
3. **Printer not approved** — take care of it in the dashboard under *Printers*.
4. **No location assigned** — without an assignment, no job is created.
5. **Wrong USB IDs** — `lsusb` on the Pi shows the actual values.

:::tip[Printer agent in a container]
The agent can also be run with Docker; the USB device must then be
passed through:

```bash
docker run -d --name openeos-printer \
  -v ./config/config.yaml:/app/config/config.yaml:ro \
  -p 8080:8080 --device /dev/usb/lp0 \
  ghcr.io/openeos-project/openeos-printer-agent:latest
```
:::
