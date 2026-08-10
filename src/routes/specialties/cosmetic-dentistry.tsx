import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/content-page";
import { SITE_URL } from "@/lib/site";
import { articleLd, breadcrumbLd, faqLd, graph, orgLd, serviceLd } from "@/lib/seo";

const PATH = "/specialties/cosmetic-dentistry";
const TITLE = "Patient Acquisition for Cosmetic Dentistry Clinics | Divine Leads";
const DESC =
  "Smile makeovers, veneers and implants are high-value cases lost to whichever clinic replies first. Divine Leads installs instant response, follow-up and booking for cosmetic dentistry.";

const FAQ = [
  {
    q: "Most of our enquiries are price-shopping. Does this help?",
    a: "Price-shopping is often just an unanswered question. A fast, clear first reply that frames value — not just a number — keeps high-intent patients engaged instead of moving to the next clinic.",
  },
  {
    q: "Do you handle both quick treatments and big cases like full-mouth implants?",
    a: "Yes. Quick treatments get a fast path to booking; high-value cases get longer, considered follow-up matched to the decision.",
  },
  {
    q: "Is this compliant and private?",
    a: "We handle marketing and enquiry data only, kept in your systems. Communication is designed to be discreet.",
  },
] as const;

export const Route = createFileRoute("/specialties/cosmetic-dentistry")({
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
              name: "Patient acquisition for cosmetic dentistry clinics",
              serviceType: "Patient acquisition and marketing automation",
              description: DESC,
            }),
            faqLd(FAQ),
            articleLd({ headline: TITLE, description: DESC, path: PATH }),
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Specialties", path: "/specialties" },
              { name: "Cosmetic dentistry", path: PATH },
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
      eyebrow="Specialty · Cosmetic dentistry"
      title="Patient acquisition for cosmetic dentistry"
      intro="Veneers, aligners, smile makeovers and implants are high-value cases — and most are lost not on price, but on speed. The patient enquires with three clinics, and the one that answers first and clearly is usually the one that books the consultation."
      related={[
        { href: "/guides/lead-response-time", label: "How fast should a clinic reply to a lead?" },
        { href: "/guides/why-leads-dont-book", label: "Why cosmetic clinic leads don't book" },
        { href: "/specialties/aesthetic-clinics", label: "Patient acquisition for aesthetic clinics" },
      ]}
    >
      <h2>Where cosmetic dentistry loses patients</h2>
      <ul>
        <li>"What does it cost?" arrives and sits unanswered for hours; the patient books elsewhere.</li>
        <li>High-value cases (implants, full-mouth) get the same one-line reply as a cleaning enquiry.</li>
        <li>Follow-up stops after the first message, so considered cases never mature.</li>
        <li>Booked consultations aren't reminded, and chairs sit empty.</li>
      </ul>

      <h2>What we install</h2>
      <ul>
        <li><strong>Instant, value-framed replies</strong> to price and treatment questions, in your clinic's voice.</li>
        <li><strong>Two speeds of follow-up</strong> — fast for quick treatments, considered for big cases.</li>
        <li><strong>Booking &amp; reminders</strong> to protect show-up rates.</li>
        <li><strong>Attribution</strong> from enquiry to booked case.</li>
      </ul>

      <h2>Answer first, win the case</h2>
      <p>
        In cosmetic dentistry, being first with a clear answer is most of the battle — more on the mechanics in our
        guide to <a href="/guides/lead-response-time">lead response time</a>.
      </p>
    </ContentPage>
  );
}
