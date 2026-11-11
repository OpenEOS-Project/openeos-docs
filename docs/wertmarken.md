---
title: Wertmarken
description: Wertmarken als Zahlungsmittel – Markentypen anlegen, Marken verkaufen, beim Kassieren annehmen und zurücktauschen, mit Umsatzsteuer, Kassenbuch, Kellnerabrechnung und Bericht.
---

import TseComingSoon from '@site/src/components/TseComingSoon';

# Wertmarken

Viele Vereine verkaufen an einer Zentralkasse **Wertmarken** und die Gäste bezahlen damit an den Ständen. OpenEOS bildet den ganzen Weg ab: Du legst deine Marken als **Markentypen** an, verkaufst sie an der Kasse, nimmst sie beim Kassieren als Zahlung an und tauschst sie – wenn du das willst – gegen Bargeld zurück. Umsatzsteuer, Kassenbuch, Kellnerabrechnung, Berichte und der Export für das Finanzamt rechnen die Marken dabei richtig mit.

<TseComingSoon />

:::info[Nur in „Alle Funktionen“, in Deutschland nur mit Cloud-TSE]
Wer Marken „an Geldes statt“ annimmt, hat eine Kassenfunktion – wie bei Bargeld (AEAO zu § 146a Nr. 1.2). Wertmarken gibt es deshalb nur in der [Betriebsart](./betriebsarten.md) **Alle Funktionen** und in Deutschland nur mit aktiver [Cloud-TSE](./integrationen/cloud-tse.md). Das gilt auch für **Alle Funktionen (Bestand)**: ohne aktive TSE keine Wertmarken. In **Bargeldlos** und **Nur Bons** weist der Server Verkauf, Annahme und Rücktausch ab, egal von welcher Kasse der Vorgang kommt. Außerhalb Deutschlands gehen Wertmarken in „Alle Funktionen“ wie Bargeld auch ohne TSE.
:::

:::note[Keine Steuerberatung]
Wir beschreiben hier, wie OpenEOS Wertmarken bucht, und die steuerliche Einschätzung, auf der das beruht (Stand November 2026). Das ist keine Steuerberatung. Prüfe die Regeln für deinen Verein selbst bzw. mit deiner Steuerberatung.
:::

## Wie es abläuft {/* #ablauf */}

1. **Einrichten:** Unter **Wertmarken** in der Seitenleiste legst du deine Markentypen an, etwa „2-€-Marke“ oder „Getränkemarke“.
2. **Verkaufen:** An der Zentralkasse kauft der Gast Marken – bar oder mit Karte. Das ist noch kein Umsatz.
3. **Bezahlen:** Am Stand gibt der Gast Marken. Du tippst beim Kassieren ein, wie viele Marken je Typ du bekommst; den Rest zahlt er bar oder mit Karte.
4. **Zurücktauschen (optional):** Erlaubst du es für einen Markentyp, nimmst du übrig gebliebene Marken an der Kasse gegen Bargeld zurück – mit Beleg und Unterschrift.
5. **Abrechnen:** Bedienungen geben angenommene Marken wie Bargeld ab. Der Bericht zeigt verkaufte, eingelöste, zurückgetauschte und noch umlaufende Marken.

Die Marken selbst – Papier, Plastikchips, Bons – besorgt ihr wie bisher selbst. OpenEOS druckt keine Markenbögen.

## Markentypen anlegen {/* #einrichten */}

Öffne **Wertmarken** in der Seitenleiste (bei Produkten und Pfand) und lege einen Markentyp an. Dafür brauchst du die Berechtigung **Produkte** (siehe [Mitglieder](./mitglieder.md)).

