---
title: Integrationen
sidebar_label: Überblick
description: Anbindungen an andere Dienste aktivieren, einrichten und wieder abschalten.
---

import TseComingSoon from '@site/src/components/TseComingSoon';

# Integrationen

Über **Integrationen** bindest du OpenEOS an andere Dienste an, zum Beispiel an SumUp für Kartenzahlungen an der Kasse. Jede Integration ist zunächst aus. Du schaltest nur ein, was du wirklich brauchst.

Die Seite ist **Administratoren** vorbehalten. Mitglieder sehen weder den Katalog noch die Einstellungen einer Integration.

![Katalog der Integrationen](/img/screens/de/integrations.png)

## Eine Integration ansehen und aktivieren

1. In der Seitenleiste **Integrationen** öffnen.
2. Auf eine Integration klicken. Ein Fenster zeigt, was sie kann, was du dafür brauchst, ein paar Bilder und einen Link auf die passende Seite in diesem Handbuch.
3. Auf **Aktivieren** klicken.

Danach erscheint die Integration als eigener Eintrag direkt unter **Integrationen** in der Seitenleiste. Dort richtest du sie ein, bei SumUp zum Beispiel Zugangsdaten und Kartenleser.

![Info-Fenster einer Integration](/img/screens/de/integrations-sumup-info.png)

## Abschalten

Eine Integration schaltest du im selben Fenster oder auf ihrer Einstellungsseite mit **Deaktivieren** wieder ab. Der Eintrag in der Seitenleiste verschwindet, und die Funktionen der Integration stehen nicht mehr zur Verfügung — bei SumUp etwa die Kartenzahlung an der Kasse.

Deine Einstellungen bleiben dabei erhalten. Wenn du die Integration später wieder aktivierst, ist alles wie vorher eingerichtet.

## Status im Katalog {/* #status */}

Jede Karte im Katalog zeigt, wie es um die Integration steht:

| Status | Bedeutung |
|---|---|
| **Aktiv** | eingeschaltet und betriebsbereit |
| **Inaktiv** | verfügbar, aber nicht eingeschaltet |
| **Nicht eingerichtet** / **Wird eingerichtet** | eingeschaltet, aber noch nicht fertig, etwa eine Cloud-TSE, die noch angelegt wird |
| **Bald verfügbar** | in Vorbereitung. Das Fenster zeigt statt **Aktivieren** einen Hinweis und **Schließen**. |
| **Nur für Deutschland** | im Land deiner Organisation nicht verfügbar |
| **Land fehlt** | lege zuerst das [Land deiner Organisation](../betriebsarten.md#land) fest |
| **Nicht verfügbar** | auf diesem Server nicht eingerichtet, etwa auf einer eigenen Installation ohne Cloud-TSE |

## Verfügbare Integrationen

| Integration | Wofür | Stand |
|---|---|---|
| [SumUp](./sumup.md) | Kartenzahlung mit SumUp-Kartenlesern an der Kasse | verfügbar |
| Stripe | Online-Zahlungen | Bald verfügbar |
| [Cloud-TSE](./cloud-tse.md) | Kassensicherung nach KassenSichV – Voraussetzung für Bargeld in Deutschland | nur Deutschland; solange sie eingeführt wird, steht sie als **Bald verfügbar** im Katalog (siehe [Bald verfügbar](./cloud-tse.md#bald-verfuegbar)) |

<TseComingSoon />

## Eigene Anbindungen {/* #eigene-anbindungen */}

Für eigene Programme und Automatisierungen brauchst du keine Integration aus dem Katalog. Du richtest sie als Administrator in den Einstellungen ein:

- [API-Zugänge](../api-zugaenge.md) – Skripte und Automatisierungen lesen und ändern Daten über die REST-API.
- [Webhooks](./webhooks.md) – OpenEOS meldet Bestellungen, Zahlungen, Erstattungen und mehr sofort an deine eigene Adresse.
- [KI-Agenten](../ki-agenten.md) – Claude, Cursor und andere Agenten per MCP anbinden.
