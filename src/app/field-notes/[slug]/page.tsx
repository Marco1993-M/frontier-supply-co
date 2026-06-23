import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FunnelTracker } from "@/components/funnel-tracker";
import { fieldNotes, getFieldNote } from "@/content/field-notes";

type FieldNotePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return fieldNotes.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: FieldNotePageProps): Promise<Metadata> {
  const note = getFieldNote((await params).slug);
  if (!note) return {};

  return { title: note.title, description: note.summary };
}

export default async function FieldNotePage({ params }: FieldNotePageProps) {
  const note = getFieldNote((await params).slug);
  if (!note) notFound();

  return (
    <main className="note-page">
      <FunnelTracker />
      <nav className="note-nav" aria-label="Field note navigation">
        <Link href="/">← Frontier Supply Co.</Link>
        <span>Field Note / {note.number}</span>
      </nav>
      <article>
        <header className="note-header">
          <p className="eyebrow">{note.publishedAt} / {note.readingTime}</p>
          <h1>{note.title}</h1>
          <p>{note.summary}</p>
        </header>
        <div className="note-body">
          {note.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <footer className="note-footer">
          <p>The story starts here.<br /><em>The work takes it forward.</em></p>
          <Link href="/#join" data-event="cta_clicked" data-label="join_from_field_note">
            Join the Frontier ↗
          </Link>
        </footer>
      </article>
    </main>
  );
}
