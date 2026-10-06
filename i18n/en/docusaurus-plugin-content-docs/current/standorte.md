---
sidebar_position: 10
title: Stations
description: Production stations for routing orders to the kitchen, bar, or serving area.
---

# Stations

**Production stations** (or just stations) determine where orders are routed — for example to the **kitchen**, **bar**, or **serving area**. This way, a sausage order goes to the grill and a beer order goes to the bar. Combined with printers and displays, stations keep operations running smoothly behind the scenes.

You can reach this section via **Stations** in the sidebar. Stations relate to the active event.

![Production stations](/img/screens/en/stations.png)

## Create a station

1. Click **Create Station**.
2. Enter a **name** (e.g. "Kitchen", "Grill", "Drinks counter"), optionally a description and a **color**.
3. If needed, choose a **Handoff Station**: completed items are forwarded there, for example from the kitchen to the serving area.
4. Choose the **printer** that prints this station's tickets.
5. Click **Create**.

![Create station](/img/screens/en/stations-dialog.png)

Which products belong to a station is not set here but in the dialog of the [category](./kategorien.md) or [product](./produkte.md), in the **Station** field. A station set on the product takes precedence over the category.

## How stations work with printers and displays

Each station can have a **printer** (for kitchen or service tickets) and appear on a **kitchen or bar display**. When an order arrives at the till, items are automatically routed to the responsible station and printed or displayed there.

:::info[Kitchen display or customer display]
Note the difference between two kinds of [displays](./anzeigen.md): a **kitchen or bar display** shows the orders of a station (kitchen, bar, serving area) — that is what this page is about. A **customer display** belongs to a single till and mirrors its cart for the guest, regardless of stations.
:::

:::tip[Sensible structure]
Map your real serving points as stations. A clear separation between food and drinks output noticeably speeds up operations.
:::
