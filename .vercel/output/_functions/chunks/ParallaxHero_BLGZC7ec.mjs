import { c as createLucideIcon, B as Button } from "./index_Dwb88roV.mjs";
import { j as jsxRuntimeExports } from "./jsx-runtime_DaxtJboG.mjs";
import { a as reactExports } from "./_@astro-renderers_DOBI-D1Y.mjs";
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$2);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
];
const Award = createLucideIcon("award", __iconNode$1);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
];
const Target = createLucideIcon("target", __iconNode);
function ParallaxHero({ imageUrl, title, subtitle, stats, showBackButton = false }) {
  const [scrollY, setScrollY] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const handleScroll = () => {
      try {
        setScrollY(window.scrollY);
      } catch (error) {
        console.error("Scroll handling error:", error);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0 z-0 w-full h-full",
        style: {
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translate3d(0, ${scrollY * 0.5}px, 0)`,
          willChange: "transform"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-10 bg-gradient-to-br from-purple-900/80 via-pink-900/80 to-orange-900/80" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8 relative z-20", children: [
      showBackButton && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", className: "mb-6 text-white hover:text-yellow-300 hover:bg-white/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
        "Back to Home"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white", children: "Professional Program" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl sm:text-5xl lg:text-6xl mb-6 text-white", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-white/90 leading-relaxed", children: subtitle })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-6", children: stats?.map((stat, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold text-yellow-300 mb-2", children: stat.number }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-white/80", children: stat.label })
        ] }, index)) })
      ] })
    ] })
  ] });
}
export {
  Award as A,
  ParallaxHero as P,
  Target as T
};
