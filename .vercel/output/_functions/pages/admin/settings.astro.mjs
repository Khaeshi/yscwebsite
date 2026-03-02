import { e as createAstro, f as createComponent, l as renderComponent, r as renderTemplate } from "../../chunks/astro/server_Cfl3Ur0m.mjs";
import { $ as $$AdminLayout } from "../../chunks/AdminLayout_4C0Bauqp.mjs";
import { j as jsxRuntimeExports } from "../../chunks/jsx-runtime_mS7YKmDK.mjs";
import { a as reactExports } from "../../chunks/_@astro-renderers_B4KjVBz-.mjs";
import { r } from "../../chunks/_@astro-renderers_B4KjVBz-.mjs";
function Toast({ toast, onDismiss }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl text-sm font-medium backdrop-blur-sm ${toast.type === "success" ? "bg-white border border-emerald-100 text-emerald-800" : "bg-white border border-red-100 text-red-800"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-2 h-2 rounded-full flex-shrink-0 ${toast.type === "success" ? "bg-emerald-400" : "bg-red-400"}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: toast.message }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onDismiss, className: "opacity-30 hover:opacity-60 transition-opacity ml-1", children: "✕" })
  ] });
}
const inputCls = "w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all placeholder-gray-300 bg-white";
const labelCls = "block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5";
const TABS = [
  {
    id: "general",
    label: "General",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" }) })
  },
  {
    id: "telegram",
    label: "Telegram Bot",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 13.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z" }) })
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" }) })
  },
  {
    id: "danger",
    label: "Danger Zone",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" }) })
  }
];
function SaveButton({ saving, onClick }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      onClick,
      disabled: saving,
      className: "inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 active:bg-violet-800 disabled:opacity-60 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm shadow-violet-200 hover:shadow-md hover:shadow-violet-200",
      children: saving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }),
        "Saving…"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }),
        "Save Changes"
      ] })
    }
  );
}
function SettingsManager() {
  const [activeTab, setActiveTab] = reactExports.useState("general");
  const [saving, setSaving] = reactExports.useState(false);
  const [toasts, setToasts] = reactExports.useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = reactExports.useState(false);
  const [general, setGeneral] = reactExports.useState({
    schoolName: "YSC Language School",
    schoolEmail: "admin@ysc.com",
    schoolPhone: "",
    timezone: "Asia/Manila",
    currency: "PHP"
  });
  const [telegram, setTelegram] = reactExports.useState({
    botToken: "",
    botUsername: "",
    defaultReminderMinutes: "60",
    reminderMessage: "Hi {name}! Reminder: your {class} class starts in {minutes} minutes. See you soon! 📚"
  });
  const [notifications, setNotifications] = reactExports.useState({
    emailOnNewStudent: true,
    emailOnScheduleChange: true,
    telegramReminders: true,
    reminderBeforeClass: true
  });
  function addToast(message, type = "success") {
    const id = Date.now();
    setToasts((p) => [...p, { id, message, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 4e3);
  }
  async function handleSave(section) {
    setSaving(true);
    try {
      await new Promise((r2) => setTimeout(r2, 800));
      addToast(`${section} settings saved successfully`);
    } catch {
      addToast("Failed to save settings", "error");
    } finally {
      setSaving(false);
    }
  }
  TABS.find((t) => t.id === activeTab);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-gray-900 max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed top-4 right-4 z-[200] flex flex-col gap-2 w-72 pointer-events-none", children: toasts.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Toast, { toast: t, onDismiss: () => setToasts((p) => p.filter((x) => x.id !== t.id)) }) }, t.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-gray-900 tracking-tight", children: "Settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm mt-0.5", children: "Manage your school and system preferences" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex sm:hidden gap-2 mb-4 overflow-x-auto pb-1 -mx-3 px-3", children: TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => setActiveTab(tab.id),
        className: `flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${activeTab === tab.id ? tab.id === "danger" ? "bg-red-500 text-white shadow-sm" : "bg-violet-600 text-white shadow-sm" : "bg-white border border-gray-200 text-gray-500 hover:border-gray-300"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-80", children: tab.icon }),
          tab.label
        ]
      },
      tab.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "hidden sm:block w-44 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white border border-gray-100 rounded-2xl p-2 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "space-y-0.5", children: TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setActiveTab(tab.id),
          className: `w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${activeTab === tab.id ? tab.id === "danger" ? "bg-red-50 text-red-600" : "bg-violet-50 text-violet-700" : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: activeTab === tab.id ? tab.id === "danger" ? "text-red-500" : "text-violet-500" : "text-gray-400", children: tab.icon }),
            tab.label
          ]
        },
        tab.id
      )) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        activeTab === "general" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-gray-50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-gray-900", children: "General" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-0.5", children: "Basic information about your school" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "School Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  value: general.schoolName,
                  onChange: (e) => setGeneral({ ...general, schoolName: e.target.value }),
                  className: inputCls
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Admin Email" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "email",
                    value: general.schoolEmail,
                    onChange: (e) => setGeneral({ ...general, schoolEmail: e.target.value }),
                    className: inputCls
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Phone" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "tel",
                    placeholder: "+63 917 123 4567",
                    value: general.schoolPhone,
                    onChange: (e) => setGeneral({ ...general, schoolPhone: e.target.value }),
                    className: inputCls
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Timezone" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    value: general.timezone,
                    onChange: (e) => setGeneral({ ...general, timezone: e.target.value }),
                    className: inputCls,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Asia/Manila", children: "Asia/Manila (PHT)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Asia/Singapore", children: "Asia/Singapore (SGT)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "UTC", children: "UTC" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Currency" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    value: general.currency,
                    onChange: (e) => setGeneral({ ...general, currency: e.target.value }),
                    className: inputCls,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "PHP", children: "PHP (₱)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "USD", children: "USD ($)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "SGD", children: "SGD (S$)" })
                    ]
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-4 bg-gray-50/50 border-t border-gray-50 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SaveButton, { saving, onClick: () => handleSave("General") }) })
        ] }),
        activeTab === "telegram" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-gray-50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-gray-900", children: "Telegram Bot" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-0.5", children: "Automated class reminders via Telegram" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-5 mt-5 flex gap-3 bg-sky-50 border border-sky-100 rounded-xl p-3.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z", clipRule: "evenodd" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-sky-700 leading-relaxed", children: [
              "Create a bot via ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "bg-sky-100 px-1 py-0.5 rounded font-mono", children: "@BotFather" }),
              " on Telegram, copy your token, and paste it below."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Bot Token" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "password",
                  placeholder: "123456789:ABCdefGHI…",
                  value: telegram.botToken,
                  onChange: (e) => setTelegram({ ...telegram, botToken: e.target.value }),
                  className: inputCls
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-300 mt-1", children: "Never share this token publicly." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Bot Username" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "@YSCReminderBot",
                    value: telegram.botUsername,
                    onChange: (e) => setTelegram({ ...telegram, botUsername: e.target.value }),
                    className: inputCls
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Remind Before Class" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    value: telegram.defaultReminderMinutes,
                    onChange: (e) => setTelegram({ ...telegram, defaultReminderMinutes: e.target.value }),
                    className: inputCls,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "15", children: "15 minutes" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "30", children: "30 minutes" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "60", children: "1 hour" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "120", children: "2 hours" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "1440", children: "1 day before" })
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Message Template" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  rows: 3,
                  value: telegram.reminderMessage,
                  onChange: (e) => setTelegram({ ...telegram, reminderMessage: e.target.value }),
                  className: inputCls + " resize-none font-mono text-xs leading-relaxed"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mt-1.5", children: ["{name}", "{class}", "{minutes}"].map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-mono", children: v }, v)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 bg-gray-50/50 border-t border-gray-50 flex flex-wrap items-center gap-3 justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => addToast("Test message sent! Check your Telegram."),
                className: "text-sm font-semibold text-gray-500 hover:text-gray-800 flex items-center gap-1.5 transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8" }) }),
                  "Send Test"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SaveButton, { saving, onClick: () => handleSave("Telegram") })
          ] })
        ] }),
        activeTab === "notifications" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-gray-50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-gray-900", children: "Notifications" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-0.5", children: "Choose what events trigger notifications" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-gray-50", children: [
            { key: "emailOnNewStudent", label: "New student registered", desc: "Email when someone new is added to the system" },
            { key: "emailOnScheduleChange", label: "Schedule changes", desc: "Email when classes are created or modified" },
            { key: "telegramReminders", label: "Telegram reminders", desc: "Send automated reminders to students via bot" },
            { key: "reminderBeforeClass", label: "Pre-class alert", desc: "Notify at configured time before each class" }
          ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 px-5 py-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-gray-800", children: item.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-0.5 truncate", children: item.desc })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setNotifications((p) => ({ ...p, [item.key]: !p[item.key] })),
                className: `relative flex-shrink-0 h-6 w-11 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:ring-offset-1 ${notifications[item.key] ? "bg-violet-500" : "bg-gray-200"}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${notifications[item.key] ? "translate-x-5" : "translate-x-0"}` })
              }
            )
          ] }, item.key)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-4 bg-gray-50/50 border-t border-gray-50 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SaveButton, { saving, onClick: () => handleSave("Notifications") }) })
        ] }),
        activeTab === "danger" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-red-100 rounded-2xl shadow-sm overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-red-50 bg-red-50/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-red-600", children: "Danger Zone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-400 mt-0.5", children: "Irreversible actions — proceed carefully" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-gray-50", children: [
            {
              label: "Clear All Schedules",
              desc: "Permanently delete all class schedules.",
              action: "Clear",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }) })
            },
            {
              label: "Reset Student Data",
              desc: "Remove all students and their records.",
              action: "Reset",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" }) })
            },
            {
              label: "Factory Reset",
              desc: "Wipe everything and return to default state.",
              action: "Reset All",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" }) })
            }
          ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 px-5 py-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-400 flex-shrink-0", children: item.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-gray-800", children: item.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-0.5", children: item.desc })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => addToast(`"${item.action}" requires confirmation — not yet implemented`, "error"),
                className: "flex-shrink-0 border border-red-200 text-red-500 hover:bg-red-50 active:bg-red-100 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors",
                children: item.action
              }
            )
          ] }, item.label)) })
        ] })
      ] })
    ] })
  ] });
}
const $$Astro = createAstro("https://youngstarterclub.asia");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { userId } = Astro2.locals.auth();
  if (!userId) return Astro2.redirect("/admin/login");
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Settings | YSC Admin", "description": "System settings and configuration" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "SettingsManager", SettingsManager, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/components/admin/SettingsManager.tsx", "client:component-export": "default" })} ` })}`;
}, "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/pages/admin/settings/index.astro", void 0);
const $$file = "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/pages/admin/settings/index.astro";
const $$url = "/admin/settings";
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
