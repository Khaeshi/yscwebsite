import { j as jsxRuntimeExports } from "./jsx-runtime_DaxtJboG.mjs";
import { a as reactExports } from "./_@astro-renderers_DOBI-D1Y.mjs";
function ParallaxSection({ imageUrl, children, className = "", overlayOpacity = 0.5 }) {
  const [scrollY, setScrollY] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: `relative overflow-hidden ${className}`, children: [
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
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0 z-10 bg-gradient-to-br from-purple-900/80 via-pink-900/80 to-orange-900/80",
        style: { opacity: overlayOpacity }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-20", children })
  ] });
}
export {
  ParallaxSection as P
};
