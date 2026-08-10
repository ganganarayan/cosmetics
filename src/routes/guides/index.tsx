import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { BackButton } from "@/components/back-button";
import { SITE_URL } from "@/lib/site";
import { breadcrumbLd, graph, orgLd } from "@/lib/seo";

const TITLE = "Guides: Converting Clinic Enquiries into Consultations | Divine Leads";
const DESC =
  "Straight answers on lead response time, follow-up, show-up rates and missed leads for cosmetic and aesthetic clinics — the mechanics behind booked consultations.";

const GUIDES = [
  {
    href: "/guides/why-leads-dont-book",
    title: "Why cosmetic clinic leads don't book consultations",
    blurb: "The real reasons interested enquiries never make it to the chair.",
  },
  {
    href: "/guides/lead-response-time",
    title: "How fast should a cosmetic clinic respond to a lead?",
    blurb: "What the first five minutes and first hour actually do to booking rates.",
  },
  {
    href: "/guides/how-many-follow-ups",
    title: "How many follow-ups should a cosmetic clinic make?",
    blurb: "Why most clinics stop at message two — and where the bookings actually are.",
  },
  {
    href: "/guides/why-leads-stop-responding",
    title: "Why aesthetic clinic leads stop responding",
    blurb: "What makes patients go quiet, and how to re-engage them without chasing them off.",
  },
  {
    href: "/guides/improve-show-up-rate",
    title: "How to improve cosmetic consultation show-up rate",
    blurb: "Turning booked consultations into patients who actually walk in.",
  },
  {
    href: "/guides/reduce-missed-leads",
    title: "How to reduce missed leads in aesthetic clinics",
    blurb: "Where enquiries quietly leak away, and how to close the gaps.",
  },
] as const;

export const Route = createFileRoute("/guides/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/guides` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          graph([
            orgLd(),
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: "/guides" },
            ]),
          ]),
        ),
      },
    ],
  }),
  component: GuidesIndex,
});

function GuidesIndex() {
  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-5 py-16 md:py-24">
        <BackButton className="mb-8" />
        <p className="eyebrow">Guides</p>
        <h1 className="mt-5 text-[2rem] text-ink md:text-[2.8rem]">
          The mechanics of turning enquiries into consultations.
        </h1>
        <p className="mt-6 max-w-2xl text-[1.05rem] text-muted-foreground">
          Plain answers to the questions clinic owners actually ask about response time, follow-up,
          show-up rates and missed leads.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {GUIDES.map((g) => (
            <a
              key={g.href}
              href={g.href}
              className="rounded-lg border border-line bg-card p-6 transition-colors hover:border-teal"
            >
              <p className="text-[1.05rem] text-ink">{g.title}</p>
              <p className="mt-2 text-[0.95rem] text-muted-foreground">{g.blurb}</p>
            </a>
          ))}
        </div>

        <p className="mt-12 text-[0.95rem] text-muted-foreground">
          Looking for your field?{" "}
          <a href="/specialties" className="text-teal underline underline-offset-4">
            See patient acquisition by specialty
          </a>
          .
        </p>
      </div>
    </PageShell>
  );
}
