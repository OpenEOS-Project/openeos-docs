# Befunde aus der App (Stand der Doku-Erstellung)

Diese Datei sammelt Auffälligkeiten, die beim Erstellen der Anwenderdokumentation
in der Live-App (`https://app.openeos.de`, Version **v1.0.70**) aufgefallen sind –
fehlende Übersetzungen, Anzeige-/Bedienprobleme, kaputte Links usw.

Sie ist **kein Teil der veröffentlichten Doku**, sondern eine interne Mängelliste
für das Entwicklungsteam.

Schweregrade: 🔴 stört Nutzung · 🟡 kosmetisch/Politur · 🔵 Hinweis/Idee

---

## i18n / Übersetzungen

### 🟡 Linke Navigation (Sidebar) auf Englisch nicht übersetzt
Im englischen Modus (`/en/...`) ist der Seiteninhalt englisch, die **linke
Hauptnavigation bleibt aber deutsch**: „Bestellungen, Auswertung, Mitglieder,
Standorte, Inventur, Rabatt-Bons, Geräte, Drucker, Schichtpläne, Einstellungen,
Abmelden". Nur „Dashboard, Events, Produkte" sind sprachneutral bzw. übersetzt.
- Erwartung: Sidebar-Labels folgen der gewählten Sprache.
- Betrifft alle authentifizierten Seiten.

### 🟡 Breadcrumb zeigt englische Routennamen im Deutsch-Modus
Im Deutsch-Modus zeigen einige Breadcrumbs den technischen Routennamen statt des
übersetzten Labels:
- `/reports` → Breadcrumb **„Reports"** (erwartet „Auswertung")
- `/discounts` → **„Discounts"** (erwartet „Rabatt-Bons")
- `/inventory` → **„Inventory"** (erwartet „Inventur")

### 🟡 Öffentliche Helferplan-Seite nur teilweise übersetzt (EN)
Auf der öffentlichen Helfer-Seite (`/s/<plan>`) im englischen Modus ist nur ein
Teil übersetzt:
- Englisch: „Select the shifts you want to register for.", „List", das
  Kontaktformular („Your full name", „Register" …).
- Bleibt deutsch: Ansicht-Umschalter **„Karten"** (statt „Cards"), Verfügbarkeit
  **„/2 frei"** (statt „free"), **Wochentage** (Samstag/Sonntag), Banner
  **„SCHICHTPLAN"**, Footer **„Meine Schichten verwalten"**.

---

## Sonstiges

### 🔵 Schichtplan-Name beim Anlegen
Beim Anlegen eines Schichtplans wurde der eingegebene Name „Helferplan Sommerfest
2026" als „Helfer**planung** Sommerfest 2026" gespeichert. Vermutlich greift ein
vorausgefülltes Feld bzw. eine Auto-Ergänzung. Geringe Priorität / ggf.
Bedienfehler – bitte prüfen.

---

## Hinweise zu Screenshots in dieser Doku

- Die linke Sidebar erscheint in den **englischen** Screenshots teils deutsch –
  das spiegelt den oben genannten i18n-Befund wider, ist also kein Fehler der
  Doku, sondern der aktuelle Stand der App.
