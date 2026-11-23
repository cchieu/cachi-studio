# Cachi Studio → WordPress Migration Plan

## Overview
Migrating an existing Vite + TinaCMS creative agency website to a self-hosted WordPress site with a custom theme, preserving visual identity, animations, and functionality.

---

## 1. EXISTING PROJECT AUDIT COMPLETE

### 1.1 Technology Stack
- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS v4
- **CMS**: TinaCMS (document-based, files in `content/`)
- **Routing**: React Router DOM
- **Animations**: framer-motion
- **Routing**: React Router DOM (/, /work, /work/:slug, /services, /studio, /contact)
- **Fonts**: Space Grotesk (display), Inter (body)
- **Colors**: ink (#101010), volt (#F1ED28), paper (#F4F4F0), fog (#858585)

### 1.2 Page Structure
| Page | Key Elements |
|------|-------------|
| Home (`/`) | Hero, Marquee, Intro, Selected Work (projects), Services Section, Approach, Why Cachi (3 pillars), Final CTA |
| Work (`/work`) | Filterable project grid, project cards, category filters |
| Case Study (`/work/:slug`) | Project hero image, narrative blocks (challenge/insight/solution/exploration/deliverables/outcome), related projects |
| Services (`/services`) | Four service capabilities with details (number, title, blurb, involves/solves/receive, deliverables, examples) |
| Studio (`/studio`) | Studio philosophy with 5 story sections (philosophy, problem-solving, AI, collaboration, industries) |
| Contact (`/contact`) | Form (name, email, company, type, description, budget, timeline), success/failure messages, direct email/WhatsApp |
| Not Found (`/404`) | 404 page with navigation |

### 1.3 TinaCMS Content Types
| Collection | Key Fields |
|-----------|-----------|
| `projects` | title, slug, category, year, concept, image, description, challenge, insight, solution, exploration, outcome, deliverables |
| `services` | number, title, blurb, receive |
| `siteContent` | heroTagline, heroSubtitle, aboutDescription, pillar1Title/pillar1Copy, pillar2Title/pillar2Copy, pillar3Title/pillar3Copy, finalCtaTitle/finalCtaSubtitle, contactEmail, contactWhatsApp, formEndpoint |

### 1.4 External Integrations
- Google Analytics (optional, VITE_GA_ID env var)
- Form service (Formspree/Basin/Web3Forms via VITE_FORM_ENDPOINT)
- No exposed API keys in the current implementation

### 1.5 Assets (public/images/)
- `studio-wall.svg` - abstract studio wall illustration
- `work-kilo.svg`, `work-orbit.svg`, `work-campaign.svg`, `work-bloom.svg`, `work-loop.svg`, `work-paper.svg` - project thumbnail images
- `favicon.svg` - favicon

### 1.6 Key Design Systems
- **Color palette**: ink (#101010), volt (#F1ED28), paper (#F4F4F0), fog (#858585)
- **Typography**: Space Grotesk (display/interactive), Inter (body text)
- **Breakpoints**: sm, md, lg (Tailwind default)
- **Component patterns**: Reveal (scroll-triggered), ProjectCard, Page shell, Navbar with mobile menu

---

## 2. MIGRATION UNIQUENESS FACTORS

### Animations to Preserve
1. **Hero scroll-reactive backdrop** - bgY, bgOpacity, contentY, contentOpacity transformations based on scrollYProgress
2. **Marquee** - infinite scrolling text at top of home page
3. **Reveal components** - scroll-triggered fade-in with downward translate, staggered delays
4. **Final CTA scroll effect** - electric circle scaling with scroll
5. **ProjectCard hover** - image scale lift + opacity transition on CTA arrow
6. **Navbar scroll effect** - bg-ink/85 backdrop-blur when scrolled
7. **CircleMotif** - rotating/dancing circular animation
8. **Cursor** - custom follow cursor with hover scale
9. **AnimatePresence** - route transition animations (fade + slide)

### Content Relationships
- Projects appear on Home (Selected Work), Work page, and Case Study pages
- Services appear on Home and Services page
- Studio sections are standalone content blocks
- Contact form references hardcoded email/WhatzApp but should come from dashboard

---

## 3. WORDPRESS IMPLEMENTATION STRATEGY

### 3.1 Directory Structure
```
C:\Users\caleb\cachi-studio\wordpress\
├── wp-content\
│   ├── themes\
│   │   └── cachi-studio/     ← Custom classic theme
│   └── plugins/
│       └── cachi-studio-content/  ← Companion content plugin
│           ├── cachi-studio-content.php
│           ├── admin/
│           │   └── settings-page.php
│           └── post-types/
│               ├── projects.php
│               ├── services.php
│               └── homepage.php
├── wordpress/                    ← Downloaded WordPress core (optional, for reference)
└── .env                          ← WordPress config (if needed)
```

### 3.2 Theme: `cachi-studio` (Classic Theme)

#### Template Files Required
| Template | Purpose |
|----------|---------|
| `style.css` | Theme info + custom CSS (Tailwind not used in WP theme; use plain CSS or Tailwind build) |
| `functions.php` | Theme setup, menus, ACF registration, enqueue styles/scripts |
| `index.php` | Homepage (or `front-page.php`) |
| `front-page.php` | Homepage template (preferred over index.php) |
| `header.php` | Navbar + opening HTML |
| `footer.php` | Footer with widgets, links, copyright |
| `page.php` | Generic page template |
| `single-project.php` | Individual project CPT page |
| `archive-project.php` | Projects listing/archive |
| `single-service.php` | Individual service CPT page |
| `archive-service.php` | Services listing/archive |
| `404.php` | 404 error page |
| `search.php` | Search results |
| `comments.php` | Comments (if needed) |
| `assets/css/` | Custom stylesheets |
| `assets/js/` | Custom JavaScript |
| `assets/images/` | Theme-related images |
| `template-parts/` | Reusable parts: header, footer, hero, service-card, project-card, navbar |

#### Key Theme Features
- **ENQUEUE CSS/JS**: Use `wp_enqueue_style()` and `wp_enqueue_script()` rather than CDN links
- **WordPress Menus**: Register navigation menu, display in header
- **Theme Support**: `add_theme_support('title-tag')`, `add_theme_support('post-thumbnails')`, `add_theme_support('html5')`
- **Widgets**: Register sidebars/footer widgets if needed
- **Template Hierarchy**: Follow WordPress template hierarchy correctly

#### CSS Strategy
Since this is a classic theme, I'll use plain CSS with Tailwind directives OR a Tailwind-build approach. Given the existing Tailwind v4 setup, I'll use PostCSS/Tailwind build within WordPress, but for simplicity and reliability, I'll use enqueued CSS with custom properties matching the existing color palette.

Actually, looking at this more carefully - the existing site uses Tailwind v4. For WordPress, I have two options:
1. Enqueue Tailwind via Vite/build process (complex)
2. Write plain CSS using the same design tokens (simpler, more maintainable)

I'll go with option 2 - plain CSS using CSS custom properties matching the existing palette (ink, volt, paper, fog), with modern CSS that replicates the Tailwind utility classes' effects. This is more reliable and doesn't require a build process in WordPress.

Actually, let me reconsider. The user said "Enqueue CSS and JavaScript through WordPress functions rather than hardcoding asset references." They didn't specifically say to use Tailwind. Let me use a hybrid approach: CSS custom properties for the design tokens, and enqueue a small amount of JS for the interactive elements.

Let me use plain CSS that matches the existing design. I'll define CSS custom properties for the colors and replicate the layout using modern CSS.

### 3.3 Companion Plugin: `cachi-studio-content`

#### Custom Post Types
| CPT | Labels | Key Fields |
|-----|--------|-----------|
| `projects` | Project, Projects | title, slug, category (taxonomy), year, concept (boolean), image (featured), description (editor), challenge (rich-text), insight (rich-text), solution (rich-text), exploration (rich-text), outcome (rich-text), gallery (images), ordering |
| `services` | Service, Services | title, number (integer), short_description, detailed_description, what_receives, featured_image/icon, display_order |

#### Taxonomies
- `project_category` - for filtering projects

#### Theme Settings (Options Page)
| Field | Type |
|-------|------|
| heroTagline | string |
| heroSubtitle | rich-text |
| aboutDescription | rich-text |
| pillar1Title | string |
| pillar1Copy | rich-text |
| pillar2Title | string |
| pillar2Copy | rich-text |
| pillar3Title | string |
| pillar3Copy | rich-text |
| finalCtaTitle | string |
| finalCtaSubtitle | rich-text |
| contactEmail | string |
| contactWhatsApp | string |
| formEndpoint | string (URL) |

#### Migration Method
1. Extract all TinaCMS content from `content/projects/`, `content/services/`, `content/site-content/`
2. Convert to WordPress import format (WXR or JSON)
3. Create WP CLI script or PHP importer
4. Preserve slugs, image references, rich-text formatting
5. Document any unmigrated content

### 3.4 Contact Form Integration
- WordPress native form handling or simple PHP mailer
- Configured via `formEndpoint` in theme settings
- Spam protection: Akismet or simple honeypot
- Nonce verification for form submission
- No exposed API keys

### 3.5 SEO Implementation
- `wp_head()` for title tags and meta
- Open Graph metadata via functions in `functions.php`
- Schema.org structured data
- Semantic heading structure
- SEO-friendly URLs (project slugs preserved)

### 3.6 Performance Considerations
- Efficient CSS (no unused CSS)
- Lazy loading for images (`loading="lazy"`)
- Proper image sizes via `srcset`
- Nonces for forms and admin actions
- Minimal plugin count

---

## 4. PHASE 1: FOUNDATION (Days 1-3)

### 4.1 Create WordPress Directory Structure
```
mkdir C:\Users\caleb\cachi-studio\wordpress
mkdir C:\Users\caleb\cachi-studio\wordpress\wp-content\themes
mkdir C:\Users\caleb\cachi-studio\wordpress\wp-content\plugins
```

### 4.2 Download and Install WordPress
- Download latest WordPress from wordpress.org
- Extract to `C:\Users\caleb\cachi-studio\wordpress\` (or use LocalWP which installs it)
- Or: Let LocalWP create the WordPress installation

### 4.3 Create the Theme Skeleton
- `style.css` with Theme Header
- `functions.php` with theme setup
- `index.php` minimal
- `header.php` with navbar
- `footer.php` with footer

### 4.4 Create the Content Plugin Skeleton
- `cachi-studio-content.php` with plugin header
- Register CPTs and taxonomies
- Add theme options page

### 4.5 Migrate TinaCMS Content
- Read existing `content/projects/*.md` (if any)
- Read `tina/__generated__/` for schema info
- Create JSON import format
- Import into WordPress

Let me start implementing. First, I'll check if WordPress is already available or if I need to provide setup instructions.