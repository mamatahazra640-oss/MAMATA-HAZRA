import React, { useState } from 'react';
import { 
  User, Award, CheckCircle2, Crown, Sparkles, BookOpen, 
  HelpCircle, Calendar, Edit3, ShieldCheck, Mail, Phone, ChevronRight,
  Smartphone, Download, LogOut, KeyRound 
} from 'lucide-react';
import { UserProfile, Lesson } from '../types';

interface StudentProfileViewProps {
  userProfile: UserProfile;
  username?: string;
  lessons: Lesson[];
  onUpdateProfileName: (newName: string) => void;
  onOpenCertificate: () => void;
  onOpenSubscription: () => void;
  onOpenApkModal?: () => void;
  onSelectLesson: (lesson: Lesson) => void;
  onLogout?: () => void;
}

export const StudentProfileView: React.FC<StudentProfileViewProps> = ({
  userProfile,
  username,
  lessons,
  onUpdateProfileName,
  onOpenCertificate,
  onOpenSubscription,
  onOpenApkModal,
  onSelectLesson,
  onLogout,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(userProfile.name);

  const completedLessons = lessons.filter((l) =>
    userProfile.completedLessonIds.includes(l.id)
  );

  const completionPercent = Math.round(
    (userProfile.completedLessonIds.length / Math.max(1, lessons.length)) * 100
  );

  // Average quiz score
  const totalQuizScore = userProfile.quizResults.reduce((acc, curr) => acc + (curr.score / curr.total) * 100, 0);
  const averageScore = userProfile.quizResults.length > 0 
    ? Math.round(totalQuizScore / userProfile.quizResults.length) 
    : 0;

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      onUpdateProfileName(nameInput.trim());
      setIsEditing(false);
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-3xl mx-auto">
      {/* Profile Card Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          {/* Avatar */}
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-1 shadow-lg">
              <div className="w-full h-full rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <User className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>
            </div>
            {userProfile.isPremium && (
              <span className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-amber-500 text-white shadow-md" title="প্রিমিয়াম মেম্বার">
                <Crown className="w-4 h-4" />
              </span>
            )}
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <form onSubmit={handleSaveName} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                >
                  সেভ
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300"
                >
                  বাতিল
                </button>
              </form>
            ) : (
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {userProfile.name}
                </h2>
                {username && (
                  <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-lg border border-emerald-300 dark:border-emerald-800">
                    @{username}
                  </span>
                )}
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  title="নাম পরিবর্তন করুন"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-500 dark:text-slate-400 mb-3">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                {userProfile.email}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                যোগদান: {userProfile.joinedDate}
              </span>
            </div>

            {/* Subscription badge / upgrade prompt */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              {userProfile.isPremium ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-bold border border-amber-300 dark:border-amber-800">
                  <Crown className="w-3.5 h-3.5 text-amber-500" />
                  <span>সক্রিয় ভিআইপি প্রিমিয়াম সদস্য</span>
                </span>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold">
                    ফ্রি লার্নার প্ল্যান
                  </span>
                  <button
                    onClick={onOpenSubscription}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold shadow-sm hover:from-emerald-700 hover:to-teal-700 transition"
                  >
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>আপগ্রেড করুন</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">মোট লেসন সম্পন্ন</span>
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              {userProfile.completedLessonIds.length} <span className="text-xs text-slate-400 font-normal">/ {lessons.length}</span>
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">কোর্স অগ্রগতি</span>
            <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
              {completionPercent}%
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">কুইজ পরীক্ষা সম্পন্ন</span>
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              {userProfile.quizResults.length} টি
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">গড় কুইজ স্কোর</span>
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {averageScore}%
            </span>
          </div>
        </div>
      </div>

      {/* Certificate Progress Card */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-slate-900 rounded-3xl border border-amber-200 dark:border-amber-800/50 p-6 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/20 flex-shrink-0">
            <Award className="w-9 h-9" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-amber-950 dark:text-amber-100 mb-1">
              SD Trading কোর্স সমাপ্তি সনদ (Certificate)
            </h3>
            <p className="text-xs text-amber-800 dark:text-amber-300 max-w-md">
              {completionPercent >= 50
                ? 'অভিনন্দন! আপনার প্রয়োজনীয় অগ্রগতি সফল হয়েছে। এখনই আপনার অফিসিয়াল সনদ দেখুন বা প্রিন্ট করুন।'
                : 'সকল অধ্যায় সম্পন্ন করুন এবং কুইজে অংশ নিন। অন্তত ৫০% অগ্রগতি হলে আপনার সার্টিফিকেট আনলক হবে।'}
            </p>
          </div>
        </div>

        <button
          onClick={onOpenCertificate}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold shadow-md transition flex items-center justify-center gap-2 flex-shrink-0"
        >
          <Award className="w-4 h-4" />
          <span>সার্টিফিকেট দেখুন / প্রিন্ট করুন</span>
        </button>
      </div>

      {/* Mobile App & APK Download Option Card */}
      {onOpenApkModal && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                মোবাইলে SD Trading অ্যাপ / APK ইনস্টল
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                অ্যান্ড্রয়েড ফোনে সরাসরি WebAPK ইনস্টল করুন অথবা স্ট্যান্ডঅ্যালোন APK ফাইল তৈরির গাইড দেখুন।
              </p>
            </div>
          </div>
          <button
            onClick={onOpenApkModal}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition flex items-center justify-center gap-2 flex-shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>ইনস্টল গাইড দেখুন</span>
          </button>
        </div>
      )}

      {/* Completed Lessons List */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>সম্পন্ন করা অধ্যায়সমূহ ({completedLessons.length})</span>
        </h3>

        {completedLessons.length === 0 ? (
          <div className="text-center py-6 text-slate-400 text-xs">
            এখনও কোনো অধ্যায় সম্পন্ন করেননি। কোর্স তালিকা থেকে ক্লাস শুরু করুন!
          </div>
        ) : (
          <div className="space-y-2">
            {completedLessons.map((l) => (
              <div
                key={l.id}
                onClick={() => onSelectLesson(l)}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between gap-3 cursor-pointer transition text-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                    {l.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 flex-shrink-0">
                  <span>{l.duration}</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Account Switch / Logout Section */}
      {onLogout && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-rose-200 dark:border-rose-950/60 p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center flex-shrink-0">
              <LogOut className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                অ্যাকাউন্ট থেকে লগআউট করুন
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                অন্য কোনো কাস্টমার বা শিক্ষার্থী হিসেবে লগইন করার জন্য এখান থেকে লগআউট করুন।
              </p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-900/20 transition flex items-center justify-center gap-2 flex-shrink-0"
          >
            <LogOut className="w-4 h-4" />
            <span>লগআউট করুন</span>
          </button>
        </div>
      )}
    </div>
  );
};
