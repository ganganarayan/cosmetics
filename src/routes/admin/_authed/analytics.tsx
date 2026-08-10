import { createFileRoute } from "@tanstack/react-router";
import { adminGetAnalytics } from "@/server/actions";

export const Route = createFileRoute("/admin/_authed/analytics")({
  loader: () => adminGetAnalytics(),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const a = Route.useLoaderData();
  const views = Object.entries(a.pageViews).sort((x, y) => y[1] - x[1]);
  const ctas = Object.entries(a.ctaClicks).sort((x, y) => y[1] - x[1]);
  const bots = Object.entries(a.botHits).sort((x, y) => y[1] - x[1]);
  const totalViews = views.reduce((s, [, n]) => s + n, 0);
  const totalBots = bots.reduce((s, [, n]) => s + n, 0);

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold">Analytics</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Lightweight first-party counters (every page view recorded). For sessions, sources and
        conversions, use GA4 / Meta — set their IDs in Settings.
      </p>

      <div className="mt-4 flex gap-4 text-sm text-muted-foreground">
        <span>
          <strong className="text-ink">{totalViews}</strong> total views
        </span>
        <span>
          <strong className="text-ink">{totalBots}</strong> AI-crawler hits
        </span>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <Counter title="Page views by path" rows={views} empty="No views recorded yet." />
        <Counter title="CTA clicks by location" rows={ctas} empty="No clicks recorded yet." />
        <Counter
          title="AI crawlers &amp; bots"
          rows={bots}
          empty="No crawler hits recorded yet."
        />
      </div>
    </div>
  );
}

function Counter({
  title,
  rows,
  empty,
}: {
  title: string;
  rows: Array<[string, number]>;
  empty: string;
}) {
  return (
    <div className="rounded-lg border border-line bg-card p-5">
      <h2 className="text-sm font-medium text-ink">{title}</h2>
      {rows.length === 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">{empty}</p>
      ) : (
        <ul className="mt-3 space-y-2 text-sm">
          {rows.map(([key, n]) => (
            <li key={key} className="flex justify-between gap-4 border-t border-line pt-2">
              <span className="truncate text-muted-foreground">{key}</span>
              <span className="numeral font-medium">{n}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
