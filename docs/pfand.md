---
sidebar_position: 8
title: Pfand
description: Pfand-Typen anlegen, Produkten zuweisen und Pfandregeln festlegen.
---

# Pfand

Mit dem **Pfand**-Modul erhebst du Pfand auf Becher, Flaschen oder Geschirr. Du definierst Pfand-Typen, weist sie Produkten zu und legst fest, bei welcher Verkaufsart Pfand berechnet wird. An der Kasse wird das Pfand dann automatisch aufgeschlagen; bei der Rückgabe zahlt die Kasse es wieder aus.

![Pfand](/img/screens/de/pfand.png)

## Pfand-Typ erstellen

Klicke auf **Pfand-Typ erstellen** und lege einen Pfand-Typ an: **Name** (z. B. „Mehrwegbecher“) und **Pfandbetrag (€)** (z. B. 2,00). Unter **Mehrwertsteuer** wählst du den Steuersatz der Getränke bzw. Waren, für die dieses Pfand gilt – meist 19 %. Nur **aktive** Pfand-Typen sind an der Kasse nutzbar. Anschließend weist du den Pfand-Typ im Dialog deiner Getränke- bzw. Geschirr-[Produkte](./produkte.md) zu.

![Pfand-Typ erstellen](/img/screens/de/pfand-dialog.png)

## Pfand und Umsatzsteuer {/* #umsatzsteuer */}

Pfand gehört steuerlich zum Entgelt (Abschn. 10.1 Abs. 8 UStAE): Es wird mit dem Steuersatz der Ware versteuert, für die es erhoben wird, und eine Pfandrückgabe mindert Umsatz und Umsatzsteuer wieder zum selben Satz (§ 17 UStG). OpenEOS rechnet deshalb so:

- Jeder Pfand-Typ hat **einen** Steuersatz (19 %, 7 % oder 0 %, voreingestellt 19 %). Gibst du Pfand für Waren mit unterschiedlichem Satz aus, lege dafür getrennte Pfand-Typen an. Üblich sind:

  | Pfand-Typ | Satz | Warum |
  |---|---|---|
  | **Getränkebecher** | 19 % | Getränke tragen in der Gastronomie fast immer 19 %. |
  | **Geschirr Speisen** (Teller, Besteck) | 7 % | Speisen bei Restaurant- und Verpflegungsdienstleistungen tragen 7 %. |

