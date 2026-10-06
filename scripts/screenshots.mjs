/**
 * Nimmt die Bilder für das Handbuch auf — beide Sprachen, beschriftet.
 *
 * Warum ein Skript und keine Handarbeit: Die Oberfläche ändert sich, und
 * ein Handbuch mit Bildern von vorgestern führt in die Irre. So lässt
 * sich der ganze Satz in einem Durchlauf erneuern.
 *
 *   ZUGANG="mail:passwort" node scripts/screenshots.mjs [--nur dashboard,events] [--sprache de]
 *
 * Aufgenommen wird gegen Staging: dort stehen Testdaten, und es kann
 * nichts kaputtgehen, was einem Kunden gehört.
 *
 * Wichtig ist das Konto: Es muss zu der Organisation gehören, in der die
 * Testdaten liegen, und es sollte ein normales Administratorkonto sein.
 * Ein Super-Admin sieht zusätzliche Menüpunkte, die kein Kunde hat — und
 * ohne Daten in seiner Organisation zeigen die Seiten nur Leerzustände.
 *
 * Passt der Chromium von Playwright nicht zur installierten Version, zeigt
 * CHROMIUM_PATH auf einen vorhandenen Browser.
 */
import { chromium } from 'playwright';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdir, rm, stat } from 'node:fs/promises';
import path from 'node:path';

import { AUFNAHMEN, GERAETE_AUFNAHMEN } from './screenshots.config.mjs';

const ausfuehren = promisify(execFile);

const BASIS = process.env.APP_URL ?? 'https://app.staging.openeos.de';
const [MAIL, PASSWORT] = (process.env.ZUGANG ?? '').split(':');
const STANDARD_ANSICHT = { breite: 1440, hoehe: 1000, skala: 1 };
/* Je Lauf eine eigene Datei: zwei Läufe nebeneinander überschreiben sich sonst die Legende. */
const LEGENDE = `/tmp/legende-${process.pid}.png`;

function argument(name) {
  const i = process.argv.indexOf(name);
  return i === -1 ? null : process.argv[i + 1];
}

const nurDiese = argument('--nur') ? new Set(argument('--nur').split(',')) : null;

const SPRACHEN = [
  { code: 'de', pfad: '/de', locale: 'de-DE' },
  { code: 'en', pfad: '/en', locale: 'en-GB' },
].filter((s) => !argument('--sprache') || s.code === argument('--sprache'));

/** Text einer Marke: ein String oder `{ de, en }`. */
const textIn = (text, sprache) => (typeof text === 'string' ? text : (text[sprache] ?? text.de));

/** Beschriftung ins Bild brennen: Nummernkreis plus Rahmen am Element. */
async function beschriften(bildPfad, marken, skala) {
  if (!marken.length) return;

  const befehl = [bildPfad];
  marken.forEach((m, i) => {
    const nummer = i + 1;
    const { x, y, w, h } = m.kasten;
    // Rahmen um den Bereich
    befehl.push(
      '-stroke', '#0b7a3b', '-strokewidth', String(3 * skala), '-fill', 'none',
      '-draw', `roundrectangle ${x},${y} ${x + w},${y + h} ${8 * skala},${8 * skala}`,
    );
    /* Nummernkreis mit weissem Ring, moeglichst ausserhalb des Rahmens
       (links daneben, sonst darueber): innen verdeckte er bei kleinen
       Elementen genau den Text, um den es geht. Nur am Bildrand sitzt er
       innen an der oberen linken Ecke. */
    const r = 17 * skala;
    const [cx, cy] = x >= 2 * r + 6 * skala
      ? [x - r - 3 * skala, y + r]
      : y >= 2 * r + 6 * skala
        ? [x + r, y - r - 3 * skala]
        : [x + r, y + r];
    befehl.push(
      '-stroke', 'white', '-strokewidth', String(3 * skala), '-fill', '#0b7a3b',
      '-draw', `circle ${cx},${cy} ${cx + 15 * skala},${cy}`,
      '-stroke', 'none', '-fill', 'white',
      '-pointsize', String(21 * skala), '-font', 'DejaVu-Sans-Bold',
      '-annotate', `+${cx - 6 * skala}+${cy + 7 * skala}`, String(nummer),
    );
  });
  befehl.push(bildPfad);

  await ausfuehren('magick', befehl);
}

