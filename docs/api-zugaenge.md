---
sidebar_position: 19
title: API-Zugänge
description: Skripte, Automatisierungen und KI-Agenten an OpenEOS anbinden – Token anlegen, Scopes verstehen, erste Anfrage stellen.
---

# API-Zugänge

OpenEOS hat eine REST-API. Mit einem **API-Token** greifen Skripte, Automatisierungen (zum Beispiel Zapier oder n8n) und KI-Agenten auf die Daten deiner Organisation zu: Veranstaltungen, Produkte, Tische, Schichtpläne, Berichte und mehr.

Die API ist für die **Verwaltung** gedacht, nicht für die Kasse. Kassieren, Zahlungen, Mitglieder, Abrechnung und Löschen bleiben der Anmeldung in der App vorbehalten – ein Token kommt dort nicht hin, egal welche Rechte sein Besitzer hat.

Alle Endpunkte, die ein Token erreicht, findest du in der [API-Referenz](/api) – je Endpunkt mit nötigem Scope, Parametern, Antworten und Beispielen, dazu die Verwaltung der Tokens selbst. Die Endpunkte der Apps (Kasse und Geräte-API, Anmeldung, Zahlungen, Mitglieder, Abrechnung, Admin) sind dort absichtlich nicht dokumentiert: Sie sind keine stabile Schnittstelle für Integrationen. Die Referenz ist nur zum Lesen – du kannst dort keine Anfragen auslösen – und in beiden Sprachen der Doku auf Deutsch.

Soll sich OpenEOS bei dir melden, sobald etwas passiert – etwa wenn eine Bestellung bezahlt ist –, statt dass dein Skript regelmäßig nachfragt, nimm [Webhooks](./integrationen/webhooks.md).

## Zugang anlegen {/* #token-anlegen */}

