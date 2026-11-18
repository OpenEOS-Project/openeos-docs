---
sidebar_position: 8
title: Rechtstexte ändern (gehosteter Betrieb)
description: Neue Fassungen von AGB, Auftragsverarbeitungsvertrag, Datenschutzerklärung und Impressum ankündigen – für Super-Admins einer gehosteten Plattform.
---

# Rechtstexte ändern (gehosteter Betrieb)

Diese Seite richtet sich an Super-Admins einer **gehosteten** Plattform, auf der
Kunden die Rechtstexte des Betreibers annehmen (AGB mit Anlage 1, Auftragsverarbeitungsvertrag,
Datenschutzerklärung, Impressum). Im **Einzelbetrieb** (`DEPLOYMENT_MODE=selfhosted`)
gibt es diese Texte und die Funktion nicht.

## Wie es abläuft

1. **Neue Fassung veröffentlichen.** Lege die Datei auf der Website ab
   (`content/legal/de/<dokument>/<JJJJ-MM-TT>.md`). Das Datum der „Stand“-Zeile
   ist zugleich der Tag des Inkrafttretens. Die Fassung muss unter
   `<Website>/<pfad>/<JJJJ-MM-TT>` abrufbar sein, bevor du ankündigst. Die
   Website zeigt sie bis zum Stichtag als künftige Fassung („Diese Fassung gilt
   ab …“); unter `<Website>/<pfad>` und als `/rechtstexte/<dokument>.pdf` bleibt
   bis dahin die geltende Fassung, danach wechselt die Website ohne neues
   Deployment.
2. **Ankündigen.** Im Super-Admin-Bereich unter **Rechtstexte** wählst du die
   geänderten Dokumente, das Datum und schreibst kurz auf Deutsch (optional auf
   Englisch), was sich ändert. **Prüfen und Vorschau** prüft die Regeln unten,
   ob die Fassung auf der Website abrufbar ist, und zeigt die E-Mail.
   **Ankündigen und an … Admins senden** speichert die Ankündigung und
   verschickt die Mails.
3. **Bis zum Stichtag** sehen Admins im Dashboard einen Hinweis, den sie
   ausblenden können.
4. **Ab dem Stichtag** gilt die neue Fassung automatisch – ohne neues
   Deployment: bei Registrierung und Buchung angenommen wird dann sie, und
   Admins werden nach der Anmeldung gebeten, genau die geänderten Dokumente
   (AGB, Auftragsverarbeitungsvertrag bzw. Anlage 1) zu bestätigen.
   Festgehalten wird auch nur deren Annahme.

## Regeln beim Ankündigen

- **Frist:** AGB, Anlage 1 und Auftragsverarbeitungsvertrag mindestens sechs
  Wochen vor dem Stichtag; ändern sich vom Auftragsverarbeitungsvertrag nur
  Anhang B oder C (siehe unten), vier Wochen. Kürzer nur mit der Option
  **Kürzere Frist** für gesetzlich oder behördlich veranlasste Änderungen.
  Datenschutzerklärung und Impressum dürfen jedes künftige Datum haben.
- **Reihenfolge:** Das Datum muss nach der geltenden und nach jeder schon
  angekündigten Fassung des Dokuments liegen.
- **Ausgangsfassung:** Die Fassungen bis zum 18. November 2026 sind die erste
  Fassung. Sie werden nicht angekündigt und lösen keine erneute Bestätigung
  aus – auch nicht bei Konten, die vorher eine ältere Fassung angenommen haben.
- **Zustimmung oder Widerspruch:** Standardmäßig weist die Mail bei
  Vertragstexten auf das Widerspruchsrecht hin (Änderung gilt als angenommen,
  wenn nicht binnen sechs Wochen in Textform widersprochen wird). Brauchen
  Änderungen die ausdrückliche Zustimmung (z. B. Hauptleistungen, Vergütung),
  wähle **Ausdrückliche Zustimmung nötig**: Die Mail bittet dann um Zustimmung,
  und der Bestätigungsdialog lässt sich nicht verschieben.
- **Auftragsverarbeitungsvertrag:** Änderungen des AVV brauchen die Zustimmung
  des Kunden in Textform (AVV Ziffer 12.4). Ist der AVV dabei, verlangt die
  Prüfung deshalb **Ausdrückliche Zustimmung nötig** – außer du wählst **Nur
  Anhang B/C geändert (Verfahren nach AVV Ziffer 6.3)**. Das gilt, wenn sich
  nur die Unterauftragsverarbeiter (Anhang B) oder die technischen und
  organisatorischen Maßnahmen (Anhang C) ändern. Dann reicht eine Information
  mindestens vier Wochen vorher; die Mail weist auf das Widerspruchsrecht nach
  AVV Ziffer 6.3 hin (Widerspruch in Textform binnen vier Wochen nach Zugang,
  sonst gilt die Änderung als genehmigt; ohne Einigung binnen zwei Wochen kann
  jede Seite nach Ziffer 6.4 mit einem Monat zum Monatsende kündigen). Bei
  einem neuen Unterauftragsverarbeiter gehören Name, Anschrift, Leistung und
  Verarbeitungsort in die Zusammenfassung. Kommen AGB oder Anlage 1 in
  derselben Ankündigung mit, gelten für sie weiter sechs Wochen und ihr eigener
  Hinweis.
- Eine Ankündigung lässt sich nicht zurücknehmen oder ändern.

## Versand der E-Mails

- Die Mail geht an alle Admins aller nicht gelöschten Organisationen mit aktivem
  Konto, je E-Mail-Adresse einmal. Die Empfänger werden beim Ankündigen
  festgehalten.
- Versendet wird im Hintergrund, jede Minute ein Schub. Jede Mail geht höchstens
  einmal raus, auch bei mehreren Instanzen oder einem Neustart.
- Die Seite zeigt je Ankündigung, wie viele Mails gesendet, offen oder
  gescheitert sind, und die gescheiterten Adressen. **Gescheiterte erneut senden**
  reiht sie wieder ein. Steht dort „Versand unterbrochen“, ist unklar, ob die
  Mail ankam – ein erneuter Versand kann sie doppelt zustellen. Die
  Sechs-Wochen-Frist läuft ab Zugang der Mail.
- Ohne eingerichteten Mailversand (`EMAIL_ENABLED`) bleiben die Mails in der
  Warteschlange.

## Welche Fassung gilt

Je Dokument gilt die neuere von

- der Fassung im Code bzw. aus `LEGAL_AGB_VERSION`, `LEGAL_AVV_VERSION`,
  `LEGAL_PRIVACY_VERSION`, `LEGAL_IMPRINT_VERSION`, `LEGAL_ANLAGE1_VERSION` und
- der neuesten angekündigten Fassung, deren Datum erreicht ist (Tag in
  Europe/Berlin).

Die Variablen bzw. die Fassung im Code kannst du nach dem Stichtag nachziehen.
**Nicht vorher anheben:** Was dort steht, gilt sofort.

`LEGAL_REACCEPTANCE_ENABLED=false` schaltet die erneute Bestätigung durch die
Admins ab (Standard: an). Ankündigung, Mail und Hinweis bleiben davon unberührt.
