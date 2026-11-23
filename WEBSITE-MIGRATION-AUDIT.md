# Cachi Studio Website Migration Audit

**Reference Website:** https://cachi-studio.vercel.app/
**Original Project:** Cachi — Beyond the Brief | Independent Creative Studio
**Migration Goal:** Convert to production-ready WordPress theme preserving 100% visual fidelity and functionality

---

## 1. ALL DISCOVERED PAGES AND ROUTES

| Route | Page | Status |
|-------|------|--------|
| `/` | Homepage | ✅ |
| `/work` | Projects/Portfolio page | ✅ |
| `/work/:slug` | Individual project case study | ✅ |
| `/services` | Services page | ✅ |
| `/studio` | Studio story page | ✅ |
| `/contact` | Contact page | ✅ |
| `/404` | Error page | ✅ (implicit) |

### Homepage Sections (in sequence):
1. **Hero** — Brand tagline, main headline with animated lines, CTA buttons
2. **Marquee** — Infinite scrolling text: "BEYOND THE BRIEF", "BETTER QUESTIONS", "BOLDER DESIGN"
3. **Intro** — Brand introduction ("01 — THE STUDIO", heading, description)
4. **Selected Work** — Projects grid with filterable categories
5. **Services** — Four service capabilities with details
6. **Approach** — 5-step process (Understand, Reframe, Explore, Make, Refine)
7. **Why Cachi** — Three pillars (Human Thinking, Intelligent Making, Purposeful Design)
8. **Final CTA** — Large-scale CTA with scroll-reactive electric circle

### Other Pages:
- **Work** — Filterable project grid, category filters
- **Case Study** (`/work/:slug`) — Project hero, narrative blocks (challenge/insight/solution/exploration/deliverables/outcome), related projects
- **Services** — 4 service items with numbers, titles, blurbs, involves/solves/receive/deliverables
- **Studio** — 5 story sections with philosophy, problem-solving, AI, collaboration, industries
- **Contact** — Form (name, email, company, project type, description, budget, timeline) + direct contact info
- **404** — Error page with navigation

---

## 2. DESIGN SYSTEM AND COLOUR PALETTE

### Colour Values (exact, from rendered website):

| Variable | Hex | Usage |
|----------|-----|-------|
| `--color-ink` | `#101010` | Primary: backgrounds, dark text, navigation (unscrolled) |
| `--color-volt` | `#F1ED28` | Accent: highlights, CTA backgrounds, interactive elements |
| `--color-paper` | `#F4F4F0` | Light: card backgrounds, subtle surfaces |
| `--color-fog` | `#858585` | Muted: secondary text, disabled states, dividers |

