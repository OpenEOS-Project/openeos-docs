---
title: Kassenbuch
description: Wechselgeld, Einlagen, Abschöpfen und Kassensturz an der Kasse eintragen — und den Kassenbestand des Tages in der Verwaltung sehen.
---

# Kassenbuch

Mit dem Kassenbuch hältst du fest, wie viel **Bargeld** in deiner Kasse liegt: das Wechselgeld zu Beginn, Geld, das dazukommt oder in den Tresor geht, und das Zählen am Ende. Jede Buchung ist – wie ein Verkauf – ein eigener Beleg, den die [Cloud-TSE](./integrationen/cloud-tse.md) signiert. So passt der Bargeldbestand im [Kassenabschluss](./kassen-nachschau.md#abschluss) zu dem, was wirklich in der Kasse liegt.

:::info[Nur mit Bargeld]
Das Kassenbuch gibt es nur, wenn deine Organisation Bargeld annehmen darf: in der [Betriebsart](./betriebsarten.md) **Alle Funktionen** (in Deutschland mit aktiver Cloud-TSE) oder **Alle Funktionen (Bestand)**. In den Betriebsarten **Bargeldlos** und **Nur Bons** ist der Menüpunkt ausgeblendet.
:::

## An der Kasse {/* #kasse */}

Im Menü der Kasse auf **Kassenbuch** tippen. Arbeitet die Kasse mit [Bedienungen](./bedienungen.md), sieht den Menüpunkt nur, wer das Recht **Kassenbuch** hat – Schichtleitungen haben es. Oben steht der **Soll-Bestand dieser Kasse**: so viel Bargeld sollte jetzt in der Schublade liegen, dazu der letzte Kassensturz. Darunter siehst du, woraus er sich zusammensetzt (Anfangsbestand, Einlagen, Entnahmen, Barverkäufe, Bar-Erstattungen, Pfand-Auszahlungen, [Trinkgeld-Auszahlungen](./trinkgeld.md#auszahlung), [Wertmarken](./wertmarken.md)-Verkäufe und -Rücktausch, Differenzen) und die **Buchungen heute**. Zahlst du einer angestellten Bedienung Kartentrinkgeld bar aus, mindert das den Soll-Bestand der Schublade, aus der das Geld kommt. Bargeld aus dem Verkauf von Wertmarken erhöht den Soll-Bestand, ein Rücktausch mindert ihn; angenommene Marken selbst sind kein Bargeld und stehen nicht im Kassenbuch.

![Kassenbuch an der Kasse: Soll-Bestand und Buchungen](/img/screens/de/pos-cashbook.png)

| Aktion | Wann | Was gebucht wird |
|---|---|---|
| **Anfangsbestand** | Zu Beginn, nur für Bargeld, das **schon in der Kasse liegt** – der Rest vom letzten Kassensturz. OpenEOS schlägt dafür den zuletzt gezählten Bestand vor. | Anfangsbestand („Restbestand Vorabschluss“) |
| **Einlage** | Bargeld kommt dazu, vor allem das **Wechselgeld aus der Vereinskasse** – zu Beginn und als Nachschub | Geldtransit „Wechselgeld aus Vereinskasse“ |
| **Entnahme** | Du schöpfst ab und bringst Geld in die Vereinskasse, den Tresor oder zur Bank | Geldtransit „Abschöpfung an Vereinskasse“ |
| **Kassensturz** | Am Ende oder zwischendurch: du zählst die Kasse | die Differenz zwischen gezählt und Soll |

:::info[Wechselgeld ist kein Anfangsbestand]
Holst du vor dem Fest Wechselgeld aus der Vereinskasse, buchst du es als **Einlage**, nicht als Anfangsbestand. Der Anfangsbestand ist nach der DSFinV-K nur das Bargeld, das bei der Eröffnung schon in der Kasse liegt; alles, was hineinkommt oder hinausgeht, ist ein **Geldtransit** zwischen Vereinskasse und Festkasse. Eine Privateinlage gibt es bei einem Verein nicht. Als Gegenbeleg dient das Kassenbuch eures Schatzmeisters: Dort steht dieselbe Summe als Ausgabe bzw. Eingang der Vereinskasse. Buchungen von vor November 2026 bleiben gültig.
:::

So geht's:

1. Die Aktion antippen.
2. Den **Betrag** über den Ziffernblock eingeben (immer positiv). Beim Kassensturz gibst du den **Gezählten Bestand** ein; die Kasse zeigt dir den Soll-Bestand und sofort, ob die **Kasse stimmt** oder es einen **Überschuss** bzw. **Fehlbetrag** gibt. Die Abweichung wird als „Differenz Soll/Ist“ gebucht.
3. Optional eine **Notiz** eintragen, z. B. „Wechselgeld für Zelt A“.
4. Auf **Anfangsbestand buchen**, **Einlage buchen**, **Entnahme buchen** bzw. **Kassensturz buchen** tippen. Die Buchung steht in der Liste, mit Beleg-Nr. und TSE-Status.

Der Soll-Bestand gilt für **dieses Gerät** (seine Schublade). Arbeitet ihr mit mehreren Kassen, zählt jede ihre eigene.

:::tip[Kassensturz ohne Differenz]
Stimmt die gezählte Summe genau, wird nur der Kassensturz festgehalten – ein Beleg entsteht dann nicht.
:::

## In der Verwaltung {/* #verwaltung */}

Als Admin siehst du unter **Kassenbuch** in der Seitenleiste den Kassenbestand eines **Geschäftstags** (6 bis 6 Uhr): den **Soll-Bestand ganze Kasse**, den Bestand **Je Gerät** und alle **Buchungen** mit Zeit, Gerät, Art, Betrag, Gezählt / Soll, Notiz und Bediener. Unter **Geschäftstag** wechselst du zu einem früheren Tag, **Heute** führt zurück.

![Kassenbuch in der Verwaltung](/img/screens/de/cashbook.png)

Unter **Buchen für die ganze Kasse** buchst du dort auch für die ganze Kasse, z. B. wenn das Geld am Abend gesammelt in den Tresor geht. Gebucht wird immer für den laufenden Geschäftstag. Für eine einzelne Kasse buchst du direkt an der Kasse.

## Typischer Festtag {/* #ablauf */}

1. **Vor dem Öffnen:** Liegt vom letzten Mal noch Geld in der Kasse, den **Anfangsbestand** buchen (OpenEOS schlägt den zuletzt gezählten Betrag vor). Das Wechselgeld aus der Vereinskasse als **Einlage** buchen.
2. **Während des Festes:** Bei viel Bargeld **Entnahme** buchen und das Geld in den Tresor bzw. die Vereinskasse bringen. Braucht eine Kasse Kleingeld, **Einlage** buchen.
3. **Am Ende:** Kasse zählen, **Kassensturz** buchen, dann das Geld per **Entnahme** an die Vereinskasse abschöpfen. Bleibt ein Rest in der Kasse, ist er beim nächsten Mal der Anfangsbestand.

Der Kassenabschluss des Tages entsteht danach automatisch – siehe [Kassen-Nachschau](./kassen-nachschau.md).

:::note
Das ist keine Steuerberatung. Wie ihr Bargeld zählt und dokumentiert, legt ihr in eurer Kassenanweisung bzw. [Verfahrensdokumentation](./verfahrensdokumentation.md#wechselgeld) fest; frag im Zweifel deine Steuerberatung.
:::
