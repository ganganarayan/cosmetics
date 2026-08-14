import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/page-shell";
import { SITE_URL } from "@/lib/site";

const TITLE = "Terms of Service | Divine Leads";
const DESC =
  "The terms governing Divine Leads engagements: scope, fees, ad spend, client responsibilities, what we do and do not guarantee, and termination.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/terms` }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <LegalPage title="Terms of Service" updated="Last updated: 7 August 2026">
      <section>
        <h2>1. Agreement</h2>
        <p>
          These terms govern your use of divineleads.guru and any services you engage Divine Leads
          to provide. Where we sign a separate proposal or service agreement with you, that document
          takes precedence on anything it addresses specifically.
        </p>
      </section>

      <section>
        <h2>2. What we provide</h2>
        <p>
          Divine Leads is a marketing services provider. Engagements typically include campaign
          management, enquiry response and follow-up automation, qualification flows, booking and
          reminder systems, content production and attribution reporting. We are not a medical
          provider and nothing we supply is medical advice.
        </p>
      </section>

      <section>
        <h2>3. Fees and ad spend</h2>
        <ul>
          <li>Setup and installation: included — no separate setup fee.</li>
          <li>Monthly retainer: ₹1,00,000.</li>
          <li>
            Ad spend is billed to you directly by the ad platforms and is never part of our fee — we
            neither pay it nor recover it. You keep your ad account funded (top up if prepaid, or
            maintain auto-debit if postpaid); we monitor spend and alert you, but keeping the
            account funded is your responsibility.
          </li>
        </ul>
        <p>
          Retainers are billed monthly in advance. Applicable Indian taxes are added to invoices.
          Invoices are due within seven days; we may pause work on overdue accounts.
        </p>
      </section>

      <section>
        <h2>4. Your responsibilities</h2>
        <ul>
          <li>Provide timely access to ad accounts, CRM, messaging tools and calendars.</li>
          <li>Give feedback and approvals within a reasonable time.</li>
          <li>
            Ensure claims about your services, credentials and pricing are accurate and compliant
            with applicable advertising and healthcare rules.
          </li>
          <li>Staff your side of the process so booked consultations are honoured.</li>
        </ul>
      </section>

      <section>
        <h2>5. What we guarantee — and what we do not</h2>
        <p>
          We commit to response time, follow-up persistence and a working booking flow. We do not
          guarantee a number of patients, a revenue figure, a cost per booking or any specific
          business outcome, and we make no income claims. Figures shown by the on-site calculator
          are illustrative estimates derived from your own inputs.
        </p>
      </section>

      <section>
        <h2>6. Term and termination</h2>
        <p>
          Engagements run month to month after installation, with a minimum initial commitment as
          set out in your proposal. Either party may end the engagement with thirty days&rsquo;
          written notice. Fees for work performed and the notice period remain payable. On
          termination we hand over the assets built inside accounts you own.
        </p>
      </section>

      <section>
        <h2>7. Intellectual property and confidentiality</h2>
        <p>
          You own your brand assets and the campaign assets produced for you. We retain ownership of
          our underlying frameworks, templates and tooling. Both parties keep the other&rsquo;s
          non-public information confidential.
        </p>
      </section>

      <section>
        <h2>8. Liability</h2>
        <p>
          To the extent permitted by law, our total liability arising from an engagement is limited
          to the fees you paid us in the three months before the claim. We are not liable for
          indirect or consequential losses, including lost profits or platform account actions
          outside our control.
        </p>
      </section>

      <section>
        <h2>9. Governing law</h2>
        <p>
          These terms are governed by the laws of India, and the courts of India have exclusive
          jurisdiction over any dispute.
        </p>
      </section>

      <section>
        <h2>10. Contact</h2>
        <p>
          <a href="mailto:connect@divineleads.guru">connect@divineleads.guru</a>
        </p>
      </section>
    </LegalPage>
  );
}
