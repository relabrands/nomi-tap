import { j as jsxRuntimeExports } from "./_libs/react.mjs";
import { u as useNavigate, e as useRouterState, N as Navigate, L as Link, O as Outlet } from "./_libs/tanstack__react-router.mjs";
import { u as useAuth } from "./_ssr/router-CJmoGG_D.mjs";
import { N as NomiLogo } from "./_ssr/NomiLogo-BARLlcp4.mjs";
import "./_libs/firebase__auth.mjs";
import "./_libs/firebase__app.mjs";
import "./_libs/firebase__logger.mjs";
import "./_libs/firebase.mjs";
import "./_libs/firebase__firestore.mjs";
import "./_libs/firebase__storage.mjs";
import { L as LayoutDashboard, I as Inbox, g as LogOut } from "./_libs/lucide-react.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/seroval.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "async_hooks";
import "stream";
import "util";
import "crypto";
import "./_libs/isbot.mjs";
import "./_libs/tanstack__query-core.mjs";
import "./_libs/tanstack__react-query.mjs";
import "./_libs/firebase__util.mjs";
import "./_libs/firebase__component.mjs";
import "./_libs/idb.mjs";
import "./_libs/firebase__webchannel-wrapper.mjs";
import "./_libs/@grpc/grpc-js.mjs";
import "process";
import "tls";
import "fs";
import "os";
import "net";
import "events";
import "http2";
import "http";
import "url";
import "dns";
import "zlib";
import "./_libs/@grpc/proto-loader.mjs";
import "path";
import "./_libs/lodash.camelcase.mjs";
import "./_libs/protobufjs.mjs";
import "./_libs/protobufjs__aspromise.mjs";
import "./_libs/protobufjs__base64.mjs";
import "./_libs/protobufjs__eventemitter.mjs";
import "./_libs/protobufjs__float.mjs";
import "./_libs/@protobufjs/inquire.mjs";
import "./_libs/protobufjs__utf8.mjs";
import "./_libs/protobufjs__pool.mjs";
import "./_libs/long.mjs";
import "./_libs/protobufjs__codegen.mjs";
import "./_libs/protobufjs__fetch.mjs";
import "./_libs/protobufjs__path.mjs";
function AuthenticatedLayout() {
  const {
    session,
    loading,
    signOut,
    user
  } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({
    select: (s) => s.location.pathname
  });
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex min-h-screen items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" }) });
  }
  if (!session) return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/login" });
  const handleSignOut = async () => {
    await signOut();
    navigate({
      to: "/login"
    });
  };
  const navItems = [{
    to: "/dashboard",
    label: "Perfiles",
    icon: LayoutDashboard
  }, {
    to: "/leads",
    label: "Leads",
    icon: Inbox
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-14 max-w-5xl items-center justify-between px-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", className: "flex items-center gap-2 text-sm font-semibold tracking-tight", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(NomiLogo, {}),
        " Nomi"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-1", children: [
        navItems.map((n) => {
          const Icon = n.icon;
          const active = pathname.startsWith(n.to);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: n.to, className: `flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${active ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: n.label })
          ] }, n.to);
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-2 hidden text-xs text-muted-foreground sm:inline", children: user?.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleSignOut, className: "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Salir" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {})
  ] });
}
export {
  AuthenticatedLayout as component
};
