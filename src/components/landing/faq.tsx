import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { track } from "@/lib/analytics";
import { ScorecardCta, Section } from "./primitives";

const FAQS = [
  {

    q: "₹1 lakh a month is a lot.",
    a: "It is a real number, so put it next to the figure on your own scorecard. If the recoverable value sitting in your enquiries is smaller than the retainer, we should not work together yet.",
  },
  {
    q: "We tried automation and patients hated it.",
    a: "They hated bad automation — generic, slow, obviously robotic. Speed is what patients actually want; they simply want it to sound like the clinic. Everything we install is written in your clinic's voice and escalates to a human at the right moment.",
  },
  {
    q: "Can we do a trial month?",
    a: "No. Setup work is front-loaded and a single month guarantees a bad result. If you are not ready for a proper install, take the scorecard and act on it yourself.",
  },
  {
    q: "Is this compliant / discreet?",
    a: "Patient enquiries stay in your systems. Communication is discreet by design, because discretion is why patients hesitate to enquire in the first place. We handle marketing data, never clinical records.",
  },
  {
    q: "What do you actually guarantee?",
    a: "Response time, follow-up persistence, and booking flow. Never a number of patients — nobody honest can promise that.",
  },
];

export function Faq() {
  return (
    <Section id="faq" className="border-t border-line">
      <p className="eyebrow">Objections</p>
      <h2 className="mt-4 max-w-2xl text-[1.75rem] text-ink md:text-4xl">
        The questions clinic owners actually ask.
      </h2>

      <Accordion
        type="single"
        collapsible
        className="mt-10 max-w-3xl border-t border-line"
        onValueChange={(v) => v && track("faq_open", { question: v })}
      >
        {FAQS.map((f, i) => (
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
  return (
    <section className="bg-ink px-5 py-20 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-[2rem] text-primary-foreground md:text-[3rem]">
          The report is yours either way.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-[1.05rem] text-primary-foreground/80">
          Twelve questions, four minutes. The full diagnosis appears on screen the moment you finish
          — no email wall, no call required.
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
  return (
    <Section className="border-t border-line">
      <p className="eyebrow">The offer</p>
      <p className="mt-5 max-w-3xl font-display text-[1.35rem] leading-snug text-ink md:text-[1.9rem]">
        <em>
          We don&rsquo;t sell you leads. We install the system that turns the enquiries you already
          get into consultations that actually show up — instant response, follow-up that
          doesn&rsquo;t stop at message two, and booking straight into your calendar. You keep doing
          medicine. The engine handles everything before the chair.
        </em>
      </p>
      <p className="numeral mt-8 text-[0.85rem] text-gold">
        The AI patient-engine for clinics — booked consultations on autopilot.
      </p>
    </Section>
  );
}
