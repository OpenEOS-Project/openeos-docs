---
title: Integrations
sidebar_label: Overview
description: Turn connections to other services on, set them up and switch them off again.
---

import TseComingSoon from '@site/src/components/TseComingSoon';

# Integrations

**Integrations** connect OpenEOS to other services, for example SumUp for card payments at the till. Every integration starts switched off; you only turn on what you actually need.

The page is reserved for **administrators**. Members see neither the catalog nor an integration's settings.

![Integrations catalog](/img/screens/en/integrations.png)

## View and activate an integration

1. Open **Integrations** in the sidebar.
2. Click an integration. A window shows what it does, what you need for it, a few pictures and a link to the matching page in this handbook.
3. Click **Activate**.

The integration then appears as its own entry directly below **Integrations** in the sidebar. That is where you set it up — for SumUp, the credentials and card readers.

![Integration info window](/img/screens/en/integrations-sumup-info.png)

## Switching off

Switch an integration off again with **Deactivate**, either in the same window or on its settings page. The sidebar entry disappears and the integration's features are no longer available — for SumUp, card payment at the till.

Your settings are kept. If you activate the integration again later, everything is set up as before.

## Status in the catalog {/* #status */}

Every card in the catalog shows the state of the integration:

| Status | Meaning |
|---|---|
| **Active** | switched on and ready |
| **Inactive** | available, but not switched on |
| **Not set up** / **Setting up** | switched on, but not ready yet, for example a Cloud TSE that is still being created |
| **Coming soon** | in preparation. Instead of **Activate**, the window shows a note and **Close**. |
| **Germany only** | not available in your organization's country |
| **Country missing** | first set your [organization's country](../betriebsarten.md#land) |
| **Not available** | not set up on this server, for example on a self-hosted installation without a Cloud TSE |

## Available integrations

| Integration | Purpose | Status |
|---|---|---|
| [SumUp](./sumup.md) | Card payment with SumUp card readers at the till | available |
| Stripe | Online payments | Coming soon |
| [Cloud TSE](./cloud-tse.md) | Fiscal security under the German KassenSichV – required for cash in Germany | Germany only; while it is being rolled out, the catalog lists it as **Coming soon** (see [Coming soon](./cloud-tse.md#bald-verfuegbar)) |

<TseComingSoon />

## Your own connections {/* #eigene-anbindungen */}

For your own programs and automations you do not need an integration from the catalog. You set them up as an administrator in the settings:

- [API access](../api-zugaenge.md) – scripts and automations read and change data through the REST API.
- [Webhooks](./webhooks.md) – OpenEOS reports orders, payments, refunds and more to your own address as they happen.
- [AI agents](../ki-agenten.md) – connect Claude, Cursor and other agents via MCP.
