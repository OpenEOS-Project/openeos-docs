---
sidebar_position: 3
title: Operating modes
description: The three operating modes of an organization – Orders only, Cashless and All features –, what works in each, how to switch and what applies per country.
---

# Operating modes

Every organization works in one of three **operating modes** (Betriebsarten). The mode decides whether and how money flows through OpenEOS: not at all, only by card and online, or in cash as well. You find it under **Settings → Organization → Operating mode** (Einstellungen → Organisation → Betriebsart); as an admin you also switch it there yourself.

Not to be confused with a device's **service mode** (fixed till or service), see [Devices](./geraete.md#betriebsmodus).

The German names in the app are „Nur Bons“ (Orders only), „Bargeldlos“ (Cashless), „Alle Funktionen“ (All features) and „Alle Funktionen (Bestand)“ (All features, existing).

:::note[Not tax advice]
We describe how OpenEOS works technically and what we know about the rules. This is not tax advice. Check the rules for your club yourself or with your tax advisor.
:::

## The three operating modes {/* #uebersicht */}

| Operating mode | What works | Money in OpenEOS |
|---|---|---|
| **Orders only** (Nur Bons) | Take orders, kitchen, pickup and order tickets – without prices and without payments. Payment happens outside OpenEOS, e.g. with an open cash box or tokens. | No prices, no payments |
| **Cashless** (Bargeldlos) | All features with card payments (SumUp) and online prepayment. There is no cash in OpenEOS. | Card and online |
| **All features** (Alle Funktionen) | Cash, card and online payment. | Cash, card and online – in Germany only with an active [cloud TSE](./integrationen/cloud-tse.md) |

