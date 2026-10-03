/**
 * Was aufgenommen wird.
 *
 * Eine Zeile je Bild. `vorbereiten` bekommt die Seite und darf klicken,
 * bevor ausgelöst wird — so entstehen auch die Dialoge, die sonst nur von
 * Hand zu erreichen wären.
 *
 * `hinweise` beschriftet das Bild: jede Marke bekommt eine Nummer und
 * sitzt an einem Element der Seite. Die Nummern entsprechen den Schritten
 * im Handbuchtext, damit Bild und Anleitung zusammenpassen.
 */

/**
 * Den Anlegen-Dialog einer Listenseite öffnen.
 *
 * Die Beschriftung unterscheidet sich je Seite und Sprache („Produkt
 * erstellen", „Add member", „Neue Kategorie"). Statt für jede Seite eine
 * eigene Zeile zu pflegen, wird nach dem Muster gesucht — schlägt das
 * fehl, fällt es auf den ersten Knopf der Kopfzeile zurück.
 */
async function dialogOeffnen(seite) {
  const muster = /erstellen|anlegen|hinzufügen|neue[rs]?\s|create|add|new/i;
  const knopf = seite.getByRole('button', { name: muster }).first();
  if (await knopf.isVisible().catch(() => false)) {
    await knopf.click();
  } else {
    await seite.locator('.app-card__head button, header button').last().click();
  }
  await seite.waitForTimeout(1000);
}


/**
 * Leserliste der SumUp-Seite abfangen.
 *
 * Auf Staging stehen nur Demo-Zugangsdaten — die echte Abfrage bei SumUp
 * scheiterte und zeigte eine Fehlermeldung im Bild. Ein gekoppelter Leser
 * zeigt dagegen, wie die Seite im Betrieb aussieht.
 */
async function sumupLeserVortaeuschen(seite) {
  await seite.route('**/sumup/readers', (route) =>
    route.request().method() === 'GET'
      ? route.fulfill({
          contentType: 'application/json',
          body: JSON.stringify({
            data: [
              {
                id: 'rdr_doku',
                name: 'Kasse Bar',
                status: 'paired',
                device: { identifier: 'SOLO-12345', model: 'solo' },
                created_at: '2026-10-01T10:00:00Z',
                updated_at: '2026-10-01T10:00:00Z',
              },
            ],
          }),
        })
      : route.continue(),
  );
  await seite.route('**/sumup/readers/*/status', (route) =>
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({ data: { data: { status: 'ONLINE', battery_level: 84 } } }),
    }),
  );
}

