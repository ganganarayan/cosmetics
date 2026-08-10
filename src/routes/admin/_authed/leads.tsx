import { createFileRoute } from "@tanstack/react-router";
import { adminListLeads } from "@/server/actions";

export const Route = createFileRoute("/admin/_authed/leads")({
  loader: () => adminListLeads(),
  component: LeadsPage,
});

function LeadsPage() {
  const leads = Route.useLoaderData();

  return (
    <div>
      <h1 className="text-2xl font-semibold">Leads</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Enquiries captured on the site. There is no on-site form yet — your funnel currently sends
        visitors to the Assess360 assessment, so this stays empty until a capture source is wired.
      </p>

      {leads.length === 0 ? (
        <div className="mt-6 rounded-lg border border-dashed border-line p-8 text-center text-sm text-muted-foreground">
          No leads yet.
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-lg border border-line">
          <table className="w-full text-left text-sm">
            <thead className="bg-accent text-xs text-muted-foreground uppercase">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Clinic</th>
                <th className="px-4 py-3">City</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Message</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id} className="border-t border-line align-top">
                  <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                    {new Date(l.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">{l.name}</td>
                  <td className="px-4 py-3">{l.clinic}</td>
                  <td className="px-4 py-3">{l.city}</td>
                  <td className="px-4 py-3">{l.contact}</td>
                  <td className="px-4 py-3 text-muted-foreground">{l.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
