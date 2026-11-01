---
sidebar_position: 3
title: Nur Bestellen (ohne Kasse)
description: Die Betriebsart „Nur Bestellen“ – Bestellungen aufnehmen und weiterleiten, kassiert wird außerhalb von OpenEOS.
---

# Nur Bestellen (ohne Kasse)

In der Betriebsart **Nur Bestellen** arbeitet OpenEOS als reines Bestellsystem. Dein Team nimmt Bestellungen an den Kassengeräten auf, OpenEOS leitet sie an Küche und Theke weiter, und die Bestellungen werden ohne Bezahlung abgeschlossen. Das Kassenmodul ist ausgeschaltet: In OpenEOS wird nichts kassiert. Das Geld nimmst du außerhalb von OpenEOS an, zum Beispiel mit einer offenen Ladenkasse.

Die Betriebsart schaltet nur unser Support um, nicht dein Verein. Genau darum geht es: Deine Organisation kann das Kassenmodul nicht selbst wieder einschalten.

:::note[Nur im gehosteten OpenEOS]
„Nur Bestellen“ gibt es nur im gehosteten OpenEOS. Bei einer [selbst betriebenen Installation](./selbst-betreiben/intro.md) betreibt dein Verein den Server selbst; dort steht die Betriebsart nicht zur Verfügung.
:::

## Was weiter geht {/* #was-geht */}

