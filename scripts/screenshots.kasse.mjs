/**
 * Kassenbilder: belebte Kasse ohne echte Bestellungen.
 *
 * Auf Staging läuft die Veranstaltung im Testmodus, und der erlaubt nur
 * 25 Bestellungen. Ein Bild mit offenen Tischen, gesendeten Positionen
 * und einem Abschluss würde jedes Mal welche verbrauchen. Deshalb liest
 * die Kasse Tischplan, Tische und Geräte echt von Staging, während
 * Sortiment, Tischstatus, offene Bestellungen und alle Schreibanfragen
 * (Bestellung, Zahlung, PIN) hier nachgestellt werden. Was nicht
 * nachgestellt ist und schreiben will, bricht der Schreibschutz im
 * Skript ab.
 *
 * Sortiment und Namen gibt es in beiden Sprachen, damit die englischen
 * Bilder nicht wie eine deutsche Kasse mit englischen Knöpfen aussehen.
 */

export const TOKEN_KASSE = 'dev_089dad7496ce4eddb84e489cab81ff7e';
const KAT_GETRAENKE = 'b954460c-1b5b-4a38-901f-704bdeaf5fd8';
const KAT_SPEISEN = 'cbca10f9-b9e0-405a-bf56-4da938616940';
const BECHER = 'pfd_doku_becher';

const json = (route, data, status = 200) =>
  route.fulfill({
    status,
    contentType: 'application/json',
    headers: { 'access-control-allow-origin': 'https://app.staging.openeos.de', 'access-control-allow-credentials': 'true' },
    body: JSON.stringify({ data }),
  });

const vor = (minuten) => new Date(Date.now() - minuten * 60000).toISOString();

const TEXTE = {
  de: {
    geraet: 'Kasse 3',
    getraenke: 'Getränke',
    speisen: 'Speisen',
    becher: 'Becherpfand',
    bediener: { firstName: 'Anna', lastName: 'Becker' },
    bons: [['Helfergetränk', 'fixed', 4.5], ['Freier Rabatt', 'manual', null]],
  },
  en: {
    geraet: 'Till 3',
    getraenke: 'Drinks',
    speisen: 'Food',
    becher: 'Cup deposit',
    bediener: { firstName: 'Anna', lastName: 'Baker' },
    bons: [['Helper drink', 'fixed', 4.5], ['Open discount', 'manual', null]],
  },
};

/* [id, Kategorie, de, en, Zeile 2 de, Zeile 2 en, Preis, POS-Icon, Favorit, Extras]
   POS-Icon: Produktbild aus @openeos/pos-icons; null = Icon der Kategorie
   (für Kaffee, Kuchen und Eis gibt es kein Produktbild). */
const SORTIMENT = [
  ['pils', KAT_GETRAENKE, 'Pils', 'Lager', '0,5 l', '0.5 l', 4.5, 'pils', true, { becher: true }],
  ['radler', KAT_GETRAENKE, 'Radler', 'Shandy', '0,5 l', '0.5 l', 4.0, 'radler', false, { becher: true }],
  ['schorle', KAT_GETRAENKE, 'Apfelschorle', 'Apple spritzer', '0,5 l', '0.5 l', 3.5, 'apfelschorle', true, { becher: true }],
  ['cola', KAT_GETRAENKE, 'Cola', 'Cola', '0,33 l', '0.33 l', 3.0, 'cola', false, {}],
  ['wasser', KAT_GETRAENKE, 'Wasser', 'Water', '0,5 l', '0.5 l', 2.5, 'wasser', false, {}],
  ['wein', KAT_GETRAENKE, 'Weinschorle', 'Wine spritzer', '0,25 l', '0.25 l', 4.0, 'weinschorle', false, { becher: true }],
  ['kaffee', KAT_GETRAENKE, 'Kaffee', 'Coffee', 'Tasse', 'Cup', 2.5, null, false, {}],
  ['bratwurst', KAT_SPEISEN, 'Bratwurst', 'Bratwurst', 'im Brötchen', 'in a bun', 4.0, 'grillwurst-brot', true, { optionen: 'wurst' }],
  ['currywurst', KAT_SPEISEN, 'Currywurst', 'Currywurst', 'mit Soße', 'with sauce', 4.5, 'currywurst', false, { optionen: 'beilage' }],
  ['pommes', KAT_SPEISEN, 'Pommes', 'Fries', 'Portion', 'Portion', 3.5, 'pommes', true, { optionen: 'sosse' }],
  ['steak', KAT_SPEISEN, 'Steak im Weck', 'Steak sandwich', 'Schweinenacken', 'Pork neck', 6.5, 'steak-brot', false, { optionen: 'zutaten' }],
  ['kuchen', KAT_SPEISEN, 'Kuchen', 'Cake', 'Stück', 'Slice', 3.0, null, false, { bestand: 3 }],
  ['eis', KAT_SPEISEN, 'Eis', 'Ice cream', 'Kugel', 'Scoop', 2.0, null, false, {}],
];

