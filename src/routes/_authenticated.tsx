import { createFileRoute, Outlet, Navigate, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { NomiLogo } from "@/components/NomiLogo";
import { LogOut, LayoutDashboard, Inbox } from "lucide-react";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { session, loading, signOut, user } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </main>
    );
  }
  if (!session) return <Navigate to="/login" />;

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/login" });
  };

  const navItems = [
    { to: "/dashboard", label: "Perfiles", icon: LayoutDashboard },
    { to: "/leads", label: "Leads", icon: Inbox },
  ] as const;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
          <Link to="/dashboard" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
            <NomiLogo /> Nomi
          </Link>
          <nav className="flex items-center gap-1">
            {navItems.map((n) => {
              const Icon = n.icon;
              const active = pathname.startsWith(n.to);
              return (
                <Link key={n.to} to={n.to}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${active ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{n.label}</span>
                </Link>
              );
            })}
            <span className="mx-2 hidden text-xs text-muted-foreground sm:inline">{user?.email}</span>
            <button onClick={handleSignOut}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </nav>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
