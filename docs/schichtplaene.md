---
sidebar_position: 17
title: Schichtpläne
description: Schichtpläne erstellen, Schichten generieren, veröffentlichen und Helfer sich öffentlich eintragen lassen.
---

# Schichtpläne

Mit **Schichtplänen** organisieren Sie die Helferinnen und Helfer Ihrer Veranstaltung. Sie legen Arbeiten (z. B. Theke, Grill, Auf- und Abbau) an, erzeugen daraus Schichten und veröffentlichen einen **öffentlichen Helfer-Link**, über den sich Helfer selbst in freie Schichten eintragen.

Sie finden den Bereich über **Schichtpläne** in der Seitenleiste.

![Schichtpläne-Übersicht](/img/screens/de/shifts.png)

## 1. Schichtplan erstellen

Klicken Sie auf **Neuer Schichtplan**. Ein Assistent führt Sie in wenigen Schritten:

1. **Event** – Wählen Sie optional die Veranstaltung, zu der der Plan gehört. So sehen die Helfer das Event auf der öffentlichen Seite. Sie können auch „Kein Event (eigenständiger Plan)" wählen.
2. **Name & Beschreibung** – z. B. „Helferplanung Sommerfest 2026". Die Beschreibung erscheint später auf der öffentlichen Helfer-Seite.
3. **Erstellen** – der Plan wird angelegt und im Status **Entwurf** geöffnet.

![Schichtplan-Assistent: Event wählen](/img/screens/de/shifts-dialog.png)

Der Detailbereich eines Plans gliedert sich in vier Reiter: **Arbeiten**, **Kalender**, **Anmeldungen** und **Einstellungen**. Oben rechts finden Sie **Veröffentlichen** und **PDF-Export**.

## 2. Arbeiten anlegen

Eine **Arbeit** ist eine Aufgabe/Station, für die Helfer gebraucht werden. Klicken Sie auf **Arbeit hinzufügen**:

- **Arbeit** – pro Zeile eine Arbeit (z. B. `Theke`, `Grill`, `Auf- und Abbau`); alle werden gleichzeitig angelegt.
- **Beschreibung** – optionale öffentliche Beschreibung für Helfer.
- **Helfer pro Schicht** – Standardwert für alle Schichten dieser Arbeit (lässt sich je Schicht überschreiben).

![Arbeit hinzufügen](/img/screens/de/shift-work-dialog.png)

Anschließend sehen Sie Ihre Arbeiten als Liste – zunächst noch ohne Schichten.

![Arbeiten im Schichtplan](/img/screens/de/shift-detail.png)

## 3. Schichten erzeugen

Schichten (Zeitfenster) können Sie je Arbeit einzeln über das **Kalender-Symbol** anlegen – oder für alle Arbeiten auf einmal mit dem **Schicht-Generator**:

1. **Zeitraum** – Start- und Enddatum (bei verknüpftem Event vorausgefüllt).
2. **Schichtverteilung** – Schichten pro Tag (z. B. 3 ≈ 4 Stunden pro Schicht) und optionale **Schichtüberlappung** (Zeit zur Übergabe).
3. **Vorschau & Anpassen** – Sie sehen alle generierten Schichten je Tag und können einzelne abwählen, bevor Sie sie mit **„X Schichten für Y Arbeiten anlegen"** übernehmen.

![Schicht-Generator](/img/screens/de/shift-generator.png)

## 4. Anmelde-Einstellungen & öffentlicher Link

Im Reiter **Einstellungen** legen Sie fest, wie sich Helfer eintragen, und finden den öffentlichen Link:

- **Öffentlicher Link** – `https://app.openeos.de/s/<plan>`. Über **Link kopieren** geben Sie ihn an die Helfer weiter, mit **Vorschau** öffnen Sie die öffentliche Seite.
- **Anmeldungs-Einstellungen**:
  - **Bestätigung erforderlich** – Anmeldungen müssen vom Admin bestätigt werden.
  - **Mehrere Schichten** – Helfer dürfen sich für mehrere Schichten eintragen.
  - **Max. Schichten pro Person** – Obergrenze (0 = unbegrenzt).
  - **Erinnerung** – Tage vor der Schicht eine Erinnerung senden.
  - **Verifizierungs-Erinnerungen** – an Helfer, die ihre E-Mail noch nicht bestätigt haben.

![Schichtplan-Einstellungen mit öffentlichem Link](/img/screens/de/shift-settings.png)

## 5. Veröffentlichen

Solange der Plan im Status **Entwurf** ist, ist er nur intern sichtbar. Klicken Sie oben rechts auf **Veröffentlichen**, um ihn freizugeben – der Status wechselt auf **Veröffentlicht** und der öffentliche Link wird aktiv.

:::tip
Veröffentlichen Sie erst, wenn Arbeiten und Schichten stehen. Änderungen sind aber auch danach jederzeit möglich.
:::

## Der öffentliche Helfer-Bereich

Über den öffentlichen Link gelangen Helfer **ohne Login** auf eine übersichtliche Seite mit Ihrem Logo, dem Zeitraum und allen Schichten. Pro Zeitfenster sehen sie je Arbeit, wie viele Plätze noch **frei** sind (z. B. „2 / 2 frei"). Zwischen **Karten-** und **Listenansicht** kann gewechselt werden.

![Öffentliche Helfer-Seite](/img/screens/de/public-helper.png)

Helfer wählen die gewünschten Schichten aus (überlappende Schichten werden automatisch gesperrt). Eine Leiste zeigt die Anzahl der gewählten Schichten und führt mit **Weiter** zum nächsten Schritt.

![Schichtauswahl durch Helfer](/img/screens/de/public-select.png)

Im Schritt **Deine Daten** trägt der Helfer **Name** und **E-Mail** (sowie optional **Telefon** und **Anmerkungen**) ein und klickt auf **Anmelden**. Anschließend erhält er eine **Bestätigungs-E-Mail** zu seiner Anmeldung.

![Helfer-Anmeldeformular](/img/screens/de/public-contact.png)

## Anmeldungen verwalten

Im Reiter **Anmeldungen** sehen Sie alle eingegangenen Helfer-Anmeldungen. Ist „Bestätigung erforderlich" aktiv, bestätigen Sie sie hier. Über **Helfer manuell eintragen** können Sie auch selbst jemanden zu einer Schicht hinzufügen.

![Anmeldungen verwalten](/img/screens/de/shift-anmeldungen.png)

:::tip Frühzeitig teilen
Erstellen und veröffentlichen Sie den Schichtplan rechtzeitig und verteilen Sie den öffentlichen Link (z. B. per Messenger oder E-Mail), damit sich genügend Helfer eintragen. Über die [Berechtigungen](./mitglieder.md) können Sie einer Schichtleitung gezielt nur das Modul **Schichtpläne** freigeben.
:::
