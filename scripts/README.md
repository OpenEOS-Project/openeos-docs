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

## Noch nicht erfasst

Alle Bilder unter `static/img/screens/` kommen aus dem Skript — bis auf
eins, und das bewusst:

- `device-pair` — die Kopplungsseite meldet beim Laden ein neues Gerät an
  (`/device/pair` bzw. `/device/register`). Auf Staging soll dabei kein
  Gerät entstehen; das Bild bleibt deshalb, wie es ist.
