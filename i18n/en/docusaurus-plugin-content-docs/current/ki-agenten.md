---
sidebar_position: 20
title: Connecting AI agents
description: Connect Claude, ChatGPT, Cursor and other agents to OpenEOS via MCP – create an access token, set up the client, what the agent can and cannot do.
---

# Connecting AI agents

OpenEOS is an [MCP](https://modelcontextprotocol.io) server. That lets an agent you already use – Claude, ChatGPT, Cursor or your own – read your organization's data and take care of administrative tasks for you. You describe what you want; the agent calls the matching tools.

This is different from the [assistant](./assistent.md) in the app: the assistant is built in and helps with menus and icons. A connected agent runs on your side, with the provider of your choice, and operates OpenEOS from the outside through an [API token](./api-zugaenge.md).

## What it can do

An agent can:

- **read:** organization, events, categories, products, deposit types, tables and areas, production stations, shift plans, devices, printers, receipt templates, reports and orders
- **manage:** create and change events, copy products between events, create and change categories and products, create tables and areas, set up stations, build shift plans with jobs and shifts and publish them, maintain receipt templates, change organization settings

An agent can **never**: operate the till, create orders, trigger payments or refunds, manage members, activate or pay for events, delete anything. That stays reserved for signing in to the app – regardless of the rights the token has.

Two rules apply to everything that writes:

1. **Preview first, then confirmation.** Every writing tool first returns a preview ("Would create 24 products, change 3 …"). Nothing changes until the agent repeats the call with `confirm: true` – and it should only do that once you have said so.
2. **Everything is logged.** Every applied change is recorded with a note that it came through an agent, the name of the token and the tool.

## Preparation: create a token

The agent signs in with an API token of your organization. As an **admin**, you create it under **Settings → Organization → Access** – step by step under [API access](./api-zugaenge.md#creating-a-token).

Give the token a name you will recognize (for example "Claude Desktop") and pick only the scopes the agent needs. The agent sees exactly the tools the token allows:

| Scope | What the agent can do with it |
|---|---|
| **read** | Read everything: organization, events, stations, categories, products, deposit types, tables, shift plans (counts only, no helper names), devices, printers, receipt templates, sales reports, orders (without guest data), icon suggestions. <br />Tools: `get_organization`, `list_events`, `get_event`, `list_production_stations`, `list_categories`, `list_products`, `list_pfand_types`, `list_table_areas`, `list_shift_plans`, `get_shift_plan`, `list_devices`, `list_printers`, `list_print_templates`, `get_sales_report`, `list_orders`, `get_order`, `suggest_icons` |
| **catalog:write** | Create and change categories and products, mark products as sold out, create deposit types. <br />Tools: `create_category`, `update_category`, `upsert_products`, `update_product_availability`, `create_pfand_type` |
| **events:write** | Create and change events, copy products from another event, create and change production stations. <br />Tools: `create_event`, `update_event`, `copy_event`, `create_production_station`, `update_production_station` |
| **tables:write** | Create areas, create series of tables, rename or move tables. <br />Tools: `create_table_area`, `create_tables`, `update_table` |
| **staff:write** | Create shift plans, add jobs and shifts, publish a shift plan. <br />Tools: `create_shift_plan`, `create_shift_job`, `create_shifts`, `publish_shift_plan` |
| **devices:write** | Create and change receipt templates (admins only). <br />Tools: `create_print_template`, `update_print_template` |
| **settings:write** | Change name, logo and operational settings of the organization (admins only; no payment providers, legal texts or billing). <br />Tool: `update_organization` |

You need `read` for almost everything – write scopes do not include reading. A good start is `read` plus `catalog:write` and `events:write`. On top of that, the [module permissions](./mitglieder.md) of the person who created the token always apply.

Copy the token (`oeos_…`) right away – it is shown only once.

## Connecting

The server is reachable at `https://api.openeos.de/mcp` (Streamable HTTP). The token goes into the header `Authorization: Bearer oeos_…`. Replace `oeos_…` in the examples with your token.

:::note[Self-hosted]
If you [self-host](./selbst-betreiben/intro.md) OpenEOS, use your own API address with `/mcp` at the end – without `/api` in front, for example `https://api.club.example/mcp`.
:::

### Claude Code

One command in the terminal is enough:

```bash
claude mcp add --transport http openeos https://api.openeos.de/mcp \
  --header "Authorization: Bearer oeos_…"
```

Or store the connection for a project in its `.mcp.json`:

```json
{
  "mcpServers": {
    "openeos": {
      "type": "http",
      "url": "https://api.openeos.de/mcp",
      "headers": { "Authorization": "Bearer oeos_…" }
    }
  }
}
```

With `/mcp` in Claude Code you can see whether the connection is up and which tools the agent sees.

### Claude Desktop

Claude Desktop so far connects remote servers only through OAuth – and OpenEOS does not offer that yet (it is planned). Until then, the way is **`mcp-remote`**, a small program that runs on your computer, connects to OpenEOS and passes the token along as a header. You need [Node.js](https://nodejs.org) for it; `npx` downloads `mcp-remote` on first start.

In Claude Desktop open **Settings → Developer → Edit Config** and add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "openeos": {
      "command": "npx",
      "args": [
        "-y", "mcp-remote", "https://api.openeos.de/mcp",
        "--header", "Authorization:${OPENEOS_AUTH}"
      ],
      "env": { "OPENEOS_AUTH": "Bearer oeos_…" }
    }
  }
}
```

The detour through the `OPENEOS_AUTH` variable is intentional: with the space in "Bearer oeos_…" placed directly in `args`, `mcp-remote` trips up on some systems. Restart Claude Desktop after saving – OpenEOS then shows up among the tools.

### Cursor

Create the file `.cursor/mcp.json` in your project (or globally `~/.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "openeos": {
      "url": "https://api.openeos.de/mcp",
      "headers": { "Authorization": "Bearer oeos_…" }
    }
  }
}
```

Under **Settings → MCP**, Cursor shows the server and its tools.

### Other clients

Any client that speaks **Streamable HTTP** with custom headers works – including ChatGPT developer tooling, agent frameworks and programs you write yourself. Configure:

- **URL:** `https://api.openeos.de/mcp`
- **Header:** `Authorization: Bearer oeos_…`