| Feld | Bedeutung |
|---|---|
| **Name** | So heißt die Marke an der Kasse und auf dem Beleg, z. B. „2-€-Marke“, „Getränkemarke“. |
| **Nennwert (€)** | Verkaufspreis und Einlösewert zugleich, z. B. 2,00 €. |
| **Farbe** | Erkennungsfarbe an der Kasse – am besten dieselbe wie die der echten Marke. |
| **Art** | **Mehrzweckgutschein** (Standard) oder **Einzweckgutschein**, siehe [Umsatzsteuer](#umsatzsteuer). |
| **Steuersatz** | Nur beim Einzweckgutschein: der eine Satz, für den die Marke gilt, z. B. 19 %. |
| **Veranstaltung** | Optional. Leer gilt die Marke für alle Veranstaltungen der Organisation. |
| **Kategorien / Artikel** | Optional, nur mit Veranstaltung: Die Marke gilt nur für diese Artikel, etwa eine „Essensmarke“ für den Grillstand. |
| **Rücktausch erlaubt** | Standard aus. Nur wenn an, kann die Kasse diese Marke gegen Bargeld zurücknehmen, siehe [Rücktausch](#ruecktausch). |
| **Aktiv** | Nur aktive Markentypen erscheinen an der Kasse. |

Gut zu wissen:

- **Sind schon Marken im Umlauf**, bleiben **Nennwert**, **Art** und **Steuersatz** fest (beim Einzweckgutschein auch die Artikelauswahl). Name, Farbe, Aktiv und Rücktausch kannst du immer ändern. Brauchst du einen anderen Wert, lege einen neuen Markentyp an.
- **Löschen** geht nur, solange von dem Typ noch keine Marke verkauft oder angenommen wurde. Danach **deaktivierst** du ihn.
- Ein **organisationsweiter** Markentyp (ohne Veranstaltung) gilt auf jedem Fest, solange er aktiv ist. Wechselt ihr die Marken jede Saison, legt ihr dafür einen neuen Typ an (siehe [Tipps](#tipps)).

## Marken verkaufen {/* #verkaufen */}

An der Kasse öffnest du im Menü **Wertmarken verkaufen**, tippst je Markentyp die Anzahl ein und kassierst **bar**, mit **Karte** oder über **SumUp** – wie einen normalen Verkauf, mit Rückgeld.

- Der Beleg heißt **WERTMARKEN – Verkauf**. Jede Zeile trägt die Art der Marke, beim Mehrzweckgutschein „Wertmarken (Mehrzweck-Gutschein, nicht steuerbar)“, beim Einzweckgutschein den Satz mit enthaltener MwSt.
- Bargeld aus dem Markenverkauf zählt im [Kassenbuch](./kassenbuch.md) zum Soll-Bestand der Schublade. **Umsatz** ist es nicht: Die Marken tauchen im Umsatz erst auf, wenn sie eingelöst werden (beim Mehrzweckgutschein).
- Mit Cloud-TSE ist jeder Markenverkauf ein eigener, signierter Beleg.

## Mit Marken bezahlen {/* #bezahlen */}

Beim **Kassieren** gibt es den Bereich **Wertmarken**: Du tippst je Markentyp ein, wie viele Marken der Gast dir gibt. Die Kasse rechnet den Markenwert ab und zeigt, was noch offen ist; den **Rest** kassierst du wie gewohnt **bar** oder mit **Karte**.

- **Kein Wechselgeld in Marken.** Marken lassen sich nicht stückeln, und Rückgeld in Marken gibt es nicht.
- **Eingeschränkte Marken** – Einzweckgutscheine und Marken mit Kategorien/Artikeln – decken nur die Positionen, für die sie gelten, kein Pfand und kein Trinkgeld. Freie Mehrzweckmarken decken alles Offene, auch Pfand. Gibt der Gast mehr eingeschränkte Marken, als passende Artikel auf dem Bon stehen, weist die Kasse das ab: Nimm weniger Marken und kassiere den Rest anders.
- Mit Marken bezahlst du beim **Kassieren**, auch für mehrere offene Bestellungen auf einmal, nicht aber bei **Rechnung teilen** nach Positionen.
- Mit Cloud-TSE signiert die TSE die Zahlung wie jede andere. Ist alles mit Marken bezahlt, steht im Export die Zahlart „Keine“, weil kein Geld geflossen ist.

### Überzahlung: Rest als Trinkgeld {/* #ueberzahlung */}

Sind die Marken mehr wert als der offene Betrag – der Gast gibt zwei 2-€-Marken für 3,50 € –, gibt es kein Wechselgeld. Die Kasse fragt nach: Mit **Rest als Trinkgeld** buchst du den Überschuss als [Trinkgeld](./trinkgeld.md) – wie jedes andere Trinkgeld: bei ehrenamtlichen Helfern an den Verein (DSFinV-K `TrinkgeldAG`, anteilig mit den Steuersätzen der Waren). Ohne diese Bestätigung nimmt die Kasse die Zahlung nicht an; nimm dann weniger Marken und kassiere den Rest bar oder mit Karte.

### Was auf dem Beleg steht {/* #beleg */}

Der Kassenbon zeigt die Waren wie immer und darunter **Bezahlt mit Wertmarken:** je Typ, etwa „3 x 2,00 EUR 2-€-Marke“, dann den Rest in Geld. Die MwSt-Zeilen je Satz enthalten auch den mit Mehrzweckmarken bezahlten Anteil – die Steuer entsteht ja bei dieser Einlösung. Der mit **Einzweckmarken** bezahlte Anteil steht ohne MwSt, denn die wurde schon beim Kauf der Marken ausgewiesen.

### Storno und Erstattung {/* #storno */}

Stornierst oder erstattest du eine Bestellung, die mit Marken bezahlt wurde, gibt die Kasse den Markenanteil **in Marken** zurück, nie in Bargeld. Im Bericht stehen diese Marken als „zurückgegeben“ und wieder im Umlauf.

## Rücktausch gegen Bargeld {/* #ruecktausch */}

Ein Rücktausch ist eine bewusste Ausnahme, keine Wechselstube:

- Er geht nur für Markentypen mit **Rücktausch erlaubt** (Standard: aus).
- An der Kasse öffnest du im Menü **Wertmarken zurücktauschen**, tippst je Typ die Anzahl ein und gibst optional einen Grund an, etwa „Rücktausch am Ende des Festes“. Ausgezahlt wird immer **bar**; die Kassenlade öffnet sich.
- Höchstens so viele Marken, wie von dem Typ **im Umlauf** sind.
- Arbeitest du mit [Bedienungen](./bedienungen.md#rollen), braucht die Person das Recht **Stornieren & Erstatten** – Schichtleitungen haben es.
- Die Kasse druckt **immer** einen Beleg „WERTMARKEN – Rücktausch / Auszahlung“ mit Unterschriftszeile. Lass den Gast unterschreiben und bewahre den Beleg auf.
- Das ausgezahlte Geld mindert den Soll-Bestand der Schublade im [Kassenbuch](./kassenbuch.md). Mit Cloud-TSE ist der Rücktausch ein eigener, signierter Beleg.

:::warning[Kein Rücktausch „jederzeit und ohne Bedingungen“]
Kann der Gast seine Marken jederzeit voraussetzungslos zurückgeben, ist die Marke steuerlich eher eine Guthabenkarte als ein Gutschein. OpenEOS erlaubt deshalb nur den ausdrücklichen, protokollierten Rücktausch je Markentyp. Leg in deiner [Verfahrensdokumentation](./verfahrensdokumentation.md#wertmarken) fest, wann ihr zurücktauscht (z. B. nur am Ende des Festes, nur ganze Marken, nur am Infostand).
:::

## Abrechnung, Kassenbuch und Berichte {/* #berichte */}

### Kellnerabrechnung {/* #kellnerabrechnung */}

Nimmt eine [Bedienung](./bedienungen.md#abrechnung) Marken an, gibt sie die Marken am Schichtende ab wie Bargeld. Die Abrechnung hat dafür den Block **WERTMARKEN (abgeben)**: die angenommenen Marken je Typ mit Anzahl und Wert, darunter **Marken angenommen** und – falls die Person selbst Marken verkauft oder zurückgetauscht hat – **Marken verkauft** und **Rücktausch bar**.

- Die angenommenen Marken zählt ihr gegen die Abrechnung; im **Soll bar** stecken sie **nicht**.
- Bargeld aus Markenverkäufen erhöht das **Soll bar**, Bargeld aus einem Rücktausch mindert es.

### Kassenbuch {/* #kassenbuch */}

Im [Kassenbuch](./kassenbuch.md) zählt Bargeld aus Markenverkäufen zum Soll-Bestand der Schublade, ein Rücktausch mindert ihn. Die Marken selbst sind kein Bargeld und stehen nicht im Kassenbuch – zählt sie getrennt.

### Bericht Wertmarken {/* #bericht */}

Auf der Seite **Wertmarken** und in der [Auswertung](./auswertung.md) siehst du je Markentyp und Veranstaltung:

| Spalte | Bedeutung |
|---|---|
| **Verkauft** | an der Kasse verkaufte Marken (Anzahl und Wert) |
| **Eingelöst** | beim Kassieren als Zahlung angenommene Marken |
| **Zurückgegeben** | bei Storno oder Erstattung wieder an den Gast gegebene Marken |
| **Rücktausch** | gegen Bargeld zurückgenommene Marken |
| **Im Umlauf** | verkauft − eingelöst + zurückgegeben − Rücktausch |

Testbuchungen zählen nicht mit. Wählst du einen Zeitraum, zählen nur die Bewegungen darin; **Im Umlauf** ist dann die Veränderung im Zeitraum. Außerdem:

- Der Bericht **Zahlarten** hat eine Zeile **Wertmarken**.
- Die Karte [Umsatzsteuer](./auswertung.md#umsatzsteuer) hat eine Spalte **Einzweck-Marken** und eine Info-Zeile zu den Mehrzweckmarken.
- Verkaufte Marken sind kein Umsatz. Der Umsatz entsteht beim Einlösen (Mehrzweck) bzw. ist beim Markenverkauf im Satz der Marke enthalten (Einzweck).

### Testmodus {/* #testmodus */}

Im [Testmodus](./veranstaltungen.md#phasen) und solange eine Veranstaltung **Geplant** ist, bucht die Kasse Markenverkäufe, Einlösungen und Rücktausch als **Trainingsbuchungen**. Sie zählen in keinem Bericht und werden wie die Testbestellungen gelöscht, sobald echt verkauft wird. Übe den Ablauf also ruhig vorher.

## Umsatzsteuer: Mehrzweck- oder Einzweckgutschein {/* #umsatzsteuer */}

Wertmarken sind steuerlich **Gutscheine** (§ 3 Abs. 13–15 UStG). Ob die Umsatzsteuer beim Verkauf der Marke oder erst beim Einlösen entsteht, hängt davon ab, ob beim Verkauf schon feststeht, mit welchem Steuersatz die Ware später versteuert wird.

| | Mehrzweckgutschein (Standard) | Einzweckgutschein |
|---|---|---|
| Wann | Die Marke gilt für Waren mit unterschiedlichen Sätzen, typisch Speisen (7 %) und Getränke (19 %). | Alle Artikel, für die die Marke gilt, haben **genau einen** Steuersatz. |
| Verkauf der Marke | **nicht steuerbar**, kein Umsatz (DSFinV-K `MehrzweckgutscheinKauf`, USt-Schlüssel 5) | **steuerpflichtig** mit dem Satz der Marke (`EinzweckgutscheinKauf`) |
| Einlösen | Umsatz und Umsatzsteuer mit dem Satz der jeweiligen Ware (`Umsatz` je Satz, dazu `MehrzweckgutscheinEinloesung` negativ, Schlüssel 5) | keine Steuer mehr: `Umsatz` und `EinzweckgutscheinEinloesung` negativ zum selben Satz |
| Nie eingelöste Marken | keine Umsatzsteuer | Steuer wurde beim Verkauf schon gezahlt |
| Rücktausch | Tausch von Zahlungsmitteln, kein Umsatz (`MehrzweckgutscheinKauf` negativ) | Minderung von Entgelt und Steuer (§ 17 UStG) |

**Beispiel Mehrzweck:** Ein Gast kauft für 100 € Marken bar. Später holt er Getränke für 60 € (19 %) und Essen für 60 € (7 %), zahlt mit den 100 € Marken und 20 € bar.

| Vorgang | Prozessdaten in der TSE | Umsatzsteuer |
|---|---|---|
| Markenverkauf 100 € bar | `Beleg^0.00_0.00_0.00_0.00_100.00^100.00:Bar` | keine |
| Einlösung 100 € Marken + 20 € bar | `Beleg^60.00_60.00_0.00_0.00_-100.00^20.00:Bar` | 9,58 € (19 %) + 3,93 € (7 %) |

Die Ware steht beim Einlösen mit ihren Sätzen im Umsatz; die eingelösten Marken stehen negativ im nicht steuerbaren Bereich, und bezahlt wurden nur die 20 € bar.

**Beispiel Einzweck:** Eine „Getränkemarke“ gilt nur für Getränke mit 19 %. Der Verkauf von Marken für 30 € bar ist steuerpflichtig (`Beleg^30.00_0.00_0.00_0.00_0.00^30.00:Bar`, darin 4,79 € MwSt). Beim Einlösen entsteht keine Steuer mehr; der Beleg zeigt den Markenanteil ohne MwSt.

### Wann geht Einzweck? {/* #einzweck */}

OpenEOS lässt den Einzweckgutschein nur zu, wenn der Steuersatz beim Verkauf sicher feststeht:

- **Ohne Artikelauswahl** gilt die Marke für **alle Artikel mit ihrem Satz** – z. B. alle Artikel zu 19 %. Artikel mit anderem Satz kann sie nicht bezahlen.
- **Mit Artikelauswahl** (Kategorien oder Artikel einer Veranstaltung) müssen **alle** gewählten Artikel genau den Satz der Marke haben. Sonst lehnt OpenEOS das ab und schlägt den Mehrzweckgutschein vor.
- Pfand und Trinkgeld lassen sich mit Einzweckmarken nicht bezahlen.

Im Zweifel nimm den **Mehrzweckgutschein**: Er ist der Normalfall für Vereinsfeste und immer richtig, solange die Marke für Speisen und Getränke gilt.

### Kleinunternehmer {/* #kleinunternehmer */}

Ist deine Organisation **ohne Umsatzsteuer** (Kleinunternehmer nach § 19 UStG), bucht OpenEOS alle Marken als **Mehrzweckgutschein** – einheitlich, ohne MwSt. Die Ware steht beim Einlösen wie alle Umsätze mit USt-Schlüssel 6 im Export, die Gutscheinzeilen mit Schlüssel 5. Den Einzweckgutschein kannst du dann nicht wählen.

### Warum nur mit TSE? {/* #tse */}

Nach AEAO zu § 146a Nr. 1.2 hat eine Kassenfunktion, wer neben Bargeld auch Gutscheine, Wertmarken oder Guthaben „an Geldes statt“ annimmt. Ein System, das Marken als Zahlung annimmt, braucht in Deutschland also eine TSE – genau wie bei Bargeld. Deshalb gibt es Wertmarken in OpenEOS nur in **Alle Funktionen** und in Deutschland nur mit aktiver Cloud-TSE; in **Bargeldlos** und **Nur Bons** sind sie gesperrt. Wie du in „Nur Bons“ mit Marken außerhalb von OpenEOS arbeitest, steht unter [Betriebsarten](./betriebsarten.md#wertmarken).

## Tipps für die Praxis {/* #tipps */}

- **Marken kennzeichnen:** Name oder Wert, Name des Vereins und eine Farbe je Saison oder Fest. So kommen keine Marken vom Vorjahr oder vom Nachbarverein in die Kasse.
- **Ausgegebene Marken festhalten:** Notiere, wie viele Marken ihr vor dem Fest druckt oder kauft und wie viele an die Verkaufsstellen gehen (z. B. Rollen oder Nummernkreise). Am Ende muss gelten: Bestand vorher − Bestand nachher ≈ verkaufte Marken laut Bericht.
- **Rücklauf zählen:** Zählt die abgegebenen Marken je Typ und vergleicht sie mit **Eingelöst** im Bericht und mit dem Block **WERTMARKEN (abgeben)** der Kellnerabrechnungen.
- **Restmarken:** Lege fest, ob Marken nur für dieses Fest gelten oder auch beim nächsten. Der Wert **Im Umlauf** zeigt, wie viele noch draußen sind.
- **Einen Wert, viele Feste:** Gilt eine Marke dauerhaft, lege sie organisationsweit an. Wechselt ihr Farbe oder Wert jedes Jahr, lege einen neuen Typ an und deaktiviere den alten, sobald keine Marken mehr angenommen werden sollen.

## Häufige Fragen {/* #faq */}

**Ich arbeite in „Bargeldlos“ oder „Nur Bons“. Warum sehe ich keine Wertmarken an der Kasse?**
Weil Marken als Zahlung eine Kassenfunktion sind und eine TSE brauchen. Dafür brauchst du „Alle Funktionen“ mit aktiver Cloud-TSE (in Deutschland), siehe [Betriebsarten](./betriebsarten.md).

**Können Gäste Wechselgeld in Marken bekommen?**
Nein. Wer zu viel in Marken gibt, kann den Rest als Trinkgeld lassen – oder du nimmst weniger Marken und kassierst den Rest bar oder mit Karte.

**Ein Gast will seine übrigen Marken zurückgeben. Muss ich das?**
Das entscheidet dein Verein. Technisch geht es nur für Markentypen mit **Rücktausch erlaubt**, mit Beleg und Unterschrift, höchstens bis zum Bestand im Umlauf.

**Kann ich Marken mit Rabatt verkaufen, z. B. 11 Marken zum Preis von 10?**
Nein. Verkaufspreis und Einlösewert sind beim Markentyp derselbe Nennwert. Freie Marken, die der Verein verschenkt (Helferbons, Freigetränke), sind kein Zahlungsmittel, sondern [Rabatt-Bons](./rabatt-bons.md).

**Gelten Marken auch für Pfand?**
Freie Mehrzweckmarken ja. Marken mit Artikelauswahl und Einzweckmarken decken nur die Artikel, für die sie gelten.

**Was passiert mit Marken, die nie eingelöst werden?**
Beim Mehrzweckgutschein entsteht für sie keine Umsatzsteuer. Wie ihr sie in der Vereinsbuchhaltung behandelt, klärt mit eurer Steuerberatung. Der Bericht zeigt dir den Bestand **Im Umlauf**.

**Kann OpenEOS Markenbögen drucken?**
Noch nicht. Nutze eigene gedruckte Marken oder Plastikchips und kennzeichne sie wie unter [Tipps](#tipps) beschrieben.

**Gibt es Wertmarken auch in der API?**
Lesen und Anlegen ja: Markentypen mit `GET`/`POST`/`PATCH …/token-types` (Scopes `read` bzw. `catalog:write`), den Bericht mit `GET …/reports/tokens` und die Verkäufe und Rücktausche mit `GET …/token-transactions` (Scope `read`). Löschen, Verkaufen, Annehmen und Rücktausch gehen nur in der App. Siehe [API-Zugänge](./api-zugaenge.md#scopes).

## Siehe auch

- [Betriebsarten](./betriebsarten.md)
- [Cloud-TSE](./integrationen/cloud-tse.md)
- [An der Kasse verkaufen](./kasse.md#wertmarken)
- [Trinkgeld](./trinkgeld.md)
- [Bedienungen: Abrechnung](./bedienungen.md#abrechnung)
- [Verfahrensdokumentation – Vorlage](./verfahrensdokumentation.md#wertmarken)
