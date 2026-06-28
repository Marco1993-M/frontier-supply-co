import nextEnv from "@next/env";
import { createClient } from "@supabase/supabase-js";

const { loadEnvConfig } = nextEnv;

loadEnvConfig(process.cwd());

const url = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be configured");
}

const supabase = createClient(url, serviceRoleKey, {
  auth: { autoRefreshToken: false, detectSessionInUrl: false, persistSession: false },
});

const email = `codex-integration-test+${Date.now()}@example.com`;
const sessionId = `codex-integration-test-${Date.now()}`;

try {
  const { error: insertError } = await supabase
    .from("waitlist_subscribers")
    .insert({
      email,
      source: "codex-integration-test",
      referral_code: "integration-test",
      utm_source: "local-verification",
      utm_campaign: "supabase-setup",
      marketing_consent: true,
      consent_at: new Date().toISOString(),
      consent_version: "2026-06-22",
      privacy_notice_url: "/privacy",
      last_intent: "prototype_testing",
    });

  if (insertError) throw insertError;

  const { data, error: updateError } = await supabase
    .from("waitlist_subscribers")
    .update({
      occupation: "Integration tester",
      location: "Johannesburg, Gauteng",
      product_interest: "prototype-testing",
      prototype_testing_interest: true,
      profile_completed_at: new Date().toISOString(),
    })
    .eq("email", email)
    .select(
      "email, occupation, location, product_interest, prototype_testing_interest, profile_completed_at, marketing_consent, unsubscribe_token, last_intent",
    )
    .single();

  if (updateError) throw updateError;

  const valid =
    data.email === email
    && data.occupation === "Integration tester"
    && data.location === "Johannesburg, Gauteng"
    && data.product_interest === "prototype-testing"
    && data.prototype_testing_interest === true
    && Boolean(data.profile_completed_at)
    && data.marketing_consent === true
    && Boolean(data.unsubscribe_token)
    && data.last_intent === "prototype_testing";

  if (!valid) throw new Error("Stored waitlist values did not match the test payload");

  const { error: eventError } = await supabase.from("funnel_events").insert({
    event_name: "waitlist_joined",
    session_id: sessionId,
    path: "/",
    properties: {
      intent: "prototype_testing",
      geoContinent: "AF",
      geoCountry: "ZA",
      geoRegion: "GP",
      geoCity: "Johannesburg",
      geoTimezone: "Africa/Johannesburg",
    },
  });

  if (eventError) throw eventError;

  console.log(
    JSON.stringify({
      insert: "passed",
      profileUpdate: "passed",
      consentAndUnsubscribe: "passed",
      funnelEvent: "passed",
      storedValues: "verified",
    }),
  );
} finally {
  const { error: cleanupError } = await supabase
    .from("waitlist_subscribers")
    .delete()
    .eq("email", email);

  const { error: eventCleanupError } = await supabase
    .from("funnel_events")
    .delete()
    .eq("session_id", sessionId);

  if (cleanupError || eventCleanupError) {
    console.error("Test cleanup failed", cleanupError?.message ?? eventCleanupError?.message);
    process.exitCode = 1;
  } else {
    console.log(JSON.stringify({ cleanup: "passed" }));
  }
}