const OPTIONEN = {
  de: {
    wurst: [
      { name: 'Soße', type: 'multiple', required: false, options: [{ name: 'Senf', priceModifier: 0 }, { name: 'Ketchup', priceModifier: 0 }, { name: 'Currysoße', priceModifier: 0.5 }] },
      { name: 'Beilage', type: 'single', required: false, options: [{ name: 'Pommes', priceModifier: 2 }, { name: 'Kartoffelsalat', priceModifier: 2 }] },
    ],
    beilage: [{ name: 'Beilage', type: 'single', required: true, options: [{ name: 'Brötchen', priceModifier: 0 }, { name: 'Pommes', priceModifier: 2 }] }],
    sosse: [{ name: 'Soße', type: 'multiple', required: false, options: [{ name: 'Ketchup', priceModifier: 0 }, { name: 'Mayo', priceModifier: 0 }, { name: 'Aioli', priceModifier: 0.5 }] }],
    zutaten: [{ name: 'Zutaten', type: 'ingredients', required: false, options: [{ name: 'Zwiebeln', priceModifier: 0, default: true }, { name: 'Senf', priceModifier: 0, default: true }] }],
  },
  en: {
    wurst: [
      { name: 'Sauce', type: 'multiple', required: false, options: [{ name: 'Mustard', priceModifier: 0 }, { name: 'Ketchup', priceModifier: 0 }, { name: 'Curry sauce', priceModifier: 0.5 }] },
      { name: 'Side', type: 'single', required: false, options: [{ name: 'Fries', priceModifier: 2 }, { name: 'Potato salad', priceModifier: 2 }] },
    ],
    beilage: [{ name: 'Side', type: 'single', required: true, options: [{ name: 'Bun', priceModifier: 0 }, { name: 'Fries', priceModifier: 2 }] }],
    sosse: [{ name: 'Sauce', type: 'multiple', required: false, options: [{ name: 'Ketchup', priceModifier: 0 }, { name: 'Mayo', priceModifier: 0 }, { name: 'Aioli', priceModifier: 0.5 }] }],
    zutaten: [{ name: 'Ingredients', type: 'ingredients', required: false, options: [{ name: 'Onions', priceModifier: 0, default: true }, { name: 'Mustard', priceModifier: 0, default: true }] }],
  },
};

function becherTyp(sprache) {
  return { id: BECHER, organizationId: 'doku', name: TEXTE[sprache].becher, amount: 2, isActive: true, sortOrder: 0, createdAt: vor(9999), updatedAt: vor(9999) };
}

function produkte(sprache, eventId) {
  return SORTIMENT.map(([id, kat, de, en, z2de, z2en, preis, icon, fav, extra], i) => ({
    id: `prd_${id}`,
    createdAt: vor(9999),
    updatedAt: vor(9999),
    deletedAt: null,
    eventId,
    categoryId: kat,
    name: sprache === 'de' ? de : en,
    description: sprache === 'de' ? z2de : z2en,
    price: preis.toFixed(2),
    taxRate: 0,
    imageUrl: null,
    icon: icon ? `pos-icon:${icon}` : null,
    isFavorite: fav,
    isActive: true,
    isAvailable: true,
    trackInventory: !!extra.bestand,
    stockQuantity: extra.bestand ?? 0,
    stockUnit: 'Stück',
    options: { groups: extra.optionen ? OPTIONEN[sprache][extra.optionen] : [] },
    printSettings: null,
    sortOrder: i,
    productionStationId: null,
    pfandTypeId: extra.becher ? BECHER : null,
    pfandType: extra.becher ? becherTyp(sprache) : null,
  }));
}

