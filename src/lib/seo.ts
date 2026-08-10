import { SITE_URL } from "./site";

// Canonical organization identity — one source of truth so every page's JSON-LD
// describes the same entity (helps search + AI assistants resolve "Divine Leads").
export const ORG = {
  name: "Divine Leads",
  url: SITE_URL,
  email: "connect@divineleads.guru",
  telephone: "+91 93568 19176",
  areaServed: "India",
  description: "The AI patient-engine for clinics — booked consultations on autopilot.",
} as const;

export function abs(path: string): string {
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}

export function orgLd() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#org`,
    name: ORG.name,
    url: ORG.url,
    email: ORG.email,
    telephone: ORG.telephone,
    description: ORG.description,
    areaServed: { "@type": "Country", name: ORG.areaServed },
  };
}

export function serviceLd(opts: { name: string; description: string; serviceType: string }) {
  return {
    "@type": "Service",
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    provider: { "@id": `${SITE_URL}/#org` },
    areaServed: { "@type": "Country", name: ORG.areaServed },
  };
}

export function faqLd(items: ReadonlyArray<{ q: string; a: string }>) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

export function articleLd(opts: { headline: string; description: string; path: string }) {
  return {
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    mainEntityOfPage: abs(opts.path),
    author: { "@id": `${SITE_URL}/#org` },
    publisher: { "@id": `${SITE_URL}/#org` },
  };
}

export function breadcrumbLd(items: ReadonlyArray<{ name: string; path: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function graph(nodes: ReadonlyArray<object>) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
