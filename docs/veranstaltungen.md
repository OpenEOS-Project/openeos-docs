---
sidebar_position: 5
title: Veranstaltungen
description: Veranstaltungen anlegen, aktivieren und verwalten.
---

# Veranstaltungen

Eine **Veranstaltung** (Event) ist der Rahmen für ein konkretes Fest oder einen Verkaufstag. Produkte, Preise, Standorte, Bestellungen und Auswertungen beziehen sich immer auf eine Veranstaltung. Bevor du Produkte anlegst oder Bestellungen annimmst, legst du deshalb zuerst eine Veranstaltung an und **aktivierst** sie.

Du findest den Bereich über **Veranstaltungen** in der Seitenleiste.

![Veranstaltungsübersicht](/img/screens/de/events.png)

## Veranstaltung erstellen

1. Klicke auf **Veranstaltung erstellen**.
2. Fülle das Formular aus:
   - **Name** (Pflicht) – z. B. „Sommerfest 2026“
   - **Beschreibung** – optionaler Zusatztext
   - **Startdatum** und **Enddatum** – ohne Enddatum dauert die Veranstaltung einen Tag
   - **Kassiermodus** – sofort kassieren oder auf Deckel buchen, siehe [unten](#kassiermodus)
   - **Tische** – ob und wie die Kassen nach einem Tisch fragen, siehe [unten](#tische)
   - **Online-Shop aktivieren** – erlaubt Gästen die Online-Bestellung von Artikeln dieses Events, mit Öffnungszeiten und optionaler Servicegebühr
3. Klicke auf **Erstellen**.

![Veranstaltung erstellen](/img/screens/de/events-dialog.png)

Alle Angaben lassen sich später über **Bearbeiten** ändern. Änderst du Kassiermodus oder Tische während des Betriebs, übernehmen die Kassen die neue Einstellung von selbst.

## Kassiermodus {/* #kassiermodus */}

Der Kassiermodus bestimmt, wann an der Kasse bezahlt wird:

| Kassiermodus | Für wen | An der Kasse |
|---|---|---|
| **Sofort kassieren** | Theke, Imbiss, Ausschank — der Gast zahlt beim Bestellen | Nur **Kassieren**: Bestellung und Zahlung in einem Zug |
| **Auf Deckel buchen** | Bedienung am Tisch — bezahlt wird am Ende | **Senden** schickt Runden an Küche und Theke, **Kassieren** rechnet am Ende alles ab, was am Tisch offen ist |

Wie das im Einzelnen aussieht, steht unter [Kasse](./kasse.md#senden-oder-kassieren).

## Tische {/* #tische */}

![Kassiermodus und Tische im Dialog der Veranstaltung](/img/screens/de/events-dialog-tables.png)

Unter **Tische** legst du fest, ob die Kassen nach einem Tisch fragen:

| Einstellung | An der Kasse |
|---|---|
| **Keine Tische (Thekenbetrieb)** | Alle Kassen buchen an der Theke, ohne nach einem Tisch zu fragen. |
| **Tischnummer frei eingeben** | Die Kasse fragt eine beliebige Nummer ab. Es müssen keine Tische angelegt sein. Das ist die Voreinstellung. |
| **Vordefinierte Tische** | Die Kasse bietet nur die angelegten Tische an — als Nummer, als Liste und auf dem Tischplan. |

Bei **Vordefinierte Tische** wählst du zusätzlich die **Bereiche für diese Veranstaltung**, etwa nur *Zelt A*, wenn der Biergarten dieses Jahr zu bleibt. **Alle Bereiche** schließt später angelegte Bereiche mit ein. Bereiche und Tische selbst pflegst du unter [Tische](./tische.md) — der Link **Tische verwalten** im Dialog führt dorthin. Sind noch keine Tische angelegt, weist der Dialog darauf hin; die Kassen können dann nur ohne Tisch buchen.

:::note[Tisch heißt nicht automatisch Bedienung]
Ob eine Kasse überhaupt nach dem Tisch fragt, hängt zusätzlich am Gerät: Kassen im Betriebsmodus **Feste Kasse** buchen immer an der Theke, egal was hier steht. Siehe [Geräte](./geraete.md#betriebsmodus).
:::

## Was eine Veranstaltung kostet

OpenEOS wird **pro Veranstaltungstag** abgerechnet, nicht pro Bestellung und nicht im Abo. Beim Anlegen steht der Betrag direkt unter dem Zeitraum, zum Beispiel:

> **Freischalten kostet 60,00 €**
> 3 Tage × 25,00 € = 75,00 €, abzüglich 20 % Erstveranstalter-Nachlass
> Vorher testen ist kostenlos — bis zu 25 Bestellungen im Testmodus.

Änderst du das Datum, ändert sich der Betrag mit.

### Erst testen, dann bezahlen

Eine neue Veranstaltung startet im **Testmodus**. Darin ist alles benutzbar — Kassen, Anzeigen, Drucker, Auswertung — begrenzt auf **25 Bestellungen**. So probierst du den kompletten Ablauf aus, bevor Geld fließt.

Beim Freischalten werden die Testbestellungen gelöscht. **Deine Einrichtung bleibt**: Produkte, Kategorien, Preise, Standorte, Geräte und Drucker musst du nicht erneut anlegen.

:::tip[Unser Rat für das erste Fest]
Richte alles in Ruhe vorher ein und spiele im Testmodus einen Durchgang durch: eine Bestellung an der Kasse aufnehmen, auf der Küchenanzeige quittieren, einen Bon drucken. Dann weißt du am Festtag, dass die Kette steht.
:::

### Bezahlen

Freigeschaltet wird per **Karte oder Lastschrift**. Die Rechnung kommt automatisch per E-Mail und liegt zusätzlich unter **Rechnungen** zum Herunterladen bereit.

## Veranstaltung aktivieren

Neu angelegte Veranstaltungen sind zunächst **inaktiv**. In der Tabelle findest du pro Zeile Aktions-Schaltflächen zum **Bearbeiten**, **Aktivieren**, Verwalten und **Löschen**.

Aktiviere die gewünschte Veranstaltung – sie erscheint dann mit dem Status **AKTIV** und wird oben links in der Seitenleiste als aktives Event angezeigt. Erst danach lassen sich Produkte pflegen und Bestellungen erfassen.

:::info[Immer nur ein aktives Event]
Die aktive Veranstaltung steuert, welche Produkte an der Kasse erscheinen und welchem Event Bestellungen zugeordnet werden. Wechselst du das aktive Event, wechselt auch der Kontext in Produkten, Standorten und Inventur.
:::

## Status & Datum

In der Übersicht siehst du pro Veranstaltung Name, **Status** (Aktiv/Inaktiv) und den **Zeitraum**. So behältst du auch über mehrere Feste hinweg den Überblick.
