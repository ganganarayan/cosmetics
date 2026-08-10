import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/content-page";
import { SITE_URL } from "@/lib/site";
import { articleLd, breadcrumbLd, faqLd, graph, orgLd } from "@/lib/seo";

const PATH = "/guides/why-leads-dont-book";
const TITLE = "Why Cosmetic Clinic Leads Don't Book Consultations | Divine Leads";
const DESC =
  "Most cosmetic clinic leads don't fail on price — they fail on speed and follow-up. Here's why interested enquiries never reach the chair, and how to fix it.";

const FAQ = [
  {
    q: "Is it usually a price problem?",
    a: "Rarely. Price objections are often just unanswered questions. Most lost leads were interested but never got a fast, clear, sustained response.",
  },
  {
    q: "How much difference does response speed make?",
    a: "A large one. Booking rates fall sharply within the first few minutes and continue dropping over the first hour, because patients are contacting several clinics at once.",
  },
] as const;

export const Route = createFileRoute("/guides/why-leads-dont-book")({
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
              { name: "Why leads don't book", path: PATH },
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
      title="Why cosmetic clinic leads don't book consultations"
      intro="Short answer: most clinics don't have a lead shortage — they lose interested patients in the gap between the enquiry and the chair. The lead was real; the response was slow, generic, or stopped too soon."
      related={[
        { href: "/guides/lead-response-time", label: "How fast should a clinic reply to a lead?" },
        { href: "/guides/how-many-follow-ups", label: "How many follow-ups should a clinic make?" },
        { href: "/guides/improve-show-up-rate", label: "How to improve show-up rate" },
      ]}
    >
      <h2>The four common reasons</h2>
      <h3>1. The first reply is too slow</h3>
      <p>
        Patients enquire with several clinics at once, often after hours. Booking rates fall fast in the first few
        minutes and keep falling over the first hour. Whoever replies first, credibly, usually wins.
      </p>
      <h3>2. Follow-up stops at message two</h3>
      <p>
        A cosmetic decision takes days or weeks. Most clinics send one or two messages and give up, so the patient
        who was going to book — later — never hears from them again.
      </p>
      <h3>3. The reply doesn't sound like the clinic</h3>
      <p>
        Generic, obviously automated replies erode trust on a personal decision. Speed matters, but it has to sound
        human and on-brand.
      </p>
      <h3>4. Booked consultations aren't protected</h3>
      <p>
        Even booked patients don't always show up without reminders — so the calendar looks full while the waiting
        room doesn't.
      </p>

      <h2>What actually fixes it</h2>
      <p>
        Own the first ninety minutes with an instant, on-brand reply; follow up for weeks, not messages; qualify;
        book into the calendar; and remind. That's the engine — the rest of this site walks through it by{" "}
        <a href="/specialties">specialty</a>.
      </p>
    </ContentPage>
  );
}
