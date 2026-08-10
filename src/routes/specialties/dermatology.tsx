import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/content-page";
import { SITE_URL } from "@/lib/site";
import { articleLd, breadcrumbLd, faqLd, graph, orgLd, serviceLd } from "@/lib/seo";

const PATH = "/specialties/dermatology";
const TITLE = "Patient Acquisition for Dermatology & Aesthetic Clinics | Divine Leads";
const DESC =
  "Dermatology clinics get high enquiry volume across many treatments. Divine Leads installs fast triage, response and follow-up so more enquiries turn into booked consultations.";

const FAQ = [
  {
    q: "We get a lot of enquiries across many treatments. Can this handle the volume and variety?",
    a: "Yes — every enquiry gets an instant reply, is routed by treatment and intent, and only qualified, ready patients reach your front desk. High volume is exactly where a fast, structured response pays off.",
  },
  {
    q: "Will it fit our range of treatments?",
    a: "The flows are built around your actual treatment menu and your clinic's voice, from acne and pigmentation to laser and injectables.",
  },
  {
    q: "Do you touch clinical records?",
    a: "No. We handle marketing and enquiry data only; patient records stay in your systems.",
  },
] as const;

export const Route = createFileRoute("/specialties/dermatology")({
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
              name: "Patient acquisition for dermatology and aesthetic clinics",
              serviceType: "Patient acquisition and marketing automation",
              description: DESC,
            }),
            faqLd(FAQ),
            articleLd({ headline: TITLE, description: DESC, path: PATH }),
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Specialties", path: "/specialties" },
              { name: "Dermatology", path: PATH },
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
      eyebrow="Specialty · Dermatology & aesthetics"
      title="Patient acquisition for dermatology & aesthetic clinics"
      intro="Dermatology clinics rarely have a lead shortage — they have a triage problem. Enquiries arrive across dozens of treatments and channels, faster than a busy front desk can answer well, and the ones that don't get a quick, relevant reply drift to whichever clinic responded first."
      related={[
        { href: "/guides/reduce-missed-leads", label: "How to reduce missed leads in aesthetic clinics" },
        { href: "/guides/how-many-follow-ups", label: "How many times should a clinic follow up?" },
        { href: "/specialties/aesthetic-clinics", label: "Patient acquisition for aesthetic clinics" },
      ]}
    >
      <h2>Where dermatology clinics lose patients</h2>
      <ul>
        <li>Volume outpaces the front desk, so replies are slow or generic and interest fades.</li>
        <li>Enquiries aren't triaged by treatment or intent, so high-value cases get the same thin response as everything else.</li>
        <li>Recurring and package treatments never get re-engaged after the first visit.</li>
        <li>After-hours and weekend enquiries wait until Monday.</li>
      </ul>

      <h2>What we install</h2>
      <ul>
        <li><strong>Instant, treatment-aware replies</strong> across every channel, in your clinic's voice.</li>
        <li><strong>Routing &amp; qualification</strong> so only ready patients reach your team.</li>
        <li><strong>Structured follow-up</strong> for high-consideration and package treatments.</li>
        <li><strong>Booking, reminders and attribution</strong> tied to your calendar and campaigns.</li>
      </ul>

      <h2>Speed and triage together</h2>
      <p>
        In high-volume dermatology, response speed only helps if the reply is relevant. We pair the two — see{" "}
        <a href="/guides/reduce-missed-leads">how missed leads add up</a> — so a bigger enquiry pipeline actually
        turns into more booked, showed-up consultations.
      </p>
    </ContentPage>
  );
}
