create or replace view public.funnel_traffic_by_country as
select
  nullif(properties->>'geoCountry', '') as country,
  nullif(properties->>'geoContinent', '') as continent,
  count(*) filter (where event_name = 'page_view') as page_views,
  count(distinct session_id) filter (where event_name = 'page_view' and session_id is not null) as unique_page_view_sessions,
  count(*) filter (where event_name = 'waitlist_joined') as waitlist_joins,
  min(created_at) as first_seen_at,
  max(created_at) as last_seen_at
from public.funnel_events
group by
  nullif(properties->>'geoCountry', ''),
  nullif(properties->>'geoContinent', '')
order by page_views desc;

create or replace view public.funnel_traffic_by_city as
select
  nullif(properties->>'geoCountry', '') as country,
  nullif(properties->>'geoRegion', '') as region,
  nullif(properties->>'geoCity', '') as city,
  nullif(properties->>'geoTimezone', '') as timezone,
  count(*) filter (where event_name = 'page_view') as page_views,
  count(distinct session_id) filter (where event_name = 'page_view' and session_id is not null) as unique_page_view_sessions,
  count(*) filter (where event_name = 'waitlist_joined') as waitlist_joins,
  min(created_at) as first_seen_at,
  max(created_at) as last_seen_at
from public.funnel_events
group by
  nullif(properties->>'geoCountry', ''),
  nullif(properties->>'geoRegion', ''),
  nullif(properties->>'geoCity', ''),
  nullif(properties->>'geoTimezone', '')
order by page_views desc;

create or replace view public.funnel_traffic_by_day_country as
select
  date_trunc('day', created_at)::date as event_date,
  nullif(properties->>'geoCountry', '') as country,
  count(*) filter (where event_name = 'page_view') as page_views,
  count(distinct session_id) filter (where event_name = 'page_view' and session_id is not null) as unique_page_view_sessions,
  count(*) filter (where event_name = 'waitlist_joined') as waitlist_joins
from public.funnel_events
group by
  date_trunc('day', created_at)::date,
  nullif(properties->>'geoCountry', '')
order by event_date desc, page_views desc;

revoke all on public.funnel_traffic_by_country from anon, authenticated;
revoke all on public.funnel_traffic_by_city from anon, authenticated;
revoke all on public.funnel_traffic_by_day_country from anon, authenticated;
grant select on public.funnel_traffic_by_country to service_role;
grant select on public.funnel_traffic_by_city to service_role;
grant select on public.funnel_traffic_by_day_country to service_role;

comment on view public.funnel_traffic_by_country is
  'Aggregates anonymous funnel traffic by Vercel geolocation country code. Does not store IP addresses.';
comment on view public.funnel_traffic_by_city is
  'Aggregates anonymous funnel traffic by approximate Vercel geolocation city. Does not store IP addresses.';
comment on view public.funnel_traffic_by_day_country is
  'Daily anonymous funnel traffic by Vercel geolocation country code. Does not store IP addresses.';
