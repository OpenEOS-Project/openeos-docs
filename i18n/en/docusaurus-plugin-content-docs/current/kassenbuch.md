---
title: Cash book
description: Record change money, cash deposits, skimming and cash counts at the till — and see the day's cash balance in the admin area.
---

# Cash book

The cash book records how much **cash** is in your till: the change money at the start, money that is added or taken to the safe, and the count at the end. Like a sale, every entry is its own receipt signed by the [Cloud TSE](./integrationen/cloud-tse.md). This way the cash balance in the [cash point closing](./kassen-nachschau.md#abschluss) matches what is really in the drawer.

:::info[Only with cash]
The cash book is only available if your organization may accept cash (operating mode **All features**, in Germany with an active Cloud TSE). In the modes **Cashless** and **Orders only** the menu item is hidden.
:::

## At the till {/* #kasse */}

Tap **Cash book** in the till's menu. If the till works with [servers](./bedienungen.md), only those with the **Cash book** right see the menu item – shift leads have it. At the top you see the **expected balance** of this till: the amount of cash that should be in the drawer right now. Below it you see how it is made up (opening balance, deposits, withdrawals, cash sales, cash refunds, deposit payouts, [tip payouts](./trinkgeld.md#auszahlung), differences) and today's entries. If you pay out card tips in cash to an employed server, this reduces the expected balance of the drawer the money comes from.

| Action | When | What is booked |
|---|---|---|
| **Opening balance** | At the start, only for cash that is **already in the till** – what was left at the last cash count. OpenEOS suggests the last counted amount. | Anfangsbestand („Restbestand Vorabschluss“, rest from the previous closing) |
| **Deposit** | Cash is added, above all the **change money from the club's cash box** – at the start and as a top-up | Geldtransit „Wechselgeld aus Vereinskasse“ (change money from club cash box) |
| **Withdrawal** | You skim cash and take it to the club's cash box, the safe or the bank | Geldtransit „Abschöpfung an Vereinskasse“ (transfer to club cash box) |
| **Cash count** | At the end or in between: you count the till | the difference between counted and expected |

:::info[Change money is not an opening balance]
If you take change money from the club's cash box before the festival, book it as a **deposit**, not as the opening balance. Under the DSFinV-K the opening balance is only the cash already in the till when it opens; everything that goes in or out is a **cash transfer** (Geldtransit) between the club's cash box and the festival till. A club has no private contributions. The counter-record is your treasurer's cash book: it shows the same amount as an outflow or inflow of the club's cash box. Entries made before November 2026 stay valid.
:::

How it works:

1. Tap the action.
2. Enter the **amount** (always positive). For a cash count you enter the **counted** amount; the till immediately shows the **difference** from the expected balance.
3. Optionally add a **note**, e.g. "Change for tent A".
4. Tap **Book**. The entry appears in the list with its receipt number and TSE status.

The expected balance applies to **this device** (its drawer). If you work with several tills, each one counts its own.

:::tip[Cash count without a difference]
If the counted amount matches exactly, only the count is recorded — no receipt is created.
:::

## In the admin area {/* #verwaltung */}

Under **Cash book** in the sidebar you see the cash balance of a **business day** (6 am to 6 am): the expected balance of the whole till and per device, and all entries with time, device, amount and note. Pick a date to look at an earlier day.

As an admin you can also book entries for the **whole till** there, e.g. when the cash of all tills goes to the safe together in the evening.

## A typical festival day {/* #ablauf */}

1. **Before opening:** if cash is left in the till from last time, book the **opening balance** (OpenEOS suggests the last counted amount). Book the change money from the club's cash box as a **deposit**.
2. **During the festival:** with a lot of cash, book a **withdrawal** and take the money to the safe or the club's cash box. If a till needs change, book a **deposit**.
3. **At the end:** count the till, book a **cash count**, then skim the cash to the club's cash box with a **withdrawal**. Whatever stays in the till is the opening balance next time.

The day's cash point closing is created automatically afterwards — see [Cash register inspection](./kassen-nachschau.md).

:::note
This is not tax advice. How you count and document cash is defined in your cash handling instructions or [procedure documentation](./verfahrensdokumentation.md#wechselgeld); if in doubt, ask your tax advisor.
:::
