import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, DM_Sans } from "next/font/google";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const condensed = Barlow_Condensed({
  variable: "--font-condensed",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const sans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Frontier Supply Co. | Built Different.",
    template: "%s | Frontier Supply Co.",
  },
  description:
    "Frontier Supply Co. is for the builders, makers and doers. Join the Frontier.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "1254x1254" }],
    apple: [{ url: "/favicon.png", type: "image/png", sizes: "1254x1254" }],
  },
  openGraph: {
    title: "Frontier Supply Co. | Built Different.",
    description: "A brand for people who make things happen.",
    type: "website",
    url: "/",
    siteName: "Frontier Supply Co.",
    locale: "en_ZA",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Frontier Supply Co. — Built Different." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frontier Supply Co. | Built Different.",
    description: "A brand for people who make things happen.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#101c28",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${condensed.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
