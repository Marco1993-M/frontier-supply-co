"use client";

import { useEffect } from "react";

const sessionKey = "frontier_session_id";

function getSessionId() {
  const existing = sessionStorage.getItem(sessionKey);
  if (existing) return existing;

  const sessionId = crypto.randomUUID();
  sessionStorage.setItem(sessionKey, sessionId);
  return sessionId;
}

function track(event: string, properties: Record<string, string>) {
  const body = JSON.stringify({ event, properties, sessionId: getSessionId() });

  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/events", new Blob([body], { type: "application/json" }));
    return;
  }

  void fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  });
}

export function FunnelTracker() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let referrerHost = "direct";

    if (document.referrer) {
      try {
        referrerHost = new URL(document.referrer).hostname;
      } catch {
        referrerHost = "unknown";
      }
    }

    track("page_view", {
      path: window.location.pathname,
      ref: params.get("ref") ?? "",
      utmSource: params.get("utm_source") ?? "",
      utmCampaign: params.get("utm_campaign") ?? "",
      referrerHost,
    });

    const handleClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>("[data-event]");
      if (!target) return;

      if (target.dataset.intent) {
        sessionStorage.setItem("frontier_intent", target.dataset.intent);
      }

      track(target.dataset.event ?? "cta_clicked", {
        label: target.dataset.label ?? target.textContent?.trim() ?? "unknown",
        destination: target.getAttribute("href") ?? "",
        intent: target.dataset.intent ?? "",
      });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
