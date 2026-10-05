---
sidebar_position: 4
title: Creating users
description: Create further accounts — with and without your own mail server.
---

# Creating users

In Single Organization mode there is **no self-registration**. Accounts are created via
member management. There are two reasons for this: a registration would create
another organisation every time, and it requires working email
delivery — without that, the new account would remain unverified and thus
permanently locked out.

## Without a mail server (the normal case)

**Members → Invite Member**. For an address that does not have an account
yet, additionally enter:

- **First name** and **last name**
- a **starting password** (min. 8 characters, uppercase letter, lowercase letter, digit)

The account is created, counts as verified immediately and can sign in
straight away. Hand over the starting password in person; the person can
then change it themselves under **Settings → Account**.

If one of the three fields is missing, OpenEOS reports (the server currently
returns this message in German only):

> Zu dieser E-Mail-Adresse gibt es noch kein Konto. Bitte Vorname, Nachname und
> ein Startpasswort angeben, um es anzulegen.

(“There is no account for this email address yet. Please enter a first name,
last name and a starting password to create it.”)

If an account already exists for the address, it is simply added to the organisation
— name and password are then ignored.

### Role and permissions

When adding, you choose:

- **Administrator** — may do everything in the organisation
- **Member** — sees only the modules you enable individually
  (Products, Events, Devices, Members, Shift plans, Discount vouchers,
  Deposit, Reports, Inventory)

For helpers at the till, a member without special
permissions is usually enough — the till itself runs via a
[paired device](/geraete) anyway, not via a user account.

## With your own mail server

If a mail server is available, invitations,
“Forgot password?” and signing in via an emailed link also work. Extend the
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

:::warning Take care when switching over
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
