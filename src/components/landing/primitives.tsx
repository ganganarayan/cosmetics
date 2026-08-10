import type { ReactNode } from "react";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/use-reveal";
import { useSiteConfig } from "@/components/site-config";

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  const { ref, shown } = useReveal<HTMLElement>();
  return (
    <section
      id={id}
      ref={ref}
      className={cn("reveal scroll-mt-24 px-5 py-16 md:py-24", shown && "reveal-in", className)}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function ScorecardCta({
  location,
  className,
  label = "Get your clinic's leak number — 4 minutes, free, no call required",
}: {
  location: string;
  className?: string;
  label?: string;
}) {
  const { settings } = useSiteConfig();
  return (
    <a
      href={settings.assessmentUrl}
      onClick={() => track("scorecard_cta_click", { location })}
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-teal px-6 py-3.5 text-center text-[0.95rem] font-medium text-primary-foreground transition-colors hover:bg-ink",
        className,
      )}
    >
      {label}
    </a>
  );
}
