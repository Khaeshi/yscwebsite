import { f as createComponent, l as renderComponent, r as renderTemplate, e as createAstro, k as renderHead } from "../../chunks/astro/server_CoVo9Zif.mjs";
/* empty css                                    */
import { $ as $$InternalUIComponentRenderer } from "../../chunks/InternalUIComponentRenderer_B2vWWpGe.mjs";
import { r } from "../../chunks/_@astro-renderers_DOBI-D1Y.mjs";
const $$Astro$1 = createAstro("https://youngstarterclub.asia");
const $$SignIn = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SignIn;
  return renderTemplate`${renderComponent($$result, "InternalUIComponentRenderer", $$InternalUIComponentRenderer, { ...Astro2.props, "component": "sign-in" })}`;
}, "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/node_modules/@clerk/astro/components/interactive/SignIn.astro", void 0);
const $$Astro = createAstro("https://youngstarterclub.asia");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { userId } = Astro2.locals.auth();
  if (userId) {
    return Astro2.redirect("/admin");
  }
  return renderTemplate`<html lang="en" data-astro-cid-6maxmw56> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Admin Login - YSC</title>${renderHead()}</head> <body data-astro-cid-6maxmw56> <div class="container" data-astro-cid-6maxmw56> <div class="logo" data-astro-cid-6maxmw56> <h1 data-astro-cid-6maxmw56>🎵 YSC Admin</h1> <p data-astro-cid-6maxmw56>Young Starter Club</p> </div> <!-- Clerk Sign In Component --> <!-- signUpUrl="" hides the signup option --> ${renderComponent($$result, "SignIn", $$SignIn, { "signUpUrl": "", "routing": "path", "path": "/admin/login", "afterSignInUrl": "/admin", "data-astro-cid-6maxmw56": true })} </div> </body></html>`;
}, "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/pages/admin/login/index.astro", void 0);
const $$file = "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/pages/admin/login/index.astro";
const $$url = "/admin/login";
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
