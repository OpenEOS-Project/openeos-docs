---
title: Cash book
description: Record change money, cash deposits, skimming and cash counts at the till — and see the day's cash balance in the admin area.
---

# Cash book

The cash book records how much **cash** is in your till: the change money at the start, money that is added or taken to the safe, and the count at the end. Like a sale, every entry is its own receipt signed by the [Cloud TSE](./integrationen/cloud-tse.md). This way the cash balance in the [cash point closing](./kassen-nachschau.md#abschluss) matches what is really in the drawer.

:::info[Only with cash]
The cash book is only available if your organization may accept cash: in the [operating mode](./betriebsarten.md) **All features** (in Germany with an active Cloud TSE) or **All features (existing)**. In the modes **Cashless** and **Orders only** the menu item is hidden.
:::

## At the till {/* #kasse */}

Tap **Cash book** in the till's menu. If the till works with [servers](./bedienungen.md), only those with the **Cash book** right see the menu item – shift leads have it. At the top you see the **Expected cash in this register**: the amount of cash that should be in the drawer right now, plus the last cash count. Below it you see how it is made up (opening balance, cash in, cash out, cash sales, cash refunds, deposit payouts, [tip payouts](./trinkgeld.md#auszahlung), differences) and the **Bookings today**. If you pay out card tips in cash to an employed server, this reduces the expected cash of the drawer the money comes from.

![Cash book at the till: expected cash and entries](/img/screens/en/pos-cashbook.png)

| Action | When | What is booked |
|---|---|---|
| **Opening balance** | At the start, only for cash that is **already in the till** – what was left at the last cash count. OpenEOS suggests the last counted amount. | Anfangsbestand („Restbestand Vorabschluss“, rest from the previous closing) |
| **Cash in** | Cash is added, above all the **change money from the club's cash box** – at the start and as a top-up | Geldtransit „Wechselgeld aus Vereinskasse“ (change money from club cash box) |
| **Cash out** | You skim cash and take it to the club's cash box, the safe or the bank | Geldtransit „Abschöpfung an Vereinskasse“ (transfer to club cash box) |
| **Cash count** | At the end or in between: you count the till | the difference between counted and expected |

:::info[Change money is not an opening balance]
If you take change money from the club's cash box before the festival, book it as **cash in**, not as the opening balance. Under the DSFinV-K the opening balance is only the cash already in the till when it opens; everything that goes in or out is a **cash transfer** (Geldtransit) between the club's cash box and the festival till. A club has no private contributions. The counter-record is your treasurer's cash book: it shows the same amount as an outflow or inflow of the club's cash box. Entries made before November 2026 stay valid.
:::

How it works:

1. Tap the action.
2. Enter the **amount** on the keypad (always positive). For a cash count you enter the **Counted cash**; the till shows the expected cash and immediately whether the **Register balances** or there is a **Surplus** or **Shortage**. The deviation is booked as "difference expected/actual".
3. Optionally add a **note**, e.g. "Change for tent A".
4. Tap **Book opening balance**, **Book cash in**, **Book cash out** or **Book cash count**. The entry appears in the list with its receipt number and TSE status.

The expected cash applies to **this device** (its drawer). If you work with several tills, each one counts its own.

:::tip[Cash count without a difference]
If the counted amount matches exactly, only the count is recorded — no receipt is created.
:::

## In the admin area {/* #verwaltung */}

As an admin you see the cash balance of a **business day** (6 am to 6 am) under **Cash book** in the sidebar: the **Expected cash, whole register**, the balance **Per device** and all **Bookings** with time, device, type, amount, counted / expected, note and operator. Under **Business day** you switch to an earlier day; **Today** takes you back.

![Cash book in the admin area](/img/screens/en/cashbook.png)

Under **Book for the whole register** you can also book for the whole till there, e.g. when the cash of all tills goes to the safe together in the evening. Bookings always go to the current business day. To book for a single till, use the till itself.

## A typical festival day {/* #ablauf */}

1. **Before opening:** if cash is left in the till from last time, book the **opening balance** (OpenEOS suggests the last counted amount). Book the change money from the club's cash box as **cash in**.
2. **During the festival:** with a lot of cash, book **cash out** and take the money to the safe or the club's cash box. If a till needs change, book **cash in**.
3. **At the end:** count the till, book a **cash count**, then skim the cash to the club's cash box with **cash out**. Whatever stays in the till is the opening balance next time.

The day's cash point closing is created automatically afterwards — see [Cash register inspection](./kassen-nachschau.md).

:::note
This is not tax advice. How you count and document cash is defined in your cash handling instructions or [procedure documentation](./verfahrensdokumentation.md#wechselgeld); if in doubt, ask your tax advisor.
:::
