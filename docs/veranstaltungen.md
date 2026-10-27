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

### Was als Veranstaltungstag zählt {/* #veranstaltungstag */}

Ein Veranstaltungstag geht **von 6 bis 6 Uhr** (Ortszeit deiner Organisation), nicht von Mitternacht bis Mitternacht. Eine Nacht, die vor 6 Uhr morgens endet, gehört also noch zum Vortag:

| Zeitraum | Abgerechnete Tage |
|---|---|
| Sa 20:00 – So 02:00 | 1 |
| Sa 14:00 – Sa 23:00 | 1 |
| Fr 18:00 – Sa 06:00 | 1 — wer um genau 6 Uhr aufhört, beginnt keinen neuen Tag |
| Fr 17:00 – So 18:00 | 3 |

Im Formular trägst du nur Daten ein. Endet deine Veranstaltung nachts vor 6 Uhr, wähle deshalb den Tag als Enddatum, an dem der Abend beginnt — für die Party von Samstag 20 Uhr bis Sonntag 2 Uhr also Samstag bis Samstag. Die Öffnungszeiten des Online-Shops dürfen trotzdem bis in die Nacht reichen (z. B. 20:00 – 02:00).

Bereits freigeschaltete Veranstaltungen behalten die Tage und den Betrag, mit denen sie bezahlt wurden.

### Erst testen, dann bezahlen

Eine neue Veranstaltung startet im **Testmodus**. Darin ist alles benutzbar — Kassen, Anzeigen, Drucker, Auswertung — begrenzt auf **25 Bestellungen**. So probierst du den kompletten Ablauf aus, bevor Geld fließt.

Beim Freischalten werden die Testbestellungen gelöscht. **Deine Einrichtung bleibt**: Produkte, Kategorien, Preise, Standorte, Geräte und Drucker musst du nicht erneut anlegen.

:::tip[Unser Rat für das erste Fest]
Richte alles in Ruhe vorher ein und spiele im Testmodus einen Durchgang durch: eine Bestellung an der Kasse aufnehmen, auf der Küchenanzeige quittieren, einen Bon drucken. Dann weißt du am Festtag, dass die Kette steht.
:::

### Bezahlen

Freigeschaltet wird per **Karte oder Lastschrift**. Die Rechnung kommt automatisch per E-Mail und liegt zusätzlich unter **Rechnungen** zum Herunterladen bereit.

Im Bezahldialog steht auch, bis wann du kostenlos stornieren kannst.

Schließt du die Zahlungsseite, ohne zu bezahlen, läuft sie nach 24 Stunden ab. Die Veranstaltung ist dann wieder **nicht freigeschaltet**, und du bekommst die E-Mail „Zahlung nicht abgeschlossen“ (an die Rechnungs-E-Mail, sonst an die Administratoren). Dasselbe gilt, wenn eine Lastschrift nicht eingelöst wird — dann steht der Grund der Bank in der E-Mail, soweit bekannt. Du kannst die Veranstaltung jederzeit erneut freischalten.

### Freischaltung stornieren {/* #stornieren */}

Fällt die Veranstaltung aus oder hast du dich beim Datum vertan, kannst du die Freischaltung **bis 7 Tage vor Beginn kostenlos stornieren**. Du bekommst den vollen Betrag zurück. Voraussetzung: In der Veranstaltung gibt es noch **keine echten Bestellungen** — Testbestellungen zählen nicht.

In der Liste der Veranstaltungen öffnet das Symbol **Freischaltung** (Abzeichen mit Haken) die Übersicht: Status, bezahlter Betrag und die genaue Frist, etwa *Kostenlos stornierbar bis Fr., 04.09.2026, 17:00*. Beginnt die Veranstaltung um Mitternacht, steht dort der Vortag mit 23:59 — bei Beginn Sa., 12.09., 0:00 Uhr also *bis Fr., 04.09.2026, 23:59*. **Freischaltung stornieren** fragt noch einmal nach und zeigt Betrag, Rückweg und Folgen. Stornieren dürfen Administratoren der Organisation.

| Bezahlt per | Was zurückkommt |
|---|---|
| **Karte** | Der volle Betrag geht auf dieselbe Karte zurück, meist innerhalb von 5–10 Werktagen. |
| **Lastschrift** | Der volle Betrag wird auf dasselbe Konto zurücküberwiesen, in der Regel innerhalb von 5 Werktagen. |
| **Rechnung** | Ist die Rechnung schon gestellt, bekommst du eine Stornorechnung. Hast du sie bereits bezahlt, überweisen wir den Betrag zurück. |

Bei Karte und Lastschrift erscheint unter **Rechnungen** eine **Stornorechnung** zur ursprünglichen Rechnung, und an die Rechnungs-E-Mail geht eine Bestätigung.

Nach dem Stornieren:

- Die Veranstaltung ist nicht mehr freigeschaltet und läuft im **Testmodus** weiter (bis zu 25 Bestellungen). Deine Einrichtung bleibt.
- Du kannst sie später erneut freischalten; der Preis wird dann neu berechnet.
- War es deine erste bezahlte Veranstaltung, steht dir der **Starterbonus** wieder zu.

:::note[Wie die Frist gerechnet wird]
Maßgeblich ist der Beginn der Veranstaltung in der Zeitzone deiner Organisation: dieselbe Uhrzeit, sieben Kalendertage vorher. Verschiebst du die Veranstaltung nach dem Bezahlen nach hinten, bleibt es bei der Frist zum ursprünglichen Beginn. Ist die Frist abgelaufen oder gibt es schon Bestellungen, wende dich bitte an den Support.
:::

## Veranstaltung aktivieren

Neu angelegte Veranstaltungen sind zunächst **inaktiv**. In der Tabelle findest du pro Zeile Aktions-Schaltflächen zum **Bearbeiten**, **Aktivieren**, Verwalten und **Löschen**.

Aktiviere die gewünschte Veranstaltung – sie erscheint dann mit dem Status **AKTIV** und wird oben links in der Seitenleiste als aktives Event angezeigt. Erst danach lassen sich Produkte pflegen und Bestellungen erfassen.

:::info[Immer nur ein aktives Event]
Die aktive Veranstaltung steuert, welche Produkte an der Kasse erscheinen und welchem Event Bestellungen zugeordnet werden. Wechselst du das aktive Event, wechselt auch der Kontext in Produkten, Standorten und Inventur.
:::

## Status & Datum

In der Übersicht siehst du pro Veranstaltung Name, **Status** (Aktiv/Inaktiv) und den **Zeitraum**. So behältst du auch über mehrere Feste hinweg den Überblick.
