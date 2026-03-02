import { f as createComponent, l as renderComponent, r as renderTemplate, m as maybeRenderHead } from "../chunks/astro/server_DobZlz4c.mjs";
import "piccolore";
import { I as InstructorProfile, P as ProgramHistorySection } from "../chunks/ProgramHistorySection_SS-j60By.mjs";
import { P as ParallaxHero } from "../chunks/ParallaxHero_CZ0ZJHsT.mjs";
import { P as ParallaxSection } from "../chunks/ParallaxSection_YIOqwsWN.mjs";
import { Camera, Image, Award, Users } from "lucide-react";
import { $ as $$Layout } from "../chunks/Layout_Bfcy0bh8.mjs";
import { renderers } from "../renderers.mjs";
const $$PhotographyClasses = createComponent(($$result, $$props, $$slots) => {
  const instructors = [
    {
      name: "",
      title: "Lead Photography Instructor & Visual Storyteller",
      image: "",
      specialization: ["Portrait Photography", "Composition", "Natural Lighting", "Photo Editing"],
      experience: "",
      description: "",
      achievements: [
        "Published in National Geographic and major magazines",
        "Winner of International Photography Awards",
        "Documentary photographer with global exhibitions",
        "Adobe Certified Expert in Lightroom and Photoshop"
      ]
    }
  ];
  const historyMilestones = [
    {
      year: "2014",
      title: "Vision Begins",
      description: "Started photography classes with a mission to make professional photography education accessible to all ages and skill levels."
    },
    {
      year: "2017",
      title: "Digital Expansion",
      description: "Added mobile photography and social media content creation courses, embracing modern photography trends."
    },
    {
      year: "2021",
      title: "Portfolio Program",
      description: "Launched student portfolio development program, helping aspiring photographers build professional collections."
    },
    {
      year: "2024",
      title: "Creative Community",
      description: "Grew to 250+ students with regular photo walks, exhibitions, and partnerships with local galleries."
    }
  ];
  const pageTitle = "Photography | Young Starter Club";
  const description = "Learn more about Young Starter Club's photography classes";
  const image = "/assets/YSC.png";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": pageTitle, "description": description, "image": image }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-white">  ${renderComponent($$result2, "ParallaxHero", ParallaxHero, { "imageUrl": "https://images.unsplash.com/photo-1727106996133-a22d17fba4be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoeSUyMGluc3RydWN0b3IlMjBjYW1lcmF8ZW58MXx8fHwxNzY0MTYxMDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080", "title": "Capture Your Vision", "subtitle": "Discover the art and technical skills of photography. Learn composition, lighting, and storytelling through images. From smartphone photography to DSLR techniques, we cover everything you need to create stunning photos.", "stats": [
    { number: "9+", label: "Students" },
    { number: "8+", label: "Exhibitions" },
    { number: "8", label: "Years Experience" },
    { number: "30+", label: "Photo Walks" }
  ], "showBackButton": true, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/components/ParallaxHero.tsx", "client:component-export": "ParallaxHero" })}   <section class="py-20 bg-white"> <div class="container mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-12"> <h2 class="mb-4">Photography Education</h2> <p class="text-muted-foreground max-w-2xl mx-auto">
Comprehensive photography training for all skill levels and camera types
</p> </div> <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"> <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100"> <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4"> ${renderComponent($$result2, "Camera", Camera, { "className": "w-6 h-6 text-white" })} </div> <h3 class="mb-3">Any Camera Welcome</h3> <p class="text-muted-foreground">Learn with your smartphone, point-and-shoot, or DSLR. We teach techniques for any camera.</p> </div> <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100"> <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4"> ${renderComponent($$result2, "Image", Image, { "className": "w-6 h-6 text-white" })} </div> <h3 class="mb-3">Photo Walks & Field Trips</h3> <p class="text-muted-foreground">Practice photography in diverse real-world settings, from urban streets to nature trails.</p> </div> <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100"> <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4"> ${renderComponent($$result2, "Award", Award, { "className": "w-6 h-6 text-white" })} </div> <h3 class="mb-3">Editing Mastery</h3> <p class="text-muted-foreground">Learn professional editing techniques using Lightroom, Photoshop, and mobile apps.</p> </div> </div> </div> </section>  <section class="py-20 bg-gradient-to-br from-green-50 to-emerald-50"> <div class="container mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-12"> <h2 class="mb-4">Meet Our Photography Instructors</h2> <p class="text-muted-foreground max-w-2xl mx-auto">
Learn from professional photographers who live and breathe visual storytelling
</p> </div> <div class="space-y-8"> ${instructors.map((instructor, index) => renderTemplate`${renderComponent($$result2, "InstructorProfile", InstructorProfile, { "key": index, ...instructor })}`)} </div> </div> </section>  <section class="py-20 bg-white"> <div class="container mx-auto px-4 sm:px-6 lg:px-8"> ${renderComponent($$result2, "ProgramHistorySection", ProgramHistorySection, { "image": "https://images.unsplash.com/photo-1486892539609-d5322f938c50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoeSUyMGNhbWVyYSUyMHdvcmtzaG9wfGVufDF8fHx8MTc2MDM0MTE1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", "foundedYear": "2014", "milestones": historyMilestones, "stats": [
    { icon: Users, value: "250+", label: "Students" },
    { icon: Award, value: "20+", label: "Exhibitions" },
    { icon: Camera, value: "500+", label: "Photo Walks" }
  ] })} </div> </section>  ${renderComponent($$result2, "ParallaxSection", ParallaxSection, { "imageUrl": "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoeSUyMGNhbWVyYSUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NjQ1NzcxMDF8MA&ixlib=rb-4.1.0&q=80&w=1080", "className": "py-20" }, { "default": ($$result3) => renderTemplate` <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center"> ${renderComponent($$result3, "Camera", Camera, { "className": "w-12 h-12 mx-auto mb-6 text-yellow-300" })} <h2 class="mb-6 text-white">Ready to Capture Amazing Photos?</h2> <p class="mb-8 max-w-2xl mx-auto text-white/90">
Join our photography community and start creating stunning images. Contact us on Facebook to enroll today!
</p> <a href="https://www.facebook.com/YSCcommunity" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 bg-white text-green-600 hover:bg-white/90 hover:text-green-700 shadow-xl px-5 py-2 rounded-lg font-medium text-sm">
Message Us on Facebook
</a> </div> ` })} </div> ` })}`;
}, "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/pages/photography-classes.astro", void 0);
const $$file = "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/pages/photography-classes.astro";
const $$url = "/photography-classes";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$PhotographyClasses,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};
