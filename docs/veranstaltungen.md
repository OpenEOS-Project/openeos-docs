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

In Deutschland ist die [Cloud-TSE](./integrationen/cloud-tse.md#automatisch) für Bargeld (Betriebsart **Alle Funktionen**) derzeit **inklusive** – es gibt nur diesen einen Preis. OpenEOS richtet sie nach dem Freischalten automatisch ein. Die TSE läuft für den Monat deiner Veranstaltung und wird zum Monatsende automatisch abgemeldet – außer du hast im Folgemonat schon eine bezahlte Veranstaltung, dann bleibt sie aktiv (siehe [Laufzeit der Cloud-TSE](./integrationen/cloud-tse.md#laufzeit)).

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

Beim Freischalten werden die Testbestellungen gelöscht. Bis zum Termin bleibt die Veranstaltung dann **Geplant** und du kannst weiter testen (siehe [Phasen](#phasen)). **Deine Einrichtung bleibt**: Produkte, Kategorien, Preise, Standorte, Geräte und Drucker musst du nicht erneut anlegen.

:::tip[Unser Rat für das erste Fest]
Richte alles in Ruhe vorher ein und spiele im Testmodus einen Durchgang durch: eine Bestellung an der Kasse aufnehmen, auf der Küchenanzeige quittieren, einen Bon drucken. Dann weißt du am Festtag, dass die Kette steht.
:::

### Angaben beim ersten Kauf {/* #pflichtangaben */}

Bei der Registrierung fragen wir keine Steuer- oder Rechnungsdaten ab. Erst wenn du eine Veranstaltung freischaltest, braucht der Dialog ein paar Angaben zu deiner Organisation – fehlen sie, steht dort *Noch ein Schritt vor dem Bezahlen*, und **Weiter** öffnet ein kurzes Formular:

- den **offiziellen Namen** (z. B. *Musikverein Harmonie e.V.*) und die **Rechnungsanschrift**,
- in Deutschland mit [Cloud-TSE](./integrationen/cloud-tse.md) zusätzlich die **Steuernummer** oder **USt-IdNr.** – eine der beiden genügt.

**Speichern und weiter** legt die Angaben bei deiner Organisation ab, danach geht es zur Zahlung. Beim nächsten Kauf ist alles schon da. Ändern kannst du die Angaben unter **Einstellungen → Organisation** ([Steuerangaben](./organisation.md#steuerangaben)).

### Bezahlen

Freigeschaltet wird per **Karte oder Lastschrift**. Die Rechnung kommt automatisch per E-Mail und liegt zusätzlich unter **Rechnungen** zum Herunterladen bereit.

Im Bezahldialog steht auch, bis wann du kostenlos stornieren kannst.

Schließt du die Zahlungsseite, ohne zu bezahlen, läuft sie nach 24 Stunden ab. Die Veranstaltung ist dann wieder **nicht freigeschaltet**, und du bekommst die E-Mail „Zahlung nicht abgeschlossen“ (an die Rechnungs-E-Mail, sonst an die Administratoren). Dasselbe gilt, wenn eine Lastschrift nicht eingelöst wird — dann steht der Grund der Bank in der E-Mail, soweit bekannt. Du kannst die Veranstaltung jederzeit erneut freischalten.

### Auf Rechnung bezahlen {/* #auf-rechnung */}

Ist für deine Organisation der Kauf **auf Rechnung** eingerichtet (das richtet das OpenEOS-Team auf Anfrage ein), läuft das Freischalten so:

1. Im Freischalten-Dialog trägst du Rechnungsempfänger, Rechnungs-E-Mail und Anschrift ein. Der Dialog nennt das Zahlungsziel, zum Beispiel *zahlbar innerhalb von 14 Tagen*.
2. Die Veranstaltung ist **sofort freigeschaltet**. Du musst nicht auf den Zahlungseingang warten.
3. Die Rechnung kommt per E-Mail an die Rechnungs-E-Mail. Ausgestellt wird sie über unseren Zahlungsdienstleister **Stripe**. Darauf stehen die Veranstaltungstage, ein Nachlass als eigene Zeile, das Fälligkeitsdatum und die Bankverbindung für die Überweisung.
4. Du bezahlst **per Überweisung** auf die IBAN aus der Rechnung, oder über den Link **Rechnung bezahlen** online per Karte oder Lastschrift.

:::tip[Überweisen, ohne nachzufragen]
Gib die **Rechnungsnummer als Verwendungszweck** an, dann wird die Zahlung automatisch zugeordnet. Die IBAN auf der Rechnung gilt nur für deine Organisation und bleibt bei allen Rechnungen dieselbe.
:::

Unter **Rechnungen** siehst du jede Rechnung mit Status (*offen*, *bezahlt*, *überfällig*, *storniert*), Fälligkeitsdatum und PDF. Solange eine Rechnung offen ist, führt **Bezahlen** direkt zur Zahlungsseite. Den Zahlungsstand zeigt auch die Übersicht der Freischaltung (Symbol mit Abzeichen in der Liste der Veranstaltungen).

Ist die Rechnung nach dem Fälligkeitsdatum noch offen, steht sie als **überfällig** da, und du bekommst gegebenenfalls eine Zahlungserinnerung per E-Mail. Die Freischaltung bleibt trotzdem bestehen. Hast du Fragen zur Rechnung, melde dich beim Support.

Schlägt eine Online-Zahlung über die Rechnungsseite fehl (Karte abgelehnt, Lastschrift nicht eingelöst), bekommst du die E-Mail „Zahlung der Rechnung fehlgeschlagen“. Es wurde nichts abgebucht, die Rechnung bleibt offen, und du kannst es über denselben Link noch einmal versuchen – auch per Überweisung.

Wird eine Rechnung vom OpenEOS-Team aufgehoben (storniert oder als uneinbringlich geschlossen), musst du sie nicht mehr bezahlen. Gibt es in der Veranstaltung noch keine echten Bestellungen, ist damit auch die Freischaltung aufgehoben und die Veranstaltung läuft im Testmodus weiter; gibt es schon Bestellungen, bleibt sie freigeschaltet und der Support klärt mit dir, wie es weitergeht. In beiden Fällen bekommst du eine E-Mail.

### Freischaltung stornieren {/* #stornieren */}

Fällt die Veranstaltung aus oder hast du dich beim Datum vertan, kannst du die Freischaltung **bis 7 Tage vor Beginn kostenlos stornieren**. Du bekommst den vollen Betrag zurück. Voraussetzung: In der Veranstaltung gibt es noch **keine echten Bestellungen** — Testbestellungen zählen nicht.

In der Liste der Veranstaltungen öffnet das Symbol **Freischaltung** (Abzeichen mit Haken) die Übersicht: Status, bezahlter Betrag und die genaue Frist, etwa *Kostenlos stornierbar bis Fr., 04.09.2026, 17:00*. Beginnt die Veranstaltung um Mitternacht, steht dort der Vortag mit 23:59 — bei Beginn Sa., 12.09., 0:00 Uhr also *bis Fr., 04.09.2026, 23:59*. **Freischaltung stornieren** fragt noch einmal nach und zeigt Betrag, Rückweg und Folgen. Stornieren dürfen Administratoren der Organisation.

| Bezahlt per | Was zurückkommt |
|---|---|
| **Karte** | Der volle Betrag geht auf dieselbe Karte zurück, meist innerhalb von 5–10 Werktagen. |
| **Lastschrift** | Der volle Betrag wird auf dasselbe Konto zurücküberwiesen, in der Regel innerhalb von 5 Werktagen. |
| **Rechnung, noch nicht bezahlt** | Die Rechnung wird storniert und steht unter **Rechnungen** als *storniert*. Du musst nichts mehr zahlen. |
| **Rechnung, schon bezahlt** | Du bekommst eine Stornorechnung. Hast du per Karte oder Lastschrift bezahlt, geht der Betrag automatisch zurück. Hast du überwiesen, schickt dir Stripe eine E-Mail, in der du die Bankverbindung für die Rücküberweisung angibst. |

Wurde bezahlt, erscheint unter **Rechnungen** eine **Stornorechnung** zur ursprünglichen Rechnung, und an die Rechnungs-E-Mail geht eine Bestätigung.

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

## Phasen: Geplant, Aktiv, Beendet {/* #phasen */}

Eine freigeschaltete Veranstaltung verkauft nicht sofort und nicht unbegrenzt echt. Was gerade gilt, steht in der Liste der Veranstaltungen, oben links in der Seitenleiste und an der Kasse:

| Phase | Wann | Was passiert |
|---|---|---|
| **Testmodus** | vor dem Kauf | bis zu 25 Testbestellungen (siehe oben) |
| **Geplant** | freigeschaltet, vor dem Verkaufsstart | Kasse, Tische und QR-Bestellung buchen **Testbestellungen** – du kannst alles in Ruhe ausprobieren. Der Shop nimmt nur mit [Vorverkauf](#vorverkauf) Bestellungen an. |
| **Aktiv** | vom Verkaufsstart bis zum Verkaufsende | echte Verkäufe |
| **Beendet** | nach dem Verkaufsende | keine neuen Bestellungen mehr – offene Bestellungen kassieren, Tische schließen, erstatten und stornieren geht weiter; Auswertung, Exporte und Kassenbuch bleiben |

In der Liste steht zum Beispiel bei einem Fest am 16. und 17.11. **Geplant** mit dem Hinweis *Startet am 15.11. um 18:00 Uhr (Testbetrieb bis dahin)*, an der Kasse der Streifen *Testbetrieb – echte Verkäufe ab 15.11. um 18:00 Uhr*.

### Verkaufsstart am Vorabend {/* #verkaufsstart */}

Echte Verkäufe beginnen **12 Stunden vor dem ersten Veranstaltungstag** (6 Uhr) – bei einem Fest am 16. also am 15. um 18 Uhr. So kannst du schon am Vorabend kassieren, zum Beispiel beim Aufbauabend. Unter **Echter Verkauf beginnt vorher** stellst du je Veranstaltung einen anderen Vorlauf ein (0 bis 24 Stunden).

Zum Verkaufsstart werden die Testbestellungen aus der Phase *Geplant* gelöscht – wie beim Freischalten. Deine Einrichtung bleibt, die Bestellnummern beginnen neu. Echte Bestellungen (etwa aus dem Vorverkauf) bleiben selbstverständlich.

:::note[Mit Cloud-TSE nie im Vormonat]
Nutzt du die [Cloud-TSE](integrationen/cloud-tse.md), beginnt der Verkauf frühestens am Monatsersten um 0 Uhr – eine TSE kostet jeden Monat, in dem sie läuft. Bei einem Fest am 1. gibt es dann keinen Vorabend-Verkauf am Monatsletzten.
:::

### Verkaufsende und Kulanz {/* #verkaufsende */}

Ein Veranstaltungstag läuft bis 6 Uhr am nächsten Morgen. Danach hast du noch **6 Stunden Kulanz**: Spätere Deckel kannst du bis 12 Uhr abschließen. Ab dann ist die Veranstaltung **Beendet**. Die Zusatzstunden kosten nichts – abgerechnet werden die Veranstaltungstage.

### Vorverkauf im Shop {/* #vorverkauf */}

Mit **Vorverkauf im Shop** (Abschnitt Online-Shop im Veranstaltungsdialog) nimmt der Shop schon in der Phase *Geplant* **echte** Bestellungen an – bis zum Verkaufsstart. Ohne Vorverkauf öffnet der Shop erst mit der Veranstaltung. Hast du für den Shop eine Wochentags-Tabelle, gilt sie auch im Vorverkauf; Öffnungszeiten je Veranstaltungstag gelten erst ab dem Verkaufsstart, der Vorverkauf ist bis dahin durchgehend offen. Vorverkaufs-Bestellungen zählen als echte Bestellungen – auch für die [kostenlose Stornierung](#stornieren).

### Verschieben {/* #verschieben */}

Solange die Veranstaltung *Geplant* ist, kannst du sie verschieben (innerhalb der bezahlten Tage). Ab dem Verkaufsstart steht der Beginn fest; das Ende kannst du nur noch vorziehen, etwa wenn ein Tag ausfällt. Ist die Veranstaltung beendet, lässt sich nichts mehr verschieben. Musst du trotzdem verschieben, hilft der Support.

:::info[Eigene Installation]
Ohne Abrechnung gelten die Phasen genauso – Testbetrieb vorher, kein Verkauf nach dem Ende –, aber ohne Grenze für Testbestellungen und ohne Sperre beim Verschieben: Verlängere einfach das Ende, wenn du weiter verkaufen willst. Mit `EVENT_DATE_PHASES=false` zählt wie früher nur der Status.
:::

## Status & Datum

In der Übersicht siehst du pro Veranstaltung Name, **Phase** (Testmodus, Geplant, Aktiv, Beendet oder Inaktiv) mit einem Hinweis zum Verkaufsstart bzw. -ende und den **Zeitraum**. So behältst du auch über mehrere Feste hinweg den Überblick.
