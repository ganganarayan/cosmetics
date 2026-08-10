import { createFileRoute, Link } from "@tanstack/react-router";
import { adminGetAnalytics } from "@/server/actions";

export const Route = createFileRoute("/admin/_authed/")({
  loader: () => adminGetAnalytics(),
  component: Overview,
});

const CARDS = [
  { to: "/admin/settings", title: "Settings", desc: "Assessment link, analytics IDs, contact details." },
  { to: "/admin/content", title: "Content", desc: "Hero, offer, FAQ and final call-to-action copy." },
  { to: "/admin/leads", title: "Leads", desc: "Enquiries captured on the site." },
  { to: "/admin/analytics", title: "Analytics", desc: "First-party page-view and CTA counters." },
] as const;

function Overview() {
  const analytics = Route.useLoaderData();
  const totalViews = Object.values(analytics.pageViews).reduce((a, b) => a + b, 0);
  const totalCtas = Object.values(analytics.ctaClicks).reduce((a, b) => a + b, 0);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">Manage the Divine Leads site.</p>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-line bg-card p-5">
          <p className="text-xs text-muted-foreground uppercase">Page views</p>
          <p className="mt-1 text-2xl font-semibold">{totalViews}</p>
        </div>
        <div className="rounded-lg border border-line bg-card p-5">
          <p className="text-xs text-muted-foreground uppercase">CTA clicks</p>
          <p className="mt-1 text-2xl font-semibold">{totalCtas}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {CARDS.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="rounded-lg border border-line bg-card p-5 transition-colors hover:border-teal"
          >
            <p className="text-base font-medium text-ink">{c.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