/** Legende unter das Bild setzen, damit die Nummern erklärt sind. */
async function legende(bildPfad, marken, breite, skala) {
  if (!marken.length) return;

  const zeilen = marken.map((m, i) => `${i + 1}  ${m.text}`).join('\n');
  const hoehe = 26 * skala * marken.length + 24 * skala;
  const rand = 18 * skala;

  /* Die Breite muss exakt stimmen: ein Splice hinterher machte die
     Legende breiter als das Bild, und das Ergebnis war 18 Pixel zu breit. */
  await ausfuehren('magick', [
    '-background', '#f4f4f5', '-fill', '#1a1a1a',
    '-font', 'DejaVu-Sans', '-pointsize', String(17 * skala),
    '-size', `${breite - 2 * rand}x${hoehe}`,
    `caption:${zeilen}`,
    '-gravity', 'NorthWest',
    '-background', '#f4f4f5', '-extent', `${breite}x${hoehe + 24 * skala}-${rand}-${12 * skala}`,
    LEGENDE,
  ]);

  await ausfuehren('magick', [bildPfad, LEGENDE, '-append', bildPfad]);
}

/**
 * Verkleinern ohne sichtbaren Verlust: Oberflächen sind flächig, 256
 * Farben ohne Dithering reichen und halbieren die Datei ungefähr.
 */
async function verdichten(bildPfad) {
  await ausfuehren('magick', [bildPfad, '-strip', '-dither', 'None', '-colors', '256', `PNG8:${bildPfad}`]);
}

async function aufnehmen(seite, eintrag, zielVerzeichnis, sprache, ansicht) {
  const ziel = path.join(zielVerzeichnis, `${eintrag.datei}.png`);

  /* Hinweisfenster (etwa "Das ist neu" nach einem Update) schliessen,
     bevor aufgenommen wird — sonst liegt es ueber jedem Bild. */
  const hinweis = seite.getByRole('button', { name: /^(Alles klar|Got it)$/ });
  if (await hinweis.isVisible().catch(() => false)) {
    await hinweis.click();
    await seite.waitForTimeout(400);
  }

  if (eintrag.vorbereiten) await eintrag.vorbereiten(seite, { sprache: sprache.code });
  await seite.waitForTimeout(1200);

  // Positionen der zu beschriftenden Elemente einsammeln, solange die
  // Seite noch steht — nach dem Auslösen ist sie nur noch ein Bild.
  const { breite, hoehe, skala } = ansicht;
  const marken = [];
  for (const hinweis of eintrag.hinweise ?? []) {
    try {
      /* `auf` darf auch eine Liste sein: dann umschliesst der Rahmen alle
         Elemente zusammen (etwa Speicherstatus und Umschalter daneben). */
      let kasten = null;
      for (const selektor of [hinweis.auf].flat()) {
        const k = await seite.locator(selektor).first().boundingBox({ timeout: 2000 });
        if (!k) continue;
        if (!kasten) { kasten = k; continue; }
        const x = Math.min(kasten.x, k.x);
        const y = Math.min(kasten.y, k.y);
        kasten = {
          x, y,
          width: Math.max(kasten.x + kasten.width, k.x + k.width) - x,
          height: Math.max(kasten.y + kasten.height, k.y + k.height) - y,
        };
      }
      if (kasten && kasten.y < hoehe) {
        /* Auf das Bild zuschneiden: ein Rahmen, der rechts oder unten
           hinauslaeuft, wird abgeschnitten und sieht aus wie ein Fehler. */
        const x = Math.max(3, Math.round(kasten.x) - 6);
        const y = Math.max(3, Math.round(kasten.y) - 6);
        const w = Math.min(breite - x - 3, Math.round(kasten.width) + 12);
        const h = Math.min(hoehe - y - 3, Math.round(kasten.height) + 12);
        marken.push({
          text: textIn(hinweis.text, sprache.code),
          kasten: { x: x * skala, y: y * skala, w: w * skala, h: h * skala },
        });
      } else {
        console.warn(`    Hinweis übersprungen (${hinweis.auf} nicht sichtbar)`);
      }
    } catch {
      console.warn(`    Hinweis übersprungen (${hinweis.auf} nicht gefunden)`);
    }
  }

  await seite.screenshot({ path: ziel });
  await beschriften(ziel, marken, skala);
  await legende(ziel, marken, breite * skala, skala);
  await verdichten(ziel);

  const groesse = Math.round((await stat(ziel)).size / 1024);
  console.log(`    ${eintrag.datei}.png ${groesse} KB${marken.length ? ` (${marken.length} Marken)` : ''}`);
}

