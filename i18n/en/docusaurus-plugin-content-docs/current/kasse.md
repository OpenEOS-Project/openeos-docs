---
sidebar_position: 20
title: Selling at the till
description: Open a table, order, send, check out — how the till works on the day.
---

# Selling at the till

This page covers the till itself — what your team does on the day. For how a device becomes a till, see [Connecting devices](./geraete.md); for how tables and the floor plan are set up, see [Tables](./tische.md).

:::tip[Try it first]
While the event is in **test mode** you can run through the whole thing: up to 25 orders cost nothing. The till then shows a slim warning strip below the header: "Test mode – sales don't count and are deleted on activation". It cannot be dismissed and stays in place on a phone while you scroll. Activating the event deletes the test orders but keeps your setup. Until sales start the unlocked event is **Planned**: the till keeps booking test orders and shows "Test operation – sales don't count. Real sales from … at …"; after the end it shows "Event ended – only settle open orders" (see [Phases](./veranstaltungen.md#phasen)).
:::

## How the till starts {/* #start */}

What you see after switching on depends on two settings: the device's **service mode** ([Devices](./geraete.md#betriebsmodus)) and the event's **table mode** ([Events](./veranstaltungen.md#tische)).

| Device | Event table mode | The till starts with … |
|---|---|---|
| **Counter** | any | the order view — everything is booked at the counter |
| **Table Service** | No tables (counter service) | the order view — everything is booked at the counter |
| **Table Service** | Enter table number freely | **Open table** with a keypad |
| **Table Service** | Predefined tables | **Open table** with the device's table selection: number, list or map |

If the till is set to **Shared till**, the PIN screen "Who is serving?" comes first — see [Signing in and locking](#pin-und-sperre).

## The header

The top bar always shows the same things:

- **On the left** the name of the till and — if the device has a [default area](./geraete.md#standardbereich) — that area, e.g. "Till 3 · Zelt A". Below it the organization and the running event. On phones the logo is smaller and the event is dropped; what doesn't fit ends with "…".
- **Table** — in the order view a green pill shows who you are booking for: "Table A10", "Counter" or "To go". Tapping it opens [Choose table](#tisch-wechseln).
- **Status** — a dot: green **Online**, yellow **Connecting …** or **No live data**, red with a crossed-out Wi-Fi icon **Offline**. Next to it the till's receipt printer, e.g. "Printer Bar" (or "Printer Bar offline"), if one is assigned, and the time. On narrower screens only the dot remains.
- **Menu** (the three lines) — **Order history**, **Open orders**, **Deposit return**, [Cash book](#kassenbuch), **Open cash drawer**, [Hand over table](#tisch-uebergeben), [Emergency support](#notfall-support), [Appearance](#darstellung), **Source code (AGPL-3.0)** and **Sign out device**. Only what is set up for this till and what the signed-in person is allowed to do appears.
- **Server** — on a shared till or with a fixed server, a chip with the color and short name of whoever is signed in. Tapping it opens [My running total](./bedienungen.md#zwischenstand), and for a shift lead also [Settle](./bedienungen.md#abrechnen). On a shared till it also offers **Switch**, **Lock** and **Sign out**.

Below the header there is at most **one** notice, the most important first:

1. "Event ended – only settle open orders" after sales have ended,
2. "Test operation – sales don't count. Real sales from … at …" while the event is **Planned**, or "Test mode – sales don't count and are deleted on activation" in test mode (shortened on phones),
3. "No connection – sending and checkout work again once the till is online.",
4. "TSE failed – you can keep selling, the receipt will be marked.",
5. "Cash blocked – without an active TSE this till accepts no cash. Card and online keep working." if the Cloud TSE is missing in Germany in "All features",
6. "Orders only – no checkout here. Payment happens outside OpenEOS." in the [Orders only](./betriebsarten.md#nur-bons) operating mode.

At the very bottom there is a thin line with copyright, version, imprint and privacy; on phones and portrait tablets it sits at the end of the page, above the cart bar.

### Light or dark {/* #darstellung */}

In the **Menu**, under **Appearance**, you choose **Light**, **Dark** or **System** (follows the device setting). The choice applies to this till only and takes effect at once — dark is easier on the eyes in an evening tent, light is easier to read in the sun. Customer and station displays are set separately under [Screens](./anzeigen.md).

## Opening a table {/* #tisch-oeffnen */}

![Start view: open a table with the keypad and open tables](/img/screens/en/pos-start.png)

With table service every order starts with the question: which table? How you find it — by **number**, from the **list** or on the **map** — is fixed per device: under **Devices → device → Settings** in [Table selection on the till](./geraete.md#tischwahl). There is no switch at the till itself; it always shows exactly that view, both when opening a table and under [Choose table](#tisch-wechseln). That way staff in the tent can work with the map while the bar uses the keypad.

If the event uses freely entered table numbers, every till shows the keypad.

### Number

Type the table number — on screen or with a keyboard — then tap **Open table …** or the green arrow.

- With **freely entered** numbers the till accepts anything up to five characters.
- With **predefined** tables it looks for the matching table: `5` finds `A05`. If several match (say `A05` and `B05`), they appear as choices below. If none matches you see "No table “…”" and the table cannot be opened.

### List

![All tables of the area with status and amount](/img/screens/en/pos-tables.png)

All enabled tables by area, the till's default area first. Each table shows its state:

| Color | Meaning |
|---|---|
| light | **free** |
| green | **open** — there are unpaid orders, or a cart on this till; plus the open amount |
| yellow | **waiting for service** — see [Open tables](#offene-tische) |

### Map {/* #karte */}

![The floor plan at the till, colored by status](/img/screens/en/pos-floor.png)

The [floor plan from the admin area](./tische.md#tischplan) with the same colors, plus walls, zones and the room shape for orientation. Tap the table you want to open. If there are several areas, you switch between them with tabs above the map. On a phone the map can be swiped sideways.

The map is available once an area has a floor plan. If the device's table selection is **Automatic**, the till shows the map when its default area has a plan, otherwise the list.

### Without a table: counter and to go

Below the keypad (or below the list and map) are **Counter** and **To go**. Use them to book without a table, for someone buying straight at the counter, say. To-go orders get the note "To-go" so the kitchen and pick-up can tell them apart.

### Open tables {/* #offene-tische */}

On the right (on a phone below the table choice) are all tables where something is open — waiting ones first, oldest at the top. Each row shows the amount and the reason:

- "2 open orders" — sent but not yet paid
- "3 items not sent" — a [parked cart](#tisch-wechseln) on this till
- **Guest order** · "waiting for 4 min" — a guest ordered on their own (online order). Opening the table confirms that someone is taking care of it; the table is no longer yellow afterwards.
- **Ready to serve** — the kitchen or bar has marked items as ready; they need to go to the table. See [Served](#serviert).

Tapping the row opens the table.

If the till works with [servers](./bedienungen.md), each table shows the short name and color of the responsible server — whoever took the first order there or acknowledged the guest order. On a **Shared till** the filter **Mine / All** also sits above the list. **Mine** is the default: your tables and tables nobody owns yet. If you open another server's table, the till shows a note such as "Table of Anna" (unless switched off under [Other servers' tables](./bedienungen.md#einstellungen)). You may still book and take payments; the money counts for you.

## Ordering

![Order view with categories, items and cart](/img/screens/en/pos-order.png)

1. **Choose a category** — on the left, each with its color and icon from the admin area ([Categories](./kategorien.md)). At the very top are the **Favorites**, if any have been marked in the admin area ([Products](./produkte.md#favoriten)).
2. **Tap items** — each tap adds another one to the cart; the number on the tile shows how many. The magnifier at the top right **searches** all items.
3. **Change quantities** — in the cart with **−** and **+**. At one piece the minus turns into a bin.

Each tile shows the first line of the description under the name (e.g. "0.5 l") and the product picture (or the category icon) on the right. Small marks at the bottom right tell you the item has **options** or comes with a **deposit**. When stock runs low the tile says "3 left"; sold-out items are greyed out.

### Options and notes

![Options of an item with a note for the kitchen](/img/screens/en/pos-options.png)

If an item has options, tapping it opens a window:

- Options are buttons, with surcharges shown. "multiple allowed" allows several, **required** must be chosen before you can continue.
- For **ingredients** everything is preselected; whatever is deselected goes on the ticket as "without …".
- **Note for the kitchen** — for example "well done".
- At the bottom the quantity and **Add** with the price.

Tapping a cart line that has not been sent yet opens the same window to change it.

### The cart

The cart on the right belongs to the open table. It has up to two sections:

- **Sent** — what has already gone to the kitchen and bar for this table, with its state: *sent*, *ready* or *served*. You can't change these lines here; cancelling works via the [order history](#bestellverlauf).
- **New** — what you are typing in right now.

Below are the sums, one line per deposit type (e.g. "Cup deposit (3 at €2.00)") and the **Total**. If a deposit is charged, a green box shows how many **deposit tokens** to hand out. The bin at the top only clears the new lines; from three lines on the till asks first.

## Send or check out {/* #senden-oder-kassieren */}

At the bottom of the cart there are one or two buttons. Which ones depends on the event's **checkout mode** ([Events](./veranstaltungen.md#kassiermodus)):

| Checkout mode | Buttons | How it works |
|---|---|---|
| **Pay immediately** | **Check out** | Order and pay in one step. The order is only created — and sent to the kitchen and bar — when it is paid. There is no **Send** button. |
| **Run a tab** | **Send** and **Check out** | **Send** passes the new items to the kitchen and bar without taking payment; they then appear under *Sent* and the table is open. Later, often after several rounds, you check out everything at once. |

**Check out** always settles everything that is open at the table: all sent, unpaid orders plus the new items. New items and the payment are booked **together**: if the payment is cancelled or the card is declined, no order is created, and the kitchen and bar get nothing that has not been paid.

After sending, the table stays open so you can keep ordering. After checking out you go back to **Open table**; at the counter the empty order view stays.

With the [Cloud TSE](./integrationen/cloud-tse.md), the kitchen and bar only get their ticket once the transaction is secured in the TSE – see [Receipts and the Cloud TSE](#tse).

### Open orders at the counter

If you **run a tab** and sell without a table (Counter device or counter service), there are no tables to list open orders under. Instead, the menu and the cart offer **Open orders**: a list of all open orders without a table. Select one or more and check them out together.

## Served {/* #serviert */}

When the kitchen or bar marks items of a table as **ready**, the table turns yellow ("waiting for service"). Opening it shows, for example, "2 items ready to serve" above the cart. Once the food is on the table, tap **Served** — the items count as delivered and the table turns green or free again.

## Checking out {/* #kassieren */}

![Check out: amount, payment method, tendered and change](/img/screens/en/pos-pay.png)

**Check out** opens the checkout sheet. On the left is the **amount due** (with the deposit it includes), below it the **payment method**.

Which payment methods exist depends on your organization's [operating mode](./betriebsarten.md). In **Orders only** there is no checkout: the till shows no prices, and you complete orders with **Picked up** or **Close table**, see [Completing orders](./betriebsarten.md#abschliessen).

### Cash

- Enter the amount **tendered** on the keypad or tap a **quick amount**: **Exact** or the next round sums.
- The till shows the **change** — or, in red, what is still missing.
- If a [cash drawer](./geraete.md#drucker) is assigned to the device, it opens as soon as cash is selected and an amount is due – once per transaction.
- **Complete payment** books the payment.

In the [Cashless](./betriebsarten.md#bargeldlos) operating mode **Cash** is gone entirely; the till starts with **Card**.

### Card {/* #kartenzahlung */}

With an assigned SumUp card reader, **Card** appears. Choose a **tip** (none, round up, fixed amounts or a custom amount) and tap **Start card payment**. The guest presents the card at the reader; the till waits for the confirmation. More under [SumUp](./integrationen/sumup.md).

In test mode and while the event is **Planned**, the till does not address the reader: **Card** is greyed out with the hint "No real card payments in test mode". In the [Cashless](./betriebsarten.md#bargeldlos) operating mode the till then just records the card payment, like an external terminal, so you can still run through the flow.

:::warning[Card charged, order not saved]
The money is taken first, then the order is saved. If saving fails (for instance because the connection drops), the till shows "Card payment successful, order not saved" with the transaction number. Tap **Save again** — and **do not charge the card again**. The notice stays even after a reload.
:::

### Discount

If [discount vouchers](./rabatt-bons.md) are set up, **Discount** appears. Choose a voucher — fixed vouchers deduct their amount, for "Enter amount" you type it in. Applied vouchers are listed on the left below the amount and can be removed there. Then choose cash or card for the rest. If the discount covers everything, the button reads **Complete without payment**.

### Tokens {/* #wertmarken */}

If your organization has set up [tokens](./wertmarken.md) (only in **All features**, in Germany with an active Cloud TSE), the checkout sheet has a **Tokens** section: you enter how many tokens of each type the guest gives you and take the rest in cash or by card. There is no change in tokens; if the tokens are worth more than what is open, confirm **Rest as tip** or take fewer tokens. The menu also has **Sell tokens** and **Buy back tokens**. Details are under [Tokens](./wertmarken.md).

### Split bill

At a table, **Split bill** sits below the payment methods. You select the items one guest pays for — sorted by order or by category — and take payment in cash or by card. Repeat until nothing is left. With the **Run a tab** checkout mode, new items that have not been sent yet are sent first. With **Pay immediately**, *Split bill* is only offered for orders that are already open (guest orders, for example), and not while new items are in the cart.

Without a SumUp reader, *Split bill* and *Open orders* offer "Card" with the hint *ext. terminal*: you take the payment on your own card terminal and record it here.

### Done

![Payment completed with change and receipt](/img/screens/en/pos-done.png)

After payment the till shows **Paid** with the amount, method and change, the receipt below and the **receipt** as a QR code (see [Hand out the receipt](#beleg)). **Next receipt** moves on. If the till prints a receipt automatically on every payment, the window closes by itself after five seconds when there is no change. Otherwise it stays until you tap **No receipt** or **Next receipt** – the guest should be able to scan the receipt calmly. With change it always stays until you have handed the money over.

## Hand out the receipt {/* #beleg */}

After every payment the guest must be offered a receipt (obligation to issue receipts, § 146a (2) AO). The guest picks the way:

- **QR code** – shown right after payment. The guest scans it with their phone and sees the receipt as a page with **Download as PDF**. The link is valid for 90 days.
- **E-mail** – you type in the guest's address, they get the receipt by e-mail with a PDF attached. The sender is your club; replies go to your organization's contact address (Settings → Organization). The address is only used for sending and is not stored.
- **Print receipt** – prints the receipt on the till's receipt printer, even if the automatic receipt is off. If the till prints on every payment anyway, the button reads **Print receipt again** and the receipt says "NACHDRUCK" (reprint).
- **Hospitality receipt** – for guests who entertain on business (see [Hospitality receipt](./bewirtungsbeleg.md)).
- **No receipt** – the guest doesn't want one; this only closes the window.

The digital receipt shows the same as the printed one: club with address, items, deposit, included VAT per rate (without VAT for VAT-exempt clubs), total, payment method and – with the Cloud TSE – the TSE details with QR code. Test orders say "TESTMODUS", training bookings "TRAININGSBUCHUNG – KEIN VERKAUF"; if the TSE could not be reached, the receipt says so, just like the printed one. Guest names and notes on items are not on it. The receipt is only created after payment (and, with the Cloud TSE, after the signature).

:::info[Why the QR code appears right away]
An electronic receipt is allowed if the guest agrees – this may also be implicit, for example by scanning the QR code. It counts as provided as soon as the guest has the chance to take it. Only showing the receipt on the till's screen is not enough (AEAO on § 146a no. 2.5.3, 2.5.4 and 2.5.6). The guest does not have to accept the receipt; "No receipt" is fine once it has been offered.
:::

**Later again:** In the [order history](#bestellverlauf), **Receipt** offers the same ways for every paid order. The receipt is created anew from the stored till data each time – even if an old link has expired.

In the **Orders only** operating mode there are no till receipts (the till doesn't take money there), so there is no digital receipt either. The same applies to **Close without payment**.

## Switching and parking tables {/* #tisch-wechseln */}

![Choose table with all tables and "Take cart along"](/img/screens/en/pos-switch.png)

Tapping the table pill in the header opens **Choose table**: the same view as when opening one (number, list or map, depending on the device), the current table outlined, plus Counter and To go.

When you switch tables, the till **parks** the cart of the old table. When you come back, it is there again. Parked carts show up under **Open tables** with "… items not sent". If you typed items in at the wrong table, tick **Take cart along** before switching — the new items then move with you. **Back to tables** returns to **Open table**.

:::note[Parked means: on this till only]
Items that have not been sent only live on the device they were typed into. Whatever other tills should see, you send. Sent orders are visible on every till and can be checked out there.
:::

### Handing over a table {/* #tisch-uebergeben */}

If the till works with [servers](./bedienungen.md) and someone goes home, another server takes over the table:

1. Open the table. It needs at least one sent order that is still open.
2. In the **Menu**, tap **Hand over table**.
3. Under "Who takes over?", tap the new server. All open orders of the table move along.

Every server can hand over their own tables; only a shift lead or an admin can hand over someone else's. More under [Table handover](./bedienungen.md#tischuebergabe).

## Signing in and locking {/* #pin-und-sperre */}

If the device is set to **Shared till** ([Devices](./geraete.md#pin-und-sperre)), everyone signs in with their PIN before booking. That way it is clear for every order and payment who booked it. The PINs belong to [servers](./bedienungen.md) or to [members](./mitglieder.md).

- **Signing in** — the PIN screen asks "Who is serving?". The PIN alone is enough. If set up, name tiles with short name and color appear above it.
- **The chip** — the color and short name then appear at the top right. Tapping it opens **Switch** (the next person signs in), **Lock** and **Sign out**.
- **Cart per server** — when switching or locking, the till keeps the person's unsent cart and parked tables. The till shows a note such as "The cart is kept for Anna." When the same person signs in again, everything is back. This only applies on this device and only until a reload.
- **Automatic lock** — after a time without touch (2 minutes by default), but never during a running payment. Optionally the till locks after every payment.
- **Reload** — afterwards the till asks for the PIN again.
- **Offline** — unlocking does not work: "No connection – unlocking works again once online." A short connection drop does not sign anyone out.
- **Wrong PINs** — after 5 failed attempts within 30 minutes PIN entry is locked for 30 seconds, each further one doubles the lock (at most 15 minutes), after 20 it stays locked until an admin releases it ([Wrong PINs](./bedienungen.md#fehlversuche)).

With **Fixed server** there is no PIN screen; the chip shows the server the device belongs to and opens **My running total**. There is no switching or locking there. With **No servers** there is neither a chip nor a lock.

### Cancelling with approval {/* #freigabe */}

Whoever has the **Cancel & refund** right cancels and refunds directly in the [order history](#bestellverlauf). Without it, the till asks for the PIN of a **shift lead**, of a member with the **Orders** permission or of an admin. OpenEOS records who approved. More under [Servers](./bedienungen.md#storno).

## Order history {/* #bestellverlauf */}

In the **Menu**, **Order history** opens the orders of the running event, grouped by day, newest first.

- **Search** by number, table or product.
- **Status:** **All**, **In kitchen**, **Ready**, **Open – not paid**, **Completed**, **Cancelled** and **Refunded**.
- Under **Filters**: **Payment**, **Till** (**This device** or **All tills**) and **Period** (**Today** or **Event**). **Reset filters** clears everything.

Tapping an order opens it with its items, payments and history. Depending on its state you find:

- **Collect payment** for an open order,
- **Cancel items**, **Cancel & refund** and **Refund** (partly by items, as an amount or everything) – with a reason and, depending on the [device setting](./geraete.md#storno-erstatten), only with approval,
- **Receipt** to hand out the till receipt again as a QR code, by e-mail or printed – also as a [hospitality receipt](./bewirtungsbeleg.md) (see [Hand out the receipt](#beleg)),
- **Kitchen ticket** and, for refunds, **Counter-receipt** to reprint.

If the kitchen has already started on an item, the till asks before cancelling ("The kitchen has already started – cancel anyway?").

## Deposit {/* #pfand */}

If an item has a [deposit](./pfand.md), the till adds it automatically — depending on your settings at the counter, at the table or both. If a guest only wants a refill, set **Refill** in the line's options window; no new deposit is charged for it.

For returned cups or bottles there is the **Deposit return** (menu or the button at the top of the cart): count how many come back per deposit type and choose

- **Pay out** — the guest gets the money back in cash, the cash drawer opens, or
- **Offset** — the amount is deducted from the current cart (only if there is something in the cart).

After **Pay out** the till shows **Deposit paid out** with the deposit return receipt and its receipt number. It is printed like the sales receipt: automatically if receipts are printed after payment (then there is **Print receipt again**), otherwise via **Print receipt**. As after a sale, the window closes by itself after five seconds. Only deposits with the same [VAT rate](./pfand.md#umsatzsteuer) are offset – a returned cup (19 %) does not replace a plate deposit (7 %).

In the [Cashless](./betriebsarten.md#bargeldlos) operating mode there is no **Pay out**, only **Offset** against new deposits in the same sale. In [Orders only](./betriebsarten.md#nur-bons) there are no deposits.

## Receipts and the Cloud TSE {/* #tse */}

If your organization has an active [Cloud TSE](./integrationen/cloud-tse.md), the till secures every transaction in the TSE before it prints anything:

- **Signature first, then the receipt.** The receipt – printed or digital – is only issued once the TSE has finished and signed the transaction. That usually takes just a moment.
- **The TSE does not answer.** After a short wait the till issues the receipt anyway, as an outage receipt with the note **„TSE nicht erreichbar – Beleg ohne Signatur“** (TSE not reachable – receipt without signature). You keep checking out as usual, see [When the TSE fails](./integrationen/cloud-tse.md#ausfall).
- **Kitchen tickets only after securing.** With **Pay immediately** the TSE signs the payment before the kitchen and bar get their ticket. With **Send** – at the table, at the counter on a tab or for orders from the admin area – the TSE secures the order first, then the kitchen ticket prints.
- **Order start.** If an order was placed first and paid later, the receipt also shows the **order start** („Bestellbeginn“): the time the first order was secured in the TSE.
- **Reprint.** You print the receipt again from the [order history](#bestellverlauf), even if automatic receipts are off. If one was printed before, the new one is marked **NACHDRUCK** (reprint) and carries the same TSE data as the original; no new signature is created.
- **The signature arrives after the outage receipt.** The receipt stays an outage receipt. A reprint only shows the signature as a marked note „Signatur nach Belegausgabe“ (signature after the receipt was issued), without a QR code.

Without the Cloud TSE the till prints receipts and kitchen tickets right away as usual.

## Cash book {/* #kassenbuch */}

If your organization accepts cash, **Cash book** in the menu opens the cash of this till: **Opening balance**, **Cash in**, **Cash out** and **Cash count**, plus the expected cash in the drawer. How it works is described under [Cash book](./kassenbuch.md). In the "Orders only" and "Cashless" operating modes the menu item is hidden.

## Emergency support {/* #notfall-support */}

If your organization has booked the event, the menu shows **Emergency support** during real sales (phase **Active**). The window shows the phone number; on a tablet or phone you call it straight away with **Call**. The number is only for problems that stop your sales. In test mode and while **Planned** the menu item is not there. More under [Support](./support.md#emergency-support).

![Emergency support in the till menu](/img/screens/en/pos-emergency.png)

## On phones and tablets

<img src="/img/screens/en/pos-phone.png" alt="The till on a phone with the cart bar" width="320" />

The till adapts to the screen width:

- **Tablet in landscape and PC** — categories on the left, items in the middle, cart on the right.
- **Phone and tablet in portrait** — the categories are a bar at the top, the cart is a green **bar** at the bottom with the count and total. Tapping it opens the cart from below. Sheets such as checkout, options or choose table also open from below. The line with copyright, version, imprint and privacy sits at the end of the page.

**Swipe to close:** you close any sheet — cart, checkout, options, choose table — by dragging it down by its handle or header (or by its content when that is scrolled to the top). Let go too early and the sheet springs back. Swiping is switched off on the map so that you can move it around.

## When the connection drops

The till needs a connection. The status at the top right shows how it is doing:

- **Connecting …** — the live connection is briefly gone. You can carry on as normal.
- **No live data** — the live connection has been missing for a while, so the till polls the server itself. Table states may lag a little; *Open tables* then shows "As of …" with the time.
- **Offline** — no connection. Below the header it says "No connection – sending and checkout work again once the till is online." Typing in items, switching and parking tables still works; **Send**, **Check out** and paying out deposits are blocked.

Orders are **not** stored and sent later. Plan for this: a marquee at the edge of the Wi-Fi is the most common reason for a till to stand still. Check the reception **before** the event wherever a till will stand.

If two devices check out the same table at the same time, the first one wins; the second reports "This table was just paid on another device." and shows the new state.

## Signing out the till

**Sign out device** in the menu disconnects the device from the organization after asking first. It then has to be [connected again](./geraete.md) — not something to do in between. To leave the till for a moment, use [Lock](#pin-und-sperre).
