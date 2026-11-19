import { Link } from "react-router-dom";
import { trackEvent } from "../lib/analytics.js";

/** Interactive project card — image hover transition + animated title. */
export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/work/${project.slug}`}
      data-cursor
      className="group block"
      onClick={() => trackEvent("open_project", project.slug)}
    >
      <div className="relative overflow-hidden bg-ink">
        <img
          src={project.image}
          alt={`${project.title} — ${project.category} (concept project)`}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
        />
        {project.concept && (
          <span className="absolute left-4 top-4 rounded-full border border-volt/50 bg-ink/70 px-3 py-1 font-display text-[10px] font-semibold tracking-[0.25em] text-volt backdrop-blur">
            CONCEPT
          </span>
        )}
        <span className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-volt text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          →
        </span>
      </div>
      <div className="mt-5 flex items-baseline justify-between border-t border-white/10 pt-4">
        <h3 className="font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-volt">
          {project.title}
        </h3>
        <span className="shrink-0 pl-4 text-xs tracking-wide text-fog">
          {project.category} · {project.year}
        </span>
      </div>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-paper/55">
        {project.description}
      </p>
    </Link>
  );
}
