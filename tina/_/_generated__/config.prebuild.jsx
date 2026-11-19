// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: "main",
  clientId: "aee415c0-c759-48b3-bd40-1e948df0b3d3",
  studio: {
    name: "Cachi Studio",
    url: "https://cachi-studio.vercel.app"
  },
  db: {
    projectId: "cachi-studio",
    collections: {
      projects: {
        name: "projects",
        label: "Projects",
        path: "/projects",
        fields: [
          {"name": "title", "label": "Title", "field": {"type": "string"}},
          {"name": "slug", "label": "Slug", "field": {"type": "string"}},
          {"name": "category", "label": "Category", "field": {"type": "string"}},
          {"name": "year", "label": "Year", "field": {"type": "string"}},
          {"name": "concept", "label": "Concept Work", "field": {"type": "boolean"}},
          {"name": "image", "label": "Image", "field": {"type": "string"}},
          {"name": "description", "label": "Description", "field": {"type": "textarea"}},
          {"name": "challenge", "label": "Challenge", "field": {"type": "textarea"}},
          {"name": "insight", "label": "Insight", "field": {"type": "textarea"}},
          {"name": "solution", "label": "Solution", "field": {"type": "textarea"}},
          {"name": "exploration", "label": "Exploration", "field": {"type": "textarea"}},
          {"name": "deliverables", "label": "Deliverables", "field": {"type": "array", "of": {"type": "string"}}},
          {"name": "outcome", "label": "Outcome", "field": {"type": "textarea"}}
        ],
        templates: []
      },
      services: {
        name: "services",
        label: "Services",
        path: "/services",
        fields: [
          {"name": "id", "label": "ID", "field": {"type": "string"}},
          {"name": "number", "label": "Number", "field": {"type": "string"}},
          {"name": "title", "label": "Title", "field": {"type": "string"}},
          {"name": "blurb", "label": "Blurb", "field": {"type": "textarea"}},
          {"name": "items", "label": "Items", "field": {"type": "array", "of": {"type": "string"}}},
          {"name": "involves", "label": "Involves", "field": {"type": "textarea"}},
          {"name": "solves", "label": "Solves", "field": {"type": "textarea"}},
          {"name": "receive", "label": "Receive", "field": {"type": "textarea"}},
          {"name": "deliverables", "label": "Deliverables", "field": {"type": "array", "of": {"type": "string"}}},
          templates: []
      },
      siteContent: {
        name: "siteContent",
        label: "Site Content",
        path: "/site-content",
        fields: [
          {"name": "heroTagline", "label": "Hero Tagline", "field": {"type": "string"}},
          {"name": "heroSubtitle", "label": "Hero Subtitle", "field": {"type": "textarea"}},
          {"name": "aboutDescription", "label": "About Description", "field": {"type": "textarea"}},
          {"name": "pillar1Title", "label": "Pillar 1 Title", "field": {"type": "string"}},
          {"name": "pillar1Copy", "label": "Pillar 1 Copy", "field": {"type": "textarea"}},
          {"name": "pillar2Title", "label": "Pillar 2 Title", "field": {"type": "string"}},
          {"name": "pillar2Copy", "label": "Pillar 2 Copy", "field": {"type": "textarea"}},
          {"name": "pillar3Title", "label": "Pillar 3 Title", "field": {"type": "string"}},
          {"name": "pillar3Copy", "label": "Pillar 3 Copy", "field": {"type": "textarea"}},
          {"name": "finalCtaTitle", "label": "Final CTA Title", "field": {"type": "string"}},
          {"name": "finalCtaSubtitle", "label": "Final CTA Subtitle", "field": {"type": "textarea"}},
          {"name": "contactEmail", "label": "Contact Email", "field": {"type": "string"}},
          {"name": "contactWhatsApp", "label": "WhatsApp Number", "field": {"type": "string"}},
          {"name": "formEndpoint", "label": "Form Endpoint", "field": {"type": "string"}},
          templates: []
      }
    }
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  }
});
export {
  config_default as default
};