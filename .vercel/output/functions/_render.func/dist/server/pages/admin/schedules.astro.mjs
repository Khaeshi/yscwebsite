import { e as createAstro, f as createComponent, l as renderComponent, r as renderTemplate } from "../../chunks/astro/server_DobZlz4c.mjs";
import "piccolore";
import { $ as $$AdminLayout } from "../../chunks/AdminLayout_CK29TekP.mjs";
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { c as connectDB } from "../../chunks/client_CKK2n-7R.mjs";
import { S as Schedule } from "../../chunks/Schedule_BiCOHfXk.mjs";
import { S as Student } from "../../chunks/Student_BYlgW2Kz.mjs";
import { renderers } from "../../renderers.mjs";
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const EMPTY_FORM = {
  studentId: "",
  className: "",
  classType: "online",
  dayOfWeek: 1,
  time: "14:00",
  duration: 60,
  reminderMinutes: 60,
  active: true
};
function ToastItem({ toast, onDismiss }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 4e3);
    return () => clearTimeout(t);
  }, []);
  const styles = {
    success: "bg-white border-emerald-200 text-emerald-800 shadow-emerald-100",
    error: "bg-white border-red-200 text-red-800 shadow-red-100",
    info: "bg-white border-purple-200 text-purple-800 shadow-purple-100"
  };
  const icons = { success: "✓", error: "✕", info: "i" };
  const iconColors = {
    success: "bg-emerald-100 text-emerald-600",
    error: "bg-red-100 text-red-600",
    info: "bg-purple-100 text-purple-600"
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg text-sm font-medium ${styles[toast.type]}`,
      style: { animation: "slideIn 0.25s ease" },
      children: [
        /* @__PURE__ */ jsx("span", { className: `w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${iconColors[toast.type]}`, children: icons[toast.type] }),
        /* @__PURE__ */ jsx("span", { className: "flex-1", children: toast.message }),
        /* @__PURE__ */ jsx("button", { onClick: onDismiss, className: "opacity-40 hover:opacity-70 ml-1 text-xs", children: "✕" })
      ]
    }
  );
}
function Field({ label, required, children }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5", children: [
      label,
      " ",
      required && /* @__PURE__ */ jsx("span", { className: "text-red-400", children: "*" })
    ] }),
    children
  ] });
}
const inputCls = "w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all placeholder-gray-400";
function Avatar({ name, size = "sm" }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const sizeClass = size === "sm" ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm";
  return /* @__PURE__ */ jsx("div", { className: `${sizeClass} rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold flex-shrink-0`, children: initials });
}
function SchedulesManager({ initialSchedules = [], initialStudents = [] }) {
  const [schedules, setSchedules] = useState(initialSchedules);
  const [students, setStudents] = useState(initialStudents);
  const [loading, setLoading] = useState(initialSchedules.length === 0);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [testingId, setTestingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [dayFilter, setDayFilter] = useState("all");
  useEffect(() => {
    if (initialSchedules.length === 0) fetchAll();
  }, []);
  async function fetchAll() {
    setLoading(true);
    try {
      const [sr, tr] = await Promise.all([
        fetch("/api/schedules").then((r) => r.json()),
        fetch("/api/students").then((r) => r.json())
      ]);
      if (sr.success) setSchedules(sr.schedules);
      if (tr.success) setStudents(tr.students);
    } catch {
      addToast("Failed to load data", "error");
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
      studentId: s.studentId._id,
      className: s.className,
      classType: s.classType,
      dayOfWeek: s.dayOfWeek,
      time: s.time,
      duration: s.duration,
      reminderMinutes: s.reminderMinutes,
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
      const url = editingId ? `/api/schedules/${editingId}` : "/api/schedules";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      if (editingId) {
        setSchedules((p) => p.map((s) => s._id === editingId ? data.schedule : s));
        addToast("Schedule updated");
      } else {
        setSchedules((p) => [data.schedule, ...p]);
        addToast("Schedule created");
      }
      closeModal();
    } catch (err) {
      addToast(err.message || "Failed to save", "error");
    } finally {
      setSubmitting(false);
    }
  }
  async function handleDelete(schedule) {
    setDeleteTarget(null);
    setDeletingId(schedule._id);
    try {
      const res = await fetch(`/api/schedules/${schedule._id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setSchedules((p) => p.filter((s) => s._id !== schedule._id));
      addToast(`"${schedule.className}" deleted`);
    } catch (err) {
      addToast(err.message || "Delete failed", "error");
    } finally {
      setDeletingId(null);
    }
  }
  async function handleToggle(schedule) {
    try {
      const res = await fetch(`/api/schedules/${schedule._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !schedule.active })
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setSchedules((p) => p.map((s) => s._id === schedule._id ? data.schedule : s));
      addToast(`${schedule.className} ${!schedule.active ? "activated" : "deactivated"}`, "info");
    } catch (err) {
      addToast(err.message, "error");
    }
  }
  async function handleTest(schedule) {
    setTestingId(schedule._id);
    try {
      const res = await fetch(`/api/schedules/test/${schedule._id}`, { method: "POST" });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      addToast(data.message, "success");
    } catch (err) {
      addToast(err.message || "Failed to send reminder", "error");
    } finally {
      setTestingId(null);
    }
  }
  const filtered = dayFilter === "all" ? schedules : schedules.filter((s) => s.dayOfWeek === dayFilter);
  const selectedStudent = students.find((s) => s._id === form.studentId);
  const stats = {
    total: schedules.length,
    active: schedules.filter((s) => s.active).length,
    online: schedules.filter((s) => s.classType === "online").length,
    onsite: schedules.filter((s) => s.classType === "onsite").length
  };
  return /* @__PURE__ */ jsxs("div", { className: "text-gray-800 bg-gray-50 min-h-screen p-6", children: [
    /* @__PURE__ */ jsx("style", { children: `
        @keyframes slideIn { from { opacity:0; transform:translateX(24px); } to { opacity:1; transform:translateX(0); } }
        @keyframes fadeUp  { from { opacity:0; transform:translateY(8px);  } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.2s ease; }
        select option { background:#ffffff; color:#111827; }
      ` }),
    /* @__PURE__ */ jsx("div", { className: "fixed top-4 right-4 z-[200] flex flex-col gap-2 w-72", children: toasts.map((t) => /* @__PURE__ */ jsx(ToastItem, { toast: t, onDismiss: () => setToasts((p) => p.filter((x) => x.id !== t.id)) }, t.id)) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Class Schedules" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm mt-1", children: "Manage classes and automated Telegram reminders" })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: openCreate,
          className: "inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm",
          children: [
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 4v16m8-8H4" }) }),
            "New Schedule"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6", children: [
      { label: "Total", val: stats.total, color: "text-blue-600", sub: "All schedules" },
      { label: "Active", val: stats.active, color: "text-emerald-600", sub: "Currently running" },
      { label: "Online", val: stats.online, color: "text-purple-600", sub: "Virtual classes" },
      { label: "Onsite", val: stats.onsite, color: "text-amber-600", sub: "In-person" }
    ].map((s) => /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-200 rounded-2xl p-5 shadow-sm", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-3", children: /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-xs font-semibold uppercase tracking-wider", children: s.label }) }),
      /* @__PURE__ */ jsx("p", { className: `text-3xl font-bold ${s.color}`, children: s.val }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-xs mt-1", children: s.sub })
    ] }, s.label)) }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: ["all", ...DAYS.map((_, i) => i)].map((d) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setDayFilter(d),
        className: `px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${dayFilter === d ? "bg-purple-600 text-white border-purple-600" : "bg-white text-gray-600 border-gray-200 hover:border-purple-300 hover:text-purple-600"}`,
        children: d === "all" ? "All Days" : DAYS[d].slice(0, 3)
      },
      String(d)
    )) }),
    /* @__PURE__ */ jsx("div", { className: "bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm", children: loading ? /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center py-24", children: /* @__PURE__ */ jsx("div", { className: "w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" }) }) : filtered.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-24 text-center px-4", children: [
      /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-3xl mb-4", children: "📅" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold text-gray-700", children: "No schedules found" }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400 mt-1 mb-5", children: [
        dayFilter !== "all" ? "Try a different day, or " : "",
        "create your first schedule."
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: openCreate,
          className: "bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors",
          children: "Create Schedule"
        }
      )
    ] }) : /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { className: "border-b border-gray-100 bg-gray-50/80", children: ["Student", "Class", "Schedule", "Reminder", "Status", "Actions"].map((h) => /* @__PURE__ */ jsx("th", { className: "px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap", children: h }, h)) }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-100", children: filtered.map((sc) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50/60 transition-colors fade-up", children: [
        /* @__PURE__ */ jsx("td", { className: "px-5 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(Avatar, { name: sc.studentId.name }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-gray-900", children: sc.studentId.name }),
            /* @__PURE__ */ jsx("p", { className: `text-xs ${sc.studentId.telegramChatId ? "text-emerald-500" : "text-amber-500"}`, children: sc.studentId.telegramChatId ? "✓ Telegram" : "⚠ No Telegram" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("td", { className: "px-5 py-4", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-gray-900", children: sc.className }),
          /* @__PURE__ */ jsxs("span", { className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium mt-1 ${sc.classType === "online" ? "bg-blue-50 text-blue-600 border border-blue-100" : "bg-amber-50 text-amber-600 border border-amber-100"}`, children: [
            sc.classType === "online" ? "💻" : "🏫",
            " ",
            sc.classType
          ] })
        ] }),
        /* @__PURE__ */ jsxs("td", { className: "px-5 py-4 whitespace-nowrap", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-gray-900", children: DAYS[sc.dayOfWeek] }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400", children: [
            sc.time,
            " · ",
            sc.duration,
            "min"
          ] })
        ] }),
        /* @__PURE__ */ jsx("td", { className: "px-5 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium", children: [
          "🔔 ",
          sc.reminderMinutes >= 60 ? `${sc.reminderMinutes / 60}h` : `${sc.reminderMinutes}min`,
          " before"
        ] }) }),
        /* @__PURE__ */ jsxs("td", { className: "px-5 py-4", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleToggle(sc),
              className: `relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${sc.active ? "bg-emerald-500" : "bg-gray-200"}`,
              title: sc.active ? "Click to deactivate" : "Click to activate",
              children: /* @__PURE__ */ jsx("span", { className: `inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${sc.active ? "translate-x-[18px]" : "translate-x-0.5"}` })
            }
          ),
          /* @__PURE__ */ jsx("p", { className: `text-xs mt-0.5 font-medium ${sc.active ? "text-emerald-500" : "text-gray-400"}`, children: sc.active ? "Active" : "Paused" })
        ] }),
        /* @__PURE__ */ jsx("td", { className: "px-5 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleTest(sc),
              disabled: !sc.studentId.telegramChatId || testingId === sc._id,
              title: sc.studentId.telegramChatId ? "Send test reminder" : "No Telegram ID",
              className: "p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors",
              children: testingId === sc._id ? /* @__PURE__ */ jsx("div", { className: "w-4 h-4 border border-blue-400 border-t-transparent rounded-full animate-spin" }) : /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8" }) })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => openEdit(sc),
              title: "Edit",
              className: "p-1.5 rounded-lg hover:bg-purple-50 text-purple-500 transition-colors",
              children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" }) })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setDeleteTarget(sc),
              disabled: deletingId === sc._id,
              title: "Delete",
              className: "p-1.5 rounded-lg hover:bg-red-50 text-red-400 disabled:opacity-30 transition-colors",
              children: deletingId === sc._id ? /* @__PURE__ */ jsx("div", { className: "w-4 h-4 border border-red-400 border-t-transparent rounded-full animate-spin" }) : /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) })
            }
          )
        ] }) })
      ] }, sc._id)) })
    ] }) }) }),
    modalOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-200 rounded-2xl w-full max-w-xl shadow-xl fade-up max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-5 border-b border-gray-100 sticky top-0 bg-white z-10", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-base font-bold text-gray-900", children: editingId ? "Edit Schedule" : "New Schedule" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mt-0.5", children: "Fill in the details below" })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: closeModal, className: "text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-lg hover:bg-gray-100", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "px-6 py-5 space-y-5", children: [
        /* @__PURE__ */ jsxs(Field, { label: "Student", required: true, children: [
          /* @__PURE__ */ jsxs(
            "select",
            {
              required: true,
              value: form.studentId,
              onChange: (e) => setForm({ ...form, studentId: e.target.value }),
              className: inputCls,
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Select a student..." }),
                students.map((s) => /* @__PURE__ */ jsxs("option", { value: s._id, children: [
                  s.name,
                  " ",
                  s.telegramChatId ? "✓" : "⚠ No Telegram"
                ] }, s._id))
              ]
            }
          ),
          selectedStudent && !selectedStudent.telegramChatId && /* @__PURE__ */ jsxs("p", { className: "text-amber-500 text-xs mt-1.5 flex items-center gap-1", children: [
            /* @__PURE__ */ jsx("span", { children: "⚠" }),
            " No Telegram ID — reminders won't be sent"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsx(Field, { label: "Class Name", required: true, children: /* @__PURE__ */ jsx(
            "input",
            {
              required: true,
              type: "text",
              placeholder: "e.g. Piano Lesson",
              value: form.className,
              onChange: (e) => setForm({ ...form, className: e.target.value }),
              className: inputCls
            }
          ) }),
          /* @__PURE__ */ jsx(Field, { label: "Type", children: /* @__PURE__ */ jsxs(
            "select",
            {
              value: form.classType,
              onChange: (e) => setForm({ ...form, classType: e.target.value }),
              className: inputCls,
              children: [
                /* @__PURE__ */ jsx("option", { value: "online", children: "💻 Online" }),
                /* @__PURE__ */ jsx("option", { value: "onsite", children: "🏫 Onsite" })
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsx(Field, { label: "Day", children: /* @__PURE__ */ jsx(
            "select",
            {
              value: form.dayOfWeek,
              onChange: (e) => setForm({ ...form, dayOfWeek: +e.target.value }),
              className: inputCls,
              children: DAYS.map((d, i) => /* @__PURE__ */ jsx("option", { value: i, children: d }, d))
            }
          ) }),
          /* @__PURE__ */ jsx(Field, { label: "Time", children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "time",
              value: form.time,
              onChange: (e) => setForm({ ...form, time: e.target.value }),
              className: inputCls
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsx(Field, { label: "Duration", children: /* @__PURE__ */ jsx(
            "select",
            {
              value: form.duration,
              onChange: (e) => setForm({ ...form, duration: +e.target.value }),
              className: inputCls,
              children: [30, 45, 60, 90, 120].map((d) => /* @__PURE__ */ jsxs("option", { value: d, children: [
                d,
                " min"
              ] }, d))
            }
          ) }),
          /* @__PURE__ */ jsx(Field, { label: "Remind Before", children: /* @__PURE__ */ jsx(
            "select",
            {
              value: form.reminderMinutes,
              onChange: (e) => setForm({ ...form, reminderMinutes: +e.target.value }),
              className: inputCls,
              children: [5, 15, 30, 60, 120, 1440].map((m) => /* @__PURE__ */ jsxs("option", { value: m, children: [
                m >= 60 ? `${m / 60}h` : `${m}min`,
                " before"
              ] }, m))
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setForm({ ...form, active: !form.active }),
              className: `relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.active ? "bg-emerald-500" : "bg-gray-300"}`,
              children: /* @__PURE__ */ jsx("span", { className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${form.active ? "translate-x-6" : "translate-x-1"}` })
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600", children: form.active ? "Active — reminders will be sent" : "Paused — no reminders" })
        ] }),
        form.studentId && form.className && /* @__PURE__ */ jsxs("div", { className: "bg-purple-50 border border-purple-100 rounded-xl p-4", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold text-purple-600 uppercase tracking-wider mb-3", children: "📱 Telegram Preview" }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white border border-purple-100 rounded-lg p-3 text-sm text-gray-700 space-y-0.5 font-mono shadow-sm", children: [
            /* @__PURE__ */ jsxs("p", { children: [
              form.classType === "online" ? "💻" : "🏫",
              " ",
              /* @__PURE__ */ jsx("b", { className: "text-gray-900", children: "Class Reminder" })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "mt-1", children: [
              "Hi ",
              /* @__PURE__ */ jsx("b", { className: "text-purple-600", children: selectedStudent?.name }),
              "!"
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "mt-1", children: [
              "📚 ",
              /* @__PURE__ */ jsx("span", { className: "text-purple-600", children: form.className })
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              "⏰ ",
              /* @__PURE__ */ jsx("span", { className: "text-purple-600", children: form.time })
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              "📍 ",
              /* @__PURE__ */ jsx("span", { className: "text-purple-600", children: form.classType.toUpperCase() })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3 pt-1", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: closeModal,
              className: "flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition-colors",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: submitting,
              className: "flex-1 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2",
              children: submitting ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("div", { className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }),
                " Saving..."
              ] }) : editingId ? "Save Changes" : "Create Schedule"
            }
          )
        ] })
      ] })
    ] }) }),
    deleteTarget && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-200 rounded-2xl w-full max-w-sm shadow-xl fade-up p-6", children: [
      /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-red-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" }) }) }),
      /* @__PURE__ */ jsx("h3", { className: "text-base font-bold text-gray-900 mb-1", children: "Delete Schedule" }),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-sm mb-6", children: [
        "Delete ",
        /* @__PURE__ */ jsxs("strong", { className: "text-gray-900", children: [
          '"',
          deleteTarget.className,
          '"'
        ] }),
        " for",
        " ",
        /* @__PURE__ */ jsx("strong", { className: "text-gray-900", children: deleteTarget.studentId.name }),
        "? This cannot be undone."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setDeleteTarget(null),
            className: "flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition-colors",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsx(
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
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { userId } = Astro2.locals.auth();
  if (!userId) return Astro2.redirect("/admin/login");
  let schedules = [];
  let students = [];
  try {
    await connectDB();
    const [rawSchedules, rawStudents] = await Promise.all([
      Schedule.find().populate("studentId", "name telegramChatId phone").sort({ dayOfWeek: 1, time: 1 }).lean(),
      Student.find({ active: true }).sort({ name: 1 }).lean()
    ]);
    schedules = JSON.parse(JSON.stringify(rawSchedules));
    students = JSON.parse(JSON.stringify(rawStudents));
  } catch (err) {
    console.error("Failed to load schedules:", err);
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Class Schedules | YSC Admin", "description": "Manage class schedules and Telegram reminders" }, { "default": async ($$result2) => renderTemplate`${renderComponent($$result2, "SchedulesManager", SchedulesManager, { "client:load": true, "initialSchedules": schedules, "initialStudents": students, "client:component-hydration": "load", "client:component-path": "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/components/admin/ScheduleManager.tsx", "client:component-export": "default" })} ` })}`;
}, "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/pages/admin/schedules/index.astro", void 0);
const $$file = "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/pages/admin/schedules/index.astro";
const $$url = "/admin/schedules";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};
