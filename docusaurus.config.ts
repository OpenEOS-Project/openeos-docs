import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/* Docusaurus baut jede Sprache einzeln und setzt dabei diese Variable.
   Impressum und Datenschutz liegen auf der Website je Sprache unter
   eigenem Pfad; Linkziele lassen sich ueber footer.json nicht uebersetzen. */
const locale = process.env.DOCUSAURUS_CURRENT_LOCALE ?? 'de';
const websiteUrl = locale === 'en' ? 'https://openeos.de/en' : 'https://openeos.de';

const config: Config = {
  title: 'OpenEOS Dokumentation',
  tagline: 'Die Anwenderdokumentation für das OpenEOS Kassensystem',
  favicon: 'img/favicon.png',

  future: {
    v4: true,
  },

  url: 'https://docs.openeos.de',
  baseUrl: '/',

  organizationName: 'openeos',
  projectName: 'openeos-docs',

  /* Ein toter Link ist in einer Anleitung kein Schoenheitsfehler: Wer beim
     Einrichten einem Verweis folgt und im Nichts landet, kommt nicht weiter.
     Als Warnung ging das im Build-Protokoll unter — deshalb bricht der Build
     jetzt ab, solange der Verweis nicht stimmt. */
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en'],
    localeConfigs: {
      de: {label: 'Deutsch'},
      en: {label: 'English'},
    },
  },

  themes: [
    [
      // Suche ohne Fremddienst: der Index entsteht beim Build und liegt
      // neben der Seite, gesucht wird im Browser.
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['de', 'en'],
        indexBlog: false,
        indexPages: false,
        docsRouteBasePath: '/',
        highlightSearchTermsOnTargetPage: false,
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/', // docs served at the site root
          editUrl: undefined,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/openeos-logo.png',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      // No title text – the logo already reads "openEOS"
      title: '',
      logo: {
        alt: 'OpenEOS',
        // White wordmark – the navbar has a dark green background in both modes
        src: 'img/openeos-logo-white.png',
        srcDark: 'img/openeos-logo-white.png',
        height: 28,
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'handbookSidebar',
          position: 'left',
          label: 'Dokumentation',
        },
        {
          href: 'https://app.openeos.de',
          label: 'Zur App',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Dokumentation',
          items: [
            {label: 'Erste Schritte', to: '/'},
            {label: 'Veranstaltungen', to: '/veranstaltungen'},
            {label: 'Produkte', to: '/produkte'},
          ],
        },
        {
          title: 'OpenEOS',
          items: [
            {label: 'Zur App', href: 'https://app.openeos.de'},
            {label: 'Website', href: websiteUrl},
          ],
        },
        {
          title: 'Rechtliches',
          items: [
            {label: 'Impressum', href: `${websiteUrl}/imprint`},
            {label: 'Datenschutz', href: `${websiteUrl}/privacy`},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} OpenEOS`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