- **Bestellen** an den Kassengeräten, an der Theke und im Tischbetrieb, wie unter [An der Kasse verkaufen](./kasse.md) beschrieben.
- **Weiterleiten** an Küche, Theke und andere [Standorte](./standorte.md): Bons und [Küchen- bzw. Thekenanzeigen](./anzeigen.md).
- **Fertig melden**, **abgeholt** bzw. **serviert** markieren.
- **Bestellungen abschließen**, siehe [unten](#abschliessen).
- **Stornieren** von ganzen Bestellungen und einzelnen Positionen, ohne Erstattung.
- **Vorkasse im Online-Shop**, siehe [Online bezahlen](#vorkasse).

## Was es nicht gibt {/* #was-gesperrt-ist */}

- Kein **Kassieren**: keine Barzahlung, keine Kartenzahlung, keine Zahlung über SumUp an der Kasse.
- Kein **Rechnung teilen** und keine gesammelten Zahlungen.
- Kein **Trinkgeld**.
- Keine **Erstattung** an der Kasse.
- Keine **Kassenlade**.
- Kein **Auszahlen** von Pfand.

Die Sperre gilt nicht nur in der Oberfläche. Auch der Server weist jede Zahlung ab, egal von welcher Kasse oder aus welchem Programm sie kommt.

An der Kasse endet der Ablauf mit **Bestellung senden**. Ein schmaler Hinweis zeigt „Nur-Bestellen-Modus – kassiert wird außerhalb von OpenEOS.“

## Bestellungen abschließen {/* #abschliessen */}

Ohne Bezahlung braucht jede Bestellung einen anderen Abschluss. Das regelt OpenEOS so:

| Bestellung | Wann sie abgeschlossen ist |
|---|---|
| An der Theke oder zum Abholen, **ohne** Artikel für einen Standort | Sofort beim Senden. |
| An der Theke oder zum Abholen, **mit** Artikeln für einen Standort | Bei der Übergabe: Du tippst in den **Offenen Bestellungen** der Kasse auf **Abgeholt**, oder alle Artikel für die Standorte sind als ausgegeben markiert. |
| Am Tisch | Die Bestellungen bleiben am Tisch offen, bis die Bedienung auf **Tisch abschließen** tippt. Der Knopf ersetzt **Kassieren** und schließt alle offenen Bestellungen des Tisches ab. |

Solange ein Standort einen Artikel noch zubereitet, lässt sich die Bestellung nicht abschließen.

## Online bezahlen: Vorkasse im Online-Shop {/* #vorkasse */}

Bezahlen Gäste schon beim Bestellen online, im Online-Shop oder per QR-Bestellung am Tisch mit PayPal oder SumUp Online, geht das weiter. Diese Zahlungen laufen nicht über eine Kasse vor Ort und haben nichts mit Bargeld zu tun.

Erstatten lässt sich dann nur auf eine solche Online-Zahlung zurück, und zwar in der Verwaltung, nie an der Kasse.

## Bargeld vor Ort {/* #bargeld */}

Bargeld nimmst du außerhalb von OpenEOS an, zum Beispiel mit einer offenen Ladenkasse. Für die Aufzeichnungspflichten, die dafür gelten, ist dein Verein selbst verantwortlich. Was dazu gehört, steht in den [FAQ auf openeos.de](https://openeos.de/faq#offene-ladenkasse).

## TSE {/* #tse */}

:::info[Nur Bestellen und TSE]
Nach Auskunft des Bundesfinanzministeriums (BMF) fallen Bestellsysteme ohne Kassenmodul nicht unter § 146a AO und brauchen damit keine TSE. Das gilt nur, wenn deine Organisation das Kassenmodul nicht selbst einschalten kann und das in der Verfahrensdokumentation nachgewiesen ist, zum Beispiel durch eine Bescheinigung des Herstellers.

Im Einzelfall entscheidet dein Finanzamt. Bist du unsicher, sprich mit deiner Steuerberatung. Allgemeine Information, keine Steuer- oder Rechtsberatung.
:::

Die Bescheinigung bekommst du in OpenEOS, siehe [Herstellerbescheinigung](#bescheinigung). Mehr zu Bargeld und TSE unter [Bargeld und bargeldloser Modus](./bargeldlos.md#tse).

## Nur Bestellen beantragen {/* #beantragen */}

Umschalten kann nur unser Support:

1. Schreib uns im Support-Chat (in der Verwaltung unter **Support**) oder per E-Mail an [hello@openeos.de](mailto:hello@openeos.de).
2. Nenne die **Organisation** und **ab wann** „Nur Bestellen“ gelten soll.

Jede Umschaltung wird mit Zeitpunkt, der Person aus dem Support und dem Grund protokolliert. Zurück zur Betriebsart mit Kasse geht es ebenfalls nur über den Support.

## Betriebsart und Herstellerbescheinigung {/* #bescheinigung */}

Unter **Einstellungen → Organisation → Zahlungen** siehst du die Betriebsart deiner Organisation. Ändern kannst du sie dort nicht. Admins finden dort den Knopf **Bescheinigung herunterladen**.

Die **Herstellerbescheinigung** ist ein PDF mit:

- Name und Adresse der Organisation
- der OpenEOS-Version
- dem Zeitpunkt, seit dem das Kassen- und Zahlungsmodul ausgeschaltet ist
- der Bestätigung, dass deine Organisation das Modul nicht selbst einschalten kann, sondern nur der Hersteller auf dokumentierten Antrag
- was OpenEOS in dieser Betriebsart weiter tut
- dem Hinweis, dass Bargeld außerhalb des Systems angenommen wird
- dem Hersteller (LUXCODE by Lukas Lukic-Spitznagel)
- dem Verlauf aller Umschaltungen
- dem Hinweis, dass die Bescheinigung maschinell erstellt ist und keine Unterschrift trägt

Lege die Bescheinigung zu deiner Verfahrensdokumentation. Nach jeder Umschaltung der Betriebsart lädst du eine neue herunter.

## Unterschied zum bargeldlosen Modus {/* #unterschied */}

| | Bargeldloser Modus | Nur Bestellen |
|---|---|---|
| Wer schaltet um | Admins deiner Organisation, in den Einstellungen | Nur unser Support, auf Anfrage |
| Bezahlen an der Kasse | Karte über SumUp, ohne Bargeld | Gar nicht, das Kassenmodul ist aus |
| Online-Zahlungen | Ja | Ja, als Vorkasse im Online-Shop |
| Herstellerbescheinigung | Nein | Ja |

Mehr zum bargeldlosen Modus unter [Bargeld und bargeldloser Modus](./bargeldlos.md).

## Siehe auch

- [Land und Bargeld](./land-und-bargeld.md) – „Deutschland ohne Bargeld“ als Alternative mit Kartenzahlung
- [Bargeld und bargeldloser Modus](./bargeldlos.md)
- [An der Kasse verkaufen](./kasse.md)
- [Standorte](./standorte.md) und [Anzeigen](./anzeigen.md)