1. Als **Administrator** der Organisation anmelden.
2. **Einstellungen → Organisation → Zugänge** öffnen.
3. Auf **Zugang anlegen** klicken und unter **Name** eine Bezeichnung vergeben (zum Beispiel „Zapier Schichtplan“).
4. Unter **Berechtigungen** die [Scopes](#scopes) ankreuzen, die das Skript braucht. **Lesen** (`read`) ist vorausgewählt. Weniger ist besser.
5. Unter **Ablauf** optional ein Ablaufdatum wählen: **nie**, **30 Tage**, **90 Tage**, **365 Tage** oder ein eigenes Datum. Ohne Datum läuft der Zugang nicht ab.
6. Auf **Zugang anlegen** klicken. Im Fenster **Zugang angelegt** den Token (`oeos_…`) **sofort** mit **Kopieren** übernehmen und sicher ablegen, etwa in einem Passwort-Manager. Er wird genau einmal angezeigt; OpenEOS speichert nur einen Hash. Mit **Fertig** schließt du das Fenster.

![Zugang anlegen: Name und Berechtigungen](/img/screens/de/settings-access-dialog.png)

Ein Token wirkt wie die Person, die ihn angelegt hat: Er ist auf **eine Organisation** beschränkt, auf die gewählten Scopes und zusätzlich auf die [Modul-Berechtigungen](./mitglieder.md) seines Besitzers. Verlässt der Besitzer die Organisation, funktioniert der Token nicht mehr.

Je Organisation sind höchstens **20 aktive Tokens** möglich; über der Liste steht der Stand, etwa „3 von 20 aktiven Zugängen“. Die Liste zeigt je Zugang **Name**, den Anfang des **Schlüssels**, die **Berechtigungen**, wann er **Angelegt** und **Zuletzt genutzt** wurde, wann er **Läuft ab** und den **Status** (aktiv, abgelaufen oder widerrufen). Einen Token, den du nicht mehr brauchst oder der in falsche Hände geraten ist, widerrufst du dort mit **Widerrufen** – das wirkt sofort und lässt sich nicht zurücknehmen.

## Scopes

Jeder Endpunkt in der [API-Referenz](/api) nennt den Scope, den er verlangt (`x-api-token-scope`). In der App heißen die Scopes **Berechtigungen** und tragen einen deutschen Namen; der Scope steht daneben. Schreib-Scopes schließen `read` **nicht** ein – wer lesen und schreiben will, wählt beides.

![Liste der Zugänge](/img/screens/de/settings-access.png)

| Scope | In der App | Erlaubt | Nötige Modul-Berechtigung des Besitzers |
|---|---|---|---|
| `read` | **Lesen** | Organisation, Veranstaltungen, Kategorien, Produkte, Pfandarten, Tische, Stationen, Bon-Vorlagen, Drucker, Schichtpläne, Geräte, Berichte und Bestellungen lesen (auch als CSV-Export) | Mitgliedschaft; für Berichte `Auswertung`, für den Bestellexport `Bestellungen` |
| `catalog:write` | **Katalog bearbeiten** | Kategorien, Produkte und Pfandarten anlegen und ändern | `Produkte`, `Pfand` |
| `events:write` | **Veranstaltungen bearbeiten** | Veranstaltungen anlegen und ändern, Produkte zwischen Veranstaltungen kopieren, Produktionsstationen bearbeiten (keine Freischaltung) | `Veranstaltungen` |
| `tables:write` | **Tische bearbeiten** | Bereiche, Tische und Tischplan bearbeiten | `Veranstaltungen` |
| `staff:write` | **Schichtpläne bearbeiten** | Schichtpläne, Jobs, Schichten und Helfer-Anmeldungen bearbeiten (annehmen, ablehnen, Notizen, anlegen) | `Schichtpläne` |
| `devices:write` | **Bon-Vorlagen bearbeiten** | Bon-Vorlagen anlegen und ändern | `Geräte` |
| `settings:write` | **Einstellungen ändern** | Organisationseinstellungen ändern | Administrator |
| `webhooks:read` | **Webhooks lesen** | [Webhooks](./integrationen/webhooks.md), ihre Einstellungen und das Zustellprotokoll lesen | Administrator |
| `webhooks:write` | **Webhooks verwalten** | Webhooks anlegen und ändern, Secret erneuern, Test senden, Zustellungen erneut senden – Löschen nur in der App | Administrator |

Nie per Token erreichbar: Kasse und Bestellungen anlegen, Zahlungen und Erstattungen, Mitglieder und Einladungen, Abrechnung und Freischaltung, Löschen, die Geräte-API, der Speisekarten-Import und alle Admin-Funktionen.

## Erste Anfrage

Basis-URL der gehosteten API: `https://api.openeos.de/api`. Wer OpenEOS [selbst betreibt](./selbst-betreiben/intro.md), nimmt die eigene Adresse mit `/api` am Ende.

Der Token kommt in den Header `Authorization` – genauso wie das Sitzungs-Token der Web-App:

```bash
curl https://api.openeos.de/api/organizations/ORGANISATIONS-ID/events \
  -H "Authorization: Bearer oeos_…"
```

Welche Organisation gemeint ist, steht immer im Pfad; ein Token erreicht nur seine eigene. Die ID deiner Organisation zeigt die App nicht direkt an. Du findest sie im Feld `organizationId` jeder [Webhook-Zustellung](./integrationen/webhooks.md#aufbau), zum Beispiel nach **Test senden** im Zustellprotokoll unter **Inhalt (JSON)**. Ein verbundener [KI-Agent](./ki-agenten.md) nennt sie dir über `get_organization`.

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
- [KI-Agenten verbinden](./ki-agenten.md) – Claude, Cursor und andere Agenten per MCP mit demselben Token anbinden
- [Webhooks](./integrationen/webhooks.md) – OpenEOS meldet Bestellungen, Zahlungen und mehr sofort an deine Adresse
- [Mitglieder und Berechtigungen](./mitglieder.md) – welche Modul-Berechtigungen ein Token-Besitzer braucht