function produktName(sprache, id) {
  const p = SORTIMENT.find((s) => s[0] === id);
  return sprache === 'de' ? p[2] : p[3];
}

/** Eine offene (gesendete) Bestellung eines Tisches. */
function bestellung(sprache, eventId, tisch, nummer, minuten, positionen) {
  const items = positionen.map(([id, menge, status], i) => {
    const p = SORTIMENT.find((s) => s[0] === id);
    const pfand = p[9].becher ? 2 : 0;
    return {
      id: `itm_${tisch}_${nummer}_${i}`,
      orderId: `ord_${tisch}_${nummer}`,
      productId: `prd_${id}`,
      categoryId: p[1],
      productName: produktName(sprache, id),
      categoryName: p[1] === KAT_GETRAENKE ? TEXTE[sprache].getraenke : TEXTE[sprache].speisen,
      quantity: menge,
      unitPrice: p[6],
      optionsPrice: 0,
      taxRate: 0,
      totalPrice: p[6] * menge,
      options: {},
      status,
      notes: null,
      kitchenNotes: null,
      paidQuantity: 0,
      pfandTypeId: pfand ? BECHER : null,
      depositAmount: pfand,
      isRefill: false,
      preparedAt: null,
      readyAt: status === 'ready' ? vor(2) : null,
      deliveredAt: status === 'delivered' ? vor(minuten - 3) : null,
      sortOrder: i,
      createdAt: vor(minuten),
      updatedAt: vor(minuten),
    };
  });
  const subtotal = items.reduce((s, it) => s + it.totalPrice, 0);
  const pfand = items.reduce((s, it) => s + it.depositAmount * it.quantity, 0);
  return {
    id: `ord_${tisch}_${nummer}`,
    organizationId: 'doku',
    eventId,
    orderNumber: `20260912-0${nummer}`,
    dailyNumber: nummer,
    tableNumber: tisch,
    customerName: null,
    customerPhone: null,
    status: 'in_progress',
    paymentStatus: 'unpaid',
    source: 'pos',
    fulfillmentType: 'table_service',
    subtotal,
    taxTotal: 0,
    total: subtotal + pfand,
    paidAmount: 0,
    tipAmount: 0,
    discountAmount: 0,
    discountReason: null,
    pfandTotal: pfand,
    notes: null,
    priority: 'normal',
    estimatedReadyAt: null,
    readyAt: null,
    completedAt: null,
    cancelledAt: null,
    cancellationReason: null,
    createdByUserId: null,
    createdByDeviceId: null,
    onlineSessionId: null,
    createdAt: vor(minuten),
    updatedAt: vor(minuten),
    items,
  };
}

/** Offene Tische für Startansicht, Liste und Karte. */
function tischStatus() {
  const eintrag = (label, status, waitReason, openAmount, orderCount, minuten) => ({
    key: label,
    tableId: null,
    label,
    areaId: null,
    status,
    waitReason,
    openAmount,
    itemCount: 3,
    orderIds: Array.from({ length: orderCount }, (_, i) => `ord_${label}_${i}`),
    waitingSince: status === 'wait' ? vor(minuten) : null,
    lastActivityAt: vor(minuten),
  });
  return [
    eintrag('A07', 'wait', 'guest', 15.5, 1, 4),
    eintrag('A10', 'wait', 'ready', 20.5, 1, 7),
    eintrag('A03', 'busy', null, 18.5, 2, 3),
    eintrag('A06', 'busy', null, 31.0, 1, 12),
    eintrag('A11', 'busy', null, 9.0, 1, 20),
  ];
}

