import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/page-shell";
import { SITE_URL } from "@/lib/site";

const TITLE = "Privacy Policy | Divine Leads";
const DESC =
  "How Divine Leads collects, uses and protects information from clinics and website visitors, and how we handle enquiry data inside client systems.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/privacy` }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <LegalPage title="Privacy Policy" updated="Last updated: 7 August 2026">
      <section>
        <h2>Who we are</h2>
        <p>
          Divine Leads (&ldquo;we&rdquo;, &ldquo;us&rdquo;) operates divineleads.guru and provides
          marketing and marketing-automation services to healthcare clinics in India. We are a
          marketing services provider. We do not provide medical advice, treatment or patient care.
        </p>
      </section>

      <section>
        <h2>What we collect</h2>
        <ul>
          <li>
            <strong>Information you give us:</strong> name, clinic name, role, email address, phone
            or WhatsApp number, city, and the answers you submit in our scorecard or enquiry forms.
          </li>
          <li>
            <strong>Usage information:</strong> pages viewed, referring source, approximate location
            derived from IP address, device and browser type, and interactions such as calculator
            use or CTA clicks.
          </li>
          <li>
            <strong>Client operational data:</strong> where you engage us, we access the systems you
            authorise — ad accounts, CRM, messaging and calendar tools — in order to run your
            campaigns and automations.
          </li>
        </ul>
        <p>
          The on-page leak calculator runs entirely in your browser. Its inputs are held in page
          memory only and are not stored in local storage or session storage.
        </p>
      </section>

      <section>
        <h2>How we use information</h2>
        <ul>
          <li>To respond to your enquiry and prepare a diagnosis of your acquisition funnel.</li>
          <li>To deliver, operate and improve the services you have engaged us for.</li>
          <li>To measure marketing performance and improve this website.</li>
          <li>To meet legal, tax and accounting obligations.</li>
        </ul>
        <p>We do not sell your information, and we do not trade or rent contact lists.</p>
      </section>

      <section>
        <h2>Patient enquiry data</h2>
        <p>
          Where our automations touch enquiries from your patients, that data remains in your
          systems, under your control and your policies. We handle marketing contact data only. We
          do not collect, request or store clinical records, diagnoses or treatment notes.
          Communication templates are designed to be discreet by default.
        </p>
      </section>

      <section>
        <h2>Cookies and analytics</h2>
        <p>
          We use analytics and advertising measurement tools, which may include Google Analytics and
          the Meta pixel, to understand traffic and campaign performance. You can block cookies in
          your browser settings; core pages will continue to work.
        </p>
      </section>

      <section>
        <h2>Sharing and processors</h2>
        <p>
          We share information with service providers who help us operate — hosting, email, CRM,
          messaging, analytics and payment providers — under contract and only as needed. We may
          also disclose information where required by law.
        </p>
      </section>

      <section>
        <h2>Retention and security</h2>
        <p>
          We keep enquiry and client records for as long as needed for the engagement and for any
          legal or accounting period that follows. Access is limited to team members who need it,
          and credentials to client systems are held in access-controlled tooling.
        </p>
      </section>

      <section>
        <h2>Your rights</h2>
        <p>
          You can ask us for a copy of the information we hold about you, ask us to correct it, or
          ask us to delete it. Email{" "}
          <a href="mailto:connect@divineleads.guru">connect@divineleads.guru</a> and we will respond
          within thirty days. You can unsubscribe from our emails using the link in any message.
        </p>
      </section>

      <section>
        <h2>Changes</h2>
        <p>
          If we change this policy we will update the date at the top of this page. Material changes
          affecting active clients will also be notified by email.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions about privacy:{" "}
          <a href="mailto:connect@divineleads.guru">connect@divineleads.guru</a>
        </p>
      </section>
    </LegalPage>
  );
}
