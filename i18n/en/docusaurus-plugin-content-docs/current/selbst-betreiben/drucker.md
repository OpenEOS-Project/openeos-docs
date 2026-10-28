---
sidebar_position: 5
title: Printer agent for your own installation
description: Point the printer agent at your own server; file locations, configuration, udev, Docker.
---

# Printer agent for your own installation

The printer agent is **the same program** for app.openeos.de and for your
own installation. Installing it, pairing with the code, adopting discovered
printers, test printing and assigning are described in the
[Printers chapter](../drucker.md) of the manual — all of it applies to you
as well. This page only covers what Single Organization mode adds: the
server address and a few operational details.

## The server address

Without options the agent connects to `https://api.openeos.de/api`. For
your installation, pass the address of **your** API on the first start,
ending **with** `/api`:

```bash
# Linux, binary
./openeos-printer-agent-linux-x64 run --server-url https://pos.my-club.org/api

# Linux, service via install.sh
sudo ./install.sh --server-url https://pos.my-club.org/api --binary ./openeos-printer-agent-linux-x64

# Windows, service (Command Prompt as Administrator)
openeos-printer-agent-windows-x64.exe install-service --server-url https://pos.my-club.org/api
```

| Installation | `--server-url` |
|---|---|
| Own server on the local network | `http://192.168.1.50:3000/api` |
| Own server behind a reverse proxy | `https://pos.my-club.org/api` |

`--server-url` is written to `config.yaml` (`server_url`); the service needs
no parameters after that. The agent must be able to reach the server
permanently — including over WebSocket, see
[Installation](./installation.md).

## File locations

**Linux, service via `install.sh`**

- Configuration: `/opt/openeos-printer-agent/config/config.yaml`
- Data (pairing `device.json`, job queue, template cache): `/var/lib/openeos-printer`
- Log: `/var/log/openeos-printer/agent.log` and `journalctl -u openeos-printer`
- Service: `systemctl status openeos-printer`

**Linux, binary without root privileges**

- Configuration, data and log (`logs/agent.log`) in `~/.local/share/openeos-printer`

**Windows**

- Configuration, data and log (`logs\agent.log`) in `%ProgramData%\OpenEOS Printer Agent`
- Service "OpenEOS Printer Agent" in the Services console

The directories can be moved with the environment variables
`OPENEOS_PRINTER_DATA_DIR` (data) and `OPENEOS_PRINTER_LOG_DIR` (log). An
update only replaces the program file; pairing and configuration are kept
(Windows: `remove-service`, replace the file, `install-service`; Linux: copy
the binary to `/opt/openeos-printer-agent/` and
`systemctl restart openeos-printer`).

## The configuration

Only `server_url` is required. Everything else has sensible defaults; a full
example is in the repository under `config/config.example.yaml`.

```yaml
server_url: "https://pos.my-club.org/api"

logging:
  level: INFO                   # DEBUG, INFO, WARNING, ERROR

local_server:
  port: 8080                    # status page and code

discovery:
  interval_s: 300               # automatic scan every 5 minutes
  # subnet: "192.168.1.0/24"   # which /24 the network scan probes (default: own network)
  # subnet_scan_on_schedule: false

cash_drawer_pin: 2              # pin for the cash-drawer kick (usually 2, some drawers 5)
```

The lookup order is: `--config FILE`, `config.yaml` in the data directory,
`./config/config.yaml`, `/etc/openeos-printer/config.yaml`. You need
`discovery.subnet` when the agent PC has several networks or a VPN owns the
default route; larger than /24 is not possible.

## Checking the status

```bash
openeos-printer-agent status            # asks the running agent
openeos-printer-agent status --json     # the same as JSON, e.g. for monitoring
```

For the Linux installation the command is
`/opt/openeos-printer-agent/openeos-printer-agent status`, on Windows
`openeos-printer-agent-windows-x64.exe status`. The status page
`http://<agent-ip>:8080` shows the same; `/health` is suitable for monitoring.

## USB permissions on Linux

The agent runs as the user `openeos` without root privileges and may only
access USB printers through the udev rule in
`/etc/udev/rules.d/99-openeos-printer.rules`. It covers devices of the USB
printer class and these vendors: Epson `04b8`, Star `0519`, Bixolon `1504`,
Custom `0dd4`, Winbond `0416` (many no-name printers), GD `28e9`,
STMicroelectronics `0483`, `6868` (generic Chinese printers), NXP `1fc9`.

If your printer is missing, `lsusb` shows its ID (`ID xxxx:yyyy`, the first
part is the vendor ID). Add a line following the same pattern and reload the
rules:

```bash
lsusb
sudo nano /etc/udev/rules.d/99-openeos-printer.rules
sudo udevadm control --reload-rules && sudo udevadm trigger
ls -l /dev/bus/usb/*/*       # group plugdev, rw permissions
sudo systemctl restart openeos-printer
```

## In a container

There is no published image; the repository contains a `Dockerfile`:

```bash
docker build -t openeos-printer-agent .
docker run -d --name openeos-printer --network host \
  -v openeos-printer-data:/var/lib/openeos-printer \
  -e OPENEOS_PRINTER_DATA_DIR=/var/lib/openeos-printer \
  openeos-printer-agent run --server-url https://pos.my-club.org/api
```

`--network host` is needed for mDNS and the network scan to work; for USB
printers pass the device through with `--device`. The code is shown by
`docker logs openeos-printer`.

## Testing without hardware

- `run --dummy-printer` — every adopted printer writes the rendered ticket
  as text to the log instead of to hardware.
- `tools/fake_printer.py` from the repository — a network printer emulator
  (TCP 9100, shows up in discovery as "OPENEOS FAKE-9100", writes every
  ticket to the console as readable text; standard library only, Python ≥ 3.8):
  ```bash
  python tools/fake_printer.py --port 9100 --log-file /tmp/fake-printer.log
  ```

What to do when nothing arrives is under
[If something does not work](../drucker.md#if-something-does-not-work); for
your own installation first check that `server_url` ends in `/api` and that
`curl https://pos.my-club.org/api/health` answers from the agent PC.
