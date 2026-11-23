import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01", // Today's UTC date; keep it hard-coded for consistency
  useCdn: true, // Set to false if using `apiVersion: "preview"` or tag-based purge API
});