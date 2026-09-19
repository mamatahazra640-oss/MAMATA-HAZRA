import React from 'react';
import { Home, BookOpen, HelpCircle, BarChart3, User } from 'lucide-react';

export type TabType = 'home' | 'courses' | 'quiz' | 'progress' | 'profile';

interface BottomNavProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
  completedCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  completedCount,
}) => {
  const tabs = [
    { id: 'home' as TabType, label: 'হোম', icon: Home },
    { id: 'courses' as TabType, label: 'কোর্স', icon: BookOpen },
    { id: 'quiz' as TabType, label: 'কুইজ', icon: HelpCircle },
    { id: 'progress' as TabType, label: 'প্রগ্রেস', icon: BarChart3, badge: completedCount > 0 ? completedCount : undefined },
    { id: 'profile' as TabType, label: 'প্রোফাইল', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-md sm:max-w-xl mx-auto px-4 h-16 flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`relative flex flex-col items-center justify-center w-14 py-1 transition-all ${
                isActive
                  ? 'text-emerald-600 dark:text-emerald-400 font-bold scale-105'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                {tab.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2 px-1 rounded-full bg-emerald-500 text-[9px] text-white font-bold min-w-[14px] text-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-1 whitespace-nowrap">{tab.label}</span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-emerald-600 dark:bg-emerald-400 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
