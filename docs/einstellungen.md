---
sidebar_position: 18
title: Einstellungen
description: Persönliche Einstellungen und Organisationseinstellungen verwalten.
---

# Einstellungen

Unter **Einstellungen** verwalten Sie Ihre persönlichen Daten sowie die Einstellungen Ihrer Organisation. Der Bereich ist in zwei Reiter gegliedert: **Persönlich** und **Organisation**.

![Einstellungen – Profil](/img/screens/de/settings.png)

## Persönlich

Der Reiter **Persönlich** ist in mehrere Unterbereiche gegliedert:

- **Profil** – Profilbild, Vorname, Nachname und E-Mail-Adresse pflegen.
- **Konto** – kontobezogene Einstellungen.
- **Sicherheit** – Passwort ändern und Sicherheitsoptionen verwalten.
- **Einstellungen** – persönliche Vorlieben wie das **Erscheinungsbild** (Hell/Dunkel).

Änderungen übernehmen Sie jeweils über **Änderungen speichern**.

### Sicherheit

Im Unterbereich **Sicherheit** ändern Sie Ihr Passwort und verwalten weitere Sicherheitsoptionen Ihres Kontos.

![Einstellungen – Sicherheit](/img/screens/de/settings-security.png)

## Organisation

Im Reiter **Organisation** verwalten Sie die Stammdaten und Optionen Ihrer Organisation. Er ist in mehrere Unterbereiche gegliedert: **Allgemein**, **Kontakt**, **Rechnungsadresse**, **Kasse (POS)** und **SumUp**.

### Allgemein

Grundlegende Informationen Ihrer Organisation:

- **Logo** – wird auf der öffentlichen [Helferplan-Seite](./schichtplaene.md) und im Shop angezeigt (PNG, JPG oder WEBP, max. 5 MB).
- **Name** – erscheint auf Rechnungen und Bons.
- **Beschreibung** – optionaler Zusatztext.

![Organisationseinstellungen – Allgemein](/img/screens/de/settings-organisation.png)

### Kontakt & Rechnungsadresse

Unter **Kontakt** hinterlegen Sie die Kontaktdaten Ihrer Organisation, unter **Rechnungsadresse** die Adresse für Rechnungen. Diese Angaben werden u. a. für Belege und die Abrechnung verwendet.

### Kasse (POS)

Hier steuern Sie das Verhalten der Kasse:

- **Zahlungsmodus**
  - **Sofort bezahlen** – Bestellungen werden direkt beim Kassieren bezahlt.
  - **Sammelrechnung** – Bestellungen werden gesammelt und am Ende zusammen bezahlt (Tab-Modus, z. B. für Tischbedienung).
- **Weitere Optionen**
  - **Tischnummer erforderlich** – bei jeder Bestellung muss eine Tischnummer angegeben werden.
  - **Bon automatisch drucken** – nach jeder Bestellung wird automatisch ein Bon gedruckt.
  - **Töne aktiviert** – akustische Signale bei neuen Bestellungen.

![Organisationseinstellungen – Kasse (POS)](/img/screens/de/settings-org-pos.png)

### SumUp-Integration (Kartenzahlung)

Über die **SumUp**-Integration verbinden Sie Ihr SumUp-Konto, um Kartenzahlungen und SumUp-Kartenleser an der Kasse zu nutzen.

- **Zugangsdaten**
  - **API-Key** – Ihr SumUp API-Key (Format `sup_sk_…`).
  - **Merchant Code** – Ihr SumUp Merchant Code (z. B. `MXXXXXXXX`).
- **Affiliate-Zugangsdaten** (optional, nur für Terminal-Checkout über die Solo Cloud API): **Affiliate Key** und **App ID**.
- Mit **Verbindung testen** prüfen Sie die Zugangsdaten, mit **Speichern** übernehmen Sie sie.
- Im Abschnitt **Kartenleser** verbinden Sie anschließend Ihre SumUp-Solo-Geräte. Dafür müssen zuerst die Zugangsdaten konfiguriert sein.

![Organisationseinstellungen – SumUp](/img/screens/de/settings-org-sumup.png)

:::info[Wo bekomme ich die SumUp-Zugangsdaten?]
API-Key und Merchant Code finden Sie in Ihrem SumUp-Konto (Entwickler-/API-Bereich). Behandeln Sie den API-Key wie ein Passwort und geben Sie ihn nicht weiter.
:::

## Darstellung und Sprache

- **Erscheinungsbild:** Über **Hell** und **Dunkel** stellen Sie den Anzeigemodus ein.
- **Sprache:** Über das **Globus-Symbol** oben rechts wechseln Sie zwischen Deutsch (**DE**) und Englisch (**EN**).