/** Gesendete Bestellung an A10: Getränke serviert, Essen fertig zum Servieren. */
function offeneBestellungen(sprache, eventId, tisch) {
  if (tisch !== 'A10') return [];
  return [bestellung(sprache, eventId, 'A10', 412, 7, [['pils', 2, 'delivered'], ['bratwurst', 1, 'ready'], ['pommes', 1, 'ready']])];
}

/**
 * Alle Abfangregeln der Kasse.
 *
 * modus: Kassiermodus der Veranstaltung (`tab` zeigt „Senden“).
 * pin: Gerät mit PIN — dann zeigt der Kopf den Bediener mit Schloss.
 * karte: SumUp-Leser zugewiesen.
 */
export function kassenRouten({ modus = 'tab', pin = false, karte = false, leer = false } = {}) {
  return async (seite, { sprache }) => {
    const t = TEXTE[sprache];
    let eventId = null;
    let nummer = 418;

    await seite.route(/\/api\/(device-api|devices)\//, async (route) => {
      const anfrage = route.request();
      const url = new URL(anfrage.url());
      const pfad = url.pathname.replace(/^\/api/, '');
      const methode = anfrage.method();
      if (methode === 'OPTIONS') return route.fallback();

      if (methode === 'GET') {
        if (pfad === '/devices/status' || pfad === '/devices/me') {
          const antwort = await route.fetch();
          const daten = await antwort.json();
          const d = daten.data;
          d.name = t.geraet;
          d.settings = {
            ...(d.settings ?? {}),
            serviceMode: 'table',
            requirePin: pin,
            defaultPrinterId: 'prn_doku',
            ...(karte ? { sumupReaderId: 'rdr_doku' } : {}),
          };
          return route.fulfill({ response: antwort, json: daten });
        }
        if (pfad === '/device-api/status') {
          return json(route, { printer: { id: 'prn_doku', name: sprache === 'de' ? 'Theke' : 'Bar', isOnline: true, lastSeenAt: vor(0) }, tse: null });
        }
        if (pfad === '/device-api/organization') {
          const antwort = await route.fetch();
          const daten = await antwort.json();
          daten.data.settings = { ...(daten.data.settings ?? {}), pfand: { tableService: true, counterPickup: true } };
          return route.fulfill({ response: antwort, json: daten });
        }
        if (pfad === '/device-api/events') {
          const antwort = await route.fetch();
          const daten = await antwort.json();
          for (const e of daten.data) {
            eventId = e.id;
            // Ohne Testmodus-Hinweise: so sieht die Kasse am Festtag aus.
            e.status = 'active';
            e.settings = { ...(e.settings ?? {}), orderingMode: modus };
          }
          return route.fulfill({ response: antwort, json: daten });
        }
        const produkteTreffer = pfad.match(/^\/device-api\/events\/([^/]+)\/products$/);
        if (produkteTreffer) return json(route, produkte(sprache, produkteTreffer[1]));
        const kategorienTreffer = pfad.match(/^\/device-api\/events\/([^/]+)\/categories$/);
        if (kategorienTreffer) {
          const antwort = await route.fetch();
          const daten = await antwort.json();
          for (const k of daten.data) {
            if (k.id === KAT_GETRAENKE) Object.assign(k, { name: t.getraenke, icon: 'oe:soda' });
            if (k.id === KAT_SPEISEN) Object.assign(k, { name: t.speisen, icon: 'oe:utensils' });
          }
          return route.fulfill({ response: antwort, json: daten });
        }
        if (pfad === '/device-api/discount-vouchers') {
          return json(route, t.bons.map(([name, type, amount], i) => ({
            id: `dv_doku_${i}`, organizationId: 'doku', name, description: null, type, amount, isActive: true,
            allowMultiplePerOrder: type === 'fixed', sortOrder: i, createdAt: vor(9999), updatedAt: vor(9999),
          })));
        }
        if (pfad === '/device-api/pfand-types') return json(route, [becherTyp(sprache)]);
        if (pfad === '/device-api/tables/status') return json(route, leer ? [] : tischStatus());
        if (pfad === '/device-api/orders/open') {
          const tisch = url.searchParams.get('tableKey');
          return json(route, leer ? [] : offeneBestellungen(sprache, eventId ?? url.searchParams.get('eventId'), tisch));
        }
        return route.fallback();
      }

      // Schreiben: nur nachgestellt, nie an Staging.
      if (pfad === '/device-api/verify-pin') {
        return json(route, { userId: 'usr_doku', ...t.bediener, role: 'member' });
      }
      if (pfad === '/device-api/orders') {
        nummer += 1;
        return json(route, { id: `ord_neu_${nummer}`, orderNumber: `20260912-0${nummer}`, dailyNumber: nummer, items: [] }, 201);
      }
      if (pfad === '/device-api/payments/batch') {
        return json(route, { orders: [], payments: [], totalPaid: 0, change: 0 }, 201);
      }
      if (/^\/device-api\/(payments|cash-drawer\/open|tables\/acknowledge|order-items\/deliver|sumup\/terminate)$/.test(pfad)) {
        return json(route, {}, 201);
      }
      return route.fallback();
    });
  };
}

