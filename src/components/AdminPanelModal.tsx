import React, { useState } from 'react';
import { 
  X, Plus, Edit2, Trash2, Users, BookOpen, ShieldCheck, 
  Video, CheckCircle2, DollarSign, Lock, Unlock, HelpCircle 
} from 'lucide-react';
import { Lesson, TopicCategory, CourseLevel, QuizQuestion } from '../types';

interface AdminPanelModalProps {
  lessons: Lesson[];
  onClose: () => void;
  onAddLesson: (newLesson: Lesson) => void;
  onUpdateLesson: (updatedLesson: Lesson) => void;
  onDeleteLesson: (lessonId: string) => void;
  onToggleLessonPremium: (lessonId: string) => void;
  onAddQuizQuestion: (question: QuizQuestion) => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  lessons,
  onClose,
  onAddLesson,
  onUpdateLesson,
  onDeleteLesson,
  onToggleLessonPremium,
  onAddQuizQuestion,
}) => {
  const [activeTab, setActiveTab] = useState<'lessons' | 'new_lesson' | 'new_quiz' | 'users'>('lessons');

  // Form states for new lesson
  const [title, setTitle] = useState('');
  const [englishTitle, setEnglishTitle] = useState('');
  const [category, setCategory] = useState<TopicCategory>('basics');
  const [level, setLevel] = useState<CourseLevel>('beginner');
  const [duration, setDuration] = useState('১৫ মিনিট');
  const [isPremium, setIsPremium] = useState(false);
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/embed/p7HKvqRI_Bo');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [summary, setSummary] = useState('');
  const [contentBody, setContentBody] = useState('');

  // Form states for new quiz
  const [quizCategory, setQuizCategory] = useState<TopicCategory>('basics');
  const [quizQuestion, setQuizQuestion] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctIndex, setCorrectIndex] = useState(0);
  const [quizExplanation, setQuizExplanation] = useState('');
  const [quizSuccess, setQuizSuccess] = useState(false);

  // Mock student stats
  const mockStudents = [
    { name: 'রাহুল সেন', email: 'rahul.sen@example.com', plan: 'বাৎসরিক ভিআইপি', progress: '৮৫%', status: 'Active' },
    { name: 'অনন্যা দাস', email: 'ananya.das@example.com', plan: 'মাসিক প্রো', progress: '৫০%', status: 'Active' },
    { name: 'তানভীর আহমেদ', email: 'tanvir.ahmed@example.com', plan: 'ফ্রি লার্নার', progress: '৩০%', status: 'Free' },
    { name: 'শুভ্র চৌধুরী', email: 'shubhro.c@example.com', plan: 'লাইফটাইম', progress: '১০০%', status: 'Active' },
  ];

  const handleCreateLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) return;

    const newLesson: Lesson = {
      id: `custom-${Date.now()}`,
      title,
      englishTitle: englishTitle || title,
      category,
      level,
      duration: duration || '১৫ মিনিট',
      isPremium,
      videoUrl: videoUrl || 'https://www.youtube.com/embed/p7HKvqRI_Bo',
      videoTitle: videoTitle || title,
      videoDescription: videoDescription || summary,
      summary,
      content: [
        {
          sectionTitle: 'অধ্যায় আলোচনা',
          paragraphs: contentBody ? contentBody.split('\n\n') : [summary],
        }
      ],
      keyTakeaways: ['নিয়মিত প্র্যাকটিস ও ডিসিপ্লিন বজায় রাখুন।', 'ঝুঁকি ব্যবস্থাপনা মেনে চলুন।']
    };

    onAddLesson(newLesson);
    setTitle('');
    setEnglishTitle('');
    setSummary('');
    setContentBody('');
    setActiveTab('lessons');
  };

  const handleCreateQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quizQuestion || !optA || !optB || !optC || !optD) return;

    const newQ: QuizQuestion = {
      id: `q-${Date.now()}`,
      category: quizCategory,
      categoryTitle: quizCategory === 'basics' ? 'ট্রেডিং বেসিকস' : quizCategory === 'technical' ? 'টেকনিক্যাল' : 'অপশন ট্রেডিং',
      question: quizQuestion,
      options: [optA, optB, optC, optD],
      correctIndex,
      explanation: quizExplanation || 'সঠিক উত্তর নির্বাচন করা হয়েছে।'
    };

    onAddQuizQuestion(newQ);
    setQuizQuestion('');
    setOptA('');
    setOptB('');
    setOptC('');
    setOptD('');
    setQuizExplanation('');
    setQuizSuccess(true);
    setTimeout(() => setQuizSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-4 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">
                SD Trading অ্যাডমিন প্যানেল
              </h2>
              <p className="text-[11px] text-slate-400">
                কোর্স, লেসন, ভিডিও, কুইজ এবং সাবস্ক্রিপশন নিয়ন্ত্রণ
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 px-4 gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('lessons')}
            className={`py-3 px-3 border-b-2 text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'lessons'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>সকল কোর্স ও লেসন ({lessons.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('new_lesson')}
            className={`py-3 px-3 border-b-2 text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'new_lesson'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>নতুন লেসন যোগ করুন</span>
          </button>

          <button
            onClick={() => setActiveTab('new_quiz')}
            className={`py-3 px-3 border-b-2 text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'new_quiz'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>কুইজ যুক্ত করুন</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`py-3 px-3 border-b-2 text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'users'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>শিক্ষার্থী ও সাবস্ক্রিপশন</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {/* TAB 1: Lessons List */}
          {activeTab === 'lessons' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-500">
                  মোট পাঠ্যক্রম: {lessons.length}টি অধ্যায়
                </span>
                <button
                  onClick={() => setActiveTab('new_lesson')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  নতুন লেসন
                </button>
              </div>

              <div className="space-y-2">
                {lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-bold text-slate-900 dark:text-white truncate">
                          {lesson.title}
                        </span>
                        {lesson.isPremium ? (
                          <span className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[10px] font-bold">
                            প্রিমিয়াম
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                            ফ্রি
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        ক্যাটাগরি: {lesson.category} • সময়: {lesson.duration}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => onToggleLessonPremium(lesson.id)}
                        className={`p-1.5 rounded-lg border text-xs transition ${
                          lesson.isPremium
                            ? 'border-amber-400 text-amber-600 hover:bg-amber-50'
                            : 'border-emerald-400 text-emerald-600 hover:bg-emerald-50'
                        }`}
                        title={lesson.isPremium ? 'ফ্রি করুন' : 'প্রিমিয়াম করুন'}
                      >
                        {lesson.isPremium ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() => onDeleteLesson(lesson.id)}
                        className="p-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 dark:border-rose-800 dark:hover:bg-rose-950 transition"
                        title="ডিলিট করুন"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Add New Lesson */}
          {activeTab === 'new_lesson' && (
            <form onSubmit={handleCreateLesson} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    লেসন শিরোনাম (বাংলা)*
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: RSI ডাইভারজেন্স কীভাবে ধরতে হয়"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    English Title
                  </label>
                  <input
                    type="text"
                    placeholder="How to Spot RSI Divergence"
                    value={englishTitle}
                    onChange={(e) => setEnglishTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    ক্যাটাগরি
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as TopicCategory)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="basics">ট্রেডিং বেসিকস</option>
                    <option value="technical">টেকনিক্যাল অ্যানালাইসিস</option>
                    <option value="options">অপশন ট্রেডিং</option>
                    <option value="psychology">ট্রেডিং সাইকোলজি</option>
                    <option value="risk_management">রিস্ক ম্যানেজমেন্ট</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    লেভেল
                  </label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value as CourseLevel)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="beginner">Beginner (প্রাথমিক)</option>
                    <option value="intermediate">Intermediate (মধ্যবর্তী)</option>
                    <option value="advanced">Advanced (উন্নত)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    ক্লাসের ধরন
                  </label>
                  <select
                    value={isPremium ? 'premium' : 'free'}
                    onChange={(e) => setIsPremium(e.target.value === 'premium')}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="free">ফ্রি (Free)</option>
                    <option value="premium">প্রিমিয়াম (Paid Only)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  ইউটিউব / ভিডিও লিংক (Embed URL)
                </label>
                <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/embed/..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  লেসনের সংক্ষিপ্ত সারসংক্ষেপ*
                </label>
                <textarea
                  required
                  rows={2}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="পাঠটির মূল উদ্দেশ্য ও শিক্ষণীয় সারসংক্ষেপ লিখুন..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  বিস্তারিত লেকচার কন্টেন্ট
                </label>
                <textarea
                  rows={4}
                  value={contentBody}
                  onChange={(e) => setContentBody(e.target.value)}
                  placeholder="বিস্তারিত বাংলায় প্যারাগ্রাফ লিখুন..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow transition"
              >
                লেসনটি প্রকাশ ও সংরক্ষণ করুন
              </button>
            </form>
          )}

          {/* TAB 3: Add Quiz Question */}
          {activeTab === 'new_quiz' && (
            <form onSubmit={handleCreateQuiz} className="space-y-4 text-xs sm:text-sm">
              {quizSuccess && (
                <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>নতুন কুইজ সফলভাবে যোগ হয়েছে!</span>
                </div>
              )}

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  কুইজ ক্যাটাগরি
                </label>
                <select
                  value={quizCategory}
                  onChange={(e) => setQuizCategory(e.target.value as TopicCategory)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                >
                  <option value="basics">ট্রেডিং বেসিকস</option>
                  <option value="technical">টেকনিক্যাল অ্যানালাইসিস</option>
                  <option value="options">অপশন ট্রেডিং</option>
                  <option value="psychology">ট্রেডিং সাইকোলজি</option>
                  <option value="risk_management">রিস্ক ম্যানেজমেন্ট</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  প্রশ্ন (বাংলায়)*
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: অপশন ট্রেডিংয়ে Theta Decay কী করে?"
                  value={quizQuestion}
                  onChange={(e) => setQuizQuestion(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-bold text-slate-700 dark:text-slate-300">
                  ৪টি অপশন প্রদান করুন:
                </label>
                <input
                  type="text"
                  required
                  placeholder="অপশন A"
                  value={optA}
                  onChange={(e) => setOptA(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
                <input
                  type="text"
                  required
                  placeholder="অপশন B"
                  value={optB}
                  onChange={(e) => setOptB(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
                <input
                  type="text"
                  required
                  placeholder="অপশন C"
                  value={optC}
                  onChange={(e) => setOptC(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
                <input
                  type="text"
                  required
                  placeholder="অপশন D"
                  value={optD}
                  onChange={(e) => setOptD(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    সঠিক উত্তর নির্বাচন করুন
                  </label>
                  <select
                    value={correctIndex}
                    onChange={(e) => setCorrectIndex(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  >
                    <option value={0}>অপশন A সঠিক</option>
                    <option value={1}>অপশন B সঠিক</option>
                    <option value={2}>অপশন C সঠিক</option>
                    <option value={3}>অপশন D সঠিক</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    উত্তরের ব্যাখ্যা (বাংলায়)
                  </label>
                  <input
                    type="text"
                    placeholder="কেন এটি সঠিক ব্যাখ্যা করুন..."
                    value={quizExplanation}
                    onChange={(e) => setQuizExplanation(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow transition"
              >
                কুইজ সেটে যোগ করুন
              </button>
            </form>
          )}

          {/* TAB 4: Users and Subscriptions */}
          {activeTab === 'users' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                  <span className="text-[10px] text-slate-500 block">মোট নিবন্ধিত ছাত্র</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white">১,২৮০ জন</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                  <span className="text-[10px] text-slate-500 block">সক্রিয় প্রিমিয়াম</span>
                  <span className="text-lg font-bold text-emerald-600">৩৪০ জন</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                  <span className="text-[10px] text-slate-500 block">সার্টিফিকেট ইস্যু</span>
                  <span className="text-lg font-bold text-amber-500">১৮২ টি</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                  <span className="text-[10px] text-slate-500 block">মাসিক রেভিনিউ</span>
                  <span className="text-lg font-bold text-blue-600">₹১,৭০,০০০</span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    <tr>
                      <th className="p-3">শিক্ষার্থী</th>
                      <th className="p-3">প্ল্যান</th>
                      <th className="p-3">অগ্রগতি</th>
                      <th className="p-3">স্ট্যাটাস</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {mockStudents.map((st, i) => (
                      <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-850">
                        <td className="p-3">
                          <div className="font-bold text-slate-900 dark:text-white">{st.name}</div>
                          <div className="text-[11px] text-slate-500">{st.email}</div>
                        </td>
                        <td className="p-3 text-slate-700 dark:text-slate-300">{st.plan}</td>
                        <td className="p-3 text-emerald-600 font-bold">{st.progress}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            st.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {st.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
