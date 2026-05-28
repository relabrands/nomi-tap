import { useState, type FormEvent } from "react";
import { X } from "lucide-react";
import { z } from "zod";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/integrations/firebase/client";

const schema = z.object({
  name: z.string().trim().min(1, "Requerido").max(120),
  position: z.string().trim().max(120).optional(),
  email: z.string().trim().email("Email inválido").max(255),
  company: z.string().trim().max(160).optional(),
});

export function LeadCaptureModal({
  open,
  onClose,
  profileId,
  recipientName,
}: {
  open: boolean;
  onClose: () => void;
  profileId: string;
  recipientName: string;
}) {
  const [form, setForm] = useState({ name: "", position: "", email: "", company: "" });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Datos inválidos");
      return;
    }
    setSubmitting(true);
    try {
      await addDoc(collection(db, "leads"), {
        profile_id: profileId,
        name: parsed.data.name,
        position: parsed.data.position || null,
        email: parsed.data.email,
        company: parsed.data.company || null,
        created_at: new Date().toISOString()
      });
    } catch (dbErr) {
      setSubmitting(false);
      setError("No se pudo enviar. Intenta de nuevo.");
      return;
    }
    setSubmitting(false);
    setDone(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        aria-label="Cerrar"
        onClick={onClose}
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm animate-in fade-in duration-200"
      />
      <div className="relative w-full max-w-md rounded-t-3xl bg-card p-6 shadow-xl animate-in slide-in-from-bottom duration-300 sm:rounded-3xl">
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        {done ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-6 w-6"><path d="M20 6 9 17l-5-5" /></svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">¡Datos enviados!</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {recipientName} recibirá tu información en breve.
            </p>
            <button
              onClick={onClose}
              className="mt-6 inline-flex h-10 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[color:var(--primary-hover)]"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              Compartir tus datos
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {recipientName} podrá contactarte directamente.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-3">
              <Field label="Nombre completo" value={form.name} onChange={(v) => setForm({ ...form, name: v })} autoFocus />
              <Field label="Posición en la empresa" value={form.position} onChange={(v) => setForm({ ...form, position: v })} />
              <Field label="Correo corporativo" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
              <Field label="Empresa" value={form.company} onChange={(v) => setForm({ ...form, company: v })} />

              {error && <p className="text-xs font-medium text-destructive">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 flex w-full items-center justify-center rounded-2xl bg-primary px-6 py-3.5 text-[15px] font-semibold text-primary-foreground transition-all hover:bg-[color:var(--primary-hover)] active:scale-[0.985] disabled:opacity-60"
              >
                {submitting ? "Enviando..." : "Enviar"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  autoFocus,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoFocus?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus={autoFocus}
        className="mt-1 block w-full rounded-xl border border-border bg-background px-4 py-3 text-[15px] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15"
      />
    </label>
  );
}
