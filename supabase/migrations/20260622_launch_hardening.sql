alter table public.waitlist_subscribers
  add column if not exists marketing_consent boolean not null default false,
  add column if not exists consent_at timestamptz,
  add column if not exists consent_version text,
  add column if not exists privacy_notice_url text,
  add column if not exists unsubscribe_token uuid not null default gen_random_uuid(),
  add column if not exists unsubscribed_at timestamptz,
  add column if not exists welcome_email_sent_at timestamptz,
  add column if not exists email_replied_at timestamptz,
  add column if not exists last_intent text;

create unique index if not exists waitlist_subscribers_unsubscribe_token_idx
  on public.waitlist_subscribers (unsubscribe_token);

create table if not exists public.funnel_events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null check (event_name in (
    'page_view',
    'cta_clicked',
    'field_note_opened',
    'waitlist_joined',
    'profile_completed',
    'participation_interest'
  )),
  session_id text,
  path text,
  properties jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists funnel_events_event_created_idx
  on public.funnel_events (event_name, created_at desc);
create index if not exists funnel_events_session_idx
  on public.funnel_events (session_id)
  where session_id is not null;

alter table public.funnel_events enable row level security;
revoke all on table public.funnel_events from anon, authenticated;
grant select, insert, update, delete on table public.funnel_events to service_role;

comment on table public.funnel_events is
  'Anonymous landing-page funnel events. Do not store email addresses or optional profile answers here.';
