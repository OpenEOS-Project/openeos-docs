---
sidebar_position: 21
title: Bewirtungsbeleg
description: Bewirtungsbeleg an der Kasse ausstellen – was draufsteht, was der Gast ergänzt, welche Regeln gelten.
---

# Bewirtungsbeleg

Wer Geschäftspartner oder Kunden bewirtet, kann die Kosten zu 70 % als Betriebsausgabe absetzen – aber nur mit einem ordentlichen Beleg. OpenEOS stellt diesen **Bewirtungsbeleg** an der Kasse aus: eine Rechnung mit eigener Nummer, alle Angaben maschinell gedruckt, darunter Leerzeilen für das, was der Gast selbst ergänzt.

:::tip[Danke]
Die Idee kam von [till-mueller](https://github.com/till-mueller) ([openeos-web#9](https://github.com/OpenEOS-Project/openeos-web/issues/9)).
:::

## So geht's an der Kasse {/* #ablauf */}

1. Nach dem Bezahlen tippst du unter **Beleg** auf **Bewirtungsbeleg** (oder später im **Bestellverlauf** → **Beleg** → **Bewirtungsbeleg**). Bei einem Tisch mit mehreren Bestellungen umfasst der Beleg alle zusammen kassierten Bestellungen.
2. Die Kasse zeigt den Rechnungsbetrag und fragt:
   - **Name / Firma des Bewirtenden** – über 250 € Pflicht, darunter freiwillig,
   - **Anschrift** – freiwillig; über 250 € braucht der Gast sie für den Vorsteuerabzug,
   - **Tag der Bewirtung** – vorbelegt mit dem Tag der Bestellung, änderbar (Vortag bis heute).
3. **Bewirtungsbeleg ausstellen** vergibt die nächste Nummer, z. B. **B-2026-0001**.
4. Danach **Drucken**, **QR-Code** oder **E-Mail** – wie beim [Kassenbeleg](./kasse.md#beleg). Die erste Ausgabe ist das Original, jede weitere trägt **KOPIE**.

Ein Bewirtungsbeleg wird je Bestellung nur einmal ausgestellt und danach nicht mehr geändert. Hat sich der Gast vertippt, gibst du denselben Beleg erneut aus; ein zweiter Beleg für dieselbe Bestellung ist nicht möglich.

Bei Testbestellungen entsteht ein **Testbeleg** ohne Nummer mit dem Vermerk „TESTBELEG – KEIN BEWIRTUNGSBELEG“; er wird mit den Testbestellungen gelöscht.

## Was du vorher einrichtest {/* #voraussetzungen */}

Unter **Einstellungen → Organisation**:

- **Offizieller Name** deines Vereins (Steuerangaben) und die **Anschrift** – immer,
- **Steuernummer oder USt-IdNr.** – Pflicht für Belege über 250 €; ist sie eingetragen, steht sie auf jedem Beleg.

Fehlt etwas, zeigt die Kasse „Für den Bewirtungsbeleg fehlen Angaben zu deinem Verein“ mit einem Link auf die Einstellungen. Außerdem müssen deine Artikel **einzeln benannt** sein: Sammelbezeichnungen wie „Speisen und Getränke“, „Getränke“ oder „Verzehr“ lehnt die Kasse ab. „Menü 1“, „Tagesgericht 2“ oder „Lunch-Buffet“ sind in Ordnung.

## Was auf dem Beleg steht {/* #inhalt */}

| Angabe | Woher |
|---|---|
| Name und Anschrift des Vereins | Einstellungen (offizieller Name, Anschrift) |
| Steuernummer oder USt-IdNr. | Einstellungen; über 250 € Pflicht |
| Rechnungsnummer `B-JJJJ-NNNN` | fortlaufend je Organisation und Jahr, lückenlos |
| Rechnungsdatum | Tag der Ausstellung |
| Tag der Bewirtung | maschinell gedruckt (vorbelegt mit dem Tag der Bestellung) |
| Bestellnummer(n) | aus der Kasse |
| Leistungsempfänger (Bewirtende/r) | über 250 € Pflicht, darunter freiwillig |
| Positionen mit Menge, Bezeichnung und Betrag | aus der Bestellung, Pfand und Rabatt als eigene Zeilen |
| Netto, Umsatzsteuer und Brutto je Steuersatz | bei steuerbefreiten Vereinen stattdessen „Steuerfrei gem. § 19 UStG“, ohne Steuerbeträge |
| Trinkgeld | eigene Zeile, dazu „Gesamt inkl. Trinkgeld“ |
| Zahlart, ggf. Zahlungsreferenz | in der Betriebsart **Bargeldlos** mit dem Hinweis „Ausschließlich unbare Zahlung“ |
| TSE-Angaben | Kassen-ID, Seriennummer, Transaktionsnummer, Signaturzähler, Zeiten, Signatur, QR-Code; bei Ausfall der Vermerk |

Darunter folgt der Abschnitt **Angaben zum Nachweis von Bewirtungsaufwendungen** mit der Höhe der Aufwendungen (maschinell) und Leerzeilen für **Anlass der Bewirtung**, **Bewirtete Personen**, **Ort, Datum** und **Unterschrift des Bewirtenden**. Diese Angaben trägt der Gast von Hand ein – das ist ausdrücklich erlaubt. Alles andere ist maschinell erstellt und darf nicht von Hand ergänzt werden.

## Die Regeln dahinter {/* #regeln */}

- **Abzug:** Bewirtungsaufwendungen aus geschäftlichem Anlass sind zu 70 % abziehbar, wenn Höhe und betriebliche Veranlassung nachgewiesen sind. Bei einer Bewirtung in einer Gaststätte genügen Angaben zu Anlass und Teilnehmern; die Rechnung ist beizufügen (§ 4 Abs. 5 Satz 1 Nr. 2 EStG).
- **Rechnung:** Sie muss § 14 UStG entsprechen, maschinell erstellt und elektronisch aufgezeichnet sein. Bis 250 € brutto reicht eine Kleinbetragsrechnung (§ 33 UStDV): Name und Anschrift des Vereins, Ausstellungsdatum, Menge und Art der Leistung, Betrag mit Steuersatz. Über 250 € kommen Steuernummer bzw. USt-IdNr., fortlaufende Rechnungsnummer und der Leistungsempfänger dazu (§ 14 Abs. 4 UStG; BMF-Schreiben vom 19.11.2025, Rn. 3–12).
- **Einzeln benannt:** „Speisen und Getränke“ oder nur der Gesamtbetrag reichen nicht (R 4.10 Abs. 8 EStR; BMF Rn. 6).
- **Tag der Bewirtung:** muss maschinell auf dem Beleg stehen; handschriftliche Ergänzungen oder Datumsstempel reichen nicht (BMF Rn. 7).
- **Trinkgeld:** kann auf der maschinellen Rechnung zusätzlich ausgewiesen werden (BMF Rn. 8).
- **Kasse mit TSE:** Mit Kassenfunktion werden nur maschinell erstellte, elektronisch aufgezeichnete und mit TSE abgesicherte Rechnungen anerkannt; Transaktionsnummer und Seriennummer – auch als QR-Code – genügen dem Gast als Nachweis. Belege mit gekennzeichnetem TSE-Ausfall bleiben anerkannt (BMF Rn. 13–15).
- **Nur unbar:** Ist nur unbare Zahlung möglich (Betriebsart **Bargeldlos**), ist kein TSE-Beleg nötig; der Gast legt den Zahlungsbeleg bei (BMF Rn. 16).
- **Kleinunternehmer:** kein Steuerausweis, stattdessen der Hinweis auf die Steuerbefreiung nach § 19 UStG (§ 34a UStDV). Weist ein Kleinunternehmer Steuer aus, schuldet er sie (§ 14c UStG). Der Gast hat dann keinen Vorsteuerabzug.
- **Digital:** Rechnung und Eigenbeleg dürfen elektronisch sein; die eigenen Angaben müssen dann elektronisch genehmigt oder signiert und mit der Rechnung verbunden werden (BMF Rn. 18–22). Der Beleg aus OpenEOS ist als PDF dafür geeignet.

:::note[BMF-Schreiben]
Für Bewirtungen ab dem 1. Januar 2025 gilt das BMF-Schreiben vom 19.11.2025 (IV C 6 - S 2145/00026/005/033, BStBl I S. 1938). Es ersetzt das Schreiben vom 30.06.2021 (IV C 6 - S 2145/19/10003 :003), das für Bewirtungen bis Ende 2024 weiter gilt. Inhaltlich sind die Anforderungen an den Beleg gleich geblieben; neu ist vor allem, dass ein Kassenbeleg über 250 € später durch eine E-Rechnung berichtigt werden kann.
:::

## Was OpenEOS nicht übernimmt {/* #grenzen */}

- **E-Rechnung:** Für steuerpflichtige Vereine gilt bei Leistungen an Unternehmen über 250 € die Pflicht zur E-Rechnung ab 2027 (Vorjahresumsatz über 800.000 €) bzw. ab 2028. Bis dahin ist der Papier- bzw. PDF-Beleg zulässig. Kleinbetragsrechnungen und Kleinunternehmer sind ausgenommen. Eine E-Rechnung (XRechnung/ZUGFeRD) erzeugt OpenEOS derzeit nicht.
- **Eigenangaben digital:** Anlass, Teilnehmer und Unterschrift erfasst OpenEOS nicht; der Gast ergänzt sie auf dem Ausdruck oder in seinem eigenen System.
- **DSFinV-K:** Der Bewirtungsbeleg ist eine zusätzliche Rechnung zum bereits aufgezeichneten Kassenvorgang und kein eigener Geschäftsvorfall. In TSE und DSFinV-K ändert sich deshalb nichts.
- **Steuerberatung:** Die Seite fasst die Regeln zusammen, ersetzt aber keine Beratung. Ob ein Abzug im Einzelfall zulässig ist, prüft der Gast bzw. seine Steuerberatung.

## Aufbewahrung und Datenschutz {/* #aufbewahrung */}

Jeder Bewirtungsbeleg wird mit allen Angaben (auch dem Namen des Bewirtenden) **unveränderlich gespeichert** und mit dem Steuerarchiv **zehn Jahre** aufbewahrt (Rechnungen: acht Jahre nach § 14b UStG; OpenEOS hält einheitlich die zehn Jahre des Steuerarchivs ein). Bestellungen mit Bewirtungsbeleg lassen sich nicht löschen. Der Name des Bewirtenden ist eine personenbezogene Angabe, die dein Verein als Rechnungsangabe verarbeitet; OpenEOS verarbeitet sie in deinem Auftrag. Ein QR-Code- bzw. Mail-Link auf den Beleg gilt 90 Tage.

## Quellen {/* #quellen */}

- [§ 4 Abs. 5 Satz 1 Nr. 2 EStG](https://www.gesetze-im-internet.de/estg/__4.html)
- [R 4.10 Abs. 5–9 EStR (EStH 2025)](https://esth.bundesfinanzministerium.de/esth/2025/A-Einkommensteuergesetz/II-Einkommen-2-24b/3-Gewinn-4-7i/Paragraf-4/inhalt.html)
- [BMF-Schreiben vom 19.11.2025, Bewirtungskosten als Betriebsausgaben](https://www.bundesfinanzministerium.de/Content/DE/Downloads/BMF_Schreiben/Steuerarten/Einkommensteuer/2025-11-19-bewirtungskosten-als-betriebsausgaben.pdf) (ersetzt BMF-Schreiben vom 30.06.2021 für Bewirtungen ab 2025)
- [§ 14 UStG](https://www.gesetze-im-internet.de/ustg_1980/__14.html), [§ 14b UStG](https://www.gesetze-im-internet.de/ustg_1980/__14b.html), [§ 19 UStG](https://www.gesetze-im-internet.de/ustg_1980/__19.html), [§ 27 Abs. 38 UStG](https://www.gesetze-im-internet.de/ustg_1980/__27.html)
- [§ 33 UStDV](https://www.gesetze-im-internet.de/ustdv_1980/__33.html), [§ 34a UStDV](https://www.gesetze-im-internet.de/ustdv_1980/__34a.html)
- [§ 146a AO](https://www.gesetze-im-internet.de/ao_1977/__146a.html), [AEAO zu § 146a](https://ao.bundesfinanzministerium.de/ao/2026/Abgabenordnung/Vierter-Teil/Zweiter-Abschnitt/Erster-Unterabschnitt/Paragraf-146a/inhalt.html), [§ 6 KassenSichV](https://www.gesetze-im-internet.de/kassensichv/__6.html)
- [§ 147 AO](https://www.gesetze-im-internet.de/ao_1977/__147.html)
