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
      items: ['registrierung-login', 'dashboard', 'organisation'],
    },
    {
      type: 'category',
      label: 'Veranstaltung einrichten',
      collapsed: false,
      items: [
        'veranstaltungen',
        'produkte',
        'kategorien',
        'pfand',
        'rabatt-bons',
        'standorte',
      ],
    },
    {
      type: 'category',
      label: 'Kassen & Geräte',
      collapsed: false,
      items: ['geraete', 'drucker'],
    },
    {
      type: 'category',
      label: 'Im Betrieb',
      collapsed: false,
      items: ['bestellungen', 'inventur', 'auswertung'],
    },
    {
      type: 'category',
      label: 'Team & Verwaltung',
      collapsed: false,
      items: ['mitglieder', 'schichtplaene', 'einstellungen'],
    },
  ],
};

export default sidebars;
