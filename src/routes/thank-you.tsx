import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

const TITLE = "Thank You | Divine Leads";
const DESC = "We have your details and will be in touch shortly.";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ThankYou,
});

function ThankYou() {
  return (
    <PageShell>
      <div className="mx-auto max-w-2xl px-5 py-24 md:py-32">
        <p className="eyebrow">Received</p>
        <h1 className="mt-5 text-[2rem] text-ink md:text-[2.8rem]">That&rsquo;s with us.</h1>
        <p className="mt-6 text-[1.02rem] text-muted-foreground">
          We reply within one working day, usually sooner. If it is urgent, message us on WhatsApp
          and we will answer faster.
        </p>
        <Link
          to="/"
          className="mt-9 inline-flex items-center justify-center rounded-sm border border-line px-6 py-3.5 text-[0.95rem] text-ink hover:border-teal"
        >
          Back to the homepage
        </Link>
      </div>
    </PageShell>
  );
}