/** Ein Tisch, der beim Laden schon offen ist (Bestellansicht). */
export const TISCH_A10 = { kind: 'table', key: 'A10', label: 'A10' };

/**
 * Produktkachel antippen; liegt sie nicht in der gewählten Kategorie,
 * vorher die Kategorie wählen. Mit Optionen das Blatt gleich übernehmen.
 */
export async function antippen(seite, sprache, id, { uebernehmen = true } = {}) {
  const eintrag = SORTIMENT.find((s) => s[0] === id);
  const kachel = seite.locator('.oe-tile--product', { hasText: produktName(sprache, id) }).first();
  if (!(await kachel.isVisible().catch(() => false))) {
    const kategorie = eintrag[1] === KAT_GETRAENKE ? TEXTE[sprache].getraenke : TEXTE[sprache].speisen;
    await seite.locator('.pos-order__rail').getByRole('button', { name: new RegExp(kategorie) }).first().click();
    await seite.waitForTimeout(400);
  }
  await kachel.click();
  await seite.waitForTimeout(350);
  const blatt = seite.locator('[role=dialog][aria-modal=true]');
  if (uebernehmen && (await blatt.count())) {
    await blatt.last().getByRole('button', { name: /^(Hinzufügen|Add)/ }).click();
    await seite.waitForTimeout(300);
  }
}

/** PIN-Bildschirm mit der (nachgestellten) PIN 1234 überspringen. */
export async function pinEingeben(seite) {
  for (const ziffer of [...'1234', 'Enter']) {
    await seite.keyboard.press(ziffer);
    await seite.waitForTimeout(80);
  }
  await seite.waitForTimeout(1200);
}

export { produktName };

const KASSE = { pfad: '/device/pos', token: TOKEN_KASSE, geraeteklasse: 'pos' };

const blatt = (seite) => seite.locator('[role=dialog][aria-modal=true]').last();

/** Bestellansicht an A10 mit Bediener, gesendeten und neuen Positionen. */
async function tischMitWarenkorb(seite, { sprache }) {
  await pinEingeben(seite);
  await antippen(seite, sprache, 'radler');
  await antippen(seite, sprache, 'radler');
  await antippen(seite, sprache, 'schorle');
}

