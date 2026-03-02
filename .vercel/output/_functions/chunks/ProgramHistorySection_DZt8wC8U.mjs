import { j as jsxRuntimeExports } from "./jsx-runtime_mS7YKmDK.mjs";
import { C as Card, I as ImageWithFallback, B as Badge } from "./ImageWithFallback_DnT8B4a9.mjs";
import "./_@astro-renderers_B4KjVBz-.mjs";
import { A as Award, T as Target } from "./ParallaxHero_DzPyPLHG.mjs";
function InstructorProfile({
  name,
  title,
  image,
  specialization,
  experience,
  description,
  achievements
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "overflow-hidden hover:shadow-lg transition-shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-5 gap-6 p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square rounded-xl overflow-hidden mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ImageWithFallback,
        {
          src: image,
          alt: name,
          className: "w-full h-full object-cover"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-4 h-4 text-purple-600" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: experience })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-4 h-4 text-purple-600" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Specializations:" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: specialization.map((spec, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "bg-purple-50 text-purple-700 border-purple-200", children: spec }, index)) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-2", children: name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-purple-600 mb-4", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4 leading-relaxed", children: description }),
      achievements && achievements.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-5 h-5 text-purple-600" }),
          "Notable Achievements"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: achievements.map((achievement, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-purple-600 mt-1", children: "•" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: achievement })
        ] }, index)) })
      ] })
    ] })
  ] }) });
}
function ProgramHistorySection({
  image,
  foundedYear,
  milestones,
  stats
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 md:p-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-block bg-white px-4 py-2 rounded-full mb-6 border border-purple-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-purple-600", children: [
        "Since ",
        foundedYear
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-6", children: "Our Journey" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6 mb-8", children: milestones.map((milestone, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white", children: milestone.year }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mb-2", children: milestone.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: milestone.description })
        ] })
      ] }, index)) }),
      stats && stats.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-4", children: stats.map((stat, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 text-center border border-purple-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(stat.icon, { className: "w-6 h-6 mx-auto mb-2 text-purple-600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1", children: stat.value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: stat.label })
      ] }, index)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl overflow-hidden shadow-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ImageWithFallback,
        {
          src: image,
          alt: "Program history",
          className: "w-full h-auto"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-20 blur-3xl" })
    ] })
  ] }) });
}
export {
  InstructorProfile as I,
  ProgramHistorySection as P
};
