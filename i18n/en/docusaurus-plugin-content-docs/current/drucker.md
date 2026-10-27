---
sidebar_position: 12
title: Printers
description: Connect the printer agent, adopt discovered printers, manage templates and print workflows.
---

# Printers

The **Printers** section is where you connect your receipt printers to OpenEOS and decide how and where things get printed. The section is divided into three tabs: **Printers**, **Templates** and **Print Workflows**.

OpenEOS prints on common **ESC/POS receipt printers** — Epson, Star, Bixolon and most no-name devices with 58 or 80 mm paper — via USB or over the network. The link between the printer and OpenEOS is the **printer agent**.

## The printer agent

The printer agent is a small program that runs on a **Windows or Linux PC** (a Raspberry Pi works too) on the same network as your printers. It

- finds attached **USB printers**, printers set up in Windows (**Windows printers**) and **network printers** on its own and reports them to OpenEOS,
- keeps the connection to OpenEOS and prints the tickets OpenEOS sends it,
- remembers accepted jobs and prints them after a restart.

Which printer is used for what is not configured on the PC but here in the web app. Once connected, there is nothing left to configure on the PC.

One agent serves any number of printers. If printers sit on separate networks — say the kitchen and the bar each with their own Wi-Fi — run one agent at each location.

## Connect a printer agent

