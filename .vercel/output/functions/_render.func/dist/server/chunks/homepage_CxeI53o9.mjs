import { e as createAstro, f as createComponent, l as renderComponent, r as renderTemplate, h as addAttribute, m as maybeRenderHead } from "./astro/server_DobZlz4c.mjs";
import "piccolore";
import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Star, ThumbsUp, MapPin, XIcon, Sparkles, Trophy, Calendar, ArrowRight, Users, Heart, CheckCircle2, Music, Palette, ChefHat, Camera, HelpCircle, MessageCircle } from "lucide-react";
import { B as Badge, C as Card, I as ImageWithFallback } from "./ImageWithFallback_DxVTlUwb.mjs";
import { P as ParallaxSection } from "./ParallaxSection_YIOqwsWN.mjs";
import { format } from "date-fns";
import { B as Button, c as cn } from "./button_Dky8LmqV.mjs";
import { p as photographyimageUrl, k as homeimageUrl } from "./config_DXHxkv4J.mjs";
import * as DialogPrimitive from "@radix-ui/react-dialog";
const TestimonialCard = ({ testimonial }) => {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow h-full flex flex-col", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-4", children: [
      /* @__PURE__ */ jsx("div", { className: `w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${testimonial.color}`, children: testimonial.initials }),
      /* @__PURE__ */ jsxs("div", { className: "ml-4 flex-1 min-w-0", children: [
        /* @__PURE__ */ jsx("h4", { className: "font-semibold text-gray-900 truncate", children: testimonial.name }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: testimonial.role }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: testimonial.date })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex mb-4", children: Array.from({ length: 5 }, (_, i) => /* @__PURE__ */ jsx(
      Star,
      {
        className: `w-5 h-5 ${i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`
      },
      i
    )) }),
    /* @__PURE__ */ jsxs("p", { className: "text-gray-700 text-sm leading-relaxed flex-grow mb-4", children: [
      '"',
      testimonial.content,
      '"'
    ] }),
    testimonial.isRecommended && /* @__PURE__ */ jsxs("div", { className: "flex items-center text-green-600 pt-2 border-t border-gray-100", children: [
      /* @__PURE__ */ jsx(ThumbsUp, { className: "w-4 h-4 mr-1 fill-current" }),
      /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Recommends Young Starter Club" })
    ] })
  ] });
};
function MapToggleButton() {
  const [showMap, setShowMap] = useState(false);
  const toggleMap = () => {
    setShowMap(!showMap);
    const mapSection = document.getElementById("map-section");
    const mapContent = document.getElementById("map-content");
    if (mapSection && mapContent) {
      if (!showMap) {
        mapSection.classList.remove("max-h-0", "opacity-0");
        mapSection.classList.add("max-h-[1000px]", "opacity-100");
        setTimeout(() => {
          mapContent.classList.remove("-translate-y-8", "opacity-0");
          mapContent.classList.add("translate-y-0", "opacity-100");
        }, 100);
      } else {
        mapContent.classList.add("-translate-y-8", "opacity-0");
        mapContent.classList.remove("translate-y-0", "opacity-100");
        setTimeout(() => {
          mapSection.classList.add("max-h-0", "opacity-0");
          mapSection.classList.remove("max-h-[1000px]", "opacity-100");
        }, 700);
      }
    }
  };
  return /* @__PURE__ */ jsxs(
    Button,
    {
      size: "lg",
      className: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
      onClick: toggleMap,
      children: [
        /* @__PURE__ */ jsx(MapPin, { className: "w-5 h-5 mr-2" }),
        showMap ? "Hide Map" : "View on Map"
      ]
    }
  );
}
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxs(
      DialogPrimitive.Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", children: [
            /* @__PURE__ */ jsx(XIcon, {}),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
function DialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Description,
    {
      "data-slot": "dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function EventModal({ disabled = false }) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (disabled) return;
    const seenModal = sessionStorage.getItem("hasSeenEventModal");
    if (!seenModal) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("hasSeenEventModal", "true");
      }, 3e3);
      return () => clearTimeout(timer);
    }
  }, [disabled]);
  if (disabled) {
    return null;
  }
  return /* @__PURE__ */ jsx(Dialog, { open: isOpen, onOpenChange: setIsOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-[600px] p-0 gap-0 overflow-hidden border-2 border-purple-200 bg-white", children: [
    /* @__PURE__ */ jsxs(DialogHeader, { className: "sr-only", children: [
      /* @__PURE__ */ jsx(DialogTitle, { children: "I'm Dreaming of an Art Christmas" }),
      /* @__PURE__ */ jsx(DialogDescription, { children: 'Join our exciting artwork competition with the theme "The True Meaning of Christmas" and win amazing prizes!' })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 p-8 pb-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-white/20 backdrop-blur-sm rounded-full p-2 sm:p-3", children: /* @__PURE__ */ jsx(Sparkles, { className: "h-6 w-6 sm:h-8 sm:w-8 text-white" }) }),
        /* @__PURE__ */ jsx(Badge, { className: "bg-white/90 text-purple-700 hover:bg-white px-2 sm:px-3 py-1 text-xs sm:text-sm", children: "Special Event" })
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "text-white text-xl sm:text-2xl md:text-3xl mb-2 leading-tight", children: "🎨 I'm Dreaming of an Art Christmas" }),
      /* @__PURE__ */ jsx("p", { className: "text-white/90 text-sm sm:text-base md:text-lg", children: 'Artwork Competition - "The True Meaning of Christmas"' })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-6 md:p-8 -mt-4 sm:-mt-6 bg-white rounded-t-2xl sm:rounded-t-3xl relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4 sm:space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid gap-3 sm:gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-1.5 sm:p-2 flex-shrink-0", children: /* @__PURE__ */ jsx(Trophy, { className: "h-4 w-4 sm:h-5 sm:w-5 text-white" }) }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsx("h3", { className: "mb-1 text-sm sm:text-base", children: "Amazing Prizes" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-muted-foreground", children: "Win up to ₱1,000 cash prize plus consolation prizes for all participants!" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg p-1.5 sm:p-2 flex-shrink-0", children: /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4 sm:h-5 sm:w-5 text-white" }) }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsx("h3", { className: "mb-1 text-sm sm:text-base", children: "Important Dates" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-muted-foreground", children: "Submission Deadline: December 18, 2025 | Awards: December 20, 2025" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "border-t pt-4 sm:pt-6 mt-4 sm:mt-6", children: [
        /* @__PURE__ */ jsx("p", { className: "text-center text-muted-foreground mb-4 sm:mb-6 text-xs sm:text-sm md:text-base px-2", children: "Ready to showcase your artistic talents? Check out the complete competition rules, judging criteria, and submission guidelines!" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 w-full", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              asChild: true,
              className: "w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg text-sm sm:text-base min-h-[44px]",
              size: "lg",
              children: /* @__PURE__ */ jsx("a", { href: "/Events/event-guidelines", children: /* @__PURE__ */ jsxs("span", { className: "flex items-center justify-center gap-2", children: [
                "View Competition Guidelines",
                /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 sm:h-5 sm:w-5" })
              ] }) })
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              onClick: () => setIsOpen(false),
              variant: "outline",
              size: "lg",
              className: "w-full border-2 hover:bg-gray-50 text-sm sm:text-base min-h-[44px]",
              children: "Maybe Later"
            }
          )
        ] })
      ] })
    ] }) })
  ] }) });
}
const $$Astro = createAstro("https://youngstarterclub.asia");
const $$Homepage = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Homepage;
  let testimonials = [];
  let loading = true;
  let error = null;
  try {
    const pageId = process.env.PUBLIC_PAGE_ID;
    const accessToken = process.env.PUBLIC_FACEBOOK_ACCESS_TOKEN;
    if (!pageId || !accessToken) {
      error = "Environment variables not loaded. Check your .env file and restart the dev server.";
      loading = false;
    } else {
      const apiVersion = "v24.0";
      const apiUrl = `https://graph.facebook.com/${apiVersion}/${pageId}/ratings?access_token=${accessToken}&fields=reviewer{name},rating,review_text,created_time,recommendation_type&limit=20`;
      console.log("API URL (masked):", apiUrl.replace(accessToken, "[TOKEN_MASKED]"));
      const response = await fetch(apiUrl);
      const data = await response.json();
      const reviews = data.data || [];
      const getInitials = (name) => name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
      const getRandomColor = () => ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-red-500", "bg-yellow-500"][Math.floor(Math.random() * 5)];
      testimonials = reviews.map((review) => {
        const reviewerName = review.reviewer?.name || "Anonymous";
        const createdDate = review.created_time ? new Date(review.created_time) : /* @__PURE__ */ new Date();
        const rating = review.rating || (review.recommendation_type === "positive" ? 5 : 0);
        return {
          name: reviewerName,
          role: "Customer",
          content: review.review_text || "Recommended!",
          rating,
          isRecommended: review.recommendation_type === "positive" || rating,
          initials: getInitials(reviewerName),
          color: getRandomColor(),
          date: format(createdDate, "MMMM dd, yyyy")
        };
      });
      console.log("✅ Processed", testimonials.length, "testimonials");
      loading = false;
    }
  } catch (err) {
    console.error("Full error response:", err.message);
    error = `Failed to load reviews: ${err.message}`;
    loading = false;
  }
  const programs = [
    {
      id: "music",
      title: "Music Teaching",
      description: "Master piano, guitar, violin and more with certified instructors",
      icon: Music,
      path: "/music-teaching",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600"
    },
    {
      id: "badminton",
      title: "Badminton Coaching",
      description: "Professional coaching from basic techniques to competitive play",
      icon: Trophy,
      path: "/badminton-coaching",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600"
    },
    {
      id: "arts",
      title: "Arts Lessons",
      description: "Explore painting, drawing, sculpture and mixed media",
      icon: Palette,
      path: "/arts-lesson",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      textColor: "text-pink-600",
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600"
    },
    {
      id: "cooking",
      title: "Cooking Sessions",
      description: "Learn culinary skills and create delicious dishes",
      icon: ChefHat,
      path: "/cooking-session",
      color: "from-orange-500 to-yellow-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600"
    },
    {
      id: "photography",
      title: "Photography Classes",
      description: "Capture stunning images and master visual storytelling",
      icon: Camera,
      path: "/photography-classes",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      image: photographyimageUrl
    }
  ];
  const features = [
    { icon: Users, title: "Expert Instructors", description: "Learn from certified professionals with years of experience" },
    { icon: Heart, title: "Small Classes", description: "Personalized attention in intimate learning environments" },
    { icon: Star, title: "All Ages Welcome", description: "Programs designed for children, teens, and adults" },
    { icon: CheckCircle2, title: "Flexible Scheduling", description: "Choose times that work best for your lifestyle" }
  ];
  const stats = [
    { number: "100+", label: "Happy Students" },
    { number: "15+", label: "Years Experience" },
    { number: "15+", label: "Expert Instructors" },
    { number: "5", label: "Programs Offered" }
  ];
  return renderTemplate`${renderComponent($$result, "EventModal", EventModal, { "disabled": true, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/components/EventModal.tsx", "client:component-export": "EventModal" })}${renderComponent($$result, "ParallaxSection", ParallaxSection, { "imageUrl": homeimageUrl, ";": true, "className": "pt-20 sm:pt-24 lg:pt-32 pb-20 sm:pb-24 lg:pb-32", "overlayOpacity": 0.7, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/components/ParallaxSection.tsx", "client:component-export": "ParallaxSection" }, { "default": async ($$result2) => renderTemplate`${maybeRenderHead()}<div class="container mx-auto px-4 sm:px-6 lg:px-8"><div class="grid lg:grid-cols-2 gap-12 items-center"><!-- Left Content --><div class="text-white"><div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/30">${renderComponent($$result2, "Sparkles", Sparkles, { "className": "w-4 h-4" })}<span class="text-sm">Empowering Learners Since 2010</span></div><h1 class="text-4xl sm:text-5xl lg:text-6xl mb-6 text-white">
