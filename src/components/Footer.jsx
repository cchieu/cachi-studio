import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";
import { services } from "../data/services.js";

/**
 * PLACEHOLDERS TO REPLACE BEFORE LAUNCH (all marked below):
 *  - email address (hello@cachi.studio)
 *  - WhatsApp number (+00 000 000 000)
 *  - social URLs (LinkedIn / Instagram / Behance)
 */
export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/60">
              Cachi is an independent creative studio combining strategic
              thinking, design and AI-assisted production to solve brand,
              digital and communication challenges.
            </p>
            <p className="mt-8 font-display text-sm font-bold tracking-[0.25em] text-volt">
              BETTER QUESTIONS. BOLDER DESIGN.
            </p>
          </div>

          <nav className="md:col-span-2" aria-label="Footer navigation">
            <h3 className="font-display text-xs font-bold tracking-[0.3em] text-paper/40">
              MENU
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                ["Home", "/"],
                ["Work", "/work"],
                ["Services", "/services"],
                ["Studio", "/studio"],
                ["Contact", "/contact"],
              ].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="text-paper/70 transition hover:text-volt">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="md:col-span-3" aria-label="Footer services">
            <h3 className="font-display text-xs font-bold tracking-[0.3em] text-paper/40">
              SERVICES
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {services.map((s) => (
                <li key={s.id}>
                  <Link
                    to={`/services#${s.id}`}
                    className="text-paper/70 transition hover:text-volt"
                  >
                    {s.title.charAt(0) + s.title.slice(1).toLowerCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <h3 className="font-display text-xs font-bold tracking-[0.3em] text-paper/40">
              CONTACT
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href="mailto:hello@cachi.studio"
                  className="text-paper/70 transition hover:text-volt"
                >
                  hello@cachi.studio
                </a>
              </li>
              <li>
                {/* PLACEHOLDER: replace with the real WhatsApp number */}
                <a
                  href="https://wa.me/000000000000"
                  target="_blank"
                  rel="noreferrer"
                  className="text-paper/70 transition hover:text-volt"
                >
                  WhatsApp: +00 000 000 000
                </a>
              </li>
            </ul>
            <ul className="mt-6 flex gap-4 text-xs tracking-[0.2em] text-paper/50">
              {/* PLACEHOLDER: add real profile URLs */}
              <li><a href="#" className="transition hover:text-volt">LINKEDIN</a></li>
              <li><a href="#" className="transition hover:text-volt">INSTAGRAM</a></li>
              <li><a href="#" className="transition hover:text-volt">BEHANCE</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-white/10 pt-8 text-xs text-fog sm:flex-row">
          <p>© {new Date().getFullYear()} CACHI Creative Studio. All rights reserved.</p>
          <p>Beyond the brief.</p>
        </div>
      </div>
    </footer>
  );
}
