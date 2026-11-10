---
sidebar_position: 6
title: Operation
description: Backups, updates and troubleshooting during operation.
---

# Operation

## Backups

Two things are irreplaceable: the **database** and the **uploaded
files**. Everything else can be regenerated.

```bash
cd /opt/openeos
mkdir -p backups

# Database
sudo docker compose exec -T postgres \
  pg_dump --clean --if-exists -U openeos openeos | gzip > backups/db-$(date +%F).sql.gz

# Files (product and category images, profile pictures, with the Cloud TSE the TSE exports)
sudo docker run --rm \
  -v openeos_uploads:/from -v "$PWD/backups":/to alpine \
  tar czf /to/uploads-$(date +%F).tar.gz -C /from .
```

Also back up the `.env` file — without
`TWO_FACTOR_ENCRYPTION_KEY`, stored two-factor secrets are worthless after
a restore. Without a dedicated `INTEGRATION_ENCRYPTION_KEY`, the same goes
for saved SumUp and PayPal credentials and the webhook secrets, and without
a dedicated `PIN_PEPPER` for all till PINs. If these keys are set, they
belong in the backup as well, with the Cloud TSE also `TSE_ENCRYPTION_KEY`.

Daily at 3 a.m., with 14 days of retention:

```bash
sudo crontab -e
```

```cron
0 3 * * * cd /opt/openeos && docker compose exec -T postgres pg_dump --clean --if-exists -U openeos openeos | gzip > backups/db-$(date +\%F).sql.gz && find backups -name 'db-*.sql.gz' -mtime +14 -delete
```

:::warning[A backup that has never been restored is not a backup]
Restore the backup once on a test system **before** you
need it. A festival is the wrong moment to discover that the file
was empty.
:::

### Restoring

```bash
sudo docker compose stop api web
gunzip -c backups/db-2026-09-25.sql.gz | \
  sudo docker compose exec -T postgres psql -U openeos -d openeos
sudo docker compose start api web
```

## Updating

```bash
cd /opt/openeos
sudo docker compose pull
sudo docker compose up -d
```

Database migrations run automatically on start
(`DATABASE_MIGRATIONS_RUN=true`). **Back up the database first** —
migrations cannot easily be undone.

Do not update during a running event: with a single instance, tills
briefly lose their connection.

### Updating without interruption (optional)

