---
sidebar_position: 13
title: Tische
description: Bereiche und Tische anlegen, den Tischplan gestalten und für Veranstaltungen freigeben.
---

# Tische

Unter **Tische** legst du fest, wo deine Gäste sitzen: in welchen **Bereichen** (zum Beispiel *Zelt A*, *Saal*, *Biergarten*) welche **Tische** stehen und wie sie auf dem **Tischplan** angeordnet sind. Die Kasse zeigt diese Tische später als Liste und als Karte, mit Farbe für „frei“, „offen“ und „wartet auf Bedienung“.

Du erreichst die Seite über **Tische** in der Seitenleiste. Bearbeiten dürfen Administratoren und Mitglieder mit dem Recht für Veranstaltungen.

:::info[Einmal anlegen, bei jedem Fest nutzen]
Bereiche und Tische gehören zur **Organisation**, nicht zu einer Veranstaltung. Dein Festzelt steht jedes Jahr gleich — du zeichnest es einmal und nutzt den Plan bei jedem Fest wieder. **Ob** eine Veranstaltung mit Tischen arbeitet und **welche Bereiche** sie nutzt, stellst du in der [Veranstaltung](./veranstaltungen.md#tische) ein.
:::

![Die Seite „Tische“ mit Bereich, Werkzeugleiste und Tischplan](/img/screens/de/tables.png)

1. **Bereiche** — jeder Bereich hat einen eigenen Reiter und eine eigene Karte. Daneben legst du mit **Bereich hinzufügen** weitere an.
2. **Werkzeugleiste** — Tische und Deko hinzufügen, eine Serie anlegen, Wände, Zonen und die Raumform zeichnen, Raster und Einrasten schalten.
3. **Tischplan** — hier ziehst du Tische an ihren Platz.
4. **Speicherstatus** und der Umschalter **Karte | Liste**.

## Der erste Bereich

Ist noch nichts angelegt, bietet dir die Seite zwei Wege an:

- **Bereich anlegen** — du gibst einen Namen ein und fängst mit einer leeren Karte an.
- **Beispiel anlegen (Zelt A, A01–A12)** — legt einen Bereich mit zwölf Tischen an. Das ist der schnellste Weg, um zu sehen, wie es aussieht; Namen und Anordnung passt du danach an.

Über das Menü am Reiter eines Bereichs (der Pfeil neben dem Namen) findest du **Name und Größe ändern**, **Nach links**, **Nach rechts** und **Bereich löschen**. Die Größe der Karte wird in Einheiten angegeben: Ein Tisch ist 80 Einheiten groß, die Standardkarte 1200 × 800. Wird die Karte kleiner, rücken Tische an den Rand.

Löschst du einen Bereich, verschwinden seine Karte und seine Tische. Bestellungen bleiben erhalten.

## Tische anlegen

### Einzeln

In der Werkzeugleiste fügt **Tisch** einen eckigen und **Runder Tisch** einen runden Tisch hinzu. Der neue Tisch bekommt die nächste Nummer der Reihe (nach `A12` also `A13`), erscheint an einer freien Stelle der Karte und ist gleich ausgewählt; du ziehst ihn dann an seinen Platz.

### Als Serie

Für ein ganzes Zelt voller Biertischgarnituren nimmst du **Serie anlegen**:

![Serie anlegen mit Vorschau der Tischbezeichnungen](/img/screens/de/tables-bulk.png)

| Feld | Bedeutung |
|---|---|
| **Bereich** | In welchen Bereich die Tische kommen |
| **Präfix** | Buchstaben vor der Nummer, z. B. `B` — darf leer bleiben |
| **Start** und **Anzahl** | Erste Nummer und wie viele Tische |
| **Stellen** | Mit 2 Stellen heißt der Tisch `B01` statt `B1` |
| **Plätze** | Sitzplätze je Tisch (optional) |
| **Form** | Eckig oder rund |
| **Spalten** | Wie viele Tische je Reihe auf der Karte stehen |

Die **Vorschau** zeigt alle Bezeichnungen, bevor du sie anlegst. Gibt es eine Bezeichnung schon, ist sie als *belegt* markiert, und das Anlegen wird erst möglich, wenn du Präfix oder Start änderst.

:::tip[Bezeichnungen sind in der ganzen Organisation eindeutig]
Einen Tisch `12` kann es nur einmal geben — nicht in Zelt A und im Biergarten zugleich. Die Kasse, Küchenbons und Auswertungen kennen den Tisch nur unter seiner Bezeichnung. Nutze deshalb Präfixe wie `A` und `G`, wenn mehrere Bereiche Tische haben. Eine Bezeichnung darf bis zu 20 Zeichen lang sein.
:::

## Den Tischplan gestalten {/* #tischplan */}

![Tischplan mit Wänden, Zonen und Raumform; ein ausgewählter Tisch mit Eigenschaften rechts](/img/screens/de/tables-editor.png)

Tippe oder klicke einen Tisch an, um ihn auszuwählen. Rechts erscheinen seine **Eigenschaften**:

- **Bezeichnung** und **Plätze**
- **Form** — eckig oder rund
- **Breite** und **Höhe**
- **Drehung** — in Schritten von 15 Grad nach links oder rechts oder um 90 Grad
- **Bereich** — verschiebt den Tisch in einen anderen Bereich
- **Aktiv** — inaktive Tische bietet die Kasse nicht an, sie bleiben aber im Plan, zum Beispiel für den Tisch, der nur bei großem Andrang aufgebaut wird
- **Duplizieren** und **Löschen**

Auf der Karte selbst gilt:

- **Ziehen** verschiebt einen Tisch. Mit eingeschaltetem **Einrasten** springt er auf das Raster, das hält Reihen gerade.
- Der **Griff unten rechts** ändert die Größe.
- **Deko** fügt *Theke*, *Bühne* oder eine *Beschriftung* (z. B. „Eingang“) hinzu. Deko hilft dem Team, sich auf der Karte zurechtzufinden; an der Kasse kann man sie nicht antippen.

### Wände, Zonen und Raumform {/* #waende-zonen */}

Damit der Plan aussieht wie dein Zelt oder Saal, zeichnest du in der Werkzeugleiste unter **Zeichnen**:

- **Wand** — als Linienzug: Tippe oder klicke Punkt für Punkt, auch um Ecken herum. Ein Doppelklick oder **Fertig** beendet die Wand, die Rücktaste nimmt den letzten Punkt zurück, Esc bricht ab. Ausgewählt stellst du rechts die **Stärke** ein.
- **Zone** — eine Fläche mit Typ: **Küche**, **Gesperrter Bereich**, **Bar/Theke** oder **Sonstiges**. Du setzt mindestens drei Punkte und beendest mit Doppelklick, einem Tipp auf den ersten Punkt oder **Fertig**. Rechts änderst du **Typ** und **Beschriftung**. Zonen sind nur Darstellung — Tische gehören nicht zu einer Zone.
- **Raumform** — der Umriss des Raums. Ohne Raumform ist die ganze Karte ein Rechteck. Du ziehst die Ecken an ihren Platz und fügst an den Kantenmitten neue Punkte ein, etwa für einen L-förmigen Saal. Außerhalb ist die Karte grau schraffiert. **Auf Rechteck zurücksetzen** macht das rückgängig.

Beim Zeichnen rasten Punkte am Raster und an Winkeln von 0, 45 und 90 Grad ein, solange **Einrasten** an ist. Einen ausgewählten Punkt oder ein ganzes Element löschst du mit Entf.

Gesperrte Bereiche sind schraffiert. Liegt ein Tisch **außerhalb der Raumform** oder **in einem gesperrten Bereich**, wird er markiert, und über der Karte steht zum Beispiel „Tisch A12 liegt außerhalb der Raumform oder in einem gesperrten Bereich. Die Kasse bietet ihn trotzdem an.“ Neue Tische setzt der Editor von selbst auf eine freie Stelle innerhalb des Raums.

An der Kasse zeigt die [Karte](./kasse.md#karte) Wände, Zonen und Raumform genauso; antippen lässt sich dort nur ein Tisch.

### Mit der Tastatur

| Taste | Wirkung |
|---|---|
| Pfeiltasten | Ausgewählten Tisch um ein Raster verschieben |
| Umschalt + Pfeiltaste | Um fünf Raster verschieben |
| Entf | Löschen (mit Rückfrage); beim Zeichnen den gewählten Punkt |
| Strg + D (Mac: Cmd + D) | Duplizieren |
| Esc | Auswahl aufheben bzw. Zeichnen abbrechen |

### Speichern

Du musst nichts speichern. Jede Änderung wird kurz nach dem Loslassen übernommen; oben rechts steht dabei **Speichert …** und danach **Gespeichert**. Klappt das nicht — etwa ohne Verbindung —, springt der Tisch an seinen alten Platz zurück, und eine Meldung erscheint. Arbeiten zwei Personen gleichzeitig am Plan, gilt die zuletzt gespeicherte Änderung.

## Die Liste {/* #liste */}

Mit **Liste** statt **Karte** siehst du alle Tische als Tabelle: Bezeichnung, Bereich, Plätze, Form, Aktiv und die Zahl der **offenen** Bestellungen. Bezeichnung, Plätze, Form, Bereich und Aktiv änderst du direkt in der Zeile. Für viele Tische ist das schneller als die Karte.

![Alle Tische als Liste](/img/screens/de/tables-list.png)

## Umbenennen und Löschen während des Fests {/* #umbenennen-loeschen */}

- **Umbenennen** geht jederzeit. Offene Bestellungen des Tisches bekommen die neue Bezeichnung gleich mit; bereits bezahlte Bestellungen behalten die alte, damit Bons und Auswertung stimmen.
- **Löschen** geht nur, wenn an dem Tisch **keine Bestellung mehr offen** ist. Sonst erscheint „An diesem Tisch sind noch Bestellungen offen. Kassiere sie zuerst ab.“ Bezahlte Bestellungen behalten ihre Tischnummer.

Willst du einen Tisch nur vorübergehend aus der Kasse nehmen, schalte ihn auf **inaktiv**, statt ihn zu löschen.

## Am Telefon

Die Karte bearbeitest du am Tablet oder PC. Auf einem schmalen Bildschirm zeigt die Seite die **Liste** und darunter eine Vorschau der Karte mit Wänden und Zonen und dem Hinweis „Karte am Tablet oder PC bearbeiten“. Tische anlegen, umbenennen, eine Serie anlegen und löschen geht auch dort.

<img src="/img/screens/de/tables-phone.png" alt="Die Seite „Tische“ auf dem Telefon: Liste und darunter die Vorschau der Karte" width="320" />

## Wie es weitergeht

1. In der [Veranstaltung](./veranstaltungen.md#tische) **Vordefinierte Tische** wählen und die Bereiche freigeben.
2. Optional jeder Kasse unter [Geräte](./geraete.md#standardbereich) einen **Standardbereich** und die [Tischwahl](./geraete.md#tischwahl) (Nummer, Liste oder Karte) geben.
3. An der [Kasse](./kasse.md#tisch-oeffnen) einen Tisch öffnen.
