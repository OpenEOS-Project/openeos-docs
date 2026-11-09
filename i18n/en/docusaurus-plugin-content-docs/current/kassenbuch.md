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

Tap **Cash book** in the till's menu. If the till works with [servers](./bedienungen.md), only those with the **Cash book** right see the menu item – shift leads have it. At the top you see the **expected balance** of this till: the amount of cash that should be in the drawer right now. Below it you see how it is made up (opening balance, deposits, withdrawals, cash sales, cash refunds, deposit payouts, differences) and today's entries.

| Action | When | What is booked |
|---|---|---|
| **Opening balance** | At the start: the change money put into the till | Anfangsbestand (opening balance) |
| **Deposit** | Cash is added, e.g. more change from the club's cash box | Geldtransit (cash in transit, deposit) |
| **Withdrawal** | You skim cash and take it to the safe or the bank | Geldtransit (cash in transit, withdrawal) |
| **Cash count** | At the end or in between: you count the till | the difference between counted and expected |

How it works:

1. Tap the action.
2. Enter the **amount** (always positive). For a cash count you enter the **counted** amount; the till immediately shows the **difference** from the expected balance.
3. Optionally add a **note**, e.g. "Change from the club's cash box".
4. Tap **Book**. The entry appears in the list with its receipt number and TSE status.

The expected balance applies to **this device** (its drawer). If you work with several tills, each one counts its own.

:::tip[Cash count without a difference]
If the counted amount matches exactly, only the count is recorded — no receipt is created.
:::

## In the admin area {/* #verwaltung */}

Under **Cash book** in the sidebar you see the cash balance of a **business day** (6 am to 6 am): the expected balance of the whole till and per device, and all entries with time, device, amount and note. Pick a date to look at an earlier day.

As an admin you can also book entries for the **whole till** there, e.g. when the cash of all tills goes to the safe together in the evening.

## A typical festival day {/* #ablauf */}

1. **Before opening:** book the **opening balance** (change money) at every till that takes cash.
2. **During the festival:** with a lot of cash, book a **withdrawal** and take the money to the safe. If a till needs change, book a **deposit**.
3. **At the end:** count the till, book a **cash count**, then skim the cash with a **withdrawal**.

The day's cash point closing is created automatically afterwards — see [Cash register inspection](./kassen-nachschau.md).

:::note
This is not tax advice. How you count and document cash is defined in your cash handling instructions; if in doubt, ask your tax advisor.
:::
