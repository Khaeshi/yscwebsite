import { e as createAstro, f as createComponent, r as renderTemplate, l as renderComponent, n as renderSlot, k as renderHead, p as renderScript, h as addAttribute } from "./astro/server_DobZlz4c.mjs";
import "piccolore";
import { j as jsxRuntimeExports } from "./jsx-runtime_w0bDR4SM.mjs";
import { B as Button } from "./button_DVerbMlt.mjs";
import { MapPin, Music, Trophy, Palette, ChefHat, Camera, MessageCircle, X, Menu, Phone, Mail, Facebook, InstagramIcon } from "lucide-react";
import { a as reactExports } from "./_@astro-renderers_CovX3xsv.mjs";
import * as Scroll from "react-scroll";
import { motion } from "framer-motion";
/* empty css                         */
const logoImg = new Proxy({ "src": "/_astro/YSC.ks3o0PSe.png", "width": 1563, "height": 1563, "format": "png" }, {
  get(target, name, receiver) {
    if (name === "clone") {
      return structuredClone(target);
    }
    if (name === "fsPath") {
      return "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/assets/YSC.png";
    }
    return target[name];
  }
});
function Header({ currentPath }) {
  const [mobileMenuOpen, setMobileMenuOpen] = reactExports.useState(false);
  const [scrolled, setScrolled] = reactExports.useState(false);
  const [showProgramsMenu, setShowProgramsMenu] = reactExports.useState(false);
  const [showMobileProgramsMenu, setShowMobileProgramsMenu] = reactExports.useState(false);
  const [headerHeight, setHeaderHeight] = reactExports.useState(80);
  const [currentPathname, setCurrentPathname] = reactExports.useState("");
  const closeTimeoutRef = reactExports.useRef(null);
  const isActive = (path) => currentPath === path;
  const isHomePage = currentPath === "/";
  const generateMessengerLink = () => {
    let message = `I'm interested in enrolling. Can you provide more details?`;
    const facebookPageUsername = "YSCcommunity";
    return `https://m.me/${facebookPageUsername}?text=${encodeURIComponent(message)}`;
  };
  reactExports.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  reactExports.useEffect(() => {
    const updateHeight = () => {
      setHeaderHeight(window.innerWidth >= 1024 ? 80 : window.innerWidth >= 640 ? 64 : 56);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);
  reactExports.useEffect(() => {
    setCurrentPathname(window.location.pathname);
  }, []);
  reactExports.useEffect(() => {
    setMobileMenuOpen(false);
    setShowMobileProgramsMenu(false);
  }, [currentPathname]);
  reactExports.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);
  reactExports.useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);
  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setShowProgramsMenu(true);
  };
  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setShowProgramsMenu(false);
    }, 100);
  };
  const programs = [
    {
      id: "music",
      name: "Music Teaching",
      path: "/music-teaching",
      icon: Music,
      color: "purple",
      gradient: "from-purple-500 to-pink-500",
      description: "Piano, Guitar, Violin & More"
    },
    {
      id: "badminton",
      name: "Badminton Coaching",
      path: "/badminton-coaching",
      icon: Trophy,
      color: "blue",
      gradient: "from-blue-500 to-cyan-500",
      description: "Professional Sports Training"
    },
    {
      id: "arts",
      name: "Arts Lessons",
      path: "/arts-lesson",
      icon: Palette,
      color: "pink",
      gradient: "from-pink-500 to-rose-500",
      description: "Painting, Drawing & Sculpture"
    },
    {
      id: "cooking",
      name: "Cooking Sessions",
      path: "/cooking-session",
      icon: ChefHat,
      color: "orange",
      gradient: "from-orange-500 to-yellow-500",
      description: "Culinary Skills & Recipes"
    },
    {
      id: "photography",
      name: "Photography Classes",
      path: "/photography-classes",
      icon: Camera,
      color: "green",
      gradient: "from-green-500 to-emerald-500",
      description: "Visual Storytelling & Editing"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "header",
      {
        className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200" : "bg-transparent border-b border-white/10"}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between h-14 sm:h-16 lg:h-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "flex items-center group", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: logoImg.src,
              alt: "Young Starter Club",
              className: `w-auto transition-all duration-300 ${scrolled ? "h-8 sm:h-10 lg:h-12" : "h-10 sm:h-12 lg:h-16"} group-hover:scale-105`,
              style: {
                filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))"
              }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden lg:flex items-center gap-1", children: [
            isHomePage ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => Scroll.scroller.scrollTo("testimonials", { smooth: true, duration: 500, offset: -headerHeight }),
                  className: `px-4 py-2 rounded-lg transition-all duration-200 ${scrolled ? "text-gray-700 hover:bg-gray-50 hover:text-purple-600" : "text-white hover:bg-white/10"}`,
                  children: "Testimonials"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => Scroll.scroller.scrollTo("map-section", { smooth: true, duration: 500, offset: -headerHeight }),
                  className: `px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${scrolled ? "text-gray-700 hover:bg-gray-50 hover:text-purple-600" : "text-white hover:bg-white/10"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4" }),
                    "Location"
                  ]
                }
              )
            ] }) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "relative",
                onMouseEnter: handleMouseEnter,
                onMouseLeave: handleMouseLeave,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      className: `px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${showProgramsMenu || ["/music-teaching", "/badminton-coaching", "/arts-lesson", "/cooking-session", "/photography-classes"].includes(currentPathname) ? "bg-purple-50 text-purple-700 font-medium shadow-sm" : scrolled ? "text-gray-700 hover:bg-gray-50 hover:text-purple-600" : "text-white hover:bg-white/10"}`,
                      children: [
                        "Programs",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "svg",
                          {
                            className: `w-4 h-4 transition-transform duration-200 ${showProgramsMenu ? "rotate-180" : ""}`,
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" })
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `absolute top-full left-1/2 -translate-x-1/2 mt-2 transition-all duration-300 ${showProgramsMenu ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 w-[600px]", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider text-gray-500 mb-4 px-2", children: "Explore Our Programs" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: programs.map((program) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "a",
                          {
                            href: program.path,
                            className: `group p-4 rounded-xl transition-all duration-200 ${isActive(program.path) ? `bg-${program.color}-50 ring-2 ring-${program.color}-200 p-5` : "hover:bg-gray-50 hover:shadow-md pb-5"}`,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-10 h-10 rounded-lg bg-gradient-to-br ${program.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(program.icon, { className: "w-5 h-5 text-white" }) }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-gray-900 group-hover:text-purple-700 transition-colors mb-0.5", children: program.name }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 leading-tight", children: program.description })
                              ] })
                            ] })
                          },
                          program.id
                        )) })
                      ] })
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "/aboutpage",
                className: `px-4 py-2 rounded-lg transition-all duration-200 ${isActive("/aboutpage") ? "bg-purple-50 text-purple-700 font-medium shadow-sm" : scrolled ? "text-gray-700 hover:bg-gray-50 hover:text-purple-600" : "text-white hover:bg-white/10"}`,
                children: "About"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "/",
                className: `px-4 py-2 rounded-lg transition-all duration-200 ${isActive("/") ? "bg-purple-50 text-purple-700 font-medium shadow-sm" : scrolled ? "text-gray-700 hover:bg-gray-50 hover:text-purple-600" : "text-white hover:bg-white/10"}`,
                children: "Home"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "ml-2 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-200",
                onClick: () => window.open(generateMessengerLink(), "_blank"),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4 mr-2" }),
                  "Contact Us"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: `lg:hidden p-2 rounded-lg transition-colors relative z-[60] ${scrolled ? "hover:bg-gray-100" : "hover:bg-white/10"}`,
              onClick: () => setMobileMenuOpen(!mobileMenuOpen),
              "aria-label": "Toggle menu",
              children: mobileMenuOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: `w-6 h-6 ${scrolled ? "text-gray-900" : "text-white"}` }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: `w-6 h-6 ${scrolled ? "text-gray-900" : "text-white"}` })
            }
          )
        ] }) })
      }
    ),
    mobileMenuOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden animate-in fade-in duration-200",
          onClick: () => setMobileMenuOpen(false)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed left-0 right-0 top-20 sm:top-24 bottom-auto max-h-[calc(100vh-6rem)] z-[56] lg:hidden animate-in fade-in slide-in-from-top-4 duration-300 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden max-w-lg mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-y-auto max-h-[calc(100vh-8rem)] p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: "/",
            className: `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive("/") ? "bg-purple-50 text-purple-700 font-medium shadow-sm" : "text-gray-700 hover:bg-gray-50"}`,
            onClick: () => setMobileMenuOpen(false),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-purple-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Home" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: "/aboutpage",
            className: "flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200",
            onClick: () => setMobileMenuOpen(false),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-blue-500" }),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "About" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setShowMobileProgramsMenu(!showMobileProgramsMenu),
              className: `w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${showMobileProgramsMenu || ["/music-teaching", "/badminton-coaching", "/arts-lesson", "/cooking-session", "/photography-classes"].includes(currentPathname) ? "bg-purple-50 text-purple-700 font-medium shadow-sm" : "text-gray-700 hover:bg-gray-50"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Programs" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "svg",
                  {
                    className: `w-5 h-5 transition-transform duration-200 ${showMobileProgramsMenu ? "rotate-180" : ""}`,
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `grid gap-2 mt-2 transition-all duration-300 overflow-hidden ${showMobileProgramsMenu ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`,
              children: programs.map((program) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: program.path,
                  className: `flex items-start gap-3 p-4 rounded-xl transition-all duration-200 ${isActive(program.path) ? `bg-${program.color}-50 ring-2 ring-${program.color}-200` : "hover:bg-gray-50"}`,
                  onClick: () => setMobileMenuOpen(false),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-12 h-12 rounded-xl bg-gradient-to-br ${program.gradient} flex items-center justify-center flex-shrink-0`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(program.icon, { className: "w-6 h-6 text-white" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-gray-900 mb-1", children: program.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500", children: program.description })
                    ] })
                  ]
                },
                program.id
              ))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-gray-200 my-6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 mb-6", children: isHomePage ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => {
              setMobileMenuOpen(false);
              Scroll.scroller.scrollTo("testimonials", { smooth: true, duration: 500, offset: -headerHeight });
            },
            className: "flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-pink-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Testimonials" })
            ]
          }
        ) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => {
                window.location.href = "/#testimonials";
                setMobileMenuOpen(false);
              },
              className: "flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-pink-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Testimonials" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => {
                window.location.href = "/#location";
                setMobileMenuOpen(false);
              },
              className: "flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-5 h-5 text-orange-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Location" })
              ]
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            className: "w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-200",
            onClick: () => {
              window.open("https://www.facebook.com/YSCcommunity", "_blank");
              setMobileMenuOpen(false);
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4 mr-2" }),
              "Contact Us on Facebook"
            ]
          }
        )
      ] }) }) })
    ] })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 sm:px-4 lg:px-6 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: logoImg.src,
            alt: "Young Starter Club",
            className: "h-16 w-auto cursor-pointer hover:scale-105 transition-transform",
            style: {
              filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3)) brightness(1.1)"
            }
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80", children: "Empowering children and adults to discover their creative talents through quality lessons in music, sports, arts, and more." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mb-4", children: "Quick Links" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/#programs", className: "text-white/80 hover:text-white transition-transform transition-colors inline-block duration-300 hover:translate-x-1", children: "Our Programs" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/#testimonials", className: "text-white/80 hover:text-white transition-transform transition-colors inline-block duration-300 hover:translate-x-1", children: "Testimonials" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/#location", className: "text-white/80 hover:text-white transition-transform transition-colors inline-block duration-300 hover:translate-x-1", children: "Location" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/aboutpage", className: "text-white/80 hover:text-white transition-transform transition-colors inline-block duration-300 hover:translate-x-1", children: "About Us" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mb-4", children: "Our Programs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/music-teaching", className: "text-white/80 hover:text-white transition-transform transition-colors inline-block duration-300 hover:translate-x-1", children: "Music Teaching" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/badminton-coaching", className: "text-white/80 hover:text-white transition-transform transition-colors inline-block duration-300 hover:translate-x-1", children: "Badminton Coaching" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/arts-lesson", className: "text-white/80 hover:text-white transition-transform transition-colors inline-block duration-300 hover:translate-x-1", children: "Arts Lessons" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/cooking-session", className: "text-white/80 hover:text-white transition-transform transition-colors inline-block duration-300 hover:translate-x-1", children: "Cooking Sessions" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/photography-classes", className: "text-white/80 hover:text-white transition-transform transition-colors inline-block duration-300 hover:translate-x-1", children: "Photography Classes" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mb-4 font-medium", children: "Get in Touch" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 text-white/80", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "(+63) 949-077-5573" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 text-white/80", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "youngstarterclub@gmail.com" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-white/80", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 mt-1 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "#38 Goldfinch Street Phase 1 ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              " Brgy. San Vicente Pacita  ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              " San Pedro Laguna, San Pedro, Philippines"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white mb-4", children: "Follow Us" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex space-x-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.a,
              {
                href: "https://www.facebook.com/YSCcommunity",
                className: "hover:text-red-400 transition-colors",
                whileHover: { scale: 1.2, rotate: 5 },
                transition: { type: "spring", stiffness: 400 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Facebook, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.a,
              {
                href: "https://www.instagram.com/youngstarterclub/",
                className: "hover:text-red-400 transition-colors",
                whileHover: { scale: 1.2, rotate: 5 },
                transition: { type: "spring", stiffness: 400 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(InstagramIcon, { className: "w-5 h-5" })
              }
            )
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-white/20 p-6 text-center text-white/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "© 2025 Young Starter Club. All rights reserved." }) })
  ] });
}
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://youngstarterclub.asia");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const currentPath = Astro2.url.pathname;
  const {
    title = "Young Starter Club - Discover Your Passion",
    description = "Join Young Starter Club for music, sports, arts, cooking, and photography programs for all ages.",
    image = "/YSC.ico"
  } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/x-icon" href="/YSC.ico"><title>', '</title><meta name="description"', '><meta name="keywords" content="online music lessons for beginners, badminton coaching, arts classes, cooking sessions, photography classes, young starter club, san pedro music services"><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:type" content="website"><meta name="twitter:card" content="summary_large_image"><meta name="robots" content="index, follow"><meta name="msvalidate.01" content="4E9D6CFD4DFEA50DB3D3DC37FC9D85A6"><meta name="google-site-verification" content="0J-eL8Lhe3PMYpfMJP8v3VdddCPRNTHK2KFUO1AzfxA"><link rel="sitemap" href="/sitemap-index.xml">', '<script type="text/javascript">\n      (function(c,l,a,r,i,t,y){\n          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};\n          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;\n          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);\n      })(window, document, "clarity", "script", "unfzy4w0eq");\n  <\/script>', '</head> <body class="min-h-screen bg-white"> ', " ", " ", " </body></html>"])), title, addAttribute(description, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(image, "content"), renderScript($$result, "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts"), renderHead(), renderComponent($$result, "Header", Header, { "currentPath": currentPath, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/components/Layout/Header.tsx", "client:component-export": "Header" }), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", Footer, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/components/Layout/Footer.tsx", "client:component-export": "Footer" }));
}, "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/layouts/Layout.astro", void 0);
export {
  $$Layout as $
};
