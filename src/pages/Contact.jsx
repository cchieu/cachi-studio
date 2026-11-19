import { useState } from "react";
import Page from "../components/Page.jsx";
import Reveal from "../components/Reveal.jsx";
import usePageMeta from "../hooks/usePageMeta.js";
import { trackEvent } from "../lib/analytics.js";

/**
 * FORM SUBMISSION:
 * Connect a form service (Formspree, Basin, Getform, Web3Forms…) and set
 * VITE_FORM_ENDPOINT in .env, e.g.
 *   VITE_FORM_ENDPOINT=https://formspree.io/f/yourFormId
 *
 * Until it's configured the form validates and clearly explains that it
 * isn't connected yet — it never fakes a successful submission.
 */
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || "";

const PROJECT_TYPES = [
  "Brand & Identity",
  "Website Design & Development",
  "UI/UX Design",
  "Creative Campaign",
  "Video & Motion",
  "AI Creative Systems",
  "Other",
];

const BUDGETS = [
  "Under KES 50,000",
  "KES 50,000 to 150,000",
  "KES 150,000 to 500,000",
  "KES 500,000 to 1,000,000",
  "Above KES 1,000,000",
  "Not yet determined",
];

const initialForm = {
  name: "",
  email: "",
  company: "",
  type: "",
  description: "",
  budget: "",
  timeline: "",
};

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Please tell us your name.";
  if (!form.email.trim()) errors.email = "An email address is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "That email address doesn't look right.";
  if (!form.company.trim())
    errors.company = "Company or organisation is required (or write 'Individual').";
  if (!form.type) errors.type = "Choose the closest project type.";
  if (!form.description.trim() || form.description.trim().length < 20)
    errors.description = "Describe the project in at least a couple of sentences.";
  return errors;
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="font-display text-xs font-bold tracking-[0.25em] text-paper/60">
        {label} <span className="text-volt">*</span>
      </span>
      <div className="mt-2">{children}</div>
      {error && (
        <span role="alert" className="mt-2 block text-sm text-volt">
          {error}
        </span>
      )}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3.5 text-paper placeholder:text-paper/30 focus:border-volt focus:outline-none";

