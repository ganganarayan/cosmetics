import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/page-shell";
import { SITE_URL } from "@/lib/site";

const TITLE = "Delivery of Services & Shipping Policy | Divine Leads";
const DESC =
  "Divine Leads delivers digital services only. Installation timelines, how work is handed over, and why nothing is physically shipped.";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/shipping` }],
  }),
  component: Shipping,
});

function Shipping() {
  return (
    <LegalPage title="Delivery of Services & Shipping Policy" updated="Last updated: 7 August 2026">
      <section>
        <h2>No physical goods</h2>
        <p>
          Divine Leads sells services, not products. There is nothing to ship, no courier, no
          tracking number and no shipping charge. This page exists because payment providers require
          a delivery policy.
        </p>
      </section>

      <section>
        <h2>How delivery works</h2>
        <ul>
          <li>
            <strong>Scorecard and diagnosis:</strong> delivered instantly on screen, and by email if
            you ask for a copy.
          </li>
          <li>
            <strong>Installation:</strong> begins within three working days of the setup fee
            clearing and is normally complete in ten to fourteen working days.
          </li>
          <li>
            <strong>Ongoing service:</strong> campaigns, response and follow-up automation, booking
            and reporting run continuously for each billed month, with a monthly performance review.
          </li>
        </ul>
      </section>

      <section>
        <h2>Where work is delivered</h2>
        <p>
          Everything is built inside accounts and tools you own — your ad accounts, CRM, messaging
          platforms and calendars — so access is immediate and remains yours if the engagement ends.
          Reports and documents are delivered by email or a shared link.
        </p>
      </section>

      <section>
        <h2>Delays</h2>
        <p>
          Installation timelines assume timely access to your accounts and reasonably prompt
          approvals. Where access or approvals are pending, the timeline extends by the same period.
          We will tell you when that happens rather than let a date pass quietly.
        </p>
      </section>

      <section>
        <h2>Service area</h2>
        <p>
          We work with clinics across India and deliver entirely remotely. On-site visits are not
          part of standard engagements.
        </p>
      </section>

      <section>
        <h2>Questions</h2>
        <p>
          <a href="mailto:connect@divineleads.guru">connect@divineleads.guru</a>
        </p>
      </section>
    </LegalPage>
  );
}
