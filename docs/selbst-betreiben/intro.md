---
sidebar_position: 1
title: Überblick
description: OpenEOS auf dem eigenen Server betreiben — kostenlos, ohne Abrechnung, mit einer Organisation.
---

# OpenEOS selbst betreiben

OpenEOS lässt sich vollständig auf einem eigenen Server betreiben. Diese
Betriebsart heißt **Einzelbetrieb** (`DEPLOYMENT_MODE=selfhosted`) und ist
**kostenlos und unbegrenzt**: keine Freischaltung je Veranstaltung, keine
Obergrenze für Bestellungen, kein Stripe, keine Rechnungen.

Der Quelltext steht unter der [AGPL-3.0][agpl] auf
[GitHub](https://github.com/OpenEOS-Project). Es gibt **keinen Lizenzschlüssel,
keine Telemetrie und keinen Rückkanal** zu openeos.de — die Installation
funktioniert dauerhaft ohne Internetverbindung nach außen.

[agpl]: https://www.gnu.org/licenses/agpl-3.0.de.html

## Was Sie dafür brauchen

| | |
|---|---|
| **Server** | Linux mit Docker und Docker Compose. 2 CPU-Kerne, 4 GB RAM und 20 GB Platte reichen für ein Vereinsfest. |
| **Vorkenntnisse** | Sie sollten eine Textdatei bearbeiten und Befehle in einer Konsole ausführen können. |
| **Netz** | Die Kassen müssen den Server erreichen — im WLAN des Festplatzes oder über das Internet. |
| **E-Mail** | Optional. Ohne Mailserver funktioniert alles, siehe [Benutzer anlegen](./benutzer.md). |

## Was der Einzelbetrieb kann — und was nicht

**Vollständig enthalten:** Kassen, Bestellungen, Produkte und Kategorien,
Standorte, Pfand, Rabatt-Bons, Inventur, Schichtpläne, Mitglieder mit
Berechtigungen, Bondruck über ESC/POS-Drucker, Kunden- und Küchendisplays,
Auswertungen und der Online-Shop.

**Nicht enthalten**, weil es zum gehosteten Angebot gehört:

- Abrechnung, Stripe, Rechnungen — es gibt schlicht nichts zu bezahlen
- Mehrere Organisationen nebeneinander (genau eine je Installation)
- Miet-Hardware und der Support-Chat zu uns
- Selbstregistrierung — Konten legt die Mitgliederverwaltung an

Diese Bereiche sind in der Oberfläche ausgeblendet; die zugehörigen
Schnittstellen antworten mit `404`.

## Die Bestandteile

| Dienst | Zweck | Pflicht |
|---|---|---|
| `openeos-api` | Server: Schnittstelle, WebSocket, Datenbankzugriff | ja |
| PostgreSQL 16 | Datenbank | ja |
| Redis 7 | Sitzungen, Zwischenspeicher, WebSocket-Verteilung | ja |
| `openeos-web` | Dashboard, Kassen-Oberfläche, Displays | ja |
| `openeos-shop` | Öffentlicher Online-Shop je Veranstaltung | nein |
| `openeos-printer-agent` | Ansteuerung von ESC/POS-Druckern | nur mit Bondruck |

Redis ist **nicht** optional: der Server startet ohne erreichbaren Redis nicht.

## Der Weg durch diese Anleitung

1. [Installation](./installation.md) — Server aufsetzen und starten
2. [Ersteinrichtung](./ersteinrichtung.md) — Administrator und Organisation anlegen
3. [Benutzer anlegen](./benutzer.md) — weitere Konten, mit und ohne Mailserver
4. [Drucker anbinden](./drucker.md) — Bondruck einrichten
5. [Betrieb](./betrieb.md) — Sicherung, Aktualisierung, Fehlersuche

:::tip Lieber ohne eigenen Server?
Unter [app.openeos.de](https://app.openeos.de) betreiben wir OpenEOS für Sie —
ohne Installation und mit Support. Die Abrechnung erfolgt dort je
Veranstaltung. Das übrige Handbuch beschreibt diese Variante.
:::
