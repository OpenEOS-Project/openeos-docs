---
sidebar_position: 2
title: Installation
description: Set up the server, database and dashboard with Docker Compose.
---

# Installation

This guide sets up a complete OpenEOS server. All commands
run on the server on which OpenEOS will later operate.

## 1. Directory and credentials

```bash
sudo mkdir -p /opt/openeos && cd /opt/openeos
```

Three secrets are needed. Generate them **now** and keep them
safe — especially `TWO_FACTOR_ENCRYPTION_KEY`: if it is lost,
stored two-factor secrets can no longer be decrypted, and without a
dedicated `INTEGRATION_ENCRYPTION_KEY` (see below) neither can saved
SumUp credentials and webhook secrets — they would have to be
entered again.

Optionally, set a dedicated key `INTEGRATION_ENCRYPTION_KEY` for these
credentials (generate it with `openssl rand -base64 32`). Without it, the
server encrypts them with `TWO_FACTOR_ENCRYPTION_KEY`. Back it up like the
other secrets and do not change it after the first start.

`PIN_PEPPER` is also recommended, for the till PINs of members and
[servers](../bedienungen.md) (at least 16 characters, generate it with
`openssl rand -base64 32`). Without it, the server derives the value from
`TWO_FACTOR_ENCRYPTION_KEY` and logs a warning on start. Set it before the
first PIN is issued: changing it later invalidates all PINs.

```bash
umask 077
cat > .env <<EOF
# Deployment mode — this is the decisive switch
DEPLOYMENT_MODE=selfhosted

# Addresses at which the dashboard and server can be reached.
# On a local network enter the server's IP, otherwise the domain name.
APP_URL=http://192.168.1.50:3001
API_URL=http://192.168.1.50:3000

# Credentials
DATABASE_PASSWORD=$(openssl rand -base64 24 | tr -d '/+=')
JWT_SECRET=$(openssl rand -base64 64 | tr -d '\n')
TWO_FACTOR_ENCRYPTION_KEY=$(openssl rand -base64 32 | tr -d '\n')
# Optional: dedicated key for SumUp credentials and webhooks
INTEGRATION_ENCRYPTION_KEY=$(openssl rand -base64 32 | tr -d '\n')
# Recommended: pepper for the till PINs (set before the first PIN)
PIN_PEPPER=$(openssl rand -base64 32 | tr -d '\n')
EOF
```

Check the file and **enter your own addresses**:

```bash
cat .env
```

:::warning[The addresses must be correct]
`API_URL` is the address at which **the tills' browser** reaches the server
— not `localhost`. If it says `localhost`, the
dashboard only works on the server itself, and every till on the network stays empty.
:::

## 2. Describing the services

```bash
cat > docker-compose.yml <<'EOF'
services:
  postgres:
    image: postgres:16-alpine
    restart: unless-stopped
    environment:
      POSTGRES_USER: openeos
      POSTGRES_PASSWORD: ${DATABASE_PASSWORD:?DATABASE_PASSWORD missing}
      POSTGRES_DB: openeos
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U openeos -d openeos']
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    restart: unless-stopped
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    healthcheck:
      test: ['CMD', 'redis-cli', 'ping']
      interval: 10s
      timeout: 5s
      retries: 5

  api:
    image: ghcr.io/openeos-project/openeos-api:latest
    restart: unless-stopped
    ports:
      - '3000:3000'
    environment:
      NODE_ENV: production
      DEPLOYMENT_MODE: selfhosted
      PORT: 3000
      APP_URL: ${APP_URL}
      DATABASE_HOST: postgres
      DATABASE_USER: openeos
      DATABASE_PASSWORD: ${DATABASE_PASSWORD:?DATABASE_PASSWORD missing}
      DATABASE_NAME: openeos
      # Migrations run automatically on every start
      DATABASE_MIGRATIONS_RUN: 'true'
      REDIS_HOST: redis
      JWT_SECRET: ${JWT_SECRET:?JWT_SECRET missing}
      TWO_FACTOR_ENCRYPTION_KEY: ${TWO_FACTOR_ENCRYPTION_KEY:?TWO_FACTOR_ENCRYPTION_KEY missing}
      # Optional; empty = TWO_FACTOR_ENCRYPTION_KEY also encrypts SumUp
      INTEGRATION_ENCRYPTION_KEY: ${INTEGRATION_ENCRYPTION_KEY:-}
      # Empty = derived from TWO_FACTOR_ENCRYPTION_KEY; changing it invalidates all PINs
      PIN_PEPPER: ${PIN_PEPPER:-}
      # The dashboard must be allowed to call the server
      CORS_ORIGINS: ${APP_URL}
      EMAIL_ENABLED: 'false'
    volumes:
      - uploads:/app/uploads
    depends_on:
      postgres: { condition: service_healthy }
      redis: { condition: service_healthy }

  web:
    image: ghcr.io/openeos-project/openeos-web:latest
    restart: unless-stopped
    ports:
      - '3001:3000'
    environment:
      NODE_ENV: production
      # Read at runtime — the image does not need to be rebuilt
      API_URL: ${API_URL}
    depends_on:
      - api

volumes:
  postgres_data:
  redis_data:
  uploads:
EOF
```

