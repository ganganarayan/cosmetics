import { ScorecardCta } from "./primitives";

export function Hero() {
  return (
    <section className="px-5 pt-14 pb-4 md:pt-24">
      <div className="mx-auto max-w-4xl">
        <p className="eyebrow">
          For aesthetic, dental, hair-transplant and elective clinics
        </p>
        <h1 className="mt-6 text-[2.1rem] leading-[1.08] text-ink sm:text-5xl md:text-[3.6rem]">
          Most clinics don&rsquo;t have a lead problem. They have a gap between the enquiry and the
          chair.
        </h1>
        <p className="mt-7 max-w-2xl text-[1.05rem] text-muted-foreground md:text-[1.15rem]">
          Booking rates fall by more than half after the first five minutes, and by roughly eighty
          percent after the first hour. We install the engine that owns those first ninety minutes —
          instant response at any hour, follow-up that doesn&rsquo;t stop at message two, and booking
          straight into your calendar.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ScorecardCta location="hero" label="Get your clinic's leak number — 4 minutes, free" />
        </div>
        <p className="mt-4 font-mono text-[0.78rem] text-muted-foreground">
          Full result shown instantly. Nothing gated. No call required.
        </p>

        <p className="mt-12 border-t border-line pt-5 text-[0.85rem] tracking-wide text-muted-foreground">
          Hair transplant · Aesthetic dermatology · Cosmetic dentistry · Bariatric · Fertility &amp;
          IVF
        </p>
      </div>
    </section>
  );
}
