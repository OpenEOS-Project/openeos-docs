---
sidebar_position: 3
title: Betriebsarten
description: Die drei Betriebsarten einer Organisation – Nur Bons, Bargeldlos und Alle Funktionen –, was in jeder geht, wie du wechselst und was je nach Land gilt.
---

import TseComingSoon from '@site/src/components/TseComingSoon';

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
| **Alle Funktionen** | Bargeld, Karte und Online-Zahlung. | Bar, Karte und online – Bargeld in Deutschland nur mit aktiver [Cloud-TSE](./integrationen/cloud-tse.md) |

Neue Organisationen starten in **Alle Funktionen** – auch in Deutschland. Organisationen, die es schon vor den Betriebsarten gab, laufen als **Alle Funktionen (Bestand)** weiter, bis sie eine Betriebsart wählen. Mehr dazu unter [Bestehende Organisationen](#bestand).

## Was in welcher Betriebsart geht {/* #vergleich */}

| | Nur Bons | Bargeldlos | Alle Funktionen |
|---|---|---|---|
| Bestellen, Küche und Stationen, Ausgabe, Tische, Anzeigen, Schichtpläne | ja | ja | ja |
| Preise an der Kasse, auf Bons und auf der Kundenanzeige | keine Preise | ja | ja |
| Kassieren an der Kasse | nein – Abschluss mit **Abgeholt** bzw. **Tisch abschließen** | Karte (SumUp) | Bar und Karte – Bar in Deutschland nur mit aktiver Cloud-TSE |
| Rechnung teilen, Sammelzahlung, Trinkgeld | nein | per Karte | bar oder per Karte |
| Online-Shop und Bestellung per QR-Code | nein, der Shop zeigt „Bestellungen nur vor Ort“ | mit Online-Vorkasse | mit Online-Vorkasse, mit Cloud-TSE signiert ([Online-Bestellungen](#online)) |
| Erstattung | nein | nur auf Karte oder Online-Zahlung | ja |
| [Pfand](./pfand.md) | nein | nur **Verrechnen** | **Auszahlen** und **Verrechnen** |
| [Rabatt-Bons](./rabatt-bons.md) (nur kostenlos ausgegebene Bons) | nein | ja | ja |
| [Wertmarken](./wertmarken.md) verkaufen, als Zahlung annehmen, zurücktauschen | nein | nein ([warum](#wertmarken)) | ja – in Deutschland nur mit aktiver Cloud-TSE |
| Gutscheine, Guthaben als Zahlung | nein | nein | gibt es in OpenEOS nicht |
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
- Keine **[Wertmarken](./wertmarken.md)** in OpenEOS – kein Verkauf, keine Annahme, kein Rücktausch.
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

Auch ohne Kassenfunktion gilt für die Bestelldaten in OpenEOS die Einzelaufzeichnungspflicht: Exportiere sie (siehe [Bestellungen](./bestellungen.md)) und bewahre sie zehn Jahre auf. Prüfer vergleichen die Bestellmengen gern mit dem Kassenbericht der offenen Ladenkasse und dem Rücklauf der Wertmarken – haltet beides so fest, dass es zusammenpasst. In deine [Verfahrensdokumentation](./verfahrensdokumentation.md#betriebsart) gehören der Ablauf Bestellung → Küchenbon → Kassieren außerhalb, die [Herstellerbescheinigung](#bescheinigung) und der Verlauf der Betriebsarten.

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
| Wertmarken | Gesperrt: kein Verkauf, keine Annahme als Zahlung, kein Rücktausch (siehe [Wertmarken und Gutscheine](#wertmarken)). |

Ohne SumUp kann die Kasse in dieser Betriebsart keine Zahlungen annehmen; abschließen lassen sich dann nur online oder vorab bezahlte Bestellungen. Das kann reichen, wenn du nur über den Shop verkaufst.

Im [Testmodus](./veranstaltungen.md) und solange die Veranstaltung [Geplant](./veranstaltungen.md#phasen) ist, löst die Kasse keine echte Kartenzahlung aus. Stattdessen kassierst du mit den Testzahlungen „Bar (Test)“ und „Karte (Test)“ – Simulationen ohne Geld, siehe [Testzahlungen im Testmodus](#testzahlungen).

### Ohne TSE nur unter Bedingungen {/* #bargeldlos-bedingungen */}

Eine Kasse ohne Bargeld braucht keine TSE – aber nur, wenn wirklich nichts angenommen wird, was dem Bargeld gleichsteht. Nach AEAO zu § 146a Nr. 1.2 zählen dazu auch Guthaben, Kundenkonten und Gutscheine, Wertmarken oder Bons, die vor Ort „an Geldes statt“ angenommen werden. „Bargeldlos“ ist deshalb nur vertretbar TSE-frei, wenn alles Folgende zutrifft:

- **Positivliste der Zahlarten:** nur Karte (SumUp-Kartenleser oder externes Terminal) und Online-Zahlung über einen Zahlungsdienstleister (SumUp Online mit Karte, Google Pay oder Apple Pay). Jede andere Zahlart weist der Server in „Bargeldlos“ ab, egal woher der Vorgang kommt.
- **Technische Sperre:** Bargeld lässt sich ohne aktive Cloud-TSE in keiner Betriebsart einschalten – auch über unseren Support nicht. Admins können zwar die Betriebsart wechseln, auch zu „Alle Funktionen“, Bargeld nimmt die Kasse in Deutschland aber erst mit aktiver Cloud-TSE an; der Server prüft das bei jeder Barzahlung. Jeder Wechsel steht im [Verlauf](#verlauf).
- **Keine Wertmarken, Gutscheine oder Guthaben** als Zahlung – weder in OpenEOS noch nebenher am selben Stand (siehe [Wertmarken und Gutscheine](#wertmarken)).
- **Erstattungen nur auf das ursprüngliche Zahlungsmittel**, nie bar.
- **Getrennt von euren Kassen mit Bargeld:** Laufen beim Fest daneben Kassen mit Bargeld (z. B. eine offene Ladenkasse), dürfen keine Bons oder Bestellungen aus OpenEOS dorthin übergeben, dort nachbezahlt oder erstattet werden – und umgekehrt.
- **Abgleich mit den Abrechnungen** von SumUp: Der [Export der Bestellungen](./bestellungen.md) enthält dafür je Bestellung Zahlungsanbieter, Zahlungsreferenz und Erstattungsreferenz.

Die Einzelaufzeichnung und der Datenexport bleiben auch ohne TSE Pflicht. Lege die [Herstellerbescheinigung](#bescheinigung) und ein Kapitel zu diesen Punkten in deine [Verfahrensdokumentation](./verfahrensdokumentation.md#betriebsart). Rechtsprechung dazu gibt es noch nicht; Sicherheit gibt nur eine verbindliche Auskunft deines Finanzamts (§ 89 AO).

## Alle Funktionen {/* #alle-funktionen */}

In **Alle Funktionen** nimmt die Kasse Bargeld, Karte und Online-Zahlung an: Bar ist die erste Zahlart, die Kasse rechnet Rückgeld aus, zahlt Pfand bar aus und öffnet die Kassenlade. Alles Weitere steht unter [An der Kasse verkaufen](./kasse.md#kassieren).

<TseComingSoon />

- **In Deutschland** kannst du „Alle Funktionen“ jederzeit wählen, auch ohne aktive TSE. Bargeld nimmt die Kasse aber nur mit einer aktiven, zertifizierten **Cloud-TSE** an. Ohne TSE kassierst du mit Karte (SumUp oder externes Terminal) und online; die Einstellungen zeigen dann den Hinweis „Bargeld kommt mit der Cloud-TSE“. Die TSE ist im Preis der Veranstaltung inklusive und kommt automatisch: Schaltest du eine Veranstaltung frei, schaltet OpenEOS die Cloud-TSE ein und richtet sie zum ersten Veranstaltungstag ein – siehe [Cloud-TSE](./integrationen/cloud-tse.md#automatisch). Die Karte zeigt dann *Cloud-TSE wird am … automatisch eingerichtet*, und Bargeld geht ab diesem Tag. Ist die Cloud-TSE erst angekündigt ([Bald verfügbar](./integrationen/cloud-tse.md#bald-verfuegbar)), wartet Bargeld auf sie. Sobald die TSE aktiv ist, wird aus „Bargeldlos“ automatisch „Alle Funktionen“. Ist die TSE später nicht mehr aktiv, nimmt die Kasse kein Bargeld mehr an – der Server prüft das bei jeder Barzahlung –, und OpenEOS zeigt dir einen Hinweis. Im Testmodus probierst du die Kasse mit „Bar (Test)“ und „Karte (Test)“ aus, siehe [Testzahlungen im Testmodus](#testzahlungen).
- **In allen anderen Ländern** kannst du „Alle Funktionen“ ohne TSE wählen. Welche Regeln dort gelten, steht unter [Österreich, Schweiz und andere Länder](#andere-laender).

Nur in „Alle Funktionen“ gibt es außerdem [Wertmarken](./wertmarken.md): Marken verkaufen, beim Kassieren als Zahlung annehmen und zurücktauschen. Weil das Annehmen von Marken „an Geldes statt“ eine Kassenfunktion ist, gilt in Deutschland dieselbe Regel wie für Bargeld: nur mit aktiver Cloud-TSE – auch in **Alle Funktionen (Bestand)**. Außerhalb Deutschlands gehen Wertmarken wie Bargeld auch ohne TSE.

## Testzahlungen im Testmodus {/* #testzahlungen */}

Solange eine Bestellung eine Testbestellung ist – die Veranstaltung steht im [Testmodus](./veranstaltungen.md) oder in der Phase [Geplant](./veranstaltungen.md#phasen) –, bietet die Kasse statt der echten Zahlarten **Bar (Test)** und **Karte (Test)** an. Das gilt in jeder Betriebsart außer „Nur Bons“, unabhängig von Land, TSE und SumUp. So kannst du auch ohne TSE und ohne Kartenleser den ganzen Kassenablauf durchspielen.

Testzahlungen sind Simulationen, kein Geld:

- **Bar (Test)** hat den Rückgeldrechner zum Üben, öffnet aber nie die Kassenlade.
- **Karte (Test)** spricht nie den SumUp-Kartenleser an; es wird nichts abgebucht.
- Testzahlungen stehen nicht im [Kassenbuch](./kassenbuch.md) und nicht im DSFinV-K-Export, und die TSE signiert sie nicht. In der [Kellnerabrechnung](./bedienungen.md) zählen sie nur unter „Training (nicht im Geld)“.
- Erstatten lässt sich eine Testzahlung nur als Testbuchung, nie bar.
- Auf dem Bon stehen „Bar (Test – kein Geld)“ bzw. „Karte (Test – kein Geld)“ und der Hinweis TESTMODUS.
- Beim Aktivieren der Veranstaltung werden die Testzahlungen mit den Testbestellungen gelöscht.

Der Server nimmt Testzahlungen nur für Testbestellungen an. Echtes Bargeld auf Testbestellungen folgt den normalen Regeln, in Deutschland also nur mit aktiver Cloud-TSE.

Warum eine Simulation: In Deutschland müssten auch Trainingsbuchungen mit echtem Bargeld von einer TSE abgesichert werden (KassenSichV). Ohne TSE bietet OpenEOS deshalb keine Bargeldfunktion an, sondern eine deutlich gekennzeichnete Simulation.

## Online-Bestellungen {/* #online */}

Bestellungen im **Online-Shop** und per **QR-Code** am Tisch bezahlt der Gast online (Online-Vorkasse). Wie OpenEOS sie behandelt, hängt davon ab, ob deine Organisation eine Cloud-TSE hat:

| | Mit Cloud-TSE (Alle Funktionen) | Ohne TSE (Bargeldlos) |
|---|---|---|
| Signatur | Jede Online-Zahlung wird beim Zahlungseingang von der TSE signiert, vor Küchenbon und Kassenbon. | keine |
| DSFinV-K-Export | ja, als Beleg mit der Zahlart Zahlungsdienstleister | nein |
| Bargeld auf Online-Bestellungen | an der Kasse möglich | gesperrt: Shop- und QR-Bestellungen lassen sich nicht bar nachbezahlen oder bar erstatten |
| Erstattung | wie jede Erstattung, mit Verweis auf den Online-Beleg, zurück an den Zahlungsdienstleister | nur zurück an den Zahlungsdienstleister |

Hintergrund: Ein Webshop ohne Zahlung vor Ort braucht keine TSE – aber nur, solange er vollständig von der Kasse mit Bargeld getrennt ist. Werden Shop-Bestellungen in derselben Kasse eingelöst, nachbezahlt oder erstattet, fehlt diese Trennung. Bei der QR-Bestellung zahlt der Gast zudem vor Ort. Deshalb signiert OpenEOS mit Cloud-TSE alle Online-Zahlungen mit; ohne TSE sorgt die Betriebsart für die Trennung. Die Bestelldaten exportierst du in beiden Fällen über [Bestellungen](./bestellungen.md) und bewahrst sie zehn Jahre auf.

## Wertmarken und Gutscheine {/* #wertmarken */}

- **Rabatt-Bons** in OpenEOS sind kostenlos ausgegebene Bons des Vereins, etwa Helfer- oder Freigetränk-Bons. Sie mindern den Preis (DSFinV-K „Rabatt“) und sind keine Zahlart. Siehe [Rabatt-Bons](./rabatt-bons.md).
- **Verkaufte Wertmarken** bildet OpenEOS mit der Funktion [Wertmarken](./wertmarken.md) ab: Verkauf, Annahme als Zahlung und Rücktausch, mit der richtigen Umsatzsteuer (Mehrzweck- oder Einzweckgutschein). Nimmt ein Stand Marken „an Geldes statt“ an, ist das Kassenfunktion und braucht in Deutschland eine TSE (AEAO zu § 146a Nr. 1.2). Deshalb gibt es Wertmarken nur in **Alle Funktionen** und in Deutschland nur mit aktiver Cloud-TSE; in „Bargeldlos“ und „Nur Bons“ weist der Server Verkauf, Annahme und Rücktausch ab.
- **Gutscheine und Guthaben** (z. B. Guthabenkarten oder Kundenkonten) gibt es in OpenEOS nicht. Verkaufte Wertmarken oder Gutscheine buchst du auch nicht als Rabatt-Bon.
- In **Nur Bons** kann dein Verein Wertmarken außerhalb von OpenEOS verkaufen und annehmen und über die Rücklaufzählung abrechnen. In **Bargeldlos** dürfen am selben Stand keine Marken als Zahlung angenommen werden, auch nicht nebenher (siehe [Bedingungen](#bargeldlos-bedingungen)). Beschreibe Ausgabe, Einlösung, Rücktausch und Restmarken in deiner [Verfahrensdokumentation](./verfahrensdokumentation.md#wertmarken).

## Bargeld und TSE {/* #tse */}

:::info[Bargeld und TSE]
Eine elektronische Kasse, mit der sich Bargeld annehmen lässt, braucht in Deutschland eine zertifizierte TSE. Nach Auskunft des Bundesfinanzministeriums reicht dafür schon, dass dein Verein Bargeld selbst einschalten kann – ob er es tatsächlich tut, spielt keine Rolle.
:::

Deshalb lässt OpenEOS Bargeld in Deutschland nur mit aktiver TSE zu, in jeder Betriebsart (ausgenommen der [Bestand](#bestand), bis du eine Betriebsart wählst). Ohne TSE kassierst du in **Alle Funktionen** oder **Bargeldlos** mit Karte und online, oder du arbeitest in **Nur Bons** ganz ohne Zahlungen. Bargeld kann dein Verein ohne TSE nicht selbst einschalten: Auch in „Alle Funktionen“ nimmt die Kasse erst ab der Einrichtung der TSE Bargeld an, und der Server prüft das bei jeder Barzahlung. Auch im Testmodus gibt es ohne TSE kein Bargeld, nur die Simulation „Bar (Test)“ (siehe [Testzahlungen](#testzahlungen)). Zwischen den Betriebsarten wechselst du deshalb jederzeit selbst – an der TSE-Frage ändert das nichts.

Nach Auskunft des Bundesfinanzministeriums fallen Bestellsysteme ohne Kassenmodul nicht unter § 146a AO. Ohne TSE geht es aber nur, wenn dein Verein Bargeld nicht selbst einschalten kann und das in der Verfahrensdokumentation nachgewiesen ist, zum Beispiel durch eine [Bescheinigung des Herstellers](#bescheinigung). Für „Bargeldlos“ gelten zusätzlich die [Bedingungen oben](#bargeldlos-bedingungen). Eine [Vorlage für die Verfahrensdokumentation](./verfahrensdokumentation.md) findest du hier im Handbuch. Im Einzelfall entscheidet dein Finanzamt; bist du unsicher, sprich mit deiner Steuerberatung.

Wie du die TSE einrichtest, was auf dem Bon steht und was bei einem Ausfall passiert, steht unter [Cloud-TSE](./integrationen/cloud-tse.md). Mehr dazu in den [FAQ auf openeos.de](https://openeos.de/faq#tse).

## Betriebsart wechseln {/* #wechseln */}

1. Öffne **Einstellungen → Organisation → Betriebsart**.
2. Wähle die neue Betriebsart und tippe auf **Zu „…“ wechseln**.
3. Lies die Rückfrage: Sie zeigt, was sich durch den Wechsel ändert. Bestätige mit **Wechseln**. Läuft deine Organisation in Deutschland ohne TSE noch als „Alle Funktionen (Bestand)“, endet mit jeder Wahl das Bargeld ohne TSE – auch wenn du „Alle Funktionen“ bestätigst. Dann setzt du vorher ein Häkchen und bestätigst mit **Verbindlich wechseln** (beim Bestätigen von „Alle Funktionen“ mit **Bestätigen**).

![Einstellungen → Organisation → Betriebsart](/img/screens/de/settings-operating-mode.png)

Das dürfen nur Admins der Organisation. Die Kassen stellen sich sofort um, ein Neuladen ist nicht nötig. Vorher muss das [Land](#land) deiner Organisation hinterlegt sein.

Wechsle am besten zwischen zwei Veranstaltungen und nicht, während der Verkauf läuft.

Auch unser Support kann die Betriebsart wechseln, zum Beispiel auf deine Bitte hin. Er gibt dabei immer einen Grund an. Für den Support gelten dieselben Regeln: Er kann auch in Deutschland ohne aktive TSE „Alle Funktionen“ wählen, Bargeld gibt es aber auch über ihn nur mit aktiver TSE.

### Verlauf {/* #verlauf */}

Unter der Auswahl steht, seit wann die aktuelle Betriebsart gilt, und darunter der **Verlauf**: jeder Wechsel mit Zeitpunkt, der Person, die gewechselt hat, und alter und neuer Betriebsart (zum Beispiel „Alle Funktionen (Bestand) → Bargeldlos“). Wechsel durch unseren Support stehen dort als „OpenEOS-Support“ mit dem Grund. Den Verlauf kann niemand bearbeiten. So kannst du belegen, welche Betriebsart wann galt.

## Herstellerbescheinigung {/* #bescheinigung */}

Solange OpenEOS für deine Organisation in Deutschland kein Bargeld erfassen kann, finden Admins unter **Einstellungen → Organisation → Betriebsart** den Knopf **Bescheinigung herunterladen**: in **Nur Bons**, in **Bargeldlos** und in **Alle Funktionen** ohne aktive TSE (nicht im Bestand). Die Herstellerbescheinigung ist ein PDF für deine Verfahrensdokumentation. Sie bestätigt, dass Bargeld in deiner Organisation nicht erfasst werden kann und in OpenEOS ausschließlich mit aktiver zertifizierter TSE möglich ist, und enthält den Verlauf der Betriebsarten. Außerdem hält sie fest, dass [Testzahlungen](#testzahlungen) Simulationen ohne Geld sind.

In „Alle Funktionen“ gilt die Bescheinigung nur für den Zeitraum ohne aktive TSE: Ab der Aktivierung der TSE werden Barzahlungen TSE-gesichert erfasst.

Lege die Bescheinigung zu deiner [Verfahrensdokumentation](./verfahrensdokumentation.md#betriebsart). Nach jedem Wechsel der Betriebsart lädst du eine neue herunter. Die Bescheinigung ist ein hilfreicher Baustein, aber kein Nachweis mit Bindungswirkung gegenüber dem Finanzamt: Entscheidend ist, dass euer Ablauf zu dem passt, was sie bescheinigt.

## Land der Organisation {/* #land */}

Jede Organisation hat in OpenEOS ein **Land**. Es ist Pflicht, denn davon hängt ab, welche Kassenregeln gelten – in Deutschland etwa, dass Bargeld eine TSE braucht.

- **Neue Organisationen** wählen das Land bei der [Registrierung](./registrierung-login.md) bzw. unter **Neue Organisation**. Oben in der Liste stehen Deutschland, Österreich und die Schweiz, darunter alle anderen Länder.
- **Bestehende Organisationen ohne Land** bittet OpenEOS einmal darum, im [Dashboard](./dashboard.md) und in den Einstellungen. Ein Admin wählt das Land und bestätigt.

Das Land legst du **einmal** fest. Danach kann es nur noch unser Support ändern, mit Angabe eines Grundes. So bleibt nachvollziehbar, welche Regel wann galt. Unter **Einstellungen → Organisation → Kontakt** siehst du das Land zur Ansicht.

## Deutschland {/* #deutschland */}

| Betriebsart | Ohne TSE | Mit aktiver Cloud-TSE |
|---|---|---|
| Nur Bons | wählbar | wählbar |
| Bargeldlos | wählbar | wählbar |
| Alle Funktionen | wählbar – Karte und online; Bargeld erst mit Cloud-TSE | wählbar |
| Alle Funktionen (Bestand) | bleibt, bis du eine Betriebsart wählst oder beim Freischalten „Mit Cloud-TSE“ wählst | – |

Für „Nur Bons“, „Bargeldlos“ und „Alle Funktionen“ ohne TSE bekommst du die [Herstellerbescheinigung](#bescheinigung). Neue Organisationen starten in „Alle Funktionen“.

## Bestehende Organisationen: Alle Funktionen (Bestand) {/* #bestand */}

Organisationen, die es vor den Betriebsarten (November 2026) gab, arbeiten als **Alle Funktionen (Bestand)** wie bisher weiter – auch in Deutschland und auch ohne TSE –, bis du eine Betriebsart wählst. Niemand stellt deine Organisation mitten in der Saison automatisch um.

Liegt deine Organisation in Deutschland, erklärt ein Hinweis im Dashboard und in den Einstellungen die TSE-Pflicht und bittet dich, das Land zu bestätigen und eine Betriebsart zu wählen. Beim Freischalten einer Veranstaltung fragt der Bezahldialog *Mit Cloud-TSE (Bargeld rechtssicher)?* – mit **Ja** wird deine Betriebsart zu „Alle Funktionen“ und die Cloud-TSE wird automatisch eingerichtet; mit **Nein** bleibt alles, wie es ist. Ob du bis dahin Bargeld ohne TSE in OpenEOS erfasst, verantwortest du selbst; stimm dich am besten mit deiner Steuerberatung ab.

:::warning[In Deutschland ohne TSE kein Weg zurück zum Bestand]
Wählst du in Deutschland ohne aktive TSE eine Betriebsart, endet der Bestand – auch wenn du „Alle Funktionen“ bestätigst. Bargeld nimmt die Kasse danach erst wieder mit aktiver TSE an; Karte und online gehen weiter. „Alle Funktionen“ selbst kannst du jederzeit wieder wählen. Den Bestand kann auch unser Support nicht wiederherstellen.
:::

Außerhalb Deutschlands und mit aktiver TSE ändert sich beim ausdrücklichen Wählen (**„Alle Funktionen“ bestätigen**, dann **Bestätigen**) nichts an den Funktionen; nur der Zusatz „(Bestand)“ entfällt.

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

Betreibst du OpenEOS [selbst](./selbst-betreiben/intro.md), bist du selbst Betreiber des Systems. Neue Organisationen starten dort wie bisher als „Alle Funktionen (Bestand)“. Die Herstellerbescheinigung gibt es dort nicht.

## Siehe auch

- [An der Kasse verkaufen](./kasse.md)
- [Pfand](./pfand.md)
- [Wertmarken](./wertmarken.md)
- [Cloud-TSE](./integrationen/cloud-tse.md)
- [Verfahrensdokumentation – Vorlage](./verfahrensdokumentation.md)
- [SumUp](./integrationen/sumup.md)
- [FAQ auf openeos.de: Kasse, Bargeld und TSE](https://openeos.de/faq#tse)