/**
 * Schreibschutz: Geräteansichten dürfen auf Staging nichts anlegen
 * (Testbestellungen sind begrenzt). Alles ausser Lesen wird abgebrochen,
 * sofern die Aufnahme die Anfrage nicht selbst beantwortet — ihre Routen
 * werden später angemeldet und kommen deshalb zuerst dran.
 */
async function nurLesen(seite) {
  await seite.route('**/api/**', (route) => {
    const methode = route.request().method();
    if (['GET', 'HEAD', 'OPTIONS'].includes(methode)) return route.fallback();
    console.warn(`    blockiert: ${methode} ${route.request().url()}`);
    return route.abort();
  });
}

async function neuerKontext(browser, sprache, ansicht = {}) {
  const a = { ...STANDARD_ANSICHT, ...ansicht };
  const kontext = await browser.newContext({
    viewport: { width: a.breite, height: a.hoehe },
    locale: sprache.locale,
    deviceScaleFactor: a.skala,
    isMobile: !!a.mobil,
    hasTouch: !!a.mobil,
    colorScheme: 'light',
  });
  return { kontext, ansicht: a };
}

async function main() {
  if (!MAIL || !PASSWORT) {
    console.error('ZUGANG="mail:passwort" fehlt.');
    process.exit(1);
  }

  for (const sprache of SPRACHEN) {
    /* Je Sprache ein eigener Browser: Datums- und Zeitfelder formatiert
       Chromium nach der Sprache des Prozesses, nicht nach der des
       Kontexts — sonst stünde im deutschen Bild „09/12/2026, 02:00 PM“. */
    const sprachcode = sprache.locale.replace('-', '_');
    const browser = await chromium.launch({
      ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}),
      env: { ...process.env, LANGUAGE: sprachcode, LANG: `${sprachcode}.UTF-8` },
    });

    const verzeichnis = path.join('static/img/screens', sprache.code);
    await mkdir(verzeichnis, { recursive: true });
    console.log(`\n=== ${sprache.code.toUpperCase()} ===`);

    const { kontext, ansicht: standard } = await neuerKontext(browser, sprache);
    const seite = await kontext.newPage();
    const anonym = await neuerKontext(browser, sprache);
    const anonymeSeite = await anonym.kontext.newPage();

    const brauchtAnmeldung = AUFNAHMEN.some((e) => !e.ohneAnmeldung && (!nurDiese || nurDiese.has(e.datei)));
    if (brauchtAnmeldung) {
      await seite.goto(`${BASIS}${sprache.pfad}/login`, { waitUntil: 'networkidle' });
      /* Die Anmeldeseite bietet zuerst den Anmeldelink an; fuer das Skript
         brauchen wir den Passwortweg, der eine Umschaltung entfernt liegt. */
      const umschalten = seite.getByRole('button', { name: /Passwort|password/i }).first();
      if (await umschalten.isVisible().catch(() => false)) {
        await umschalten.click();
        await seite.waitForTimeout(400);
      }
      await seite.locator('input[type="email"]').fill(MAIL);
      await seite.locator('input[type="password"]').fill(PASSWORT);
      await seite.locator('button[type="submit"]').first().click();
      await seite.waitForURL(/dashboard/, { timeout: 30000 });
    }

    for (const eintrag of AUFNAHMEN) {
      if (nurDiese && !nurDiese.has(eintrag.datei)) continue;
      /* Die Registrierung gehoert zu einem Besucher ohne Konto — mit
         bestehender Sitzung leitet die Seite ins Dashboard um. */
      const ziel = eintrag.ohneAnmeldung ? anonymeSeite : seite;
      const ansicht = { ...standard, ...eintrag.ansicht };
      try {
        if (eintrag.ansicht) await ziel.setViewportSize({ width: ansicht.breite, height: ansicht.hoehe });
        if (eintrag.routen) await eintrag.routen(ziel, { sprache: sprache.code });
        await ziel.goto(`${BASIS}${sprache.pfad}${eintrag.pfad}`, { waitUntil: 'networkidle' });
        await aufnehmen(ziel, eintrag, verzeichnis, sprache, ansicht);
      } catch (fehler) {
        console.error(`    FEHLGESCHLAGEN ${eintrag.datei}: ${fehler.message.split('\n')[0]}`);
      } finally {
        // Abfangregeln gelten nur fuer diese eine Aufnahme.
        await ziel.unrouteAll({ behavior: 'ignoreErrors' });
        if (eintrag.ansicht) await ziel.setViewportSize({ width: standard.breite, height: standard.hoehe });
      }
    }

    await kontext.close();
    await anonym.kontext.close();

    // Geräteansichten: je Aufnahme ein frischer Kontext ohne Anmeldung.
    for (const eintrag of GERAETE_AUFNAHMEN) {
      if (nurDiese && !nurDiese.has(eintrag.datei)) continue;
      const { kontext: geraeteKontext, ansicht } = await neuerKontext(browser, sprache, eintrag.ansicht);
      try {
        const geraeteSeite = await geraeteKontext.newPage();
        await nurLesen(geraeteSeite);
        if (eintrag.routen) await eintrag.routen(geraeteSeite, { sprache: sprache.code });

        await geraeteSeite.goto(`${BASIS}${sprache.pfad}/login`, { waitUntil: 'domcontentloaded' });
        await geraeteSeite.evaluate((e) => {
          localStorage.clear();
          if (e.ohneToken) return;
          // Version 2 des Gerätespeichers (Tischkontext und Startansicht).
          localStorage.setItem('openeos-device', JSON.stringify({
            state: {
              deviceId: 'doku', deviceToken: e.token, status: 'verified',
              deviceClass: e.geraeteklasse, verificationCode: null,
              settings: e.einstellungen ?? {},
              table: e.tisch ?? null,
              startView: e.startansicht ?? null,
            },
            version: 2,
          }));
          for (const [schluessel, wert] of Object.entries(e.speicher ?? {})) {
            localStorage.setItem(schluessel, JSON.stringify(wert));
          }
        }, {
          ohneToken: !!eintrag.ohneToken,
          token: eintrag.token,
          geraeteklasse: eintrag.geraeteklasse,
          einstellungen: eintrag.einstellungen,
          startansicht: eintrag.startansicht,
          tisch: eintrag.tisch,
          speicher: typeof eintrag.speicher === 'function' ? eintrag.speicher(sprache.code) : eintrag.speicher,
        });

        await geraeteSeite.goto(`${BASIS}${sprache.pfad}${eintrag.pfad}`, { waitUntil: 'networkidle' }).catch(() => {});
        await aufnehmen(geraeteSeite, eintrag, verzeichnis, sprache, ansicht);
      } catch (fehler) {
        console.error(`    FEHLGESCHLAGEN ${eintrag.datei}: ${fehler.message.split('\n')[0]}`);
      } finally {
        await geraeteKontext.close();
      }
    }

    await browser.close();
  }

  await rm(LEGENDE, { force: true });
  console.log('\nFertig.');
}

main().catch((f) => { console.error(f); process.exit(1); });
