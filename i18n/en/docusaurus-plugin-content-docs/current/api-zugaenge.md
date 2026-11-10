---
sidebar_position: 19
title: API access
description: Connect scripts, automations and AI agents to OpenEOS – create a token, understand scopes, make your first request.
---

# API access

OpenEOS has a REST API. With an **API token**, scripts, automations (for example Zapier or n8n) and AI agents can access your organization's data: events, products, tables, shift plans, reports and more.

The API is meant for **administration**, not for the till. Cashing up, payments, members, billing and deleting stay reserved for signing in to the app – a token never reaches them, whatever rights its owner has.

Every endpoint a token can reach is in the [API reference](/en/api) – each with its required scope, parameters, responses and examples, plus the management of the tokens themselves. The endpoints used by the apps (till and device API, sign-in, payments, members, billing, admin) are deliberately not documented there: they are not a stable interface for integrations. The reference is read-only – you cannot send requests from there – and it is in German in both languages of this documentation.

If you want OpenEOS to notify you as soon as something happens – for example when an order is paid – instead of your script asking over and over, use [webhooks](./integrationen/webhooks.md).

## Creating an access token {/* #creating-a-token */}

1. Sign in as an **administrator** of the organization.
2. Open **Settings → Organization → Access**.
3. Click **Create access token** and enter a **Name** (for example "Zapier shift plan").
4. Under **Permissions**, tick the [scopes](#scopes) the script needs. **Read** (`read`) is preselected. Less is better.
5. Under **Expiry**, optionally choose an expiry date: **never**, **30 days**, **90 days**, **365 days** or a date of your own. Without a date the token does not expire.
6. Click **Create access token**. In the window that follows, **copy the token (`oeos_…`) right away** with **Copy** and store it safely, for example in a password manager. It is shown exactly once; OpenEOS keeps only a hash. **Done** closes the window.

A token acts like the person who created it: it is limited to **one organization**, to the selected scopes and additionally to the [module permissions](./mitglieder.md) of its owner. If the owner leaves the organization, the token stops working.

An organization can have at most **20 active tokens**; above the list you see the current state, for example "3 of 20 active tokens". The list shows each token's **Name**, the beginning of its **Key**, its **Permissions**, when it was **Created** and **Last used**, when it **Expires** and its **Status** (active, expired or revoked). Revoke a token you no longer need, or one that may have leaked, there with **Revoke** – it takes effect immediately and cannot be undone.

## Scopes

Every endpoint in the [API reference](/en/api) names the scope it requires (`x-api-token-scope`). In the app the scopes are called **Permissions** and have a readable name; the scope is shown next to it. Write scopes do **not** include `read` – if you want to read and write, pick both.

| Scope | In the app | Allows | Module permission the owner needs |
|---|---|---|---|
| `read` | **Read** | Read organization, events, categories, products, deposit types, tables, stations, receipt templates, printers, shift plans, devices, reports and orders (including the CSV export) | Membership; for reports `Reports`, for the order export `Orders` |
| `catalog:write` | **Edit catalog** | Create and edit categories, products and deposit types | `Products`, `Deposit` |
| `events:write` | **Edit events** | Create and edit events, copy products between events, edit production stations (no activation) | `Events` |
| `tables:write` | **Edit tables** | Edit areas, tables and the table plan | `Events` |
| `staff:write` | **Edit shift plans** | Edit shift plans, jobs, shifts and helper sign-ups (accept, decline, notes, create) | `Shift plans` |
| `devices:write` | **Edit receipt templates** | Create and edit receipt templates | `Devices` |
| `settings:write` | **Change settings** | Change organization settings | Administrator |
| `webhooks:read` | **Read webhooks** | Read [webhooks](./integrationen/webhooks.md), their settings and the delivery log | Administrator |
| `webhooks:write` | **Manage webhooks** | Create and edit webhooks, rotate the secret, send a test, redeliver deliveries – deleting only in the app | Administrator |

Never reachable with a token: the till and creating orders, payments and refunds, members and invitations, billing and activation, deleting, the device API, the menu import and all admin functions.

## First request

Base URL of the hosted API: `https://api.openeos.de/api`. If you [self-host](./selbst-betreiben/intro.md) OpenEOS, use your own address with `/api` at the end.

The token goes into the `Authorization` header – the same header the web app uses for its session token:

```bash
curl https://api.openeos.de/api/organizations/ORGANIZATION-ID/events \
  -H "Authorization: Bearer oeos_…"
```

The organization is always part of the path; a token only reaches its own. The app does not show your organization's ID directly. You find it in the `organizationId` field of every [webhook delivery](./integrationen/webhooks.md#aufbau), for example after **Send test** in the delivery log under **Payload (JSON)**. A connected [AI agent](./ki-agenten.md) tells you via `get_organization`.

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

- [API reference](/en/api) – every endpoint for API tokens with parameters, responses and scopes, generated from the API's OpenAPI description
- [Connecting AI agents](./ki-agenten.md) – connect Claude, Cursor and other agents via MCP with the same token
- [Webhooks](./integrationen/webhooks.md) – OpenEOS reports orders, payments and more to your address as they happen
- [Members and permissions](./mitglieder.md) – which module permissions a token owner needs
