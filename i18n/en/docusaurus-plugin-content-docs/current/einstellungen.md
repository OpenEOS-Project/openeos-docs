---
sidebar_position: 18
title: Settings
description: Manage personal settings and organisation settings.
---

# Settings

Under **Settings** you manage your personal data as well as your organisation's settings. The section is divided into two tabs: **Personal** and **Organisation**.

![Settings – Profile](/img/screens/en/settings.png)

## Personal

The **Personal** tab is divided into several sub-sections:

- **Profile** – manage your profile picture, first name, last name, and email address.
- **Account** – account-related settings.
- **Security** – change your password and manage security options.
- **Settings** – personal preferences such as the **Appearance** (Light/Dark).

Save changes in each section using **Save changes**.

### Security

In the **Security** sub-section you change your password and manage further security options for your account.

![Settings – Security](/img/screens/en/settings-security.png)

## Organisation

In the **Organisation** tab you manage your organisation's master data and options. It is divided into several sub-sections: **General**, **Contact**, **Billing address**, **Till (POS)**, and **SumUp**.

### General

Basic information about your organisation:

- **Logo** – displayed on the public [volunteer schedule page](./schichtplaene.md) and in the shop (PNG, JPG, or WEBP, max. 5 MB).
- **Name** – appears on invoices and receipts.
- **Description** – optional additional text.

![Organisation settings – General](/img/screens/en/settings-organisation.png)

### Contact & Billing address

Under **Contact** you enter your organisation's contact details; under **Billing address** the address used for invoices. These details are used, among other things, for receipts and billing.

### Till (POS)

Here you control how the till behaves:

- **Payment mode**
  - **Pay immediately** – orders are paid directly at the time of checkout.
  - **Tab / running bill** – orders are collected and paid together at the end (tab mode, e.g. for table service).
- **Further options**
  - **Table number required** – a table number must be entered for every order.
  - **Print receipt automatically** – a receipt is printed automatically after every order.
  - **Sounds enabled** – audio signals for new orders.

![Organisation settings – Till (POS)](/img/screens/en/settings-org-pos.png)

### SumUp integration (card payments)

The **SumUp** integration lets you connect your SumUp account to accept card payments and use SumUp card readers at the till.

- **Credentials**
  - **API key** – your SumUp API key (format `sup_sk_…`).
  - **Merchant code** – your SumUp merchant code (e.g. `MXXXXXXXX`).
- **Affiliate credentials** (optional, only for terminal checkout via the Solo Cloud API): **Affiliate key** and **App ID**.
- Use **Test connection** to verify your credentials, and **Save** to apply them.
- In the **Card readers** section you then connect your SumUp Solo devices. The credentials must be configured first.

![Organisation settings – SumUp](/img/screens/en/settings-org-sumup.png)

:::info[Where do I find my SumUp credentials?]
Your API key and merchant code are available in your SumUp account (Developer / API section). Treat the API key like a password and do not share it.
:::

## Appearance and language

- **Appearance:** Use **Light** and **Dark** to switch the display mode.
- **Language:** Use the **globe icon** in the top right to switch between German (**DE**) and English (**EN**).
