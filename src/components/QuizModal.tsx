import { useState } from 'react';
import { QuizQuestion as QuizQuestionComponent } from './QuizQuestions.tsx';
import { QuizResults } from '../components/QuizResults.tsx';
import { generalQuestions, musicQuestions } from '../data/quizData.ts';
import type { QuizQuestion } from '../data/quizData.ts';  
import { X } from 'lucide-react';

// ... rest of the file remains the same ...

interface QuizModalProps {
  onClose: () => void;
}

export function QuizModal({ onClose }: QuizModalProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [programScores, setProgramScores] = useState<{ [key: string]: number }>({
    music: 0,
    badminton: 0,
    arts: 0,
    cooking: 0,
    photography: 0
  });
  const [instrumentScores, setInstrumentScores] = useState<{ [key: string]: number }>({
    piano: 0,
    guitar: 0,
    violin: 0,
    drums: 0,
    flute: 0,
    saxophone: 0,
    ukulele: 0
  });
  const [showResults, setShowResults] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>(generalQuestions);
  const [phase, setPhase] = useState<'general' | 'music'>('general');

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleAnswer = (scores: { [key: string]: number }) => {
    // Update scores based on current phase
    if (phase === 'general') {
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

    // Move to next question or determine next phase
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Check if we need to show music questions
      if (phase === 'general') {
        const maxScore = Math.max(...Object.values(programScores));
        const topProgram = Object.keys(programScores).find(
          (key) => programScores[key] === maxScore
        );

        if (topProgram === 'music') {
          // Switch to music questions
          setPhase('music');
          setQuestions(musicQuestions);
          setCurrentQuestionIndex(0);
        } else {
          // Show results
          setShowResults(true);
        }
      } else {
        // Music phase complete, show results
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
    setPhase('general');
  };

  if (showResults) {
    return (
      <QuizResults
        programScores={programScores}
        instrumentScores={instrumentScores}
        onRetake={handleRetake}
        onClose={onClose}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
          aria-label="Close quiz"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>

        {/* Progress Bar */}
        <div className="sticky top-0 bg-white z-10 px-6 pt-6 pb-4 rounded-t-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <span className="text-sm text-purple-600">
              {phase === 'music' ? '🎵 Music Focus' : '🌟 Finding Your Match'}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="px-6 pb-6">
          <QuizQuestionComponent
            question={currentQuestion}
            onAnswer={handleAnswer}
            questionNumber={currentQuestionIndex + 1}
          />
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

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
