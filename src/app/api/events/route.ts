import { NextResponse } from "next/server";
import { sendFunnelEvent, type FunnelEventName } from "@/lib/analytics";

const publicEvents = new Set<FunnelEventName>([
  "page_view",
  "cta_clicked",
  "field_note_opened",
  "participation_interest",
]);

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

    const sessionId = String(payload.sessionId ?? "").slice(0, 100);
    await sendFunnelEvent(payload.event, properties, sessionId);
    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}
