---
sidebar_position: 11
title: Geräte (Kassen)
description: Smartphones und Tablets als Kassen registrieren und verwalten.
---

# Geräte (Kassen)

Als **Geräte** registrierst du die Smartphones und Tablets, die als Kasse (POS) dienen. OpenEOS benötigt keine spezielle Hardware – jedes moderne Gerät mit Browser kann zur mobilen Kasse werden. Geräte gehören zur **Organisation** und stehen damit für alle Veranstaltungen zur Verfügung.

Du erreichst den Bereich über **Geräte** in der Seitenleiste.

![Geräteübersicht mit QR-Code](/img/screens/de/devices.png)

## Gerätetypen

Beim Freigeben eines Geräts legst du fest, welche Rolle es einnimmt:

- **Kasse** – mobile Kasse (POS) zur Erfassung von Bestellungen.
- **Display** – Tablet oder Bildschirm, das entweder als [Kundendisplay](#kundendisplay) den Warenkorb einer Kasse spiegelt oder als [Stationsanzeige](#kundendisplay) Bestellungen für Küche, Bar oder Ausgabe anzeigt.

Drucker-Agents (der OpenEOS Drucker-Agent) werden separat unter [Drucker](./drucker.md) verwaltet und erscheinen nicht in dieser Geräteliste.

## Neues Gerät verbinden

![Das Gerät zeigt Zahl und QR-Code](/img/screens/de/device-pair.png)

Das Gerät zeigt eine Zahl, verknüpft wird sie in deinem Konto. Auf dem Gerät selbst brauchst du weder Zugangsdaten noch das Kürzel deiner Organisation.

1. **Auf dem Gerät** öffnest du `app.openeos.de` und wählst unten **Als Gerät verwenden (Kassen-Terminal)** — bei einem Bildschirm stattdessen **Als Anzeige verwenden (Monitor)**.
2. Das Gerät zeigt eine **sechsstellige Zahl** am Stück (etwa `573080`), darunter einen QR-Code als zweiten Weg.
3. **In der Verwaltung** gehst du auf **Geräte**, klickst in der Karte **Neues Gerät registrieren** auf **Gerät verbinden** und gibst die Zahl ein. Du kannst sie auch einfügen, etwa aus einer Nachricht: Leerzeichen und Bindestriche lässt OpenEOS weg.

![Die Zahl vom Gerät eintragen und freigeben](/img/screens/de/device-verify.png)
 Mit einem Telefon scannst du stattdessen den QR-Code — er führt direkt auf die Eingabemaske.
4. Vergib einen **Namen** (z. B. „Kasse Theke 1“) und wähle den **Gerätetyp**.

Danach wechselt das Gerät von selbst in die Kasse bzw. Anzeige.

:::note[Warum eine Zahl]
Am Tablet hat niemand das Kürzel der Organisation zur Hand, und an einem Fernseher hängt selten eine Tastatur. Eine sechsstellige Zahl lässt sich ablesen und durchsagen — mehr ist nicht nötig.
:::

Den Registrierungslink kannst du über **Kopieren** in die Zwischenablage übernehmen und z. B. per Nachricht an das Kassenpersonal verteilen.

Im Freigabe-Dialog **„Gerät freigeben“** wählst du zusätzlich den **Gerätetyp** (Kasse oder Anzeige) aus – diese Auswahl wird direkt bei der Freigabe gespeichert. Kassen starten dabei automatisch im Modus „Bedienung“ (Tischservice), Displays starten als Kundendisplay. Beides kannst du später jederzeit unter **Geräte → Gerät → Einstellungen** anpassen.

## Geräte verwalten

Registrierte Geräte erscheinen in der Liste auf der Geräte-Seite. Dort behältst du den Überblick, welche Kassen mit deiner Organisation verbunden sind, und kannst Geräte bei Bedarf wieder entfernen.

:::warning[Freigabe erforderlich]
Ein Gerät wird erst zur Kasse, wenn du es mit dem angezeigten Code **freigibst**. So verhinderst du, dass unbefugte Geräte Bestellungen erfassen.
:::

Ein Klick auf ein Gerät öffnet seine Seite. Oben stehen Name, Status (**Online**/**Offline**) und rechts **Sperren** und **Löschen**, darunter die Reiter **Übersicht**, **Einstellungen** und — bei Kassen — **Drucker**.

## Übersicht {/* #uebersicht */}

Die Kacheln oben in der **Übersicht** zeigen auf einen Blick, wofür das Gerät eingerichtet ist:

- **Kasse** — **Betrieb** (*Bedienung* oder *Feste Kasse*), bei Bedienung darunter der Standardbereich und die Tischwahl, etwa „Bereich Zelt A · Tischwahl: Karte“. Daneben Bestellungen, Zahlungen und Umsatz des Geräts.
- **Kundendisplay** — **Verknüpft mit**: die Kasse, deren Warenkorb das Display spiegelt.
- **Stationsanzeige** — **Standort**: welche Station der Bildschirm zeigt.

Fehlt die Zuordnung, steht dort „nicht zugewiesen“ und darunter der Link **In den Einstellungen festlegen**.

## Einstellungen {/* #einstellungen */}

Unter **Einstellungen** sind die Optionen nach Themen gegliedert. Was von einer Wahl abhängt, steht direkt darunter und erscheint erst, wenn die Wahl getroffen ist. Mit **Speichern** übernimmst du alles; eine Kasse oder Anzeige übernimmt die Änderung sofort, ohne neu zu laden.

- **Allgemein** — **Name** und **Gerätetyp** (Kasse oder Anzeige). Der Typ bestimmt, welche Gruppen darunter erscheinen.

### Einstellungen einer Kasse

![Einstellungen einer Kasse: Betrieb mit Tischen, Zahlung und PIN](/img/screens/de/device-settings.png)

| Gruppe | Was du einstellst |
|---|---|
| **Betrieb** | *Bedienung* oder *Feste Kasse*; bei Bedienung darunter **Tische** mit Standardbereich und Tischwahl |
| **Zahlung** | den SumUp-Kartenleser dieser Kasse (sobald [SumUp](./integrationen/sumup.md) eingerichtet ist) |
| **Sicherheit (PIN)** | **PIN erforderlich** |

#### Betrieb {/* #betriebsmodus */}

- **Bedienung** — die Kasse fragt vor jeder Bestellung nach dem Tisch, sofern die Veranstaltung mit Tischen arbeitet. Für Bedienungen, die mit Tablet oder Telefon von Tisch zu Tisch gehen.
- **Feste Kasse** — keine Tischabfrage; alles wird an der Theke gebucht. Für Theke, Imbiss und Ausschank.

Ob tatsächlich nach einem Tisch gefragt wird, entscheidet zusätzlich der Tischmodus der [Veranstaltung](./veranstaltungen.md#tische). Die Übersicht steht unter [Kasse](./kasse.md#start).

#### Standardbereich {/* #standardbereich */}

Bei **Bedienung** erscheint unter der Wahl der Block **Tische**. Dort gibst du der Kasse einen **Standardbereich**, etwa *Zelt A*. Die Kasse zeigt den Bereich dann im Kopf („Kasse 3 · Zelt A“) und öffnet ihn in der Tischliste und auf dem Tischplan zuerst. Ohne Standardbereich stehen die Bereiche in ihrer normalen Reihenfolge. Bereiche legst du unter [Tische](./tische.md) an.

#### Tischwahl an der Kasse {/* #tischwahl */}

Ebenfalls im Block **Tische** legst du fest, wie diese Kasse einen Tisch öffnet:

| Tischwahl | Die Kasse zeigt beim Öffnen und unter „Tisch wählen“ … |
|---|---|
| **Automatisch** | die Karte, wenn der Standardbereich einen Tischplan hat, sonst die Liste |
| **Nummer eingeben** | den Ziffernblock |
| **Liste** | alle Tische als Kacheln, nach Bereichen |
| **Karte** | den Tischplan (erst wählbar, wenn ein Bereich einen Tischplan hat) |

An der Kasse gibt es dafür keinen Umschalter: Jede Kasse zeigt genau ihre Ansicht. So kann die Bedienung im Zelt mit der Karte arbeiten und die Theke mit dem Ziffernblock. Arbeitet die Veranstaltung mit **frei eingegebenen** Tischnummern, zeigt jede Kasse den Ziffernblock.

#### PIN und Sperre {/* #pin-und-sperre */}

Mit **PIN erforderlich** muss sich an der Kasse jede Person mit ihrer eigenen PIN anmelden. Die PINs (4 bis 6 Ziffern) verwaltest du je Mitglied unter [Mitglieder](./mitglieder.md). Die Kasse zeigt dann oben rechts, wer angemeldet ist, und mit dem Schloss daneben lässt sie sich sperren, ohne dass der Warenkorb verloren geht — siehe [Kasse](./kasse.md#pin-und-sperre).

Ohne PIN ist die Kasse für jeden bedienbar, der das Gerät in der Hand hat.

### Einstellungen einer Anzeige {/* #kundendisplay */}

| Gruppe | Was du einstellst |
|---|---|
| **Anzeige** | den **Anzeigemodus** und darunter, was dazugehört |
| **Aussehen & Inhalt** | Farbgebung, Schriftgröße, Kopfzeile, Text im Ruhezustand, Logo |

Unter **Anzeige** wählst du den **Anzeigemodus**:

- **Kundendisplay** — ein Tablet, das dem Gast zugewandt ist und live den Warenkorb einer Kasse spiegelt. Darunter wählst du die **Kasse**; Positionen, Mengen und Summen erscheinen dann in Echtzeit, sobald an der Kasse eingegeben wird.
- **Stationsanzeige** — zeigt die Bestellungen eines [Standorts](./standorte.md), etwa Küche oder Ausgabe. Darunter wählst du den **Standort** aus der aktiven Veranstaltung und mit **Erledigte ausblenden**, wann fertige Bestellungen verschwinden.

Neu registrierte Anzeigen starten als Kundendisplay. Mehr zu beiden Arten und zu **Aussehen & Inhalt** steht unter [Anzeigen einrichten](./anzeigen.md).

## Von der Kasse zur Bestellung

Sobald ein Gerät freigegeben und eine [Veranstaltung aktiv](./veranstaltungen.md) ist, zeigt die Kasse die Produkte der aktiven Veranstaltung an. Aufgenommene Bestellungen erscheinen in Echtzeit unter [Bestellungen](./bestellungen.md) und – sofern eingerichtet – an den zugeordneten [Standorten](./standorte.md) und Druckern.
