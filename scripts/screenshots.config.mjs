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

/**
 * Schreibschutz für eine Aufnahme: alles ausser Lesen wird abgebrochen.
 *
 * Für Seiten, auf denen das Bild nur durch Klicken entsteht (Tisch
 * auswählen, Dialog ausfüllen) — falls ein Klick doch einmal speichert,
 * landet nichts auf Staging. Als `routen` eintragen; das Skript entfernt
 * die Regel nach der Aufnahme wieder.
 */
async function schreibschutz(seite) {
  await seite.route('**/api/**', (route) => {
    const methode = route.request().method();
    if (['GET', 'HEAD', 'OPTIONS'].includes(methode)) return route.fallback();
    console.warn(`    blockiert: ${methode} ${route.request().url()}`);
    return route.abort();
  });
}

/**
 * Schichtplan „Helfer Sommerfest 2026“ öffnen, optional auf einem Reiter.
 *
 * Über die Karte statt über eine feste Adresse: die ID des Plans ist auf
 * jedem Staging-Stand eine andere, der Name bleibt.
 */
async function schichtplanOeffnen(seite, reiter) {
  await seite.locator('div', { hasText: 'Helfer Sommerfest 2026' })
    .getByRole('button', { name: /^(Bearbeiten|Edit)$/ }).last().click();
  await seite.waitForURL(/\/shifts\/[0-9a-f-]{36}/);
  if (reiter) {
    await seite.goto(`${seite.url().split('?')[0]}?tab=${reiter}`, { waitUntil: 'networkidle' });
  }
  await seite.waitForLoadState('networkidle');
  await seite.waitForTimeout(600);
}

/** Öffentliche Helferseite des Beispielplans (Adresse aus dem Plan-Namen). */
const HELFERSEITE = '/s/helfer-sommerfest-2026-ygif';

/** Auf der Helferseite zwei Schichten auswählen: Grill 14–18 und Kasse 18–22. */
async function schichtenWaehlen(seite) {
  await seite.locator('section.shifts-public__card').nth(0).locator('button', { hasText: 'Grill' }).click();
  await seite.waitForTimeout(250);
  await seite.locator('section.shifts-public__card').nth(1).locator('button', { hasText: /Kasse|Cash/ }).click();
  await seite.waitForTimeout(400);
}

/** Beispielangaben für die Registrierung — nie abgeschickt (siehe reg-after-submit). */
const REGISTRIERUNG = {
  email: 'erika.beispiel@example.com',
  vorname: 'Erika',
  nachname: 'Beispiel',
  organisation: { de: 'TSV Musterstadt e.V.', en: 'Riverside Sports Club' },
};

/**
 * Registrierung bis zu Schritt `ziel` (1–4) ausfüllen. Ohne Passwort:
 * so ist es voreingestellt, das Konto meldet sich dann per Link an.
 */
async function registrierungBis(seite, sprache, ziel) {
  const weiter = () => seite.locator('.wizard').getByRole('button', { name: /^(Weiter|Next)/ }).click();
  await seite.locator('input[type="email"]').fill(REGISTRIERUNG.email);
  if (ziel === 1) return;
  await weiter();
  await seite.waitForTimeout(400);
  if (ziel === 2) return;
  await seite.getByLabel(/^(Vorname|First name)/).fill(REGISTRIERUNG.vorname);
  await seite.getByLabel(/^(Nachname|Last name)/).fill(REGISTRIERUNG.nachname);
  await weiter();
  await seite.waitForTimeout(400);
  await seite.getByLabel(/^(Name der Organisation|Organization name)/).fill(REGISTRIERUNG.organisation[sprache]);
  // Seit 1.8 Pflicht: das Land der Organisation.
  await seite.locator('.wizard select').first().selectOption(sprache === 'en' ? 'GB' : 'DE').catch(() => seite.locator('.wizard select').first().selectOption('DE'));
  await seite.locator('.wizard h1, .wizard h2').first().click().catch(() => {});
  if (ziel === 3) return;
  await weiter();
  await seite.waitForTimeout(400);
  /* Seit den neuen Rechtstexten zwei Pflicht-Häkchen (Verein, AGB + AVV). */
  const haken = await seite.locator('.wizard input[type="checkbox"]').all();
  for (const h of haken.slice(0, 2)) await h.check({ force: true });
  await seite.waitForTimeout(300);
}

/**
 * Listen nachstellen, die auf Staging leer sind: Rabatt-Bons, Pfand-Typen
 * und Inventuren.
 *
 * Warum nicht echt anlegen: Rabatt-Bons und Pfand-Typen erscheinen sofort
 * an der Kasse und würden deren Bilder verändern. Nachgestellt wird nur
 * die Leseanfrage der jeweiligen Liste, Schreiben bleibt gesperrt.
 */
function listeNachstellen(muster, eintraege) {
  return async (seite, { sprache }) => {
    await schreibschutz(seite);
    /* Lokaler Stack mit Beispieldaten (siehe README): die echte Liste zeigen. */
    if (process.env.LOKALER_STACK) return;
    await seite.route(muster, (route) =>
      route.request().method() === 'GET'
        ? route.fulfill({ contentType: 'application/json', body: JSON.stringify({ data: eintraege(sprache) }) })
        : route.fallback(),
    );
  };
}

const ZEIT = '2026-09-01T10:00:00.000Z';
const BEISPIEL_RABATTE = (sprache) => [
  { name: sprache === 'en' ? 'Helper voucher' : 'Helfer-Bon', description: sprache === 'en' ? 'One free drink per shift' : 'Ein Freigetränk pro Schicht', type: 'fixed', amount: 3.5 },
  { name: sprache === 'en' ? 'Artist voucher €5' : 'Künstler-Bon 5 €', description: null, type: 'fixed', amount: 5 },
  { name: sprache === 'en' ? 'Sponsor voucher' : 'Sponsoren-Gutschein', description: sprache === 'en' ? 'Amount as printed on the voucher' : 'Betrag laut Gutschein', type: 'manual', amount: null },
].map((v, i) => ({
  id: `doku-rabatt-${i}`, organizationId: 'doku', isActive: true, allowMultiplePerOrder: i === 0, sortOrder: i,
  createdAt: ZEIT, updatedAt: ZEIT, ...v,
}));
const BEISPIEL_PFAND = (sprache) => [
  { name: sprache === 'en' ? 'Reusable cup' : 'Mehrwegbecher', amount: 2 },
  { name: sprache === 'en' ? 'Bottle' : 'Flasche', amount: 0.25 },
  { name: sprache === 'en' ? 'Plate' : 'Teller', amount: 3 },
].map((p, i) => ({ id: `doku-pfand-${i}`, organizationId: 'doku', isActive: true, sortOrder: i, createdAt: ZEIT, updatedAt: ZEIT, ...p }));
const BEISPIEL_INVENTUREN = (sprache) => {
  const posten = (n) => Array.from({ length: n }, (_, i) => ({ id: `doku-posten-${i}`, inventoryCountId: 'doku', productId: `p${i}`, expectedQuantity: 0, countedQuantity: null, difference: null, notes: null, countedByUserId: null, countedAt: null }));
  const person = { id: 'doku', firstName: 'Tour', lastName: 'Test' };
  return [
    { id: 'doku-inv-2', name: sprache === 'en' ? 'Interim count Saturday night' : 'Zwischenstand Samstagabend', status: 'in_progress', notes: sprache === 'en' ? 'Drinks only' : 'Nur Getränke', createdAt: '2026-09-12T20:30:00.000Z', completedByUser: null, items: posten(9) },
    { id: 'doku-inv-1', name: sprache === 'en' ? 'Opening stock' : 'Anfangsbestand', status: 'completed', notes: null, createdAt: '2026-09-11T16:00:00.000Z', completedByUser: person, items: posten(14) },
  ].map((c) => ({ eventId: 'doku', startedAt: c.createdAt, completedAt: c.status === 'completed' ? c.createdAt : null, createdByUserId: 'doku', completedByUserId: c.completedByUser ? 'doku' : null, createdByUser: person, updatedAt: c.createdAt, ...c }));
};

