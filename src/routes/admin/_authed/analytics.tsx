import { createFileRoute } from "@tanstack/react-router";
import { adminGetAnalytics } from "@/server/actions";

export const Route = createFileRoute("/admin/_authed/analytics")({
  loader: () => adminGetAnalytics(),
  component: AnalyticsPage,
});

type Row = [path: string, count: number];

const sum = (rows: Row[]) => rows.reduce((s, [, n]) => s + n, 0);
const byCount = (a: Row, b: Row) => b[1] - a[1];

function AnalyticsPage() {
  const a = Route.useLoaderData();
  const entries = Object.entries(a.pageViews) as Row[];

  // Landing page = the home page.
  const landing = a.pageViews["/"] ?? 0;

  // Search pages = the SEO content doctors find via search / AI (specialties + guides).
  const searchRows = entries
    .filter(([p]) => p.startsWith("/specialties") || p.startsWith("/guides"))
    .sort(byCount);

  // Everything else (legal, contact, thank-you, admin, 404s) — kept but not the focus.
  const internalRows = entries
    .filter(([p]) => p !== "/" && !p.startsWith("/specialties") && !p.startsWith("/guides"))
    .sort(byCount);

  const ctas = (Object.entries(a.ctaClicks) as Row[]).sort(byCount);
  const bots = (Object.entries(a.botHits) as Row[]).sort(byCount);

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold">Analytics</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        First-party counters — every page view recorded. For sessions, sources and conversions, use
        GA4 / Meta (set their IDs in Settings).
      </p>

      {/* 1 — Landing page, on top */}
      <section className="mt-6 rounded-lg border border-line bg-card p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-ink">Landing page</h2>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.8rem] text-teal underline underline-offset-4"
          >
            Open ↗
          </a>
        </div>
        <p className="numeral mt-2 text-3xl font-semibold text-ink">{landing}</p>
        <p className="text-sm text-muted-foreground">views of the home page</p>
      </section>

      {/* 2 — Search pages (doctors landing from search) */}
      <LinkedCounter
        className="mt-6"
        title="Search pages — doctors landing from search"
        subtitle="Specialty and guide pages built to be found via search and AI assistants."
        parents={[
          { href: "/specialties", label: "Specialties hub" },
          { href: "/guides", label: "Guides hub" },
        ]}
        rows={searchRows}
        empty="No search-page views yet."
      />

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <PlainCounter title="CTA clicks by location" rows={ctas} empty="No clicks recorded yet." />
        <PlainCounter title="AI crawlers & bots" rows={bots} empty="No crawler hits recorded yet." />
      </div>

      {/* 3 — Internal page views, separated, at the bottom */}
      <LinkedCounter
        className="mt-6"
        title="Internal page views"
        subtitle="Legal, contact, admin and other pages — not marketing-relevant, kept for completeness."
        rows={internalRows}
        empty="No internal views yet."
      />
    </div>
  );
}

// Counter whose rows are real page paths — each links to the live page (new tab),
// with optional parent/hub links in the header.
function LinkedCounter({
  title,
  subtitle,
  parents,
  rows,
  empty,
  className,
}: {
  title: string;
  subtitle?: string;
  parents?: ReadonlyArray<{ href: string; label: string }>;
  rows: Row[];
  empty: string;
  className?: string;
}) {
  return (
    <section className={`rounded-lg border border-line bg-card p-5 ${className ?? ""}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-sm font-medium text-ink">
          {title} <span className="text-muted-foreground">· {sum(rows)}</span>
        </h2>
        {parents && parents.length > 0 && (
          <div className="flex gap-3 text-[0.8rem]">
            {parents.map((p) => (
              <a
                key={p.href}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal underline underline-offset-4"
              >
                {p.label} ↗
              </a>
            ))}
          </div>
        )}
      </div>
      {subtitle && <p className="mt-1 text-[0.8rem] text-muted-foreground">{subtitle}</p>}

      {rows.length === 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">{empty}</p>
      ) : (
        <ul className="mt-3 space-y-2 text-sm">
          {rows.map(([path, n]) => (
            <li key={path} className="flex justify-between gap-4 border-t border-line pt-2">
              <a
                href={path}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate text-teal hover:underline"
                title={`Open ${path}`}
              >
                {path}
              </a>
              <span className="numeral font-medium text-ink">{n}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

// Counter for non-URL keys (CTA locations, bot names) — plain text rows.
function PlainCounter({ title, rows, empty }: { title: string; rows: Row[]; empty: string }) {
  return (
    <section className="rounded-lg border border-line bg-card p-5">
      <h2 className="text-sm font-medium text-ink">{title}</h2>
      {rows.length === 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">{empty}</p>
      ) : (
        <ul className="mt-3 space-y-2 text-sm">
          {rows.map(([key, n]) => (
            <li key={key} className="flex justify-between gap-4 border-t border-line pt-2">
              <span className="truncate text-muted-foreground">{key}</span>
              <span className="numeral font-medium text-ink">{n}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
