import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Anwenderhandbuch-Navigation für OpenEOS.
 * Reihenfolge orientiert sich am typischen Einrichtungs-Workflow.
 */
const sidebars: SidebarsConfig = {
  handbookSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Erste Schritte',
      collapsed: false,
      items: ['registrierung-login', 'organisation'],
    },
    {
      type: 'category',
      label: 'Im Betrieb',
      collapsed: false,
      items: ['dashboard', 'bestellungen'],
    },
    {
      type: 'category',
      label: 'Produkte & Sortiment',
      collapsed: false,
      items: [
        'produkte',
        'kategorien',
        'inventur',
        'rabatt-bons',
        'pfand',
      ],
    },
    {
      type: 'category',
      label: 'Kassen & Geräte',
      collapsed: false,
      items: ['geraete', 'drucker', 'standorte'],
    },
    {
      type: 'category',
      label: 'Team & Verwaltung',
      collapsed: false,
      items: ['mitglieder', 'schichtplaene', 'veranstaltungen', 'auswertung'],
    },
    {
      type: 'category',
      label: 'Einstellungen',
      collapsed: false,
      items: ['einstellungen'],
    },
  ],
};

export default sidebars;
