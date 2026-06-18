import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

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

  onBrokenLinks: 'warn',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
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
            {label: 'Website', href: 'https://openeos.de'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} OpenEOS. Erstellt mit Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
