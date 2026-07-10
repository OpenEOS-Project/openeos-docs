---
sidebar_position: 11
title: Geräte (Kassen)
description: Smartphones und Tablets als Kassen registrieren und verwalten.
---

# Geräte (Kassen)

Als **Geräte** registrieren Sie die Smartphones und Tablets, die als Kasse (POS) dienen. OpenEOS benötigt keine spezielle Hardware – jedes moderne Gerät mit Browser kann zur mobilen Kasse werden. Geräte gehören zur **Organisation** und stehen damit für alle Veranstaltungen zur Verfügung.

Sie erreichen den Bereich über **Geräte** in der Seitenleiste.

![Geräteübersicht mit QR-Code](/img/screens/de/devices.png)

## Gerätetypen

Beim Freigeben eines Geräts legen Sie fest, welche Rolle es einnimmt:

- **Kasse** – mobile Kasse (POS) zur Erfassung von Bestellungen.
- **Display** – Tablet oder Bildschirm, das entweder als [Kundendisplay](#kundendisplay) den Warenkorb einer Kasse spiegelt oder als Standort-Display Bestellungen für Küche, Bar oder Ausgabe anzeigt.
- **Admin** – Gerät mit vollem Zugriff auf die Verwaltung, z. B. ein Tablet an der Rezeption.

Drucker-Agents (der OpenEOS Drucker-Agent) werden separat unter [Drucker](./drucker.md) verwaltet und erscheinen nicht in dieser Geräteliste.

## Neues Gerät registrieren

Auf der Geräte-Seite finden Sie einen **QR-Code** und einen **Registrierungslink** für Ihre Organisation. So koppeln Sie ein neues Gerät:

1. **Öffnen Sie den Link** auf dem Gerät oder scannen Sie den **QR-Code** mit der Kamera des Geräts.
2. **Geben Sie einen Namen** für das Gerät ein (z. B. „Kasse Theke 1") und bestätigen Sie.
3. **Geben Sie den angezeigten Code** in der Verwaltung ein, um das Gerät freizugeben.

![Geräte-Registrierung](/img/screens/de/device-register.png)

Den Registrierungslink können Sie über **Kopieren** in die Zwischenablage übernehmen und z. B. per Nachricht an das Kassenpersonal verteilen.

Im Freigabe-Dialog **„Gerät freigeben“** wählen Sie zusätzlich den **Gerätetyp** (Kasse, Display oder Admin) aus – diese Auswahl wird direkt bei der Freigabe gespeichert. Kassen starten dabei automatisch im Modus „Bedienung“ (Tischservice), Displays starten als Kundendisplay. Beides können Sie später jederzeit unter **Geräte → Gerät → Einstellungen** anpassen.

## Geräte verwalten

Registrierte Geräte erscheinen in der Liste auf der Geräte-Seite. Dort behalten Sie den Überblick, welche Kassen mit Ihrer Organisation verbunden sind, und können Geräte bei Bedarf wieder entfernen.

:::warning[Freigabe erforderlich]
Ein Gerät wird erst zur Kasse, wenn Sie es mit dem angezeigten Code **freigeben**. So verhindern Sie, dass unbefugte Geräte Bestellungen erfassen.
:::

Unter **Geräte → Gerät → Einstellungen** ändern Sie jederzeit den Gerätetyp sowie – je nach Typ – den Bedienungsmodus einer Kasse („Bedienung“/„Theke“) oder den Display-Modus eines Displays.

## Kundendisplay

Ein Display kann in zwei Modi betrieben werden:

- **Kundendisplay** (`customer`) – ein Tablet, das dem Gast zugewandt ist und live den Warenkorb einer ausgewählten Kasse spiegelt. Dazu verknüpfen Sie unter **Geräte → Gerät → Einstellungen** das Kundendisplay mit der gewünschten **Kasse**; Positionen, Mengen und Summen erscheinen dann in Echtzeit, sobald an der Kasse eingegeben wird.
- **Standort-Display** (`station`) – zeigt Bestellungen für einen [Produktionsstandort](./standorte.md) an, z. B. für Küche oder Ausgabe, und ist nicht an eine einzelne Kasse gekoppelt.

Neu registrierte Displays starten standardmäßig als Kundendisplay und lassen sich jederzeit auf Standort-Display umstellen.

## Von der Kasse zur Bestellung

Sobald ein Gerät freigegeben und eine [Veranstaltung aktiv](./veranstaltungen.md) ist, zeigt die Kasse die Produkte der aktiven Veranstaltung an. Aufgenommene Bestellungen erscheinen in Echtzeit unter [Bestellungen](./bestellungen.md) und – sofern eingerichtet – an den zugeordneten [Standorten](./standorte.md) und Druckern.
