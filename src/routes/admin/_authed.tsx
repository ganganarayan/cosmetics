import { createFileRoute, Link, Outlet, useRouter } from "@tanstack/react-router";
import { ensureAdmin, logout } from "@/server/actions";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/_authed")({
  beforeLoad: async () => {
    await ensureAdmin();
  },
  head: () => ({
    meta: [{ name: "robots", content: "noindex" }],
  }),
  component: AdminLayout,
});

const NAV = [
  { to: "/admin", label: "Overview", exact: true },
  { to: "/admin/settings", label: "Settings", exact: false },
  { to: "/admin/content", label: "Content", exact: false },
  { to: "/admin/leads", label: "Leads", exact: false },
  { to: "/admin/analytics", label: "Analytics", exact: false },
] as const;

function AdminLayout() {
  const router = useRouter();

  async function onLogout() {
    await logout();
    await router.navigate({ to: "/admin/login" });
  }

  return (
    <div className="min-h-screen bg-background text-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-8 md:flex-row">
        <aside className="md:w-56 md:shrink-0">
          <div className="flex items-center justify-between">
            <p className="font-mono text-sm tracking-[0.18em] text-ink uppercase">Divine Leads</p>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Admin</p>
          <nav className="mt-6 flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.exact }}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-ink [&.active]:bg-accent [&.active]:font-medium [&.active]:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Button variant="outline" onClick={onLogout} className="mt-6 w-full">
            Sign out
          </Button>
        </aside>

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