Organizations that existed before the operating modes keep running as **All features (existing)** until they pick a mode. More under [Existing organizations](#bestand).

## What works in which mode {/* #vergleich */}

| | Orders only | Cashless | All features |
|---|---|---|---|
| Ordering, kitchen and stations, pickup, tables, displays, shift plans | yes | yes | yes |
| Prices at the till, on tickets and on the customer display | no prices | yes | yes |
| Check out at the till | no – orders are completed with **Picked up** or **Close table** | card (SumUp) | cash and card |
| Split bill, combined payment, tips | no | by card | in cash or by card |
| Online shop and QR ordering | no, the shop shows “orders on site only” | with online prepayment | with online prepayment |
| Refunds | no | only to card or online payment | yes |
| [Deposits](./pfand.md) | no | only **Offset** | **Pay out** and **Offset** |
| [Discount vouchers](./rabatt-bons.md) | no | yes | yes |
| Cash drawer | no | no | yes |
| [Reports](./auswertung.md) | quantities only | quantities and revenue | quantities and revenue |

The rules are not only in the interface. The server also rejects every action the operating mode does not allow, no matter which till or program it comes from.

## Orders only {/* #nur-bons */}

In **Orders only**, OpenEOS works purely as an order system. Your team takes orders on the till devices, OpenEOS routes them to the kitchen and bar, and orders are completed without payment. There is no till module in this mode: OpenEOS shows no prices and takes no payments.

### What still works {/* #nur-bons-was-geht */}

- **Ordering** on the till devices, at the counter and in table service, as described under [Selling at the till](./kasse.md) – without amounts.
- **Routing** to the kitchen, bar and other [locations](./standorte.md): kitchen and order tickets and [kitchen and bar displays](./anzeigen.md). Tickets carry no prices.
- **Customer display:** it shows items and quantities, no prices.
- Marking items as **ready**, **picked up** or **served**.
- **Cancelling** whole orders and single items, without a refund.
- **Reports:** quantities only, no revenue. This also applies to reports an [AI agent](./ki-agenten.md) fetches.

### What is not available {/* #nur-bons-gesperrt */}

- No **checkout**: no cash, no card, no SumUp payments.
- No **split bill**, no combined payments, no **tips**.
- No **refunds**, no **cash drawer**, no receipts.
- No **deposit** and no **discount vouchers**.
- No orders in the **online shop** or via **QR code**. Instead of the menu and cart, the shop shows the notice “orders on site only”.

### Completing orders {/* #abschliessen */}

At the till, the flow ends with **Send order**. Without payment, orders need a different way to be completed:

| Order | When it is completed |
|---|---|
| At the counter or for pickup, **without** items for a location | Right when it is sent. |
| At the counter or for pickup, **with** items for a location | On handover: you tap **Picked up** in the till's **Open orders**, or all items for the locations are marked as handed over. |
| At a table | The orders stay open at the table until the server taps **Close table**. This button replaces **Check out** and completes all open orders of the table. |

While a location is still preparing an item, the order cannot be completed.

### Taking payment outside OpenEOS {/* #ausserhalb */}

You take the money outside OpenEOS, for example with an open cash box or with tokens you sell beforehand. Your club is responsible for the record-keeping duties that come with it. What they involve is explained in the [FAQ on openeos.de](https://openeos.de/en/faq#offene-ladenkasse).

## Cashless {/* #bargeldlos */}

In **Cashless** all features are available, but payment only works by card via [SumUp](./integrationen/sumup.md) and online: in the online shop and with QR ordering. There is no cash in OpenEOS – no payment method, no button, no setting.

| Action | Cashless |
|---|---|
| Checkout | No **Cash** method, no quick amounts, no change. The till starts with **Card** (with tip); **Discount** and **Split bill** remain. |
| Open orders, split bill, order history | The same methods without cash. Split and combined payments work by card. |
| Tip | Card only. |
| Refund | Only back to the original card or online payment. A cash payment from before the switch can no longer be refunded through OpenEOS; the till and the admin area then show "No cash refund". |
| Deposit return | There is no **Pay out**. You offset returned deposits against new deposits in the same sale (**Offset**). Without a cart the deposit return is blocked and explains why. |
| Cash drawer | Does not open; the menu item **Open cash drawer** is missing. |

Without SumUp the till cannot take payments in this mode; only orders paid online or in advance can be completed. That can be enough if you only sell through the shop.

With SumUp in [test mode](./veranstaltungen.md) the till triggers no real card payments. So you can still run through the flow, it then only books the card (like an external terminal).

## All features {/* #alle-funktionen */}

In **All features** the till accepts cash, card and online payments: cash is the first payment method, the till works out change, pays out deposits in cash and opens the cash drawer. Everything else is under [Selling at the till](./kasse.md#kassieren).

- **In Germany**, the till in “All features” only accepts cash with an active, certified **cloud TSE**. It is included in the event price and comes automatically: when you activate an event, OpenEOS switches the cloud TSE on and sets it up for the first event day – see [Cloud TSE](./integrationen/cloud-tse.md#automatisch). You can therefore choose “All features” as soon as a paid event is coming up; the card then shows *The cloud TSE will be set up automatically on …*, and cash works from that day on. Without a paid event the mode is greyed out (“needs an activated event”). Once the TSE is active, “Cashless” automatically becomes “All features”. If the TSE is no longer active later on, the till stops accepting cash – the server checks this on every cash payment – and OpenEOS shows you a notice.
- **In all other countries** you can choose “All features” without a TSE. Which rules apply there is described under [Austria, Switzerland and other countries](#andere-laender).

## Cash and the TSE {/* #tse */}

:::info[Cash and the TSE]
In Germany, an electronic till that can accept cash needs a certified TSE (technical security system). According to the German Federal Ministry of Finance, it is enough that your club can switch cash on itself – whether it actually does so makes no difference.
:::

That is why OpenEOS only allows cash in Germany with an active TSE. Without a TSE you choose **Orders only** or **Cashless**. Neither has cash in OpenEOS, and your club cannot switch it on itself either: cash only works with an active TSE – even if you choose “All features” beforehand with a paid event, the till only accepts cash once the TSE is set up. You can therefore switch between “Orders only” and “Cashless” yourself at any time – it makes no difference to the TSE question.

According to the ministry, ordering systems without a till module are not covered by § 146a AO. You can only do without a TSE, however, if your club cannot switch cash on itself and this is proven in the system documentation (Verfahrensdokumentation), for example by a [certificate from the manufacturer](#bescheinigung). In individual cases your tax office decides; if you are unsure, talk to your tax advisor.

How to set up the TSE, what is on the receipt and what happens during an outage is described under [Cloud TSE](./integrationen/cloud-tse.md). More in the [FAQ on openeos.de](https://openeos.de/en/faq#tse).

## Switching the operating mode {/* #wechseln */}

1. Open **Settings → Organization → Operating mode**.
2. Choose the new operating mode and tap **Switch to “…”**.
3. Read the confirmation: it shows what the switch changes. Confirm with **Switch**. If, in Germany without a TSE, you cannot come back to “All features” afterwards, tick the checkbox first and confirm with **Switch for good**.

Only admins of the organization can do this. The tills switch immediately, no reload needed. Your organization's [country](#land) must be set first.

Ideally switch between two events and not while sales are running.

Our support can also switch the operating mode, for example at your request. Support always gives a reason. The same rules apply to support: in Germany, “All features” is only available with an active TSE or a paid event the TSE automatically follows, even through support.

### History {/* #verlauf */}

Below the selection you see since when the current mode applies, and below that the **History**: every switch with its time, the person who made it and the old and new mode (for example “All features (existing) → Cashless”). Switches by our support are listed as “OpenEOS-Support” with the reason. Nobody can edit the history. This lets you show which mode applied when.

## Manufacturer's certificate {/* #bescheinigung */}

If your organization in Germany works in **Orders only** or **Cashless**, admins find the **Download certificate** button under **Settings → Organization → Operating mode**. The manufacturer's certificate is a PDF (in German) for your system documentation. It confirms that cash cannot be recorded in your organization and is only possible in OpenEOS with an active certified TSE, and it contains the history of operating modes.

Add the certificate to your system documentation. Download a new one after every change of the operating mode.

## Country of the organization {/* #land */}

Every organization in OpenEOS has a **country**. It is required, because it decides which operating modes you can choose.

- **New organizations** choose the country when [registering](./registrierung-login.md) or under **New organization**. Germany, Austria and Switzerland are at the top of the list, followed by all other countries.
- **Existing organizations without a country** are asked once, in the [dashboard](./dashboard.md) and in the settings. An admin picks the country and confirms.

You set the country **once**. Afterwards only our support can change it, with a reason. That way it stays traceable which rule applied when. Under **Settings → Organization → Contact** you see the country read-only.

## Germany {/* #deutschland */}

| Operating mode | Without a TSE | With an active cloud TSE |
|---|---|---|
| Orders only | available | available |
| Cashless | available | available |
| All features | available with a paid event – the TSE is set up automatically, cash only from then on | available |
| All features (existing) | stays until you pick a mode or choose “with cloud TSE” when activating an event | – |

For “Orders only” and “Cashless” you get the [manufacturer's certificate](#bescheinigung).

## Existing organizations: All features (existing) {/* #bestand */}

Organizations that existed before the operating modes (November 2026) keep working as **All features (existing)** as before – also in Germany and also without a TSE – until you pick a mode. Nobody switches your organization automatically in the middle of the season.

If your organization is in Germany, a notice in the dashboard and in the settings explains the TSE requirement and asks you to confirm the country and pick an operating mode. When you activate an event, the payment dialog asks *With cloud TSE (legally compliant cash)?* – with **Yes** your operating mode becomes “All features” and the cloud TSE is set up automatically; with **No** nothing changes. Whether you record cash in OpenEOS without a TSE until then is your own responsibility; ideally check with your tax advisor.

:::warning[No way back in Germany without a TSE]
If you pick another operating mode in Germany, the existing status ends. You can then only go back to “All features” with an active TSE or a paid event (the TSE then follows automatically). The same applies to our support.
:::

Outside Germany you can choose “All features” again at any time. If you choose it explicitly there, the features stay the same; only the “(existing)” label disappears.

If you had already changed something before, OpenEOS carried it over: the former cashless mode and “Germany without cash” became **Cashless**, “Order only” became **Orders only**. The history shows an entry “Umstellung auf Betriebsarten” (switch to operating modes) for this.

## Austria, Switzerland and other countries {/* #andere-laender */}

Outside Germany you can choose all three operating modes freely, “All features” with cash also without a TSE. Check yourself whether OpenEOS is permissible for your club. This is not tax advice.

### Austria {/* #oesterreich */}

Austria has a **cash register obligation (RKSV)** from €15,000 annual turnover per business if more than €7,500 of it is cash turnover. **Card payments count as cash turnover in Austria** – also in the “Cashless” mode. OpenEOS currently creates **no RKSV signature**.

Exemptions exist, for example, for small festivals of non-profit clubs of up to 72 hours per calendar year and for canteens of non-profit clubs up to €45,000 annual turnover (net) if they are run on at most 52 days a year (limit since 2026). Further conditions apply to the exemptions. Check the rules for your club yourself or with your tax advisor.

Sources: [Cash register obligation on the Austrian business service portal (USP)](https://www.usp.gv.at/themen/steuern-finanzen/steuerliche-rechte-und-pflichten/registrierkassen/registrierkassenpflicht.html) and [cash registers at the Austrian Ministry of Finance](https://www.bmf.gv.at/themen/steuern/fuer-unternehmen/registrierkassen.html) (German).

### Switzerland {/* #schweiz */}

To our knowledge, Switzerland has no general cash register or fiscalisation obligation. Record-keeping and VAT rules still apply to clubs. Check yourself or with your fiduciary or tax advisor what applies to your club.

### Other countries {/* #weitere-laender */}

Many countries have their own rules for tills (e.g. Italy, France, Poland, Czechia). Check yourself whether OpenEOS is permissible for you there.

## Self-hosted {/* #selbst-betreiben */}

If you run OpenEOS [yourself](./selbst-betreiben/intro.md), you are the operator of the system. The manufacturer's certificate does not exist there.

## See also

- [Selling at the till](./kasse.md)
- [Deposits](./pfand.md)
- [Cloud TSE](./integrationen/cloud-tse.md)
- [SumUp](./integrationen/sumup.md)
- [FAQ on openeos.de: Cash, POS and TSE](https://openeos.de/en/faq#tse)
