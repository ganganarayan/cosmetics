import type { ReactNode } from "react";
import { PageShell } from "@/components/page-shell";
import { ScorecardCta } from "@/components/landing/primitives";

export type RelatedLink = { href: string; label: string };

export function ContentPage({
  eyebrow,
  title,
  intro,
  children,
  related,
  ctaLabel = "Get your clinic's leak number — 4 minutes, free",
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
  related?: ReadonlyArray<RelatedLink>;
  ctaLabel?: string;
}) {
  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 text-[2rem] leading-tight text-ink md:text-[2.6rem]">{title}</h1>
        <p className="mt-6 text-[1.08rem] text-muted-foreground">{intro}</p>

        <div className="mt-10 space-y-5 text-[0.98rem] text-muted-foreground [&_a]:text-teal [&_a]:underline [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-[1.3rem] [&_h2]:text-ink [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-[1.05rem] [&_h3]:text-ink [&_li]:mb-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5">
          {children}
        </div>

        <div className="mt-12 rounded-lg border border-line bg-card p-6">
          <p className="text-[1.05rem] text-ink">See exactly where your clinic loses patients.</p>
          <p className="mt-2 text-[0.95rem] text-muted-foreground">
            A four-minute diagnostic. The full result appears on screen — no call required.
          </p>
          <div className="mt-5">
            <ScorecardCta location="article" label={ctaLabel} />
          </div>
        </div>

        {related && related.length > 0 && (
          <nav className="mt-12 border-t border-line pt-6" aria-label="Related">
            <p className="eyebrow">Keep reading</p>
            <ul className="mt-4 space-y-2 text-[0.98rem]">
              {related.map((r) => (
                <li key={r.href}>
                  <a href={r.href} className="text-teal underline underline-offset-4">
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </article>
    </PageShell>
  );
}
