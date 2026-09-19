import React from 'react';
import { 
  TrendingUp, BookOpen, Award, ArrowRight, CheckCircle2, 
  Sparkles, Clock, ShieldAlert, Brain, PlayCircle, Flame, ShieldCheck,
  Smartphone, Download 
} from 'lucide-react';
import { Lesson, CourseLevel, TopicCategory, UserProfile } from '../types';
import { TOPIC_CATEGORIES } from '../data/lessonsData';
import { CourseCard } from './CourseCard';

interface HomeViewProps {
  lessons: Lesson[];
  userProfile: UserProfile;
  selectedLevel: CourseLevel | 'all';
  onSelectLevel: (level: CourseLevel | 'all') => void;
  onSelectLesson: (lesson: Lesson) => void;
  onSelectCategoryTab: (catId: TopicCategory) => void;
  onOpenQuizTab: () => void;
  onOpenSubscription: () => void;
  onOpenApkModal: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  lessons,
  userProfile,
  selectedLevel,
  onSelectLevel,
  onSelectLesson,
  onSelectCategoryTab,
  onOpenQuizTab,
  onOpenSubscription,
  onOpenApkModal,
}) => {
  // Find last viewed or next uncompleted lesson
  const lastLesson = lessons.find((l) => !userProfile.completedLessonIds.includes(l.id)) || lessons[0];
  const completedPercent = Math.round(
    (userProfile.completedLessonIds.length / Math.max(1, lessons.length)) * 100
  );

  // Filter lessons based on level
  const displayedLessons = selectedLevel === 'all' 
    ? lessons 
    : lessons.filter((l) => l.level === selectedLevel);

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-emerald-700 via-teal-700 to-slate-900 p-6 sm:p-10 text-white shadow-xl overflow-hidden">
        {/* Subtle decorative background curves */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 rounded-full bg-white/5 pointer-events-none blur-2xl" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-semibold backdrop-blur">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>স্বাগতম, {userProfile.name}!</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-snug">
            সহজ বাংলায় শেয়ার মার্কেট ও প্রফেশনাল ট্রেডিং শিখুন
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            কোনো ভুয়া টিপস বা শর্টকাট নয়—পুঙ্খানুপুঙ্খ টেকনিক্যাল অ্যানালাইসিস, ক্যান্ডেলস্টিক রিডিং, অপশন শিক্ষা ও কঠোর ঝুঁকি ব্যবস্থাপনার সম্পূর্ণ গাইডলাইন।
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectLesson(lastLesson)}
              className="px-5 py-2.5 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2"
            >
              <PlayCircle className="w-4 h-4 text-emerald-600" />
              <span>{userProfile.completedLessonIds.length > 0 ? 'পড়া চালিয়ে যান' : 'প্রথম অধ্যায় শুরু করুন'}</span>
            </button>

            <button
              onClick={onOpenQuizTab}
              className="px-5 py-2.5 rounded-xl bg-emerald-600/40 hover:bg-emerald-600/60 border border-emerald-400/40 text-white font-semibold text-xs sm:text-sm transition flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>বাংলা কুইজ দিন</span>
            </button>

            <button
              onClick={onOpenApkModal}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md transition flex items-center gap-2"
            >
              <Smartphone className="w-4 h-4" />
              <span>মোবাইলে APK ডাউনলোড</span>
            </button>
          </div>
        </div>

        {/* Floating progress widget on hero */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-emerald-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-bold text-amber-300">
              {completedPercent}%
            </div>
            <div>
              <span className="font-bold text-white block">আপনার কোর্স অগ্রগতি</span>
              <span>{userProfile.completedLessonIds.length} / {lessons.length}টি লেসন সম্পন্ন</span>
            </div>
          </div>

          <div className="text-[11px] text-emerald-200/80 max-w-sm">
            💡 <strong className="text-white">আজকের ট্রেডিং রুল:</strong> "উইন রেটের চেয়ে সঠিক রিস্ক-টু-রিওয়ার্ড রেশিও বেশি জরুরি। কখনোই স্টপ লস ছাড়া ট্রেড করবেন না।"
          </div>
        </div>
      </div>

      {/* Mobile APK Install Quick Action Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-blue-500/10 dark:from-emerald-950/40 dark:via-teal-950/30 dark:to-slate-900 border border-emerald-500/20 dark:border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3.5 w-full md:w-auto">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 flex-shrink-0">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                মোবাইলে SD Trading Learning অ্যাপ চান?
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold border border-emerald-300 dark:border-emerald-800">
                WebAPK / অ্যান্ড্রয়েড
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              আপনার ফোনে ১-ক্লিকে ইনস্টল করুন অথবা স্ট্যান্ডঅ্যালোন APK ফাইল তৈরির নিয়ম দেখুন।
            </p>
          </div>
        </div>

        <button
          onClick={onOpenApkModal}
          className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 flex-shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>APK ও ইনস্টলেশন গাইড দেখুন</span>
        </button>
      </div>

      {/* Main 5 Topic Categories */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              প্রধান শিক্ষণীয় বিভাগসমূহ
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              মৌলিক বুনিয়াদ থেকে উন্নত অপশন ও সাইকোলজি
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {TOPIC_CATEGORIES.map((cat) => {
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategoryTab(cat.id as TopicCategory)}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:shadow-md cursor-pointer transition flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                    {cat.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-emerald-600 font-semibold">
                  <span>অধ্যায়সমূহ</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Level Filters: All / Beginner / Intermediate / Advanced */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              কোর্সের পূর্ণাঙ্গ তালিকা
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              আপনার জ্ঞানের স্তর অনুযায়ী অধ্যায় বেছে নিন
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl text-xs font-semibold">
            <button
              onClick={() => onSelectLevel('all')}
              className={`px-3 py-1.5 rounded-xl transition ${
                selectedLevel === 'all'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              সবগুলো ({lessons.length})
            </button>
            <button
              onClick={() => onSelectLevel('beginner')}
              className={`px-3 py-1.5 rounded-xl transition ${
                selectedLevel === 'beginner'
                  ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Beginner
            </button>
            <button
              onClick={() => onSelectLevel('intermediate')}
              className={`px-3 py-1.5 rounded-xl transition ${
                selectedLevel === 'intermediate'
                  ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-300 shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Intermediate
            </button>
            <button
              onClick={() => onSelectLevel('advanced')}
              className={`px-3 py-1.5 rounded-xl transition ${
                selectedLevel === 'advanced'
                  ? 'bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Advanced Pro
            </button>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedLessons.map((lesson) => (
            <CourseCard
              key={lesson.id}
              lesson={lesson}
              isCompleted={userProfile.completedLessonIds.includes(lesson.id)}
              isPremiumUnlocked={userProfile.isPremium}
              onSelect={onSelectLesson}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
