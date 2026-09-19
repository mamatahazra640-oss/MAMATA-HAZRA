import React, { useState } from 'react';
import { 
  X, CheckCircle2, PlayCircle, ArrowRight, ArrowLeft, 
  HelpCircle, BookOpen, Clock, Lock, Sparkles, AlertTriangle 
} from 'lucide-react';
import { Lesson } from '../types';
import { InteractiveVisualizer } from './InteractiveVisualizer';
import confetti from 'canvas-confetti';

interface LessonDetailModalProps {
  lesson: Lesson;
  isCompleted: boolean;
  isPremiumUnlocked: boolean;
  allLessons: Lesson[];
  onClose: () => void;
  onToggleComplete: (lessonId: string) => void;
  onSelectLesson: (lesson: Lesson) => void;
  onOpenQuiz: (quizId: string) => void;
  onOpenSubscription: () => void;
}

export const LessonDetailModal: React.FC<LessonDetailModalProps> = ({
  lesson,
  isCompleted,
  isPremiumUnlocked,
  allLessons,
  onClose,
  onToggleComplete,
  onSelectLesson,
  onOpenQuiz,
  onOpenSubscription
}) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Find index and next/prev lessons
  const currentIndex = allLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const isLocked = lesson.isPremium && !isPremiumUnlocked;

  const handleMarkComplete = () => {
    if (!isCompleted) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    }
    onToggleComplete(lesson.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-4 max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              {lesson.level === 'beginner' ? 'বেসিক' : lesson.level === 'intermediate' ? 'ইন্টারমিডিয়েট' : 'এডভান্সড'}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {lesson.duration}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleMarkComplete}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                isCompleted
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-emerald-500 hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted ? 'সম্পূর্ণ হয়েছে ✓' : 'সম্পূর্ণ চিহ্নিত করুন'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-6">
          {/* Header Title */}
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-1 leading-snug">
              {lesson.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-mono">
              {lesson.englishTitle}
            </p>
          </div>

          {/* Locked Overlay if Premium and not subscribed */}
          {isLocked ? (
            <div className="p-8 text-center rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 my-4">
              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-amber-100 dark:bg-amber-900/60 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Lock className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                এটি একটি প্রিমিয়াম এক্সক্লুসিভ লেসন
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-5">
                এডভান্সড টেকনিক্যাল অ্যানালাইসিস, অপশন ট্রেডিং স্ট্র্যাটেজি এবং লাইভ চার্ট অ্যানালাইসিস আনলক করতে এসডি ট্রেডিং প্রিমিয়াম সাবস্ক্রিপশন গ্রহণ করুন।
              </p>
              <button
                onClick={onOpenSubscription}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-sm shadow-md hover:from-amber-600 hover:to-amber-700 transition flex items-center gap-2 mx-auto"
              >
                <Sparkles className="w-4 h-4" />
                <span>প্রিমিয়াম প্ল্যান দেখুন (আনলক করুন)</span>
              </button>
            </div>
          ) : (
            <>
              {/* Video Player Section */}
              <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-md">
                <div className="relative aspect-video w-full bg-slate-900 flex items-center justify-center">
                  {isVideoPlaying ? (
                    <iframe
                      src={`${lesson.videoUrl}?autoplay=1`}
                      title={lesson.videoTitle}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="text-center p-6 relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                      <button
                        onClick={() => setIsVideoPlaying(true)}
                        className="w-16 h-16 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 mb-3 group"
                        title="ভিডিও প্লে করুন"
                      >
                        <PlayCircle className="w-10 h-10 transition group-hover:scale-110" />
                      </button>
                      <span className="text-xs sm:text-sm font-semibold text-white">
                        ভিডিও ক্লাস দেখতে ক্লিক করুন ({lesson.duration})
                      </span>
                      <span className="text-[11px] text-slate-400 mt-1 max-w-sm">
                        {lesson.videoTitle}
                      </span>
                    </div>
                  )}
                </div>

                {/* Video Info banner */}
                <div className="p-3.5 bg-slate-900/90 border-t border-slate-800 flex items-start gap-2.5">
                  <PlayCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">{lesson.videoTitle}</h4>
                    <p className="text-[11px] text-slate-400">{lesson.videoDescription}</p>
                  </div>
                </div>
              </div>

              {/* Lesson Summary Callout */}
              <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border-l-4 border-emerald-500 text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
                  অধ্যায় সারসংক্ষেপ:
                </span>
                {lesson.summary}
              </div>

              {/* Detailed Content Sections */}
              <div className="space-y-6">
                {lesson.content.map((sec, idx) => (
                  <div key={idx} className="space-y-3">
                    <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-1.5">
                      {sec.sectionTitle}
                    </h3>

                    {sec.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {p}
                      </p>
                    ))}

                    {/* Bullet points if any */}
                    {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                      <ul className="space-y-1.5 pl-2 my-2">
                        {sec.bulletPoints.map((bp, bIdx) => (
                          <li key={bIdx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                            <span>{bp}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Interactive diagram or calculator */}
                    {sec.diagramType && (
                      <InteractiveVisualizer type={sec.diagramType} />
                    )}

                    {/* Formula / Rule Box */}
                    {sec.formulaOrRule && (
                      <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
                        <span className="font-sans font-bold text-emerald-600 block mb-1">গাণিতিক সূত্র বা নিয়ম:</span>
                        {sec.formulaOrRule}
                      </div>
                    )}

                    {/* Warning / Pro Tip Box */}
                    {sec.tipsOrWarning && (
                      <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>{sec.tipsOrWarning}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Key Takeaways */}
              {lesson.keyTakeaways && lesson.keyTakeaways.length > 0 && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                    <span>এই পাঠের মূল শিক্ষণীয় বিষয় (Key Takeaways):</span>
                  </h4>
                  <ul className="space-y-1">
                    {lesson.keyTakeaways.map((takeaway, tIdx) => (
                      <li key={tIdx} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Quiz Button */}
              {lesson.quizId && (
                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-blue-900 dark:text-blue-200">
                      এই অধ্যায়ের ওপর কুইজ দিন!
                    </h5>
                    <p className="text-[11px] text-blue-700 dark:text-blue-300">
                      আপনার অর্জিত জ্ঞান পরীক্ষা করুন এবং কুইজ সম্পন্ন করে স্কোর অর্জন করুন।
                    </p>
                  </div>
                  <button
                    onClick={() => onOpenQuiz(lesson.quizId!)}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>কুইজ শুরু করুন</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Bottom Navigation */}
        <div className="px-4 sm:px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-between gap-2">
          {prevLesson ? (
            <button
              onClick={() => onSelectLesson(prevLesson)}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-750 transition flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">পূর্ববর্তী লেসন</span>
            </button>
          ) : (
            <div />
          )}

          {nextLesson ? (
            <button
              onClick={() => onSelectLesson(nextLesson)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition flex items-center gap-1.5 shadow-sm"
            >
              <span>পরবর্তী লেসন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition"
            >
              সমাপ্ত করুন
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
