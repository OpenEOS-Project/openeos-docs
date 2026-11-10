---
sidebar_position: 15
title: Reports
description: Analyze revenue, orders, top products, and payment methods, and export as CSV.
---

# Reports

**Reports** gives you an overview of revenue, orders, and product analytics. Use it to evaluate your event — both during operations and for post-event accounting. In the [Orders only](./betriebsarten.md#nur-bons) operating mode there is no revenue; reports then show quantities only.

![Reports](/img/screens/en/reports.png)

## Selecting a Period and Event

At the top you filter the report by **Event** and **Time range**; the active event is preselected. Quick-select options **Today**, **Yesterday**, and **All time** are available; alternatively, choose a custom **From** and **To** date.

## Key Metrics

| Metric | Meaning |
| --- | --- |
| **Total revenue** | Revenue from paid orders |
| **Orders** | Number of orders / items sold |
| **Avg. order value** | Average per paid order |
| **Deposit (balance)** | Deposit collected minus deposit refunded |
| **Cancellation rate** | Share of cancelled orders |

## Detailed Reports

- **Top products** – your products with category, quantity, revenue and average price, net and sorted by revenue.
- **Payment methods** – breakdown of revenue by payment method with count, total and share.
- **VAT** – goods, deposits and deposit returns per VAT rate, see [below](#umsatzsteuer).
- **Revenue by channel** – till, online shop and QR order compared.
- **Top categories** – quantity and revenue per category, net and sorted by revenue.
- **Revenue by device** – which till took how much.
- **Servers** – figures per server, see [below](#bedienungen).
- **Hourly breakdown** – revenue per hour (0–23), ideal for identifying peak times.

Top products and top categories are **net**: cancellations and refunded quantities are deducted, discounts spread proportionally, deposits are not included. Below the table you find **Total products** or **Total categories**, **Refunds without an item**, **Tips**, if needed **Rounding (discount spread)** and the event's **Net revenue**. In [Orders only](./betriebsarten.md#nur-bons) both are sorted by quantity.

## VAT {/* #umsatzsteuer */}

The **VAT** card shows per **VAT rate** the columns **Goods**, **Deposit**, **Deposit returns**, **Gross**, **Net** and **VAT**, with the **Total** below. Deposits are part of the consideration and carry the rate of their [deposit type](./pfand.md#umsatzsteuer); deposit returns reduce it. Tips are not included.

![Reports: VAT per rate](/img/screens/en/reports-vat.png)

- If your organization does not charge VAT (e.g. small business), all amounts are shown at 0 % without tax.
- Deposits from before November 2026 were booked without VAT and stay unchanged at 0 %.
- The card is also available as CSV (**Export CSV**) and in the PDF. In [Orders only](./betriebsarten.md#nur-bons) it is not shown.

## Servers {/* #bedienungen */}

If you work with [servers](./bedienungen.md), the **Servers** report shows per server – and per member who took payments with their member PIN. The card appears as soon as a server has booked something in the period.

![Reports: servers](/img/screens/en/reports-waiters.png)

| Column | Content |
| --- | --- |
| **Orders**, **Items** | what the person took |
| **Collected** | amount collected, split into **Cash** and **Card** |
| **Tips** | tips collected |
| **Canc./refunds** | what the person cancelled or refunded |
| **Deposits** | deposits paid out |
| **Settlements** | [settlements](./bedienungen.md#abrechnung) in the period |
| **Open tables** | tables that are not paid yet |

The CSV file additionally contains **Sales** and **Other** (payment methods other than cash and card).

- The row **No server** collects bookings not attributed to anyone – from the online shop, for example, or from tills without servers.
- Test bookings are not included. The period is based on the booking time.
- In [Orders only](./betriebsarten.md#nur-bons) the report shows quantities only.
- You export it as CSV like the other reports, see [Export](#export).
- The report is only available in the admin area, not via [API access](./api-zugaenge.md) or [AI agents](./ki-agenten.md): it contains personal data of your till staff.

## Export

Each detailed report can be downloaded via **Export CSV**. This lets you process the data further in Excel or your accounting software.

:::tip[Post-event settlement]
After the event, select the **All time** period and export top products, payment methods and VAT as CSV — this simplifies the final settlement and the summary report for the board.
:::

## Exporting as PDF

**Export PDF**, top right, produces a finished summary of the chosen period — for printing, for cashing up, or for the committee meeting.

The PDF contains:

- A **header** with organization and period
- **Headline figures**: revenue, orders, average receipt, deposit and cancellation rate
- **Hourly revenue** as a bar chart, showing when the rush was
- **Payment methods** with count, amount and share
- **VAT** per rate
- **Top products** with category, quantity, revenue and average price
- **Revenue by channel** (till, online shop, QR order)
- **Top categories** and **Revenue by device**

The **Servers** report is not part of the PDF; export it as CSV.

The file is named after the period, for example `openeos-report-sommerfest-2026.pdf`, and downloads straight away. It is generated in the browser; with many orders that takes a moment, during which it reads *Generating…*.

:::tip[For cashing up]
Choose **All time** (or **From**/**To** covering all event days) rather than *Today* if the event ran over several days — otherwise the other days are missing.
:::

Alongside the PDF there is **Export CSV** for working on in a spreadsheet.
