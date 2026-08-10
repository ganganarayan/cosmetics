import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { adminGetSettings, adminSaveSettings } from "@/server/actions";
import type { Settings } from "@/server/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/admin/_authed/settings")({
  loader: () => adminGetSettings(),
  component: SettingsPage,
});

const FIELDS: Array<{ key: keyof Settings; label: string; hint?: string; placeholder?: string }> = [
  { key: "assessmentUrl", label: "Assessment URL", hint: "Every CTA links here (your Assess360 form).", placeholder: "https://…" },
  { key: "contactEmail", label: "Contact email" },
  { key: "whatsappNumber", label: "WhatsApp number", hint: "Digits only, with country code (e.g. 919356819176)." },
  { key: "ga4Id", label: "GA4 measurement ID", placeholder: "G-XXXXXXXXXX" },
  { key: "metaPixelId", label: "Meta Pixel ID" },
];

function SettingsPage() {
  const initial = Route.useLoaderData();
  const router = useRouter();
  const [form, setForm] = useState<Settings>(initial);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setStatus("");
    try {
      await adminSaveSettings({ data: form });
      setStatus("Saved.");
      await router.invalidate();
    } catch {
      setStatus("Save failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        These take effect immediately on the live site — no redeploy needed.
      </p>

      <form onSubmit={onSave} className="mt-6 space-y-5">
        {FIELDS.map((f) => (
          <div key={f.key} className="space-y-1.5">
            <Label htmlFor={f.key}>{f.label}</Label>
            <Input
              id={f.key}
              value={form[f.key]}
              placeholder={f.placeholder}
              onChange={(e) => setForm((s) => ({ ...s, [f.key]: e.target.value }))}
            />
            {f.hint && <p className="text-xs text-muted-foreground">{f.hint}</p>}
          </div>
        ))}

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={busy}>
            {busy ? "Saving…" : "Save settings"}
          </Button>
          {status && <span className="text-sm text-muted-foreground">{status}</span>}
        </div>
      </form>
    </div>
  );
}
