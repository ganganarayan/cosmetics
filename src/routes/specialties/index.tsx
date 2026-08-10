import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { BackButton } from "@/components/back-button";
import { SITE_URL } from "@/lib/site";
import { breadcrumbLd, graph, orgLd } from "@/lib/seo";

const TITLE = "Patient Acquisition by Specialty | Divine Leads";
const DESC =
  "How Divine Leads installs patient acquisition for hair transplant, dermatology, plastic surgery, cosmetic dentistry and aesthetic clinics across India.";

const SPECIALTIES = [
  {
    href: "/specialties/hair-transplant",
    title: "Hair transplant clinics",
    blurb: "High-value, high-consideration procedures where slow follow-up quietly loses cases.",
  },
  {
    href: "/specialties/dermatology",
    title: "Dermatology & aesthetic clinics",
    blurb: "High enquiry volume across many treatments — the leak is in triage and speed.",
  },
  {
    href: "/specialties/plastic-surgery",
    title: "Plastic & cosmetic surgery",
    blurb: "Long decision cycles that need discreet, persistent follow-up to reach the chair.",
  },
  {
    href: "/specialties/cosmetic-dentistry",
    title: "Cosmetic dentistry",
    blurb: "Smile makeovers and implants lost to clinics that simply reply first.",
  },
  {
    href: "/specialties/aesthetic-clinics",
    title: "Aesthetic clinics",
    blurb: "Injectables, laser and skin — recurring revenue that hinges on fast, human replies.",
  },
] as const;

export const Route = createFileRoute("/specialties/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/specialties` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          graph([
            orgLd(),
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Specialties", path: "/specialties" },
            ]),
          ]),
        ),
      },
    ],
  }),
  component: SpecialtiesIndex,
});

function SpecialtiesIndex() {
  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-5 py-16 md:py-24">
        <BackButton className="mb-8" />
        <p className="eyebrow">Specialties</p>
        <h1 className="mt-5 text-[2rem] text-ink md:text-[2.8rem]">
          Patient acquisition, tuned to your specialty.
        </h1>
        <p className="mt-6 max-w-2xl text-[1.05rem] text-muted-foreground">
          The gap between an enquiry and a booked consultation looks different in each field. Here is
          how the engine applies to yours.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {SPECIALTIES.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="rounded-lg border border-line bg-card p-6 transition-colors hover:border-teal"
            >
              <p className="text-[1.1rem] text-ink">{s.title}</p>
              <p className="mt-2 text-[0.95rem] text-muted-foreground">{s.blurb}</p>
            </a>
          ))}
        </div>

        <p className="mt-12 text-[0.95rem] text-muted-foreground">
          Prefer to start with the mechanics?{" "}
          <a href="/guides" className="text-teal underline underline-offset-4">
            Read the guides
          </a>{" "}
          on response time, follow-up and show-up rate.
        </p>
      </div>
    </PageShell>
  );
}
