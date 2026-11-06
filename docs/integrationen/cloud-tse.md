---
title: Cloud-TSE
description: Cloud-TSE für Bargeld in Deutschland — Voraussetzungen, automatische Einrichtung, Laufzeit im Monat der Veranstaltung, TSE-Angaben auf dem Bon, Ausfälle, Exporte für die Kassen-Nachschau und Deaktivieren.
---

# Cloud-TSE

Eine Kasse, mit der du Bargeld annimmst, braucht in Deutschland eine zertifizierte **technische Sicherheitseinrichtung (TSE)** nach der Kassensicherungsverordnung (KassenSichV). Die TSE signiert jeden Kassenvorgang, damit sich die Aufzeichnungen später nicht unbemerkt ändern lassen.

OpenEOS bindet dafür die **Swissbit Cloud-TSE 2** an. Du brauchst keine Hardware: Deine Organisation bekommt **eine** TSE, und alle Geräte (Tablets, Handys) sind Eingabegeräte **einer** gemeinsamen Kasse. Mit aktiver TSE kannst du die [Betriebsart](../betriebsarten.md) **Alle Funktionen** mit Bargeld wählen.

:::info[Nur Deutschland]
Die Cloud-TSE gibt es nur für Organisationen in Deutschland. In anderen Ländern steht die Integration als **Nur für Deutschland** im Katalog. Was dort gilt, steht unter [Österreich, Schweiz und andere Länder](../betriebsarten.md#andere-laender).
:::

## Was du brauchst

- eine Organisation in **Deutschland**,
- eine **bezahlte Veranstaltung**: Eine TSE kostet für jeden Monat, in dem sie läuft. OpenEOS legt sie deshalb erst an, wenn eine bezahlte Veranstaltung ansteht – frühestens im **Kalendermonat ihres Beginns** – und meldet sie zum Monatsende wieder ab (siehe [Laufzeit](#laufzeit)),
- **Internet** an den Kassen. Fällt die TSE einmal aus, kassierst du trotzdem weiter (siehe [Ausfall](#ausfall)),
- **Steuernummer** oder **USt-IdNr.** und die **Anschrift** deiner Organisation ([Steuerangaben](../organisation.md#steuerangaben)). Sie gehören in jeden Kassenabschluss. Bei der Registrierung fragen wir sie nicht ab: Fehlen sie, fragt der **Bezahldialog** sie beim Kauf der Veranstaltung ab (siehe [Angaben beim ersten Kauf](../veranstaltungen.md#pflichtangaben)), sonst die Seite Cloud-TSE vor dem Einrichten.

## Automatisch beim Kauf einer Veranstaltung {/* #automatisch */}

Meist musst du gar nichts tun: Schaltest du in der Betriebsart **Alle Funktionen** eine Veranstaltung frei (bezahlt, auf Rechnung oder vom Support erlassen), schaltet OpenEOS die Integration **Cloud-TSE** selbst ein. Im Bezahldialog steht dazu *Inklusive Cloud-TSE für Bargeld – wird automatisch eingerichtet*, und auf der Seite **Cloud-TSE** steht danach *Automatisch eingeschaltet beim Kauf von „…“*. Die TSE selbst wird zum ersten Veranstaltungstag eingerichtet (siehe [Einrichtung](#einrichtung)) – sofort, wenn die Veranstaltung schon läuft.

- **Alle Funktionen (Bestand):** Der Bezahldialog fragt *Mit Cloud-TSE (Bargeld rechtssicher)?* Mit **Ja** wird deine Betriebsart beim Freischalten zu **Alle Funktionen** und die TSE folgt automatisch. Mit **Nein** bleibt alles, wie es ist.
- **Bargeldlos:** Wechselst du mit einer bezahlten Veranstaltung zu **Alle Funktionen**, schaltet OpenEOS die Integration ebenfalls selbst ein (siehe [Betriebsarten](../betriebsarten.md#alle-funktionen)).
- **Nur Bons** und Organisationen außerhalb Deutschlands bekommen keine TSE.

**Kosten:** Die Cloud-TSE ist derzeit im Preis der Veranstaltung **inklusive** – es gibt keinen Aufschlag.

## Laufzeit: der Monat deiner Veranstaltung {/* #laufzeit */}

**Die TSE läuft für den Monat deiner Veranstaltung und wird zum Monatsende automatisch abgemeldet.** So zahlst du keinen Monat ohne Veranstaltung.

- Hast du im selben Monat **mehrere Veranstaltungen**, nutzen alle dieselbe TSE.
- Am **letzten Tag des Monats um 20:00 Uhr** meldet OpenEOS die TSE ab. Vorher holt es den Abschlussexport ab und schließt die abgelaufenen Geschäftstage ab (Kassenabschluss). Den Rest exportiert die TSE beim Abmelden selbst; OpenEOS holt ihn ab und archiviert ihn.
- Die Seite **Cloud-TSE** zeigt den Termin unter **Automatische Abmeldung**. Die Admins bekommen nach dem Abmelden eine E-Mail.
- Danach nehmen deine Kassen in Deutschland **kein Bargeld** an, bis die nächste bezahlte Veranstaltung beginnt. Für sie richtet OpenEOS automatisch eine **neue TSE** mit neuer Seriennummer ein. Bons und Exporte der alten TSE bleiben abrufbar.
- **Folgemonat schon gebucht:** Hast du für den nächsten Monat schon eine **bezahlte Veranstaltung** (bezahlt oder auf Rechnung freigeschaltet), bleibt die TSE einfach aktiv, statt abgemeldet und neu eingerichtet zu werden. Das spart die neue Einrichtung und eine weitere Mitteilung ans Finanzamt; Seriennummer und Kasse bleiben gleich. Zum Ende dieses Monats prüft OpenEOS dasselbe wieder. Auf der Seite steht dann zum Beispiel *Bleibt im Dezember aktiv, weil „Weihnachtsmarkt“ schon gebucht ist* und darüber der neue Termin (*am 31. Dezember 2026, 20:00 Uhr*).
  - Entschieden wird am Monatsletzten um 20:00 Uhr. Buchst du die Veranstaltung erst an diesem Tag, zählt sie noch, wenn sie bis dahin bezahlt bzw. freigeschaltet ist.
  - Stornierst du die Veranstaltung im Folgemonat (oder wird sie erstattet), bevor der Monat wechselt, meldet OpenEOS die TSE wie gewohnt zum Monatsende ab.
  - Kassenabschlüsse laufen wie immer, die Exporte holt OpenEOS weiter jede Nacht ab. Ein Abschlussexport ist nicht nötig, weil die TSE weiterläuft.
  - Nur der direkt folgende Monat zählt: Liegt dazwischen ein Monat ohne Veranstaltung, wird die TSE abgemeldet und für die spätere Veranstaltung neu eingerichtet.
- **Ausnahme:** Läuft zum Abmeldetermin gerade eine bezahlte Veranstaltung – auch nur ihr Geschäftstag (6 bis 6 Uhr), etwa ein Fest am Monatsletzten oder über den Monatswechsel –, bleibt die TSE bis zum Ende des **nächsten** Monats. Den zusätzlichen Monat trägt OpenEOS, dir wird dafür nichts berechnet; auf der Seite steht dann *Verschoben, weil „…“ über das Monatsende läuft*.

## 1. Integration selbst aktivieren

Du kannst die Integration auch vorab selbst einschalten:

1. In der Seitenleiste **Integrationen** öffnen und auf **Cloud-TSE** klicken.
2. Im Fenster auf **Aktivieren** klicken.

In der Seitenleiste erscheint jetzt der Eintrag **Cloud-TSE**. Das Aktivieren kostet noch nichts – es sagt nur, dass deine Organisation eine TSE möchte.

## 2. Einrichtung – meist automatisch {/* #einrichtung */}

Auf der Seite **Cloud-TSE** siehst du, welche Voraussetzungen erfüllt sind: Organisation in Deutschland, bezahlte Veranstaltung und der früheste Tag der Einrichtung.

![Einrichtung der Cloud-TSE](/img/screens/de/integrations-tse-setup.png)

- **Automatisch:** Am ersten Veranstaltungstag richtet OpenEOS die TSE selbst ein. Du musst nichts weiter tun.
- **Selbst:** Willst du vorher testen, klickst du im Monat der Veranstaltung auf **Jetzt einrichten**. Das dauert meist nur wenige Sekunden; die Seite aktualisiert sich von selbst.

Ist die TSE aktiv, wird aus **Bargeldlos** automatisch **Alle Funktionen**: Deine Kassen nehmen ab sofort Bargeld an. Der Wechsel steht im Verlauf der Betriebsart.

:::tip[Die Einrichtung ist fehlgeschlagen?]
Dann steht auf der Seite **Einrichtung fehlgeschlagen** mit dem Fehler. Mit **Erneut versuchen** startest du sie noch einmal. Hilft das nicht, melde dich beim Support.
:::

## Die Seite Cloud-TSE

![Cloud-TSE aktiv](/img/screens/de/integrations-tse.png)

- **Cloud-TSE**: Zustand (**Aktiv** oder **Gestört**), Seriennummer (gekürzt, mit Kopierknopf), die Kasse (Client-ID `OEOS-…`), Produkt, die **automatische Abmeldung** zum Monatsende, Speicher, Signaturen im Monat, Ablauf des Zertifikats und der letzte Export.
- **Ausfallprotokoll**: Zeiträume, in denen die TSE nicht signiert hat.
- **Vorgänge**: alle signierten, ausgefallenen und Trainingsbuchungen. Ein Klick zeigt die TSE-Angaben mit QR-Code, so wie auf dem Bon.
- **Kassen-Nachschau**: DSFinV-K- und TSE-Export für einen Zeitraum, die Kassenabschlüsse und die Einstellung zum Trinkgeld – siehe [Kassen-Nachschau und DSFinV-K](../kassen-nachschau.md).
- **Exporte**: die archivierten TSE-Daten zum Herunterladen.
- **Gefahrenzone**: die TSE endgültig deaktivieren.

## Was auf dem Bon steht {/* #bon */}

Bei aktiver TSE stehen auf jedem Kassenbon und Gegenbeleg die TSE-Angaben – gedruckt und in der Bon-Vorschau an der Kasse:

- **Kassen-ID** (die Seriennummer der Kasse, `OEOS-…`),
- **TSE-Seriennummer** und **Signatur**, vollständig,
- **Transaktionsnummer** und **Signaturzähler**,
- **Start** und **Ende** des Vorgangs (UTC, so wie die TSE sie liefert),
- Signatur-Algorithmus und Zeitformat,
- ein **QR-Code** mit allen Angaben nach DSFinV-K. Prüfer können ihn mit einer Prüf-App einlesen.

![Bon-Vorschau mit TSE-Angaben](/img/screens/de/pos-tse-receipt.png)

Die TSE-Angaben lassen sich nicht abwählen. Hast du eine eigene Bon-Vorlage gestaltet, hängt OpenEOS sie automatisch an. Ein **Nachdruck** zeigt dieselbe Signatur wie der erste Bon.

Im **Testmodus** einer Veranstaltung werden Buchungen als **Training** signiert. Auf dem Bon steht dann **TRAININGSBUCHUNG – KEIN VERKAUF**. Trainingsbuchungen bleiben gespeichert, auch wenn die Testbestellungen beim Aktivieren der Veranstaltung gelöscht werden.

Unter **Bestellungen** siehst du als Admin in jeder Bestellung den Abschnitt **Cloud-TSE** mit den Vorgängen dieser Bestellung und dem QR-Code.

## Wenn die TSE ausfällt {/* #ausfall */}

Antwortet die TSE nicht (z. B. kein Internet oder eine Störung beim Anbieter), **kassierst du weiter**. Der Bon bekommt statt der Signatur den Vermerk **TSE ausgefallen**, und die Kasse zeigt oben einen Hinweis:

> TSE ausgefallen – du kannst weiter kassieren, der Bon wird gekennzeichnet.

OpenEOS trägt den Ausfall ins **Ausfallprotokoll** ein und schickt den Admins einmal eine E-Mail. Sobald der nächste Vorgang wieder signiert ist, endet der Ausfall und der Hinweis an der Kasse verschwindet. Nachträglich signiert wird nicht – das ist so vorgesehen.

## Exporte und Kassen-Nachschau {/* #export */}

OpenEOS holt die Daten der TSE **jede Nacht** ab (TAR-Datei nach TR-03153) und archiviert sie **zehn Jahre**. Unter **Exporte** siehst du Zeitraum, Größe und Prüfsumme (SHA-256) jedes Exports. Zusätzlich entsteht für jeden Geschäftstag ein **Kassenabschluss** mit dem DSFinV-K-Export.

Kommt das Finanzamt zur **Kassen-Nachschau** oder Prüfung, lädst du im Abschnitt **Kassen-Nachschau** den **DSFinV-K-Export** und den **TSE-Export (TAR)** für den gewünschten Zeitraum herunter. Was genau du übergibst, steht unter [Kassen-Nachschau und DSFinV-K](../kassen-nachschau.md).

## Deaktivieren {/* #deaktivieren */}

Zum Monatsende meldet OpenEOS die TSE selbst ab (siehe [Laufzeit](#laufzeit)) – dafür musst du nichts tun. Eine Pause gibt es bei der TSE nicht. Unter **Gefahrenzone → TSE deaktivieren** nimmst du sie **endgültig** außer Betrieb, zum Beispiel wenn dein Verein OpenEOS nicht mehr mit Bargeld nutzt:

- Die TSE kann danach nie wieder signieren.
- Die restlichen Daten werden automatisch exportiert und archiviert (Abschlussexport).
- In Deutschland nehmen deine Kassen sofort kein Bargeld mehr an.
- Die Integration **Cloud-TSE** wird ausgeschaltet.
- Für eine spätere Veranstaltung richtest du eine **neue TSE** mit neuer Seriennummer ein.

Du bestätigst das Deaktivieren mit einem Häkchen. Bons und Exporte der alten TSE bleiben zehn Jahre abrufbar. Deaktiviere die TSE nicht, solange eine Veranstaltung läuft.

Solange eine TSE eingerichtet ist, lässt sich die Integration nicht einfach über **Deaktivieren** ausschalten – OpenEOS verweist dann auf die Gefahrenzone.

:::note
Das ist keine Steuerberatung. Im Einzelfall entscheidet dein Finanzamt; bist du unsicher, sprich mit deiner Steuerberatung.
:::

## Siehe auch

- [Betriebsarten](../betriebsarten.md)
- [An der Kasse verkaufen](../kasse.md)
- [Kassen-Nachschau und DSFinV-K](../kassen-nachschau.md)
- [Kassenbuch](../kassenbuch.md)
- [FAQ auf openeos.de: Kasse, Bargeld und TSE](https://openeos.de/faq#tse)
