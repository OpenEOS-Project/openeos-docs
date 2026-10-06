---
sidebar_position: 11
title: Devices (Tills)
description: Register and manage smartphones and tablets as tills.
---

# Devices (Tills)

**Devices** are the smartphones and tablets you register to use as a till (POS). OpenEOS requires no special hardware — any modern device with a browser can become a mobile till. Devices belong to the **organization** and are therefore available for all events.

You can reach this section via **Devices** in the sidebar.

![Device overview with QR code](/img/screens/en/devices.png)

## Connecting a new device

![The device shows a number and a QR code](/img/screens/en/device-pair.png)

The device shows a number and you link it from your account. On the device itself you need neither credentials nor your organization's short name.

1. **On the device**, open `app.openeos.de` and choose **Use as device (till terminal)** at the bottom — for a screen, **Use as display (monitor)** instead.
2. The device shows a **six-digit number**, with a QR code beneath it as a second route.
3. **In the admin area**, go to **Devices** and enter the number.

![Enter the number from the device and approve it](/img/screens/en/device-verify.png)
 With a phone, scan the QR code instead — it opens the entry form directly.
4. Give it a **name** ("Bar till 1", say) and choose the **device type**.

The device then switches into the till or screen by itself.

:::note[Why a number]
Nobody at a tablet has the organization's short name to hand, and a TV rarely has a keyboard. A six-digit number can be read out and typed in — nothing more is needed.
:::

## Managing devices

Registered devices appear in the list on the Devices page. Here you can keep track of which tills are connected to your organization and remove devices if needed.

:::warning[Approval required]
A device only becomes a till once you **approve** it using the displayed code. This prevents unauthorised devices from recording orders.
:::

## Till settings

Under **Devices → device → Settings** you change the device type and, for a till, the following settings.

![Till settings: service mode, default area and PIN](/img/screens/en/device-settings.png)

### Service mode {/* #betriebsmodus */}

- **Table Service** — the till asks for the table before each order, as long as the event works with tables. For staff who go from table to table with a tablet or phone.
- **Counter** — no table prompt; everything is booked at the counter. For bars, food stalls and drinks counters.

Whether a table is actually requested also depends on the table mode of the [event](./veranstaltungen.md#tische). The overview is under [Till](./kasse.md#start).

### Default area {/* #standardbereich */}

With **Table Service** you can give the till a **default area**, such as *Tent A*. The till then shows the area in its header ("Till 3 · Tent A") and opens it first in the table list and on the floor plan. If the area has a floor plan, the till starts with the map the first time. Without a default area the areas appear in their normal order. You create areas under [Tables](./tische.md).

### PIN and lock {/* #pin-und-sperre */}

With **Require PIN**, everyone has to sign in at the till with their own PIN. You manage the PINs (4 to 6 digits) per member under [Members](./mitglieder.md). The till then shows who is signed in at the top right, and the lock next to it locks the till without losing the cart — see [Till](./kasse.md#pin-und-sperre).

Without a PIN, anyone holding the device can use the till.

## From till to order

Once a device is approved and an [event is active](./veranstaltungen.md), the till displays the products for the active event. Orders taken appear in real time under [Orders](./bestellungen.md) and — if configured — at the assigned [stations](./standorte.md) and printers.
