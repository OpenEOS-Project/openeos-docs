---
sidebar_position: 8
title: Deposits
description: Create deposit types, assign them to products, and define deposit rules.
---

# Deposits

The **Deposit** module lets you charge a deposit on cups, bottles, or crockery. You define deposit types, assign them to products, and specify which sale types incur a deposit. At the till, the deposit is added automatically; when items are returned, the till pays it back.

![Deposit](/img/screens/en/pfand.png)

## Create a deposit type

Click **Create deposit type** and define a deposit type: **Name** (e.g. "Reusable cup") and **Deposit amount (€)** (e.g. 2.00). Under **VAT rate** pick the VAT rate of the drinks or goods this deposit belongs to – usually 19 %. Only **active** deposit types can be used at the till. Then assign the deposit type in the dialog of your drinks or crockery [products](./produkte.md).

![Create deposit type](/img/screens/en/pfand-dialog.png)

## Deposits and VAT {/* #umsatzsteuer */}

For tax purposes a deposit is part of the consideration: it is taxed at the rate of the goods it is charged for, and a deposit return reduces revenue and VAT again at the same rate. OpenEOS therefore works like this:

- Every deposit type has **one** VAT rate (19 %, 7 % or 0 %, default 19 %). If you charge deposits for goods with different rates – e.g. cups for drinks (19 %) and plates for food (7 %) – create separate deposit types.
- On the receipt the deposit is a line of its own and included in the VAT shown for its rate. A discount only reduces the goods, never the deposit.
- A deposit return books the deposit negative at the rate of the deposit type – on the receipt, in the TSE and in the DSFinV-K export.
- **Without VAT** (e.g. small businesses, setting in the [organization](./organisation.md)) OpenEOS still shows no VAT; the rate of the deposit type has no effect then.
- Changing the rate only affects new sales and returns. Orders, refunds and payouts already booked stay as they were. Deposits sold before November 2026 were booked without VAT and stay at 0 % in reports.

## When is a deposit charged?

Via **Settings** in the list of deposit types you choose which sale types incur a deposit:

- **Deposit for table service** — guests served at a table pay a deposit.
- **Deposit for counter / takeaway** — a deposit is charged for counter sales and takeaway.

This lets you, for example, charge a deposit only on takeaway sales but not for table service.

![When is a deposit charged?](/img/screens/en/pfand-settings.png)

## Deposit in operation

- **Issuing:** When a deposit-bearing product is sold, the deposit amount is automatically added to the order.
- **Returns:** When a guest brings back cups or bottles, you book it at the till via **Deposit return** in the menu or the button at the top of the cart — either **Pay out** or **Offset** against the current cart. See [Till](./kasse.md#pfand) for how this works. In the [Cashless](./betriebsarten.md#bargeldlos) operating mode there is no cash payout, only offsetting; in [Orders only](./betriebsarten.md#nur-bons) there are no deposits.
- **Return receipt:** Every payout has a "Pfandrückgabe" receipt with a receipt number, the deposit types as negative amounts, the VAT per rate, payment method cash, till, date and – with Cloud-TSE – the TSE data. It is printed like the sales receipt: automatically if your receipts are printed after payment, otherwise on request via **Print receipt** in the **Deposit paid out** message.
- **Reports:** In the [Reports](./auswertung.md) section you can see the deposit balance — i.e. deposits collected versus deposits refunded — and in the [VAT](./auswertung.md#umsatzsteuer) card goods, deposits and deposit returns per VAT rate.

:::info
The deposit balance helps you reconcile collected and refunded deposits at the end of an event.
:::