/** Geräteansichten: kein Konto, sondern ein Gerätetoken im Speicher. */
export const GERAETE_AUFNAHMEN = [
  // --- Kasse: Startansicht in drei Varianten ---
  {
    ...KASSE,
    datei: 'pos-start',
    startansicht: 'number',
    routen: kassenRouten(),
    async vorbereiten(seite) {
      await seite.keyboard.press('5');
    },
    hinweise: [
      { auf: '.pos-head__ctx', text: { de: 'Kasse, Standardbereich und Veranstaltung', en: 'Till, default area and event' } },
      { auf: '.pos-head__stat', text: { de: 'Verbindung, Drucker und Uhrzeit', en: 'Connection, printer and time' } },
      { auf: '.pos-start__mode', text: { de: 'Tischwahl: Nummer, Tische oder Karte', en: 'Choose a table by number, list or map' } },
      { auf: '.pos-start__pad', text: { de: 'Nummer eintippen und Tisch öffnen', en: 'Type the number and open the table' } },
      { auf: '.pos-without', text: { de: 'Ohne Tisch: Theke oder To-go', en: 'Without a table: counter or to-go' } },
      { auf: '.pos-open', text: { de: 'Offene Tische mit Betrag und Wartegrund', en: 'Open tables with amount and waiting reason' } },
    ],
  },
  {
    ...KASSE,
    datei: 'pos-tables',
    startansicht: 'list',
    routen: kassenRouten(),
    hinweise: [
      { auf: '.pos-tablelist__area', text: { de: 'Tische des Bereichs mit Status und Betrag', en: 'Tables of the area with status and amount' } },
      { auf: '.oe-legend', text: { de: 'Legende: frei, offen, wartet auf Bedienung', en: 'Legend: free, open, waiting for service' } },
    ],
  },
  {
    ...KASSE,
    datei: 'pos-floor',
    startansicht: 'map',
    routen: kassenRouten(),
    hinweise: [
      /* Marke innen: darüber stünde sie auf dem Untertitel „Tisch auf der Karte antippen“. */
      { auf: '.pos-floor .oe-floor, .oe-floor', marke: 'innen', text: { de: 'Tischplan aus der Verwaltung, Farben nach Status', en: 'Floor plan from the admin area, colored by status' } },
      { auf: '.oe-floor__table.oe-floor__table--wait, .oe-floor__table[class*=wait]', text: { de: 'Wartet auf Bedienung: Gastbestellung oder fertiges Essen', en: 'Waiting for service: guest order or food ready' } },
    ],
  },
  // --- Kasse: Bestellen, Optionen, Kassieren, Abschluss ---
  {
    ...KASSE,
    datei: 'pos-order',
    tisch: TISCH_A10,
    routen: kassenRouten({ pin: true }),
    vorbereiten: tischMitWarenkorb,
    hinweise: [
      { auf: '.pos-tablepill', text: { de: 'Offener Tisch, antippen zum Wechseln', en: 'Open table, tap to switch' } },
      { auf: '.pos-head__user', text: { de: 'Angemeldet per PIN, Schloss sperrt die Kasse', en: 'Signed in with PIN, the lock locks the till' } },
      { auf: '.pos-order__rail', text: { de: 'Favoriten und Kategorien', en: 'Favorites and categories' } },
      { auf: '.pos-search', text: { de: 'Suche über alle Artikel', en: 'Search all items' } },
      { auf: '.pos-gridwrap', text: { de: 'Artikel antippen; Zeichen unten rechts: Optionen, Pfand', en: 'Tap an item; marks bottom right: options, deposit' } },
      { auf: '.pos-ready', text: { de: 'Fertig zum Servieren, nach dem Bringen „Serviert“', en: 'Ready to serve, tap “Served” once delivered' } },
      { auf: '.pos-cart__acts', text: { de: 'Senden an Küche und Theke, Kassieren', en: 'Send to kitchen and bar, check out' } },
    ],
  },
  {
    ...KASSE,
    datei: 'pos-options',
    tisch: TISCH_A10,
    routen: kassenRouten(),
    async vorbereiten(seite, { sprache }) {
      await antippen(seite, sprache, 'bratwurst', { uebernehmen: false });
      const b = blatt(seite);
      await b.getByRole('button', { name: sprache === 'de' ? /^Senf/ : /^Mustard/ }).first().click();
      await b.getByRole('button', { name: sprache === 'de' ? /^Pommes/ : /^Fries/ }).first().click();
      await b.locator('input, textarea').last().fill(sprache === 'de' ? 'gut durch' : 'well done');
      await seite.waitForTimeout(300);
    },
  },
  {
    ...KASSE,
    datei: 'pos-pay',
    tisch: TISCH_A10,
    routen: kassenRouten(),
    async vorbereiten(seite, { sprache }) {
      await antippen(seite, sprache, 'radler');
      await antippen(seite, sprache, 'radler');
      await seite.getByRole('button', { name: /^(Kassieren|Check out)$/ }).click();
      await seite.waitForTimeout(700);
      await blatt(seite).locator('.pos-quick button').last().click();
      await seite.waitForTimeout(300);
    },
    hinweise: [
      { auf: '.oe-due', text: { de: 'Zu zahlen: offene Bestellungen und neue Artikel, inkl. Pfand', en: 'Amount due: open orders and new items, deposit included' } },
      { auf: '.pos-pay__l .oe-choices, .pos-pay__l [role=radiogroup]', text: { de: 'Zahlart: Bar, Karte, Rabatt', en: 'Payment method: cash, card, discount' } },
      { auf: '.oe-given', text: { de: 'Gegeben und Rückgeld', en: 'Given and change' } },
      { auf: '.pos-quick', text: { de: 'Schnellwahl: Passend und runde Beträge', en: 'Quick amounts: exact and round sums' } },
      { auf: '.pos-pay__split', text: { de: 'Rechnung teilen', en: 'Split the bill' } },
    ],
  },
  {
    ...KASSE,
    datei: 'pos-done',
    tisch: TISCH_A10,
    routen: kassenRouten(),
    async vorbereiten(seite, { sprache }) {
      await antippen(seite, sprache, 'radler');
      await antippen(seite, sprache, 'radler');
      await seite.getByRole('button', { name: /^(Kassieren|Check out)$/ }).click();
      await seite.waitForTimeout(700);
      await blatt(seite).locator('.pos-quick button').last().click();
      await blatt(seite).getByRole('button', { name: /Zahlung abschließen|Complete payment/ }).click();
      await seite.waitForTimeout(1200);
    },
  },
  {
    ...KASSE,
    datei: 'pos-card',
    tisch: TISCH_A10,
    routen: kassenRouten({ karte: true }),
    async vorbereiten(seite, { sprache }) {
      await antippen(seite, sprache, 'radler');
      await seite.getByRole('button', { name: /^(Kassieren|Check out)$/ }).click();
      await seite.waitForTimeout(700);
      await blatt(seite).getByRole('radio', { name: /Karte|Card/ }).or(blatt(seite).getByRole('button', { name: /^(Karte|Card)/ })).first().click();
      await seite.waitForTimeout(500);
    },
    hinweise: [
      { auf: '.pos-pay__l [aria-checked=true], .pos-pay__l .is-active, .pos-pay__l [aria-pressed=true]', text: { de: 'Kartenzahlung über SumUp', en: 'Card payment via SumUp' } },
      { auf: '.pos-pay__r', text: { de: 'Trinkgeld wählen, dann Zahlung am Terminal starten', en: 'Pick a tip, then start the payment on the reader' } },
    ],
  },
  {
    ...KASSE,
    datei: 'pos-switch',
    tisch: TISCH_A10,
    routen: kassenRouten(),
    async vorbereiten(seite, { sprache }) {
      await antippen(seite, sprache, 'cola');
      await seite.locator('.pos-tablepill').click();
      await seite.waitForTimeout(700);
      const liste = blatt(seite).getByRole('button', { name: /^(Tische|Tables)$/ });
      if (await liste.count()) await liste.first().click();
      await seite.waitForTimeout(400);
    },
  },
  {
    ...KASSE,
    datei: 'pos-phone',
    tisch: TISCH_A10,
    ansicht: { breite: 390, hoehe: 844, skala: 2, mobil: true },
    routen: kassenRouten(),
    async vorbereiten(seite, { sprache }) {
      await antippen(seite, sprache, 'radler');
      await antippen(seite, sprache, 'schorle');
      await seite.waitForTimeout(2500); // Hinweis „im Warenkorb“ abwarten
    },
  },

  // --- Anzeigen ---
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
    token: TOKEN_KASSE,
    geraeteklasse: 'pos',
    einstellungen: { serviceMode: 'station' },
  },
  /* `device-pair` wird nicht aufgenommen: Die Kopplungsseite legt beim
     Laden ein wartendes Gerät auf Staging an. Das Bild bleibt, bis es
     dafür eine nachgestellte Fassung gibt. */
];
