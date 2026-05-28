import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { collection, query, where, getDocs, addDoc, deleteDoc, doc, orderBy } from "firebase/firestore";
import { db } from "@/integrations/firebase/client";
import { useAuth } from "@/lib/auth";
import { Plus, ExternalLink, Pencil, Trash2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Panel — Nomi" }] }),
  component: DashboardPage,
});

type ProfileRow = {
  id: string; slug: string; name: string; title: string | null; avatar_url: string | null; updated_at: string;
};

function DashboardPage() {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<ProfileRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ name: "", slug: "", title: "" });
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    if (!user) return;
    try {
      const qProfiles = query(collection(db, "profiles"), where("user_id", "==", user.uid), orderBy("updated_at", "desc"));
      const snapshot = await getDocs(qProfiles);
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as ProfileRow));
      setProfiles(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!user) return;
    const slug = form.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
    if (!/^[a-z0-9][a-z0-9-]{1,40}$/.test(slug)) {
      setError("Slug inválido (solo letras, números y guiones).");
      return;
    }
    try {
      setIsSubmitting(true);
      await addDoc(collection(db, "profiles"), {
        user_id: user.uid,
        name: form.name.trim(),
        slug,
        title: form.title.trim() || null,
        updated_at: new Date().toISOString(),
        created_at: new Date().toISOString()
      });
      setForm({ name: "", slug: "", title: "" });
      setCreating(false);
      load();
    } catch (err: any) {
      console.error("Firebase Create Error:", err);
      setError(err.message || "Unknown error occurred while creating.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este perfil? Esta acción no se puede deshacer.")) return;
    await deleteDoc(doc(db, "profiles", id));
    load();
  };

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Tus perfiles</h1>
          <p className="mt-1 text-sm text-muted-foreground">Gestiona las tarjetas digitales de tu equipo.</p>
        </div>
        <button onClick={() => setCreating(true)}
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[color:var(--primary-hover)]">
          <Plus className="h-4 w-4" /> Nuevo perfil
        </button>
      </div>

      {error && !creating && (
        <div className="mt-6 rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-sm font-medium text-destructive">
          Error: {error}
        </div>
      )}

      {loading ? (
        <div className="mt-10 flex justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : profiles.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-border bg-card p-10 text-center">
          <p className="text-sm text-muted-foreground">Aún no tienes perfiles.</p>
          <button onClick={() => setCreating(true)}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-[color:var(--primary-hover)]">
            <Plus className="h-4 w-4" /> Crear el primero
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {profiles.map((p) => (
            <div key={p.id} className="group rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-[var(--shadow-soft)]">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 overflow-hidden rounded-full bg-secondary">
                  {p.avatar_url ? (
                    <img src={p.avatar_url} alt={p.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-muted-foreground">
                      {p.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">{p.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{p.title ?? `/p/${p.slug}`}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Link to="/profiles/$id" params={{ id: p.id }}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary">
                  <Pencil className="h-3.5 w-3.5" /> Editar
                </Link>
                <a href={`/p/${p.slug}`} target="_blank" rel="noreferrer"
                  className="flex items-center justify-center rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary">
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <button onClick={() => handleDelete(p.id)}
                  className="flex items-center justify-center rounded-lg border border-border px-3 py-2 text-xs font-medium text-destructive hover:bg-destructive/10">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {creating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <button onClick={() => setCreating(false)} className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />
          <form onSubmit={handleCreate} className="relative w-full max-w-md rounded-3xl bg-card p-6 shadow-xl">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">Nuevo perfil</h2>
            <p className="mt-1 text-sm text-muted-foreground">Empieza con lo básico; podrás editar el resto.</p>
            <div className="mt-5 space-y-3">
              <Input label="Nombre completo" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
              <Input label="Slug (URL pública)" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} placeholder="alex-rivera" required />
              <Input label="Cargo / Título" value={form.title} onChange={(v) => setForm({ ...form, title: v })} placeholder="CEO @ Nomi" />
            </div>
            {error && <p className="mt-3 text-xs font-medium text-destructive">{error}</p>}
            <div className="mt-6 flex gap-2">
              <button type="button" onClick={() => setCreating(false)}
                className="flex-1 rounded-xl border border-border px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary">
                Cancelar
              </button>
              <button type="submit" disabled={isSubmitting}
                className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-[color:var(--primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? "Creando..." : "Crear"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function Input({ label, value, onChange, placeholder, required }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={required}
        className="mt-1 block w-full rounded-xl border border-border bg-background px-4 py-2.5 text-[14px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" />
    </label>
  );
}
