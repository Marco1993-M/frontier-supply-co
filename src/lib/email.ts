import "server-only";

import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

let resend: Resend | null = null;

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  resend ??= new Resend(apiKey);
  return resend;
}

export async function sendWelcomeEmail(email: string, unsubscribeToken: string) {
  const client = getResend();
  const siteUrl = process.env.SITE_URL;
  const from = process.env.EMAIL_FROM;
  if (!client || !siteUrl || !from) return;

  const unsubscribeUrl = `${siteUrl.replace(/\/$/, "")}/unsubscribe?token=${encodeURIComponent(unsubscribeToken)}`;
  const { error } = await client.emails.send({
    from,
    to: email,
    subject: "Welcome to the Frontier",
    text: `You’re in. Welcome to the Frontier.\n\nWe’re just getting started, and we’ll share the work as it takes shape: field notes, prototypes and the first release.\n\nNo noise. Only the things worth knowing.\n\nUnsubscribe: ${unsubscribeUrl}`,
    html: `<div style="background:#f2ede3;color:#101c28;font-family:Arial,sans-serif;padding:48px 24px"><div style="margin:0 auto;max-width:560px"><p style="font-size:12px;letter-spacing:2px;text-transform:uppercase">Frontier Supply Co. / South Africa</p><h1 style="font-size:52px;line-height:.9;margin:40px 0;text-transform:uppercase">You’re in.<br>Welcome to the Frontier.</h1><p style="font-size:17px;line-height:1.7">We’re just getting started, and we’ll share the work as it takes shape: field notes, prototypes and the first release.</p><p style="font-size:17px;line-height:1.7">No noise. Only the things worth knowing.</p><hr style="border:0;border-top:1px solid #c6bfb2;margin:40px 0"><p style="font-size:12px;color:#676a62">You joined at frontiersupply.co.za. <a href="${unsubscribeUrl}" style="color:#101c28">Unsubscribe</a>.</p></div></div>`,
    headers: { "List-Unsubscribe": `<${unsubscribeUrl}>` },
  });

  if (error) throw error;

  await getSupabaseAdmin()
    .from("waitlist_subscribers")
    .update({ welcome_email_sent_at: new Date().toISOString() })
    .eq("email", email);
}
