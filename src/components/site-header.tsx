import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { ASSESSMENT_URL } from "@/lib/site";

const NAV = [
  { label: "The Gap", href: "/#the-gap" },
  { label: "The Engine", href: "/#the-engine" },
  { label: "Who It's For", href: "/#who-its-for" },
  { label: "Investment", href: "/#investment" },
  { label: "FAQ", href: "/#faq" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link
          to="/"
          className="font-mono text-sm tracking-[0.22em] text-ink uppercase"
          onClick={() => setOpen(false)}
        >
          Divine Leads
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Sections">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[0.9rem] text-muted-foreground transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={ASSESSMENT_URL}
            onClick={() => track("scorecard_cta_click", { location: "header" })}
            className="hidden rounded-full bg-teal px-4 py-2 text-[0.85rem] font-medium text-primary-foreground transition-colors hover:bg-ink sm:inline-flex"
          >
            Get your leak number
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-line text-ink lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-paper lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-2" aria-label="Sections">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line/60 py-3 text-[0.95rem] text-ink last:border-0"
              >
                {item.label}
              </a>
            ))}
            <a
              href={ASSESSMENT_URL}
              onClick={() => {
                setOpen(false);
                track("scorecard_cta_click", { location: "mobile_menu" });
              }}
              className="mt-3 mb-3 rounded-full bg-teal px-4 py-3 text-center text-[0.9rem] font-medium text-primary-foreground"
            >
              Get your leak number · 4 min
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

export function MobileCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(max > 0 && window.scrollY / max > 0.4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 border-t border-line bg-paper/95 p-3 backdrop-blur-sm transition-transform duration-300 sm:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
      aria-hidden={!visible}
    >
      <a
        href={ASSESSMENT_URL}
        tabIndex={visible ? 0 : -1}
        onClick={() => track("scorecard_cta_click", { location: "mobile_bar" })}
        className="block rounded-full bg-teal px-5 py-3 text-center text-[0.95rem] font-medium text-primary-foreground"
      >
        Get your leak number · 4 min
      </a>
    </div>
  );
}
