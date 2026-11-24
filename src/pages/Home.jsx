import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import Page from '../components/Page.jsx'
import Reveal from '../components/Reveal.jsx'
import Marquee from '../components/Marquee.jsx'
import CircleMotif from '../components/CircleMotif.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { getHomepage, getProjects, getServices } from '../lib/sanity/queries'

/* ---------------------------------- HERO --------------------------------- */

function Hero({ homepage }) {
  const ref = useRef(null)
  // Scroll-linked "background video" effect: the backdrop drifts, dims and
  // the content floats as the visitor scrolls through the hero.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '24%'])
  const bgOpacity = useTransform(scrollYProgress, [0, 0.85], [0.55, 0.15])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0.15])

  const lines = [
    <span>THE BRIEF</span>,
    <span>
      IS A <span className="text-volt">STARTING</span>
    </span>,
    <span>
      <span className="text-outline">POINT.</span>
    </span>,
  ]

  return (
    <section
      ref={ref}
      className="relative flex min-h-svh flex-col overflow-hidden bg-ink"
    >
      {/* Scroll-reactive backdrop */}
      <motion.div style={{ y: bgY, opacity: bgOpacity }} className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_72%_8%,rgba(241,237,40,0.16),transparent_58%),radial-gradient(80%_60%_at_18%_85%,rgba(244,244,240,0.06),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,#F4F4F0_1px,transparent_1px)] [background-size:12.5%_100%]" />
        <motion.div
          className="absolute -right-40 top-1/2 h-[36rem] w-[36rem] -translate-y-1/2 rounded-full bg-volt opacity-[0.07] blur-[120px]"
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <CircleMotif
        size={520}
        className="pointer-events-none absolute -right-32 top-1/2 hidden -translate-y-1/2 opacity-70 sm:block lg:-right-16"
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pb-28 pt-36"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 font-display text-xs font-semibold tracking-[0.35em] text-paper/60"
        >
          <span className="h-2 w-2 rounded-full bg-volt" />
          {homepage.heroTagline}
        </motion.p>

        <h1 className="mt-8 font-display font-bold uppercase leading-[0.92] tracking-tight text-[15vw] sm:text-7xl lg:text-[7.2rem]">
          {lines.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-1">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.25 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="mt-8 max-w-xl text-base leading-relaxed text-paper/70 md:text-lg"
        >
          {homepage.aboutDescription}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link
            to="/contact"
            onClick={() => trackEvent('cta_start_a_project', 'hero')}
            className="group inline-flex items-center gap-3 rounded-full bg-volt px-8 py-4 font-display text-sm font-bold tracking-[0.15em] text-ink transition:hover:bg-paper"
          >
            START A PROJECT
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link
            to="/work"
            className="inline-flex items-center rounded-full border border-paper/25 px-8 py-4 font-display text-sm font-bold tracking-[0.15em] text-paper transition:hover:border-volt:hover:text-volt"
          >
            EXPLORE OUR WORK
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <div
        style={{ opacity: contentOpacity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        aria-hidden="true"
      >
        <p className="text-center font-display text-[10px] tracking-[0.4em] text-paper/50">
          SCROLL
        </p>
        <div
          className="mx-auto mt-2 h-10 w-px origin-top bg-paper/40"
          animate={undefined}
        />
      </div>
    </section>
  )
}

/* --------------------------- BRAND INTRODUCTION -------------------------- */

function Intro() {
  return (
    <section className="relative overflow-hidden bg-paper text-ink">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-36">
        <Reveal>
          <p className="font-display text-xs font-bold tracking-[0.35em] text-ink/50">
            01 — THE STUDIO
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 max-w-5xl font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight md:text-7xl">
            GOOD QUESTIONS CHANGE{" "}
            <span className="text-outline-ink">EVERYTHING.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          <Reveal delay={0.05}>
            <p className="border-l-4 border-volt pl-6 text-lg leading-relaxed">
              Cachi is an independent creative studio combining strategic
              thinking, design and AI-assisted production to solve brand,
              digital and communication challenges.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="text-base leading-relaxed text-ink/70">
              We believe good creative work begins with curiosity. We look
              beyond the obvious, challenge conventional thinking and explore
              new ways of solving problems.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="text-base leading-relaxed text-ink/70">
              From the first idea to the final execution, we combine creative
              intelligence, design expertise and technology to make ideas work
              — moving businesses forward, not just making things look good.
            </p>
          </Reveal>
        </div>
      </div>

      <svg
        className="absolute -right-16 top-10 h-56 w-56 opacity-90"
        viewBox="0 0 200 200"
        aria-hidden="true"
      >
        <circle cx="100" cy="100" r="90" fill="none" stroke="#F1ED28" strokeWidth="2" strokeDasharray="4 10" />
        <circle cx="100" cy="100" r="46" fill="#F1ED28" />
      </svg>
    </section>
  )
}

/* ------------------------------ SELECTED WORK ----------------------------- */

function SelectedWork({ projects }) {
  return (
    <section className="bg-ink">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Reveal>
              <p className="font-display text-xs font-bold tracking-[0.35em] text-volt">
                02 — SELECTED WORK
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 font-display text-5xl font-bold uppercase tracking-tight md:text-6xl">
                IDEAS MADE <span className="text-outline">TANGIBLE.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-4 max-w-xl text-paper/60">
                A selection of creative thinking, design and digital
                experiences.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <Link
              to="/work"
              className="group inline-flex items-center gap-2 font-display text-sm font-bold tracking-[0.2em] text-volt"
            >
              VIEW ALL WORK
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-6 gap-y-14 md:grid-cols-2">
          {projects.slice(0, 4).map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 0.1} className={i % 2 === 1 ? 'md:mt-20' : ''}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <p className="mt-16 border-t border-white/10 pt-6 text-xs tracking-wide text-fog">
          All projects shown are clearly-labelled concept work created for
          demonstration — replaced with authentic client projects as the
          studio grows.
        </p>
      </div>
    </section>
  )
}

/* -------------------------------- SERVICES -------------------------------- */

function ServicesSection({ services }) {
  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <Reveal>
          <p className="font-display text-xs font-bold tracking-[0.35em] text-ink/50">
            03 — SERVICES
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 font-display text-5xl font-bold uppercase tracking-tight md:text-6xl">
            WHAT WE BRING <span className="text-outline-ink">TO THE TABLE.</span>
          </h2>
        </Reveal>

        <div className="mt-16">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.05}>
              <Link
                to={`/services#${s.number}`}
                className="group grid items-baseline gap-4 border-t border-ink/15 px-4 py-10 transition-colors duration-300 hover:bg-ink:hover:text-paper md:grid-cols-12 md:gap-6"
              >
                <span className="font-display text-sm font-semibold text-ink/40 transition-colors group-hover:text-volt md:col-span-1">
                  {s.number}
                </span>
                <h3 className="font-display text-3xl font-bold uppercase tracking-tight md:col-span-4 md:text-4xl">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink/65 transition-colors group-hover:text-paper/65 md:col-span-5">
                  {s.blurb}
                </p>
                <span
                  aria-hidden="true"
                  className="hidden justify-self-end text-2xl transition-transform duration-300 group-hover:translate-x-2 md:col-span-2 md:block"
                >
                  →
                </span>
              </Link>
            </Reveal>
          ))}
          <div className="border-t border-ink/15" />
        </div>
      </div>
    </section>
  )
}

