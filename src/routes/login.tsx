import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/integrations/firebase/client";
import { useAuth } from "@/lib/auth";
import { NomiLogo } from "@/components/NomiLogo";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Acceder — Nomi" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) navigate({ to: "/dashboard", replace: true });
  }, [session, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "signin") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        setError("Cuenta creada y sesión iniciada.");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5">
      <div className="w-full max-w-sm">
        <Link to="/" className="mb-10 flex items-center justify-center gap-2 text-sm font-semibold tracking-tight text-foreground">
          <NomiLogo /> Nomi
        </Link>

        <div className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
          <div className="mb-6 flex rounded-xl bg-secondary p-1 text-sm font-medium">
            {(["signin", "signup"] as const).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(null); }}
                className={`flex-1 rounded-lg px-3 py-2 transition-colors ${mode === m ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
              >
                {m === "signin" ? "Acceder" : "Crear cuenta"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <label className="block">
              <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Correo</span>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-xl border border-border bg-background px-4 py-3 text-[15px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" />
            </label>
            <label className="block">
              <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Contraseña</span>
              <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-xl border border-border bg-background px-4 py-3 text-[15px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" />
            </label>

            {error && <p className="text-xs font-medium text-destructive">{error}</p>}

            <button type="submit" disabled={loading}
              className="mt-2 flex w-full items-center justify-center rounded-2xl bg-primary px-6 py-3.5 text-[15px] font-semibold text-primary-foreground transition-all hover:bg-[color:var(--primary-hover)] active:scale-[0.985] disabled:opacity-60">
              {loading ? "..." : mode === "signin" ? "Acceder" : "Crear cuenta"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
