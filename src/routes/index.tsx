import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Zap, Users, BarChart3 } from "lucide-react";
import { NomiLogo } from "@/components/NomiLogo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nomi — Tarjetas de presentación NFC" },
      { name: "description", content: "Tarjetas digitales con NFC. Una sola tap y comparten todo lo que eres." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <main className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
        <Link to="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <NomiLogo /> Nomi
        </Link>
        <nav className="flex items-center gap-2">
          <Link to="/login" className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">Acceder</Link>
          <Link to="/login" className="rounded-lg bg-primary px-3.5 py-1.5 text-sm font-semibold text-primary-foreground hover:bg-[color:var(--primary-hover)]">Empezar</Link>
        </nav>
      </header>

      <section className="mx-auto max-w-3xl px-5 pb-20 pt-16 text-center sm:pt-24">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Networking inteligente
        </span>
        <h1 className="mt-6 text-balance text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
          Tu tarjeta de presentación, <span className="text-primary">a un tap</span>.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-[17px] leading-relaxed text-muted-foreground">
          Comparte todo lo que eres con un solo gesto. Sin apps, sin fricción.
          Captura leads en vivo y gestiona los perfiles de tu equipo desde un panel limpio.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/login" className="flex items-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-[15px] font-semibold text-primary-foreground shadow-[0_8px_24px_-10px_oklch(0.66_0.17_142/0.6)] hover:bg-[color:var(--primary-hover)]">
            Crear mi tarjeta <ArrowRight className="h-4 w-4" />
          </Link>
          <a href="/p/alex-rivera" className="rounded-2xl border-2 border-border bg-card px-6 py-3 text-[15px] font-semibold text-foreground hover:border-primary/40">
            Ver demo
          </a>
        </div>
      </section>

      <section className="mx-auto grid max-w-4xl grid-cols-1 gap-3 px-5 pb-24 sm:grid-cols-3">
        <Feat icon={Zap} title="NFC instantáneo" desc="Una tap y tu contacto se guarda. Funciona en cualquier iPhone o Android." />
        <Feat icon={Users} title="Multi-perfil" desc="Gestiona tarjetas para todo tu equipo desde un solo panel." />
        <Feat icon={BarChart3} title="Captura de leads" desc="Cada visitante puede compartir sus datos contigo. Recíbelos en tu inbox." />
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-6 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">Powered by <NomiLogo /> Nomi</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </main>
  );
}

function Feat({ icon: Icon, title, desc }: { icon: typeof Zap; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-4 w-4" strokeWidth={2.2} />
      </div>
      <h3 className="mt-4 text-sm font-semibold tracking-tight text-foreground">{title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
    </div>
  );
}
