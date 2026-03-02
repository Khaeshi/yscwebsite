import { f as createComponent, l as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from "../../chunks/astro/server_Cfl3Ur0m.mjs";
import { C as Card, I as ImageWithFallback, B as Badge } from "../../chunks/ImageWithFallback_DnT8B4a9.mjs";
import { P as ParallaxHero, T as Target, A as Award } from "../../chunks/ParallaxHero_DzPyPLHG.mjs";
import { $ as $$Layout } from "../../chunks/Layout_mRKKubIj.mjs";
import { f as eventUrl } from "../../chunks/config_DXHxkv4J.mjs";
import { c as createLucideIcon, P as Palette, T as Trophy, M as MapPin } from "../../chunks/index_tryOdpTZ.mjs";
import { C as Calendar } from "../../chunks/calendar_CPFXlUdr.mjs";
import { S as Sparkles } from "../../chunks/sparkles_CIAmSsCs.mjs";
import { U as Users } from "../../chunks/users_CVZbG-IS.mjs";
import { S as Star, C as CircleCheck } from "../../chunks/star_duA439qC.mjs";
import { r } from "../../chunks/_@astro-renderers_B4KjVBz-.mjs";
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$4);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$3);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
];
const FileText = createLucideIcon("file-text", __iconNode$2);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { x: "3", y: "8", width: "18", height: "4", rx: "1", key: "bkv52" }],
  ["path", { d: "M12 8v13", key: "1c76mn" }],
  ["path", { d: "M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7", key: "6wjy6b" }],
  [
    "path",
    {
      d: "M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5",
      key: "1ihvrl"
    }
  ]
];
const Gift = createLucideIcon("gift", __iconNode$1);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
      key: "1gvzjb"
    }
  ],
  ["path", { d: "M9 18h6", key: "x1upvd" }],
  ["path", { d: "M10 22h4", key: "ceow96" }]
];
const Lightbulb = createLucideIcon("lightbulb", __iconNode);
const $$EventGuidelines = createComponent(async ($$result, $$props, $$slots) => {
  const judgingCriteria = [
    {
      title: "Creativity",
      percentage: "30%",
      description: "Unique artistic approach and imaginative interpretation of the Christmas theme",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      icon: Lightbulb
    },
    {
      title: "Technicality",
      percentage: "20%",
      description: "Mastery of techniques, proper use of medium, and execution quality",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      icon: Target
    },
    {
      title: "Theme Relevance",
      percentage: "20%",
      description: 'How well the artwork represents "The True Meaning of Christmas"',
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      icon: Star
    },
    {
      title: "Originality",
      percentage: "20%",
      description: "Original creation by the participant, not copied from other sources",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      icon: Sparkles
    },
    {
      title: "Impact",
      percentage: "10%",
      description: "Overall visual impact and emotional connection with viewers",
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      icon: Award
    }
  ];
  const competitionRules = [
    {
      number: "1",
      rule: "Each participant can submit ONE artwork only",
      icon: FileText
    },
    {
      number: "2",
      rule: "Material: Illustration Board, watercolor paper, or canvas (papers like bond paper or any other ordinary paper are NOT ALLOWED)",
      icon: Palette
    },
    {
      number: "3",
      rule: "Medium: Crayons, markers, paint, or any other medium",
      icon: Palette
    },
    {
      number: "4",
      rule: "Artwork should be original and not copied",
      icon: Sparkles
    },
    {
      number: "5",
      rule: "Include the participant's name on the back of the material used",
      icon: Users
    }
  ];
  const pageTitle = "Event Guidelines | Young Starter Club";
  const description = "Events and Description of Party";
  const image = "/assets/YSC.png";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": pageTitle, "description": description, "image": image }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-orange-50"> <!-- Hero Section --> ${renderComponent($$result2, "ParallaxHero", ParallaxHero, { "imageUrl": eventUrl, "title": "I'm Dreaming Of An Art Christmas", "subtitle": `Join us at our art competition happening on December 18, 2025! As we showcase the art of the Christmas fever, we invite our students to participate and share their festive creations.`, "showBackButton": true, ";": true, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/components/ParallaxHero.tsx", "client:component-export": "ParallaxHero" })} <!-- Competition Theme --> <div class="container mx-auto px-4 mb-16 mt-15"> ${renderComponent($$result2, "Card", Card, { "className": "overflow-hidden border-2 border-purple-200" }, { "default": async ($$result3) => renderTemplate` <div class="relative h-80 overflow-hidden"> ${renderComponent($$result3, "ImageWithFallback", ImageWithFallback, { "src": "https://images.unsplash.com/photo-1719935115623-4857df23f3c6?w=1200", "alt": "Art Christmas Competition", "className": "w-full h-full object-cover" })} <div class="absolute inset-0 bg-gradient-to-t from-purple-600 to-pink-600 opacity-60"></div> <div class="absolute inset-0 flex items-center justify-center text-center p-8"> <div> <div class="bg-white/20 backdrop-blur-sm rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6"> ${renderComponent($$result3, "Palette", Palette, { "className": "w-12 h-12 text-white" })} </div> <h2 class="text-white mb-4">Competition Theme</h2> <p class="text-white text-2xl italic mb-4">"The True Meaning of Christmas"</p> <p class="text-white/90 text-lg max-w-2xl mx-auto">
Express your artistic vision of what Christmas truly means through your creative artwork. 
              Show us the spirit, joy, love, and meaning behind this special season! 🎄✨
</p> </div> </div> </div> ` })} </div> <!-- Quick Info Cards --> <div class="container mx-auto px-4 -mt-16 relative z-10 mb-16 mt-15"> <div class="grid md:grid-cols-4 gap-6"> ${renderComponent($$result2, "Card", Card, { "className": "p-6 text-center bg-white/95 backdrop-blur-sm border-2 border-purple-200 hover:shadow-xl transition-shadow" }, { "default": async ($$result3) => renderTemplate` <div class="bg-gradient-to-br from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"> ${renderComponent($$result3, "Calendar", Calendar, { "className": "w-8 h-8 text-white" })} </div> <h3 class="mb-2">Deadline</h3> <p class="text-muted-foreground">December 18, 2025</p> <p class="text-sm text-muted-foreground">(Thursday)</p> ` })} ${renderComponent($$result2, "Card", Card, { "className": "p-6 text-center bg-white/95 backdrop-blur-sm border-2 border-blue-200 hover:shadow-xl transition-shadow" }, { "default": async ($$result3) => renderTemplate` <div class="bg-gradient-to-br from-blue-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"> ${renderComponent($$result3, "Trophy", Trophy, { "className": "w-8 h-8 text-white" })} </div> <h3 class="mb-2">Awards Day</h3> <p class="text-muted-foreground">December 20, 2025</p> <p class="text-sm text-muted-foreground">(Saturday)</p> ` })} ${renderComponent($$result2, "Card", Card, { "className": "p-6 text-center bg-white/95 backdrop-blur-sm border-2 border-orange-200 hover:shadow-xl transition-shadow" }, { "default": async ($$result3) => renderTemplate` <div class="bg-gradient-to-br from-orange-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"> ${renderComponent($$result3, "Gift", Gift, { "className": "w-8 h-8 text-white" })} </div> <h3 class="mb-2">Top Prize</h3> <p class="text-muted-foreground">₱1,000</p> <p class="text-sm text-muted-foreground">Cash Prize</p> ` })} ${renderComponent($$result2, "Card", Card, { "className": "p-6 text-center bg-white/95 backdrop-blur-sm border-2 border-pink-200 hover:shadow-xl transition-shadow" }, { "default": async ($$result3) => renderTemplate` <div class="bg-gradient-to-br from-pink-500 to-rose-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"> ${renderComponent($$result3, "MapPin", MapPin, { "className": "w-8 h-8 text-white" })} </div> <h3 class="mb-2">Submission</h3> <p class="text-muted-foreground">YSC Studio</p> <p class="text-sm text-muted-foreground">In Person</p> ` })} </div> </div> <!-- Competition Rules --> <div class="bg-white py-16 mb-16"> <div class="container mx-auto px-4"> <div class="text-center mb-12"> ${renderComponent($$result2, "Badge", Badge, { "className": "mb-4 bg-purple-100 text-purple-700 px-4 py-2" }, { "default": async ($$result3) => renderTemplate`
Important Rules
` })} <h2 class="mb-4">Competition Rules</h2> <p class="text-muted-foreground text-lg max-w-2xl mx-auto">
Please read and follow all competition rules carefully
</p> </div> <div class="max-w-4xl mx-auto space-y-4"> ${competitionRules.map((item) => renderTemplate`${renderComponent($$result2, "Card", Card, { "key": item.number, "className": "p-6 border-2 hover:border-purple-300 transition-colors" }, { "default": async ($$result3) => renderTemplate` <div class="flex items-start gap-4"> <div class="bg-gradient-to-br from-purple-500 to-pink-500 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"> <span class="text-white text-xl">${item.number}</span> </div> <div class="flex-1"> <p class="text-lg">${item.rule}</p> </div> <div class="flex-shrink-0"> ${renderComponent($$result3, "item.icon", item.icon, { "className": "w-6 h-6 text-purple-600" })} </div> </div> ` })}`)} </div> </div> </div> <!-- Judging Criteria --> <div class="container mx-auto px-4 mb-16"> <div class="text-center mb-12"> ${renderComponent($$result2, "Badge", Badge, { "className": "mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2" }, { "default": async ($$result3) => renderTemplate`
Evaluation
` })} <h2 class="mb-4">Judging Criteria</h2> <p class="text-muted-foreground text-lg max-w-2xl mx-auto">
Artworks will be evaluated based on the following criteria
</p> </div> <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"> ${judgingCriteria.map((criteria) => {
    const Icon = criteria.icon;
    return renderTemplate`${renderComponent($$result2, "Card", Card, { "key": criteria.title, "className": `p-6 border-2 ${criteria.borderColor} hover:shadow-xl transition-all hover:scale-105` }, { "default": async ($$result3) => renderTemplate` <div class="text-center"> <div${addAttribute(`bg-gradient-to-br ${criteria.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`, "class")}> ${renderComponent($$result3, "Icon", Icon, { "className": "w-8 h-8 text-white" })} </div> <h3 class="mb-2">${criteria.title}</h3> <div${addAttribute(`text-3xl bg-gradient-to-r ${criteria.color} bg-clip-text text-transparent mb-4`, "class")}> ${criteria.percentage} </div> <p class="text-muted-foreground text-sm"> ${criteria.description} </p> </div> ` })}`;
  })} </div> </div> <!-- Prizes Section --> <div class="bg-gradient-to-r from-yellow-50 to-orange-50 py-16 mb-16"> <div class="container mx-auto px-4"> <div class="text-center mb-12"> ${renderComponent($$result2, "Badge", Badge, { "className": "mb-4 bg-yellow-600 text-white px-4 py-2" }, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "Gift", Gift, { "className": "w-4 h-4 mr-2 inline" })}
Prizes
` })} <h2 class="mb-4">Prizes & Awards</h2> <p class="text-muted-foreground text-lg max-w-2xl mx-auto">
Amazing prizes await our talented artists!
</p> </div> <div class="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-8"> ${renderComponent($$result2, "Card", Card, { "className": "p-8 text-center border-4 border-yellow-300 bg-gradient-to-b from-yellow-50 to-white hover:shadow-2xl transition-shadow" }, { "default": async ($$result3) => renderTemplate` <div class="text-6xl mb-4">🥇</div> <h3 class="mb-3">1st Place</h3> <div class="text-4xl mb-4 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
₱1,000
</div> <p class="text-muted-foreground">Cash Prize</p> ` })} ${renderComponent($$result2, "Card", Card, { "className": "p-8 text-center border-4 border-gray-300 bg-gradient-to-b from-gray-50 to-white hover:shadow-2xl transition-shadow" }, { "default": async ($$result3) => renderTemplate` <div class="text-6xl mb-4">🥈</div> <h3 class="mb-3">2nd Place</h3> <div class="text-4xl mb-4 bg-gradient-to-r from-gray-600 to-gray-500 bg-clip-text text-transparent">
₱700
</div> <p class="text-muted-foreground">Cash Prize</p> ` })} ${renderComponent($$result2, "Card", Card, { "className": "p-8 text-center border-4 border-orange-300 bg-gradient-to-b from-orange-50 to-white hover:shadow-2xl transition-shadow" }, { "default": async ($$result3) => renderTemplate` <div class="text-6xl mb-4">🥉</div> <h3 class="mb-3">3rd Place</h3> <div class="text-4xl mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
₱500
</div> <p class="text-muted-foreground">Cash Prize</p> ` })} </div> ${renderComponent($$result2, "Card", Card, { "className": "p-6 text-center max-w-2xl mx-auto border-2 border-purple-200 bg-white" }, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "Gift", Gift, { "className": "w-12 h-12 text-purple-600 mx-auto mb-3" })} <h3 class="mb-2">Consolation Prizes</h3> <p class="text-muted-foreground">
All participants will receive consolation prizes to celebrate their creativity and effort! 🎁
</p> ` })} </div> </div> <!-- Submission Guidelines --> <div class="container mx-auto px-4 mb-16"> <div class="text-center mb-12"> ${renderComponent($$result2, "Badge", Badge, { "className": "mb-4 bg-blue-100 text-blue-700 px-4 py-2" }, { "default": async ($$result3) => renderTemplate`
How to Submit
` })} <h2 class="mb-4">Submission Guidelines</h2> <p class="text-muted-foreground text-lg max-w-2xl mx-auto">
Follow these steps to submit your artwork
</p> </div> <div class="max-w-4xl mx-auto"> ${renderComponent($$result2, "Card", Card, { "className": "p-8 border-2 border-blue-200" }, { "default": async ($$result3) => renderTemplate` <div class="space-y-6"> <div class="flex items-start gap-4"> <div class="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg p-3 flex-shrink-0"> ${renderComponent($$result3, "MapPin", MapPin, { "className": "w-6 h-6 text-white" })} </div> <div> <h3 class="mb-2">Submission Location</h3> <p class="text-muted-foreground">
Artworks can be submitted at <strong>YSC Studio</strong> </p> </div> </div> <div class="flex items-start gap-4"> <div class="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-3 flex-shrink-0"> ${renderComponent($$result3, "Clock", Clock, { "className": "w-6 h-6 text-white" })} </div> <div> <h3 class="mb-2">Submission Deadline</h3> <p class="text-muted-foreground mb-2"> <strong>December 18, 2025 (Thursday)</strong> </p> <div class="bg-red-50 border border-red-200 rounded-lg p-3"> <p class="text-sm text-red-800"> ${renderComponent($$result3, "AlertCircle", CircleAlert, { "className": "w-4 h-4 inline mr-2" })} <strong>Important:</strong> Late submissions will NOT be eligible for 1st, 2nd, and 3rd places, 
                  but will receive a consolation prize.
</p> </div> </div> </div> <div class="flex items-start gap-4"> <div class="bg-gradient-to-br from-orange-500 to-red-500 rounded-lg p-3 flex-shrink-0"> ${renderComponent($$result3, "Trophy", Trophy, { "className": "w-6 h-6 text-white" })} </div> <div> <h3 class="mb-2">Awards Ceremony</h3> <p class="text-muted-foreground"> <strong>December 20, 2025 (Saturday)</strong> </p> <p class="text-sm text-muted-foreground mt-1">
Join us for the exciting awards ceremony where winners will be announced!
</p> </div> </div> </div> ` })} </div> </div> <!-- Important Notes --> <div class="bg-gradient-to-r from-red-50 to-orange-50 py-16 mb-16"> <div class="container mx-auto px-4"> ${renderComponent($$result2, "Card", Card, { "className": "p-8 border-2 border-red-200 max-w-4xl mx-auto" }, { "default": async ($$result3) => renderTemplate` <div class="flex items-start gap-4 mb-6"> <div class="bg-red-500 p-3 rounded-full flex-shrink-0"> ${renderComponent($$result3, "AlertCircle", CircleAlert, { "className": "w-6 h-6 text-white" })} </div> <div> <h3 class="mb-2">Important Notes</h3> <p class="text-muted-foreground">
Please take note of these important points
</p> </div> </div> <div class="space-y-4"> <div class="grid gap-3 md:grid-cols-2 lg:grid-cols-1"> <div class="flex items-start gap-3 p-4 bg-white rounded-lg border border-red-200"> ${renderComponent($$result3, "CheckCircle2", CircleCheck, { "className": "w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" })} <p class="text-muted-foreground"> <strong>Public Display:</strong> All submitted artworks will be posted at the YSC Group
                for everyone to appreciate and celebrate! 🎨
</p> </div> <div class="flex items-start gap-3 p-4 bg-white rounded-lg border border-red-200"> ${renderComponent($$result3, "CheckCircle2", CircleCheck, { "className": "w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" })} <p class="text-muted-foreground"> <strong>Material Requirements:</strong> Only professional art materials are accepted
                (illustration board, watercolor paper, or canvas). Bond paper and ordinary paper are NOT allowed.
</p> </div> <div class="flex items-start gap-3 p-4 bg-white rounded-lg border border-red-200"> ${renderComponent($$result3, "CheckCircle2", CircleCheck, { "className": "w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" })} <p class="text-muted-foreground"> <strong>Originality:</strong> All artworks must be your own original creation.
                Copied works will be disqualified from the competition.
</p> </div> <div class="flex items-start gap-3 p-4 bg-white rounded-lg border border-red-200"> ${renderComponent($$result3, "CheckCircle2", CircleCheck, { "className": "w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" })} <p class="text-muted-foreground"> <strong>Name Label:</strong> Don't forget to write your full name on the back of your artwork material!
</p> </div> </div> </div> ` })} </div> </div> </div>` })}`;
}, "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/pages/Events/event-guidelines.astro", void 0);
const $$file = "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/pages/Events/event-guidelines.astro";
const $$url = "/Events/event-guidelines";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$EventGuidelines,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
