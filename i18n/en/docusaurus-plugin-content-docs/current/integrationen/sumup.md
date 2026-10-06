---
title: SumUp
description: Card payment with SumUp at the till — activate the integration, enter credentials and pair card readers.
---

# SumUp

The **SumUp** integration lets your till take card payments through your own SumUp account. The amount goes straight to your SumUp card reader, the guest pays there by card or phone, and the till records the payment as soon as it is confirmed.

## What you need

- a **SumUp merchant account**,
- a **SumUp card reader** that can be paired over the internet (e.g. **SumUp Solo**),
- the **API key** and **merchant code** from your SumUp account.

:::info[Where do I find the SumUp credentials?]
You will find the API key and merchant code in your SumUp account, in the developer/API section. Treat the API key like a password and do not share it.
:::

## 1. Activate the integration

1. Open **Integrations** in the sidebar and click **SumUp**.
2. Click **Activate** in the window.

The sidebar now shows a **SumUp** entry.

## 2. Enter the credentials

On the **SumUp** page:

- **API key** – your SumUp API key (format `sup_sk_…`).
- **Merchant code** – your SumUp merchant code (e.g. `MXXXXXXXX`).
- **Affiliate key** and **App ID** – optional, only for terminal checkout via the Solo Cloud API.

**Test Connection** checks the details, **Save** stores them. Saved keys are only shown shortened afterwards (`****1234`).

![SumUp settings](/img/screens/en/integrations-sumup.png)

## 3. Pair a card reader

1. Switch the reader on and connect it to the internet. It shows a pairing code.
2. Under **Card Readers**, click **Pair Reader**, enter the pairing code and give the device a name, e.g. "Bar till".
3. The reader appears in the list, where you can rename or remove it.

![Pair a card reader](/img/screens/en/integrations-sumup-pair.png)

## At the till

Once SumUp is active and a card reader is paired, the [till](../kasse.md) offers card payment at checkout. The amount appears on the reader, and the order counts as paid as soon as SumUp confirms the payment.

![Till with card payment](/img/screens/en/pos-card.png)

## Switching off

**Deactivate** on the SumUp page, or in the window under **Integrations**, switches SumUp off. Card payment disappears from the till. Credentials and paired readers stay stored and are back immediately once you activate it again.

:::tip[Card payment not working?]
- Is the integration marked **Active** under **Integrations**?
- Does **Test Connection** succeed? If not, enter the API key again.
- Is the card reader switched on, online and listed as paired?
:::
