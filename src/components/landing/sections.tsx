import { Section } from "./primitives";

const FIT = [
  "30+ new enquiries a month",
  "Average treatment value ₹25,000+",
  "One or more locations",
  "You already spend on ads, or are ready to",
  "You can decide without a committee",
];

const NOT_FIT = [
  "Fewer than 30 enquiries a month",
  "You want leads sold by the piece",
  "You want a month-to-month trial",
  "You want us to absorb ad spend",
  "You're looking for the cheapest option",
];

export function WhoItsFor() {
  return (
    <Section id="who-its-for" className="border-t border-line">
      <p className="eyebrow">Who this is for — and who it isn&rsquo;t</p>
      <h2 className="mt-4 max-w-2xl text-[1.75rem] text-ink md:text-4xl">
        We would rather be honest than booked.
      </h2>

      <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <h3 className="text-[1.1rem] text-ink">A fit if</h3>
          <ul className="mt-5 space-y-3">
            {FIT.map((f) => (
              <li key={f} className="border-t border-line pt-3 text-[0.95rem] text-ink">
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-[1.1rem] text-muted-foreground">Not a fit if</h3>
          <ul className="mt-5 space-y-3">
            {NOT_FIT.map((f) => (
              <li
                key={f}
                className="border-t border-line pt-3 text-[0.95rem] text-muted-foreground"
              >
                {f}
              </li>
            ))}
          </ul>
          <p className="mt-6 border-l-2 border-gold pl-5 text-[0.95rem] text-ink">
            If that&rsquo;s you today, take the scorecard anyway. The report is yours and the
            arithmetic works whether or not we ever speak.
          </p>
        </div>
      </div>
    </Section>
  );
}

const STEPS = [
  {
    n: "01",
    title: "Scorecard, 4 minutes",
    body: "Twelve questions. You get the full diagnosis and the figure immediately, on screen. No call required.",
  },
  {
    n: "02",
    title: "Diagnosis call, 15 minutes",
    body: "Only if the figure is worth a conversation. We walk through your specific leak and what closing it looks like.",
  },
  {
    n: "03",
    title: "Install, 10–14 days",
    body: "Ad account, funnel, CRM pipeline, response and follow-up automation, booking and reminders, attribution. We build it; you approve it.",
  },
  {
    n: "04",
    title: "The engine runs",
    body: "Monthly performance review. You keep doing medicine.",
  },
];

export function HowItWorks() {
  return (
    <Section className="border-t border-line">
      <p className="eyebrow">How it works</p>
      <h2 className="mt-4 max-w-2xl text-[1.75rem] text-ink md:text-4xl">Four steps.</h2>
      <ol className="mt-12 grid gap-8 md:grid-cols-4">
        {STEPS.map((s) => (
          <li key={s.n} className="border-t border-line pt-5">
            <span className="numeral text-[0.85rem] text-gold">{s.n}</span>
            <h3 className="mt-3 text-[1.1rem] text-ink">{s.title}</h3>
            <p className="mt-2 text-[0.92rem] text-muted-foreground">{s.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function Investment() {
  return (
    <Section id="investment" className="border-t border-line">
      <p className="eyebrow">Investment</p>
      <h2 className="mt-4 max-w-3xl text-[1.6rem] text-ink md:text-[2.4rem]">
        Ad spend is billed to you directly and is never part of our fee. Here is everything else.
      </h2>

      <div className="mt-10 max-w-3xl border border-line bg-card">
        {[
          ["Setup and installation", "Included"],
          ["Monthly retainer", "₹1,00,000"],
          [
            "Ad spend",
            "You fund it directly on your own ad account — top up if prepaid, or keep auto-debit funded if postpaid. We never pay or bill ad spend; we monitor it and alert you, but keeping the account funded is your responsibility.",
          ],
        ].map(([k, v]) => (
          <div
            key={k}
            className="grid gap-1 border-b border-line p-5 last:border-0 md:grid-cols-[1fr_1.3fr] md:items-baseline md:p-6"
          >
            <p className="text-[0.95rem] text-ink">{k}</p>
            <p className="numeral text-[0.95rem] text-muted-foreground">{v}</p>
          </div>
        ))}
      </div>

      <p className="mt-7 max-w-2xl text-[0.95rem] text-muted-foreground">
        Put that against the figure on your scorecard. For a clinic losing ₹15 lakh a month in
        recoverable treatment value, the retainer is a fraction of what is currently leaving.
      </p>

      {/* REAL CASE STUDIES GO HERE - DO NOT FABRICATE */}
      <div className="mt-12 max-w-3xl border border-dashed border-line p-6">
        <p className="eyebrow">Client results</p>
        <p className="mt-3 text-[0.95rem] text-muted-foreground">
          We publish results only once a clinic has agreed to have its numbers shared. Nothing is
          shown here until then.
        </p>
      </div>
    </Section>
  );
}
