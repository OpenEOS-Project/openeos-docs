---
sidebar_position: 5
title: Events
description: Create, activate, and manage events.
---

# Events

An **event** is the container for a specific festival or sales day. Products, prices, stations, orders, and reports always relate to an event. Before you create products or accept orders, you therefore need to create an event and **activate** it first.

You can find this section via **Events** in the sidebar.

![Events overview](/img/screens/en/events.png)

## Creating an event

1. Click **Create Event**.
2. Fill in the form:
   - **Name** (required) — e.g. "Sommerfest 2026"
   - **Description** — optional additional text
   - **Start date** and **End date** — without an end date the event lasts one day
   - **Checkout mode** — pay immediately or run a tab, see [below](#kassiermodus)
   - **Tables** — whether and how the tills ask for a table, see [below](#tische)
   - **Enable online shop** — lets guests order items from this event online, with opening hours and an optional service fee
3. Click **Create**.

![Create event](/img/screens/en/events-dialog.png)

You can change everything later via **Edit**. If you change the checkout mode or tables while the event is running, the tills pick up the new setting by themselves.

## Checkout mode {/* #kassiermodus */}

The checkout mode decides when guests pay at the till:

| Checkout mode | For | At the till |
|---|---|---|
| **Pay immediately** | Bars, food stalls, drinks counters — the guest pays when ordering | Only **Check out**: order and payment in one go |
| **Run a tab** | Table service — guests pay at the end | **Send** passes rounds to the kitchen and bar, **Check out** settles everything open at the table at the end |

The details are under [Till](./kasse.md#senden-oder-kassieren).

## Tables {/* #tische */}

![Checkout mode and tables in the event dialog](/img/screens/en/events-dialog-tables.png)

Under **Tables** you decide whether the tills ask for a table:

| Setting | At the till |
|---|---|
| **No tables (counter service)** | All tills book at the counter without asking for a table. |
| **Enter table number freely** | The till asks for any number. No tables need to exist. This is the default. |
| **Predefined tables** | The till only offers the tables you created — by number, as a list and on the floor plan. |

With **Predefined tables** you also choose the **Areas for this event** — only *Tent A*, say, if the beer garden stays closed this year. **All areas** also includes areas created later. You maintain the areas and tables themselves under [Tables](./tische.md) — the **Manage tables** link in the dialog takes you there. If no tables exist yet, the dialog points this out; the tills can then only book without a table.

:::note[A table mode does not make every till a table till]
Whether a till asks for a table at all also depends on the device: tills in **Counter** service mode always book at the counter, whatever is set here. See [Devices](./geraete.md#betriebsmodus).
:::

## What an event costs

OpenEOS is billed **per event day** — not per order, and not as a subscription. The amount appears right under the date range as you create it:

> **Activating costs €60.00**
> 3 days × €25.00 = €75.00, less 20% first-event discount
> Trying it out is free — up to 25 orders in test mode.

Change the dates and the amount follows.

### What counts as an event day {/* #veranstaltungstag */}

An event day runs **from 6:00 to 6:00** (your organization's local time), not from midnight to midnight. A night that ends before 6 in the morning still belongs to the day before:

| Period | Days billed |
|---|---|
| Sat 20:00 – Sun 02:00 | 1 |
| Sat 14:00 – Sat 23:00 | 1 |
| Fri 18:00 – Sat 06:00 | 1 — stopping at exactly 6:00 does not start a new day |
| Fri 17:00 – Sun 18:00 | 3 |

The form only asks for dates. If your event ends during the night before 6:00, pick the day the evening starts as the end date — for a party from Saturday 20:00 to Sunday 02:00 that is Saturday to Saturday. The online shop's opening hours can still run into the night (e.g. 20:00 – 02:00).

Events that are already activated keep the days and the amount they were paid for.

### Test first, pay later

A new event starts in **test mode**. Everything works in it — tills, screens, printers, reporting — capped at **25 orders**. That way you can run the whole thing before any money changes hands.

Activating deletes the test orders. **Your setup stays**: products, categories, prices, stations, devices and printers do not have to be entered again.

:::tip[Our advice for a first event]
Set everything up calmly beforehand and play one round through in test mode: take an order at the till, acknowledge it on the kitchen screen, print a ticket. Then you know on the day that the chain holds.
:::

### Paying

Activation is paid **by card or direct debit**. The invoice arrives by email automatically and is also available under **Invoices**.

The payment dialog also tells you until when you can cancel free of charge.

### Cancelling an activation {/* #stornieren */}

If the event is called off or you picked the wrong date, you can cancel the activation **free of charge up to 7 days before the start**. You get the full amount back. The only condition: the event must not have any **real orders** yet — test orders do not count.

In the list of events, the **Activation** icon (badge with a check mark) opens the overview: status, amount paid and the exact deadline, for example *Free cancellation until Fri, 09/04/2026, 5:00 PM*. **Cancel activation** asks once more and shows the amount, where the money goes and what happens next. Organization admins can cancel.

| Paid by | What you get back |
|---|---|
| **Card** | The full amount goes back to the same card, usually within 5–10 business days. |
| **Direct debit** | The full amount is transferred back to the same account, usually within 5 business days. |
| **Invoice** | If the invoice has already been issued, you get a cancellation invoice. If you have already paid it, we transfer the amount back. |

For card and direct debit, a **credit note** for the original invoice appears under **Invoices**, and a confirmation goes to the billing email.

After cancelling:

- The event is no longer activated and continues in **test mode** (up to 25 orders). Your setup stays.
- You can activate it again later; the price is then recalculated.
- If it was your first paid event, the **starter bonus** applies again.

:::note[How the deadline is calculated]
What counts is the start of the event in your organization's time zone: the same time of day, seven calendar days earlier. If you postpone the event after paying, the deadline stays tied to the original start. If the deadline has passed or there are already orders, please contact support.
:::

## Activating an event

Newly created events are initially **inactive**. In the table you will find action buttons per row for **editing**, **activating**, managing, and **deleting** an event.

Activate the desired event — it then appears with the status **Active** and is displayed as the active event in the top left of the sidebar. Only after activation can you maintain products and record orders.

:::info[Only one active event at a time]
The active event controls which products appear at the till and which event orders are assigned to. When you switch the active event, the context in products, stations, and stock management switches with it.
:::

## Status & date

In the overview you can see the name, **status** (Active/Inactive), and **date range** for each event. This keeps you on top of things even when running multiple events.
