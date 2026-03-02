import { f as createComponent, l as renderComponent, r as renderTemplate, m as maybeRenderHead } from "../chunks/astro/server_DobZlz4c.mjs";
import "piccolore";
import { $ as $$Layout } from "../chunks/Layout_DHOvI5Dg.mjs";
import { I as InstructorProfile, P as ProgramHistorySection } from "../chunks/ProgramHistorySection_CE_LLY-4.mjs";
import { P as ParallaxHero } from "../chunks/ParallaxHero_BXsbs4v_.mjs";
import { P as ParallaxSection } from "../chunks/ParallaxSection_Bo61cpqn.mjs";
import { I as ImageWithFallback } from "../chunks/ImageWithFallback_DmNFEcv8.mjs";
import { Handshake, Target, Trophy, Users, Award } from "lucide-react";
import { c as badmintonimageUrl, J as JTTC, d as badmintonhistory } from "../chunks/config_DXHxkv4J.mjs";
import { r } from "../chunks/_@astro-renderers_CovX3xsv.mjs";
const $$BadmintonCoaching = createComponent(($$result, $$props, $$slots) => {
  const coaches = [
    {
      name: "Coach Jefferson H. Tablante",
      title: "Head Badminton Coach & Program Director",
      image: "",
      specialization: ["Singles Strategy", "Competitive Training", "Advanced Techniques", "Strokes"],
      experience: "24+ years coaching experience",
      description: "Coach Jeff is a former national-level badminton player of year 1999-2003 who represented his country in international tournaments. After retiring from competitive play, he dedicated himself to coaching and has developed numerous players who went on to compete at state and national levels. His coaching philosophy emphasizes building strong fundamentals, mental toughness, and strategic thinking up to pro level mentality. Coach Jeff specializes in honing players' skills to meet the demands of today's more challenging opponents, ensuring that every training session is both effective and enjoyable.",
      achievements: [
        "Former Batang Pinoy Coach with noteable 15+ local tournament appearances",
        "Coached 6+ students to tournament championship",
        "BWF Level 2 certified coach",
        "Developed players who received sports scholarships to universities"
      ]
    },
    {
      name: "Coach Ryan Jean(RJ) Sison",
      title: "Assistant Coach",
      image: "",
      specialization: ["Strength Training", "Agility", "Footwork", "Match Analysis"],
      experience: "24+ years professional experience",
      description: "Coach RJ brings a physical boost to badminton training, combining his expertise in sports conditioning. He works primarily with beginners to advanced players looking to take their game to the next level. Coach RJ uses video analysis technology to break down technique and develop personalized training programs. His focus on physical conditioning, speed, and power has helped many players dramatically improve their competitive edge.",
      achievements: [
        "Former professional player with circuit tournament wins",
        "Batang Pinoy Coach, and currently National University Badminton coach participating UAAP",
        "Trained young generation players competing at regionals championship level"
      ]
    }
  ];
  const historyMilestones = [
    {
      year: "2012",
      title: "Program Launch",
      description: "Started our badminton coaching program with a vision to make quality badminton training accessible to the community."
    },
    {
      year: "2016",
      title: "Facility Transfer",
      description: "It's now in partnership with South City Homes Recreation Center, providing a good facilities and equipments to use for training."
    },
    {
      year: "2019",
      title: "Regionals & Batang Pinoy",
      description: "Actively Participating Palarong Pambansa and Batang Pinoy with 15 active participants and 8 reaching Regionals."
    },
    {
      year: "2023",
      title: "Excellence Recognition",
      description: "Became a BWF-recognized training coaches with 12+ active students and multiple championship titles."
    }
  ];
  const pageTitle = "Badminton | Young Starter Club";
  const description = "Improve your badminton skills with our fun and engaging lessons. Perfect for beginners, experienced, and national players alike. Join Young Starter Club!";
  const image = "/assets/YSC.png";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": pageTitle, "description": description, "image": image }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-white">  ${renderComponent($$result2, "ParallaxHero", ParallaxHero, { "imageUrl": badmintonimageUrl, "title": "Master Your Game", "subtitle": "Elevate your badminton skills with professional coaching from experienced players and certified instructors. From fundamental techniques to competitive strategies, we'll help you achieve your athletic goals.", "stats": [
    { number: "150+", label: "Students Applied" },
    { number: "50+", label: "Championships Awardee" },
    { number: "25+", label: "Years Experienced Coaches" },
    { number: "High Quality", label: "Beginner to Pro Lessons" }
  ], "showBackButton": true, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/components/ParallaxHero.tsx", "client:component-export": "ParallaxHero" })}  <section class="py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"> <div class="container mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center max-w-4xl mx-auto"> <div class="inline-flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full mb-6 backdrop-blur-sm"> ${renderComponent($$result2, "Handshake", Handshake, { "className": "w-5 h-5 text-blue-600" })} <span class="text-sm text-blue-600">Partnership</span> </div> <h3 class="mb-8">In Partnership With</h3> <div class="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">   <div class="rounded-2xl pr-4"> ${renderComponent($$result2, "ImageWithFallback", ImageWithFallback, { "src": JTTC, "alt": "JT Badminton Logo", "className": "h-24 w-auto mx-auto drop-shadow-lg" })} <h2 class="mb-2 text-center">JT Badminton</h2>  </div>  <div class="rounded-2xl pl-4"> ${renderComponent($$result2, "ImageWithFallback", ImageWithFallback, { "src": "", "alt": "South City Homes Recreation Center", "className": "h-24 w-auto mx-auto" })} <h2 class="mb-2 text-center"> 
South City Homes <br>
Recreation Center
</h2> </div> </div> </div> </div> </section>   <section class="py-20 bg-white"> <div class="container mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-12"> <h2 class="mb-4">Training Excellence</h2> <p class="text-muted-foreground max-w-2xl mx-auto">
Comprehensive badminton training designed to develop champions
</p> </div> <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"> <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100"> <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4"> ${renderComponent($$result2, "Target", Target, { "className": "w-6 h-6 text-white" })} </div> <h3 class="mb-3">Professional Facilities</h3> <p class="text-muted-foreground">
Train on with proper equipments, lighting, and environment maintained to tournament standards.
</p> </div> <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100"> <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4"> ${renderComponent($$result2, "Trophy", Trophy, { "className": "w-6 h-6 text-white" })} </div> <h3 class="mb-3">Tournament Preparation</h3> <p class="text-muted-foreground">
Compete in friendly tournaments and get ready for inter-school and regional competitions.
</p> </div> <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100"> <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4"> ${renderComponent($$result2, "Users", Users, { "className": "w-6 h-6 text-white" })} </div> <h3 class="mb-3">Small Group Training</h3> <p class="text-muted-foreground">
Minimum of 1 and maximum of 6 students per session ensures personalized attention and effective skill development.
</p> </div> </div> </div> </section>  <section class="py-20 bg-gradient-to-br from-blue-50 to-cyan-50"> <div class="container mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-12"> <h2 class="mb-4">Meet Our Coaches</h2> <p class="text-muted-foreground max-w-2xl mx-auto">
Train with experienced coaches who have competed at the highest levels
</p> </div> <div class="space-y-8"> ${coaches.map((coach, index) => renderTemplate`${renderComponent($$result2, "InstructorProfile", InstructorProfile, { "key": index, ...coach, "client:visible": true, "client:component-hydration": "visible", "client:component-path": "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/components/InstructorProfile.tsx", "client:component-export": "InstructorProfile" })}`)} </div> </div> </section>  <section class="py-20 bg-white"> <div class="container mx-auto px-4 sm:px-6 lg:px-8"> ${renderComponent($$result2, "ProgramHistorySection", ProgramHistorySection, { "image": badmintonhistory, "foundedYear": "2012", "milestones": historyMilestones, "stats": [
    { icon: Users, value: "150+", label: "Students" },
    { icon: Trophy, value: "25+", label: "Championship Awards Won" },
    { icon: Award, value: "50+", label: "Tournaments Participated" }
  ] })} </div> </section>  ${renderComponent($$result2, "ParallaxSection", ParallaxSection, { "imageUrl": badmintonimageUrl, "className": "py-10", "overlayOpacity": 0.8 }, { "default": ($$result3) => renderTemplate` <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center"> ${renderComponent($$result3, "Trophy", Trophy, { "className": "w-12 h-12 mx-auto mb-6 text-yellow-300" })} <h2 class="mb-6 text-white">Ready to Elevate Your Game?</h2> <p class="mb-8 max-w-2xl mx-auto text-white/90">
Join our badminton coaching program and train with the best. Contact us on Facebook to book your trial session!
</p> <a href="https://www.facebook.com/YSCcommunity" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-white/90 hover:text-blue-700 shadow-xl px-6 py-3 rounded-lg font-medium text-sm">
Message Us on Facebook
</a> </div> ` })} </div> ` })}`;
}, "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/pages/badminton-coaching.astro", void 0);
const $$file = "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/pages/badminton-coaching.astro";
const $$url = "/badminton-coaching";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$BadmintonCoaching,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
