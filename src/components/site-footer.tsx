import { Link } from "@tanstack/react-router";

const LEGAL = [
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms of Service" },
  { to: "/refund", label: "Refund Policy" },
  { to: "/shipping", label: "Delivery of Services" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper pb-20 sm:pb-10">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="font-mono text-sm tracking-[0.22em] text-ink uppercase">Divine Leads</p>
            <p className="mt-3 max-w-sm text-[0.95rem] text-muted-foreground">
              The AI patient-engine for clinics — booked consultations on autopilot.
            </p>
            <div className="mt-5 flex flex-col gap-1 text-[0.95rem]">
              <a href="mailto:connect@divineleads.guru" className="text-ink hover:text-teal">
                connect@divineleads.guru
              </a>
              <a
                href="https://wa.me/919356819176"
                className="text-ink hover:text-teal"
                rel="noopener noreferrer"
                target="_blank"
              >
                WhatsApp us
              </a>
            </div>
          </div>

          <nav aria-label="Legal">
            <p className="eyebrow">Company</p>
            <ul className="mt-4 space-y-2 text-[0.95rem]">
              {LEGAL.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-muted-foreground hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-12 border-t border-line pt-6 text-[0.85rem] text-muted-foreground">
          Divine Leads is a marketing services provider. We do not provide medical advice,
          treatment, or patient care.
        </p>
        <p className="mt-2 text-[0.8rem] text-muted-foreground">
          © {new Date().getFullYear()} Divine Leads. cosmetic.divineleads.guru
        </p>
      </div>
    </footer>
  );
}