/* Kasse für die Geräte-Bilder: auf Staging „Testkasse“, im lokalen Stack
   mit Beispieldaten „Kasse Festzelt“ (DOKU_KASSE). */
const KASSE_NAME = process.env.DOKU_KASSE ?? 'Testkasse';

/** Gerät öffnen und zum Reiter „Einstellungen“ wechseln (nichts speichern). */
async function geraetEinstellungen(seite) {
  await seite.getByText(KASSE_NAME, { exact: true }).first().click();
  await seite.waitForURL(/\/devices\/[0-9a-f-]{36}/);
  await seite.waitForLoadState('networkidle');
  await seite.getByRole('button', { name: /^(Einstellungen|Settings)$/ }).first().click()
    .catch(() => seite.getByRole('tab', { name: /^(Einstellungen|Settings)$/ }).first().click());
  await seite.waitForTimeout(1000);
}

/**
 * Ein Element (meist eine Karte) an den oberen Bildrand scrollen, mit
 * etwas Luft darüber. Die Seite scrollt im Hauptbereich, nicht im Fenster.
 */
async function karteOben(seite, selektor, luft = 24) {
  // Erst wenn alles geladen ist: manche Reiter springen danach nach oben.
  await seite.waitForLoadState('networkidle');
  await seite.waitForTimeout(800);
  await seite.locator(selektor).first().evaluate((el, abstand) => {
    el.scrollIntoView({ block: 'start' });
    let p = el.parentElement;
    while (p) {
      if (p.scrollHeight > p.clientHeight && /auto|scroll/.test(getComputedStyle(p).overflowY)) { p.scrollBy(0, -abstand); break; }
      p = p.parentElement;
    }
    window.scrollBy(0, -abstand);
  }, luft);
  await seite.waitForTimeout(400);
}

/** Karte mit diesem Titel (je Sprache) als Selektor. */
const karte = (de, en) => [de, en]
  .flatMap((titel) => ['>', '> * >', '> * > * >', '> * > * > * >'].map((tiefe) => `.app-card:has(${tiefe} :is(h2, h3):text-is("${titel}"))`))
  .join(', ');

/**
 * Hinweis „Bargeld braucht in Deutschland eine TSE“ ausblenden. Er steht nur
 * bei Organisationen im Bestand („Alle Funktionen (Bestand)“) — die
 * Beispielorganisation ist eine, damit Bargeld, Kassenbuch und Pfand-
 * Auszahlung echt zu sehen sind. Neue Organisationen sehen ihn nicht.
 */
async function ohneBestandHinweis(seite) {
  await seite.addStyleTag({ content: '.mode-notice { display: none !important; }' });
  await seite.waitForTimeout(200);
}

/* Platzhalterbild für den Upload (1×1 Pixel); ausgewertet wird es nicht. */
const PNG_1X1 = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64');

/** Speisekarte für den Text-Import (Beispiel, wie ein Verein sie abtippt). */
const SPEISEKARTE = `Dorffest Musterhausen – Speisekarte

Vom Grill
Grillwurst im Brötchen ........ 3,50 €
Currywurst mit Pommes ......... 6,50 €
Steak im Brötchen ............. 5,00 €
Pommes rot-weiß ............... 3,00 €

Süßes
Crêpe mit Nutella ............. 3,50 €
Crêpe mit Puderzucker ......... 2,50 €

Getränke
Pils 0,3 l ..................... 2,50 €   0,5 l ..... 3,50 €
Radler 0,5 l ................... 3,50 €
Apfelschorle 0,5 l ............. 2,50 €
Cola 0,33 l (Flasche) .......... 2,50 €  + 2 € Pfand
Weinschorle rot 0,25 l ......... 3,00 €
Mineralwasser 0,5 l ............ 2,00 €`;

