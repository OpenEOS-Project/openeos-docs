---
sidebar_position: 12
title: Printers
description: Install the printer agent (Windows installer, Linux), its window and tray icon, connect it, adopt discovered printers, test print, assign printers to stations and tills.
---

# Printers

The **Printers** section is where you connect your receipt printers to OpenEOS and decide how and where things get printed. The section has three tabs: **Printers**, **Templates** and **Print Workflows**.

OpenEOS prints on common **ESC/POS receipt printers** — Epson, Star, Bixolon and most no-name devices with 58 or 80 mm paper — via USB or over the network. The link between the printer and OpenEOS is the **printer agent**. This page walks you through once: install the agent, connect it, adopt printers, test print, assign.

## The printer agent

The printer agent is a small program that runs on a **Windows or Linux PC** (a Raspberry Pi works too) on the same network as your printers. It

- finds attached **USB printers**, printers set up in Windows (**Windows printers**) and **network printers** on its own and reports them to OpenEOS,
- keeps the connection to OpenEOS and prints the tickets OpenEOS sends it,
- remembers accepted jobs and prints them after a restart.

Which printer is used for what is not configured on the PC but here in the web app. Once connected, there is nothing left to configure on the PC. One agent serves any number of printers; if printers sit on separate networks — say the kitchen and the bar each with their own Wi-Fi — run one agent at each location.

:::info[Your own server]
The agent is the same for app.openeos.de and for a self-hosted installation. Without further options it connects to app.openeos.de. If you host OpenEOS yourself, pass `--server-url https://<your-host>/api` once at start — see [Printer agent for your own installation](./selbst-betreiben/drucker.md).
:::

## Download and install the agent

