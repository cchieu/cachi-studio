import { Link } from "react-router-dom";
import Page from "../components/Page.jsx";
import CircleMotif from "../components/CircleMotif.jsx";
import usePageMeta from "../hooks/usePageMeta.js";

export default function NotFound() {
  usePageMeta(
    "Page Not Found — CACHI",
    "This page doesn't exist. Head back to the Cachi creative studio homepage."
  );

  return (
    <Page>
      <section className="relative flex min-h-svh items-center justify-center overflow-hidden bg-ink px-6">
        <CircleMotif
          size={480}
          className="pointer-events-none absolute -right-24 top-1/2 hidden -translate-y-1/2 opacity-50 sm:block"
        />
        <div className="relative z-10 max-w-xl">
          <p className="font-display text-8xl font-bold tracking-tight text-volt md:text-9xl">
            404
          </p>
          <h1 className="mt-6 font-display text-3xl font-bold uppercase leading-tight tracking-tight md:text-5xl">
            THIS PAGE DRIFTED <span className="text-outline">OFF THE BRIEF.</span>
          </h1>
          <p className="mt-4 text-paper/60">
            The page you're looking for doesn't exist — but the work does.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-3 rounded-full bg-volt px-7 py-3.5 font-display text-sm font-bold tracking-[0.15em] text-ink transition hover:bg-paper"
            >
              BACK TO START <span>→</span>
            </Link>
            <Link
              to="/work"
              className="inline-flex items-center rounded-full border border-paper/25 px-7 py-3.5 font-display text-sm font-bold tracking-[0.15em] transition hover:border-volt hover:text-volt"
            >
              VIEW OUR WORK
            </Link>
          </div>
        </div>
      </section>
    </Page>
  );
}
