---
sidebar_position: 13
title: Orders
description: Monitor, filter, and track all orders in your organization.
---

# Orders

Under **Orders** you get an overview of all orders in your organization — regardless of whether they were placed at the till, at a table, or online. Each row shows number, table (if any), channel and till, items, status, payment, amount and time. The section is used for live monitoring during operations and for tracing individual transactions.

![Orders overview](/img/screens/en/orders.png)

## Key Metrics

At the top you see a summary of:

| Metric | Meaning |
| --- | --- |
| **Orders** | Number of orders matching the current filter |
| **Revenue** | Total revenue of the displayed orders |
| **Avg. order** | Average order value |
| **Deposit** | Deposit collected in the selected period |

## Filtering

Use the fields to narrow the list by:

- **Search** – order or daily number, table, name or product
- **Status** – as at the till: in kitchen, ready, completed, open (unpaid), cancelled, partly refunded or refunded
- **Payments** – cash, card, SumUp or discount voucher
- **Channels** – **Table service**, **Counter** or **Online**
- **Date range** – **From** and **To** (calendar days)
- **Events** – by event

The key metrics at the top and the export follow the same filters. Use the **Refresh** button to reload the list.

## Export as CSV

The **Export as CSV** icon (arrow down, next to *Refresh*) downloads the filtered orders as a CSV file – all matches, not just the current page. You choose between two files:

| File | Content | Use |
| --- | --- | --- |
| **Orders** | one row per order: order number, daily number, date, time, event, status, channel (till, online shop, QR order), fulfilment (table, pickup), table, device, item count, payment method, subtotal, discount, deposit, tip, total, paid, refunded, VAT included, test order, guest name, note | reconciling with till and bank, settlement |
| **Line items** | one row per item: order number, date, time, event, table, product, category, variant, quantity, refunded quantity, unit price, VAT rate, deposit per unit, line total, status, station, test order, note | analysis by product, category or station, pivot tables |

The files are prepared for Excel in German locale: semicolon separator, UTF-8 (umlauts display correctly), decimal comma, date and time in German time (Europe/Berlin). Column headers are German. The oldest order comes first. In **Line items** the order discount is not spread over the items – discount, tip and refunds are in the **Orders** file.

- **Who can export?** Administrators and members with the **Orders** permission (as for cancellations and refunds). Others don't see the icon.
- **[Orders only](./betriebsarten.md#nur-bons):** the files contain quantities only – no prices, amounts or payment methods.
- **Guest data:** the guest's name and note are only included while OpenEOS still stores them – they are deleted 30 days after the event ends (see [Data and deletion](./daten-und-loeschung.md)). Phone numbers are never included.
- **Via the API:** `GET /organizations/{organizationId}/orders/export` returns the same file with an [API token](./api-zugaenge.md) (scope `read`, `variant=orders` or `variant=items`, same filters as the list).

:::tip[Tax advisor and board]
Set the date range to the month or the event and export **Orders** – that lets you reconcile cash, card payments and refunds row by row.
:::

## Order Details

Select an order to view its details — line items, payment method, status, and any deposit. This lets you answer queries or trace individual transactions.

:::tip[Real-time]
Thanks to the WebSocket connection, new orders appear in near real-time. Keep the orders overview open during operations to stay on top of things.
:::
