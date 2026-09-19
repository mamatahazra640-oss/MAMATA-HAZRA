import React, { useState } from 'react';
import { 
  CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, 
  HelpCircle, ChevronRight, AlertCircle, BookOpen 
} from 'lucide-react';
import { QuizSet, QuizQuestion } from '../types';
import confetti from 'canvas-confetti';

interface QuizViewProps {
  quizSets: QuizSet[];
  activeQuizId?: string;
  onSaveQuizResult: (quizId: string, score: number, total: number) => void;
  onBackToCourse?: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  quizSets,
  activeQuizId,
  onSaveQuizResult,
  onBackToCourse,
}) => {
  const [selectedQuizId, setSelectedQuizId] = useState<string>(
    activeQuizId || (quizSets[0]?.id || '')
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);

  const activeSet = quizSets.find((q) => q.id === selectedQuizId) || quizSets[0];
  const questions = activeSet?.questions || [];
  const currentQ: QuizQuestion | undefined = questions[currentQuestionIndex];

  // Calculate results
  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correct += 1;
      }
    });
    return correct;
  };

  const handleSelectOption = (optIndex: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optIndex,
    }));
  };

  const handleCheckAnswer = () => {
    if (selectedAnswers[currentQuestionIndex] === undefined) return;
    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setIsAnswerSubmitted(false);
    } else {
      // Finish Quiz
      setIsQuizFinished(true);
      const score = calculateScore();
      onSaveQuizResult(activeSet.id, score, questions.length);

      if (score / questions.length >= 0.8) {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsAnswerSubmitted(false);
    setIsQuizFinished(false);
  };

  const handleSwitchQuiz = (quizId: string) => {
    setSelectedQuizId(quizId);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsAnswerSubmitted(false);
    setIsQuizFinished(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Category Selection Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {quizSets.map((qs) => {
          const isSelected = qs.id === selectedQuizId;
          return (
            <button
              key={qs.id}
              onClick={() => handleSwitchQuiz(qs.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                isSelected
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750'
              }`}
            >
              {qs.title}
            </button>
          );
        })}
      </div>

      {/* Main Quiz Area */}
      {!isQuizFinished && currentQ ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          {/* Quiz Header & Progress Bar */}
          <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {currentQ.categoryTitle}
              </span>
              <span>
                প্রশ্ন {currentQuestionIndex + 1} / {questions.length}
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
                style={{
                  width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="p-5 sm:p-8">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-6 leading-relaxed">
              {currentQ.question}
            </h3>

            {/* 4 Bengali Options */}
            <div className="space-y-3 mb-6">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
                const isCorrect = currentQ.correctIndex === optIdx;

                let optClass = 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800';

                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    optClass = 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-semibold';
                  } else if (isSelected && !isCorrect) {
                    optClass = 'bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-900 dark:text-rose-200';
                  } else {
                    optClass = 'opacity-50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400';
                  }
                } else if (isSelected) {
                  optClass = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/20 font-semibold';
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    disabled={isAnswerSubmitted}
                    className={`w-full p-3.5 sm:p-4 rounded-xl text-xs sm:text-sm text-left border transition-all flex items-center justify-between gap-3 ${optClass}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[11px] font-bold text-slate-700 dark:text-slate-300 flex-shrink-0">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt}</span>
                    </div>

                    {isAnswerSubmitted && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* In-depth Bengali Explanation after submitting */}
            {isAnswerSubmitted && (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm mb-6 space-y-1.5 animate-fadeIn">
                <div className="font-bold flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
                  <AlertCircle className="w-4 h-4 text-emerald-600" />
                  <span>উত্তর ও বিস্তারিত ব্যাখ্যা:</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {currentQ.explanation}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              {!isAnswerSubmitted ? (
                <button
                  onClick={handleCheckAnswer}
                  disabled={selectedAnswers[currentQuestionIndex] === undefined}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm transition shadow-sm"
                >
                  উত্তর যাচাই করুন
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition flex items-center gap-1.5 shadow-sm"
                >
                  <span>
                    {currentQuestionIndex < questions.length - 1 ? 'পরবর্তী প্রশ্ন' : 'কুইজ ফলাফল দেখুন'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Quiz Results Summary Screen */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-10 text-center max-w-lg mx-auto">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Award className="w-10 h-10" />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
            কুইজ সম্পন্ন হয়েছে!
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
            {activeSet.title}
          </p>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 mb-6">
            <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">আপনার অর্জিত স্কোর</span>
            <div className="text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {calculateScore()} / {questions.length}
            </div>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mt-2">
              সাফল্যের হার: {Math.round((calculateScore() / questions.length) * 100)}%
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 mb-6">
            {calculateScore() / questions.length >= 0.8
              ? 'চমৎকার! আপনি এই অধ্যায়ের সমস্ত মৌলিক ধারণা খুব ভালোভাবে আয়ত্ত করেছেন।'
              : 'ভালো প্রচেষ্টা! তবে পাঠটি আরও একবার রিভিশন দিয়ে পুনরায় কুইজটি দিন।'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleRestartQuiz}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>আবার কুইজ দিন</span>
            </button>
            {onBackToCourse && (
              <button
                onClick={onBackToCourse}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition"
              >
                <BookOpen className="w-4 h-4" />
                <span>কোর্সে ফিরে যান</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
