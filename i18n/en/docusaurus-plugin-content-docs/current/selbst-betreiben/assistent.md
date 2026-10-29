---
sidebar_position: 7
title: Setting up the assistant
description: Menu import and icon suggestions on your own server – provider, keys, models, quotas and files.
---

# Setting up the assistant

The [assistant](../assistent.md) (menu import, icon suggestions) is
**optional** in self-hosted mode and off by default. It needs an external
provider that analyses the menus — you store your own key for it on the
server. Without a provider the UI shows **Not set up** under
**Settings → Organization → Assistant**, and everything else works as
before.

:::info[Data leaves the server]
With the assistant set up, uploaded menus and product names are sent to the
chosen provider. What the provider does with them is governed by **your**
contract with it — check its privacy terms and inform your users before an
admin switches the features on.
:::

## Choosing a provider

`AI_PROVIDER` in the environment of `openeos-api` selects the mode:

| Value | Meaning |
|---|---|
| `none` | Off (default). All assistant endpoints respond with `404`. |
| `anthropic` | Claude via the Anthropic API. Reads images **and PDFs**. |
| `openai` | An OpenAI-compatible chat completions API — OpenAI itself or another service with its own `OPENAI_BASE_URL`. Reads images and text, **no PDFs**. |

### Anthropic

```yaml
  api:
    environment:
      # … existing variables …
      AI_PROVIDER: anthropic
      ANTHROPIC_API_KEY: ${ANTHROPIC_API_KEY:?ANTHROPIC_API_KEY missing}
```

Put the key into `.env` next to the other secrets:

```bash
ANTHROPIC_API_KEY=sk-ant-…
```

### OpenAI and compatible services

```yaml
  api:
    environment:
      # … existing variables …
      AI_PROVIDER: openai
      OPENAI_API_KEY: ${OPENAI_API_KEY:?OPENAI_API_KEY missing}
      # Only needed for other providers; default is https://api.openai.com/v1
      OPENAI_BASE_URL: https://api.openai.com/v1
```

With `OPENAI_BASE_URL` you can address any service that mirrors OpenAI's
chat completions API — a European provider, say, or a locally running model.
The service must support two things: **images** as input and **structured
output** by JSON schema (`response_format` with `json_schema`,
`strict: true`). If either is missing, every import fails with "The
assistant is currently unavailable" — the details are in the `openeos-api`
log.

:::warning[PDF only with Anthropic]
With the OpenAI-compatible provider the server rejects PDF uploads ("PDF is
not supported by the configured provider — please upload photos of the
pages"). Photos and pasted text always work.
:::

## Models

Which models the server uses is part of the configuration, not the code.
Left empty, the defaults per provider apply:

| Variable | Purpose | Default `anthropic` | Default `openai` |
|---|---|---|---|
| `AI_MODEL_EXTRACT` | reads the menu (images, PDF, text) | `claude-sonnet-5-5` | `gpt-5` |
| `AI_MODEL_CLASSIFY` | assigns unclear product names to an icon | `claude-haiku-4-5-20251001` | `gpt-5-mini` |

With an OpenAI-compatible provider, set both values to the model names your
service knows. The extraction model must understand images; the
classification model only needs text and can be small.

## Quotas and limits

| Variable | Meaning | Default |
|---|---|---|
| `AI_MENU_IMPORTS_PER_DAY` | Menu imports per organization and calendar day (Europe/Berlin) | `5` |
| `AI_CLASSIFY_PER_DAY` | Icon assignments by model per organization and day | `500` |
| `AI_MENU_PAGES_PER_IMPORT` | Images per import (1–20) | `6` |
| `AI_MAX_UPLOAD_MB` | Maximum size per file in MB (1–50) | `10` |

The quotas protect the costs of the hosted offering. With your own key you
pay the provider yourself and can set them as high as you like; `0` switches
the respective feature off. A call that fails at the provider is not
counted. Most icon suggestions need no model call at all (they are matched
against the names and search terms of the product icons); only unclear
names are sent to the classification model, bundled into one call.

Every model call is recorded in the `ai_usage` table with organization,
feature, model, token counts and duration — that is where you see what the
assistant costs you at your provider.

## Switching it on

After the restart (`sudo docker compose up -d --force-recreate api`),
**Settings → Organization → Assistant** shows the **Assistant features**
switch instead of "Not set up". Import and icon suggestions only appear in
the UI once an admin switches it on; switching on and off is written to the
audit log.

## Files and retention

Uploaded menus are stored under `<UPLOAD_DIR>/menu-imports/<id>/` (in the
Compose guide that is the `uploads` volume). They are **not** publicly
reachable — unlike product images, the server does not serve this path.

They are deleted as soon as the suggestion is **applied** or **discarded**,
and at the latest **24 hours** after upload; the stored suggestion (the
recognized list in the `menu_imports` table) after **30 days**. An hourly
background job on the server takes care of both. Imports that have been
processing for more than 15 minutes are marked as failed by a per-minute
job; they do not cost quota.

At the provider itself the content remains only for the duration of
processing — anything beyond that is governed by your contract with it.

## Troubleshooting

```bash
sudo docker compose logs -f api | grep -i 'assistant\|menu-import\|ai-provider'
```

| Message in the UI | Cause |
|---|---|
| **Not set up** | `AI_PROVIDER` is `none` or missing, or the server was not restarted after the change. |
| **The assistant features are switched off for your organization.** | Provider is there, but the switch in the settings is off. |
| **The assistant is currently unavailable** | Key invalid, model name unknown, or the service cannot handle images or JSON schema — details in the log. |
| **The daily quota … is used up** | `AI_MENU_IMPORTS_PER_DAY` or `AI_CLASSIFY_PER_DAY` reached; free again from midnight (Europe/Berlin). |
| **PDF is not supported by the configured provider** | `AI_PROVIDER=openai` — upload photos of the pages or switch to `anthropic`. |
