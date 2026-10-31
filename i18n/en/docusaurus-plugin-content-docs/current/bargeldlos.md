---
sidebar_position: 3
title: Cash and cashless mode
description: Cash at the till, the notice about the TSE requirement and what cashless mode blocks.
---

# Cash and cashless mode

Out of the box the till accepts cash: cash is the first payment method, the till works out change, pays out deposits in cash and opens the cash drawer. If you don't want to accept cash, switch on **cashless mode**. Then only card payments via [SumUp](./integrationen/sumup.md), online orders and prepaid payments remain.

Cashless mode alone does not exempt you from the TSE requirement, because you can switch cash back on yourself. More on this in the next section.

## Cash and TSE {/* #tse */}

:::info[Cash and TSE]
In Germany, an electronic till that can accept cash needs a certified TSE (technical security system). The TSE integration for OpenEOS is in progress. Until then, your club decides for itself whether to record cash with OpenEOS – if in doubt, check with your tax advisor. Cashless mode alone does not exempt you from the TSE requirement, because you can switch cash back on yourself. Without a TSE, use “Order only”; our support switches it on.
:::

According to the German Federal Ministry of Finance, a till already has a cash register function if the club can switch cash on itself – whether it actually does so makes no difference. You switch cashless mode on and off yourself in the payment settings; switching off cash there therefore does not exempt you from the TSE requirement. You can only do without a TSE if your club cannot switch cash on itself and this is proven in the system documentation, for example by a certificate from the manufacturer.

That is what the [Order only](https://docs.openeos.de/en/nur-bestellen) operating mode is for: it has no cash register module, only our support switches it, and you get a certificate for your system documentation. If you want to accept cash with OpenEOS, you need the TSE integration we are working on.

Learn more in the [FAQ on openeos.de](https://openeos.de/en/faq#tse). General information, not tax or legal advice.

As long as cash is allowed, this notice is shown under **Settings → Organization → Payments**, in the settings of every till under **Devices** and once on the [dashboard](./dashboard.md). There you can hide it with the cross; that applies to your account in this browser.

## Switching on cashless mode {/* #einschalten */}

1. Open **Settings → Organization → Payments**.
2. Switch on **Cashless mode**.

Only admins of the organization can do this. The tills switch over right away, no reload needed. Switching it off works the same way; the tills then accept cash again.

If [SumUp](./integrationen/sumup.md) is not switched on, the page warns you: without SumUp the till cannot take payments in cashless mode – only orders paid online or in advance can be completed. You can still save, for example if you only sell through the shop.

### Proof: history {/* #verlauf */}

Below the switch you see **Cashless since** with the date of the change and the **History**: every change with its time and the person who made it. Nobody can edit the history. This lets you show from when on your tills did not accept cash. This record does not exempt you from the TSE requirement, because you can switch the mode yourself.

## What cashless mode blocks {/* #was-gesperrt-ist */}

The block is not only in the interface. The server also rejects every cash booking (error "Your organization works cashless"), no matter which till or program it comes from.

| Action | Cashless |
|---|---|
| Checkout | No **Cash** method, no quick amounts, no change. **Card** (with tip), **Discount** and **Split bill** remain. |
| Open orders, split bill, order history | The same methods without cash. Split and combined payments work by card. |
| Tip | Card only. |
| Refund | Only back to the original card or online payment. A cash payment from before the switch can no longer be refunded through OpenEOS; the till and the admin area then show "No cash refund". |
| Deposit return | **Pay out** is gone. You offset returned deposits against new deposits in the same sale (**Offset**). Without a cart the deposit return is blocked and explains why. |
| Cash drawer | Does not open; the menu item **Open cash drawer** is missing. |

With SumUp in [test mode](./veranstaltungen.md) the till triggers no real card payments. So you can still run through the flow, in cashless mode it then only books the card (like an external terminal).

## See also

- [Till: checkout](./kasse.md#kassieren) and [deposits at the till](./kasse.md#pfand)
- [Deposit](./pfand.md)
- [SumUp](./integrationen/sumup.md)
