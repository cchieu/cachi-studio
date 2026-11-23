import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Page from '../components/Page.jsx'
import Reveal from '../components/Reveal.jsx'
import { getProjectBySlug, getProjects } from '../lib/sanity/queries'

function Block({ label, children }) {
  return (
    <section className="border-t border-white/10">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-14 md:grid-cols-12 md:py-16">
        <Reveal className="md:col-span-3">
          <h2 className="font-display text-xs font-bold tracking-[0.3em] text-volt">
            {label}
          </h2>
        </Reveal>
        <Reveal delay={0.08} className="md:col-span-8">
          <div className="text-base leading-relaxed text-paper/75 md:text-lg">
            {children}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default function CaseStudy() {
  const { slug } = useParams()
  const [project, setProject] = useState(null)
  const [projects, setProjects] = useState([])

  useEffect(() => {
    // Fetch the project by slug
    getProjectBySlug(slug).then((data) => {
      setProject(data)
    })
  }, [slug])

  useEffect(() => {
    // Also fetch all projects for related projects and page meta
    getProjects().then((allProjects) => {
      setProjects(allProjects)
    })
  }, [slug])

  useEffect(() => {
    if (project) {
      trackEvent('view_project', slug)
    }
  }, [project])

  if (!project) return <div>Loading project...</div>

  // Find related projects (same category, different project)
  const related = projects
    .filter((p) => p.category === project.category && p.slug !== slug)
    .slice(0, 2)

  // Find next project
  const currentIndex = projects.findIndex((p) => p.slug === slug)
  const next = currentIndex >= 0 ? projects[(currentIndex + 1) % projects.length] : null

  usePageMeta(
    project
      ? `${project.title} — Case Study — CACHI`
      : 'Case Study — CACHI',
    project ? project.description : 'Project by Cachi creative studio.'
  )

  const nextSlug = next ? `/work/${next.slug}` : '/work'

  return (
    <Page>
      {/* Hero image */}
      <div className="relative h-[55vh] md:h-[68vh] overflow-hidden md:relative">
        <img
          src={project.image}
          alt={`${project.title} — key visual (concept project)`}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
        <Link
          to="/work"
          className="absolute left-6 top-28 rounded-full border border-paper/25 bg-ink/50 px-5 py-2 font-display text-xs font-bold tracking-[0.2em] text-paper backdrop-blur transition:hover:border-volt hover:text-volt md:left-12"
        >
          ← ALL WORK
        </Link>
      </div>

      {/* Introduction */}
      <section className="bg-ink">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-7">
            <Reveal>
              <div className="flex flex-wrap items-center gap-4">
                <span className="rounded-full border border-volt/50 px-4 py-1 font-display text-[10px] font-bold tracking-[0.25em] text-volt">
                  CONCEPT PROJECT
                </span>
                <span className="text-xs tracking-[0.2em] text-fog">
                  {project.category.toUpperCase()} · {project.year}
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-8 font-display text-5xl font-bold uppercase tracking-tight md:text-8xl">
                {project.title}
              </h1>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/70">
                {project.description}
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <Reveal delay={0.2}>
              <dl className="space-y-4 border-l-2 border-volt pl-6 text-sm">
                <div>
                  <dt className="font-display text-[10px] font-bold tracking-[0.3em] text-fog">
                    CATEGORY
                  </dt>
                  <dd className="mt-1">{project.category}</dd>
                </div>
                <div>
                  <dt className="font-display text-[10px] font-bold tracking-[0.3em] text-fog">
                    YEAR
                  </dt>
                  <dd className="mt-1">{project.year}</dd>
                </div>
                <div>
                  <dt className="font-display text-[10px] font-bold tracking-[0.3em] text-fog">
                    STATUS
                  </dt>
                  <dd className="mt-1">Concept — available for demonstration</dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Narrative */}
      <div className="bg-ink">
        <Block label="THE BUSINESS CHALLENGE">{project.challenge}</Block>
        <Block label="THE CREATIVE INSIGHT">{project.insight}</Block>
        <Block label="THE PROPOSED SOLUTION">{project.solution}</Block>

        {/* Creative exploration */}
        <Block label="CREATIVE EXPLORATION">
          <p>{project.exploration}</p>
          <div className="mt-8 overflow-hidden">
            <img
              src="/images/studio-wall.svg"
              alt="Exploration wall — pinned studies and experiments (concept)"
              loading="lazy"
              className="aspect-[16/7] w-full object-cover"
            />
          </div>
        </Block>

        <Block label="FINAL DELIVERABLES">
          <ul className="flex flex-wrap gap-3">
            {project.deliverables.map((d) => (
              <li
                key={d}
                className="rounded-full border border-paper/20 px-4 py-2 text-sm text-paper/80"
              >
                {d}
              </li>
            ))}
          </ul>
        </Block>

        <Block label="PROJECT OUTCOME">
          <p>{project.outcome}</p>
        </Block>
      </div>

      {/* Related Projects */}
      <section className="bg-paper text-ink">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <Reveal>
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight md:text-4xl">
              RELATED PROJECTS
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <Link
              to={nextSlug}
              className="group mt-20 flex items-baseline justify-between border-t-2 border-ink pt-8"
            >
              <span className="font-display text-xs font-bold tracking-[0.3em] text-ink/50">
                NEXT PROJECT
              </span>
              <span className="font-display text-3xl font-bold uppercase tracking-tight transition-colors group-hover:text-ink/60 md:text-6xl">
                {next.title}{' '}
                <span className="transition-transform group-hover:translate-x-2">→</span>
              </span>
            </Link>
          </Reveal>
        </div>
      </section>
    </Page>
  )
}