With a reverse proxy (see
[Installation](./installation.md#with-your-own-domain-and-https)) you can
update even during a festival. The new version then starts next to the old
one and only takes over once it is ready. To do this:

1. Remove the fixed `ports:` from the `api` service and set
   `DATABASE_MIGRATIONS_RUN: 'false'`.
2. Add a `healthcheck` and `stop_grace_period: 30s` to the `api` service, as
   well as the one-off `migrate` service that runs the migrations beforehand.
   Templates for both are in `docker-compose.prod.yml` in the API
   repository:

   ```yaml
     migrate:
       image: ghcr.io/openeos-project/openeos-api:latest
       profiles: ['tools']
       restart: 'no'
       command: ['node', 'node_modules/typeorm/cli.js', 'migration:run', '-d', 'dist/src/config/data-source.js']
       environment:
         NODE_ENV: production
         DATABASE_HOST: postgres
         DATABASE_USER: openeos
         DATABASE_PASSWORD: ${DATABASE_PASSWORD:?DATABASE_PASSWORD missing}
         DATABASE_NAME: openeos
       depends_on:
         postgres: { condition: service_healthy }
   ```

3. Install the Docker plugin
   [docker-rollout](https://github.com/wowu/docker-rollout).
4. Update like this:

   ```bash
   sudo docker compose pull api
   sudo docker compose run --rm migrate
   sudo docker rollout api
   ```

If the new instance does not become healthy, the old one stays active.
OpenEOS migrations are built so that the previous version keeps working with
the new schema. Details are in the API README under "Mehrere Instanzen".

### Checking whether sales are running

For your own update scripts there is an endpoint that reports whether an
active event has had real orders in the last 30 minutes. To use it, set a
`DEPLOY_GUARD_TOKEN` on the `api` service (at least 32 characters, e.g.
`openssl rand -hex 32`):

```bash
curl -H "Authorization: Bearer <DEPLOY_GUARD_TOKEN>" \
  http://localhost:3000/api/internal/deploy-guard
```

If the response contains `"busy":true`, wait with the update. Without a
token the endpoint responds with `404`.

## Troubleshooting

```bash
# What do the services say?
sudo docker compose logs -f api
sudo docker compose ps

# Are the database and Redis reachable?
curl http://localhost:3000/api/health/ready
```

### The server does not start

| Message in the log | Cause |
|---|---|
| `JWT_SECRET is required` | The value is missing from the `.env`. |
| `TWO_FACTOR_ENCRYPTION_KEY … not set` | Likewise; at least 32 characters. |
| Connection error to Redis | Redis is not running. The server does not start without Redis. |
| `ECONNREFUSED … 5432` | PostgreSQL is not ready yet — a restart usually solves the problem. |

### The dashboard stays empty

Almost always `API_URL` is wrong: it must contain the address at which
**the browser** reaches the server, not `localhost`.

```bash
# What does the web service pass on to the browser?
curl -s http://192.168.1.50:3001/login | grep -o '__OPENEOS_RUNTIME_CONFIG__={[^<]*}'
```

If it does not show your server address, correct `API_URL` in the `.env`
and restart:

```bash
sudo docker compose up -d --force-recreate web
```

Second most common cause: the address is missing from the server's `CORS_ORIGINS`. The
browser's developer console then shows a CORS error.

### Tills and displays do not update

The persistent connection is not established. Behind a reverse proxy, the
sticky sessions are usually missing (`sticky.cookie`, see
[Installation](./installation.md#with-your-own-domain-and-https)). If you use your own
Content Security Policy in the proxy, `wss:` must be allowed — `https:` does
**not** cover it.

### OpenEOS is asking for payment

```bash
curl http://localhost:3000/api/setup/status
```

If it says `"mode":"saas"`, `DEPLOYMENT_MODE=selfhosted` is not taking effect. The
variable must be set both in the `.env` and in the `environment:` block of the
`api` service.

## Adjusting the limits

The hosted service limits how many organizations an account may have (5) and
how many members an organization has (10, active members plus pending
invitations). A standalone installation has only one organization anyway, but
the member limit applies there too. The only exception is the administrator
from the initial setup when they create or invite accounts themselves. On top
of that there is a technical limit for [servers](../bedienungen.md) (200 per
organization). Set the values in `.env` and in the `environment:` block of
the API service; `0` means unlimited:

```bash
ORGANIZATIONS_PER_USER_LIMIT=5
MEMBERS_PER_ORGANIZATION_LIMIT=0
WAITERS_PER_ORGANIZATION_LIMIT=200
```

Then restart the API service
(`sudo docker compose up -d --force-recreate api`).

## Emergency number for your team

With `OPERATOR_EMERGENCY_PHONE` on the `api` service you store a phone number
for critical failures, for example that of your technician. While an event is
planned or running, it appears in the dashboard, on the events page and at the
till in the menu under **Emergency support**. If left empty, it appears
nowhere.

## Retention and deletion

The nightly automatic deletion of personal data (guest data, shift
registrations, servers, expired sign-in links) is **off** in Single
Organization mode — here you decide as the operator. To switch it on, set
`RETENTION_ENABLED: 'true'` on the `api` service; without
`RETENTION_DRY_RUN: 'false'` the run only counts and deletes nothing. Periods
and all variables are in the API README under "Aufbewahrung und Löschung".

## Data minimization

A self-hosted installation sends **nothing** to the outside. Optional
integrations stay off as long as you do not store any credentials:
error reports (Sentry), card payment (SumUp, PayPal), email delivery, the
[assistant](./assistent.md) and the Cloud TSE. Webhooks only send data out
when an admin adds a receiver under **Settings → Organization → Webhooks**.
By default they only accept public `https://` addresses; you allow a receiver
on your own network with `WEBHOOKS_ALLOW_PRIVATE_NETWORKS: 'true'` on the
`api` service (and `http://` with `WEBHOOKS_ALLOW_HTTP: 'true'`).

One exception worth knowing about: emails that are sent embed the
OpenEOS logo from `openeos.de`. It is loaded by the **recipient's** browser,
not by your server — so it only affects email notifications you have switched on.

## Help

The support chat belongs to the hosted service and is not available here.
For self-hosted installations:

- **Bugs and questions**: [GitHub Issues](https://github.com/OpenEOS-Project)
- **Manual**: the other chapters apply unchanged
