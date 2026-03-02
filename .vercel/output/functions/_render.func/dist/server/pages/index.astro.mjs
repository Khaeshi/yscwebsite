import { f as createComponent, l as renderComponent, r as renderTemplate } from "../chunks/astro/server_CoVo9Zif.mjs";
import { $ as $$Homepage } from "../chunks/homepage_DSLUS0B8.mjs";
import { $ as $$Layout } from "../chunks/Layout_CSr6873l.mjs";
import { r } from "../chunks/_@astro-renderers_DOBI-D1Y.mjs";
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const pageTitle = "Homepage | Young Starter Club";
  const description = "Welcome to the Young Starter Club homepage!";
  const image = "/assets/YSC.png";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": pageTitle, "description": description, "image": image }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HomePage", $$Homepage, {})} ` })}`;
}, "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/pages/index.astro", void 0);
const $$file = "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/pages/index.astro";
const $$url = "";
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
