---
title: Cash register inspection and DSFinV-K
description: What to hand over to the German tax office during a cash register inspection (Kassen-Nachschau) or audit — DSFinV-K export, TSE export and procedure documentation — and how cash point closings are created.
---

import TseComingSoon from '@site/src/components/TseComingSoon';

# Cash register inspection and DSFinV-K

In Germany the tax office may show up unannounced for a **cash register inspection** (Kassen-Nachschau, § 146b AO) — for example in the middle of your festival. The inspector then wants to see the till data in two fixed formats. With the [Cloud TSE](./integrationen/cloud-tse.md), OpenEOS produces both for you — you download them with two clicks.

:::info[Only with Cloud TSE]
Cash point closings and the DSFinV-K export are available for organizations with an active Cloud TSE (Germany, [operating mode](./betriebsarten.md) **All features** with cash).
:::

<TseComingSoon />

## What you hand over {/* #uebergabe */}

| Document | Contents | Where you get it |
|---|---|---|
| **DSFinV-K export** (ZIP) | All transactions of the till in the tax authority's standard format for cash registers (DSFinV-K 2.4): receipts with line items, tax rates and payment types, cash point closings, master data, TSE data. 20 CSV files with an `index.xml` that the inspector loads directly into the audit software. | **Cloud TSE → Cash audit (Kassen-Nachschau) → Export DSFinV-K** |
| **TSE export** (TAR) | The signed logs of the TSE according to TR-03153. The tax office uses them to verify that the data is genuine. | **Cloud TSE → Cash audit (Kassen-Nachschau) → TSE export (TAR)** |
| **Procedure documentation** (Verfahrensdokumentation) | How your till is set up and how you work with it (devices, processes, responsibilities, cash handling instructions). | Written by your club, ideally with our [template](./verfahrensdokumentation.md); OpenEOS provides the technical details (till `OEOS-…`, TSE, outage log) on the Cloud TSE page. |

On request, the receipts themselves complete the picture — every receipt carries a QR code that the inspector can scan with a verification app. If that check succeeds, the inspection is often already over.

If you work with [servers](./bedienungen.md), the [live cash check](./bedienungen.md#live-kassensturz) shows the inspector how much cash every server should have right now. The [cash book](./kassenbuch.md) shows the balance of the drawers.

## How to export {/* #export */}

1. Open **Cloud TSE** in the sidebar and scroll to **Cash audit (Kassen-Nachschau)**.
2. Choose the **Period** with **From** and **To**. **Today** sets today's business day (6 am to 6 am).
3. Click **Export DSFinV-K**. If today is included, OpenEOS first closes the open transactions (see below) — the export then contains everything up to this moment.
4. Click **TSE export (TAR)**. You get a ZIP with the TAR files of the period. If today is not covered yet, start a new TSE export with **Start export now** and download it a few minutes later.
5. Hand both files to the inspector, e.g. on a USB stick.

Next to each TSE export you see a checksum ("SHA-256 …"). It lets you prove later that the file you handed over is unchanged.

## Cash point closings {/* #abschluss */}

The DSFinV-K assigns every transaction to a **cash point closing** (formerly the "Z report"). OpenEOS creates it **automatically** for every business day (6 am to 6 am), every morning at 6 am. Each closing gets a consecutive **Z number** and cannot be changed afterwards.

The **Cash register closings** list shows **Z no.**, **Business day**, **Gross revenue**, **Cash** (all cash movements, including opening balance, cash in and cash out) and the number of **Transactions** of each closing; closings created by hand are marked "manual". **ZIP** downloads the DSFinV-K export of exactly that closing. Above it you see what has been open since the last closing, e.g. "Open since …: 12 transactions".

**Create closing now** closes all open transactions up to this moment right away — for example while the inspector is standing in front of you. At the end of the business day, another closing for the rest follows automatically.

:::tip[Cash belongs to it too]
For a complete closing, record the **change money** at the start and **skimming** cash into the safe at the till — see [Cash book](./kassenbuch.md). Otherwise the cash balance in the closing won't match what is in the drawer.
:::

## What the export contains {/* #inhalt */}

- **One till** per organization: the till `OEOS-…` with the Cloud TSE. Your tablets and phones appear as **terminals**; each line item shows the device it was booked on.
- **Every transaction**: sales (including partial and combined payments), discounts, variants, deposits and deposit returns, [tips](./trinkgeld.md) (to the club split per VAT rate), refunds and cancellations with a reference to the original receipt, orders without immediate payment, cash book entries, server settlements, tip payouts and training transactions from test mode.
- **Online orders**: since November 2026 the Cloud TSE signs payments in the online shop and for QR code orders when the payment comes in; they are exported as receipts with the payment type "payment service provider" (e.g. PayPal, SumUp Online). Older online orders are not included.
- **TSE outages**: transactions without a signature are included with the note "TSE ausgefallen" (TSE failed) — as the DSFinV-K requires. If the signature only arrived after printing, the transaction is included with the signature data and the note „Signatur nach Belegausgabe“ (see [Cloud TSE](./integrationen/cloud-tse.md#spaete-signatur)).
- **VAT keys**: 1 (19 %), 2 (7 %), 5 (not taxable: cash book, tips of employed servers, deposit returns against the [old balance](./pfand.md#altsaldo)) and 6 for [small businesses](./integrationen/cloud-tse.md#kleinunternehmer).

For a complete export you need the **tax number** or **VAT ID** and the address in the [organization settings](./organisation.md#steuerangaben). Without them the Cloud TSE cannot be set up.

## Tips {/* #trinkgeld */}

Since November 2026 the server who checks out decides who the tip belongs to: tips belong to the club (DSFinV-K "TrinkgeldAG", at the rate of the goods) unless the server is marked **„Arbeitnehmer (Lohnkonto)“** (employee, payroll; DSFinV-K "TrinkgeldAN"). Details and a worked example are under [Tips](./trinkgeld.md).

The former setting **Tips go to** (**Club** or **Helpers**) under **Cash audit (Kassen-Nachschau)** only applies to older transactions that were signed that way.

## Retention {/* #aufbewahrung */}

OpenEOS keeps cash point closings, DSFinV-K and TSE exports, training transactions, the data on TSE outages and server settlements for **ten years** (§ 147 AO), even if you deactivate the Cloud TSE later. You don't need to keep an image of digital receipts a guest never fetched: OpenEOS can recreate them with the same content from the stored data at any time. Keep your procedure documentation for ten years as well.

:::note
This is not tax advice. Your tax office decides in individual cases; if you are unsure, talk to your tax advisor.
:::

## See also

- [Cloud TSE](./integrationen/cloud-tse.md)
- [Cash book](./kassenbuch.md)
- [Procedure documentation – template](./verfahrensdokumentation.md)
