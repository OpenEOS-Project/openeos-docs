---
title: Tokens
description: Tokens as a means of payment – set up token types, sell tokens, accept them when taking payment and buy them back, with VAT, cash book, server settlement and report.
---

import TseComingSoon from '@site/src/components/TseComingSoon';

# Tokens

Many clubs sell **tokens** (Wertmarken) at a central cash desk, and guests pay with them at the stands. OpenEOS covers the whole flow: you set up your tokens as **token types**, sell them at the till, accept them as payment when taking money and – if you want to – buy them back for cash. VAT, cash book, server settlement, reports and the export for the tax office handle the tokens correctly.

<TseComingSoon />

:::info[Only in "All features", in Germany only with the Cloud TSE]
Accepting tokens "instead of money" is a till function – just like cash (AEAO zu § 146a Nr. 1.2). Tokens are therefore only available in the [operating mode](./betriebsarten.md) **All features**, and in Germany only with an active [Cloud TSE](./integrationen/cloud-tse.md). This also applies to **All features (existing)**: no active TSE, no tokens. In **Cashless** and **Orders only** the server rejects selling, accepting and buying back tokens, whichever till the request comes from. Outside Germany tokens work in "All features" like cash, also without a TSE.
:::

:::note[Not tax advice]
We describe how OpenEOS books tokens and the tax assessment this is based on (as of November 2026). This is not tax advice. Check the rules for your club yourself or with your tax advisor.
:::

## How it works {/* #ablauf */}

1. **Set up:** Under **Tokens** in the sidebar you create your token types, e.g. "2 € token" or "drink token".
2. **Sell:** At the central cash desk the guest buys tokens – with cash or card. This is not revenue yet.
3. **Pay:** At the stand the guest hands over tokens. When taking payment you enter how many tokens of each type you receive; the guest pays the rest in cash or by card.
4. **Buy back (optional):** If you allow it for a token type, you take back leftover tokens at the till for cash – with a receipt and signature.
5. **Settle:** Servers hand in accepted tokens like cash. The report shows tokens sold, redeemed, bought back and still in circulation.

You get the tokens themselves – paper, plastic chips, tickets – yourself, as before. OpenEOS does not print token sheets.

## Set up token types {/* #einrichten */}

Open **Tokens** in the sidebar (next to products and deposits) and create a token type. You need the **Products** permission for this (see [Members](./mitglieder.md)).

