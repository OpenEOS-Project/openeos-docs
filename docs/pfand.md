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

Pfand gehört steuerlich zum Entgelt: Es wird mit dem Steuersatz der Ware versteuert, für die es erhoben wird, und eine Pfandrückgabe mindert Umsatz und Umsatzsteuer wieder zum selben Satz. OpenEOS rechnet deshalb so:

- Jeder Pfand-Typ hat **einen** Steuersatz (19 %, 7 % oder 0 %, voreingestellt 19 %). Gibst du Pfand für Waren mit unterschiedlichem Satz aus – etwa Becher für Getränke (19 %) und Teller für Speisen (7 %) –, lege dafür getrennte Pfand-Typen an.
- Auf dem Kassenbon steht das Pfand als eigene Zeile und ist in der ausgewiesenen MwSt seines Satzes enthalten. Ein Rabatt mindert nur die Ware, nie das Pfand.
- Die Pfandrückgabe bucht das Pfand negativ zum Satz des Pfand-Typs – auf dem Beleg, in der TSE und im DSFinV-K-Export.
- **Ohne Umsatzsteuer** (z. B. Kleinunternehmer, Einstellung in der [Organisation](./organisation.md)) weist OpenEOS weiterhin keine MwSt aus; der Steuersatz des Pfand-Typs wirkt dann nicht.
- Eine Änderung des Steuersatzes gilt nur für neue Verkäufe und Rückgaben. Bereits gebuchte Bestellungen, Erstattungen und Auszahlungen bleiben, wie sie waren. Pfand, das vor November 2026 verkauft wurde, war noch ohne Umsatzsteuer gebucht und steht in Berichten weiter bei 0 %.

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

:::info
Der Pfand-Saldo hilft dir, am Ende der Veranstaltung kassiertes und zurückgezahltes Pfand abzugleichen.
:::
