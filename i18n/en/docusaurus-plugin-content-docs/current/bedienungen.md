---
sidebar_position: 16
title: Servers
description: Till profiles with a PIN for helpers on shared tills – no account and no email.
---

# Servers

A **server** is a till profile without an account and without an email address. It consists of a **name**, an optional **short name** (up to 12 characters), a **color**, a **role** and a **PIN**. Helpers switch on shared tills in seconds, and every booking shows who made it.

- Servers have **no access to the admin area**. They only sign in on tills.
- Servers do **not** count towards the 10 [members](./mitglieder.md#seats-and-maximum). The technical limit is **200 servers** per organization.
- A till only asks for a server if it is set to **Shared till** or **Fixed server** under **Devices → Settings**, see [Device modes](#geraetemodi).

:::note[Servers and table service]
Whether a till asks for a table ([Table Service or Counter](./geraete.md#betriebsmodus)) and whether servers sign in on it are two separate settings. A counter till can work with servers just as well.
:::

## Who manages servers {/* #verwalten */}

Servers are managed by **administrators** and by members with the **Servers** permission (granted under [Members](./mitglieder.md#module-based-permissions)). You reach the section via **Servers** in the sidebar.

The list shows each server's role, **Valid for**, PIN length, **Last sign-in** and status. **Filter by validity** shows only the servers of one event.

## Adding servers {/* #anlegen */}

### One at a time

1. Click **Add server**.
2. Enter the **name**. A first name or nickname is enough.
3. Optional: a **short name** (up to 12 characters). It appears on the till and on tickets.
4. Choose **Valid for**, the color and the **role**. If needed, adjust individual switches under **Rights** (see [Roles and rights](#rollen)).
5. Optional: an **own PIN** with 4 to 6 digits. If you leave the field empty, OpenEOS generates the PIN.
6. Click **Add**.

OpenEOS does not accept simple PINs such as `1234`, `0000` or `1212`, or PINs someone already has. You then see "This PIN is not available".

### Several at once {/* #mehrere */}

**Add several** lets you paste a whole list of names: one name per line. Optionally add a short name and role, separated by semicolons (`Name;Short name;Role`). As the role, write `Server` or `Shift lead`.

```text
Anna Berger;Anna
Ben Krämer
Lea Schmidt;Lea;Shift lead
```

- Lines without a role get the **Role (default)** from the dialog.
- **Valid for** is set to the running event by default.
- OpenEOS skips duplicate names. The dialog names faulty lines by line number.
- Up to **200** at once.

Everyone gets a PIN.

## PINs and PIN sheet {/* #pin */}

OpenEOS generates the PINs itself. You see them **only once**: right after adding and after **New PIN**. Only a check value is stored, and the PIN cannot be worked out from it. Admins cannot look up a PIN later either.

- **Print PIN sheet** creates an A4 sheet in the browser with 10 cards and cut lines. Each card shows the club, event, name, short name and PIN, plus a note not to share the PIN. Alternatively, hand the PIN over directly.
- **Forgot the PIN?** **New PIN** gives the person a new one. Any open sign-ins on tills end.
- **One shared PIN space:** members and servers share the PINs. A member PIN and a server PIN are never the same.
- **Length of new PINs:** 4 digits (default) or 6 digits, see [Settings](#einstellungen). For servers valid for the whole organization we recommend 6 digits.

:::tip[Before the event]
Add your servers with **Add several**, print the PIN sheet right after and cut out the cards. You cannot get at these PINs later – only via **New PIN**.
:::

## Valid for {/* #gueltigkeit */}

- **Whole organization** – the server can sign in at every event. Good for regular staff.
- **Event** – the server is only valid for one event. They can only sign in while that event is active or in test mode. Otherwise the till shows "Your PIN is only valid for another event."

## Roles and rights {/* #rollen */}

There are two roles:

- **Server** – books and takes payments. Cancel and refund, opening the cash drawer by hand and the cash book only work with approval. Redeeming discount vouchers is allowed.
- **Shift lead** – may do all of that and approves cancellations and refunds for others with their PIN.

| Right | Server | Shift lead |
|---|---|---|
| **Cancel & refund** | only with approval | yes |
| **Open the cash drawer by hand** | only with approval | yes |
| **Redeem discount vouchers** | yes | yes |
| **Cash book** | only with approval | yes |

You can set these four switches per person differently from the role. An experienced server can keep the cash book, for example.

- Without **Cancel & refund**, the till asks for a shift lead's PIN, see [Cancel and refund](#storno).
- Without **Open the cash drawer by hand** or **Cash book**, the till hides the menu item. A shift lead then signs in briefly.
- For cash payments the cash drawer **always** opens by itself – nobody needs a right for that.

## Deactivating and deleting {/* #deaktivieren */}

- **Deactivate** – the PIN is deleted and the till locks immediately. The server stays in the list.
- **Activate** – the server is back. Then assign a new PIN with **New PIN**.
- **Delete** – if the server has not booked anything yet, they are deleted. If they have booked, they are deactivated and their name is replaced by "Server N". The name in the tax records (cash point closing) is kept.

## Settings {/* #einstellungen */}

Administrators see the **Server settings** card on the page. It applies to all tills of the organization.

| Setting | Options |
|---|---|
| **Length of new PINs** | 4 digits (default) or 6 digits. Applies to PINs generated from now on. |
| **Name on tickets** | **Short name (if set)** or **Full name** |
| **Other servers' tables** | **Booking allowed, with a note** or **Booking allowed, without a note** – see [Tables](#tische) |

## Device modes {/* #geraetemodi */}

Whether and how someone signs in on a till is set per device under **Devices → Device → Settings** ([Servers & security](./geraete.md#pin-und-sperre)):

| Mode | How the till works |
|---|---|
| **No servers** | as before: nobody signs in, bookings count for the device |
| **Shared till** | before booking, a server signs in with their PIN ("Who is serving?"); switch and lock with one tap |
| **Fixed server** | the device belongs to one server, their phone for example; no PIN entry |

If a device's fixed server is deactivated, the till shows "This device has no server assigned" until an admin chooses another one.

## At the till {/* #kasse */}

This is how a **Shared till** works. More on the flow is under [Till](./kasse.md#pin-und-sperre).

### Signing in, switching, locking

- The till shows the PIN screen **"Who is serving?"**. The PIN alone is enough – it belongs to exactly one person.
- After signing in, a **chip** with the color and short name appears at the top right. Tapping it opens **Switch**, **Lock** and **Sign out**.
- When locking or switching, the till keeps the unsent cart **per server** on this device. When the same person signs in again, it is back. The till shows a note such as "The cart is kept for Anna." The cart only lives in memory: a reload clears it.
- **Automatic lock** after a time without touch (device setting, 2 minutes by default on shared tills). The till never locks during a running payment.
- Optional **Lock after every payment** – handy at the bar so everyone takes payments under their own name.
- After a **reload** of the page the till asks for the PIN again.
- **Offline**, the till cannot be unlocked: "No connection – unlocking works again once online." A short connection drop does not end the sign-in, though.
- Optionally the PIN screen shows **name tiles** with short name and color. They are off by default so no names are visible.

### Wrong PINs {/* #fehlversuche */}

| Wrong PINs on one device | Result |
|---|---|
| 5 | PIN entry locked for 30 seconds |
| 10 | PIN entry locked for 5 minutes |
| 20 | PIN entry locked until an admin releases it under **Devices → Device → Settings** with **Release PIN entry** |

If there are unusually many failed attempts across the organization, PIN entry pauses briefly on all devices.

### Tables {/* #tische */}

- Whoever takes the first order at a table (or acknowledges a guest order) becomes the table's **responsible server**.
- **Open tables** shows the filter **Mine / All**. **Mine** is the default: your tables and tables nobody owns yet. Each table shows the short name and color of the responsible server.
- You may book and take payments at another server's table. The till then shows a note such as "Table of Anna" (can be switched off under [Other servers' tables](#einstellungen)). The money counts for whoever takes the payment.

### Cancel and refund {/* #storno */}

- With the **Cancel & refund** right it works directly.
- Without it, the till asks for the PIN of a **shift lead**, of a member with the **Orders** permission or of an admin. OpenEOS records who approved.

How the till handles cancellations in general (allowed, PIN only, off) is set per device, see [Devices](./geraete.md#storno-erstatten).

### Members at the till

Members can still sign in on a till with their **member PIN** and then work like a server. Existing member PINs keep working. OpenEOS moves them into the shared PIN space the first time they are used.

## What is recorded {/* #zuordnung */}

Each of these bookings is attributed to the server who is signed in:

- orders and rounds (who sent the round to the kitchen and bar)
- payments, including the tip per payment
- cancellations and refunds – and who approved them
- deposit payouts
- opening the cash drawer and entries in the [cash book](./kassenbuch.md)

On kitchen and bar tickets the **Waiter** element ([Printers](./drucker.md#waiter-and-device-on-the-ticket)) shows the first available of: who sent the round ▸ responsible server of the table ▸ member ▸ device name. By default it prints the short name, see [Name on tickets](#einstellungen).

For DSFinV-K, OpenEOS stores the name the server had at the time of signing as **BEDIENER**.

## Privacy {/* #datenschutz */}

:::info[Note]
For a server, OpenEOS only stores the name, short name, color, role and the PIN's check value – no email, no phone number. Sign-ins on tills are only stored with the device and times.

Let your till staff know that bookings are attributed to them, for example when you hand out the PIN sheet. If you have employees, questions of employee data protection (§ 26 BDSG) or co-determination by a works council may come up. This is not legal advice; if in doubt, check with your data protection adviser.
:::

## Not yet available

Server settlement, the server wallet, tip payout, table handover and importing helpers from [shift plans](./schichtplaene.md) will follow later.
