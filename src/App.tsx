import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { BottomNav, TabType } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import { CoursesView } from './components/CoursesView';
import { QuizView } from './components/QuizView';
import { ProgressView } from './components/ProgressView';
import { StudentProfileView } from './components/StudentProfileView';
import { LessonDetailModal } from './components/LessonDetailModal';
import { SearchModal } from './components/SearchModal';
import { SubscriptionModal } from './components/SubscriptionModal';
import { CertificateModal } from './components/CertificateModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { ApkDownloadModal } from './components/ApkDownloadModal';
import { AuthScreen } from './components/AuthScreen';
import { INITIAL_LESSONS } from './data/lessonsData';
import { QUIZ_SETS } from './data/quizData';
import { Lesson, QuizSet, QuizQuestion, UserProfile, CourseLevel, TopicCategory, AuthUser } from './types';
import { ShieldCheck, TrendingUp, Smartphone, Award, BookOpen } from 'lucide-react';

const STORAGE_KEYS = {
  PROFILE: 'sd_trading_profile_v1',
  LESSONS: 'sd_trading_lessons_v1',
  THEME: 'sd_trading_theme_v1',
  QUIZZES: 'sd_trading_quizzes_v1',
  AUTH_USERS: 'sd_trading_auth_users_v2',
  ACTIVE_USER_ID: 'sd_trading_active_user_id_v2',
};

const DEFAULT_PROFILE: UserProfile = {
  name: 'শিক্ষার্থী রাহুল',
  email: 'learner@sdtrading.com',
  phone: '+৯১ ৯৮৭৬৫ ৪৩২১০',
  avatarUrl: '',
  isPremium: false,
  completedLessonIds: ['basics-1'],
  bookmarkedLessonIds: [],
  quizResults: [
    { quizId: 'quiz-basics', score: 4, total: 5, date: '2026-09-15' }
  ],
  joinedDate: '১৫ সেপ্টেম্বর, ২০২৬',
};

const INITIAL_AUTH_USERS: AuthUser[] = [
  {
    id: 'user-demo-1',
    username: 'demo',
    passwordHash: '123456',
    name: 'শিক্ষার্থী রাহুল',
    email: 'learner@sdtrading.com',
    phone: '+৯১ ৯৮৭৬৫ ৪৩২১০',
    role: 'student',
    createdAt: '2026-09-15T00:00:00.000Z',
    profile: DEFAULT_PROFILE,
  },
  {
    id: 'user-admin-1',
    username: 'admin',
    passwordHash: 'admin123',
    name: 'এসডি ট্রেডিং অ্যাডমিন',
    email: 'admin@sdtrading.com',
    phone: '+৯১ ৯৮৭৬৫ ৪৩২১০',
    role: 'admin',
    createdAt: '2026-09-10T00:00:00.000Z',
    profile: {
      ...DEFAULT_PROFILE,
      name: 'এসডি ট্রেডিং অ্যাডমিন',
      email: 'admin@sdtrading.com',
      isPremium: true,
      subscriptionPlan: 'lifetime',
    },
  },
];

