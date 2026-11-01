---
sidebar_position: 3
title: Order only (without a till)
description: The “Order only” operating mode – take and route orders, payment happens outside OpenEOS.
---

# Order only (without a till)

In the **Order only** operating mode, OpenEOS works purely as an order system. Your team takes orders on the till devices, OpenEOS routes them to the kitchen and bar, and orders are closed without payment. The till module is switched off: nothing is paid in OpenEOS. You take the money outside OpenEOS, for example with an open cash box.

Only our support switches the mode, not your club. That is the whole point: your organization cannot switch the till module back on itself.

:::note[Hosted OpenEOS only]
“Order only” is only available in the hosted OpenEOS. With a [self-hosted installation](./selbst-betreiben/intro.md) your club runs the server itself; the mode is not available there.
:::

## What still works {/* #was-geht */}

- **Ordering** on the till devices, at the counter and with table service, as described under [Selling at the till](./kasse.md).
- **Routing** to the kitchen, bar and other [stations](./standorte.md): tickets and [kitchen and bar screens](./anzeigen.md).
- Marking items **ready**, **picked up** or **served**.
- **Closing orders**, see [below](#abschliessen).
- **Cancelling** whole orders and single items, without a refund.
- **Online shop prepayment**, see [Paying online](#vorkasse).

## What is not available {/* #was-gesperrt-ist */}

- No **checkout**: no cash, no card, no SumUp payments at the till.
- No **split bill** and no combined payments.
- No **tips**.
- No **refunds** at the till.
- No **cash drawer**.
- No deposit **payout**.

The block is not only in the interface. The server also rejects every payment, no matter which till or program it comes from.

At the till, the flow ends with **Send order**. A slim notice reads “Order-only mode – payment is taken outside OpenEOS.”

## Closing orders {/* #abschliessen */}

Without payment, orders need a different way to be closed. OpenEOS handles it like this:

| Order | When it is closed |
|---|---|
| At the counter or for pickup, **without** items for a station | Right when it is sent. |
| At the counter or for pickup, **with** items for a station | On handover: you tap **Picked up** in the till's **Open orders**, or all station items are marked as handed over. |
| At a table | The orders stay open at the table until the server taps **Close table**. This button replaces **Checkout** and closes all open orders of the table. |

While a station is still preparing an item, the order cannot be closed.

## Paying online: online shop prepayment {/* #vorkasse */}

If guests already pay online when they order, in the online shop or via QR ordering at the table with PayPal or SumUp Online, that keeps working. These payments do not run through a till on site and never involve cash.

Refunds are then only possible back to such an online payment, from the admin area, never at the till.

## Cash on site {/* #bargeld */}

You take cash outside OpenEOS, for example with an open cash box. Your club is responsible for the record-keeping duties that come with it. What they involve is explained in the [FAQ on openeos.de](https://openeos.de/en/faq#offene-ladenkasse).

## TSE {/* #tse */}

:::info[Order only and the TSE]
According to the German Federal Ministry of Finance (BMF), order systems without a till module do not fall under § 146a AO (German Fiscal Code) and therefore do not need a TSE (technical security system). This only applies if your organization cannot switch the till module on itself and this is proven in the system documentation (Verfahrensdokumentation), for example by a certificate from the manufacturer.

In individual cases, your local tax office decides. If you are unsure, talk to your tax advisor. General information, not tax or legal advice.
:::

You get the certificate in OpenEOS, see [Manufacturer's certificate](#bescheinigung). More about cash and the TSE under [Cash and cashless mode](./bargeldlos.md#tse).

## Requesting order only {/* #beantragen */}

Only our support can switch the mode:

1. Write to us in the support chat (in the admin area under **Support**) or by email to [hello@openeos.de](mailto:hello@openeos.de).
2. Tell us the **organization** and **from when** “Order only” should apply.

Every switch is logged with the time, the support team member and the reason. Switching back to the mode with a till also only works through support.

## Operating mode and manufacturer's certificate {/* #bescheinigung */}

Under **Settings → Organization → Payments** you see your organization's operating mode. You cannot change it there. Admins find the **Download certificate** button there.

The **manufacturer's certificate** is a PDF with:

- the organization's name and address
- the OpenEOS version
- since when the till and payment module is switched off
- the confirmation that your organization cannot switch the module on itself, only the manufacturer on documented request
- what OpenEOS still does in this mode
- the note that cash is taken outside the system
- the manufacturer (LUXCODE by Lukas Lukic-Spitznagel)
- the history of all switches
- the note that the certificate is generated automatically and carries no signature

Add the certificate to your system documentation. Download a new one after every change of the operating mode.

## Difference from cashless mode {/* #unterschied */}

| | Cashless mode | Order only |
|---|---|---|
| Who switches it | Admins of your organization, in the settings | Only our support, on request |
| Payment at the till | Card via SumUp, no cash | None, the till module is off |
| Online payments | Yes | Yes, as online shop prepayment |
| Manufacturer's certificate | No | Yes |

More about cashless mode under [Cash and cashless mode](./bargeldlos.md).

## See also

- [Cash and cashless mode](./bargeldlos.md)
- [Selling at the till](./kasse.md)
- [Stations](./standorte.md) and [Screens](./anzeigen.md)
