---
sidebar_position: 6
title: Operation
description: Backups, updates and troubleshooting during operation.
---

# Operation

## Backups

Two things are irreplaceable: the **database** and the **uploaded
images**. Everything else can be regenerated.

```bash
cd /opt/openeos
mkdir -p backups

# Database
sudo docker compose exec -T postgres \
  pg_dump -U openeos openeos | gzip > backups/db-$(date +%F).sql.gz

# Images (product and category images, profile pictures)
sudo docker run --rm \
  -v openeos_uploads:/from -v "$PWD/backups":/to alpine \
  tar czf /to/uploads-$(date +%F).tar.gz -C /from .
```

Also back up the `.env` file — without
`TWO_FACTOR_ENCRYPTION_KEY`, stored two-factor secrets are worthless after
a restore.

Daily at 3 a.m., with 14 days of retention:

```bash
sudo crontab -e
```

```cron
0 3 * * * cd /opt/openeos && docker compose exec -T postgres pg_dump -U openeos openeos | gzip > backups/db-$(date +\%F).sql.gz && find backups -name 'db-*.sql.gz' -mtime +14 -delete
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

Do not update during a running event: tills briefly lose
their connection.

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

## Data minimisation

A self-hosted installation sends **nothing** to the outside. Optional
integrations stay off as long as you do not store any credentials:
error reports (Sentry), card payment (SumUp, PayPal) and email delivery.

One exception worth knowing about: emails that are sent embed the
OpenEOS logo from `openeos.de`. It is loaded by the **recipient's** browser,
not by your server — so it only affects email notifications you have switched on.

## Help

The support chat belongs to the hosted service and is not available here.
For self-hosted installations:

- **Bugs and questions**: [GitHub Issues](https://github.com/OpenEOS-Project)
- **Manual**: the other chapters apply unchanged
