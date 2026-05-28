import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { q as query, o as orderBy, w as where, c as collection, e as getDocs, d as deleteDoc, b as doc, a as addDoc } from "../_libs/firebase__firestore.mjs";
import { u as useAuth, d as db } from "./router-CJmoGG_D.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__storage.mjs";
import { j as Plus, P as Pencil, E as ExternalLink, T as Trash2 } from "../_libs/lucide-react.mjs";
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
function DashboardPage() {
  const {
    user
  } = useAuth();
  const [profiles, setProfiles] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [creating, setCreating] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    name: "",
    slug: "",
    title: ""
  });
  const [error, setError] = reactExports.useState(null);
  const load = async () => {
    setLoading(true);
    if (!user) return;
    const qProfiles = query(collection(db, "profiles"), where("user_id", "==", user.uid), orderBy("updated_at", "desc"));
    const snapshot = await getDocs(qProfiles);
    const data = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data()
    }));
    setProfiles(data);
    setLoading(false);
  };
  reactExports.useEffect(() => {
    load();
  }, []);
  const handleCreate = async (e) => {
    e.preventDefault();
    setError(null);
    if (!user) return;
    const slug = form.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
    if (!/^[a-z0-9][a-z0-9-]{1,40}$/.test(slug)) {
      setError("Slug inválido (solo letras, números y guiones).");
      return;
    }
    try {
      await addDoc(collection(db, "profiles"), {
        user_id: user.uid,
        name: form.name.trim(),
        slug,
        title: form.title.trim() || null,
        updated_at: (/* @__PURE__ */ new Date()).toISOString(),
        created_at: (/* @__PURE__ */ new Date()).toISOString()
      });
      setForm({
        name: "",
        slug: "",
        title: ""
      });
      setCreating(false);
      load();
    } catch (err) {
      setError(err.message);
    }
  };
  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar este perfil? Esta acción no se puede deshacer.")) return;
    await deleteDoc(doc(db, "profiles", id));
    load();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-5 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground", children: "Tus perfiles" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Gestiona las tarjetas digitales de tu equipo." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setCreating(true), className: "flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[color:var(--primary-hover)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " Nuevo perfil"
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" }) }) : profiles.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 rounded-2xl border border-dashed border-border bg-card p-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Aún no tienes perfiles." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setCreating(true), className: "mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-[color:var(--primary-hover)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " Crear el primero"
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3", children: profiles.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-[var(--shadow-soft)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 overflow-hidden rounded-full bg-secondary", children: p.avatar_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.avatar_url, alt: p.name, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center text-sm font-semibold text-muted-foreground", children: p.name.charAt(0).toUpperCase() }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-semibold text-foreground", children: p.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs text-muted-foreground", children: p.title ?? `/p/${p.slug}` })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/profiles/$id", params: {
          id: p.id
        }, className: "flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }),
          " Editar"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `/p/${p.slug}`, target: "_blank", rel: "noreferrer", className: "flex items-center justify-center rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleDelete(p.id), className: "flex items-center justify-center rounded-lg border border-border px-3 py-2 text-xs font-medium text-destructive hover:bg-destructive/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
      ] })
    ] }, p.id)) }),
    creating && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCreating(false), className: "absolute inset-0 bg-foreground/40 backdrop-blur-sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleCreate, className: "relative w-full max-w-md rounded-3xl bg-card p-6 shadow-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold tracking-tight text-foreground", children: "Nuevo perfil" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Empieza con lo básico; podrás editar el resto." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Nombre completo", value: form.name, onChange: (v) => setForm({
            ...form,
            name: v
          }), required: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Slug (URL pública)", value: form.slug, onChange: (v) => setForm({
            ...form,
            slug: v
          }), placeholder: "alex-rivera", required: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Cargo / Título", value: form.title, onChange: (v) => setForm({
            ...form,
            title: v
          }), placeholder: "CEO @ Nomi" })
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs font-medium text-destructive", children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setCreating(false), className: "flex-1 rounded-xl border border-border px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary", children: "Cancelar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-[color:var(--primary-hover)]", children: "Crear" })
        ] })
      ] })
    ] })
  ] });
}
function Input({
  label,
  value,
  onChange,
  placeholder,
  required
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-medium uppercase tracking-wide text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value, onChange: (e) => onChange(e.target.value), placeholder, required, className: "mt-1 block w-full rounded-xl border border-border bg-background px-4 py-2.5 text-[14px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" })
  ] });
}
export {
  DashboardPage as component
};
