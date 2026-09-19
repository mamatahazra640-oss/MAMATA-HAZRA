import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Clock, Lock, ArrowRight, TrendingUp } from 'lucide-react';
import { Lesson } from '../types';

interface SearchModalProps {
  lessons: Lesson[];
  onClose: () => void;
  onSelectLesson: (lesson: Lesson) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  lessons,
  onClose,
  onSelectLesson,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sampleKeywords = ['RSI', 'সাপোর্ট', 'অপশন', 'CE', 'PE', 'Stop Loss', 'ক্যান্ডেলস্টিক', 'Demat'];

  const filteredLessons = query.trim()
    ? lessons.filter((l) => {
        const q = query.toLowerCase().trim();
        return (
          l.title.toLowerCase().includes(q) ||
          l.englishTitle.toLowerCase().includes(q) ||
          l.summary.toLowerCase().includes(q) ||
          l.category.toLowerCase().includes(q) ||
          l.content.some((c) =>
            c.sectionTitle.toLowerCase().includes(q) ||
            c.paragraphs.some((p) => p.toLowerCase().includes(q))
          )
        );
      })
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 pt-16 sm:pt-24 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-fadeIn">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="বাংলা বা ইংরেজিতে সার্চ করুন (যেমন: RSI, সাপোর্ট, অপশন)..."
            className="w-full text-sm sm:text-base bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder-slate-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 px-2"
          >
            ESC
          </button>
        </div>

        {/* Quick Tag Recommendations */}
        <div className="p-3 bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-semibold text-slate-500 whitespace-nowrap">
            জনপ্রিয় টপিক:
          </span>
          {sampleKeywords.map((kw) => (
            <button
              key={kw}
              onClick={() => setQuery(kw)}
              className="px-2 py-0.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600 transition whitespace-nowrap"
            >
              {kw}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div className="max-h-[60vh] overflow-y-auto p-3 sm:p-4 space-y-2">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-slate-400 text-xs">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
              <span>যেকোনো ট্রেডিং টার্ম বা অধ্যায়ের নাম লিখে অনুসন্ধান শুরু করুন</span>
            </div>
          ) : filteredLessons.length === 0 ? (
            <div className="py-8 text-center text-slate-500 dark:text-slate-400 text-xs">
              "{query}" সম্পর্কিত কোনো অধ্যায় পাওয়া যায়নি। অন্য শব্দ লিখে চেষ্টা করুন।
            </div>
          ) : (
            filteredLessons.map((lesson) => (
              <div
                key={lesson.id}
                onClick={() => {
                  onSelectLesson(lesson);
                  onClose();
                }}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-600 bg-white dark:bg-slate-800/60 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 cursor-pointer transition flex items-center justify-between gap-3 group"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 truncate">
                      {lesson.title}
                    </span>
                    {lesson.isPremium && (
                      <span className="px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[9px] font-bold">
                        PRO
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                    {lesson.summary}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 group-hover:text-emerald-600">
                  <span className="text-[10px] hidden sm:inline">{lesson.duration}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
