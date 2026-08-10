import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/content-page";
import { SITE_URL } from "@/lib/site";
import { articleLd, breadcrumbLd, faqLd, graph, orgLd, serviceLd } from "@/lib/seo";

const PATH = "/specialties/aesthetic-clinics";
const TITLE = "Patient Acquisition for Aesthetic Clinics | Divine Leads";
const DESC =
  "Injectables, laser and skin treatments run on fast, human replies and repeat visits. Divine Leads installs instant response, follow-up and rebooking for aesthetic clinics.";

const FAQ = [
  {
    q: "A lot of our revenue is repeat treatments. Does this help retention too?",
    a: "Yes. Beyond first bookings, the same follow-up engine re-engages patients for repeat and top-up treatments at the right intervals, in your clinic's voice.",
  },
  {
    q: "Our patients want to feel it's the clinic replying, not a bot.",
    a: "Every message is written to sound like your clinic and escalates to a human at the right moment. Patients want speed — they just want it to feel personal.",
  },
  {
    q: "Can we start small?",
    a: "Setup is front-loaded and built to last, so we don't do single-month trials. If you're not ready for a proper install, take the on-site diagnostic and act on it yourself.",
  },
] as const;

export const Route = createFileRoute("/specialties/aesthetic-clinics")({
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
            serviceLd({
              name: "Patient acquisition for aesthetic clinics",
              serviceType: "Patient acquisition and marketing automation",
              description: DESC,
            }),
            faqLd(FAQ),
            articleLd({ headline: TITLE, description: DESC, path: PATH }),
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Specialties", path: "/specialties" },
              { name: "Aesthetic clinics", path: PATH },
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
      eyebrow="Specialty · Aesthetic clinics"
      title="Patient acquisition for aesthetic clinics"
      intro="Injectables, laser, and skin treatments are a fast-moving, relationship-driven business. Patients expect a quick, human reply, and much of the revenue is in repeat visits — so the clinics that respond fastest and re-engage well quietly outgrow the ones that don't."
      related={[
        { href: "/guides/how-many-follow-ups", label: "How many times should a clinic follow up?" },
        { href: "/guides/improve-show-up-rate", label: "How to improve consultation show-up rate" },
        { href: "/specialties/dermatology", label: "Patient acquisition for dermatology clinics" },
      ]}
    >
      <h2>Where aesthetic clinics lose patients</h2>
      <ul>
        <li>Fast-moving enquiries wait too long and go to whichever clinic replied first.</li>
        <li>Replies feel automated, so patients hesitate on a personal, appearance-related decision.</li>
        <li>First-time patients are never re-engaged for repeat or top-up treatments.</li>
        <li>No-shows erode a schedule built on volume.</li>
      </ul>

      <h2>What we install</h2>
      <ul>
        <li><strong>Instant, personal-sounding replies</strong> across your channels.</li>
        <li><strong>Follow-up and rebooking</strong> timed to treatment cycles.</li>
        <li><strong>Booking &amp; reminders</strong> to protect show-up rates.</li>
        <li><strong>Attribution</strong> so spend follows what actually books.</li>
      </ul>

      <h2>Fast, human, repeatable</h2>
      <p>
        The advantage compounds: faster first replies win more first visits, and steady follow-up turns those into
        repeat treatments. See our guide on <a href="/guides/how-many-follow-ups">how many follow-ups it takes</a>.
      </p>
    </ContentPage>
  );
}
