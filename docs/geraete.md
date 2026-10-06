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
- **Display** – Tablet oder Bildschirm, das entweder als [Kundendisplay](#kundendisplay) den Warenkorb einer Kasse spiegelt oder als Standort-Display Bestellungen für Küche, Bar oder Ausgabe anzeigt.

Drucker-Agents (der OpenEOS Drucker-Agent) werden separat unter [Drucker](./drucker.md) verwaltet und erscheinen nicht in dieser Geräteliste.

## Neues Gerät verbinden

![Das Gerät zeigt Zahl und QR-Code](/img/screens/de/device-pair.png)

Das Gerät zeigt eine Zahl, verknüpft wird sie in deinem Konto. Auf dem Gerät selbst brauchst du weder Zugangsdaten noch das Kürzel deiner Organisation.

1. **Auf dem Gerät** öffnest du `app.openeos.de` und wählst unten **Als Gerät verwenden (Kassen-Terminal)** — bei einem Bildschirm stattdessen **Als Anzeige verwenden (Monitor)**.
2. Das Gerät zeigt eine **sechsstellige Zahl**, darunter einen QR-Code als zweiten Weg.
3. **In der Verwaltung** gehst du auf **Geräte** und gibst die Zahl ein.

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

Unter **Geräte → Gerät → Einstellungen** änderst du jederzeit den Gerätetyp sowie – je nach Typ – die Einstellungen der Kasse oder den Display-Modus eines Displays.

## Einstellungen einer Kasse

![Einstellungen einer Kasse: Betriebsmodus, Standardbereich und PIN](/img/screens/de/device-settings.png)

### Betriebsmodus {/* #betriebsmodus */}

- **Bedienung** — die Kasse fragt vor jeder Bestellung nach dem Tisch, sofern die Veranstaltung mit Tischen arbeitet. Für Bedienungen, die mit Tablet oder Telefon von Tisch zu Tisch gehen.
- **Feste Kasse** — keine Tischabfrage; alles wird an der Theke gebucht. Für Theke, Imbiss und Ausschank.

Ob tatsächlich nach einem Tisch gefragt wird, entscheidet zusätzlich der Tischmodus der [Veranstaltung](./veranstaltungen.md#tische). Die Übersicht steht unter [Kasse](./kasse.md#start).

### Standardbereich {/* #standardbereich */}

Bei **Bedienung** kannst du der Kasse einen **Standardbereich** geben, etwa *Zelt A*. Die Kasse zeigt den Bereich dann im Kopf („Kasse 3 · Zelt A“) und öffnet ihn in der Tischliste und auf dem Tischplan zuerst. Hat der Bereich einen Tischplan, startet die Kasse beim ersten Mal mit der Karte. Ohne Standardbereich stehen die Bereiche in ihrer normalen Reihenfolge. Bereiche legst du unter [Tische](./tische.md) an.

### PIN und Sperre {/* #pin-und-sperre */}

Mit **PIN erforderlich** muss sich an der Kasse jede Person mit ihrer eigenen PIN anmelden. Die PINs (4 bis 6 Ziffern) verwaltest du je Mitglied unter [Mitglieder](./mitglieder.md). Die Kasse zeigt dann oben rechts, wer angemeldet ist, und mit dem Schloss daneben lässt sie sich sperren, ohne dass der Warenkorb verloren geht — siehe [Kasse](./kasse.md#pin-und-sperre).

Ohne PIN ist die Kasse für jeden bedienbar, der das Gerät in der Hand hat.

## Kundendisplay

Ein Display kann in zwei Modi betrieben werden:

- **Kundendisplay** (`customer`) – ein Tablet, das dem Gast zugewandt ist und live den Warenkorb einer ausgewählten Kasse spiegelt. Dazu verknüpfst du unter **Geräte → Gerät → Einstellungen** das Kundendisplay mit der gewünschten **Kasse**; Positionen, Mengen und Summen erscheinen dann in Echtzeit, sobald an der Kasse eingegeben wird.
- **Standort-Display** (`station`) – zeigt Bestellungen für einen [Produktionsstandort](./standorte.md) an, z. B. für Küche oder Ausgabe, und ist nicht an eine einzelne Kasse gekoppelt.

Neu registrierte Displays starten standardmäßig als Kundendisplay und lassen sich jederzeit auf Standort-Display umstellen.

## Von der Kasse zur Bestellung

Sobald ein Gerät freigegeben und eine [Veranstaltung aktiv](./veranstaltungen.md) ist, zeigt die Kasse die Produkte der aktiven Veranstaltung an. Aufgenommene Bestellungen erscheinen in Echtzeit unter [Bestellungen](./bestellungen.md) und – sofern eingerichtet – an den zugeordneten [Standorten](./standorte.md) und Druckern.
