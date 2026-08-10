import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { SITE_URL } from "@/lib/site";
import { Hero } from "@/components/landing/hero";
import { LeakCalculator } from "@/components/landing/leak-calculator";
import { Timeline, AgencyObjection } from "@/components/landing/timeline";
import { Engine } from "@/components/landing/engine";
import { WhoItsFor, HowItWorks, Investment } from "@/components/landing/sections";
import { Faq, FinalCta, OfferStatement } from "@/components/landing/faq";

const TITLE = "Patient Acquisition for Aesthetic & Elective Clinics | Divine Leads";
const DESC =
  "Clinics don't have a lead shortage — they lose patients in the gap between the enquiry and the chair. Divine Leads installs instant response, relentless follow-up and calendar booking.";

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Divine Leads",
      url: SITE_URL,
      description: "The AI patient-engine for clinics — booked consultations on autopilot.",
      email: "connect@divineleads.guru",
      telephone: "+91 93568 19176",
      areaServed: "IN",
    },
    {
      "@type": "Service",
      name: "AI patient acquisition and marketing automation for clinics",
      serviceType: "Patient acquisition and marketing automation for clinics",
      provider: { "@type": "Organization", name: "Divine Leads" },
      areaServed: { "@type": "Country", name: "India" },
      description:
        "Done-for-you patient acquisition: instant enquiry response, multi-week follow-up, qualification, calendar booking and auditable attribution.",
    },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(JSON_LD) }],
  }),
  component: Index,
});

function Index() {
  return (
    <PageShell>
      <Hero />
      <LeakCalculator />
      <OfferStatement />
      <Timeline />
      <AgencyObjection />
      <Engine />
      <WhoItsFor />
      <HowItWorks />
      <Investment />
      <Faq />
      <FinalCta />
    </PageShell>
  );
}
