---
sidebar_position: 18
title: Settings
description: Manage personal settings and organization settings.
---

# Settings

Under **Settings** you manage your personal data as well as your organization's settings. You reach them through the menu under your name at the bottom left of the sidebar. The section is divided into two tabs: **Personal** and **Organization**.

Every sub-tab consists of cards with the same header: an icon, the title and a short explanation of what you set there.

![Settings – Profile](/img/screens/en/settings.png)

## Personal

The **Personal** tab is divided into several sub-sections:

- **Profile** – manage your profile picture, first name and last name. Your email address is shown here for reference only.
- **Account** – the cards **Change email** and **Change password** (both with your current password), subscribe to or unsubscribe from [news by email](./daten-und-loeschung.md#newsletter) and [delete your account](./daten-und-loeschung.md#konto-loeschen).
- **Security** – **Two-Factor Authentication**, **Trusted Devices** and **Active Sessions**.
- **Preferences** – **Appearance** (**Light**, **Dark** or **System**), **Language**, **Notifications** (**Email notifications**, **Push notifications**) and the **Tour** of the interface, which you watch again with **Restart**.
- **About OpenEOS** – version, license and a link to the source code of this installation.

In **Profile** and **Account** you apply changes with the button of the respective card, for example **Save changes**. Under **Preferences** a choice takes effect immediately.

### Security

In the **Security** sub-section you set up two-factor authentication (**Enable 2FA**, with an **Authenticator App** or **Email**), remove trusted devices and sign out sessions – one at a time with **Sign out** or with **Sign out all other sessions**. You change your password under **Account**.

![Settings – Security](/img/screens/en/settings-security.png)

## Organization

In the **Organization** tab you manage your organization's master data. It has the sub-tabs **General**, **Contact**, **Tax details**, **Operating mode**, **Assistant**, **Access**, **Webhooks** and **Legal information**. Only admins of the organization can change the details.

### General

Basic information about your organization:

- **Logo** – displayed on the public [volunteer schedule page](./schichtplaene.md) and in the shop (PNG, JPG, or WEBP, max. 5 MB).
- **Name** – appears on invoices and receipts.
- **Description** – optional additional text.
- **No VAT** – for associations and small businesses (§ 19 UStG). When on, all products carry 0 % and no tax rate can be chosen.
- **Delete organization** – a card of its own below the details, administrators only. Afterwards the organization is read-only for 30 days so you can export all data; then it is permanently deleted. Emails come beforehand (announcement, 10 days and one day before), and until then you can cancel the deletion. See [Account, newsletter and deletion](./daten-und-loeschung.md#organisation-loeschen).

![Organization settings – General](/img/screens/en/settings-organisation.png)

### Contact

Under **Contact** you enter your organization's address, ZIP code, city, phone and website. The country is shown here read-only; it is set once (under **Operating mode**) and afterwards only changed by support, see [Country of the organization](./betriebsarten.md#land).

The address is also the billing address when you [pay for an event](./veranstaltungen.md#pflichtangaben). If it is missing at your first purchase, the payment dialog asks for it and saves it here.

### Tax details {/* #steuerangaben */}

Under **Tax details** you enter the **Official name** (if it differs from the organization's name), the **Tax number** and/or the **VAT ID**. One of the two numbers is enough. For the [Cloud TSE](./integrationen/cloud-tse.md) the tax number or VAT ID is required, together with the address under **Contact**, see [Organization: Tax details](./organisation.md#steuerangaben).

### Operating mode {/* #betriebsart */}

Under **Operating mode** you choose how your organization works: **Orders only**, **Cashless** or **All features** (admins only). Below it you see the history of all switches and – in Germany with “Orders only” and “Cashless” – the button for the manufacturer's certificate. Everything about it is under [Operating modes](./betriebsarten.md).

### Assistant

Under **Assistant** you switch the **Assistant features** on or off (admins only): menu import and icon suggestions. Below it you see the daily quota. What the assistant does and what happens to your data is described under [Assistant](./assistent.md).

### Access

Under **Access** admins create API tokens for scripts, automations and AI agents (**Create access token**) and revoke them. The list shows each token's name, key prefix, permissions, when it was created and last used, its expiry and its status. Everything about it is under [API access](./api-zugaenge.md) and [Connecting AI agents](./ki-agenten.md).

### Webhooks

Under **Webhooks** admins set up addresses to which OpenEOS sends a message right away on orders, payments and other events (**Create webhook**). Everything about it is under [Webhooks](./integrationen/webhooks.md).

### Legal information {/* #rechtliche-angaben */}

Under **Legal information** you enter your club's **Imprint** and **Privacy notice**, each as a **Link** or as **Text**, plus optionally a **Contact for privacy questions**. Both appear in the footer of the shop and the helper pages; the **Footer preview** shows how it looks. Apply with **Save**.

As long as the imprint or the privacy notice is missing, your shop takes no orders, not even in test mode, and ordering by QR code at the table does not work either. There is a template for the privacy notice: **Use the privacy notice template** takes you to [Legal → Legal texts for your shop](#rechtliches).

:::note
OpenEOS does not check the texts and gives no legal advice. If in doubt, have them checked by a qualified body.
:::

### What you no longer find here

Earlier versions had more sub-tabs. These settings now live where they are needed:

- **Checkout mode** (**Pay immediately** or **Run a tab**) and the **tables** are set per event, in the [event](./veranstaltungen.md) dialog. How this looks at the till is described under [Till](./kasse.md#senden-oder-kassieren).
- **SumUp** is set up as an [integration](./integrationen/sumup.md): activate it under **Integrations**, then configure it on its own **SumUp** page.
- **Invoices** are under **Invoices** in the sidebar. The billing address is the address under [Contact](#contact).
- **Cashless mode** from the former **Payments** sub-tab no longer exists as a separate switch. It is now the **Cashless** operating mode under [Operating mode](#betriebsart).

## Legal {/* #rechtliches */}

In the menu under your name at the bottom left, next to **Settings**, there is the entry **Legal**. There you find:

- **OpenEOS contracts and legal texts** – terms and conditions (AGB), data processing agreement (AVV), privacy policy and imprint in the current version with PDF. For the AGB and AVV it shows which version you accepted and when. Older versions remain available under their date. The texts are in German. Also the link to the **Subprocessors (AVV annex B)**.
- **Details for the tax office notification (ELSTER)** – admins only: software, register serial number, business premises and TSE, i.e. the values you enter in ELSTER, each with a copy button. If the address or tax number is missing, the page points you to the settings.
- **Legal texts for your shop** – a template for the privacy notice in your shop and on the helper pages. Your organization's name, address and email are prefilled; you fill in the places marked yellow yourself. Admins confirm **I have reviewed the text and adapted it to our club.** and adopt it with **Use as privacy notice** into the [Legal information](#rechtliche-angaben).

When the AGB or AVV change, admins confirm the new versions once after signing in, see [Confirming new terms](./registrierung-login.md#neue-agb).

## Appearance and language

The menu under your name at the bottom left is quicker than the settings:

- **Appearance:** **Light**, **Dark** or **System** (follows your device).
- **Language:** **Deutsch** or **English**.
