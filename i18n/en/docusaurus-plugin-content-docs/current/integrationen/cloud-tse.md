---
title: Cloud TSE
description: Cloud TSE for cash in Germany — requirements, automatic setup, TSE data on the receipt, outages, exports for a cash register inspection and deactivation.
---

# Cloud TSE

In Germany, a till that accepts cash needs a certified **technical security device (TSE)** under the Cash Register Security Regulation (KassenSichV). The TSE signs every till transaction so that the records cannot be changed unnoticed later.

OpenEOS connects the **Swissbit Cloud TSE 2** for this. You don't need any hardware: your organization gets **one** TSE, and all devices (tablets, phones) are input terminals of **one** shared till. With an active TSE you can choose the [operating mode](../betriebsarten.md) **All features** with cash.

:::info[Germany only]
The cloud TSE is only available for organizations in Germany. In other countries the integration shows **Germany only** in the catalog. What applies there is described under [Austria, Switzerland and other countries](../betriebsarten.md#andere-laender).
:::

## What you need

- an organization in **Germany**,
- a **paid event**: a TSE costs a monthly fee from the moment it is set up. OpenEOS therefore only creates it when a paid event is coming up – at the earliest in the **calendar month the event starts**,
- **internet** at the tills. If the TSE fails, you keep selling (see [Outage](#ausfall)).

## 1. Activate the integration

1. Open **Integrations** in the sidebar and click **Cloud TSE**.
2. Click **Activate** in the dialog.

The sidebar now shows the entry **Cloud TSE**. Activating costs nothing yet – it only says that your organization wants a TSE.

## 2. Setup – usually automatic

The **Cloud TSE** page shows which requirements are met: organization in Germany, paid event and the earliest setup date.

![Cloud TSE setup](/img/screens/en/integrations-tse-setup.png)

- **Automatic:** on the first day of the event OpenEOS sets up the TSE by itself. You don't need to do anything else.
- **Yourself:** if you want to test beforehand, click **Set up now** in the month of the event. This usually takes only a few seconds; the page updates by itself.

Once the TSE is active, **Cashless** automatically becomes **All features**: your tills accept cash from now on. The change appears in the operating mode history.

:::tip[Setup failed?]
The page then shows **Setup failed** with the error. **Try again** starts it once more. If that doesn't help, contact support.
:::

## The Cloud TSE page

![Cloud TSE active](/img/screens/en/integrations-tse.png)

- **Cloud TSE**: status (**Active** or **Disrupted**), serial number (shortened, with copy button), the till (client ID `OEOS-…`), product, storage, signatures this month, certificate expiry and the last export.
- **Outage log**: periods in which the TSE did not sign.
- **Transactions**: all signed, failed and training transactions. Click one to see the TSE data with QR code, just like on the receipt.
- **Exports**: the archived TSE data for download.
- **Danger zone**: deactivate the TSE permanently.

## What is on the receipt {/* #bon */}

With an active TSE, every receipt and refund receipt carries the TSE data – printed and in the receipt preview at the till:

- **till ID** (the till's serial number, `OEOS-…`),
- **TSE serial number** and **signature**, in full,
- **transaction number** and **signature counter**,
- **start** and **end** of the transaction (UTC, as delivered by the TSE),
- signature algorithm and time format,
- a **QR code** with all data according to DSFinV-K. Auditors can scan it with a verification app.

![Receipt preview with TSE data](/img/screens/en/pos-tse-receipt.png)

The TSE data cannot be deselected. If you designed your own receipt template, OpenEOS adds it automatically. A **reprint** shows the same signature as the first receipt. Printed receipts are always in German (e.g. "TSE ausgefallen").

In **test mode** of an event, transactions are signed as **training**. The receipt then says **TRAININGSBUCHUNG – KEIN VERKAUF** (training – not a sale). Training transactions are kept, even when the test orders are deleted on activating the event.

Under **Orders**, admins see a **Cloud TSE** section in every order with its TSE transactions and the QR code.

## When the TSE fails {/* #ausfall */}

If the TSE does not respond (e.g. no internet or a disruption at the provider), **you keep selling**. Instead of the signature the receipt gets the note **TSE ausgefallen** (TSE failed), and the till shows a hint at the top:

> TSE failed – you can keep selling, the receipt will be marked.

OpenEOS records the outage in the **outage log** and emails the admins once. As soon as the next transaction is signed again, the outage ends and the hint at the till disappears. Transactions are not signed afterwards – this is intended.

## Exports and cash register inspection {/* #export */}

OpenEOS collects the TSE data **every night** (TAR file according to TR-03153) and archives it for **ten years**. Under **Exports** you see the period, size and checksum (SHA-256) of each export.

If the tax office comes for a **cash register inspection** (Kassen-Nachschau) or audit:

1. On the **Cloud TSE** page under **Exports**, click **Start export now** if you need the data up to this moment. After a few minutes the export appears in the list.
2. Use **Download** to save the TAR files of the period and hand them to the auditor.

## Deactivation {/* #deaktivieren */}

There is no pause for a TSE. Under **Danger zone → Deactivate TSE** you take it out of service **permanently**, for example when your club no longer uses OpenEOS with cash:

- The TSE can never sign again.
- The remaining data is exported and archived automatically (final export).
- In Germany your tills stop accepting cash immediately.
- The **Cloud TSE** integration is switched off.
- For a later event you set up a **new TSE** with a new serial number.

You confirm the deactivation with a checkbox. Receipts and exports of the old TSE remain available for ten years. Don't deactivate the TSE while an event is running.

As long as a TSE is set up, the integration cannot simply be switched off with **Deactivate** – OpenEOS points you to the danger zone instead.

:::note
This is not tax advice. Your tax office decides in individual cases; if in doubt, talk to your tax advisor.
:::

## See also

- [Operating modes](../betriebsarten.md)
- [Selling at the till](../kasse.md)
- [FAQ on openeos.de: till, cash and TSE](https://openeos.de/en/faq#tse)
