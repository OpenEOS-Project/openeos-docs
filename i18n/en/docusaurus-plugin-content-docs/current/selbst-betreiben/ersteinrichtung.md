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
- **Password** — at least 8 characters, with an uppercase letter, a lowercase letter and a digit —
  and the same again under **Confirm Password**
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

That is why the technical pages are not in the sidebar. Open the user list
with **Unlock** directly at the address `/users`, e.g.
`http://192.168.1.50:3001/users`.

## Country and operating mode

The organization starts as **All features (existing)**: with cash, card and
online payment. In the dashboard OpenEOS asks you to set your
organization's country:

1. In the **Country of your organization** notice, choose your country.
2. Click **Set country** and confirm with **Set**.

You set the country only once. You choose the operating mode under
**Settings → Organization → Operating mode**. As the operator of your own
installation, you are responsible for whether your till may record cash
without a TSE in Germany. If you switch to **Orders only** or **Cashless** in
Germany, you cannot go back to **All features** without a configured Cloud
TSE. More under [Operating modes](../betriebsarten.md#selbst-betreiben).

## The first event

Create an event under **Events** and click **Activate**. You do not need to
unlock it — no cost, no cap on orders.

If the event has a date, the same [phases](../veranstaltungen.md#phasen) apply
as in the hosted service: until 12 hours before the first event day it is
**Planned** and the till books test orders, here without a limit. After that
it sells for real, and 6 hours after the last event day it is **Ended**. If
you want to sell for longer, simply extend the end. You set these times with
`EVENT_EARLY_START_HOURS` and `EVENT_GRACE_HOURS` in the `environment:` block
of the `api` service; with `EVENT_DATE_PHASES=false` an active event sells for
real immediately and without an end.

**Test mode** still exists, but it has a different meaning here:
it is not a limited trial, but a dry run. On activation, and once more when
sales start, the test orders are deleted — so you can practice with the team
without practice bookings ending up in the reports.

:::warning[Is OpenEOS asking for payment?]
If a purchase dialog or the message *"The event has not been unlocked yet.
Please purchase it first."* appears when you activate, the installation is not running in Single Organization mode.
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
  [manual](../intro.md) and applies unchanged.
