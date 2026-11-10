---
title: Verfahrensdokumentation – Vorlage
description: Vorlage für die Verfahrensdokumentation deiner Kasse mit OpenEOS – zum Kopieren und Ausfüllen, mit Betriebsart, Pfand, Trinkgeld, Kellnerabrechnung, Ausfallregel, Belegausgabe und Aufbewahrung.
---

# Verfahrensdokumentation – Vorlage

Wer eine elektronische Kasse führt, muss beschreiben können, wie sie aufgebaut ist und wie damit gearbeitet wird – die **Verfahrensdokumentation** (VD). Bei einer [Kassen-Nachschau](./kassen-nachschau.md) oder Prüfung fragt das Finanzamt danach. Die Vorlage unten deckt ab, was beim Einsatz von OpenEOS dazugehört. Die technischen Angaben findest du in OpenEOS, die Regeln deines Vereins legst du selbst fest.

:::note[Keine Steuerberatung]
Die Vorlage beruht auf einer steuerlichen Einschätzung vom November 2026 zu OpenEOS. Sie ersetzt keine individuelle Steuer- oder Rechtsberatung. Stimm deine Verfahrensdokumentation mit deiner Steuerberatung ab, vor allem die Abschnitte zur Betriebsart ohne TSE, zu Online-Bestellungen und zum Pfand-Übergang. Das ist keine Steuerberatung.
:::

## So nutzt du die Vorlage {/* #nutzen */}

