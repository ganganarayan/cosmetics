import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { login } from "@/server/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [{ title: "Admin Login | Divine Leads" }, { name: "robots", content: "noindex" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await login({ data: { password } });
      if (res.ok) {
        await router.navigate({ to: "/admin" });
      } else {
        setError(res.error);
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-lg border border-line bg-card p-8">
        <h1 className="text-xl font-semibold text-ink">Admin sign in</h1>
        <p className="mt-1 text-sm text-muted-foreground">Divine Leads dashboard</p>

        <div className="mt-6 space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            autoFocus
          />
        </div>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <Button type="submit" disabled={busy} className="mt-6 w-full">
          {busy ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
