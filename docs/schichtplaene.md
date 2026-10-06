---
sidebar_position: 17
title: Schichtpläne
description: Schichtpläne erstellen, Schichten generieren, veröffentlichen und Helfer sich öffentlich eintragen lassen.
---

# Schichtpläne

Mit **Schichtplänen** organisierst du die Helferinnen und Helfer deiner Veranstaltung. Du legst Arbeiten (z. B. Theke, Grill, Auf- und Abbau) an, erzeugst daraus Schichten und veröffentlichst einen **öffentlichen Helfer-Link**, über den sich Helfer selbst in freie Schichten eintragen.

Du findest den Bereich über **Schichtpläne** in der Seitenleiste.

![Schichtpläne-Übersicht](/img/screens/de/shifts.png)

## 1. Schichtplan erstellen

Klicke auf **Neuer Schichtplan**. Ein Dialog führt dich in drei Schritten:

1. **Veranstaltung** – Wähle optional die Veranstaltung, zu der der Plan gehört. So sehen die Helfer das Datum der Veranstaltung direkt. Du kannst auch **Keine Veranstaltung (eigenständiger Plan)** wählen.
2. **Name & Beschreibung** – vorgeschlagen wird „Helferplanung“ mit dem Namen der Veranstaltung. Die Beschreibung erscheint später auf der öffentlichen Helferseite.
3. **Erstellen** – Angaben prüfen und anlegen. Der Plan startet im Status **Entwurf**.

![Neuer Schichtplan: Veranstaltung wählen](/img/screens/de/shifts-dialog.png)

Ein Plan gliedert sich in vier Reiter: **Arbeiten**, **Kalender**, **Anmeldungen** und **Einstellungen**. Oben rechts stehen die Aktionen als Symbole: im Entwurf **Veröffentlichen** und **PDF-Export**, nach dem Veröffentlichen **Link kopieren**, **PDF-Export** und **Schließen**.

## 2. Arbeiten anlegen

Eine **Arbeit** ist eine Aufgabe oder Station, für die Helfer gebraucht werden. Klicke im Reiter **Arbeiten** auf **+** (**Arbeit hinzufügen**):

- **Arbeit** – pro Zeile eine Arbeit (z. B. `Aufbau`, `Abbau`); alle werden gleichzeitig angelegt.
- **Beschreibung** – optionale öffentliche Beschreibung für Helfer.
- **Helfer pro Schicht** – Standardwert für alle Schichten dieser Arbeit (lässt sich je Schicht überschreiben).

![Arbeit hinzufügen](/img/screens/de/shift-work-dialog.png)

Die Arbeiten stehen danach untereinander, jede mit ihren Schichten und der Belegung (z. B. **1 / 2**). Über den Stift änderst du eine Arbeit, über das Kalender-Symbol fügst du ihr eine einzelne Schicht hinzu.

![Arbeiten mit Schichten im Schichtplan](/img/screens/de/shift-detail.png)

## 3. Schichten erzeugen

Schichten (Zeitfenster) legst du je Arbeit einzeln über das **Kalender-Symbol** an – oder für alle Arbeiten auf einmal mit dem **Schicht-Generator für alle Arbeiten** (Zauberstab neben **+**). Er führt in vier Schritten:

1. **Zeitraum wählen** – Start- und Enddatum (bei verknüpfter Veranstaltung vorausgefüllt).
2. **Zeitfenster festlegen** – Beginn und Ende der täglichen Betriebszeit, auf Wunsch mit **Zeiten pro Tag**. Endet eine Schicht vor ihrem Beginn, läuft sie über Mitternacht.
3. **Schichtverteilung** – **Schichten pro Tag** (z. B. 2 ≈ 4 Stunden pro Schicht) und optional eine **Schichtüberlappung** zur Übergabe.
4. **Vorschau & Anpassen** – alle erzeugten Schichten je Tag. Einzelne wählst du ab oder verschiebst ihre Zeiten, bevor du sie mit **„X Schichten für Y Arbeiten anlegen“** übernimmst.

![Schicht-Generator: Vorschau](/img/screens/de/shift-generator.png)

Der Reiter **Kalender** zeigt danach alle Arbeiten und Tage als Übersicht, mit Belegung und den Namen der eingetragenen Helfer.

## 4. Einstellungen & öffentlicher Link

Im Reiter **Einstellungen** findest du:

