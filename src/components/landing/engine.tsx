import { Clock, Repeat, Filter, CalendarCheck, Megaphone, LineChart } from "lucide-react";
import { Section } from "./primitives";

const CARDS = [
  {
    icon: Clock,
    title: "Instant response, any hour",
    body: "Every enquiry answered within sixty seconds, at 2am and on Sundays, in your clinic's voice.",
  },
  {
    icon: Repeat,
    title: "Follow-up that doesn't stop at message two",
    body: "Sequences that run for weeks across WhatsApp, SMS and email instead of one message and silence.",
  },
  {
    icon: Filter,
    title: "Qualification before your coordinator spends a minute",
    body: "Budget, treatment interest and timeline established before a human is involved.",
  },
  {
    icon: CalendarCheck,
    title: "Booking straight into your calendar",
    body: "Live availability, confirmation, and reminder ladders that cut no-shows.",
  },
  {
    icon: Megaphone,
    title: "Ads and content, done for you",
    body: "Meta and Google campaign management plus a continuous content engine. Nothing for your team to run.",
  },
  {
    icon: LineChart,
    title: "Attribution you can audit",
    body: "Channel-tagged links and server-side tracking, so you know the cost of a booked consultation, not the cost of a click.",
  },
];

export function Engine() {
  return (
    <Section id="the-engine" className="border-t border-line">
      <p className="eyebrow">The engine</p>
      <h2 className="mt-4 max-w-2xl text-[1.75rem] text-ink md:text-4xl">What gets installed.</h2>

      <div className="mt-12 grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((c) => (
          <article key={c.title} className="bg-card p-7">
            <c.icon className="h-5 w-5 text-gold" strokeWidth={1.5} aria-hidden="true" />
            <h3 className="mt-5 text-[1.15rem] text-ink">{c.title}</h3>
            <p className="mt-3 text-[0.95rem] text-muted-foreground">{c.body}</p>
          </article>
        ))}
      </div>

      <p className="mt-7 text-[0.95rem] text-ink">
        Done for you. Nothing for your team to learn and nothing to run.
      </p>
    </Section>
  );
}
