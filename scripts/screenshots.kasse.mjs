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

/* Gerätetoken der Testkasse auf Staging; im lokalen Stack der Token der
   Kasse „Kasse Zelt A“ (DOKU_KASSE_TOKEN, siehe README). */
export const TOKEN_KASSE = process.env.DOKU_KASSE_TOKEN ?? 'dev_089dad7496ce4eddb84e489cab81ff7e';
/* Kasse, an der sich Bedienungen anmelden (Gerätemodus „Gemeinsame Kasse“
   auf dem Server). Auf Staging dieselbe Testkasse. */
const TOKEN_BEDIENUNG = process.env.DOKU_BEDIENUNG_TOKEN ?? TOKEN_KASSE;
const TOKEN_KUNDENANZEIGE = process.env.DOKU_ANZEIGE_TOKEN ?? 'dev_853d4d669dfd4afeb82f8f4e0b967a57';
/* Kategorien werden ganz nachgestellt (eigene IDs), damit die Kasse
   genau Getränke und Speisen zeigt, egal was in der Organisation liegt. */
const KAT_GETRAENKE = 'kat_doku_getraenke';
const KAT_SPEISEN = 'kat_doku_speisen';
const LOKAL = !!process.env.LOKALER_STACK;

/* route.fetch() läuft nicht durch den Browser, die Umleitung aus
   LOKALER_STACK (--host-resolver-rules) gilt dort nicht: die Adresse
   selbst umschreiben, sonst landet die Anfrage beim echten Server. */
const UMLEITUNGEN = [...(process.env.LOKALER_STACK ?? '').matchAll(/MAP\s+(\S+)\s+(\S+)/g)].map(([, host, ziel]) => [host, ziel]);
function abrufen(route) {
  const url = new URL(route.request().url());
  const treffer = UMLEITUNGEN.find(([host]) => host === url.hostname);
  if (!treffer) return route.fetch();
  url.host = treffer[1];
  return route.fetch({ url: url.toString() });
}
const BECHER = 'pfd_doku_becher';

/* Herkunft der Anfrage zurückgeben: Staging oder eine lokale Oberfläche. */
const cors = (route) => ({
  'access-control-allow-origin': route.request().headers().origin ?? 'https://app.staging.openeos.de',
  'access-control-allow-credentials': 'true',
  'access-control-allow-headers': '*',
  'access-control-allow-methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
});

