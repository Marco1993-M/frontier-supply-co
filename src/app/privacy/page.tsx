import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: "How Frontier Supply Co. collects and uses information from its waitlist.",
};

export default function PrivacyPage() {
  const businessName = process.env.LEGAL_BUSINESS_NAME ?? "Frontier Supply Co.";
  const businessAddress = process.env.BUSINESS_ADDRESS ?? "South Africa";
  const privacyEmail = process.env.PRIVACY_EMAIL?.trim();

  return (
    <main className="legal-page">
      <Link className="legal-wordmark" href="/">Frontier Supply Co.</Link>
      <article className="legal-content">
        <p className="eyebrow">Privacy notice / Updated 22 June 2026</p>
        <h1>Your information.</h1>
        <p className="legal-intro">We collect only what helps us build Frontier with the people who care about it.</p>

        <h2>What we collect</h2>
        <p>Your email address is required to join. After joining, you may optionally share your occupation, location and product interest. We also record referral details, campaign tags and anonymous interactions with this website.</p>

        <h2>Why we use it</h2>
        <p>We use your information to send Frontier updates, invite relevant people into interviews or prototype testing, understand interest in a first release and improve this website. We do not sell your information.</p>

        <h2>Your choice</h2>
        <p>Joining is voluntary. If you do not provide an email address, we cannot send updates. You can object to direct marketing, or ask us to access, correct or delete your information.</p>

        <h2>Storage and service providers</h2>
        <p>Information is stored using Supabase. Supabase may process information outside South Africa under its contractual safeguards. We retain your information while you remain subscribed or while reasonably needed for the purposes above.</p>

        <h2>Contact</h2>
        <p>
          The responsible party is {businessName}, {businessAddress}. Contact us{" "}
          {privacyEmail ? (
            <>at <a href={`mailto:${privacyEmail}`}>{privacyEmail}</a></>
          ) : (
            <>through <a href="https://www.instagram.com/frontier_supply_company/" target="_blank" rel="noreferrer">Instagram</a></>
          )}
          . You may also lodge a complaint with the <a href="https://inforegulator.org.za/complaints/" target="_blank" rel="noreferrer">Information Regulator South Africa</a>.
        </p>
      </article>
    </main>
  );
}