Discover Your
<span class="block mt-2 text-yellow-300">Passion & Potential</span></h1><p class="text-xl mb-8 text-white/90 leading-relaxed">
Join Young Starter Club where creativity meets learning! We offer 
            world-class programs in music, sports, arts, cooking, and 
            photography for all ages.
</p><!-- CTA Buttons --><div class="flex flex-wrap gap-4 mb-10"><a href="https://www.facebook.com/YSCcommunity" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 bg-white text-purple-600 hover:bg-yellow-300 hover:text-purple-700 shadow-xl hover:shadow-2xl transition-all duration-300 px-4 py-2 rounded-lg font-medium text-sm">${renderComponent($$result2, "MessageCircle", MessageCircle, { "className": "w-5 h-5" })}
Get Started Today
</a><a href="#programs" class="inline-flex items-center gap-2 bg-white text-purple-600 hover:bg-yellow-300 hover:text-purple-700 shadow-xl hover:shadow-2xl transition-all duration-300 px-4 py-2 rounded-lg font-medium text-sm">
Explore Programs
${renderComponent($$result2, "ArrowRight", ArrowRight, { "className": "w-5 h-5 ml-2" })}</a></div><!-- Stats --><div class="grid grid-cols-2 sm:grid-cols-4 gap-6">${stats.map((stat, index) => renderTemplate`<div class="text-center"><div class="text-3xl font-bold text-yellow-300 mb-1">${stat.number}</div><div class="text-sm text-white/80">${stat.label}</div></div>`)}</div></div><!-- Right Content - Image Grid --><div class="hidden lg:grid grid-cols-2 gap-4"><div class="space-y-4"><div class="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">${renderComponent($$result2, "ImageWithFallback", ImageWithFallback, { "src": "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600", "alt": "Music lessons", "className": "w-full h-48 object-cover", "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/components/figma/ImageWithFallback.tsx", "client:component-export": "ImageWithFallback" })}</div><div class="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">${renderComponent($$result2, "ImageWithFallback", ImageWithFallback, { "src": "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600", "alt": "Art classes", "className": "w-full h-64 object-cover", "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/components/figma/ImageWithFallback.tsx", "client:component-export": "ImageWithFallback" })}</div></div><div class="space-y-4 pt-8"><div class="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">${renderComponent($$result2, "ImageWithFallback", ImageWithFallback, { "src": "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600", "alt": "Badminton coaching", "className": "w-full h-64 object-cover", "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/components/figma/ImageWithFallback.tsx", "client:component-export": "ImageWithFallback" })}</div><div class="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">${renderComponent($$result2, "ImageWithFallback", ImageWithFallback, { "src": "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600", "alt": "Cooking sessions", "className": "w-full h-48 object-cover", "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/components/figma/ImageWithFallback.tsx", "client:component-export": "ImageWithFallback" })}</div></div></div></div></div>` })}<!-- Features Strip --><section class="py-12 bg-white border-b"> <div class="container mx-auto px-4 sm:px-6 lg:px-8"> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"> ${features.map((feature, index) => renderTemplate`<div class="flex items-start gap-4"> <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0"> ${renderComponent($$result, "feature.icon", feature.icon, { "className": "w-6 h-6 text-white" })} </div> <div> <h4 class="mb-1">${feature.title}</h4> <p class="text-sm text-muted-foreground">${feature.description}</p> </div> </div>`)} </div> </div> </section> <!-- Programs Section --> <section id="programs" class="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50"> <div class="container mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-16"> <div class="inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full mb-4"> ${renderComponent($$result, "Sparkles", Sparkles, { "className": "w-4 h-4 text-purple-600" })} <span class="text-sm text-purple-600">What We Offer</span> </div> <h2 class="mb-4">Explore Our Programs</h2> <p class="text-muted-foreground max-w-2xl mx-auto text-lg">
Choose from our diverse range of programs designed to inspire creativity, build skills, and foster growth
</p> </div> <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"> ${programs.map((program) => renderTemplate`<a${addAttribute(program.path, "href")} class="group"> ${renderComponent($$result, "Card", Card, { "className": "h-full overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-purple-300" }, { "default": async ($$result2) => renderTemplate` <div class="relative h-48 overflow-hidden"> ${renderComponent($$result2, "ImageWithFallback", ImageWithFallback, { "src": program.image, "alt": program.title, "className": "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500", "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/components/figma/ImageWithFallback.tsx", "client:component-export": "ImageWithFallback" })} <div${addAttribute(`absolute inset-0 bg-gradient-to-br ${program.color} opacity-40 group-hover:opacity-20 transition-opacity`, "class")}></div> <div${addAttribute(`absolute top-4 right-4 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg`, "class")}> ${renderComponent($$result2, "program.icon", program.icon, { "className": `w-6 h-6 ${program.textColor}` })} </div> </div> <div class="p-6"> <h3 class="mb-2 group-hover:text-purple-600 transition-colors">${program.title}</h3> <p class="text-muted-foreground mb-4">${program.description}</p> <div${addAttribute(`inline-flex items-center gap-2 ${program.textColor} font-medium`, "class")}>
Learn More
${renderComponent($$result2, "ArrowRight", ArrowRight, { "className": "w-4 h-4 group-hover:translate-x-2 transition-transform" })} </div> </div> ` })} </a>`)} </div> <div class="text-center mt-12"> <p class="text-muted-foreground mb-4">Not sure which program is right for you?</p> <a href="/QuizProgram/find-your-program" class="inline-flex items-center gap-2 border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-6 py-3 rounded-lg font-medium text-sm transition-all"> ${renderComponent($$result, "HelpCircle", HelpCircle, { "className": "w-5 h-5" })}
Take a test now
</a> </div> </div> </section> <!-- Why Choose Us Section --> <section class="py-20 bg-white"> <div class="container mx-auto px-4 sm:px-6 lg:px-8"> <div class="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto"> <!-- Image --> <div class="relative"> <div class="relative rounded-3xl overflow-hidden shadow-2xl"> ${renderComponent($$result, "ImageWithFallback", ImageWithFallback, { "src": "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800", "alt": "Happy students", "className": "w-full h-[500px] object-cover", "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/components/figma/ImageWithFallback.tsx", "client:component-export": "ImageWithFallback" })} </div> <!-- Floating Badge --> <div class="absolute -bottom-6 -right-6 bg-gradient-to-br from-purple-600 to-pink-600 text-white p-6 rounded-2xl shadow-2xl"> <div class="text-3xl font-bold mb-1">11+ Years</div> <div class="text-sm opacity-90">of Excellence</div> </div> </div> <!-- Content --> <div> <div class="inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full mb-6"> ${renderComponent($$result, "Heart", Heart, { "className": "w-4 h-4 text-purple-600" })} <span class="text-sm text-purple-600">Why Choose Us</span> </div> <h2 class="mb-6">Your Journey to Excellence Starts Here</h2> <p class="text-muted-foreground mb-8 text-lg">
At Young Starter Club, we're more than just a learning center. We're a vibrant music school dedicated to helping these kids and you to discover your passions and achieve your goals.
</p> <div class="space-y-4 mb-8"> ${[
    "Certified and passionate instructors",
    "Clean and well-maintained facilities and equipment",
    "Flexible class schedules",
    "Group and small class sizes for personalized attention",
    "Developmentally appropriate curriculum",
    "Play-based learning",
    `Engaging virtual approach`
  ].map((item) => renderTemplate`<div class="flex items-center gap-3"> ${renderComponent($$result, "CheckCircle2", CheckCircle2, { "className": "w-6 h-6 text-green-500 flex-shrink-0" })} <span class="text-muted-foreground">${item}</span> </div>`)} </div> <!-- Map Toggle Button - Uses a client-loaded React component for state --> ${renderComponent($$result, "MapToggleButton", MapToggleButton, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/components/MapToggleButton.tsx", "client:component-export": "MapToggleButton" })} </div> </div> </div> </section> <!-- Animated Google Maps Section - Controlled by MapToggleButton --> <div id="map-section" class="overflow-hidden transition-all duration-700 ease-in-out max-h-0 opacity-0"> <section class="py-12 bg-gradient-to-br from-purple-50 to-pink-50"> <div class="container mx-auto px-4 sm:px-6 lg:px-8"> <div class="max-w-6xl mx-auto transition-all duration-700 delay-100 -translate-y-8 opacity-0" id="map-content"> <div class="bg-white rounded-3xl shadow-2xl p-4 border-2 border-purple-200"> <!-- Responsive Google Maps iframe --> <div class="relative overflow-hidden rounded-2xl" style="padding-top: 75%;"> <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d966.3396427435331!2d121.05020367230219!3d14.348648757664607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d74a7ea51fdf%3A0x76c3eb78c5e87eca!2sYoung%20Starter%20Club!5e0!3m2!1sen!2sph!4v1764236052425!5m2!1sen!2sph" class="absolute top-0 left-0 w-full h-full border-0"${addAttribute(true, "allowfullscreen")} loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> </div> </div> </div> </div> </section> </div> <!-- Testimonials Section --> <section id="testimonials" class="py-20 bg-gradient-to-br from-purple-50 to-pink-50"> <div class="container mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-12"> <h2 class="mb-4">What Our Community Says</h2> <p class="text-muted-foreground max-w-2xl mx-auto">
Don't just take our word for it - hear from our happy students and parents!
</p> <p class="text-muted-foreground max-w-xl mx-auto">
We keep them anonymous, to verify, reviews here are from facebook.
</p> </div> ${loading ? renderTemplate`<p class="text-center">Loading reviews...</p>` : error ? renderTemplate`<p class="text-center text-red-500">${error}</p>` : renderTemplate`<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6"> ${testimonials.map((testimonial, index) => renderTemplate`${renderComponent($$result, "TestimonialCard", TestimonialCard, { "testimonial": testimonial, "client:idle": true, "client:component-hydration": "idle", "client:component-path": "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/components/TestimonialCard.tsx", "client:component-export": "TestimonialCard" })}`)} </div>`} </div> </section> <!-- CTA Section - Parallax --> ${renderComponent($$result, "ParallaxSection", ParallaxSection, { "imageUrl": homeimageUrl, "className": "py-10", "overlayOpacity": 0.8, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/components/ParallaxSection.tsx", "client:component-export": "ParallaxSection" }, { "default": async ($$result2) => renderTemplate` <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center"> ${renderComponent($$result2, "Sparkles", Sparkles, { "className": "w-12 h-12 mx-auto mb-6 text-yellow-300" })} <h2 class="mb-6 text-white text-4xl lg:text-5xl">Ready to Begin Your Journey?</h2> <p class="mb-8 max-w-2xl mx-auto text-white/90 text-xl">
Join our vibrant community of learners today. Let's discover your passion together!
</p> <div class="flex flex-wrap gap-4 justify-center"> <a href="https://www.facebook.com/YSCcommunity" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 bg-white text-purple-600 hover:bg-yellow-300 hover:text-purple-700 shadow-xl px-6 py-3 rounded-lg font-medium text-sm"> ${renderComponent($$result2, "MessageCircle", MessageCircle, { "className": "w-5 h-5 mr-2" })}
Contact Us on Facebook
</a> <a href="#programs" class="inline-flex items-center gap-2 bg-white text-purple-600 hover:bg-yellow-300 hover:text-purple-700 shadow-xl px-6 py-3 rounded-lg font-medium text-sm">
Browse Programs
</a> </div> </div> ` })}`;
}, "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/pages/homepage.astro", void 0);
const $$file = "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/pages/homepage.astro";
const $$url = "/homepage";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Homepage,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
export {
  $$Homepage as $,
  _page as _
};
