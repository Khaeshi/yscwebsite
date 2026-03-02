import { f as createComponent, l as renderComponent, r as renderTemplate, m as maybeRenderHead } from "../../chunks/astro/server_Cfl3Ur0m.mjs";
import { $ as $$Layout } from "../../chunks/Layout_mRKKubIj.mjs";
import { j as jsxRuntimeExports } from "../../chunks/jsx-runtime_mS7YKmDK.mjs";
import { a as reactExports } from "../../chunks/_@astro-renderers_B4KjVBz-.mjs";
import { r } from "../../chunks/_@astro-renderers_B4KjVBz-.mjs";
import { c as createLucideIcon, B as Button, d as MessageCircle, X } from "../../chunks/index_tryOdpTZ.mjs";
import { S as Sparkles } from "../../chunks/sparkles_CIAmSsCs.mjs";
import { A as ArrowRight } from "../../chunks/arrow-right_D1WKcfHu.mjs";
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode);
function QuizQuestion({ question, onAnswer, questionNumber: _questionNumber }) {
  const [selectedAnswer, setSelectedAnswer] = reactExports.useState(null);
  const [isAnimating, setIsAnimating] = reactExports.useState(false);
  const handleAnswerClick = (index) => {
    if (isAnimating) return;
    setSelectedAnswer(index);
    setIsAnimating(true);
    setTimeout(() => {
      onAnswer(question.answers[index].scores);
      setSelectedAnswer(null);
      setIsAnimating(false);
    }, 500);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl mb-8 text-gray-800 text-center animate-fade-in", children: question.question }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: question.answers.map((answer, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => handleAnswerClick(index),
        disabled: isAnimating,
        className: `
              w-full p-6 rounded-xl border-2 transition-all duration-300 text-left
              flex items-center gap-4 group hover:scale-[1.02] active:scale-[0.98]
              ${selectedAnswer === index ? "border-purple-500 bg-purple-50 shadow-lg" : "border-gray-200 hover:border-purple-300 hover:bg-purple-50/50 bg-white"}
              ${isAnimating && selectedAnswer !== index ? "opacity-50" : ""}
            `,
        style: { animationDelay: `${index * 0.1}s` },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl flex-shrink-0 transform group-hover:scale-110 transition-transform", children: answer.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-gray-800 group-hover:text-purple-700 transition-colors", children: answer.text }) }),
          selectedAnswer === index && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center animate-bounce", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "svg",
            {
              className: "w-4 h-4 text-white",
              fill: "none",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: "2",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M5 13l4 4L19 7" })
            }
          ) }) })
        ]
      },
      index
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      ` })
  ] });
}
const generalQuestions = [
  {
    id: 1,
    question: "How do you prefer to spend your free time?",
    category: "general",
    answers: [
      {
        text: "Moving around, staying active",
        icon: "🏃",
        scores: { badminton: 3 }
      },
      {
        text: "Creating something with my hands",
        icon: "🎨",
        scores: { arts: 3, cooking: 2 }
      },
      {
        text: "Learning new skills through practice",
        icon: "🎵",
        scores: { music: 3 }
      },
      {
        text: "Capturing moments and memories",
        icon: "📸",
        scores: { photography: 3 }
      }
    ]
  },
  {
    id: 2,
    question: "Where do you feel most comfortable?",
    category: "general",
    answers: [
      {
        text: "Outdoors, fresh air and movement",
        icon: "🌳",
        scores: { badminton: 3 }
      },
      {
        text: "Indoors, focused environment",
        icon: "🏠",
        scores: { music: 2, arts: 2, cooking: 2 }
      },
      {
        text: "Both, depends on the activity",
        icon: "🌍",
        scores: { photography: 2 }
      }
    ]
  },
  {
    id: 3,
    question: "Do you prefer activities that are:",
    category: "general",
    answers: [
      {
        text: "Individual, at my own pace",
        icon: "🧘",
        scores: { music: 2, photography: 2, arts: 2 }
      },
      {
        text: "With others, team-based",
        icon: "👥",
        scores: { badminton: 3, cooking: 2 }
      },
      {
        text: "Flexible, can be both",
        icon: "⚖️",
        scores: { music: 1, badminton: 1, arts: 1, cooking: 1, photography: 1 }
      }
    ]
  },
  {
    id: 4,
    question: "What motivates you more?",
    category: "general",
    answers: [
      {
        text: "Physical fitness and competition",
        icon: "💪",
        scores: { badminton: 4 }
      },
      {
        text: "Creative expression and artistry",
        icon: "🎨",
        scores: { arts: 3, photography: 2 }
      },
      {
        text: "Learning technical skills",
        icon: "🎹",
        scores: { music: 3 }
      },
      {
        text: "Creating something practical and enjoyable",
        icon: "🍳",
        scores: { cooking: 3 }
      }
    ]
  },
  {
    id: 5,
    question: "What do you hope to gain?",
    category: "general",
    answers: [
      {
        text: "Fitness and coordination",
        icon: "🏸",
        scores: { badminton: 4 }
      },
      {
        text: "Creative outlet",
        icon: "🖌️",
        scores: { arts: 3, music: 2, photography: 2 }
      },
      {
        text: "Life skills",
        icon: "📚",
        scores: { cooking: 3 }
      },
      {
        text: "Performance and showcasing talent",
        icon: "🎭",
        scores: { music: 3 }
      },
      {
        text: "Capturing memories",
        icon: "📷",
        scores: { photography: 4 }
      }
    ]
  },
  {
    id: 6,
    question: "How do you feel about regular practice?",
    category: "general",
    answers: [
      {
        text: "Love it! Enjoy gradual improvement",
        icon: "📈",
        scores: { music: 3, badminton: 2 }
      },
      {
        text: "Prefer immediate results",
        icon: "⚡",
        scores: { cooking: 2, photography: 2 }
      },
      {
        text: "Balance of both",
        icon: "⚖️",
        scores: { arts: 2 }
      }
    ]
  }
];
const musicQuestions = [
  {
    id: 7,
    question: "What feels most natural to you?",
    category: "music",
    answers: [
      {
        text: "Finger dexterity and hand coordination",
        icon: "🖐️",
        scores: { piano: 3, guitar: 2 }
      },
      {
        text: "Breath control and posture",
        icon: "💨",
        scores: { flute: 3, saxophone: 2 }
      },
      {
        text: "Arm movement and precision",
        icon: "🎻",
        scores: { violin: 3 }
      },
      {
        text: "Rhythm and beat-keeping",
        icon: "🥁",
        scores: { drums: 3 }
      }
    ]
  },
  {
    id: 8,
    question: "What music do you enjoy most?",
    category: "music",
    answers: [
      {
        text: "Classical, orchestral",
        icon: "🎼",
        scores: { piano: 3, violin: 3 }
      },
      {
        text: "Pop, contemporary",
        icon: "🎤",
        scores: { guitar: 3, piano: 2 }
      },
      {
        text: "Jazz, improvisational",
        icon: "🎷",
        scores: { saxophone: 2, piano: 2 }
      },
      {
        text: "Rock, energetic",
        icon: "🎸",
        scores: { drums: 3, guitar: 3 }
      }
    ]
  },
  {
    id: 9,
    question: "How important is it to practice anywhere?",
    category: "music",
    answers: [
      {
        text: "Very important, need portability",
        icon: "🎒",
        scores: { guitar: 3, ukulele: 2 }
      },
      {
        text: "Don't mind staying in one place",
        icon: "🏠",
        scores: { piano: 3, drums: 2 }
      },
      {
        text: "Somewhere in between",
        icon: "⚖️",
        scores: { violin: 2, flute: 2 }
      }
    ]
  },
  {
    id: 10,
    question: "Which sound appeals to you?",
    category: "music",
    answers: [
      {
        text: "Rich, harmonic chords",
        icon: "🎹",
        scores: { piano: 4 }
      },
      {
        text: "Melodic, singing tones",
        icon: "🎻",
        scores: { violin: 3, flute: 2 }
      },
      {
        text: "Versatile, can play chords & melody",
        icon: "🎸",
        scores: { guitar: 4 }
      },
      {
        text: "Rhythmic, percussive",
        icon: "🥁",
        scores: { drums: 4 }
      }
    ]
  }
];
const programInfo = {
  music: {
    name: "Music Teaching",
    icon: "🎵",
    emoji: "🎹",
    description: "Master musical instruments with certified instructors and discover your creative voice.",
    benefits: [
      "Develop discipline through regular practice",
      "Express yourself creatively",
      "Improve focus and concentration",
      "Perform and showcase your talent"
    ],
    color: "bg-purple-50 border-purple-200",
    link: "/music-teaching"
  },
  badminton: {
    name: "Badminton Coaching",
    icon: "🏸",
    emoji: "🏸",
    description: "Build fitness, coordination, and competitive spirit with professional badminton training.",
    benefits: [
      "Improve physical fitness and agility",
      "Learn teamwork and sportsmanship",
      "Develop strategic thinking",
      "Compete in friendly tournaments"
    ],
    color: "bg-green-50 border-green-200",
    link: "/badminton-coaching"
  },
  arts: {
    name: "Arts Lessons",
    icon: "🎨",
    emoji: "🖌️",
    description: "Unleash your creativity through various art forms and techniques.",
    benefits: [
      "Express emotions through visual art",
      "Develop fine motor skills",
      "Build confidence in creative abilities",
      "Create lasting artworks"
    ],
    color: "bg-pink-50 border-pink-200",
    link: "/arts-lesson"
  },
  cooking: {
    name: "Cooking Sessions",
    icon: "🍳",
    emoji: "👨‍🍳",
    description: "Learn essential cooking skills and create delicious dishes.",
    benefits: [
      "Gain practical life skills",
      "Understand nutrition and healthy eating",
      "Bond with family through cooking",
      "Build independence and confidence"
    ],
    color: "bg-orange-50 border-orange-200",
    link: "/cooking-session"
  },
  photography: {
    name: "Photography",
    icon: "📷",
    emoji: "📸",
    description: "Capture beautiful moments and learn the art of visual storytelling.",
    benefits: [
      "See the world from new perspectives",
      "Preserve precious memories",
      "Develop technical and creative skills",
      "Share your unique vision"
    ],
    color: "bg-blue-50 border-blue-200",
    link: "/photography-classes"
  }
};
const instrumentInfo = {
  piano: {
    name: "Piano",
    icon: "🎹",
    description: "Perfect for those who love rich harmonies and want a versatile foundation in music."
  },
  guitar: {
    name: "Guitar",
    icon: "🎸",
    description: "Ideal for contemporary music lovers who value portability and versatility."
  },
  violin: {
    name: "Violin",
    icon: "🎻",
    description: "Great for those drawn to classical music and expressive melodies."
  },
  drums: {
    name: "Drums",
    icon: "🥁",
    description: "Perfect for rhythm enthusiasts who love energetic, percussive sounds."
  },
  flute: {
    name: "Flute",
    icon: "🪈",
    description: "Wonderful for those who appreciate melodic tones and portable instruments."
  },
  saxophone: {
    name: "Saxophone",
    icon: "🎷",
    description: "Ideal for jazz lovers and those who enjoy improvisational music."
  },
  ukulele: {
    name: "Ukulele",
    icon: "🪕",
    description: "Perfect for beginners seeking a fun, portable, and easy-to-learn instrument."
  }
};
function QuizResults({ programScores, instrumentScores, onRetake, onClose }) {
  const [showConfetti, setShowConfetti] = reactExports.useState(false);
  const maxProgramScore = Math.max(...Object.values(programScores));
  const topProgramKey = Object.keys(programScores).find(
    (key) => programScores[key] === maxProgramScore
  ) || "music";
  const topProgram = programInfo[topProgramKey];
  const matchPercentage = Math.min(Math.round(maxProgramScore / 18 * 100), 99);
  const runnerUpScore = Math.max(
    ...Object.values(programScores).filter((score) => score !== maxProgramScore)
  );
  const runnerUpKey = Object.keys(programScores).find(
    (key) => programScores[key] === runnerUpScore && key !== topProgramKey
  );
  const runnerUp = runnerUpKey ? programInfo[runnerUpKey] : null;
  const runnerUpPercentage = runnerUpKey ? Math.min(Math.round(runnerUpScore / 18 * 100), 99) : 0;
  let topInstrument = null;
  if (topProgramKey === "music" && Object.values(instrumentScores).some((score) => score > 0)) {
    const maxInstrumentScore = Math.max(...Object.values(instrumentScores));
    const topInstrumentKey = Object.keys(instrumentScores).find(
      (key) => instrumentScores[key] === maxInstrumentScore
    );
    topInstrument = topInstrumentKey ? instrumentInfo[topInstrumentKey] : null;
  }
  const generateMessengerLink = () => {
    let message = `Hi! I just completed the Young Starter Club program quiz and my result is: ${topProgram.name}`;
    if (topInstrument) {
      message += ` (${topInstrument.name})`;
    }
    message += `. I'm interested in enrolling. Can you provide more details?`;
    const facebookPageUsername = "YSCcommunity";
    return `https://m.me/${facebookPageUsername}?text=${encodeURIComponent(message)}`;
  };
  reactExports.useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3e3);
    return () => clearTimeout(timer);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center z-50 p-4 overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 relative animate-scale-in", children: [
      showConfetti && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none overflow-hidden rounded-2xl", children: [...Array(30)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute animate-confetti",
          style: {
            left: `${Math.random() * 100}%`,
            top: "-10%",
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: ["🎉", "✨", "🎊", "⭐", "🌟"][Math.floor(Math.random() * 5)] })
        },
        i
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center pt-8 pb-6 px-6 border-b border-gray-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-8 h-8 text-yellow-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl text-gray-800", children: "Your Perfect Match!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-8 h-8 text-yellow-500" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: "Based on your answers, we've found the ideal program for you" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `border-2 rounded-2xl p-8 ${topProgram.color} relative overflow-hidden`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 text-9xl opacity-10", children: topProgram.emoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl", children: topProgram.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-3xl text-gray-800 mb-1", children: topProgram.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white px-3 py-1 rounded-full text-sm", children: [
                    matchPercentage,
                    "% Match"
                  ] }),
                  topInstrument && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-purple-100 px-3 py-1 rounded-full text-sm flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: topInstrument.icon }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "Recommended: ",
                      topInstrument.name
                    ] })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700 mb-4", children: topProgram.description }),
            topInstrument && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white/70 rounded-lg p-4 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "text-purple-700", children: [
                "Why ",
                topInstrument.name,
                "?"
              ] }),
              " ",
              topInstrument.description
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm uppercase tracking-wide text-gray-600 mb-3", children: "Why it's perfect for you:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: topProgram.benefits.map((benefit, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-500 mt-1", children: "✓" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-700", children: benefit })
              ] }, index)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  asChild: true,
                  className: "flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: generateMessengerLink(), target: "_blank", rel: "noopener noreferrer", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-5 h-5 mr-2" }),
                    "Enroll via Messenger"
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  asChild: true,
                  variant: "outline",
                  className: "flex-1 py-6 text-lg border-2",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: topProgram.link, children: [
                    "Learn More",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-5 h-5 ml-2" })
                  ] })
                }
              )
            ] })
          ] })
        ] }),
        runnerUp && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm uppercase tracking-wide text-gray-600 mb-3 text-center", children: "You might also enjoy:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `border rounded-lg p-6 ${runnerUp.color}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl", children: runnerUp.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "text-lg text-gray-800", children: runnerUp.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-600", children: [
                  runnerUpPercentage,
                  "% Match"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: runnerUp.link, children: [
              "View",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-1" })
            ] }) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-col sm:flex-row gap-3 justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: onRetake, variant: "outline", className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
            "Retake Quiz"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: onClose, variant: "ghost", children: "Close" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }

        .animate-confetti {
          animation: confetti linear forwards;
        }
      ` })
  ] });
}
function QuizModal({ onClose }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = reactExports.useState(0);
  const [programScores, setProgramScores] = reactExports.useState({
    music: 0,
    badminton: 0,
    arts: 0,
    cooking: 0,
    photography: 0
  });
  const [instrumentScores, setInstrumentScores] = reactExports.useState({
    piano: 0,
    guitar: 0,
    violin: 0,
    drums: 0,
    flute: 0,
    saxophone: 0,
    ukulele: 0
  });
  const [showResults, setShowResults] = reactExports.useState(false);
  const [questions, setQuestions] = reactExports.useState(generalQuestions);
  const [phase, setPhase] = reactExports.useState("general");
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progress = (currentQuestionIndex + 1) / totalQuestions * 100;
  const handleAnswer = (scores) => {
    if (phase === "general") {
      setProgramScores((prev) => {
        const updated = { ...prev };
        Object.keys(scores).forEach((key) => {
          updated[key] = (updated[key] || 0) + scores[key];
        });
        return updated;
      });
    } else {
      setInstrumentScores((prev) => {
        const updated = { ...prev };
        Object.keys(scores).forEach((key) => {
          updated[key] = (updated[key] || 0) + scores[key];
        });
        return updated;
      });
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      if (phase === "general") {
        const maxScore = Math.max(...Object.values(programScores));
        const topProgram = Object.keys(programScores).find(
          (key) => programScores[key] === maxScore
        );
        if (topProgram === "music") {
          setPhase("music");
          setQuestions(musicQuestions);
          setCurrentQuestionIndex(0);
        } else {
          setShowResults(true);
        }
      } else {
        setShowResults(true);
      }
    }
  };
  const handleRetake = () => {
    setCurrentQuestionIndex(0);
    setProgramScores({
      music: 0,
      badminton: 0,
      arts: 0,
      cooking: 0,
      photography: 0
    });
    setInstrumentScores({
      piano: 0,
      guitar: 0,
      violin: 0,
      drums: 0,
      flute: 0,
      saxophone: 0,
      ukulele: 0
    });
    setShowResults(false);
    setQuestions(generalQuestions);
    setPhase("general");
  };
  if (showResults) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      QuizResults,
      {
        programScores,
        instrumentScores,
        onRetake: handleRetake,
        onClose
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-scale-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onClose,
          className: "absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10",
          "aria-label": "Close quiz",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-6 h-6 text-gray-600" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 bg-white z-10 px-6 pt-6 pb-4 rounded-t-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-gray-600", children: [
            "Question ",
            currentQuestionIndex + 1,
            " of ",
            totalQuestions
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-purple-600", children: phase === "music" ? "🎵 Music Focus" : "🌟 Finding Your Match" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-gray-200 rounded-full h-2 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 transition-all duration-500 ease-out",
            style: { width: `${progress}%` }
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        QuizQuestion,
        {
          question: currentQuestion,
          onAnswer: handleAnswer,
          questionNumber: currentQuestionIndex + 1
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      ` })
  ] });
}
const $$FindYourProgram = createComponent(($$result, $$props, $$slots) => {
  const handleCloseQuiz = () => {
    window.location.href = "/";
  };
  const pageTitle = "Quiz | Young Starter Club";
  const description = "Take a quiz to identify your desired program with YSC!";
  const image = "/assets/YSC.png";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": pageTitle, "description": description, "image": image }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">  ${renderComponent($$result2, "QuizModal", QuizModal, { "client:load": true, "onClose": handleCloseQuiz, "client:component-hydration": "load", "client:component-path": "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/components/quiz/QuizModal.tsx", "client:component-export": "QuizModal" })} </div> ` })}`;
}, "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/pages/QuizProgram/find-your-program.astro", void 0);
const $$file = "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/pages/QuizProgram/find-your-program.astro";
const $$url = "/QuizProgram/find-your-program";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$FindYourProgram,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
