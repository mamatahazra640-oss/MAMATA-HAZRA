import React, { useState } from 'react';
import { 
  BookOpen, Filter, CheckCircle2, Lock, Sparkles, 
  Search, SlidersHorizontal, ArrowUpDown 
} from 'lucide-react';
import { Lesson, TopicCategory, CourseLevel, UserProfile } from '../types';
import { TOPIC_CATEGORIES } from '../data/lessonsData';
import { CourseCard } from './CourseCard';

interface CoursesViewProps {
  lessons: Lesson[];
  userProfile: UserProfile;
  activeCategory: TopicCategory | 'all';
  onChangeCategory: (cat: TopicCategory | 'all') => void;
  onSelectLesson: (lesson: Lesson) => void;
  onOpenSubscription: () => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({
  lessons,
  userProfile,
  activeCategory,
  onChangeCategory,
  onSelectLesson,
  onOpenSubscription,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'free' | 'premium' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter lessons
  const filteredLessons = lessons.filter((lesson) => {
    // Category match
    if (activeCategory !== 'all' && lesson.category !== activeCategory) {
      return false;
    }

    // Type match
    if (filterType === 'free' && lesson.isPremium) return false;
    if (filterType === 'premium' && !lesson.isPremium) return false;
    if (filterType === 'completed' && !userProfile.completedLessonIds.includes(lesson.id)) return false;

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        lesson.title.toLowerCase().includes(q) ||
        lesson.englishTitle.toLowerCase().includes(q) ||
        lesson.summary.toLowerCase().includes(q)
      );
    }

    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            সকল কোর্স ও অধ্যায়
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            ধারাবাহিকভাবে সাজানো সম্পূর্ণ বাংলা পাঠ্যক্রম
          </p>
        </div>

        {/* Quick Filter buttons */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl text-xs font-semibold">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-xl transition ${
              filterType === 'all'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            সকল ({lessons.length})
          </button>
          <button
            onClick={() => setFilterType('free')}
            className={`px-3 py-1.5 rounded-xl transition ${
              filterType === 'free'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-bold'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            ফ্রি
          </button>
          <button
            onClick={() => setFilterType('premium')}
            className={`px-3 py-1.5 rounded-xl transition ${
              filterType === 'premium'
                ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-300 shadow-sm font-bold'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            প্রিমিয়াম
          </button>
          <button
            onClick={() => setFilterType('completed')}
            className={`px-3 py-1.5 rounded-xl transition ${
              filterType === 'completed'
                ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm font-bold'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            সম্পন্ন ({userProfile.completedLessonIds.length})
          </button>
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={() => onChangeCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition border ${
            activeCategory === 'all'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
          }`}
        >
          সব ক্যাটাগরি
        </button>

        {TOPIC_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onChangeCategory(cat.id as TopicCategory)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition border ${
                isActive
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              {cat.title}
            </button>
          );
        })}
      </div>

      {/* Course Cards Grid */}
      {filteredLessons.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-400 text-xs">
          কোনো পাঠ পাওয়া যায়নি। ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLessons.map((lesson) => (
            <CourseCard
              key={lesson.id}
              lesson={lesson}
              isCompleted={userProfile.completedLessonIds.includes(lesson.id)}
              isPremiumUnlocked={userProfile.isPremium}
              onSelect={onSelectLesson}
            />
          ))}
        </div>
      )}
    </div>
  );
};
