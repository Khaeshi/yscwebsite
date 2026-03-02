import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
function ParallaxSection({ imageUrl, children, className = "", overlayOpacity = 0.5 }) {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return /* @__PURE__ */ jsxs("section", { className: `relative overflow-hidden ${className}`, children: [
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
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 z-10 bg-gradient-to-br from-purple-900/80 via-pink-900/80 to-orange-900/80",
        style: { opacity: overlayOpacity }
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "relative z-20", children })
  ] });
}
export {
  ParallaxSection as P
};
