---
sidebar_position: 11
title: Devices (Tills)
description: Register and manage smartphones and tablets as tills.
---

# Devices (Tills)

**Devices** are the smartphones and tablets you register to use as a till (POS). OpenEOS requires no special hardware — any modern device with a browser can become a mobile till. Devices belong to the **organization** and are therefore available for all events.

You can reach this section via **Devices** in the sidebar.

![Device overview with QR code](/img/screens/en/devices.png)

## Device types

When connecting a device you decide with the **device type** which role it takes:

- **POS** – mobile till for taking orders.
- **Display** – a tablet or screen that either mirrors a till's cart as a [customer display](#kundendisplay) or shows orders for the kitchen, bar or pickup as a [station display](#kundendisplay).

The PC your receipt printers are attached to is not a device in this sense: you connect the **printer agent** under [Printers](./drucker.md), and it does not appear in this device list.

## Connecting a new device

![The device shows a number and a QR code](/img/screens/en/device-pair.png)

The device shows a number and you link it from your account. On the device itself you need neither credentials nor your organization's short name.

1. **On the device**, open `app.openeos.de` and choose **Use as device (POS terminal)** at the bottom — for a screen, **Use as a display (screen)** instead.
2. The device shows a **six-digit number** in one piece (such as `573080`), with a QR code beneath it as a second route.
3. **In the admin area**, go to **Devices**, click **Connect device** in the **Register New Device** card, enter the number as the **Verification Code** and click **Find Device**. You can also paste the number, from a message for example: OpenEOS ignores spaces and dashes.

![Enter the number from the device and link it](/img/screens/en/device-verify.png)
 With a phone, scan the QR code instead — it opens the entry form directly.
4. Under "Device found", choose the **Organization**, enter a **Device Name** ("Bar till 1", say), choose the **Device Type** (**POS** or **Display**) and click **Link**.

The device then switches into the till or screen by itself.

:::note[Why a number]
Nobody at a tablet has the organization's short name to hand, and a TV rarely has a keyboard. A six-digit number can be read out and typed in — nothing more is needed.
:::

You can copy the registration link with **Copy** and send it to your till staff, by message for example.

If a device in the list is still **Pending**, approve it with **Approve**: in the **Approve Device** dialog you choose the **device type** (POS or Display) and enter the 6-digit **verification code** from the device. Tills start in *Table Service* operation, displays as a customer display. You can change both at any time under **Devices → Device → Settings**.

## Managing devices

Registered devices appear in the list on the Devices page with their type, status (**Pending**, **Verified** or **Blocked**) and when they were last active. Here you keep track of which tills are connected to your organization, and use each device's menu to **Edit**, **Block** or **Unblock**, or **Delete** it.

**Send Message** above the list sends a short message to all connected devices, such as "Kitchen closes in 15 minutes". As the **Type** you choose **Info**, **Warning**, **Success** or **Error**.

:::warning[Approval required]
A device only becomes a till once you **approve** it using the displayed code. This prevents unauthorised devices from recording orders.
:::

Clicking a device opens its page. At the top you see its name, status (**Online**/**Offline**) and, on the right, **Block** and **Delete**; below are the tabs **Overview**, **Settings** and — for tills — **Printer**.

## Overview {/* #uebersicht */}

The tiles at the top of the **Overview** show at a glance what the device is set up for:

- **Till** — **Operation** (*Table Service* or *Counter*); with table service, the default area and table selection below it, such as "Area Tent A · Table selection: Map". Next to it, the device's orders, payments and revenue.
- **Customer display** — **Linked to**: the till whose cart the display mirrors.
- **Station display** — **Station**: which station the screen shows.

If nothing is assigned yet, the tile says "not assigned", with the link **Set it in the settings** below.

## Settings {/* #einstellungen */}

Under **Settings** the options are grouped by topic. Anything that depends on a choice sits right below it and only appears once that choice is made. **Save** applies everything; a till or display picks up the change immediately, without reloading.

- **General** — **Device Name** and **Device Type** (**POS** or **Display**). The type decides which groups appear below.

### Till settings

![Till settings: operation with tables, payment and servers & security](/img/screens/en/device-settings.png)

| Group | What you set |
|---|---|
| **Operation** | *Table Service* or *Counter*; with table service, **Tables** below it with default area and table selection |
| **Payment** | this till's SumUp card reader (once [SumUp](./integrationen/sumup.md) is set up) |
| **Servers & security** | who books on the till (**No servers**, **Shared till**, **Fixed server**), the lock and **Cancel & refund** |

#### Operation {/* #betriebsmodus */}

- **Table Service** — the till asks for the table before each order, as long as the event works with tables. For staff who go from table to table with a tablet or phone.
- **Counter** — no table prompt; everything is booked at the counter. For bars, food stalls and drinks counters.