### Colour Usage Map:
- **Ink (#101010):** Hero bg, service bg, approach bg, why-cachi bg, footer bg, nav (scrolled), project cards
- **Volt (#F1ED28):** Accent CTA buttons, hover states, outline effects, number badges, decorative elements, cursor, accordion active states
- **Paper (#F4F4F0):** Intro section bg, service section bg, why-cachi alternate rows, contact aside bg, footer top area
- **Fog (#858585):** Muted body text, placeholder text, text.opacity states, border colors, hover text secondary

### Colour States:
- **Button hover:** bg-volt text-ink (CTA), border-volt text-paper (secondary buttons)
- **Active/selected:** text-volt or bg-volt depending on context
- **Focus visible:** `outline: 2px solid #f1ed28` (2px solid #f1ed28)
- **Text outline:** `-webkit-text-stroke: 1.5px rgba(244,244,240,0.55)` for text-outline-ink, `1.5px rgba(16,16,16,0.5)` for text-outline-ink

---

## 3. TYPOGRAPHY SPECIFICATIONS

### Font Families:
- **Display/Headings/Interactive:** `Space Grotesk`, `ui-sans-serif`, `system-ui`, `sans-serif`
- **Body/Text:** `Inter`, `ui-sans-serif`, `system-ui`, `sans-serif`

### Font Weights (Space Grotesk):
- **400** - Regular (body text)
- **500** - Medium (secondary text, labels)
- **600** - Semi-bold (some interactive elements)
- **700** - Bold (headings, strong statements)

### Font Weights (Inter):
- **400** - Regular (paragraph text)
- **500** - Medium (form labels, sidebar text)

### Typography Scale:
- **Display heading (Hero):** `text-[15vw] sm:text-7xl lg:text-[7.2rem]` → responsive: ~15vw → 7.2rem at lg
- **Section headings (h2):** `text-5xl font-bold uppercase leading-[0.95] tracking-tight md:text-6xl` → 3rem → 6rem at md
- **Sub-headings:** `text-3xl font-bold uppercase tracking-tight md:text-4xl` → 1.875rem → 4rem at md
- **Body/paragraph:** `text-base leading-relaxed` → ~1rem line-height
- **Small text:** `text-xs` → ~0.75rem
- **Caption/text-xs:** `text-[10px]` → 10px

### Line Heights:
- **Display:** `leading-[0.92]` (very tight for display)
- **Headings:** `leading-[0.95]` or `leading-[1]` 
- **Body:** `leading-relaxed` (typically ~1.6 or ~1.8)

### Letter Tracking:
- **Tight:** `tracking-tight`
- **Wide:** `tracking-wide`
- **Tighter:** `tracking-[0.15em]` or `tracking-[0.25em]` or `tracking-[0.35em]`
- **Utility:** `tracking-[0.15em]` (buttons), `tracking-[0.25em]` (labels), `tracking-[0.35em]` (hero tagline), `tracking-[0.4em]` (scroll hint)

### Text Transformations:
- **Uppercase:** `uppercase` (used for section titles, nav links, service numbers)
- **Lowercase:** `lowercase` (logo text "cachi")
- **None:** default (body text)

### Heading Hierarchy:
- **h1:** Hero main title (multiple lines)
- **h2:** Section headings ("01 — THE STUDIO", "GOOD QUESTIONS CHANGE EVERYTHING.", etc.)
- **h3:** Sub-section titles within service items, approach pillars
- **h4:** Not explicitly used but would follow hierarchy

---

## 4. ASSET INVENTORY

### Images/SVGs (from `public/images/`):
| File | Description | Usage |
|------|-------------|-------|
| `work-kilo.svg` | Kilo Atlas project thumbnail | Project card featured image |
| `work-orbit.svg` | Orbit OS project thumbnail | Project card featured image |
| `work-campaign.svg` | Night Shift campaign thumbnail | Project card featured image |
| `work-bloom.svg` | Bloom AI experiment thumbnail | Project card featured image |
| `work-loop.svg` | Loop Machine motion experiment thumbnail | Project card featured image |
| `work-paper.svg` | Paper Protocols project thumbnail | Project card featured image |
| `studio-wall.svg` | Abstract studio wall illustration | Case study exploration section, Studio page background |

### Logo:
- **Format:** SVG wordmark + circular symbol
- **Mark:** Lowercase "cachi" in Space Grotesk font-bold, with electric yellow circle symbol
- **Colors:** Wordmark in `#101010` (ink), circle in `#F1ED28` (volt)
- **ViewBox:** 0 0 26 26
- **SVG:** `<circle cx="13" cy="13" r="11" fill="#F1ED28" /><circle cx="16.5" cy="9.5" r="3.5" fill="#101010" />` + `<span className="font-display text-[22px] font-bold lowercase leading-none tracking-tight">cachi</span>`

### Favicon:
- `favicon.svg` — 64x64 SVG with `#101010` and `#F1ED28` elements

### Colour/Design Tokens (visual assets, not code):
- Electric yellow circle motif used throughout
- Grid pattern/structure in visual identity
- Marquee track background styling

---

## 5. INTERACTIVE COMPONENT INVENTORY

### Navigation:
- **Desktop:** Fixed header, logo left, nav links right, CTA button right
- **Mobile:** Hamburger menu (top-right), slides in as sidebar
- **Scroll effect:** Nav becomes `bg-ink/85 backdrop-blur` after 24px scroll
- **Active states:** Current page link gets `text-paper`, others `text-paper/60`
- **Hover:** Links `hover:text-paper`, CTA buttons `hover:bg-paper`
- **Mobile links:** `text-5xl font-bold tracking-tight`, animate-in from left

### Buttons:
- **Primary CTA:** `bg-volt px-8 py-4 text-sm font-bold tracking-[0.15em] text-ink hover:bg-paper`
- **Secondary:** `border border-paper/25 px-8 py-4 text-sm font-bold tracking-[0.15em] text-paper transition hover:border-volt hover:text-volt`
- **Enquire service:** `bg-volt/60 px-6 py-3 text-xs font-bold tracking-[0.2em] text-volt hover:bg-volt hover:text-ink`
- **Form submit:** `bg-volt px-8 py-4 text-sm font-bold tracking-[0.15em] text-ink hover:bg-paper disabled:opacity-50`

### Scroll-triggered Animations:
- **Hero backdrop:** Drifts and dims based on `scrollYProgress` (0 to 1)
- **Hero content:** Floats up 140px, fades from opacity 1 to 0.15
- **Electric circle (Final CTA):** Scales from 0.35 to 1.55 based on scroll
- **Reveal components:** Fade + slide-up on scroll, staggered delays (0.05s increments)
- **Marquee:** Infinite leftward scrolling at 32s duration
- **Project card hover:** Image scales to 1.045, arrow lifts and fades in
- **Navbar scroll:** Background changes at 24px scroll threshold
- **Service item hover:** Background/text color transitions
- **Cursor:** Follows mouse, scales on hover of `data-cursor` elements or `a, button`
- **Circle motif:** Rotating/dancing animation (outer ring CW, inner ring CCW, core breathing, orbiting satellite)

### Modals/Overlays:
- None detected as standalone components

### Forms:
- **Contact form fields:** Name (required), Email (required, validated), Company (required or "Individual"), Project Type (select with 7 options), Project Description (textarea, min 20 chars), Budget (optional select), Timeline (optional text)
- **Status states:** idle → sending → success/failure/unconfigured
- **Success message:** "Thank you — your enquiry has been sent. We'll get back to you within one business day."
- **Failed message:** "Something went wrong sending the form. Please email us directly at hello@cachi.studio"
- **Unconfigured message:** "This form isn't connected to a delivery service yet — reach us directly instead: hello@cachi.studio"

### Special Elements:
- **Marquee text container:** Border-bottom `border-y border-ink/10`, bg-volt text-ink, padded
- **Outline text:** `.text-outline` (transparent + `-webkit-text-stroke: 1.5px`), `.text-outline-ink` (transparent + `1.5px rgba(16,16,16,0.5)`)
- **Focus-visible:** `outline: 2px solid #f1ed28; outline-offset: 3px`
- **Reduced motion:** `prefers-reduced-motion: reduce` disables all framer-motion animations, falls back to CSS/implicit

### Image Interactions:
- **Project cards:** `object-cover`, `aspect-[4/3]`, hover scale 1.045 over 700ms
- **Case study hero:** `object-cover`, `aspect-[16/7]` or `h-[55vh] md:h-[68vh]`
- **Lazy loading:** All images have `loading="lazy"`

---

## 6. NAVIGATION AND ROUTING BEHAVIOUR

### Menu Structure (5 main links):
| Label | URL | Notes |
|-------|-----|-------|
| HOME | `/` | Active state when on homepage |
| WORK | `/work` | Shows project grid |
| SERVICES | `/services` | Shows 4 service capabilities |
| STUDIO | `/studio` | Shows studio philosophy |
| CONTACT | `/contact` | Shows contact form and info |

### Routing:
- **React Router DOM** used in original: `/`, `/work`, `/work/:slug`, `/services`, `/studio`, `/contact`
- **WordPress pretty permalinks:** `/`, `/work`, `/work/{slug}`, `/services`, `/studio`, `/contact`
- **Internal links:** All point to `/` paths (relative)
- **External/mailto:** `mailto:hello@cachi.studio`, `https://wa.me/000000000000`

### Mobile Menu:
- Hamburger button (hidden on desktop, `md:hidden`)
- Slides in as fixed full-height sidebar
- Closes on link click
- Overflows `bg-ink` with `text-paper` links
- Disables body overflow when open

### Dropdowns/Overlays:
- None beyond mobile menu

---

## 7. RESPONSIVE LAYOUT OBSERVATIONS

### Breakpoints (Tailwind defaults, matched to design):
- **sm:** ≥640px (minor adjustments)
- **md:** ≥768px (tablet landscape)
- **lg:** ≥1024px (standard desktop)
- **xl:** ≥1280px (large desktop)

### Key Responsive Behaviours:
- **Hero typography:** `text-[15vw] sm:text-7xl lg:text-[7.2rem]` — vw units shrink as width grows
- **Grid layouts:**
  - Projects: `grid gap-x-6 gap-y-14 md:grid-cols-2` (2 columns at md)
  - Services: `md:grid-cols-12 md:gap-6` (12-column at md, but content spans fewer)
  - Why Cachi: `md:grid-cols-2` (2 columns at md)
  - Intro pillars: `md:grid-cols-3` (3 columns at md)
- **Max width:** `max-w-7xl` (typically 1680px → with padding creates ~1540px content area)
- **Hero padding:** `pt-36 pb-28` on mobile, adjustments at md/lg
- **Section spacing:** `py-24 md:py-32`, `py-32 md:py-40` patterns
- **Navigation:** Desktop shows full links at `md:flex`, hidden at mobile, hamburger at `md:hidden`
- **Text sizes:** Most scales have `sm:`, `md:`, `lg:` variants
- **Hidden elements:** `hidden sm:block` shows on desktop only; `lg:block` shows on larger screens

### Mobile-Specific (≤390px):
- Hero text scales down proportionally
- Grid columns stack (1 column)
- Nav mobile menu full-height sidebar
- Buttons full-width
- Touch-friendly hit areas

### Tablet-Specific (768px):
- 2-column grids become active
- Typography scales between mobile and desktop
- Nav transitions from hamburger to full desktop

### Prevented:
- Horizontal scrolling (overscroll-x)
- Text clipping inside constrained widths
- Buttons extending beyond viewport
- Collapsed navigation on mobile

---

## 8. FORMS AND THEIR EXPECTED BEHAVIOUR

### Contact Form (/contact):
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Name | Text | ✅ | Min check (no exact min, just presence) |
| Email | Email | ✅ | Format validation: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` |
| Company | Text | ✅ | Or "Individual" |
| Project Type | Select | ✅ | Must select from 7 options |
| Project Description | Textarea | ✅ | Min 20 characters |
| Budget | Select | ❌ | Optional, 6 ranges |
| Timeline | Text | ❌ | Optional, free form |

### Form Behaviour:
1. **Validation:** Client-side on submit, shows error labels per field
2. **Submission:** 
   - If `VITE_FORM_ENDPOINT` configured → JSON POST to endpoint
   - If not → email submission via `wp_mail()` (WordPress mode)
3. **Status states:** idle → sending → success/failure/unconfigured
4. **Success:** "Thank you — your enquiry has been sent. We'll get back to you within one business day."
5. **Failed:** "Something went wrong sending the form. Please email us directly at hello@cachi.studio"
6. **Unconfigured:** "This form isn't connected to a delivery service yet — reach us directly instead: hello@cachi.studio"
7. **Never fakes success** — if form not configured, clearly states it

### Aside Contact Info (on contact page):
- **Email:** `mailto:hello@cachi.studio` (always visible, tracked)
- **WhatsApp:** `https://wa.me/000000000000` (placeholder number, tracked)

---

## 9. FEATURES REQUIRING WORDPRESS EQUIVALENTS

### Custom Post Types Needed:
- **`projects`** — 7 portfolio items with full narrative, featured images, custom fields
- **`services`** — 4 service capability items with numbers, details, featured images

### Taxonomies:
- **`project_category`** — For filtering projects on Work page and case studies

### Theme Customizer Settings (Site Content):
- Hero tagline, subtitle
- About description
- Pillar 1-3 titles and content
- Final CTA title and subtitle
- Contact email
- Contact WhatsApp number
- Form endpoint URL

### Widget Areas:
- Footer widgets (links, services, contact, social)

### Form Handling:
- AJAX contact form with nonce verification
- Email fallback (wp_mail)
- Success/failure messages

### Animations/Interactions to Replicate:
- Marquee infinite scrolling
- Reveal-on-scroll animations (fade + slide)
- Navbar scroll effect (bg-ink/85 backdrop-blur)
- Project card hover effects
- Service item interactions
- Form status messages
- Cursor effect
- Circle motif animation
- Focus-visible states

### SEO Requirements:
- Semantic heading hierarchy
- wp_get_document_title()
- Open Graph metadata
- Twitter card structure
- Clean permalinks
- Alt text for all images

### Performance Requirements:
- Lazy loading for images
- Minimal JavaScript
- Efficient CSS with custom properties
- Google Analytics only when configured
- Responsive images

---

## 10. ADDITIONAL OBSERVATIONS

### TinaCMS Integration (existing project):
- 3 content collections: projects, services, siteContent
- Git-based content in `content/` directory
- Admin dashboard on Vercel
- Will need migration to WordPress Dashboard

### WordPress Compatibility Notes:
- No existing WordPress installation in project directory
- Must create theme from scratch
- Must ensure `has_shortcode()` calls use 2 arguments
- Must enqueue scripts/styles via wp_enqueue_scripts
- Must use wp_head() and wp_footer() in correct locations

### Key Non-Negotiables:
- Exact colour palette: ink (#101010), volt (#F1ED28), paper (#F4F4F0), fog (#858585)
- Fonts: Space Grotesk + Inter (not system fonts)
- Logo: lowercase "cachi" + yellow circle
- All 8 homepage sections preserved in sequence
- Mobile menu behaviour identical
- Form validation and messages exact
- No horizontal scrolling at any breakpoint
- Focus-visible outline: `#f1ed28` 2px
- Reduced motion respect