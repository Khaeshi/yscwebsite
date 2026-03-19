import { e as createAstro, f as createComponent, l as renderComponent, r as renderTemplate } from "../../chunks/astro/server_Cfl3Ur0m.mjs";
import { $ as $$AdminLayout } from "../../chunks/AdminLayout_DhGSSYVQ.mjs";
import { j as jsxRuntimeExports } from "../../chunks/jsx-runtime_mS7YKmDK.mjs";
import { a as reactExports } from "../../chunks/_@astro-renderers_B4KjVBz-.mjs";
import { r } from "../../chunks/_@astro-renderers_B4KjVBz-.mjs";
const EMPTY_FORM = { name: "", description: "", duration: "", type: "online", price: 0, active: true };
const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors placeholder-gray-400 bg-white";
const labelCls = "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5";
const TYPE_BADGE = {
  online: "bg-blue-50 text-blue-700 border border-blue-200",
  onsite: "bg-green-50 text-green-700 border border-green-200",
  hybrid: "bg-purple-50 text-purple-700 border border-purple-200"
};
function Toast({ toast, onDismiss }) {
  reactExports.useEffect(() => {
    const t = setTimeout(onDismiss, 4e3);
    return () => clearTimeout(t);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium border ${toast.type === "success" ? "bg-white border-green-200 text-green-800" : "bg-white border-red-200 text-red-800"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-2 h-2 rounded-full flex-shrink-0 ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: toast.message }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onDismiss, className: "opacity-40 hover:opacity-70 text-xs", children: "✕" })
  ] });
}
function ProgramsManager() {
  const [programs, setPrograms] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [toasts, setToasts] = reactExports.useState([]);
  const [search, setSearch] = reactExports.useState("");
  const [typeFilter, setTypeFilter] = reactExports.useState("all");
  reactExports.useEffect(() => {
    fetchPrograms();
  }, []);
  async function fetchPrograms() {
    setLoading(true);
    try {
      const res = await fetch("/api/programs");
      const data = await res.json();
      if (data.success) setPrograms(data.programs);
    } catch {
      addToast("Failed to load programs", "error");
    } finally {
      setLoading(false);
    }
  }
  function addToast(message, type = "success") {
    const id = Date.now();
    setToasts((p) => [...p, { id, message, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 4e3);
  }
  function openCreate() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setModalOpen(true);
  }
  function openEdit(p) {
    setForm({ name: p.name, description: p.description, duration: p.duration, type: p.type, price: p.price, active: p.active });
    setEditingId(p._id);
    setModalOpen(true);
  }
  function closeModal() {
    setModalOpen(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = editingId ? `/api/programs/${editingId}` : "/api/programs";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      if (editingId) {
        setPrograms((p) => p.map((x) => x._id === editingId ? data.program : x));
        addToast("Program updated");
      } else {
        setPrograms((p) => [data.program, ...p]);
        addToast("Program created");
      }
      closeModal();
    } catch (err) {
      addToast(err.message || "Failed to save", "error");
    } finally {
      setSubmitting(false);
    }
  }
  async function handleDelete(program) {
    setDeleteTarget(null);
    try {
      const res = await fetch(`/api/programs/${program._id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setPrograms((p) => p.filter((x) => x._id !== program._id));
      addToast(`${program.name} removed`);
    } catch (err) {
      addToast(err.message || "Delete failed", "error");
    }
  }
  const filtered = programs.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || p.type === typeFilter;
    return matchSearch && matchType;
  });
  const stats = {
    total: programs.length,
    online: programs.filter((p) => p.type === "online").length,
    active: programs.filter((p) => p.active).length
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-gray-900", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed top-4 right-4 z-[200] flex flex-col gap-2 w-72", children: toasts.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(Toast, { toast: t, onDismiss: () => setToasts((p) => p.filter((x) => x.id !== t.id)) }, t.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Programs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-sm mt-1", children: "Manage courses and learning programs" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: openCreate, className: "inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 4v16m8-8H4" }) }),
        "New Program"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-4 mb-8", children: [
      { label: "Total", val: stats.total, icon: "📚", color: "text-blue-600" },
      { label: "Online", val: stats.online, icon: "💻", color: "text-purple-600" },
      { label: "Active", val: stats.active, icon: "✅", color: "text-green-600" }
    ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-gray-200 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-xs font-semibold uppercase tracking-wider", children: s.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: s.icon })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-3xl font-bold ${s.color}`, children: s.val })
    ] }, s.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          placeholder: "Search programs...",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          className: "flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: typeFilter,
          onChange: (e) => setTypeFilter(e.target.value),
          className: "border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-purple-500 bg-white",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Types" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "online", children: "Online" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "onsite", children: "Onsite" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "hybrid", children: "Hybrid" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white border border-gray-200 rounded-2xl overflow-hidden", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" }) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-24 text-center px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-4", children: "📚" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold text-gray-700", children: search ? "No programs match your search" : "No programs yet" }),
      !search && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: openCreate, className: "mt-4 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors", children: "Create First Program" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-gray-100 bg-gray-50", children: ["Program", "Type", "Duration", "Price", "Status", "Actions"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider", children: h }, h)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-gray-50", children: filtered.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-gray-50 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-gray-900", children: p.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-0.5 max-w-xs truncate", children: p.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${TYPE_BADGE[p.type]}`, children: p.type }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4 text-sm text-gray-600", children: p.duration || "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4 text-sm text-gray-900 font-medium", children: p.price ? `₱${p.price.toLocaleString()}` : "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${p.active ? "bg-green-50 text-green-700 border border-green-200" : "bg-gray-100 text-gray-500"}`, children: p.active ? "Active" : "Inactive" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => openEdit(p), className: "p-1.5 rounded-lg hover:bg-purple-50 text-purple-500 transition-colors", title: "Edit", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setDeleteTarget(p), className: "p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-colors", title: "Delete", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) }) })
        ] }) })
      ] }, p._id)) })
    ] }) }) }),
    modalOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-gray-200 rounded-2xl w-full max-w-md shadow-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 py-5 border-b border-gray-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold text-gray-900", children: editingId ? "Edit Program" : "New Program" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: closeModal, className: "text-gray-400 hover:text-gray-600 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "px-6 py-5 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: labelCls, children: [
            "Program Name ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-400", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              required: true,
              type: "text",
              placeholder: "e.g. Basic English",
              value: form.name,
              onChange: (e) => setForm({ ...form, name: e.target.value }),
              className: inputCls
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              placeholder: "Brief description...",
              value: form.description,
              rows: 3,
              onChange: (e) => setForm({ ...form, description: e.target.value }),
              className: inputCls + " resize-none"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: form.type, onChange: (e) => setForm({ ...form, type: e.target.value }), className: inputCls, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "online", children: "Online" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "onsite", children: "Onsite" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "hybrid", children: "Hybrid" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Duration" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                placeholder: "e.g. 3 months",
                value: form.duration,
                onChange: (e) => setForm({ ...form, duration: e.target.value }),
                className: inputCls
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Price (₱)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              min: 0,
              placeholder: "0",
              value: form.price,
              onChange: (e) => setForm({ ...form, price: Number(e.target.value) }),
              className: inputCls
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setForm({ ...form, active: !form.active }),
              className: `relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.active ? "bg-purple-600" : "bg-gray-300"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${form.active ? "translate-x-6" : "translate-x-1"}` })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-600", children: form.active ? "Active" : "Inactive" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: closeModal,
              className: "flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition-colors",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              disabled: submitting,
              className: "flex-1 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2",
              children: submitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }),
                " Saving..."
              ] }) : editingId ? "Save Changes" : "Create Program"
            }
          )
        ] })
      ] })
    ] }) }),
    deleteTarget && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-gray-200 rounded-2xl w-full max-w-sm shadow-2xl p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-6 h-6 text-red-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-bold text-gray-900 mb-1", children: "Delete Program" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-500 text-sm mb-6", children: [
        "Remove ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-gray-800", children: deleteTarget.name }),
        "? This cannot be undone."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setDeleteTarget(null),
            className: "flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition-colors",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => handleDelete(deleteTarget),
            className: "flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold transition-colors",
            children: "Delete"
          }
        )
      ] })
    ] }) })
  ] });
}
const $$Astro = createAstro("https://youngstarterclub.asia");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { userId } = Astro2.locals.auth();
  if (!userId) return Astro2.redirect("/admin/login");
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Programs | YSC Admin", "description": "Manage programs and courses" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ProgramsManager", ProgramsManager, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Escanorrrrr/OneDrive/Desktop/Khaesey Files/yscwebsite/src/components/admin/ProgramsManager.tsx", "client:component-export": "default" })} ` })}`;
}, "C:/Users/Escanorrrrr/OneDrive/Desktop/Khaesey Files/yscwebsite/src/pages/admin/programs/index.astro", void 0);
const $$file = "C:/Users/Escanorrrrr/OneDrive/Desktop/Khaesey Files/yscwebsite/src/pages/admin/programs/index.astro";
const $$url = "/admin/programs";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
