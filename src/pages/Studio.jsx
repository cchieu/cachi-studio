import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Page from '../components/Page.jsx'
import Reveal from '../components/Reveal.jsx'
import CircleMotif from '../components/CircleMotif.jsx'
import { getHomepage, getSiteSettings } from '../lib/sanity/queries'
import { Homepage, SiteSettings } from '../lib/sanity/types'
import usePageMeta from '../hooks/usePageMeta.js'

const SECTIONS = [
  ['HUMAN THINKING', 'Technology supports the process. Creative intelligence drives the decisions.'],
  ['INTELLIGENT MAKING', 'We bring the right tools and methods into every project.'],
  ['PURPOSEFUL DESIGN', 'Every creative decision should serve a clear objective.'],
]

export default function Studio() {
  const [homepage, setHomepage] = useState(null)
  const [siteSettings, setSiteSettings] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch homepage data for pillars and CTA
    getHomepage().then((data) => {
      setHomepage(data)
    })

    // Fetch site settings
    getSiteSettings().then((data) => {
      setSiteSettings(data)
    })

    setLoading(false)
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  usePageMeta(
    'Studio — CACHI | An Independent Creative Studio',
    'The story behind Cachi — an independent creative studio built around curiosity, experimentation and a different way of approaching problems.'
  )

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
                i % 2 === 1 ? 'bg-white/[0.015]' : ''
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
              onClick={() => trackEvent('cta_start_a_project', 'studio')}
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 font-display text-sm font-bold tracking-[0.15em] text-paper transition hover:bg-ink/80"
            >
              START A PROJECT <span>→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </Page>
  )
}