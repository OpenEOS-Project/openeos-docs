---
sidebar_position: 19
title: API-Zugänge
description: Skripte, Automatisierungen und KI-Agenten an OpenEOS anbinden – Token anlegen, Scopes verstehen, erste Anfrage stellen.
---

# API-Zugänge

OpenEOS hat eine REST-API. Mit einem **API-Token** greifen Skripte, Automatisierungen (zum Beispiel Zapier oder n8n) und KI-Agenten auf die Daten deiner Organisation zu: Veranstaltungen, Produkte, Tische, Schichtpläne, Berichte und mehr.

Die API ist für die **Verwaltung** gedacht, nicht für die Kasse. Kassieren, Zahlungen, Mitglieder, Abrechnung und Löschen bleiben der Anmeldung in der App vorbehalten – ein Token kommt dort nicht hin, egal welche Rechte sein Besitzer hat.

Alle Endpunkte, die ein Token erreicht, findest du in der [API-Referenz](/api) – je Endpunkt mit nötigem Scope, Parametern, Antworten und Beispielen, dazu die Verwaltung der Tokens selbst. Die Endpunkte der Apps (Kasse und Geräte-API, Anmeldung, Zahlungen, Mitglieder, Abrechnung, Admin) sind dort absichtlich nicht dokumentiert: Sie sind keine stabile Schnittstelle für Integrationen. Die Referenz ist nur zum Lesen – du kannst dort keine Anfragen auslösen – und in beiden Sprachen der Doku auf Deutsch.

## Token anlegen

1. Als **Administrator** der Organisation anmelden.
2. **Einstellungen → Organisation → Zugänge** öffnen.
3. Auf **Token anlegen** klicken, einen Namen vergeben (zum Beispiel „Zapier Schichtplan“) und die Scopes auswählen, die das Skript braucht. Weniger ist besser. Optional ein Ablaufdatum setzen.
4. Den Token (`oeos_…`) **sofort kopieren** und sicher ablegen. Er wird genau einmal angezeigt; OpenEOS speichert nur einen Hash.

Ein Token wirkt wie die Person, die ihn angelegt hat: Er ist auf **eine Organisation** beschränkt, auf die gewählten Scopes und zusätzlich auf die [Modul-Berechtigungen](./mitglieder.md) seines Besitzers. Verlässt der Besitzer die Organisation, funktioniert der Token nicht mehr.

Je Organisation sind höchstens **20 aktive Tokens** möglich. Einen Token, den du nicht mehr brauchst oder der in falsche Hände geraten ist, widerrufst du auf derselben Seite – das wirkt sofort.

## Scopes

Jeder Endpunkt in der [API-Referenz](/api) nennt den Scope, den er verlangt (`x-api-token-scope`). Schreib-Scopes schließen `read` **nicht** ein – wer lesen und schreiben will, wählt beides.

| Scope | Erlaubt | Nötige Modul-Berechtigung des Besitzers |
|---|---|---|
| `read` | Organisation, Veranstaltungen, Kategorien, Produkte, Pfandarten, Tische, Stationen, Bon-Vorlagen, Drucker, Schichtpläne, Geräte, Berichte und Bestellungen lesen | Mitgliedschaft; für Berichte `Auswertung` |
| `catalog:write` | Kategorien, Produkte und Pfandarten anlegen und ändern | `Produkte`, `Pfand` |
| `events:write` | Veranstaltungen anlegen und ändern, Produkte zwischen Veranstaltungen kopieren, Produktionsstationen bearbeiten (keine Freischaltung) | `Veranstaltungen` |
| `tables:write` | Bereiche, Tische und Tischplan bearbeiten | `Veranstaltungen` |
| `staff:write` | Schichtpläne, Jobs, Schichten und Helfer-Anmeldungen bearbeiten (annehmen, ablehnen, Notizen, anlegen) | `Schichtpläne` |
| `devices:write` | Bon-Vorlagen anlegen und ändern | `Geräte` |
| `settings:write` | Organisationseinstellungen ändern | Administrator |

Nie per Token erreichbar: Kasse und Bestellungen anlegen, Zahlungen und Erstattungen, Mitglieder und Einladungen, Abrechnung und Freischaltung, Löschen, die Geräte-API, der Speisekarten-Import und alle Admin-Funktionen.

## Erste Anfrage

Basis-URL der gehosteten API: `https://api.openeos.de/api`. Wer OpenEOS [selbst betreibt](./selbst-betreiben/intro.md), nimmt die eigene Adresse mit `/api` am Ende.

Der Token kommt in den Header `Authorization` – genauso wie das Sitzungs-Token der Web-App:

```bash
curl https://api.openeos.de/api/organizations/ORGANISATIONS-ID/events \
  -H "Authorization: Bearer oeos_…"
```

Die ID deiner Organisation steht in der Adresszeile der App, sobald du in den Einstellungen bist. Welche Organisation gemeint ist, steht immer im Pfad; ein Token erreicht nur seine eigene.

## Grenzen

Je Token gelten:

- **120 Aufrufe je Minute**
- **5 000 Aufrufe je Tag**

Die Antwort nennt den Stand in den Headern `X-RateLimit-Limit-api-token-minute`, `X-RateLimit-Remaining-api-token-minute` und `X-RateLimit-Reset-api-token-minute` (ebenso `…-api-token-day`). Ist die Grenze erreicht, antwortet die API mit `429` und `Retry-After`. Zusätzlich gilt die allgemeine Grenze je IP-Adresse.

## Fehler

Jede Fehlerantwort hat dieselbe Form:

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

`code` ist die allgemeine Klasse (`FORBIDDEN`, `NOT_FOUND`, …), `reason` der konkrete Fall. Die wichtigsten für Tokens:

| Status | `reason` | Bedeutung |
|---|---|---|
| `401` | `API_TOKEN_INVALID` | Token unbekannt, widerrufen, abgelaufen, oder der Besitzer ist nicht mehr Mitglied |
| `403` | `API_TOKEN_NOT_ALLOWED` | Dieser Endpunkt ist für Tokens nicht freigegeben |
| `403` | `API_TOKEN_SCOPE_MISSING` | Dem Token fehlt der nötige Scope (`params.scope`) |
| `403` | `API_TOKEN_WRONG_ORGANIZATION` | Die Anfrage betrifft eine andere Organisation als die des Tokens |
| `429` | `API_TOKEN_RATE_LIMITED` | Grenze erreicht, siehe `Retry-After` |

## Weiterlesen

- [API-Referenz](/api) – alle Endpunkte für API-Tokens mit Parametern, Antworten und Scopes, erzeugt aus der OpenAPI-Beschreibung der API
- [Mitglieder und Berechtigungen](./mitglieder.md) – welche Modul-Berechtigungen ein Token-Besitzer braucht
