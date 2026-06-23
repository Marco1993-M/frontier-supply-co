import "server-only";

import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase-admin";

export type FunnelEventName =
  | "page_view"
  | "cta_clicked"
  | "field_note_opened"
  | "waitlist_joined"
  | "profile_completed"
  | "participation_interest";

export async function sendFunnelEvent(
  event: FunnelEventName,
  properties: Record<string, string> = {},
  sessionId = "",
) {
  if (process.env.WAITLIST_PREVIEW_MODE === "true" || !isSupabaseConfigured()) return;

  try {
    const path = properties.path?.slice(0, 250) || null;
    const safeProperties = { ...properties };
    delete safeProperties.path;

    const { error } = await getSupabaseAdmin().from("funnel_events").insert({
      event_name: event,
      session_id: sessionId || null,
      path,
      properties: safeProperties,
    });

    if (error) throw error;
  } catch (error) {
    console.error("Unable to record funnel event", error);
  }
}
