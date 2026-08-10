// Single source of truth for site-wide constants.

// Production origin (no trailing slash). Used for canonical URLs and JSON-LD.
export const SITE_URL = "https://cosmetic.divineleads.guru";

// The one destination every CTA points to: the Assess360 assessment opt-in form.
// Set VITE_ASSESSMENT_URL in the environment (e.g. Railway) to the live link.
// Until it is set, CTAs fall back to "#" (no navigation) rather than a broken URL.
export const ASSESSMENT_URL =
  (import.meta.env["VITE_ASSESSMENT_URL"] as string | undefined) ?? "#";
