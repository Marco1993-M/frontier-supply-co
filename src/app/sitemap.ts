import type { MetadataRoute } from "next";
import { fieldNotes } from "@/content/field-notes";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: new Date("2026-06-22"), changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/privacy`, lastModified: new Date("2026-06-22"), changeFrequency: "yearly", priority: 0.2 },
    ...fieldNotes.map((note) => ({
      url: `${siteUrl}/field-notes/${note.slug}`,
      lastModified: new Date(note.publishedAtIso),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
