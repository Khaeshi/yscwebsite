import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { B as Button } from "./button_Dky8LmqV.mjs";
import { ArrowLeft } from "lucide-react";
function ParallaxHero({ imageUrl, title, subtitle, stats, showBackButton = false }) {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
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
  return /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20", children: [
    /* @__PURE__ */ jsx(
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
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-10 bg-gradient-to-br from-purple-900/80 via-pink-900/80 to-orange-900/80" }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8 relative z-20", children: [
      showBackButton && /* @__PURE__ */ jsx("a", { href: "/", children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", className: "mb-6 text-white hover:text-yellow-300 hover:bg-white/10", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
        "Back to Home"
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/30", children: /* @__PURE__ */ jsx("span", { className: "text-white", children: "Professional Program" }) }),
          /* @__PURE__ */ jsx("h1", { className: "text-4xl sm:text-5xl lg:text-6xl mb-6 text-white", children: title }),
          /* @__PURE__ */ jsx("p", { className: "text-xl text-white/90 leading-relaxed", children: subtitle })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-6", children: stats?.map((stat, index) => /* @__PURE__ */ jsxs("div", { className: "bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-yellow-300 mb-2", children: stat.number }),
          /* @__PURE__ */ jsx("div", { className: "text-sm text-white/80", children: stat.label })
        ] }, index)) })
      ] })
    ] })
  ] });
}
export {
  ParallaxHero as P
};
