import { f as createComponent, l as renderComponent, r as renderTemplate, m as maybeRenderHead } from "../chunks/astro/server_CoVo9Zif.mjs";
import { I as InstructorProfile, P as ProgramHistorySection } from "../chunks/ProgramHistorySection_DLdm7s9a.mjs";
import { P as ParallaxHero, A as Award } from "../chunks/ParallaxHero_BLGZC7ec.mjs";
import { P as ParallaxSection } from "../chunks/ParallaxSection_CqyAxdqf.mjs";
import { $ as $$Layout } from "../chunks/Layout_CSr6873l.mjs";
import { e as cookingimageUrl, D as Desiree } from "../chunks/config_DXHxkv4J.mjs";
import { c as createLucideIcon, C as ChefHat } from "../chunks/index_Dwb88roV.mjs";
import { U as Users } from "../chunks/users_BNE7VzAO.mjs";
import { r } from "../chunks/_@astro-renderers_DOBI-D1Y.mjs";
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2", key: "cjf0a3" }],
  ["path", { d: "M7 2v20", key: "1473qp" }],
  ["path", { d: "M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7", key: "j28e5" }]
];
const Utensils = createLucideIcon("utensils", __iconNode);
const $$CookingSession = createComponent(($$result, $$props, $$slots) => {
  const instructors = [
    {
      name: "Chef Desiree Tablante",
      title: "Executive Chef & Culinary Director",
      image: Desiree,
      specialization: ["Filipino Cuisine", "Baking & Pastry", "Healthy Cooking", "Food Safety"],
      experience: "16+ years culinary experience",
      description: "Chef Andrea trained at the Culinary Institute of America and worked in fine dining restaurants before discovering her passion for teaching. She specializes in making cooking accessible and fun for all ages while emphasizing nutrition, food safety, and cultural appreciation. Andrea believes cooking is a life skill that builds confidence, creativity, and brings families together. Her warm, patient teaching style puts even nervous beginners at ease.",
      achievements: [
        "Culinary Institute of America graduate with honors",
        "Former sous chef at award-winning restaurants",
        "Certified in ServSafe food safety and allergen awareness",
        "Developed kid-friendly cooking curriculum used by schools"
      ]
    }
  ];
  const historyMilestones = [
    {
      year: "2013",
      title: "Kitchen Launch",
      description: "Opened our teaching kitchen with state-of-the-art equipment and a mission to inspire young chefs of all ages."
    }
  ];
  const pageTitle = "Learn to Cook: Beginner Class | Young Starter Club";
  const description = "Discover the joy of cooking! Here at Young Starter Club, our beginner cooking class will give you the confidence to create amazing meals.";
  const image = "/assets/YSC.png";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": pageTitle, "description": description, "image": image }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-white">  ${renderComponent($$result2, "ParallaxHero", ParallaxHero, { "imageUrl": cookingimageUrl, "title": "Create Delicious Memories", "subtitle": "Learn the joy of cooking through hands-on culinary sessions! From basic kitchen safety to creating impressive dishes, develop practical cooking skills, nutritional knowledge, and confidence in the kitchen.", "stats": [
    { number: "13+", label: "Students" },
    { number: "50+", label: "Recipes Taught" },
    { number: "18+", label: "Years Experience" },
    { number: "8+", label: "Monthly Classes" }
  ], "showBackButton": true, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/components/ParallaxHero.tsx", "client:component-export": "ParallaxHero" })}   <section class="py-20 bg-white"> <div class="container mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-12"> <h2 class="mb-4">Culinary Skills for Life</h2> <p class="text-muted-foreground max-w-2xl mx-auto">
Learn essential cooking skills in a fun, safe, and supportive environment
</p> </div> <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"> <div class="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-8 border border-orange-100"> <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center mb-4"> ${renderComponent($$result2, "ChefHat", ChefHat, { "className": "w-6 h-6 text-white" })} </div> <h3 class="mb-3">Hands-On Learning</h3> <p class="text-muted-foreground">Cook complete dishes from start to finish, developing real-world culinary skills.</p> </div> <div class="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-8 border border-orange-100"> <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center mb-4"> ${renderComponent($$result2, "Utensils", Utensils, { "className": "w-6 h-6 text-white" })} </div> <h3 class="mb-3">World Cuisines</h3> <p class="text-muted-foreground">Explore flavors from around the globe, learning about cultures through food.</p> </div> <div class="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-8 border border-orange-100"> <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center mb-4"> ${renderComponent($$result2, "Award", Award, { "className": "w-6 h-6 text-white" })} </div> <h3 class="mb-3">Take Home Your Food</h3> <p class="text-muted-foreground">Share your delicious creations with family and friends after every class.</p> </div> </div> </div> </section>  <section class="py-20 bg-gradient-to-br from-orange-50 to-yellow-50"> <div class="container mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-12"> <h2 class="mb-4">Meet Our Culinary Team</h2> <p class="text-muted-foreground max-w-2xl mx-auto">
Learn from professional chefs who are passionate about food education
</p> </div> <div class="space-y-8"> ${instructors.map((instructor, index) => renderTemplate`${renderComponent($$result2, "InstructorProfile", InstructorProfile, { "key": index, ...instructor })}`)} </div> </div> </section>  <section class="py-20 bg-white"> <div class="container mx-auto px-4 sm:px-6 lg:px-8"> ${renderComponent($$result2, "ProgramHistorySection", ProgramHistorySection, { "image": "https://images.unsplash.com/photo-1609211373254-b52e03ba0c85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwa2l0Y2hlbiUyMGNsYXNzfGVufDF8fHx8MTc2MDM0MTE1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", "foundedYear": "2013", "milestones": historyMilestones, "stats": [
    { icon: Users, value: "350+", label: "Students" },
    { icon: Award, value: "500+", label: "Recipes" },
    { icon: ChefHat, value: "100+", label: "Classes" }
  ] })} </div> </section>  ${renderComponent($$result2, "ParallaxSection", ParallaxSection, { "imageUrl": "https://images.unsplash.com/photo-1556911073-38141963c9e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwZm9vZCUyMGRlbGljaW91c3xlbnwxfHx8fDE3NjQ1NzcwMzR8MA&ixlib=rb-4.1.0&q=80&w=1080", "className": "py-20" }, { "default": ($$result3) => renderTemplate` <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center"> ${renderComponent($$result3, "ChefHat", ChefHat, { "className": "w-12 h-12 mx-auto mb-6 text-yellow-300" })} <h2 class="mb-6 text-white">Ready to Start Cooking?</h2> <p class="mb-8 max-w-2xl mx-auto text-white/90">
Join our culinary community and discover the joy of cooking. Contact us on Facebook to book your first session!
</p> <a href="https://www.facebook.com/YSCcommunity" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 bg-white text-orange-600 hover:bg-white/90 hover:text-orange-700 shadow-xl px-5 py-2 rounded-lg font-medium text-sm">
Message Us on Facebook
</a> </div> ` })} </div> ` })}`;
}, "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/pages/cooking-session.astro", void 0);
const $$file = "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/pages/cooking-session.astro";
const $$url = "/cooking-session";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$CookingSession,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
