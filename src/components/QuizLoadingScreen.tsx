import { useEffect, useState } from 'react';

interface QuizLoadingScreenProps {
  onLoadingComplete: () => void;
}

export function QuizLoadingScreen({ onLoadingComplete }: QuizLoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    "Finding your perfect match...",
    "Analyzing your interests...",
    "Preparing personalized questions...",
    "Almost ready..."
  ];

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Message rotation
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 800);

    // Complete loading after 3 seconds
    const timeout = setTimeout(() => {
      onLoadingComplete();
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
      clearTimeout(timeout);
    };
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center z-50">
      <div className="text-center px-4 max-w-md">
        {/* Floating Icons */}
        <div className="relative h-32 mb-8">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 animate-float-1 text-5xl">
            🎵
          </div>
          <div className="absolute top-4 left-1/4 animate-float-2 text-4xl">
            🏸
          </div>
          <div className="absolute top-4 right-1/4 animate-float-3 text-4xl">
            🎨
          </div>
          <div className="absolute top-8 left-1/3 animate-float-4 text-3xl">
            👨‍🍳
          </div>
          <div className="absolute top-8 right-1/3 animate-float-5 text-3xl">
            📷
          </div>
        </div>

        {/* Message */}
        <h2 className="text-3xl mb-6 text-gray-800 animate-pulse">
          {messages[messageIndex]}
        </h2>

        {/* Progress Bar */}
        <div className="w-full bg-white/50 rounded-full h-3 overflow-hidden shadow-inner mb-4">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Percentage */}
        <p className="text-gray-600 text-sm">{progress}%</p>
      </div>

      <style>{`
        @keyframes float-1 {
          0%, 100% {
            transform: translate(-50%, 0) rotate(0deg);
          }
          50% {
            transform: translate(-50%, -20px) rotate(10deg);
          }
        }

        @keyframes float-2 {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(-10deg);
          }
        }

        @keyframes float-3 {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-18px) rotate(15deg);
          }
        }

        @keyframes float-4 {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-12px) rotate(-8deg);
          }
        }

        @keyframes float-5 {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-16px) rotate(12deg);
          }
        }

        .animate-float-1 {
          animation: float-1 3s ease-in-out infinite;
        }

        .animate-float-2 {
          animation: float-2 2.5s ease-in-out infinite;
          animation-delay: 0.2s;
        }

        .animate-float-3 {
          animation: float-3 2.8s ease-in-out infinite;
          animation-delay: 0.4s;
        }

        .animate-float-4 {
          animation: float-4 3.2s ease-in-out infinite;
          animation-delay: 0.6s;
        }

        .animate-float-5 {
          animation: float-5 2.6s ease-in-out infinite;
          animation-delay: 0.8s;
        }
      `}</style>
    </div>
  );
}
