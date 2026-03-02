import { f as createComponent, l as renderComponent, r as renderTemplate } from "../chunks/astro/server_DobZlz4c.mjs";
import "piccolore";
import { $ as $$Homepage } from "../chunks/homepage_CxeI53o9.mjs";
import { $ as $$Layout } from "../chunks/Layout_Bfcy0bh8.mjs";
import { renderers } from "../renderers.mjs";
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
  renderers
};