export default function Contact() {
  usePageMeta(
    "Contact — CACHI | Start a Project",
    "Have a project, an idea or a problem worth solving? Tell Cachi about it — brand, digital, campaign and AI creative enquiries welcome."
  );

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | failed | unconfigured

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    if (!FORM_ENDPOINT) {
      setStatus("unconfigured");
      return;
    }

    setStatus("sending");
    trackEvent("form_submit", form.type);
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("failed");
    }
  };

  return (
    <Page>
      <section className="bg-ink">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-36 md:pt-44">
          <Reveal>
            <p className="font-display text-xs font-bold tracking-[0.35em] text-volt">
              CONTACT
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight md:text-7xl">
              LET'S MAKE SOMETHING <span className="text-outline">MATTER.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 max-w-xl text-paper/60">
              Have a project, an idea or a problem worth solving? Tell us about
              it. We'd like to hear what you're working on.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-14 lg:grid-cols-12">
            {/* Form */}
            <Reveal delay={0.1} className="lg:col-span-7">
              <form onSubmit={onSubmit} noValidate className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="NAME" error={errors.name}>
                    <input
                      type="text"
                      value={form.name}
                      onChange={set("name")}
                      aria-invalid={!!errors.name}
                      className={inputClass}
                      placeholder="Your name"
                    />
                  </Field>
                  <Field label="EMAIL ADDRESS" error={errors.email}>
                    <input
                      type="email"
                      value={form.email}
                      onChange={set("email")}
                      aria-invalid={!!errors.email}
                      className={inputClass}
                      placeholder="you@company.com"
                    />
                  </Field>
                </div>

                <Field label="COMPANY OR ORGANISATION" error={errors.company}>
                  <input
                    type="text"
                    value={form.company}
                    onChange={set("company")}
                    aria-invalid={!!errors.company}
                    className={inputClass}
                    placeholder="Company, brand or 'Individual'"
                  />
                </Field>

                <Field label="PROJECT TYPE" error={errors.type}>
                  <select
                    value={form.type}
                    onChange={set("type")}
                    aria-invalid={!!errors.type}
                    className={`${inputClass} appearance-none ${form.type ? "" : "text-paper/40"}`}
                  >
                    <option value="" disabled className="bg-ink">
                      Select a project type…
                    </option>
                    {PROJECT_TYPES.map((t) => (
                      <option key={t} value={t} className="bg-ink">
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="PROJECT DESCRIPTION" error={errors.description}>
                  <textarea
                    rows={6}
                    value={form.description}
                    onChange={set("description")}
                    aria-invalid={!!errors.description}
                    className={`${inputClass} resize-y`}
                    placeholder="What are you building, changing or trying to achieve?"
                  />
                </Field>

                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="block">
                    <span className="font-display text-xs font-bold tracking-[0.25em] text-paper/60">
                      BUDGET <span className="text-fog">(OPTIONAL)</span>
                    </span>
                    <select
                      value={form.budget}
                      onChange={set("budget")}
                      className={`${inputClass} mt-2 appearance-none ${form.budget ? "" : "text-paper/40"}`}
                    >
                      <option value="" className="bg-ink">
                        Select a range…
                      </option>
                      {BUDGETS.map((b) => (
                        <option key={b} value={b} className="bg-ink">
                          {b}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="font-display text-xs font-bold tracking-[0.25em] text-paper/60">
                      TIMELINE <span className="text-fog">(OPTIONAL)</span>
                    </span>
                    <input
                      type="text"
                      value={form.timeline}
                      onChange={set("timeline")}
                      className={`${inputClass} mt-2`}
                      placeholder="e.g. 'Next quarter', 'ASAP', 'Exploring'"
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center gap-3 rounded-full bg-volt px-8 py-4 font-display text-sm font-bold tracking-[0.15em] text-ink transition hover:bg-paper disabled:opacity-50"
                >
                  {status === "sending" ? "SENDING…" : "SEND ENQUIRY"}
                </button>

                {/* Status messages — never a fake success */}
                <div aria-live="polite">
                  {status === "success" && (
                    <p className="rounded-xl border border-volt/40 bg-volt/10 p-4 text-sm text-paper">
                      Thank you — your enquiry has been sent. We'll get back to
                      you within one business day.
                    </p>
                  )}
                  {status === "failed" && (
                    <p className="rounded-xl border border-red-400/40 bg-red-400/10 p-4 text-sm text-paper">
                      Something went wrong sending the form. Please email us
                      directly at{" "}
                      <a
                        href="mailto:hello@cachi.studio"
                        className="underline decoration-volt underline-offset-4"
                      >
                        hello@cachi.studio
                      </a>
                      .
                    </p>
                  )}
                  {status === "unconfigured" && (
                    <p className="rounded-xl border border-volt/40 bg-volt/10 p-4 text-sm leading-relaxed text-paper">
                      This form isn't connected to a delivery service yet —
                      reach us directly instead:{" "}
                      <a
                        href="mailto:hello@cachi.studio"
                        onClick={() => trackEvent("email_click", "contact_form")}
                        className="underline decoration-volt underline-offset-4"
                      >
                        hello@cachi.studio
                      </a>
                      <span className="mt-2 block text-xs text-fog">
                        (Site owner: set VITE_FORM_ENDPOINT in .env to activate
                        form submissions.)
                      </span>
                    </p>
                  )}
                </div>
              </form>
            </Reveal>

            {/* Aside */}
            <Reveal delay={0.2} className="lg:col-span-4 lg:col-start-9">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
                <h2 className="font-display text-sm font-bold tracking-[0.3em] text-volt">
                  PREFER DIRECT?
                </h2>
                <ul className="mt-6 space-y-5 text-sm">
                  <li>
                    <p className="text-xs tracking-[0.25em] text-fog">EMAIL</p>
                    <a
                      href="mailto:hello@cachi.studio"
                      onClick={() => trackEvent("email_click", "contact_aside")}
                      className="mt-1 block text-paper transition hover:text-volt"
                    >
                      hello@cachi.studio
                    </a>
                  </li>
                  <li>
                    <p className="text-xs tracking-[0.25em] text-fog">WHATSAPP</p>
                    {/* PLACEHOLDER: replace +00 000 000 000 with the real number */}
                    <a
                      href="https://wa.me/000000000000"
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => trackEvent("whatsapp_click", "contact_aside")}
                      className="mt-1 block text-paper transition hover:text-volt"
                    >
                      Message us on WhatsApp
                    </a>
                  </li>
                </ul>
                <p className="mt-8 border-t border-white/10 pt-6 text-sm leading-relaxed text-paper/60">
                  We aim to reply to every enquiry within one business day.
                  If it's urgent, say so in the description.
                </p>
                <p className="mt-6 font-display text-xs font-bold tracking-[0.25em] text-volt">
                  BETTER QUESTIONS. BOLDER DESIGN.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </Page>
  );
}
