---
sidebar_position: 17
title: Shift Plans
description: Create shift plans, generate shifts, publish them, and let volunteers sign up via a public link.
---

# Shift Plans

With **Shift Plans** you organise the volunteers for your event. You create jobs (e.g. bar, grill, setup/teardown), generate shifts from them, and publish a **public volunteer link** that lets helpers sign themselves up for open slots.

You'll find this section under **Shift Plans** in the sidebar.

![Shift plans overview](/img/screens/en/shifts.png)

## 1. Create a shift plan

Click **New shift plan**. A wizard walks you through a few steps:

1. **Event** – Optionally select the event this plan belongs to. Helpers will see the event name on the public page. You can also choose "No event (standalone plan)".
2. **Name & Description** – e.g. "Volunteer schedule Summer Festival 2026". The description appears later on the public volunteer page.
3. **Create** – the plan is created and opens in **Draft** status.

![Shift plan wizard: select event](/img/screens/en/shifts-dialog.png)

The detail view of a plan has four tabs: **Jobs**, **Calendar**, **Registrations**, and **Settings**. The **Publish** button and **PDF Export** are in the top right.

## 2. Add jobs

A **job** is a task or station that needs volunteers. Click **Add job**:

- **Job** – one job per line (e.g. `Bar`, `Grill`, `Setup/Teardown`); all are created at once.
- **Description** – optional public description for volunteers.
- **Helpers per shift** – default value for all shifts of this job (can be overridden per shift).

![Add job](/img/screens/en/shift-work-dialog.png)

Afterwards you see your jobs as a list — initially without any shifts.

![Jobs in the shift plan](/img/screens/en/shift-detail.png)

## 3. Generate shifts

You can add time slots per job individually using the **calendar icon** — or generate shifts for all jobs at once with the **Shift Generator**:

1. **Period** – start and end date (pre-filled if the plan is linked to an event).
2. **Shift distribution** – shifts per day (e.g. 3 ≈ 4 hours per shift) and an optional **shift overlap** (handover buffer).
3. **Preview & adjust** – you see all generated shifts per day and can deselect individual ones before confirming with **"Create X shifts for Y jobs"**.

![Shift generator](/img/screens/en/shift-generator.png)

## 4. Registration settings & public link

In the **Settings** tab you define how volunteers sign up and find the public link:

- **Public link** – `https://app.openeos.de/s/<plan>`. Use **Copy link** to share it with volunteers; **Preview** opens the public page.
- **Registration settings**:
  - **Approval required** – registrations must be confirmed by an admin.
  - **Multiple shifts** – volunteers may sign up for more than one shift.
  - **Max shifts per person** – upper limit (0 = unlimited).
  - **Reminder** – send a reminder a set number of days before the shift.
  - **Verification reminders** – sent to volunteers who have not yet confirmed their email.

![Shift plan settings with public link](/img/screens/en/shift-settings.png)

## 5. Publish

While the plan is in **Draft** status it is only visible internally. Click **Publish** in the top right to release it — the status changes to **Published** and the public link becomes active.

:::tip
Publish only once your jobs and shifts are in place. You can still make changes afterwards at any time.
:::

## The public volunteer area

Via the public link, volunteers reach a clear page — **without logging in** — showing your logo, the period, and all shifts. For each time slot they see how many places are still **available** per job (e.g. "2 / 2 free"). They can switch between **card view** and **list view**.

![Public volunteer page](/img/screens/en/public-helper.png)

Volunteers select the shifts they want (overlapping shifts are automatically blocked). A bar shows the number of selected shifts and takes them to the next step with **Continue**.

![Shift selection by volunteer](/img/screens/en/public-select.png)

In the **Your details** step, the volunteer enters their **name** and **email** (plus optionally **phone** and **notes**) and clicks **Sign up**. They then receive a **confirmation email** for their registration.

![Volunteer registration form](/img/screens/en/public-contact.png)

## Managing registrations

In the **Registrations** tab you see all incoming volunteer registrations. If "Approval required" is active, you confirm them here. Use **Add volunteer manually** to add someone to a shift yourself.

![Manage registrations](/img/screens/en/shift-anmeldungen.png)

:::tip[Share early]
Create and publish the shift plan in good time, then distribute the public link (e.g. via messenger or email) so enough volunteers can sign up. Via [permissions](./mitglieder.md) you can grant a shift supervisor access to the **Shift Plans** module only.
:::
