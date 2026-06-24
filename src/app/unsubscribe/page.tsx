import type { Metadata } from "next";
import Link from "next/link";
import { UnsubscribeForm } from "./unsubscribe-form";

export const metadata: Metadata = {
  title: "Waitlist preferences",
  robots: { index: false, follow: false },
};

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token = "" } = await searchParams;

  return (
    <main className="legal-page">
      <Link className="legal-wordmark" href="/">Frontier Supply Co.</Link>
      <div className="legal-content">
        <p className="eyebrow">Waitlist preferences</p>
        <h1>Leave the list.</h1>
        <p>Use the button below to stop receiving Frontier updates.</p>
        <UnsubscribeForm token={token} />
        <p className="legal-help">
          Need help? Message us on{" "}
          <a href="https://www.instagram.com/frontier_supply_company/" target="_blank" rel="noreferrer">
            Instagram
          </a>
          .
        </p>
      </div>
    </main>
  );
}
