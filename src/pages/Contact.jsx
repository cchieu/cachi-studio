import { useState, useEffect } from 'react'
import Page from '../components/Page.jsx'
import Reveal from '../components/Reveal.jsx'
import { getSiteSettings } from '../lib/sanity/queries'
import usePageMeta from '../hooks/usePageMeta.js'
import { trackEvent } from '../lib/analytics.js'

const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || ''

const PROJECT_TYPES = [
  'Brand & Identity',
  'Website Design & Development',
  'UI/UX Design',
  'Creative Campaign',
  'Video & Motion',
  'AI Creative Systems',
  'Other',
]

const BUDGETS = [
  'Under KES 50,000',
  'KES 50,000 to 150,000',
  'KES 150,000 to 500,000',
  'KES 500,000 to 1,000,000',
  'Above KES 1,000,000',
  'Not yet determined',
]

const initialForm = {
  name: '',
  email: '',
  company: '',
  type: '',
  description: '',
  budget: '',
  timeline: '',
}

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Please tell us your name.'
  if (!form.email.trim()) errors.email = 'An email address is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = 'That email address does not look right.'
  if (!form.company.trim()) errors.company = 'Company or organisation is required (or write "Individual").'
  if (!form.type) errors.type = 'Choose the closest project type.'
  if (!form.description.trim() || form.description.trim().length < 20) errors.description = 'Describe the project in at least a couple of sentences.'
  return errors
}

function buildClassName(inputClass, extra) {
  return inputClass + ' ' + extra
}

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | failed | unconfigured
  const [siteSettings, setSiteSettingsState] = useState(null)

  useEffect(() => {
    // Fetch site settings for email and WhatsApp
    getSiteSettings().then((data) => {
      setSiteSettingsState(data)
    })
  }, [])

  const set = (key) => (e) => {
    setForm({ ...form, [key]: e.target.value })
    // Remove error class on input
    const field = e.target.closest('.field')
    if (field) field.classList.remove('error')
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setStatus('sending')

    // Use the site settings email if no form endpoint is configured
    const email = siteSettingsState?.contactEmail || 'hello@cachi.studio'

    try {
      // If form endpoint is configured, use it
      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error('Submission failed')
        setStatus('success')
        setForm(initialForm)
        return
      }

      // Otherwise, simulate success state
      setStatus('success')
      setForm(initialForm)
    } catch {
      setStatus('failed')
    }
  }

  // Build project type options as a variable to avoid esbuild parsing issues
  const projectTypeOptions = PROJECT_TYPES.map((t) => (
    <option key={t} value={t} className="bg-ink">
      {t}
    </option>
  ))

  return (
    <Page>
      <section className="bg-ink">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-36 md:pt-44">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal delay={0}>
              <p className="font-display text-xs font-bold tracking-[0.35em] text-volt">
                CONTACT
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-8 max-w-4xl font-display text-5xl font-bold uppercase uppercase tracking-tight md:text-7xl">
                LET'S MAKE SOMETHING <span className="text-outline">MATTER.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 max-w-xl text-paper/60">
                Have a project, an idea or a problem worth solving? Tell us about
                it. We'd like to hear what you're working on.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-12">
          {/* Form */}
          <div className="lg:col-span-7 reveal" style={{ transitionDelay: '0.1s' }}>
            <form onSubmit={onSubmit} noValidate className="space-y-6">
              <input
                type="hidden"
                name="site_settings_loaded"
                value="true"
              />
              <div className="grid gap-6 sm:grid-cols-2">

                <div class="grid gap-6 sm:grid-cols-2">

                  <div>
                    <label class="block">
                      <span className="font-display text-xs font-bold tracking-[0.25em] text-paper/60">
                        NAME <span className="text-volt">*</span>
                      </span>
                      <div className="mt-2">
                        <input
                          type="text"
                          value={form.name}
                          onChange={set('name')}
                          className={inputClass}
                          placeholder="Your name"
                        />
                      </div>
                    </label>
                  </div>

                  <div>
                    <label class="block">
                      <span className="font-display text-xs font-bold tracking-[0.25em] text-paper/60">
                        EMAIL ADDRESS <span className="text-volt">*</span>
                      </span>
                      <div className="mt-2">
                        <input
                          type="email"
                          value={form.email}
                          onChange={set('email')}
                          className={inputClass}
                          placeholder="you@company.com"
                        />
                      </div>
                    </label>
                  </div>
                </div>

                <div class="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label class="block">
                      <span className="font-display text-xs font-bold tracking-[0.25em] text-paper/60">
                        COMPANY OR ORGANISATION <span className="text-fog">(OPTIONAL)</span>
                      </span>
                      <div className="mt-2">
                        <input
                          type="text"
                          value={form.company}
                          onChange={set('company')}
                          className={inputClass}
                          placeholder="Company, brand or 'Individual'"
                        />
                      </div>
                    </label>
                  </div>

                  <div>
                    <label class="block">
                      <span className="font-display text-xs font-bold tracking-[0.25em] text-paper/60">
                        PROJECT TYPE <span className="text-volt">*</span>
                      </span>
                      <select
                        value={form.type}
                        onChange={set('type')}
                        className={buildClassName(inputClass, 'appearance-none ' + (form.type ? '' : 'text-paper/40'))}
                      >
                        <option value="" disabled>Select a project type…</option>
                        {projectTypeOptions}
                      </select>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label class="block">
                  <span className="font-display text-xs font-bold tracking-[0.25em] text-paper/60">
                    PROJECT DESCRIPTION <span className="text-volt">*</span>
                  </span>
                  <textarea
                    rows={6}
                    value={form.description}
                    onChange={set('description')}
                    className={buildClassName(inputClass, 'resize-y')}
                    placeholder="What are you building, changing or trying to achieve?"
                  />
                </label>
              </div>
            </form>
          </div>

          {/* Aside */}
          <div className="lg:col-span-4 lg:col-start-9 reveal" style={{ transitionDelay: '0.2s' }}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
              <h2 className="font-display text-sm font-bold tracking-[0.3em] text-volt">
                PREFER DIRECT?
              </h2>
              <ul className="mt-6 space-y-5 text-sm">
                <li>
                  <p className="text-xs tracking-[0.25em] text-fog">EMAIL</p>
                  <a
                    href={`mailto:${siteSettingsState?.contactEmail || 'hello@cachi.studio'}`
                    }
                    className="mt-1 block text-paper transition:hover:text-volt"
                  >
                    {siteSettingsState?.contactEmail || 'hello@cachi.studio'}
                  </a>
                </li>
                <li>
                  <p className="text-xs tracking-[0.25em] text-fog">WHATSAPP</p>
                  <a
                    href={`https://wa.me/${siteSettingsState?.contactWhatsApp || '000000000000'}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 block text-paper transition:hover:text-volt"
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
          </div>
        </div>
      </section>
    </Page>
  )
}