| Field | Meaning |
|---|---|
| **Name** | What the token is called at the till and on the receipt, e.g. "2 € token", "drink token". |
| **Face value (€)** | Selling price and redemption value at the same time, e.g. €2.00. |
| **Colour** | Colour shown at the till – ideally the same as the real token. |
| **Kind** | **Multi-purpose voucher** (default) or **single-purpose voucher**, see [VAT](#umsatzsteuer). |
| **VAT rate** | Only for single-purpose vouchers: the one rate the token is valid for, e.g. 19 %. |
| **Event** | Optional. If empty, the token is valid for all events of the organization. |
| **Categories / items** | Optional, only with an event: the token only covers these items, e.g. a "food token" for the grill stand. |
| **Buy-back allowed** | Off by default. Only when on can the till take this token back for cash, see [Buy-back](#ruecktausch). |
| **Active** | Only active token types appear at the till. |

Good to know:

- **Once tokens are in circulation**, **face value**, **kind** and **VAT rate** are locked (for a single-purpose voucher also the item selection). You can always change name, colour, active and buy-back. If you need a different value, create a new token type.
- **Deleting** only works while no token of the type has been sold or accepted. After that you **deactivate** it.
- An **organization-wide** token type (without an event) is valid at every event as long as it is active. If you change tokens every season, create a new type for it (see [Tips](#tipps)).

## Sell tokens {/* #verkaufen */}

At the till, open **Sell tokens** in the menu, enter the number per token type and take payment in **cash**, by **card** or via **SumUp** – like a normal sale, with change.

- The receipt is titled **WERTMARKEN – Verkauf** (tokens – sale). Each line shows the kind of token: for multi-purpose vouchers "Wertmarken (Mehrzweck-Gutschein, nicht steuerbar)" (not taxable), for single-purpose vouchers the rate with the VAT included.
- Cash from token sales counts towards the expected balance of the drawer in the [cash book](./kassenbuch.md). It is not **revenue**: tokens only show up in revenue when they are redeemed (multi-purpose vouchers).
- With the Cloud TSE every token sale is a receipt of its own, signed by the TSE.

## Pay with tokens {/* #bezahlen */}

When **taking payment** there is a **Tokens** section: you enter how many tokens of each type the guest gives you. The till deducts their value and shows what is still open; you take the **rest** in **cash** or by **card** as usual.

- **No change in tokens.** Tokens can't be split, and there is no change in tokens.
- **Restricted tokens** – single-purpose vouchers and tokens with categories/items – only cover the items they are valid for, no deposit and no tip. Unrestricted multi-purpose tokens cover everything that is open, deposits included. If the guest gives more restricted tokens than there are matching items on the bill, the till rejects it: take fewer tokens and take the rest another way.
- You pay with tokens when **taking payment**, also for several open orders at once, but not when **splitting the bill** by item.
- With the Cloud TSE the TSE signs the payment like any other. If everything is paid with tokens, the export shows the payment type "Keine" (none), because no money changed hands.

### Overpayment: rest as a tip {/* #ueberzahlung */}

If the tokens are worth more than the open amount – the guest hands over two €2 tokens for €3.50 – there is no change. The till asks: with **Rest as tip** you book the surplus as a [tip](./trinkgeld.md) – like any other tip: with volunteers it goes to the club (DSFinV-K `TrinkgeldAG`, split across the VAT rates of the goods). Without this confirmation the till does not accept the payment; then take fewer tokens and take the rest in cash or by card.

### What the receipt shows {/* #beleg */}

The receipt shows the goods as usual and below them **Bezahlt mit Wertmarken** (paid with tokens) per type, e.g. "3 x 2,00 EUR 2 € token", then the rest in money. The VAT lines per rate include the part paid with multi-purpose tokens – after all, the VAT arises with this redemption. The part paid with **single-purpose tokens** has no VAT, because that was already shown when the tokens were sold.

### Cancellation and refund {/* #storno */}

If you cancel or refund an order that was paid with tokens, the till gives back the token part **in tokens**, never in cash. In the report these tokens appear as "returned" and are back in circulation.

## Buy-back for cash {/* #ruecktausch */}

A buy-back is a deliberate exception, not an exchange office:

- It only works for token types with **Buy-back allowed** (off by default).
- At the till, open **Buy back tokens** in the menu, enter the number per type and optionally a reason, e.g. "Buy-back at the end of the event". The payout is always in **cash**; the cash drawer opens.
- At most as many tokens as are **in circulation** for that type.
- If you work with [servers](./bedienungen.md#rollen), the person needs the **Cancel & refund** permission – shift leads have it.
- The till **always** prints a receipt "WERTMARKEN – Rücktausch / Auszahlung" with a signature line. Have the guest sign it and keep the receipt.
- The cash paid out reduces the expected balance of the drawer in the [cash book](./kassenbuch.md). With the Cloud TSE the buy-back is a receipt of its own, signed by the TSE.

:::warning[No buy-back "at any time, no questions asked"]
If guests can return their tokens at any time without conditions, for tax purposes the token is closer to a prepaid credit card than a voucher. OpenEOS therefore only allows an explicit, recorded buy-back per token type. Define in your [procedure documentation](./verfahrensdokumentation.md#wertmarken) when you buy back tokens (e.g. only at the end of the event, only whole tokens, only at the info stand).
:::

## Settlement, cash book and reports {/* #berichte */}

### Server settlement {/* #kellnerabrechnung */}

If a [server](./bedienungen.md#abrechnung) accepts tokens, they hand them in at the end of the shift like cash. The settlement has the block **WERTMARKEN (abgeben)** (tokens – hand in): the accepted tokens per type with count and value, then **Marken angenommen** (tokens accepted) and – if the person sold or bought back tokens themselves – **Marken verkauft** (tokens sold) and **Rücktausch bar** (cash buy-back).

- You count the accepted tokens against the settlement; they are **not** part of the **expected cash**.
- Cash from token sales increases the **expected cash**, cash from a buy-back reduces it.

### Cash book {/* #kassenbuch */}

In the [cash book](./kassenbuch.md), cash from token sales counts towards the expected balance of the drawer, and a buy-back reduces it. The tokens themselves are not cash and do not appear in the cash book – count them separately.

### Token report {/* #bericht */}

On the **Tokens** page and in [Reports](./auswertung.md) you see per token type and event:

| Column | Meaning |
|---|---|
| **Sold** | tokens sold at the till (count and value) |
| **Redeemed** | tokens accepted as payment |
| **Returned** | tokens given back to the guest on cancellation or refund |
| **Bought back** | tokens taken back for cash |
| **In circulation** | sold − redeemed + returned − bought back |

Test bookings are not counted. If you choose a period, only the movements within it count; **In circulation** is then the change during the period. In addition:

- The **Payment methods** report has a line **Tokens**.
- The [VAT](./auswertung.md#umsatzsteuer) card has a column **Single-purpose tokens** and an info line about multi-purpose tokens.
- Tokens sold are not revenue. Revenue arises when they are redeemed (multi-purpose) or is included at the token's rate when the tokens are sold (single-purpose).

### Test mode {/* #testmodus */}

In [test mode](./veranstaltungen.md#phasen) and while an event is **Planned**, the till books token sales, redemptions and buy-backs as **training bookings**. They don't count in any report and are deleted like the test orders as soon as real sales start. So feel free to practise the flow beforehand.

## VAT: multi-purpose or single-purpose voucher {/* #umsatzsteuer */}

For tax purposes tokens are **vouchers** (§ 3 Abs. 13–15 UStG). Whether VAT arises when the token is sold or only when it is redeemed depends on whether the VAT rate of the goods is already certain at the time of sale.

| | Multi-purpose voucher (default) | Single-purpose voucher |
|---|---|---|
| When | The token covers goods with different rates, typically food (7 %) and drinks (19 %). | All items the token covers have **exactly one** VAT rate. |
| Selling the token | **not taxable**, no revenue (DSFinV-K `MehrzweckgutscheinKauf`, VAT key 5) | **taxable** at the token's rate (`EinzweckgutscheinKauf`) |
| Redemption | revenue and VAT at the rate of each item (`Umsatz` per rate, plus `MehrzweckgutscheinEinloesung` negative, key 5) | no further VAT: `Umsatz` and `EinzweckgutscheinEinloesung` negative at the same rate |
| Never redeemed | no VAT | VAT was already paid on sale |
| Buy-back | exchange of means of payment, no revenue (`MehrzweckgutscheinKauf` negative) | reduction of consideration and VAT (§ 17 UStG) |

**Multi-purpose example:** A guest buys €100 of tokens in cash. Later they get drinks for €60 (19 %) and food for €60 (7 %) and pay with the €100 of tokens plus €20 in cash.

| Transaction | Process data in the TSE | VAT |
|---|---|---|
| Token sale €100 cash | `Beleg^0.00_0.00_0.00_0.00_100.00^100.00:Bar` | none |
| Redemption €100 tokens + €20 cash | `Beleg^60.00_60.00_0.00_0.00_-100.00^20.00:Bar` | €9.58 (19 %) + €3.93 (7 %) |

On redemption the goods appear in revenue at their rates; the redeemed tokens appear as a negative amount in the non-taxable slot, and only the €20 in cash was paid.

**Single-purpose example:** A "drink token" only covers drinks at 19 %. Selling tokens for €30 in cash is taxable (`Beleg^30.00_0.00_0.00_0.00_0.00^30.00:Bar`, including €4.79 VAT). Redemption no longer creates VAT; the receipt shows the token part without VAT.

### When is single-purpose possible? {/* #einzweck */}

OpenEOS only allows single-purpose vouchers if the VAT rate is certain at the time of sale:

- **Without an item selection** the token covers **all items at its rate** – e.g. all items at 19 %. It cannot pay for items at another rate.
- **With an item selection** (categories or items of one event), **all** selected items must have exactly the token's rate. Otherwise OpenEOS rejects it and suggests a multi-purpose voucher.
- Deposits and tips cannot be paid with single-purpose tokens.

If in doubt, use the **multi-purpose voucher**: it is the normal case for club events and always correct as long as the token covers food and drinks.

### Small businesses {/* #kleinunternehmer */}

If your organization does **not charge VAT** (small business under § 19 UStG), OpenEOS books all tokens as **multi-purpose vouchers** – uniformly, without VAT. On redemption the goods appear in the export with VAT key 6 like all revenue, the voucher lines with key 5. You cannot choose single-purpose vouchers then.

### Why only with a TSE? {/* #tse */}

Under AEAO zu § 146a Nr. 1.2, a system has a till function if it accepts vouchers, tokens or credit "instead of money" in addition to cash. A system that accepts tokens as payment therefore needs a TSE in Germany – just like with cash. That is why tokens are only available in **All features** in OpenEOS, and in Germany only with an active Cloud TSE; in **Cashless** and **Orders only** they are blocked. How to work with tokens outside OpenEOS in "Orders only" is described under [Operating modes](./betriebsarten.md#wertmarken).

## Practical tips {/* #tipps */}

- **Mark your tokens:** name or value, the club's name and a colour per season or event. That way no tokens from last year or from the neighbouring club end up in the till.
- **Record the tokens issued:** note how many tokens you print or buy before the event and how many go to the sales points (e.g. rolls or number ranges). At the end: stock before − stock after ≈ tokens sold according to the report.
- **Count the returns:** count the tokens handed in per type and compare them with **Redeemed** in the report and with the **WERTMARKEN (abgeben)** block of the server settlements.
- **Leftover tokens:** decide whether tokens are only valid for this event or also for the next one. **In circulation** shows how many are still out there.
- **One value, many events:** if a token stays the same, create it organization-wide. If you change colour or value every year, create a new type and deactivate the old one as soon as you no longer want to accept those tokens.

## FAQ {/* #faq */}

**I work in "Cashless" or "Orders only". Why don't I see tokens at the till?**
Because tokens as payment are a till function and need a TSE. For that you need "All features" with an active Cloud TSE (in Germany), see [Operating modes](./betriebsarten.md).

**Can guests get change in tokens?**
No. Anyone who pays too much in tokens can leave the rest as a tip – or you take fewer tokens and take the rest in cash or by card.

**A guest wants to return their leftover tokens. Do I have to accept that?**
That is up to your club. Technically it only works for token types with **Buy-back allowed**, with a receipt and signature, and at most up to the amount in circulation.

**Can I sell tokens at a discount, e.g. 11 tokens for the price of 10?**
No. For a token type, the selling price and the redemption value are the same face value. Free tokens your club gives away (helper vouchers, free drinks) are not a means of payment but [discount vouchers](./rabatt-bons.md).

**Do tokens also cover deposits?**
Unrestricted multi-purpose tokens do. Tokens with an item selection and single-purpose tokens only cover the items they are valid for.

**What happens to tokens that are never redeemed?**
For multi-purpose vouchers, no VAT arises on them. How to treat them in your club's accounts is something to clarify with your tax advisor. The report shows you the amount **In circulation**.

**Can OpenEOS print token sheets?**
Not yet. Use your own printed tokens or plastic chips and mark them as described under [Tips](#tipps).

**Are tokens available in the API?**
Reading and setting up, yes: token types with `GET`/`POST`/`PATCH …/token-types` (scopes `read` and `catalog:write`), the report with `GET …/reports/tokens` and sales and buy-backs with `GET …/token-transactions` (scope `read`). Deleting, selling, accepting and buying back only work in the app. See [API access](./api-zugaenge.md#scopes).

## See also

- [Operating modes](./betriebsarten.md)
- [Cloud TSE](./integrationen/cloud-tse.md)
- [Selling at the till](./kasse.md#wertmarken)
- [Tips](./trinkgeld.md)
- [Servers: settlement](./bedienungen.md#abrechnung)
- [Procedure documentation – template](./verfahrensdokumentation.md#wertmarken)
