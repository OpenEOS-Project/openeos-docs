/**
 * webpack-Loader für das Redoc-Bundle: Das Redocly-Logo in der Fußzeile des
 * Redoc-Menüs lädt sonst von cdn.redoc.ly. Die Seite holt nichts von Dritten
 * (siehe custom.css zu den Schriften), deshalb zeigt der Verweis auf eine
 * eigene Kopie unter static/img. Der Hinweis "API docs by Redocly" bleibt.
 */
module.exports = function redoclyLogoLoader(source) {
  return source.replaceAll(
    'https://cdn.redoc.ly/redoc/logo-mini.svg',
    '/img/redocly-logo-mini.svg',
  );
};
