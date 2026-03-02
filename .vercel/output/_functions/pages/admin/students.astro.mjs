import { e as createAstro, f as createComponent, l as renderComponent, r as renderTemplate } from "../../chunks/astro/server_CoVo9Zif.mjs";
import { $ as $$AdminLayout } from "../../chunks/AdminLayout_C6XI2GIq.mjs";
import { j as jsxRuntimeExports } from "../../chunks/jsx-runtime_DaxtJboG.mjs";
import { a as reactExports } from "../../chunks/_@astro-renderers_DOBI-D1Y.mjs";
import { r } from "../../chunks/_@astro-renderers_DOBI-D1Y.mjs";
import { c as connectDB } from "../../chunks/client_2qSNy_zs.mjs";
import { S as Student } from "../../chunks/Student_B3tjZemc.mjs";
const EMPTY_FORM = { name: "", phone: "", email: "", telegramChatId: "", active: true };
function ToastItem({ toast, onDismiss }) {
  reactExports.useEffect(() => {
    const t = setTimeout(onDismiss, 4e3);
    return () => clearTimeout(t);
  }, []);
  const styles = {
    success: "bg-white border-emerald-200 text-emerald-800 shadow-emerald-100",
    error: "bg-white border-red-200 text-red-800 shadow-red-100",
    info: "bg-white border-purple-200 text-purple-800 shadow-purple-100"
  };
  const iconColors = {
    success: "bg-emerald-100 text-emerald-600",
    error: "bg-red-100 text-red-600",
    info: "bg-purple-100 text-purple-600"
  };
  const icons = { success: "✓", error: "✕", info: "i" };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg text-sm font-medium ${styles[toast.type]}`,
      style: { animation: "slideIn 0.25s ease" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${iconColors[toast.type]}`, children: icons[toast.type] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: toast.message }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onDismiss, className: "opacity-40 hover:opacity-70 text-xs", children: "✕" })
      ]
    }
  );
}
function Avatar({ name }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-bold flex-shrink-0", children: initials });
}
const inputCls = "w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all placeholder-gray-400";
function StudentsManager({ initialStudents = [] }) {
  const [students, setStudents] = reactExports.useState(initialStudents);
  const [loading, setLoading] = reactExports.useState(initialStudents.length === 0);
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [deletingId, setDeletingId] = reactExports.useState(null);
  const [toasts, setToasts] = reactExports.useState([]);
  const [search, setSearch] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (initialStudents.length === 0) fetchStudents();
  }, []);
  async function fetchStudents() {
    setLoading(true);
    try {
      const res = await fetch("/api/students");
      const data = await res.json();
      if (data.success) setStudents(data.students);
    } catch {
      addToast("Failed to load students", "error");
    } finally {
      setLoading(false);
    }
  }
  function addToast(message, type = "success") {
    setToasts((p) => [...p, { id: Date.now(), message, type }]);
  }
  function openCreate() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setModalOpen(true);
  }
  function openEdit(s) {
    setForm({
      name: s.name,
      phone: s.phone || "",
      email: s.email || "",
      telegramChatId: s.telegramChatId || "",
      active: s.active
    });
    setEditingId(s._id);
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
      const url = editingId ? `/api/students/${editingId}` : "/api/students";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      if (editingId) {
        setStudents((p) => p.map((s) => s._id === editingId ? data.student : s));
        addToast("Student updated");
      } else {
        setStudents((p) => [data.student, ...p]);
        addToast("Student added");
      }
      closeModal();
    } catch (err) {
      addToast(err.message || "Failed to save", "error");
    } finally {
      setSubmitting(false);
    }
  }
  async function handleDelete(student) {
    setDeleteTarget(null);
    setDeletingId(student._id);
    try {
      const res = await fetch(`/api/students/${student._id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setStudents((p) => p.filter((s) => s._id !== student._id));
      addToast(`${student.name} removed`);
    } catch (err) {
      addToast(err.message || "Delete failed", "error");
    } finally {
      setDeletingId(null);
    }
  }
  const filtered = students.filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.phone?.includes(search) || s.email?.toLowerCase().includes(search.toLowerCase())
  );
  const stats = {
    total: students.length,
    connected: students.filter((s) => s.telegramChatId).length,
    active: students.filter((s) => s.active).length
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-gray-800 bg-gray-50 min-h-screen p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes slideIn { from { opacity:0; transform:translateX(24px); } to { opacity:1; transform:translateX(0); } }
        @keyframes fadeUp  { from { opacity:0; transform:translateY(8px);  } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.2s ease; }
      ` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed top-4 right-4 z-[200] flex flex-col gap-2 w-72", children: toasts.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(ToastItem, { toast: t, onDismiss: () => setToasts((p) => p.filter((x) => x.id !== t.id)) }, t.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Students" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-sm mt-1", children: "Manage students and their Telegram connections" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: openCreate,
          className: "inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 4v16m8-8H4" }) }),
            "Add Student"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-4 mb-6", children: [
      { label: "Total Students", val: stats.total, color: "text-blue-600", sub: "Registered" },
      { label: "Telegram", val: stats.connected, color: "text-emerald-600", sub: "Connected" },
      { label: "Active", val: stats.active, color: "text-purple-600", sub: "1 Active" }
    ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-gray-200 rounded-2xl p-5 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-xs font-semibold uppercase tracking-wider", children: s.label }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-3xl font-bold ${s.color}`, children: s.val }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-xs mt-1", children: s.sub })
    ] }, s.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          placeholder: "Search by name, phone, or email...",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          className: "w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all placeholder-gray-400 shadow-sm"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" }) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-24 text-center px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-3xl mb-4", children: "👥" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold text-gray-700", children: search ? "No students match your search" : "No students yet" }),
      !search && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: openCreate,
          className: "mt-4 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors",
          children: "Add First Student"
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-gray-100 bg-gray-50/80", children: ["Student", "Contact", "Telegram", "Status", "Actions"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider", children: h }, h)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-gray-100", children: filtered.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-gray-50/60 transition-colors fade-up", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { name: s.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-gray-900", children: s.name })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-700", children: s.phone || "—" }),
          s.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400", children: s.email })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4", children: s.telegramChatId ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-100", children: "✓ Connected" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-1 font-mono", children: s.telegramChatId })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-600 border border-amber-100", children: "⚠ Not set" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${s.active ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-gray-100 text-gray-500 border-gray-200"}`, children: s.active ? "Active" : "Inactive" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => openEdit(s),
              title: "Edit",
              className: "p-1.5 rounded-lg hover:bg-purple-50 text-purple-500 transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" }) })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setDeleteTarget(s),
              disabled: deletingId === s._id,
              title: "Delete",
              className: "p-1.5 rounded-lg hover:bg-red-50 text-red-400 disabled:opacity-30 transition-colors",
              children: deletingId === s._id ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border border-red-400 border-t-transparent rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) })
            }
          )
        ] }) })
      ] }, s._id)) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-500 text-lg flex-shrink-0", children: "📱" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-blue-700 mb-1", children: "How students get their Telegram Chat ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-blue-600/80 text-xs leading-relaxed", children: [
          "Student opens Telegram → finds your bot → sends",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "bg-blue-100 px-1.5 py-0.5 rounded font-mono", children: "/start" }),
          " → bot replies with their Chat ID → student shares it with you → add it here."
        ] })
      ] })
    ] }),
    modalOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-gray-200 rounded-2xl w-full max-w-md shadow-xl fade-up", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 py-5 border-b border-gray-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold text-gray-900", children: editingId ? "Edit Student" : "Add Student" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-0.5", children: "Fill in the student's details" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: closeModal, className: "text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-lg hover:bg-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "px-6 py-5 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5", children: [
            "Full Name ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-400", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              required: true,
              type: "text",
              placeholder: "e.g. Maria Santos",
              value: form.name,
              onChange: (e) => setForm({ ...form, name: e.target.value }),
              className: inputCls
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5", children: "Phone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "tel",
                placeholder: "0917-123-4567",
                value: form.phone,
                onChange: (e) => setForm({ ...form, phone: e.target.value }),
                className: inputCls
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5", children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "email",
                placeholder: "maria@example.com",
                value: form.email,
                onChange: (e) => setForm({ ...form, email: e.target.value }),
                className: inputCls
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5", children: "Telegram Chat ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: "123456789",
              value: form.telegramChatId,
              onChange: (e) => setForm({ ...form, telegramChatId: e.target.value }),
              className: inputCls
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-xs mt-1", children: "Student gets this by sending /start to your bot" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setForm({ ...form, active: !form.active }),
              className: `relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.active ? "bg-emerald-500" : "bg-gray-300"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${form.active ? "translate-x-6" : "translate-x-1"}` })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-600", children: form.active ? "Active student" : "Inactive" })
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
              ] }) : editingId ? "Save Changes" : "Add Student"
            }
          )
        ] })
      ] })
    ] }) }),
    deleteTarget && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-gray-200 rounded-2xl w-full max-w-sm shadow-xl fade-up p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-6 h-6 text-red-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-bold text-gray-900 mb-1", children: "Remove Student" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-500 text-sm mb-6", children: [
        "Remove ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-gray-900", children: deleteTarget.name }),
        "? This will also affect their schedules."
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
            children: "Remove"
          }
        )
      ] })
    ] }) })
  ] });
}
const $$Astro = createAstro("https://youngstarterclub.asia");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { userId } = Astro2.locals.auth();
  if (!userId) return Astro2.redirect("/admin/login");
  let students = [];
  try {
    await connectDB();
    const raw = await Student.find().sort({ name: 1 }).lean();
    students = raw.map((s) => ({
      _id: s._id.toString(),
      name: s.name,
      phone: s.phone || "",
      email: s.email || "",
      telegramChatId: s.telegramChatId || "",
      active: s.active,
      createdAt: s.createdAt ? new Date(s.createdAt).toISOString() : (/* @__PURE__ */ new Date()).toISOString()
    }));
  } catch (err) {
    console.error("Failed to load students:", err);
  }
  const pageTitle = "Students | YSC Admin";
  const description = "Manage students and Telegram connections";
  const image = "/YSC.ico";
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": pageTitle, "description": description, "image": image }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "StudentsManager", StudentsManager, { "client:load": true, "initialStudents": students, "client:component-hydration": "load", "client:component-path": "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/components/admin/StudentManager.tsx", "client:component-export": "default" })} ` })}`;
}, "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/pages/admin/students/index.astro", void 0);
const $$file = "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/pages/admin/students/index.astro";
const $$url = "/admin/students";
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
