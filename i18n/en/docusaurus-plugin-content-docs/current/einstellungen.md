---
sidebar_position: 18
title: Settings
description: Manage personal settings and organization settings.
---

# Settings

Under **Settings** you manage your personal data as well as your organization's settings. You reach them through the menu under your name at the bottom left of the sidebar. The section is divided into two tabs: **Personal** and **Organization**.

![Settings – Profile](/img/screens/en/settings.png)

## Personal

The **Personal** tab is divided into several sub-sections:

- **Profile** – manage your profile picture, first name and last name. Your email address is shown here for reference only.
- **Account** – change your email address and password, subscribe to or unsubscribe from [news by email](./daten-und-loeschung.md#newsletter) and [delete your account](./daten-und-loeschung.md#konto-loeschen).
- **Security** – manage two-factor authentication and signed-in sessions.
- **Preferences** – **Appearance** (Light, Dark or System), **Language**, notifications and the **Tour** of the interface to watch again.

Save changes in each section using **Save changes**.

### Security

In the **Security** sub-section you set up two-factor authentication and keep an eye on your account's sessions. You change your password under **Account**.

![Settings – Security](/img/screens/en/settings-security.png)

## Organization

In the **Organization** tab you manage your organization's master data. Among others it has the sub-tabs **General**, **Contact**, **Operating mode**, **Assistant** and **Notifications**.

### General

Basic information about your organization:

- **Logo** – displayed on the public [volunteer schedule page](./schichtplaene.md) and in the shop (PNG, JPG, or WEBP, max. 5 MB).
- **Name** – appears on invoices and receipts.
- **Description** – optional additional text.
- **No VAT** – for associations and small businesses (§ 19 UStG). When on, all products carry 0 % and no tax rate can be chosen.
- **Delete organization** – administrators only. Afterwards the organization is read-only for 30 days so you can export all data; then it is permanently deleted. Emails come beforehand (announcement, 10 days and one day before), and until then you can cancel the deletion. See [Account, newsletter and deletion](./daten-und-loeschung.md#organisation-loeschen).

![Organization settings – General](/img/screens/en/settings-organisation.png)

### Contact

Under **Contact** you enter your organization's address, ZIP code, city, phone and website. The country is shown here read-only; it is set once, see [Country of the organization](./betriebsarten.md#land).

The billing address for an event's invoice is entered when you [pay for the event](./veranstaltungen.md), not here.

### Operating mode {/* #betriebsart */}

Under **Operating mode** you choose how your organization works: **Orders only**, **Cashless** or **All features** (admins only). Below it you see the history of all switches and – in Germany with “Orders only” and “Cashless” – the button for the manufacturer's certificate. Everything about it is under [Operating modes](./betriebsarten.md).

### Assistant

Under **Assistant** you switch the **Assistant features** on or off (admins only): menu import and icon suggestions. Below it you see the daily quota. What the assistant does and what happens to your data is described under [Assistant](./assistent.md).

### Notifications {/* #benachrichtigungen */}

Under **Notifications** you decide which **event reminders** OpenEOS sends to all admins of your organization (only admins can change this; everything is on by default):

- **A week before – “Your event is coming up”:** a checklist from your real data, each item with ✓ or ✗ and a link to the right place: tills connected, printers online and a test print, servers and PIN slips, products and prices, imprint and privacy notice (if the shop or QR ordering is used), operating mode and country, Cloud TSE. Plus the note that everything runs in test mode until sales start.
- **The day before – “Tomorrow is the day”:** when real sales start, that test orders are deleted then, the [emergency support](./support.md) number and the Cloud TSE status.
- **After the event – “Thank you! This is how your event went”:** orders, revenue (quantities only with “Orders only”) and the three best-selling products, without test orders, with links to reports, CSV export and server settlements.
- **Not activated yet:** a week before, if the event is still in test mode, with a link to activate it and the cancellation rule (free only until 7 days before the start).

The e-mails go out at fixed times (usually 9 am) and are sent later if a run was missed, as long as they still make sense. If you move an event to another day, the reminders come again for the new date. To turn them off just for you, use **Personal → Preferences → Event reminders**; with **E-mail notifications** off you don't get them either. On a self-hosted installation the e-mails need configured e-mail delivery, and “Not activated yet” does not exist.

### What you no longer find here

Earlier versions had more sub-tabs. These settings now live where they are needed:

- **Checkout mode** (**Pay immediately** or **Run a tab**) and the **tables** are set per event, in the [event](./veranstaltungen.md) dialog. How this looks at the till is described under [Till](./kasse.md#senden-oder-kassieren).
- **SumUp** is set up as an [integration](./integrationen/sumup.md): activate it under **Integrations**, then configure it on its own **SumUp** page.
- **Invoices** and the billing address are under **Invoices** in the sidebar and when you pay for an event.
- **Cashless mode** from the former **Payments** sub-tab no longer exists as a separate switch. It is now the **Cashless** operating mode under [Operating mode](#betriebsart).

## Appearance and language

The menu under your name at the bottom left is quicker than the settings:

- **Appearance:** **Light**, **Dark** or **System** (follows your device).
- **Language:** **German** or **English**.
