import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";
import { Section } from "./primitives";

const BEATS = [
  {
    time: "20:40",
    text: "Patient enquires. They've been researching for weeks. Tonight they decided.",
  },
  { time: "20:41:30", text: "A competing clinic replies in ninety seconds." },
  { time: "21:15", text: "Patient enquires at a third clinic while waiting." },
  {
    time: "09:30 +1",
    text: "The enquiry is finally seen. Nobody was slow — the hour simply wasn't staffed, and the patient booked eleven hours ago.",
  },
];

export function AgencyObjection() {
  return (
    <Section className="border-t border-line">
      <p className="eyebrow">One objection first</p>
      <h2 className="mt-4 max-w-2xl text-[1.75rem] text-ink md:text-4xl">
        &ldquo;We already have an agency.&rdquo;
      </h2>
      <p className="mt-6 max-w-2xl text-[1rem] text-muted-foreground">
        Most clinics do, and agencies deliver enquiries — that is their job. This is about the ninety
        minutes after the enquiry arrives, which no agency touches. Ask yourself what happens to a
        lead at 9pm.
      </p>
    </Section>
  );
}


function Beat({ time, text, index }: { time: string; text: string; index: number }) {
  const { ref, shown } = useReveal<HTMLLIElement>();
  return (
    <li
      ref={ref}
      style={{ transitionDelay: `${index * 90}ms` }}
      className={cn(
        "reveal relative border-line pt-6 pl-8 md:border-t md:pt-8 md:pl-0",
        "border-l md:border-l-0",
        shown && "reveal-in",
      )}
    >
      <span className="absolute top-6 -left-[4.5px] h-2 w-2 rotate-45 bg-gold md:top-[-4.5px] md:left-0" />
      <p className="numeral text-[0.95rem] text-gold md:mt-0">{time}</p>
      <p className="mt-3 max-w-xs text-[0.95rem] text-ink">{text}</p>
    </li>
  );
}

export function Timeline() {
  return (
    <Section>
      <p className="eyebrow">The ninety minutes</p>
      <h2 className="mt-4 max-w-2xl text-[1.75rem] text-ink md:text-4xl">
        One enquiry, thirteen hours, three clinics.
      </h2>

      <ol className="mt-12 grid gap-8 md:grid-cols-4 md:gap-6">
        {BEATS.map((b, i) => (
          <Beat key={b.time} time={b.time} text={b.text} index={i} />
        ))}
      </ol>

      <blockquote className="mt-14 max-w-3xl border-l-2 border-gold pl-6">
        <p className="font-display text-[1.5rem] leading-snug text-ink md:text-[2rem]">
          &ldquo;That patient was never price-sensitive. They were sensitive to being
          answered.&rdquo;
        </p>
      </blockquote>

      <p className="mt-10 max-w-2xl text-[1rem] text-muted-foreground">
        A lost enquiry leaves no trace. It doesn&rsquo;t appear in any report. It simply never
        becomes a patient — which is why buying more leads doesn&rsquo;t fix it. More enquiries into
        the same gap produces more loss and a bigger invoice.
      </p>
    </Section>
  );
}