## 3. Starting

```bash
sudo docker compose pull
sudo docker compose up -d
```

The first start creates the database schema. This takes a few seconds.

## 4. Checking that it is running

```bash
curl http://localhost:3000/api/health
```

Expected response:

```json
{"data":{"status":"ok","timestamp":"…","uptime":12.3,"version":"…"}}
```

Whether the database and Redis are really reachable is revealed by the more
detailed endpoint:

```bash
curl http://localhost:3000/api/health/ready
```

And the deployment mode:

```bash
curl http://localhost:3000/api/setup/status
```

```json
{"data":{"required":true,"reason":"Keine Benutzer vorhanden…",
 "deployment":{"mode":"selfhosted","billingEnabled":false,"multiTenant":false,"limits":{…}}}}
```

If it says `"mode":"saas"`, `DEPLOYMENT_MODE` was not picked up — in that case
OpenEOS will later ask for payment to unlock events. Check the `.env` and
restart with `sudo docker compose up -d --force-recreate api`.

Continue with the [initial setup](./ersteinrichtung.md).

## With your own domain and HTTPS

For operation over the internet, put a reverse proxy in front that handles
encryption. With [Traefik](https://traefik.io) it looks like this —
the ports `3000:3000` and `3001:3000` are then dropped:

```yaml
  api:
    # ports: remove
    networks: [frontend, default]
    labels:
      - 'traefik.enable=true'
      - 'traefik.http.routers.openeos-api.rule=Host(`api.verein.example`)'
      - 'traefik.http.routers.openeos-api.entrypoints=websecure'
      - 'traefik.http.routers.openeos-api.tls.certresolver=letsencrypt'
      - 'traefik.http.services.openeos-api.loadbalancer.server.port=3000'
      # Without sticky sessions the tills' WebSocket connections drop
      - 'traefik.http.services.openeos-api.loadbalancer.sticky.cookie=true'
      - 'traefik.http.services.openeos-api.loadbalancer.sticky.cookie.name=io'
      - 'traefik.http.services.openeos-api.loadbalancer.sticky.cookie.secure=true'

  web:
    # ports: remove
    networks: [frontend, default]
    labels:
      - 'traefik.enable=true'
      - 'traefik.http.routers.openeos-web.rule=Host(`kasse.verein.example`)'
      - 'traefik.http.routers.openeos-web.entrypoints=websecure'
      - 'traefik.http.routers.openeos-web.tls.certresolver=letsencrypt'
      - 'traefik.http.services.openeos-web.loadbalancer.server.port=3000'

networks:
  frontend:
    external: true
```

Then set `APP_URL` and `API_URL` in the `.env` to the `https://` addresses.

:::info[Why sticky sessions?]
Tills, displays and printers depend on a persistent WebSocket connection.
Without `sticky.cookie` the proxy distributes the requests and the connection
fails — this only becomes visible during operation, when orders no longer
arrive on the displays.
:::

## Online shop (optional)

```yaml
  shop:
    image: ghcr.io/openeos-project/openeos-shop:latest
    restart: unless-stopped
    ports:
      - '3004:3004'
    environment:
      NODE_ENV: production
      # Note: here WITH /api at the end
      API_URL: ${API_URL}/api
```

In addition, the shop address must be listed in the server's `CORS_ORIGINS`,
multiple entries separated by commas:

```bash
CORS_ORIGINS: ${APP_URL},http://192.168.1.50:3004
```

So that the shop links in the dashboard point to your shop and not to
`shop.openeos.de`, set the shop address on the `web` service:

```yaml
  web:
    environment:
      # … existing variables …
      SHOP_URL: http://192.168.1.50:3004
```

If guests pay online with SumUp in the shop, the `api` service also needs the
shop's return address and its own public address (without `/api`). Without
them, SumUp sends the guest after payment and the payment confirmation to
openeos.de instead of your server. The API address must be reachable from
the internet for this:

```yaml
  api:
    environment:
      # … existing variables …
      SHOP_RETURN_URL_BASE: https://shop.verein.example
      API_PUBLIC_URL: https://api.verein.example
      # Target of the API's QR codes (<base>/scan/<code>)
      ONLINE_ORDER_BASE_URL: https://shop.verein.example
```

Without a value of their own, all three point to the hosted openeos.de addresses (`shop.openeos.de`, `api.openeos.de`, `order.openeos.de`); they are also documented in the API's `.env.example` and `docker-compose.prod.yml`.

:::note[Only with an imprint and a privacy notice]
The shop and ordering by QR code at the table only take orders once your
organization has stored an imprint and a privacy notice
(**Settings → Organization → Legal information**). This also applies in
Single Organization mode and in test mode, see
[Shop and QR ordering](../veranstaltungen.md#shop-rechtliches).
:::
