import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { N as NomiLogo } from "./NomiLogo-BARLlcp4.mjs";
import { a as ArrowRight, Z as Zap, n as Users, b as ChartColumn } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "async_hooks";
import "stream";
import "util";
import "crypto";
import "../_libs/isbot.mjs";
function Landing() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mx-auto flex max-w-5xl items-center justify-between px-5 py-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 text-sm font-semibold tracking-tight", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(NomiLogo, {}),
        " Nomi"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground", children: "Acceder" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "rounded-lg bg-primary px-3.5 py-1.5 text-sm font-semibold text-primary-foreground hover:bg-[color:var(--primary-hover)]", children: "Empezar" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-3xl px-5 pb-20 pt-16 text-center sm:pt-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-primary" }),
        " Networking inteligente"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-6 text-balance text-5xl font-bold tracking-tight text-foreground sm:text-6xl", children: [
        "Tu tarjeta de presentación, ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "a un tap" }),
        "."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-5 max-w-xl text-pretty text-[17px] leading-relaxed text-muted-foreground", children: "Comparte todo lo que eres con un solo gesto. Sin apps, sin fricción. Captura leads en vivo y gestiona los perfiles de tu equipo desde un panel limpio." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap items-center justify-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/login", className: "flex items-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-[15px] font-semibold text-primary-foreground shadow-[0_8px_24px_-10px_oklch(0.66_0.17_142/0.6)] hover:bg-[color:var(--primary-hover)]", children: [
          "Crear mi tarjeta ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/p/alex-rivera", className: "rounded-2xl border-2 border-border bg-card px-6 py-3 text-[15px] font-semibold text-foreground hover:border-primary/40", children: "Ver demo" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto grid max-w-4xl grid-cols-1 gap-3 px-5 pb-24 sm:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Feat, { icon: Zap, title: "NFC instantáneo", desc: "Una tap y tu contacto se guarda. Funciona en cualquier iPhone o Android." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Feat, { icon: Users, title: "Multi-perfil", desc: "Gestiona tarjetas para todo tu equipo desde un solo panel." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Feat, { icon: ChartColumn, title: "Captura de leads", desc: "Cada visitante puede compartir sus datos contigo. Recíbelos en tu inbox." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-5xl items-center justify-between px-5 py-6 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
        "Powered by ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(NomiLogo, {}),
        " Nomi"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear()
      ] })
    ] }) })
  ] });
}
function Feat({
  icon: Icon,
  title,
  desc
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4", strokeWidth: 2.2 }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 text-sm font-semibold tracking-tight text-foreground", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm leading-relaxed text-muted-foreground", children: desc })
  ] });
}
export {
  Landing as component
};