- **Allgemein** – Name und Beschreibung, so wie die Helfer sie auf der öffentlichen Seite sehen.
- **Öffentlicher Link** – `https://app.openeos.de/s/<plan>`. Über **Link kopieren** gibst du ihn an die Helfer weiter, mit **Vorschau** öffnest du die öffentliche Seite.
- **Anmeldungs-Einstellungen**:
  - **Bestätigung erforderlich** – Anmeldungen müssen von dir freigegeben werden.
  - **Mehrere Schichten** – Helfer dürfen sich für mehrere Schichten eintragen.
  - **Max. Schichten pro Person** – Obergrenze (0 = unbegrenzt).
  - **Erinnerung** – so viele Tage vor der Schicht geht eine Erinnerung raus.
  - **Verifizierungs-Erinnerungen** – erinnern Helfer, die ihre E-Mail noch nicht bestätigt haben; mit **Intervall (Stunden)** und **Maximale Anzahl Erinnerungen**.

![Schichtplan-Einstellungen mit öffentlichem Link](/img/screens/de/shift-settings.png)

## 5. Veröffentlichen

Solange der Plan im Status **Entwurf** ist, ist er nur intern sichtbar. Klicke oben rechts auf **Veröffentlichen** (Papierflieger), um ihn freizugeben – der Status wechselt auf **Veröffentlicht** und der öffentliche Link wird aktiv. Mit **Schließen** (Schloss) nimmst du später keine Anmeldungen mehr an.

:::tip
Veröffentliche erst, wenn Arbeiten und Schichten stehen. Änderungen sind aber auch danach jederzeit möglich.
:::

## Der öffentliche Helfer-Bereich

Über den öffentlichen Link gelangen Helfer **ohne Login** auf eine übersichtliche Seite mit dem Namen deiner Organisation, dem Zeitraum, deiner Beschreibung und allen Schichten. Pro Zeitfenster sehen sie je Arbeit, wie viele Plätze noch **frei** sind (z. B. „2 /2 frei“). Zwischen **Karten** und **Liste** kann gewechselt werden.

![Öffentliche Helferseite](/img/screens/de/public-helper.png)

Helfer tippen die gewünschten Schichten an; Schichten, die sich mit einer gewählten überschneiden, werden als **Überschneidung** gesperrt. Unten zeigt eine Leiste die Anzahl der gewählten Schichten und führt mit **Weiter** zum nächsten Schritt.

![Schichtauswahl durch Helfer](/img/screens/de/public-select.png)

Im Schritt **Deine Daten** trägt der Helfer **Name** und **E-Mail** (sowie optional **Telefon** und **Anmerkungen**) ein und klickt auf **Anmelden**. Danach bekommt er eine E-Mail und bestätigt darin seine Adresse – erst dann gilt die Anmeldung. Über **Meine Schichten verwalten** unten auf der Seite können Helfer sich später einen Link schicken lassen, um ihre Schichten anzusehen und anzupassen.

![Helfer-Anmeldeformular](/img/screens/de/public-contact.png)

## Anmeldungen verwalten

Im Reiter **Anmeldungen** siehst du alle eingegangenen Anmeldungen, je Helfer mit seinen Schichten und einem Status:

- **E-Mail offen** – der Helfer hat seine Adresse noch nicht bestätigt. Mit dem Häkchen (**Als verifiziert markieren**) überspringst du das, etwa wenn du ihn persönlich kennst.
- **Freigabe offen** – nur bei **Bestätigung erforderlich**: Mit **Bestätigen** oder **Ablehnen** entscheidest du.
- **Bestätigt** – alles erledigt.

Über die Filter oben grenzt du die Liste ein. **An alle senden** schreibt allen Helfern eine E-Mail; je Anmeldung gibt es außerdem **Bearbeiten**, **Nachricht senden** und **Löschen**. Mit dem Personen-Symbol oben rechts (**Helfer manuell eintragen**) trägst du selbst jemanden ein – auch ohne E-Mail-Adresse.

![Anmeldungen verwalten](/img/screens/de/shift-anmeldungen.png)

:::tip[Frühzeitig teilen]
Erstelle und veröffentliche den Schichtplan rechtzeitig und verteile den öffentlichen Link (z. B. per Messenger oder E-Mail), damit sich genügend Helfer eintragen. Über die [Berechtigungen](./mitglieder.md) kannst du einer Schichtleitung gezielt nur das Modul **Schichtpläne** freigeben.
:::
