import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { g as getDoc, b as doc, e as getDocs, q as query, o as orderBy, w as where, c as collection, u as updateDoc, d as deleteDoc, a as addDoc } from "../_libs/firebase__firestore.mjs";
import { r as ref, u as uploadBytes, g as getDownloadURL } from "../_libs/firebase__storage.mjs";
import { a as Route, u as useAuth, d as db, s as storage } from "./router-CJmoGG_D.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase.mjs";
import { A as ArrowLeft, E as ExternalLink, S as Save, U as Upload, T as Trash2, j as Plus, I as Inbox } from "../_libs/lucide-react.mjs";
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
const SOCIAL_TYPES = [{
  value: "email",
  label: "Email"
}, {
  value: "whatsapp",
  label: "WhatsApp"
}, {
  value: "linkedin",
  label: "LinkedIn"
}, {
  value: "website",
  label: "Website"
}, {
  value: "twitter",
  label: "Twitter / X"
}, {
  value: "instagram",
  label: "Instagram"
}, {
  value: "youtube",
  label: "YouTube"
}, {
  value: "github",
  label: "GitHub"
}, {
  value: "phone",
  label: "Teléfono"
}, {
  value: "other",
  label: "Otro"
}];
function EditProfilePage() {
  const {
    id
  } = Route.useParams();
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const fileRef = reactExports.useRef(null);
  const [profile, setProfile] = reactExports.useState(null);
  const [socials, setSocials] = reactExports.useState([]);
  const [leads, setLeads] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  const [uploadingAvatar, setUploadingAvatar] = reactExports.useState(false);
  const [msg, setMsg] = reactExports.useState(null);
  const load = async () => {
    setLoading(true);
    const pSnap = await getDoc(doc(db, "profiles", id));
    const slSnap = await getDocs(query(collection(db, "social_links"), where("profile_id", "==", id), orderBy("sort_order")));
    const ldSnap = await getDocs(query(collection(db, "leads"), where("profile_id", "==", id), orderBy("created_at", "desc")));
    if (pSnap.exists()) {
      const p = {
        id: pSnap.id,
        ...pSnap.data()
      };
      setProfile({
        ...p,
        b2b_links: p.b2b_links ?? []
      });
    }
    setSocials(slSnap.docs.map((d) => ({
      id: d.id,
      ...d.data()
    })));
    setLeads(ldSnap.docs.map((d) => ({
      id: d.id,
      ...d.data()
    })));
    setLoading(false);
  };
  reactExports.useEffect(() => {
    load();
  }, [id]);
  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    setMsg(null);
    try {
      await updateDoc(doc(db, "profiles", profile.id), {
        name: profile.name,
        slug: profile.slug,
        title: profile.title,
        bio: profile.bio,
        avatar_url: profile.avatar_url,
        email: profile.email,
        phone: profile.phone,
        website: profile.website,
        calendly_url: profile.calendly_url,
        b2b_links: profile.b2b_links
      });
      setMsg("Guardado");
    } catch (err) {
      setMsg(err.message);
    }
    setSaving(false);
    setTimeout(() => setMsg(null), 2500);
  };
  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !user || !profile) return;
    setUploadingAvatar(true);
    const ext = file.name.split(".").pop();
    const path = `${user.uid}/${profile.id}-${Date.now()}.${ext}`;
    try {
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);
      const publicUrl = await getDownloadURL(storageRef);
      setProfile({
        ...profile,
        avatar_url: publicUrl
      });
    } catch (err) {
      console.error(err);
    }
    setUploadingAvatar(false);
  };
  const addSocial = async () => {
    const newDoc = await addDoc(collection(db, "social_links"), {
      profile_id: id,
      type: "website",
      label: "Nuevo",
      url: "https://",
      sort_order: socials.length
    });
    setSocials([...socials, {
      id: newDoc.id,
      type: "website",
      label: "Nuevo",
      url: "https://",
      sort_order: socials.length
    }]);
  };
  const updateSocial = async (s) => {
    await updateDoc(doc(db, "social_links", s.id), {
      type: s.type,
      label: s.label,
      url: s.url
    });
  };
  const removeSocial = async (sid) => {
    await deleteDoc(doc(db, "social_links", sid));
    setSocials(socials.filter((s) => s.id !== sid));
  };
  const addB2B = () => profile && setProfile({
    ...profile,
    b2b_links: [...profile.b2b_links, {
      label: "",
      url: ""
    }]
  });
  const updateB2B = (i, patch) => {
    if (!profile) return;
    const next = [...profile.b2b_links];
    next[i] = {
      ...next[i],
      ...patch
    };
    setProfile({
      ...profile,
      b2b_links: next
    });
  };
  const removeB2B = (i) => profile && setProfile({
    ...profile,
    b2b_links: profile.b2b_links.filter((_, idx) => idx !== i)
  });
  const deleteLead = async (lid) => {
    await deleteDoc(doc(db, "leads", lid));
    setLeads(leads.filter((l) => l.id !== lid));
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex min-h-[60vh] items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" }) });
  }
  if (!profile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-md px-5 py-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Perfil no encontrado." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
        to: "/dashboard"
      }), className: "mt-4 text-sm font-medium text-primary hover:underline", children: "Volver al panel" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-5 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", className: "flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Panel"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `/p/${profile.slug}`, target: "_blank", rel: "noreferrer", className: "flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium hover:bg-secondary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" }),
          " Ver pública"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleSave, disabled: saving, className: "flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-[color:var(--primary-hover)] disabled:opacity-60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3.5 w-3.5" }),
          " ",
          saving ? "..." : "Guardar"
        ] })
      ] })
    ] }),
    msg && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs font-medium text-primary", children: msg }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Datos básicos", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 overflow-hidden rounded-full bg-secondary", children: profile.avatar_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: profile.avatar_url, className: "h-full w-full object-cover", alt: "" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center text-xl font-semibold text-muted-foreground", children: profile.name.charAt(0).toUpperCase() }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: fileRef, type: "file", accept: "image/*", hidden: true, onChange: handleAvatarUpload }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => fileRef.current?.click(), disabled: uploadingAvatar, className: "flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium hover:bg-secondary disabled:opacity-60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3.5 w-3.5" }),
            " ",
            uploadingAvatar ? "Subiendo..." : "Cambiar foto"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] text-muted-foreground", children: "JPG / PNG, recomendado 400x400" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nombre", value: profile.name, onChange: (v) => setProfile({
          ...profile,
          name: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Slug (URL)", value: profile.slug, onChange: (v) => setProfile({
          ...profile,
          slug: v.toLowerCase().replace(/[^a-z0-9-]/g, "-")
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Cargo / Título", value: profile.title ?? "", onChange: (v) => setProfile({
          ...profile,
          title: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", value: profile.email ?? "", onChange: (v) => setProfile({
          ...profile,
          email: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Teléfono", value: profile.phone ?? "", onChange: (v) => setProfile({
          ...profile,
          phone: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Website", value: profile.website ?? "", onChange: (v) => setProfile({
          ...profile,
          website: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "URL Calendly", value: profile.calendly_url ?? "", onChange: (v) => setProfile({
          ...profile,
          calendly_url: v
        }), full: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mt-3 block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-medium uppercase tracking-wide text-muted-foreground", children: "Bio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 3, value: profile.bio ?? "", onChange: (e) => setProfile({
          ...profile,
          bio: e.target.value
        }), className: "mt-1 block w-full rounded-xl border border-border bg-background px-4 py-2.5 text-[14px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Links sociales", action: /* @__PURE__ */ jsxRuntimeExports.jsxs(SmallBtn, { onClick: addSocial, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
      " Añadir"
    ] }), children: [
      socials.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Sin links sociales todavía." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: socials.map((s, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: s.type, onChange: (e) => {
          const next = [...socials];
          next[idx] = {
            ...s,
            type: e.target.value
          };
          setSocials(next);
          updateSocial(next[idx]);
        }, className: "rounded-lg border border-border bg-background px-2 py-2 text-sm", children: SOCIAL_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: t.value, children: t.label }, t.value)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: s.label, placeholder: "Etiqueta", onChange: (e) => {
          const next = [...socials];
          next[idx] = {
            ...s,
            label: e.target.value
          };
          setSocials(next);
        }, onBlur: () => updateSocial(socials[idx]), className: "w-32 rounded-lg border border-border bg-background px-3 py-2 text-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: s.url, placeholder: "https://...", onChange: (e) => {
          const next = [...socials];
          next[idx] = {
            ...s,
            url: e.target.value
          };
          setSocials(next);
        }, onBlur: () => updateSocial(socials[idx]), className: "flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => removeSocial(s.id), className: "rounded-lg border border-border px-3 text-destructive hover:bg-destructive/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
      ] }, s.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Links B2B destacados", action: /* @__PURE__ */ jsxRuntimeExports.jsxs(SmallBtn, { onClick: addB2B, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
      " Añadir"
    ] }), children: [
      profile.b2b_links.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: 'Ej: "Portal para Empresas", "Ver Pitch Deck".' }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: profile.b2b_links.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: b.label, placeholder: "Etiqueta", onChange: (e) => updateB2B(i, {
          label: e.target.value
        }), className: "w-48 rounded-lg border border-border bg-background px-3 py-2 text-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: b.url, placeholder: "https://...", onChange: (e) => updateB2B(i, {
          url: e.target.value
        }), className: "flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => removeB2B(i), className: "rounded-lg border border-border px-3 text-destructive hover:bg-destructive/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
      ] }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[11px] text-muted-foreground", children: "Recuerda guardar para aplicar los cambios." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: `Leads recibidos (${leads.length})`, icon: Inbox, children: leads.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Aún no has recibido leads en este perfil." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-xl border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-secondary text-xs uppercase tracking-wide text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-left", children: "Nombre" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-left", children: "Empresa" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-left", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-left", children: "Fecha" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", {})
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: leads.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-2 font-medium", children: [
          l.name,
          l.position && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs text-muted-foreground", children: l.position })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-muted-foreground", children: l.company ?? "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `mailto:${l.email}`, className: "text-primary hover:underline", children: l.email }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-xs text-muted-foreground", children: new Date(l.created_at).toLocaleDateString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => deleteLead(l.id), className: "rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) }) })
      ] }, l.id)) })
    ] }) }) })
  ] });
}
function Section({
  title,
  action,
  icon: Icon,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8 rounded-2xl border border-border bg-card p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground", children: [
        Icon && /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
        " ",
        title
      ] }),
      action
    ] }),
    children
  ] });
}
function Grid({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2", children });
}
function Field({
  label,
  value,
  onChange,
  full
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `block ${full ? "sm:col-span-2" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-medium uppercase tracking-wide text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value, onChange: (e) => onChange(e.target.value), className: "mt-1 block w-full rounded-xl border border-border bg-background px-4 py-2.5 text-[14px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" })
  ] });
}
function SmallBtn({
  children,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick, className: "flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium hover:bg-secondary", children });
}
export {
  EditProfilePage as component
};
