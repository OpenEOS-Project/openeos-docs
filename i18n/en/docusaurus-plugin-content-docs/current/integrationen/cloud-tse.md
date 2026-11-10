---
title: Cloud TSE
description: Cloud TSE for cash in Germany — requirements, automatic setup, TSE data on the receipt, outages, exports for a cash register inspection and deactivation.
---

import TseComingSoon from '@site/src/components/TseComingSoon';

# Cloud TSE

<TseComingSoon />

In Germany, a till that accepts cash needs a certified **technical security device (TSE)** under the Cash Register Security Regulation (KassenSichV). The TSE signs every till transaction so that the records cannot be changed unnoticed later.

OpenEOS connects the **Swissbit Cloud TSE 2** for this. You don't need any hardware: your organization gets **one** TSE, and all devices (tablets, phones) are input terminals of **one** shared till. With an active TSE you can choose the [operating mode](../betriebsarten.md) **All features** with cash.

:::info[Germany only]
The cloud TSE is only available for organizations in Germany. In other countries the integration shows **Germany only** in the catalog. What applies there is described under [Austria, Switzerland and other countries](../betriebsarten.md#andere-laender).
:::

## Coming soon {/* #bald-verfuegbar */}

As long as the Cloud TSE is announced but not yet switched on for your server, you see the following in the app:

- In the catalog under **Integrations** the Cloud TSE is listed as **Coming soon**. Instead of **Activate**, the window shows the note "The cloud TSE for cash payments in Germany is coming soon. Until then you can use “Orders only” or “Cashless”."
- Under **Settings → Organization → Operating mode**, **All features** is marked "Coming soon – with cloud TSE" and cannot be selected.
- In an event's payment dialog there is no question about the Cloud TSE, only a **Coming soon** note.

Until then, work with [Orders only](../betriebsarten.md#nur-bons) or [Cashless](../betriebsarten.md#bargeldlos) in Germany. Everything else on this page applies as soon as the Cloud TSE is available.

On a [self-hosted installation](../selbst-betreiben/intro.md) without a contract with a TSE provider, the integration is instead listed as **Not available** in the catalog: "No cloud TSE is set up on this server. Ask the operator of your installation."

## What you need

- an organization in **Germany**,
- a **paid event**: a TSE costs a fee for every month it runs. OpenEOS therefore only creates it when a paid event is coming up – at the earliest in the **calendar month the event starts** – and deactivates it again at the end of the month (see [Lifetime](#laufzeit)),
- **internet** at the tills. If the TSE fails, you keep selling (see [Outage](#ausfall)),
- the German **tax number** or **VAT ID** and the **address** of your organization ([tax details](../organisation.md#steuerangaben)). They go into every cash point closing. We do not ask for them when you register: if they are missing, the **payment dialog** asks for them when you buy the event (see [Details at your first purchase](../veranstaltungen.md#pflichtangaben)), otherwise the Cloud TSE page before setup.

## Automatically when you buy an event {/* #automatisch */}

Usually you do not have to do anything: if you activate an event in the operating mode **All features** (paid, on invoice or waived by support), OpenEOS switches the **Cloud TSE** integration on by itself. The payment dialog says *Includes the cloud TSE for cash – set up automatically*, and afterwards the **Cloud TSE** page says *Switched on automatically when you bought “…”*. The TSE itself is set up for the first event day (see [Setup](#einrichtung)) – right away if the event is already running.

- **All features (existing):** the payment dialog asks *With cloud TSE (legally compliant cash)?* With **Yes** your operating mode becomes **All features** on activation and the TSE follows automatically. With **No** nothing changes.
- **Cashless:** if you switch to **All features** with a paid event, OpenEOS also switches the integration on by itself (see [Operating modes](../betriebsarten.md#alle-funktionen)).
- **Orders only** and organizations outside Germany do not get a TSE.

**Cost:** the cloud TSE is currently **included** in the event price – there is no surcharge.

## Lifetime: the month of your event {/* #laufzeit */}

**The TSE runs for the month of your event and is deactivated automatically at the end of the month.** That way you never pay for a month without an event.

- If you have **several events** in the same month, they all use the same TSE.
- On the **last day of the month at 8 pm** (German time) OpenEOS deactivates the TSE. Before that it collects the final export and closes the finished business days (cash point closing). The TSE exports the rest itself on deactivation; OpenEOS collects and archives it.
- The **Cloud TSE** page shows the date under **Automatic deactivation**. The admins get an e-mail after the deactivation.
- Afterwards your tills in Germany accept **no cash** until the next paid event starts. For it, OpenEOS automatically sets up a **new TSE** with a new serial number. Receipts and exports of the old TSE stay available.
- **Next month already booked:** if you already have a **paid event** next month (paid or unlocked on invoice), the TSE simply stays active instead of being deactivated and set up again. That saves the new setup and another notice to the tax office; serial number and till stay the same. At the end of that month OpenEOS checks the same again. The page then says, for example, *Stays active in December because “Christmas market” is already booked*, with the new date above it (*on 31 December 2026, 20:00*).
  - The decision is made on the last day of the month at 8 pm. An event booked on that day still counts if it is paid or unlocked by then.
  - If the event next month is cancelled (or refunded) before the month changes, OpenEOS deactivates the TSE at the end of the month as usual.
  - Cash point closings run as always, and OpenEOS keeps collecting the exports every night. No final export is needed because the TSE keeps running.
  - Only the directly following month counts: if there is a month without an event in between, the TSE is deactivated and set up again for the later event.
- **Exception:** if a paid event is running at the deactivation time – even just its business day (6 am to 6 am), for example a party on the last day of the month or across the month change – the TSE stays until the end of the **next** month. OpenEOS bears the extra month, you are not charged for it; the page then says *Postponed because “…” runs past the end of the month*.

## 1. Activate the integration yourself

You can also switch the integration on yourself beforehand:

1. Open **Integrations** in the sidebar and click **Cloud TSE**.
2. Click **Activate** in the dialog.

The sidebar now shows the entry **Cloud TSE**. Activating costs nothing yet – it only says that your organization wants a TSE.

## 2. Setup – usually automatic {/* #einrichtung */}

The **Cloud TSE** page shows which requirements are met: organization in Germany, paid event and the earliest setup date.

![Cloud TSE setup](/img/screens/en/integrations-tse-setup.png)

- **Automatic:** in good time before [sales start](../veranstaltungen.md#verkaufsstart) – about 12 hours ahead, never before the month of the event – OpenEOS sets up the TSE by itself. You don't need to do anything else.
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
- **Cash register inspection**: DSFinV-K and TSE export for a period, the cash point closings and the tip setting – see [Cash register inspection and DSFinV-K](../kassen-nachschau.md).
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

OpenEOS collects the TSE data **every night** (TAR file according to TR-03153) and archives it for **ten years**. Under **Exports** you see the period, size and checksum (SHA-256) of each export. In addition, every business day gets a **cash point closing** with the DSFinV-K export.

If the tax office comes for a **cash register inspection** (Kassen-Nachschau) or audit, download the **DSFinV-K export** and the **TSE export (TAR)** for the period in the **Cash register inspection** section. What exactly to hand over is described in [Cash register inspection and DSFinV-K](../kassen-nachschau.md).

## Deactivation {/* #deaktivieren */}

At the end of the month OpenEOS deactivates the TSE by itself (see [Lifetime](#laufzeit)) – you do not need to do anything for that. There is no pause for a TSE. Under **Danger zone → Deactivate TSE** you take it out of service **permanently**, for example when your club no longer uses OpenEOS with cash:

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
- [Cash register inspection and DSFinV-K](../kassen-nachschau.md)
- [Cash book](../kassenbuch.md)
- [FAQ on openeos.de: till, cash and TSE](https://openeos.de/en/faq#tse)
