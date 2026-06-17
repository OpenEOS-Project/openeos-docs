---
sidebar_position: 4
title: Organisation
description: The organisation as the central container for events, products, and your team.
---

# Organisation

In OpenEOS, everything belongs to an **organisation** — your club, event operator, or business. The organisation is the central container for your events, products, members, devices, and reports.

In the top left of the sidebar you can see the name of your active organisation and your role (e.g. **Administrator**).

![Organisation settings](/img/screens/en/settings-organisation.png)

## Managing organisation details

You manage the name and other master data of your organisation under **Settings → Organization**. The organisation name appears on invoices and receipts, among other places, and can be changed at any time.

## Data model at a glance

OpenEOS is structured hierarchically. This model helps you understand why some settings apply per event and others apply to the whole organisation:

```
Organisation (Musterverein e.V.)
├── Members & Permissions
├── Devices (tills) & Printers
└── Event (e.g. Sommerfest 2026)
    ├── Categories & Products
    ├── Locations (Kitchen, Bar, Serving station)
    ├── Deposits & Discount vouchers
    ├── Orders
    └── Stock management & Reports
```

:::tip
**Devices, printers, and members** belong to the organisation and are available across all events. **Products, categories, locations, and orders**, on the other hand, each relate to a specific event.
:::

## Multiple organisations

Using the selector in the top left, you can switch between organisations — provided you are a member of more than one. Each organisation has its own data, members, and reports.
