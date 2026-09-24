# Bilder für das Handbuch

Die Screenshots werden aufgenommen, nicht von Hand gemacht — sonst sind
sie nach dem nächsten Umbau der Oberfläche wieder veraltet, und niemand
weiß, welche.

```bash
pnpm install
ZUGANG="mail:passwort" node scripts/screenshots.mjs           # alles
ZUGANG="mail:passwort" node scripts/screenshots.mjs --nur pos,events
```

Aufgenommen wird gegen **Staging** (`APP_URL` überschreibt das).

## Welches Konto

Entscheidend, und zweimal falsch gemacht:

- Es muss zu der Organisation gehören, in der **Testdaten** liegen.
  Sonst zeigen Kategorien, Produkte und Standorte nur Leerzustände, und
  der „Erstellen"-Knopf fehlt ganz.
- Es sollte ein **normales Administratorkonto** sein, kein Super-Admin:
  der sieht zusätzliche Menüpunkte, die kein Kunde je zu Gesicht bekommt.

Auf Staging passt `tour-test-140624@example.com` (Organisation *TSV
Musterstadt*).

## Beschriftung

In `screenshots.config.mjs` bekommt eine Aufnahme optional `hinweise`:

```js
hinweise: [{ auf: '.pos-cart-col', text: 'Warenkorb mit Summe und Bezahlen' }]
```

Daraus werden ein nummerierter Rahmen im Bild und eine Legende darunter.
Die Nummern sollen den Schritten im Kapiteltext entsprechen — wenn Sie
den Text umstellen, stellen Sie die Reihenfolge hier mit um.

## Noch nicht erfasst

Diese Bilder stammen noch aus dem alten Satz; sie brauchen Daten oder
Abläufe, die auf Staging nicht ohne Weiteres herstellbar sind:

`printers-workflows`, `public-contact`, `public-helper`, `public-select`,
`reg-step3`, `reg-step4-confirm`, `reg-after-submit`, `settings-org-pos`,
`settings-org-sumup`, `shift-anmeldungen`, `shift-detail`,
`shift-generator`, `shift-settings`, `shift-work-dialog`.

Für die Schichtpläne müsste ein Plan mit Anmeldungen angelegt werden,
für die Zahlungsreiter ein Zahlungsanbieter hinterlegt, und die
Registrierung bricht nach Schritt 2 ab, weil ab dort ein echtes Konto
entstünde.
