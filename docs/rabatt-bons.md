---
sidebar_position: 9
title: Rabatt-Bons
description: Rabatt-Bons konfigurieren, die an der Kasse eingelöst werden können.
---

# Rabatt-Bons

**Rabatt-Bons** sind Gutscheine oder Vergünstigungen, die das Kassenpersonal beim Bezahlen auswählen kann – etwa ein Helfer-Rabatt oder ein Freigetränk-Bon. Du konfigurierst die verfügbaren Bons zentral, damit sie an allen Kassen einheitlich zur Verfügung stehen.

Du findest den Bereich über **Rabatt-Bons** in der Seitenleiste.

![Rabatt-Bons](/img/screens/de/discounts.png)

## Rabatt-Bon erstellen

1. Klicke auf **Rabatt-Bon erstellen**.
2. Gib einen **Namen** ein (z. B. „Helfer-Bon“) und optional eine Beschreibung.
3. Wähle die **Art**:
   - **Fester Betrag** – der eingetragene Betrag wird an der Kasse abgezogen.
   - **Betrag bei Einlösung** – das Kassenpersonal gibt den Betrag beim Einlösen ein, etwa bei Gutscheinen mit aufgedrucktem Wert.
4. Lass **Aktiv** an – nur aktive Bons sind an der Kasse auswählbar. Mit **Mehrfach pro Bestellung** darf derselbe Bon mehrmals auf eine Bestellung angewendet werden.
5. Klicke auf **Erstellen**.

![Rabatt-Bon erstellen](/img/screens/de/discounts-dialog.png)

## Einlösen an der Kasse

Rabatt-Bons wählt das Kassenpersonal im Kassieren-Fenster unter der Zahlart **Rabatt**. Der Rabatt wird auf die Bestellung angerechnet und erscheint später in der [Auswertung](./auswertung.md). Wie das an der Kasse aussieht, steht unter [Kasse](./kasse.md#kassieren). In der Betriebsart [Nur Bons](./betriebsarten.md#nur-bons) gibt es keine Rabatt-Bons.

:::tip[Typische Anwendungsfälle]
Rabatt-Bons eignen sich z. B. für Helferbons, Freigetränke für Sponsoren oder Sonderaktionen während des Festes.
:::

:::warning[Nur für kostenlos ausgegebene Bons]
Ein Rabatt-Bon mindert den Preis (DSFinV-K „Rabatt“); er ist keine Zahlart. Verwende ihn nur für Bons, die dein Verein verschenkt. **Verkaufte** Wertmarken oder Gutscheine sind steuerlich etwas anderes und gehören nicht als Rabatt in die Kasse; OpenEOS hat dafür keine eigene Funktion. Was das für die Betriebsarten ohne TSE bedeutet, steht unter [Wertmarken und Gutscheine](./betriebsarten.md#wertmarken). Das ist keine Steuerberatung.
:::
