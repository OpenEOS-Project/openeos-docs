---
sidebar_position: 16
title: Mitglieder & Berechtigungen
description: Mitglieder einladen und modulbasierte Berechtigungen vergeben.
---

# Mitglieder & Berechtigungen

Unter **Mitglieder** verwaltest du das Team deiner Organisation. Du lädst neue Mitglieder ein und legst fest, auf welche Bereiche jedes Mitglied zugreifen darf.

![Mitgliederübersicht](/img/screens/de/members.png)

## Rollen

OpenEOS kennt zwei Rollen:

- **Administrator** – hat automatisch Zugriff auf **alle Module** und kann die Organisation vollständig verwalten.
- **Mitglied** – erhält gezielt einzelne Module freigeschaltet (siehe Berechtigungen).

In der Übersicht siehst du pro Person Name, E-Mail, **Rolle**, freigeschaltete **Berechtigungen** und das Beitrittsdatum.

## Mitglied einladen

1. Klicke auf **Mitglied einladen**.
2. Gib die **E-Mail-Adresse** der Person ein.
3. Entscheide über den Schalter **Administrator**, ob die Person Vollzugriff erhält.
4. Ist die Person kein Administrator, wähle über die **Berechtigungen** die freizugebenden Module aus.
5. Klicke auf **Mitglied einladen**.

![Mitglied einladen](/img/screens/de/members-dialog.png)

## Plätze und Höchstzahl

Im gehosteten Betrieb hat eine Organisation Platz für höchstens **10 Mitglieder**. Gezählt werden aktive Mitglieder **und offene Einladungen** – eine verschickte Einladung belegt ihren Platz also schon, bis sie angenommen, zurückgezogen oder abgelaufen ist. Neben **Mitglied einladen** siehst du den Stand, z. B. „7 von 10 Plätzen belegt (inkl. Einladungen)“.

Sind alle Plätze belegt, ist der Knopf ausgegraut. Entferne dann ein Mitglied oder ziehe eine Einladung zurück. Helfer, die sich über [Schichtpläne](./schichtplaene.md) eintragen, sind keine Mitglieder und zählen nicht mit. Dasselbe gilt für [Bedienungen](./bedienungen.md).

:::tip[Mehr Plätze nötig?]
Wende dich an den Support – wir heben die Höchstzahl für deine Organisation an. Dasselbe gilt für die Zahl der Organisationen je Konto (siehe [Organisation](./organisation.md#mehrere-organisationen)).
:::

## Modulbasierte Berechtigungen

Für Mitglieder lassen sich die folgenden Module einzeln freischalten:

- **Produkte** (dazu gehören auch die **Standorte**)
- **Veranstaltungen** (dazu gehören auch die **Tische**)
- **Geräte** (dazu gehören auch die **Drucker**)
- **Mitglieder**
- **Bedienungen** – Bedienungen anlegen, PINs vergeben, PIN-Zettel drucken (siehe [Bedienungen](./bedienungen.md))
- **Bestellungen** – stornieren und erstatten, auch per PIN an der Kasse, und Bestellungen exportieren
- **Schichtpläne**
- **Rabatt-Bons**
- **Pfand**
- **Auswertung**
- **Inventur**

Nur freigeschaltete Module erscheinen in der Navigation des jeweiligen Mitglieds. **Bestellungen** und das **Dashboard** sieht jedes Mitglied; **Rechnungen** und **Integrationen** bleiben Administratoren vorbehalten. So gibst du z. B. einer Schichtleitung nur die **Schichtpläne** frei, ohne Zugriff auf Auswertungen oder Geräte.

:::tip[Prinzip der minimalen Rechte]
Vergib nur die Berechtigungen, die jemand wirklich benötigt. Den Administrator-Vollzugriff sollten nur wenige, verantwortliche Personen erhalten.
:::

## Geräte-PIN {/* #pin */}

Mit einer **Geräte-PIN** meldet sich ein Mitglied an einer Kasse an, die auf **Gemeinsame Kasse** steht ([Geräte](./geraete.md#pin-und-sperre)). Es arbeitet dort wie eine Bedienung. Die PIN (4 bis 6 Ziffern) setzt du unter **Berechtigungen bearbeiten** beim jeweiligen Mitglied.

Mitglieder und [Bedienungen](./bedienungen.md) teilen sich einen PIN-Raum: Zwei Personen haben nie dieselbe PIN. Einfache PINs wie `1234` oder `0000` und PINs, die schon vergeben sind, nimmt OpenEOS nicht an („Diese PIN ist nicht verfügbar“). Bestehende Mitglieds-PINs gelten weiter.

:::tip[Helfer ohne Konto]
Für Helferinnen und Helfer, die nur kassieren, brauchst du kein Mitglied mit Konto und E-Mail. Lege sie als [Bedienungen](./bedienungen.md) an – sie zählen nicht zu den Plätzen.
:::
