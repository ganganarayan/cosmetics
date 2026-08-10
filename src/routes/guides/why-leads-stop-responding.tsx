import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/content-page";
import { SITE_URL } from "@/lib/site";
import { articleLd, breadcrumbLd, faqLd, graph, orgLd } from "@/lib/seo";

const PATH = "/guides/why-leads-stop-responding";
const TITLE = "Why Aesthetic Clinic Leads Stop Responding | Divine Leads";
const DESC =
  "Leads go quiet because of slow replies, generic messaging, or follow-up that stopped too soon — not because they lost interest. Here's how to re-engage them.";

const FAQ = [
  {
    q: "Does going quiet mean the patient isn't interested?",
    a: "Usually not. Silence more often means the moment passed, the reply was slow or generic, or the follow-up stopped. Many quiet leads re-engage when contacted well.",
  },
  {
    q: "How do you re-engage a cold lead without being pushy?",
    a: "With timely, useful, on-brand messages that make it easy to pick the conversation back up — and an obvious way to opt out. Respectful persistence, not pressure.",
  },
] as const;

export const Route = createFileRoute("/guides/why-leads-stop-responding")({
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
              { name: "Why leads stop responding", path: PATH },
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
      title="Why aesthetic clinic leads stop responding"
      intro="Short answer: they rarely lost interest — the moment passed. A slow first reply, a message that sounded like a bot, or follow-up that stopped after day two leaves a genuinely interested patient drifting to another clinic."
      related={[
        { href: "/guides/how-many-follow-ups", label: "How many follow-ups should a clinic make?" },
        { href: "/guides/lead-response-time", label: "How fast should a clinic reply?" },
        { href: "/specialties/plastic-surgery", label: "Plastic & cosmetic surgery acquisition" },
      ]}
    >
      <h2>The usual causes</h2>
      <ul>
        <li><strong>The reply came too late</strong>, after the patient had already engaged elsewhere.</li>
        <li><strong>It felt automated</strong>, so trust dropped on a personal decision.</li>
        <li><strong>Follow-up stopped</strong> before the patient was ready to act.</li>
        <li><strong>The next step was unclear</strong> — no easy path to a booked consultation.</li>
      </ul>

      <h2>How to bring them back</h2>
      <p>
        Re-engagement works when it's timely, genuinely useful, and clearly from your clinic — with a frictionless
        way to book and an obvious way to opt out. Done well, a meaningful share of "cold" leads come back to life.
      </p>

      <h2>Prevention beats recovery</h2>
      <p>
        The cheapest quiet lead is the one you never created — by replying instantly and following up properly from
        the start. See <a href="/guides/why-leads-dont-book">why leads don't book</a> for the full picture.
      </p>
    </ContentPage>
  );
}
