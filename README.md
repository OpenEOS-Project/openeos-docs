# OpenEOS Handbuch / OpenEOS Manual

Anwenderdokumentation für das OpenEOS Kassensystem – als [Docusaurus](https://docusaurus.io/)-Website mit deutscher (Standard) und englischer Sprachversion.

## Inhalt

- `docs/` – deutsche Quelldokumente (Standardsprache)
- `i18n/en/docusaurus-plugin-content-docs/current/` – englische Übersetzungen
- `static/img/screens/{de,en}/` – Screenshots der App, pro Sprache
- `sidebars.ts` – Navigationsstruktur des Handbuchs
- `docusaurus.config.ts` – Site-Konfiguration (Branding, i18n)
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
> rufen Sie den Befehl direkt über die lokale Binary auf, z. B.
> `./node_modules/.bin/docusaurus start`.

## Build

```bash
# baut beide Sprachen (de + en)
./node_modules/.bin/docusaurus build
# Ergebnis lokal ansehen
./node_modules/.bin/docusaurus serve
```

Das fertige statische Ergebnis liegt anschließend in `build/`.

## Screenshots aktualisieren

Die Screenshots wurden mit Playwright gegen <https://app.openeos.de> erzeugt
(siehe Skripte in `_capture/`). Zum Neuerstellen Playwright-Chromium bzw. das
System-Chromium nutzen und die Skripte ausführen; die Ergebnisse anschließend
nach `static/img/screens/{de,en}/` kopieren.
