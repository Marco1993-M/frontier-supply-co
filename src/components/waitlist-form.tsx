"use client";

import { useActionState, useCallback, useEffect, useRef, useState } from "react";
import { joinWaitlist, type WaitlistState } from "@/app/actions";
import { ProfileSurvey } from "@/components/profile-survey";
import Link from "next/link";

const initialState: WaitlistState = { status: "idle", message: "" };
export function WaitlistForm() {
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const joinAndRemember = useCallback(
    async (previousState: WaitlistState, formData: FormData) => {
      const nextState = await joinWaitlist(previousState, formData);
      if (nextState.status === "success" && nextState.email) {
        setSubscriberEmail(nextState.email);
      }
      return nextState;
    },
    [],
  );
  const [state, formAction, pending] = useActionState(joinAndRemember, initialState);
  const referralRef = useRef<HTMLInputElement>(null);
  const utmSourceRef = useRef<HTMLInputElement>(null);
  const utmCampaignRef = useRef<HTMLInputElement>(null);
  const intentRef = useRef<HTMLInputElement>(null);
  const startedAtRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (referralRef.current) referralRef.current.value = params.get("ref") ?? "";
    if (utmSourceRef.current) utmSourceRef.current.value = params.get("utm_source") ?? "";
    if (utmCampaignRef.current) utmCampaignRef.current.value = params.get("utm_campaign") ?? "";
    if (intentRef.current) intentRef.current.value = sessionStorage.getItem("frontier_intent") ?? "";
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now());
  }, []);

  if (subscriberEmail) {
    return (
      <div className="signup-success">
        <p className="success-kicker">You’re in.</p>
        <p className="form-status success" role="status">You’re in. Welcome to the Frontier.</p>
        <ProfileSurvey email={subscriberEmail} />
      </div>
    );
  }

  return (
    <>
      <form className="signup" action={formAction}>
        <input ref={referralRef} type="hidden" name="referralCode" />
        <input ref={utmSourceRef} type="hidden" name="utmSource" />
        <input ref={utmCampaignRef} type="hidden" name="utmCampaign" />
        <input ref={intentRef} type="hidden" name="intent" />
        <input ref={startedAtRef} type="hidden" name="formStartedAt" />
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <div className="signup-form">
          <label className="sr-only" htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="YOUR EMAIL ADDRESS"
            required
          />
          <button type="submit" aria-label="Join the Frontier" disabled={pending}>
            {pending ? "Joining…" : "Join"} <span aria-hidden="true">↗</span>
          </button>
        </div>
        <label className="consent-check">
          <input name="marketingConsent" type="checkbox" value="true" required />
          <span>
            Send me Frontier updates. I can unsubscribe at any time. See the{" "}
            <Link href="/privacy">privacy notice</Link>.
          </span>
        </label>
      </form>
      <p className={`form-status ${state.status}`} role="status" aria-live="polite">
        {state.message}
      </p>
    </>
  );
}
