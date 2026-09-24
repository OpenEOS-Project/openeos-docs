/**
 * Nimmt die Bilder für das Handbuch auf — beide Sprachen, beschriftet.
 *
 * Warum ein Skript und keine Handarbeit: Die Oberfläche ändert sich, und
 * ein Handbuch mit Bildern von vorgestern führt in die Irre. So lässt
 * sich der ganze Satz in einem Durchlauf erneuern.
 *
 *   ZUGANG="mail:passwort" node scripts/screenshots.mjs [--nur dashboard,events]
 *
 * Aufgenommen wird gegen Staging: dort stehen Testdaten, und es kann
 * nichts kaputtgehen, was einem Kunden gehört.
 *
 * Wichtig ist das Konto: Es muss zu der Organisation gehören, in der die
 * Testdaten liegen, und es sollte ein normales Administratorkonto sein.
 * Ein Super-Admin sieht zusätzliche Menüpunkte, die kein Kunde hat — und
 * ohne Daten in seiner Organisation zeigen die Seiten nur Leerzustände.
 */
import { chromium } from 'playwright';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdir, rm } from 'node:fs/promises';
import path from 'node:path';

import { AUFNAHMEN, GERAETE_AUFNAHMEN } from './screenshots.config.mjs';

const ausfuehren = promisify(execFile);

const BASIS = process.env.APP_URL ?? 'https://app.staging.openeos.de';
const [MAIL, PASSWORT] = (process.env.ZUGANG ?? '').split(':');
const BREITE = 1440;
const HOEHE = 1000;

const nurDiese = (() => {
  const i = process.argv.indexOf('--nur');
  return i === -1 ? null : new Set(process.argv[i + 1].split(','));
})();

const SPRACHEN = [
  { code: 'de', pfad: '/de' },
  { code: 'en', pfad: '/en' },
];

/** Beschriftung ins Bild brennen: Nummernkreis plus Fahne am Element. */
async function beschriften(bildPfad, marken) {
  if (!marken.length) return;

  const befehl = [bildPfad];
  marken.forEach((m, i) => {
    const nummer = i + 1;
    const { x, y, w, h } = m.kasten;
    // Rahmen um den Bereich
    befehl.push(
      '-stroke', '#0b7a3b', '-strokewidth', '3', '-fill', 'none',
      '-draw', `roundrectangle ${x},${y} ${x + w},${y + h} 8,8`,
    );
    /* Nummernkreis an der oberen linken Ecke, mit weissem Ring: Er sitzt
       auf der Oberflaeche und wuerde sonst mit dem darunterliegenden Text
       verschwimmen. */
    const cx = x + 17;
    const cy = y + 17;
    befehl.push(
      '-stroke', 'white', '-strokewidth', '3', '-fill', '#0b7a3b',
      '-draw', `circle ${cx},${cy} ${cx + 15},${cy}`,
      '-stroke', 'none', '-fill', 'white',
      '-pointsize', '21', '-font', 'DejaVu-Sans-Bold',
      '-annotate', `+${cx - 6}+${cy + 7}`, String(nummer),
    );
  });
  befehl.push(bildPfad);

  await ausfuehren('magick', befehl);
}

/** Legende unter das Bild setzen, damit die Nummern erklärt sind. */
async function legende(bildPfad, marken) {
  if (!marken.length) return;

  const zeilen = marken.map((m, i) => `${i + 1}  ${m.text}`).join('\n');
  const hoehe = 26 * marken.length + 24;

  /* Die Breite muss exakt stimmen: ein Splice hinterher machte die
     Legende breiter als das Bild, und das Ergebnis war 18 Pixel zu breit. */
  await ausfuehren('magick', [
    '-background', '#f4f4f5', '-fill', '#1a1a1a',
    '-font', 'DejaVu-Sans', '-pointsize', '17',
    '-size', `${BREITE - 36}x${hoehe}`,
    `caption:${zeilen}`,
    '-gravity', 'NorthWest',
    '-background', '#f4f4f5', '-extent', `${BREITE}x${hoehe + 24}-18-12`,
    '/tmp/legende.png',
  ]);

  await ausfuehren('magick', [bildPfad, '/tmp/legende.png', '-append', bildPfad]);
}

