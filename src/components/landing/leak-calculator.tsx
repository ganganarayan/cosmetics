import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { formatINR, formatIndianWords } from "@/lib/inr";
import { track } from "@/lib/analytics";
import { useCountUp } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";
import { ScorecardCta } from "./primitives";

const CEILING = 33;

const BANDS = [
  { id: "u5", label: "Under 5 min", conversion: 30 },
  { id: "u60", label: "Under 1 hour", conversion: 23 },
  { id: "hours", label: "A few hours", conversion: 15 },
  { id: "next", label: "Next day or later", conversion: 7 },
] as const;

export function LeakCalculator() {
  const [enquiries, setEnquiries] = useState(90);
  const [value, setValue] = useState(75000);
  const [band, setBand] = useState<(typeof BANDS)[number]>(BANDS[3]);
  const [conversion, setConversion] = useState<number>(BANDS[3].conversion);

  const clamped = Math.min(100, Math.max(0, conversion || 0));
  const recoverableRate = Math.max(0, CEILING - clamped) / 100;

  const winningCount = Math.round(enquiries * (clamped / 100));
  const losingCount = Math.round(enquiries * recoverableRate);
  const winning = winningCount * value;
  const losing = losingCount * value;
  const potential = winning + losing;

  const shownWinning = useCountUp(winning);
  const shownLosing = useCountUp(losing);

  function pickBand(b: (typeof BANDS)[number]) {
    setBand(b);
    setConversion(b.conversion);
  }

  useEffect(() => {
    const t = setTimeout(
      () =>
        track("calculator_used", {
          enquiries,
          treatment_value: value,
          response_band: band.id,
          conversion_rate: clamped,
          value_winning: winning,
          value_at_risk: losing,
        }),
      600,
    );
    return () => clearTimeout(t);
  }, [enquiries, value, band.id, clamped, winning, losing]);

  return (
    <section
      id="the-gap"
      className="scroll-mt-24 border-y border-line px-5 py-16 md:py-24"
      style={{ background: "var(--wash-calculator)" }}
    >
      <div className="mx-auto max-w-5xl">
        <p className="eyebrow">The live leak calculator</p>
        <h2 className="mt-4 max-w-2xl text-[1.75rem] text-ink md:text-4xl">
          Four inputs. The arithmetic is on screen, so you can check it yourself.
        </h2>

        <div className="mt-10 grid gap-10 border border-line bg-card p-6 md:grid-cols-2 md:p-10">
          <div className="space-y-9">
            <div>
              <div className="flex items-baseline justify-between">
                <label htmlFor="enq" className="text-[0.95rem] text-ink">
                  New patient enquiries per month
                </label>
                <span className="numeral text-[0.95rem] text-ink">{enquiries}</span>
              </div>
              <Slider
                id="enq"
                aria-label="New patient enquiries per month"
                className="mt-4"
                min={20}
                max={300}
                step={5}
                value={[enquiries]}
                onValueChange={(v) => setEnquiries(v[0] ?? enquiries)}
              />
            </div>

            <div>
              <div className="flex items-baseline justify-between">
                <label htmlFor="val" className="text-[0.95rem] text-ink">
                  Average value of a completed treatment
                </label>
                <span className="numeral text-[0.95rem] text-ink">{formatINR(value)}</span>
              </div>
              <Slider
                id="val"
                aria-label="Average value of a completed treatment in rupees"
                className="mt-4"
                min={10000}
                max={300000}
                step={5000}
                value={[value]}
                onValueChange={(v) => setValue(v[0] ?? value)}
              />
            </div>

            <div>
              <label htmlFor="conv" className="text-[0.95rem] text-ink">
                Of every 100 enquiries, roughly how many become a completed treatment?
              </label>
              <Input
                id="conv"
                type="number"
                inputMode="numeric"
                min={0}
                max={100}
                value={conversion}
                onChange={(e) => setConversion(Number(e.target.value))}
                className="numeral mt-4 max-w-28 rounded-sm"
              />
              <p className="mt-2 text-[0.8rem] text-muted-foreground">
                Estimated from your response time. Change it if you know your real number.
              </p>
            </div>

            <fieldset>
              <legend className="text-[0.95rem] text-ink">
                Typical time from enquiry to first human reply
              </legend>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {BANDS.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    aria-pressed={band.id === b.id}
                    onClick={() => pickBand(b)}
                    className={cn(
                      "rounded-sm border px-3 py-2.5 text-[0.85rem] transition-colors",
                      band.id === b.id
                        ? "border-teal bg-teal text-primary-foreground"
                        : "border-line text-ink hover:border-teal",
                    )}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="flex flex-col justify-between border-t border-line pt-8 md:border-t-0 md:border-l md:pt-0 md:pl-10">
            <div className="space-y-8">
              <div>
                <p className="eyebrow">Treatment value you&rsquo;re winning today</p>
                <p className="numeral mt-3 text-[1.7rem] leading-none text-teal md:text-[2.1rem]">
                  {formatINR(shownWinning)}
                </p>
                <p className="numeral mt-2 text-[0.85rem] text-muted-foreground">
                  {winningCount} of {enquiries} enquiries a month
                </p>
                <p className="numeral mt-1 text-[0.85rem] text-muted-foreground">
                  {formatINR(winning * 12)} a year
                </p>
              </div>

              <div>
                <p className="eyebrow">Treatment value you&rsquo;re losing in the gap</p>
                <p className="numeral mt-3 text-[2.4rem] leading-none text-gold md:text-[3.2rem]">
                  {formatINR(shownLosing)}
                </p>
                <p className="numeral mt-2 text-[0.85rem] text-muted-foreground">
                  {losingCount} of {enquiries} enquiries a month
                </p>
                <p className="numeral mt-1 text-[0.85rem] text-muted-foreground">
                  {formatINR(losing * 12)} a year &middot; {formatIndianWords(losing)}
                </p>
              </div>

              <p className="numeral border-t border-line pt-5 text-[0.95rem] text-ink">
                Full potential: <span className="text-ink">{formatINR(potential)}</span> a month
                &middot; {formatINR(potential * 12)} a year
              </p>

              {recoverableRate === 0 ? (
                <div className="border border-line bg-paper p-4 text-[0.85rem] leading-relaxed text-ink">
                  At {clamped} in 100 you are already at the {CEILING}% ceiling this model assumes.
                  There is no response-gap loss left to recover — the arithmetic below shows zero.
                </div>
              ) : null}

              <div className="numeral border border-line bg-paper p-4 text-[0.8rem] leading-relaxed text-ink md:text-[0.85rem]">
                Winning: {enquiries} enquiries × {clamped}% converting = {winningCount} treatments ×{" "}
                {formatINR(value)} = <span className="text-teal">{formatINR(winning)}</span>
                <br />
                Losing: {CEILING}% ceiling − {clamped}% = {Math.round(recoverableRate * 100)}%
                recoverable
                <br />
                {enquiries} enquiries × {Math.round(recoverableRate * 100)}% = {losingCount}{" "}
                recoverable enquiries × {formatINR(value)} ={" "}
                <span className="text-gold">{formatINR(losing)}</span>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-[0.9rem] text-muted-foreground">
                This is an estimate from four inputs. The 12-question scorecard uses your after-hours
                handling, follow-up depth and show-up rate to produce a figure specific to your
                clinic.
              </p>
              <ScorecardCta
                location="calculator"
                className="mt-5 w-full sm:w-auto"
              />
            </div>
          </div>
        </div>

        <p className="mt-5 text-[0.8rem] text-muted-foreground">
          The model measures enquiry to completed treatment, and assumes a {CEILING}% conversion
          ceiling — the practical best a clinic reaches with instant response and sustained
          follow-up. Recoverable means enquiries that would have converted under that ceiling, not
          every enquiry you lose.
        </p>
      </div>
    </section>
  );
}
