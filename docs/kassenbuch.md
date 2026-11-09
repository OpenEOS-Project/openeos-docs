---
title: Kassenbuch
description: Wechselgeld, Einlagen, Abschöpfen und Kassensturz an der Kasse eintragen — und den Kassenbestand des Tages in der Verwaltung sehen.
---

# Kassenbuch

Mit dem Kassenbuch hältst du fest, wie viel **Bargeld** in deiner Kasse liegt: das Wechselgeld zu Beginn, Geld, das dazukommt oder in den Tresor geht, und das Zählen am Ende. Jede Buchung ist – wie ein Verkauf – ein eigener Beleg, den die [Cloud-TSE](./integrationen/cloud-tse.md) signiert. So passt der Bargeldbestand im [Kassenabschluss](./kassen-nachschau.md#abschluss) zu dem, was wirklich in der Kasse liegt.

:::info[Nur mit Bargeld]
Das Kassenbuch gibt es nur, wenn deine Organisation Bargeld annehmen darf (Betriebsart **Alle Funktionen**, in Deutschland mit aktiver Cloud-TSE). In den Betriebsarten **Bargeldlos** und **Nur Bons** ist der Menüpunkt ausgeblendet.
:::

## An der Kasse {/* #kasse */}

Im Menü der Kasse auf **Kassenbuch** tippen. Arbeitet die Kasse mit [Bedienungen](./bedienungen.md), sieht den Menüpunkt nur, wer das Recht **Kassenbuch** hat – Schichtleitungen haben es. Oben steht der **Soll-Bestand** dieser Kasse: so viel Bargeld sollte jetzt in der Schublade liegen. Darunter siehst du, woraus er sich zusammensetzt (Anfangsbestand, Einlagen, Entnahmen, Barverkäufe, Bar-Erstattungen, Pfand-Auszahlungen, Differenzen) und die Buchungen von heute.

| Aktion | Wann | Was gebucht wird |
|---|---|---|
| **Anfangsbestand** | Zu Beginn: das Wechselgeld, das in die Kasse kommt | Anfangsbestand |
| **Einlage** | Es kommt Bargeld dazu, z. B. Nachschub an Wechselgeld aus der Vereinskasse | Geldtransit (Einlage) |
| **Entnahme** | Du schöpfst ab und bringst Geld in den Tresor oder zur Bank | Geldtransit (Entnahme) |
| **Kassensturz** | Am Ende oder zwischendurch: du zählst die Kasse | die Differenz zwischen gezählt und Soll |

So geht's:

1. Die Aktion antippen.
2. Den **Betrag** eingeben (immer positiv). Beim Kassensturz gibst du den **gezählten** Betrag ein; die Kasse zeigt dir sofort die **Differenz** zum Soll.
3. Optional eine **Notiz** eintragen, z. B. „Wechselgeld aus der Vereinskasse“.
4. **Buchen** tippen. Die Buchung steht in der Liste, mit Beleg-Nr. und TSE-Status.

Der Soll-Bestand gilt für **dieses Gerät** (seine Schublade). Arbeitet ihr mit mehreren Kassen, zählt jede ihre eigene.

:::tip[Kassensturz ohne Differenz]
Stimmt die gezählte Summe genau, wird nur der Kassensturz festgehalten – ein Beleg entsteht dann nicht.
:::

## In der Verwaltung {/* #verwaltung */}

Unter **Kassenbuch** in der Seitenleiste siehst du den Kassenbestand eines **Geschäftstags** (6 bis 6 Uhr): den Soll-Bestand der ganzen Kasse, je Gerät und alle Buchungen mit Uhrzeit, Gerät, Betrag und Notiz. Mit dem Datum wechselst du zu einem früheren Tag.

Als Admin kannst du dort auch für die **ganze Kasse** buchen, z. B. wenn das Geld am Abend gesammelt in den Tresor geht.

## Typischer Festtag {/* #ablauf */}

1. **Vor dem Öffnen:** An jeder Kasse mit Bargeld den **Anfangsbestand** (Wechselgeld) buchen.
2. **Während des Festes:** Bei viel Bargeld **Entnahme** buchen und das Geld in den Tresor bringen. Braucht eine Kasse Kleingeld, **Einlage** buchen.
3. **Am Ende:** Kasse zählen, **Kassensturz** buchen, dann das Geld per **Entnahme** abschöpfen.

Der Kassenabschluss des Tages entsteht danach automatisch – siehe [Kassen-Nachschau](./kassen-nachschau.md).

:::note
Das ist keine Steuerberatung. Wie ihr Bargeld zählt und dokumentiert, legt ihr in eurer Kassenanweisung fest; frag im Zweifel deine Steuerberatung.
:::
