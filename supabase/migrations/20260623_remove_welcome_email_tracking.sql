alter table public.waitlist_subscribers
  drop column if exists welcome_email_sent_at;
