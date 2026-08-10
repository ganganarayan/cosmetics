// Single source of truth for build-time site constants.
// Runtime-editable values (assessment URL, analytics IDs, contact details) now
// come from settings via useSiteConfig() — see src/components/site-config.tsx.

// Production origin (no trailing slash). Used for canonical URLs and JSON-LD.
export const SITE_URL = "https://cosmetic.divineleads.guru";
