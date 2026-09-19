import React, { useRef } from 'react';
import { Award, CheckCircle2, Download, Printer, Share2, X, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CertificateModalProps {
  userName: string;
  completionDate: string;
  completedLessonsCount: number;
  totalLessonsCount: number;
  averageScore: number;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  userName,
  completionDate,
  completedLessonsCount,
  totalLessonsCount,
  averageScore,
  onClose,
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleTriggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6">
        {/* Top bar with actions */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span className="font-bold text-slate-800 dark:text-slate-100 text-sm">
              SD Trading Learning - কোর্স সমাপ্তি সনদ
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
              title="প্রিন্ট বা সেভ করুন"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">প্রিন্ট / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* The Printable Certificate Container */}
        <div className="p-6 sm:p-8" ref={certificateRef}>
          <div className="relative border-4 border-double border-amber-500/60 dark:border-amber-500/40 rounded-2xl p-6 sm:p-10 bg-gradient-to-b from-amber-50/40 via-white to-amber-50/20 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 text-center shadow-inner">
            {/* Watermark Logo */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
              <Award className="w-96 h-96 text-emerald-900" />
            </div>

            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-300 dark:border-emerald-700">
              <ShieldCheck className="w-4 h-4" />
              <span>সার্টিফিকেট অব কমপ্লিশন (Certificate of Completion)</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1">
              SD Trading Learning
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              সম্পূর্ণ বাংলা শেয়ার মার্কেট ও ট্রেডিং শিক্ষা একাডেমি
            </p>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-2">
              সগৌরবে এই শিক্ষামূলক স্বীকৃতি সনদ প্রদান করা হচ্ছে:
            </p>

            <div className="my-4 py-2 border-b-2 border-amber-500/50 inline-block px-8">
              <span className="text-2xl sm:text-3xl font-bold text-emerald-700 dark:text-emerald-400 font-serif">
                {userName || 'প্রিয় শিক্ষার্থী'}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg mx-auto mb-6">
              যিনি সফলতার সাথে শেয়ার মার্কেট বেসিকস, টেকনিক্যাল অ্যানালাইসিস, ক্যান্ডেলস্টিক চার্ট রিডিং, অপশন ট্রেডিং নীতিমালা, ট্রেডিং সাইকোলজি ও সুশৃঙ্খল রিস্ক ম্যানেজমেন্টের পাঠ্যক্রম সম্পন্ন করেছেন।
            </p>

            {/* Performance metrics */}
            <div className="grid grid-cols-3 gap-2 max-w-md mx-auto mb-8 bg-white/70 dark:bg-slate-800/80 rounded-xl p-3 border border-slate-200 dark:border-slate-700">
              <div>
                <span className="block text-[10px] text-slate-500 dark:text-slate-400">সম্পন্ন লেসন</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  {completedLessonsCount} / {totalLessonsCount}
                </span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 dark:text-slate-400">গড় কুইজ স্কোর</span>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  {averageScore}%
                </span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 dark:text-slate-400">ইস্যুর তারিখ</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  {completionDate}
                </span>
              </div>
            </div>

            {/* Signatures & Seal */}
            <div className="flex items-end justify-between pt-4 border-t border-slate-200 dark:border-slate-800 text-left">
              <div>
                <div className="font-serif italic text-emerald-600 dark:text-emerald-400 text-base">
                  SD Trading Faculty
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 border-t border-slate-300 dark:border-slate-700 pt-1 mt-1">
                  প্রধান শিক্ষক ও বিশ্লেষক
                </div>
              </div>

              {/* Gold Seal */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex flex-col items-center justify-center text-slate-900 shadow-lg border-2 border-amber-600 text-[9px] font-black text-center p-1">
                <span>★ VERIFIED ★</span>
                <span className="text-[7px]">SD LEARNING</span>
              </div>

              <div className="text-right">
                <div className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                  ID: SD-TRD-{Math.floor(100000 + Math.random() * 900000)}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 border-t border-slate-300 dark:border-slate-700 pt-1 mt-1">
                  ভেরিফিকেশন ও ট্র্যাকিং
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info note */}
        <div className="px-6 py-3 bg-amber-50/50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            এই সনদটি শুধুমাত্র শিক্ষামূলক দক্ষতা অর্জনের প্রতীক। এটি কোনো আর্থিক বা ব্রোকারেজ লাইসেন্স হিসেবে বিবেচ্য নয়।
          </p>
        </div>
      </div>
    </div>
  );
};
