---
title: Procedure documentation – template
description: Template for the procedure documentation (Verfahrensdokumentation) of your till with OpenEOS – to copy and fill in, covering operating mode, deposits, tips, server settlement, tokens, outage rule, receipts and retention.
---

# Procedure documentation – template

Anyone who runs an electronic till in Germany must be able to describe how it is set up and how it is used – the **procedure documentation** (Verfahrensdokumentation). The tax office asks for it during a [cash register inspection](./kassen-nachschau.md) or audit. The template below covers what belongs in it when you use OpenEOS. You find the technical details in OpenEOS; your club decides the rules itself.

:::note[Not tax advice]
The template is based on a tax assessment of OpenEOS from November 2026. It does not replace individual tax or legal advice. Agree on your procedure documentation with your tax advisor, especially the sections on operating without a TSE, online orders, the deposit transition and tokens. This is not tax advice.
:::

:::info[Written in German]
The tax office expects the procedure documentation in German. The **German version** of this page has the template in German (switch the language at the top). The English version below helps you understand the sections; the quoted receipt texts and DSFinV-K terms are kept in German.
:::

## How to use the template {/* #nutzen */}

1. Copy the text from **[Club name] – procedure documentation of the till** into your word processor. As Markdown it is in the [source of the German page on GitHub](https://github.com/OpenEOS-Project/openeos-docs/blob/main/docs/verfahrensdokumentation.md).
2. Replace all placeholders in square brackets, such as `[Club name]`, and delete sections that do not apply to you (e.g. cash if you work in "Cashless").
3. Attach: the [manufacturer's certificate](./betriebsarten.md#bescheinigung), the history of operating modes, the outage log of the [Cloud TSE](./integrationen/cloud-tse.md), your cash handling instructions.
4. Whenever something changes – operating mode, deposit rates, tax status, an OpenEOS version with new processes – update the documentation and add the change to the change history. Keep every version for ten years.

The notes in the sections (in *italics*) are for you while filling in and can be removed afterwards.

---

## [Club name] – procedure documentation of the till {/* #vorlage */}

As of: [date] · Version: [number] · Responsible: [name, role in the club]

### 1. Purpose and scope {/* #zweck */}

This procedure documentation describes how [club name], [address], tax number [tax number] or VAT ID [VAT ID], records its revenue at [events, e.g. summer festival, Christmas market] with the till and ordering system OpenEOS. It applies to all devices registered for the club in OpenEOS and to everyone who orders, takes payments or settles on them.

It serves as proof of proper cash management (§§ 145–147 AO, § 146a AO, KassenSichV, GoBD) and is kept for ten years together with the till data.

### 2. System in use {/* #system */}

| Item | Value |
|---|---|
| Software | OpenEOS (till and ordering system, web app), provider [provider per contract] |
| Version | [version] |
| Organization in OpenEOS | [name of the organization] |
| Till ID (serial number of the till, DSFinV-K `KASSE_SERIENNR`) | `OEOS-[…]` – equal to the TSE client ID; shown on the Cloud TSE page and on every receipt |
| TSE | Swissbit Cloud TSE 2, serial number [TSE serial number], in operation since [date] |
| Place of business | [club seat or fixed festival grounds] |
| Notification to the tax office (§ 146a Abs. 4 AO) | submitted on [date] via [Mein ELSTER / authorized representative] |
| Devices (terminals) | see table |

| Device in OpenEOS | Type (tablet, phone, PC) | Owner (club, private) | Use (fixed till, server, kitchen, display) |
|---|---|---|---|
| [Till 1] | [tablet] | [club] | [fixed till at the bar] |
| [Till 2] | [phone] | [private] | [server tent A] |

All devices are input devices of **one** till with **one** TSE (AEAO zu § 146a Nr. 1.6). The till ID does not depend on the device; changing helper phones do not change it. Pure ordering and kitchen devices without payments are not tills of their own.

*Note: For a rented software till, the acquisition date for the notification is the start of provision (activation), and manufacturer and model are the details of the OpenEOS provider, not of the tablet (AEAO zu § 146a Nr. 1.16.2.6). Clarify the notification with your tax advisor in individual cases.*

### 3. Responsibilities {/* #verantwortung */}

| Task | Person / role |
|---|---|
| Admin of the organization in OpenEOS (operating mode, tax details, devices) | [name] |
| Cash handling on the festival day, shift lead | [names] |
| Club cash book, reconciliation with the festival till | [treasurer] |
| Exports and archiving | [name] |

### 4. Operating mode {/* #betriebsart */}

The club works in the operating mode: ☐ **Orders only** · ☐ **Cashless** · ☐ **All features** (with Cloud TSE). Since: [date]. The history of operating modes from OpenEOS is attached.

*Delete the paragraphs that do not apply.*

**Orders only.** OpenEOS takes orders and prints kitchen and order tickets, without prices and without payments. Payment is taken outside OpenEOS: [open cash box / tokens, see section 13]. Flow: order on the device → kitchen ticket → payment outside. The manufacturer's certificate ("cash cannot be recorded") is attached. The order data is exported and kept for ten years (AEAO zu § 146a Nr. 2.1.1). Control: [name] compares the ordered quantities with the cash report of the open cash box and the returned tokens.

**Cashless.** OpenEOS only accepts cashless payments; no TSE is used. Basis: the system cannot record cash payments on site (BMF FAQ; AEAO zu § 146a Nr. 1.2). The manufacturer's certificate is attached. The following applies:

- **Positive list of payment methods:** card via [SumUp card reader / external terminal], online payment via [SumUp Online / PayPal / Google Pay / Apple Pay]. OpenEOS rejects other payment methods on the server.
- **Technical lock:** cash cannot be switched on in the organization; in Germany "All features" is only possible with an active Cloud TSE. Only admins of the organization ([names]) may change the operating mode; every change is logged with time and person.
- **No tokens, vouchers, credit cards or customer accounts** as payment, neither in OpenEOS nor at the same stand outside OpenEOS.
- **Separation from other tills:** the OpenEOS till has its own till ID. Receipts and orders are not handed over to tills with cash, not paid there and not refunded there, and vice versa. Other tills at the festival: [none / description].
- **Reconciliation with the statements** of the payment provider: [weekly / after every event] by [name], using the orders export with payment and refund reference.
- **Refunds** only to the original means of payment, no cash refunds.

**All features (with Cloud TSE).** OpenEOS accepts cash, card and online payments. Every transaction is secured with the Cloud TSE, including online payments, orders before the kitchen ticket, cash book, server settlements, selling, accepting and buying back tokens (section 13) and training transactions. Without an active TSE, cash is technically locked.

### 5. Deposits {/* #pfand */}

A deposit is part of the consideration and carries the VAT rate of the goods it is charged for; the return reduces consideration and VAT at the same rate (Abschn. 10.1 Abs. 8 UStAE, § 17 UStG). In OpenEOS every deposit type has a fixed rate.

| Deposit type | Amount | VAT rate | Reason |
|---|---|---|---|
| Drink cup | [2.00 €] | 19 % | Drinks are taxed at 19 %. |
| Tableware for food | [5.00 €] | 7 % | Food in catering services is taxed at 7 %. |
| [more] | [ ] | [ ] | [ ] |

Cups used for drinks with different rates: [uniformly 19 % on issue and return].

**Transition:** deposits sold without VAT before the switch in November 2026 (old balance) do not reduce VAT when returned. OpenEOS books returns against the old balance first (not taxable, DSFinV-K key 5), only then at the rate of the deposit type. Open old balance as of [date]: [amount]. ☐ The old balance is reduced over time. ☐ The old balance was taxed once on [date] in agreement with the tax advisor.

A netting procedure (Abschn. 10.1 Abs. 8 Satz 5 UStAE) is ☐ not used · ☐ used, approved on [date].

### 6. Tips {/* #trinkgeld */}

- **Tips to the club** (all volunteer helpers): they are consideration (Abschn. 10.1 Abs. 5 UStAE) and booked as `TrinkgeldAG` at the rate of the main supply, split for mixed receipts in proportion to the net consideration at 19 % and 7 %. OpenEOS calculates this automatically.
- **Tips to employees** (`TrinkgeldAN`, § 3 Nr. 51 EStG): only for servers marked „Arbeitnehmer (Lohnkonto)“. Employees of the club: [none / names or roles]. Volunteers are not employees.
- **Tips without a receipt** (e.g. tip jar): counted by [name] [at the end of every festival day], entered into the club's cash book and taxed ☐ at a flat 19 % · ☐ in the ratio of the day's revenue at 19 % and 7 %.
- **Paying out card tips:** only to employees, through OpenEOS with its own TSE-secured receipt and a signed acknowledgement. For volunteers the card tip stays with the club and is not paid out.

### 7. Server settlement {/* #kellnerabrechnung */}

☐ We work without server profiles (section not applicable). ☐ We work with [servers](./bedienungen.md):

- Every booking is attributed to the server signed in (PIN on shared tills or a fixed server per device).
- **Flow:** at the end of the shift [a shift lead / an admin] settles every server in OpenEOS. The cash stays in the till's drawer; [describe who counts when]. Open tables are handed over first or settled with a mandatory note.
- **Securing:** with the Cloud TSE every settlement is a TSE-secured transaction with expected amount, counted amount and difference; the settlement cannot be changed, a reprint is marked "Kopie".
- **Differences:** [e.g. differences up to [amount] are booked as a cash difference in the cash count; [name] clarifies larger differences with the server and records the result in [place].]
- **Live cash check:** during a cash register inspection, the live cash check in OpenEOS shows the expected cash of every server since their last settlement.
- **Tokens** (if used, section 13): servers hand in accepted tokens with their settlement (block "WERTMARKEN (abgeben)"); they are counted but are not part of the expected cash. Cash from token sales increases the expected cash, cash from a buy-back reduces it.
- Server settlements are created and kept electronically only.

### 8. Outage rule {/* #ausfall */}

- The receipt is only issued (printed or digital) once the TSE has finished and signed the transaction (AEAO zu § 146a Nr. 2.2.3.3, 2.5.2, 2.5.7).
- If the TSE does not answer within a few seconds, OpenEOS issues an **outage receipt** with the note „TSE nicht erreichbar – Beleg ohne Signatur“. Sales continue; the receipt obligation remains (AEAO zu § 146a Nr. 1.14.2, 1.14.3).
- There is **no re-signing**. If a signature arrives after the receipt was issued, the receipt stays an outage receipt; OpenEOS stores the signature with the note „Signatur nach Belegausgabe“.
- OpenEOS keeps an **outage log** (start, end, reason) and notifies the admins (AEAO zu § 146a Nr. 1.14.1). We fix the cause without delay (Nr. 1.14.4): [e.g. check the internet connection, spare router, report to support].
- **Outage statistics** (from the outage log, updated yearly):

| Year | Number of outages | Total duration | Most frequent reason |
|---|---|---|---|
| [2026] | [ ] | [ ] | [ ] |

- If the internet connection fails completely, OpenEOS does not accept payments; we [stop taking payments / continue with an open cash box according to the cash handling instructions].

### 9. Change money and cash transfers {/* #wechselgeld */}

*Only with cash.*

- The **opening balance** is only the cash already in the till when it opens (what was left at the last cash count).
- **Change money from the club's cash box** is booked as the cash transfer „Wechselgeld aus Vereinskasse“, skimming to the club's cash box as the cash transfer „Abschöpfung an Vereinskasse“. A club has no private contributions.
- The **counter-record** is the treasurer's cash book: every issue of change money and every return appears there with the same amount and date.
- Flow on the festival day: [change money per till, who hands it out, when cash is skimmed, who counts at the end, where the money is kept].

### 10. Issuing receipts {/* #belegausgabe */}

- After every payment the till offers the receipt: ☐ as a **QR code** to download as PDF/PNG · ☐ **printed** · ☐ by **email**. The QR code always appears (AEAO zu § 146a Nr. 2.5.3, 2.5.6).
- Staff only choose "**No receipt**" after the receipt was created and offered – printed or shown as a QR code (Nr. 2.5.8). Merely showing it without a way to take it is not enough (Nr. 2.5.4).
- Email addresses are only used for sending.
- Reprints are marked "NACHDRUCK" and carry the same TSE data.

### 11. Orders and kitchen tickets {/* #bestellungen */}

With the Cloud TSE every order without immediate payment is secured as an order before the kitchen ticket; with immediate payment the payment is signed before the kitchen ticket. There are no kitchen tickets without a TSE trace. The receipt shows the order start (DSFinV-K Tz. 2.7.3; AEAO zu § 146a Nr. 2.2.2).

### 12. Online orders {/* #online */}

☐ We use neither an online shop nor QR ordering. ☐ We use [online shop / QR ordering at the table]:

- **With Cloud TSE:** every online payment is signed with the TSE when it comes in and is in the DSFinV-K export (payment type payment service provider). Refunds are refund receipts with a reference, paid back to the payment provider.
- **Without TSE (Cashless):** online orders are not paid or refunded in cash; they are separate from every till with cash.
- The order data is kept for ten years via the orders export (with payment reference).

### 13. Vouchers and tokens {/* #wertmarken */}

- **Free vouchers** of the club (e.g. helper vouchers, free drinks) are booked in OpenEOS as discount vouchers; they are a discount, not a payment method. Issued by [name/role] to [group of people].
- **Sold tokens or vouchers:** ☐ We do not sell any. ☐ We sell tokens outside OpenEOS: issued by [office], redeemed at [stands], exchange [yes/no, how], leftover tokens [handling]. In the operating modes without a TSE ("Cashless", "Orders only") tokens are not accepted as payment at OpenEOS devices (AEAO zu § 146a Nr. 1.2); they are settled outside OpenEOS by counting the returned tokens. Tokens valid for food and drinks are usually multi-purpose vouchers (§ 3 Abs. 15 UStG). ☐ We sell tokens **in OpenEOS** and accept them there as payment (operating mode "All features" with Cloud TSE), see below.

*The following paragraphs only if you run tokens in OpenEOS. Background is under [Tokens](./wertmarken.md).*

**Token types.** Tokens are set up in OpenEOS as token types. Face value, kind and VAT rate are locked as soon as tokens of a type are in circulation.

| Token type | Face value | Marking of the token | Kind | Valid for | Buy-back |
|---|---|---|---|---|---|
| [2 € token] | [€2.00] | [yellow plastic chip with club logo, season 2026] | multi-purpose voucher | [all food, drinks and deposits] | [no / yes, see below] |
| [Drink token] | [€2.50] | [ ] | [single-purpose voucher 19 %] | [all drinks at 19 %] | [ ] |

*Reason for the kind:* tokens valid for goods with different VAT rates (food 7 %, drinks 19 %) are **multi-purpose vouchers** (§ 3 Abs. 15 UStG): the sale is not taxable (DSFinV-K `MehrzweckgutscheinKauf`, key 5); VAT arises on redemption at the rate of the goods. A **single-purpose voucher** (§ 3 Abs. 14 UStG) is only used if all items the token is valid for have the same VAT rate; then the sale is taxed at that rate (`EinzweckgutscheinKauf`) and the redemption carries no VAT. [Reason for each single-purpose voucher.] For small businesses OpenEOS books all tokens as multi-purpose vouchers.

**Issuing.** The tokens themselves are [printed tokens / plastic chips], marked with [club name, value, colour of the season]. Available before the event: [number per type], kept by [name]. They are sold at [central cash desk / office] via OpenEOS (**Sell tokens**), in cash or by card. Every sale is a TSE-secured receipt "WERTMARKEN – Verkauf". Cash from the sale counts towards the expected balance of the drawer but is not revenue. Handed out to the sales points: [number or number ranges, to whom, when].

**Redemption.** At [stands / all tills] the tills accept tokens when taking payment: the number per type is entered, the rest is paid in cash or by card. There is no change in tokens; an overpayment is only booked as a tip after confirming "Rest as tip" (as in section 6). Tokens with an item selection and single-purpose tokens only cover the items they are valid for. The redemption books revenue at the rate of the goods and the voucher redemption as a negative amount (`MehrzweckgutscheinEinloesung`, key 5, or `EinzweckgutscheinEinloesung` at the token's rate); if everything is paid with tokens, the payment type is "Keine" (none). On cancellation or refund the till gives back tokens, never cash.

**Handing in and storage.** Servers or stand managers hand in accepted tokens [with the server settlement / at the end of the shift]. [Name] counts them per type, keeps them in [place] and [invalidates / destroys / reuses them at the next event].

**Buy-back.** ☐ There is no buy-back for cash. ☐ For [token types] we buy back only [conditions, e.g. at the end of the event, at the info stand, whole tokens only]. The buy-back is booked in OpenEOS (**Buy back tokens**) by a person with the "Cancel & refund" permission: always in cash, at most up to the amount in circulation, with a TSE-secured receipt that the guest signs; the receipts are kept in [place]. There is no buy-back at any time without conditions (otherwise the token would rather be a prepaid card). For tax purposes a buy-back of a multi-purpose voucher is an exchange of means of payment (`MehrzweckgutscheinKauf` negative), for a single-purpose voucher a reduction under § 17 UStG.

**Leftover tokens and stock.** The tokens are valid [only for this event / until [date] / indefinitely]. The token report in OpenEOS shows the amount in circulation per type. It is recorded [after every event / at the end of the financial year]: [amount per type]. No VAT arises for unredeemed multi-purpose tokens; their treatment in the club's accounts was [agreed with the tax advisor on [date]].

**Control.** After every event [name] reconciles:

1. counted returned tokens per type ↔ "Redeemed" in the token report and the "WERTMARKEN (abgeben)" blocks of the server settlements,
2. physical token stock before − after ↔ "Sold" in the report,
3. cash from token sales and buy-backs ↔ cash count of the tills.

[Name] clarifies differences above [number / amount] and records the result in [place].

### 14. VAT status {/* #kleinunternehmer */}

☐ **Small business** under § 19 UStG (previous year's revenue at most 25,000 €, current year at most 100,000 €):

- All revenue is in the DSFinV-K export with VAT key 6 („steuerfrei – Kleinunternehmer § 19 UStG“, DSFinV-K Tz. 3.2.6).
- Receipts carry the notice „Steuerfrei nach § 19 Abs. 1 UStG (Kleinunternehmer)“ and no VAT amount (§ 34a UStDV, § 14c UStG).
- [Name] monitors the revenue limits; OpenEOS warns on the dashboard from 80 % of the 100,000 € limit (revenue in OpenEOS only).
- If the club becomes VAT-liable, the status is changed in OpenEOS via "Change tax status": cash point closing first, then the master data change. Changed on: [date].

☐ **VAT-liable**: revenue at 19 % (key 1) and 7 % (key 2).

### 15. Retention {/* #aufbewahrung */}

Uniformly **ten years** (§ 147 Abs. 1 Nr. 1, Abs. 3 AO):

- DSFinV-K exports and cash point closings,
- TSE exports (TAR), including the final exports of decommissioned TSEs (AEAO zu § 146a Nr. 1.15.2),
- training transactions and data on TSE outages,
- server settlements, cash book and order data,
- signed buy-back receipts for tokens and the count records of returned tokens,
- this procedure documentation in all versions with attachments.

OpenEOS keeps the till data for ten years. Digital receipts a guest never fetched are not kept as images; they can be recreated with the same content from the stored data. Data is only deleted after the period has ended; we observe a suspension of expiry under § 147 Abs. 3 AO.

### 16. Backup and export {/* #export */}

- OpenEOS stores the data at the provider and collects the TSE data every night.
- In addition, [name] downloads after every event and stores under [location, e.g. club drive, encrypted USB stick]: DSFinV-K export, TSE export (TAR), orders export, [manufacturer's certificate].
- The checksums (SHA-256) of the exports are stored with them.
- During a cash register inspection (§ 146b AO) we hand over the DSFinV-K and TSE export for the requested period.

### 17. Change history {/* #historie */}

| Version | Date | Change | Who |
|---|---|---|---|
| 1 | [date] | First version | [name] |
| [2] | [date] | [e.g. change of operating mode, new deposit type, new token type, change of tax status, new TSE] | [name] |

---

## See also

- [Operating modes](./betriebsarten.md)
- [Cloud TSE](./integrationen/cloud-tse.md)
- [Cash register inspection and DSFinV-K](./kassen-nachschau.md)
- [Cash book](./kassenbuch.md), [Deposits](./pfand.md), [Tokens](./wertmarken.md), [Tips](./trinkgeld.md), [Servers](./bedienungen.md)
