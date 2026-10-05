---
sidebar_position: 1
title: Overview
description: Run OpenEOS on your own server — free of charge, without billing, with one organisation.
---

# Self-hosting OpenEOS

OpenEOS can be run entirely on your own server. This deployment mode is called
**Single Organization** (`DEPLOYMENT_MODE=selfhosted`) and is
**free and unlimited**: no unlocking per event, no cap on orders, no Stripe,
no invoices.

The source code is available under the [AGPL-3.0][agpl] on
[GitHub](https://github.com/OpenEOS-Project). There is **no licence key,
no telemetry and no phoning home** to openeos.de — the installation keeps
working permanently without any outbound internet connection.

[agpl]: https://www.gnu.org/licenses/agpl-3.0.html

## What you need

| What | Requirement |
|---|---|
| **Server** | Linux with Docker and Docker Compose. 2 CPU cores, 4 GB RAM and 20 GB of disk are enough for a club festival. |
| **Prior knowledge** | You should be able to edit a text file and run commands in a console. |
| **Network** | The tills must be able to reach the server — over the Wi-Fi at the festival site or over the internet. |
| **Email** | Optional. Everything works without a mail server, see [Creating users](./benutzer.md). |

## What Single Organization mode can do — and what it cannot

**Fully included:** tills, orders, products and categories,
locations, deposit, discount vouchers, inventory, shift plans, members with
permissions, receipt printing via ESC/POS printers, customer and kitchen displays,
reports and the online shop.

**Not included**, because it belongs to the hosted service:

- Billing, Stripe, invoices — there is simply nothing to pay
- Several organisations side by side (exactly one per installation)
- Rental hardware and the support chat with us
- Self-registration — accounts are created via member management

These areas are hidden in the interface; the corresponding
API endpoints respond with `404`.

## The components

| Service | Purpose | Required |
|---|---|---|
| `openeos-api` | Server: API, WebSocket, database access | yes |
| PostgreSQL 16 | Database | yes |
| Redis 7 | Sessions, cache, WebSocket distribution | yes |
| `openeos-web` | Dashboard, till interface, displays | yes |
| `openeos-shop` | Public online shop per event | no |
| `openeos-printer-agent` | Driving ESC/POS printers | only with receipt printing |

Redis is **not** optional: the server does not start without a reachable Redis.

## Your path through this guide

1. [Installation](./installation.md) — set up and start the server
2. [Initial setup](./ersteinrichtung.md) — create the administrator and the organisation
3. [Creating users](./benutzer.md) — further accounts, with and without a mail server
4. [Connecting printers](./drucker.md) — set up receipt printing
5. [Operation](./betrieb.md) — backups, updates, troubleshooting

:::tip[Rather not run your own server?]
At [app.openeos.de](https://app.openeos.de) we run OpenEOS for you —
with no installation and with support. Billing there is per
event. The rest of the manual describes that variant.
:::
