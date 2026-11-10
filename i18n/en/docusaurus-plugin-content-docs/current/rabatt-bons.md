---
sidebar_position: 9
title: Discount Vouchers
description: Configure discount vouchers that can be redeemed at the till.
---

# Discount Vouchers

**Discount vouchers** are discounts or perks that till staff can select during checkout — for example a volunteer discount or a free-drink voucher. You configure the available vouchers centrally so they are consistently available at all tills.

You can find this section via **Discount vouchers** in the sidebar.

![Discount Vouchers](/img/screens/en/discounts.png)

## Create a discount voucher

1. Click **Create voucher**.
2. Enter a **name** (e.g. "Helper voucher") and optionally a description.
3. Choose the **type**:
   - **Fixed amount** — the amount you enter is deducted at the till.
   - **Amount on redemption** — till staff enter the amount when redeeming, e.g. for vouchers with a printed value.
4. Leave **Active** on — only active vouchers can be selected at the till. **Multiple per order** allows the same voucher to be applied more than once to an order.
5. Click **Create**.

![Create discount voucher](/img/screens/en/discounts-dialog.png)

## Redeeming at the till

Till staff choose discount vouchers in the checkout window under the **Discount** payment method. The discount is applied to the order and appears later in the [Reports](./auswertung.md). See [Till](./kasse.md#kassieren) for how this looks. In the [Orders only](./betriebsarten.md#nur-bons) operating mode there are no discount vouchers.

:::tip[Typical use cases]
Discount vouchers are ideal for volunteer perks, free drinks for sponsors, or special promotions during an event.
:::

:::warning[Only for vouchers you give away]
A discount voucher reduces the price (DSFinV-K "Rabatt"); it is not a payment method. Only use it for vouchers your club gives away for free. **Sold** tokens or vouchers are something different for tax purposes and must not go into the till as a discount; OpenEOS has no feature of its own for them. What this means for the operating modes without a TSE is described under [Tokens and vouchers](./betriebsarten.md#wertmarken). This is not tax advice.
:::
