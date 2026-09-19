import React from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <div className="w-full bg-amber-500/10 border-b border-amber-500/25 px-4 py-2.5 text-xs text-amber-900 dark:text-amber-200">
      <div className="max-w-7xl mx-auto flex items-start sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5 sm:mt-0" />
          <p className="leading-snug">
            <strong className="font-bold">গুরুত্বপূর্ণ শিক্ষামূলক ডিসক্লেইমার:</strong> এই অ্যাপটি শুধুমাত্র শিক্ষামূলক উদ্দেশ্যে তৈরি। এখানে কোনো ধরনের বাই/সেল (Buy/Sell) বা নিশ্চিত লাভের পরামর্শ প্রদান করা হয় না। শেয়ার বাজারে ট্রেডিং ঝুঁকিপূর্ণ; সর্বদা নিজের বিচারবুদ্ধি ও আর্থিক উপদেষ্টার পরামর্শ অনুসরণ করুন।
          </p>
        </div>
        <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md flex-shrink-0">
          <ShieldCheck className="w-3.5 h-3.5" />
          ১০০% শিক্ষামূলক প্ল্যাটফর্ম
        </span>
      </div>
    </div>
  );
};
