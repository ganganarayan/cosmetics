import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { SITE_URL } from "@/lib/site";
import { useSiteConfig } from "@/components/site-config";

const TITLE = "Contact Divine Leads | Patient Acquisition for Clinics";
const DESC =
  "Email or WhatsApp Divine Leads about patient acquisition for your clinic. We reply within one working day, usually sooner.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/contact` }],
  }),
  component: Contact,
});

function Contact() {
  const { settings } = useSiteConfig();
  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-5 text-[2rem] text-ink md:text-[2.8rem]">Talk to us directly.</h1>
        <p className="mt-6 max-w-xl text-[1.02rem] text-muted-foreground">
          Send your clinic name, city and rough monthly enquiry volume. We reply within one working
          day, usually sooner. If you would rather see the arithmetic first, the scorecard needs no
          call at all.
        </p>

        <dl className="mt-12 grid gap-px border border-line bg-line md:grid-cols-2">
          <div className="bg-card p-6">
            <dt className="eyebrow">Email</dt>
            <dd className="mt-3">
              <a
                href={`mailto:${settings.contactEmail}`}
                className="text-[1rem] text-ink hover:text-teal"
              >
                {settings.contactEmail}
              </a>
            </dd>
          </div>
          <div className="bg-card p-6">
            <dt className="eyebrow">WhatsApp</dt>
            <dd className="mt-3">
              <a
                href={`https://wa.me/${settings.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[1rem] text-ink hover:text-teal"
              >
                Message us
              </a>
            </dd>
          </div>
          <div className="bg-card p-6">
            <dt className="eyebrow">Hours</dt>
            <dd className="numeral mt-3 text-[0.95rem] text-muted-foreground">
              Mon–Sat, 10:00–19:00 IST
            </dd>
          </div>
          <div className="bg-card p-6">
            <dt className="eyebrow">Service area</dt>
            <dd className="mt-3 text-[0.95rem] text-muted-foreground">
              Clinics across India. Delivered remotely.
            </dd>
          </div>
        </dl>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <a
            href={settings.assessmentUrl}
            className="inline-flex items-center justify-center rounded-full bg-teal px-6 py-3.5 text-[0.95rem] font-medium text-primary-foreground transition-colors hover:bg-ink"
          >
            Get your leak number — 4 min, free
          </a>
        </div>

        <p className="mt-12 border-t border-line pt-6 text-[0.85rem] text-muted-foreground">
          Divine Leads is a marketing services provider. We do not provide medical advice, treatment,
          or patient care.
        </p>
      </div>
    </PageShell>
  );
}
