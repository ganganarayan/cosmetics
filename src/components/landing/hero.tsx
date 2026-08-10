import { ScorecardCta } from "./primitives";
import { useSiteConfig } from "@/components/site-config";

export function Hero() {
  const { content } = useSiteConfig();
  const hero = content.hero;
  return (
    <section className="px-5 pt-14 pb-4 md:pt-24">
      <div className="mx-auto max-w-4xl">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1 className="mt-6 text-[2.1rem] leading-[1.08] text-ink sm:text-5xl md:text-[3.6rem]">
          {hero.headline}
        </h1>
        <p className="mt-7 max-w-2xl text-[1.05rem] text-muted-foreground md:text-[1.15rem]">
          {hero.subcopy}
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ScorecardCta location="hero" label="Get your clinic's leak number — 4 minutes, free" />
        </div>
        <p className="mt-4 font-mono text-[0.78rem] text-muted-foreground">
          Full result shown instantly. Nothing gated. No call required.
        </p>

        <p className="mt-12 border-t border-line pt-5 text-[0.85rem] tracking-wide text-muted-foreground">
          {hero.specialties}
        </p>
      </div>
    </section>
  );
}
