import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Page from '../components/Page.jsx'
import Reveal from '../components/Reveal.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { getProjects } from '../lib/sanity/queries'

export default function Work() {
  usePageMeta(
    'Work — CACHI | Independent Creative Studio',
    'Selected work — a collection of ideas, identities, experiences and creative solutions by Cachi creative studio.'
  )

  const [projects, setProjects] = useState([])
  const [filter, setFilter] = useState('All Work')

  useEffect(() => {
    // Fetch projects from Sanity
    getProjects().then((data) => {
      setProjects(data)
    })
  }, [])

  const list =
    filter === 'All Work'
      ? projects
      : projects.filter((p) => p.category === filter)

  return (
    <Page>
      <section className="bg-ink">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-36 md:pt-44">
          <Reveal>
            <p className="font-display text-xs font-bold tracking-[0.35em] text-volt">
              PORTFOLIO
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight md:text-7xl">
              SELECTED WORK.
              <br />
              <span className="text-outline">THOUGHTFUL EXECUTION.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 max-w-xl text-paper/60">
              A collection of ideas, identities, experiences and creative
              solutions. Every piece is labelled concept work — created to
              demonstrate how the studio thinks and makes.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink">
        <div className="mx-auto max-w-7xl px-6 pb-28">
          {/* Filters */}
          <div>
            <div
              className="flex flex-wrap gap-3 border-y border-white/10 py-6"
              role="tablist"
              aria-label="Filter projects by category"
            >
              <button
                key="all"
                role="tab"
                aria-selected="true"
                onClick={() => setFilter('All Work')}
                className="rounded-full border px-5 py-2 font-display text-xs font-bold tracking-[0.15em] transition border-volt bg-volt text-ink"
              >
                ALL WORK
              </button>
              {projects.map((project) => {
                const category = project.category
                return (
                  <button
                    key={category}
                    role="tab"
                    aria-selected={filter === category}
                    onClick={() => setFilter(category)}
                    className="rounded-full border px-5 py-2 font-display text-xs font-bold tracking-[0.15em] transition border-paper/20 text-paper/60 hover:border-volt/60 hover:text-paper"
                  >
                    {category.toUpperCase()}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Grid */}
          <motion-div layout class="mt-14 grid gap-x-6 gap-y-14 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {list.map((project, i) => (
                <motion-div
                  layout
                  key={project.slug}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className={i % 2 === 1 ? 'md:mt-16' : ''}
                >
                  <ProjectCard project={project} />
                </motion-div>
              ))}
            </AnimatePresence>
          </motion-div>

          {list.length === 0 && (
            <p className="py-20 text-center text-fog">
              Nothing in this category yet — check back soon.
            </p>
          )}
        </div>
      </section>
    </Page>
  )
}