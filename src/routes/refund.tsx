import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/page-shell";
import { SITE_URL } from "@/lib/site";

const TITLE = "Refund & Cancellation Policy | Divine Leads";
const DESC =
  "How cancellations, refunds and billing disputes work for Divine Leads setup fees, monthly retainers and ad spend.";

export const Route = createFileRoute("/refund")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/refund` }],
  }),
  component: Refund,
});

function Refund() {
  return (
    <LegalPage title="Refund & Cancellation Policy" updated="Last updated: 7 August 2026">
      <section>
        <p>
          We would rather be clear before you pay than argue after. Ad spend is billed to you
          directly by the ad platforms and is never part of our fee, so it is never refundable by
          us.
        </p>
      </section>

      <section>
        <h2>Setup and installation fee</h2>
        <ul>
          <li>
            If you cancel before installation work begins, the setup fee is refunded in full, less
            any third-party costs already incurred on your behalf.
          </li>
          <li>
            Once installation has begun, the setup fee is non-refundable, because the work is
            front-loaded and delivered early in the engagement.
          </li>
        </ul>
      </section>

      <section>
        <h2>Monthly retainer</h2>
        <ul>
          <li>Retainers are billed in advance for the coming month.</li>
          <li>
            A month already in progress is not refundable, as the team, campaigns and automations
            are committed for that period.
          </li>
          <li>
            Cancel with thirty days&rsquo; written notice and you will not be billed for any month
            beyond the notice period.
          </li>
        </ul>
      </section>

      <section>
        <h2>Ad spend</h2>
        <p>
          Ad spend sits in your own ad accounts and is charged by Meta, Google or the relevant
          platform. Refunds for ad spend are governed by those platforms&rsquo; policies, not ours.
          We never absorb or mark up ad spend.
        </p>
      </section>

      <section>
        <h2>Trials</h2>
        <p>
          We do not offer trial months. A single month front-loads the setup work and produces a
          poor result, which serves neither side.
        </p>
      </section>

      <section>
        <h2>If we get something wrong</h2>
        <p>
          If we fail to deliver a component we committed to in your proposal, tell us and we will
          either fix it or credit the affected portion of that month&rsquo;s retainer. We do not
          issue refunds on the basis of patient volume, revenue or any other outcome we never
          promised.
        </p>
      </section>

      <section>
        <h2>How to request a refund or cancel</h2>
        <p>
          Email <a href="mailto:connect@divineleads.guru">connect@divineleads.guru</a> from the
          address on your account with your clinic name and invoice reference. We acknowledge within
          two working days and resolve approved refunds within seven to ten working days, credited
          to the original payment method.
        </p>
      </section>
    </LegalPage>
  );
}
