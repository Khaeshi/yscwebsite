import { f as createComponent, l as renderComponent, r as renderTemplate } from "../chunks/astro/server_Cfl3Ur0m.mjs";
import { $ as $$Homepage } from "../chunks/homepage_DLeXceTM.mjs";
import { $ as $$Layout } from "../chunks/Layout_3Hh_btxP.mjs";
import { r } from "../chunks/_@astro-renderers_B4KjVBz-.mjs";
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
