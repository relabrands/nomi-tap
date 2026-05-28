import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/integrations/firebase/client";
import { useAuth } from "@/lib/auth";
import { ArrowLeft, Plus, Trash2, Save, ExternalLink, Upload, Inbox } from "lucide-react";

export const Route = createFileRoute("/_authenticated/profiles/$id")({
  head: () => ({ meta: [{ title: "Editar perfil — Nomi" }] }),
  component: EditProfilePage,
});

type Profile = {
  id: string; user_id: string; slug: string; name: string; title: string | null; bio: string | null;
  avatar_url: string | null; email: string | null; phone: string | null; website: string | null;
  calendly_url: string | null; b2b_links: { label: string; url: string }[];
};
type SocialRow = { id: string; type: string; label: string; url: string; sort_order: number };
type Lead = { id: string; name: string; position: string | null; email: string; company: string | null; created_at: string };

const SOCIAL_TYPES = [
  { value: "email", label: "Email" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "website", label: "Website" },
  { value: "twitter", label: "Twitter / X" },
  { value: "instagram", label: "Instagram" },
  { value: "youtube", label: "YouTube" },
  { value: "github", label: "GitHub" },
  { value: "phone", label: "Teléfono" },
  { value: "other", label: "Otro" },
];

function EditProfilePage() {
  const { id } = Route.useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [socials, setSocials] = useState<SocialRow[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const pSnap = await getDoc(doc(db, "profiles", id));
    const slSnap = await getDocs(query(collection(db, "social_links"), where("profile_id", "==", id), orderBy("sort_order")));
    const ldSnap = await getDocs(query(collection(db, "leads"), where("profile_id", "==", id), orderBy("created_at", "desc")));
    
    if (pSnap.exists()) {
      const p = { id: pSnap.id, ...pSnap.data() } as Profile;
      setProfile({ ...p, b2b_links: (p.b2b_links as Profile["b2b_links"]) ?? [] });
    }
    setSocials(slSnap.docs.map(d => ({ id: d.id, ...d.data() }) as SocialRow));
    setLeads(ldSnap.docs.map(d => ({ id: d.id, ...d.data() }) as Lead));
    setLoading(false);
  };

  useEffect(() => { load(); }, [id]);

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true); setMsg(null);
    try {
      await updateDoc(doc(db, "profiles", profile.id), {
        name: profile.name, slug: profile.slug, title: profile.title ?? null, bio: profile.bio ?? null,
        avatar_url: profile.avatar_url ?? null, email: profile.email ?? null, phone: profile.phone ?? null,
        website: profile.website ?? null, calendly_url: profile.calendly_url ?? null, b2b_links: profile.b2b_links ?? [],
      });
      setMsg("Guardado");
    } catch (err: any) {
      setMsg(err.message);
    }
    setSaving(false);
    setTimeout(() => setMsg(null), 2500);
  };

  const handleAvatarUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user || !profile) return;
    setUploadingAvatar(true);
    const ext = file.name.split(".").pop();
    const path = `${user.uid}/${profile.id}-${Date.now()}.${ext}`;
    try {
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);
      const publicUrl = await getDownloadURL(storageRef);
      setProfile({ ...profile, avatar_url: publicUrl });
    } catch (err) {
      console.error(err);
    }
    setUploadingAvatar(false);
  };

  const addSocial = async () => {
    const newDoc = await addDoc(collection(db, "social_links"), { profile_id: id, type: "website", label: "Nuevo", url: "https://", sort_order: socials.length });
    setSocials([...socials, { id: newDoc.id, type: "website", label: "Nuevo", url: "https://", sort_order: socials.length }]);
  };
  const updateSocial = async (s: SocialRow) => {
    await updateDoc(doc(db, "social_links", s.id), { type: s.type, label: s.label, url: s.url });
  };
  const removeSocial = async (sid: string) => {
    await deleteDoc(doc(db, "social_links", sid));
    setSocials(socials.filter((s) => s.id !== sid));
  };

  const addB2B = () => profile && setProfile({ ...profile, b2b_links: [...profile.b2b_links, { label: "", url: "" }] });
  const updateB2B = (i: number, patch: Partial<{ label: string; url: string }>) => {
    if (!profile) return;
    const next = [...profile.b2b_links];
    next[i] = { ...next[i], ...patch };
    setProfile({ ...profile, b2b_links: next });
  };
  const removeB2B = (i: number) => profile && setProfile({ ...profile, b2b_links: profile.b2b_links.filter((_, idx) => idx !== i) });

  const deleteLead = async (lid: string) => {
    await deleteDoc(doc(db, "leads", lid));
    setLeads(leads.filter((l) => l.id !== lid));
  };

  if (loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </main>
    );
  }
  if (!profile) {
    return (
      <main className="mx-auto max-w-md px-5 py-20 text-center">
        <p className="text-muted-foreground">Perfil no encontrado.</p>
        <button onClick={() => navigate({ to: "/dashboard" })} className="mt-4 text-sm font-medium text-primary hover:underline">Volver al panel</button>
      </main>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-8">
      <div className="flex items-center justify-between gap-3">
        <Link to="/dashboard" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Panel
        </Link>
        <div className="flex items-center gap-2">
          <a href={`/p/${profile.slug}`} target="_blank" rel="noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium hover:bg-secondary">
            <ExternalLink className="h-3.5 w-3.5" /> Ver pública
          </a>
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-[color:var(--primary-hover)] disabled:opacity-60">
            <Save className="h-3.5 w-3.5" /> {saving ? "..." : "Guardar"}
          </button>
        </div>
      </div>
      {msg && <p className="mt-3 text-xs font-medium text-primary">{msg}</p>}

      {/* Basics */}
      <Section title="Datos básicos">
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 overflow-hidden rounded-full bg-secondary">
            {profile.avatar_url ? <img src={profile.avatar_url} className="h-full w-full object-cover" alt="" />
              : <div className="flex h-full w-full items-center justify-center text-xl font-semibold text-muted-foreground">{profile.name.charAt(0).toUpperCase()}</div>}
          </div>
          <div>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleAvatarUpload} />
            <button onClick={() => fileRef.current?.click()} disabled={uploadingAvatar}
              className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium hover:bg-secondary disabled:opacity-60">
              <Upload className="h-3.5 w-3.5" /> {uploadingAvatar ? "Subiendo..." : "Cambiar foto"}
            </button>
            <p className="mt-1 text-[11px] text-muted-foreground">JPG / PNG, recomendado 400x400</p>
          </div>
        </div>
        <Grid>
          <Field label="Nombre" value={profile.name} onChange={(v) => setProfile({ ...profile, name: v })} />
          <Field label="Slug (URL)" value={profile.slug} onChange={(v) => setProfile({ ...profile, slug: v.toLowerCase().replace(/[^a-z0-9-]/g, "-") })} />
          <Field label="Cargo / Título" value={profile.title ?? ""} onChange={(v) => setProfile({ ...profile, title: v })} />
          <Field label="Email" value={profile.email ?? ""} onChange={(v) => setProfile({ ...profile, email: v })} />
          <Field label="Teléfono" value={profile.phone ?? ""} onChange={(v) => setProfile({ ...profile, phone: v })} />
          <Field label="Website" value={profile.website ?? ""} onChange={(v) => setProfile({ ...profile, website: v })} />
          <Field label="URL Calendly" value={profile.calendly_url ?? ""} onChange={(v) => setProfile({ ...profile, calendly_url: v })} full />
        </Grid>
        <label className="mt-3 block">
          <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Bio</span>
          <textarea rows={3} value={profile.bio ?? ""} onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            className="mt-1 block w-full rounded-xl border border-border bg-background px-4 py-2.5 text-[14px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" />
        </label>
      </Section>

      {/* Social Links */}
      <Section title="Links sociales" action={<SmallBtn onClick={addSocial}><Plus className="h-3.5 w-3.5" /> Añadir</SmallBtn>}>
        {socials.length === 0 && <p className="text-sm text-muted-foreground">Sin links sociales todavía.</p>}
        <div className="space-y-2">
          {socials.map((s, idx) => (
            <div key={s.id} className="flex gap-2">
              <select value={s.type}
                onChange={(e) => { const next = [...socials]; next[idx] = { ...s, type: e.target.value }; setSocials(next); updateSocial(next[idx]); }}
                className="rounded-lg border border-border bg-background px-2 py-2 text-sm">
                {SOCIAL_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
              <input value={s.label} placeholder="Etiqueta"
                onChange={(e) => { const next = [...socials]; next[idx] = { ...s, label: e.target.value }; setSocials(next); }}
                onBlur={() => updateSocial(socials[idx])}
                className="w-32 rounded-lg border border-border bg-background px-3 py-2 text-sm" />
              <input value={s.url} placeholder="https://..."
                onChange={(e) => { const next = [...socials]; next[idx] = { ...s, url: e.target.value }; setSocials(next); }}
                onBlur={() => updateSocial(socials[idx])}
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm" />
              <button onClick={() => removeSocial(s.id)} className="rounded-lg border border-border px-3 text-destructive hover:bg-destructive/10">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </Section>

      {/* B2B Links */}
      <Section title="Links B2B destacados" action={<SmallBtn onClick={addB2B}><Plus className="h-3.5 w-3.5" /> Añadir</SmallBtn>}>
        {profile.b2b_links.length === 0 && <p className="text-sm text-muted-foreground">Ej: "Portal para Empresas", "Ver Pitch Deck".</p>}
        <div className="space-y-2">
          {profile.b2b_links.map((b, i) => (
            <div key={i} className="flex gap-2">
              <input value={b.label} placeholder="Etiqueta" onChange={(e) => updateB2B(i, { label: e.target.value })}
                className="w-48 rounded-lg border border-border bg-background px-3 py-2 text-sm" />
              <input value={b.url} placeholder="https://..." onChange={(e) => updateB2B(i, { url: e.target.value })}
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm" />
              <button onClick={() => removeB2B(i)} className="rounded-lg border border-border px-3 text-destructive hover:bg-destructive/10">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">Recuerda guardar para aplicar los cambios.</p>
      </Section>

      {/* Leads */}
      <Section title={`Leads recibidos (${leads.length})`} icon={Inbox}>
        {leads.length === 0 ? (
          <p className="text-sm text-muted-foreground">Aún no has recibido leads en este perfil.</p>
        ) : (
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-secondary text-xs uppercase tracking-wide text-muted-foreground">
                <tr><th className="px-3 py-2 text-left">Nombre</th><th className="px-3 py-2 text-left">Empresa</th><th className="px-3 py-2 text-left">Email</th><th className="px-3 py-2 text-left">Fecha</th><th></th></tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <tr key={l.id} className="border-t border-border">
                    <td className="px-3 py-2 font-medium">{l.name}{l.position && <span className="block text-xs text-muted-foreground">{l.position}</span>}</td>
                    <td className="px-3 py-2 text-muted-foreground">{l.company ?? "—"}</td>
                    <td className="px-3 py-2"><a href={`mailto:${l.email}`} className="text-primary hover:underline">{l.email}</a></td>
                    <td className="px-3 py-2 text-xs text-muted-foreground">{new Date(l.created_at).toLocaleDateString()}</td>
                    <td className="px-3 py-2 text-right">
                      <button onClick={() => deleteLead(l.id)} className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>
    </div>
  );
}

function Section({ title, action, icon: Icon, children }: { title: string; action?: React.ReactNode; icon?: typeof Inbox; children: React.ReactNode }) {
  return (
    <section className="mt-8 rounded-2xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground">
          {Icon && <Icon className="h-4 w-4" />} {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}
function Grid({ children }: { children: React.ReactNode }) {
  return <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">{children}</div>;
}
function Field({ label, value, onChange, full }: { label: string; value: string; onChange: (v: string) => void; full?: boolean }) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-xl border border-border bg-background px-4 py-2.5 text-[14px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" />
    </label>
  );
}
function SmallBtn({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium hover:bg-secondary">
      {children}
    </button>
  );
}
