---
sidebar_position: 12
title: Printers
description: Manage receipt printers, templates, and receipt workflows.
---

# Printers

The **Printers** section is where you manage your receipt printers along with their templates and print processes. OpenEOS supports ESC/POS printers connected via the OpenEOS Printer Agent. The section is divided into three tabs: **Printers**, **Templates**, and **Receipt Workflows**.

![Printers](/img/screens/en/printers.png)

## Printers

The **Printers** tab shows the devices assigned to your organisation.

:::info[Set up by the platform administrator]
Printers are added by the **platform administrator** and assigned to your organisation. If no printers have been assigned yet, a corresponding notice will appear here. Contact your administrator if you would like to connect a printer.
:::

## Templates

The **Templates** tab lets you define how receipts look — for example a kitchen receipt, drinks receipt, or till receipt. Templates determine the content and layout of the printout (header, line items, notes, footer).

![Printers – Templates](/img/screens/en/printers-templates.png)

## Receipt Workflows

The **Receipt Workflows** tab lets you define which receipts are printed for which event — for example "Print a kitchen receipt at the Kitchen location when a new order arrives". This automates the process so the right receipts are produced in the right place.

![Printers – Receipt Workflows](/img/screens/en/printers-workflows.png)

## How printers work with locations

Printers work hand in hand with [locations](./standorte.md): order items are routed to the responsible location and printed there using the stored template and the matching workflow.
