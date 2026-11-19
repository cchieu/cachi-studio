import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo.jsx";
import { trackEvent } from "../lib/analytics.js";

const LINKS = [
  { label: "HOME", to: "/" },
  { label: "WORK", to: "/work" },
  { label: "SERVICES", to: "/services" },
  { label: "STUDIO", to: "/studio" },
  { label: "CONTACT", to: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[90] transition-colors duration-500 ${
          scrolled && !open
            ? "border-b border-white/5 bg-ink/85 backdrop-blur"
            : "bg-transparent"
        }`}
      >
        <nav
          className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20"
          aria-label="Main navigation"
        >
          <Link to="/" aria-label="CACHI — home">
            <Logo />
          </Link>

          <ul className="hidden items-center gap-9 md:flex">
            {LINKS.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    `group flex items-center gap-2 font-display text-xs font-semibold tracking-[0.25em] transition ${
                      isActive ? "text-paper" : "text-paper/60 hover:text-paper"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={`h-1.5 w-1.5 rounded-full bg-volt transition ${
                          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                        }`}
                      />
                      {l.label}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              onClick={() => trackEvent("cta_start_a_project", "navbar")}
              className="hidden rounded-full bg-volt px-5 py-2.5 font-display text-xs font-bold tracking-[0.15em] text-ink transition hover:bg-paper lg:inline-block"
            >
              START A PROJECT
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="font-display text-xs font-bold tracking-[0.3em] text-paper md:hidden"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? "CLOSE" : "MENU"}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile navigation */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            className="fixed inset-0 z-[80] flex flex-col justify-between bg-ink px-8 pb-10 pt-28 md:hidden"
          >
            <nav aria-label="Mobile navigation">
              <ul className="space-y-2">
                {LINKS.map((l, i) => (
                  <motion.li
                    key={l.to}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06 }}
                  >
                    <NavLink
                      to={l.to}
                      className={({ isActive }) =>
                        `flex items-baseline gap-4 font-display text-5xl font-bold tracking-tight ${
                          isActive ? "text-volt" : "text-paper"
                        }`
                      }
                    >
                      <span className="text-xs text-fog">0{i + 1}</span>
                      {l.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-3"
            >
              <p className="font-display text-sm tracking-[0.3em] text-volt">
                BETTER QUESTIONS. BOLDER DESIGN.
              </p>
              <a
                href="mailto:hello@cachi.studio"
                className="block text-sm text-paper/60"
              >
                hello@cachi.studio
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
