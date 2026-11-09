---
sidebar_position: 16
title: Bedienungen
description: Kassenprofile mit PIN für Helferinnen und Helfer an gemeinsam genutzten Kassen – ohne Konto und ohne E-Mail.
---

# Bedienungen

Eine **Bedienung** ist ein Kassenprofil ohne Konto und ohne E-Mail. Es besteht aus **Name**, optional einem **Kurznamen** (höchstens 12 Zeichen), einer **Farbe**, einer **Rolle** und einer **PIN**. Damit wechseln Helferinnen und Helfer an gemeinsam genutzten Kassen in Sekunden, und jede Buchung zeigt, wer sie gebucht hat.

- Bedienungen haben **keinen Zugang zur Verwaltung**. Sie melden sich nur an Kassen an.
- Bedienungen zählen **nicht** zu den 10 [Mitgliedern](./mitglieder.md#plätze-und-höchstzahl). Technisch ist bei **200 Bedienungen** je Organisation Schluss.
- Eine Kasse fragt nur dann nach einer Bedienung, wenn sie unter **Geräte → Einstellungen** auf **Gemeinsame Kasse** oder **Feste Bedienung** steht, siehe [Gerätemodi](#geraetemodi).

:::note[Nicht verwechseln]
„Bedienung“ heißt auch ein [Betrieb der Kasse](./geraete.md#betriebsmodus) (Tischservice statt Feste Kasse). Das ist etwas anderes: Ob eine Kasse nach dem Tisch fragt und ob sich an ihr Bedienungen anmelden, stellst du getrennt ein. Eine Feste Kasse kann genauso mit Bedienungen arbeiten.
:::

## Wer Bedienungen verwaltet {/* #verwalten */}

Bedienungen verwalten **Administratoren** und Mitglieder mit der Berechtigung **Bedienungen** (vergeben unter [Mitglieder](./mitglieder.md#modulbasierte-berechtigungen)). Du erreichst den Bereich über **Bedienungen** in der Seitenleiste.

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

- **PIN-Zettel drucken** erzeugt im Browser ein A4-Blatt mit 10 Karten und Schnittlinien. Jede Karte zeigt Verein, Veranstaltung, Name, Kurzname und PIN, dazu den Hinweis, die PIN nicht weiterzugeben. Alternativ gibst du die PIN direkt weiter.
- **PIN vergessen?** Mit **Neue PIN** bekommt die Person eine neue. Offene Anmeldungen an Kassen enden dabei.
- **Ein gemeinsamer PIN-Raum:** Mitglieder und Bedienungen teilen sich die PINs. Eine Mitglieds-PIN und eine Bedienungs-PIN sind nie gleich.
- **Länge neuer PINs:** 4 Ziffern (Standard) oder 6 Ziffern, siehe [Einstellungen](#einstellungen). Für Bedienungen, die für die ganze Organisation gelten, empfehlen wir 6 Ziffern.

:::tip[Vor dem Fest]
Lege die Bedienungen mit **Mehrere anlegen** an, drucke direkt danach den PIN-Zettel und schneide die Karten aus. Später kommst du an diese PINs nicht mehr heran – nur noch über **Neue PIN**.
:::

## Gültig für {/* #gueltigkeit */}

- **Ganze Organisation** – die Bedienung kann sich bei jeder Veranstaltung anmelden. Gut für feste Kräfte.
- **Veranstaltung** – die Bedienung gilt nur für eine Veranstaltung. Sie kann sich nur anmelden, solange diese Veranstaltung aktiv ist oder im Testmodus steht. Sonst zeigt die Kasse „Deine PIN gilt nur für eine andere Veranstaltung.“

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

## Deaktivieren und löschen {/* #deaktivieren */}

- **Deaktivieren** – die PIN wird gelöscht, und die Kasse sperrt sofort. Die Bedienung bleibt in der Liste.
- **Aktivieren** – die Bedienung ist wieder da. Vergib dann mit **Neue PIN** eine neue PIN.
- **Löschen** – hat die Bedienung noch nichts gebucht, wird sie gelöscht. Hat sie schon gebucht, wird sie deaktiviert und ihr Name durch „Bedienung N“ ersetzt. Der Name in den steuerlichen Aufzeichnungen (Kassenabschluss) bleibt erhalten.

## Einstellungen {/* #einstellungen */}

Die Karte **Einstellungen für Bedienungen** auf der Seite sehen Administratoren. Sie gilt für alle Kassen der Organisation.

| Einstellung | Auswahl |
|---|---|
| **Länge neuer PINs** | 4 Ziffern (Standard) oder 6 Ziffern. Gilt für PINs, die ab jetzt erzeugt werden. |
| **Name auf Bons** | **Kurzname (wenn gesetzt)** oder **Voller Name** |
| **Fremde Tische** | **Buchen erlaubt, mit Hinweis** oder **Buchen erlaubt, ohne Hinweis** – siehe [Tische](#tische) |

## Gerätemodi {/* #geraetemodi */}

Ob und wie sich jemand an einer Kasse anmeldet, stellst du je Gerät unter **Geräte → Gerät → Einstellungen** ein ([Bedienung & Sicherheit](./geraete.md#pin-und-sperre)):

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
- Nach dem Anmelden steht oben rechts ein **Chip** mit Farbe und Kurzname. Ein Tipp darauf öffnet **Wechseln**, **Sperren** und **Abmelden**.
- Beim Sperren oder Wechseln merkt sich die Kasse den nicht gesendeten Warenkorb **je Bedienung** auf diesem Gerät. Meldet sich dieselbe Person wieder an, ist er zurück. Die Kasse zeigt dazu einen Hinweis, etwa „Der Warenkorb wird für Anna gemerkt.“ Der Warenkorb liegt nur im Speicher: Nach einem Neuladen ist er weg.
- **Automatische Sperre** nach einer Zeit ohne Berührung (Geräte-Einstellung, an gemeinsamen Kassen Standard 2 Minuten). Während einer laufenden Zahlung sperrt die Kasse nie.
- Optional **Nach jedem Kassieren sperren** – praktisch an der Theke, damit jede Person unter ihrem eigenen Namen kassiert.
- Nach einem **Neuladen** der Seite fragt die Kasse die PIN erneut ab.
- **Offline** lässt sich die Kasse nicht entsperren: „Keine Verbindung – Entsperren ist erst wieder online möglich“. Ein kurzer Verbindungsabbruch beendet die Anmeldung aber nicht.
- Optional zeigt der PIN-Bildschirm **Namenskacheln** mit Kurzname und Farbe. Standardmäßig sind sie aus, damit keine Namen sichtbar sind.

### Falsche PINs {/* #fehlversuche */}

| Falsche PINs an einem Gerät | Folge |
|---|---|
| 5 | PIN-Eingabe 30 Sekunden gesperrt |
| 10 | PIN-Eingabe 5 Minuten gesperrt |
| 20 | PIN-Eingabe gesperrt, bis ein Admin sie unter **Geräte → Gerät → Einstellungen** mit **PIN-Eingabe freigeben** wieder öffnet |

Gibt es in der ganzen Organisation auffällig viele Fehlversuche, pausiert die PIN-Eingabe kurz an allen Geräten.

### Tische {/* #tische */}

- Wer an einem Tisch die erste Bestellung aufnimmt (oder eine Gastbestellung bestätigt), wird die **verantwortliche Bedienung** des Tisches.
- **Offene Tische** zeigt den Filter **Meine / Alle**. **Meine** ist voreingestellt: deine Tische und Tische, die noch niemandem gehören. Bei jedem Tisch stehen Kurzname und Farbe der verantwortlichen Bedienung.
- An einem fremden Tisch darfst du buchen und kassieren. Die Kasse zeigt dann zum Beispiel „Tisch von Anna“ (abschaltbar unter [Fremde Tische](#einstellungen)). Das Geld zählt für die Person, die kassiert.

### Storno und Erstattung {/* #storno */}

- Mit dem Recht **Stornieren & Erstatten** geht es direkt.
- Ohne das Recht fragt die Kasse nach der PIN einer **Schichtleitung**, eines Mitglieds mit der Berechtigung **Bestellungen** oder eines Admins. OpenEOS hält fest, wer freigegeben hat.

Wie die Kasse grundsätzlich mit Storno umgeht (erlaubt, nur mit PIN, aus), stellst du je Gerät ein, siehe [Geräte](./geraete.md#storno-erstatten).

### Mitglieder an der Kasse

Mitglieder können sich weiter mit ihrer **Mitglieds-PIN** an einer Kasse anmelden und arbeiten dann wie eine Bedienung. Bestehende Mitglieds-PINs gelten weiter. Beim ersten Gebrauch übernimmt OpenEOS sie in den gemeinsamen PIN-Raum.

## Was festgehalten wird {/* #zuordnung */}

Jede dieser Buchungen wird der angemeldeten Bedienung zugeordnet:

- Bestellungen und Runden (wer die Runde an Küche und Theke geschickt hat)
- Zahlungen, mit dem Trinkgeld je Zahlung
- Storno und Erstattung – und wer sie freigegeben hat
- Pfand-Auszahlungen
- Öffnen der Kassenlade und Buchungen im [Kassenbuch](./kassenbuch.md)

Auf Küchen- und Thekenbons zeigt das Element **Bedienung** ([Drucker](./drucker.md#bedienung-und-gerät-auf-dem-bon)) die erste vorhandene Angabe: wer die Runde gesendet hat ▸ verantwortliche Bedienung des Tisches ▸ Mitglied ▸ Name des Geräts. Standardmäßig steht dort der Kurzname, siehe [Name auf Bons](#einstellungen).

Für die DSFinV-K speichert OpenEOS den Namen, den die Bedienung beim Signieren hatte, als **BEDIENER**.

## Datenschutz {/* #datenschutz */}

:::info[Hinweis]
Zu einer Bedienung speichert OpenEOS nur Name, Kurzname, Farbe, Rolle und den Prüfwert der PIN – keine E-Mail, keine Telefonnummer. Anmeldungen an Kassen stehen nur mit Gerät und Zeiten.

Informiere dein Kassenpersonal darüber, dass Buchungen ihm zugeordnet werden, etwa beim Ausgeben des PIN-Zettels. Habt ihr Beschäftigte, können Fragen des Beschäftigtendatenschutzes (§ 26 BDSG) oder der Mitbestimmung durch einen Betriebsrat dazukommen. Das ist keine Rechtsberatung; klär das im Zweifel mit eurer Datenschutzberatung.
:::

## Was noch fehlt

Kellnerabrechnung, Kellnerbrieftasche, Trinkgeld-Auszahlung, Tischübergabe und die Übernahme von Helfern aus den [Schichtplänen](./schichtplaene.md) folgen später.
