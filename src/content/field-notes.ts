export type FieldNote = {
  slug: string;
  number: string;
  title: string;
  summary: string;
  publishedAt: string;
  publishedAtIso: string;
  readingTime: string;
  paragraphs: string[];
};

export const fieldNotes: FieldNote[] = [
  {
    slug: "the-work-speaks",
    number: "001",
    title: "The work speaks.",
    summary:
      "A note on capable people, honest work and standards that do not need an audience.",
    publishedAt: "21 June 2026",
    publishedAtIso: "2026-06-21",
    readingTime: "3 min read",
    paragraphs: [
      "Frontier Supply Co. is just getting started. The values behind it are built for the long haul.",
      "We believe competence still matters. That doing a job properly matters. That the person who takes ownership, solves the problem and leaves things better deserves more attention than the person who simply looks the part.",
      "We’re starting by listening to the people we hope to serve, testing what we make and sharing the lessons that shape every decision.",
      "The first Frontier product will not be important because it carries our name. It will be important only if capable people choose to keep using it.",
      "This is Field Note 001. The work starts here.",
    ],
  },
];

export function getFieldNote(slug: string) {
  return fieldNotes.find((note) => note.slug === slug);
}
