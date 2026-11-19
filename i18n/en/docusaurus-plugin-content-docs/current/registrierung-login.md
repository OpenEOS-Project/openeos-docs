---
sidebar_position: 2
title: Registration & Login
description: Create an account with OpenEOS, confirm your email address, and log in.
---

# Registration & Login

To use OpenEOS, you first create a free account. Registration guides you through four steps covering your account, your details and your organization.

## Creating an account

Go to [app.openeos.de/register](https://app.openeos.de/register). Registration is divided into four steps, shown as a progress indicator at the top: **Account → You → Organization → Confirmation**.

### Step 1 – Account

Enter your **email address** and click **Next**. A password is optional: without one you sign in later through a link OpenEOS emails you. If you want one anyway, switch on **Also set a password**. It must be at least 8 characters long and contain upper and lower case letters as well as a number.

![Registration step 1 – Account](/img/screens/en/reg-step1.png)

### Step 2 – About you

Enter your **first name** and **last name**. These details appear later on invoices and in support communications, for example.

![Registration step 2 – About you](/img/screens/en/reg-step2.png)

### Step 3 – Your organization

Under **Organization name** enter your club, promoter or business. Your events, products and tills run under this name. It appears on invoices and receipts and can be changed at any time.

Also choose the **country** of your organization (required). Germany, Austria and Switzerland are at the top of the list. The country decides which [operating modes](./betriebsarten.md) you can choose – in Germany, for example, whether cash can be recorded. You set the country once; afterwards only our support can change it. More under [Operating modes: country of the organization](./betriebsarten.md#land).

![Registration step 3 – Organization](/img/screens/en/reg-step3.png)

### Step 4 – Final check

Review your details. Below them there are two required checkboxes:

- You confirm that you are acting for a company, a public body, an association (registered or not), a foundation or another organization – not as a consumer – and that you are authorized to represent it.
- You accept the [terms and conditions (AGB)](https://openeos.de/en/agb) and the [data processing agreement (AVV)](https://openeos.de/en/avv).

How we process your data is described in our [privacy policy](https://openeos.de/en/datenschutz); you don't need to tick anything for it. The legal texts are available in German only; the German version is binding. Optionally you can sign up for occasional news by email. Then click **Create account**.

![Registration step 4 – Confirmation](/img/screens/en/reg-step4-confirm.png)

## Confirming your email address

After you submit, **Almost there!** appears and OpenEOS sends you an email:

- **Without a password** you receive a **sign-in link**. One click confirms your address and signs you in straight away.
- **With a password** you receive a **confirmation email**. Click the link in it to activate your account, then sign in via **Go to login**.

If no email arrives, check your spam folder or click **Resend confirmation email**.

![Account created – email confirmation](/img/screens/en/reg-after-submit.png)

:::info
Confirm your email address promptly. Until the account is activated, you cannot sign in with a password.
:::

## Signing in

Go to [app.openeos.de/login](https://app.openeos.de/login). There are two ways in:

### Without a password — by link

This is how the sign-in page starts on app.openeos.de: you enter only your email address and click **Send login link**. One click on the link in the email signs you in — it is valid for **15 minutes** and works once.

This is particularly handy on the day: anyone who cannot recall their password is still in within seconds.

:::note[An account with no password at all]
A password is not required. You can run an account entirely on sign-in links and set a password later in the [settings](./einstellungen.md) under **Account → Set password**, or via **Forgot password?** on the sign-in page.
:::

### With a password

Click **Use a password instead**, enter your email and password and choose **Sign in**. **Stay signed in** keeps the session on that device. **Rather skip the password? Get a link by email** takes you back to the link. On a [self-hosted installation](./selbst-betreiben/intro.md) the sign-in page starts with the password right away.

### Two-factor code {/* #zwei-faktor */}

If you have turned on [two-factor authentication](./einstellungen.md#sicherheit), OpenEOS asks for a **verification code** after the password or sign-in link – from your authenticator app or by email, depending on what you set up. If you don't have your phone with you, choose **Use a recovery code** and enter one of your recovery codes.

- **Trust this device for 30 days:** if you tick it, OpenEOS stops asking for the code on this device for 30 days when you sign in with your password. With the sign-in link it still asks. You see and remove these devices under **Settings → Personal → Security → Trusted Devices**.
- **Wrong codes:** after five wrong codes this sign-in is no longer valid and you start again. After ten wrong codes for your account, the check is locked for 15 minutes.
- If you change or reset your password, OpenEOS no longer trusts any device; the next time you sign in it asks for the code everywhere again.

### Forgotten password

**Forgot password?** sends you a reset link. Alternatively, just sign in with a link. After the reset you are signed out on all devices.

### After wrong passwords {/* #fehlversuche */}

After five wrong passwords from the same connection, password sign-in pauses there for 15 minutes, twice as long after each further round (at most one day). After a great many failures from different places it pauses everywhere for 15 minutes. The sign-in page tells you how long.

- Devices you are already signed in on stay signed in.
- The **sign-in link** by email always gets you in.
- You get an email when password sign-in pauses. If that wasn't you, change your password to be safe.

### Other ways in from this page

- **Use as device (POS terminal)** — turns this device into a till, see [Connecting devices](./geraete.md)
- **Use as a display (screen)** — turns this screen into a display, see [Setting up screens](./anzeigen.md)

## Confirming new terms {/* #neue-agb */}

When the OpenEOS legal texts change (terms and conditions with the service description, data processing agreement, privacy policy or imprint), we announce it in advance:

- **E-mail to all admins** – what changes, from when it applies, links to the new and the previous version. For the terms the e-mail arrives at least six weeks ahead (except for changes required by law or authorities) and points out your right to object: unless you object in text form within six weeks (e.g. by e-mail to hello@openeos.de), the change counts as accepted for your customer account. Changes of the data processing agreement only take effect with your consent – except for the sub-processors (annex B) and the technical and organizational measures (annex C): we inform you about those at least four weeks ahead, and you can object within four weeks (AVV clause 6.3).
- **Notice in the dashboard** – until the change takes effect, a notice at the top says e.g. **Terms and conditions: new version from 15 January 2027**. **What changes?** shows the summary and the links; the **×** hides the notice for you.

From the effective date the window **New terms and conditions**, **New data processing agreement** or **New service description and price list** appears after you sign in – it only names the documents that have changed. It says since when the new version applies and what has changed. It only concerns admins of an organization; members without admin rights keep working without interruption.

1. Read the new versions via the links in the window (each also as a PDF). Below them you see which version you accepted previously.
2. Tick the box, e.g. **I have read and accept the terms and conditions.** (the text names exactly the changed documents).
3. Click **Accept and continue**.

**Remind me later** closes the window for a day. If a change needs your explicit consent (e.g. prices or the scope of services), you can only continue in the dashboard after confirming; **Log out** leaves the window. Which version you accepted and when is shown later under [Legal](./einstellungen.md#rechtliches).

The version of 18 November 2026 is the first version of the legal texts – OpenEOS does not ask anyone to confirm it again.

## Switching the language

OpenEOS is available in German and English. Once signed in, click your name at the bottom left of the sidebar and choose **Deutsch** or **English** under **Language**. The same choice (**German** or **English**) is under **Settings → Personal → Preferences**.
