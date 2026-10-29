import path from 'node:path';
import type {LoadContext, Plugin} from '@docusaurus/types';
import redocPlugin, {type PluginOptions} from 'docusaurus-plugin-redoc';

/**
 * docusaurus-plugin-redoc, ohne die Spezifikation in die globalen Daten zu
 * legen.
 *
 * Das Original ruft `setGlobalData` mit der kompletten OpenAPI-Beschreibung
 * auf. Globale Daten landen im Haupt-Bundle, das jede Seite lädt — rund
 * 300 KB nur dafür, auch auf Seiten ohne API. Die Seite /api bekommt die
 * Daten ohnehin über ihre Route (eigener Chunk), deshalb reicht dort ein
 * Platzhalter.
 *
 * Außerdem: Das Redocly-Logo im Redoc-Menü kommt aus static/img statt von
 * cdn.redoc.ly (siehe redocly-logo-loader.cjs).
 */
export default function redocSpecPlugin(
  context: LoadContext,
  rawOptions: unknown,
): Plugin<unknown> {
  const options = rawOptions as PluginOptions;
  const plugin = redocPlugin(context, options) as Plugin<unknown>;
  return {
    ...plugin,
    name: 'openeos-redoc-spec',
    configureWebpack() {
      return {
        module: {
          rules: [
            {
              test: /[\\/]redoc[\\/]bundles[\\/]redoc\.[\w.]*lib\.js$/,
              loader: path.resolve(__dirname, 'redocly-logo-loader.cjs'),
            },
          ],
        },
      };
    },
    async contentLoaded(args) {
      const {actions} = args;
      await plugin.contentLoaded?.({
        ...args,
        actions: {
          ...actions,
          setGlobalData: () => actions.setGlobalData({id: options.id, url: options.url}),
        },
      });
    },
  };
}
