#!/usr/bin/env node
/**
 * Holt die öffentliche OpenAPI-Beschreibung der OpenEOS-API
 * (docs/openapi.public.json: nur, was ein API-Token erreicht, plus die
 * Token-Verwaltung — ohne Geräte-API, Kasse, Admin, Abrechnung) und legt
 * sie als static/openapi/openeos-api.json ab. Daraus rendert die Seite /api
 * die API-Referenz — nur lesend, ohne Aufruf eines Servers.
 *
 * Quelle ist standardmäßig der Branch `main` von openeos-api (Produktion).
 * `OPENAPI_SPEC_URL` überschreibt die Adresse, etwa für den dev-Stand:
 *   OPENAPI_SPEC_URL=https://raw.githubusercontent.com/OpenEOS-Project/openeos-api/dev/docs/openapi.public.json pnpm openapi:sync
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DEFAULT_URL =
  'https://raw.githubusercontent.com/OpenEOS-Project/openeos-api/main/docs/openapi.public.json';
const url = process.env.OPENAPI_SPEC_URL || DEFAULT_URL;

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const target = path.join(root, 'static', 'openapi', 'openeos-api.json');

const response = await fetch(url);
if (!response.ok) {
  console.error(`Abruf fehlgeschlagen: ${url} → HTTP ${response.status}`);
  process.exit(1);
}
const text = await response.text();

let spec;
try {
  spec = JSON.parse(text);
} catch (error) {
  console.error(`Antwort ist kein gültiges JSON: ${error.message}`);
  process.exit(1);
}
if (typeof spec.openapi !== 'string' || !spec.paths) {
  console.error('Antwort ist keine OpenAPI-Beschreibung (openapi/paths fehlen).');
  process.exit(1);
}

// Einheitlich formatiert, damit Diffs lesbar bleiben.
const formatted = `${JSON.stringify(spec, null, 2)}\n`;

let previous = null;
try {
  previous = await readFile(target, 'utf8');
} catch {
  // Datei gibt es noch nicht
}

if (previous === formatted) {
  console.log(`Unverändert: ${path.relative(root, target)} (${Object.keys(spec.paths).length} Pfade)`);
  process.exit(0);
}

await mkdir(path.dirname(target), { recursive: true });
await writeFile(target, formatted);
console.log(
  `Aktualisiert: ${path.relative(root, target)} aus ${url} (${Object.keys(spec.paths).length} Pfade, ${spec.info?.version ?? 'ohne Version'})`,
);
