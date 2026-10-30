---
sidebar_position: 4
title: Organisation
description: Die Organisation als zentrale Klammer für Veranstaltungen, Produkte und Team.
---

# Organisation

In OpenEOS gehört alles zu einer **Organisation** – deinem Verein, Veranstalter oder Betrieb. Die Organisation ist die zentrale Klammer für deine Veranstaltungen, Produkte, Mitglieder, Geräte und Auswertungen.

Oben links in der Seitenleiste siehst du den Namen deiner aktiven Organisation sowie deine Rolle (z. B. **Administrator**).

![Organisationseinstellungen](/img/screens/de/settings-organisation.png)

## Organisationsdaten pflegen

Den Namen und weitere Stammdaten deiner Organisation verwaltest du unter **Einstellungen → Organisation**. Der Organisationsname erscheint u. a. auf Rechnungen und Bons und kann jederzeit geändert werden.

## Datenmodell auf einen Blick

OpenEOS ist hierarchisch aufgebaut. Dieses Modell hilft zu verstehen, warum manche Einstellungen pro Veranstaltung und andere für die ganze Organisation gelten:

```
Organisation (Musterverein e.V.)
├── Mitglieder & Berechtigungen
├── Geräte (Kassen, Anzeigen) & Drucker
├── Bereiche & Tische
├── Pfand-Typen & Rabatt-Bons
├── Schichtpläne
├── Integrationen (z. B. SumUp)
└── Veranstaltung (z. B. Sommerfest 2026)
    ├── Kategorien & Produkte
    ├── Standorte (Küche, Bar, Ausgabe)
    ├── Welche Tische genutzt werden
    ├── Bestellungen
    └── Inventur & Auswertung
```

:::tip
**Geräte, Drucker, Tische, Pfand-Typen, Rabatt-Bons und Mitglieder** gehören zur Organisation und stehen über alle Veranstaltungen hinweg zur Verfügung. **Produkte, Kategorien, Standorte und Bestellungen** beziehen sich dagegen jeweils auf eine konkrete Veranstaltung. Welche Bereiche mit Tischen eine Veranstaltung nutzt, stellst du in der [Veranstaltung](./veranstaltungen.md) ein.
:::

## Mehrere Organisationen

Über die Auswahl oben links kannst du – sofern du mehreren Organisationen angehörst – zwischen diesen wechseln. Dort legst du über **Neue Organisation** auch eine weitere an. Jede Organisation hat ihre eigenen Daten, Mitglieder und Auswertungen.

Im gehosteten Betrieb kann ein Konto in höchstens **5 Organisationen** Mitglied sein – egal ob als Administrator oder Mitglied, ob selbst angelegt oder per Einladung beigetreten. Ist die Höchstzahl erreicht, ist **Neue Organisation** ausgegraut und Einladungen lassen sich nicht mehr annehmen. Brauchst du mehr, wende dich an den Support – wir heben die Grenze für dein Konto an. Für die Zahl der Mitglieder je Organisation gilt Entsprechendes, siehe [Mitglieder & Berechtigungen](./mitglieder.md#plätze-und-höchstzahl).