1. Kopiere den Text ab **[Vereinsname] – Verfahrensdokumentation der Kasse** in dein Textprogramm. Als Markdown findest du ihn im [Quelltext dieser Seite auf GitHub](https://github.com/OpenEOS-Project/openeos-docs/blob/main/docs/verfahrensdokumentation.md).
2. Ersetze alle Platzhalter in eckigen Klammern, etwa `[Vereinsname]`, und streiche Abschnitte, die für euch nicht gelten (z. B. Bargeld, wenn ihr in „Bargeldlos“ arbeitet).
3. Lege die Anlagen dazu: [Herstellerbescheinigung](./betriebsarten.md#bescheinigung), Verlauf der Betriebsarten, Ausfallprotokoll der [Cloud-TSE](./integrationen/cloud-tse.md), eure Kassenanweisung.
4. Ändert sich etwas – Betriebsart, Pfandsätze, Steuerstatus, OpenEOS-Version mit neuen Abläufen –, passe die VD an und trage die Änderung in die Änderungshistorie ein. Bewahre jede Fassung zehn Jahre auf.

Die Hinweise in den Abschnitten (in *kursiv*) sind für dich beim Ausfüllen und können danach raus.

---

## [Vereinsname] – Verfahrensdokumentation der Kasse {/* #vorlage */}

Stand: [Datum] · Fassung: [Nummer] · Verantwortlich: [Name, Funktion im Verein]

### 1. Zweck und Geltungsbereich {/* #zweck */}

Diese Verfahrensdokumentation beschreibt, wie [Vereinsname], [Anschrift], Steuernummer [Steuernummer] bzw. USt-IdNr. [USt-IdNr.], seine Umsätze bei [Veranstaltungen, z. B. Sommerfest, Weihnachtsmarkt] mit dem Kassen- und Bestellsystem OpenEOS aufzeichnet. Sie gilt für alle Geräte, die für den Verein in OpenEOS angemeldet sind, und für alle Personen, die daran bestellen, kassieren oder abrechnen.

Sie dient dem Nachweis der ordnungsmäßigen Kassenführung (§§ 145–147 AO, § 146a AO, KassenSichV, GoBD) und wird zusammen mit den Kassendaten zehn Jahre aufbewahrt.

### 2. Eingesetztes System {/* #system */}

| Angabe | Wert |
|---|---|
| Software | OpenEOS (Kassen- und Bestellsystem, Web-App), Anbieter [Anbieter laut Vertrag] |
| Version | [Version] |
| Organisation in OpenEOS | [Name der Organisation] |
| Kassen-ID (Seriennummer der Kasse, DSFinV-K `KASSE_SERIENNR`) | `OEOS-[…]` – gleich der Client-ID der TSE; steht auf der Seite Cloud-TSE und auf jedem Bon |
| TSE | Swissbit Cloud-TSE 2, Seriennummer [TSE-Seriennummer], in Betrieb seit [Datum] |
| Betriebsstätte | [Vereinssitz bzw. festes Festgelände] |
| Mitteilung an das Finanzamt (§ 146a Abs. 4 AO) | übermittelt am [Datum] über [Mein ELSTER / Bevollmächtigte] |
| Geräte (Terminals) | siehe Tabelle |

| Gerät in OpenEOS | Art (Tablet, Handy, PC) | Eigentum (Verein, privat) | Einsatz (Feste Kasse, Bedienung, Küche, Anzeige) |
|---|---|---|---|
| [Kasse 1] | [Tablet] | [Verein] | [Feste Kasse Theke] |
| [Kasse 2] | [Handy] | [privat] | [Bedienung Zelt A] |

Alle Geräte sind Eingabegeräte **einer** Kasse mit **einer** TSE (AEAO zu § 146a Nr. 1.6). Die Kassen-ID hängt nicht am Gerät; wechselnde Helfer-Handys ändern sie nicht. Reine Bestell- und Küchengeräte ohne Zahlung sind keine eigenen Kassen.

*Hinweis: Als Anschaffungsdatum für die Mitteilung gilt bei einer gemieteten Software-Kasse der Beginn der Zurverfügungstellung (Freischaltung), als Hersteller und Modell die Angaben des OpenEOS-Anbieters, nicht des Tablets (AEAO zu § 146a Nr. 1.16.2.6). Kläre die Mitteilung im Einzelfall mit deiner Steuerberatung.*

### 3. Verantwortlichkeiten {/* #verantwortung */}

| Aufgabe | Person / Funktion |
|---|---|
| Admin der Organisation in OpenEOS (Betriebsart, Steuerangaben, Geräte) | [Name] |
| Kassenführung am Festtag, Schichtleitung | [Namen] |
| Kassenbuch des Vereins, Abgleich mit der Festkasse | [Schatzmeister/in] |
| Exporte und Archivierung | [Name] |

### 4. Betriebsart {/* #betriebsart */}

Der Verein arbeitet in der Betriebsart: ☐ **Nur Bons** · ☐ **Bargeldlos** · ☐ **Alle Funktionen** (mit Cloud-TSE). Seit: [Datum]. Der Verlauf der Betriebsarten aus OpenEOS liegt als Anlage bei.

*Streiche die Absätze, die nicht zutreffen.*

**Nur Bons.** OpenEOS nimmt Bestellungen auf und druckt Küchen- und Bestellbons, ohne Preise und ohne Zahlungen. Kassiert wird außerhalb von OpenEOS: [offene Ladenkasse / Wertmarken, siehe Abschnitt 13]. Ablauf: Bestellung am Gerät → Küchenbon → Kassieren außerhalb. Die Herstellerbescheinigung („Bargeld kann nicht erfasst werden“) liegt bei. Die Bestelldaten werden exportiert und zehn Jahre aufbewahrt (AEAO zu § 146a Nr. 2.1.1). Kontrolle: Die Bestellmengen werden mit dem Kassenbericht der offenen Ladenkasse und dem Wertmarkenrücklauf abgeglichen durch [Name].

**Bargeldlos.** OpenEOS nimmt nur bargeldlose Zahlungen an; eine TSE wird nicht eingesetzt. Grundlage: Das System kann keine baren Zahlungsvorgänge vor Ort erfassen (BMF-FAQ; AEAO zu § 146a Nr. 1.2). Die Herstellerbescheinigung liegt bei. Es gilt:

- **Positivliste der Zahlarten:** Karte über [SumUp-Kartenleser / externes Terminal], Online-Zahlung über [SumUp Online / PayPal / Google Pay / Apple Pay]. Andere Zahlarten weist OpenEOS serverseitig ab.
- **Technische Sperre:** Bargeld lässt sich in der Organisation nicht einschalten; „Alle Funktionen“ ist in Deutschland nur mit aktiver Cloud-TSE möglich. Die Betriebsart ändern dürfen nur Admins der Organisation ([Namen]); jeder Wechsel wird mit Zeit und Person protokolliert.
- **Keine Wertmarken, Gutscheine, Guthabenkarten oder Kundenkonten** als Zahlung, weder in OpenEOS noch am selben Stand außerhalb von OpenEOS.
- **Trennung von anderen Kassen:** Die OpenEOS-Kasse hat eine eigene Kassen-ID. Bons und Bestellungen werden nicht an Kassen mit Bargeld übergeben, dort nicht nachbezahlt und nicht erstattet, und umgekehrt. Weitere Kassen beim Fest: [keine / Beschreibung].
- **Abgleich mit den Abrechnungen** des Zahlungsdienstleisters: [wöchentlich / nach jeder Veranstaltung] durch [Name], anhand des Bestellexports mit Zahlungs- und Erstattungsreferenz.
- **Erstattungen** nur auf das ursprüngliche Zahlungsmittel, keine Barerstattung.

**Alle Funktionen (mit Cloud-TSE).** OpenEOS nimmt Bargeld, Karte und Online-Zahlungen an. Jeder Vorgang wird mit der Cloud-TSE abgesichert, auch Online-Zahlungen, Bestellungen vor dem Küchenbon, Kassenbuch, Kellnerabrechnungen und Trainingsbuchungen. Bargeld ist ohne aktive TSE technisch gesperrt.

### 5. Pfand {/* #pfand */}

Pfand ist Teil des Entgelts und trägt den Steuersatz der Ware, für die es erhoben wird; die Rückgabe mindert Entgelt und Steuer zum selben Satz (Abschn. 10.1 Abs. 8 UStAE, § 17 UStG). In OpenEOS hat jede Pfandart einen festen Satz.

| Pfandart | Betrag | Steuersatz | Begründung |
|---|---|---|---|
| Getränkebecher | [2,00 €] | 19 % | Getränke tragen 19 %. |
| Geschirr Speisen | [5,00 €] | 7 % | Speisen bei Verpflegungsdienstleistungen tragen 7 %. |
| [weitere] | [ ] | [ ] | [ ] |

Becher, die für Getränke mit unterschiedlichem Satz genutzt werden: [einheitlich 19 % bei Ausgabe und Rücknahme].

**Übergang:** Pfand, das vor der Umstellung im November 2026 ohne Umsatzsteuer verkauft wurde (Altsaldo), mindert bei der Rückgabe keine Steuer. OpenEOS bucht Rückgaben zuerst gegen den Altsaldo (nicht steuerbar, DSFinV-K-Schlüssel 5), erst danach zum Satz der Pfandart. Offener Altsaldo zum [Datum]: [Betrag]. ☐ Der Altsaldo wird nach und nach abgebaut. ☐ Der Altsaldo wurde in Abstimmung mit der Steuerberatung zum [Datum] einmalig nachversteuert.

Ein Saldierungsverfahren (Abschn. 10.1 Abs. 8 Satz 5 UStAE) wird ☐ nicht angewendet · ☐ angewendet, genehmigt am [Datum].

### 6. Trinkgeld {/* #trinkgeld */}

- **Trinkgeld an den Verein** (alle ehrenamtlichen Helferinnen und Helfer): Es ist Entgelt (Abschn. 10.1 Abs. 5 UStAE) und wird als `TrinkgeldAG` mit dem Satz der Hauptleistung gebucht, bei gemischten Bons anteilig im Verhältnis der Nettoentgelte zu 19 % und 7 %. OpenEOS rechnet das automatisch.
- **Trinkgeld an Angestellte** (`TrinkgeldAN`, § 3 Nr. 51 EStG): nur für Bedienungen mit dem Kennzeichen „Arbeitnehmer (Lohnkonto)“. Angestellte im Verein: [keine / Namen bzw. Funktionen]. Ehrenamtliche sind keine Arbeitnehmer.
- **Trinkgeld ohne Bon** (z. B. Trinkgeldglas): wird gezählt von [Name] am [Ende jedes Festtags], in das Kassenbuch des Vereins übernommen und versteuert ☐ pauschal mit 19 % · ☐ im Verhältnis der Tagesumsätze zu 19 % und 7 %.
- **Auszahlung von Kartentrinkgeld:** nur an Angestellte, über OpenEOS mit eigenem TSE-gesichertem Beleg und unterschriebener Quittung. Bei Ehrenamtlichen bleibt das Kartentrinkgeld beim Verein und wird nicht ausgezahlt.

### 7. Kellnerabrechnung {/* #kellnerabrechnung */}

☐ Wir arbeiten ohne Bedienungsprofile (Abschnitt entfällt). ☐ Wir arbeiten mit [Bedienungen](./bedienungen.md):

- Jede Buchung ist der angemeldeten Bedienung zugeordnet (PIN an gemeinsamen Kassen bzw. feste Bedienung je Gerät).
- **Ablauf:** Am Schichtende rechnet [eine Schichtleitung / ein Admin] jede Bedienung in OpenEOS ab. Das Bargeld bleibt in der Schublade der Kasse; [beschreibe, wer wann zählt]. Offene Tische werden vorher übergeben oder mit Pflichtnotiz abgerechnet.
- **Absicherung:** Mit Cloud-TSE ist jede Abrechnung ein TSE-gesicherter Vorgang mit Soll, gezähltem Ist und Differenz; die Abrechnung ist unveränderlich, ein Nachdruck trägt „Kopie“.
- **Differenzen:** [z. B. Differenzen bis [Betrag] werden als Kassendifferenz beim Kassensturz gebucht; größere Differenzen klärt [Name] mit der Bedienung und vermerkt das Ergebnis in [Ort].]
- **Live-Kassensturz:** Bei einer Kassen-Nachschau zeigt der Live-Kassensturz in OpenEOS für jede Bedienung das Soll bar seit der letzten Abrechnung.
- Kellnerabrechnungen werden ausschließlich elektronisch erzeugt und aufbewahrt.

### 8. Ausfallregel {/* #ausfall */}

- Der Beleg wird erst ausgegeben (gedruckt oder digital), wenn die TSE den Vorgang abgeschlossen und signiert hat (AEAO zu § 146a Nr. 2.2.3.3, 2.5.2, 2.5.7).
- Antwortet die TSE nicht innerhalb weniger Sekunden, gibt OpenEOS einen **Ausfallbeleg** mit dem Vermerk „TSE nicht erreichbar – Beleg ohne Signatur“ aus. Es wird weiter kassiert; die Belegpflicht bleibt (AEAO zu § 146a Nr. 1.14.2, 1.14.3).
- Es wird **nicht nachsigniert**. Geht eine Signatur nach der Belegausgabe noch ein, bleibt der Beleg ein Ausfallbeleg; OpenEOS speichert die Signatur mit dem Vermerk „Signatur nach Belegausgabe“.
- OpenEOS führt ein **Ausfallprotokoll** (Beginn, Ende, Grund) und benachrichtigt die Admins (AEAO zu § 146a Nr. 1.14.1). Die Ursache beheben wir unverzüglich (Nr. 1.14.4): [z. B. Prüfung des Internetzugangs, Ersatz-Router, Rückmeldung an den Support].
- **Ausfallstatistik** (aus dem Ausfallprotokoll, jährlich fortschreiben):

| Jahr | Anzahl Ausfälle | Dauer gesamt | Häufigster Grund |
|---|---|---|---|
| [2026] | [ ] | [ ] | [ ] |

- Fällt die Internetverbindung ganz aus, nimmt OpenEOS keine Zahlungen an; es wird [nicht kassiert / mit offener Ladenkasse nach Kassenanweisung weiterkassiert].

### 9. Wechselgeld und Geldtransit {/* #wechselgeld */}

*Nur mit Bargeld.*

- **Anfangsbestand** ist nur das Bargeld, das bei der Eröffnung schon in der Kasse liegt (Restbestand aus dem letzten Kassensturz).
- **Wechselgeld aus der Vereinskasse** wird als Geldtransit „Wechselgeld aus Vereinskasse“ gebucht, das Abschöpfen an die Vereinskasse als Geldtransit „Abschöpfung an Vereinskasse“. Eine Privateinlage gibt es beim Verein nicht.
- **Gegenbeleg** ist das Kassenbuch des Schatzmeisters: Jede Ausgabe von Wechselgeld und jede Rückgabe steht dort mit demselben Betrag und Datum.
- Ablauf am Festtag: [Wechselgeld je Kasse, wer es ausgibt, wann abgeschöpft wird, wer am Ende zählt, wo das Geld verwahrt wird].

### 10. Belegausgabe {/* #belegausgabe */}

- Nach jeder Zahlung bietet die Kasse den Beleg an: ☐ als **QR-Code** zum Abruf als PDF/PNG · ☐ **gedruckt** · ☐ per **E-Mail**. Der QR-Code erscheint immer (AEAO zu § 146a Nr. 2.5.3, 2.5.6).
- „**Kein Beleg**“ wählt das Personal nur, nachdem der Beleg erstellt und angeboten wurde – gedruckt oder als QR-Code angezeigt (Nr. 2.5.8). Die bloße Anzeige ohne Möglichkeit zur Entgegennahme reicht nicht (Nr. 2.5.4).
- E-Mail-Adressen werden nur für den Versand verwendet.
- Nachdrucke tragen „NACHDRUCK“ und dieselben TSE-Angaben.

### 11. Bestellungen und Küchenbons {/* #bestellungen */}

Mit Cloud-TSE wird jede Bestellung ohne sofortige Zahlung vor dem Küchenbon als Bestellung abgesichert; bei Sofortzahlung wird die Zahlung vor dem Küchenbon signiert. Es gibt keine Küchenbons ohne TSE-Spur. Der Kassenbon trägt den Bestellbeginn (DSFinV-K Tz. 2.7.3; AEAO zu § 146a Nr. 2.2.2).

### 12. Online-Bestellungen {/* #online */}

☐ Wir nutzen keinen Online-Shop und keine QR-Bestellung. ☐ Wir nutzen [Online-Shop / QR-Bestellung am Tisch]:

- **Mit Cloud-TSE:** Jede Online-Zahlung wird beim Zahlungseingang mit der TSE signiert und steht im DSFinV-K-Export (Zahlart Zahlungsdienstleister). Erstattungen laufen als Erstattungsbeleg mit Verweis zurück an den Zahlungsdienstleister.
- **Ohne TSE (Bargeldlos):** Online-Bestellungen werden nicht bar nachbezahlt oder bar erstattet; sie sind von jeder Kasse mit Bargeld getrennt.
- Die Bestelldaten werden über den Bestellexport (mit Zahlungsreferenz) zehn Jahre aufbewahrt.

### 13. Gutscheine und Wertmarken {/* #wertmarken */}

- **Kostenlose Bons** des Vereins (z. B. Helferbons, Freigetränke) werden in OpenEOS als Rabatt-Bon gebucht; sie sind ein Rabatt, keine Zahlart. Ausgegeben von [Name/Funktion] an [Personenkreis].
- **Verkaufte Wertmarken oder Gutscheine:** ☐ Wir verkaufen keine. ☐ Wir verkaufen Wertmarken außerhalb von OpenEOS: Ausgabe durch [Stelle], Einlösung an [Ständen], Rücktausch [ja/nein, wie], Restmarken [Umgang]. In den Betriebsarten ohne TSE („Bargeldlos“, „Nur Bons“) werden Wertmarken an OpenEOS-Geräten nicht als Zahlung angenommen (AEAO zu § 146a Nr. 1.2); sie werden außerhalb von OpenEOS über die Rücklaufzählung abgerechnet. Marken, die für Speisen und Getränke gelten, sind in der Regel Mehrzweckgutscheine (§ 3 Abs. 15 UStG).

### 14. Umsatzsteuerstatus {/* #kleinunternehmer */}

☐ **Kleinunternehmer** nach § 19 UStG (Vorjahresumsatz höchstens 25.000 €, laufendes Jahr höchstens 100.000 €):

- Alle Umsätze stehen im DSFinV-K-Export mit USt-Schlüssel 6 („steuerfrei – Kleinunternehmer § 19 UStG“, DSFinV-K Tz. 3.2.6).
- Belege tragen den Hinweis „Steuerfrei nach § 19 Abs. 1 UStG (Kleinunternehmer)“ und keinen Steuerbetrag (§ 34a UStDV, § 14c UStG).
- Die Umsatzgrenzen überwacht [Name]; OpenEOS warnt im Dashboard ab 80 % der 100.000-€-Grenze (nur Umsätze in OpenEOS).
- Wird der Verein umsatzsteuerpflichtig, wird in OpenEOS über „Steuerstatus ändern“ gewechselt: erst Kassenabschluss, dann Stammdatenwechsel. Wechsel am: [Datum].

☐ **Umsatzsteuerpflichtig**: Umsätze mit 19 % (Schlüssel 1) und 7 % (Schlüssel 2).

### 15. Aufbewahrung {/* #aufbewahrung */}

Einheitlich **zehn Jahre** (§ 147 Abs. 1 Nr. 1, Abs. 3 AO):

- DSFinV-K-Exporte und Kassenabschlüsse,
- TSE-Exporte (TAR), auch die Abschlussexporte stillgelegter TSEs (AEAO zu § 146a Nr. 1.15.2),
- Trainingsbuchungen und Daten zu TSE-Ausfällen,
- Kellnerabrechnungen, Kassenbuch und Bestelldaten,
- diese Verfahrensdokumentation in allen Fassungen mit Anlagen.

OpenEOS bewahrt die Kassendaten zehn Jahre auf. Digitale Belege, die ein Gast nie abgerufen hat, werden nicht als Bild aufbewahrt; sie lassen sich aus den gespeicherten Daten inhaltsgleich neu erzeugen. Gelöscht wird erst nach Ablauf der Frist; eine Ablaufhemmung nach § 147 Abs. 3 AO beachten wir.

### 16. Datensicherung und Export {/* #export */}

- OpenEOS speichert die Daten beim Anbieter und holt die TSE-Daten jede Nacht ab.
- Zusätzlich lädt [Name] nach jeder Veranstaltung herunter und legt ab unter [Ablageort, z. B. Vereinslaufwerk, verschlüsselter USB-Stick]: DSFinV-K-Export, TSE-Export (TAR), Bestellexport, [Herstellerbescheinigung].
- Die Prüfsummen (SHA-256) der Exporte werden mit abgelegt.
- Bei einer Kassen-Nachschau (§ 146b AO) übergeben wir DSFinV-K- und TSE-Export für den gewünschten Zeitraum.

### 17. Änderungshistorie {/* #historie */}

| Fassung | Datum | Änderung | Wer |
|---|---|---|---|
| 1 | [Datum] | Erstfassung | [Name] |
| [2] | [Datum] | [z. B. Wechsel der Betriebsart, neue Pfandart, Wechsel des Steuerstatus, neue TSE] | [Name] |

---

## Siehe auch

- [Betriebsarten](./betriebsarten.md)
- [Cloud-TSE](./integrationen/cloud-tse.md)
- [Kassen-Nachschau und DSFinV-K](./kassen-nachschau.md)
- [Kassenbuch](./kassenbuch.md), [Pfand](./pfand.md), [Trinkgeld](./trinkgeld.md), [Bedienungen](./bedienungen.md)
