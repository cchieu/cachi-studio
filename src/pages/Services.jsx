import { Link } from "react-router-dom";
import Page from "../components/Page.jsx";
import Reveal from "../components/Reveal.jsx";
import { services } from "../data/services.js";
import usePageMeta from "../hooks/usePageMeta.js";
import { trackEvent } from "../lib/analytics.js";

export default function Services() {
  usePageMeta(
    "Services — CACHI | Brand, Digital, Campaigns & AI Creative Systems",
    "Brand & identity, digital experiences, creative campaigns and AI creative systems — project-based engagements with an independent creative studio."
  );

  return (
    <Page>
      {/* Header */}
      <section className="bg-ink">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-36 md:pt-44">
          <Reveal>
            <p className="font-display text-xs font-bold tracking-[0.35em] text-volt">
              SERVICES
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight md:text-7xl">
              CREATIVE THINKING.
              <br />
              <span className="text-outline">PRACTICAL SOLUTIONS.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 max-w-xl text-paper/60">
              Four capabilities, one way of working: understand the real
              problem, explore beyond the brief, and make work that moves the
              needle. Engagements are project-based — scoped around outcomes,
              not hours.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Service sections */}
      <section className="bg-ink">
        <div className="mx-auto max-w-7xl px-6 pb-24">
          {services.map((s, i) => (
            <article
              key={s.id}
              id={s.id}
              className="scroll-mt-28 border-t border-white/10 py-16 md:py-20"
            >
              <div className="grid gap-10 md:grid-cols-12">
                <div className="md:col-span-4">
                  <Reveal>
                    <p className="font-display text-6xl font-bold text-volt/90 md:text-7xl">
                      {s.number}
                    </p>
                    <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight md:text-4xl">
                      {s.title}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-paper/60">
                      {s.blurb}
                    </p>
                    <Link
                      to="/contact"
                      onClick={() =>
                        trackEvent("service_enquiry_click", s.id)
                      }
                      className="group mt-8 inline-flex items-center gap-3 rounded-full border border-volt/60 px-6 py-3 font-display text-xs font-bold tracking-[0.2em] text-volt transition hover:bg-volt hover:text-ink"
                    >
                      ENQUIRE
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </Reveal>
                </div>

                <div className="space-y-8 md:col-span-7 md:col-start-6">
                  {[
                    ["WHAT IT INVOLVES", s.involves],
                    ["THE PROBLEMS IT SOLVES", s.solves],
                    ["WHAT CLIENTS RECEIVE", s.receive],
                  ].map(([label, text], j) => (
                    <Reveal key={label} delay={j * 0.06}>
                      <div>
                        <h3 className="font-display text-xs font-bold tracking-[0.3em] text-fog">
                          {label}
                        </h3>
                        <p className="mt-3 text-base leading-relaxed text-paper/75">
                          {text}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                  <Reveal delay={0.2}>
                    <div>
                      <h3 className="font-display text-xs font-bold tracking-[0.3em] text-fog">
                        EXAMPLES OF DELIVERABLES
                      </h3>
                      <ul className="mt-4 flex flex-wrap gap-2.5">
                        {s.items.map((item) => (
                          <li
                            key={item}
                            className="rounded-full border border-paper/15 bg-white/[0.03] px-4 py-2 text-sm text-paper/80"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-paper text-ink">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center md:py-28">
          <Reveal>
            <h2 className="font-display text-4xl font-bold uppercase tracking-tight md:text-6xl">
              NOT SURE WHERE <span className="text-outline-ink">TO START?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-5 max-w-lg text-ink/70">
              Describe the problem — we'll tell you honestly whether design is
              the right tool to solve it.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <Link
              to="/contact"
              onClick={() => trackEvent("cta_start_a_project", "services")}
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 font-display text-sm font-bold tracking-[0.15em] text-paper transition hover:bg-ink/80"
            >
              START A PROJECT <span>→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </Page>
  );
}
