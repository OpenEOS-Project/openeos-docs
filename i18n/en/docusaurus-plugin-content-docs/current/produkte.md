---
sidebar_position: 6
title: Products
description: Create products, set prices, add icons, and import via CSV.
---

# Products

Under **Products** you manage the range of items for your active event — everything that is sold at the till. Every product requires at least a name and a price, and can be assigned to a category.

:::warning[Active event required]
Products always belong to an event. If no event is active, the notice "No active event" appears. Activate an [event](./veranstaltungen.md) first.
:::

![Products overview](/img/screens/en/products.png)

## Creating a product

1. Click **Create product**.
2. Fill in the fields:
   - **Name** (required)
   - **Category** — assign the product to a [category](./kategorien.md)
   - **Description** — optional additional text (e.g. "Freshly tapped")
   - **Price** (required)
3. Optional: upload an **image** or choose an **icon** from the icon library.
4. Optional: use **+ Add group** to add option groups (e.g. "Side dish" with selectable options).
5. Click **Create**.

![Create product](/img/screens/en/products-dialog.png)

## Product list

The table shows the **Name**, **Category**, **Price**, **Stock**, and **Status** (e.g. *Available*) for each product. Use the action buttons at the end of each row to **edit** or **delete** a product.

## Stock tracking

The **Stock** column shows how many units of a product the system considers still available. This lets till staff spot early when a product is running low.

How stock tracking works:

- **Sales reduce stock.** When a product is sold at the till, its stock automatically decreases by the quantity sold.
- **No stock set (`-`).** If the column shows a dash, **no** stock is tracked for that product — it stays sellable regardless of quantity. This makes sense for items without a meaningful unit count (e.g. freshly prepared food).
- **Status.** The status (e.g. *Available*) indicates whether a product is currently offered at the till.

### Connection with stocktaking

You record the opening stock and any later corrections in the **[Inventory](./inventur.md)** module:

1. **Record opening stock** – create a stocktake before the event and enter the available quantities per product. This value then appears in the **Stock** column.
2. **During operations** – while sales are being made, OpenEOS subtracts the sold quantities from the stock. You always see the calculated remaining stock.
3. **Closing stocktake** – after the event, record the stock that is actually left. The difference between expected and counted stock helps you understand **consumption and shrinkage**.

:::tip[Use stock tracking selectively]
Track stock primarily for products where the unit count matters (e.g. crates of drinks, deposit cups). For freely prepared food you can skip stock tracking by simply not recording an opening stock.
:::

## Importing products

Instead of creating each product individually, you can use **Import** to load multiple products at once via a **CSV file**. In the import dialogue you map the columns of your file to the OpenEOS fields (name, price, category, etc.) and see a preview before the import is executed.

:::tip[Icons and images]
Products without a photo look much tidier at the till with a suitable **icon** from the library. Simply click **Choose icon** when creating a product.
:::
