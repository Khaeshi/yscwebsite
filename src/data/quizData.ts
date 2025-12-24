export interface QuizAnswer {
    text: string;
    icon: string;
    scores: {
      [key: string]: number;
    };
  }
  
  export interface QuizQuestion {
    id: number;
    question: string;
    category: 'general' | 'music';
    answers: QuizAnswer[];
  }
  
  export const generalQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "How do you prefer to spend your free time?",
      category: 'general',
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
      category: 'general',
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
      category: 'general',
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
      category: 'general',
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
      category: 'general',
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
      category: 'general',
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
  
  export const musicQuestions: QuizQuestion[] = [
    {
      id: 7,
      question: "What feels most natural to you?",
      category: 'music',
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
      category: 'music',
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
      category: 'music',
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
      category: 'music',
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
  
  export interface ProgramInfo {
    name: string;
    icon: string;
    emoji: string;
    description: string;
    benefits: string[];
    color: string;
    link: string;
  }
  
  export const programInfo: { [key: string]: ProgramInfo } = {
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
  
  export const instrumentInfo: { [key: string]: { name: string; icon: string; description: string } } = {
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
  