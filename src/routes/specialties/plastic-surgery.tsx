import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/content-page";
import { SITE_URL } from "@/lib/site";
import { articleLd, breadcrumbLd, faqLd, graph, orgLd, serviceLd } from "@/lib/seo";

const PATH = "/specialties/plastic-surgery";
const TITLE = "Patient Acquisition for Plastic & Cosmetic Surgery Clinics | Divine Leads";
const DESC =
  "Cosmetic surgery is a long, private decision. Divine Leads installs discreet, persistent follow-up and booking so more consultations happen — without chasing patients away.";

const FAQ = [
  {
    q: "Cosmetic surgery decisions take months. Doesn't follow-up feel pushy?",
    a: "Good follow-up isn't pushy — it's timely and discreet. Cadence and tone are built to respect a private, considered decision, and every message escalates to a human when the patient is ready.",
  },
  {
    q: "Our patients value discretion above all. How is that handled?",
    a: "Discretion is the default. Communication is designed to be private, because discretion is exactly why patients hesitate to enquire in the first place.",
  },
  {
    q: "Do you guarantee a number of surgeries?",
    a: "No. We guarantee response time, follow-up persistence and a working booking flow — never a patient count, which nobody honest can promise.",
  },
] as const;

export const Route = createFileRoute("/specialties/plastic-surgery")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}${PATH}` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          graph([
            orgLd(),
            serviceLd({
              name: "Patient acquisition for plastic and cosmetic surgery clinics",
              serviceType: "Patient acquisition and marketing automation",
              description: DESC,
            }),
            faqLd(FAQ),
            articleLd({ headline: TITLE, description: DESC, path: PATH }),
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Specialties", path: "/specialties" },
              { name: "Plastic surgery", path: PATH },
            ]),
          ]),
        ),
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <ContentPage
      eyebrow="Specialty · Plastic & cosmetic surgery"
      title="Patient acquisition for plastic & cosmetic surgery"
      intro="Cosmetic surgery is one of the most considered, most private decisions a patient makes. The enquiry often comes months before the procedure — and the clinic that stays helpful and discreet across that long window, without ever feeling pushy, is the one that earns the consultation."
      related={[
        { href: "/guides/why-leads-stop-responding", label: "Why aesthetic clinic leads stop responding" },
        { href: "/guides/improve-show-up-rate", label: "How to improve consultation show-up rate" },
        { href: "/specialties/hair-transplant", label: "Patient acquisition for hair transplant clinics" },
      ]}
    >
      <h2>Where surgery clinics lose patients</h2>
      <ul>
        <li>The decision is long, but follow-up stops after a message or two, so the patient is gone by the time they're ready.</li>
        <li>Enquiries are handled without discretion, and privacy-sensitive patients quietly disengage.</li>
        <li>Consultations are booked but not nurtured, and show-up rates suffer.</li>
        <li>There's no clear view of which channels produce real surgical consultations.</li>
      </ul>

      <h2>What we install</h2>
      <ul>
        <li><strong>Discreet, persistent follow-up</strong> paced for a months-long decision.</li>
        <li><strong>Instant first response</strong> in your clinic's voice, escalating to a human at the right moment.</li>
        <li><strong>Consultation booking &amp; reminders</strong> that protect show-up rates.</li>
        <li><strong>Attribution</strong> from enquiry to booked consultation.</li>
      </ul>

      <h2>Persistence without pressure</h2>
      <p>
        The art here is staying present without chasing patients off. Our cadence is built for exactly that —
        see <a href="/guides/why-leads-stop-responding">why leads stop responding</a> and how to re-engage them
        respectfully.
      </p>
    </ContentPage>
  );
}
