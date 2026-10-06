---
sidebar_position: 3
title: Initial setup
description: Create the administrator and the organization, and enable the first event.
---

# Initial setup

After the first start the installation is empty. The setup wizard creates
the administrator and the organization in a single step.

## Opening the wizard

Open the dashboard in your browser — with the example configuration from the
[installation](./installation.md), that is `http://192.168.1.50:3001`. You are
taken to the setup page automatically.

In Single Organization mode the wizard goes straight to the **Single Organization** form;
there is no choice between deployment modes, because there is only one here.

Enter:

- **First Name, Last Name, Email Address** of the administrator
- **Password** — at least 8 characters, with an uppercase letter, a lowercase letter and a digit
- **Organization Name** — your club, e.g. “Testville Music Society”

One click on **Complete Setup**, and the account is ready.

:::info[The email address does not have to exist]
This first account counts as verified immediately — no email is sent and
none is expected. An address such as `admin@verein.local` is fine, as long as
you remember it: it is your login name.
:::

## Signing in

You are then taken to the sign-in page. In Single Organization mode the form
shows password sign-in directly, because signing in via an emailed link requires
a mail server.

## What this account is allowed to do

The administrator created this way manages the installation **completely**: the
organization, all events, devices, printers, members — and
additionally the technical areas (cleaning up the device list, assigning printers,
unlocking locked-out users, viewing the log).

There is deliberately **no second level above it**. In the hosted variant
an operator role exists above the customer; in Single Organization mode that would be
you yourself, so the separation is dropped.

## The first event

Create an event under **Events** and click
**Activate**. It is active immediately — without unlocking, without cost, without
a cap on orders.

**Test mode** still exists, but it has a different meaning here:
it is not a limited trial, but a dry run. On activation,
the orders recorded in test mode are deleted — so you can practise with the team
without practice bookings ending up in the reports.

:::warning[Is OpenEOS asking for payment?]
If a purchase dialog or the message *„Veranstaltung ist noch nicht
freigeschaltet“* (“event has not been unlocked yet”) appears when you activate, the installation is not running in Single Organization mode.
Check:

```bash
curl http://localhost:3000/api/setup/status
```

It must say `"mode":"selfhosted"`. Otherwise `DEPLOYMENT_MODE` is missing — see
[Installation, step 4](./installation.md#4-checking-that-it-is-running).
:::

## Next

- [Creating users](./benutzer.md) — add your team
- Everything else — products, tills, displays — is covered in the
  [manual](/) and applies unchanged.
