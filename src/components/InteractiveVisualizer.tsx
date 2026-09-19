import React, { useState } from 'react';
import { Calculator, TrendingUp, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface VisualizerProps {
  type?: 'candlestick' | 'support_resistance' | 'order_type' | 'option_chain' | 'risk_reward' | 'psychology_cycle';
}

export const InteractiveVisualizer: React.FC<VisualizerProps> = ({ type = 'candlestick' }) => {
  // Calculator state for Risk / Position Sizing
  const [capital, setCapital] = useState<number>(50000);
  const [riskPercent, setRiskPercent] = useState<number>(1);
  const [entryPrice, setEntryPrice] = useState<number>(200);
  const [stopLossPrice, setStopLossPrice] = useState<number>(190);
  const [targetRatio, setTargetRatio] = useState<number>(2);

  // Candlestick simulator state
  const [candleType, setCandleType] = useState<'bullish' | 'bearish' | 'hammer' | 'doji'>('bullish');

  // Calculations
  const riskAmount = (capital * riskPercent) / 100;
  const perShareRisk = Math.max(0.5, entryPrice - stopLossPrice);
  const positionSize = perShareRisk > 0 ? Math.floor(riskAmount / perShareRisk) : 0;
  const targetPrice = entryPrice + (perShareRisk * targetRatio);
  const totalProfit = positionSize * (perShareRisk * targetRatio);

  if (type === 'risk_reward') {
    return (
      <div className="my-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-900 dark:to-emerald-950/30 p-5 border border-emerald-200 dark:border-emerald-800/50 shadow-sm">
        <div className="flex items-center gap-2 mb-3 text-emerald-800 dark:text-emerald-300 font-bold text-base">
          <Calculator className="w-5 h-5 text-emerald-600" />
          <span>ইন্টারঅ্যাক্টিভ পজিশন সাইজিং ও রিস্ক ক্যালকুলেটর</span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
          আপনার মোট মূলধন ও স্টপ লস প্রবেশ করিয়ে হিসাব করুন ঠিক কতটি শেয়ার কেনা নিরাপদ:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              মোট মূলধন (টাকা)
            </label>
            <input
              type="number"
              value={capital}
              onChange={(e) => setCapital(Math.max(1000, Number(e.target.value)))}
              className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              ট্রেডে ঝুঁকি সীমা (%)
            </label>
            <select
              value={riskPercent}
              onChange={(e) => setRiskPercent(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value={1}>১% (প্রস্তাবিত ও নিরাপদ)</option>
              <option value={2}>২% (সর্বোচ্চ সহনশীল)</option>
              <option value={0.5}>০.৫% (রক্ষণশীল)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              ক্রয়মূল্য (এন্ট্রি প্রাইস)
            </label>
            <input
              type="number"
              value={entryPrice}
              onChange={(e) => setEntryPrice(Math.max(1, Number(e.target.value)))}
              className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              স্টপ লস (SL প্রাইস)
            </label>
            <input
              type="number"
              value={stopLossPrice}
              onChange={(e) => setStopLossPrice(Math.max(0.5, Number(e.target.value)))}
              className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Results Card */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/80 dark:bg-slate-800/90 backdrop-blur rounded-xl p-3.5 border border-emerald-100 dark:border-slate-700">
          <div className="text-center p-2 rounded-lg bg-emerald-50/50 dark:bg-slate-900/50">
            <span className="text-[11px] block text-slate-500 dark:text-slate-400">সর্বোচ্চ ঝুঁকি</span>
            <span className="text-base font-bold text-rose-600 dark:text-rose-400">
              ₹{riskAmount.toLocaleString('bn-IN')}
            </span>
          </div>

          <div className="text-center p-2 rounded-lg bg-emerald-50/50 dark:bg-slate-900/50">
            <span className="text-[11px] block text-slate-500 dark:text-slate-400">শেয়ার কিনবেন (Quantity)</span>
            <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
              {positionSize} টি
            </span>
          </div>

          <div className="text-center p-2 rounded-lg bg-emerald-50/50 dark:bg-slate-900/50">
            <span className="text-[11px] block text-slate-500 dark:text-slate-400">১:{targetRatio} টার্গেট প্রাইস</span>
            <span className="text-base font-bold text-blue-600 dark:text-blue-400">
              ₹{targetPrice.toFixed(1)}
            </span>
          </div>

          <div className="text-center p-2 rounded-lg bg-emerald-50/50 dark:bg-slate-900/50">
            <span className="text-[11px] block text-slate-500 dark:text-slate-400">সম্ভাব্য লাভ</span>
            <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">
              +₹{totalProfit.toLocaleString('bn-IN')}
            </span>
          </div>
        </div>
        <div className="mt-3 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>এই গণিত অনুসরণ করলে বাজার যেকোনো দিকে গেলেও আপনার মূলধনের ৯০% এর বেশি সবসময় সংরক্ষিত থাকবে।</span>
        </div>
      </div>
    );
  }

  if (type === 'candlestick') {
    return (
      <div className="my-6 rounded-2xl bg-slate-900 text-white p-5 border border-slate-800 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-sm">ইন্টারঅ্যাক্টিভ ক্যান্ডেলস্টিক এক্সপ্লোরার</span>
          </div>
          <div className="flex gap-1.5 bg-slate-800 p-1 rounded-xl text-xs">
            <button
              onClick={() => setCandleType('bullish')}
              className={`px-3 py-1 rounded-lg transition-all ${candleType === 'bullish' ? 'bg-emerald-600 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}
            >
              বুলিশ (গ্রিন)
            </button>
            <button
              onClick={() => setCandleType('bearish')}
              className={`px-3 py-1 rounded-lg transition-all ${candleType === 'bearish' ? 'bg-rose-600 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}
            >
              বিয়ারিশ (রেড)
            </button>
            <button
              onClick={() => setCandleType('hammer')}
              className={`px-3 py-1 rounded-lg transition-all ${candleType === 'hammer' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}
            >
              হ্যামার (Hammer)
            </button>
            <button
              onClick={() => setCandleType('doji')}
              className={`px-3 py-1 rounded-lg transition-all ${candleType === 'doji' ? 'bg-amber-600 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}
            >
              দোজি (Doji)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
          {/* Visual SVG Candlestick */}
          <div className="h-44 flex items-center justify-center">
            {candleType === 'bullish' && (
              <svg width="120" height="160" viewBox="0 0 120 160" className="drop-shadow-lg">
                <line x1="60" y1="15" x2="60" y2="40" stroke="#10b981" strokeWidth="3" />
                <rect x="35" y="40" width="50" height="75" rx="4" fill="#10b981" />
                <line x1="60" y1="115" x2="60" y2="145" stroke="#10b981" strokeWidth="3" />
                <text x="92" y="20" fill="#94a3b8" fontSize="10">High (সর্বোচ্চ)</text>
                <text x="92" y="45" fill="#10b981" fontSize="10">Close (সমাপ্তি)</text>
                <text x="92" y="115" fill="#10b981" fontSize="10">Open (শুরু)</text>
                <text x="92" y="145" fill="#94a3b8" fontSize="10">Low (সর্বনিম্ন)</text>
              </svg>
            )}

            {candleType === 'bearish' && (
              <svg width="120" height="160" viewBox="0 0 120 160" className="drop-shadow-lg">
                <line x1="60" y1="15" x2="60" y2="40" stroke="#ef4444" strokeWidth="3" />
                <rect x="35" y="40" width="50" height="75" rx="4" fill="#ef4444" />
                <line x1="60" y1="115" x2="60" y2="145" stroke="#ef4444" strokeWidth="3" />
                <text x="92" y="20" fill="#94a3b8" fontSize="10">High (সর্বোচ্চ)</text>
                <text x="92" y="45" fill="#ef4444" fontSize="10">Open (শুরু)</text>
                <text x="92" y="115" fill="#ef4444" fontSize="10">Close (সমাপ্তি)</text>
                <text x="92" y="145" fill="#94a3b8" fontSize="10">Low (সর্বনিম্ন)</text>
              </svg>
            )}

            {candleType === 'hammer' && (
              <svg width="120" height="160" viewBox="0 0 120 160" className="drop-shadow-lg">
                <line x1="60" y1="20" x2="60" y2="25" stroke="#10b981" strokeWidth="2" />
                <rect x="40" y="25" width="40" height="30" rx="3" fill="#10b981" />
                <line x1="60" y1="55" x2="60" y2="150" stroke="#10b981" strokeWidth="4" />
                <text x="85" y="40" fill="#10b981" fontSize="10">ছোট রিয়েল বডি</text>
                <text x="85" y="105" fill="#38bdf8" fontSize="10">লম্বা রিজেকশন শ্যাডো (2x+)</text>
              </svg>
            )}

            {candleType === 'doji' && (
              <svg width="120" height="160" viewBox="0 0 120 160" className="drop-shadow-lg">
                <line x1="60" y1="20" x2="60" y2="140" stroke="#f59e0b" strokeWidth="3" />
                <line x1="35" y1="80" x2="85" y2="80" stroke="#f59e0b" strokeWidth="5" />
                <text x="90" y="82" fill="#f59e0b" fontSize="10">Open ≈ Close</text>
                <text x="90" y="25" fill="#94a3b8" fontSize="10">High</text>
                <text x="90" y="140" fill="#94a3b8" fontSize="10">Low</text>
              </svg>
            )}
          </div>

          {/* Bengali interpretation */}
          <div className="text-xs text-slate-300 space-y-2">
            {candleType === 'bullish' && (
              <>
                <p className="font-semibold text-emerald-400 text-sm">সবুজ ক্যান্ডেল (বুলিশ ক্যান্ডেল):</p>
                <p>দাম নিচে শুরু হয়ে ওপরে গিয়ে শেষ হয়েছে। ক্রেতারা এই টাইমফ্রেমে বিক্রেতাদের পরাস্ত করেছে।</p>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
                  <span className="text-emerald-400 font-bold">ক্লোজ &gt; ওপেন:</span> বায়ারদের শক্তি ও আপট্রেন্ডের শক্তি নির্দেশ করে।
                </div>
              </>
            )}

            {candleType === 'bearish' && (
              <>
                <p className="font-semibold text-rose-400 text-sm">লাল ক্যান্ডেল (বিয়ারিশ ক্যান্ডেল):</p>
                <p>দাম ওপরে শুরু হয়ে বিক্রেতাদের চাপে নিচে নেমে শেষ হয়েছে। বিক্রেতাদের আধিপত্য স্পষ্ট।</p>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
                  <span className="text-rose-400 font-bold">ওপেন &gt; ক্লোজ:</span> সাপ্লাই বেশি ও বিয়ারদের শক্তিমত্তা প্রকাশ করে।
                </div>
              </>
            )}

            {candleType === 'hammer' && (
              <>
                <p className="font-semibold text-blue-400 text-sm">হ্যামার ক্যান্ডেল (বুলিশ রিভার্সাল):</p>
                <p>বিক্রেতারা দাম অনেক নিচে নামিয়েছিল, কিন্তু সেখান থেকে বায়াররা আগ্রাসীভাবে শেয়ার কিনে দাম ওপরে তুলে দিয়েছে।</p>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
                  সাপোর্ট জোনে বা ডাউনট্রেন্ডের নিচে তৈরি হলে শক্তিশালী রিভার্সালের সম্ভাবনা থাকে।
                </div>
              </>
            )}

            {candleType === 'doji' && (
              <>
                <p className="font-semibold text-amber-400 text-sm">দোজি ক্যান্ডেল (অনিশ্চয়তা):</p>
                <p>ক্রেতা ও বিক্রেতা সমান শক্তি প্রদর্শন করেছে। পরবর্তী ক্যান্ডেল যেদিকে ব্রেক করবে, বাজার সেদিকে যাওয়ার সম্ভাবনা থাকে।</p>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'support_resistance') {
    return (
      <div className="my-6 rounded-2xl bg-slate-900 text-white p-5 border border-slate-800">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5 text-blue-400" />
          <span className="font-bold text-sm">সাপোর্ট ও রেজিস্ট্যান্স ভিজ্যুয়ালাইজেশন</span>
        </div>
        <div className="relative h-44 bg-slate-950/80 rounded-xl p-3 border border-slate-800 overflow-hidden flex flex-col justify-between">
          {/* Resistance Line */}
          <div className="border-b-2 border-dashed border-rose-500 flex justify-between items-center pb-1">
            <span className="text-[11px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded font-mono font-bold">
              রেজিস্ট্যান্স জোন (ছাদ / সেলিং প্রেশার)
            </span>
            <span className="text-[10px] text-slate-400">বিক্রেতারা সক্রিয়</span>
          </div>

          {/* Bouncing Sine Wave SVG */}
          <svg className="w-full h-24 overflow-visible" viewBox="0 0 400 80">
            <path
              d="M 10 50 Q 60 10 110 50 T 210 50 T 310 50 T 390 20"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="3"
            />
            {/* Bounce dots */}
            <circle cx="60" cy="20" r="5" fill="#ef4444" />
            <circle cx="160" cy="20" r="5" fill="#ef4444" />
            <circle cx="260" cy="20" r="5" fill="#ef4444" />
            <circle cx="110" cy="65" r="5" fill="#10b981" />
            <circle cx="210" cy="65" r="5" fill="#10b981" />
            <circle cx="310" cy="65" r="5" fill="#10b981" />
          </svg>

          {/* Support Line */}
          <div className="border-t-2 border-dashed border-emerald-500 flex justify-between items-center pt-1">
            <span className="text-[11px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
              সাপোর্ট জোন (মেঝে / ডিমান্ড জোন)
            </span>
            <span className="text-[10px] text-slate-400">ক্রেতারা সক্রিয়</span>
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-2 text-center">
          সবুজ বৃত্তে বায়াররা সাপোর্ট দেয় ➔ লাল বৃত্তে সেলাররা প্রফিট বুক করে রিজেক্ট করে।
        </p>
      </div>
    );
  }

  // Fallback psychology cycle
  return (
    <div className="my-6 rounded-2xl bg-amber-50 dark:bg-slate-900 p-4 border border-amber-200 dark:border-amber-900/50">
      <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-300 text-sm mb-3">
        <span>ট্রেডিং সাইকোলজির আবেগের চক্র (Greed & Fear Cycle)</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
        <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-amber-100 dark:border-slate-700">
          <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">১. আশাবাদ ও লোভ</span>
          <p className="text-[11px] text-slate-600 dark:text-slate-400">ট্রেডে এন্ট্রি নিয়ে বেশি লাভের আশায় অতিরিক্ত লট নেওয়া।</p>
        </div>
        <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-amber-100 dark:border-slate-700">
          <span className="font-bold text-amber-600 dark:text-amber-400 block mb-1">২. অস্থিরতা ও অস্বীকার</span>
          <p className="text-[11px] text-slate-600 dark:text-slate-400">দাম বিপরীতমুখী হলে স্টপ লস তুলে নেওয়া ও আশা করা ফিরে আসবে।</p>
        </div>
        <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-amber-100 dark:border-slate-700">
          <span className="font-bold text-rose-600 dark:text-rose-400 block mb-1">৩. আতঙ্ক ও রিভেঞ্জ</span>
          <p className="text-[11px] text-slate-600 dark:text-slate-400">বড় লস হয়ে গেলে ক্ষোভে কোনো হিসাব ছাড়া দ্বিগুণ লট নেওয়া।</p>
        </div>
        <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-amber-100 dark:border-slate-700">
          <span className="font-bold text-blue-600 dark:text-blue-400 block mb-1">৪. উপলব্ধি ও শিক্ষা</span>
          <p className="text-[11px] text-slate-600 dark:text-slate-400">নিয়ম ও ডিসিপ্লিন ছাড়া দীর্ঘমেয়াদে ট্রেডিং অসম্ভব তা বোঝা।</p>
        </div>
      </div>
    </div>
  );
};
