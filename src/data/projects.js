/**
 * Portfolio content.
 *
 * IMPORTANT: every project below is clearly-labelled CONCEPT work created to
 * demonstrate the studio's capabilities — no invented clients, endorsements
 * or results. Replace images (public/images/*.svg) and fields with authentic
 * client projects as they become available.
 */

export const CATEGORIES = [
  "All Work",
  "Brand & Identity",
  "Digital Experiences",
  "Creative & Campaigns",
  "AI Experiments",
];

export const projects = [
  {
    slug: "kilo-atlas",
    title: "Kilo Atlas",
    category: "Brand & Identity",
    year: "2025",
    image: "/images/work-kilo.svg",
    concept: true,
    description:
      "A concept identity exploring modular type, strict grids and one confident accent colour.",
    challenge:
      "A data-heavy product with a strong offering but an inconsistent, forgettable visual presence across decks, screens and print.",
    insight:
      "The brand's real value is structure — turning scattered information into clear, confident decisions. The identity should embody that structure.",
    solution:
      "A modular identity system built on a strict grid, high-contrast typography and a single electric accent, designed to flex across print and digital environments without losing its voice.",
    exploration:
      "Grid studies, type-scale experiments and colour stress-tests across light and dark environments — including applications the original brief never asked for.",
    deliverables: [
      "Identity system",
      "Logo suite",
      "Typography & grid guidelines",
      "Stationery & deck templates",
      "Social media templates",
    ],
    outcome:
      "A complete concept system ready to be applied to a real brand — built to demonstrate how Cachi approaches identity-building from strategy to application.",
  },
  {
    slug: "orbit-os",
    title: "Orbit OS",
    category: "Digital Experiences",
    year: "2025",
    image: "/images/work-orbit.svg",
    concept: true,
    description:
      "A concept dark-mode product interface exploring hierarchy, rhythm and restrained interactivity.",
    challenge:
      "Complex product interfaces often bury the few actions that matter underneath layers of visual noise and competing priorities.",
    insight:
      "Calm interfaces feel faster. Hierarchy, rhythm and spacing do more for usability than decoration ever will.",
    solution:
      "A dark interface system with a strict typographic scale, generous spacing and a single accent colour reserved exclusively for interactive elements.",
    exploration:
      "Wireframe flows, layout rhythm studies and contrast tests to keep the concept accessible across viewing conditions.",
    deliverables: [
      "Design system",
      "Key screens & user flows",
      "Interactive prototype",
      "Component library",
    ],
    outcome:
      "A concept design system demonstrating Cachi's digital product philosophy — clarity first, decoration last.",
  },
  {
    slug: "night-shift",
    title: "Night Shift",
    category: "Creative & Campaigns",
    year: "2025",
    image: "/images/work-campaign.svg",
    concept: true,
    description:
      "A concept art direction study — cinematic light, sculptural form and a single electric glow.",
    challenge:
      "Campaign imagery in crowded categories tends to blend together: same subjects, same lighting, same flat colour treatment.",
    insight:
      "Restraint is the loudest voice in the room. One sculptural object, one light source, one colour — and the audience completes the story.",
    solution:
      "A campaign art direction system built on cinematic darkness, sculptural product presence and a single electric-yellow halo that carries across every execution.",
    exploration:
      "Lighting studies, set-direction sketches and moodframes exploring how far the darkness could go before legibility breaks.",
    deliverables: [
      "Art direction system",
      "Key visuals & moodframes",
      "Photography direction notes",
      "Campaign extension templates",
    ],
    outcome:
      "A concept campaign direction demonstrating Cachi's approach to art direction and advertising craft.",
  },
  {
    slug: "bloom",
    title: "Bloom",
    category: "AI Experiments",
    year: "2025",
    image: "/images/work-bloom.svg",
    concept: true,
    description:
      "A generative visual experiment — algorithmic ribbons grown from simple curve rules.",
    challenge:
      "AI-assisted visual production is often treated as a slot machine: prompt, hope, repeat. The results rarely feel designed.",
    insight:
      "Generative systems work best when a human defines the rules — the algorithm explores within them, not instead of them.",
    solution:
      "A parametric curve system where a small set of human-authored rules (curvature, density, colour weighting) generates endless composition variations.",
    exploration:
      "Dozens of rule variations, seeded outputs and curation passes to find the configurations with a distinct point of view.",
    deliverables: [
      "Generative visual system",
      "Parameter documentation",
      "Curated output gallery",
      "Process notes",
    ],
    outcome:
      "An ongoing experiment in human-directed generative design — proof that the studio's AI work stays design-led.",
  },
  {
    slug: "paper-protocols",
    title: "Paper Protocols",
    category: "Brand & Identity",
    year: "2025",
    image: "/images/work-paper.svg",
    concept: true,
    description:
      "A concept print-first identity — editorial composition, geometric order and tactile restraint.",
    challenge:
      "Digital-first brands often lose all character the moment they appear on paper — printed matter becomes an afterthought.",
    insight:
      "Print is where a brand proves it has taste. Tactile, well-ordered paper work earns credibility no screen can.",
    solution:
      "A print-first editorial system: geometric order, generous white space, one black bar, one yellow circle — the whole identity at a glance.",
    exploration:
      "Compositional studies across formats, fold structures and paper stocks to test the system's extremes.",
    deliverables: [
      "Print identity system",
      "Editorial layouts",
      "Collateral suite",
      "Print specification notes",
    ],
    outcome:
      "A concept print system demonstrating Cachi's graphic design and communication craft.",
  },
  {
    slug: "loop-machine",
    title: "Loop Machine",
    category: "AI Experiments",
    year: "2025",
    image: "/images/work-loop.svg",
    concept: true,
    description:
      "A motion experiment — orbital rings, easing studies and loop-based rhythm.",
    challenge:
      "Motion graphics is often treated as decoration bolted on at the end of a project rather than a design discipline.",
    insight:
      "Rhythm is information. When motion obeys a system, it communicates; when it doesn't, it distracts.",
    solution:
      "A loop-based motion study where orbital timing, easing curves and blur behaviour all derive from one shared rhythm rule.",
    exploration:
      "Timing charts, easing comparisons and frame-by-frame curation to find the loop point that feels inevitable.",
    deliverables: [
      "Motion study & loops",
      "Timing & easing documentation",
      "Styleframes",
      "Process notes",
    ],
    outcome:
      "A concept motion system showing how Cachi thinks about rhythm, restraint and craft in movement.",
  },
];

export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}
