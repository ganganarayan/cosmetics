import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/content-page";
import { SITE_URL } from "@/lib/site";
import { articleLd, breadcrumbLd, faqLd, graph, orgLd } from "@/lib/seo";

const PATH = "/guides/lead-response-time";
const TITLE = "How Fast Should a Cosmetic Clinic Respond to a Lead? | Divine Leads";
const DESC =
  "Within minutes, ideally instantly. Booking rates drop sharply after the first five minutes and again after the first hour. Here's why speed decides who wins the patient.";

const FAQ = [
  {
    q: "What is a good response time for a clinic enquiry?",
    a: "As close to instant as possible — within minutes, at any hour. Because patients contact several clinics at once, the first credible responder usually anchors the decision.",
  },
  {
    q: "What about enquiries that arrive at night or on weekends?",
    a: "Those are often the most valuable, because that's when patients research. An automated, on-brand instant reply keeps them engaged until your team is available.",
  },
] as const;

export const Route = createFileRoute("/guides/lead-response-time")({
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
            faqLd(FAQ),
            articleLd({ headline: TITLE, description: DESC, path: PATH }),
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: "/guides" },
              { name: "Lead response time", path: PATH },
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
      eyebrow="Guide"
      title="How fast should a cosmetic clinic respond to a lead?"
      intro="Short answer: within minutes — ideally instantly, at any hour. Booking rates fall by more than half after the first five minutes and by roughly eighty percent after the first hour, because patients are enquiring with several clinics simultaneously."
      related={[
        { href: "/guides/why-leads-dont-book", label: "Why leads don't book consultations" },
        { href: "/guides/reduce-missed-leads", label: "How to reduce missed leads" },
        { href: "/specialties/hair-transplant", label: "Hair transplant patient acquisition" },
      ]}
    >
      <h2>Why the first minutes matter so much</h2>
      <p>
        A cosmetic enquiry is a moment of high intent that fades fast. The patient is comparing options right now.
        A reply that arrives the next morning lands after they've already started a conversation with a competitor.
      </p>

      <h2>The realistic bar</h2>
      <ul>
        <li><strong>Instant</strong> first acknowledgement, 24/7 — even a great human team can't beat this after hours.</li>
        <li><strong>Human, on-brand</strong> tone — speed only helps if the message sounds like your clinic.</li>
        <li><strong>A clear next step</strong> — answer the question and move toward booking, don't just say "we'll call you".</li>
      </ul>

      <h2>How to actually hit it</h2>
      <p>
        You can't roster staff to reply instantly at 1 a.m., so the first response has to be automated and
        on-brand, then escalate to a human at the right moment. That's the core of what Divine Leads installs —
        and it pairs with <a href="/guides/how-many-follow-ups">sustained follow-up</a> to convert the patients
        who don't decide on day one.
      </p>
    </ContentPage>
  );
}
