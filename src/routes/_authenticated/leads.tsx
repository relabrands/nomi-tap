import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { collection, query, getDocs, doc, deleteDoc, orderBy } from "firebase/firestore";
import { db } from "@/integrations/firebase/client";
import { Trash2, Inbox } from "lucide-react";

export const Route = createFileRoute("/_authenticated/leads")({
  head: () => ({ meta: [{ title: "Leads — Nomi" }] }),
  component: LeadsPage,
});

type LeadJoined = {
  id: string; name: string; position: string | null; email: string; company: string | null; created_at: string;
  profile: { id: string; name: string; slug: string } | null;
};

function LeadsPage() {
  const [leads, setLeads] = useState<LeadJoined[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const qLeads = query(collection(db, "leads"), orderBy("created_at", "desc"));
    const snapshot = await getDocs(qLeads);
    const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as any));
    setLeads(data);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const remove = async (id: string) => {
    await deleteDoc(doc(db, "leads", id));
    setLeads(leads.filter((l) => l.id !== id));
  };

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Leads capturados</h1>
        <p className="mt-1 text-sm text-muted-foreground">Todas las personas que compartieron sus datos contigo.</p>
      </div>

      {loading ? (
        <div className="mt-10 flex justify-center"><div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>
      ) : leads.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-border bg-card p-10 text-center">
          <Inbox className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">Aún no has recibido ningún lead.</p>
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left">Contacto</th>
                <th className="px-4 py-3 text-left">Empresa</th>
                <th className="px-4 py-3 text-left">Perfil</th>
                <th className="px-4 py-3 text-left">Fecha</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id} className="border-t border-border">
                  <td className="px-4 py-3">
                    <div className="font-medium text-foreground">{l.name}</div>
                    <div className="text-xs text-muted-foreground">{l.position ?? "—"}</div>
                    <a href={`mailto:${l.email}`} className="text-xs text-primary hover:underline">{l.email}</a>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{l.company ?? "—"}</td>
                  <td className="px-4 py-3">
                    {l.profile ? (
                      <Link to="/profiles/$id" params={{ id: l.profile.id }} className="text-foreground hover:text-primary">{l.profile.name}</Link>
                    ) : <span className="text-muted-foreground">—</span>}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(l.created_at).toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => remove(l.id)} className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