The server is stateless: no session ID, no sign-in steps, each request stands on its own. This is how you check with `curl` that token and connection are fine:

```bash
curl -s https://api.openeos.de/mcp \
  -H "Authorization: Bearer oeos_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

The response lists the tools this token sees. Besides tools, the server provides excerpts of this documentation (products, events, tables, printers, shifts) as resources and two prepared flows (`setup_event`, `daily_summary`) as prompts – whether your client shows them depends on the client.

## Examples

This is how you can talk to a connected agent:

- "Set up the products for Summer Fest 2027 from Village Fair 2026."
- "How much revenue did we make on Saturday, by hour?"
- "Create 20 tables T1 to T20 in the area Tent, 8 seats each."
- "Create a shift plan for the Summer Fest with Bar, Grill and Till – Friday and Saturday 5 pm to midnight in two-hour shifts, two helpers each."
- "Publish the shift plan."
- "Which products have no tax rate yet? Set them to 19%."

The agent picks the tools itself: for the first example it lists the events, finds the IDs of "Village Fair 2026" and "Summer Fest 2027" and calls `copy_event`. For the second it uses `get_sales_report` with the `hourly` section.

For anything that writes, you see the preview first. For the tables it looks roughly like this:

> **Agent:** I would create 20 tables in the area "Tent": T1, T2, … T20, 8 seats each. None of the labels is taken yet. Shall I create them?
>
> **You:** Yes.
>
> **Agent:** Done – 20 tables created in "Tent". Their position on the table plan is still open; you arrange that in the app.

Behind the preview is the tool's response, for example for products:

```json
{
  "preview": true,
  "summary": "Would create 2 products, change 1 (0 unchanged, 0 errors, 1 new category) in \"Summer Fest 2027\"",
  "wouldCreate": [{ "name": "Radler", "category": "Drinks", "price": 4.5 }],
  "wouldUpdate": [{ "name": "Beer", "changes": { "price": { "from": 4.5, "to": 4.8 } } }],
  "newCategories": ["Food"],
  "errors": []
}
```

If the preview contains errors (say, a row without a price or a table label that is already taken), nothing is written at all – not even the rows without errors. Only when the agent repeats the same call with `confirm: true` after your "yes" does anything change, and the response then starts with `"ok": true`.

:::info[Suggestions can contain mistakes]
The agent interprets what you say – prices, tax rates or assignments can be off. Read the preview before you confirm. For bigger restructurings it is worth a look in the app before the event starts.
:::

## Limits and security

- **Scopes.** A token can only do what its scopes allow – and never more than the person who created it. Tools outside the scopes are not even visible to the agent. A token belongs to exactly one organization.
- **Limits per token.** 120 calls per minute and 5,000 per day, shared with everything else the same token does through the [REST API](./api-zugaenge.md#limits). Agents like to call many tools in a row; once the limit is reached the server answers with `429` and the agent should wait briefly.
- **Revoking.** Under **Settings → Organization → Access** you revoke a token with one click – it takes effect immediately, including for open connections. If the person who created it leaves the organization, the token stops working as well.
- **Log.** Every applied change is recorded with the tool, the name of the token, the time and a fingerprint of the input – recognizable by the note "via agent". Previews leave no entry.
- **No guest data.** Orders reach the agent without names, phone numbers, notes and cashiers; shift plans only with counts per status, without helper names or contact details; devices without tokens and pairing codes; the organization without payment providers, support PIN and billing.

:::note[Your data goes to the agent's provider]
Everything the agent reads from OpenEOS – product names, prices, revenue, table plans, your organization's address – is processed by the agent's provider (for example Anthropic, OpenAI or Cursor) under their terms. This is independent of the [assistant](./assistent.md#privacy) in the app. Which data you hand to an agent is up to you – through the token's scopes and the provider you choose.
:::

## When something does not work

- **`401` · `NOT_AUTHENTICATED`** – No token arrived. Check the header: `Authorization: Bearer oeos_…` (with a space after `Bearer`). With Claude Desktop: is the `OPENEOS_AUTH` variable set?
- **`401` · `API_TOKEN_INVALID`** – Token unknown, revoked, expired – or the person who created it is no longer a member. A session token from the browser is rejected as well. Create a new token under **Settings → Organization → Access** and copy it completely.
- **`403` · `API_TOKEN_WRONG_ORGANIZATION`** – The token belongs to no organization (platform token of a super admin). Create a token inside the organization.
- **A tool is missing from the list** – The token lacks the matching scope; the server hides such tools. Create a new token with the required scopes (the scopes of an existing token cannot be changed) and swap the token in the client.
- **`SCOPE_MISSING` as a tool response** – The agent called a tool the token does not allow. As above.
- **`INSUFFICIENT_PERMISSIONS`** – The token would have the scope, but the person who created it may not edit that module (for example no reports). Adjust the person's [module permission](./mitglieder.md) or have an admin create the token.
- **`429` · `API_TOKEN_RATE_LIMITED`** – Limit reached (120/min or 5,000/day). Wait; `Retry-After` tells the seconds.
- **`NOT_FOUND` for an event** – The ID belongs to another organization or does not exist. Have the agent list the events with `list_events` first.
- **`suggest_icons` answers "not set up"** – The [assistant](./assistent.md#switching-it-on) is switched off for the organization. Switch it on as an admin – or simply do not use that tool.
- **Claude Desktop does not show OpenEOS** – `mcp-remote` could not start; usually Node.js is missing or the config file has a typo. Install Node.js, check the JSON, restart Claude Desktop. The logs are under **Settings → Developer**.

## Read on

- [API access](./api-zugaenge.md) – create a token, scopes in detail, error format
- [Assistant](./assistent.md) – the built-in helpers for menus and icons
- [API reference](/en/api) – all REST endpoints; the MCP server uses the same services
