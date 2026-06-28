import { NextResponse } from "next/server";
import { sendFunnelEvent, type FunnelEventName } from "@/lib/analytics";

const publicEvents = new Set<FunnelEventName>([
  "page_view",
  "cta_clicked",
  "field_note_opened",
  "participation_interest",
]);

function cleanHeaderValue(value: string | null, maxLength = 100) {
  if (!value) return "";

  try {
    return decodeURIComponent(value).replace(/[^\p{L}\p{N}\s._:/+-]/gu, "").trim().slice(0, maxLength);
  } catch {
    return value.replace(/[^\p{L}\p{N}\s._:/+-]/gu, "").trim().slice(0, maxLength);
  }
}

function getRequestGeo(headers: Headers) {
  return {
    geoContinent: cleanHeaderValue(headers.get("x-vercel-ip-continent"), 2),
    geoCountry: cleanHeaderValue(headers.get("x-vercel-ip-country"), 2),
    geoRegion: cleanHeaderValue(headers.get("x-vercel-ip-country-region"), 8),
    geoCity: cleanHeaderValue(headers.get("x-vercel-ip-city"), 120),
    geoTimezone: cleanHeaderValue(headers.get("x-vercel-ip-timezone"), 80),
  };
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      event?: FunnelEventName;
      properties?: Record<string, unknown>;
      sessionId?: string;
    };

    if (!payload.event || !publicEvents.has(payload.event)) {
      return NextResponse.json({ error: "Invalid event" }, { status: 400 });
    }

    const properties = Object.fromEntries(
      Object.entries(payload.properties ?? {})
        .filter(([, value]) => typeof value === "string")
        .slice(0, 12)
        .map(([key, value]) => [key.slice(0, 50), String(value).slice(0, 250)]),
    );

    const geoProperties = Object.fromEntries(
      Object.entries(getRequestGeo(request.headers)).filter(([, value]) => value),
    );

    const sessionId = String(payload.sessionId ?? "").slice(0, 100);
    await sendFunnelEvent(payload.event, { ...properties, ...geoProperties }, sessionId);
    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}
