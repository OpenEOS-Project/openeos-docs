---
title: Webhooks
description: OpenEOS meldet Bestellungen, Zahlungen, Erstattungen und Phasenwechsel sofort an deine eigene Adresse – einrichten, Ereignisse und Nutzdaten, Signatur prüfen, Wiederholungen, Datenschutz und Fehlersuche.
---

# Webhooks

Ein **Webhook** ist eine Adresse auf deinem Server oder bei einem Automatisierungsdienst, an die OpenEOS eine Nachricht schickt, sobald etwas passiert: eine Bestellung wird bezahlt, eine Erstattung gebucht, eine Veranstaltung startet den echten Verkauf. OpenEOS sendet dafür eine `POST`-Anfrage mit einem JSON-Body an die Adresse, signiert mit einem geheimen Schlüssel, den nur du und OpenEOS kennen.

So kannst du zum Beispiel jede bezahlte Bestellung in deine Vereinsbuchhaltung übernehmen, bei Shop-Bestellungen eine Nachricht ins Team-Chat schicken oder eine eigene Anzeige aktualisieren – ohne ständig nachzufragen.

## Webhooks oder API? {/* #webhooks-oder-api */}

Die [REST-API](../api-zugaenge.md) und Webhooks ergänzen sich:

| | API | Webhooks |
|---|---|---|
| Richtung | Dein Programm **fragt** OpenEOS (Pull) | OpenEOS **meldet** sich bei deinem Programm (Push) |
| Geeignet für | Daten abrufen und ändern, wann du willst: Produkte pflegen, Berichte holen, Bestellungen exportieren | Sofort reagieren, wenn etwas passiert: bezahlte Bestellung, Erstattung, Phasenwechsel |
| Nachteil | Wer auf Änderungen wartet, muss regelmäßig nachfragen und verbraucht dabei die [Grenzen](../api-zugaenge.md#grenzen) | Du brauchst eine öffentlich erreichbare HTTPS-Adresse, die Anfragen annimmt |
| Zugang | [API-Token](../api-zugaenge.md#token-anlegen) (`oeos_…`) | Secret je Webhook (`whsec_…`) zum Prüfen der Signatur |

Oft kombinierst du beides: Der Webhook sagt dir, **dass** sich etwas geändert hat; brauchst du mehr Daten oder den aktuellen Stand, holst du ihn über die API.

## Einrichten {/* #einrichten */}

Webhooks verwalten nur **Administratoren** der Organisation. Mitglieder sehen an dieser Stelle einen Hinweis.

1. Als Administrator anmelden und **Einstellungen → Organisation → Webhooks** öffnen.
2. **Webhook anlegen** klicken.
3. Die **Adresse** eintragen, an die OpenEOS senden soll. Sie muss mit `https://` beginnen und öffentlich erreichbar sein (siehe [Anforderungen an die Adresse](#adresse)).
4. Optional eine **Beschreibung** vergeben, zum Beispiel „Buchhaltung“ oder „n8n Shop-Benachrichtigung“.
5. Die **Ereignisse** auswählen, die du bekommen willst (mindestens eins, siehe [Ereignisse](#ereignisse)). Weniger ist besser.
6. Bei Bedarf **Testbestellungen mitsenden** und **Gästedaten mitsenden** einschalten. Beide sind zunächst aus (siehe [Testbestellungen](#testbestellungen) und [Gästedaten](#gaestedaten)).
7. Speichern. OpenEOS zeigt jetzt das **Secret** (`whsec_…`). **Kopiere es sofort** und hinterlege es bei deinem Empfänger. Es wird genau einmal angezeigt; danach siehst du nur noch den Anfang, etwa `whsec_3fA9…`.

Je Organisation sind höchstens **10 Webhooks** möglich. Jeder Webhook hat sein eigenes Secret und seine eigene Auswahl an Ereignissen.

### Test senden {/* #test */}

Mit **Test senden** schickt OpenEOS sofort ein Ereignis vom Typ `ping` an die Adresse – auch wenn der Webhook gerade ausgeschaltet ist. So prüfst du, ob dein Empfänger erreichbar ist und die Signatur richtig prüft, bevor echte Ereignisse kommen. Das Ergebnis steht nach wenigen Sekunden im Zustellprotokoll.

### Zustellprotokoll {/* #protokoll */}

Zu jedem Webhook gibt es ein **Protokoll der Zustellungen**, das neueste oben. Je Zustellung siehst du:

- Ereignistyp und Event-ID,
- den Stand: **ausstehend**, **wird zugestellt**, **zugestellt** oder **fehlgeschlagen**,
- die Zahl der Versuche (höchstens 8) und, falls noch einer ansteht, den Zeitpunkt des nächsten,
- den HTTP-Status deiner Antwort, die Dauer und gegebenenfalls einen [Fehlercode](#fehler).

In der Detailansicht stehen zusätzlich der genaue JSON-Body, den OpenEOS geschickt hat, der Anfang deiner Antwort (höchstens 1 KB) und jeder einzelne Versuch. Das Protokoll wird **30 Tage** aufbewahrt. Secrets landen nie darin.

### Erneut senden {/* #erneut-senden */}

Eine Zustellung aus dem Protokoll kannst du mit **Erneut senden** noch einmal auslösen, etwa nachdem du einen Fehler bei deinem Empfänger behoben hast. Das ist eine neue Zustellung mit neuer Zustell-ID, aber mit **derselben Event-ID** und demselben Body. Hat dein Empfänger das Ereignis schon verarbeitet, erkennt er es so wieder (siehe [Doppelte Zustellungen](#idempotenz)).

### Secret erneuern {/* #secret-erneuern */}

Mit **Secret erneuern** bekommst du ein neues Secret – wieder genau einmal angezeigt. Damit du den Empfänger in Ruhe umstellen kannst, bleibt das alte Secret noch **24 Stunden** gültig: So lange signiert OpenEOS jede Zustellung mit beiden Secrets, und der Header `OpenEOS-Signature` enthält zwei `v1`-Werte. Dein Empfänger muss nur einen davon bestätigen können – die [Beispiele](#signatur) machen das bereits richtig. Wann das alte Secret ausläuft, steht beim Webhook.

Erneuere das Secret sofort, wenn es in falsche Hände geraten sein könnte, zum Beispiel weil es in einem Chat, einem Ticket oder einem öffentlichen Repository stand.

### Ausschalten und löschen {/* #ausschalten */}

Mit dem Schalter **Aktiv** pausierst du einen Webhook: Solange er aus ist, verschickt OpenEOS keine Ereignisse an ihn, und noch ausstehende Zustellungen enden als fehlgeschlagen (`ENDPOINT_INACTIVE`). **Löschen** entfernt den Webhook samt Protokoll; das geht nur in der App, nicht per API-Token.

## Ereignisse {/* #ereignisse */}

| Typ | Wann | Inhalt von `data` | Beträge |
|---|---|---|---|
| `order.created` | Eine Bestellung wurde angelegt. Woher sie kommt, steht in `source`: Kasse (`pos`), Shop (`online`) oder QR-Bestellung am Tisch (`qr_order`). | `order` | ja¹ |
| `order.paid` | Eine Bestellung ist vollständig bezahlt (`paymentStatus` wird `paid`). | `order` | ja |
| `order.completed` | Eine Bestellung ist abgeschlossen, also ausgegeben, abgeholt oder serviert. | `order` | ja¹ |
| `order.cancelled` | Eine Bestellung wurde storniert. | `order` | ja¹ |
| `payment.created` | Eine Zahlung wurde gebucht – bar, mit Karte oder online. | `payment` | ja |
| `refund.created` | Ein Storno mit Rückzahlung oder eine Erstattung wurde gebucht (`kind`). | `refund` | ja |
| `shop.order.created` | Im [Online-Shop](../veranstaltungen.md#vorverkauf) ist eine Bestellung eingegangen. | `order` | ja |
| `pfand_return.created` | An der Kasse wurde eine [Pfandrückgabe](../pfand.md) gebucht. | `pfandReturn` | ja |
| `event.activated` | Eine Veranstaltung wurde [freigeschaltet](../veranstaltungen.md). | `event` | nein |
| `event.phase_changed` | Eine Veranstaltung wechselt die [Phase](../veranstaltungen.md#phasen), zum Beispiel von Geplant zu Aktiv beim Verkaufsstart. | `event`, `previousPhase`, `phase` | nein |
| `cash_point_closing.created` | Ein Kassenabschluss wurde erstellt – nur mit [Cloud-TSE](./cloud-tse.md). | `closing` | nein |
| `product.updated` | Name, Preis, Steuersatz, Kategorie oder der Schalter Aktiv bzw. Verfügbar eines Produkts hat sich geändert. **Nicht** bei Bestandsänderungen durch Verkäufe. | `product`, `changed` | ja¹ (Preis) |
| `ping` | Nur über [Test senden](#test); nicht abonnierbar. | `webhookId`, `message` | nein |

¹ In der Betriebsart [Nur Bons](#nur-bons) ohne Beträge und Preise.

Die Liste der Ereignistypen mit Gruppe und Beschreibung liefert auch die API unter `GET /organizations/{organizationId}/webhooks/info`.

## Aufbau einer Zustellung {/* #aufbau */}

Jede Zustellung ist eine `POST`-Anfrage mit `Content-Type: application/json`. Der Body hat immer dieselbe Hülle:

```json
{
  "id": "6f1c2d3e-8a4b-4c5d-9e6f-0a1b2c3d4e5f",
  "type": "order.paid",
  "apiVersion": "2026-11-10",
  "createdAt": "2026-11-14T18:04:11.201Z",
  "organizationId": "0b6e1f7a-2c3d-4e5f-8a9b-1c2d3e4f5a6b",
  "data": { "order": { "…": "…" } }
}
```

| Feld | Bedeutung |
|---|---|
| `id` | ID des Ereignisses. Bleibt bei Wiederholungen und bei **Erneut senden** gleich – damit erkennst du doppelte Zustellungen. Steht auch im Header `OpenEOS-Event-Id`. |
| `type` | Ereignistyp aus der [Tabelle oben](#ereignisse) |
| `apiVersion` | Version des Formats, derzeit `2026-11-10` |
| `createdAt` | Zeitpunkt der Änderung in UTC – nicht der Zeitpunkt der Zustellung |
| `organizationId` | Deine Organisation |
| `data` | Die Daten zum Ereignis, je nach Typ (siehe unten) |

Beträge sind Zahlen in Euro (`currency` ist `EUR`), zum Beispiel `4.5` für 4,50 €. Steuersätze sind Prozentwerte, zum Beispiel `19`. Zeitpunkte sind ISO-8601 in UTC. Ignoriere Felder, die du nicht kennst – es können neue hinzukommen.

### Inhalt je Ereignis {/* #daten */}

- **`order.*` und `shop.order.created`** – `data.order` mit `id`, `orderNumber`, `dailyNumber`, `eventId`, `status` (`open`, `in_progress`, `ready`, `completed`, `cancelled`), `paymentStatus` (`unpaid`, `partly_paid`, `paid`, `refunded`), `source` (`pos`, `online`, `qr_order`), `fulfillmentType` (`table_service`, `counter_pickup` oder `null`), `tableNumber`, `isTest`, `currency`, `createdAt`, `completedAt`, `cancelledAt`, `amounts` und `items`.
  - `amounts`: `subtotal`, `taxTotal`, `total`, `paidAmount`, `tipAmount`, `discountAmount`, `refundedAmount`, `pfandTotal` – in [Nur Bons](#nur-bons) `null`.
  - `items[]`: `id`, `productId`, `productName`, `categoryName`, `quantity`, `unitPrice`, `totalPrice`, `taxRate`, `options` (Liste der gewählten Optionen als Text) und `status` – in Nur Bons ohne die drei Preisfelder.
  - `guest` mit `name`, `phone`, `notes` – nur wenn **Gästedaten mitsenden** an ist (siehe [Gästedaten](#gaestedaten)).
- **`payment.created`** – `data.payment` mit `id`, `orderId`, `orderNumber`, `eventId`, `method`, `provider`, `amount`, `status`, `isTest`, `createdAt`.
- **`refund.created`** – `data.refund` mit `id`, `refundNumber`, `orderId`, `orderNumber`, `eventId`, `kind` (`cancellation` für ein Storno, `refund` für eine Erstattung), `amount`, `taxTotal`, `pfandAmount`, `tipAmount`, `paymentMethod`, `status` (`completed`, `manual`, `test`), `reasonCode`, `isTest`, `createdAt` und `items[]` mit `productName`, `quantity`, `amount`.
- **`pfand_return.created`** – `data.pfandReturn` mit `id`, `returnNumber`, `eventId`, `totalAmount`, `lines[]` (`pfandTypeId`, `name`, `unitAmount`, `quantity`), `isTest`, `createdAt`.
- **`event.activated`** – `data.event` mit `id`, `name`, `startDate`, `endDate`, `status`, `phase`.
- **`event.phase_changed`** – `data.event` wie oben, dazu `data.previousPhase` und `data.phase`. Mögliche Phasen: `inactive`, `test` (Testmodus), `planned` (Geplant), `active` (Aktiv), `ended` (Beendet).
- **`cash_point_closing.created`** – `data.closing` mit `id`, `registerId`, `zNr`, `businessDate`, `periodFrom`, `periodTo`, `transactionCount`, `trigger` (`scheduled` oder `manual`), `createdAt`.
- **`product.updated`** – `data.product` mit `id`, `eventId`, `categoryId`, `name`, `price`, `taxRate`, `isActive`, `isAvailable`, `trackInventory`, `stockQuantity` und `data.changed`, der Liste der geänderten Felder. In Nur Bons ohne `price` und `taxRate`.
- **`ping`** – `data.webhookId` und `data.message` (`Test von OpenEOS`).

### Beispiel: `order.paid` {/* #beispiel-order-paid */}

Eine bezahlte Bestellung an der Kasse, Webhook ohne Gästedaten:

```json
{
  "id": "6f1c2d3e-8a4b-4c5d-9e6f-0a1b2c3d4e5f",
  "type": "order.paid",
  "apiVersion": "2026-11-10",
  "createdAt": "2026-11-14T18:04:11.201Z",
  "organizationId": "0b6e1f7a-2c3d-4e5f-8a9b-1c2d3e4f5a6b",
  "data": {
    "order": {
      "id": "9a8b7c6d-5e4f-4a3b-8c2d-1e0f9a8b7c6d",
      "orderNumber": "20261114-0042",
      "dailyNumber": 42,
      "eventId": "3c4d5e6f-7a8b-4c9d-8e0f-1a2b3c4d5e6f",
      "status": "in_progress",
      "paymentStatus": "paid",
      "source": "pos",
      "fulfillmentType": "counter_pickup",
      "tableNumber": null,
      "isTest": false,
      "currency": "EUR",
      "createdAt": "2026-11-14T18:03:52.877Z",
      "completedAt": null,
      "cancelledAt": null,
      "amounts": {
        "subtotal": 13,
        "taxTotal": 1.7,
        "total": 13,
        "paidAmount": 13,
        "tipAmount": 0,
        "discountAmount": 0,
        "refundedAmount": 0,
        "pfandTotal": 0
      },
      "items": [
        {
          "id": "1d2e3f4a-5b6c-4d7e-8f9a-0b1c2d3e4f5a",
          "productId": "7e8f9a0b-1c2d-4e3f-9a4b-5c6d7e8f9a0b",
          "productName": "Bier 0,5 l",
          "categoryName": "Getränke",
          "quantity": 2,
          "unitPrice": 4.5,
          "totalPrice": 9,
          "taxRate": 19,
          "options": [],
          "status": "pending"
        },
        {
          "id": "2e3f4a5b-6c7d-4e8f-9a0b-1c2d3e4f5a6b",
          "productId": "8f9a0b1c-2d3e-4f4a-8b5c-6d7e8f9a0b1c",
          "productName": "Bratwurst",
          "categoryName": "Essen",
          "quantity": 1,
          "unitPrice": 4,
          "totalPrice": 4,
          "taxRate": 7,
          "options": ["mit Senf"],
          "status": "preparing"
        }
      ]
    }
  }
}
```

Eine bezahlte Bestellung aus dem Online-Shop, Webhook **mit** Gästedaten – der einzige Unterschied ist das Objekt `guest`:

```json
{
  "id": "a4b5c6d7-e8f9-4a0b-9c1d-2e3f4a5b6c7d",
  "type": "order.paid",
  "apiVersion": "2026-11-10",
  "createdAt": "2026-11-14T16:21:40.512Z",
  "organizationId": "0b6e1f7a-2c3d-4e5f-8a9b-1c2d3e4f5a6b",
  "data": {
    "order": {
      "id": "b5c6d7e8-f9a0-4b1c-8d2e-3f4a5b6c7d8e",
      "orderNumber": "20261114-0017",
      "dailyNumber": 17,
      "eventId": "3c4d5e6f-7a8b-4c9d-8e0f-1a2b3c4d5e6f",
      "status": "open",
      "paymentStatus": "paid",
      "source": "online",
      "fulfillmentType": "counter_pickup",
      "tableNumber": null,
      "isTest": false,
      "currency": "EUR",
      "createdAt": "2026-11-14T16:20:58.031Z",
      "completedAt": null,
      "cancelledAt": null,
      "amounts": {
        "subtotal": 15.5,
        "taxTotal": 1.58,
        "total": 15.5,
        "paidAmount": 15.5,
        "tipAmount": 0,
        "discountAmount": 0,
        "refundedAmount": 0,
        "pfandTotal": 0
      },
      "items": [
        {
          "id": "c6d7e8f9-a0b1-4c2d-9e3f-4a5b6c7d8e9f",
          "productId": "d7e8f9a0-b1c2-4d3e-8f4a-5b6c7d8e9f0a",
          "productName": "Flammkuchen",
          "categoryName": "Essen",
          "quantity": 1,
          "unitPrice": 9.5,
          "totalPrice": 9.5,
          "taxRate": 7,
          "options": ["ohne Zwiebeln"],
          "status": "pending"
        },
        {
          "id": "e8f9a0b1-c2d3-4e4f-9a5b-6c7d8e9f0a1b",
          "productId": "f9a0b1c2-d3e4-4f5a-8b6c-7d8e9f0a1b2c",
          "productName": "Apfelschorle 0,4 l",
          "categoryName": "Getränke",
          "quantity": 2,
          "unitPrice": 3,
          "totalPrice": 6,
          "taxRate": 19,
          "options": [],
          "status": "pending"
        }
      ],
      "guest": {
        "name": "Anna Beispiel",
        "phone": "+49 151 23456789",
        "notes": "Abholung gegen 19 Uhr"
      }
    }
  }
}
```

### Beispiel: `refund.created` {/* #beispiel-refund */}

```json
{
  "id": "0a1b2c3d-4e5f-4a6b-8c7d-9e0f1a2b3c4d",
  "type": "refund.created",
  "apiVersion": "2026-11-10",
  "createdAt": "2026-11-14T18:31:07.044Z",
  "organizationId": "0b6e1f7a-2c3d-4e5f-8a9b-1c2d3e4f5a6b",
  "data": {
    "refund": {
      "id": "4d5e6f7a-8b9c-4d0e-9f1a-2b3c4d5e6f7a",
      "refundNumber": "20261114-0042-E1",
      "orderId": "9a8b7c6d-5e4f-4a3b-8c2d-1e0f9a8b7c6d",
      "orderNumber": "20261114-0042",
      "eventId": "3c4d5e6f-7a8b-4c9d-8e0f-1a2b3c4d5e6f",
      "kind": "refund",
      "amount": 4.5,
      "taxTotal": 0.72,
      "pfandAmount": 0,
      "tipAmount": 0,
      "paymentMethod": "cash",
      "status": "completed",
      "reasonCode": "quality",
      "isTest": false,
      "createdAt": "2026-11-14T18:31:06.990Z",
      "items": [
        { "productName": "Bier 0,5 l", "quantity": 1, "amount": 4.5 }
      ]
    }
  }
}
```

### Beispiel: `event.phase_changed` {/* #beispiel-phase */}

Der Verkaufsstart: Die Veranstaltung wechselt von Geplant zu Aktiv.

```json
{
  "id": "5e6f7a8b-9c0d-4e1f-8a2b-3c4d5e6f7a8b",
  "type": "event.phase_changed",
  "apiVersion": "2026-11-10",
  "createdAt": "2027-07-09T16:00:00.318Z",
  "organizationId": "0b6e1f7a-2c3d-4e5f-8a9b-1c2d3e4f5a6b",
  "data": {
    "event": {
      "id": "3c4d5e6f-7a8b-4c9d-8e0f-1a2b3c4d5e6f",
      "name": "Sommerfest 2027",
      "startDate": "2027-07-09T22:00:00.000Z",
      "endDate": "2027-07-11T21:59:59.000Z",
      "status": "active",
      "phase": "active"
    },
    "previousPhase": "planned",
    "phase": "active"
  }
}
```

### Beispiel: `ping` {/* #beispiel-ping */}

```json
{
  "id": "7a8b9c0d-1e2f-4a3b-9c4d-5e6f7a8b9c0d",
  "type": "ping",
  "apiVersion": "2026-11-10",
  "createdAt": "2026-11-10T09:15:00.000Z",
  "organizationId": "0b6e1f7a-2c3d-4e5f-8a9b-1c2d3e4f5a6b",
  "data": {
    "webhookId": "8b9c0d1e-2f3a-4b4c-8d5e-6f7a8b9c0d1e",
    "message": "Test von OpenEOS"
  }
}
```

## Betriebsart „Nur Bons“ {/* #nur-bons */}

Arbeitet deine Organisation in der [Betriebsart](../betriebsarten.md#nur-bons) **Nur Bons**, gibt es in OpenEOS keine Preise und keine Zahlungen. Das sieht man auch an den Webhooks:

- In Bestellungen ist `amounts` `null`, und die Positionen haben kein `unitPrice`, `totalPrice` und `taxRate`.
- `product.updated` kommt ohne `price` und `taxRate`.
- `order.paid`, `payment.created` und `refund.created` werden nicht verschickt. Auch `shop.order.created` und `pfand_return.created` kommen nicht vor, weil es Shop, QR-Bestellung und Pfand in dieser Betriebsart nicht gibt.

Werte `amounts` deshalb immer so aus, dass `null` vorkommen darf.

## Testbestellungen {/* #testbestellungen */}

Im **Testmodus** und in der Phase **Geplant** bucht OpenEOS Testbestellungen (siehe [Phasen](../veranstaltungen.md#phasen)). Sie gehen nur an Webhooks, bei denen **Testbestellungen mitsenden** an ist, und tragen dann `isTest: true` – ebenso Zahlungen, Erstattungen und Pfandrückgaben aus Testbestellungen.

Schalte die Option ein, solange du deine Anbindung aufbaust, und filtere im Empfänger nach `isTest`, damit Testbuchungen nicht in deiner Buchhaltung landen. Testbestellungen werden beim Freischalten und zum Verkaufsstart in OpenEOS gelöscht; was dein Empfänger schon bekommen hat, musst du dort selbst entfernen.

## Gästedaten und Datenschutz {/* #gaestedaten */}

Bestellungen – zum Beispiel aus dem Shop oder per QR-Code – können **Gästedaten** enthalten: Name, Telefonnummer und Anmerkung des Gastes. Standardmäßig schickt OpenEOS sie **nicht** mit. Erst wenn du bei einem Webhook **Gästedaten mitsenden** einschaltest, steht in den Bestellungen das Objekt `guest`.

:::warning[Dein Verein ist verantwortlich]
Mit **Gästedaten mitsenden** übermittelt OpenEOS personenbezogene Daten deiner Gäste an die Adresse, die du einträgst. Verantwortlicher im Sinne der DSGVO ist dein Verein: Du entscheidest, wohin die Daten gehen, und bist dafür verantwortlich, dass der Empfänger sie rechtmäßig verarbeitet – etwa mit einem Auftragsverarbeitungsvertrag, wenn ein Dienstleister sie für dich verarbeitet – und wieder löscht.

- Schalte die Option **nur ein, wenn der Empfänger die Daten wirklich braucht**, zum Beispiel um Gäste bei Abholung zu benachrichtigen.
- In OpenEOS werden Gästedaten 30 Tage nach dem Ende der Veranstaltung gelöscht (siehe [Daten und Löschung](../daten-und-loeschung.md)). Was beim Empfänger angekommen ist, erfasst diese Löschung nicht.
- Zustellungen stehen samt Body **30 Tage** im [Zustellprotokoll](#protokoll), mit eingeschalteter Option also auch die Gästedaten.
:::

## Header {/* #header */}

| Header | Inhalt |
|---|---|
| `Content-Type` | `application/json` |
| `User-Agent` | `OpenEOS-Webhooks/1.0 (+https://docs.openeos.de/integrationen/webhooks)` |
| `OpenEOS-Event-Id` | ID des Ereignisses, gleich wie `id` im Body |
| `OpenEOS-Event-Type` | Ereignistyp, zum Beispiel `order.paid` |
| `OpenEOS-Delivery-Id` | ID der Zustellung. Bleibt bei automatischen Wiederholungen gleich, ist bei **Erneut senden** neu. |
| `OpenEOS-Delivery-Attempt` | Nummer des Versuchs, `1` bis `8` |
| `OpenEOS-Signature` | `t=<Unix-Zeit in Sekunden>,v1=<Signatur>` – nach einer [Erneuerung des Secrets](#secret-erneuern) 24 Stunden lang mit einem zweiten `v1=…` |

## Signatur prüfen {/* #signatur */}

Prüfe bei jeder Anfrage die Signatur. Nur so weißt du, dass sie wirklich von OpenEOS kommt und unterwegs nicht verändert wurde. So geht es:

1. Den **rohen Body** lesen, genau so, wie er ankommt – **bevor** ein Framework ihn als JSON einliest. Wer den Body erst parst und dann wieder in Text verwandelt, bekommt andere Bytes und eine falsche Signatur.
2. Den Header `OpenEOS-Signature` an den Kommas trennen: `t` ist der Zeitpunkt der Signatur (Unix-Sekunden), jedes `v1` eine Signatur. Es können mehrere `v1` sein.
3. Den Zeitpunkt prüfen: Weicht `t` um mehr als **300 Sekunden** von deiner Uhrzeit ab, die Anfrage ablehnen. Das verhindert, dass jemand eine abgefangene Anfrage später noch einmal abschickt. Deine Serveruhr sollte deshalb per NTP gestellt sein.
4. Die erwartete Signatur berechnen: HMAC-SHA256 mit dem Secret als Schlüssel über `t`, einen Punkt und den rohen Body, also über `<t>.<body>`, als Hex-String in Kleinbuchstaben. Als Schlüssel nimmst du das **ganze** Secret einschließlich `whsec_`.
5. Mit **jedem** `v1` in **konstanter Zeit** vergleichen (`crypto.timingSafeEqual`, `hmac.compare_digest`, `hash_equals`) – nicht mit `==`. Passt einer, ist die Anfrage echt.

Bei **Erneut senden** signiert OpenEOS neu mit der aktuellen Zeit. Die Prüfung des Zeitpunkts schlägt dabei also nicht fehl, auch wenn das Ereignis älter ist.

Die folgenden Beispiele sind vollständige kleine Empfänger. Sie lesen das Secret aus der Umgebungsvariable `OPENEOS_WEBHOOK_SECRET`, antworten sofort mit `204` und verarbeiten das Ereignis danach.

### Node.js (Express) {/* #node */}

```js title="server.js"
// npm install express
const crypto = require('node:crypto');
const express = require('express');

const SECRET = process.env.OPENEOS_WEBHOOK_SECRET; // whsec_…
const TOLERANCE_SECONDS = 300;

function verifySignature(rawBody, header, secret) {
  if (!Buffer.isBuffer(rawBody) || typeof header !== 'string' || !secret) return false;

  let timestamp = null;
  const signatures = [];
  for (const part of header.split(',')) {
    const [key, value] = part.trim().split('=', 2);
    if (key === 't') timestamp = value;
    else if (key === 'v1' && value) signatures.push(value);
  }
  if (!/^\d+$/.test(timestamp ?? '') || signatures.length === 0) return false;

  // Alte (abgefangene) Anfragen ablehnen
  const age = Math.abs(Math.floor(Date.now() / 1000) - Number(timestamp));
  if (age > TOLERANCE_SECONDS) return false;

  const expected = crypto
    .createHmac('sha256', secret)
    .update(`${timestamp}.`)
    .update(rawBody)
    .digest();

  // Nach dem Erneuern des Secrets kommen 24 h lang zwei v1-Werte – einer muss passen.
  return signatures.some(
    (signature) =>
      /^[0-9a-f]{64}$/i.test(signature) &&
      crypto.timingSafeEqual(Buffer.from(signature, 'hex'), expected),
  );
}

const app = express();

// Roher Body statt express.json(): Die Signatur gilt für die Bytes, wie sie ankommen.
// Steht bei dir global app.use(express.json()), registriere diese Route davor.
app.post('/webhooks/openeos', express.raw({ type: 'application/json', limit: '1mb' }), (req, res) => {
  if (!verifySignature(req.body, req.get('OpenEOS-Signature'), SECRET)) {
    return res.status(400).send('invalid signature');
  }

  const event = JSON.parse(req.body.toString('utf8'));
  res.sendStatus(204); // sofort bestätigen, danach verarbeiten

  setImmediate(() => {
    handleEvent(event).catch((err) => console.error('Webhook-Verarbeitung fehlgeschlagen', event.id, err));
  });
});

// Im Echtbetrieb: Tabelle mit eindeutiger Spalte für die Event-ID statt Set im Speicher
const processedEventIds = new Set();

async function handleEvent(event) {
  if (processedEventIds.has(event.id)) return; // schon verarbeitet (Wiederholung)
  processedEventIds.add(event.id);

  switch (event.type) {
    case 'order.paid': {
      const { order } = event.data;
      console.log('Bezahlt:', order.orderNumber, order.amounts ? order.amounts.total : '(Nur Bons)');
      break;
    }
    case 'ping':
      console.log('Test von OpenEOS angekommen');
      break;
    default:
      console.log('Ereignis:', event.type, event.id);
  }
}

app.listen(Number(process.env.PORT) || 3000);
```

### Python (Flask) {/* #python */}

```python title="app.py"
# pip install flask
import hashlib
import hmac
import json
import os
import threading
import time

from flask import Flask, request

SECRET = os.environ["OPENEOS_WEBHOOK_SECRET"]  # whsec_…
TOLERANCE_SECONDS = 300

app = Flask(__name__)


def verify_signature(raw_body, header, secret):
    if not header or not secret:
        return False

    timestamp = None
    signatures = []
    for part in header.split(","):
        key, _, value = part.strip().partition("=")
        if key == "t":
            timestamp = value
        elif key == "v1" and value:
            signatures.append(value)
    if not timestamp or not (timestamp.isascii() and timestamp.isdigit()) or not signatures:
        return False

    # Alte (abgefangene) Anfragen ablehnen
    if abs(time.time() - int(timestamp)) > TOLERANCE_SECONDS:
        return False

    expected = hmac.new(
        secret.encode(), timestamp.encode() + b"." + raw_body, hashlib.sha256
    ).hexdigest()

    # Nach dem Erneuern des Secrets kommen 24 h lang zwei v1-Werte – einer muss passen.
    return any(
        hmac.compare_digest(expected.encode(), signature.lower().encode())
        for signature in signatures
    )


@app.post("/webhooks/openeos")
def openeos_webhook():
    raw_body = request.get_data()  # rohe Bytes, vor jedem JSON-Parsen
    if not verify_signature(raw_body, request.headers.get("OpenEOS-Signature"), SECRET):
        return "invalid signature", 400

    event = json.loads(raw_body)
    # Sofort bestätigen, danach verarbeiten (im Echtbetrieb besser: Warteschlange)
    threading.Thread(target=handle_event, args=(event,), daemon=True).start()
    return "", 204


# Im Echtbetrieb: Tabelle mit eindeutiger Spalte für die Event-ID statt Set im Speicher
processed_event_ids = set()


def handle_event(event):
    if event["id"] in processed_event_ids:
        return  # schon verarbeitet (Wiederholung)
    processed_event_ids.add(event["id"])

    if event["type"] == "order.paid":
        order = event["data"]["order"]
        total = order["amounts"]["total"] if order["amounts"] else "(Nur Bons)"
        print("Bezahlt:", order["orderNumber"], total)
    elif event["type"] == "ping":
        print("Test von OpenEOS angekommen")
    else:
        print("Ereignis:", event["type"], event["id"])


if __name__ == "__main__":
    app.run(port=int(os.environ.get("PORT", "3000")))
```

Mit **FastAPI** liest du den rohen Body mit `raw_body = await request.body()` (Parameter `request: Request`) und nutzt dieselbe Funktion `verify_signature`. Lass FastAPI den Body nicht vorher als Modell einlesen.

### PHP {/* #php */}

```php title="webhook.php"
<?php
// Rohen Body lesen – nicht $_POST und nicht json_decode() vor der Prüfung.
$secret = (string) getenv('OPENEOS_WEBHOOK_SECRET'); // whsec_…
const OPENEOS_TOLERANCE_SECONDS = 300;

function openeos_verify_signature(string $rawBody, string $header, string $secret): bool
{
    if ($header === '' || $secret === '') {
        return false;
    }

    $timestamp = null;
    $signatures = [];
    foreach (explode(',', $header) as $part) {
        $pair = explode('=', trim($part), 2);
        if (count($pair) !== 2) {
            continue;
        }
        if ($pair[0] === 't') {
            $timestamp = $pair[1];
        } elseif ($pair[0] === 'v1' && $pair[1] !== '') {
            $signatures[] = strtolower($pair[1]);
        }
    }
    if ($timestamp === null || !preg_match('/\A\d+\z/', $timestamp) || $signatures === []) {
        return false;
    }

    // Alte (abgefangene) Anfragen ablehnen
    if (abs(time() - (int) $timestamp) > OPENEOS_TOLERANCE_SECONDS) {
        return false;
    }

    $expected = hash_hmac('sha256', $timestamp . '.' . $rawBody, $secret);

    // Nach dem Erneuern des Secrets kommen 24 h lang zwei v1-Werte – einer muss passen.
    foreach ($signatures as $signature) {
        if (hash_equals($expected, $signature)) {
            return true;
        }
    }
    return false;
}

function openeos_handle_event(array $event): void
{
    // Hier die Event-ID speichern (Spalte mit UNIQUE-Index) und Duplikate überspringen.
    switch ($event['type']) {
        case 'order.paid':
            $order = $event['data']['order'];
            $total = $order['amounts'] !== null ? $order['amounts']['total'] : '(Nur Bons)';
            error_log('Bezahlt: ' . $order['orderNumber'] . ' ' . $total);
            break;
        case 'ping':
            error_log('Test von OpenEOS angekommen');
            break;
        default:
            error_log('Ereignis: ' . $event['type'] . ' ' . $event['id']);
    }
}

$rawBody = (string) file_get_contents('php://input');
$header = $_SERVER['HTTP_OPENEOS_SIGNATURE'] ?? '';

if (!openeos_verify_signature($rawBody, $header, $secret)) {
    http_response_code(400);
    exit('invalid signature');
}

$event = json_decode($rawBody, true);

// Sofort bestätigen, danach verarbeiten
http_response_code(204);
if (function_exists('fastcgi_finish_request')) {
    fastcgi_finish_request(); // PHP-FPM: Antwort abschicken, Skript läuft weiter
}
openeos_handle_event($event);
```

## Zustellung und Wiederholungen {/* #zustellung */}

OpenEOS stellt Ereignisse im Hintergrund zu, meist **2 bis 10 Sekunden** nach der Änderung.

- **Erfolgreich** ist eine Zustellung, wenn dein Server innerhalb von **10 Sekunden** mit einem Status `2xx` antwortet. Was im Body deiner Antwort steht, ist egal.
- **Weiterleitungen** (`301`, `302`, …) folgt OpenEOS nicht; sie zählen als Fehler (`REDIRECT_NOT_FOLLOWED`). Trage die endgültige Adresse ein.
- Jede andere Antwort, ein Timeout oder ein Verbindungsfehler zählt als **fehlgeschlagener Versuch**. OpenEOS versucht es dann erneut:

| Versuch | Abstand zum vorigen | Etwa nach |
|---|---|---|
| 1 | sofort | 0 |
| 2 | 1 Minute | 1 min |
| 3 | 5 Minuten | 6 min |
| 4 | 30 Minuten | 36 min |
| 5 | 2 Stunden | 2 h 36 min |
| 6 | 5 Stunden | 7 h 36 min |
| 7 | 8 Stunden | 15 h 36 min |
| 8 | 8 Stunden | 23 h 36 min |

Die Abstände schwanken um ±10 %, damit nicht alle Wiederholungen gleichzeitig ankommen. Nach dem 8. Versuch gilt die Zustellung als **fehlgeschlagen**; mit [Erneut senden](#erneut-senden) kannst du sie später selbst noch einmal auslösen.

### Doppelte Zustellungen und Reihenfolge {/* #idempotenz */}

- **Mindestens einmal:** OpenEOS stellt jedes Ereignis mindestens einmal zu, in seltenen Fällen auch mehrfach – etwa wenn deine `2xx`-Antwort nicht rechtzeitig ankam. Merke dir deshalb die Event-ID (`id` bzw. `OpenEOS-Event-Id`) und überspringe Ereignisse, die du schon verarbeitet hast.
- **Keine feste Reihenfolge:** Ereignisse können in anderer Reihenfolge ankommen, als sie passiert sind – zum Beispiel `order.paid` vor `order.created`, wenn eine Zustellung wiederholt werden musste. Ordne nach `createdAt`, oder hol dir bei Bedarf den aktuellen Stand über die [API](../api-zugaenge.md).

### Automatisches Abschalten {/* #abschalten */}

Schlägt die Zustellung an einen Webhook dauerhaft fehl, schaltet OpenEOS ihn ab. Das passiert, wenn **beide** Bedingungen erfüllt sind:

- mindestens **30 Versuche in Folge** sind fehlgeschlagen, **und**
- der erste davon liegt mindestens **24 Stunden** zurück.

Der Webhook steht dann auf inaktiv mit dem Grund „zu viele Fehler“, alle Administratoren der Organisation bekommen eine **E-Mail**, und noch ausstehende Zustellungen enden als fehlgeschlagen (`ENDPOINT_INACTIVE`). Ein einzelner erfolgreicher Versuch setzt die Zählung zurück.

Ist der Fehler bei deinem Empfänger behoben, schaltest du den Webhook in der App wieder auf **Aktiv**. Ereignisse aus der Zwischenzeit holst du über **Erneut senden** im Zustellprotokoll nach – oder über die API, wenn es viele sind.

## Anforderungen an die Adresse {/* #adresse */}

- Nur **HTTPS** mit gültigem Zertifikat. Adressen mit `http://` oder mit Zugangsdaten in der URL (`https://benutzer:passwort@…`) werden abgelehnt. Höchstens 2 048 Zeichen.
- Der Name muss auf **öffentliche IP-Adressen** zeigen. Private Netze (zum Beispiel `192.168.…`, `10.…`), `localhost`, Link-Local-Adressen und Cloud-Metadaten-Adressen sind gesperrt. So kann niemand über einen Webhook Dienste in internen Netzen ansprechen.
- OpenEOS prüft das beim Speichern und **vor jeder Zustellung** erneut und verbindet sich genau mit der geprüften Adresse.

Willst du einen Empfänger auf deinem eigenen Rechner testen, mach ihn über einen Tunnel-Dienst mit HTTPS-Adresse erreichbar. Wer OpenEOS [selbst betreibt](#selbst-betreiben), kann Empfänger im eigenen Netz freigeben.

## Empfehlungen {/* #empfehlungen */}

- **Signatur immer prüfen** – auch bei `ping`, und mit Zeitstempel-Prüfung. Anfragen ohne gültige Signatur mit `400` ablehnen.
- **Duplikate erkennen** – die Event-ID speichern, etwa in einer Tabelle mit eindeutiger Spalte, und schon bekannte Ereignisse überspringen.
- **Schnell mit 2xx antworten** – das Ereignis zuerst sicher ablegen (Datenbank oder Warteschlange), dann antworten und erst danach verarbeiten. Was länger als 10 Sekunden dauert, gilt als fehlgeschlagen und kommt erneut.
- **Bei Bedarf den aktuellen Stand holen** – ein Ereignis beschreibt den Stand zum Zeitpunkt `createdAt`. Kommt es verspätet oder in anderer Reihenfolge an, lies die Bestellung über die [API](../api-zugaenge.md) nach, bevor du Wichtiges entscheidest.
- **Unbekanntes tolerieren** – unbekannte Felder und Ereignistypen ignorieren statt mit einem Fehler zu antworten.
- **Secret schützen** – nur auf dem Server ablegen (Umgebungsvariable oder Secret-Speicher), nie im Browser, in einer App oder im Repository. Ist es bekannt geworden, sofort [erneuern](#secret-erneuern).
- **Nur abonnieren, was du brauchst** – weniger Ereignisse bedeuten weniger Last und weniger Daten beim Empfänger.

## Per API verwalten {/* #api */}

Webhooks lassen sich auch mit einem [API-Token](../api-zugaenge.md) verwalten. Dafür gibt es zwei Scopes; den Token muss ein **Administrator** angelegt haben:

| Scope | Erlaubt |
|---|---|
| `webhooks:read` | Webhooks, ihre Einstellungen und das Zustellprotokoll lesen, Ereignistypen und Grenzen abfragen |
| `webhooks:write` | Webhooks anlegen und ändern, Secret erneuern, Test senden, Zustellungen erneut senden |

**Löschen** geht nicht per Token, nur in der App. Wie bei allen Tokens schließt `webhooks:write` das Lesen nicht ein.

Alle Endpunkte liegen unter `/organizations/{organizationId}/webhooks`:

| Methode | Pfad | Scope | Zweck |
|---|---|---|---|
| `GET` | `/webhooks/info` | `webhooks:read` | Ereignistypen, Grenzen und Version |
| `GET` | `/webhooks` | `webhooks:read` | Alle Webhooks, neueste zuerst |
| `POST` | `/webhooks` | `webhooks:write` | Webhook anlegen; die Antwort enthält einmalig `secret` |
| `GET` | `/webhooks/{webhookId}` | `webhooks:read` | Einen Webhook lesen |
| `PATCH` | `/webhooks/{webhookId}` | `webhooks:write` | Adresse, Beschreibung, Ereignisse oder Schalter ändern |
| `POST` | `/webhooks/{webhookId}/rotate-secret` | `webhooks:write` | Secret erneuern; das alte bleibt 24 Stunden gültig |
| `POST` | `/webhooks/{webhookId}/test` | `webhooks:write` | `ping` senden |
| `GET` | `/webhooks/{webhookId}/deliveries` | `webhooks:read` | Zustellprotokoll, filterbar nach `status` und `eventType` (`limit` bis 100, `offset`) |
| `GET` | `/webhooks/{webhookId}/deliveries/{deliveryId}` | `webhooks:read` | Eine Zustellung mit Body, Antwort und Versuchen |
| `POST` | `/webhooks/{webhookId}/deliveries/{deliveryId}/redeliver` | `webhooks:write` | Erneut senden |

Einen Webhook anlegen:

```bash
curl https://api.openeos.de/api/organizations/ORGANISATIONS-ID/webhooks \
  -H "Authorization: Bearer oeos_…" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.org/webhooks/openeos",
    "description": "Buchhaltung",
    "eventTypes": ["order.paid", "refund.created"],
    "includeGuestData": false,
    "includeTestOrders": false
  }'
```

Setzt du mit `PATCH` einen automatisch abgeschalteten Webhook wieder auf `"active": true`, beginnt die Fehlerzählung von vorn. Felder, Antworten und Fehler stehen in der [API-Referenz](/api).

## Selbst betreiben {/* #selbst-betreiben */}

Wer OpenEOS [selbst betreibt](../selbst-betreiben/intro.md), stellt die Webhooks über Umgebungsvariablen des API-Dienstes ein – in der `.env` bzw. im `environment:`-Block des Dienstes `api`, danach `docker compose up -d api`:

| Variable | Standard | Bedeutung |
|---|---|---|
| `WEBHOOKS_ENABLED` | `true` | Webhooks an oder aus. Bei `false` antworten Anlegen, Test und Erneut senden mit `503` (`WEBHOOKS_DISABLED`). |
| `WEBHOOKS_TIMEOUT_MS` | `10000` | Wie lange OpenEOS je Versuch auf die Antwort wartet (Millisekunden) |
| `WEBHOOKS_MAX_ATTEMPTS` | `8` | Versuche je Zustellung |
| `WEBHOOKS_MAX_ENDPOINTS_PER_ORG` | `10` | Höchstzahl Webhooks je Organisation |
| `WEBHOOKS_DISABLE_AFTER_FAILURES` | `30` | Fehlversuche in Folge bis zum automatischen Abschalten … |
| `WEBHOOKS_DISABLE_AFTER_HOURS` | `24` | … und Mindestdauer der Fehlerserie in Stunden |
| `WEBHOOKS_DELIVERY_RETENTION_DAYS` | `30` | Aufbewahrung des Zustellprotokolls in Tagen |
| `WEBHOOKS_POLL_INTERVAL_MS` | `3000` | Wie oft der Hintergrunddienst nach neuen Zustellungen schaut (Millisekunden) |
| `WEBHOOKS_CONCURRENCY` | `10` | Gleichzeitige Zustellungen |
| `WEBHOOKS_ALLOW_HTTP` | `false` | Auch `http://`-Adressen erlauben – nur für Tests oder ein abgeschottetes Netz |
| `WEBHOOKS_ALLOW_PRIVATE_NETWORKS` | `false` | Empfänger in privaten Netzen erlauben (RFC 1918, Loopback, IPv6-ULA), etwa einen Server im Vereinsnetz. Link-Local- und Metadaten-Adressen bleiben gesperrt. |

Für einen Empfänger im eigenen Netz ohne Zertifikat setzt du `WEBHOOKS_ALLOW_PRIVATE_NETWORKS=true` und `WEBHOOKS_ALLOW_HTTP=true`. Die Signatur solltest du trotzdem prüfen.

## Wenn etwas nicht klappt {/* #fehler */}

Im [Zustellprotokoll](#protokoll) steht bei fehlgeschlagenen Versuchen ein Fehlercode:

| Code | Bedeutung | Was du tun kannst |
|---|---|---|
| `TIMEOUT` | Keine vollständige Antwort innerhalb von 10 Sekunden | Sofort mit `2xx` antworten und erst danach verarbeiten |
| `CONNECTION_FAILED` | Verbindung abgelehnt oder abgebrochen | Läuft der Server? Ist der Port von außen erreichbar, lässt die Firewall die Anfrage durch? |
| `DNS_FAILED` | Der Name der Adresse lässt sich nicht auflösen | Schreibweise der Adresse und DNS-Eintrag prüfen |
| `TLS_FAILED` | HTTPS-Verbindung gescheitert, meist wegen des Zertifikats | Gültiges Zertifikat einer öffentlichen Stelle (z. B. Let's Encrypt) mit vollständiger Kette; selbst signierte Zertifikate gehen nicht |
| `BLOCKED_ADDRESS` | Die Adresse zeigt auf ein privates oder gesperrtes Netz | Öffentliche Adresse nutzen (siehe [Anforderungen](#adresse)); im Selbstbetrieb ggf. `WEBHOOKS_ALLOW_PRIVATE_NETWORKS` |
| `REDIRECT_NOT_FOLLOWED` | Dein Server hat mit einer Weiterleitung (`3xx`) geantwortet | Die endgültige Adresse eintragen, oft fehlt nur ein `/` am Ende oder `www.` |
| `HTTP_ERROR` | Dein Server hat mit einem Status außerhalb von `2xx` geantwortet | Status und Antwort im Protokoll ansehen; `400` deutet oft auf eine fehlschlagende Signaturprüfung hin (rohen Body? richtiges Secret?) |
| `ENDPOINT_INACTIVE` | Der Webhook war ausgeschaltet oder wurde [automatisch abgeschaltet](#abschalten) | Empfänger reparieren, Webhook wieder auf **Aktiv**, Ereignisse erneut senden |
| `ENDPOINT_DELETED` | Der Webhook wurde gelöscht, bevor die Zustellung lief | – |
| `INTERNAL` | Fehler bei OpenEOS | Später erneut senden; wenn es bleibt, beim [Support](../support.md) melden |

Beim Anlegen oder Ändern eines Webhooks kann die API außerdem antworten mit:

| Status | `reason` | Bedeutung |
|---|---|---|
| `400` | `WEBHOOK_URL_INVALID` | Adresse ungültig; `params.reason` sagt warum: `invalid`, `not_https`, `credentials` (Zugangsdaten in der URL), `private_address`, `unresolvable` |
| `400` | `WEBHOOK_EVENT_TYPE_INVALID` | Unbekannter Ereignistyp (`params.eventTypes`) |
| `404` | `WEBHOOK_NOT_FOUND`, `WEBHOOK_DELIVERY_NOT_FOUND` | Webhook bzw. Zustellung gibt es nicht (mehr) |
| `409` | `WEBHOOK_LIMIT_REACHED` | Höchstzahl erreicht (`params.limit`) |
| `503` | `WEBHOOKS_DISABLED` | Webhooks sind auf diesem Server ausgeschaltet |

**Die Signatur passt nie?** Meist liest das Framework den Body schon als JSON ein, bevor du prüfst – dann stimmen die Bytes nicht mehr. Prüfe außerdem, ob du das ganze Secret mit `whsec_` verwendest, ob die Uhr deines Servers stimmt und ob ein Proxy den Body verändert (zum Beispiel neu kodiert).

## Weiterlesen

- [API-Zugänge](../api-zugaenge.md) – Token anlegen, Scopes, Grenzen und Fehlerformat
- [API-Referenz](/api) – alle Endpunkte mit Feldern und Antworten
- [Betriebsarten](../betriebsarten.md) – was „Nur Bons“ für Beträge bedeutet
- [Daten und Löschung](../daten-und-loeschung.md) – wie lange OpenEOS welche Daten aufbewahrt
