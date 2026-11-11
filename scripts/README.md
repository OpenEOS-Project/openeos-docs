# Bilder für das Handbuch

Die Screenshots werden aufgenommen, nicht von Hand gemacht — sonst sind
sie nach dem nächsten Umbau der Oberfläche wieder veraltet, und niemand
weiß, welche.

```bash
pnpm install
ZUGANG="mail:passwort" node scripts/screenshots.mjs                   # alles, DE und EN
ZUGANG="mail:passwort" node scripts/screenshots.mjs --nur pos,events  # nur diese Motive
ZUGANG="mail:passwort" node scripts/screenshots.mjs --sprache de      # nur eine Sprache
```

Aufgenommen wird gegen **Staging** (`APP_URL` überschreibt das).

Passt der Chromium von Playwright nicht zur installierten Version, zeigt
`CHROMIUM_PATH` auf einen vorhandenen Browser:

```bash
CHROMIUM_PATH=~/.cache/ms-playwright/chromium-1247/chrome-linux64/chrome \
  ZUGANG="mail:passwort" node scripts/screenshots.mjs --nur tables
```

Je Sprache startet das Skript einen eigenen Browser mit passender
Systemsprache (`LANGUAGE`/`LANG`). Sonst zeigt Chromium Datums- und
Zeitfelder auch im deutschen Bild im US-Format an.

## Welches Konto

Entscheidend, und zweimal falsch gemacht:

- Es muss zu der Organisation gehören, in der **Testdaten** liegen.
  Sonst zeigen Kategorien, Produkte und Standorte nur Leerzustände, und
  der „Erstellen"-Knopf fehlt ganz.
- Es sollte ein **normales Administratorkonto** sein, kein Super-Admin:
  der sieht zusätzliche Menüpunkte, die kein Kunde je zu Gesicht bekommt.

Auf Staging passt `tour-test-140624@example.com` (Organisation *TSV
Musterstadt*).

## Integrationen

Die Bilder `integrations*` und `pos-card` setzen voraus, dass SumUp in der
Testorganisation **aktiv** ist und Demo-Zugangsdaten hat (beliebiger
`sup_sk_…`-Key, Merchant Code z. B. `MDOKU2026`). Die Kartenleser fragt das
Skript nicht bei SumUp ab, sondern täuscht einen gekoppelten Leser vor.
Dieselben Bilder liegen auch im Info-Fenster der Weboberfläche
(`openeos-web/public/integrations/screenshots/sumup/`).

## Beschriftung

In `screenshots.config.mjs` bekommt eine Aufnahme optional `hinweise`:

```js
hinweise: [{ auf: '.pos-cart-col', text: 'Warenkorb mit Summe und Bezahlen' }]
```

Daraus werden ein nummerierter Rahmen im Bild und eine Legende darunter.
Die Nummer sitzt links neben dem Rahmen, sonst darüber; verdeckt sie dort
Text (etwa bei großen Bereichen direkt unter einer Überschrift), setzt
`marke: 'innen'` sie in die obere linke Ecke innerhalb des Rahmens.
Die Nummern sollen den Schritten im Kapiteltext entsprechen — wenn du
den Text umstellst, stell die Reihenfolge hier mit um.

- `text` darf ein String sein oder `{ de: '…', en: '…' }` — nimm das
  zweite, sonst steht im englischen Bild eine deutsche Legende.
- `auf` darf auch eine Liste von Selektoren sein. Der Rahmen umschließt
  dann alle zusammen, etwa Speicherstatus und Umschalter daneben.
- Liegen zwei Marken direkt nebeneinander, verdeckt der Nummernkreis der
  zweiten die erste. Fass sie dann zu einer Marke zusammen.

## Weitere Felder einer Aufnahme

| Feld | Wofür |
|---|---|
| `vorbereiten(seite, { sprache })` | klickt, füllt aus, scrollt, bevor ausgelöst wird |
| `routen(seite, { sprache })` | Abfangregeln (`page.route`) vor dem Laden; nach der Aufnahme wieder entfernt |
| `ansicht: { breite, hoehe }` | andere Fenstergröße, z. B. Telefon 390×844 |
| `ohneAnmeldung` | Seite ohne Sitzung (Registrierung, öffentliche Helferseite) |

## Schreibschutz und nachgestellte Daten

Auf Staging darf eine Aufnahme nichts verändern. Deshalb:

- **`schreibschutz`** (in `screenshots.config.mjs`) als `routen` eintragen,
  wenn die Aufnahme klickt oder Dialoge ausfüllt: Alles außer Lesen an
  die API wird abgebrochen und im Log als `blockiert:` gemeldet. Dialoge
  werden nur ausgefüllt, nie abgeschickt; der Tischplan „Zelt A“ wird nur
  angeklickt, nie verschoben.
