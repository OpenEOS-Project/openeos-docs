---
sidebar_position: 4
title: Creating users
description: Create further accounts — with and without your own mail server.
---

# Creating users

In Single Organization mode there is **no self-registration**. Accounts are created via
member management. There are two reasons for this: a registration would create
another organization every time, and it requires working email
delivery — without that, the new account would remain unverified and thus
permanently locked out.

## Without a mail server (the normal case)

1. Open **Members** and click **Add member**.
2. In the dialog, switch to the **Create account directly** tab.
3. Enter **First name**, **Last name** and **Email address**.
4. Set an **Initial password** and repeat it under **Confirm initial
   password**. The same rules as for registration apply: at least 8
   characters, upper- and lowercase letters, and a number.
5. Choose role and permissions (see below) and click **Create account**.

The account counts as verified immediately and can sign in straight away; no
email is sent. Hand over the initial password in person. The person can
change it after signing in under **Settings → Account** — this is not
enforced.

Only **administrators** can create accounts directly. Members with the
“Members” permission do not see the tab, can only invite, and cannot grant
the administrator role or permissions they do not have themselves.

If an account already exists for the address, OpenEOS does not create a
second one and reports:

> An account already exists for this email address. You can add it without an
> initial password – its current password stays valid.

Then click **Add existing account**. The account joins the organization with
the selected role and permissions; the name and initial password from the
form are not applied.

:::note[Inviting without a mail server]
The **Invite** tab sends an email with a link that is used to accept the
invitation. Without email delivery this link never arrives — use **Create
account directly** instead.
:::

### Role and permissions

On both tabs you choose:

- the **Administrator** switch — may do everything in the organization
- without the switch, a **member** — sees only the modules you enable
  individually under **Permissions**
  (Products, Events, Devices, Members, Shift Plans, Discount Vouchers,
  Deposit (Pfand), Reports, Inventory)

For helpers at the till, a member without special
permissions is usually enough — the till itself runs via a
[paired device](/geraete) anyway, not via a user account.

## With your own mail server

If a mail server is available, email invitations (the **Invite** tab in the
**Add member** dialog), “Forgot password?” and signing in via an emailed link
also work. Extend the
`.env` and restart the server:

```bash
EMAIL_ENABLED=true
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=openeos@verein.example
EMAIL_PASSWORD=...
EMAIL_FROM=openeos@verein.example
EMAIL_FROM_NAME=OpenEOS Musikverein
```

These values must also go into the `environment:` block of the `api` service
in the `docker-compose.yml`, otherwise they do not reach the container.

```bash
sudo docker compose up -d --force-recreate api
```

:::warning[Take care when switching over]
As soon as `EMAIL_ENABLED=true` is set, OpenEOS actually sends
emails — to the stored addresses. If you have been working with made-up
addresses such as `admin@verein.local` until then, those deliveries go
nowhere. That is harmless, but the “Forgot password?” function will then
not help these accounts.
:::

## If you have locked yourself out

After five failed attempts, OpenEOS locks an account for 15 minutes. Waiting is enough.

If the administrator password is lost and no email delivery is set up,
the only way is directly via the database. You set a new password like this
— the hash is generated inside the container, and the plain-text password never ends up
in the database:

```bash
# 1. Generate a hash for the new password
sudo docker compose exec api node -e \
  "console.log(require('bcrypt').hashSync('NeuesPasswort123', 12))"

# 2. Enter the hash that was output
sudo docker compose exec postgres psql -U openeos -d openeos -c \
  "UPDATE users SET password_hash='<HASH>', failed_login_attempts=0,
   locked_until=NULL WHERE email='admin@verein.local';"
```

If an account is unverified and no email arrives, this is enough:

```bash
sudo docker compose exec postgres psql -U openeos -d openeos -c \
  "UPDATE users SET email_verified_at=now() WHERE email='...';"
```
