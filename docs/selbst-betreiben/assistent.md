---
sidebar_position: 7
title: Assistent einrichten
description: Speisekarten-Import und Icon-Vorschläge auf dem eigenen Server – Anbieter, Schlüssel, Modelle, Kontingente und Dateien.
---

# Assistent einrichten

Der [Assistent](../assistent.md) (Speisekarte importieren, Icon-Vorschläge)
ist im Einzelbetrieb **optional** und standardmäßig aus. Er braucht einen
externen Anbieter, der die Speisekarten auswertet — dafür hinterlegst du beim
Server einen eigenen Schlüssel. Ohne Anbieter zeigt die Oberfläche unter
**Einstellungen → Organisation → Assistent** den Hinweis **Nicht
eingerichtet**, und alles andere funktioniert unverändert.

:::info[Daten verlassen den Server]
Mit eingerichtetem Assistenten werden hochgeladene Speisekarten und
Produktnamen an den gewählten Anbieter übertragen. Was dieser damit tut,
regelt **dein** Vertrag mit ihm — prüfe seine Datenschutzbedingungen und
informiere deine Nutzer:innen, bevor ein Admin die Funktionen einschaltet.
:::

## Anbieter wählen

Die Betriebsart bestimmt `AI_PROVIDER` in der Umgebung von `openeos-api`:

| Wert | Bedeutung |
|---|---|
| `none` | Aus (Standard). Alle Assistent-Endpunkte antworten mit `404`. |
| `anthropic` | Claude über die Anthropic-API. Liest Bilder **und PDFs**. |
| `openai` | Eine OpenAI-kompatible Chat-Completions-API — OpenAI selbst oder ein anderer Dienst mit eigener `OPENAI_BASE_URL`. Liest Bilder und Text, **keine PDFs**. |

### Anthropic

```yaml
  api:
    environment:
      # … bestehende Variablen …
      AI_PROVIDER: anthropic
      ANTHROPIC_API_KEY: ${ANTHROPIC_API_KEY:?ANTHROPIC_API_KEY fehlt}
```

Den Schlüssel in die `.env` neben die anderen Geheimnisse:

```bash
ANTHROPIC_API_KEY=sk-ant-…
```

### OpenAI und kompatible Dienste

```yaml
  api:
    environment:
      # … bestehende Variablen …
      AI_PROVIDER: openai
      OPENAI_API_KEY: ${OPENAI_API_KEY:?OPENAI_API_KEY fehlt}
      # Nur für andere Anbieter nötig; Standard ist https://api.openai.com/v1
      OPENAI_BASE_URL: https://api.openai.com/v1
```

Mit `OPENAI_BASE_URL` sprichst du jeden Dienst an, der die Chat-Completions-API
von OpenAI nachbildet — etwa einen europäischen Anbieter oder ein lokal
laufendes Modell. Der Dienst muss zwei Dinge können: **Bilder** als Eingabe
und **strukturierte Ausgabe** nach JSON-Schema (`response_format` mit
`json_schema`, `strict: true`). Fehlt eines davon, scheitert jeder Import mit
„Der Assistent ist gerade nicht erreichbar“ — die Details stehen dann im Log
von `openeos-api`.

:::warning[PDF nur mit Anthropic]
Beim OpenAI-kompatiblen Anbieter lehnt der Server PDF-Uploads ab („PDF wird
vom eingerichteten Anbieter nicht unterstützt — bitte lade Fotos der Seiten
hoch“). Fotos und eingefügter Text gehen immer.
:::

## Modelle

Welche Modelle der Server verwendet, steht in der Konfiguration, nicht im
Code. Leer gelassen gelten die Standardwerte je Anbieter:

| Variable | Zweck | Standard `anthropic` | Standard `openai` |
|---|---|---|---|
| `AI_MODEL_EXTRACT` | liest die Speisekarte (Bilder, PDF, Text) | `claude-sonnet-5-5` | `gpt-5` |
| `AI_MODEL_CLASSIFY` | ordnet unklare Produktnamen einem Icon zu | `claude-haiku-4-5-20251001` | `gpt-5-mini` |

