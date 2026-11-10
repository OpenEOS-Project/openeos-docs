---
sidebar_position: 19
title: Konto, Newsletter und Löschung
description: Konto löschen, Neuigkeiten per E-Mail abbestellen und was passiert, wenn eine Organisation gelöscht wird.
---

# Konto, Newsletter und Löschung

Hier steht, wie du dein Konto löschst, Neuigkeiten per E-Mail an- oder abbestellst, was mit den Daten passiert, wenn eine Organisation gelöscht wird, und welche Daten OpenEOS [von selbst löscht](#fristen). Die rechtlichen Grundlagen findest du in den [AGB](https://openeos.de/agb) (Ziffer 10.4, 15.10 und 20.5), im [Auftragsverarbeitungsvertrag](https://openeos.de/avv) (Ziffer 10) und in der [Datenschutzerklärung](https://openeos.de/datenschutz).

## Neuigkeiten per E-Mail {/* #newsletter */}

Bei der Registrierung kannst du freiwillig ankreuzen, dass du gelegentlich Neuigkeiten zu OpenEOS bekommen möchtest. Unter **Einstellungen → Persönlich → Konto → Neuigkeiten per E-Mail** gibst du diese Einwilligung jederzeit oder widerrufst sie mit dem Schalter. Darunter siehst du, wann du eingewilligt bzw. widerrufen hast; beide Zeitpunkte speichern wir als Nachweis.

Jede Neuigkeiten-Mail enthält außerdem einen Abmeldelink. Er führt auf eine Seite, auf der du mit **Abmelden** widerrufst – auch ohne Anmeldung. E-Mails zu deinem Konto (zum Beispiel Anmeldelinks, Rechnungen oder Löschankündigungen) bekommst du weiterhin.

## Konto löschen {/* #konto-loeschen */}

Unter **Einstellungen → Persönlich → Konto → Konto löschen** löschst du dein Benutzerkonto selbst.

![Konto löschen in den persönlichen Einstellungen](/img/screens/de/settings-account.png)

1. Klicke auf **Konto löschen …**. Der Dialog zeigt, was passiert:
   - Name, E-Mail-Adresse, Passwort, Zwei-Faktor-Anmeldung, Sitzungen und API-Tokens werden entfernt, du wirst abgemeldet.
   - Du verlierst den Zugang zu allen Organisationen.
   - Hast du an der Kasse gebucht, bleibt dein Name als Bediener im Steuerarchiv der Organisation zehn Jahre erhalten (gesetzliche Aufbewahrungspflicht).
2. Bestätige mit deinem Passwort. Hast du kein Passwort (du meldest dich nur mit Anmeldelink an), klicke auf **Code senden** und gib den Code aus der E-Mail ein.
3. Du bekommst eine Bestätigung per E-Mail.

Das Löschen lässt sich nicht rückgängig machen. In unseren Datensicherungen laufen die Daten nach höchstens acht Wochen aus.

### Wann das Löschen gesperrt ist

- **Du bist der letzte Administrator einer Organisation**, die noch weitere Mitglieder, eine laufende oder bezahlte kommende Veranstaltung oder eine aktive Cloud-TSE hat. Ernenne unter [Mitglieder](./mitglieder.md) zuerst eine andere Person zum Administrator, verlasse die Organisation oder lösche sie (siehe unten).
- **Du hast Kassenvorgänge gebucht, die noch keinem Kassenabschluss zugeordnet sind.** Bitte deinen Verein, zuerst den Kassenabschluss zu erstellen.
- **Super-Admin-Konten** lassen sich nicht selbst löschen.

### Als einziges Mitglied: Konto und Organisation gemeinsam {/* #einziges-mitglied */}

Bist du das **einzige Mitglied** einer Organisation ohne laufende Veranstaltung, wird sie mit deinem Konto gelöscht. Damit du ihre Daten trotzdem noch exportieren kannst, löschen wir dann nicht sofort, sondern erst nach der Exportfrist von 30 Tagen – Konto und Organisation am selben Tag. Der Dialog nennt dir den Termin.

Bis dahin gilt:

- Du kannst dich weiter anmelden. Auf jeder Seite steht oben:

  > Dein Konto und die Organisation „…“ werden am … endgültig gelöscht. Du kannst bis dahin alle Daten exportieren.

- Die Organisation ist nur noch lesend nutzbar – du kannst alles ansehen und exportieren, wie unter [30 Tage nur lesend](#nur-lesend) beschrieben.
- Neue Organisationen anlegen oder anderen beitreten kannst du nicht mehr. Mitgliedschaften in anderen Organisationen und deine API-Tokens entfernen wir sofort.
- Du bekommst gleich eine Bestätigung mit dem Termin und **10 Tage** sowie **einen Tag** vorher eine Erinnerung per E-Mail.
- Mit **Löschung abbrechen** im Hinweis oben (oder unter **Einstellungen → Persönlich → Konto**) holst du Konto und Organisation zurück, solange sie noch nicht endgültig gelöscht sind. Entfernte Mitgliedschaften in anderen Organisationen und API-Tokens kommen dabei nicht zurück.

Am Termin löschen wir die Daten der Organisation endgültig (siehe [Endgültige Löschung](#endgueltig)) und danach dein Konto. Du bekommst eine letzte Bestätigung per E-Mail.

## Organisation löschen {/* #organisation-loeschen */}

Administratoren löschen eine Organisation unter **Einstellungen → Organisation → Allgemein → Organisation löschen**. Zur Bestätigung tippst du den Namen der Organisation ein.

![Organisation löschen: Bestätigung mit dem Namen](/img/screens/de/settings-organisation-delete.png)

Dasselbe passiert, wenn OpenEOS ein Kundenkonto nach 24 Monaten ohne Buchung schließt (AGB 15.10) – das kündigen wir 30 Tage vorher per E-Mail an die Administratoren an und erinnern 10 Tage und einen Tag vor der Schließung noch einmal. Buchst du bis dahin eine Veranstaltung, bleibt die Organisation bestehen.

### 30 Tage nur lesend: Daten exportieren {/* #nur-lesend */}

Nach dem Löschen bleibt die Organisation für ihre **Administratoren** noch sichtbar, aber **nur lesend**. Auf jeder Seite steht oben:

> Diese Organisation wird am … endgültig gelöscht. Du kannst bis dahin alle Daten exportieren.

In dieser Zeit kannst du alles ansehen und exportieren:

- [Auswertung](./auswertung.md) mit CSV- und PDF-Export,
- [Bestellungen](./bestellungen.md) ansehen und als CSV exportieren, [Kassenbuch](./kassenbuch.md) ansehen,
- mit [Cloud-TSE](./integrationen/cloud-tse.md): DSFinV-K-Export, Kassenabschlüsse und TSE-Exporte. Einen fehlenden Kassenabschluss kannst du noch erstellen.

Ändern lässt sich nichts mehr: Speichern, Buchen, neue Veranstaltungen und Ähnliches lehnt OpenEOS ab. Kassen, Anzeigen und andere Geräte der Organisation funktionieren nicht mehr, Shop, Bestellung am Tisch und Helferseiten sind nicht mehr erreichbar. Mitglieder ohne Administratorrechte sehen die Organisation nicht mehr.

### E-Mails vor der endgültigen Löschung {/* #erinnerungen */}

Die Administratoren bekommen drei E-Mails: eine Ankündigung mit dem Termin (in der Nacht nach dem Löschen, 30 Tage vorher) und Erinnerungen **10 Tage** und **einen Tag** vorher. Jede nennt den Termin, was gelöscht wird, was bleibt, wie du exportierst und wie du abbrichst. Hat die Organisation keinen Administrator mehr, geht die E-Mail an die Rechnungsadresse.

### Löschung abbrechen {/* #abbrechen */}

Bis zur endgültigen Löschung kann jeder Administrator die Löschung zurücknehmen: im Hinweis oben auf jeder Seite auf **Löschung abbrechen** klicken und bestätigen. Die Organisation ist danach wieder voll nutzbar, die endgültige Löschung entfällt. Das gilt auch für Organisationen, die wegen Inaktivität geschlossen wurden.

Wurde die Organisation zusammen mit deinem Konto gelöscht, brichst du stattdessen die [Löschung deines Kontos](#einziges-mitglied) ab.

### Endgültige Löschung {/* #endgueltig */}

Nach Ablauf der Exportfrist löschen wir Artikel, Einstellungen, Bestellungen, Schichtpläne, Geräte, Zugänge und Mitgliedschaften endgültig. Erhalten bleiben:

- das **Steuerarchiv** (TSE-Exporte, Kassenabschlüsse mit DSFinV-K-Export, signierte Kassenvorgänge, [Bewirtungsbelege](./bewirtungsbeleg.md) mit ihren Bestellungen) für die gesetzliche Frist von zehn Jahren, abrufbar über den Support,
- die Abrechnung der Nutzungstage (Rechnungen) für die gesetzlichen Fristen.

### Früher löschen lassen

Willst du nicht 30 Tage warten – zum Beispiel nach einem Wechsel zu einem anderen Anbieter –, schreib uns an [hello@openeos.de](mailto:hello@openeos.de). Wir löschen die Organisation dann sofort endgültig und bestätigen dir das per E-Mail. Für das Steuerarchiv gilt dasselbe wie oben: Es bleibt erhalten. Solange die Cloud-TSE noch aktiv ist oder Kassenvorgänge ohne Kassenabschluss offen sind, geht das noch nicht.

### Protokoll

Jede Löschung steht ohne Inhalte im Löschprotokoll von OpenEOS: wer wann was gelöscht hat und wie viele Datensätze, aber keine Namen, E-Mail-Adressen oder Notizen. Das gilt für die automatischen Löschläufe und für Löschungen, die ihr selbst auslöst – Organisation löschen oder Löschung abbrechen, Mitglieder entfernen, Schichtanmeldungen löschen (auch zusammen mit einem Schichtplan, Job oder einer Schicht), Konto löschen. Meldet sich ein Helfer über seinen Link selbst von einer Schicht ab, steht das ebenfalls darin.

## Automatische Löschfristen {/* #fristen */}

Manche Daten löscht OpenEOS auf [app.openeos.de](https://app.openeos.de) nach festen Fristen von selbst, ohne dass du etwas tun musst (auf einer eigenen Installation ist das anfangs aus, siehe [Aufbewahrung und Löschung](./selbst-betreiben/betrieb.md#aufbewahrung-und-löschung)):

- **Gästedaten** (Name, Telefonnummer, E-Mail-Adresse und Anmerkungen in Bestellungen, auch aus Shop und QR-Bestellung): 30 Tage nach dem Ende der Veranstaltung. Die Bestellungen selbst bleiben für Auswertung und Steuerarchiv erhalten, nur ohne diese Angaben. Exportierst du Bestellungen später, fehlen die Gästedaten darin.
- **Schichtanmeldungen** von Helfern (Name, Kontaktdaten, Notizen): 30 Tage nach der letzten Schicht des Schichtplans. Der Schichtplan mit seinen Schichten bleibt, zum Beispiel als Vorlage.
- **Bedienungen**: nach den Fristen unter [Bedienungen → Automatisch löschen](./bedienungen.md#loeschfristen).
- **Speisekarten-Importe** des [Assistenten](./assistent.md#datenschutz): hochgeladene Dateien nach spätestens 24 Stunden, der erkannte Vorschlag nach 30 Tagen.
- **Zustellprotokoll** der [Webhooks](./integrationen/webhooks.md#protokoll): nach 30 Tagen.
- **Support-Chat**: 12 Monate nach der letzten Nachricht und dem Ende der Nutzung.
- **Konten ohne Organisation**, die 24 Monate nicht genutzt wurden: Wir kündigen das per E-Mail an und anonymisieren das Konto frühestens 30 Tage später. Meldest du dich vorher an, bleibt es bestehen.

Organisationen ohne Buchung schließt OpenEOS nach 24 Monaten, wie unter [Organisation löschen](#organisation-loeschen) beschrieben. Was du darüber hinaus selbst exportieren willst, exportiere rechtzeitig. Wer OpenEOS selbst betreibt, legt die Fristen selbst fest.