/* ----------------------------- THE APPROACH ------------------------------ */

const STEPS = [
  ['01', 'UNDERSTAND', 'We identify the real problem, the audience and the intended outcome.'],
  ['02', 'REFRAME', 'We challenge assumptions and look for opportunities beyond the initial brief.'],
  ['03', 'EXPLORE', 'We generate ideas, explore different directions and test creative possibilities.'],
  ['04', 'MAKE', 'We turn the strongest ideas into considered design and creative experiences.'],
  ['05', 'REFINE', 'We improve, optimise and prepare the final work for delivery.'],
]

function Approach() {
  return (
    <section className="bg-ink">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <Reveal>
          <p className="font-display text-xs font-bold tracking-[0.35em] text-volt">
            04 — THE CACHI APPROACH
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 font-display text-5xl font-bold uppercase tracking-tight md:text-6xl">
            THINK. EXPLORE. <span className="text-volt">MAKE.</span> REFINE.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map(([num, title, copy], i) => (
            <Reveal key={num} delay={i * 0.08}>
              <div className="border-t-2 border-volt/80 pt-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-volt/50 font-display text-sm font-semibold text-volt">
                  {num}
                </span>
                <h3 className="mt-6 font-display text-lg font-bold tracking-wide">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/55">{copy}</p>
              </div>
            </Reveal>
          ))
          }
        </div>
      </div>
    </section>
  )
}

