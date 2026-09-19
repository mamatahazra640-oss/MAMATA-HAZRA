import React from 'react';
import { 
  TrendingUp, Moon, Sun, Search, Sparkles, Shield, 
  Crown, Smartphone, Layers, CheckCircle2, Download, LogOut, User
} from 'lucide-react';
import { UserProfile, AuthUser } from '../types';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenSearch: () => void;
  onOpenSubscription: () => void;
  onOpenAdmin: () => void;
  onOpenApkModal: () => void;
  userProfile: UserProfile;
  currentUser?: AuthUser | null;
  onLogout?: () => void;
  isMobileFrame: boolean;
  onToggleMobileFrame: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  onOpenSearch,
  onOpenSubscription,
  onOpenAdmin,
  onOpenApkModal,
  userProfile,
  currentUser,
  onLogout,
  isMobileFrame,
  onToggleMobileFrame,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Left: App Logo & Bengali Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 flex-shrink-0">
            <TrendingUp className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight">
                SD Trading Learning
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold border border-emerald-200 dark:border-emerald-800">
                বাংলা এডুকেশন
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
              শেয়ার বাজার ও ট্রেডিং শেখার বিশ্বস্ত প্ল্যাটফর্ম
            </p>
          </div>
        </div>

        {/* Center/Right: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 border border-slate-200 dark:border-slate-800 transition"
            title="বাংলা বা ইংরেজিতে খুঁজুন"
          >
            <Search className="w-4 h-4 text-slate-500" />
            <span className="hidden md:inline font-medium">অনুসন্ধান (RSI, অপশন, SL)...</span>
          </button>

          {/* Download APK / App Button */}
          <button
            onClick={onOpenApkModal}
            className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm shadow-emerald-500/20 transition animate-pulse"
            title="মোবাইলে APK / অ্যাপ ডাউনলোড করুন"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="text-[11px] sm:text-xs">APK ডাউনলোড</span>
          </button>

          {/* Android App Frame view toggle for demonstration */}
          <button
            onClick={onToggleMobileFrame}
            className={`p-2 rounded-xl text-xs transition border hidden lg:flex items-center gap-1.5 ${
              isMobileFrame
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 text-emerald-600 dark:text-emerald-300 font-semibold'
                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title="অ্যান্ড্রয়েড ফোন মোড প্রিভিউ"
          >
            <Smartphone className="w-4 h-4" />
            <span className="text-[11px]">মোবাইল ফ্রেম</span>
          </button>

          {/* Subscription Button / Status */}
          {userProfile.isPremium ? (
            <button
              onClick={onOpenSubscription}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm hover:from-amber-600 hover:to-amber-700 transition"
            >
              <Crown className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">প্রিমিয়াম VIP</span>
            </button>
          ) : (
            <button
              onClick={onOpenSubscription}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">প্রিমিয়াম আনলক</span>
            </button>
          )}

          {/* Admin Panel Trigger */}
          <button
            onClick={onOpenAdmin}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-xs font-semibold flex items-center gap-1 transition"
            title="অ্যাডমিন প্যানেল"
          >
            <Shield className="w-4 h-4 text-emerald-600" />
            <span className="hidden xl:inline text-[11px]">অ্যাডমিন</span>
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition"
            title={darkMode ? 'লাইট মোড চালু করুন' : 'ডার্ক মোড চালু করুন'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Logged in User Pill & Logout Button */}
          {currentUser && onLogout && (
            <div className="flex items-center gap-1.5 pl-1 sm:pl-2 border-l border-slate-200 dark:border-slate-800">
              <div className="hidden lg:flex items-center gap-1.5 py-1 px-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold">
                <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                  {currentUser.name.charAt(0) || 'U'}
                </div>
                <span className="truncate max-w-[90px]">{currentUser.name.split(' ')[0]}</span>
              </div>

              <button
                onClick={onLogout}
                className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-xs font-semibold flex items-center gap-1.5 transition"
                title="লগআউট করুন (অন্য গ্রাহক লগইন করার জন্য)"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">লগআউট</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
