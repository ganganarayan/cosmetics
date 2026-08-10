// Lightweight analytics helper. Wired to placeholder Meta Pixel + GA4 calls.
// Pixel / measurement IDs come from env vars — never hardcoded.

type Props = Record<string, string | number | boolean | undefined>;

const PIXEL_ID = import.meta.env["VITE_META_PIXEL_ID"] as string | undefined;
const GA4_ID = import.meta.env["VITE_GA4_MEASUREMENT_ID"] as string | undefined;

export type TrackedEvent =
  | "calculator_used"
  | "scorecard_cta_click"
  | "book_cta_click"
  | "faq_open";

export function track(event: TrackedEvent, props: Props = {}) {
  if (typeof window === "undefined") return;

  const w = window as unknown as {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  };

  if (PIXEL_ID && typeof w.fbq === "function") {
    w.fbq("trackCustom", event, props);
  }
  if (GA4_ID && typeof w.gtag === "function") {
    w.gtag("event", event, props);
  }

  if (import.meta.env.DEV) {
    console.info("[track]", event, props);
  }
}