export const AUFNAHMEN = [
  // --- Überblick ---
  /* Zeitraum „Heute“ mit echten Zahlen, nichts nachgestellt: Ehrlicher
     als erfundene Werte, und „Veranstaltung“ zählt nur Bestellungen
     innerhalb der Veranstaltungstage (12.–13.09.2026) — die
     Testbestellungen liegen außerhalb, dort stünde überall 0. Heißt
     aber: Aufnehmen an einem Tag, an dem es Testbestellungen gibt, sonst
     zeigt das Bild leere Kacheln. */
  {
    datei: 'dashboard',
    pfad: '/dashboard',
    vorbereiten: ohneBestandHinweis,
    hinweise: [
      {
        auf: ['.oe-segment[data-tour="dashboard-range"]', '.dash-head__actions button:has-text("Anpassen"), .dash-head__actions button:has-text("Customise")'],
        text: { de: 'Zeitraum (Heute, 7 Tage, Veranstaltung) und Kacheln anpassen', en: 'Period (today, 7 days, event) and customise tiles' },
      },
      { auf: '.app-card--flat', text: { de: 'Letzte Aktivitäten: die neuesten Bestellungen', en: 'Recent activity: the latest orders' } },
    ],
  },
  { datei: 'orders', pfad: '/orders' },
  { datei: 'reports', pfad: '/reports' },
  // Inventuren nachgestellt (siehe listeNachstellen).
  { datei: 'inventory', pfad: '/inventory', routen: listeNachstellen('**/inventory/counts*', BEISPIEL_INVENTUREN) },

  // --- Veranstaltung ---
  {
    datei: 'events',
    pfad: '/events',
    hinweise: [
      { auf: 'button:has-text("Veranstaltung erstellen"), button:has-text("Create event")', text: { de: 'Neue Veranstaltung anlegen', en: 'Create a new event' } },
    ],
  },
  {
    datei: 'events-dialog',
    pfad: '/events',
    routen: schreibschutz,
    async vorbereiten(seite) {
      await seite.getByRole('button', { name: /Veranstaltung erstellen|Create event/i }).first().click();
      await seite.waitForTimeout(800);
      await seite.locator('input[name="startDate"]').fill('2026-10-01');
      await seite.locator('input[name="endDate"]').fill('2026-10-03');
      await seite.waitForTimeout(2500); // Preisvorschau abwarten
    },
    hinweise: [
      { auf: 'input[name="startDate"]', text: { de: 'Zeitraum festlegen', en: 'Set the dates' } },
      { auf: '.event-price-hint', text: { de: 'Kosten stehen sofort da', en: 'The price shows right away' } },
    ],
  },

  // --- Sortiment ---
  /* Kategorien haben keine eigene Seite mehr; der Dialog auf der
     Produktseite hat sie abgeloest. */
  {
    datei: 'categories-dialog',
    pfad: '/products',
    routen: schreibschutz,
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
    hinweise: [{ auf: 'code, .app-card', text: { de: 'Link und QR-Code für neue Geräte', en: 'Link and QR code for new devices' } }],
  },
  {
    datei: 'device-verify',
    pfad: '/devices/verify',
    routen: schreibschutz,
    // Nur eintragen, nicht suchen: der Code ist eine Attrappe.
    async vorbereiten(seite) {
      await seite.locator('input#code').first().fill('573080');
      await seite.locator('h1, h2').first().click().catch(() => {});
      await seite.waitForTimeout(300);
    },
    hinweise: [
      { auf: '.verify-code-input, input#code', text: { de: 'Die Zahl vom Gerät hier eintragen', en: 'Enter the number shown on the device' } },
      { auf: 'button[type="submit"]', text: { de: 'Gerät suchen und freigeben', en: 'Find and approve the device' } },
    ],
  },
  { datei: 'printers', pfad: '/printers' },
  {
    datei: 'printers-workflows',
    pfad: '/printers',
    routen: schreibschutz,
    async vorbereiten(seite) {
      await seite.getByRole('tab', { name: /Bon-Workflows|Print Workflows/i }).first().click()
        .catch(() => seite.getByText(/^(Bon-Workflows|Print Workflows)$/).first().click());
      await seite.waitForTimeout(900);
    },
    hinweise: [
      { auf: '.app-card >> nth=0 >> .app-card__head', text: { de: 'Jede Bon-Art einzeln einschalten: Küchenbon, Bestellbon, Kassenbon', en: 'Switch on each receipt type: kitchen, order and sales receipt' } },
      { auf: '.app-card >> nth=0 >> select >> nth=0', text: { de: 'Fester Drucker oder die Routing-Kette über die Standorte', en: 'A fixed printer or the routing chain via the stations' } },
      { auf: '.app-card >> nth=0 >> select >> nth=1', text: { de: 'Vorlage für diese Bon-Art', en: 'Template for this receipt type' } },
    ],
  },

  // --- Team & Einstellungen ---
  { datei: 'members', pfad: '/members' },
  { datei: 'settings', pfad: '/settings' },
  // Rabatt-Bons und Pfand-Typen nachgestellt (siehe listeNachstellen).
  { datei: 'discounts', pfad: '/discounts', routen: listeNachstellen('**/discount-vouchers', BEISPIEL_RABATTE) },
  {
    datei: 'pfand',
    pfad: '/pfand',
    routen: listeNachstellen('**/pfand-types', BEISPIEL_PFAND),
    hinweise: [
      {
        auf: ['.app-card__head button:has-text("Einstellungen"), .app-card__head button:has-text("Settings")', '.app-card__head button:has-text("Pfand-Typ"), .app-card__head button:has-text("deposit type")'],
        text: { de: '„Einstellungen“: wann Pfand berechnet wird; daneben neuen Pfand-Typ anlegen', en: '“Settings”: when deposit is charged; next to it, create a deposit type' },
      },
    ],
  },
  // --- Dialoge: dieselbe Seite, einmal mit geöffnetem Formular ---
  {
    datei: 'pfand-settings',
    pfad: '/pfand',
    routen: listeNachstellen('**/pfand-types', BEISPIEL_PFAND),
    async vorbereiten(seite) {
      await seite.locator('.app-card__head').getByRole('button', { name: /^(Einstellungen|Settings)$/ }).click();
      await seite.waitForTimeout(800);
    },
  },
  { datei: 'products-dialog', routen: schreibschutz, pfad: '/products', vorbereiten: dialogOeffnen },
  { datei: 'discounts-dialog', routen: schreibschutz, pfad: '/discounts', vorbereiten: dialogOeffnen },
  { datei: 'members-dialog', routen: schreibschutz, pfad: '/members', vorbereiten: dialogOeffnen },
  { datei: 'pfand-dialog', routen: schreibschutz, pfad: '/pfand', vorbereiten: dialogOeffnen },
  { datei: 'stations-dialog', routen: schreibschutz, pfad: '/production-stations', vorbereiten: dialogOeffnen },
  // --- Registrierung: eigener Ablauf, deshalb Schritt für Schritt ---
  {
    datei: 'reg-step1',
    pfad: '/register',
    ohneAnmeldung: true,
    hinweise: [
      { auf: '.wizard__progress', text: { de: 'Vier Schritte: Konto, Person, Organisation, Bestätigung', en: 'Four steps: account, you, organization, confirmation' } },
      { auf: '.wizard__body .auth-fields > :nth-child(1)', text: { de: 'E-Mail-Adresse', en: 'Email address' } },
      { auf: '.wizard__body .auth-fields > :nth-child(2)', text: { de: 'Passwort ist freiwillig — ohne meldest du dich per Link an', en: 'A password is optional — without one you sign in by link' } },
    ],
  },
  {
    datei: 'reg-step2',
    pfad: '/register',
    ohneAnmeldung: true,
    vorbereiten: (seite, { sprache }) => registrierungBis(seite, sprache, 2),
  },
  {
    datei: 'reg-step3',
    pfad: '/register',
    ohneAnmeldung: true,
    vorbereiten: (seite, { sprache }) => registrierungBis(seite, sprache, 3),
  },
  {
    datei: 'reg-step4-confirm',
    pfad: '/register',
    ohneAnmeldung: true,
    vorbereiten: (seite, { sprache }) => registrierungBis(seite, sprache, 4),
  },
  /* Nach dem Absenden: Die Anfrage wird nachgestellt — ein echter POST
     legte auf Staging ein Konto an. Die Seite wertet nur aus, dass die
     Antwort erfolgreich ist; Form wie RegisterResponse im Web-Code. */
  {
    datei: 'reg-after-submit',
    pfad: '/register',
    ohneAnmeldung: true,
    async routen(seite) {
      await schreibschutz(seite);
      await seite.route('**/auth/register', (route) =>
        route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify({
            data: {
              user: { id: 'doku', email: REGISTRIERUNG.email, firstName: 'Erika', lastName: 'Beispiel', emailVerified: false },
              requiresEmailVerification: true,
              message: 'Registrierung erfolgreich',
            },
          }),
        }),
      );
    },
    async vorbereiten(seite, { sprache }) {
      await registrierungBis(seite, sprache, 4);
      await seite.locator('button[type="submit"]').click();
      await seite.waitForTimeout(1000);
    },
  },

  // --- Reiter innerhalb einer Seite ---
  {
    datei: 'settings-organisation',
    pfad: '/settings',
    async vorbereiten(seite) {
      await seite.getByRole('tab', { name: /organi[sz]ation/i }).first().click().catch(() => {});
      await seite.getByRole('button', { name: /^Organi[sz]ation$/i }).first().click().catch(() => {});
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
    // Die Anordnung wird gespeichert, sobald man etwas ändert — nur öffnen.
    routen: schreibschutz,
    async vorbereiten(seite) {
      await ohneBestandHinweis(seite);
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
    /* Seit „Tische“ ist die Seitenleiste länger als das Bild: den Eintrag
       der aktiven Integration in Sicht scrollen, sonst läge Marke 2 auf
       dem Kontomenü darunter. */
    async vorbereiten(seite) {
      await seite.locator('.app-sidebar__item--nested').first().scrollIntoViewIfNeeded().catch(() => {});
    },
    hinweise: [
      { auf: '.integration-card__open >> nth=0', text: { de: 'Integration antippen: Beschreibung, Bilder, Aktivieren', en: 'Tap an integration: description, pictures, activate' } },
      { auf: 'a.app-sidebar__item--nested, .app-sidebar__item--nested', text: { de: 'Aktive Integration in der Seitenleiste', en: 'Active integration in the sidebar' } },
      { auf: '.integration-card:has-text("Cloud-TSE"), .integration-card:has-text("Cloud TSE")', text: { de: 'Cloud-TSE: „Bald verfügbar“', en: 'Cloud TSE: “Coming soon”' } },
    ],
  },
  {
    datei: 'integrations-sumup-info',
    pfad: '/integrations',
    async vorbereiten(seite) {
      await seite.locator('.integration-card__open', { hasText: 'SumUp' }).first().click();
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

  // --- Schichtpläne ---
  /* Voraussetzung auf Staging: der Plan „Helfer Sommerfest 2026“ mit den
     Arbeiten Getränkestand, Grill und Kasse, je zwei Schichten am
     12.09.2026 und vier ausgedachten Anmeldungen (…@example.com), siehe
     README. Dialoge werden nur ausgefüllt, nie abgeschickt. */
  { datei: 'shifts', pfad: '/shifts' },
  { datei: 'shifts-dialog', pfad: '/shifts', routen: schreibschutz, vorbereiten: dialogOeffnen },
  {
    datei: 'shift-detail',
    pfad: '/shifts',
    vorbereiten: (seite) => schichtplanOeffnen(seite),
    hinweise: [
      {
        auf: ['button:has-text("Link kopieren"), button:has-text("Copy Link"), button:has-text("PDF Export")', 'button:has-text("Plan schließen"), button:has-text("Close plan"), button:has-text("Veröffentlichen"), button:has-text("Publish")'],
        text: { de: 'Link kopieren, PDF Export, Plan schließen (im Entwurf: Veröffentlichen)', en: 'Copy link, PDF export, close plan (as a draft: Publish)' },
      },
      {
        auf: ['button:has-text("Schicht-Generator"), button:has-text("Shift generator")', 'button:has-text("Arbeit hinzufügen"), button:has-text("Add Job")'],
        text: { de: 'Schicht-Generator für alle Arbeiten und Arbeit hinzufügen', en: 'Shift generator for all jobs and add job' } },
      { auf: '[aria-label="Schicht hinzufügen"], [aria-label="Add Shift"]', text: { de: 'Einzelne Schicht zu einer Arbeit hinzufügen', en: 'Add a single shift to a job' } },
    ],
  },
  {
    datei: 'shift-work-dialog',
    pfad: '/shifts',
    routen: schreibschutz,
    async vorbereiten(seite, { sprache }) {
      await schichtplanOeffnen(seite);
      await seite.locator('button:has-text("Arbeit hinzufügen"), button:has-text("Add Job")').first().click();
      await seite.waitForTimeout(600);
      const dialog = seite.locator('.modal__box');
      await dialog.locator('textarea').nth(0).fill(sprache === 'en' ? 'Set-up\nTear-down' : 'Aufbau\nAbbau');
      await dialog.locator('textarea').nth(1).fill(sprache === 'en' ? 'Tents, benches and tables.' : 'Zelt, Bänke und Tische.');
      await dialog.locator('input[type="number"]').fill('4');
      await seite.locator('.modal__title').click();
      await seite.waitForTimeout(300);
    },
  },
  {
    datei: 'shift-generator',
    pfad: '/shifts',
    routen: schreibschutz,
    async vorbereiten(seite) {
      await schichtplanOeffnen(seite);
      await seite.locator('button[title="Schicht-Generator für alle Arbeiten"], button[title="Shift generator for all jobs"]').click();
      await seite.waitForTimeout(600);
      const datum = seite.locator('input[type="date"]');
      await datum.nth(0).fill('2026-09-13');
      await datum.nth(1).fill('2026-09-13');
      await seite.getByRole('button', { name: /^(Weiter|Next)/ }).click();
      await seite.waitForTimeout(400);
      const zeit = seite.locator('input[type="time"]');
      await zeit.nth(0).fill('11:00');
      await zeit.nth(1).fill('19:00');
      await seite.getByRole('button', { name: /^(Weiter|Next)/ }).click();
      await seite.waitForTimeout(400);
      await seite.locator('input[type="number"]').first().fill('2');
      await seite.getByRole('button', { name: /Vorschau erstellen|Generate preview/i }).click();
      await seite.waitForTimeout(600);
    },
  },
  {
    datei: 'shift-settings',
    pfad: '/shifts',
    async vorbereiten(seite) {
      await schichtplanOeffnen(seite, 'settings');
      await seite.locator('.app-card, section').filter({ hasText: /Öffentlicher Link|Public link/ }).last()
        .evaluate((el) => el.scrollIntoView({ block: 'start' }));
      await seite.waitForTimeout(400);
    },
    hinweise: [
      { auf: '.app-card:has-text("/s/") .app-card__body', text: { de: 'Öffentlicher Link mit „Link kopieren“ und „Vorschau“', en: 'Public link with “Copy link” and “Preview”' } },
      { auf: '.app-card:has(input[type="number"]) .app-card__body', text: { de: 'Wie sich Helfer eintragen: Bestätigung, mehrere Schichten, Erinnerungen', en: 'How helpers sign up: approval, multiple shifts, reminders' } },
    ],
  },
  { datei: 'shift-anmeldungen', pfad: '/shifts', vorbereiten: (seite) => schichtplanOeffnen(seite, 'registrations') },

  // --- Öffentliche Helferseite (ohne Konto) ---
  { datei: 'public-helper', pfad: HELFERSEITE, ohneAnmeldung: true },
  {
    datei: 'public-select',
    pfad: HELFERSEITE,
    ohneAnmeldung: true,
    routen: schreibschutz,
    async vorbereiten(seite) {
      await schichtenWaehlen(seite);
    },
    hinweise: [
      { auf: '.shifts-public-wrap section.shifts-public__card >> nth=0', text: { de: 'Schichten antippen; überlappende werden gesperrt', en: 'Tap shifts; overlapping ones are locked' } },
      { auf: '.shifts-public__continue-pill', text: { de: 'Anzahl der gewählten Schichten, weiter zu den Daten', en: 'Number of selected shifts, on to your details' } },
    ],
  },
  {
    datei: 'public-contact',
    pfad: HELFERSEITE,
    ohneAnmeldung: true,
    routen: schreibschutz,
    async vorbereiten(seite, { sprache }) {
      await schichtenWaehlen(seite);
      await seite.locator('.shifts-public__continue-pill-action').click();
      await seite.waitForTimeout(600);
      await seite.locator('form input').first().fill('Erika Beispiel');
      await seite.locator('form input[type="email"]').fill('erika.beispiel@example.com');
      await seite.locator('.shifts-public__card-title').first().click();
      await seite.waitForTimeout(300);
    },
  },

  // --- Tische ---
  /* Der Tischplan "Zelt A" (A01–A12) auf Staging ist gestaltet und wird
     von Kasse und Handbuch gebraucht: alle Tisch-Aufnahmen laufen mit
     Schreibschutz, Dialoge werden nur ausgefuellt, nie abgeschickt. */
  {
    datei: 'tables',
    pfad: '/tables',
    routen: schreibschutz,
    hinweise: [
      { auf: '.tables-areas', text: { de: 'Bereiche als Reiter, daneben „Bereich hinzufügen“', en: 'Areas as tabs, next to them “Add area”' } },
      {
        auf: ['.tables-toolbar__group >> nth=0', '.tables-toolbar__group >> nth=2'],
        text: { de: 'Werkzeuge: Tisch, Runder Tisch, Serie, Deko; Wand, Zone, Raumform; Raster und Einrasten', en: 'Tools: table, round table, series, decor; wall, zone, room shape; grid and snap' },
      },
      { auf: '.tables-floor', text: { de: 'Der Tischplan des Bereichs', en: 'The floor plan of the area' } },
      {
        auf: ['.tables-toolbar__status', '.tables-toolbar .oe-segment, .tables-toolbar [role="radiogroup"]'],
        text: { de: 'Speicherstatus und Umschalter Karte / Liste', en: 'Save status and map / list switch' },
      },
    ],
  },
  {
    datei: 'tables-editor',
    pfad: '/tables',
    routen: schreibschutz,
    async vorbereiten(seite) {
      // Nur anklicken: die Auswahl allein speichert nichts.
      await seite.locator('.oe-floor__table[aria-label*="A06"]').first().click();
      await seite.waitForTimeout(800);
    },
    hinweise: [
      { auf: '.tables-toolbar__group >> nth=1', text: { de: 'Zeichnen: Wand (Linienzug), Zone, Raumform', en: 'Draw: wall (line), zone, room shape' } },
      { auf: '.oe-floor__table[aria-pressed="true"]', text: { de: 'Ausgewählter Tisch, Griff unten rechts ändert die Größe', en: 'Selected table, the handle bottom right resizes it' } },
      { auf: '.tables-inspector', text: { de: 'Eigenschaften des Tisches', en: 'Properties of the table' } },
    ],
  },
  {
    datei: 'tables-list',
    pfad: '/tables',
    routen: schreibschutz,
    async vorbereiten(seite) {
      await seite.locator('.tables-toolbar').getByText(/^(Liste|List)$/).first().click();
      await seite.waitForTimeout(800);
    },
  },
  {
    datei: 'tables-bulk',
    pfad: '/tables',
    routen: schreibschutz,
    async vorbereiten(seite) {
      await seite.getByRole('button', { name: /Serie anlegen|Create series/ }).first().click();
      await seite.waitForTimeout(600);
      const feld = (name) => seite.locator('.tables-modal__form').getByLabel(name, { exact: true });
      await feld(/^(Präfix|Prefix)$/).fill('C');
      await feld(/^Start$/).fill('1');
      await feld(/^(Anzahl|Count)$/).fill('8');
      await feld(/^(Stellen|Digits)$/).fill('2');
      await feld(/^(Plätze|Seats)$/).fill('6');
      // Fokus aus dem Feld nehmen, sonst steht es hervorgehoben im Bild.
      await seite.locator('.modal__head h2, .modal__head').first().click();
      await seite.waitForTimeout(400);
    },
    hinweise: [
      {
        auf: ['.tables-modal__form .tables-grid-2 >> nth=0', '.tables-modal__form .tables-grid-3 >> nth=0'],
        text: { de: 'Bereich, Präfix, Start, Anzahl und Stellen ergeben die Bezeichnungen', en: 'Area, prefix, start, count and digits make up the labels' },
      },
      { auf: '.tables-modal__form .tables-grid-3 >> nth=1', text: { de: 'Plätze, Spalten auf der Karte und Form gelten für die ganze Serie', en: 'Seats, columns on the map and shape apply to the whole series' } },
      { auf: '.tables-bulk__preview', text: { de: 'Vorschau: C01 bis C08', en: 'Preview: C01 to C08' } },
    ],
  },
  {
    datei: 'tables-phone',
    pfad: '/tables',
    routen: schreibschutz,
    ansicht: { breite: 390, hoehe: 844 },
    /* Am Telefon gibt es nur die Liste; darunter der Hinweis und der
       Tischplan zum Ansehen. Dorthin scrollen, das letzte Listenende
       bleibt oben im Bild. */
    async vorbereiten(seite) {
      await seite.locator('.tables-preview').evaluate((el) => {
        el.scrollIntoView({ block: 'start' });
        window.scrollBy(0, -140);
        el.closest('main')?.scrollBy?.(0, -140);
      });
      await seite.waitForTimeout(500);
    },
  },

  // --- Tische in Veranstaltung und Gerät ---
  /* Dialog der bestehenden Veranstaltung: nur öffnen und hinscrollen,
     nicht speichern (Schreibschutz). */
  {
    datei: 'events-dialog-tables',
    pfad: '/events',
    routen: schreibschutz,
    async vorbereiten(seite) {
      // Die laufende Veranstaltung (Staging: Sommerfest, lokal: Martinimarkt).
      const lokal = seite.locator('tr', { hasText: 'Martinimarkt' });
      const zeile = (await lokal.count()) ? lokal.first() : seite.locator('tr', { hasText: 'Sommerfest' }).first();
      await zeile.getByRole('button', { name: /^(Bearbeiten|Edit)$/ }).click();
      await seite.waitForTimeout(1200);
      await seite.locator('.event-tables').evaluate((el) => el.scrollIntoView({ block: 'center' }));
      await seite.waitForTimeout(400);
    },
    hinweise: [
      { auf: '.modal__body label.auth-field:has(select:has(option[value="tab"]))', text: { de: 'Kassiermodus: „Sofort kassieren“ oder „Auf Deckel buchen“', en: 'Checkout mode: “Pay immediately” or “Run a tab”' } },
      { auf: '.modal__body label.auth-field:has(select:has(option[value="predefined"]))', text: { de: 'Tische: keine, frei eingeben oder vordefiniert', en: 'Tables: none, free entry or predefined' } },
      { auf: '.event-tables', text: { de: 'Bereiche für diese Veranstaltung, darunter „Tische verwalten“', en: 'Areas for this event, below them “Manage tables”' } },
    ],
  },
  {
    datei: 'device-settings',
    pfad: '/devices',
    routen: schreibschutz,
    async vorbereiten(seite) {
      await geraetEinstellungen(seite);
      /* Tische gibt es nur im Betrieb „Bedienung“; nur anwählen, nicht
         speichern. Die Tischwahl wird für das Bild auf „Karte“ gestellt. */
      await seite.locator('input[name="serviceMode"][value="table"]').check();
      await seite.locator('.device-settings__dependent select').nth(1).selectOption('map').catch(() => {});
      await seite.locator('.app-card:has(input[name="serviceMode"])').evaluate((el) => el.scrollIntoView({ block: 'start' }));
      await seite.evaluate(() => window.scrollBy(0, -16));
      await seite.waitForTimeout(400);
    },
    hinweise: [
      { auf: ['input[name="serviceMode"][value="table"]', 'label:has(input[name="serviceMode"][value="counter"])'], text: { de: 'Betrieb: Bedienung oder Feste Kasse', en: 'Operation: table service or counter' } },
      { auf: '.device-settings__dependent select >> nth=0', text: { de: 'Tische: Standardbereich, den die Kasse zuerst zeigt', en: 'Tables: default area the POS shows first' } },
      { auf: '.device-settings__dependent select >> nth=1', text: { de: 'Tischwahl an der Kasse: Automatisch, Nummer, Liste oder Karte', en: 'Table selection on the POS: automatic, number, list or map' } },
      { auf: '.app-card:has(input[name="waiterMode"]) .app-card__head', text: { de: 'Bedienung & Sicherheit: wer an der Kasse bucht, Sperre, Stornieren', en: 'Servers & security: who books at the till, lock, refunds' } },
    ],
  },
  {
    datei: 'device-settings-waiters',
    pfad: '/devices',
    routen: schreibschutz,
    async vorbereiten(seite) {
      await geraetEinstellungen(seite);
      await karteOben(seite, '.app-card:has(input[name="waiterMode"])');
    },
    hinweise: [
      { auf: ['label:has(input[name="waiterMode"][value="off"])', 'label:has(input[name="waiterMode"][value="personal"])'], text: { de: 'Ohne Bedienung, Gemeinsame Kasse (PIN) oder Feste Bedienung', en: 'No servers, shared till (PIN) or fixed server' } },
      { auf: '.app-card:has(input[name="waiterMode"]) select', text: { de: 'Sperre: automatisch nach einer Zeit ohne Berührung', en: 'Lock: automatically after a time without touch' } },
      { auf: ['label:has(input[name="refundPermission"][value="allowed"])', 'label:has(input[name="refundPermission"][value="disabled"])'], text: { de: 'Stornieren & Erstatten: erlaubt, nur mit PIN oder aus', en: 'Cancel & refund: allowed, PIN only or off' } },
    ],
  },
  // --- Seit 1.8: Bedienungen, Kassenbuch, Auswertung, Export ---
  {
    datei: 'waiters',
    pfad: '/waiters',
    hinweise: [
      { auf: ['button:has-text("Mehrere anlegen"), button:has-text("Add several")', 'button:has-text("Bedienung anlegen"), button:has-text("Add server")'], text: { de: 'Einzeln anlegen oder eine ganze Namensliste', en: 'Add one at a time or a whole list of names' } },
      { auf: 'table tbody tr >> nth=0 >> td >> nth=-1', text: { de: 'Abrechnen, Bearbeiten, Neue PIN, Deaktivieren, Auskunft, Löschen', en: 'Settle, edit, new PIN, deactivate, data export, delete' } },
    ],
  },
  {
    datei: 'waiters-bulk',
    pfad: '/waiters',
    routen: schreibschutz,
    async vorbereiten(seite, { sprache }) {
      await seite.getByRole('button', { name: /^(Mehrere anlegen|Add several)$/ }).click();
      await seite.waitForTimeout(600);
      await seite.locator('[role=dialog] textarea').first().fill(sprache === 'en'
        ? 'Lisa Graf;Lisa\nBen Krämer\nPaul Neumann;Paul;Shift lead'
        : 'Lisa Graf;Lisa\nBen Krämer\nPaul Neumann;Paul;Schichtleitung');
      await seite.locator('[role=dialog] h2').first().click();
      await seite.waitForTimeout(400);
    },
  },
  /* PIN-Zettel nach dem Anlegen: Die Antwort auf das Anlegen stellt die
     Aufnahme selbst (nichts wird gespeichert, die PINs sind ausgedacht). */
  {
    datei: 'waiters-pin-sheet',
    pfad: '/waiters',
    async routen(seite) {
      await schreibschutz(seite);
      await seite.route('**/waiters/bulk', async (route) => {
        const { items = [] } = route.request().postDataJSON() ?? {};
        const pins = ['3817', '6094', '2758'];
        const farben = ['#0891b2', '#ca8a04', '#4f46e5'];
        await route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify({
            data: items.map((it, i) => ({
              id: `doku-bedienung-${i}`, name: it.name, shortName: it.shortName ?? null, color: farben[i % 3],
              role: it.role ?? 'service', permissions: {}, effectivePermissions: { refund: false, cashDrawer: false, discount: false, cashbook: false },
              eventId: null, isActive: true, hasPin: true, pinLength: 4, lastUsedAt: null, anonymizedAt: null, createdAt: new Date().toISOString(),
              pin: pins[i % 3],
            })),
          }),
        });
      });
    },
    async vorbereiten(seite, { sprache }) {
      await seite.getByRole('button', { name: /^(Mehrere anlegen|Add several)$/ }).click();
      await seite.waitForTimeout(600);
      await seite.locator('[role=dialog] textarea').first().fill(sprache === 'en'
        ? 'Lisa Graf;Lisa\nBen Krämer\nPaul Neumann;Paul;Shift lead'
        : 'Lisa Graf;Lisa\nBen Krämer\nPaul Neumann;Paul;Schichtleitung');
      await seite.waitForTimeout(300);
      await seite.locator('[role=dialog] button[type=submit], [role=dialog] button:has-text("anlegen"), [role=dialog] button:has-text("Add 3")').last().click();
      await seite.waitForTimeout(1200);
    },
  },
  {
    datei: 'waiters-settlements',
    pfad: '/waiters',
    async vorbereiten(seite) {
      await karteOben(seite, karte('Abrechnungen', 'Settlements'));
    },
  },
  {
    datei: 'cashbook',
    pfad: '/cashbook',
    hinweise: [
      { auf: '.app-card:has(input[type="date"])', text: { de: 'Geschäftstag wählen (6 bis 6 Uhr)', en: 'Pick the business day (6 am to 6 am)' } },
      { auf: '.app-card:has(.oe-num), .app-card >> nth=1', text: { de: 'Soll-Bestand der ganzen Kasse und woraus er sich ergibt', en: 'Expected cash of the whole register and how it adds up' } },
      { auf: karte('Buchen für die ganze Kasse', 'Book for the whole register'), text: { de: 'Anfangsbestand, Einlage, Entnahme, Kassensturz', en: 'Opening balance, cash in, cash out, cash count' } },
      { auf: karte('Je Gerät', 'Per device'), text: { de: 'Soll-Bestand je Gerät', en: 'Expected cash per device' } },
    ],
  },
  {
    datei: 'reports-vat',
    pfad: '/reports',
    async vorbereiten(seite) {
      await karteOben(seite, karte('Umsatzsteuer', 'VAT'));
    },
    hinweise: [
      { auf: karte('Umsatzsteuer', 'VAT'), text: { de: 'Umsatzsteuer je Satz: Ware, Pfand und Pfandrückgabe', en: 'VAT per rate: goods, deposit and deposit returns' } },
    ],
  },
  {
    datei: 'reports-waiters',
    pfad: '/reports',
    async vorbereiten(seite) {
      await karteOben(seite, karte('Bedienungen', 'Servers'));
    },
    hinweise: [
      { auf: karte('Bedienungen', 'Servers'), text: { de: 'Je Bedienung: aufgenommen, kassiert, bar und Karte, Pfand, Abrechnungen', en: 'Per server: taken, collected, cash and card, deposit, settlements' } },
    ],
  },
  {
    datei: 'orders-export',
    pfad: '/orders',
    routen: schreibschutz,
    async vorbereiten(seite) {
      await seite.getByRole('button', { name: /^(Als CSV exportieren|Export as CSV)$/ }).first().click();
      await seite.waitForTimeout(600);
    },
    hinweise: [
      { auf: 'input[type="date"] >> nth=0', text: { de: 'Zeitraum: Von und Bis gelten für Liste und Kacheln', en: 'Date range: from and to apply to the list and the tiles' } },
      { auf: '.oe-dd.is-open .oe-dd__panel', text: { de: 'Export: eine Zeile je Bestellung oder je Position', en: 'Export: one row per order or per item' } },
    ],
  },

  // --- Seit 1.8: Einstellungen der Organisation ---
  {
    datei: 'settings-operating-mode',
    pfad: '/settings?tab=org-mode',
    hinweise: [
      { auf: ['label:has(input[type="radio"][value="orders_only"])', 'label:has(input[type="radio"][value="full"])'], text: { de: 'Die drei Betriebsarten; „Alle Funktionen“ in Deutschland nur mit Cloud-TSE', en: 'The three operating modes; “All features” in Germany only with Cloud TSE' } },
    ],
  },
  {
    datei: 'settings-webhooks',
    pfad: '/settings?tab=org-webhooks',
    hinweise: [
      { auf: 'button:has-text("Webhook anlegen"), button:has-text("Create webhook")', text: { de: 'Neuen Webhook anlegen (bis zu zehn)', en: 'Create a webhook (up to ten)' } },
      { auf: 'table tbody tr >> nth=0 >> td >> nth=-1', text: { de: 'Zustellungen ansehen, Test senden, Bearbeiten, Secret erneuern, Löschen', en: 'View deliveries, send test, edit, rotate secret, delete' } },
    ],
  },
  {
    datei: 'settings-webhook-form',
    pfad: '/settings?tab=org-webhooks',
    routen: schreibschutz,
    async vorbereiten(seite) {
      await seite.getByRole('button', { name: /^(Webhook anlegen|Create webhook)$/ }).first().click();
      await seite.waitForTimeout(700);
      await seite.locator('[role=dialog] input[type="url"], [role=dialog] input').first().fill('https://verwaltung.tsv-musterstadt.example/openeos/webhook');
      await seite.locator('[role=dialog] h2').first().click();
      await seite.waitForTimeout(300);
    },
  },
  {
    datei: 'settings-webhook-deliveries',
    pfad: '/settings?tab=org-webhooks',
    async vorbereiten(seite) {
      await seite.locator('a[aria-label*="/openeos/webhook"][aria-label^="Zustellungen"], a[aria-label*="/openeos/webhook"][aria-label^="View deliveries"]').first().click();
      await seite.waitForURL(/\/settings\/webhooks\//);
      await seite.waitForLoadState('networkidle');
      await seite.waitForTimeout(600);
    },
  },
  {
    datei: 'settings-access',
    pfad: '/settings?tab=org-access',
    hinweise: [
      { auf: 'button:has-text("Zugang anlegen"), button:has-text("Create access token")', text: { de: 'Neuen Zugang anlegen', en: 'Create an access token' } },
      { auf: 'table', text: { de: 'Name, Schlüsselanfang, Berechtigungen, Ablauf; Widerrufen rechts', en: 'Name, key prefix, permissions, expiry; revoke on the right' } },
    ],
  },
  {
    datei: 'settings-access-dialog',
    pfad: '/settings?tab=org-access',
    routen: schreibschutz,
    async vorbereiten(seite, { sprache }) {
      await seite.getByRole('button', { name: /^(Zugang anlegen|Create access token)$/ }).first().click();
      await seite.waitForTimeout(700);
      await seite.locator('[role=dialog] input[type="text"], [role=dialog] input:not([type])').first().fill(sprache === 'en' ? 'Menu import agent' : 'KI-Agent Speisekarte');
      await seite.locator('[role=dialog] h2').first().click();
      await seite.waitForTimeout(300);
    },
  },
  { datei: 'settings-legal-info', pfad: '/settings?tab=org-legal' },
  {
    datei: 'settings-account',
    pfad: '/settings?tab=account',
    async vorbereiten(seite) {
      await karteOben(seite, karte('Konto löschen', 'Delete account'), 160);
    },
    hinweise: [
      { auf: karte('Konto löschen', 'Delete account'), text: { de: 'Konto löschen: 30 Tage Frist, bis dahin abbrechen', en: 'Delete account: 30 days, cancel any time until then' } },
    ],
  },
  {
    datei: 'settings-organisation-delete',
    pfad: '/settings?tab=org-general',
    routen: schreibschutz,
    async vorbereiten(seite) {
      await seite.getByRole('button', { name: /^(Organisation löschen|Delete organi[sz]ation)/ }).first().click();
      await seite.waitForTimeout(700);
    },
  },
  { datei: 'legal', pfad: '/legal' },
  {
    datei: 'support',
    pfad: '/support',
    hinweise: [
      { auf: '.oe-banner, [role=status]', text: { de: 'Notfall-Support: Rufnummer bei gebuchter Veranstaltung', en: 'Emergency support: phone number with a booked event' } },
    ],
  },
  {
    datei: 'events-checkout',
    pfad: '/events',
    /* Die Pflichtangaben speichert die Aufnahme nicht: die Antwort auf
       „Speichern und weiter“ stellt sie selbst. */
    async routen(seite) {
      await schreibschutz(seite);
      await seite.route('**/purchase-master-data', (route) => {
        if (route.request().method() !== 'PUT') return route.fallback();
        return route.fulfill({
          contentType: 'application/json',
          body: JSON.stringify({ data: { values: route.request().postDataJSON(), missing: [], missingWithTse: [], country: 'DE' } }),
        });
      });
    },
    async vorbereiten(seite) {
      // Nur bis zur Zusammenfassung, nie „Kostenpflichtig buchen“.
      await seite.locator('tr', { hasText: /Jugendturnier|Youth tournament/ }).getByRole('button', { name: /^(Aktivieren|Activate)$/ }).click();
      await seite.waitForTimeout(1200);
      await seite.getByRole('button', { name: /^(Weiter|Next|Continue)$/ }).click().catch(() => {});
      await seite.waitForTimeout(1000);
      await seite.getByRole('button', { name: /^(Speichern und weiter|Save and continue)$/ }).click().catch(() => {});
      await seite.waitForTimeout(1200);
    },
    hinweise: [
      { auf: '.purchase-summary', text: { de: 'Zusammenfassung: Termine, Tage, Preis, AGB', en: 'Summary: dates, days, price, terms' } },
      { auf: '.modal__panel button:has-text("Kostenpflichtig buchen"), .modal__panel button:has-text("Book with obligation to pay")', text: { de: 'Erst hier wird gebucht', en: 'Only this books' } },
    ],
  },
  {
    datei: 'printers-template-waiter',
    pfad: '/printers',
    routen: schreibschutz,
    async vorbereiten(seite) {
      await seite.getByRole('tab', { name: /^(Vorlagen|Templates)$/ }).first().click()
        .catch(() => seite.getByText(/^(Vorlagen|Templates)$/).first().click());
      await seite.waitForTimeout(900);
      const element = seite.locator('[aria-roledescription=draggable]:has(> span:text-is("Bedienung")), [aria-roledescription=draggable]:has(> span:text-is("Waiter"))').first();
      await element.scrollIntoViewIfNeeded();
      await element.click();
      await seite.waitForTimeout(800);
      await element.evaluate((el) => el.scrollIntoView({ block: 'center' }));
      await seite.waitForTimeout(300);
    },
    hinweise: [
      { auf: ['[aria-roledescription=draggable]:has(> span:text-is("Bedienung")), [aria-roledescription=draggable]:has(> span:text-is("Waiter"))', '[aria-roledescription=draggable]:has(> span:text-is("Gerät")), [aria-roledescription=draggable]:has(> span:text-is("Device"))'], text: { de: 'Neu in der Gruppe Bestellung: Bedienung und Gerät', en: 'New in the order group: server and device' } },
    ],
  },
  // --- Assistent (lokal mit Ersatzmodell, siehe README) ---
  { datei: 'settings-assistant', pfad: '/settings?tab=org-assistant' },
  {
    datei: 'products-menu-import-upload',
    pfad: '/products',
    async routen(seite) {
      await schreibschutz(seite);
      /* Stand des Assistenten nachgestellt: eingeschaltet, Kontingent frei,
         PDFs lesbar (wie gehostet; dem lokalen Stack fehlt poppler). */
      await seite.route('**/organizations/*/assistant', (route) => {
        if (route.request().method() !== 'GET') return route.fallback();
        const morgen = new Date(Date.now() + 86400000).toISOString();
        return route.fulfill({
          contentType: 'application/json',
          headers: {
            'access-control-allow-origin': route.request().headers().origin ?? '*',
            'access-control-allow-credentials': 'true',
          },
          body: JSON.stringify({ data: {
            enabled: true, available: true, pdfSupported: true,
            quotas: {
              menuImports: { limit: 5, used: 0, remaining: 5, resetAt: morgen },
              classifications: { limit: 500, used: 0, remaining: 500, resetAt: morgen },
            },
          } }),
        });
      });
    },
    async vorbereiten(seite) {
      await seite.getByRole('button', { name: /^(Importieren|Import)$/ }).click();
      await seite.waitForTimeout(800);
      await seite.locator('[role=dialog]').getByRole('tab', { name: /^(Speisekarte|Menu)$/ }).click();
      await seite.locator('[role=dialog]').getByRole('button', { name: /^(Fotos|Photos)/ }).first().click();
      await seite.waitForTimeout(300);
      await seite.locator('[role=dialog] input[type=file][accept*="image"]').first().setInputFiles({ name: 'speisekarte-martinimarkt.png', mimeType: 'image/png', buffer: PNG_1X1 });
      await seite.waitForTimeout(600);
    },
  },
  {
    datei: 'products-menu-import-preview',
    pfad: '/products',
    nurLokal: true,
    async vorbereiten(seite) {
      await seite.getByRole('button', { name: /^(Importieren|Import)$/ }).click();
      await seite.waitForTimeout(800);
      await seite.locator('[role=dialog]').getByRole('tab', { name: /^(Speisekarte|Menu)$/ }).click();
      await seite.locator('[role=dialog]').getByRole('button', { name: /^Text$/ }).click();
      await seite.locator('[role=dialog] textarea').first().fill(SPEISEKARTE);
      await seite.locator('[role=dialog]').getByRole('button', { name: /^(Auswerten|Read menu)$/ }).click();
      await seite.locator('[role=dialog] table').first().waitFor({ timeout: 30000 });
      await seite.waitForTimeout(1500);
    },
  },
  {
    datei: 'product-icon-suggestion',
    pfad: '/products',
    nurLokal: true,
    async routen(seite) { await schreibschutz(seite); await seite.route('**/assistant/icon-suggestions', (route) => route.continue()); },
    async vorbereiten(seite, { sprache }) {
      await seite.getByRole('button', { name: /^(Produkt erstellen|Create product)$/ }).first().click();
      await seite.waitForTimeout(800);
      await seite.locator('input[name="name"]:visible').first().fill(sprache === 'en' ? 'Currywurst with fries' : 'Currywurst mit Pommes');
      await seite.getByRole('button', { name: /^(Vorschlag|Suggest)$/ }).click();
      await seite.waitForTimeout(2500);
    },
  },
  {
    datei: 'products-icon-picker',
    pfad: '/products',
    routen: schreibschutz,
    async vorbereiten(seite) {
      await seite.getByRole('button', { name: /^(Bearbeiten|Edit)$/ }).first().click();
      await seite.waitForTimeout(1000);
      await seite.getByRole('button', { name: /Produkt-Icon (wählen|ändern)|(Choose|Change) product icon/i }).first().click();
      await seite.waitForTimeout(800);
    },
  },
];


/* Geräteansichten (Kasse, Anzeigen) stehen mit ihren nachgestellten Daten
   in screenshots.kasse.mjs. */
export { GERAETE_AUFNAHMEN } from './screenshots.kasse.mjs';