const json = (route, data, status = 200) =>
  route.fulfill({
    status,
    contentType: 'application/json',
    headers: cors(route),
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
 * tischwahl: Geräteeinstellung „Tischwahl an der Kasse“ (`number`, `list`,
 *   `map`); seit 1.6 gibt es an der Kasse keinen Umschalter mehr.
 */
export function kassenRouten({ modus = 'tab', pin = false, karte = false, leer = false, tischwahl = null } = {}) {
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
          const antwort = await abrufen(route);
          if (!antwort.ok()) return route.fulfill({ response: antwort });
          const daten = await antwort.json();
          const d = daten.data;
          d.name = t.geraet;
          d.settings = {
            ...(d.settings ?? {}),
            serviceMode: 'table',
            requirePin: false,
            /* Mit „pin“: gemeinsame Kasse, an der sich Bedienungen per PIN
               anmelden (seit 1.8 statt „PIN verlangen“). */
            waiterMode: pin ? 'shared' : 'off',
            waiterTiles: pin,
            autoLockSeconds: pin ? 120 : 0,
            defaultPrinterId: 'prn_doku',
            ...(karte ? { sumupReaderId: 'rdr_doku' } : {}),
            ...(tischwahl ? { tableSelectView: tischwahl } : {}),
          };
          return route.fulfill({ response: antwort, json: daten });
        }
        if (pfad === '/device-api/status') {
          return json(route, { printer: { id: 'prn_doku', name: sprache === 'de' ? 'Theke' : 'Bar', isOnline: true, lastSeenAt: vor(0) }, tse: null });
        }
        if (pfad === '/device-api/organization') {
          const antwort = await abrufen(route);
          if (!antwort.ok()) return route.fulfill({ response: antwort });
          const daten = await antwort.json();
          daten.data.settings = { ...(daten.data.settings ?? {}), pfand: { tableService: true, counterPickup: true } };
          return route.fulfill({ response: antwort, json: daten });
        }
        if (pfad === '/device-api/events') {
          const antwort = await abrufen(route);
          if (!antwort.ok()) return route.fulfill({ response: antwort });
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
          const kat = (id, name, icon, color, sortOrder) => ({
            id, eventId: kategorienTreffer[1], name, icon, color, sortOrder, isActive: true, parentId: null,
            description: null, printSettings: null, productionStationId: null, createdAt: vor(9999), updatedAt: vor(9999),
          });
          return json(route, [kat(KAT_GETRAENKE, t.getraenke, 'oe:soda', '#2563eb', 0), kat(KAT_SPEISEN, t.speisen, 'oe:utensils', '#dc2626', 1)]);
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
      /* Anmeldung der Bedienung: im lokalen Stack echt (PIN aus DOKU_PIN),
         damit Zwischenstand und Tische ihre echten Zahlen zeigen. */
      if (pfad === '/device-api/waiter-session') {
        if (LOKAL) return route.continue();
        return json(route, {
          token: 'doku-sitzung', sessionId: 'doku', expiresAt: new Date(Date.now() + 3600000).toISOString(), kind: 'waiter',
          waiter: { kind: 'waiter', id: 'wtr_doku', waiterId: 'wtr_doku', userId: null, name: `${t.bediener.firstName} ${t.bediener.lastName}`, shortName: t.bediener.firstName, color: '#2563eb', role: 'service', permissions: { refund: false, cashDrawer: true, discount: true, cashbook: false } },
        }, 201);
      }
      // Pfand-Rückgabe: lokal echt (Beleg „Pfandrückgabe“), sonst abgebrochen.
      if (pfad === '/device-api/pfand-returns' && LOKAL) return route.continue();
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
  for (const ziffer of [...(process.env.DOKU_PIN ?? '1234'), 'Enter']) {
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

/* ---------- Stationsanzeige ---------- */

const STATION_TEXT = {
  de: { name: 'Küche', bratwurst: '2x Bratwurst', pommes: '3x Pommes', currywurst: '1x Currywurst', ohneSenf: '1x ohne Senf', speisen: 'Speisen', kunde: 'Erika B.' },
  en: { name: 'Kitchen', bratwurst: '2x Bratwurst', pommes: '3x Fries', currywurst: '1x Currywurst', ohneSenf: '1x no mustard', speisen: 'Food', kunde: 'Erika B.' },
};

const STATION_EINSTELLUNGEN = {
  displayMode: 'station',
  stationId: 'st_doku',
  display: { theme: 'light', scale: 'normal', showLogo: true, autoClearSeconds: 0 },
};

/** Offene Bestellungen der Küche: drei an Tischen, drei zum Abholen. */
function stationsBestellungen(sprache) {
  const t = STATION_TEXT[sprache];
  const pos = (id, menge, name, minuten, kuechennotiz = null) => ({
    id, productName: name, categoryName: t.speisen, quantity: menge, status: 'pending',
    notes: null, kitchenNotes: kuechennotiz, options: {}, createdAt: vor(minuten),
  });
  const best = (nummer, minuten, extra, items) => ({
    order: {
      id: `ord_st_${nummer}`, orderNumber: `20260912-0${nummer}`, dailyNumber: nummer, tableNumber: null,
      customerName: null, priority: 'normal', createdAt: vor(minuten), fulfillmentType: 'table_service',
      source: 'pos', notes: null, ...extra,
    },
    items,
  });
  return [
    best(415, 14, { tableNumber: 'A06', priority: 'rush' }, [
      pos('itm_st_415_0', 2, produktName(sprache, 'steak'), 14),
      pos('itm_st_415_1', 1, produktName(sprache, 'pommes'), 14),
    ]),
    best(417, 6, { tableNumber: 'A03' }, [
      pos('itm_st_417_0', 2, produktName(sprache, 'bratwurst'), 6, t.ohneSenf),
      pos('itm_st_417_1', 3, produktName(sprache, 'pommes'), 6),
    ]),
    best(419, 2, { tableNumber: 'A11' }, [
      pos('itm_st_419_0', 1, produktName(sprache, 'currywurst'), 2),
      pos('itm_st_419_1', 2, produktName(sprache, 'pommes'), 2),
    ]),
    best(416, 9, { fulfillmentType: 'counter_pickup', notes: 'To-go', priority: 'high' }, [
      pos('itm_st_416_0', 1, produktName(sprache, 'steak'), 9),
    ]),
    best(418, 4, { fulfillmentType: 'counter_pickup', source: 'online', customerName: t.kunde }, [
      pos('itm_st_418_0', 2, produktName(sprache, 'pommes'), 4),
    ]),
    best(420, 1, { fulfillmentType: 'counter_pickup' }, [
      pos('itm_st_420_0', 2, produktName(sprache, 'currywurst'), 1),
    ]),
  ];
}

/**
 * Stationsanzeige: Gerätestatus mit Einstellungen der Küche, Bestellungen
 * und Fertigmeldungen nachgestellt. Wie die echte API liefert die Liste
 * nach einer Fertigmeldung nur noch Offenes.
 */
async function stationsRouten(seite, { sprache }) {
  const fertig = new Set();
  await seite.route(/\/api\/(device-api|devices)\//, async (route) => {
    const anfrage = route.request();
    const pfad = new URL(anfrage.url()).pathname.replace(/^\/api/, '');
    const methode = anfrage.method();
    if (methode === 'OPTIONS') return route.fallback();
    if (methode === 'GET' && (pfad === '/devices/status' || pfad === '/devices/me')) {
      const antwort = await abrufen(route);
      const daten = await antwort.json();
      daten.data.name = STATION_TEXT[sprache].name;
      daten.data.deviceClass = 'display';
      daten.data.settings = { ...STATION_EINSTELLUNGEN };
      return route.fulfill({ response: antwort, json: daten });
    }
    if (methode === 'GET' && pfad === '/device-api/station/items') {
      const offen = stationsBestellungen(sprache)
        .map((b) => ({ ...b, items: b.items.filter((it) => !fertig.has(it.id)) }))
        .filter((b) => b.items.length);
      return json(route, offen);
    }
    const treffer = pfad.match(/^\/device-api\/station\/items\/([^/]+)\/ready$/);
    if (methode === 'POST' && treffer) {
      fertig.add(treffer[1]);
      return json(route, { items: [{ id: treffer[1], status: 'ready', readyAt: new Date().toISOString() }] }, 201);
    }
    return route.fallback();
  });
}

/** Geräteansichten: kein Konto, sondern ein Gerätetoken im Speicher. */
export const GERAETE_AUFNAHMEN = [
  // --- Kasse: Startansicht in drei Varianten ---
  {
    ...KASSE,
    datei: 'pos-start',
    routen: kassenRouten({ tischwahl: 'number' }),
    async vorbereiten(seite) {
      await seite.keyboard.press('5');
    },
    hinweise: [
      { auf: '.pos-head__ctx', text: { de: 'Kasse, Organisation und Veranstaltung', en: 'Till, organization and event' } },
      { auf: '.pos-head__stat', text: { de: 'Verbindung, Drucker und Uhrzeit', en: 'Connection, printer and time' } },
      { auf: '.pos-start__pad', text: { de: 'Nummer eintippen und Tisch öffnen', en: 'Type the number and open the table' } },
      { auf: '.pos-without', text: { de: 'Ohne Tisch: Theke oder To-go', en: 'Without a table: counter or to-go' } },
      { auf: '.pos-open', text: { de: 'Offene Tische mit Betrag und Wartegrund', en: 'Open tables with amount and waiting reason' } },
    ],
  },
  {
    ...KASSE,
    datei: 'pos-tables',
    routen: kassenRouten({ tischwahl: 'list' }),
    hinweise: [
      { auf: '.pos-tablelist__area', marke: 'innen', text: { de: 'Tische des Bereichs mit Status und Betrag', en: 'Tables of the area with status and amount' } },
      { auf: '.oe-legend', text: { de: 'Legende: frei, offen, wartet auf Bedienung', en: 'Legend: free, open, waiting for service' } },
    ],
  },
  {
    ...KASSE,
    datei: 'pos-floor',
    routen: kassenRouten({ tischwahl: 'map' }),
    hinweise: [
      /* Marke innen: darüber stünde sie auf dem Untertitel „Tisch auf der Karte antippen“. */
      { auf: '.pos-floor .oe-floor, .oe-floor', marke: 'innen', text: { de: 'Tischplan aus der Verwaltung, Farben nach Status', en: 'Floor plan from the admin area, colored by status' } },
      { auf: '.oe-floor__table.oe-floor__table--wait, .oe-floor__table[class*=wait]', text: { de: 'Wartet auf Bedienung: Gastbestellung oder fertiges Essen', en: 'Waiting for service: guest order or food ready' } },
      { auf: '.oe-floor [class*=zone], .oe-floor [data-zone]', text: { de: 'Zonen wie Küche oder Notausgang, dazu Wände und Raumform (nicht antippbar)', en: 'Zones such as kitchen or emergency exit, plus walls and room shape (not tappable)' } },
    ],
  },
  // --- Kasse: Bestellen, Optionen, Kassieren, Abschluss ---
  {
    ...KASSE,
    datei: 'pos-order',
    token: TOKEN_BEDIENUNG,
    nurLokal: true,
    tisch: TISCH_A10,
    routen: kassenRouten({ pin: true }),
    vorbereiten: tischMitWarenkorb,
    hinweise: [
      { auf: '.pos-tablepill', text: { de: 'Offener Tisch, antippen zum Wechseln', en: 'Open table, tap to switch' } },
      { auf: '.pos-head__user', text: { de: 'Angemeldete Bedienung: Zwischenstand, Wechseln, Sperren', en: 'Signed-in server: running total, switch, lock' } },
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
    routen: kassenRouten({ tischwahl: 'list' }),
    async vorbereiten(seite, { sprache }) {
      await antippen(seite, sprache, 'cola');
      await seite.locator('.pos-tablepill').click();
      await seite.waitForTimeout(900);
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

  // --- Seit 1.8: Bedienungen, Kassenbuch, Pfand-Rückgabe, Notfall-Support ---
  /* Lokal (LOKALER_STACK): echte Anmeldung der Bedienung mit DOKU_PIN,
     echte Zahlen im Zwischenstand. */
  {
    ...KASSE,
    datei: 'pos-waiter-pin',
    token: TOKEN_BEDIENUNG,
    nurLokal: true,
    routen: kassenRouten({ pin: true }),
    hinweise: [
      { auf: '.pos-pin__tiles', text: { de: 'Namenskacheln (wenn eingeschaltet): antippen, dann PIN', en: 'Name tiles (if switched on): tap, then PIN' } },
      { auf: '.pos-pin__card', marke: 'innen', text: { de: '„Wer bedient?“: PIN eingeben', en: '“Who is serving?”: enter the PIN' } },
    ],
  },
  {
    ...KASSE,
    datei: 'pos-waiter-summary',
    token: TOKEN_BEDIENUNG,
    nurLokal: true,
    routen: kassenRouten({ pin: true }),
    async vorbereiten(seite) {
      await pinEingeben(seite);
      await seite.locator('.pos-head__user button').first().click();
      await seite.waitForTimeout(400);
      await seite.getByRole('menuitem', { name: /^(Mein Zwischenstand|My running total)$/ }).click();
      await seite.waitForTimeout(1500);
    },
  },
  {
    ...KASSE,
    datei: 'pos-cashbook',
    nurLokal: true,
    routen: kassenRouten(),
    async vorbereiten(seite) {
      await seite.locator('.pos-more button').first().click();
      await seite.waitForTimeout(400);
      await seite.getByRole('menuitem', { name: /^(Kassenbuch|Cash book)$/ }).click();
      await seite.waitForTimeout(1500);
    },
  },
  {
    ...KASSE,
    datei: 'pos-pfand-return',
    nurLokal: true,
    routen: kassenRouten(),
    async vorbereiten(seite) {
      await seite.locator('.pos-more button').first().click();
      await seite.waitForTimeout(400);
      await seite.getByRole('menuitem', { name: /^(Pfand-Rückgabe|Deposit return)$/ }).click();
      await seite.waitForTimeout(800);
      const plus = seite.getByRole('button', { name: /^(Menge erhöhen|Increase quantity)$/ }).first();
      for (let i = 0; i < 3; i++) await plus.click();
      await seite.waitForTimeout(400);
    },
  },
  {
    ...KASSE,
    datei: 'pos-emergency',
    routen: kassenRouten(),
    async vorbereiten(seite) {
      await seite.locator('.pos-more button').first().click();
      await seite.waitForTimeout(400);
      await seite.getByRole('menuitem', { name: /^(Notfall-Support|Emergency support)$/ }).click();
      await seite.waitForTimeout(1000);
    },
  },
  // --- Anzeigen ---
  {
    datei: 'display-customer',
    pfad: '/device/customer',
    token: TOKEN_KUNDENANZEIGE,
    geraeteklasse: 'display',
    einstellungen: { displayMode: 'customer' },
  },
  /* Stationsanzeige „Küche“ mit nachgestellten Bestellungen: zwei
     Positionen werden fertig gemeldet (nachgestellt), damit das Bild die
     Rückmeldung zeigt — eine Karte grün „Erledigt“, eine Position
     abgehakt. */
  {
    datei: 'display-station',
    pfad: '/device/station',
    token: TOKEN_KASSE,
    geraeteklasse: 'display',
    einstellungen: STATION_EINSTELLUNGEN,
    routen: stationsRouten,
    async vorbereiten(seite, { sprache }) {
      // Positionen sind eindeutig benannt („3x Pommes“ gibt es nur an A03).
      const fertig = (position) =>
        seite.getByRole('button', { name: `${position}: ${sprache === 'de' ? 'Fertig' : 'Ready'}`, exact: true });
      await seite.waitForTimeout(800);
      await fertig(STATION_TEXT[sprache].bratwurst).click();
      await seite.waitForTimeout(500);
      await fertig(STATION_TEXT[sprache].pommes).click();
      await seite.waitForTimeout(500);
      await fertig(STATION_TEXT[sprache].currywurst).click();
      await seite.waitForTimeout(300);
    },
  },
  /* Kopplungsseite: Sie legt beim Laden ein wartendes Gerät an. Deshalb
     nur gegen eine lokale Oberfläche (`nurLokal`, APP_URL auf localhost)
     und mit nachgestellter API — keine Anfrage verlässt den Browser. */
  {
    datei: 'device-pair',
    pfad: '/device/pair?type=pos',
    ohneToken: true,
    nurLokal: true,
    async routen(seite) {
      await seite.route('**/api/**', (route) => {
        const pfad = new URL(route.request().url()).pathname;
        if (route.request().method() === 'OPTIONS') return route.fulfill({ status: 204, headers: cors(route) });
        if (pfad.endsWith('/devices/init')) {
          return json(route, { deviceId: 'doku', deviceToken: 'doku', verificationCode: '573080' }, 201);
        }
        if (pfad.endsWith('/devices/status')) return json(route, { status: 'pending', deviceId: 'doku' });
        console.warn(`    abgefangen: ${route.request().method()} ${pfad}`);
        return route.abort();
      });
    },
    async vorbereiten(seite) {
      await seite.waitForTimeout(1500);
    },
    hinweise: [
      { auf: '.display-pair__code', text: { de: 'Diese Zahl in der Verwaltung eingeben', en: 'Enter this number in the admin area' } },
      { auf: '.display-pair__qr', text: { de: 'Oder den QR-Code scannen', en: 'Or scan the QR code' } },
    ],
  },
];
