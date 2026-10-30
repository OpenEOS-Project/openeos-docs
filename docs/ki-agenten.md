---
sidebar_position: 20
title: KI-Agenten verbinden
description: Claude, ChatGPT, Cursor und andere Agenten per MCP an OpenEOS anbinden – Zugang anlegen, Client einrichten, was der Agent darf und was nicht.
---

# KI-Agenten verbinden

OpenEOS ist ein [MCP](https://modelcontextprotocol.io)-Server. Damit kann ein Agent, den du ohnehin benutzt – Claude, ChatGPT, Cursor oder ein eigener –, die Daten deiner Organisation lesen und Verwaltungsaufgaben für dich erledigen. Du beschreibst, was du willst; der Agent ruft die passenden Werkzeuge auf.

Das hier ist etwas anderes als der [Assistent](./assistent.md) in der App: Der Assistent ist eingebaut und hilft bei Speisekarte und Icons. Ein verbundener Agent läuft bei dir, mit dem Anbieter deiner Wahl, und bedient OpenEOS von außen über einen [API-Zugang](./api-zugaenge.md).

## Was geht

Ein Agent kann:

- **lesen:** Organisation, Veranstaltungen, Kategorien, Produkte, Pfandarten, Tische und Bereiche, Produktionsstationen, Schichtpläne, Geräte, Drucker, Bon-Vorlagen, Berichte und Bestellungen
- **verwalten:** Veranstaltungen anlegen und ändern, Produkte zwischen Veranstaltungen kopieren, Kategorien und Produkte anlegen und ändern, Tische und Bereiche anlegen, Stationen einrichten, Schichtpläne mit Arbeiten und Schichten aufbauen und veröffentlichen, Bon-Vorlagen pflegen, Organisationseinstellungen ändern

Ein Agent kann **nie**: kassieren, Bestellungen anlegen, Zahlungen oder Erstattungen auslösen, Mitglieder verwalten, Veranstaltungen freischalten oder bezahlen, irgendetwas löschen. Das bleibt der Anmeldung in der App vorbehalten – unabhängig davon, welche Rechte der Zugang hat.

Zwei Regeln gelten für alles, was schreibt:

1. **Erst Vorschau, dann Bestätigung.** Jedes schreibende Werkzeug liefert zunächst eine Vorschau („Würde 24 Produkte anlegen, 3 ändern …“). Geändert wird erst, wenn der Agent den Aufruf mit `confirm: true` wiederholt – und das soll er nur tun, wenn du es gesagt hast.
2. **Alles wird protokolliert.** Jede ausgeführte Änderung landet im Protokoll mit dem Vermerk, dass sie über einen Agenten kam, dem Namen des Zugangs und dem Werkzeug.

## Vorbereitung: Zugang anlegen

Der Agent meldet sich mit einem API-Token deiner Organisation an. Du legst ihn als **Admin** unter **Einstellungen → Organisation → Zugänge** an – Schritt für Schritt unter [API-Zugänge](./api-zugaenge.md#token-anlegen).

Gib dem Zugang einen Namen, an dem du ihn wiedererkennst (zum Beispiel „Claude Desktop“), und wähle nur die Berechtigungen, die der Agent braucht. Der Agent sieht genau die Werkzeuge, die der Zugang erlaubt:

| Berechtigung | Was der Agent damit kann |
|---|---|
| **read** | Alles lesen: Organisation, Veranstaltungen, Stationen, Kategorien, Produkte, Pfandarten, Tische, Schichtpläne (nur Zähler, keine Helfernamen), Geräte, Drucker, Bon-Vorlagen, Umsatzberichte, Bestellungen (ohne Gästedaten), Icon-Vorschläge. <br />Werkzeuge: `get_organization`, `list_events`, `get_event`, `list_production_stations`, `list_categories`, `list_products`, `list_pfand_types`, `list_table_areas`, `list_shift_plans`, `get_shift_plan`, `list_devices`, `list_printers`, `list_print_templates`, `get_sales_report`, `list_orders`, `get_order`, `suggest_icons` |
| **catalog:write** | Kategorien und Produkte anlegen und ändern, Produkte als ausverkauft markieren, Pfandarten anlegen. <br />Werkzeuge: `create_category`, `update_category`, `upsert_products`, `update_product_availability`, `create_pfand_type` |
| **events:write** | Veranstaltungen anlegen und ändern, Produkte aus einer anderen Veranstaltung kopieren, Produktionsstationen anlegen und ändern. <br />Werkzeuge: `create_event`, `update_event`, `copy_event`, `create_production_station`, `update_production_station` |
| **tables:write** | Bereiche anlegen, Tischserien anlegen, Tische umbenennen oder verschieben. <br />Werkzeuge: `create_table_area`, `create_tables`, `update_table` |
| **staff:write** | Schichtpläne anlegen, Arbeiten und Schichten hinzufügen, Schichtplan veröffentlichen. <br />Werkzeuge: `create_shift_plan`, `create_shift_job`, `create_shifts`, `publish_shift_plan` |
| **devices:write** | Bon-Vorlagen anlegen und ändern (nur Admins). <br />Werkzeuge: `create_print_template`, `update_print_template` |
| **settings:write** | Name, Logo und Betriebseinstellungen der Organisation ändern (nur Admins; keine Zahlungsanbieter, keine Rechtstexte, keine Abrechnung). <br />Werkzeug: `update_organization` |

Für fast alles brauchst du `read` – Schreib-Berechtigungen schließen Lesen nicht ein. Ein guter Start ist `read` plus `catalog:write` und `events:write`. Zusätzlich gelten immer die [Modul-Berechtigungen](./mitglieder.md) der Person, die den Zugang angelegt hat.

Kopiere den Token (`oeos_…`) sofort – er wird nur einmal angezeigt.

## Verbinden

Der Server ist unter `https://api.openeos.de/mcp` erreichbar (Streamable HTTP). Der Token kommt in den Header `Authorization: Bearer oeos_…`. Ersetze in den Beispielen `oeos_…` durch deinen Token.

:::note[Selbst betrieben]
Wer OpenEOS [selbst betreibt](./selbst-betreiben/intro.md), nimmt die eigene API-Adresse mit `/mcp` am Ende – ohne `/api` davor, also zum Beispiel `https://api.verein.example/mcp`.
:::

### Claude Code

Ein Befehl im Terminal reicht:

```bash
claude mcp add --transport http openeos https://api.openeos.de/mcp \
  --header "Authorization: Bearer oeos_…"
```

Oder du legst die Verbindung für ein Projekt in dessen `.mcp.json` ab:

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

Mit `/mcp` in Claude Code siehst du, ob die Verbindung steht und welche Werkzeuge der Agent sieht.

### Claude Desktop

Claude Desktop verbindet entfernte Server bisher nur über OAuth – und das bietet OpenEOS noch nicht an (es ist geplant). Bis dahin geht der Weg über **`mcp-remote`**, ein kleines Programm, das auf deinem Rechner läuft, die Verbindung zu OpenEOS herstellt und den Token als Header mitschickt. Du brauchst dafür [Node.js](https://nodejs.org); `npx` lädt `mcp-remote` beim ersten Start selbst.

Öffne in Claude Desktop **Einstellungen → Entwickler → Konfiguration bearbeiten** und ergänze in `claude_desktop_config.json`:

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

Der Umweg über die Variable `OPENEOS_AUTH` ist Absicht: Mit dem Leerzeichen in „Bearer oeos_…“ direkt in `args` kommt `mcp-remote` auf manchen Systemen nicht zurecht. Nach dem Speichern Claude Desktop neu starten – OpenEOS erscheint dann unter den Werkzeugen.

### Cursor

Lege im Projekt die Datei `.cursor/mcp.json` an (oder global `~/.cursor/mcp.json`):

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

Unter **Settings → MCP** zeigt Cursor den Server und seine Werkzeuge.

### Andere Clients

Jeder Client, der **Streamable HTTP** mit eigenen Headern kann, funktioniert – das gilt auch für ChatGPT-Entwicklerwerkzeuge, Agent-Frameworks und selbst geschriebene Programme. Einzustellen ist:

- **URL:** `https://api.openeos.de/mcp`
- **Header:** `Authorization: Bearer oeos_…`

Der Server ist zustandslos: keine Sitzungs-ID, keine Anmeldeschritte, jede Anfrage steht für sich. So prüfst du mit `curl`, ob Token und Verbindung stimmen:

```bash
curl -s https://api.openeos.de/mcp \
  -H "Authorization: Bearer oeos_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

Die Antwort listet die Werkzeuge, die dieser Zugang sieht. Neben den Werkzeugen liefert der Server Auszüge aus dieser Dokumentation (Produkte, Veranstaltungen, Tische, Drucker, Schichten) als Ressourcen und zwei vorbereitete Abläufe (`setup_event`, `daily_summary`) als Prompts – ob dein Client sie anzeigt, hängt vom Client ab.

## Beispiele

So kannst du einen verbundenen Agenten ansprechen:

- „Leg für das Sommerfest 2027 die Produkte vom Dorffest 2026 an.“
- „Wie viel Umsatz hatten wir am Samstag, nach Stunde?“
- „Erstelle 20 Tische T1 bis T20 im Bereich Zelt, je 8 Plätze.“
- „Lege einen Schichtplan für das Sommerfest an mit Theke, Grill und Kasse – Freitag und Samstag 17 bis 24 Uhr in Zwei-Stunden-Schichten, je zwei Helfer.“
- „Veröffentliche den Schichtplan.“
- „Welche Produkte haben noch keinen Steuersatz? Setz sie auf 19 %.“

Der Agent sucht sich die passenden Werkzeuge selbst: Für das erste Beispiel listet er die Veranstaltungen, findet die IDs von „Dorffest 2026“ und „Sommerfest 2027“ und ruft `copy_event` auf. Für das zweite nimmt er `get_sales_report` mit dem Abschnitt `hourly`.

Bei allem, was schreibt, siehst du zuerst die Vorschau. Für die Tische sieht das etwa so aus:

> **Agent:** Ich würde im Bereich „Zelt“ 20 Tische anlegen: T1, T2, … T20, je 8 Plätze. Keine der Bezeichnungen ist bisher vergeben. Soll ich das anlegen?
>
> **Du:** Ja.
>
> **Agent:** Erledigt – 20 Tische in „Zelt“ angelegt. Die Position auf dem Tischplan ist noch offen; die ziehst du in der App zurecht.

Hinter der Vorschau steckt die Antwort des Werkzeugs, zum Beispiel bei Produkten:

```json
{
  "preview": true,
  "summary": "Würde 2 Produkte anlegen, 1 ändern (0 unverändert, 0 Fehler, 1 neue Kategorien) in „Sommerfest 2027“",
  "wouldCreate": [{ "name": "Radler", "category": "Getränke", "price": 4.5 }],
  "wouldUpdate": [{ "name": "Bier", "changes": { "price": { "from": 4.5, "to": 4.8 } } }],
  "newCategories": ["Essen"],
  "errors": []
}
```

Enthält die Vorschau Fehler (etwa eine Zeile ohne Preis oder einen schon vergebenen Tischnamen), wird gar nichts geschrieben – auch nicht die fehlerfreien Zeilen. Erst wenn der Agent nach deinem „Ja“ denselben Aufruf mit `confirm: true` wiederholt, ändert sich etwas, und die Antwort beginnt mit `"ok": true`.

:::info[Vorschläge können Fehler enthalten]
Der Agent interpretiert, was du sagst – Preise, Steuersätze oder Zuordnungen können danebenliegen. Lies die Vorschau, bevor du bestätigst. Für größere Umbauten lohnt sich ein Blick in die App, bevor das Fest beginnt.
:::

## Grenzen und Sicherheit

- **Berechtigungen.** Ein Zugang darf nur, was seine Berechtigungen erlauben – und nie mehr als die Person, die ihn angelegt hat. Werkzeuge außerhalb der Berechtigungen sieht der Agent gar nicht. Ein Zugang gehört zu genau einer Organisation.
- **Grenzen je Zugang.** 120 Aufrufe je Minute und 5 000 je Tag, gemeinsam mit allem, was derselbe Token sonst noch über die [REST-API](./api-zugaenge.md#grenzen) macht. Agenten rufen gern viele Werkzeuge nacheinander auf; wird die Grenze erreicht, antwortet der Server mit `429`, und der Agent soll kurz warten.
- **Widerrufen.** Unter **Einstellungen → Organisation → Zugänge** widerrufst du einen Zugang mit einem Klick – das wirkt sofort, auch für laufende Verbindungen. Verlässt die Person, die ihn angelegt hat, die Organisation, funktioniert der Zugang ebenfalls nicht mehr.
- **Protokoll.** Jede ausgeführte Änderung wird mit Werkzeug, Namen des Zugangs, Zeit und einem Fingerabdruck der Eingabe festgehalten – erkennbar am Vermerk „über Agent“. Vorschauen hinterlassen keinen Eintrag.
- **Keine Gästedaten.** Bestellungen kommen ohne Namen, Telefonnummern, Notizen und Kassierer beim Agenten an; Schichtpläne nur mit Zählern je Status, ohne Helfernamen oder Kontaktdaten; Geräte ohne Token und Kopplungscode; die Organisation ohne Zahlungsanbieter, Support-PIN und Abrechnung.

:::note[Deine Daten gehen zum Anbieter des Agenten]
Alles, was der Agent über OpenEOS liest – Produktnamen, Preise, Umsätze, Tischpläne, die Adresse deiner Organisation –, verarbeitet der Anbieter des Agenten (zum Beispiel Anthropic, OpenAI oder Cursor) nach dessen Bedingungen. Das ist unabhängig vom [Assistenten](./assistent.md#datenschutz) in der App. Welche Daten du einem Agenten gibst, entscheidest du mit den Berechtigungen des Zugangs – und mit dem Anbieter, den du wählst.
:::

## Wenn etwas nicht klappt

- **`401` · `NOT_AUTHENTICATED`** – Es kam kein Token an. Header prüfen: `Authorization: Bearer oeos_…` (mit Leerzeichen nach `Bearer`). Bei Claude Desktop: Ist die Variable `OPENEOS_AUTH` gesetzt?
- **`401` · `API_TOKEN_INVALID`** – Token unbekannt, widerrufen, abgelaufen – oder die Person, die ihn angelegt hat, ist nicht mehr Mitglied. Auch ein Sitzungs-Token aus dem Browser wird abgelehnt. Neuen Zugang unter **Einstellungen → Organisation → Zugänge** anlegen und den Token vollständig kopieren.
- **`403` · `API_TOKEN_WRONG_ORGANIZATION`** – Der Token gehört zu keiner Organisation (Plattform-Token eines Super-Admins). Einen Zugang innerhalb der Organisation anlegen.
- **Ein Werkzeug fehlt in der Liste** – Dem Zugang fehlt die passende Berechtigung; der Server blendet solche Werkzeuge aus. Neuen Zugang mit den nötigen Berechtigungen anlegen (die Berechtigungen eines bestehenden Zugangs lassen sich nicht ändern) und beim Client den Token austauschen.
- **`SCOPE_MISSING` als Antwort eines Werkzeugs** – Der Agent hat ein Werkzeug aufgerufen, das der Zugang nicht erlaubt. Wie oben.
- **`INSUFFICIENT_PERMISSIONS`** – Der Zugang hätte die Berechtigung, aber die Person, die ihn angelegt hat, darf das Modul nicht bearbeiten (zum Beispiel keine Berichte). [Modul-Berechtigung](./mitglieder.md) der Person anpassen oder den Zugang von einem Admin anlegen lassen.
- **`429` · `API_TOKEN_RATE_LIMITED`** – Grenze erreicht (120/min oder 5 000/Tag). Warten; `Retry-After` nennt die Sekunden.
- **`NOT_FOUND` für eine Veranstaltung** – Die ID gehört zu einer anderen Organisation oder gibt es nicht. Der Agent soll die Veranstaltungen erst mit `list_events` auflisten.
- **`suggest_icons` antwortet „nicht eingerichtet“** – Der [Assistent](./assistent.md#einschalten) ist für die Organisation ausgeschaltet. Als Admin einschalten – oder das Werkzeug einfach nicht nutzen.
- **Claude Desktop zeigt OpenEOS nicht** – `mcp-remote` konnte nicht starten; meist fehlt Node.js, oder die Konfigurationsdatei hat einen Tippfehler. Node.js installieren, JSON prüfen, Claude Desktop neu starten. Die Logs findest du unter **Einstellungen → Entwickler**.

## Weiterlesen

- [API-Zugänge](./api-zugaenge.md) – Zugang anlegen, Berechtigungen im Detail, Fehlerformat
- [Assistent](./assistent.md) – die eingebauten Hilfen für Speisekarte und Icons
- [API-Referenz](/api) – alle REST-Endpunkte; der MCP-Server nutzt dieselben Dienste
