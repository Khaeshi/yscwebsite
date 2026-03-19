import { r as renderers } from "./chunks/_@astro-renderers_BiNbQtZO.mjs";
import { c as createExports, s as serverEntrypointModule } from "./chunks/_@astrojs-ssr-adapter_pEnu3wgD.mjs";
import { manifest } from "./manifest_PPoe5Fuv.mjs";
const serverIslandMap = /* @__PURE__ */ new Map();
;
const _page0 = () => import("./pages/_image.astro.mjs");
const _page1 = () => import("./pages/404.astro.mjs");
const _page2 = () => import("./pages/aboutpage.astro.mjs");
const _page3 = () => import("./pages/admin/events/_id_/registrants.astro.mjs");
const _page4 = () => import("./pages/admin/events.astro.mjs");
const _page5 = () => import("./pages/admin/login.astro.mjs");
const _page6 = () => import("./pages/admin/programs.astro.mjs");
const _page7 = () => import("./pages/admin/schedules.astro.mjs");
const _page8 = () => import("./pages/admin/settings.astro.mjs");
const _page9 = () => import("./pages/admin/students.astro.mjs");
const _page10 = () => import("./pages/admin.astro.mjs");
const _page11 = () => import("./pages/api/events/_id_.astro.mjs");
const _page12 = () => import("./pages/api/events.astro.mjs");
const _page13 = () => import("./pages/api/registrations/_id_.astro.mjs");
const _page14 = () => import("./pages/api/registrations.astro.mjs");
const _page15 = () => import("./pages/api/schedules/test/_id_.astro.mjs");
const _page16 = () => import("./pages/api/schedules/_id_.astro.mjs");
const _page17 = () => import("./pages/api/schedules.astro.mjs");
const _page18 = () => import("./pages/api/send-reminders.astro.mjs");
const _page19 = () => import("./pages/api/stats.astro.mjs");
const _page20 = () => import("./pages/api/students/_id_.astro.mjs");
const _page21 = () => import("./pages/api/students.astro.mjs");
const _page22 = () => import("./pages/api/upload/event-cover.astro.mjs");
const _page23 = () => import("./pages/api/webhooks/messenger.astro.mjs");
const _page24 = () => import("./pages/api/webhooks/telegram.astro.mjs");
const _page25 = () => import("./pages/arts-lesson.astro.mjs");
const _page26 = () => import("./pages/badminton-coaching.astro.mjs");
const _page27 = () => import("./pages/cooking-session.astro.mjs");
const _page28 = () => import("./pages/events/_slug_.astro.mjs");
const _page29 = () => import("./pages/events.astro.mjs");
const _page30 = () => import("./pages/homepage.astro.mjs");
const _page31 = () => import("./pages/music-teaching.astro.mjs");
const _page32 = () => import("./pages/photography-classes.astro.mjs");
const _page33 = () => import("./pages/quizprogram/find-your-program.astro.mjs");
const _page34 = () => import("./pages/index.astro.mjs");
const pageMap = /* @__PURE__ */ new Map([
  ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
  ["src/pages/404.astro", _page1],
  ["src/pages/aboutpage.astro", _page2],
  ["src/pages/admin/events/[id]/registrants.astro", _page3],
  ["src/pages/admin/events/index.astro", _page4],
  ["src/pages/admin/login/index.astro", _page5],
  ["src/pages/admin/programs/index.astro", _page6],
  ["src/pages/admin/schedules/index.astro", _page7],
  ["src/pages/admin/settings/index.astro", _page8],
  ["src/pages/admin/students/index.astro", _page9],
  ["src/pages/admin/index.astro", _page10],
  ["src/pages/api/events/[id].ts", _page11],
  ["src/pages/api/events/index.ts", _page12],
  ["src/pages/api/registrations/[id].ts", _page13],
  ["src/pages/api/registrations/index.ts", _page14],
  ["src/pages/api/schedules/test/[id].ts", _page15],
  ["src/pages/api/schedules/[id].ts", _page16],
  ["src/pages/api/schedules/index.ts", _page17],
  ["src/pages/api/send-reminders.ts", _page18],
  ["src/pages/api/stats.ts", _page19],
  ["src/pages/api/students/[id].ts", _page20],
  ["src/pages/api/students.ts", _page21],
  ["src/pages/api/upload/event-cover.ts", _page22],
  ["src/pages/api/webhooks/messenger.ts", _page23],
  ["src/pages/api/webhooks/telegram.ts", _page24],
  ["src/pages/arts-lesson.astro", _page25],
  ["src/pages/badminton-coaching.astro", _page26],
  ["src/pages/cooking-session.astro", _page27],
  ["src/pages/Events/[slug].astro", _page28],
  ["src/pages/Events/index.astro", _page29],
  ["src/pages/homepage.astro", _page30],
  ["src/pages/music-teaching.astro", _page31],
  ["src/pages/photography-classes.astro", _page32],
  ["src/pages/QuizProgram/find-your-program.astro", _page33],
  ["src/pages/index.astro", _page34]
]);
const _manifest = Object.assign(manifest, {
  pageMap,
  serverIslandMap,
  renderers,
  actions: () => import("./noop-entrypoint.mjs"),
  middleware: () => import("./_astro-internal_middleware.mjs")
});
const _args = {
  "middlewareSecret": "d92f645e-3851-43dc-8a3f-a54934fd152c",
  "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = "start";
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;
export {
  __astrojsSsrVirtualEntry as default,
  pageMap
};
