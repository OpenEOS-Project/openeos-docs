---
sidebar_position: 16
title: Bedienungen
description: Kassenprofile mit PIN für Helferinnen und Helfer an gemeinsam genutzten Kassen – ohne Konto und ohne E-Mail. Mit Abrechnung, Tischübergabe und Löschfristen.
---

# Bedienungen

Eine **Bedienung** ist ein Kassenprofil ohne Konto und ohne E-Mail. Es besteht aus **Name**, optional einem **Kurznamen** (höchstens 12 Zeichen), einer **Farbe**, einer **Rolle** und einer **PIN**. Damit wechseln Helferinnen und Helfer an gemeinsam genutzten Kassen in Sekunden, und jede Buchung zeigt, wer sie gebucht hat.

- Bedienungen haben **keinen Zugang zur Verwaltung**. Sie melden sich nur an Kassen an.
- Bedienungen zählen **nicht** zu den 10 [Mitgliedern](./mitglieder.md#plätze-und-höchstzahl). Technisch ist bei **200 Bedienungen** je Organisation Schluss; über der Liste steht, wie viele angelegt sind (etwa „12 von 200 angelegt“).
- Eine Kasse fragt nur dann nach einer Bedienung, wenn sie unter **Geräte → Einstellungen** auf **Gemeinsame Kasse** oder **Feste Bedienung** steht, siehe [Gerätemodi](#geraetemodi).

:::note[Nicht verwechseln]
„Bedienung“ heißt auch ein [Betrieb der Kasse](./geraete.md#betriebsmodus) (Tischservice statt Feste Kasse). Das ist etwas anderes: Ob eine Kasse nach dem Tisch fragt und ob sich an ihr Bedienungen anmelden, stellst du getrennt ein. Eine Feste Kasse kann genauso mit Bedienungen arbeiten.
:::

## Wer Bedienungen verwaltet {/* #verwalten */}

Bedienungen verwalten **Administratoren** und Mitglieder mit der Berechtigung **Bedienungen** (vergeben unter [Mitglieder](./mitglieder.md#modulbasierte-berechtigungen)). Du erreichst den Bereich über **Bedienungen** in der Seitenleiste.

![Bedienungen: Liste mit Rolle, PIN, Status und Aktionen](/img/screens/de/waiters.png)

Die Liste zeigt je Bedienung Rolle, **Gültig für**, PIN-Länge, **Zuletzt angemeldet** und Status. Über **Gültigkeit filtern** siehst du nur die Bedienungen einer Veranstaltung.

## Bedienungen anlegen {/* #anlegen */}

### Einzeln

1. Klicke auf **Bedienung anlegen**.
2. Gib den **Namen** ein. Ein Vorname oder Spitzname genügt.
3. Optional: einen **Kurznamen** (höchstens 12 Zeichen). Er erscheint an der Kasse und auf den Bons.
4. Wähle **Gültig für**, **Farbe** und **Rolle**. Bei Bedarf passt du unter **Rechte** einzelne Schalter an (siehe [Rollen und Rechte](#rollen)).
5. Optional: eine **eigene PIN** mit 4 bis 6 Ziffern. Lässt du das Feld leer, erzeugt OpenEOS die PIN.
6. Klicke auf **Anlegen**.

Einfache PINs wie `1234`, `0000` oder `1212` und PINs, die schon jemand hat, nimmt OpenEOS nicht an. Du siehst dann „Diese PIN ist nicht verfügbar“.

### Mehrere auf einmal {/* #mehrere */}

Mit **Mehrere anlegen** fügst du eine ganze Namensliste ein: ein Name je Zeile. Wahlweise ergänzt du Kurzname und Rolle, getrennt durch Semikolon (`Name;Kurzname;Rolle`). Als Rolle schreibst du `Bedienung` oder `Schichtleitung`.

![Mehrere Bedienungen anlegen: ein Name je Zeile](/img/screens/de/waiters-bulk.png)

```text
Anna Berger;Anna
Ben Krämer
Lea Schmidt;Lea;Schichtleitung
```

- Zeilen ohne Rolle bekommen die **Rolle (Vorgabe)** aus dem Dialog.
- **Gültig für** steht von selbst auf der laufenden Veranstaltung.
- Doppelte Namen überspringt OpenEOS. Fehlerhafte Zeilen nennt der Dialog mit Zeilennummer.
- Bis zu **200** auf einmal.

Jede Person bekommt eine PIN.

## PINs und PIN-Zettel {/* #pin */}

OpenEOS erzeugt die PINs selbst. Du siehst sie **nur einmal**: direkt nach dem Anlegen und nach **Neue PIN**. Gespeichert ist nur ein Prüfwert, aus dem sich die PIN nicht zurückrechnen lässt. Auch Admins können eine PIN später nicht mehr ansehen.

![Die neuen PINs, einmalig angezeigt, mit „PIN-Zettel drucken“](/img/screens/de/waiters-pin-sheet.png)

- **PIN-Zettel drucken** erzeugt im Browser ein A4-Blatt mit 10 Karten und Schnittlinien. Jede Karte zeigt Verein, Veranstaltung, Name, Kurzname und PIN, dazu den Hinweis, die PIN nicht weiterzugeben. Alternativ gibst du die PIN direkt weiter.
- **PIN vergessen?** Mit **Neue PIN** bekommt die Person eine neue. Offene Anmeldungen an Kassen enden dabei.
- **Ein gemeinsamer PIN-Raum:** Mitglieder und Bedienungen teilen sich die PINs. Eine Mitglieds-PIN und eine Bedienungs-PIN sind nie gleich.
- **Länge neuer PINs:** 4 Ziffern (Standard) oder 6 Ziffern, siehe [Einstellungen](#einstellungen). Für Bedienungen, die für die ganze Organisation gelten, empfehlen wir 6 Ziffern.

:::tip[Vor dem Fest]
Lege die Bedienungen mit **Mehrere anlegen** an, drucke direkt danach den PIN-Zettel und schneide die Karten aus. Später kommst du an diese PINs nicht mehr heran – nur noch über **Neue PIN**.
:::

## Gültig für {/* #gueltigkeit */}

- **Ganze Organisation** – die Bedienung kann sich bei jeder Veranstaltung anmelden. Gut für feste Kräfte.
- **Veranstaltung** – die Bedienung gilt nur für eine Veranstaltung. Sie kann sich nur anmelden, solange diese Veranstaltung aktiviert ist (auch in den [Phasen](./veranstaltungen.md#phasen) Geplant und Beendet) oder im Testmodus steht. Sonst zeigt die Kasse „Deine PIN gilt nur für eine andere Veranstaltung.“

## Rollen und Rechte {/* #rollen */}

Es gibt zwei Rollen:

- **Bedienung** – bucht und kassiert. Stornieren und Erstatten, die Kassenlade von Hand öffnen und das Kassenbuch gehen nur mit Freigabe. Rabatt-Bons einlösen darf sie.
- **Schichtleitung** – darf all das selbst und gibt mit ihrer PIN anderen Storno und Erstattung frei.

| Recht | Bedienung | Schichtleitung |
|---|---|---|
| **Stornieren & Erstatten** | nur mit Freigabe | ja |
| **Kassenlade von Hand öffnen** | nur mit Freigabe | ja |
| **Rabatt-Bons einlösen** | ja | ja |
| **Kassenbuch** | nur mit Freigabe | ja |

Je Person kannst du diese vier Schalter abweichend von der Rolle setzen. So darf etwa eine erfahrene Bedienung auch das Kassenbuch führen.

- Fehlt **Stornieren & Erstatten**, fragt die Kasse nach der PIN einer Schichtleitung, siehe [Storno und Erstattung](#storno).
- Fehlen **Kassenlade von Hand öffnen** oder **Kassenbuch**, zeigt die Kasse den Menüpunkt nicht. Dann meldet sich kurz eine Schichtleitung an.
- Beim Barkassieren öffnet sich die Kassenlade **immer** von selbst – dafür braucht niemand ein Recht.

## Arbeitnehmer (Lohnkonto) {/* #arbeitnehmer */}

Jede Bedienung hat das Kennzeichen **„Arbeitnehmer (Lohnkonto)“**. Es ist standardmäßig aus. Setze es nur für Personen, die beim Verein **angestellt** sind und für die ihr ein Lohnkonto führt, etwa im Minijob.

| | Kennzeichen aus (Standard) | Kennzeichen an |
|---|---|---|
| Trinkgeld beim Kassieren | gehört dem Verein (`TrinkgeldAG`, mit dem Steuersatz der Waren) | gehört der Bedienung (`TrinkgeldAN`, ohne Umsatzsteuer) |
| Kartentrinkgeld bar auszahlen | gesperrt | möglich, siehe [Trinkgeld auszahlen](#trinkgeld-auszahlen) |

Ehrenamtliche Helferinnen und Helfer sind keine Arbeitnehmer – auch dann nicht, wenn sie Trinkgeld in die Vereinskasse abgeben. Bei Helfern mit Ehrenamts- oder Übungsleiterpauschale kommt es auf den Einzelfall an. Mehr unter [Trinkgeld](./trinkgeld.md).

## Deaktivieren und löschen {/* #deaktivieren */}

- **Deaktivieren** – die PIN wird gelöscht, und die Kasse sperrt sofort. Die Bedienung bleibt in der Liste.
- **Aktivieren** – die Bedienung ist wieder da. Vergib dann mit **Neue PIN** eine neue PIN.
- **Löschen** – hat die Bedienung noch nichts gebucht, wird sie gelöscht. Hat sie schon gebucht, wird sie deaktiviert und ihr Name durch „Bedienung N“ ersetzt. Der Name in den steuerlichen Aufzeichnungen (Kassenabschluss) bleibt erhalten. Mehr unter [Datenschutz und Löschfristen](#loeschen).

## Einstellungen {/* #einstellungen */}

Die Karte **Einstellungen für Bedienungen** auf der Seite sehen Administratoren. Sie gilt für alle Kassen der Organisation.

| Einstellung | Auswahl |
|---|---|
| **Länge neuer PINs** | 4 Ziffern (Standard) oder 6 Ziffern. Gilt für PINs, die ab jetzt erzeugt werden. |
| **Name auf Bons** | **Kurzname (wenn gesetzt)** oder **Voller Name** |
| **Fremde Tische** | **Buchen erlaubt, mit Hinweis** oder **Buchen erlaubt, ohne Hinweis** – siehe [Tische](#tische) |
| **Abrechnen** | **Nur Schichtleitung und Admins** (Standard) oder **Bedienungen rechnen selbst ab**. Mit der zweiten Wahl darf sich jede Bedienung an der Kasse selbst abrechnen, siehe [Abrechnen](#abrechnen). |

## Gerätemodi {/* #geraetemodi */}

Ob und wie sich jemand an einer Kasse anmeldet, stellst du je Gerät unter **Geräte → Gerät → Einstellungen** ein ([Bedienung & Sicherheit](./geraete.md#pin-und-sperre)):

![Geräteeinstellungen: Bedienung & Sicherheit](/img/screens/de/device-settings-waiters.png)

| Modus | So arbeitet die Kasse |
|---|---|
| **Ohne Bedienung** | wie bisher: niemand meldet sich an, Buchungen zählen für das Gerät |
| **Gemeinsame Kasse** | vor dem Buchen meldet sich eine Bedienung mit ihrer PIN an („Wer bedient?“); Wechseln und Sperren mit einem Tipp |
| **Feste Bedienung** | das Gerät gehört einer Bedienung, etwa ihr Handy; keine PIN-Eingabe |

Wird die feste Bedienung eines Geräts deaktiviert, zeigt die Kasse „Gerät ist keiner Bedienung zugeordnet“, bis ein Admin eine andere wählt.

## An der Kasse {/* #kasse */}

So läuft es an einer **Gemeinsamen Kasse**. Mehr zum Ablauf steht unter [Kasse](./kasse.md#pin-und-sperre).

### Anmelden, wechseln, sperren

- Die Kasse zeigt den PIN-Bildschirm **„Wer bedient?“**. Die PIN allein reicht – sie gehört genau einer Person.
- Nach dem Anmelden steht oben rechts ein **Chip** mit Farbe und Kurzname. Ein Tipp darauf öffnet **Mein Zwischenstand**, **Wechseln**, **Sperren** und **Abmelden**; für eine Schichtleitung steht dort auch **Abrechnen** (siehe [Abrechnung](#abrechnung)).
- Beim Sperren oder Wechseln merkt sich die Kasse den nicht gesendeten Warenkorb **je Bedienung** auf diesem Gerät. Meldet sich dieselbe Person wieder an, ist er zurück. Die Kasse zeigt dazu einen Hinweis, etwa „Der Warenkorb wird für Anna gemerkt.“ Der Warenkorb liegt nur im Speicher: Nach einem Neuladen ist er weg.
- **Automatische Sperre** nach einer Zeit ohne Berührung (Geräte-Einstellung, an gemeinsamen Kassen Standard 2 Minuten). Während einer laufenden Zahlung sperrt die Kasse nie.
- Optional **Nach jedem Kassieren sperren** – praktisch an der Theke, damit jede Person unter ihrem eigenen Namen kassiert.
- Nach einem **Neuladen** der Seite fragt die Kasse die PIN erneut ab.
- **Offline** lässt sich die Kasse nicht entsperren: „Keine Verbindung – Entsperren ist erst wieder online möglich“. Ein kurzer Verbindungsabbruch beendet die Anmeldung aber nicht.
- Optional zeigt der PIN-Bildschirm **Namenskacheln** mit Kurzname und Farbe. Standardmäßig sind sie aus, damit keine Namen sichtbar sind.

![PIN-Bildschirm „Wer bedient?“ mit Namenskacheln](/img/screens/de/pos-waiter-pin.png)

### Falsche PINs {/* #fehlversuche */}

| Falsche PINs an einem Gerät | Folge |
|---|---|
| 5 | PIN-Eingabe 30 Sekunden gesperrt |
| 10 | PIN-Eingabe 5 Minuten gesperrt |
| 20 | PIN-Eingabe gesperrt, bis ein Admin sie unter **Geräte → Gerät → Einstellungen** mit **PIN-Eingabe freigeben** wieder öffnet |

Gibt es in der ganzen Organisation auffällig viele Fehlversuche, pausiert die PIN-Eingabe kurz an allen Geräten.

### Tische {/* #tische */}

- Wer an einem Tisch die erste Bestellung aufnimmt (oder eine Gastbestellung bestätigt), wird die **verantwortliche Bedienung** des Tisches.
- **Offene Tische** zeigt an einer Gemeinsamen Kasse den Filter **Meine / Alle**. **Meine** ist voreingestellt: deine Tische und Tische, die noch niemandem gehören. Bei jedem Tisch stehen Kurzname und Farbe der verantwortlichen Bedienung.
- Auf dem Tischplan steht an jedem offenen Tisch der Kurzname der verantwortlichen Bedienung in ihrer Farbe.
- An einem fremden Tisch darfst du buchen und kassieren. Die Kasse zeigt dann zum Beispiel „Tisch von Anna“ (abschaltbar unter [Fremde Tische](#einstellungen)). Das Geld zählt für die Person, die kassiert.
- Soll jemand anderes den Tisch weiterführen, übergibst du ihn, siehe [Tischübergabe](#tischuebergabe).

### Storno und Erstattung {/* #storno */}

- Mit dem Recht **Stornieren & Erstatten** geht es direkt.
- Ohne das Recht fragt die Kasse nach der PIN einer **Schichtleitung**, eines Mitglieds mit der Berechtigung **Bestellungen** oder eines Admins. OpenEOS hält fest, wer freigegeben hat.

Wie die Kasse grundsätzlich mit Storno umgeht (erlaubt, nur mit PIN, aus), stellst du je Gerät ein, siehe [Geräte](./geraete.md#storno-erstatten).

### Mitglieder an der Kasse

Mitglieder können sich weiter mit ihrer **Mitglieds-PIN** an einer Kasse anmelden und arbeiten dann wie eine Bedienung. Bestehende Mitglieds-PINs gelten weiter. Beim ersten Gebrauch übernimmt OpenEOS sie in den gemeinsamen PIN-Raum.

## Abrechnung {/* #abrechnung */}

Am Ende der Schicht rechnet jede Bedienung ab: Was hat sie kassiert, wie viel Bargeld gehört in die Schublade, sind noch Tische offen? Eine Abrechnung gilt für eine Veranstaltung und beginnt dort, wo die letzte Abrechnung dieser Bedienung aufgehört hat – gibt es noch keine, mit dem Beginn der Veranstaltung.

### Mein Zwischenstand {/* #zwischenstand */}

Tippe an der Kasse oben rechts auf deinen Chip und wähle **Mein Zwischenstand**. Du siehst, was seit deiner letzten Abrechnung zusammengekommen ist:

![Mein Zwischenstand an der Kasse](/img/screens/de/pos-waiter-summary.png)

| Block | Inhalt |
|---|---|
| **Kassiert** | je Zahlart – **Bar**, **Karte**, **Sonstige** (etwa PayPal oder online) – Betrag und Anzahl, dazu **Gesamt** und **davon Trinkgeld** |
| **Storno, Erstattung, Pfand** | **Storno/Erstattung bar**, **Storno/Erstattung unbar** und **Pfand ausgezahlt** |
| **Aufgenommen** | **Bestellungen**, **Positionen**, **Umsatz brutto** und **Rabatte** – nur zur Information |
| **Soll bar** | Barzahlungen − Bar-Erstattungen − Pfand-Auszahlungen, aufgeteilt nach Gerät, etwa „Schublade Kasse 2“ |
| **Offene Tische** | etwa „2 offene Tische“: deine Tische, die noch nicht bezahlt sind, mit offenem Betrag |

- Kassierst du an einem fremden Tisch, zählt das Geld für dich.
- **Wertmarken:** Hast du [Wertmarken](./wertmarken.md#kellnerabrechnung) angenommen, zeigt der Block **WERTMARKEN (abgeben)** sie je Typ. Du gibst sie ab wie Bargeld; im **Soll bar** stecken sie nicht. Bargeld aus Markenverkäufen erhöht das Soll bar, ein Rücktausch mindert es.
- **Soll bar** ist nur ein Richtwert. Das Bargeld bleibt in der Schublade der Kasse und wird wie bisher beim [Kassensturz](./kassenbuch.md) des Geräts gezählt.
- **Zwischenstand drucken** gibt den Stand auf dem Bondrucker der Kasse aus – unverbindlich, ohne Nummer und ohne Unterschriftszeilen.

Mitglieder, die mit ihrer Mitglieds-PIN kassieren, sehen ihren Zwischenstand genauso.

### Abrechnen {/* #abrechnen */}

Abrechnen dürfen eine **Schichtleitung** und Administratoren:

- **An der Kasse:** Chip antippen → **Abrechnen**. Bei „Wen rechnest du ab?“ die Bedienung antippen, dann auf **… abrechnen** (etwa **Anna abrechnen**) tippen.
- **In der Verwaltung:** **Bedienungen** → in der Zeile der Bedienung das Symbol **… abrechnen**. Hier dürfen alle, die [Bedienungen verwalten](#verwalten). Unter **Bon drucken auf** wählst du einen Drucker oder **Nicht drucken**; dann auf **Abrechnen** klicken.

Sich selbst abrechnen darf eine Bedienung nur, wenn unter [Einstellungen](#einstellungen) bei **Abrechnen** die Wahl **Bedienungen rechnen selbst ab** gilt. Dann steht in **Mein Zwischenstand** der Knopf **Abrechnen**.

Das Ergebnis ist eine **Abrechnung mit fortlaufender Nummer** je Organisation („Abrechnung Nr. 17“). Sie lässt sich nicht mehr ändern.

- Der Bon kommt auf den Bondrucker der Kasse, mit Unterschriftszeilen für **Bedienung** und **Kasse / Schichtleitung**. In der Verwaltung gibt es jederzeit einen **Nachdruck**; er trägt den Vermerk **„-- KOPIE --“**.
- Die nächste Abrechnung derselben Bedienung beginnt dort, wo diese endet.
- Ist seit der letzten Abrechnung nichts passiert, meldet OpenEOS „Seit der letzten Abrechnung gibt es nichts abzurechnen.“

### Mit Cloud-TSE abgesichert {/* #abrechnung-tse */}

Hat deine Organisation eine aktive [Cloud-TSE](./integrationen/cloud-tse.md), sichert die TSE jede Abrechnung ab, bevor der Bon gedruckt wird – mit Abrechnungsnummer, **Soll**, gezähltem Betrag (**Ist**, wenn erfasst) und **Differenz**. Auf dem Bon stehen dann Beleg-Nr., TSE-Transaktion und Signaturzähler; ist die TSE nicht erreichbar, steht dort „TSE nicht erreichbar“. Im DSFinV-K-Export steht die Abrechnung als eigener Vorgang „Kellnerabrechnung“ ohne Zahlung. Abrechnungen im Testmodus werden nicht abgesichert.

Die Abrechnung bewegt kein Geld: Das Bargeld bleibt in der Schublade der Kasse, und eine Differenz der Schublade bucht wie bisher der [Kassensturz](./kassenbuch.md).

:::info[Nur elektronisch]
Kellnerabrechnungen werden ausschließlich elektronisch erzeugt und aufbewahrt. Die Abrechnung in OpenEOS ist unveränderlich, lässt sich jederzeit wieder ausgeben und wird zehn Jahre aufbewahrt. Der gedruckte Bon und jeder Nachdruck sind nur eine Wiedergabe. Führt ihr zusätzlich Papierlisten mit Unterschrift oder handschriftlicher Zählung, sind diese selbst Unterlagen und müsst ihr aufbewahren.
:::

### Offene Tische blockieren {/* #offene-tische */}

Hat die Bedienung noch offene Tische, lässt sich nicht abrechnen. Du hast zwei Wege:

1. Die Tische an jemand anderen **übergeben**, siehe [Tischübergabe](#tischuebergabe). Danach geht die Abrechnung durch.
2. Als Schichtleitung oder Admin **Trotz offener Tische abrechnen (Notiz nötig)** ankreuzen. Dafür ist eine Notiz Pflicht, etwa „Tisch 12 zahlt morgen“. Bon und Liste der Abrechnungen zeigen das.

### Training und Nur Bons {/* #training */}

- **Testmodus:** Buchungen aus dem Testmodus (und aus der Phase Geplant) stehen getrennt unter „Training (nicht im Geld)“. Eine Abrechnung mit nur Testbuchungen bekommt keine Nummer („Training-Abrechnung“). Sie wird zusammen mit den Testbestellungen gelöscht, wenn du die Veranstaltung freischaltest bzw. der echte Verkauf beginnt.
- **[Nur Bons](./betriebsarten.md#nur-bons):** Zwischenstand und Abrechnung zeigen nur Mengen (Bestellungen, Positionen), keine Beträge. Offene Tische blockieren hier nicht.

### Abrechnungen in der Verwaltung {/* #abrechnungen */}

Auf der Seite **Bedienungen** steht unter der Liste der Abschnitt **Abrechnungen**, die neuesten zuerst: **Nr.**, **Bedienung**, **Zeitraum**, **Kassiert**, **Soll bar** und **Abgerechnet von**. Markiert ist, was **trotz offener Tische** abgerechnet wurde, und Abrechnungen aus dem **Training**. **Gültigkeit filtern** grenzt auch diese Liste auf eine Veranstaltung ein. Das Symbol **Abrechnung Nr. … ansehen** öffnet die Einzelheiten; dort wählst du einen Drucker (Standard: **Bondrucker der Kasse**) und druckst mit **Nachdruck** erneut.

![Abrechnungen unter der Liste der Bedienungen](/img/screens/de/waiters-settlements.png)

### Live-Kassensturz {/* #live-kassensturz */}

Bei den Kellnerabrechnungen findest du den **Live-Kassensturz**: für jede Bedienung der Stand seit ihrer letzten Abrechnung, mit dem Zeitpunkt, zu dem er erstellt wurde. Eine Schichtleitung sieht ihn auch an der Kasse.

- **Soll bar** je Bedienung und in welcher Schublade das Bargeld liegt
- Zahlungen, Trinkgeld, Erstattungen und ausgezahltes Pfand
- offene Tische
- noch nicht ausgezahltes Kartentrinkgeld angestellter Bedienungen

Kommt das Finanzamt zur [Kassen-Nachschau](./kassen-nachschau.md), zeigst du damit, wie viel Bargeld jede Bedienung jetzt haben muss – Geld bei den Bedienungen gehört zum Kassenbestand.

### Trinkgeld auszahlen {/* #trinkgeld-auszahlen */}

Bedienungen mit [„Arbeitnehmer (Lohnkonto)“](#arbeitnehmer) kannst du offenes **Kartentrinkgeld** bar auszahlen – an der Kasse als Schichtleitung, in der Verwaltung als Admin oder direkt beim Abrechnen. Jede Auszahlung ist ein eigener, mit Cloud-TSE signierter Beleg mit Quittung zum Unterschreiben und mindert den Soll-Bestand der Schublade. Höchstens das offene Kartentrinkgeld lässt sich auszahlen. Bei Ehrenamtlichen ist die Auszahlung gesperrt, denn dort gehört das Trinkgeld dem Verein. Einzelheiten unter [Trinkgeld](./trinkgeld.md#auszahlung).

:::note[Kommt später]
Die **Kellnerbrieftasche** (die Bedienung kassiert mit eigenem Wechselgeld und rechnet ihr Bargeld selbst ab) fehlt noch.
:::

## Tischübergabe {/* #tischuebergabe */}

Geht eine Bedienung nach Hause, übernimmt jemand anderes ihre Tische.

- **An der Kasse:** Den Tisch öffnen und im **Menü** auf **Tisch übergeben** tippen, oder in **Mein Zwischenstand** beim offenen Tisch auf **Übergeben …**. Bei „Wer übernimmt?“ die neue Bedienung antippen. Alle offenen Bestellungen des Tisches, die zur selben Bedienung gehören, wandern zusammen.
- **Wer darf?** Eigene Tische übergibt jede Bedienung selbst. Fremde Tische übergeben nur eine Schichtleitung oder ein Admin.
- Die Kassen der neuen Bedienung bekommen einen Hinweis, etwa „Tisch 12 wurde dir übergeben.“, und auf dem Tischplan wechseln Kurzname und Farbe am Tisch.
- Jede Übergabe steht im Bestellverlauf, etwa „Tisch übergeben von Anna an Ben“.
- **In der Verwaltung:** Beim Abrechnen (Symbol **… abrechnen**) wählst du unter den offenen Tischen bei **Übergeben an …** die neue Bedienung und klickst auf **Offene Tische übergeben**. So wandern alle offenen Tische einer Bedienung auf einmal.

## Was festgehalten wird {/* #zuordnung */}

Jede dieser Buchungen wird der angemeldeten Bedienung zugeordnet:

- Bestellungen und Runden (wer die Runde an Küche und Theke geschickt hat)
- Zahlungen, mit dem Trinkgeld je Zahlung
- Storno und Erstattung – und wer sie freigegeben hat
- Pfand-Auszahlungen
- Trinkgeld-Auszahlungen (an wen, von wem ausgezahlt)
- Tischübergaben (von wem an wen)
- Öffnen der Kassenlade und Buchungen im [Kassenbuch](./kassenbuch.md)

Auf Küchen- und Thekenbons zeigt das Element **Bedienung** ([Drucker](./drucker.md#bedienung-und-gerät-auf-dem-bon)) die erste vorhandene Angabe: wer die Runde gesendet hat ▸ verantwortliche Bedienung des Tisches ▸ Mitglied ▸ Name des Geräts. Standardmäßig steht dort der Kurzname, siehe [Name auf Bons](#einstellungen).

Für die DSFinV-K speichert OpenEOS den Namen, den die Bedienung beim Signieren hatte, als **BEDIENER**.

Die Zahlen je Person zeigt der Bericht [Bedienungen](./auswertung.md#bedienungen) in der Auswertung; im [CSV-Export der Bestellungen](./bestellungen.md#als-csv-exportieren) steht die Spalte **Bedienung**.

## Datenschutz und Löschfristen {/* #datenschutz */}

### Was OpenEOS speichert

Zu einer Bedienung speichert OpenEOS:

- Name (Vorname oder Spitzname genügt), Kurzname, Farbe, Rolle und Rechte
- die PIN nur als Prüfwert, aus dem sie sich nicht zurückrechnen lässt
- Anmeldungen an Kassen mit Gerät und Zeiten
- die zugeordneten Buchungen und die Abrechnungen

Keine E-Mail, keine Telefonnummer. OpenEOS wertet weder Arbeitszeiten noch Leistung je Stunde aus.

:::info[Hinweis]
Informiere dein Kassenpersonal darüber, dass Buchungen ihm zugeordnet werden, etwa per Aushang an der Kasse oder beim Ausgeben des PIN-Zettels. Die Vorlage für den Datenschutzhinweis deines Shops (unter **Rechtliches → Rechtstexte für deinen Shop**) hat dafür den Abschnitt „7. Kassenpersonal (Bedienungen)“.

Habt ihr Beschäftigte, etwa in der Gastronomie, können der Beschäftigtendatenschutz (§ 26 BDSG) und die Mitbestimmung des Betriebsrats (§ 87 Abs. 1 Nr. 6 BetrVG) dazukommen. Das ist keine Rechtsberatung; klär das im Zweifel mit eurer Datenschutzberatung.
:::

### Automatisch löschen {/* #loeschfristen */}

OpenEOS räumt jede Nacht auf (auf einer eigenen Installation erst, wenn du das automatische Löschen einschaltest, siehe [Aufbewahrung und Löschung](./selbst-betreiben/betrieb.md#aufbewahrung-und-löschung)):

| Was | Wann | Was passiert |
|---|---|---|
| Bedienung für eine **Veranstaltung** | 30 Tage nach dem Ende der Veranstaltung | anonymisiert |
| Bedienung für die **ganze Organisation** | 30 Tage nach dem Deaktivieren oder nach 12 Monaten ohne Anmeldung | anonymisiert |
| Bedienung **ohne jede Buchung** | zu denselben Terminen | gelöscht statt anonymisiert |
| Anmeldungen an Kassen | nach 90 Tagen | gelöscht |

- **Anonymisiert** heißt: Der Name wird zu „Bedienung N“, Kurzname, Farbe und PIN verschwinden. In den Protokollen von Storno und Erstattung steht dasselbe Pseudonym statt des Namens.
- Abrechnungen behalten ihre Nummer und ihre Beträge; der Name verschwindet mit der Anonymisierung.
- Die Liste der Bedienungen zeigt rechtzeitig „wird am … anonymisiert“.

:::note[Steuerarchiv]
TSE-Daten, DSFinV-K, Kassenabschlüsse und Kassenbuch behalten den Namen, den die Bedienung beim Buchen hatte. Diese Aufzeichnungen müssen 10 Jahre aufbewahrt werden und werden nicht anonymisiert.
:::

### Bedienung oder Veranstaltung löschen {/* #loeschen */}

- **Bedienung löschen:** Ohne Buchungen wird sie entfernt. Mit Buchungen wird sie deaktiviert und sofort anonymisiert.
- **Veranstaltung löschen:** Ihre Bedienungen können sich nicht mehr anmelden. Bedienungen ohne Buchungen werden entfernt, die anderen deaktiviert und später anonymisiert. Die Buchungen bleiben ihnen zugeordnet.

### Auskunft {/* #auskunft */}

Fragt eine Bedienung, was OpenEOS über sie gespeichert hat (Art. 15 DSGVO), klickst du unter **Bedienungen** in ihrer Zeile auf das Symbol **Auskunft über … exportieren (CSV)**. Du bekommst eine CSV-Datei mit den Stammdaten (ohne PIN), den Anmeldungen, den Abrechnungen und der Anzahl der Buchungen.

## Was noch fehlt

Die Kellnerbrieftasche und die Übernahme von Helfern aus den [Schichtplänen](./schichtplaene.md) folgen später.

:::note
Das ist keine Steuerberatung. Wie ihr abrechnet und mit Differenzen umgeht, haltet ihr in eurer [Verfahrensdokumentation](./verfahrensdokumentation.md#kellnerabrechnung) fest.
:::
