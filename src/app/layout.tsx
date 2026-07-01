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
    default: "Frontier Supply Co. | Workwear Caps South Africa",
    template: "%s | Frontier Supply Co.",
  },
  description:
    "Frontier Supply Co. is a South African brand building durable workwear caps and field gear for builders, makers and doers.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  applicationName: "Frontier Supply Co.",
  category: "apparel",
  keywords: [
    "Frontier Supply Co.",
    "South African caps",
    "caps South Africa",
    "workwear caps South Africa",
    "outdoor caps South Africa",
    "workwear caps",
    "outdoor caps",
    "field gear",
    "durable caps",
    "founding member waitlist",
  ],
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "1254x1254" }],
    apple: [{ url: "/favicon.png", type: "image/png", sizes: "1254x1254" }],
  },
  openGraph: {
    title: "Frontier Supply Co. | Workwear Caps South Africa",
    description:
      "A South African brand building durable workwear caps and field gear for people who make things happen.",
    type: "website",
    url: "/",
    siteName: "Frontier Supply Co.",
    locale: "en_ZA",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Frontier Supply Co. — Built Different." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frontier Supply Co. | Workwear Caps South Africa",
    description:
      "Durable South African workwear caps and field gear in the making for builders, makers and doers.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
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
