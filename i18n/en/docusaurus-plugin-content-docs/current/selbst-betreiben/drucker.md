---
sidebar_position: 5
title: Installing the printer agent
description: Set up the printer agent on Windows or Linux as a service and connect it to your own installation.
---

# Installing the printer agent

OpenEOS does not print receipts directly, but via the **printer agent**: a
small program on a Windows or Linux PC (a Raspberry Pi works too) next to
the printers. It finds USB and network printers on its own, reports them to
the server and waits for print jobs over a persistent connection. Which
printers are used, and for what, is decided by the organization in the web
app — the process is described in the [Printers chapter](../drucker.md) of the
manual.

This page describes the installation as a service. For Single Organization
mode only one thing differs from app.openeos.de: the server address.

## The server address

The agent needs exactly one setting, `server_url`: the address of **your**
API, ending **with** `/api`.

| Installation | `server_url` |
|---|---|
| Own server on the local network | `http://192.168.1.50:3000/api` |
| Own server behind a reverse proxy | `https://pos.my-club.org/api` |
| app.openeos.de | `https://api.openeos.de/api` |

The agent must be able to reach the server permanently — including over
WebSocket, see [Installation](./installation.md). Everything else (printer
list, assignments) comes from the server; nothing is configured on the PC.

## Download

The [release page](https://github.com/OpenEOS-Project/openeos-printer-agent/releases/latest)
has three ready-made files with no further dependencies, plus `SHA256SUMS`:

| File | For |
|---|---|
| `openeos-printer-agent-windows-x64.exe` | Windows 10/11, 64-bit |
| `openeos-printer-agent-linux-x64` | Linux PC, 64-bit |
| `openeos-printer-agent-linux-arm64` | Raspberry Pi 4/5 with 64-bit Raspberry Pi OS |

Alternatively the agent runs from source (`pip install .`, Python ≥ 3.11)
or in a container, see below.

## Windows

1. Put the EXE somewhere permanent, e.g. `C:\Program Files\OpenEOS\`.
2. Pair: open a Command Prompt and start the agent once in the foreground so
   you can see the code:
   ```
   cd "C:\Program Files\OpenEOS"
   openeos-printer-agent-windows-x64.exe run --server-url https://pos.my-club.org/api
   ```
   Enter the six-digit code in the web app under **Printers → Connect
   printer agent**. Once "Paired" appears, stop the agent with `Ctrl+C`.
   (`pair` instead of `run` does the same and exits by itself once linked.)
3. Install the service: open a Command Prompt **as Administrator**
   (right-click → *Run as administrator*):
   ```
   openeos-printer-agent-windows-x64.exe install-service --server-url https://pos.my-club.org/api
   ```
   The **OpenEOS Printer Agent** service starts right away and with Windows
   from now on.
4. Remove: `openeos-printer-agent-windows-x64.exe remove-service`, also as
   Administrator.

Everything the agent stores lives in `%ProgramData%\OpenEOS Printer Agent`:
`config.yaml`, `device.json` (the pairing), `print-jobs.db` (pending jobs)
and `logs\agent.log`. The service shows no window — you see the code and the
state in the log and on `http://localhost:8080`.

:::info[USB printers on Windows]
On Windows the agent prints through the **Windows print spooler**. Set up
the printer in Windows — with the vendor driver or with the built-in
**Generic / Text Only** driver on the USB port —, print a Windows test page,
and the agent reports it as a Windows printer. No WinUSB driver is needed.
Virtual printers (PDF, XPS, OneNote, fax) are not reported.
:::

## Linux and Raspberry Pi

`install.sh` from the source checkout sets up everything — either with the
ready-made binary or from source with Python:

```bash
git clone https://github.com/OpenEOS-Project/openeos-printer-agent.git
cd openeos-printer-agent

# with the binary (no Python needed):
sudo ./install.sh --server-url https://pos.my-club.org/api --binary ./openeos-printer-agent-linux-x64

# or from source:
sudo ./install.sh --server-url https://pos.my-club.org/api
```

The script creates the system user `openeos`, installs udev rules for USB
receipt printers, writes `/opt/openeos-printer-agent/config/config.yaml` and
starts the systemd service `openeos-printer` (auto-start). Read the code
from the log or the status page afterwards:

```bash
sudo journalctl -u openeos-printer -f      # the code is printed large in the log
# or in the browser: http://<ip-of-the-pi>:8080
```

| What | Where |
|---|---|
| Configuration | `/opt/openeos-printer-agent/config/config.yaml` |
| Data (pairing, job queue, template cache) | `/var/lib/openeos-printer` |
| Log | `/var/log/openeos-printer/agent.log` and `journalctl -u openeos-printer` |
| Service | `systemctl status openeos-printer` |

**Raspberry Pi:** on a Pi 4 or 5 with 64-bit Raspberry Pi OS use the
`arm64` binary. There is no binary for a Pi 3 or a 32-bit OS — install from
source there (`install.sh` without `--binary`). A Pi Zero is not enough.

### USB permissions on Linux

The agent runs as the user `openeos` without root privileges and may only
access USB printers through the udev rule in
`/etc/udev/rules.d/99-openeos-printer.rules`. It covers devices of the USB
printer class and these vendors:

| Vendor ID | Vendor |
|---|---|
| `04b8` | Epson |
| `0519` | Star Micronics |
| `1504` | Bixolon |
| `0dd4` | Custom |
| `0416` | Winbond (many no-name printers) |
| `28e9` | GD Microelectronics |
| `0483` | STMicroelectronics |
| `6868` | generic Chinese printers |
| `1fc9` | NXP |

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

Without a matching rule the agent still lists the printer (ID only, no
serial number) but cannot print to it.

### Binary without a service

For a quick try the binary alone is enough; without root privileges the
data goes to `~/.local/share/openeos-printer`:

```bash
curl -LO https://github.com/OpenEOS-Project/openeos-printer-agent/releases/latest/download/openeos-printer-agent-linux-x64
chmod +x openeos-printer-agent-linux-x64
./openeos-printer-agent-linux-x64 run --server-url https://pos.my-club.org/api
```

### In a container

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
`./config/config.yaml`, `/etc/openeos-printer/config.yaml`. `--server-url`
on the command line wins; if no file exists yet, the agent writes one into
the data directory with it — which is why the parameter on the first start
is enough.

You need `discovery.subnet` when the agent PC has several networks or a VPN
owns the default route: enter the /24 the printers are on. Larger than /24
is not possible.

The directories can be moved with environment variables:
`OPENEOS_PRINTER_DATA_DIR` (data) and `OPENEOS_PRINTER_LOG_DIR` (log).
Defaults: Linux `/var/lib/openeos-printer` (without write access
`~/.local/share/openeos-printer`) and `/var/log/openeos-printer`; Windows
`%ProgramData%\OpenEOS Printer Agent`.

## Checking the status

```bash
openeos-printer-agent status            # asks the running agent
openeos-printer-agent status --json     # the same as JSON
```

On Windows the command is `openeos-printer-agent-windows-x64.exe status`,
for the Linux installation `/opt/openeos-printer-agent/openeos-printer-agent status`
(from source: `/opt/openeos-printer-agent/venv/bin/python -m src.main status`).
The output shows version, server, connection, organization, adopted and
discovered printers — before pairing, the code instead.

The status page `http://<agent-ip>:8080` shows the same in the browser, plus
queue and system metrics; `/health` is suitable for monitoring.

## Updating

The pairing (`device.json`) and the configuration survive an update; only
the program file is replaced.

- **Windows:** download the new EXE, then as Administrator run
  `remove-service`, replace the file, run `install-service` again.
- **Linux with binary:**
  ```bash
  sudo install -m 0755 openeos-printer-agent-linux-x64 /opt/openeos-printer-agent/openeos-printer-agent
  sudo systemctl restart openeos-printer
  ```
- **Linux from source:** `git pull` in the checkout and run `install.sh`
  again — the existing `config.yaml` is kept.

The running version is shown in the agent list of the web app and by
`openeos-printer-agent --version`.

## Testing without hardware

Two helpers so you can check the flow before the printers arrive:

- `run --dummy-printer` — every adopted printer writes the rendered ticket
  as text to the log instead of to hardware.
- `tools/fake_printer.py` from the repository — a network printer emulator.
  It listens on TCP 9100, answers the model query (shows up in discovery as
  "OPENEOS FAKE-9100") and writes every received ticket to the console as
  readable text. Standard library only, Python ≥ 3.8:
  ```bash
  python tools/fake_printer.py                        # 0.0.0.0:9100
  python tools/fake_printer.py --port 9101 --log-file /tmp/fake-printer.log --model "TM-T88V"
  ```
  In the web app, **Search again** with the network scan finds it (or add it
  manually with IP and port); after **Adopt**, the test print ends up in
  its output.

## If nothing arrives

```bash
# Is the agent running, and what does it say?
sudo journalctl -u openeos-printer -f       # Linux
# Windows: %ProgramData%\OpenEOS Printer Agent\logs\agent.log

# State of the agent
openeos-printer-agent status
```

The most common causes, in this order:

1. **`/api` is missing** from `server_url` — the agent cannot find the server.
2. **Server not reachable** — check from the agent PC:
   `curl https://pos.my-club.org/api/health`
3. **Agent not paired** — the code was never entered, or the agent was
   removed in the web app. A removed agent (0.2.1 or newer) shows a new
   code on its own in the log and on `http://localhost:8080` — nothing to
   delete, no restart, just enter the code. An agent **blocked** in the web
   app waits and checks every 60 s whether it has been unblocked.
4. **Printer not adopted** — discovered printers only print after
   **Adopt** in the web app.
5. **No station or device assigned** — without an assignment no job is
   created; see [Assign printers](../drucker.md#assign-printers).
6. **USB permissions** (Linux) — `lsusb` shows the printer but the agent
   cannot print: check the [udev rule](#usb-permissions-on-linux).
7. **Windows service does not start** — run the EXE once with `run` in a
   console; the error is shown there. `install-service` must run as
   Administrator.
8. **Network printer not found** — mDNS (UDP 5353) or port 9100 into the
   LAN are blocked by a firewall or VPN, or the printer is on another
   network: set `discovery.subnet` or add the printer manually by IP. The
   printer must have raw printing on port 9100 ("RAW", "JetDirect")
   enabled.
