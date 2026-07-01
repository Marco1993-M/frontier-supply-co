import type { FieldNote } from "@/content/field-notes";
import { siteUrl } from "@/lib/site";

export const brandName = "Frontier Supply Co.";
export const instagramUrl = "https://www.instagram.com/frontier_supply_company/";

export const brandId = `${siteUrl}/#brand`;
export const websiteId = `${siteUrl}/#website`;
export const capsCollectionId = `${siteUrl}/#frontier-caps`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": brandId,
    name: brandName,
    url: siteUrl,
    logo: `${siteUrl}/favicon.png`,
    foundingDate: "2026",
    foundingLocation: {
      "@type": "Place",
      name: "South Africa",
    },
    areaServed: {
      "@type": "Country",
      name: "South Africa",
    },
    sameAs: [instagramUrl],
    slogan: "Built Different.",
    description:
      "Frontier Supply Co. is a South African brand building durable workwear caps and field gear for builders, makers and doers.",
    brand: {
      "@type": "Brand",
      name: brandName,
      slogan: "Built Different.",
    },
    knowsAbout: [
      "South African caps",
      "workwear caps South Africa",
      "outdoor caps South Africa",
      "workwear caps",
      "outdoor caps",
      "field gear",
      "prototype testing",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: brandName,
    url: siteUrl,
    publisher: { "@id": brandId },
    inLanguage: "en-ZA",
    potentialAction: {
      "@type": "RegisterAction",
      name: "Join the Frontier waitlist",
      target: `${siteUrl}/#join`,
    },
  };
}

export function capsCollectionSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": capsCollectionId,
    name: "Frontier caps in development",
    url: `${siteUrl}/#join`,
    isPartOf: { "@id": websiteId },
    spatialCoverage: {
      "@type": "Country",
      name: "South Africa",
    },
    about: [
      {
        "@type": "Product",
        name: "Frontier workwear caps South Africa",
        brand: { "@id": brandId },
        category: "Caps",
        audience: {
          "@type": "Audience",
          audienceType: "builders, makers, doers and outdoor workers",
        },
        description:
          "Durable workwear caps for South African conditions, currently being shaped through field notes, prototype testing and founding-member feedback.",
      },
      {
        "@type": "Thing",
        name: "Prototype testing",
        description:
          "Frontier invites early supporters to help shape the first release through feedback, interviews and testing interest.",
      },
    ],
  };
}

export function fieldNoteSchema(note: FieldNote) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: note.title,
    description: note.summary,
    datePublished: note.publishedAtIso,
    dateModified: note.publishedAtIso,
    url: `${siteUrl}/field-notes/${note.slug}`,
    mainEntityOfPage: `${siteUrl}/field-notes/${note.slug}`,
    author: { "@id": brandId },
    publisher: { "@id": brandId },
    isPartOf: { "@id": websiteId },
    inLanguage: "en-ZA",
    articleSection: "Field Notes",
    keywords: [
      "Frontier Supply Co.",
      "South African caps",
      "workwear caps South Africa",
      "outdoor caps South Africa",
      "workwear caps",
      "outdoor caps",
      "field gear",
    ],
  };
}
