import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Anwenderhandbuch-Navigation für OpenEOS.
 *
 * Aufgebaut als durchgehender Weg vom ersten Konto bis zum Abend des
 * Festes, nicht als Abbild der Menüpunkte. Wer das erste Mal hier landet,
 * soll die Kapitel von oben nach unten abarbeiten können und danach ein
 * laufendes System haben.
 *
 * Alles, was man nur gelegentlich braucht, steht darunter zum
 * Nachschlagen — dort ist die Reihenfolge zweitrangig.
 */
const sidebars: SidebarsConfig = {
  handbookSidebar: [
    'intro',
    {
      type: 'category',
      label: '1 · Konto und Organisation',
      collapsed: false,
      items: ['registrierung-login', 'organisation'],
    },
    {
      type: 'category',
      label: '2 · Veranstaltung anlegen',
      collapsed: false,
      items: ['veranstaltungen', 'kategorien', 'produkte', 'standorte'],
    },
    {
      type: 'category',
      label: '3 · Geräte und Anzeigen',
      collapsed: false,
      items: ['geraete', 'anzeigen', 'drucker'],
    },
    {
      type: 'category',
      label: '4 · Am Festtag',
      collapsed: false,
      items: ['kasse', 'bestellungen', 'dashboard'],
    },
    {
      type: 'category',
      label: '5 · Nach dem Fest',
      collapsed: false,
      items: ['auswertung', 'inventur'],
    },
    {
      type: 'category',
      label: 'Nachschlagen',
      collapsed: true,
      items: [
        'pfand',
        'rabatt-bons',
        'mitglieder',
        'schichtplaene',
        'einstellungen',
      ],
    },
  ],
};

export default sidebars;