Beim OpenAI-kompatiblen Anbieter setzt du beide Werte auf die Modellnamen,
die dein Dienst kennt. Das Extraktionsmodell muss Bilder verstehen; das
Klassifikationsmodell braucht nur Text und darf klein sein.

## Kontingente und Grenzen

| Variable | Bedeutung | Standard |
|---|---|---|
| `AI_MENU_IMPORTS_PER_DAY` | Speisekarten-Importe je Organisation und Kalendertag (Europe/Berlin) | `5` |
| `AI_CLASSIFY_PER_DAY` | Icon-Zuordnungen per Modell je Organisation und Tag | `500` |
| `AI_MENU_PAGES_PER_IMPORT` | Bilder je Import (1–20) | `6` |
| `AI_MAX_UPLOAD_MB` | Höchstgröße je Datei in MB (1–50) | `10` |

Die Kontingente schützen im gehosteten Angebot die Kosten. Mit eigenem
Schlüssel zahlst du den Anbieter selbst und setzt sie so hoch, wie du
möchtest; `0` schaltet die jeweilige Funktion aus. Ein Aufruf, der beim
Anbieter scheitert, wird nicht angerechnet. Die meisten Icon-Vorschläge
kommen ohne Modellaufruf aus (Abgleich mit den Namen und Suchbegriffen der
Produkt-Icons); nur unklare Namen gehen gebündelt an das
Klassifikationsmodell.

Jeder Modellaufruf steht mit Organisation, Funktion, Modell, Token-Zahlen
und Dauer in der Tabelle `ai_usage` — daran siehst du, was der Assistent
bei deinem Anbieter kostet.

## Einschalten

Nach dem Neustart (`sudo docker compose up -d --force-recreate api`) zeigt
**Einstellungen → Organisation → Assistent** statt „Nicht eingerichtet“ den
Schalter **Assistent-Funktionen**. Erst wenn ein Admin ihn einschaltet,
stehen Import und Icon-Vorschlag in der Oberfläche; das Ein- und Ausschalten
landet im Audit-Protokoll.

## Dateien und Aufbewahrung

Hochgeladene Speisekarten liegen unter `<UPLOAD_DIR>/menu-imports/<id>/`
(in der Compose-Anleitung ist das das Volume `uploads`). Sie sind **nicht**
öffentlich erreichbar — anders als Produktbilder liefert der Server diesen
Pfad nicht aus.

Gelöscht werden sie, sobald der Vorschlag **übernommen** oder **verworfen**
wird, spätestens aber **24 Stunden** nach dem Hochladen; der gespeicherte
Vorschlag (die erkannte Liste in der Tabelle `menu_imports`) nach
**30 Tagen**. Beides erledigt ein stündlicher Hintergrundjob des Servers.
Importe, die länger als 15 Minuten in Bearbeitung hängen, markiert ein
Minuten-Job als fehlgeschlagen; sie kosten kein Kontingent.

Beim Anbieter selbst verbleiben die Inhalte nur für die Dauer der
Verarbeitung — was darüber hinaus gilt, bestimmt dein Vertrag mit ihm.

## Fehlersuche

```bash
sudo docker compose logs -f api | grep -i 'assistant\|menu-import\|ai-provider'
```

| Meldung in der Oberfläche | Ursache |
|---|---|
| **Nicht eingerichtet** | `AI_PROVIDER` ist `none` oder fehlt, oder der Server wurde nach der Änderung nicht neu gestartet. |
| **Die Assistent-Funktionen sind für deine Organisation ausgeschaltet.** | Anbieter ist da, aber der Schalter in den Einstellungen ist aus. |
| **Der Assistent ist gerade nicht erreichbar** | Schlüssel ungültig, Modellname unbekannt oder der Dienst kann keine Bilder bzw. kein JSON-Schema — Details im Log. |
| **Das Tageskontingent … ist aufgebraucht** | `AI_MENU_IMPORTS_PER_DAY` bzw. `AI_CLASSIFY_PER_DAY` erreicht; ab Mitternacht (Europe/Berlin) wieder frei. |
| **PDF wird vom eingerichteten Anbieter nicht unterstützt** | `AI_PROVIDER=openai` — Fotos der Seiten hochladen oder auf `anthropic` wechseln. |
