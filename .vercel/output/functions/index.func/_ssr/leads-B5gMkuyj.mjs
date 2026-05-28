import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { q as query, o as orderBy, c as collection, e as getDocs, d as deleteDoc, b as doc } from "../_libs/firebase__firestore.mjs";
import { d as db } from "./router-CJmoGG_D.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__storage.mjs";
import { I as Inbox, T as Trash2 } from "../_libs/lucide-react.mjs";
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
import "../_libs/firebase__component.mjs";
import "../_libs/firebase__util.mjs";
import "../_libs/firebase__webchannel-wrapper.mjs";
import "../_libs/@grpc/grpc-js.mjs";
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
import "../_libs/@grpc/proto-loader.mjs";
import "path";
import "../_libs/lodash.camelcase.mjs";
import "../_libs/protobufjs.mjs";
import "../_libs/protobufjs__aspromise.mjs";
import "../_libs/protobufjs__base64.mjs";
import "../_libs/protobufjs__eventemitter.mjs";
import "../_libs/protobufjs__float.mjs";
import "../_libs/@protobufjs/inquire.mjs";
import "../_libs/protobufjs__utf8.mjs";
import "../_libs/protobufjs__pool.mjs";
import "../_libs/long.mjs";
import "../_libs/protobufjs__codegen.mjs";
import "../_libs/protobufjs__fetch.mjs";
import "../_libs/protobufjs__path.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/idb.mjs";
function LeadsPage() {
  const [leads, setLeads] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const load = async () => {
    setLoading(true);
    const qLeads = query(collection(db, "leads"), orderBy("created_at", "desc"));
    const snapshot = await getDocs(qLeads);
    const data = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data()
    }));
    setLeads(data);
    setLoading(false);
  };
  reactExports.useEffect(() => {
    load();
  }, []);
  const remove = async (id) => {
    await deleteDoc(doc(db, "leads", id));
    setLeads(leads.filter((l) => l.id !== id));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-5 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground", children: "Leads capturados" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Todas las personas que compartieron sus datos contigo." })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" }) }) : leads.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 rounded-2xl border border-dashed border-border bg-card p-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Inbox, { className: "mx-auto h-8 w-8 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Aún no has recibido ningún lead." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 overflow-hidden rounded-2xl border border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-secondary text-xs uppercase tracking-wide text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Contacto" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Empresa" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Perfil" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Fecha" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", {})
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: leads.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-foreground", children: l.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: l.position ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `mailto:${l.email}`, className: "text-xs text-primary hover:underline", children: l.email })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: l.company ?? "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: l.profile ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/profiles/$id", params: {
          id: l.profile.id
        }, className: "text-foreground hover:text-primary", children: l.profile.name }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground", children: new Date(l.created_at).toLocaleString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => remove(l.id), className: "rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) }) })
      ] }, l.id)) })
    ] }) })
  ] });
}
export {
  LeadsPage as component
};
