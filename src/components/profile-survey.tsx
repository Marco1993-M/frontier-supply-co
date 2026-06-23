"use client";

import { useActionState, useState } from "react";
import { completeProfile, type ProfileState } from "@/app/actions";

const initialState: ProfileState = { status: "idle", message: "" };

export function ProfileSurvey({ email }: { email: string }) {
  const [state, formAction, pending] = useActionState(completeProfile, initialState);
  const [open, setOpen] = useState(true);

  if (state.status === "success") {
    return <p className="survey-thanks" role="status">{state.message}</p>;
  }

  if (!open) {
    return <p className="survey-thanks">No problem. We’ll keep you in the loop.</p>;
  }

  return (
    <form className="profile-survey" action={formAction}>
      <input type="hidden" name="email" value={email} />
      <div className="survey-heading">
        <span>A little about you / Optional</span>
        <button type="button" onClick={() => setOpen(false)}>Maybe later</button>
      </div>
      <label>
        <span>01 / What do you do?</span>
        <input name="occupation" placeholder="BUILDER, DESIGNER, FARMER…" />
      </label>
      <label>
        <span>02 / Where are you based?</span>
        <input name="location" placeholder="TOWN / PROVINCE" />
      </label>
      <label>
        <span>03 / What interests you most?</span>
        <select name="productInterest" defaultValue="">
          <option value="">SELECT ONE (OPTIONAL)</option>
          <option value="founding-cap">The first Frontier cap</option>
          <option value="prototype-testing">Putting a prototype to work</option>
          <option value="future-gear">What comes after the cap</option>
          <option value="field-notes">Stories from the field</option>
          <option value="founder-interview">A conversation with Frontier</option>
        </select>
      </label>
      <button className="survey-submit" type="submit" disabled={pending}>
        {pending ? "Sending…" : "Share my answers"} <span>↗</span>
      </button>
      <p className={`form-status ${state.status}`} role="status" aria-live="polite">
        {state.message}
      </p>
    </form>
  );
}
