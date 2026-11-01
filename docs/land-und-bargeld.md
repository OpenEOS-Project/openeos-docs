---
sidebar_position: 3
title: Land und Bargeld
description: Welche Bargeld-Regel OpenEOS je nach Land deiner Organisation anwendet – Deutschland ohne TSE, Bestandsorganisationen, Österreich, Schweiz und andere Länder.
---

# Land und Bargeld

Jede Organisation hat in OpenEOS ein **Land**. Davon hängt ab, welche Kassenregeln OpenEOS für dich anwendet – vor allem, ob die Kasse Bargeld erfassen kann. Diese Seite erklärt die Regel je Land, was für Organisationen gilt, die es schon vorher gab, und wie der freiwillige Wechsel funktioniert.

:::note[Keine Steuerberatung]
Wir beschreiben hier, wie OpenEOS technisch arbeitet und was wir über die Regeln wissen. Das ist keine Steuer- oder Rechtsberatung. Prüfe die Regeln für deinen Verein selbst bzw. mit deiner Steuerberatung.
:::

## Das Land festlegen {/* #land */}

- **Neue Organisationen** wählen das Land bei der [Registrierung](./registrierung-login.md) bzw. unter **Neue Organisation**. Oben in der Liste stehen Deutschland, Österreich und die Schweiz, darunter alle anderen Länder.
- **Organisationen, die es schon vor November 2026 gab**, haben oft noch kein Land. Dann erscheint im [Dashboard](./dashboard.md) und unter **Einstellungen → Organisation → Zahlungen** die Bitte „Bitte hinterlege das Land deiner Organisation“. Ein Admin wählt das Land und bestätigt.

Das Land legst du **einmal** fest. Danach kann es nur noch unser Support ändern, mit Angabe eines Grundes; jede Änderung steht im Verlauf unter **Zahlungen**. So bleibt nachvollziehbar, welche Regel wann galt.

## Die Regel je Land {/* #regeln */}

| Land | Bargeld in OpenEOS | Bargeldloser Modus |
|---|---|---|
| Deutschland, neue Organisation | **Gesperrt** („Deutschland ohne Bargeld“), solange OpenEOS keine TSE anbindet | entfällt (Bargeld ist ohnehin aus) |
| Deutschland, Bestandsorganisation | wie bisher erlaubt, bis du freiwillig wechselst | wie bisher, schaltest du selbst |
| Österreich | erlaubt | wie bisher |
| Schweiz | erlaubt | wie bisher |
| alle anderen Länder | erlaubt | wie bisher |

Die Betriebsart [Nur Bestellen](./nur-bestellen.md) gilt unabhängig vom Land und geht allem vor: Darin gibt es in OpenEOS überhaupt keine Zahlungen.

## Deutschland ohne Bargeld {/* #deutschland-ohne-bargeld */}

Nach Auskunft des Bundesfinanzministeriums braucht eine Kasse, mit der sich Bargeld erfassen lässt, eine zertifizierte TSE – auch dann, wenn der Verein Bargeld nur selbst einschalten könnte. Der [bargeldlose Modus](./bargeldlos.md), den du selbst umschaltest, befreit deshalb allein nicht von der TSE-Pflicht. OpenEOS hat noch keine TSE; die Anbindung ist in Arbeit.

Deshalb gilt für neue Organisationen in Deutschland die Regel **Deutschland ohne Bargeld**:

- **Bargeld ist auf dem Server gesperrt**, nicht nur in der Oberfläche: keine Barzahlung, keine Erstattung in bar, keine Pfand-Auszahlung in bar, keine Kassenlade. Es gibt keinen Schalter, mit dem dein Verein Bargeld einschalten könnte.
- **Karte und Online-Zahlung** gehen wie gewohnt: Kartenzahlung über [SumUp](./integrationen/sumup.md), Vorkasse im Online-Shop und bei der Bestellung per QR-Code. Erstattet wird nur auf diese Zahlungen.
- **Pfand** verrechnest du an der Kasse mit neuem Pfand im selben Verkauf; bar auszahlen geht nicht.
- **Bargeld außerhalb von OpenEOS:** Nimmst du Bargeld an, kassierst du es in einer offenen Ladenkasse. An der Kasse wählst du dann **Ohne Zahlung abschließen** (siehe unten).
- **Herstellerbescheinigung:** Unter **Einstellungen → Organisation → Zahlungen** lädt ein Admin eine Bescheinigung als PDF herunter. Sie bestätigt, dass Bargeld in OpenEOS nicht erfasst und von deiner Organisation nicht eingeschaltet werden kann, dass Kartenzahlungen erfasst werden und dass Bargeld über eine offene Ladenkasse außerhalb von OpenEOS läuft. Lege sie zu deiner Verfahrensdokumentation.

Sobald die TSE-Anbindung da ist, kann eine deutsche Organisation mit aktiver TSE wieder Bargeld in OpenEOS erfassen – ohne dass du etwas umstellen musst.

### Ohne Zahlung abschließen {/* #ohne-zahlung-abschliessen */}

Im Kassieren-Blatt stehen bei „Deutschland ohne Bargeld“ die Zahlarten **Karte** (mit SumUp) und **Ohne Zahlung abschließen (offene Ladenkasse)**.

1. Kassiere den angezeigten Betrag in deiner offenen Ladenkasse.
2. Wähle **Ohne Zahlung abschließen** und tippe auf den Knopf unten.

