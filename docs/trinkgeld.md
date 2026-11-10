---
title: Trinkgeld
description: Wem Trinkgeld gehört, mit welchem Steuersatz OpenEOS es bucht, wann es Trinkgeld an Angestellte ist und wie du Kartentrinkgeld an angestellte Bedienungen auszahlst.
---

# Trinkgeld

Trinkgeld nimmt die Kasse beim [Kassieren](./kasse.md#kartenzahlung) an – mit der Karte als eigenen Betrag oder durch Aufrunden. OpenEOS bucht es danach, **wem es gehört**: dem Verein oder einer angestellten Bedienung. Davon hängt ab, ob es Umsatzsteuer trägt und ob du es auszahlen darfst.

:::note[Keine Steuerberatung]
Wir beschreiben hier, wie OpenEOS Trinkgeld bucht, und die Einschätzung, auf der das beruht. Das ist keine Steuerberatung. Prüfe die Regeln für deinen Verein selbst bzw. mit deiner Steuerberatung.
:::

## Wem das Trinkgeld gehört {/* #empfaenger */}

| Wer kassiert | Trinkgeld gehört | DSFinV-K | Umsatzsteuer |
|---|---|---|---|
| Ehrenamtliche Helferin, Mitglied, Gerät ohne Bedienung | dem **Verein** | `TrinkgeldAG` | ja, mit dem Satz der Speisen und Getränke (beim umsatzsteuerpflichtigen Verein) |
| [Bedienung](./bedienungen.md#arbeitnehmer) mit dem Kennzeichen **„Arbeitnehmer (Lohnkonto)“** | der **angestellten Bedienung** | `TrinkgeldAN` | nein, kein Entgelt des Vereins |

Entscheidend ist die Bedienung, die die Zahlung kassiert. Das Kennzeichen „Arbeitnehmer (Lohnkonto)“ ist standardmäßig aus.

**Warum Ehrenamtliche kein Trinkgeld „an Arbeitnehmer“ bekommen:** Steuerfrei nach § 3 Nr. 51 EStG und als `TrinkgeldAN` zu buchen ist nur Trinkgeld an Arbeitnehmer, also an Personen in einem Dienstverhältnis (Angestellte, Minijob). Unentgeltlich tätige Ehrenamtliche sind keine Arbeitnehmer. Fließt ihr Trinkgeld in die Vereinskasse, ist es beim umsatzsteuerpflichtigen Verein Teil des Entgelts (Abschn. 10.1 Abs. 5 UStAE). Bei Helfern mit Ehrenamts- oder Übungsleiterpauschale (§ 3 Nr. 26/26a EStG) kommt es auf den Einzelfall an – frag dort deine Steuerberatung.

## Trinkgeld an den Verein: Steuersatz {/* #steuersatz */}

Trinkgeld an den Verein teilt den Steuersatz der Speisen und Getränke, für die es gegeben wird. Stehen auf einem Bon Waren mit 19 % und 7 %, verteilt OpenEOS das Trinkgeld im **Verhältnis der Nettobeträge** der Waren je Satz. Pfand zählt dabei nicht mit. Ein Rundungsrest geht auf den größeren Anteil.

**Beispiel:** Getränke für 9,00 € (19 %), Speisen für 2,90 € (7 %) und 1,00 € Trinkgeld.

| | Getränke 19 % | Speisen 7 % | Summe |
|---|---|---|---|
| Brutto | 9,00 € | 2,90 € | 11,90 € |
| Netto | 7,56 € | 2,71 € | 10,27 € |
| Anteil | 73,6 % | 26,4 % | 100 % |
| **Trinkgeld** | **0,74 €** | **0,26 €** | **1,00 €** |
| Brutto mit Trinkgeld | 9,74 € (darin 1,56 € MwSt) | 3,16 € (darin 0,21 € MwSt) | 12,90 € |

So steht es überall gleich:

- **Kassenbon:** Das Trinkgeld steht als eigene Zeile „Trinkgeld“; die MwSt-Zeilen enthalten den Anteil des Trinkgelds.
- **Cloud-TSE und DSFinV-K:** `TrinkgeldAG` anteilig bei USt-Schlüssel 1 (19 %) und 2 (7 %).
- **Auswertung:** Der Bericht [Umsatzsteuer](./auswertung.md) zeigt das Trinkgeld an den Verein je Steuersatz.
- **Erstattung:** Eine Erstattung spiegelt die Aufteilung des ursprünglichen Bons.

Für gemischte Bons gibt es keine ausdrückliche Regel der Finanzverwaltung. Die Aufteilung nach dem Verhältnis der Entgelte gilt als sachgerecht und kaum angreifbar.

## Trinkgeld an Angestellte {/* #arbeitnehmer */}

Kassiert eine Bedienung mit „Arbeitnehmer (Lohnkonto)“, bucht OpenEOS ihr Trinkgeld als `TrinkgeldAN`: nicht steuerbar (USt-Schlüssel 5), ohne MwSt. Im Bericht Umsatzsteuer steht es nur nachrichtlich. Bar erhaltenes Trinkgeld behält die Bedienung ohnehin selbst; in OpenEOS erscheint es nur, wenn es über die Kasse läuft – vor allem beim Kartentrinkgeld.

## Kartentrinkgeld auszahlen {/* #auszahlung */}

Kartentrinkgeld landet auf dem Konto des Vereins. Einer **angestellten** Bedienung kannst du es bar auszahlen:

- **Wer bekommt es:** nur Bedienungen mit „Arbeitnehmer (Lohnkonto)“. Bei allen anderen lehnt OpenEOS die Auszahlung ab: Bei Ehrenamtlichen gehört das Kartentrinkgeld dem Verein. Gäbe der Verein es weiter, wäre das kein Trinkgeld, sondern eine Zuwendung des Vereins (mögliche Vergütung bzw. Mittelverwendung).
- **Wie viel:** höchstens das offene Kartentrinkgeld der Bedienung, also ihr Kartentrinkgeld abzüglich dessen, was schon ausgezahlt ist.
- **Wer zahlt aus:** eine Schichtleitung an der Kasse oder ein Admin in der Verwaltung, auch direkt bei der [Abrechnung](./bedienungen.md#abrechnen).
- **Nur mit Bargeld:** Die Auszahlung geht nur, wo die Kasse Bargeld annehmen darf (Betriebsart [Alle Funktionen](./betriebsarten.md#alle-funktionen)).
- **Beleg und Quittung:** Jede Auszahlung ist ein eigener Kassenbeleg, mit [Cloud-TSE](./integrationen/cloud-tse.md) signiert: `TrinkgeldAN` und Bar jeweils negativ, Empfängerin bzw. Empfänger im Beleg. Dazu druckt OpenEOS eine Quittung mit Unterschriftszeile. Die Auszahlung lässt sich nicht ändern oder löschen.
- **Kassenbuch:** Das ausgezahlte Geld mindert den Soll-Bestand der Schublade, aus der es kommt (siehe [Kassenbuch](./kassenbuch.md)).

## Kleinunternehmer {/* #kleinunternehmer */}

Ist deine Organisation **ohne Umsatzsteuer** (Kleinunternehmer nach § 19 UStG), bucht OpenEOS Trinkgeld an den Verein als `TrinkgeldAG` mit USt-Schlüssel 6 (steuerfrei), ohne MwSt. Es zählt zum Gesamtumsatz nach § 19 UStG. Trinkgeld angestellter Bedienungen bleibt `TrinkgeldAN` mit Schlüssel 5.

Gemeinnützige Vereine verbuchen Trinkgeld an den Verein als Einnahme des wirtschaftlichen Geschäftsbetriebs (§ 64 Abs. 3 AO).

## Trinkgeld ohne Bon {/* #trinkgeldglas */}

Trinkgeld, das ohne Bon gegeben wird – etwa ins **Trinkgeldglas** an der Theke –, läuft nicht über OpenEOS. Auch dieses Geld ist beim umsatzsteuerpflichtigen Verein Entgelt. Lege in deiner [Verfahrensdokumentation](./verfahrensdokumentation.md#trinkgeld) fest, mit welchem Satz ihr es versteuert: pauschal mit 19 % oder im Verhältnis der Tagesumsätze zu 19 % und 7 %.

## Ältere Vorgänge {/* #bestand */}

Bis November 2026 hat OpenEOS Trinkgeld immer mit 0 % gebucht und für die ganze Organisation festgelegt, ob es an den Verein oder an die Helfer geht (Einstellung unter **Cloud-TSE → Kassen-Nachschau**). Vorgänge aus dieser Zeit bleiben so, wie sie signiert wurden. Für neue Vorgänge zählt nur noch das Kennzeichen der Bedienung.

## Siehe auch

- [Bedienungen](./bedienungen.md)
- [An der Kasse verkaufen](./kasse.md)
- [Kassen-Nachschau und DSFinV-K](./kassen-nachschau.md)
- [Verfahrensdokumentation – Vorlage](./verfahrensdokumentation.md)