- **Registrierung, Schritt „nach dem Absenden“**: Die Anfrage
  `/auth/register` beantwortet die Aufnahme selbst. Ein echter POST legte
  ein Konto an.
- **Rabatt-Bons, Pfand-Typen, Inventuren** sind auf Staging leer. Echte
  Einträge erschienen sofort an der Kasse und veränderten deren Bilder;
  deshalb stellt `listeNachstellen` nur die Leseanfrage der Liste nach.
- **SumUp-Kartenleser** werden nachgestellt (siehe unten).
- **Dashboard** zeigt echte Zahlen mit Zeitraum „Heute“. Nimm es an einem
  Tag auf, an dem es Testbestellungen gibt — „Veranstaltung“ zählt nur die
  Veranstaltungstage, und dort liegen keine.

## Beispieldaten auf Staging

Die Schichtplan-Bilder brauchen den Plan **„Helfer Sommerfest 2026“**
(Veranstaltung *Sommerfest 2026*, öffentlich unter
`/s/helfer-sommerfest-2026-ygif`):

- Arbeiten **Getränkestand** (2 Helfer), **Grill** (2), **Kasse** (1),
  je eine Schicht am 12.09.2026 von 14–18 und 18–22 Uhr,
- vier ausgedachte Anmeldungen: Anna Beispiel und Ben Mustermann
  (bestätigt), Clara Probe (Freigabe offen), David Test (E-Mail offen),
  alle mit Adressen `…@example.com`.

Die Tisch-Bilder brauchen den Bereich **„Zelt A“** mit den Tischen
A01–A12 und das Gerät **„Testkasse“**.

## Kopplungsseite nur lokal

Alle Bilder unter `static/img/screens/` kommen aus dem Skript. Eine
Aufnahme läuft aber nie gegen Staging:

- `device-pair` — die Kopplungsseite meldet beim Laden ein neues Gerät an
  (`/device/pair` bzw. `/device/register`). Auf Staging soll dabei kein
  Gerät entstehen. Die Aufnahme ist deshalb `nurLokal` und wird gegen
  Staging übersprungen. Aufnehmen gegen eine lokal gebaute Oberfläche
  (openeos-web, `pnpm build`), deren API ins Leere zeigt; die Aufnahme
  beantwortet `/devices/init` und `/devices/status` selbst und bricht
  alles andere ab:

```bash
API_URL=http://127.0.0.1:3999/api node_modules/.bin/next start -p 3947   # in openeos-web
APP_URL=http://localhost:3947 ZUGANG="x:y" node scripts/screenshots.mjs --nur device-pair
```

## Stationsanzeige

`display-station` stellt die Bestellungen der Küche nach und meldet drei
Positionen als fertig (ebenfalls nachgestellt). So zeigt das Bild eine
grüne Karte „Erledigt“ und eine abgehakte Position. Der Gerätestatus kommt
echt von Staging (Token der Testkasse), Typ und Einstellungen werden für
die Aufnahme auf eine Stationsanzeige umgeschrieben.

## Tischwahl an der Kasse

Seit 1.6 legt die Geräteeinstellung `tableSelectView` fest, ob die Kasse
Nummer, Liste oder Karte zeigt. Die Kassenbilder setzen sie über
`kassenRouten({ tischwahl: 'number' | 'list' | 'map' })`.

## Lokal aufnehmen (Stand 1.8)

Seit 1.8 entstehen die Bilder gegen einen **lokalen Stack** aus `dev`
(openeos-api + openeos-web, eigene Postgres/Redis-Container) mit
Beispieldaten. So lassen sich auch Bilder machen, die auf Staging etwas
anlegen würden (Assistent, Pfand-Rückgabe, Anmeldung einer Bedienung).

- **Adressen wie gehostet:** Eine kleine TLS-Weiche (selbst signiert) nimmt
  `app.openeos.de` und `api.openeos.de` lokal an; Chromium leitet die
  Namen dorthin um. Im Bild steht dann nie `localhost`.

  ```bash
  APP_URL=https://app.openeos.de \
  LOKALER_STACK="MAP app.openeos.de 127.0.0.1:<web-tls>, MAP api.openeos.de 127.0.0.1:<api-tls>" \
  DOKU_KASSE="Kasse Zelt A" DOKU_KASSE_TOKEN=<Kasse Theke> DOKU_BEDIENUNG_TOKEN=<Kasse Zelt A> \
  DOKU_ANZEIGE_TOKEN=<Kundendisplay> DOKU_PIN=<PIN einer Bedienung> \
  ZUGANG="mail:passwort" node scripts/screenshots.mjs
  ```

  Web mit `API_URL=https://api.openeos.de/api` starten, API mit
  `APP_URL=https://app.openeos.de` und dieser Adresse in `CORS_ORIGINS`.
