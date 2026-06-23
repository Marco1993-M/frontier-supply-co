"use server";

import { sendFunnelEvent } from "@/lib/analytics";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase-admin";

export type WaitlistState = {
  status: "idle" | "success" | "error";
  message: string;
  email?: string;
};

export type ProfileState = {
  status: "idle" | "success" | "error";
  message: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const consentVersion = "2026-06-22";
const productInterests = new Set([
  "founding-cap",
  "prototype-testing",
  "future-gear",
  "field-notes",
  "founder-interview",
]);
const participationIntents = new Set([
  "prototype_testing",
  "founder_interview",
  "founding_reservation",
]);

export async function joinWaitlist(
  _previousState: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const consent = formData.get("marketingConsent") === "true";
  const website = String(formData.get("website") ?? "");
  const startedAt = Number(formData.get("formStartedAt"));
  const referralCode = String(formData.get("referralCode") ?? "").slice(0, 100);
  const utmSource = String(formData.get("utmSource") ?? "").slice(0, 100);
  const utmCampaign = String(formData.get("utmCampaign") ?? "").slice(0, 100);
  const requestedIntent = String(formData.get("intent") ?? "").slice(0, 80);
  const intent = participationIntents.has(requestedIntent) ? requestedIntent : "";

  if (website) {
    return { status: "success", message: "You’re in. Welcome to the Frontier.", email };
  }

  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 800 || Date.now() - startedAt > 7_200_000) {
    return { status: "error", message: "Please wait a moment and try again." };
  }

  if (!emailPattern.test(email)) {
    return { status: "error", message: "Enter a valid email address." };
  }

  if (!consent) {
    return { status: "error", message: "Please confirm that we may send you Frontier updates." };
  }

  const previewMode = process.env.WAITLIST_PREVIEW_MODE === "true";

  if (!previewMode && !isSupabaseConfigured()) {
    return { status: "error", message: "The waitlist is not open just yet. Check back soon." };
  }

  try {
    if (!previewMode) {
      const interestFlags = {
        ...(intent === "prototype_testing" && { prototype_testing_interest: true }),
        ...(intent === "founder_interview" && { interview_interest: true }),
        ...(intent === "founding_reservation" && { reservation_intent: true }),
      };
      const { error } = await getSupabaseAdmin()
        .from("waitlist_subscribers")
        .upsert(
          {
            email,
            source: "frontier-supply-co-website",
            marketing_consent: true,
            consent_at: new Date().toISOString(),
            consent_version: consentVersion,
            privacy_notice_url: "/privacy",
            unsubscribed_at: null,
            ...(referralCode && { referral_code: referralCode }),
            ...(utmSource && { utm_source: utmSource }),
            ...(utmCampaign && { utm_campaign: utmCampaign }),
            ...(intent && { last_intent: intent }),
            ...interestFlags,
          },
          { onConflict: "email" },
        );

      if (error) throw error;
    }

    await sendFunnelEvent("waitlist_joined", {
      hasReferral: referralCode ? "true" : "false",
      utmSource,
      utmCampaign,
      intent,
    });

    return { status: "success", message: "You’re in. Welcome to the Frontier.", email };
  } catch (error) {
    console.error("Unable to add waitlist subscriber", error);
    return { status: "error", message: "Something went wrong. Please try again." };
  }
}

export async function completeProfile(
  _previousState: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const occupation = String(formData.get("occupation") ?? "").trim().slice(0, 120);
  const location = String(formData.get("location") ?? "").trim().slice(0, 120);
  const productInterest = String(formData.get("productInterest") ?? "").slice(0, 80);

  if (!emailPattern.test(email) || (productInterest && !productInterests.has(productInterest))) {
    return { status: "error", message: "Check your answers and try again." };
  }

  if (!occupation && !location && !productInterest) {
    return { status: "success", message: "No problem. We’ll keep you in the loop." };
  }

  const previewMode = process.env.WAITLIST_PREVIEW_MODE === "true";

  if (!previewMode && !isSupabaseConfigured()) {
    return { status: "error", message: "We couldn’t save that just yet. Please try again later." };
  }

  try {
    if (!previewMode) {
      const interestFlags = {
        ...(productInterest === "prototype-testing" && { prototype_testing_interest: true }),
        ...(productInterest === "founder-interview" && { interview_interest: true }),
        ...(productInterest === "founding-cap" && { reservation_intent: true }),
      };
      const profile = {
        ...(occupation && { occupation }),
        ...(location && { location }),
        ...(productInterest && { product_interest: productInterest }),
        profile_completed_at: new Date().toISOString(),
        ...interestFlags,
      };
      const { data, error } = await getSupabaseAdmin()
        .from("waitlist_subscribers")
        .update(profile)
        .eq("email", email)
        .select("id")
        .maybeSingle();

      if (error) throw error;
      if (!data) throw new Error("Waitlist subscriber was not found");
    }

    await sendFunnelEvent("profile_completed", {
      answeredOccupation: occupation ? "true" : "false",
      answeredLocation: location ? "true" : "false",
      productInterest,
    });
    return { status: "success", message: "Thank you. That helps us build better." };
  } catch (error) {
    console.error("Unable to save waitlist profile", error);
    return { status: "error", message: "We couldn’t save that. Please try again." };
  }
}