export default function App() {
  // Dark mode state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    return saved ? saved === 'dark' : false;
  });

  // Mobile frame simulator mode
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(false);

  // Registered Auth Users list
  const [authUsers, setAuthUsers] = useState<AuthUser[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AUTH_USERS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_AUTH_USERS;
  });

  // Currently authenticated user (null by default so new customer/visitor is asked for username and password!)
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      const activeId = localStorage.getItem(STORAGE_KEYS.ACTIVE_USER_ID);
      if (!activeId) return null; // Force login screen first for new users
      const saved = localStorage.getItem(STORAGE_KEYS.AUTH_USERS);
      const list: AuthUser[] = saved ? JSON.parse(saved) : INITIAL_AUTH_USERS;
      return list.find((u) => u.id === activeId || u.username.toLowerCase() === activeId.toLowerCase()) || null;
    } catch (e) {
      console.error(e);
      return null;
    }
  });

  // Core state
  const [lessons, setLessons] = useState<Lesson[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LESSONS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_LESSONS;
  });

  const [quizSets, setQuizSets] = useState<QuizSet[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUIZZES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return QUIZ_SETS;
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    if (currentUser?.profile) {
      return currentUser.profile;
    }
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_PROFILE;
  });

  // Navigation tab state
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel | 'all'>('all');
  const [activeCategory, setActiveCategory] = useState<TopicCategory | 'all'>('all');

  // Modals state
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [activeQuizId, setActiveQuizId] = useState<string | undefined>(undefined);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState<boolean>(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isApkModalOpen, setIsApkModalOpen] = useState<boolean>(false);

  // Sync theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(STORAGE_KEYS.THEME, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(STORAGE_KEYS.THEME, 'light');
    }
  }, [darkMode]);

  // Login and Registration Handlers
  const handleLoginSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    setUserProfile(user.profile);
    localStorage.setItem(STORAGE_KEYS.ACTIVE_USER_ID, user.id);
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_USER_ID);
    setCurrentUser(null);
  };

  const handleRegisterUser = (newUser: AuthUser) => {
    setAuthUsers((prev) => {
      const updated = [...prev, newUser];
      localStorage.setItem(STORAGE_KEYS.AUTH_USERS, JSON.stringify(updated));
      return updated;
    });
  };

  // Persist user profile and keep user in registered list updated
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(userProfile));
    if (currentUser) {
      setAuthUsers((prev) => {
        const updated = prev.map((u) =>
          u.id === currentUser.id ? { ...u, profile: userProfile } : u
        );
        localStorage.setItem(STORAGE_KEYS.AUTH_USERS, JSON.stringify(updated));
        return updated;
      });
    }
  }, [userProfile, currentUser?.id]);

  // Persist lessons
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LESSONS, JSON.stringify(lessons));
  }, [lessons]);

  // Persist quiz sets
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(quizSets));
  }, [quizSets]);

  // Handlers
  const handleToggleLessonComplete = (lessonId: string) => {
    setUserProfile((prev) => {
      const alreadyCompleted = prev.completedLessonIds.includes(lessonId);
      const updated = alreadyCompleted
        ? prev.completedLessonIds.filter((id) => id !== lessonId)
        : [...prev.completedLessonIds, lessonId];
      return {
        ...prev,
        completedLessonIds: updated,
      };
    });
  };

  const handleSaveQuizResult = (quizId: string, score: number, total: number) => {
    setUserProfile((prev) => {
      const filtered = prev.quizResults.filter((r) => r.quizId !== quizId);
      return {
        ...prev,
        quizResults: [
          ...filtered,
          {
            quizId,
            score,
            total,
            date: new Date().toLocaleDateString('bn-BD'),
          },
        ],
      };
    });
  };

  const handleUpgradeSuccess = (planId: 'monthly' | 'yearly' | 'lifetime') => {
    setUserProfile((prev) => ({
      ...prev,
      isPremium: true,
      subscriptionPlan: planId,
      subscriptionExpiryDate: '১৭ সেপ্টেম্বর, ২০২৭',
    }));
    setIsSubscriptionOpen(false);
  };

  const handleUpdateProfileName = (newName: string) => {
    setUserProfile((prev) => ({
      ...prev,
      name: newName,
    }));
    if (currentUser) {
      setCurrentUser((prev) => prev ? { ...prev, name: newName, profile: { ...prev.profile, name: newName } } : null);
    }
  };

  const handleAddLesson = (newLesson: Lesson) => {
    setLessons((prev) => [newLesson, ...prev]);
  };

  const handleUpdateLesson = (updatedLesson: Lesson) => {
    setLessons((prev) =>
      prev.map((l) => (l.id === updatedLesson.id ? updatedLesson : l))
    );
  };

  const handleDeleteLesson = (lessonId: string) => {
    setLessons((prev) => prev.filter((l) => l.id !== lessonId));
  };

  const handleToggleLessonPremium = (lessonId: string) => {
    setLessons((prev) =>
      prev.map((l) =>
        l.id === lessonId ? { ...l, isPremium: !l.isPremium } : l
      )
    );
  };

  const handleAddQuizQuestion = (question: QuizQuestion) => {
    setQuizSets((prev) => {
      const targetSet = prev.find((s) => s.category === question.category);
      if (targetSet) {
        return prev.map((s) =>
          s.id === targetSet.id
            ? { ...s, questions: [...s.questions, question] }
            : s
        );
      }
      return prev;
    });
  };

  const handleOpenQuizForLesson = (quizId: string) => {
    setSelectedLesson(null);
    setActiveQuizId(quizId);
    setActiveTab('quiz');
  };

  const handleCategoryNav = (catId: TopicCategory) => {
    setActiveCategory(catId);
    setActiveTab('courses');
  };

  // Average quiz score
  const totalQuizScore = userProfile.quizResults.reduce(
    (acc, curr) => acc + (curr.score / curr.total) * 100,
    0
  );
  const averageScore = userProfile.quizResults.length > 0
    ? Math.round(totalQuizScore / userProfile.quizResults.length)
    : 80;

  // When another customer or new user starts, prompt for username and password first
  if (!currentUser) {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <AuthScreen
          onLoginSuccess={handleLoginSuccess}
          registeredUsers={authUsers}
          onRegisterUser={handleRegisterUser}
        />
      </div>
    );
  }

  const content = (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-['Hind_Siliguri',sans-serif]">
      {/* Disclaimer Banner */}
      <DisclaimerBanner />

      {/* Main Header */}
      <Header
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSubscription={() => setIsSubscriptionOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenApkModal={() => setIsApkModalOpen(true)}
        userProfile={userProfile}
        currentUser={currentUser}
        onLogout={handleLogout}
        isMobileFrame={isMobileFrame}
        onToggleMobileFrame={() => setIsMobileFrame(!isMobileFrame)}
      />

      {/* Main App Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 pb-24">
        {activeTab === 'home' && (
          <HomeView
            lessons={lessons}
            userProfile={userProfile}
            selectedLevel={selectedLevel}
            onSelectLevel={setSelectedLevel}
            onSelectLesson={setSelectedLesson}
            onSelectCategoryTab={handleCategoryNav}
            onOpenQuizTab={() => setActiveTab('quiz')}
            onOpenSubscription={() => setIsSubscriptionOpen(true)}
            onOpenApkModal={() => setIsApkModalOpen(true)}
          />
        )}

        {activeTab === 'courses' && (
          <CoursesView
            lessons={lessons}
            userProfile={userProfile}
            activeCategory={activeCategory}
            onChangeCategory={setActiveCategory}
            onSelectLesson={setSelectedLesson}
            onOpenSubscription={() => setIsSubscriptionOpen(true)}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizView
            quizSets={quizSets}
            activeQuizId={activeQuizId}
            onSaveQuizResult={handleSaveQuizResult}
            onBackToCourse={() => setActiveTab('courses')}
          />
        )}

        {activeTab === 'progress' && (
          <ProgressView
            userProfile={userProfile}
            lessons={lessons}
            onSelectLesson={setSelectedLesson}
            onOpenCertificate={() => setIsCertificateOpen(true)}
            onOpenQuizTab={() => setActiveTab('quiz')}
          />
        )}

        {activeTab === 'profile' && (
          <StudentProfileView
            userProfile={userProfile}
            username={currentUser?.username}
            lessons={lessons}
            onUpdateProfileName={handleUpdateProfileName}
            onOpenCertificate={() => setIsCertificateOpen(true)}
            onOpenSubscription={() => setIsSubscriptionOpen(true)}
            onOpenApkModal={() => setIsApkModalOpen(true)}
            onSelectLesson={setSelectedLesson}
            onLogout={handleLogout}
          />
        )}
      </main>

      {/* Footer Disclaimer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 py-6 px-4 text-center text-xs text-slate-500 dark:text-slate-400 mb-16 sm:mb-0">
        <div className="max-w-4xl mx-auto space-y-2">
          <p className="font-semibold text-slate-700 dark:text-slate-300">
            SD Trading Learning — সম্পূর্ণ বাংলা ভাষায় শেয়ার মার্কেট ও ট্রেডিং শিক্ষা
          </p>
          <p className="text-[11px] leading-relaxed">
            কপিরাইট © ২০২৬ SD Trading Learning. সর্বস্বত্ব সংরক্ষিত। এই অ্যাপ্লিকেশনে প্রদত্ত সমস্ত তথ্য, চার্ট, ভিডিও ও কুইজ শুধুমাত্র ব্যক্তিগত ও সাধারণ শিক্ষামূলক উদ্দেশ্যে নির্মিত। কোনো আর্থিক ক্ষতি বা ঝুঁকির জন্য অ্যাপ কর্তৃপক্ষ দায়ী নয়।
          </p>
        </div>
      </footer>

      {/* Bottom Android Navigation */}
      <BottomNav
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        completedCount={userProfile.completedLessonIds.length}
      />

      {/* Modals & Dialogs */}
      {selectedLesson && (
        <LessonDetailModal
          lesson={selectedLesson}
          isCompleted={userProfile.completedLessonIds.includes(selectedLesson.id)}
          isPremiumUnlocked={userProfile.isPremium}
          allLessons={lessons}
          onClose={() => setSelectedLesson(null)}
          onToggleComplete={handleToggleLessonComplete}
          onSelectLesson={setSelectedLesson}
          onOpenQuiz={handleOpenQuizForLesson}
          onOpenSubscription={() => {
            setSelectedLesson(null);
            setIsSubscriptionOpen(true);
          }}
        />
      )}

      {isSearchOpen && (
        <SearchModal
          lessons={lessons}
          onClose={() => setIsSearchOpen(false)}
          onSelectLesson={setSelectedLesson}
        />
      )}

      {isSubscriptionOpen && (
        <SubscriptionModal
          currentPlan={userProfile.subscriptionPlan || 'free'}
          onClose={() => setIsSubscriptionOpen(false)}
          onUpgradeSuccess={handleUpgradeSuccess}
        />
      )}

      {isCertificateOpen && (
        <CertificateModal
          userName={userProfile.name}
          completionDate="১৭ সেপ্টেম্বর, ২০২৬"
          completedLessonsCount={userProfile.completedLessonIds.length}
          totalLessonsCount={lessons.length}
          averageScore={averageScore}
          onClose={() => setIsCertificateOpen(false)}
        />
      )}

      {isAdminOpen && (
        <AdminPanelModal
          lessons={lessons}
          onClose={() => setIsAdminOpen(false)}
          onAddLesson={handleAddLesson}
          onUpdateLesson={handleUpdateLesson}
          onDeleteLesson={handleDeleteLesson}
          onToggleLessonPremium={handleToggleLessonPremium}
          onAddQuizQuestion={handleAddQuizQuestion}
        />
      )}

      {isApkModalOpen && (
        <ApkDownloadModal onClose={() => setIsApkModalOpen(false)} />
      )}
    </div>
  );

  // If mobile frame is enabled, wrap in an Android device mockup
  if (isMobileFrame) {
    return (
      <div className="min-h-screen bg-slate-900 py-6 px-2 flex flex-col items-center justify-center">
        <div className="text-center mb-3 text-xs text-slate-400 flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-emerald-400" />
          <span>অ্যান্ড্রয়েড ফোন মোড ভিউ (Android Mobile App View)</span>
          <button
            onClick={() => setIsMobileFrame(false)}
            className="px-2 py-0.5 rounded bg-slate-800 text-white hover:bg-slate-700 ml-2 font-semibold text-[11px]"
          >
            ফুল স্ক্রিন দেখুন
          </button>
        </div>

        {/* Android Device Mockup */}
        <div className="w-full max-w-[430px] h-[860px] bg-black rounded-[48px] p-3 shadow-2xl border-[4px] border-slate-700 relative overflow-hidden flex flex-col ring-8 ring-slate-800">
          {/* Speaker / Camera Notch */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-5 bg-black rounded-full z-50 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-slate-850 border border-slate-700" />
          </div>

          <div className="w-full h-full rounded-[38px] overflow-y-auto relative no-scrollbar">
            {content}
          </div>
        </div>
      </div>
    );
  }

  return content;
}