async function aufnehmen(seite, eintrag, zielVerzeichnis, spracheCode) {
  const ziel = path.join(zielVerzeichnis, `${eintrag.datei}.png`);

  if (eintrag.vorbereiten) await eintrag.vorbereiten(seite);
  await seite.waitForTimeout(1200);

  // Positionen der zu beschriftenden Elemente einsammeln, solange die
  // Seite noch steht — nach dem Auslösen ist sie nur noch ein Bild.
  const marken = [];
  for (const hinweis of eintrag.hinweise ?? []) {
    try {
      const element = seite.locator(hinweis.auf).first();
      const kasten = await element.boundingBox({ timeout: 2000 });
      if (kasten && kasten.y < HOEHE) {
        /* Auf das Bild zuschneiden: ein Rahmen, der rechts oder unten
           hinauslaeuft, wird abgeschnitten und sieht aus wie ein Fehler. */
        const x = Math.max(3, Math.round(kasten.x) - 6);
        const y = Math.max(3, Math.round(kasten.y) - 6);
        marken.push({
          text: hinweis.text,
          kasten: {
            x,
            y,
            w: Math.min(BREITE - x - 3, Math.round(kasten.width) + 12),
            h: Math.min(HOEHE - y - 3, Math.round(kasten.height) + 12),
          },
        });
      }
    } catch {
      console.warn(`    Hinweis übersprungen (${hinweis.auf} nicht gefunden)`);
    }
  }

  await seite.screenshot({ path: ziel });
  await beschriften(ziel, marken);
  await legende(ziel, marken);

  console.log(`    ${eintrag.datei}.png${marken.length ? ` (${marken.length} Marken)` : ''}`);
}

async function main() {
  if (!MAIL || !PASSWORT) {
    console.error('ZUGANG="mail:passwort" fehlt.');
    process.exit(1);
  }

  const browser = await chromium.launch();

  for (const sprache of SPRACHEN) {
    const verzeichnis = path.join('static/img/screens', sprache.code);
    await mkdir(verzeichnis, { recursive: true });
    console.log(`\n=== ${sprache.code.toUpperCase()} ===`);

    const kontext = await browser.newContext({
      viewport: { width: BREITE, height: HOEHE },
      locale: sprache.code === 'de' ? 'de-DE' : 'en-GB',
      deviceScaleFactor: 1,
    });
    const seite = await kontext.newPage();

    const anonymerKontext = await browser.newContext({
      viewport: { width: BREITE, height: HOEHE },
      locale: sprache.code === 'de' ? 'de-DE' : 'en-GB',
    });
    const anonymeSeite = await anonymerKontext.newPage();

    // Anmelden
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

    for (const eintrag of AUFNAHMEN) {
      if (nurDiese && !nurDiese.has(eintrag.datei)) continue;
      try {
        /* Die Registrierung gehoert zu einem Besucher ohne Konto — mit
           bestehender Sitzung leitet die Seite ins Dashboard um. */
        const ziel = eintrag.ohneAnmeldung ? anonymeSeite : seite;
        await ziel.goto(`${BASIS}${sprache.pfad}${eintrag.pfad}`, { waitUntil: 'networkidle' });
        await aufnehmen(ziel, eintrag, verzeichnis, sprache.code);
      } catch (fehler) {
        console.error(`    FEHLGESCHLAGEN ${eintrag.datei}: ${fehler.message.split('\n')[0]}`);
      }
    }

    await kontext.close();
    await anonymerKontext.close();

    // Geräteansichten brauchen einen eigenen Kontext ohne Anmeldung.
    const geraeteKontext = await browser.newContext({
      viewport: { width: BREITE, height: HOEHE },
      locale: sprache.code === 'de' ? 'de-DE' : 'en-GB',
    });
    const geraeteSeite = await geraeteKontext.newPage();

    for (const eintrag of GERAETE_AUFNAHMEN) {
      if (nurDiese && !nurDiese.has(eintrag.datei)) continue;
      try {
        await geraeteSeite.goto(`${BASIS}${sprache.pfad}/dashboard`, { waitUntil: 'domcontentloaded' });
        await geraeteSeite.evaluate((e) => {
          if (e.ohneToken) { localStorage.removeItem('openeos-device'); return; }
          localStorage.setItem('openeos-device', JSON.stringify({
            state: {
              deviceId: 'doku', deviceToken: e.token, status: 'verified',
              deviceClass: e.geraeteklasse, verificationCode: null,
              settings: e.einstellungen ?? {},
            },
            version: 0,
          }));
        }, { ohneToken: !!eintrag.ohneToken, token: eintrag.token, geraeteklasse: eintrag.geraeteklasse, einstellungen: eintrag.einstellungen });

        await geraeteSeite.goto(`${BASIS}${sprache.pfad}${eintrag.pfad}`, { waitUntil: 'networkidle' });
        await aufnehmen(geraeteSeite, eintrag, verzeichnis, sprache.code);
      } catch (fehler) {
        console.error(`    FEHLGESCHLAGEN ${eintrag.datei}: ${fehler.message.split('\n')[0]}`);
      }
    }

    await geraeteKontext.close();
  }

  await browser.close();
  await rm('/tmp/legende.png', { force: true });
  console.log('\nFertig.');
}

main().catch((f) => { console.error(f); process.exit(1); });
