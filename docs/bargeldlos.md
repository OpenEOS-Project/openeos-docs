---
sidebar_position: 3
title: Bargeld und bargeldloser Modus
description: Bargeld an der Kasse, der Hinweis zur TSE-Pflicht und was der bargeldlose Modus sperrt.
---

# Bargeld und bargeldloser Modus

Ab Werk nimmt die Kasse Bargeld an: Bar ist die erste Zahlart, sie rechnet Rückgeld aus, zahlt Pfand bar aus und öffnet die Kassenlade. Wer kein Bargeld annehmen will, schaltet den **bargeldlosen Modus** ein. Dann laufen nur noch Kartenzahlung über [SumUp](./integrationen/sumup.md), Online-Bestellungen und Vorauszahlungen.

Von der TSE-Pflicht befreit der bargeldlose Modus allein nicht, weil du Bargeld selbst wieder einschalten kannst. Mehr dazu im nächsten Abschnitt.

## Bargeld und TSE {/* #tse */}

:::info[Bargeld und TSE]
Eine elektronische Kasse, mit der sich Bargeld annehmen lässt, braucht in Deutschland eine zertifizierte TSE. Die TSE-Anbindung für OpenEOS ist in Arbeit. Bis dahin entscheidest du als Verein selbst, ob du Bargeld über OpenEOS erfasst – sprich das im Zweifel mit deiner Steuerberatung ab. Der bargeldlose Modus allein befreit nicht von der TSE-Pflicht, weil du Bargeld selbst wieder einschalten kannst. Ohne TSE geht es mit „Nur Bestellen“; das schaltet unser Support um.
:::

Nach Auskunft des Bundesfinanzministeriums hat eine Kasse schon dann eine Kassenfunktion, wenn der Verein Bargeld selbst einschalten kann – ob er es tatsächlich tut, spielt keine Rolle. Den bargeldlosen Modus schaltest du in den Zahlungseinstellungen selbst ein und aus; Bargeld dort auszuschalten befreit deshalb nicht von der TSE-Pflicht. Ohne TSE geht es nur, wenn dein Verein Bargeld nicht selbst einschalten kann und das in der Systemdokumentation nachgewiesen ist, zum Beispiel durch eine Bescheinigung des Herstellers.

Dafür gibt es die Betriebsart [Nur Bestellen](https://docs.openeos.de/nur-bestellen): Sie hat kein Kassenmodul, nur unser Support schaltet sie um, und du bekommst eine Bescheinigung für deine Systemdokumentation. Willst du mit OpenEOS Bargeld annehmen, brauchst du die TSE-Anbindung, an der wir arbeiten.

Mehr dazu in den [FAQ auf openeos.de](https://openeos.de/faq#tse). Allgemeine Information, keine Steuer- oder Rechtsberatung.

Solange Bargeld erlaubt ist, steht dieser Hinweis unter **Einstellungen → Organisation → Zahlungen**, in den Einstellungen jeder Kasse unter **Geräte** und einmal im [Dashboard](./dashboard.md). Dort kannst du ihn mit dem Kreuz ausblenden; das gilt für dein Konto in diesem Browser.

## Bargeldlosen Modus einschalten {/* #einschalten */}

1. Öffne **Einstellungen → Organisation → Zahlungen**.
2. Schalte **Bargeldloser Modus** ein.

Das dürfen nur Admins der Organisation. Die Kassen stellen sich sofort um, ein Neuladen ist nicht nötig. Ausschalten geht genauso; dann nehmen die Kassen wieder Bargeld an.

Ist [SumUp](./integrationen/sumup.md) nicht eingeschaltet, warnt die Seite: Ohne SumUp kann die Kasse im bargeldlosen Modus keine Zahlungen annehmen, abschließen lassen sich dann nur online oder vorab bezahlte Bestellungen. Speichern kannst du trotzdem, etwa wenn du nur über den Shop verkaufst.

### Nachweis: Verlauf {/* #verlauf */}

Unter dem Schalter steht **Bargeldlos seit** mit dem Datum der Umschaltung und darunter der **Verlauf**: jede Umschaltung mit Zeitpunkt und der Person, die geschaltet hat. Den Verlauf kann niemand bearbeiten. So kannst du belegen, ab wann deine Kassen kein Bargeld angenommen haben. Von der TSE-Pflicht befreit dieser Nachweis nicht, weil du den Modus selbst umschalten kannst.

## Was der bargeldlose Modus sperrt {/* #was-gesperrt-ist */}

Die Sperre gilt nicht nur in der Oberfläche. Auch der Server weist jede Barbuchung ab (Fehler „Deine Organisation arbeitet bargeldlos“), egal von welcher Kasse oder aus welchem Programm sie kommt.

| Vorgang | Bargeldlos |
|---|---|
| Kassieren | Keine Zahlart **Bar**, keine Schnellwahl, kein Rückgeld. **Karte** (mit Trinkgeld), **Rabatt** und **Rechnung teilen** bleiben. |
| Offene Bestellungen, Rechnung teilen, Bestellverlauf | Dieselben Zahlarten ohne Bar. Geteilte und gesammelte Zahlungen gehen mit Karte. |
| Trinkgeld | Nur mit Karte. |
| Erstattung | Nur auf die ursprüngliche Karten- oder Online-Zahlung. Eine Barzahlung aus der Zeit vor dem Umschalten lässt sich über OpenEOS nicht mehr erstatten; die Kasse und die Verwaltung zeigen dann „Keine Bar-Erstattung“. |
| Pfand-Rückgabe | **Auszahlen** gibt es nicht mehr. Zurückgegebenes Pfand verrechnest du mit neuem Pfand im selben Verkauf (**Verrechnen**). Ohne Warenkorb ist die Pfand-Rückgabe gesperrt und erklärt das. |
| Kassenlade | Öffnet sich nicht, der Menüpunkt **Kassenlade öffnen** fehlt. |

Mit SumUp im [Testmodus](./veranstaltungen.md) löst die Kasse keine echte Kartenzahlung aus. Damit du den Ablauf trotzdem durchspielen kannst, bucht sie die Karte im bargeldlosen Modus dann nur (wie ein externes Terminal).

## Siehe auch

- [Kasse: Kassieren](./kasse.md#kassieren) und [Pfand an der Kasse](./kasse.md#pfand)
- [Pfand](./pfand.md)
- [SumUp](./integrationen/sumup.md)
