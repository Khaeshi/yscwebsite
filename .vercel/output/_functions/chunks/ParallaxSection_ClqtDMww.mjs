import { c as createLucideIcon } from "./index_os-mkKwH.mjs";
import { j as jsxRuntimeExports } from "./jsx-runtime_BD0fzWF3.mjs";
import { a as reactExports } from "./_@astro-renderers_BiNbQtZO.mjs";
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75", key: "1da9ce" }]
];
const Users = createLucideIcon("users", __iconNode);
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
  ParallaxSection as P,
  Users as U
};
