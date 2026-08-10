import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/content-page";
import { SITE_URL } from "@/lib/site";
import { articleLd, breadcrumbLd, faqLd, graph, orgLd } from "@/lib/seo";

const PATH = "/guides/reduce-missed-leads";
const TITLE = "How to Reduce Missed Leads in Aesthetic Clinics | Divine Leads";
const DESC =
  "Missed leads hide in after-hours enquiries, scattered channels, slow replies and abandoned follow-up. Here's where enquiries leak away and how to close each gap.";

const FAQ = [
  {
    q: "Where do most missed leads come from?",
    a: "After-hours and weekend enquiries, messages split across channels no one owns, replies that arrive too late, and follow-up that stops after a message or two.",
  },
  {
    q: "How do we stop missing them?",
    a: "Capture every channel in one place, reply instantly and on-brand at any hour, follow up for the real length of the decision, and track every enquiry so none fall through.",
  },
] as const;

export const Route = createFileRoute("/guides/reduce-missed-leads")({
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
              { name: "Reduce missed leads", path: PATH },
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
      title="How to reduce missed leads in aesthetic clinics"
      intro="Short answer: find the leaks. Most missed leads aren't bad leads — they're enquiries that arrived after hours, on a channel nobody watches, or got one slow reply and no follow-up. Close those gaps and your existing marketing suddenly produces more consultations."
      related={[
        { href: "/guides/lead-response-time", label: "How fast should a clinic reply?" },
        { href: "/guides/improve-show-up-rate", label: "How to improve show-up rate" },
        { href: "/specialties/dermatology", label: "Dermatology patient acquisition" },
      ]}
    >
      <h2>Where enquiries leak away</h2>
      <ul>
        <li><strong>After-hours &amp; weekends</strong> — the busiest research windows go unanswered until Monday.</li>
        <li><strong>Scattered channels</strong> — web forms, WhatsApp, Instagram DMs and calls with no single owner.</li>
        <li><strong>Slow first replies</strong> — the patient has already engaged a competitor.</li>
        <li><strong>Abandoned follow-up</strong> — interested-but-not-ready patients never hear back.</li>
        <li><strong>No tracking</strong> — nobody can see which enquiries were dropped, or where.</li>
      </ul>

      <h2>How to close the gaps</h2>
      <ol>
        <li>Bring every channel into one place.</li>
        <li>Reply instantly and on-brand, 24/7.</li>
        <li>Follow up for the real length of the decision.</li>
        <li>Book into the calendar and remind, to protect show-up rate.</li>
        <li>Track every enquiry end to end, with attribution.</li>
      </ol>

      <p>
        That's the engine Divine Leads installs. See how it applies to your{" "}
        <a href="/specialties">specialty</a>, or start with the on-site diagnostic below.
      </p>
    </ContentPage>
  );
}
