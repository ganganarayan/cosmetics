import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/content-page";
import { SITE_URL } from "@/lib/site";
import { articleLd, breadcrumbLd, faqLd, graph, orgLd } from "@/lib/seo";

const PATH = "/guides/improve-show-up-rate";
const TITLE = "How to Improve Cosmetic Consultation Show-Up Rate | Divine Leads";
const DESC =
  "Booked isn't the same as showed-up. Confirmations, well-timed reminders and easy rescheduling turn more booked consultations into patients who actually walk in.";

const FAQ = [
  {
    q: "Why do booked consultations still no-show?",
    a: "Time passes between booking and the appointment, plans change, and nerves set in. Without confirmations and reminders, a booked slot is only a hope.",
  },
  {
    q: "What actually lifts show-up rate?",
    a: "Immediate confirmation, well-timed reminders across the channel the patient uses, easy rescheduling instead of silent cancellation, and a human touch for high-value cases.",
  },
] as const;

export const Route = createFileRoute("/guides/improve-show-up-rate")({
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
              { name: "Improve show-up rate", path: PATH },
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
      title="How to improve cosmetic consultation show-up rate"
      intro="Short answer: treat the gap between booking and appointment as its own job. A booked consultation is only potential revenue — confirmations, reminders and easy rescheduling are what turn it into a patient in the chair."
      related={[
        { href: "/guides/reduce-missed-leads", label: "How to reduce missed leads" },
        { href: "/guides/how-many-follow-ups", label: "How many follow-ups should a clinic make?" },
        { href: "/specialties/plastic-surgery", label: "Plastic & cosmetic surgery acquisition" },
      ]}
    >
      <h2>Why show-up rate slips</h2>
      <p>
        Between booking and the appointment, life happens: plans shift, nerves build, and a distant slot feels
        skippable. Silence from the clinic makes it easier to quietly not turn up.
      </p>

      <h2>What lifts it</h2>
      <ul>
        <li><strong>Immediate confirmation</strong> the moment a consultation is booked.</li>
        <li><strong>Well-timed reminders</strong> on the channel the patient actually uses.</li>
        <li><strong>Frictionless rescheduling</strong> — a moved appointment beats a no-show.</li>
        <li><strong>A human touch</strong> for high-value cases, so the patient feels expected.</li>
      </ul>

      <h2>It's part of the same engine</h2>
      <p>
        Reminders and rescheduling run on the same follow-up system that books the consultation in the first place,
        which is why response, follow-up and show-up are best solved together. More on the leaks in{" "}
        <a href="/guides/reduce-missed-leads">reducing missed leads</a>.
      </p>
    </ContentPage>
  );
}
