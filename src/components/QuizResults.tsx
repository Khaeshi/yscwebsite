import { programInfo, instrumentInfo } from '../data/quizData.ts';
import { Button } from '../components/ui/button.tsx';
import { Sparkles, RefreshCw, MessageCircle, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface QuizResultsProps {
  programScores: { [key: string]: number };
  instrumentScores: { [key: string]: number };
  onRetake: () => void;
  onClose: () => void;
}

export function QuizResults({ programScores, instrumentScores, onRetake, onClose }: QuizResultsProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  // Calculate top program
  const maxProgramScore = Math.max(...Object.values(programScores));
  const topProgramKey = Object.keys(programScores).find(
    (key) => programScores[key] === maxProgramScore
  ) || 'music';
  const topProgram = programInfo[topProgramKey];

  // Calculate match percentage (assuming max possible score is around 15-18)
  const matchPercentage = Math.min(Math.round((maxProgramScore / 18) * 100), 99);

  // Get runner-up
  const runnerUpScore = Math.max(
    ...Object.values(programScores).filter((score) => score !== maxProgramScore)
  );
  const runnerUpKey = Object.keys(programScores).find(
    (key) => programScores[key] === runnerUpScore && key !== topProgramKey
  );
  const runnerUp = runnerUpKey ? programInfo[runnerUpKey] : null;
  const runnerUpPercentage = runnerUpKey ? Math.min(Math.round((runnerUpScore / 18) * 100), 99) : 0;

  // Get top instrument if music was selected
  let topInstrument = null;
  if (topProgramKey === 'music' && Object.values(instrumentScores).some((score) => score > 0)) {
    const maxInstrumentScore = Math.max(...Object.values(instrumentScores));
    const topInstrumentKey = Object.keys(instrumentScores).find(
      (key) => instrumentScores[key] === maxInstrumentScore
    );
    topInstrument = topInstrumentKey ? instrumentInfo[topInstrumentKey] : null;
  }

  // Generate Facebook Messenger link
  const generateMessengerLink = () => {
    let message = `Hi! I just completed the Young Starter Club program quiz and my result is: ${topProgram.name}`;
    if (topInstrument) {
      message += ` (${topInstrument.name})`;
    }
    message += `. I'm interested in enrolling. Can you provide more details?`;
    
    const facebookPageUsername = 'YSCcommunity';
    return `https://m.me/${facebookPageUsername}?text=${encodeURIComponent(message)}`;
  };

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 relative animate-scale-in">
        {/* Confetti Effect */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10%',
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              >
                <span className="text-2xl">
                  {['🎉', '✨', '🎊', '⭐', '🌟'][Math.floor(Math.random() * 5)]}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Header */}
        <div className="text-center pt-8 pb-6 px-6 border-b border-gray-200">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-8 h-8 text-yellow-500" />
            <h2 className="text-3xl text-gray-800">Your Perfect Match!</h2>
            <Sparkles className="w-8 h-8 text-yellow-500" />
          </div>
          <p className="text-gray-600">Based on your answers, we've found the ideal program for you</p>
        </div>

        {/* Top Program Result */}
        <div className="p-8">
          <div className={`border-2 rounded-2xl p-8 ${topProgram.color} relative overflow-hidden`}>
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 text-9xl opacity-10">
              {topProgram.emoji}
            </div>

            <div className="relative z-10">
              {/* Program Icon and Name */}
              <div className="flex items-center gap-4 mb-4">
                <div className="text-6xl">{topProgram.icon}</div>
                <div>
                  <h3 className="text-3xl text-gray-800 mb-1">{topProgram.name}</h3>
                  <div className="flex items-center gap-2">
                    <div className="bg-white px-3 py-1 rounded-full text-sm">
                      {matchPercentage}% Match
                    </div>
                    {topInstrument && (
                      <div className="bg-purple-100 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                        <span>{topInstrument.icon}</span>
                        <span>Recommended: {topInstrument.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-4">{topProgram.description}</p>

              {/* Instrument Details (if music) */}
              {topInstrument && (
                <div className="bg-white/70 rounded-lg p-4 mb-4">
                  <p className="text-gray-700">
                    <strong className="text-purple-700">Why {topInstrument.name}?</strong>{' '}
                    {topInstrument.description}
                  </p>
                </div>
              )}

              {/* Benefits */}
              <div className="mb-6">
                <h4 className="text-sm uppercase tracking-wide text-gray-600 mb-3">
                  Why it's perfect for you:
                </h4>
                <ul className="space-y-2">
                  {topProgram.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg"
                >
                  <a href={generateMessengerLink()} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Enroll via Messenger
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="flex-1 py-6 text-lg border-2"
                >
                  <a href={topProgram.link}>
                    Learn More
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Runner-up Program */}
          {runnerUp && (
            <div className="mt-6">
              <h4 className="text-sm uppercase tracking-wide text-gray-600 mb-3 text-center">
                You might also enjoy:
              </h4>
              <div className={`border rounded-lg p-6 ${runnerUp.color}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{runnerUp.icon}</div>
                    <div>
                      <h5 className="text-lg text-gray-800">{runnerUp.name}</h5>
                      <p className="text-sm text-gray-600">{runnerUpPercentage}% Match</p>
                    </div>
                  </div>
                  <Button asChild variant="ghost" size="sm">
                    <a href={runnerUp.link}>
                      View
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={onRetake} variant="outline" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Retake Quiz
            </Button>
            <Button onClick={onClose} variant="ghost">
              Close
            </Button>
          </div>
        </div>
      </div>

      <style>{`
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
      `}</style>
    </div>
  );
}
