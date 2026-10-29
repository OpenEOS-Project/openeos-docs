# OpenEOS Handbuch / OpenEOS Manual

Anwenderdokumentation für das OpenEOS Kassensystem – als [Docusaurus](https://docusaurus.io/)-Website mit deutscher (Standard) und englischer Sprachversion.

## Inhalt

- `docs/` – deutsche Quelldokumente (Standardsprache)
- `i18n/en/docusaurus-plugin-content-docs/current/` – englische Übersetzungen
- `static/img/screens/{de,en}/` – Screenshots der App, pro Sprache
- `sidebars.ts` – Navigationsstruktur des Handbuchs
- `docusaurus.config.ts` – Site-Konfiguration (Branding, i18n)
- `static/openapi/openeos-api.json` – OpenAPI-Beschreibung der API, Quelle der Seite `/api`
- `scripts/openapi-sync.mjs` – holt diese Datei aus openeos-api (`pnpm openapi:sync`)
- `_capture/` – Playwright-Skripte, mit denen die Screenshots erzeugt wurden (nicht Teil der Website)

## Entwicklung

```bash
pnpm install

# lokaler Dev-Server (Deutsch)
pnpm start
# englische Version lokal testen
pnpm start -- --locale en
```

> Hinweis: Falls `pnpm run <cmd>` an einem pnpm-Dependency-Check scheitert,
> ruf den Befehl direkt über die lokale Binary auf, z. B.
> `./node_modules/.bin/docusaurus start`.

## Build

```bash
# baut beide Sprachen (de + en)
./node_modules/.bin/docusaurus build
# Ergebnis lokal ansehen
./node_modules/.bin/docusaurus serve
```

Das fertige statische Ergebnis liegt anschließend in `build/`.

## API-Referenz

Die Seite `/api` (englisch `/en/api`) zeigt die REST-API der openeos-api,
gerendert mit [Redoc](https://github.com/Redocly/redoc) über
[Redocusaurus](https://redocusaurus.vercel.app/). Sie ist **nur zum Lesen**:
kein „Try it out", kein Aufruf eines Servers. Quelle ist die eingecheckte
Datei `static/openapi/openeos-api.json`; die Seite dazu liegt in
`src/pages/api.tsx`, die Einführung für Anwender in `docs/api-zugaenge.md`.

Die Referenz folgt dem Branch **`main`** von
[openeos-api](https://github.com/OpenEOS-Project/openeos-api) (Produktion).
Aktualisieren:

```bash
pnpm openapi:sync   # holt docs/openapi.json aus openeos-api main
# anderer Stand, z. B. dev:
OPENAPI_SPEC_URL=https://raw.githubusercontent.com/OpenEOS-Project/openeos-api/dev/docs/openapi.json pnpm openapi:sync
```

Der Workflow `.github/workflows/openapi-sync.yml` macht dasselbe wöchentlich
(und auf Knopfdruck) und öffnet bei Änderungen einen Pull Request gegen `dev`.
Dafür muss in den Repo-Einstellungen unter *Actions → General* „Allow GitHub
Actions to create and approve pull requests" aktiv sein.

## Screenshots aktualisieren

Die Screenshots wurden mit Playwright gegen <https://app.openeos.de> erzeugt
(siehe Skripte in `_capture/`). Zum Neuerstellen Playwright-Chromium bzw. das
System-Chromium nutzen und die Skripte ausführen; die Ergebnisse anschließend
nach `static/img/screens/{de,en}/` kopieren.

## Automatisches Deployment

Nach jedem erfolgreichen Image-Build auf `main` aktualisiert ein Deploy-Job den
Produktivserver per SSH (`docker compose pull && up -d`). Der Job ist inaktiv,
bis die Repo-/Org-Variable `DEPLOY_ENABLED` auf `true` steht.

| Variable / Secret | Beschreibung |
|---|---|
| `DEPLOY_ENABLED` (Variable) | `true` schaltet das Deployment scharf |
| `DEPLOY_PATH` (Variable) | Optional — Compose-Verzeichnis auf dem Server (Default: `/srv/docker/<repo-name>`) |
| `DEPLOY_SERVICE` (Variable) | Optional — einzelner Compose-Service; leer = ganze Compose-Datei |
| `DEPLOY_HOST` (Secret) | Hostname/IP des Produktivservers |
| `DEPLOY_USER` (Secret) | SSH-Benutzer (z. B. `openeos-deploy`) |
| `DEPLOY_SSH_KEY` (Secret) | Privater SSH-Key des Deploy-Benutzers |
| `DEPLOY_PORT` (Secret) | Optional — SSH-Port, Default 22 |

## Lizenz

Copyright (C) 2026 LUXCODE by Lukas Lukic-Spitznagel und Mitwirkende.

Code und Inhalte (Texte, Screenshots) sind lizenziert unter der GNU Affero General Public License v3.0 oder (nach deiner Wahl) jeder späteren Version (`AGPL-3.0-or-later`), siehe [LICENSE](LICENSE) und [NOTICE](NOTICE).

**Quellcode-Link (AGPL § 13):** Der Footer verlinkt den Quellcode. Ziel ist die Umgebungsvariable `SOURCE_URL` beim Build (Docker: `--build-arg SOURCE_URL=…`), Standard `https://github.com/OpenEOS-Project`.