- **`LOKALER_STACK` gesetzt** heißt außerdem: Listen werden nicht
  nachgestellt (`listeNachstellen`), und Aufnahmen mit `nurLokal` laufen
  (Kopplungsseite, Assistent, Bedienung an der Kasse, Pfand-Rückgabe,
  Kassenbuch der Kasse). Ohne lokalen Stack werden sie übersprungen.
- **Assistent:** `AI_PROVIDER=openai` mit `OPENAI_BASE_URL` auf ein
  Ersatzmodell, das die Testdatei der API
  (`test/fixtures/menu/speisekarte.extraction.json`) zurückgibt und
  Icon-Vorschläge per Stichwort wählt. Es geht nichts an einen echten
  Anbieter.
- **Buchen mit Zusammenfassung:** braucht einen (Dummy-)`STRIPE_SECRET_KEY`,
  sonst zeigt der Dialog „Online-Zahlung ist derzeit nicht verfügbar“.
  Gebucht wird nie.
- **Cloud-TSE:** `TSE_PROVIDER=none` und `TSE_COMING_SOON=true` – so wie
  gehostet bis zum Start („Bald verfügbar“).
- **Beleg nach dem Bezahlen (seit 1.8):** `pos-done` zeigt den QR-Code des
  digitalen Belegs; `/device-api/receipts/link` ist in `kassenRouten`
  nachgestellt (Link auf `app.openeos.de/beleg/…`), es entsteht kein Beleg.
- **`pos-tse-receipt`** ist kein Skriptbild: Ausschnitt (nur der Bon) aus
  einer Aufnahme gegen die Swissbit-Entwicklungsumgebung. Ein neues braucht
  eine echte TSE.
- **Notfall-Support:** `OPERATOR_EMERGENCY_PHONE` mit einer ausgedachten
  Nummer (Bilder 2026: `+49 30 23125456` aus dem Bereich für Film und
  Fernsehen).

### Beispieldaten

Angelegt über die API (Registrierung, danach als Admin und an den Geräten):

- Organisation **TSV Musterstadt e. V.** (DE, „Alle Funktionen
  (Bestand)“, damit Bargeld, Kassenbuch und Pfand-Auszahlung echt zu sehen
  sind; der Bestand-Hinweis wird in `dashboard` ausgeblendet), Admin
  **Lena Hoffmann**, Steuernummer, Anschrift, Impressum/Datenschutz als Link,
  SumUp aktiv mit Demo-Zugang, Assistent an.
- Veranstaltungen **Martinimarkt 2026** (aktiv, Tische vordefiniert),
  **Weihnachtsmarkt 2026**, **Sommerfest 2026** (freigeschaltet),
  **Jugendturnier 2027** (noch nicht freigeschaltet – für `events-checkout`).
- Bereiche **Zelt A** (A01–A12, Bühne, Theke, Küche, Notausgang) und
  **Biergarten** (B01–B06); Standorte Theke, Grill, Küchenzelt; vier
  Kategorien mit Produkten und POS-Icons; Pfand Mehrwegbecher (19 %),
  Glühweintasse (19 %), Teller (7 %); drei Rabatt-Bons.
- Bedienungen Anna Becker, Jonas Weber, Marie Klein, Sophie Wagner und
  Tom Schulz (Schichtleitung); Geräte **Kasse Theke** (ohne Bedienung),
  **Kasse Zelt A** (gemeinsame Kasse, Namenskacheln), **Handy Biergarten**
  (feste Bedienung), Küchenanzeige, Kundendisplay, Drucker-Agent mit zwei
  Druckern.
- Rund 90 Bestellungen am Aufnahmetag (bar und Karte, an der Theke und an
  Tischen, einige Tische offen), Pfand-Rückgaben, Kassenbuch mit
  Anfangsbestand/Einlage/Entnahme, eine Erstattung, eine Abrechnung,
  zwei Inventuren, Webhooks mit Zustellprotokoll, zwei API-Zugänge, ein
  Schichtplan, eine Support-Nachricht mit Antwort.

`settings-operating-mode` wird für eine neue Organisation aufgenommen
(Betriebsart **Bargeldlos**, „Alle Funktionen“ bald verfügbar): dafür die
Beispielorganisation für diese eine Aufnahme auf `cashless` stellen.

Nicht im lokalen Lauf: die Schichtplan-Bilder (`shift*`, `public-*`)
brauchen weiterhin den Plan auf Staging (siehe oben); die Drucker-Bilder
des Agents (`printer*`, `printers-*` außer `printers`, `printers-templates`,
`printers-workflows`, `printers-template-waiter`) sind von Hand gegen einen
laufenden Agent entstanden.