export const AUFNAHMEN = [
  // --- Überblick ---
  { datei: 'dashboard', pfad: '/dashboard' },
  { datei: 'orders', pfad: '/orders' },
  { datei: 'reports', pfad: '/reports' },
  { datei: 'inventory', pfad: '/inventory' },

  // --- Veranstaltung ---
  {
    datei: 'events',
    pfad: '/events',
    hinweise: [
      { auf: 'button:has-text("Veranstaltung erstellen"), button:has-text("Create event")', text: 'Neue Veranstaltung anlegen' },
    ],
  },
  {
    datei: 'events-dialog',
    pfad: '/events',
    async vorbereiten(seite) {
      await seite.getByRole('button', { name: /Veranstaltung erstellen|Create event/i }).first().click();
      await seite.waitForTimeout(800);
      await seite.locator('input[name="startDate"]').fill('2026-10-01');
      await seite.locator('input[name="endDate"]').fill('2026-10-03');
      await seite.waitForTimeout(2500); // Preisvorschau abwarten
    },
    hinweise: [
      { auf: 'input[name="startDate"]', text: 'Zeitraum festlegen' },
      { auf: '.event-price-hint', text: 'Kosten stehen sofort da' },
    ],
  },

  // --- Sortiment ---
  /* Kategorien haben keine eigene Seite mehr; der Dialog auf der
     Produktseite hat sie abgeloest. */
  {
    datei: 'categories-dialog',
    pfad: '/products',
    async vorbereiten(seite) {
      await seite.getByRole('button', { name: /Kategorien bearbeiten|Edit categories/i }).first().click();
      await seite.waitForTimeout(1200);
    },
  },
  { datei: 'products', pfad: '/products' },
  { datei: 'stations', pfad: '/production-stations' },

  // --- Geräte ---
  {
    datei: 'devices',
    pfad: '/devices',
    hinweise: [{ auf: 'code, .app-card', text: 'Link und QR-Code für neue Geräte' }],
  },
  {
    datei: 'device-verify',
    pfad: '/devices/verify',
    hinweise: [
      { auf: '.verify-code-input, input#code', text: 'Die Zahl vom Gerät hier eintragen' },
      { auf: 'button[type="submit"]', text: 'Gerät suchen und freigeben' },
    ],
  },
  { datei: 'printers', pfad: '/printers' },

  // --- Team & Einstellungen ---
  { datei: 'members', pfad: '/members' },
  { datei: 'shifts', pfad: '/shifts' },
  { datei: 'settings', pfad: '/settings' },
  { datei: 'discounts', pfad: '/discounts' },
  { datei: 'pfand', pfad: '/pfand' },
  // --- Dialoge: dieselbe Seite, einmal mit geöffnetem Formular ---
  { datei: 'products-dialog', pfad: '/products', vorbereiten: dialogOeffnen },
  { datei: 'discounts-dialog', pfad: '/discounts', vorbereiten: dialogOeffnen },
  { datei: 'members-dialog', pfad: '/members', vorbereiten: dialogOeffnen },
  { datei: 'pfand-dialog', pfad: '/pfand', vorbereiten: dialogOeffnen },
  { datei: 'stations-dialog', pfad: '/production-stations', vorbereiten: dialogOeffnen },
  { datei: 'shifts-dialog', pfad: '/shifts', vorbereiten: dialogOeffnen },
  // --- Registrierung: eigener Ablauf, deshalb Schritt für Schritt ---
  {
    datei: 'reg-step1',
    pfad: '/register',
    ohneAnmeldung: true,
    hinweise: [{ auf: 'form', text: 'E-Mail und Passwort — das Passwort ist freiwillig' }],
  },
  {
    datei: 'reg-step2',
    pfad: '/register',
    ohneAnmeldung: true,
    async vorbereiten(seite) {
      const stempel = Date.now();
      await seite.locator('input[type="email"]').fill(`doku-${stempel}@example.com`);
      const pw = seite.locator('input[type="password"]');
      if (await pw.first().isVisible().catch(() => false)) {
        for (let i = 0; i < await pw.count(); i++) await pw.nth(i).fill('DokuTest2026!x');
      }
      await seite.getByRole('button', { name: /weiter|continue|next/i }).first().click();
      await seite.waitForTimeout(900);
    },
  },

  // --- Reiter innerhalb einer Seite ---
  {
    datei: 'settings-organisation',
    pfad: '/settings',
    async vorbereiten(seite) {
      await seite.getByRole('tab', { name: /organisation/i }).first().click().catch(() => {});
      await seite.getByRole('button', { name: /^Organisation$/i }).first().click().catch(() => {});
      await seite.waitForTimeout(900);
    },
  },
  {
    datei: 'settings-security',
    pfad: '/settings',
    async vorbereiten(seite) {
      await seite.getByRole('tab', { name: /sicherheit|security/i }).first().click().catch(() => {});
      await seite.getByRole('button', { name: /sicherheit|security/i }).first().click().catch(() => {});
      await seite.waitForTimeout(900);
    },
  },
  {
    datei: 'printers-templates',
    pfad: '/printers',
    async vorbereiten(seite) {
      await seite.getByRole('tab', { name: /vorlage|template/i }).first().click().catch(() => {});
      await seite.getByRole('button', { name: /vorlage|template/i }).first().click().catch(() => {});
      await seite.waitForTimeout(900);
    },
  },
  {
    datei: 'dashboard-customize',
    pfad: '/dashboard',
    async vorbereiten(seite) {
      await seite.getByRole('button', { name: /anpassen|customi[sz]e/i }).first().click().catch(() => {});
      await seite.waitForTimeout(900);
    },
  },
  // --- Integrationen ---
  // Voraussetzung auf Staging: SumUp ist in der Testorganisation aktiv und
  // hat Demo-Zugangsdaten (siehe README).
  {
    datei: 'integrations',
    pfad: '/integrations',
    hinweise: [
      { auf: '.integration-card--button >> nth=0', text: 'Integration antippen: Beschreibung, Bilder, Aktivieren' },
      { auf: 'a.app-sidebar__item--nested, .app-sidebar__item--nested', text: 'Aktive Integration in der Seitenleiste' },
    ],
  },
  {
    datei: 'integrations-sumup-info',
    pfad: '/integrations',
    async vorbereiten(seite) {
      await seite.locator('.integration-card--button', { hasText: 'SumUp' }).first().click();
      await seite.waitForTimeout(900);
    },
  },
  {
    datei: 'integrations-sumup',
    pfad: '/integrations/sumup',
    async vorbereiten(seite) {
      await sumupLeserVortaeuschen(seite);
      await seite.reload({ waitUntil: 'networkidle' });
    },
  },
  {
    datei: 'integrations-sumup-pair',
    pfad: '/integrations/sumup',
    async vorbereiten(seite) {
      await sumupLeserVortaeuschen(seite);
      await seite.reload({ waitUntil: 'networkidle' });
      await seite.getByRole('button', { name: /leser koppeln|lesegerät koppeln|pair (card )?reader/i }).first().click();
      await seite.waitForTimeout(800);
    },
  },
];


