# Frontier analytics queries

These queries use anonymous events in `public.funnel_events`. Geo fields come from Vercel request headers and are stored in `properties` without storing IP addresses.

## Traffic from South Africa

```sql
select
  count(*) filter (where properties->>'geoCountry' = 'ZA') as south_africa_page_views,
  count(*) as total_page_views,
  round(
    100.0 * count(*) filter (where properties->>'geoCountry' = 'ZA') / nullif(count(*), 0),
    1
  ) as south_africa_percentage
from public.funnel_events
where event_name = 'page_view';
```

## Countries

```sql
select *
from public.funnel_traffic_by_country;
```

## Cities

```sql
select *
from public.funnel_traffic_by_city;
```

## Daily country trend

```sql
select *
from public.funnel_traffic_by_day_country;
```

## Referrers and campaigns

```sql
select
  coalesce(nullif(properties->>'utmSource', ''), nullif(properties->>'referrerHost', ''), 'direct') as source,
  properties->>'geoCountry' as country,
  count(*) as page_views,
  count(distinct session_id) as sessions
from public.funnel_events
where event_name = 'page_view'
group by source, properties->>'geoCountry'
order by page_views desc;
```
