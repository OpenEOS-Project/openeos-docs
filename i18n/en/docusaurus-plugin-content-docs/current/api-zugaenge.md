---
sidebar_position: 19
title: API access
description: Connect scripts, automations and AI agents to OpenEOS – create a token, understand scopes, make your first request.
---

# API access

OpenEOS has a REST API. With an **API token**, scripts, automations (for example Zapier or n8n) and AI agents can access your organization's data: events, products, tables, shift plans, reports and more.

The API is meant for **administration**, not for the till. Cashing up, payments, members, billing and deleting stay reserved for signing in to the app – a token never reaches them, whatever rights its owner has.

The full description of every endpoint is in the [API reference](/en/api). It is read-only: you cannot send requests from there.

## Creating a token

1. Sign in as an **administrator** of the organization.
2. Open **Settings → Organization → Access**.
3. Click **Create token**, give it a name (for example "Zapier shift plan") and pick the scopes the script needs. Less is better. Optionally set an expiry date.
4. **Copy the token (`oeos_…`) right away** and store it safely. It is shown exactly once; OpenEOS keeps only a hash.

A token acts like the person who created it: it is limited to **one organization**, to the selected scopes and additionally to the [module permissions](./mitglieder.md) of its owner. If the owner leaves the organization, the token stops working.

An organization can have at most **20 active tokens**. Revoke a token you no longer need, or one that may have leaked, on the same page – it takes effect immediately.

## Scopes

Every endpoint in the [API reference](/en/api) names the scope it requires (`x-api-token-scope`). Write scopes do **not** include `read` – if you want to read and write, pick both.

| Scope | Allows | Module permission the owner needs |
|---|---|---|
| `read` | Read organization, events, categories, products, deposit types, tables, stations, receipt templates, printers, shift plans, devices, reports and orders | Membership; for reports `Reports` |
| `catalog:write` | Create and edit categories, products and deposit types | `Products`, `Deposit` |
| `events:write` | Create and edit events, copy products between events, edit production stations (no activation) | `Events` |
| `tables:write` | Edit areas, tables and the table plan | `Events` |
| `staff:write` | Edit shift plans, jobs, shifts and helper sign-ups (accept, decline, notes, create) | `Shift plans` |
| `devices:write` | Create and edit receipt templates | `Devices` |
| `settings:write` | Change organization settings | Administrator |

Never reachable with a token: the till and creating orders, payments and refunds, members and invitations, billing and activation, deleting, the device API, the menu import and all admin functions.

## First request

Base URL of the hosted API: `https://api.openeos.de/api`. If you [self-host](./selbst-betreiben/intro.md) OpenEOS, use your own address with `/api` at the end.

The token goes into the `Authorization` header – the same header the web app uses for its session token:

```bash
curl https://api.openeos.de/api/organizations/ORGANIZATION-ID/events \
  -H "Authorization: Bearer oeos_…"
```

Your organization's ID is in the address bar of the app as soon as you are in the settings. The organization is always part of the path; a token only reaches its own.

## Limits

Per token:

- **120 requests per minute**
- **5,000 requests per day**

Each response reports the current state in the headers `X-RateLimit-Limit-api-token-minute`, `X-RateLimit-Remaining-api-token-minute` and `X-RateLimit-Reset-api-token-minute` (likewise `…-api-token-day`). Once the limit is reached, the API answers with `429` and `Retry-After`. The general per-IP limit applies on top.

## Errors

Every error response has the same shape:

```json
{
  "error": {
    "code": "FORBIDDEN",
    "reason": "API_TOKEN_SCOPE_MISSING",
    "message": "…",
    "params": { "scope": "events:write" },
    "details": null,
    "requestId": "…",
    "timestamp": "2026-10-30T12:00:00.000Z"
  }
}
```

`code` is the general class (`FORBIDDEN`, `NOT_FOUND`, …), `reason` the specific case. The most important ones for tokens:

| Status | `reason` | Meaning |
|---|---|---|
| `401` | `API_TOKEN_INVALID` | Token unknown, revoked, expired, or the owner is no longer a member |
| `403` | `API_TOKEN_NOT_ALLOWED` | This endpoint is not available to tokens |
| `403` | `API_TOKEN_SCOPE_MISSING` | The token lacks the required scope (`params.scope`) |
| `403` | `API_TOKEN_WRONG_ORGANIZATION` | The request concerns a different organization than the token's |
| `429` | `API_TOKEN_RATE_LIMITED` | Limit reached, see `Retry-After` |

## Read on

- [API reference](/en/api) – every endpoint, parameter, response and scope, generated from the API's OpenAPI description
- [Members and permissions](./mitglieder.md) – which module permissions a token owner needs