All files are on the [download page](https://github.com/OpenEOS-Project/openeos-printer-agent/releases/latest); the **Download for Windows** and **Download for Linux** buttons in the **Printers** tab lead there.

| File | For |
|---|---|
| `openeos-printer-agent-setup-windows-x64.exe` | **Windows 10/11 – recommended:** installer with background service and program window |
| `openeos-printer-agent-windows-x64.exe` | Windows, just the service without a window (for admins, command line) |
| `openeos-printer-agent-linux-x64` | Linux PC, 64-bit (Ubuntu 22.04 or later, Debian 11 or later) |
| `openeos-printer-agent-linux-arm64` | Raspberry Pi 4/5 with 64-bit Raspberry Pi OS |
| `openeos-printer-agent-ui-linux-x64` / `-arm64` | Program window for Linux computers with a screen (Ubuntu 22.04+, Debian 12+, Raspberry Pi OS Bookworm with desktop) |

### Windows

1. Download `openeos-printer-agent-setup-windows-x64.exe` and double-click it. Windows asks whether the app may make changes – confirm with **Yes**.

   :::note["Windows protected your PC"]
   The installer is not digitally signed yet. If this message appears, click **More info** and then **Run anyway**.
   :::

2. Keep **Start in the notification area at login** ticked – then the window sits at the bottom right of the taskbar after every restart. A desktop shortcut is optional.

   ![Installer: select additional tasks](/img/screens/en/printer-agent-setup-tasks.png)

3. **Server:** if you use app.openeos.de, leave the address as it is. Only if you host OpenEOS yourself, enter the address of your API here (see [Printer agent for your own installation](./selbst-betreiben/drucker.md)).

   ![Installer: server address](/img/screens/de/printer-agent-setup-server.png)

4. Click **Install** and finally **Finish**. The installer sets up the background service **OpenEOS Printer Agent** (it starts with Windows and prints even when nobody is logged in) and opens the **OpenEOS Printer Agent** window.

For an update just run the new installer: pairing, server and printers are kept. You can uninstall the agent under **Settings → Apps**; pairing and settings stay in `%ProgramData%\OpenEOS Printer Agent` even then, so a later reinstall needs no new code.

On Windows, USB printers are connected through the **Windows printer setup**: set up the printer in Windows – with the vendor driver or the built-in **Generic / Text Only** driver on the USB port – and print a Windows test page. The agent then reports it as a Windows printer.

### Linux PC or laptop with a screen

`install.sh` from the source checkout sets the agent up as a service (auto-start, USB permissions). If it finds a desktop, it also installs the program window with an entry in the application menu and auto-start in the notification area. Put both files in the same folder:

```bash
git clone https://github.com/OpenEOS-Project/openeos-printer-agent.git
cd openeos-printer-agent
# download openeos-printer-agent-linux-x64 and openeos-printer-agent-ui-linux-x64 into this folder
sudo ./install.sh --binary ./openeos-printer-agent-linux-x64
```

Afterwards **OpenEOS Printer Agent** is in the application menu; from the next login on it starts by itself in the notification area. The window is the same as on Windows:

![The printer agent window on Linux (Xfce)](/img/screens/en/printer-agent-linux.png)

On GNOME the notification area needs the *AppIndicator* extension (included in Ubuntu).

### Raspberry Pi without a screen

On a Pi that only sits next to the printer, the agent runs as a service without a window – exactly as before:

```bash
git clone https://github.com/OpenEOS-Project/openeos-printer-agent.git
cd openeos-printer-agent
sudo ./install.sh --binary ./openeos-printer-agent-linux-arm64
# without --binary: install from source (Python ≥ 3.11), e.g. on a Pi 3 or a 32-bit OS
```

Afterwards read the code from the log (`sudo journalctl -u openeos-printer -f`) or in the browser of another device on the same network at `http://<ip-of-the-pi>:8080`. On a Pi 4 or 5 with a 64-bit OS use the `arm64` file.

### The code

On its first start the agent registers with OpenEOS and shows an **eight-digit code** – large in the window, and also in the log and on its status page. It then waits until you have entered the code. A code is valid for 15 minutes; after that the agent shows a new one by itself.

![The printer agent window shows the code](/img/screens/en/printer-agent-window-code.png)

:::note[Why a code]
Nobody has to sign in on the printer PC. The agent shows a number, you enter it in your account — that ties the agent to your organization, and nobody else can print through it.
:::

## Connect the agent in the web app

As long as no agent is connected, the **Printers** tab shows the steps and the download links.

![Printers tab without an agent: steps and download links](/img/screens/de/printers-empty.png)

1. Click **Connect printer agent**.
2. Enter the code and click **Find device**.
3. Give it a name, such as "Printer PC kitchen", and click **Link**.

![The "Connect printer agent" dialog with the code entered](/img/screens/en/printers-connect-agent.png)

A few seconds later the agent appears in the list with its host name, operating system and version, reports **Online** and immediately scans for printers. At the same time the window on the PC switches to the overview by itself: **Connected**, with the name of your organization. It needs no code on the next start.

![Two connected agents: a Windows laptop and a Raspberry Pi, each with an adopted printer](/img/screens/en/printers-agent-online.png)

## Discovered printers

Under each agent, the **Printers** tab shows a **Discovered printers** area: everything the agent has found, with its name, connection, **Found via** (USB, mDNS, network scan, Windows spooler) and **last seen**. The agent finds

- **USB printers** attached to the agent's PC and switched on (Linux);
- **Windows printers**: every printer set up in Windows. Virtual printers such as "Microsoft Print to PDF" are left out;
- **network printers** that announce themselves via mDNS/Bonjour.

Only **ESC/POS receipt printers** work. The list therefore hides office printers (laser, inkjet) and devices that do not answer the agent's model query, showing just a hint such as "2 more devices hidden". **Show all discovered devices** reveals those entries too, marked **Not a receipt printer** – you can still adopt them, at your own risk.

![Agent online with the "Discovered printers" area](/img/screens/de/printers-agent-discovered.png)

The agent scans at start and every five minutes after that. **Search again** triggers a scan right away. If you also switch on **Also scan the network (port 9100)**, the agent additionally probes every address on its network on port 9100 — that finds network printers that do not announce themselves, but takes a few seconds longer.

If you move a USB printer to another port or a network printer gets a new IP address, the agent usually recognizes it anyway — by serial number or MAC address.

## Adopt a printer

A discovered printer cannot be used yet. Only **Adopt** turns it into one of your organization's printers:

1. Click **Adopt** next to the discovered printer.
2. Give it a **name**, e.g. "Kitchen" or "Bar".
3. Choose the **printer type**: **Receipt** for tickets handed to guests, **Kitchen ticket** for production tickets to the kitchen, grill or bar, **Label** for label printers.
4. Choose the **paper width** (58 or 80 mm) and switch on **Cash drawer connected** if a cash drawer is attached to the printer. Only then can the till open the drawer on cash payments through this printer.
5. Confirm with **Adopt**. The printer appears in its agent's list.

![The "Adopt printer" dialog with name, type and paper width](/img/screens/de/printers-adopt-dialog.png)

Printers that are already adopted are marked **Adopted** in the **Discovered printers** area.

## Add a printer manually

If the agent does not find a network printer — because it sits on another network, say — add it with **Add printer manually**. Enter the **IP address** and **port** (almost always 9100), plus name, type, paper width and cash drawer as when adopting. The printer must be reachable from the agent's PC.

Only network printers can be added manually. USB and Windows printers can only be found by the agent; see [If something does not work](#if-something-does-not-work).

## Test print

Next to every adopted printer there is **Test print**. OpenEOS sends a short ticket through the agent to the printer; if it comes out, the whole chain of agent, connection and printer works. Do a test print after adopting and once more before the event if printers have moved.

![Adopted printer online, test print sent](/img/screens/de/printers-test-print.png)

You can start the same test print right at the PC: in the agent's window via **Test print** next to the printer. It comes out without a detour through the server – handy during setup to check which printer is which.

## The printer agent window

The window shows at a glance whether everything on the PC works:

![Printer agent window: connected, one printer online](/img/screens/en/printer-agent-window-connected.png)

- **Top right** the state: *Connected* (green), *Not connected yet* with the code (blue), *Printer problem* (orange) or *No connection* / *Agent not running* (red).
- **Connection:** organization, server and whether the background service is running.
- **Printers:** all adopted printers with connection, *Online*/*Offline*, pending, printed and failed jobs since the start, when it last printed – and a **Test print** button for each printer.
- **Errors and warnings:** the latest messages of the past 24 hours, such as "printer not reachable".
- **Sleep:** whether the agent is currently keeping the computer awake (see below).
- At the bottom **Open OpenEOS** (the web app, Printers tab), **Status page**, **Logs** (opens the folder with the log files) and **Restart service** – the small arrow next to it also offers *Start service* and *Stop service*.

The window only displays. Printing is done by the **background service** – also when the window is closed or nobody is logged in. If the service is stopped, the window says so clearly and offers **Start service**:

![Window: the background service is stopped](/img/screens/en/printer-agent-window-stopped.png)

### Notification area

Closing the window with the **X** only hides it in the **notification area** at the bottom right next to the clock. The icon shows the state with a coloured dot – green, orange, blue or red as above. A click on the icon opens the window again, a right click shows the menu:

![Notification area with the printer agent icon and its menu](/img/screens/en/printer-agent-tray.png)

**Quit** only closes the window program; printing continues. If you do not see the icon, it is hidden behind the small arrow **^** – drag it from there into the taskbar to always keep it in view. If the connection drops or a printer fails, the agent also shows a short notification there.

## Laptops and sleep

A laptop that goes to sleep does not print. On Windows the agent therefore prevents the computer from falling asleep **by itself** while it is connected to OpenEOS; the screen may still turn off. The window shows this in the **Sleep** tab:

![Sleep tab in the agent window](/img/screens/en/printer-agent-window-power.png)

What the agent **cannot** prevent – Windows still puts the laptop to sleep when

- you **close the lid** and the power options say "Sleep" for closing the lid,
- someone presses the **power button** or chooses **Start → Sleep**,
- the **battery** runs empty.

For the event, set once in Windows under **Control Panel → Power Options → Choose what closing the lid does** "When I close the lid: **Do nothing**" (plugged in) – the **Power options** button in the Sleep tab takes you there – and keep the laptop plugged in. With some Wi-Fi and network adapters it also helps to open **Device Manager → Network adapters → Properties → Power Management** and untick "Allow the computer to turn off this device to save power".

If the laptop did fall asleep, the agent reconnects right after waking up and prints whatever is waiting.

On Linux the agent only keeps the computer awake if `install.sh` found a desktop (or `power.keep_awake: true` is in the configuration); closing the lid still puts the laptop to sleep there, too.

## Edit and remove printers

**Edit** lets you change name, type, paper width and cash drawer at any time; for network printers also IP address and port. The **Printer active** switch takes a printer out of service temporarily: deactivated printers receive no tickets and can no longer be assigned.

**Remove** deletes the printer and clears its assignments in stations, print workflows and tills; if the agent still finds it, you can adopt it again later.

## Assign printers

An adopted printer only prints once something is directed at it. Three places decide that:

- **Stations** — each [station](./standorte.md) (kitchen, grill, pickup) has its printer; the kitchen tickets of the products that belong to that station via category or product end up there.
- **Print workflows** — in the [Print Workflows](#print-workflows) tab you decide which ticket types are printed automatically and can set a fixed printer per ticket type.
- **Till device** — in the **Printer** tab of a [device](./geraete.md#drucker) you choose the till's **Default Printer** (for receipts and as the fallback when no station matches) and, under **Cash drawer**, the printer the cash drawer is attached to.

![Create station with the printer "Küche" selected](/img/screens/de/stations-dialog-printer.png)

:::tip[Station printers need "1 ticket per location"]
A station's printer is only used when the kitchen ticket in the **Print Workflows** tab runs in the mode **1 ticket per location** (or **1 ticket per product with barcode**). In the mode **1 ticket per order** the whole ticket goes to the till's default printer or the override printer — the station printers stay silent.
:::

All of these pick lists only contain adopted printers. Discovered but not yet adopted printers do not show up there.

## Status and online

Agents and printers show in the list whether they are **Online**, along with **last seen**. The agent checks in every 30 seconds; if it stops, it counts as **Offline** — the PC is off, the agent is not running, or it has no internet connection. A printer counts as offline when the agent cannot reach it: switched off, unplugged or not on the network.

Jobs the agent has already accepted are not lost on a restart; it prints them as soon as the printer is back. If a **Printers without agent** area shows up, those printers are no longer attached to a connected agent — because the agent PC was replaced, say. Remove them and adopt the printers under the new agent.

The page works on a phone as well — handy for a quick check on the day that everything is online:

<img src="/img/screens/de/printers-phone.png" alt="The Printers page on a phone with the agent and printer online" width="320" />

## Remove an agent

**Remove agent** deletes the agent with all its printers from your organization; assignments in stations, print workflows, tills and products are cleared. The agent on the PC can no longer print afterwards.

If the same PC is to print again later, there is nothing to delete or restart: the running agent notices that it was removed and shows a **new code** on its own — in the window, in the log and on its status page. Enter it as above. An agent **blocked** in the device list does not pair again: it waits, checks every 60 seconds whether it has been unblocked, and then reconnects.

## Templates

The **Templates** tab lets you define how receipts look — for example a kitchen receipt, drinks receipt, or till receipt. Templates determine the content and layout of the printout (header, line items, notes, footer).

![Printers – Templates](/img/screens/en/printers-templates.png)

### Server and device on the ticket

The **Server** and **Device** elements (group **Order**) show on the ticket who took the order, so the kitchen or bar knows whom to ask.

![Receipt editor: “Server” and “Device” elements](/img/screens/en/printers-template-waiter.png)

- **Server** – who took the order. If the till works with [servers](./bedienungen.md), this is the first available of: who sent the round ▸ responsible server of the table ▸ signed-in member ▸ device name. Whether the short name or the full name appears is set under [Name on tickets](./bedienungen.md#einstellungen). Without servers this shows the **name of the device**; if an ordering device belongs to one person, simply name it after them under **Devices**, e.g. "Markus's phone". For orders someone creates in the admin area (without a device) it shows their name.
- **Device** – always the name of the device the order was taken on.

Like other fields, both can be placed freely, aligned, printed **bold** or **big**, and their label can be changed (default: "Bedienung: " / "Gerät: "). Without a name – for example for online and QR orders – the line is left out, label included.

The default kitchen ticket shows the waiter below the order time. The guest receipt only shows it if you add the element to your own template.

## Print Workflows

The **Print Workflows** tab defines which tickets are printed automatically. There are three ticket types, each with its own switch:

- **Kitchen ticket** – for the kitchen when new orders arrive. Choose the **mode**: **1 ticket per order**, **1 ticket per product with barcode** or **1 ticket per location** (required for station printers to be used).
- **Order ticket** – for the pickup area or as order confirmation.
- **Receipt** – after payment. As **trigger** choose **On payment**, **On order completion** or **Manual**.

While a ticket type is switched off, it reads **These tickets are not printed automatically.** For each ticket type you also choose:

- **Override printer** – a fixed printer. Without one, the **routing chain** applies: the printer of the product's station, otherwise of the category's station, otherwise the device's default printer.
- **Default template** – one of your own [templates](#templates) or the built-in one.

**Save** applies the settings of a ticket type.

![Printers – Print Workflows](/img/screens/en/printers-workflows.png)

## If something does not work

**The agent does not appear after entering the code, or stays offline.** Look at the agent's window: if it says *Agent not running*, click **Start service**; if it says *No connection*, the PC cannot reach the internet. The window shows the code as long as the agent is not connected. Without the window you find it on the status page `http://localhost:8080` or in the log (Windows: `%ProgramData%\OpenEOS Printer Agent\logs\agent.log`, Linux: `journalctl -u openeos-printer`).

**The agent is offline in the evening and back in the morning.** Almost always the laptop fell asleep – see [Laptops and sleep](#laptops-and-sleep).

**The window says "Agent not responding" although the service is running.** Another program probably uses port 8080. Click **Restart service**; if that does not help, check `agent.log` via **Logs** and set another port in the configuration if needed (`local_server.port`).

**A USB printer is not found or does not print on Linux.** Usually permissions are missing. `install.sh` installs udev rules for the common vendors; without a matching rule the agent sees the printer as an ID at best but cannot print. `lsusb` shows whether the printer is there at all and which ID it has. If its vendor is missing from the rule, add it — how is described under [USB permissions on Linux](./selbst-betreiben/drucker.md#usb-permissions-on-linux).

**A USB printer is not found on Windows.** On Windows the agent uses the printers set up in Windows. Set up the printer in Windows — with the vendor driver or with the built-in **Generic / Text Only** driver on the USB port —, print a Windows test page, then click **Search again**.

**A network printer is not found.** Discovery needs mDNS (UDP 5353) and, with the network scan switched on, port 9100 into the local network; a firewall on the agent PC can block both. Then add the printer [manually](#add-a-printer-manually) with its IP address. The printer must have raw printing on port 9100 enabled (often called "RAW" or "JetDirect").

**The printer is on another network.** Automatic discovery only sees the agent PC's network. Add the printer manually by IP address if it is reachable from there; otherwise put a second agent on the other network.

**The agent PC is on a VPN.** If the VPN owns the default route, the agent scans the wrong network. Set `discovery.subnet` in its configuration to the printers' network (see [Configuration](./selbst-betreiben/drucker.md#the-configuration)) or add the printers manually by IP.

**The test print does not come out.** Is the printer online in the list? Paper in, cover closed? For Windows printers, did you adopt the right entry (the same printer can appear once as a Windows printer and once as a USB printer — take the Windows printer)? If that does not help, the agent's log shows the error.
