"use server";

import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase-admin";

export type UnsubscribeState = { status: "idle" | "success" | "error"; message: string };

export async function unsubscribe(
  _previousState: UnsubscribeState,
  formData: FormData,
): Promise<UnsubscribeState> {
  const token = String(formData.get("token") ?? "");
  if (!/^[0-9a-f-]{36}$/i.test(token) || !isSupabaseConfigured()) {
    return { status: "error", message: "This unsubscribe link is not valid." };
  }

  const { data, error } = await getSupabaseAdmin()
    .from("waitlist_subscribers")
    .update({ marketing_consent: false, unsubscribed_at: new Date().toISOString() })
    .eq("unsubscribe_token", token)
    .select("id")
    .maybeSingle();

  if (error || !data) {
    return { status: "error", message: "We couldn’t update that preference. Email us for help." };
  }

  return { status: "success", message: "You’ve been unsubscribed from Frontier updates." };
}
