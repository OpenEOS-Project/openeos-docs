---
sidebar_position: 20
title: An der Kasse verkaufen
description: Tisch öffnen, bestellen, senden, kassieren — der Ablauf an der Kasse am Festtag.
---

# An der Kasse verkaufen

Diese Seite beschreibt die Kasse selbst — also das, was dein Team am Festtag tut. Wie ein Gerät zur Kasse wird, steht unter [Geräte verbinden](./geraete.md); wie Tische und Tischplan entstehen, unter [Tische](./tische.md).

:::tip[Vorher ausprobieren]
Solange die Veranstaltung im **Testmodus** steht, kannst du den gesamten Ablauf durchspielen: bis zu 25 Bestellungen kosten nichts. Die Kasse zeigt dann im Kopf **Testmodus** und einmal den Hinweis „Testmodus — Bestellungen werden beim Aktivieren gelöscht“. Beim Freischalten werden die Testbestellungen gelöscht, deine Einrichtung bleibt.
:::

## Wie die Kasse startet {/* #start */}

Was du nach dem Einschalten siehst, hängt an zwei Einstellungen: am **Betriebsmodus** des Geräts ([Geräte](./geraete.md#betriebsmodus)) und am **Tischmodus** der Veranstaltung ([Veranstaltungen](./veranstaltungen.md#tische)).

| Gerät | Tischmodus der Veranstaltung | Die Kasse startet mit … |
|---|---|---|
| **Feste Kasse** | egal | der Bestellansicht — alles wird an der Theke gebucht |
| **Bedienung** | Keine Tische (Thekenbetrieb) | der Bestellansicht — alles wird an der Theke gebucht |
| **Bedienung** | Tischnummer frei eingeben | **Tisch öffnen** mit Ziffernblock |
| **Bedienung** | Vordefinierte Tische | **Tisch öffnen** mit Nummer, Tischliste und Karte |

Ist die Kasse mit PIN eingerichtet, kommt davor der PIN-Bildschirm — siehe [Anmelden und sperren](#pin-und-sperre).

## Der Kopf

Oben steht immer dasselbe:

- **Links** der Name der Kasse und — wenn das Gerät einen [Standardbereich](./geraete.md#standardbereich) hat — der Bereich, etwa „Kasse 3 · Zelt A“. Darunter die laufende Veranstaltung.
- **Tisch** — in der Bestellansicht zeigt eine grüne Pille, für wen du gerade buchst: „Tisch A10“, „Theke“ oder „To-go“. Ein Tipp darauf öffnet [Tisch wählen](#tisch-wechseln).
- **Status** — **Online** (grüner Punkt), **Verbinde …** oder **Keine Live-Daten** (gelb) und **Offline** (rot). Daneben der Bondrucker der Kasse mit Name, sofern einer zugewiesen ist, und die Uhrzeit. Auf schmaleren Bildschirmen bleibt nur der Punkt.
- **Mehr** (die drei Punkte) — Bestellverlauf, Offene Bestellungen, Pfand-Rückgabe, Kassenlade öffnen und Gerät abmelden. Es erscheint nur, was an dieser Kasse eingerichtet ist.
- **Bediener** — mit PIN die Initialen und der Name der angemeldeten Person, daneben das **Schloss**.

## Tisch öffnen {/* #tisch-oeffnen */}

![Startansicht: Tisch öffnen mit Ziffernblock und offenen Tischen](/img/screens/de/pos-start.png)

Im Tischbetrieb beginnt jede Bestellung mit der Frage: Für welchen Tisch? Oben rechts wählst du unter **Tischwahl**, wie du den Tisch findest. Die Kasse merkt sich die Wahl.

### Nummer

Tippe die Tischnummer ein — am Bildschirm oder mit einer Tastatur — und dann auf **Tisch … öffnen** oder den grünen Pfeil.

- Bei **frei eingegebenen** Nummern nimmt die Kasse jede Eingabe bis fünf Zeichen.
- Bei **vordefinierten** Tischen sucht sie den passenden Tisch: `5` findet `A05`. Passen mehrere (etwa `A05` und `B05`), erscheinen sie als Auswahl darunter. Gibt es keinen, steht dort „Kein Tisch „…““, und Öffnen geht nicht.

### Tische

![Alle Tische des Bereichs mit Status und Betrag](/img/screens/de/pos-tables.png)

Alle freigegebenen Tische nach Bereichen, der Standardbereich der Kasse zuerst. Jeder Tisch zeigt seinen Zustand:

| Farbe | Bedeutung |
|---|---|
| hell | **frei** |
| grün | **offen** — es gibt Bestellungen, die noch nicht bezahlt sind, oder einen Warenkorb an dieser Kasse; dazu der offene Betrag |
| gelb | **wartet auf Bedienung** — siehe [Offene Tische](#offene-tische) |

### Karte

![Der Tischplan an der Kasse, Farben nach Status](/img/screens/de/pos-floor.png)

Der [Tischplan aus der Verwaltung](./tische.md#tischplan) mit denselben Farben. Tippe den Tisch an, der geöffnet werden soll. Gibt es mehrere Bereiche, wählst du sie über Reiter oberhalb der Karte. Auf dem Telefon lässt sich die Karte seitlich wischen.

Die Karte wird nur angeboten, wenn ein freigegebener Bereich einen Plan hat. Beim ersten Start zeigt eine Kasse von selbst die Karte, wenn ihr Standardbereich einen Plan hat.

### Ohne Tisch: Theke und To-go

Unter dem Ziffernblock (bzw. unter Liste und Karte) stehen **Theke** und **To-go**. Damit buchst du ohne Tisch, etwa für jemanden, der direkt an der Theke kauft. To-go-Bestellungen bekommen den Vermerk „To-go“, damit Küche und Ausgabe sie erkennen.

### Offene Tische {/* #offene-tische */}

Rechts (am Telefon unter der Tischwahl) stehen alle Tische, an denen etwas offen ist — zuerst die wartenden, die ältesten oben. Jede Zeile zeigt den Betrag und den Grund:

- „2 Bestellungen offen“ — gesendet, aber noch nicht kassiert
- „3 Artikel nicht gesendet“ — ein [geparkter Warenkorb](#tisch-wechseln) an dieser Kasse
- **Gastbestellung** · „wartet seit 4 Min.“ — ein Gast hat selbst bestellt (Online-Bestellung). Wer den Tisch öffnet, bestätigt damit, dass sich jemand kümmert; der Tisch ist danach nicht mehr gelb.
- **Fertig zum Servieren** — Küche oder Theke haben Positionen als fertig gemeldet; sie müssen an den Tisch. Siehe [Serviert](#serviert).

Ein Tipp auf die Zeile öffnet den Tisch.

## Bestellen

![Bestellansicht mit Kategorien, Artikeln und Warenkorb](/img/screens/de/pos-order.png)

1. **Kategorie wählen** — links. Ganz oben stehen die **Favoriten**, sofern in der Verwaltung welche markiert sind ([Produkte](./produkte.md#favoriten)).
2. **Artikel antippen** — jeder Tipp legt einen weiteren in den Warenkorb; die Zahl auf der Kachel zeigt, wie viele es sind. Die Lupe oben rechts **sucht** über alle Artikel.
3. **Menge ändern** — im Warenkorb mit **−** und **+**. Bei einem Stück wird aus dem Minus ein Papierkorb.

Auf den Kacheln steht unter dem Namen die erste Zeile der Beschreibung (etwa „0,5 l“), rechts das Produktbild bzw. das Icon der Kategorie. Kleine Zeichen unten rechts sagen: Der Artikel hat **Optionen**, oder es kommt **Pfand** dazu. Wird der Bestand knapp, steht „noch 3“ auf der Kachel; ausverkaufte Artikel sind ausgegraut.

### Optionen und Notizen

![Optionen eines Artikels mit Notiz für die Küche](/img/screens/de/pos-options.png)

Hat ein Artikel Optionen, öffnet sich beim Antippen ein Fenster:

- Optionen wählst du als Schaltflächen; Aufpreise stehen dabei. „mehrere möglich“ erlaubt mehrere, **Pflicht** muss gewählt sein, bevor es weitergeht.
- Bei **Zutaten** sind alle vorausgewählt; was abgewählt wird, kommt als „ohne …“ auf den Bon.
- **Notiz für die Küche** — zum Beispiel „gut durch“.
- Unten Menge und **Hinzufügen** mit dem Preis.

Tippst du später auf eine noch nicht gesendete Zeile im Warenkorb, öffnet sich dasselbe Fenster zum Ändern.

### Der Warenkorb

Der Warenkorb rechts gehört zum geöffneten Tisch. Er hat bis zu zwei Abschnitte:

- **Gesendet** — was für diesen Tisch schon an Küche und Theke ging, mit Zustand: *gesendet*, *fertig* oder *serviert*. Diese Zeilen kannst du hier nicht mehr ändern; stornieren geht über den [Bestellverlauf](#bestellverlauf).
- **Neu** — was du gerade eintippst.

Darunter die Summen, eine Zeile je Pfandart (etwa „Becherpfand (3 à 2,00 €)“) und **Gesamt**. Wird Pfand berechnet, zeigt ein grünes Feld, wie viele **Pfandmarken** du ausgeben musst. Der Papierkorb oben leert nur die neuen Zeilen; ab drei Zeilen fragt die Kasse vorher nach.

## Senden oder kassieren {/* #senden-oder-kassieren */}

Unten im Warenkorb stehen ein oder zwei Knöpfe. Welche, entscheidet der **Kassiermodus** der [Veranstaltung](./veranstaltungen.md#kassiermodus):

| Kassiermodus | Knöpfe | So läuft es |
|---|---|---|
| **Sofort kassieren** | **Kassieren** | Bestellen und bezahlen in einem Zug. Erst mit dem Bezahlen entsteht die Bestellung und geht an Küche und Theke. |
| **Auf Deckel buchen** | **Senden** und **Kassieren** | **Senden** schickt die neuen Artikel an Küche und Theke, ohne zu kassieren; sie stehen danach unter *Gesendet*, und der Tisch ist offen. Später, oft nach mehreren Runden, kassierst du alles auf einmal. |

**Kassieren** rechnet immer alles ab, was am Tisch offen ist: alle gesendeten, noch nicht bezahlten Bestellungen und die neuen Artikel. Neue Artikel werden dabei automatisch mitgesendet.

Nach dem Senden bleibt der Tisch geöffnet, damit du weiter bestellen kannst. Nach dem Kassieren geht es zurück zu **Tisch öffnen**; an der Theke bleibt die leere Bestellansicht stehen.

### Offene Bestellungen an der Theke

Wird **auf Deckel gebucht** und ohne Tisch verkauft (Feste Kasse oder Thekenbetrieb), gibt es keine Tische, unter denen offene Bestellungen stehen. Dafür gibt es im Mehr-Menü und am Warenkorb **Offene Bestellungen**: eine Liste aller offenen Bestellungen ohne Tisch. Du wählst eine oder mehrere aus und kassierst sie zusammen.

## Serviert {/* #serviert */}

Meldet die Küche oder die Theke Positionen eines Tisches als **fertig**, wird der Tisch gelb („wartet auf Bedienung“). Öffnest du ihn, steht über dem Warenkorb zum Beispiel „2 Artikel fertig zum Servieren“. Wenn das Essen am Tisch steht, tippst du auf **Serviert** — die Positionen gelten dann als ausgeliefert, und der Tisch ist wieder grün oder frei.

## Kassieren {/* #kassieren */}

![Kassieren: Betrag, Zahlart, Gegeben und Rückgeld](/img/screens/de/pos-pay.png)

**Kassieren** öffnet das Kassieren-Fenster. Links steht, was **zu zahlen** ist (mit dem enthaltenen Pfand), darunter die **Zahlart**.

### Bar

- **Gegeben** über den Ziffernblock eintippen oder eine **Schnellwahl** antippen: **Passend** oder die nächsten runden Beträge.
- Die Kasse zeigt das **Rückgeld** — oder in Rot, was noch fehlt.
- Ist eine Kassenlade angeschlossen, öffnet sie sich, sobald Bar gewählt ist.
- **Zahlung abschließen** bucht die Zahlung.

### Karte

Mit einem zugewiesenen SumUp-Kartenleser erscheint **Karte**. Du wählst ein **Trinkgeld** (kein, aufrunden, feste Beträge oder ein eigener Betrag) und tippst auf **Kartenzahlung starten**. Der Gast legt die Karte an den Leser; die Kasse wartet auf die Bestätigung. Mehr dazu unter [SumUp](./integrationen/sumup.md).

:::warning[Karte bezahlt, Bestellung nicht gespeichert]
Erst wird das Geld abgebucht, dann die Bestellung gespeichert. Scheitert das Speichern (etwa weil die Verbindung abreißt), zeigt die Kasse „Kartenzahlung erfolgreich, Bestellung nicht gespeichert“ mit der Vorgangsnummer. Tippe dann **Erneut speichern** — und **kassiere nicht noch einmal**. Der Hinweis bleibt auch nach einem Neuladen stehen.
:::

### Rabatt

Sind [Rabatt-Bons](./rabatt-bons.md) eingerichtet, erscheint **Rabatt**. Du wählst einen Bon — feste Bons ziehen ihren Betrag ab, bei „Betrag eingeben“ tippst du ihn ein. Angewandte Bons stehen links unter dem Betrag und lassen sich dort wieder entfernen. Danach wählst du Bar oder Karte für den Rest. Deckt der Rabatt alles, heißt der Knopf **Ohne Zahlung abschließen**.

### Rechnung teilen

Am Tisch gibt es unter den Zahlarten **Rechnung teilen**. Du wählst die Positionen aus, die ein Gast bezahlt — nach Bestellung oder nach Kategorie sortiert — und kassierst sie bar oder mit Karte. Das wiederholst du, bis nichts mehr offen ist. Neue, noch nicht gesendete Artikel werden vorher gesendet.

Ohne SumUp-Leser bieten *Rechnung teilen* und *Offene Bestellungen* die Zahlart „Karte“ mit dem Zusatz *ext. Terminal* an: Du kassierst am eigenen Kartenterminal und buchst die Zahlung hier.

### Abschluss

![Abschluss mit Rückgeld und Bon](/img/screens/de/pos-done.png)

Nach dem Bezahlen zeigt die Kasse **Bezahlt** mit Betrag, Zahlart und Rückgeld und darunter den Bon. **Bon drucken** schickt ihn an den Bondrucker (druckt der Drucker ohnehin bei jeder Zahlung, heißt der Knopf **Bon erneut drucken**). **Nächster Bon** geht weiter. Ohne Rückgeld schließt sich das Fenster nach fünf Sekunden von selbst; mit Rückgeld bleibt es stehen, bis du das Geld herausgegeben hast.

## Tisch wechseln und parken {/* #tisch-wechseln */}

![Tisch wählen mit allen Tischen und „Warenkorb mitnehmen“](/img/screens/de/pos-switch.png)

Ein Tipp auf die Tisch-Pille im Kopf öffnet **Tisch wählen**: dieselben Tische wie beim Öffnen, der aktuelle umrandet, dazu Theke und To-go.

Wechselst du den Tisch, **parkt** die Kasse den Warenkorb des alten Tisches. Kommst du zurück, ist er wieder da. Geparkte Warenkörbe stehen unter **Offene Tische** mit „… Artikel nicht gesendet“. Hast du Artikel am falschen Tisch eingetippt, setzt du vor dem Wechsel den Haken bei **Warenkorb mitnehmen** — dann ziehen die neuen Artikel mit um. **Zur Tischübersicht** führt zurück zu **Tisch öffnen**.

:::note[Geparkt heißt: nur an dieser Kasse]
Nicht gesendete Artikel liegen nur auf dem Gerät, an dem sie eingetippt wurden. Was andere Kassen sehen sollen, sendest du. Gesendete Bestellungen sind an jeder Kasse sichtbar und lassen sich dort kassieren.
:::

## Anmelden und sperren {/* #pin-und-sperre */}

Ist für die Kasse **PIN erforderlich** eingestellt ([Geräte](./geraete.md#pin-und-sperre)), fragt sie beim Start nach einer PIN. Jedes Mitglied hat seine eigene PIN mit 4 bis 6 Ziffern ([Mitglieder](./mitglieder.md)); so ist bei jeder Bestellung klar, wer sie aufgenommen hat.

Rechts oben stehen dann Initialen und Name. Das **Schloss** daneben sperrt die Kasse: Der PIN-Bildschirm erscheint, bis jemand seine PIN eingibt. Warenkorb, geparkte Tische und der geöffnete Tisch bleiben dabei erhalten. Nach einem Neuladen fragt die Kasse die PIN erneut ab.

Ohne PIN gibt es keinen Bediener und kein Schloss.

## Bestellverlauf {/* #bestellverlauf */}

Im Mehr-Menü öffnet **Bestellverlauf** die Bestellungen der laufenden Veranstaltung, filterbar nach **Alle**, **Offen**, **Abgeschlossen** und **Storniert**. Dort kannst du Küchenbons und Quittung **nachdrucken** und eine Bestellung **stornieren** (mit optionalem Grund).

## Pfand {/* #pfand */}

Hat ein Artikel [Pfand](./pfand.md), rechnet die Kasse es automatisch dazu — je nach Einstellung an der Theke, am Tisch oder bei beidem. Lässt ein Gast nur nachfüllen, stellst du im Optionen-Fenster der Zeile **Nachfüllen** ein; dafür fällt kein neues Pfand an.

Für zurückgebrachte Becher oder Flaschen gibt es die **Pfand-Rückgabe** (Mehr-Menü oder der Knopf oben im Warenkorb): Du zählst je Pfandart, wie viele zurückkommen, und wählst

- **Auszahlen** — der Gast bekommt das Geld bar zurück, die Kassenlade öffnet sich, oder
- **Verrechnen** — der Betrag wird vom aktuellen Warenkorb abgezogen (nur, wenn gerade etwas im Warenkorb liegt).

## Am Telefon und Tablet

<img src="/img/screens/de/pos-phone.png" alt="Die Kasse auf dem Telefon mit Warenkorb-Leiste" width="320" />

Die Kasse passt sich der Bildschirmbreite an:

- **Tablet quer und PC** — Kategorien links, Artikel in der Mitte, Warenkorb rechts.
- **Telefon und Tablet hochkant** — die Kategorien liegen als Leiste oben, der Warenkorb ist unten eine grüne **Leiste** mit Anzahl und Summe. Ein Tipp darauf öffnet ihn von unten; nach unten wischen schließt ihn. Fenster wie Kassieren öffnen sich ebenfalls von unten.

## Wenn die Verbindung abreißt

Die Kasse braucht eine Verbindung. Wie es um sie steht, zeigt der Status oben rechts:

- **Verbinde …** — die Live-Verbindung ist kurz weg. Du kannst normal weiterarbeiten.
- **Keine Live-Daten** — die Live-Verbindung fehlt länger, die Kasse fragt den Server regelmäßig selbst ab. Die Zustände der Tische können etwas hinterherhinken; unter *Offene Tische* steht dann „Stand …“ mit der Uhrzeit.
- **Offline** — keine Verbindung. Unter dem Kopf steht „Keine Verbindung – Senden und Kassieren gehen erst wieder, wenn die Kasse online ist.“ Artikel eintippen, Tische wechseln und parken geht weiter; **Senden**, **Kassieren** und Pfand auszahlen sind gesperrt.

Bestellungen werden **nicht** zwischengespeichert und später nachgeschickt. Plane das ein: Ein Zelt am Rand der Funkabdeckung ist der häufigste Grund für einen Stillstand. Prüfe den Empfang **vor** dem Fest an jedem Ort, an dem eine Kasse stehen soll.

Kassieren zwei Geräte gleichzeitig denselben Tisch, gewinnt das erste; das zweite meldet „Der Tisch wurde gerade an einem anderen Gerät kassiert.“ und zeigt den neuen Stand.

## Kasse abmelden

**Gerät abmelden** im Mehr-Menü trennt das Gerät nach einer Rückfrage von der Organisation. Es muss danach [neu verbunden](./geraete.md) werden — das ist nichts für zwischendurch. Um die Kasse kurz zu verlassen, nutze das [Schloss](#pin-und-sperre).
