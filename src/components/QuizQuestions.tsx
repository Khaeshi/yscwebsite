import { useState } from 'react';
import type { QuizQuestion as QuizQuestionType } from '../data/quizData.ts';

interface QuizQuestionProps {
  question: QuizQuestionType;
  onAnswer: (scores: { [key: string]: number }) => void;
  questionNumber: number;
}

export function QuizQuestion({ question, onAnswer, questionNumber: _questionNumber }: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAnswerClick = (index: number) => {
    if (isAnimating) return;

    setSelectedAnswer(index);
    setIsAnimating(true);

    // Animate and move to next question
    setTimeout(() => {
      onAnswer(question.answers[index].scores);
      setSelectedAnswer(null);
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div className="py-6">
      {/* Question Text */}
      <h3 className="text-2xl mb-8 text-gray-800 text-center animate-fade-in">
        {question.question}
      </h3>

      {/* Answer Options */}
      <div className="space-y-4">
        {question.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(index)}
            disabled={isAnimating}
            className={`
              w-full p-6 rounded-xl border-2 transition-all duration-300 text-left
              flex items-center gap-4 group hover:scale-[1.02] active:scale-[0.98]
              ${
                selectedAnswer === index
                  ? 'border-purple-500 bg-purple-50 shadow-lg'
                  : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50 bg-white'
              }
              ${isAnimating && selectedAnswer !== index ? 'opacity-50' : ''}
            `}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Icon */}
            <div className="text-4xl flex-shrink-0 transform group-hover:scale-110 transition-transform">
              {answer.icon}
            </div>

            {/* Text */}
            <div className="flex-1">
              <p className="text-lg text-gray-800 group-hover:text-purple-700 transition-colors">
                {answer.text}
              </p>
            </div>

            {/* Selection Indicator */}
            {selectedAnswer === index && (
              <div className="flex-shrink-0">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center animate-bounce">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      <style>{`
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
      `}</style>
    </div>
  );
}
