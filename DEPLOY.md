# Deployment – docs.openeos.de

The docs are shipped as a Docker image (static Docusaurus build served by nginx),
published to the GitHub Container Registry (GHCR) by CI and run on your server
behind Traefik with automatic Let's Encrypt TLS.

Repo: `https://github.com/OpenEOS-Project/openeos-docs`
Image: `ghcr.io/openeos-project/openeos-docs`

## Overview

```
push to main  ──►  GitHub Actions  ──►  ghcr.io/openeos-project/openeos-docs:latest
                                                   │
                                          docker compose pull/up
                                                   │
server: container :80  ──►  Traefik (frontend net, LE TLS)  ──►  https://docs.openeos.de
```

## 1. CI / GHCR (already wired up)

The workflow `.github/workflows/deploy.yml` runs on every push to `main` and on
`v*` tags and publishes:

- `ghcr.io/openeos-project/openeos-docs:latest`
- `ghcr.io/openeos-project/openeos-docs:sha-<short>`
- version tags on `v*`

It uses the built-in `GITHUB_TOKEN` – no secret to configure. After the first
run, open the package under the repo's **Packages** and set visibility to
**public** so the server can pull without credentials (otherwise log in on the
server with a PAT that has `read:packages`).

## 2. Run it on the server (Traefik + Let's Encrypt)

Prerequisites:

- Traefik already running and attached to an **external** Docker network named
  `frontend`.
- A Traefik **`websecure`** (443) entrypoint and an ACME/Let's Encrypt
  **certresolver named `letsencrypt`** (adjust the label in `docker-compose.yml`
  if your resolver has a different name).
- DNS `docs.openeos.de` → server IP.

```bash
# copy docker-compose.yml (clone the repo or just the file) onto the server, then:

# (only if the GHCR package is PRIVATE) authenticate once:
echo "<GHCR_PAT>" | docker login ghcr.io -u <github-user> --password-stdin

docker compose pull
docker compose up -d
```

Traefik picks up the container via its labels, requests/renews the certificate
and serves **https://docs.openeos.de**. No host port is published – traffic flows
through the `frontend` network only.

### Updating

```bash
docker compose pull && docker compose up -d
docker image prune -f
```

## 3. Build / test the image locally

```bash
docker build -t openeos-docs:local .
docker run --rm -p 8080:80 openeos-docs:local
# open http://localhost:8080  (German)  and  http://localhost:8080/en/  (English)
```

## Notes

- The site is fully static; both locales are built into the image
  (`/` = German, `/en/` = English).
- `docusaurus.config.ts` already sets `url: https://docs.openeos.de`, `baseUrl: /`.
- nginx caches fingerprinted `/assets/` aggressively and revalidates HTML, so
  content updates appear immediately after a redeploy.
- Not using Traefik? Swap the `labels:`/`networks:` block in `docker-compose.yml`
  for a `ports: ["8080:80"]` mapping and put any reverse proxy (Caddy/nginx) in
  front of port 8080.
