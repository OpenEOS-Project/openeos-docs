---
title: SumUp
description: Kartenzahlung mit SumUp an der Kasse — Integration aktivieren, Zugangsdaten hinterlegen und Kartenleser koppeln.
---

# SumUp

Mit der **SumUp**-Integration nimmst du an der Kasse Kartenzahlungen über dein eigenes SumUp-Konto an. Der Betrag geht direkt an deinen SumUp-Kartenleser, der Gast zahlt dort mit Karte oder Handy, und die Kasse verbucht die Zahlung, sobald sie bestätigt ist.

## Was du brauchst

- ein **SumUp-Händlerkonto**,
- einen **SumUp-Kartenleser**, der sich über das Internet koppeln lässt (z. B. **SumUp Solo**),
- **API-Key** und **Merchant Code** aus deinem SumUp-Konto.

:::info[Wo bekomme ich die SumUp-Zugangsdaten?]
API-Key und Merchant Code findest du in deinem SumUp-Konto im Entwickler- bzw. API-Bereich. Behandle den API-Key wie ein Passwort und gib ihn nicht weiter.
:::

## 1. Integration aktivieren

1. In der Seitenleiste **Integrationen** öffnen und auf **SumUp** klicken.
2. Im Fenster auf **Aktivieren** klicken.

In der Seitenleiste erscheint jetzt der Eintrag **SumUp**.

## 2. Zugangsdaten hinterlegen

Auf der Seite **SumUp**:

- **API-Key** – dein SumUp API-Key (Format `sup_sk_…`).
- **Merchant Code** – dein SumUp Merchant Code (z. B. `MXXXXXXXX`).
- **Affiliate Key** und **App ID** – optional, nur für den Terminal-Checkout über die Solo Cloud API.

Mit **Verbindung testen** prüfst du die Angaben, mit **Speichern** übernimmst du sie. OpenEOS speichert API-Key und Affiliate Key verschlüsselt und zeigt sie danach nur noch gekürzt an (`****1234`).

![SumUp-Einstellungen](/img/screens/de/integrations-sumup.png)

## 3. Kartenleser koppeln

1. Den Kartenleser einschalten und mit dem Internet verbinden. Er zeigt einen Kopplungscode an.
2. Unter **Kartenleser** auf **Leser koppeln** klicken, den **Pairing-Code** eingeben, unter **Name** eine Bezeichnung vergeben, z. B. „Kasse Bar“, und auf **Koppeln** klicken.
3. Der Leser erscheint in der Liste mit seinem Status (**Gekoppelt**, **Wird gekoppelt** oder **Abgelaufen**). Dort kannst du ihn umbenennen oder löschen; ein gelöschter Leser wird von SumUp entkoppelt und muss für eine erneute Nutzung neu gekoppelt werden.

![Kartenleser koppeln](/img/screens/de/integrations-sumup-pair.png)

## An der Kasse

Ist SumUp aktiv und ein Kartenleser gekoppelt, bietet die [Kasse](../kasse.md#kartenzahlung) beim Kassieren die Kartenzahlung an. Der Betrag erscheint auf dem Leser, und die Bestellung gilt als bezahlt, sobald SumUp die Zahlung bestätigt.

Im **Testmodus** einer Veranstaltung löst die Kasse keine echten SumUp-Kartenzahlungen aus: Die Zahlart ist an der Kasse ausgegraut, und auf der SumUp-Seite steht **Testmodus aktiv – keine SumUp-Kartenzahlungen**. Bar und die manuelle Kartenbuchung bleiben möglich.

![Kasse mit Kartenzahlung](/img/screens/de/pos-card.png)

## Abschalten

Mit **Deaktivieren** auf der SumUp-Seite oder im Fenster unter **Integrationen** schaltest du SumUp ab. Die Kartenzahlung verschwindet von der Kasse. Zugangsdaten und gekoppelte Leser bleiben gespeichert und sind nach dem erneuten Aktivieren sofort wieder da.

:::tip[Kartenzahlung funktioniert nicht?]
- Ist die Integration unter **Integrationen** als **Aktiv** markiert?
- Meldet **Verbindung testen** Erfolg? Wenn nicht, den API-Key neu eintragen.
- Ist der Kartenleser eingeschaltet, online und in der Liste gekoppelt?
:::
