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

For tax purposes a deposit is part of the consideration (Abschn. 10.1 Abs. 8 UStAE): it is taxed at the rate of the goods it is charged for, and a deposit return reduces revenue and VAT again at the same rate (§ 17 UStG). OpenEOS therefore works like this:

- Every deposit type has **one** VAT rate (19 %, 7 % or 0 %, default 19 %). If you charge deposits for goods with different rates, create separate deposit types. Typical ones are:

  | Deposit type | Rate | Why |
  |---|---|---|
  | **Drink cup** | 19 % | Drinks in catering are almost always taxed at 19 %. |
  | **Tableware for food** (plates, cutlery) | 7 % | Food served in restaurant and catering services is taxed at 7 %. |

- If the same cup is used for drinks at 7 % and 19 %, 19 % on both issue and return is an acceptable simplification; at most it leads to slightly more tax.
- On the receipt the deposit is a line of its own and included in the VAT shown for its rate. A discount only reduces the goods, never the deposit.
- A deposit return books the deposit negative at the rate of the deposit type – on the receipt, in the TSE and in the DSFinV-K export.
- Changing the rate only affects new sales and returns. Orders, refunds and payouts already booked stay as they were.
- Record in your [procedure documentation](./verfahrensdokumentation.md#pfand) which rate applies to which deposit type and why.

The **netting procedure** (only the annual balance of deposits issued and taken back is taxed) is only available on application to the tax office (Abschn. 10.1 Abs. 8 Satz 5 UStAE). OpenEOS does not support it; it books the deposit on every issue and return.

### Cups from before the switch: the old balance {/* #altsaldo */}

Until November 2026 OpenEOS booked deposits without VAT. If a guest returns a cup that was sold back then, the return must not reduce VAT – no VAT was paid on that deposit.

OpenEOS therefore keeps an **old balance** („Altsaldo“) per organization: deposits sold and paid without a VAT rate before the switch and not yet returned (excluding test bookings and cancelled or refunded orders). Every new deposit return is booked **against the old balance first**:

- That part appears on the receipt as „Pfandrückgabe … (Altsaldo vor USt-Umstellung)“, without a VAT line, as not taxable (VAT key 5) in the TSE and the DSFinV-K export, and at 0 % in the **VAT** report.
- Only once the old balance is used up does a return reduce revenue and VAT at the rate of the deposit type.
- OpenEOS shows the open old balance in the deposit settings.

:::tip[Clarify the old balance with your tax advisor]
Instead of reducing the old balance bit by bit, you can also tax it once at the time of the switch; after that every return reduces VAT at the full rate. OpenEOS does not support this – agree on it with your tax advisor. For VAT-liable clubs, booking deposits without VAT and without an approved netting procedure was not correct; earlier periods may need a correction under § 153 AO.
:::

### Small businesses {/* #kleinunternehmer */}

If your organization works **without VAT** (small business under § 19 UStG, setting in the [organization](./einstellungen.md#allgemein)), OpenEOS still shows no VAT and the rate of the deposit type has no effect. Like all revenue, deposits are then exported as tax-exempt (VAT key 6); they count towards the total turnover under § 19 UStG, and returns reduce it. The old balance does not matter for small businesses and is not used up.

:::note
This is not tax advice. Check the rates for your club yourself or with your tax advisor.
:::

## When is a deposit charged?

Via **Settings** in the list of deposit types you choose which sale types incur a deposit:

- **Deposit for table service** — guests served at a table pay a deposit.
- **Deposit for counter / takeaway** — a deposit is charged for counter sales and takeaway.

This lets you, for example, charge a deposit only on takeaway sales but not for table service.

![When is a deposit charged?](/img/screens/en/pfand-settings.png)

## Deposit in operation

- **Issuing:** When a deposit-bearing product is sold, the deposit amount is automatically added to the order.
- **Returns:** When a guest brings back cups or bottles, you book it at the till via **Deposit return** in the menu or the button at the top of the cart — either **Pay out** or **Offset** against the current cart. See [Till](./kasse.md#pfand) for how this works. In the [Cashless](./betriebsarten.md#bargeldlos) operating mode there is no cash payout, only offsetting; in [Orders only](./betriebsarten.md#nur-bons) there are no deposits.
- **Return receipt:** Every payout has a "Pfandrückgabe" receipt with a receipt number, the deposit types as negative amounts, the VAT per rate, payment method cash, till, date and – with Cloud TSE – the TSE data. It is printed like the sales receipt: automatically if your receipts are printed after payment, otherwise on request via **Print receipt** in the **Deposit paid out** message.
- **Reports:** In the [Reports](./auswertung.md) section you can see the deposit balance — i.e. deposits collected versus deposits refunded — and in the [VAT](./auswertung.md#umsatzsteuer) card goods, deposits and deposit returns per VAT rate.

![Deposit return at the till](/img/screens/en/pos-pfand-return.png)

:::info
The deposit balance helps you reconcile collected and refunded deposits at the end of an event.
:::
