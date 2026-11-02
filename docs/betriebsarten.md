---
sidebar_position: 3
title: Betriebsarten
description: Die drei Betriebsarten einer Organisation – Nur Bons, Bargeldlos und Alle Funktionen –, was in jeder geht, wie du wechselst und was je nach Land gilt.
---

# Betriebsarten

Jede Organisation arbeitet in einer von drei **Betriebsarten**. Sie legt fest, ob und wie in OpenEOS Geld fließt: gar nicht, nur per Karte und online oder auch bar. Du findest sie unter **Einstellungen → Organisation → Betriebsart**; dort wechselst du sie als Admin auch selbst.

Nicht zu verwechseln mit dem **Betriebsmodus** eines Geräts (Feste Kasse oder Bedienung), siehe [Geräte](./geraete.md#betriebsmodus).

:::note[Keine Steuerberatung]
Wir beschreiben hier, wie OpenEOS technisch arbeitet und was wir über die Regeln wissen. Das ist keine Steuerberatung. Prüfe die Regeln für deinen Verein selbst bzw. mit deiner Steuerberatung.
:::

## Die drei Betriebsarten {/* #uebersicht */}

| Betriebsart | Was geht | Geld in OpenEOS |
|---|---|---|
| **Nur Bons** | Bestellungen aufnehmen, Küche, Ausgabe und Bons – ohne Preise und ohne Zahlungen. Kassiert wird außerhalb von OpenEOS, z. B. mit offener Ladenkasse oder Wertmarken. | Keine Preise, keine Zahlungen |
| **Bargeldlos** | Alle Funktionen mit Kartenzahlung (SumUp) und Online-Vorkasse. Bargeld gibt es in OpenEOS nicht. | Karte und online |
| **Alle Funktionen** | Bargeld, Karte und Online-Zahlung. | Bar, Karte und online – in Deutschland nur mit aktiver Cloud-TSE (in Vorbereitung) |

Organisationen, die es schon vor den Betriebsarten gab, laufen als **Alle Funktionen (Bestand)** weiter, bis sie eine Betriebsart wählen. Mehr dazu unter [Bestehende Organisationen](#bestand).

## Was in welcher Betriebsart geht {/* #vergleich */}

| | Nur Bons | Bargeldlos | Alle Funktionen |
|---|---|---|---|
| Bestellen, Küche und Stationen, Ausgabe, Tische, Anzeigen, Schichtpläne | ja | ja | ja |
| Preise an der Kasse, auf Bons und auf der Kundenanzeige | keine Preise | ja | ja |
| Kassieren an der Kasse | nein – Abschluss mit **Abgeholt** bzw. **Tisch abschließen** | Karte (SumUp) | Bar und Karte |
| Rechnung teilen, Sammelzahlung, Trinkgeld | nein | per Karte | bar oder per Karte |
| Online-Shop und Bestellung per QR-Code | nein, der Shop zeigt „Bestellungen nur vor Ort“ | mit Online-Vorkasse | mit Online-Vorkasse |
| Erstattung | nein | nur auf Karte oder Online-Zahlung | ja |
| [Pfand](./pfand.md) | nein | nur **Verrechnen** | **Auszahlen** und **Verrechnen** |
| [Rabatt-Bons](./rabatt-bons.md) | nein | ja | ja |
| Kassenlade | nein | nein | ja |
| [Auswertung](./auswertung.md) | nur Mengen | Mengen und Umsätze | Mengen und Umsätze |

Die Regeln gelten nicht nur in der Oberfläche. Auch der Server weist jeden Vorgang ab, den die Betriebsart nicht erlaubt, egal von welcher Kasse oder aus welchem Programm er kommt.

## Nur Bons {/* #nur-bons */}

In **Nur Bons** arbeitet OpenEOS als reines Bestellsystem. Dein Team nimmt Bestellungen an den Kassengeräten auf, OpenEOS leitet sie an Küche und Theke weiter, und die Bestellungen werden ohne Bezahlung abgeschlossen. Ein Kassenmodul gibt es in dieser Betriebsart nicht: In OpenEOS gibt es keine Preise und keine Zahlungen.

### Was weiter geht {/* #nur-bons-was-geht */}

- **Bestellen** an den Kassengeräten, an der Theke und im Tischbetrieb, wie unter [An der Kasse verkaufen](./kasse.md) beschrieben – ohne Beträge.
- **Weiterleiten** an Küche, Theke und andere [Standorte](./standorte.md): Küchen- und Bestellbons und [Küchen- bzw. Thekenanzeigen](./anzeigen.md). Die Bons tragen keine Preise.
- **Kundenanzeige:** Sie zeigt Artikel und Mengen, keine Preise.
- **Fertig melden**, **abgeholt** bzw. **serviert** markieren.
- **Stornieren** von ganzen Bestellungen und einzelnen Positionen, ohne Erstattung.
- **Auswertung:** nur Mengen, keine Umsätze. Das gilt auch für Berichte, die ein [KI-Agent](./ki-agenten.md) abruft.

### Was es nicht gibt {/* #nur-bons-gesperrt */}

- Kein **Kassieren**: keine Barzahlung, keine Kartenzahlung, keine Zahlung über SumUp.
- Kein **Rechnung teilen**, keine Sammelzahlung, kein **Trinkgeld**.
- Keine **Erstattung**, keine **Kassenlade**, keine Quittung.
- Kein **Pfand** und keine **Rabatt-Bons**.
- Keine Bestellungen im **Online-Shop** und per **QR-Code**. Der Shop zeigt statt Speisekarte und Warenkorb den Hinweis „Bestellungen nur vor Ort“.

### Bestellungen abschließen {/* #abschliessen */}

An der Kasse endet der Ablauf mit **Bestellung senden**. Ohne Bezahlung braucht jede Bestellung einen anderen Abschluss:

| Bestellung | Wann sie abgeschlossen ist |
|---|---|
| An der Theke oder zum Abholen, **ohne** Artikel für einen Standort | Sofort beim Senden. |
| An der Theke oder zum Abholen, **mit** Artikeln für einen Standort | Bei der Übergabe: Du tippst in den **Offenen Bestellungen** der Kasse auf **Abgeholt**, oder alle Artikel für die Standorte sind als ausgegeben markiert. |
| Am Tisch | Die Bestellungen bleiben am Tisch offen, bis die Bedienung auf **Tisch abschließen** tippt. Der Knopf ersetzt **Kassieren** und schließt alle offenen Bestellungen des Tisches ab. |

Solange ein Standort einen Artikel noch zubereitet, lässt sich die Bestellung nicht abschließen.

### Kassieren außerhalb von OpenEOS {/* #ausserhalb */}

Das Geld nimmst du außerhalb von OpenEOS an, zum Beispiel mit einer offenen Ladenkasse oder über Wertmarken, die du vorher verkaufst. Für die Aufzeichnungspflichten, die dafür gelten, ist dein Verein selbst verantwortlich. Was dazu gehört, steht in den [FAQ auf openeos.de](https://openeos.de/faq#offene-ladenkasse).

## Bargeldlos {/* #bargeldlos */}

In **Bargeldlos** stehen alle Funktionen zur Verfügung, bezahlt wird aber nur mit Karte über [SumUp](./integrationen/sumup.md) und online: im Online-Shop und bei der Bestellung per QR-Code. Bargeld gibt es in OpenEOS nicht – keine Zahlart, keine Schaltfläche, keine Einstellung.

| Vorgang | Bargeldlos |
|---|---|
| Kassieren | Keine Zahlart **Bar**, keine Schnellwahl, kein Rückgeld. Die Kasse startet mit **Karte** (mit Trinkgeld); **Rabatt** und **Rechnung teilen** bleiben. |
| Offene Bestellungen, Rechnung teilen, Bestellverlauf | Dieselben Zahlarten ohne Bar. Geteilte und gesammelte Zahlungen gehen mit Karte. |
| Trinkgeld | Nur mit Karte. |
| Erstattung | Nur auf die ursprüngliche Karten- oder Online-Zahlung. Eine Barzahlung aus der Zeit vor dem Wechsel lässt sich über OpenEOS nicht mehr erstatten; die Kasse und die Verwaltung zeigen dann „Keine Bar-Erstattung“. |
| Pfand-Rückgabe | **Auszahlen** gibt es nicht. Zurückgegebenes Pfand verrechnest du mit neuem Pfand im selben Verkauf (**Verrechnen**). Ohne Warenkorb ist die Pfand-Rückgabe gesperrt und erklärt das. |
| Kassenlade | Öffnet sich nicht, der Menüpunkt **Kassenlade öffnen** fehlt. |

Ohne SumUp kann die Kasse in dieser Betriebsart keine Zahlungen annehmen; abschließen lassen sich dann nur online oder vorab bezahlte Bestellungen. Das kann reichen, wenn du nur über den Shop verkaufst.

Mit SumUp im [Testmodus](./veranstaltungen.md) löst die Kasse keine echte Kartenzahlung aus. Damit du den Ablauf trotzdem durchspielen kannst, bucht sie die Karte dann nur (wie ein externes Terminal).

## Alle Funktionen {/* #alle-funktionen */}

In **Alle Funktionen** nimmt die Kasse Bargeld, Karte und Online-Zahlung an: Bar ist die erste Zahlart, die Kasse rechnet Rückgeld aus, zahlt Pfand bar aus und öffnet die Kassenlade. Alles Weitere steht unter [An der Kasse verkaufen](./kasse.md#kassieren).

- **In Deutschland** gibt es „Alle Funktionen“ nur mit einer aktiven, zertifizierten **Cloud-TSE**. Die TSE-Anbindung ist in Vorbereitung; bis dahin ist die Betriebsart in den Einstellungen ausgegraut („benötigt eine Cloud-TSE – in Vorbereitung“). Ist die TSE später nicht mehr aktiv, nimmt die Kasse kein Bargeld mehr an – der Server prüft das bei jeder Barzahlung –, und OpenEOS zeigt dir einen Hinweis.
- **In allen anderen Ländern** kannst du „Alle Funktionen“ ohne TSE wählen. Welche Regeln dort gelten, steht unter [Österreich, Schweiz und andere Länder](#andere-laender).

## Bargeld und TSE {/* #tse */}

:::info[Bargeld und TSE]
Eine elektronische Kasse, mit der sich Bargeld annehmen lässt, braucht in Deutschland eine zertifizierte TSE. Nach Auskunft des Bundesfinanzministeriums reicht dafür schon, dass dein Verein Bargeld selbst einschalten kann – ob er es tatsächlich tut, spielt keine Rolle.
:::

Deshalb lässt OpenEOS Bargeld in Deutschland nur mit aktiver TSE zu. Ohne TSE wählst du **Nur Bons** oder **Bargeldlos**. In beiden gibt es in OpenEOS kein Bargeld, und dein Verein kann es auch nicht selbst einschalten: „Alle Funktionen“ lässt sich ohne TSE nicht wählen. Zwischen „Nur Bons“ und „Bargeldlos“ wechselst du deshalb jederzeit selbst – an der TSE-Frage ändert das nichts.

Nach Auskunft des Bundesfinanzministeriums fallen Bestellsysteme ohne Kassenmodul nicht unter § 146a AO. Ohne TSE geht es aber nur, wenn dein Verein Bargeld nicht selbst einschalten kann und das in der Verfahrensdokumentation nachgewiesen ist, zum Beispiel durch eine [Bescheinigung des Herstellers](#bescheinigung). Im Einzelfall entscheidet dein Finanzamt; bist du unsicher, sprich mit deiner Steuerberatung.

Mehr dazu in den [FAQ auf openeos.de](https://openeos.de/faq#tse).

## Betriebsart wechseln {/* #wechseln */}

1. Öffne **Einstellungen → Organisation → Betriebsart**.
2. Wähle die neue Betriebsart und tippe auf **Zu „…“ wechseln**.
3. Lies die Rückfrage: Sie zeigt, was sich durch den Wechsel ändert. Bestätige mit **Wechseln**. Kommst du in Deutschland ohne TSE von „Alle Funktionen“ nicht mehr zurück, setzt du vorher ein Häkchen und bestätigst mit **Verbindlich wechseln**.

Das dürfen nur Admins der Organisation. Die Kassen stellen sich sofort um, ein Neuladen ist nicht nötig. Vorher muss das [Land](#land) deiner Organisation hinterlegt sein.

Wechsle am besten zwischen zwei Veranstaltungen und nicht, während der Verkauf läuft.

Auch unser Support kann die Betriebsart wechseln, zum Beispiel auf deine Bitte hin. Er gibt dabei immer einen Grund an. Für den Support gelten dieselben Regeln: In Deutschland gibt es auch über ihn „Alle Funktionen“ nur mit aktiver TSE.

### Verlauf {/* #verlauf */}

Unter der Auswahl steht, seit wann die aktuelle Betriebsart gilt, und darunter der **Verlauf**: jeder Wechsel mit Zeitpunkt, der Person, die gewechselt hat, und alter und neuer Betriebsart (zum Beispiel „Alle Funktionen (Bestand) → Bargeldlos“). Wechsel durch unseren Support stehen dort als „OpenEOS-Support“ mit dem Grund. Den Verlauf kann niemand bearbeiten. So kannst du belegen, welche Betriebsart wann galt.

## Herstellerbescheinigung {/* #bescheinigung */}

Arbeitet deine Organisation in Deutschland in **Nur Bons** oder **Bargeldlos**, finden Admins unter **Einstellungen → Organisation → Betriebsart** den Knopf **Bescheinigung herunterladen**. Die Herstellerbescheinigung ist ein PDF für deine Verfahrensdokumentation. Sie bestätigt, dass Bargeld in deiner Organisation nicht erfasst werden kann und in OpenEOS ausschließlich mit aktiver zertifizierter TSE möglich ist, und enthält den Verlauf der Betriebsarten.

Lege die Bescheinigung zu deiner Verfahrensdokumentation. Nach jedem Wechsel der Betriebsart lädst du eine neue herunter.

## Land der Organisation {/* #land */}

Jede Organisation hat in OpenEOS ein **Land**. Es ist Pflicht, denn davon hängt ab, welche Betriebsarten du wählen kannst.

- **Neue Organisationen** wählen das Land bei der [Registrierung](./registrierung-login.md) bzw. unter **Neue Organisation**. Oben in der Liste stehen Deutschland, Österreich und die Schweiz, darunter alle anderen Länder.
- **Bestehende Organisationen ohne Land** bittet OpenEOS einmal darum, im [Dashboard](./dashboard.md) und in den Einstellungen. Ein Admin wählt das Land und bestätigt.

Das Land legst du **einmal** fest. Danach kann es nur noch unser Support ändern, mit Angabe eines Grundes. So bleibt nachvollziehbar, welche Regel wann galt. Unter **Einstellungen → Organisation → Kontakt** siehst du das Land zur Ansicht.

## Deutschland {/* #deutschland */}

| Betriebsart | Ohne TSE | Mit aktiver Cloud-TSE |
|---|---|---|
| Nur Bons | wählbar | wählbar |
| Bargeldlos | wählbar | wählbar |
| Alle Funktionen | nicht wählbar | wählbar |
| Alle Funktionen (Bestand) | bleibt, bis du eine Betriebsart wählst | – |

Für „Nur Bons“ und „Bargeldlos“ bekommst du die [Herstellerbescheinigung](#bescheinigung).

## Bestehende Organisationen: Alle Funktionen (Bestand) {/* #bestand */}

Organisationen, die es vor den Betriebsarten (November 2026) gab, arbeiten als **Alle Funktionen (Bestand)** wie bisher weiter – auch in Deutschland und auch ohne TSE –, bis du eine Betriebsart wählst. Niemand stellt deine Organisation mitten in der Saison automatisch um.

Liegt deine Organisation in Deutschland, erklärt ein Hinweis im Dashboard und in den Einstellungen die TSE-Pflicht und bittet dich, das Land zu bestätigen und eine Betriebsart zu wählen. Ob du bis dahin Bargeld ohne TSE in OpenEOS erfasst, verantwortest du selbst; stimm dich am besten mit deiner Steuerberatung ab.

:::warning[In Deutschland kein Weg zurück ohne TSE]
Wählst du in Deutschland eine andere Betriebsart, endet der Bestand. Zurück zu „Alle Funktionen“ kommst du dann nur mit aktiver TSE – auch nicht über unseren Support.
:::

Außerhalb Deutschlands kannst du „Alle Funktionen“ jederzeit wieder wählen. Wählst du sie dort ausdrücklich, ändert sich nichts an den Funktionen; nur der Zusatz „(Bestand)“ entfällt.

Hattest du vorher schon etwas umgestellt, hat OpenEOS das übernommen: Der frühere bargeldlose Modus und „Deutschland ohne Bargeld“ wurden zu **Bargeldlos**, „Nur Bestellen“ wurde zu **Nur Bons**. Im Verlauf steht dazu ein Eintrag „Umstellung auf Betriebsarten“.

## Österreich, Schweiz und andere Länder {/* #andere-laender */}

Außerhalb Deutschlands kannst du alle drei Betriebsarten frei wählen, „Alle Funktionen“ mit Bargeld auch ohne TSE. Ob OpenEOS für deinen Verein zulässig ist, prüfst du selbst. Das ist keine Steuerberatung.

### Österreich {/* #oesterreich */}

In Österreich gilt die **Registrierkassenpflicht (RKSV)** ab 15.000 € Jahresumsatz je Betrieb, wenn davon mehr als 7.500 € Barumsätze sind. **Kartenzahlungen zählen in Österreich als Barumsätze** – auch in der Betriebsart „Bargeldlos“. OpenEOS erstellt derzeit **keine RKSV-Signatur**.

Ausnahmen gibt es zum Beispiel für kleine Feste gemeinnütziger Vereine bis zu 72 Stunden im Kalenderjahr und für Kantinen gemeinnütziger Vereine bis 45.000 € Jahresumsatz (netto), wenn sie an höchstens 52 Tagen im Jahr betrieben werden (Grenze seit 2026). Für die Ausnahmen gelten weitere Bedingungen. Prüfe die Regeln für deinen Verein selbst bzw. mit deiner Steuerberatung.

Quellen: [Registrierkassenpflicht im Unternehmensserviceportal (USP)](https://www.usp.gv.at/themen/steuern-finanzen/steuerliche-rechte-und-pflichten/registrierkassen/registrierkassenpflicht.html) und [Registrierkassen beim BMF](https://www.bmf.gv.at/themen/steuern/fuer-unternehmen/registrierkassen.html).

### Schweiz {/* #schweiz */}

In der Schweiz gibt es nach unserem Kenntnisstand keine allgemeine Registrierkassen- oder Fiskalisierungspflicht. Aufbewahrungs- und Mehrwertsteuerregeln gelten aber auch für Vereine. Prüfe selbst bzw. mit deiner Treuhand oder Steuerberatung, was für deinen Verein gilt.

### Andere Länder {/* #weitere-laender */}

Viele Länder haben eigene Kassenvorschriften (z. B. Italien, Frankreich, Polen, Tschechien). Prüfe selbst, ob OpenEOS dort für dich zulässig ist.

## Eigene Installation {/* #selbst-betreiben */}

Betreibst du OpenEOS [selbst](./selbst-betreiben/intro.md), bist du selbst Betreiber des Systems. Die Herstellerbescheinigung gibt es dort nicht.

## Siehe auch

- [An der Kasse verkaufen](./kasse.md)
- [Pfand](./pfand.md)
- [SumUp](./integrationen/sumup.md)
- [FAQ auf openeos.de: Kasse, Bargeld und TSE](https://openeos.de/faq#tse)
