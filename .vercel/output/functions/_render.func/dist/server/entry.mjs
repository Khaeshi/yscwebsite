import { r as renderers } from "./chunks/_@astro-renderers_B4KjVBz-.mjs";
import { c as createExports, s as serverEntrypointModule } from "./chunks/_@astrojs-ssr-adapter_CPrviCHG.mjs";
import { manifest } from "./manifest_vax_Ht_T.mjs";
const serverIslandMap = /* @__PURE__ */ new Map();
;
const _page0 = () => import("./pages/_image.astro.mjs");
const _page1 = () => import("./pages/404.astro.mjs");
const _page2 = () => import("./pages/aboutpage.astro.mjs");
const _page3 = () => import("./pages/admin/login.astro.mjs");
const _page4 = () => import("./pages/admin/programs.astro.mjs");
const _page5 = () => import("./pages/admin/schedules.astro.mjs");
const _page6 = () => import("./pages/admin/settings.astro.mjs");
const _page7 = () => import("./pages/admin/students.astro.mjs");
const _page8 = () => import("./pages/admin.astro.mjs");
const _page9 = () => import("./pages/api/schedules/test/_id_.astro.mjs");
const _page10 = () => import("./pages/api/schedules/_id_.astro.mjs");
const _page11 = () => import("./pages/api/schedules.astro.mjs");
const _page12 = () => import("./pages/api/send-reminders.astro.mjs");
const _page13 = () => import("./pages/api/stats.astro.mjs");
const _page14 = () => import("./pages/api/students/_id_.astro.mjs");
const _page15 = () => import("./pages/api/students.astro.mjs");
const _page16 = () => import("./pages/api/webhooks/messenger.astro.mjs");
const _page17 = () => import("./pages/api/webhooks/telegram.astro.mjs");
const _page18 = () => import("./pages/arts-lesson.astro.mjs");
const _page19 = () => import("./pages/badminton-coaching.astro.mjs");
const _page20 = () => import("./pages/cooking-session.astro.mjs");
const _page21 = () => import("./pages/events/event-guidelines.astro.mjs");
const _page22 = () => import("./pages/homepage.astro.mjs");
const _page23 = () => import("./pages/music-teaching.astro.mjs");
const _page24 = () => import("./pages/photography-classes.astro.mjs");
const _page25 = () => import("./pages/quizprogram/find-your-program.astro.mjs");
const _page26 = () => import("./pages/index.astro.mjs");
const pageMap = /* @__PURE__ */ new Map([
  ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
  ["src/pages/404.astro", _page1],
  ["src/pages/aboutpage.astro", _page2],
  ["src/pages/admin/login/index.astro", _page3],
  ["src/pages/admin/programs/index.astro", _page4],
  ["src/pages/admin/schedules/index.astro", _page5],
  ["src/pages/admin/settings/index.astro", _page6],
  ["src/pages/admin/students/index.astro", _page7],
  ["src/pages/admin/index.astro", _page8],
  ["src/pages/api/schedules/test/[id].ts", _page9],
  ["src/pages/api/schedules/[id].ts", _page10],
  ["src/pages/api/schedules/index.ts", _page11],
  ["src/pages/api/send-reminders.ts", _page12],
  ["src/pages/api/stats.ts", _page13],
  ["src/pages/api/students/[id].ts", _page14],
  ["src/pages/api/students.ts", _page15],
  ["src/pages/api/webhooks/messenger.ts", _page16],
  ["src/pages/api/webhooks/telegram.ts", _page17],
  ["src/pages/arts-lesson.astro", _page18],
  ["src/pages/badminton-coaching.astro", _page19],
  ["src/pages/cooking-session.astro", _page20],
  ["src/pages/Events/event-guidelines.astro", _page21],
  ["src/pages/homepage.astro", _page22],
  ["src/pages/music-teaching.astro", _page23],
  ["src/pages/photography-classes.astro", _page24],
  ["src/pages/QuizProgram/find-your-program.astro", _page25],
  ["src/pages/index.astro", _page26]
]);
const _manifest = Object.assign(manifest, {
  pageMap,
  serverIslandMap,
  renderers,
  actions: () => import("./noop-entrypoint.mjs"),
  middleware: () => import("./_astro-internal_middleware.mjs")
});
const _args = {
  "middlewareSecret": "323f5dcd-04f4-46df-843e-caae4d27331b",
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
