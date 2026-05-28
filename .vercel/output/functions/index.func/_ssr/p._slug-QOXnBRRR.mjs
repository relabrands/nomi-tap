import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { q as query, l as limit, w as where, c as collection, e as getDocs, o as orderBy, a as addDoc } from "../_libs/firebase__firestore.mjs";
import { R as Route$3, d as db } from "./router-CJmoGG_D.mjs";
import { N as NomiLogo } from "./NomiLogo-BARLlcp4.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__storage.mjs";
import { m as UserPlus, e as Link$1, i as Phone, G as Github, Y as Youtube, d as Instagram, l as Twitter, c as Globe, f as Linkedin, h as MessageCircle, M as Mail, C as Calendar, k as Share2, E as ExternalLink, X } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
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
const schema = objectType({
  name: stringType().trim().min(1, "Requerido").max(120),
  position: stringType().trim().max(120).optional(),
  email: stringType().trim().email("Email inválido").max(255),
  company: stringType().trim().max(160).optional()
});
function LeadCaptureModal({
  open,
  onClose,
  profileId,
  recipientName
}) {
  const [form, setForm] = reactExports.useState({ name: "", position: "", email: "", company: "" });
  const [error, setError] = reactExports.useState(null);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [done, setDone] = reactExports.useState(false);
  if (!open) return null;
  const handleSubmit = async (e) => {
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
        created_at: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (dbErr) {
      setSubmitting(false);
      setError("No se pudo enviar. Intenta de nuevo.");
      return;
    }
    setSubmitting(false);
    setDone(true);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-end justify-center sm:items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        "aria-label": "Cerrar",
        onClick: onClose,
        className: "absolute inset-0 bg-foreground/40 backdrop-blur-sm animate-in fade-in duration-200"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-md rounded-t-3xl bg-card p-6 shadow-xl animate-in slide-in-from-bottom duration-300 sm:rounded-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onClose,
          "aria-label": "Cerrar",
          className: "absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
        }
      ),
      done ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-8 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", className: "h-6 w-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20 6 9 17l-5-5" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 text-lg font-semibold text-foreground", children: "¡Datos enviados!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
          recipientName,
          " recibirá tu información en breve."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onClose,
            className: "mt-6 inline-flex h-10 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[color:var(--primary-hover)]",
            children: "Cerrar"
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold tracking-tight text-foreground", children: "Compartir tus datos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
          recipientName,
          " podrá contactarte directamente."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "mt-6 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nombre completo", value: form.name, onChange: (v) => setForm({ ...form, name: v }), autoFocus: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Posición en la empresa", value: form.position, onChange: (v) => setForm({ ...form, position: v }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Correo corporativo", type: "email", value: form.email, onChange: (v) => setForm({ ...form, email: v }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Empresa", value: form.company, onChange: (v) => setForm({ ...form, company: v }) }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-destructive", children: error }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              disabled: submitting,
              className: "mt-2 flex w-full items-center justify-center rounded-2xl bg-primary px-6 py-3.5 text-[15px] font-semibold text-primary-foreground transition-all hover:bg-[color:var(--primary-hover)] active:scale-[0.985] disabled:opacity-60",
              children: submitting ? "Enviando..." : "Enviar"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function Field({
  label,
  value,
  onChange,
  type = "text",
  autoFocus
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-medium uppercase tracking-wide text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type,
        value,
        onChange: (e) => onChange(e.target.value),
        autoFocus,
        className: "mt-1 block w-full rounded-xl border border-border bg-background px-4 py-3 text-[15px] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15"
      }
    )
  ] });
}
const ICONS = {
  email: Mail,
  whatsapp: MessageCircle,
  linkedin: Linkedin,
  website: Globe,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  github: Github,
  phone: Phone,
  other: Link$1
};
function buildVCard(p) {
  const lines = ["BEGIN:VCARD", "VERSION:3.0", `FN:${p.name}`];
  if (p.title) lines.push(`TITLE:${p.title}`);
  if (p.email) lines.push(`EMAIL;TYPE=WORK:${p.email}`);
  if (p.phone) lines.push(`TEL;TYPE=CELL:${p.phone}`);
  if (p.website) lines.push(`URL:${p.website}`);
  if (p.bio) lines.push(`NOTE:${p.bio.replace(/\n/g, "\\n")}`);
  lines.push("END:VCARD");
  return lines.join("\n");
}
function ProfileView({ profile }) {
  const [leadOpen, setLeadOpen] = reactExports.useState(false);
  const downloadVCard = () => {
    const blob = new Blob([buildVCard(profile)], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${profile.slug}.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen w-full bg-background px-5 py-10 sm:py-14", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex w-full max-w-md flex-col items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex flex-col items-center text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "relative h-28 w-28 overflow-hidden rounded-full bg-secondary ring-1 ring-border",
            style: { boxShadow: "var(--shadow-avatar)" },
            children: profile.avatar_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: profile.avatar_url, alt: profile.name, className: "h-full w-full object-cover", loading: "eager" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center text-3xl font-semibold text-muted-foreground", children: profile.name.charAt(0).toUpperCase() })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-5 text-[28px] font-bold leading-tight tracking-tight text-foreground", children: profile.name }),
        profile.title && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1.5 flex items-center gap-1.5 text-sm font-medium text-muted-foreground", children: [
          profile.title,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(NomiLogo, {})
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: downloadVCard,
          className: "group mt-8 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-primary px-6 py-4 text-[15px] font-semibold text-primary-foreground shadow-[0_8px_24px_-10px_oklch(0.66_0.17_142/0.6)] transition-all duration-200 hover:bg-[color:var(--primary-hover)] hover:shadow-[0_10px_28px_-8px_oklch(0.66_0.17_142/0.7)] active:scale-[0.985]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-5 w-5", strokeWidth: 2.2 }),
            "Guardar Contacto"
          ]
        }
      ),
      profile.bio && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mt-9 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-[15px] leading-relaxed text-muted-foreground", children: profile.bio }) }),
      profile.social_links.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mt-9 grid w-full grid-cols-4 gap-3", children: profile.social_links.map((s) => {
        const Icon = ICONS[s.type] ?? Link$1;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: s.url,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "group flex flex-col items-center gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card text-foreground/70 transition-all duration-200 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_6px_18px_-8px_oklch(0.66_0.17_142/0.55)] group-active:scale-95", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-[22px] w-[22px]", strokeWidth: 1.8 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-medium text-muted-foreground", children: s.label })
            ]
          },
          s.id ?? s.url
        );
      }) }),
      profile.calendly_url && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: profile.calendly_url,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "mt-9 flex w-full items-center justify-center gap-2.5 rounded-2xl border-2 border-primary bg-card px-6 py-3.5 text-[15px] font-semibold text-primary transition-all duration-200 hover:bg-primary hover:text-primary-foreground active:scale-[0.985]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-5 w-5", strokeWidth: 2.2 }),
            "Agendar Reunión"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setLeadOpen(true),
          className: "mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-primary/40 bg-transparent px-6 py-3 text-[14px] font-medium text-primary transition-all duration-200 hover:border-primary hover:bg-primary/5 active:scale-[0.985]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-4 w-4", strokeWidth: 2 }),
            "Compartir mis datos contigo"
          ]
        }
      ),
      profile.b2b_links.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mt-10 flex w-full flex-col gap-2.5", children: profile.b2b_links.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: b.url,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "flex w-full items-center justify-between rounded-xl border border-border bg-card px-5 py-3.5 text-[14px] font-medium text-foreground/80 transition-all duration-200 hover:border-primary/40 hover:text-foreground hover:shadow-sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: b.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-4 w-4 text-muted-foreground", strokeWidth: 1.8 })
          ]
        },
        i
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "mt-14 flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-muted-foreground/70", children: [
        "Powered by ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(NomiLogo, {}),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-muted-foreground", children: "Nomi" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      LeadCaptureModal,
      {
        open: leadOpen,
        onClose: () => setLeadOpen(false),
        profileId: profile.id,
        recipientName: profile.name
      }
    )
  ] });
}
function PublicProfilePage() {
  const {
    slug
  } = Route$3.useParams();
  const [profile, setProfile] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    (async () => {
      const qProfile = query(collection(db, "profiles"), where("slug", "==", slug), limit(1));
      const profileSnapshot = await getDocs(qProfile);
      if (profileSnapshot.empty) {
        setLoading(false);
        return;
      }
      const pDoc = profileSnapshot.docs[0];
      const p = {
        id: pDoc.id,
        ...pDoc.data()
      };
      const qLinks = query(collection(db, "social_links"), where("profile_id", "==", p.id), orderBy("sort_order", "asc"));
      const linksSnapshot = await getDocs(qLinks);
      const links = linksSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setProfile({
        ...p,
        b2b_links: p.b2b_links ?? [],
        social_links: links ?? []
      });
      setLoading(false);
    })();
  }, [slug]);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex min-h-screen items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" }) });
  }
  if (!profile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex min-h-screen flex-col items-center justify-center px-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold text-foreground", children: "Perfil no encontrado" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-muted-foreground", children: [
        'No existe ninguna tarjeta con el slug "',
        slug,
        '".'
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "mt-6 text-sm font-medium text-primary hover:underline", children: "Ir al inicio" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileView, { profile });
}
export {
  PublicProfilePage as component
};