Die Bestellung gilt damit als erledigt: Es entsteht **keine Zahlung** und **kein bezahlter Betrag** in OpenEOS. Positionen ohne Station gelten als ausgegeben. Arbeitet die Küche noch an der Bestellung, bleibt sie dort sichtbar und schließt ab, sobald die letzte Position ausgegeben ist. Eine so abgeschlossene Bestellung taucht nicht mehr unter den offenen Bestellungen oder am Tisch auf und lässt sich nicht mehr kassieren.

Das geht auch für offene Bestellungen am Tisch, unter **Offene Bestellungen** und im Bestellverlauf. Beim **Rechnung teilen** gibt es die Option nicht – dort entstehen Teilzahlungen.

Die Aufzeichnungspflichten für die offene Ladenkasse liegen bei deinem Verein.

## Bestandsorganisationen {/* #bestand */}

Jede Organisation, die es vor Einführung der Länderregel (November 2026) gab, hat **Bestandsschutz**: Sie verhält sich wie bisher – Bargeld ist möglich, den bargeldlosen Modus schaltest du selbst –, egal welches Land hinterlegt ist.

Liegt deine Organisation in Deutschland, zeigt OpenEOS einen Hinweis zur TSE-Pflicht mit drei Möglichkeiten:

1. **So weiterarbeiten wie bisher.** Ob das für dich zulässig ist, verantwortest du selbst.
2. **Zu „Deutschland ohne Bargeld“ wechseln.** Bargeld ist danach gesperrt, du bekommst die Herstellerbescheinigung.
3. **Auf die TSE warten.** Die Anbindung ist in Arbeit.

Den Hinweis kannst du im Dashboard ausblenden; unter **Einstellungen → Organisation → Zahlungen** bleibt er stehen.

### Freiwillig wechseln {/* #wechseln */}

1. Öffne **Einstellungen → Organisation → Zahlungen** (oder den Hinweis im Dashboard).
2. Tippe auf **Zu „Deutschland ohne Bargeld“ wechseln**.
3. Lies die Rückfrage, setze den Haken und bestätige mit **Verbindlich wechseln**.

Das dürfen nur Admins. Die Kassen stellen sich sofort um. Der Wechsel gilt **nur in eine Richtung**: Zurück geht es nur über unseren Support, mit Angabe eines Grundes. Der Wechsel steht im Verlauf und auf der Bescheinigung.

## Österreich {/* #oesterreich */}

In Österreich gilt die **Registrierkassenpflicht (RKSV)** ab 15.000 € Jahresumsatz je Betrieb, wenn davon mehr als 7.500 € Barumsätze sind. **Kartenzahlungen zählen in Österreich als Barumsätze.** OpenEOS erstellt derzeit **keine RKSV-Signatur**.

Ausnahmen gibt es zum Beispiel für kleine Feste gemeinnütziger Vereine bis zu 72 Stunden im Kalenderjahr und für Kantinen gemeinnütziger Vereine bis 45.000 € Jahresumsatz (netto), wenn sie an höchstens 52 Tagen im Jahr betrieben werden (Grenze seit 2026). Für die Ausnahmen gelten weitere Bedingungen. Prüfe die Regeln für deinen Verein selbst bzw. mit deiner Steuerberatung.

Quellen: [Registrierkassenpflicht im Unternehmensserviceportal (USP)](https://www.usp.gv.at/themen/steuern-finanzen/steuerliche-rechte-und-pflichten/registrierkassen/registrierkassenpflicht.html) und [Registrierkassen beim BMF](https://www.bmf.gv.at/themen/steuern/fuer-unternehmen/registrierkassen.html).

## Schweiz {/* #schweiz */}

In der Schweiz gibt es nach unserem Kenntnisstand keine allgemeine Registrierkassen- oder Fiskalisierungspflicht. Aufbewahrungs- und Mehrwertsteuerregeln gelten aber auch für Vereine. Prüfe selbst bzw. mit deiner Treuhand oder Steuerberatung, was für deinen Verein gilt.

## Andere Länder {/* #andere-laender */}

Viele Länder haben eigene Kassenvorschriften (z. B. Italien, Frankreich, Polen, Tschechien). Prüfe selbst, ob OpenEOS dort für dich zulässig ist.

## Wo du was siehst {/* #wo */}

- **Dashboard:** der Hinweis zu deinem Land, einmal; mit dem Kreuz blendest du ihn für dein Konto in diesem Browser aus. Die Bitte um das Land lässt sich nicht ausblenden.
- **Einstellungen → Organisation → Zahlungen:** Land, Bargeld-Regel, der Hinweis dauerhaft, die Bescheinigung (bei „Deutschland ohne Bargeld“) und der Verlauf.
- **Einstellungen → Organisation → Kontakt:** das Land der Organisation, nur zur Ansicht.

## Eigene Installation {/* #selbst-betreiben */}

Betreibst du OpenEOS [selbst](./selbst-betreiben/intro.md), bist du selbst Betreiber des Systems. Die Sperre „Deutschland ohne Bargeld“ und die Herstellerbescheinigung gibt es dort nicht; Organisationen verhalten sich wie bisher.

## Siehe auch

- [Bargeld und bargeldloser Modus](./bargeldlos.md)
- [Nur Bestellen (ohne Kasse)](./nur-bestellen.md)
- [Kasse: Kassieren](./kasse.md#kassieren)
- [FAQ auf openeos.de: Gilt das auch in Österreich und der Schweiz?](https://openeos.de/faq#laender)
