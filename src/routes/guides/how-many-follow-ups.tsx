import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/content-page";
import { SITE_URL } from "@/lib/site";
import { articleLd, breadcrumbLd, faqLd, graph, orgLd } from "@/lib/seo";

const PATH = "/guides/how-many-follow-ups";
const TITLE = "How Many Follow-Ups Should a Cosmetic Clinic Make? | Divine Leads";
const DESC =
  "More than most clinics do. Most stop at one or two messages; cosmetic decisions take weeks. Here's how to think about follow-up cadence without annoying patients.";

const FAQ = [
  {
    q: "How many times should we follow up with a lead?",
    a: "Enough to cover the real length of the decision — typically a sequence spread over weeks, not one or two messages. The exact cadence depends on the treatment's consideration time.",
  },
  {
    q: "Won't repeated follow-up annoy patients?",
    a: "Not if it's timely, useful and easy to opt out of. Patients dislike bad, generic follow-up — not helpful, well-timed messages that sound like the clinic.",
  },
] as const;

export const Route = createFileRoute("/guides/how-many-follow-ups")({
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
              { name: "How many follow-ups", path: PATH },
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
      title="How many follow-ups should a cosmetic clinic make?"
      intro="Short answer: more than almost every clinic actually does. Most stop after one or two messages, but a cosmetic decision usually plays out over weeks — so the bookings are sitting in the follow-ups nobody sends."
      related={[
        { href: "/guides/why-leads-stop-responding", label: "Why leads stop responding" },
        { href: "/guides/lead-response-time", label: "How fast should a clinic reply?" },
        { href: "/specialties/aesthetic-clinics", label: "Aesthetic clinic patient acquisition" },
      ]}
    >
      <h2>Why one or two messages isn't enough</h2>
      <p>
        The patient who ignores your first message isn't uninterested — they're busy, comparing, or not quite
        ready. If you stop, you only ever capture the small share who happen to be ready on day one.
      </p>

      <h2>How to think about cadence</h2>
      <ul>
        <li><strong>Match the decision length</strong> — quick treatments need a short sequence; surgery or transplants need weeks.</li>
        <li><strong>Vary the value</strong> — answer questions, address hesitations, make booking easy; don't just "check in".</li>
        <li><strong>Stay human and on-brand</strong>, and always make opting out effortless.</li>
        <li><strong>Escalate to a person</strong> the moment the patient re-engages.</li>
      </ul>

      <h2>The point isn't volume — it's persistence done well</h2>
      <p>
        Good follow-up feels like a helpful clinic, not a chasing salesperson. That's what turns a slow decision
        into a booked consultation. See also <a href="/guides/why-leads-dont-book">why leads don't book</a>.
      </p>
    </ContentPage>
  );
}
