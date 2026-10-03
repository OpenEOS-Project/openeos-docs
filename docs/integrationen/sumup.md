---
title: SumUp
description: Kartenzahlung mit SumUp an der Kasse — Integration aktivieren, Zugangsdaten hinterlegen und Kartenleser koppeln.
---

# SumUp

Mit der **SumUp**-Integration nehmen Sie an der Kasse Kartenzahlungen über Ihr eigenes SumUp-Konto an. Der Betrag geht direkt an Ihren SumUp-Kartenleser, der Gast zahlt dort mit Karte oder Handy, und die Kasse verbucht die Zahlung, sobald sie bestätigt ist.

## Was Sie brauchen

- ein **SumUp-Händlerkonto**,
- einen **SumUp-Kartenleser**, der sich über das Internet koppeln lässt (z. B. **SumUp Solo**),
- **API-Key** und **Merchant Code** aus Ihrem SumUp-Konto.

:::info[Wo bekomme ich die SumUp-Zugangsdaten?]
API-Key und Merchant Code finden Sie in Ihrem SumUp-Konto im Entwickler- bzw. API-Bereich. Behandeln Sie den API-Key wie ein Passwort und geben Sie ihn nicht weiter.
:::

## 1. Integration aktivieren

1. In der Seitenleiste **Integrationen** öffnen und auf **SumUp** klicken.
2. Im Fenster auf **Aktivieren** klicken.

In der Seitenleiste erscheint jetzt der Eintrag **SumUp**.

## 2. Zugangsdaten hinterlegen

Auf der Seite **SumUp**:

- **API-Key** – Ihr SumUp API-Key (Format `sup_sk_…`).
- **Merchant Code** – Ihr SumUp Merchant Code (z. B. `MXXXXXXXX`).
- **Affiliate Key** und **App ID** – optional, nur für den Terminal-Checkout über die Solo Cloud API.

Mit **Verbindung testen** prüfen Sie die Angaben, mit **Speichern** übernehmen Sie sie. Gespeicherte Schlüssel werden danach nur noch gekürzt angezeigt (`****1234`).

![SumUp-Einstellungen](/img/screens/de/integrations-sumup.png)

## 3. Kartenleser koppeln

1. Den Kartenleser einschalten und mit dem Internet verbinden. Er zeigt einen Kopplungscode an.
2. Unter **Kartenleser** auf **Kartenleser koppeln** klicken, den Code eingeben und dem Gerät einen Namen geben, z. B. „Kasse Bar“.
3. Der Leser erscheint in der Liste. Dort können Sie ihn umbenennen oder wieder entfernen.

![Kartenleser koppeln](/img/screens/de/integrations-sumup-pair.png)

## An der Kasse

Ist SumUp aktiv und ein Kartenleser gekoppelt, bietet die [Kasse](../kasse.md) beim Kassieren die Kartenzahlung an. Der Betrag erscheint auf dem Leser, und die Bestellung gilt als bezahlt, sobald SumUp die Zahlung bestätigt.

![Kasse mit Kartenzahlung](/img/screens/de/pos-card.png)

## Abschalten

Mit **Deaktivieren** auf der SumUp-Seite oder im Fenster unter **Integrationen** schalten Sie SumUp ab. Die Kartenzahlung verschwindet von der Kasse. Zugangsdaten und gekoppelte Leser bleiben gespeichert und sind nach dem erneuten Aktivieren sofort wieder da.

:::tip[Kartenzahlung funktioniert nicht?]
- Ist die Integration unter **Integrationen** als **Aktiv** markiert?
- Meldet **Verbindung testen** Erfolg? Wenn nicht, den API-Key neu eintragen.
- Ist der Kartenleser eingeschaltet, online und in der Liste gekoppelt?
:::
