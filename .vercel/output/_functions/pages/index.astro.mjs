import { c as createComponent, d as renderComponent, a as renderTemplate } from "../chunks/astro/server_D7hC0Tqo.mjs";
import { $ as $$Homepage } from "../chunks/homepage_Dtng6smP.mjs";
import { $ as $$Layout } from "../chunks/Layout_BHBjKDiv.mjs";
import { r } from "../chunks/_@astro-renderers_BiNbQtZO.mjs";
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const pageTitle = "Homepage | Young Starter Club";
  const description = "Welcome to the Young Starter Club homepage!";
  const image = "/assets/YSC.png";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": pageTitle, "description": description, "image": image }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HomePage", $$Homepage, {})} ` })}`;
}, "C:/Users/Escanorrrrr/OneDrive/Desktop/Khaesey Files/yscwebsite/src/pages/index.astro", void 0);
const $$file = "C:/Users/Escanorrrrr/OneDrive/Desktop/Khaesey Files/yscwebsite/src/pages/index.astro";
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
