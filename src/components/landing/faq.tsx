import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { track } from "@/lib/analytics";
import { useSiteConfig } from "@/components/site-config";
import { ScorecardCta, Section } from "./primitives";

export function Faq() {
  const { content } = useSiteConfig();
  const faq = content.faq;
  return (
    <Section id="faq" className="border-t border-line">
      <p className="eyebrow">Objections</p>
      <h2 className="mt-4 max-w-2xl text-[1.75rem] text-ink md:text-4xl">{faq.heading}</h2>

      <Accordion
        type="single"
        collapsible
        className="mt-10 max-w-3xl border-t border-line"
        onValueChange={(v) => v && track("faq_open", { question: v })}
      >
        {faq.items.map((f, i) => (
          <AccordionItem key={f.q} value={`q${i}`} className="border-b border-line">
            <AccordionTrigger className="py-5 text-left text-[1rem] text-ink hover:no-underline">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-[0.95rem] text-muted-foreground">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}

export function FinalCta() {
  const { content } = useSiteConfig();
  const cta = content.finalCta;
  return (
    <section className="bg-ink px-5 py-20 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-[2rem] text-primary-foreground md:text-[3rem]">{cta.heading}</h2>
        <p className="mx-auto mt-6 max-w-xl text-[1.05rem] text-primary-foreground/80">
          {cta.subcopy}
        </p>
        <div className="mt-9 flex flex-col items-center gap-5">
          <ScorecardCta
            location="final"
            className="bg-gold text-accent-foreground hover:bg-gold/90"
            label="Get your clinic's leak number — 4 minutes, free"
          />
        </div>
      </div>
    </section>
  );
}

export function OfferStatement() {
  const { content } = useSiteConfig();
  const offer = content.offer;
  return (
    <Section className="border-t border-line">
      <p className="eyebrow">The offer</p>
      <p className="mt-5 max-w-3xl font-display text-[1.35rem] leading-snug text-ink md:text-[1.9rem]">
        <em>{offer.statement}</em>
      </p>
      <p className="numeral mt-8 text-[0.85rem] text-gold">{offer.tagline}</p>
    </Section>
  );
}
