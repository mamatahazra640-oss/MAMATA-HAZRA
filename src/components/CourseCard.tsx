import React from 'react';
import { PlayCircle, CheckCircle2, Lock, Clock, BookOpen, ArrowRight } from 'lucide-react';
import { Lesson } from '../types';

interface CourseCardProps {
  lesson: Lesson;
  isCompleted: boolean;
  isPremiumUnlocked: boolean;
  onSelect: (lesson: Lesson) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  lesson,
  isCompleted,
  isPremiumUnlocked,
  onSelect,
}) => {
  const isLocked = lesson.isPremium && !isPremiumUnlocked;

  const levelBadge = {
    beginner: { text: 'বেসিক (Beginner)', bg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300' },
    intermediate: { text: 'ইন্টারমিডিয়েট', bg: 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300' },
    advanced: { text: 'এডভান্সড (Pro)', bg: 'bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300' },
  }[lesson.level];

  return (
    <div
      onClick={() => onSelect(lesson)}
      className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/60 dark:hover:border-emerald-500/60 shadow-sm hover:shadow-md transition-all duration-200 p-4 sm:p-5 flex flex-col justify-between cursor-pointer overflow-hidden"
    >
      {/* Top badges */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full ${levelBadge.bg}`}>
            {levelBadge.text}
          </span>

          <div className="flex items-center gap-1.5">
            {isCompleted && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>সম্পন্ন</span>
              </span>
            )}

            {isLocked ? (
              <span className="flex items-center gap-1 text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800/60">
                <Lock className="w-3 h-3" />
                <span>প্রিমিয়াম</span>
              </span>
            ) : (
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                ফ্রি
              </span>
            )}
          </div>
        </div>

        {/* Title & English Subtitle */}
        <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 mb-1">
          {lesson.title}
        </h3>
        <p className="text-[11px] text-slate-400 dark:text-slate-500 font-mono mb-2">
          {lesson.englishTitle}
        </p>

        {/* Brief summary */}
        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {lesson.summary}
        </p>
      </div>

      {/* Card Footer */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[11px]">{lesson.duration}</span>
        </div>

        <div className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 text-xs group-hover:translate-x-1 transition-transform">
          <span>{isLocked ? 'আনলক করুন' : 'শিখুন'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