/** Geräteansichten: kein Konto, sondern ein Gerätetoken im Speicher. */
export const GERAETE_AUFNAHMEN = [
  {
    datei: 'pos-card',
    pfad: '/device/pos',
    token: 'dev_089dad7496ce4eddb84e489cab81ff7e',
    geraeteklasse: 'pos',
    // Mit zugewiesenem SumUp-Leser erscheint neben "Bar" die Kartenzahlung
    // (SumUp muss in der Organisation aktiv sein).
    async vorbereiten(seite) {
      /* Die Kasse holt ihre Einstellungen beim Start vom Server und
         ueberschreibt damit den Speicher — der Leser wird deshalb in die
         Statusantwort eingetragen, nicht nur in den lokalen Speicher. */
      await seite.route('**/devices/status', async (route) => {
        const antwort = await route.fetch();
        const json = await antwort.json();
        json.data.settings = { ...(json.data.settings ?? {}), sumupReaderId: 'rdr_doku' };
        await route.fulfill({ response: antwort, json });
      });
      await seite.reload({ waitUntil: 'networkidle' });
      await seite.waitForTimeout(800);
      const karten = seite.locator('.pos-product-scroll button');
      for (const n of [0, 0, 1]) {
        await karten.nth(n).click();
        await seite.waitForTimeout(400);
      }
    },
    hinweise: [{ auf: 'button:has-text("Karte"), button:has-text("Card")', text: 'Kartenzahlung über SumUp' }],
  },
  {
    datei: 'pos',
    pfad: '/device/pos',
    token: 'dev_089dad7496ce4eddb84e489cab81ff7e',
    geraeteklasse: 'pos',
    /* Mit gefuelltem Warenkorb: ein leerer zeigt weder Mengen noch Summe
       und erklaert damit genau das nicht, worum es geht. */
    async vorbereiten(seite) {
      /* Die ganze Produktkarte ist der Knopf — das Pluszeichen ist ein
         Symbol darin und als Text nicht zu greifen. */
      const karten = seite.locator('.pos-product-scroll button');
      for (const n of [0, 0, 1]) {
        await karten.nth(n).click();
        await seite.waitForTimeout(400);
      }
    },
    hinweise: [
      { auf: 'aside:has-text("KATEGORIEN"), nav:has-text("KATEGORIEN")', text: 'Kategorien des Sortiments' },
      { auf: '.pos-product-scroll', text: 'Produkte antippen zum Hinzufügen' },
      { auf: '.pos-cart-col', text: 'Warenkorb mit Summe und Bezahlen' },
    ],
  },
  {
    datei: 'display-customer',
    pfad: '/device/customer',
    token: 'dev_853d4d669dfd4afeb82f8f4e0b967a57',
    geraeteklasse: 'display',
    einstellungen: { displayMode: 'customer' },
  },
  {
    datei: 'display-station',
    pfad: '/device/station',
    token: 'dev_089dad7496ce4eddb84e489cab81ff7e',
    geraeteklasse: 'pos',
    einstellungen: { serviceMode: 'station' },
  },
  {
    datei: 'device-pair',
    pfad: '/device/pair?type=pos',
    ohneToken: true,
    hinweise: [
      { auf: '.display-pair__code', text: 'Diese Zahl in der Verwaltung eingeben' },
      { auf: '.display-pair__qr', text: 'Oder den QR-Code scannen' },
    ],
  },
];