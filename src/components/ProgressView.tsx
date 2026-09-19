import React from 'react';
import { 
  BarChart3, CheckCircle2, Award, Clock, ArrowRight, 
  Flame, TrendingUp, BookOpen, ShieldAlert, Brain, Layers 
} from 'lucide-react';
import { Lesson, TopicCategory, UserProfile } from '../types';
import { TOPIC_CATEGORIES } from '../data/lessonsData';

interface ProgressViewProps {
  userProfile: UserProfile;
  lessons: Lesson[];
  onSelectLesson: (lesson: Lesson) => void;
  onOpenCertificate: () => void;
  onOpenQuizTab: () => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  userProfile,
  lessons,
  onSelectLesson,
  onOpenCertificate,
  onOpenQuizTab,
}) => {
  const totalLessons = lessons.length;
  const completedCount = userProfile.completedLessonIds.length;
  const overallPercentage = Math.round((completedCount / Math.max(1, totalLessons)) * 100);

  // Category progress calculation
  const getCategoryStats = (catId: TopicCategory) => {
    const catLessons = lessons.filter((l) => l.category === catId);
    const catCompleted = catLessons.filter((l) => userProfile.completedLessonIds.includes(l.id));
    const percent = Math.round((catCompleted.length / Math.max(1, catLessons.length)) * 100);
    return {
      total: catLessons.length,
      completed: catCompleted.length,
      percent,
    };
  };

  // Find next uncompleted lesson to recommend
  const nextLesson = lessons.find((l) => !userProfile.completedLessonIds.includes(l.id)) || lessons[0];

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Overall Progress Hero Banner */}
      <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-xs font-semibold">
              <Flame className="w-4 h-4 text-amber-300" />
              <span>আপনার সামগ্রিক শেখার অগ্রগতি</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {overallPercentage}% সম্পূর্ণ হয়েছে
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-md">
              মোট {totalLessons}টি লেসনের মধ্যে {completedCount}টি অধ্যায় সফলভাবে সম্পন্ন হয়েছে।
            </p>
          </div>

          {/* Circular Visual Indicator */}
          <div className="relative w-28 h-28 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-white/20"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-amber-400 transition-all duration-700 ease-out"
                strokeDasharray={`${overallPercentage}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-xl font-black">{overallPercentage}%</span>
              <span className="text-[9px] text-emerald-100">প্রগ্রেস</span>
            </div>
          </div>
        </div>

        {/* Action Button inside Hero */}
        {nextLesson && (
          <div className="mt-6 pt-5 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-emerald-100 text-center sm:text-left">
              <span className="font-bold text-white block">পরবর্তী প্রস্তাবিত পাঠ:</span>
              <span>{nextLesson.title} ({nextLesson.duration})</span>
            </div>
            <button
              onClick={() => onSelectLesson(nextLesson)}
              className="px-5 py-2 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 text-xs font-bold transition flex items-center gap-1.5 shadow"
            >
              <span>পড়া চালিয়ে যান</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Breakdown By Modules Grid */}
      <div className="space-y-3">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-emerald-600" />
          <span>বিভাগভিত্তিক শিক্ষণ অগ্রগতি (Module Breakdown)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TOPIC_CATEGORIES.map((cat) => {
            const stats = getCategoryStats(cat.id as TopicCategory);
            return (
              <div
                key={cat.id}
                className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                      {cat.title}
                    </h4>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      {cat.subtitle}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-lg">
                    {stats.completed} / {stats.total} সম্পন্ন
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${stats.percent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                  <span>সাফল্য: {stats.percent}%</span>
                  {stats.percent === 100 && (
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      সম্পূর্ণ!
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Certificate Progress card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center flex-shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              ডিজিটাল সার্টিফিকেট স্ট্যাটাস
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {overallPercentage >= 50
                ? 'আপনার সার্টিফিকেট প্রস্তুত! এখনই দেখুন ও ভেরিফাই করুন।'
                : `সার্টিফিকেট আনলক করতে আরও ${Math.max(0, 50 - overallPercentage)}% অগ্রগতি প্রয়োজন।`}
            </p>
          </div>
        </div>

        <button
          onClick={onOpenCertificate}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
        >
          <Award className="w-4 h-4" />
          <span>সার্টিফিকেট প্রিভিউ</span>
        </button>
      </div>
    </div>
  );
};
