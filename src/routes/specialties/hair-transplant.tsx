import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/content-page";
import { SITE_URL } from "@/lib/site";
import { articleLd, breadcrumbLd, faqLd, graph, orgLd, serviceLd } from "@/lib/seo";

const PATH = "/specialties/hair-transplant";
const TITLE = "Patient Acquisition for Hair Transplant Clinics | Divine Leads";
const DESC =
  "Hair transplant is a high-value, months-long decision. Divine Leads installs instant response and weeks of follow-up so enquiries become booked, showed-up consultations.";

const FAQ = [
  {
    q: "Do you sell hair transplant leads?",
    a: "No. We install the system that converts the enquiries your own marketing already generates — instant response, sustained follow-up, qualification and booking.",
  },
  {
    q: "Patients ask about graft count and price immediately. Can automation handle that?",
    a: "The first reply captures the question and gives a clear, on-brand answer or range, then hands to a human at the right moment. It is written in your clinic's voice, not a generic bot.",
  },
  {
    q: "How long does the follow-up run?",
    a: "A hair transplant is rarely booked on day one. Follow-up continues for weeks, because that is how long the decision actually takes.",
  },
] as const;

export const Route = createFileRoute("/specialties/hair-transplant")({
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
              name: "Patient acquisition for hair transplant clinics",
              serviceType: "Patient acquisition and marketing automation",
              description: DESC,
            }),
            faqLd(FAQ),
            articleLd({ headline: TITLE, description: DESC, path: PATH }),
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Specialties", path: "/specialties" },
              { name: "Hair transplant", path: PATH },
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
      eyebrow="Specialty · Hair transplant"
      title="Patient acquisition for hair transplant clinics"
      intro="A hair transplant is a high-value, high-consideration decision that patients research for weeks — usually across several clinics at once, and often late at night. The clinic that replies first, answers clearly, and keeps the conversation alive is the one that ends up doing the procedure."
      related={[
        { href: "/guides/lead-response-time", label: "How fast should a clinic reply to a lead?" },
        { href: "/guides/why-leads-dont-book", label: "Why cosmetic clinic leads don't book" },
        { href: "/specialties/plastic-surgery", label: "Patient acquisition for plastic & cosmetic surgery" },
      ]}
    >
      <h2>Where hair transplant clinics lose patients</h2>
      <ul>
        <li>Enquiries land after hours, when most of the research happens — a reply the next morning is often too late.</li>
        <li>Patients compare three to five clinics simultaneously; the first credible responder anchors the decision.</li>
        <li>Graft-count, technique and price questions go unanswered, so an interested lead quietly cools.</li>
        <li>Consultations get booked but not reminded, and no-shows are written off as "not serious".</li>
      </ul>

      <h2>What we install</h2>
      <ul>
        <li><strong>Instant response, any hour</strong> — every enquiry gets a fast, on-brand first reply.</li>
        <li><strong>Weeks of follow-up</strong> — persistent, human-sounding, matched to a long decision.</li>
        <li><strong>Qualification</strong> — graft range, budget and timeline captured before the consult.</li>
        <li><strong>Booking &amp; reminders</strong> — straight into your calendar, with reminders that lift show-up rates.</li>
        <li><strong>Attribution</strong> — you see which campaigns actually produce booked chairs, not just clicks.</li>
      </ul>

      <h2>Why speed matters most here</h2>
      <p>
        Because patients are actively shortlisting, the cost of a slow first reply is higher than in almost any
        other specialty. Owning the first ninety minutes — then following up for weeks — is the difference between
        a full surgery calendar and a CRM full of leads that "went cold". More on that in our guide to{" "}
        <a href="/guides/lead-response-time">lead response time</a>.
      </p>
    </ContentPage>
  );
}
