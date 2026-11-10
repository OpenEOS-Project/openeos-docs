---
title: Tips
description: Who tips belong to, which VAT rate OpenEOS books them with, when they are tips to employees, and how to pay out card tips to employed servers.
---

# Tips

The till takes tips when [checking out](./kasse.md#kartenzahlung) – by card as a separate amount or by rounding up. OpenEOS then books them according to **who they belong to**: the club or an employed server. That decides whether they carry VAT and whether you may pay them out.

:::note[Not tax advice]
We describe how OpenEOS books tips and the assessment this is based on. This is not tax advice. Check the rules for your club yourself or with your tax advisor.
:::

## Who the tip belongs to {/* #empfaenger */}

| Who checks out | The tip belongs to | DSFinV-K | VAT |
|---|---|---|---|
| Volunteer helper, member, device without a server | the **club** | `TrinkgeldAG` | yes, at the rate of the food and drinks (for a VAT-liable club) |
| [Server](./bedienungen.md#arbeitnehmer) marked **„Arbeitnehmer (Lohnkonto)“** (employee, payroll) | the **employed server** | `TrinkgeldAN` | no, not consideration of the club |

What counts is the server who takes the payment. The „Arbeitnehmer (Lohnkonto)“ flag is off by default.

**Why volunteers do not get tips "to employees":** Only tips to employees – people in an employment relationship (staff, mini-jobs) – are tax-free under § 3 Nr. 51 EStG and booked as `TrinkgeldAN`. Unpaid volunteers are not employees. If their tips go into the club's cash box, they are part of the consideration for a VAT-liable club (Abschn. 10.1 Abs. 5 UStAE). For helpers who receive a volunteer or trainer allowance (§ 3 Nr. 26/26a EStG) it depends on the individual case – ask your tax advisor.

## Tips to the club: VAT rate {/* #steuersatz */}

Tips to the club share the VAT rate of the food and drinks they are given for. If a receipt has goods at 19 % and 7 %, OpenEOS splits the tip **in proportion to the net amounts** of the goods per rate. Deposits do not count. A rounding remainder goes to the larger share.

**Example:** drinks for 9.00 € (19 %), food for 2.90 € (7 %) and a 1.00 € tip.

| | Drinks 19 % | Food 7 % | Total |
|---|---|---|---|
| Gross | 9.00 € | 2.90 € | 11.90 € |
| Net | 7.56 € | 2.71 € | 10.27 € |
| Share | 73.6 % | 26.4 % | 100 % |
| **Tip** | **0.74 €** | **0.26 €** | **1.00 €** |
| Gross incl. tip | 9.74 € (incl. 1.56 € VAT) | 3.16 € (incl. 0.21 € VAT) | 12.90 € |

It shows up the same everywhere:

- **Receipt:** the tip is a line of its own, „Trinkgeld“ (tip); the VAT lines include the tip's share.
- **Cloud TSE and DSFinV-K:** `TrinkgeldAG` split onto VAT key 1 (19 %) and 2 (7 %).
- **Reports:** the [VAT](./auswertung.md) report shows tips to the club per VAT rate.
- **Refund:** a refund mirrors the split of the original receipt.

There is no explicit rule from the tax authorities for mixed receipts. Splitting by the ratio of the consideration is considered appropriate and hard to challenge.

## Tips to employees {/* #arbeitnehmer */}

If a server marked „Arbeitnehmer (Lohnkonto)“ checks out, OpenEOS books their tip as `TrinkgeldAN`: not taxable (VAT key 5), without VAT. In the VAT report it is shown for information only. Cash tips stay with the server anyway; they only appear in OpenEOS if they go through the till – above all card tips.

## Paying out card tips {/* #auszahlung */}

Card tips end up in the club's account. You can pay them out in cash to an **employed** server:

- **Who gets it:** only servers marked „Arbeitnehmer (Lohnkonto)“. OpenEOS refuses the payout for everyone else: for volunteers the card tip belongs to the club. If the club passed it on, it would not be a tip but a benefit from the club (possibly remuneration or a use of funds).
- **How much:** at most the server's open card tips, i.e. their card tips minus what has already been paid out.
- **Who pays out:** a shift lead at the till or an admin in the admin area, also right at [settling](./bedienungen.md#abrechnen).
- **Cash only:** the payout only works where the till may accept cash (operating mode [All features](./betriebsarten.md#alle-funktionen)).
- **Receipt and acknowledgement:** every payout is a receipt of its own, signed with the [Cloud TSE](./integrationen/cloud-tse.md): `TrinkgeldAN` and cash both negative, with the recipient on the receipt. OpenEOS also prints an acknowledgement with a signature line. The payout cannot be changed or deleted.
- **Cash book:** the money paid out reduces the expected balance of the drawer it comes from (see [Cash book](./kassenbuch.md)).

## Small businesses {/* #kleinunternehmer */}

If your organization works **without VAT** (small business under § 19 UStG), OpenEOS books tips to the club as `TrinkgeldAG` with VAT key 6 (tax-exempt), without VAT. They count towards the total turnover under § 19 UStG. Tips of employed servers stay `TrinkgeldAN` with key 5.

Non-profit clubs record tips to the club as income of their commercial business operations (§ 64 Abs. 3 AO).

## Tips without a receipt {/* #trinkgeldglas */}

Tips given without a receipt – e.g. into the **tip jar** at the counter – do not go through OpenEOS. For a VAT-liable club this money is consideration too. Decide in your [procedure documentation](./verfahrensdokumentation.md#trinkgeld) at which rate you tax it: a flat 19 % or in the ratio of the day's revenue at 19 % and 7 %.

## Older transactions {/* #bestand */}

Until November 2026 OpenEOS always booked tips at 0 % and decided for the whole organization whether they go to the club or to the helpers (setting **Tips go to** under **Cloud TSE → Cash audit (Kassen-Nachschau)**). Transactions from that time stay as they were signed. For new transactions only the server's flag counts.

## See also

- [Servers](./bedienungen.md)
- [Selling at the till](./kasse.md)
- [Cash register inspection and DSFinV-K](./kassen-nachschau.md)
- [Procedure documentation – template](./verfahrensdokumentation.md)
