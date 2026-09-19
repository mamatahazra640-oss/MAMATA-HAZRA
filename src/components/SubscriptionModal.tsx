import React, { useState } from 'react';
import { 
  X, Check, ShieldCheck, Sparkles, CreditCard, 
  CheckCircle2, AlertCircle, RefreshCw, Zap, Lock 
} from 'lucide-react';
import { SubscriptionPlan } from '../types';
import confetti from 'canvas-confetti';

interface SubscriptionModalProps {
  currentPlan?: 'free' | 'monthly' | 'yearly' | 'lifetime';
  onClose: () => void;
  onUpgradeSuccess: (planId: 'monthly' | 'yearly' | 'lifetime') => void;
}

export const PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'ফ্রি লার্নিং (Free)',
    price: 0,
    duration: 'আজীবন ফ্রি',
    features: [
      'শেয়ার মার্কেট বেসিকস অধ্যায় অ্যাক্সেস',
      'ট্রেডিং সাইকোলজি ও প্রাথমিক নির্দেশিকা',
      'বেসিক এমসিকিউ কুইজ প্র্যাকটিস',
      'কমিউনিটি ডিসকাসন অ্যাক্সেস'
    ],
    badge: 'বর্তমান প্ল্যান'
  },
  {
    id: 'monthly',
    name: 'মাসিক প্রো (Pro Monthly)',
    price: 499,
    originalPrice: 999,
    duration: '১ মাস মেয়াদ',
    features: [
      'সকল এডভান্সড টেকনিক্যাল অ্যানালাইসিস লেসন',
      'অপশন ট্রেডিং (CE/PE ও গ্রিকস) মাস্টারক্লাস',
      'লাইভ ইন্টারঅ্যাক্টিভ চার্ট ও পজিশন সাইজিং টুলস',
      'সার্টিফিকেট অব কমপ্লিশন ডাউনলোড সুবিধা',
      'প্রাইওরিটি শিক্ষক সাপোর্ট'
    ],
    badge: 'জনপ্রিয়'
  },
  {
    id: 'yearly',
    name: 'বাৎসরিক ভিআইপি (Yearly VIP)',
    price: 1499,
    originalPrice: 3999,
    duration: '১২ মাস মেয়াদ (৬৭% সাশ্রয়)',
    popular: true,
    features: [
      'মাসিক প্ল্যানের সমস্ত সুবিধা অন্তর্ভুক্ত',
      'নতুন যুক্ত হওয়া প্রতিটি প্রিমিয়াম কোর্স বিনামূল্যে',
      'অভিজ্ঞ ট্রেডারদের সাথে লাইভ প্রশ্নোত্তর ওয়েবিনার',
      'গোল্ডেন ভেরিফাইড ডিজিটাল সনদ',
      'ব্যক্তিগত ট্রেডিং জার্নাল টেমপ্লেট'
    ],
    badge: 'সেরা অফার 🔥'
  },
  {
    id: 'lifetime',
    name: 'লাইফটাইম আনলিমিটেড',
    price: 2999,
    originalPrice: 7999,
    duration: 'এককালীন পেমেন্ট (আজীবন)',
    features: [
      'আজীবন সকল বর্তমান ও ভবিষ্যৎ কোর্সে আনলিমিটেড অ্যাক্সেস',
      'ভবিষ্যতের সকল ভিডিও লেকচার ও আপডেটস',
      'ভিআইপি ট্রেডার্স কমিউনিটি সদস্যপদ',
      '১-অন-১ ক্যারিয়ার গাইডেন্স রিসোর্স'
    ],
    badge: 'এককালীন'
  }
];

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  currentPlan = 'free',
  onClose,
  onUpgradeSuccess,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly' | 'lifetime'>('yearly');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'bkash' | 'card' | 'nagad'>('upi');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'failed'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const planDetails = PLANS.find((p) => p.id === selectedPlan)!;

  const handleProcessPayment = () => {
    setIsProcessing(true);
    setPaymentStatus('idle');
    setErrorMessage('');

    // Simulate realistic payment gateway response
    setTimeout(() => {
      setIsProcessing(false);
      // Success case
      setPaymentStatus('success');
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        onUpgradeSuccess(selectedPlan);
      }, 1800);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-4">
        {/* Top Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur">
              <Sparkles className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold">
                SD Trading Learning প্রিমিয়াম
              </h2>
              <p className="text-xs text-emerald-100">
                সম্পূর্ণ বাংলা ভাষায় পেশাদার ট্রেডিং শিক্ষার পূর্ণাঙ্গ অ্যাক্সেস
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          {paymentStatus === 'success' ? (
            <div className="py-8 text-center space-y-3 animate-fadeIn">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                পেমেন্ট সফল হয়েছে! 🎉
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                অভিনন্দন! আপনার সাবস্ক্রিপশন সফলভাবে অ্যাক্টিভ করা হয়েছে। এখন থেকে আপনি সমস্ত প্রিমিয়াম ভিডিও, অপশন ট্রেডিং লেসন এবং সার্টিফিকেট আনলক করতে পারবেন।
              </p>
              <div className="pt-2 text-xs font-semibold text-emerald-600">
                কিছুক্ষণের মধ্যে রিডাইরেক্ট হচ্ছে...
              </div>
            </div>
          ) : (
            <>
              {/* Plan Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PLANS.filter((p) => p.id !== 'free').map((p) => {
                  const isSelected = selectedPlan === p.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => setSelectedPlan(p.id as any)}
                      className={`relative p-4 rounded-2xl cursor-pointer border-2 transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 shadow-md ring-2 ring-emerald-500/20'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 hover:border-slate-300'
                      }`}
                    >
                      {p.popular && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold shadow-sm">
                          {p.badge}
                        </span>
                      )}

                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-1">
                          {p.name}
                        </h4>
                        <div className="flex items-baseline gap-1 my-2">
                          <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                            ₹{p.price}
                          </span>
                          {p.originalPrice && (
                            <span className="text-xs text-slate-400 line-through">
                              ₹{p.originalPrice}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-3">
                          {p.duration}
                        </span>
                      </div>

                      <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
                        {p.features.slice(0, 3).map((f, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                            <span className="truncate">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Payment Methods */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                  <span>পেমেন্ট মাধ্যম নির্বাচন করুন:</span>
                  <span className="text-emerald-600 font-normal flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    নিরাপদ ও সুরক্ষিত
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                      paymentMethod === 'upi'
                        ? 'border-emerald-500 bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 shadow-sm'
                        : 'border-slate-200 dark:border-slate-750 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <Zap className="w-4 h-4 text-emerald-600" />
                    <span>UPI / GPay / PhonePe</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bkash')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                      paymentMethod === 'bkash'
                        ? 'border-pink-500 bg-white dark:bg-slate-800 text-pink-600 shadow-sm'
                        : 'border-slate-200 dark:border-slate-750 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                    <span>bKash (বিকাশ)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('nagad')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                      paymentMethod === 'nagad'
                        ? 'border-orange-500 bg-white dark:bg-slate-800 text-orange-600 shadow-sm'
                        : 'border-slate-200 dark:border-slate-750 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                    <span>Nagad (নগদ)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                      paymentMethod === 'card'
                        ? 'border-blue-500 bg-white dark:bg-slate-800 text-blue-600 shadow-sm'
                        : 'border-slate-200 dark:border-slate-750 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-blue-500" />
                    <span>কার্ড / নেট ব্যাংকিং</span>
                  </button>
                </div>
              </div>

              {/* Action Button & Disclaimer */}
              <div className="space-y-3">
                <button
                  onClick={handleProcessPayment}
                  disabled={isProcessing}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>পেমেন্ট প্রক্রিয়াধীন রয়েছে...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>₹{planDetails.price} টাকা পরিশোধ করে সম্পূর্ণ আনলক করুন</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-slate-500 dark:text-slate-400 leading-relaxed">
                  পেমেন্ট সংক্রান্ত কোনো সমস্যা হলে বা রিফান্ডের জন্য আমাদের বাংলা সাপোর্ট টিম ২৪ ঘণ্টার মধ্যে সহায়তা প্রদান করবে।
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
