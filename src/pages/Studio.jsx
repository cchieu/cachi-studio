import { Link } from "react-router-dom";
import Page from "../components/Page.jsx";
import Reveal from "../components/Reveal.jsx";
import CircleMotif from "../components/CircleMotif.jsx";
import usePageMeta from "../hooks/usePageMeta.js";
import { trackEvent } from "../lib/analytics.js";

const SECTIONS = [
  [
    "THE CACHI PHILOSOPHY",
    "Cachi is derived from two names — Caleb and Chieu. The name represents the combination of two creative identities into one independent creative practice, built around a shared belief in the power of ideas.",
    "We see design as a tool for solving problems, creating opportunities and changing how businesses communicate with their audiences. The brief is a starting point, never a limitation.",
  ],
  [
    "CREATIVE THINKING & PROBLEM-SOLVING",
    "Every project starts with questions, not deliverables. What is really being asked for? What is really needed? Where are the assumptions hiding?",
    "This curiosity-first approach means we often arrive at solutions the original brief never described — and that's the point.",
  ],
  [
    "HUMAN CREATIVITY & ARTIFICIAL INTELLIGENCE",
    "AI is an important part of how the studio works — accelerating production, opening new visual territories and making rapid iteration possible.",
    "But the direction is always human. Strategy, taste and judgement stay with people; the technology explores, we decide.",
  ],
  [
    "HOW WE COLLABORATE",
    "We work closely and transparently with founders, marketing teams and in-house designers — as an extension of your team rather than a vendor behind a wall.",
    "Expect honest opinions, open questions and work-in-progress shared early. The best outcomes come from clients who want a thinking partner, not just an executor.",
  ],
  [
    "ACROSS INDUSTRIES & MARKETS",
    "Independent by design, we work with ambitious businesses of any size, in any industry and any market — from first-time founders to established teams looking for a new point of view.",
    "Different contexts sharpen our thinking. The studio's ambition is to keep learning from every sector it touches.",
  ],
];

export default function Studio() {
  usePageMeta(
    "Studio — CACHI | An Independent Creative Studio",
    "The story behind Cachi — an independent creative studio built around curiosity, experimentation and a different way of approaching problems."
  );

  return (
    <Page>
      {/* Header */}
      <section className="relative overflow-hidden bg-ink">
        <CircleMotif
          size={420}
          className="pointer-events-none absolute -right-28 top-16 hidden opacity-60 lg:block"
        />
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-36 md:pt-44">
          <Reveal>
            <p className="font-display text-xs font-bold tracking-[0.35em] text-volt">
              THE STUDIO
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight md:text-7xl">
              AN INDEPENDENT STUDIO.
              <br />
              <span className="text-outline">AN OPEN WAY OF THINKING.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 max-w-xl text-paper/60">
              Two creative identities. One shared belief: better questions lead
              to bolder design.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Visual band */}
      <section className="bg-ink">
        <div className="overflow-hidden">
          <img
            src="/images/studio-wall.svg"
            alt="Abstract studio wall of pinned experiments (concept artwork)"
            className="aspect-[16/7] w-full object-cover"
          />
        </div>
      </section>

      {/* Story sections */}
      <section className="bg-ink">
        <div className="mx-auto max-w-7xl px-6 pb-10 pt-16">
          {SECTIONS.map(([title, p1, p2], i) => (
            <article
              key={title}
              className={`grid gap-8 border-t border-white/10 py-14 md:grid-cols-12 md:py-16 ${
                i % 2 === 1 ? "bg-white/[0.015]" : ""
              }`}
            >
              <Reveal className="md:col-span-4">
                <p className="font-display text-sm font-semibold text-volt">
                  0{i + 1}
                </p>
                <h2 className="mt-3 font-display text-2xl font-bold uppercase leading-tight tracking-tight md:text-3xl">
                  {title}
                </h2>
              </Reveal>
              <Reveal delay={0.08} className="md:col-span-7 md:col-start-6">
                <p className="text-base leading-relaxed text-paper/80 md:text-lg">
                  {p1}
                </p>
                <p className="mt-5 text-base leading-relaxed text-paper/60">
                  {p2}
                </p>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-paper text-ink">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center md:py-28">
          <Reveal>
            <h2 className="font-display text-4xl font-bold uppercase tracking-tight md:text-6xl">
              WHERE HUMAN IMAGINATION <span className="text-outline-ink">MEETS INTELLIGENT MAKING.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              to="/contact"
              onClick={() => trackEvent("cta_start_a_project", "studio")}
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 font-display text-sm font-bold tracking-[0.15em] text-paper transition hover:bg-ink/80"
            >
              START A PROJECT <span>→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </Page>
  );
}