/* -------------------------------- WHY CACHI ------------------------------- */

function WhyCachi() {
  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 md:grid-cols-2 md:py-32">
        <div>
          <Reveal>
            <p className="font-display text-xs font-bold tracking-[0.35em] text-ink/50">
              05 — WHY CACHI
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight md:text-6xl">
              WE DON'T DESIGN <span className="text-outline-ink">BY DEFAULT.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-8 max-w-md text-base leading-relaxed text-ink/70">
              Every brief deserves thought. We believe better outcomes come
              from questioning assumptions, exploring different perspectives
              and choosing the right creative approach.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink/70">
              We combine human imagination, design expertise and intelligent
              tools to create meaningful solutions.
            </p>
          </Reveal>
        </div>

        <div>
          {STEPS.map(([title, copy], i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="border-t border-ink/15 py-8">
                <h3 className="font-display text-2xl font-bold tracking-tight">
                  <span className="mr-4 text-sm text-ink/40">0{i + 1}</span>
                  {title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/65">{copy}</p>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-ink/15" />
        </div>
      </div>
    </section>
  )
}

/* ------------------------------ FINAL CTA -------------------------------- */

function FinalCTA() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [0.35, 1.55])

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink" data-cursor>
      {/* Giant electric circle, scaling with scroll */}
      <motion.div
        aria-hidden="true"
        style={{ x: '-50%', y: '-50%', scale }}
        className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] rounded-full bg-volt"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-28 text-center mix-blend-difference md:py-40">
        <Reveal>
          <h2 className="font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-paper md:text-7xl">
            HAVE A CHALLENGE
            <br />
            WORTH SOLVING?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-paper/80 md:text-lg">
            Tell us what you're building, changing or trying to achieve.
            Let's find a better way forward.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              onClick={() => trackEvent('cta_start_a_project', 'final_cta')}
              className="inline-flex items-center gap-3 rounded-full bg-volt px-8 py-4 font-display text-sm font-bold tracking-[0.15em] text-ink transition:hover:bg-paper"
            >
              START A PROJECT <span>→</span>
            </Link>
            <a
              href="mailto:hello@cachi.studio"
              onClick={() => trackEvent('email_click', 'final_cta')}
              className="inline-flex items-center rounded-full border border-paper/30 px-8 py-4 font-display text-sm font-bold tracking-[0.15em] text-paper transition:hover:border-volt:hover:text-volt"
            >
              TALK TO CACHI
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* --------------------------------- PAGE ---------------------------------- */

export default function Home() {
  const [homepage, setHomepage] = useState(null)
  const [projects, setProjects] = useState([])
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch homepage data
    getHomepage().then((data) => {
      setHomepage(data)
    })

    // Fetch projects
    getProjects().then((data) => {
      setProjects(data)
    })

    // Fetch services
    getServices().then((data) => {
      setServices(data)
    })

    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <Page>
      <Hero homepage={homepage} />
      <Marquee
        items={['BEYOND THE BRIEF', 'BETTER QUESTIONS', 'BOLDER DESIGN']}
        className="border-y border-ink/10 bg-volt text-ink"
      />
      <Intro />
      <SelectedWork projects={projects} />
      <ServicesSection services={services} />
      <Approach />
      <WhyCachi />
      <FinalCTA />
    </Page>
  )
}