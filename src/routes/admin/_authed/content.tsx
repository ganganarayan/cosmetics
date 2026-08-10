import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { adminGetContent, adminSaveContent } from "@/server/actions";
import type { Content } from "@/server/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/admin/_authed/content")({
  loader: () => adminGetContent(),
  component: ContentPage,
});

function ContentPage() {
  const initial = Route.useLoaderData();
  const router = useRouter();
  const [c, setC] = useState<Content>(initial);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setStatus("");
    try {
      await adminSaveContent({ data: c });
      setStatus("Saved.");
      await router.invalidate();
    } catch {
      setStatus("Save failed.");
    } finally {
      setBusy(false);
    }
  }

  function updateFaqItem(i: number, key: "q" | "a", value: string) {
    setC((s) => ({
      ...s,
      faq: { ...s.faq, items: s.faq.items.map((it, idx) => (idx === i ? { ...it, [key]: value } : it)) },
    }));
  }
  function addFaqItem() {
    setC((s) => ({ ...s, faq: { ...s.faq, items: [...s.faq.items, { q: "", a: "" }] } }));
  }
  function removeFaqItem(i: number) {
    setC((s) => ({ ...s, faq: { ...s.faq, items: s.faq.items.filter((_, idx) => idx !== i) } }));
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold">Content</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Edit the main landing-page copy. Changes go live immediately.
      </p>

      <form onSubmit={onSave} className="mt-6 space-y-8">
        <Section title="Hero">
          <Field label="Eyebrow">
            <Input value={c.hero.eyebrow} onChange={(e) => setC((s) => ({ ...s, hero: { ...s.hero, eyebrow: e.target.value } }))} />
          </Field>
          <Field label="Headline">
            <Textarea value={c.hero.headline} rows={2} onChange={(e) => setC((s) => ({ ...s, hero: { ...s.hero, headline: e.target.value } }))} />
          </Field>
          <Field label="Subcopy">
            <Textarea value={c.hero.subcopy} rows={4} onChange={(e) => setC((s) => ({ ...s, hero: { ...s.hero, subcopy: e.target.value } }))} />
          </Field>
          <Field label="Specialties line">
            <Input value={c.hero.specialties} onChange={(e) => setC((s) => ({ ...s, hero: { ...s.hero, specialties: e.target.value } }))} />
          </Field>
        </Section>

        <Section title="Offer">
          <Field label="Statement">
            <Textarea value={c.offer.statement} rows={5} onChange={(e) => setC((s) => ({ ...s, offer: { ...s.offer, statement: e.target.value } }))} />
          </Field>
          <Field label="Tagline">
            <Input value={c.offer.tagline} onChange={(e) => setC((s) => ({ ...s, offer: { ...s.offer, tagline: e.target.value } }))} />
          </Field>
        </Section>

        <Section title="FAQ">
          <Field label="Section heading">
            <Input value={c.faq.heading} onChange={(e) => setC((s) => ({ ...s, faq: { ...s.faq, heading: e.target.value } }))} />
          </Field>
          <div className="space-y-4">
            {c.faq.items.map((item, i) => (
              <div key={i} className="rounded-md border border-line p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground uppercase">Q{i + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeFaqItem(i)}
                    className="text-xs text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
                <div className="mt-2 space-y-2">
                  <Input placeholder="Question" value={item.q} onChange={(e) => updateFaqItem(i, "q", e.target.value)} />
                  <Textarea placeholder="Answer" rows={3} value={item.a} onChange={(e) => updateFaqItem(i, "a", e.target.value)} />
                </div>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addFaqItem}>
              Add question
            </Button>
          </div>
        </Section>

        <Section title="Final call-to-action">
          <Field label="Heading">
            <Input value={c.finalCta.heading} onChange={(e) => setC((s) => ({ ...s, finalCta: { ...s.finalCta, heading: e.target.value } }))} />
          </Field>
          <Field label="Subcopy">
            <Textarea value={c.finalCta.subcopy} rows={3} onChange={(e) => setC((s) => ({ ...s, finalCta: { ...s.finalCta, subcopy: e.target.value } }))} />
          </Field>
        </Section>

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={busy}>
            {busy ? "Saving…" : "Save content"}
          </Button>
          {status && <span className="text-sm text-muted-foreground">{status}</span>}
        </div>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4 border-t border-line pt-6 first:border-0 first:pt-0">
      <h2 className="text-lg font-medium">{title}</h2>
      {children}
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
