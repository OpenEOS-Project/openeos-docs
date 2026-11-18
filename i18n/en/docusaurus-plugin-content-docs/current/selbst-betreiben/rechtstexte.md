---
sidebar_position: 8
title: Changing the legal texts (hosted platform)
description: Announce new versions of the terms, data processing agreement, privacy policy and imprint – for super admins of a hosted platform.
---

# Changing the legal texts (hosted platform)

This page is for super admins of a **hosted** platform where customers accept
the operator's legal texts (terms and conditions with annex 1, data processing
agreement, privacy policy, imprint). In **single mode**
(`DEPLOYMENT_MODE=selfhosted`) these texts and this feature do not exist.

## How it works

1. **Publish the new version.** Put the file on the website
   (`content/legal/de/<document>/<YYYY-MM-DD>.md`). The date of the “Stand”
   line is also the effective date. The version must be reachable at
   `<website>/<path>/<YYYY-MM-DD>` before you announce it.
2. **Announce.** In the super admin area under **Legal texts** choose the
   changed documents and the date and describe briefly in German (optionally
   in English) what changes. **Check and preview** checks the rules below and
   whether the version is reachable on the website, and shows the e-mail.
   **Announce and send to … admins** stores the announcement and sends the
   e-mails.
3. **Until the effective date** admins see a notice in the dashboard, which
   they can hide.
4. **From the effective date** the new version applies automatically –
   without a new deployment: registration and bookings accept it, and admins
   are asked after signing in to confirm new terms or a new data processing
   agreement.

## Rules for announcements

- **Notice period:** terms, annex 1 and data processing agreement at least six
  weeks before the effective date. Shorter only with the option **Shorter
  notice** for changes required by law or authorities. Privacy policy and
  imprint may use any future date.
- **Order:** the date must be after the current and after every already
  announced version of the document.
- **Initial set:** the versions up to 18 November 2026 are the first set. They
  are not announced and do not ask anyone to confirm again – not even accounts
  that accepted an older version before.
- **Consent or objection:** by default the e-mail for contract documents points
  out the right to object (the change counts as accepted unless the customer
  objects in text form within six weeks). If a change needs explicit consent
  (e.g. main obligations, fees), choose **Explicit consent required**: the
  e-mail then asks for consent, and the confirmation dialog cannot be
  postponed.
- An announcement cannot be withdrawn or changed.

## Sending the e-mails

- The e-mail goes to all admins of all organizations that are not deleted, with
  an active account, once per e-mail address. The recipients are fixed when
  you announce.
- Sending runs in the background, one batch per minute. Every e-mail goes out
  at most once, also with several instances or after a restart.
- The page shows per announcement how many e-mails were sent, are open or
  failed, and the failed addresses. **Send failed ones again** queues them
  again. “Versand unterbrochen” (sending interrupted) means it is unclear
  whether the e-mail arrived – sending again may deliver it twice. The six-week
  period runs from receipt of the e-mail.
- Without configured e-mail delivery (`EMAIL_ENABLED`) the e-mails stay queued.

## Which version applies

Per document the newer one of

- the version in the code or from `LEGAL_AGB_VERSION`, `LEGAL_AVV_VERSION`,
  `LEGAL_PRIVACY_VERSION`, `LEGAL_IMPRINT_VERSION`, `LEGAL_ANLAGE1_VERSION` and
- the newest announced version whose date has been reached (day in
  Europe/Berlin).

You can update the variables or the version in the code after the effective
date. **Do not raise them earlier:** what is set there applies immediately.

`LEGAL_REACCEPTANCE_ENABLED=false` turns off asking admins to confirm again
(default: on). Announcement, e-mail and notice are not affected.
