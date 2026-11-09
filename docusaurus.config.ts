import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import redocSpecPlugin from './plugins/redoc-spec';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/* Docusaurus baut jede Sprache einzeln und setzt dabei diese Variable.
   Die Rechtstexte liegen auf der Website je Sprache unter eigenem Pfad
   (/impressum, /en/impressum, …); Linkziele lassen sich ueber footer.json
   nicht uebersetzen. */
const locale = process.env.DOCUSAURUS_CURRENT_LOCALE ?? 'de';
/* Website (Rechtstexte) und App kommen beim Build aus WEBSITE_URL und
   APP_URL — Staging baut mit https://staging.openeos.de bzw.
   https://app.staging.openeos.de, damit die Staging-Doku nicht auf die
   Produktion verlinkt. Ohne Variable: Produktion. */
const trimUrl = (value: string | undefined, fallback: string) => (value?.trim() || fallback).replace(/\/+$/, '');
const websiteBase = trimUrl(process.env.WEBSITE_URL, 'https://openeos.de');
const websiteUrl = locale === 'en' ? `${websiteBase}/en` : websiteBase;
const appUrl = trimUrl(process.env.APP_URL, 'https://app.openeos.de');
/* Link "Quellcode" (AGPL-3.0 § 13). Wer eine geaenderte Fassung betreibt,
   setzt SOURCE_URL beim Build auf das eigene Repository. */
const sourceUrl = process.env.SOURCE_URL || 'https://github.com/OpenEOS-Project';
/* Cloud-TSE "bald verfügbar": Mit TSE_COMING_SOON=true zeigen die Seiten zur
   Cloud-TSE und zu Bargeld einen Hinweis, dass die TSE auf openeos.de erst
   eingefuehrt wird (src/components/TseComingSoon). Produktion baut mit
   "true", Staging mit "false"; ohne Variable erscheint nichts. */
const tseComingSoon = process.env.TSE_COMING_SOON?.trim() === 'true';

const config: Config = {
  title: 'OpenEOS Dokumentation',
  tagline: 'Die Anwenderdokumentation für das OpenEOS Kassensystem',
  favicon: 'img/favicon.png',

  future: {
    v4: true,
  },

  url: 'https://docs.openeos.de',
  baseUrl: '/',
  /* Seiten werden als `seite.html` ausgegeben und ohne Schraegstrich
     verlinkt. nginx liefert sie per `try_files $uri.html` direkt aus —
     ohne den 301 auf `seite/`, der hinter dem Proxy auf http zeigte. */
  trailingSlash: false,

  organizationName: 'openeos',
  projectName: 'openeos-docs',

  customFields: {
    tseComingSoon,
  },

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
      /* Redoc-Darstellung der API-Referenz (/api). Nur lesen: Redoc kennt
         kein "Try it out" und ruft keinen Server auf. Farben wie die Seite
         (custom.css), Schrift über die ifm-Variablen. */
      'docusaurus-theme-redoc',
      {
        id: 'theme-redoc',
        primaryColor: '#2e7d32',
        primaryColorDark: '#6bbf6f',
        options: {
          // Redoc-Optionen, siehe https://redocly.com/docs/redoc/config
          expandResponses: '200,201',
          requiredPropsFirst: true,
          sortTagsAlphabetically: false,
          pathInMiddlePanel: true,
          hideDownloadButton: false,
          nativeScrollbars: true,
          theme: {
            rightPanel: {backgroundColor: '#15402b', width: '40%'},
            typography: {
              headings: {fontWeight: '700'},
              code: {fontFamily: 'var(--ifm-font-family-monospace)'},
            },
          },
        },
      },
    ],
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

  plugins: [
    [
      /* API-Referenz aus docs/openapi.public.json der openeos-api — nur
         Endpunkte für API-Tokens und deren Verwaltung (Stand holen:
         `pnpm openapi:sync`). Route /api bzw. /en/api; der Titel haengt an
         der Sprache, die Docusaurus je Build-Durchlauf setzt. */
      redocSpecPlugin,
      {
        id: 'openeos-api',
        themeId: 'theme-redoc',
        spec: 'static/openapi/openeos-api.json',
        // Download-Link zeigt auf die eingecheckte Datei statt auf einen
        // beim Build erzeugten YAML-Abzug.
        url: '/openapi/openeos-api.json',
        route: '/api',
        layout: {
          title: locale === 'en' ? 'API reference' : 'API-Referenz',
          description:
            locale === 'en'
              ? 'Reference of the OpenEOS REST API: endpoints, parameters, responses and scopes for API tokens.'
              : 'Referenz der OpenEOS REST-API: Endpunkte, Parameter, Antworten und Scopes für API-Tokens.',
        },
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
          to: '/api',
          label: 'API-Referenz',
          position: 'left',
        },
        {
          href: appUrl,
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
            {label: 'API-Referenz', to: '/api'},
          ],
        },
        {
          title: 'OpenEOS',
          items: [
            {label: 'Zur App', href: appUrl},
            {label: 'Website', href: websiteUrl},
            {label: 'Quellcode (AGPL-3.0)', href: sourceUrl},
          ],
        },
        {
          title: 'Rechtliches',
          items: [
            {label: 'Impressum', href: `${websiteUrl}/impressum`},
            {label: 'Datenschutz', href: `${websiteUrl}/datenschutz`},
            {label: 'AGB', href: `${websiteUrl}/agb`},
            {label: 'AVV', href: `${websiteUrl}/avv`},
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} LUXCODE by Lukas Lukic-Spitznagel · OpenEOS`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
