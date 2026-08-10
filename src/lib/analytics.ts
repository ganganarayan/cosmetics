// Lightweight analytics helper. Fires Meta Pixel + GA4 events when those
// scripts are present (injected from runtime settings), and records a
// first-party CTA counter server-side.
import { trackCta } from "@/server/actions";

type Props = Record<string, string | number | boolean | undefined>;

export type TrackedEvent = "calculator_used" | "scorecard_cta_click" | "faq_open";

export function track(event: TrackedEvent, props: Props = {}) {
  if (typeof window === "undefined") return;

  const w = window as unknown as {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  };

  if (typeof w.fbq === "function") {
    w.fbq("trackCustom", event, props);
  }
  if (typeof w.gtag === "function") {
    w.gtag("event", event, props);
  }

  if (event === "scorecard_cta_click") {
    const location = typeof props["location"] === "string" ? props["location"] : event;
    void trackCta({ data: { location } }).catch(() => {});
  }

  if (import.meta.env.DEV) {
    console.info("[track]", event, props);
  }
}
