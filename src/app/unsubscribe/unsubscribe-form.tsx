"use client";

import { useActionState } from "react";
import { unsubscribe, type UnsubscribeState } from "./actions";

const initialState: UnsubscribeState = { status: "idle", message: "" };

export function UnsubscribeForm({ token }: { token: string }) {
  const [state, formAction, pending] = useActionState(unsubscribe, initialState);

  if (state.status === "success") {
    return <p className="legal-status" role="status">{state.message}</p>;
  }

  return (
    <form className="unsubscribe-form" action={formAction}>
      <input type="hidden" name="token" value={token} />
      <button type="submit" disabled={pending}>{pending ? "Updating…" : "Unsubscribe"}</button>
      <p className="legal-status" role="status">{state.message}</p>
    </form>
  );
}