1. Download the agent from the [download page](https://github.com/OpenEOS-Project/openeos-printer-agent/releases/latest): `openeos-printer-agent-windows-x64.exe` for Windows, `openeos-printer-agent-linux-x64` for Linux, `openeos-printer-agent-linux-arm64` for a Raspberry Pi 4/5 with a 64-bit OS. The **Connect printer agent** button at the top of the **Printers** tab shows the same links.
2. Start the agent by hand once so you can see the code:
   - **Windows**: open a Command Prompt, change into the folder of the file and run:
     ```
     openeos-printer-agent-windows-x64.exe run --server-url https://api.openeos.de/api
     ```
   - **Linux**: open a terminal, make the file executable and start it:
     ```bash
     chmod +x openeos-printer-agent-linux-x64
     ./openeos-printer-agent-linux-x64 run --server-url https://api.openeos.de/api
     ```
3. The agent shows a **six-digit code** — large in the window and also on its status page at `http://localhost:8080`.
4. In OpenEOS, go to **Printers**, click **Connect printer agent**, enter the code and give the agent a name, such as "Printer PC kitchen".
5. A few seconds later the agent appears in the list with its host name, operating system and version, reports **Online** and immediately scans for printers.

The agent remembers the pairing; it needs no code on the next start. So that it starts with the PC by itself, set it up as a service afterwards:

- **Windows**: open a Command Prompt **as Administrator** and run `openeos-printer-agent-windows-x64.exe install-service --server-url https://api.openeos.de/api`. The "OpenEOS Printer Agent" service now starts with Windows.
- **Linux**: `sudo ./install.sh --server-url https://api.openeos.de/api --binary ./openeos-printer-agent-linux-x64` from the [source checkout](https://github.com/OpenEOS-Project/openeos-printer-agent) sets up a systemd service including USB permissions.

All the details — file locations, logs, Raspberry Pi, updating — are under [Installing the printer agent](./selbst-betreiben/drucker.md). That guide applies to app.openeos.de as well; the server address is then `https://api.openeos.de/api`.

:::note[Why a code]
Nobody has to sign in on the printer PC. The agent shows a number, you enter it in your account — that ties the agent to your organization, and nobody else can print through it.
:::

## Discovered printers

Under each agent, the **Printers** tab shows a **Discovered printers** area: everything the agent has found, with its name, connection and **last seen**. The agent finds

- **USB printers** attached to the agent's PC and switched on (Linux);
- **Windows printers**: every printer set up in Windows — this is how you connect USB printers on Windows. Virtual printers such as "Microsoft Print to PDF" are left out;
- **network printers** that announce themselves via mDNS/Bonjour.

The agent scans at start and every five minutes after that. **Search again** triggers a scan right away. If you also tick **Also scan the network (port 9100)**, the agent additionally probes every address on its network on port 9100 — that finds network printers that do not announce themselves, but takes a few seconds longer.

A discovered printer cannot be used yet. Only **Adopt** turns it into one of your organization's printers:

1. Click **Adopt** next to the discovered printer.
2. Give it a **name**, e.g. "Kitchen" or "Bar till".
3. Choose the **type**: **Receipt** for tickets handed to guests, **Kitchen ticket** for production tickets to the kitchen, grill or bar, **Label** for label printers.
4. Choose the **paper width** (58 or 80 mm) and tick **Cash drawer connected** if a cash drawer is attached to the printer. Only then can the till open the drawer on cash payments through this printer.
5. Confirm. The printer appears in its agent's list.

Printers that are already adopted are marked **Adopted** in the **Discovered printers** area; each entry also shows how it was found (USB, mDNS, network scan, Windows spooler). If you move a USB printer to another port or a network printer gets a new IP address, the agent usually recognises it anyway — by serial number or MAC address.

## Add a printer manually

If the agent does not find a network printer — because it sits on another network, say — add it with **Add printer manually**. Enter the **IP address** and **port** (almost always 9100), plus name, type, paper width and cash drawer as when adopting. The printer must be reachable from the agent's PC.

Only network printers can be added manually. USB and Windows printers can only be found by the agent; see [If something does not work](#if-something-does-not-work).

## Test print

Next to every adopted printer there is **Test print**. OpenEOS sends a short ticket through the agent to the printer; if it comes out, the whole chain of agent, connection and printer works. Do a test print after adopting and once more before the event if printers have moved.

**Edit printer** lets you change name, type, paper width and cash drawer at any time; for network printers also IP address and port. The **Printer active** switch takes a printer out of service temporarily: deactivated printers receive no tickets and can no longer be assigned. **Remove printer** deletes the printer and clears its assignments in stations, print workflows and tills; if the agent still finds it, you can adopt it again later.

## Assign printers

An adopted printer only prints once something is directed at it. Three places decide that:

- **Stations** — each [station](./standorte.md) (kitchen, grill, pickup) has its printer; the kitchen tickets of the products that belong to that station via category or product end up there.
- **Print workflows** — in the [Print Workflows](#print-workflows) tab you decide which ticket types are printed automatically and can set a fixed printer per ticket type.
- **Till device** — in the **Printer** tab of a [device](./geraete.md#drucker) you choose the till's **Default Printer** (for receipts and as the fallback when no station matches) and the printer the **Cash drawer** is attached to.

All of these pick lists only contain adopted printers. Discovered but not yet adopted printers do not show up there.

## Status and online

Agents and printers show in the list whether they are **Online**, along with **last seen**. The agent checks in every 30 seconds; if it stops, it counts as **Offline** — the PC is off, the agent is not running, or it has no internet connection. A printer counts as offline when the agent cannot reach it: switched off, unplugged or not on the network.

Jobs the agent has already accepted are not lost on a restart; it prints them as soon as the printer is back.

If a **Printers without agent** area shows up, those printers are no longer attached to a connected agent and cannot print — because the agent PC was replaced, say. Remove them and adopt the printers under the new agent.

## Remove an agent

**Remove agent** deletes the agent with all its printers from your organization; assignments in stations, print workflows, tills and products are cleared. The agent on the PC can no longer print afterwards.

If the same PC is to print again later, there is nothing to delete or restart: the running agent (version 0.2.1 or newer) notices that it was removed and shows a **new code** on its own — in the log and on `http://localhost:8080`. Enter it as above. The same happens when the agent starts with an old pairing the server no longer knows.

A **blocked** agent does not pair again: it waits, checks every 60 seconds whether it has been unblocked, and then reconnects with the same pairing.

## Templates

The **Templates** tab lets you define how receipts look — for example a kitchen receipt, drinks receipt, or till receipt. Templates determine the content and layout of the printout (header, line items, notes, footer).

![Printers – Templates](/img/screens/en/printers-templates.png)

## Print Workflows

The **Print Workflows** tab defines which tickets are printed automatically. There are three ticket types, each with its own switch:

- **Kitchen ticket** – for the kitchen when new orders arrive. Choose the **mode**: **1 ticket per order**, **1 ticket per product with barcode** or **1 ticket per location**.
- **Order ticket** – for the pickup area or as order confirmation.
- **Receipt** – after payment. As **trigger** choose **On payment**, **On order completion** or **Manual**.

While a ticket type is switched off, it reads **These tickets are not printed automatically.** For each ticket type you also choose:

- **Override printer** – a fixed printer. Without one, the **routing chain** applies: the printer of the product's station, otherwise of the category's station, otherwise the device's default printer.
- **Default template** – one of your own [templates](#templates) or the built-in one.

**Save** applies the settings of a ticket type.

![Printers – Print Workflows](/img/screens/en/printers-workflows.png)

## If something does not work

**The agent does not appear after entering the code, or stays offline.** Is the agent still running? When started by hand, closing the window stops it — set it up as a service. Check that the PC can reach the internet and that the server address ends in `/api`. You can always find the code on the agent's status page `http://localhost:8080` or in its log.

**A USB printer is not found or does not print on Linux.** Usually permissions are missing. `install.sh` installs udev rules for that; without them the agent sees the printer as an ID at best but cannot print. `lsusb` shows whether the printer is there at all. What to do is under [USB permissions on Linux](./selbst-betreiben/drucker.md#usb-permissions-on-linux).

**A USB printer is not found on Windows.** On Windows the agent uses the printers set up in Windows. Set up the printer in Windows — with the vendor driver or with the built-in **Generic / Text Only** driver on the USB port —, print a Windows test page, then click **Search again**.

**A network printer is not found.** Discovery needs mDNS (UDP 5353) and, when ticked, port 9100 into the local network; a firewall or a VPN on the agent PC can block both. Then add the printer [manually](#add-a-printer-manually) with its IP address. The printer must have raw printing on port 9100 enabled (often called "RAW" or "JetDirect").

**The printer is on another network.** Automatic discovery only sees the agent PC's network. Add the printer manually by IP address if it is reachable from there; otherwise put a second agent on the other network.

**The test print does not come out.** Is the printer online in the list? Paper in, cover closed? For Windows printers, did you adopt the right entry (the same printer can appear once as a Windows printer and once as a USB printer — take the Windows printer)? If that does not help, the agent's log shows the error; where to find it is under [Installing the printer agent](./selbst-betreiben/drucker.md#if-nothing-arrives).