Whether a table is actually requested also depends on the table mode of the [event](./veranstaltungen.md#tische). The overview is under [Till](./kasse.md#start).

#### Default area {/* #standardbereich */}

With **Table Service**, the **Tables** block appears below the choice. There you give the till a **default area**, such as *Tent A*. The till then shows the area in its header ("Till 3 · Tent A") and opens it first in the table list and on the floor plan. Without a default area the areas appear in their normal order. You create areas under [Tables](./tische.md).

#### Table selection on the POS {/* #tischwahl */}

Also in the **Tables** block you choose how this till opens a table:

| Table selection | When opening a table and under "Choose table", the till shows … |
|---|---|
| **Automatic** | the map if the default area has a floor plan, otherwise the list |
| **Enter number** | the keypad |
| **List** | all tables as tiles, by area |
| **Map** | the floor plan (available once an area has a floor plan) |

There is no switch for this at the till: each till shows exactly its own view. That way staff in the tent can work with the map while the bar uses the keypad. If the event uses **free** table numbers, every till shows the keypad.

#### Servers & security {/* #pin-und-sperre */}

Here you decide who books on this till and what it takes. Under **Servers** you choose one of three modes:

- **No servers** — as before: nobody signs in, bookings count for the device. Anyone holding the device can use the till.
- **Shared till** — before booking, a server signs in with their PIN ("Who is serving?"). Switching and locking take one tap. For tills where several people work.
- **Fixed server** — the device belongs to one server, their phone for example. Below it you choose the **Server**; all bookings of the device count for them. There is no PIN entry. If this server is deactivated, the till shows "This device has no server assigned" until you choose another one.

With **Shared till**, the **Lock** block appears below:

| Setting | What it does |
|---|---|
| **Lock automatically after** | **Never**, **30 seconds**, **1**, **2**, **5** or **10 minutes** without touch. Default: 2 minutes. The till never locks during a running payment. |
| **Lock after every payment** | For the bar: everyone takes payments under their own name. |
| **Name tiles on the PIN screen** | Shows the servers' short name and color. Off by default so no names are visible. |

When locking, the till keeps the cart per server on this device. What that looks like at the till is under [Till](./kasse.md#pin-und-sperre). You manage the servers themselves and their PINs under [Servers](./bedienungen.md).

:::note[Formerly "Require PIN"]
The **Require PIN** switch is gone. Tills that had it on are automatically set to **Shared till**; all others to **No servers**. Members keep signing in there with their member PIN.
:::

**Release PIN entry:** after 20 wrong PINs the device locks PIN entry until an admin releases it. The top of the block then says "PIN entry on this device is locked after too many failed attempts." **Release PIN entry** opens it again. Shorter locks after 5 and 10 failed attempts expire by themselves, see [Wrong PINs](./bedienungen.md#fehlversuche).

#### Cancel & refund {/* #storno-erstatten */}

In the same block you decide who may cancel items and refund orders on this till:

| Option | What applies |
|---|---|
| **Allowed** (default) | Everyone at the till may cancel and refund. |
| **PIN only** | The till asks for a PIN every time: that of a shift lead, of a member with the **Orders** permission or of an admin. You grant permissions under [Members](./mitglieder.md#module-based-permissions). |
| **Off** | Not possible on this till. Reprints and collecting payments still work. |

If a server is signed in, their **Cancel & refund** right counts: with it, they cancel directly. Without it, the till asks for the PIN of a **shift lead**, of a member with the **Orders** permission or of an admin (see [Servers](./bedienungen.md#storno)). **Off** applies to everyone.

### Display settings {/* #kundendisplay */}

| Group | What you set |
|---|---|
| **Display** | the **Display mode** and, below it, what belongs to it |
| **Appearance & content** | colour scheme, text size, header, idle message, logo |

Under **Display** you choose the **Display mode**:

- **Customer display** — a tablet facing the guest that mirrors a till's cart live. Below it you choose the **POS device**; items, quantities and totals then appear in real time as they are entered at the till.
- **Station display** — shows the orders of a [station](./standorte.md), such as the kitchen or the pickup counter. Below it you choose the **Station** from the active event and, with **Clear completed**, when finished orders disappear.

Newly registered displays start as a customer display. More on both kinds and on **Appearance & content** is in [Setting up screens](./anzeigen.md).

## Printer {/* #drucker */}

The **Printer** tab only exists for tills. Here you connect the till to the printers you adopted under [Printers](./drucker.md):

- **Default Printer** — this till's receipt printer. Receipts and all tickets no station is responsible for end up here. **Test print** checks it right from here.
- **Print Routing** — **Fixed printer**: all tickets go to the default printer, regardless of stations; for a till that sits right next to its printer. **Dynamic routing**: the routing chain — the printer of the product's station, otherwise of the category's station, otherwise the default printer; for when several stations have their own printers.
- **Cash drawer** — the printer the drawer is attached to; it opens on cash payments. Only printers that had the cash drawer ticked when adopted are offered. In the [operating modes](./betriebsarten.md) “Orders only” and “Cashless” the drawer stays shut.

**Save** applies the selection. Without a default printer the till still takes orders — it just prints no receipts.

## From till to order

Once a device is approved and an [event is active](./veranstaltungen.md), the till displays the products for the active event. Orders taken appear in real time under [Orders](./bestellungen.md) and — if configured — at the assigned [stations](./standorte.md) and printers.
