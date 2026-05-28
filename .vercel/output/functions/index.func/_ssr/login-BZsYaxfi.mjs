import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { s as signInWithEmailAndPassword, c as createUserWithEmailAndPassword } from "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import { u as useAuth, b as auth } from "./router-CJmoGG_D.mjs";
import { N as NomiLogo } from "./NomiLogo-BARLlcp4.mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__firestore.mjs";
import "../_libs/firebase__storage.mjs";
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
import "../_libs/firebase__util.mjs";
import "../_libs/firebase__component.mjs";
import "../_libs/idb.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
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
function LoginPage() {
  const {
    session
  } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = reactExports.useState("signin");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [error, setError] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (session) navigate({
      to: "/dashboard",
      replace: true
    });
  }, [session, navigate]);
  const handleSubmit = async (e) => {
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
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex min-h-screen items-center justify-center bg-background px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "mb-10 flex items-center justify-center gap-2 text-sm font-semibold tracking-tight text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(NomiLogo, {}),
      " Nomi"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 flex rounded-xl bg-secondary p-1 text-sm font-medium", children: ["signin", "signup"].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
        setMode(m);
        setError(null);
      }, className: `flex-1 rounded-lg px-3 py-2 transition-colors ${mode === m ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`, children: m === "signin" ? "Acceder" : "Crear cuenta" }, m)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-medium uppercase tracking-wide text-muted-foreground", children: "Correo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), className: "mt-1 block w-full rounded-xl border border-border bg-background px-4 py-3 text-[15px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-medium uppercase tracking-wide text-muted-foreground", children: "Contraseña" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", required: true, minLength: 6, value: password, onChange: (e) => setPassword(e.target.value), className: "mt-1 block w-full rounded-xl border border-border bg-background px-4 py-3 text-[15px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" })
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-destructive", children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, className: "mt-2 flex w-full items-center justify-center rounded-2xl bg-primary px-6 py-3.5 text-[15px] font-semibold text-primary-foreground transition-all hover:bg-[color:var(--primary-hover)] active:scale-[0.985] disabled:opacity-60", children: loading ? "..." : mode === "signin" ? "Acceder" : "Crear cuenta" })
      ] })
    ] })
  ] }) });
}
export {
  LoginPage as component
};
