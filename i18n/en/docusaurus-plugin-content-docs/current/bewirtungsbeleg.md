---
sidebar_position: 21
title: Hospitality receipt
description: Issue a hospitality receipt (Bewirtungsbeleg) at the till – what is on it, what the guest adds, which rules apply.
---

# Hospitality receipt

In Germany, anyone who entertains business partners or customers can deduct 70 % of the cost as a business expense – but only with a proper receipt. OpenEOS issues this **hospitality receipt** (Bewirtungsbeleg) at the till: an invoice with its own number, all details printed by the system, followed by blank lines for what the guest adds themselves.

:::tip[Thanks]
The idea came from [till-mueller](https://github.com/till-mueller) ([openeos-web#9](https://github.com/OpenEOS-Project/openeos-web/issues/9)).
:::

## At the till {/* #ablauf */}

1. After payment tap **Hospitality receipt** under **Receipt** (or later in the **Order history** → **Receipt** → **Hospitality receipt**). For a table with several orders, the receipt covers all orders paid together.
2. The till shows the invoice amount and asks for:
   - **Name / company of the host** – required above 250 €, optional below,
   - **Address** – optional; above 250 € the guest needs it for input VAT deduction,
   - **Day of the hospitality** – prefilled with the day of the order, changeable (day before up to today).
3. **Issue hospitality receipt** assigns the next number, e.g. **B-2026-0001**.
4. Then **Print**, **QR code** or **E-mail** – like the [till receipt](./kasse.md#beleg). The first output is the original, every further one says **KOPIE** (copy).

A hospitality receipt is issued only once per order and never changed afterwards. If the guest made a typo, hand out the same receipt again; a second receipt for the same order is not possible.

For test orders a **test receipt** without number is created, marked "TESTBELEG – KEIN BEWIRTUNGSBELEG"; it is deleted together with the test orders.

## What to set up first {/* #voraussetzungen */}

Under **Settings → Organization**:

- your club's **official name** (tax details) and **address** – always,
- **tax number or VAT ID** – required for receipts above 250 €; if entered, it is on every receipt.

If something is missing, the till says that your club's details are missing, with a link to the settings. Your items must also be **named individually**: collective terms like "Speisen und Getränke" (food and drinks), "Getränke" or "Verzehr" are refused. "Menü 1", "Tagesgericht 2" or "Lunch-Buffet" are fine.

## What is on the receipt {/* #inhalt */}

| Detail | Source |
|---|---|
| Name and address of the club | settings (official name, address) |
| Tax number or VAT ID | settings; required above 250 € |
| Invoice number `B-YYYY-NNNN` | consecutive per organization and year, without gaps |
| Invoice date | day of issue |
| Day of the hospitality | printed by the system (prefilled with the day of the order) |
| Order number(s) | from the till |
| Recipient (host) | required above 250 €, optional below |
| Items with quantity, name and amount | from the order, deposit and discount on their own lines |
| Net, VAT and gross per rate | for VAT-exempt clubs instead "Steuerfrei nach § 19 Abs. 1 UStG (Kleinunternehmer)", without tax amounts |
| Tip | own line; included in the invoice amount as on the receipt (tips to the club with VAT, to employed servers without) |
| Payment method, payment reference if any | in the **Cashless** operating mode with the note "payment by non-cash means only" |
| TSE details | till ID, serial number, transaction number, signature counter, times, signature, QR code; on outage the note |

Below follows the section **Details proving hospitality expenses** with the amount of the expenses (printed) and blank lines for **occasion**, **guests**, **place, date** and **signature of the host**. The guest fills these in by hand – this is expressly allowed. Everything else is printed by the system and must not be added by hand.

## The rules behind it {/* #regeln */}

- **Deduction:** hospitality expenses for business reasons are 70 % deductible if amount and business reason are proven. For hospitality in a restaurant, occasion and guests are enough; the invoice must be attached (§ 4 (5) sentence 1 no. 2 EStG).
- **Invoice:** it must meet § 14 UStG and be created by machine and recorded electronically. Up to 250 € gross a small-amount invoice suffices (§ 33 UStDV): name and address of the club, date of issue, quantity and kind of service, amount with tax rate. Above 250 € tax number or VAT ID, consecutive invoice number and the recipient are added (§ 14 (4) UStG; BMF letter of 19 Nov 2025, no. 3–12).
- **Named individually:** "food and drinks" or only the total is not enough (R 4.10 (8) EStR; BMF no. 6).
- **Day of the hospitality:** must be printed by the system; handwritten additions or date stamps are not enough (BMF no. 7).
- **Tip:** may additionally be shown on the machine-printed invoice (BMF no. 8).
- **Till with TSE:** with a till function only invoices that are machine-created, recorded electronically and secured by a TSE are accepted; transaction number and serial number – also as a QR code – are sufficient proof for the guest. Receipts with a marked TSE outage stay accepted (BMF no. 13–15).
- **Non-cash only:** if only non-cash payment is possible (operating mode **Cashless**), no TSE receipt is needed; the guest attaches the payment slip (BMF no. 16).
- **Small businesses:** no tax shown, instead the note on the exemption under § 19 UStG (§ 34a UStDV). A small business that shows tax owes it (§ 14c UStG). The guest then has no input VAT deduction.
- **Digital:** invoice and own record may be electronic; the own details must then be approved or signed electronically and linked to the invoice (BMF no. 18–22). The PDF from OpenEOS is suitable for this.

:::note[BMF letter]
For hospitality from 1 January 2025 the BMF letter of 19 Nov 2025 (IV C 6 - S 2145/00026/005/033, BStBl I p. 1938) applies. It replaces the letter of 30 June 2021 (IV C 6 - S 2145/19/10003 :003), which still applies to hospitality until the end of 2024. The requirements for the receipt are essentially the same; the main addition is that a till receipt above 250 € may later be corrected by an e-invoice.
:::

## What OpenEOS does not cover {/* #grenzen */}

- **E-invoice:** for VAT-liable clubs, services to businesses above 250 € must be invoiced as e-invoices from 2027 (prior-year turnover above 800,000 €) or from 2028. Until then the paper or PDF receipt is allowed. Small-amount invoices and small businesses are exempt. OpenEOS does not create e-invoices (XRechnung/ZUGFeRD) yet.
- **Own details digitally:** OpenEOS does not record occasion, guests and signature; the guest adds them on the printout or in their own system.
- **DSFinV-K:** the hospitality receipt is an additional invoice for the till transaction that is already recorded, not a business transaction of its own. Nothing changes in the TSE or DSFinV-K.
- **Tax advice:** this page summarizes the rules but does not replace advice. Whether a deduction is allowed in an individual case is for the guest or their tax advisor to check.

## Retention and privacy {/* #aufbewahrung */}

Every hospitality receipt is **stored unchangeable** with all details (including the host's name) and kept with the fiscal archive for **ten years** (invoices: eight years under § 14b UStG; OpenEOS uses the ten years of the fiscal archive throughout). Orders with a hospitality receipt cannot be deleted. The host's name is personal data that your club processes as an invoice detail; OpenEOS processes it on your behalf. A QR code or e-mail link to the receipt is valid for 90 days.

## Sources {/* #quellen */}

- [§ 4 (5) sentence 1 no. 2 EStG](https://www.gesetze-im-internet.de/estg/__4.html)
- [R 4.10 (5)–(9) EStR (EStH 2025)](https://esth.bundesfinanzministerium.de/esth/2025/A-Einkommensteuergesetz/II-Einkommen-2-24b/3-Gewinn-4-7i/Paragraf-4/inhalt.html)
- [BMF letter of 19 Nov 2025, hospitality expenses as business expenses](https://www.bundesfinanzministerium.de/Content/DE/Downloads/BMF_Schreiben/Steuerarten/Einkommensteuer/2025-11-19-bewirtungskosten-als-betriebsausgaben.pdf) (replaces the BMF letter of 30 June 2021 for hospitality from 2025)
- [§ 14 UStG](https://www.gesetze-im-internet.de/ustg_1980/__14.html), [§ 14b UStG](https://www.gesetze-im-internet.de/ustg_1980/__14b.html), [§ 19 UStG](https://www.gesetze-im-internet.de/ustg_1980/__19.html), [§ 27 (38) UStG](https://www.gesetze-im-internet.de/ustg_1980/__27.html)
- [§ 33 UStDV](https://www.gesetze-im-internet.de/ustdv_1980/__33.html), [§ 34a UStDV](https://www.gesetze-im-internet.de/ustdv_1980/__34a.html)
- [§ 146a AO](https://www.gesetze-im-internet.de/ao_1977/__146a.html), [AEAO on § 146a](https://ao.bundesfinanzministerium.de/ao/2026/Abgabenordnung/Vierter-Teil/Zweiter-Abschnitt/Erster-Unterabschnitt/Paragraf-146a/inhalt.html), [§ 6 KassenSichV](https://www.gesetze-im-internet.de/kassensichv/__6.html)
- [§ 147 AO](https://www.gesetze-im-internet.de/ao_1977/__147.html)
