---
sidebar_position: 21
title: Anzeigen einrichten
description: Kundenanzeige und Küchen-/Thekenanzeige verbinden, gestalten und im Betrieb nutzen.
---

# Anzeigen einrichten

Eine **Anzeige** ist ein Bildschirm ohne eigene Bedienung: ein Fernseher, ein Tablet oder ein alter Monitor mit Mini-Rechner. OpenEOS kennt zwei Arten:

| Art | Steht wo | Zeigt |
|---|---|---|
| **Kundenanzeige** | zum Gast gedreht, neben der Kasse | den laufenden Warenkorb der Kasse |
| **Küchen- bzw. Thekenanzeige** | in der Küche oder hinter der Theke | offene Bestellungen der Station |

Beide brauchen nur einen Browser und Strom. Tastatur, Zugangsdaten oder eine Installation sind nicht nötig.

## Anzeige verbinden

![Kopplung: Zahl und QR-Code](/img/screens/de/device-pair.png)

Der Weg ist derselbe wie bei einer Kasse — das Gerät zeigt eine Zahl, verknüpft wird sie in deinem Konto.

1. Öffne auf dem Bildschirm **app.openeos.de** und wähle unten **Als Anzeige verwenden (Monitor)**.
2. Der Bildschirm zeigt eine **sechsstellige Zahl** und darunter einen QR-Code.
3. Melde dich an einem anderen Gerät bei OpenEOS an und geh auf **Geräte → Gerät verbinden**.
4. Gib die Zahl ein. Wer ein Telefon zur Hand hat, scannt stattdessen den QR-Code.

![Die Zahl vom Gerät eintragen und freigeben](/img/screens/de/device-verify.png)

5. Vergib einen **Namen** (zum Beispiel *Küche* oder *Theke Nord*) und wähle die Art der Anzeige.

Danach wechselt der Bildschirm von selbst in die Anzeige. Du musst an ihm nichts mehr tun.

:::note[Warum eine Zahl statt Zugangsdaten]
An einem Fernseher hängt selten eine Tastatur, und das Kürzel der Organisation hat vor Ort niemand im Kopf. Die Zahl lässt sich aus einigen Metern ablesen und eintippen — mehr braucht es nicht.
:::

## Aussehen festlegen

Jede Anzeige wird einzeln eingestellt: **Geräte → Anzeige anklicken → Einstellungen**. Unter **Display-Einstellungen** wählst du den **Anzeigemodus** (Kundendisplay oder Stationsanzeige) und dazu die **Kasse** bzw. den **Standort**. Darunter folgt **Aussehen & Inhalt**:

| Einstellung | Wirkung |
|---|---|
| **Farbgebung** | **Dunkel** für abends im Zelt, **Hell** bei Tageslicht, **Nach Tageszeit** wechselt von selbst |
| **Schriftgröße** | *Groß* für Monitore, die weiter weg hängen |
| **Kopfzeile** | Eigener Text in der Kopfzeile; leer bleibt der Name deines Vereins |
| **Text im Ruhezustand** | Was im Leerlauf steht, etwa „Herzlich willkommen!“ |
| **Logo anzeigen** | Blendet das Vereinslogo in der Kopfzeile ein oder aus |
| **Erledigte ausblenden** | Nach wie vielen Sekunden eine abgeschlossene Bestellung verschwindet – oder **Stehen lassen** |

Mit **Speichern** übernimmst du die Einstellungen. Änderungen erscheinen **sofort** auf dem Bildschirm. Du musst nicht hingehen und nichts neu laden.

## Die Kundenanzeige im Betrieb

![Kundenanzeige im Leerlauf](/img/screens/de/display-customer.png)

Solange nichts kassiert wird, steht der Text im Ruhezustand da. Sobald an der zugeordneten Kasse ein Produkt hinzugefügt wird, erscheint der Warenkorb mit Positionen und Gesamtsumme — der Gast liest mit, was gebucht wurde. Nach dem Bezahlen wechselt der Bildschirm zurück in den Leerlauf.

## Die Küchen- und Thekenanzeige im Betrieb

![Stationsanzeige im Leerlauf](/img/screens/de/display-station.png)

Neue Bestellungen erscheinen, sobald sie kassiert wurden. Gezeigt wird nur, was die jeweilige Station betrifft — die Küche sieht keine Getränke, wenn diese der Theke zugeordnet sind. Welches Produkt zu welcher Station gehört, legst du unter [Standorte](./standorte.md) fest.

Bei einem **Touchscreen** tippt die Küche eine fertige Bestellung an und quittiert sie damit. Sie verschwindet dann aus der Liste. Ohne Touch verschwindet sie nach der eingestellten Zeit von selbst.

## Verbindung prüfen

Oben rechts steht, ob die Anzeige verbunden ist. **Getrennt** heißt: Der Bildschirm zeigt vielleicht noch alte Inhalte, bekommt aber nichts Neues mehr.

Wenn das dauerhaft dasteht:

1. Prüfe WLAN und Empfang am Standort des Bildschirms — das ist mit Abstand der häufigste Grund.
2. Lade die Seite auf dem Bildschirm neu.
3. Prüfe unter **Geräte**, ob die Anzeige dort als freigegeben geführt wird.

## Anzeige entfernen

Unter **Geräte** lässt sich eine Anzeige entfernen. Der Bildschirm fällt dann auf die Kopplung zurück und zeigt wieder eine Zahl — so gibst du ein geliehenes Tablet weiter, ohne deine Daten mitzugeben.
