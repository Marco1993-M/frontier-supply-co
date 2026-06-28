# Frontier launch checklist

## Required before production

- Run `supabase/migrations/20260622_launch_hardening.sql` in the Supabase SQL editor.
- Run `supabase/migrations/20260623_remove_welcome_email_tracking.sql` if the earlier launch migration has already been applied.
- Run `supabase/migrations/20260628_funnel_geo_views.sql` to add country/city analytics views.
- Add the production values from `.env.example` in Vercel.
- Replace `BUSINESS_ADDRESS` and, if needed, `LEGAL_BUSINESS_NAME` with the responsible party's full details.
- Submit a real signup and confirm the subscriber and event rows in Supabase.
- When Frontier has a mailbox, add it as `PRIVACY_EMAIL` and update the privacy contact details.

## Vercel firewall

Rate limits are configured in the Vercel dashboard, not `vercel.json`.

1. Open the project in Vercel and go to **Firewall**.
2. Enable Bot Protection in log mode first, then challenge automated traffic once normal submissions are confirmed.
3. Add a rate-limit rule for `POST` requests to `/` and `/api/events`.
4. Start with 10 requests per minute per IP for the signup action and 60 requests per minute per IP for `/api/events`.
5. Review firewall logs after launch and tighten the limits if abusive traffic appears.

The form also includes a honeypot and minimum completion-time check as an application-level backstop.

## Launch verification

- Check mobile and desktop at the production URL.
- Confirm `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`, `/privacy`, and the social preview image.
- Run `npm run lint`, `npm run build`, and `npm run test:supabase` after applying the migration.
