---
sidebar_position: 11
title: Devices (Tills)
description: Register and manage smartphones and tablets as tills.
---

# Devices (Tills)

**Devices** are the smartphones and tablets you register to use as a till (POS). OpenEOS requires no special hardware — any modern device with a browser can become a mobile till. Devices belong to the **organisation** and are therefore available for all events.

You can reach this section via **Devices** in the sidebar.

![Device overview with QR code](/img/screens/en/devices.png)

## Connecting a new device

![The device shows a number and a QR code](/img/screens/en/device-pair.png)

The device shows a number and you link it from your account. On the device itself you need neither credentials nor your organisation's short name.

1. **On the device**, open `app.openeos.de` and choose **Use as device (till terminal)** at the bottom — for a screen, **Use as display (monitor)** instead.
2. The device shows a **six-digit number**, with a QR code beneath it as a second route.
3. **In the admin area**, go to **Devices** and enter the number.

![Enter the number from the device and approve it](/img/screens/en/device-verify.png)
 With a phone, scan the QR code instead — it opens the entry form directly.
4. Give it a **name** ("Bar till 1", say) and choose the **device type**.

The device then switches into the till or screen by itself.

:::note[Why a number]
Nobody at a tablet has the organisation's short name to hand, and a TV rarely has a keyboard. A six-digit number can be read out and typed in — nothing more is needed.
:::

## Managing devices

Registered devices appear in the list on the Devices page. Here you can keep track of which tills are connected to your organisation and remove devices if needed.

:::warning[Approval required]
A device only becomes a till once you **approve** it using the displayed code. This prevents unauthorised devices from recording orders.
:::

## From till to order

Once a device is approved and an [event is active](./veranstaltungen.md), the till displays the products for the active event. Orders taken appear in real time under [Orders](./bestellungen.md) and — if configured — at the assigned [locations](./standorte.md) and printers.
