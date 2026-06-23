import Image from "next/image";
import Link from "next/link";
import { FunnelTracker } from "@/components/funnel-tracker";
import { RevealObserver } from "@/components/reveal-observer";
import { WaitlistForm } from "@/components/waitlist-form";
import { fieldNotes } from "@/content/field-notes";

export default function Home() {
  return (
    <>
      <RevealObserver />
      <FunnelTracker />
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Frontier Supply Co. home">
          <span className="mountain" aria-hidden="true">▲</span>
          <span>Frontier</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#why">Why Frontier</a>
          <a href="#journal">Field notes</a>
          <a className="nav-cta" href="#join">Join the Frontier</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="top" aria-labelledby="hero-title">
          <Image
            className="hero-image"
            src="/hero-workshop.webp"
            alt="Metalworker reviewing plans at a workshop bench"
            fill
            priority
            sizes="100vw"
          />
          <div className="hero-shade" />
          <div className="hero-content reveal">
            <p className="eyebrow">Frontier Supply Co. / South Africa</p>
            <h1 id="hero-title">Built<br /><em>Different.</em></h1>
            <p className="hero-deck">For the builders, makers and doers.</p>
            <a className="button button-light" href="#join" data-event="cta_clicked" data-label="hero_join">Join the Frontier <span aria-hidden="true">↘</span></a>
          </div>
          <div className="hero-index" aria-hidden="true">
            <span>Born in South Africa</span>
            <span>33.9249° S / 18.4241° E</span>
          </div>
          <a className="scroll-cue" href="#our-code" aria-label="Scroll to our philosophy">Scroll to discover <span>↓</span></a>
        </section>

        <section className="founding-note section-pad" id="why" aria-labelledby="founding-title">
          <div className="section-label reveal"><span>01</span><span>Why Frontier exists</span></div>
          <div className="founding-grid">
            <div className="founding-title reveal">
              <p className="eyebrow">The story starts here</p>
              <h2 id="founding-title">Just getting started.<br /><em>Built to go the distance.</em></h2>
            </div>
            <div className="founding-copy reveal">
              <p>Frontier is for people who believe competence, ownership and work done properly still matter.</p>
              <p>We’re building it the same way: listening carefully, testing everything and letting the work speak for itself.</p>
              <strong>Made openly. Tested honestly. Earned over time.</strong>
            </div>
          </div>
          <div className="beginning-mark reveal" aria-label="Frontier Supply Co. born in South Africa">
            <span>Frontier</span><small>Born in South Africa / 2026</small>
          </div>
        </section>

        <section className="philosophy section-pad" id="our-code">
          <div className="section-label reveal"><span>02</span><span>Our philosophy</span></div>
          <div className="philosophy-copy reveal">
            <h2>Some see problems.<br /><em>We see possibilities.</em></h2>
            <div className="body-copy">
              <p>Frontier Supply Co. exists for those who make things happen. The builders. The makers. The doers.</p>
              <p>Those who value competence over attention. Quality over shortcuts. Action over excuses.</p>
            </div>
          </div>
        </section>

        <section className="field-notes-feature" id="journal" aria-labelledby="field-title">
          <div className="field-image" role="img" aria-label="Metalworker reviewing plans in a working metal shop" />
          <div className="field-copy reveal">
            <p className="eyebrow">Field Note / {fieldNotes[0].number}</p>
            <h2 id="field-title">{fieldNotes[0].title}</h2>
            <p>{fieldNotes[0].summary}</p>
            <Link
              className="rule-link"
              href={`/field-notes/${fieldNotes[0].slug}`}
              data-event="field_note_opened"
              data-label={fieldNotes[0].slug}
            >
              Read the Field Note <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <section className="build-log section-pad" aria-labelledby="build-log-title">
          <div className="section-label reveal"><span>03</span><span>In the making</span></div>
          <div className="build-log-heading reveal">
            <h2 id="build-log-title">Watch it<br /><em>take shape.</em></h2>
            <p>From the first sketch to the first field test, we’ll share what we’re working on and what we learn along the way.</p>
          </div>
          <ol className="build-stages">
            <li className="active reveal"><span>01</span><strong>In the field</strong><small>Now</small></li>
            <li className="reveal"><span>02</span><strong>First samples</strong><small>Next</small></li>
            <li className="reveal"><span>03</span><strong>Put to work</strong><small>Coming up</small></li>
            <li className="reveal"><span>04</span><strong>First release</strong><small>Down the road</small></li>
          </ol>
          <div className="participation reveal">
            <p>Have a hand in what comes next.</p>
            <a href="#join" data-event="participation_interest" data-intent="prototype_testing" data-label="volunteer_for_testing">Join the testing crew ↘</a>
            <a href="#join" data-event="participation_interest" data-intent="founder_interview" data-label="speak_with_us">Tell us what you think ↘</a>
            <a href="#join" data-event="participation_interest" data-intent="founding_reservation" data-label="founding_edition_interest">Hear about the first release ↘</a>
          </div>
        </section>

        <section className="manifesto section-pad" aria-label="Our principles">
          <div className="section-label light reveal"><span>04</span><span>The code</span></div>
          <ol className="principles">
            <li className="reveal"><span>01</span><strong>Measure twice.</strong></li>
            <li className="reveal"><span>02</span><strong>Do it properly.</strong></li>
            <li className="reveal"><span>03</span><strong>Leave it better.</strong></li>
            <li className="reveal"><span>04</span><strong>Take ownership.</strong></li>
          </ol>
          <p className="manifesto-signoff reveal">Built Different.</p>
        </section>

        <section className="join section-pad" id="join" aria-labelledby="join-title">
          <div className="join-copy reveal">
            <p className="eyebrow">A call to capable people</p>
            <h2 id="join-title">Join the<br /><em>Frontier.</em></h2>
          </div>
          <div className="join-form-wrap reveal">
            <p>We’re building something for people who make things happen. Be the first to hear when we launch.</p>
            <WaitlistForm />
            <small>No noise. Only the things worth knowing.</small>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand"><strong>Frontier</strong><span>Supply Co.</span></div>
        <p>Built Different.</p>
        <div className="footer-links">
          <a href="mailto:hello@frontiersupply.co.za">Email</a>
          <a href="https://www.instagram.com/frontier_supply_company/" target="_blank" rel="noreferrer">Instagram</a>
          <Link href="/privacy">Privacy</Link>
          <a href="#top">Back to top ↑</a>
        </div>
        <small>© {new Date().getFullYear()} Frontier Supply Co.</small>
      </footer>
    </>
  );
}
