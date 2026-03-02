import { f as createComponent, l as renderComponent, r as renderTemplate, m as maybeRenderHead } from "../chunks/astro/server_CoVo9Zif.mjs";
import { I as InstructorProfile, P as ProgramHistorySection } from "../chunks/ProgramHistorySection_DLdm7s9a.mjs";
import { P as ParallaxHero, A as Award } from "../chunks/ParallaxHero_BLGZC7ec.mjs";
import { P as ParallaxSection } from "../chunks/ParallaxSection_CqyAxdqf.mjs";
import { $ as $$Layout } from "../chunks/Layout_CSr6873l.mjs";
import { P as Piano, V as Violin, F as Flute, G as Guitar, U as Ukelele, C as Cello, R as Recorder, g as Voice, h as Saxophone, m as musicimageUrl, S as Silayan, i as She, j as musicAward } from "../chunks/config_DXHxkv4J.mjs";
import { j as jsxRuntimeExports } from "../chunks/jsx-runtime_DaxtJboG.mjs";
import { a as reactExports } from "../chunks/_@astro-renderers_DOBI-D1Y.mjs";
import { r } from "../chunks/_@astro-renderers_DOBI-D1Y.mjs";
import { I as ImageWithFallback } from "../chunks/ImageWithFallback_DApSdTYW.mjs";
import { c as createLucideIcon, a as Music } from "../chunks/index_Dwb88roV.mjs";
import { U as Users } from "../chunks/users_BNE7VzAO.mjs";
import { H as Heart } from "../chunks/heart_Bt-t2WJX.mjs";
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
      d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",
      key: "j76jl0"
    }
  ],
  ["path", { d: "M22 10v6", key: "1lu8f3" }],
  ["path", { d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5", key: "1r8lef" }]
];
const GraduationCap = createLucideIcon("graduation-cap", __iconNode);
const instruments = [
  {
    name: "Piano",
    imageUrl: Piano,
    description: "Learn classical and contemporary piano techniques"
  },
  {
    name: "Violin",
    imageUrl: Violin,
    description: "Master the art of string instruments"
  },
  {
    name: "Flute",
    imageUrl: Flute,
    description: "Explore the beautiful sound of woodwinds"
  },
  {
    name: "Guitar",
    imageUrl: Guitar,
    description: "Learn rhythm and melody through percussion"
  },
  {
    name: "Ukulele",
    imageUrl: Ukelele,
    description: "Start your musical journey with this fun instrument"
  },
  {
    name: "Cello",
    imageUrl: Cello,
    description: "Discover the deep, rich tones of the cello"
  },
  {
    name: "Recorder",
    imageUrl: Recorder,
    description: "Perfect for beginners and young learners"
  },
  {
    name: "Voice",
    imageUrl: Voice,
    description: "Develop your vocal skills and confidence"
  },
  {
    name: "Saxophone",
    imageUrl: Saxophone,
    description: "Learn rhythm and melody through percussion"
  }
];
function InstrumentCarousel() {
  const [currentIndex, setCurrentIndex] = reactExports.useState(instruments.length);
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const [startX, setStartX] = reactExports.useState(0);
  const [translateX, setTranslateX] = reactExports.useState(0);
  const [offset, setOffset] = reactExports.useState(0);
  const [isTransitioning, setIsTransitioning] = reactExports.useState(false);
  const [itemsPerView, setItemsPerView] = reactExports.useState(3);
  const carouselRef = reactExports.useRef(null);
  const extendedInstruments = [
    ...instruments,
    // Clone at start for infinite scroll left
    ...instruments,
    // Original items
    ...instruments
    // Clone at end for infinite scroll right
  ];
  reactExports.useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width >= 768) {
        setItemsPerView(3);
      } else if (width >= 480) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);
  reactExports.useEffect(() => {
    if (isDragging) return;
    const interval = setInterval(() => {
      goToNext();
    }, 3e3);
    return () => clearInterval(interval);
  }, [isDragging]);
  reactExports.useEffect(() => {
    if (!isTransitioning) return;
    const timer = setTimeout(() => {
      setIsTransitioning(false);
      if (currentIndex >= instruments.length * 2) {
        setCurrentIndex(instruments.length);
      } else if (currentIndex < instruments.length) {
        setCurrentIndex(instruments.length * 2 - 1);
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [currentIndex, isTransitioning]);
  const goToNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };
  const goToPrevious = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };
  const handleDragStart = (clientX) => {
    setIsDragging(true);
    setStartX(clientX);
    setOffset(0);
  };
  const handleDragMove = (clientX) => {
    if (!isDragging) return;
    const diff = clientX - startX;
    setOffset(diff);
    setTranslateX(diff);
  };
  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 50;
    if (offset > threshold) {
      goToPrevious();
    } else if (offset < -threshold) {
      goToNext();
    }
    setOffset(0);
    setTranslateX(0);
  };
  const handleMouseDown = (e) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };
  const handleMouseMove = (e) => {
    handleDragMove(e.clientX);
  };
  const handleMouseUp = () => {
    handleDragEnd();
  };
  const handleMouseLeave = () => {
    if (isDragging) {
      handleDragEnd();
    }
  };
  const handleTouchStart = (e) => {
    handleDragStart(e.touches[0].clientX);
  };
  const handleTouchMove = (e) => {
    handleDragMove(e.touches[0].clientX);
  };
  const handleTouchEnd = () => {
    handleDragEnd();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative select-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "overflow-hidden cursor-grab active:cursor-grabbing",
        ref: carouselRef,
        onMouseDown: handleMouseDown,
        onMouseMove: handleMouseMove,
        onMouseUp: handleMouseUp,
        onMouseLeave: handleMouseLeave,
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex",
            style: {
              transform: `translateX(calc(-${currentIndex * (100 / itemsPerView)}% + ${translateX}px))`,
              transition: isDragging || !isTransitioning ? "none" : "transform 600ms ease-in-out"
            },
            children: extendedInstruments.map((instrument, index) => {
              const position = index - currentIndex;
              const centerIndex = Math.floor(itemsPerView / 2);
              const isCenter = position === centerIndex;
              const isInView = position >= 0 && position < itemsPerView;
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "px-3 transition-all duration-300",
                  style: {
                    minWidth: `${100 / itemsPerView}%`,
                    opacity: isInView ? 1 : 0.3,
                    transform: isCenter ? "scale(1.05)" : "scale(0.9)",
                    filter: isCenter ? "none" : "brightness(0.7)",
                    zIndex: isCenter ? 10 : 1
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "from-purple-50 to-pink-50 rounded-2xl p-6 transition-all duration-300", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square mb-4 rounded-xl overflow-hidden bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ImageWithFallback,
                      {
                        src: instrument.imageUrl,
                        alt: instrument.name,
                        className: "w-full h-full object-cover"
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-center mb-2", children: instrument.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-center text-sm", children: instrument.description })
                  ] })
                },
                `${instrument.name}-${index}`
              );
            })
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground text-sm mt-6 opacity-60", children: "Swipe or drag to explore instruments" })
  ] });
}
const $$MusicTeaching = createComponent(($$result, $$props, $$slots) => {
  const instructors = [
    {
      name: "Ma. Silayan Pallones",
      title: "Voice Major & YSC Builder",
      image: Silayan,
      specialization: ["Voice", "Piano", "Music Theory", "Composition"],
      experience: "16+ years teaching experience",
      description: "Multi-skilled musician, ",
      achievements: [
        "8+ students participated JSC",
        "Former concert performer",
        "Published composer with works performed internationally",
        "Associate in Music Ministry, Major in Voice"
      ]
    },
    {
      name: "Ms. She Santos",
      title: "Piano Instructor",
      image: She,
      specialization: ["Piano"],
      experience: "2+ years teaching experience",
      description: "",
      achievements: []
    }
  ];
  const historyMilestones = [
    {
      year: "2010",
      title: "Foundation",
      description: "Started with just 10 students and one piano in a small studio, driven by a passion for making music education accessible to all."
    },
    {
      year: "2015",
      title: "Expansion",
      description: "Grew to accommodate 20+ students with a diverse range of instruments including piano, guitar, violin, and voice."
    },
    {
      year: "2020",
      title: "Digital Innovation",
      description: "Successfully transitioned to hybrid learning during the pandemic, making lessons accessible online while maintaining quality."
    },
    {
      year: "2025",
      title: "Recognition",
      description: "Achieved 60+ successful students."
    }
  ];
  const pageTitle = "Music | Young Starter Club";
  const description = "Learn more about Music with Young Starter Club";
  const image = "/assets/YSC.png";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": pageTitle, "description": description, "image": image }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-white"> <!-- Hero Section - Parallax --> ${renderComponent($$result2, "ParallaxHero", ParallaxHero, { "imageUrl": musicimageUrl, "title": "Discover the Joy of Music", "subtitle": `Learn to play piano, guitar, violin, and more with our team of experienced, certified instructors. 
        From complete beginners to advanced students preparing for competitions, we provide personalized 
        instruction tailored to your musical journey.`, "stats": [
    { number: "50+", label: "Students Taught" },
    { number: "10", label: "Students Competing" },
    { number: "10+", label: "Years Experience" },
    { number: "Yearly", label: "Recitals" }
  ], "showBackButton": true, ";": true, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/components/ParallaxHero.tsx", "client:component-export": "ParallaxHero" })} <!-- Event Banner --> <!-- <section class="py-12 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <EventBanner />
      </div>
    </section> --> <!-- Program Features --> <section class="py-20 bg-white"> <div class="container mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-12"> <h2 class="mb-4">What We Offer</h2> <p class="text-muted-foreground max-w-2xl mx-auto">
Comprehensive music education designed to help you achieve your musical goals
</p> </div> <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"> <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100"> <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4"> ${renderComponent($$result2, "Music", Music, { "className": "w-6 h-6 text-white" })} </div> <h3 class="mb-3">Multiple Instruments</h3> <p class="text-muted-foreground">Piano, guitar, violin, voice, and more. Find the perfect instrument for your musical journey.</p> </div> <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100"> <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4"> ${renderComponent($$result2, "GraduationCap", GraduationCap, { "className": "w-6 h-6 text-white" })} </div> <h3 class="mb-3">Competition Preparations</h3> <p class="text-muted-foreground">JSC and music school preparation with Music Degree examiners guiding you to success.</p> </div> <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100"> <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4"> ${renderComponent($$result2, "Users", Users, { "className": "w-6 h-6 text-white" })} </div> <h3 class="mb-3">Performance Opportunities</h3> <p class="text-muted-foreground">Annual recitals and showcases to build confidence and share your musical talents.</p> </div> </div> </div> </section>  <section class="py-20 bg-gradient-to-br from-purple-50 to-pink-50"> <div class="container mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-8"> <h2 class="mb-4">Explore Our Instruments</h2> <p class="text-muted-foreground max-w-2xl mx-auto">
Discover the wide variety of instruments we teach. From classical to contemporary, find the perfect match for your musical aspirations.
</p> </div> ${renderComponent($$result2, "InstrumentCarousel", InstrumentCarousel, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/components/music/InstrumentCarousel.tsx", "client:component-export": "default" })} </div> </section> <!-- Instructors Section --> <section class="py-20 bg-gradient-to-br from-purple-50 to-pink-50"> <div class="container mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-12"> <h2 class="mb-4">Meet Our Music Teachers</h2> <p class="text-muted-foreground max-w-2xl mx-auto">
Learn from passionate, experienced instructors dedicated to your musical growth
</p> </div> <div class="space-y-8"> ${instructors.map((instructor, index) => renderTemplate`${renderComponent($$result2, "InstructorProfile", InstructorProfile, { "key": index, ...instructor })}`)} </div> </div> </section> <!-- History Section --> <section class="py-20 bg-white"> <div class="container mx-auto px-4 sm:px-6 lg:px-8"> ${renderComponent($$result2, "ProgramHistorySection", ProgramHistorySection, { "image": musicAward, "foundedYear": "2010", "milestones": historyMilestones, "stats": [
    { icon: Users, value: "60+", label: "Students" },
    { icon: Award, value: "95%", label: "Pass Rate" },
    { icon: Music, value: "6+", label: "Recitals" }
  ] })} </div> </section>  ${renderComponent($$result2, "ParallaxSection", ParallaxSection, { "imageUrl": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGxlYXJuaW5nJTIwdG9nZXRoZXJ8ZW58MXx8fHwxNzY0NTc3NTQyfDA&ixlib=rb-4.1.0&q=80&w=1080", "className": "py-20" }, { "default": ($$result3) => renderTemplate` <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center"> ${renderComponent($$result3, "Heart", Heart, { "className": "w-12 h-12 mx-auto mb-6 text-yellow-300" })} <h2 class="mb-6 text-white">Join Our Music Classes</h2> <p class="mb-8 max-w-2xl mx-auto text-white/90">
Become part of the Young Starter Club Music department. Let's discover your passion together!
</p> <a href="https://www.facebook.com/YSCcommunity" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 bg-white text-purple-600 hover:bg-yellow-300 hover:text-purple-700 shadow-xl px-5 py-2 rounded-lg font-medium text-sm">
Message Us on Facebook
</a> </div> ` })} </div> ` })}`;
}, "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/pages/music-teaching.astro", void 0);
const $$file = "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/pages/music-teaching.astro";
const $$url = "/music-teaching";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$MusicTeaching,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
