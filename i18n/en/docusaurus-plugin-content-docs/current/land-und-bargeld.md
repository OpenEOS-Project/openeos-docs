---
sidebar_position: 3
title: Country and cash
description: Which cash rule OpenEOS applies depending on your organization's country – Germany without a TSE, existing organizations, Austria, Switzerland and other countries.
---

# Country and cash

Every organization in OpenEOS has a **country**. It decides which till rules OpenEOS applies for you – above all, whether the till can record cash. This page explains the rule per country, what applies to organizations that existed before, and how the voluntary switch works.

:::note[Not tax advice]
We describe how OpenEOS works technically and what we know about the rules. This is not tax or legal advice. Check the rules for your club yourself or with your tax advisor.
:::

## Setting the country {/* #land */}

- **New organizations** choose the country when [registering](./registrierung-login.md) or under **New organization**. Germany, Austria and Switzerland are at the top of the list, followed by all other countries.
- **Organizations that existed before November 2026** often have no country yet. The [dashboard](./dashboard.md) and **Settings → Organization → Payments** then ask you to set the country of your organization. An admin picks the country and confirms.

You set the country **once**. Afterwards only our support can change it, with a reason; every change is listed in the history under **Payments**. That way it stays traceable which rule applied when.

## The rule per country {/* #regeln */}

| Country | Cash in OpenEOS | Cashless mode |
|---|---|---|
| Germany, new organization | **Blocked** ("Germany without cash") as long as OpenEOS has no TSE | not available (cash is off anyway) |
| Germany, existing organization | allowed as before, until you switch voluntarily | as before, you switch it yourself |
| Austria | allowed | as before |
| Switzerland | allowed | as before |
| all other countries | allowed | as before |

The [Order only](./nur-bestellen.md) operating mode applies regardless of the country and takes precedence over everything: in it there are no payments in OpenEOS at all.

## Germany without cash {/* #deutschland-ohne-bargeld */}

According to the German Federal Ministry of Finance, a till that can record cash needs a certified TSE – even if the club could only switch cash on itself. The [cashless mode](./bargeldlos.md) you switch yourself therefore does not exempt you from the TSE requirement on its own. OpenEOS does not have a TSE yet; the integration is in progress.

That is why new organizations in Germany get the rule **Germany without cash**:

- **Cash is blocked on the server**, not just in the interface: no cash payments, no cash refunds, no cash deposit payouts, no cash drawer. There is no switch your club could use to turn cash on.
- **Card and online payments** work as usual: card payments via [SumUp](./integrationen/sumup.md), prepayment in the online shop and for QR code orders. Refunds only go back to these payments.
- **Deposits (Pfand)** are offset against new deposits in the same sale at the till; paying them out in cash is not possible.
- **Cash outside OpenEOS:** if you take cash, you handle it in an open cash box. At the till you then choose **Close without payment** (see below).
- **Manufacturer certificate:** under **Settings → Organization → Payments** an admin downloads a PDF certificate. It confirms that cash cannot be recorded in OpenEOS and cannot be switched on by your organization, that card payments are recorded, and that cash is handled in an open cash box outside OpenEOS. File it with your procedural documentation.

Once the TSE integration is available, a German organization with an active TSE can record cash in OpenEOS again – without you having to change anything.

### Close without payment {/* #ohne-zahlung-abschliessen */}

With "Germany without cash" the checkout sheet offers **Card** (with SumUp) and **Close without payment (open cash box)**.

1. Take the amount shown in your open cash box.
2. Choose **Close without payment** and tap the button at the bottom.

The order is then settled: **no payment** and **no paid amount** is recorded in OpenEOS. Items without a station count as handed out. If the kitchen is still working on the order, it stays visible there and completes once the last item is handed out. An order closed this way no longer shows up under open orders or at the table and can no longer be charged.

This also works for open orders at a table, under **Open orders** and in the order history. It is not offered when **splitting a bill** – that creates partial payments.

The record-keeping duties for the open cash box lie with your club.

## Existing organizations {/* #bestand */}

Every organization that existed before the country rule was introduced (November 2026) is **grandfathered**: it behaves as before – cash is possible and you switch the cashless mode yourself – whatever country is set.

If your organization is in Germany, OpenEOS shows a notice about the TSE requirement with three options:

1. **Keep working as before.** Whether that is permissible for you is your own responsibility.
2. **Switch to "Germany without cash".** Cash is then blocked and you get the manufacturer certificate.
3. **Wait for the TSE.** The integration is in progress.

You can hide the notice on the dashboard; it stays under **Settings → Organization → Payments**.

### Switching voluntarily {/* #wechseln */}

1. Open **Settings → Organization → Payments** (or the notice on the dashboard).
2. Tap **Switch to "Germany without cash"**.
3. Read the confirmation, tick the box and confirm with **Switch for good**.

Only admins can do this. The tills switch over immediately. The switch is **one-way**: only our support can switch back, with a reason. The switch is listed in the history and on the certificate.

## Austria {/* #oesterreich */}

Austria has a **cash register obligation (RKSV)** from €15,000 annual turnover per business if more than €7,500 of it is cash turnover. **Card payments count as cash turnover in Austria.** OpenEOS currently creates **no RKSV signature**.

Exemptions exist, for example, for small festivals of non-profit clubs of up to 72 hours per calendar year and for canteens of non-profit clubs up to €45,000 annual turnover (net) if they are run on at most 52 days a year (limit since 2026). Further conditions apply to the exemptions. Check the rules for your club yourself or with your tax advisor.

Sources: [Cash register obligation on the Austrian business service portal (USP)](https://www.usp.gv.at/themen/steuern-finanzen/steuerliche-rechte-und-pflichten/registrierkassen/registrierkassenpflicht.html) and [cash registers at the Austrian Ministry of Finance](https://www.bmf.gv.at/themen/steuern/fuer-unternehmen/registrierkassen.html) (German).

## Switzerland {/* #schweiz */}

To our knowledge, Switzerland has no general cash register or fiscalisation obligation. Record-keeping and VAT rules still apply to clubs. Check yourself or with your fiduciary or tax advisor what applies to your club.

## Other countries {/* #andere-laender */}

Many countries have their own rules for tills (e.g. Italy, France, Poland, Czechia). Check yourself whether OpenEOS is permissible for you there.

## Where you see what {/* #wo */}

- **Dashboard:** the notice for your country, once; the cross hides it for your account in this browser. The request to set the country cannot be hidden.
- **Settings → Organization → Payments:** country, cash rule, the notice permanently, the certificate (with "Germany without cash") and the history.
- **Settings → Organization → Contact:** the organization's country, read-only.

## Self-hosted {/* #selbst-betreiben */}

If you run OpenEOS [yourself](./selbst-betreiben/intro.md), you are the operator of the system. The "Germany without cash" lock and the manufacturer certificate do not exist there; organizations behave as before.

## See also

- [Cash and cashless mode](./bargeldlos.md)
- [Order only (without a till)](./nur-bestellen.md)
- [Till: checkout](./kasse.md#kassieren)
- [FAQ on openeos.de: Does this also apply in Austria and Switzerland?](https://openeos.de/en/faq#laender)
