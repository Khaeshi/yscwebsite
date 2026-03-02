import { e as createAstro, f as createComponent, l as renderComponent, r as renderTemplate } from "../../chunks/astro/server_DobZlz4c.mjs";
import "piccolore";
import { $ as $$AdminLayout } from "../../chunks/AdminLayout_CEkeqrfp.mjs";
import { j as jsxRuntimeExports } from "../../chunks/jsx-runtime_w0bDR4SM.mjs";
import { a as reactExports } from "../../chunks/_@astro-renderers_CovX3xsv.mjs";
import { r } from "../../chunks/_@astro-renderers_CovX3xsv.mjs";
function Toast({ toast, onDismiss }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium border bg-white ${toast.type === "success" ? "border-green-200 text-green-800" : "border-red-200 text-red-800"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-2 h-2 rounded-full flex-shrink-0 ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: toast.message }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onDismiss, className: "opacity-40 hover:opacity-70 text-xs", children: "✕" })
  ] });
}
const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors placeholder-gray-400 bg-white";
const labelCls = "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5";
function SettingsManager() {
  const [activeTab, setActiveTab] = reactExports.useState("general");
  const [saving, setSaving] = reactExports.useState(false);
  const [toasts, setToasts] = reactExports.useState([]);
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
      addToast(`${section} settings saved`);
    } catch {
      addToast("Failed to save settings", "error");
    } finally {
      setSaving(false);
    }
  }
  const tabs = [
    { id: "general", label: "General" },
    { id: "telegram", label: "Telegram Bot" },
    { id: "notifications", label: "Notifications" },
    { id: "danger", label: "Danger Zone" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-gray-900", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed top-4 right-4 z-[200] flex flex-col gap-2 w-72", children: toasts.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(Toast, { toast: t, onDismiss: () => setToasts((p) => p.filter((x) => x.id !== t.id)) }, t.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-sm mt-1", children: "Configure your school and system preferences" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-48 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "space-y-1", children: tabs.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setActiveTab(tab.id),
          className: `w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${activeTab === tab.id ? "bg-purple-50 text-purple-700 border border-purple-200" : "text-gray-600 hover:bg-gray-100"}`,
          children: tab.label
        },
        tab.id
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        activeTab === "general" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-gray-200 rounded-2xl p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold text-gray-900 mb-5", children: "General Settings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-w-lg", children: [
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
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Timezone" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: general.timezone, onChange: (e) => setGeneral({ ...general, timezone: e.target.value }), className: inputCls, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Asia/Manila", children: "Asia/Manila (PHT)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Asia/Singapore", children: "Asia/Singapore (SGT)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "UTC", children: "UTC" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Currency" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: general.currency, onChange: (e) => setGeneral({ ...general, currency: e.target.value }), className: inputCls, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "PHP", children: "PHP (₱)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "USD", children: "USD ($)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "SGD", children: "SGD (S$)" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => handleSave("General"),
                disabled: saving,
                className: "bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2",
                children: saving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }),
                  " Saving..."
                ] }) : "Save Changes"
              }
            ) })
          ] })
        ] }),
        activeTab === "telegram" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-gray-200 rounded-2xl p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold text-gray-900 mb-1", children: "Telegram Bot Settings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 mb-5", children: "Configure your Telegram bot for automated class reminders." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-xl p-4 mb-5 text-sm text-blue-700", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Setup:" }),
            " Create a bot via ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "bg-blue-100 px-1 rounded", children: "@BotFather" }),
            " on Telegram → get your token → paste below."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-w-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Bot Token" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "password",
                  placeholder: "123456789:ABCdefGHI...",
                  value: telegram.botToken,
                  onChange: (e) => setTelegram({ ...telegram, botToken: e.target.value }),
                  className: inputCls
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-1", children: "Keep this secret. Never share it publicly." })
            ] }),
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
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Default Reminder (minutes before class)" }),
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
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Reminder Message Template" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  rows: 3,
                  value: telegram.reminderMessage,
                  onChange: (e) => setTelegram({ ...telegram, reminderMessage: e.target.value }),
                  className: inputCls + " resize-none font-mono text-xs"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400 mt-1", children: [
                "Variables: ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "bg-gray-100 px-1 rounded", children: "{name}" }),
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "bg-gray-100 px-1 rounded", children: "{class}" }),
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "bg-gray-100 px-1 rounded", children: "{minutes}" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => handleSave("Telegram"),
                  disabled: saving,
                  className: "bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2",
                  children: saving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }),
                    " Saving..."
                  ] }) : "Save Changes"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => addToast("Test message sent! Check your Telegram."),
                  className: "border border-gray-200 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors",
                  children: "Send Test Message"
                }
              )
            ] })
          ] })
        ] }),
        activeTab === "notifications" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-gray-200 rounded-2xl p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold text-gray-900 mb-5", children: "Notification Preferences" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-w-lg", children: [
            [
              { key: "emailOnNewStudent", label: "Email when a new student is added", desc: "Receive an email notification for new student registrations" },
              { key: "emailOnScheduleChange", label: "Email on schedule changes", desc: "Get notified when schedules are created or modified" },
              { key: "telegramReminders", label: "Send Telegram reminders to students", desc: "Automatically send class reminders via Telegram bot" },
              { key: "reminderBeforeClass", label: "Pre-class reminder", desc: "Send reminder at the configured time before each class" }
            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 py-3 border-b border-gray-50 last:border-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-gray-900", children: item.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-0.5", children: item.desc })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setNotifications((p) => ({ ...p, [item.key]: !p[item.key] })),
                  className: `relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors ${notifications[item.key] ? "bg-purple-600" : "bg-gray-200"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${notifications[item.key] ? "translate-x-6" : "translate-x-1"}` })
                }
              )
            ] }, item.key)),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => handleSave("Notifications"),
                disabled: saving,
                className: "bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2",
                children: saving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }),
                  " Saving..."
                ] }) : "Save Changes"
              }
            ) })
          ] })
        ] }),
        activeTab === "danger" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-red-200 rounded-2xl p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold text-red-600 mb-1", children: "Danger Zone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 mb-5", children: "These actions are irreversible. Please proceed with caution." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [
            { label: "Clear All Schedules", desc: "Permanently delete all class schedules. Students will not be affected.", action: "Clear Schedules" },
            { label: "Reset Student Data", desc: "Remove all students and their associated data from the system.", action: "Reset Students" },
            { label: "Factory Reset", desc: "Wipe all data and reset the system to its initial state.", action: "Factory Reset" }
          ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 p-4 border border-red-100 rounded-xl bg-red-50/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-gray-900", children: item.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-0.5", children: item.desc })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => addToast(`⚠️ "${item.action}" requires confirmation — not yet implemented`, "error"),
                className: "flex-shrink-0 border border-red-300 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors",
                children: item.action
              }
            )
          ] }, item.label)) })
        ] }) })
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
