---
sidebar_position: 19
title: Account, newsletter and deletion
description: Delete your account, unsubscribe from news by email and what happens when an organization is deleted.
---

# Account, newsletter and deletion

This page explains how to delete your account, subscribe to or unsubscribe from news by email, and what happens to the data when an organization is deleted. The legal basis is in the [terms and conditions](https://openeos.de/en/agb) (sections 10.4, 15.10 and 20.5), the [data processing agreement](https://openeos.de/en/avv) (section 10) and the [privacy policy](https://openeos.de/en/datenschutz).

## News by email {/* #newsletter */}

When you register you can optionally tick that you'd like to receive occasional news about OpenEOS. Under **Settings → Personal → Account → News by email** you can give or withdraw this consent at any time with the switch. Below it you see when you consented or withdrew; we keep both timestamps as proof.

Every news email also contains an unsubscribe link. It opens a page where you withdraw with **Unsubscribe** – no sign-in needed. Emails about your account (for example sign-in links, invoices or deletion notices) keep coming.

## Delete your account {/* #konto-loeschen */}

Under **Settings → Personal → Account → Delete account** you delete your user account yourself.

1. Click **Delete account …**. The dialog shows what happens:
   - Name, email address, password, two-factor sign-in, sessions and API tokens are removed and you are signed out.
   - You lose access to all organizations.
   - If you booked at the register, your name stays in the organization's fiscal archive as the operator for ten years (legal retention duty).
2. Confirm with your password. If you have no password (you only sign in with a link), click **Send code** and enter the code from the email.
3. You get a confirmation email.

This cannot be undone. In our backups the data expires after eight weeks at most.

### When deletion is blocked

- **You are the last administrator of an organization** that still has other members, a running or paid upcoming event or an active Cloud TSE. Make someone else an administrator under [Members](./mitglieder.md) first, leave the organization or delete it (see below).
- **You booked transactions that aren't part of a cash point closing yet.** Ask your club to create the closing first.
- **Super admin accounts** can't delete themselves.

If you are the **only member** of an organization without a running event, it is deleted with your account. Export everything you need first – once your account is gone you can't reach its data anymore.

## Delete an organization {/* #organisation-loeschen */}

Administrators delete an organization under **Settings → Organization → General → Delete organization**. To confirm, type the organization's name.

The same happens when OpenEOS closes a customer account after 24 months without a booking (T&C 15.10) – we announce that to the administrators by email beforehand.

### 30 days read-only: export your data

After deletion the organization stays visible to its **administrators**, but **read-only**. Every page shows:

> This organization will be permanently deleted on …. You can export all data until then.

During this time you can view and export everything:

- [Reports](./auswertung.md) with CSV and PDF export,
- view [orders](./bestellungen.md) and export them as CSV, view the [cash book](./kassenbuch.md),
- with [Cloud TSE](./integrationen/cloud-tse.md): DSFinV-K export, cash point closings and TSE exports. You can still create a missing cash point closing.

Nothing can be changed anymore: saving, booking, new events and the like are rejected. Registers, displays and other devices of the organization stop working; the shop, table ordering and helper pages are no longer reachable. Members without administrator rights no longer see the organization.

Before the final deletion the administrators get an email with the date.

### Final deletion

When the export period ends we permanently delete products, settings, orders, shift plans, devices, access and memberships. What stays:

- the **fiscal archive** (TSE exports, cash point closings with DSFinV-K export, signed transactions) for the legal period of ten years, available through support,
- the billing of usage days (invoices) for the legal periods.

### Earlier deletion on request

If you don't want to wait 30 days – for example after switching to another provider – write to [hello@openeos.de](mailto:hello@openeos.de). We then delete the organization permanently right away and confirm it by email. The fiscal archive is kept as described above. This isn't possible yet while the Cloud TSE is still active or transactions without a cash point closing are open.