- Wird derselbe Becher für Getränke mit 7 % und 19 % genutzt, sind 19 % bei Ausgabe und Rückgabe eine vertretbare Vereinfachung; sie führt allenfalls zu etwas mehr Steuer.
- Auf dem Kassenbon steht das Pfand als eigene Zeile und ist in der ausgewiesenen MwSt seines Satzes enthalten. Ein Rabatt mindert nur die Ware, nie das Pfand.
- Die Pfandrückgabe bucht das Pfand negativ zum Satz des Pfand-Typs – auf dem Beleg, in der TSE und im DSFinV-K-Export.
- Eine Änderung des Steuersatzes gilt nur für neue Verkäufe und Rückgaben. Bereits gebuchte Bestellungen, Erstattungen und Auszahlungen bleiben, wie sie waren.
- Halte in deiner [Verfahrensdokumentation](./verfahrensdokumentation.md#pfand) fest, welcher Satz für welchen Pfand-Typ gilt und warum.

Das **Saldierungsverfahren** (nur der Jahressaldo aus ausgegebenem und zurückgenommenem Pfand wird versteuert) gibt es nur auf Antrag beim Finanzamt (Abschn. 10.1 Abs. 8 Satz 5 UStAE). OpenEOS bildet es nicht ab; es bucht Pfand bei jeder Ausgabe und Rückgabe.

### Becher von vor der Umstellung: der Altsaldo {/* #altsaldo */}

Bis November 2026 hat OpenEOS Pfand ohne Umsatzsteuer gebucht. Bringt ein Gast einen Becher zurück, der damals verkauft wurde, darf die Rückgabe keine Umsatzsteuer mindern – auf das Pfand wurde ja keine gezahlt.

Deshalb führt OpenEOS je Organisation einen **Altsaldo**: Pfand, das vor der Umstellung ohne Steuersatz verkauft und bezahlt und noch nicht zurückgegeben wurde (ohne Testbuchungen, stornierte und erstattete Bestellungen). Jede neue Pfandrückgabe wird **zuerst gegen den Altsaldo** gebucht:

- Dieser Teil steht auf dem Beleg als „Pfandrückgabe … (Altsaldo vor USt-Umstellung)“, ohne MwSt-Zeile, in der TSE und im DSFinV-K-Export als nicht steuerbar (USt-Schlüssel 5) und im Bericht **Umsatzsteuer** bei 0 %.
- Erst wenn der Altsaldo aufgebraucht ist, mindert eine Rückgabe Umsatz und Umsatzsteuer zum Satz des Pfand-Typs.
- Den offenen Altsaldo zeigt OpenEOS bei den Pfand-Einstellungen.

:::tip[Altsaldo mit der Steuerberatung klären]
Statt den Altsaldo nach und nach abzubauen, kann man ihn auch einmalig zum Umstellungszeitpunkt nachversteuern; danach mindert jede Rückgabe die Steuer zum vollen Satz. Das bildet OpenEOS nicht ab – stimm es mit deiner Steuerberatung ab. Pfand ohne Umsatzsteuer ohne genehmigtes Saldierungsverfahren war für umsatzsteuerpflichtige Vereine nicht richtig; für frühere Zeiträume kann eine Berichtigung nach § 153 AO nötig sein.
:::

### Kleinunternehmer {/* #kleinunternehmer */}

Ist deine Organisation **ohne Umsatzsteuer** (Kleinunternehmer nach § 19 UStG, Einstellung in der [Organisation](./einstellungen.md#allgemein)), weist OpenEOS weiterhin keine MwSt aus, und der Steuersatz des Pfand-Typs wirkt nicht. Pfand steht dann wie alle Umsätze als steuerfrei (USt-Schlüssel 6) im Export; es zählt zum Gesamtumsatz nach § 19 UStG, Rückgaben mindern ihn. Der Altsaldo spielt für Kleinunternehmer keine Rolle und wird nicht verbraucht.

:::note
Das ist keine Steuerberatung. Prüfe die Sätze für deinen Verein selbst bzw. mit deiner Steuerberatung.
:::

## Wann wird Pfand berechnet?

Über **Einstellungen** in der Liste der Pfand-Typen legst du fest, für welche Verkaufsart Pfand erhoben wird:

- **Pfand bei Tischbedienung** – Gäste, die am Tisch bedient werden, zahlen Pfand.
- **Pfand bei Theke / Abholung** – bei Verkauf an der Theke bzw. zum Mitnehmen wird Pfand erhoben.

So kannst du z. B. nur beim Verkauf zum Mitnehmen Pfand verlangen, beim Tischservice aber nicht.

![Wann wird Pfand berechnet?](/img/screens/de/pfand-settings.png)

## Pfand im Betrieb

- **Ausgabe:** Beim Verkauf eines pfandpflichtigen Produkts wird der Pfandbetrag automatisch zur Bestellung hinzugefügt.
- **Rückgabe:** Bringt ein Gast Becher oder Flaschen zurück, buchst du das an der Kasse über **Pfand-Rückgabe** im Menü oder den Knopf oben im Warenkorb – als **Auszahlen** oder zum **Verrechnen** mit dem aktuellen Warenkorb. Wie das geht, steht unter [Kasse](./kasse.md#pfand). In der Betriebsart [Bargeldlos](./betriebsarten.md#bargeldlos) gibt es keine Barauszahlung, nur das Verrechnen; in [Nur Bons](./betriebsarten.md#nur-bons) gibt es kein Pfand.
- **Beleg zur Rückgabe:** Für jede Auszahlung gibt es einen Beleg „Pfandrückgabe“ mit Belegnummer, den Pfand-Typen als negative Beträge, der enthaltenen MwSt je Satz, Zahlart Bar, Kasse, Datum und – mit Cloud-TSE – den TSE-Angaben. Gedruckt wird er wie der Kassenbon: automatisch, wenn deine Kassenbons nach der Zahlung gedruckt werden, sonst auf Wunsch über **Bon drucken** in der Meldung **Pfand ausgezahlt**.
- **Auswertung:** In der [Auswertung](./auswertung.md) siehst du den Pfand-Saldo – also kassiertes und ausgezahltes Pfand – und in der Karte [Umsatzsteuer](./auswertung.md#umsatzsteuer) Ware, Pfand und Pfandrückgaben je Steuersatz.

![Pfand-Rückgabe an der Kasse](/img/screens/de/pos-pfand-return.png)

:::info
Der Pfand-Saldo hilft dir, am Ende der Veranstaltung kassiertes und zurückgezahltes Pfand abzugleichen.
:::
