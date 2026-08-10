import type { ReactNode } from "react";
import { SiteHeader, MobileCtaBar } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BackButton } from "@/components/back-button";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <MobileCtaBar />
    </div>
  );
}

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <BackButton className="mb-8" />
        <h1 className="text-[2rem] text-ink md:text-[2.8rem]">{title}</h1>
        {updated && <p className="numeral mt-4 text-[0.8rem] text-muted-foreground">{updated}</p>}
        <div className="mt-10 space-y-8 text-[0.98rem] text-muted-foreground [&_a]:text-teal [&_a]:underline [&_h2]:mb-3 [&_h2]:text-[1.2rem] [&_h2]:text-ink [&_li]:mb-2 [&_ul]:list-disc [&_ul]:pl-5">
          {children}
        </div>
      </article>
    </PageShell>
  );
}
