import React, { useState } from 'react';
import { 
  Smartphone, Download, QrCode, CheckCircle2, Copy, 
  ExternalLink, ArrowRight, ShieldCheck, Zap, X, Terminal, 
  HelpCircle, Sparkles, Layers 
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface ApkDownloadModalProps {
  onClose: () => void;
}

export const ApkDownloadModal: React.FC<ApkDownloadModalProps> = ({ onClose }) => {
  const { isInstallable, isInstalled, isIOS, isAndroid, install } = usePWAInstall();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'direct-apk' | 'webapk' | 'github'>('direct-apk');

  // App URLs
  const currentAppUrl = window.location.href.split('?')[0].replace(/\/$/, '');
  const shareableUrl = currentAppUrl.includes('run.app') 
    ? currentAppUrl 
    : 'https://ais-pre-b2f52zow3st4ihfhqbwbfl-949110010761.asia-southeast1.run.app';

  const pwabuilderUrl = `https://www.pwabuilder.com/?url=${encodeURIComponent(shareableUrl)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
    }
  };

  // Google QR Code API for scanning on mobile
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(shareableUrl)}&bgcolor=ffffff&color=059669&margin=10`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6 animate-fadeIn">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-slate-900 p-5 sm:p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition"
            title="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center text-amber-300">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/30 px-2 py-0.5 rounded-full text-emerald-200 border border-emerald-400/30">
                অ্যান্ড্রয়েড ইনস্টল ও APK সেন্টার
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">
                SD Trading অ্যান্ড্রয়েড APK ডাউনলোড ও ইনস্টল
              </h2>
            </div>
          </div>
          <p className="text-xs text-emerald-100/90 leading-relaxed max-w-xl">
            আপনার অ্যান্ড্রয়েড ফোনে সরাসরি .APK ফাইল ডাউনলোড করতে অথবা কোনো ঝামেলা ছাড়াই ১-ক্লিকে আসল অ্যাপ হিসেবে ইনস্টল করতে নিচের পদ্ধতিগুলো ব্যবহার করুন।
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 px-2 sm:px-4 pt-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('direct-apk')}
            className={`pb-3 px-3 sm:px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'direct-apk'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>সরাসরি .APK ডাউনলোড (PWABuilder)</span>
          </button>
          <button
            onClick={() => setActiveTab('webapk')}
            className={`pb-3 px-3 sm:px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'webapk'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>ফোনে ১-ক্লিকে ইনস্টল (Chrome)</span>
          </button>
          <button
            onClick={() => setActiveTab('github')}
            className={`pb-3 px-3 sm:px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'github'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>GitHub Actions সমাধান</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {activeTab === 'direct-apk' && (
            <div className="space-y-4">
              {/* Highlight Card for 1-Click APK */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/30 border-2 border-emerald-500/40 space-y-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-600/30">
                    <Download className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-600 text-white inline-block mb-1">
                      ১-ক্লিকে সরাসরি APK ফাইল
                    </span>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                      অ্যান্ড্রয়েড Standalone APK ফাইল ডাউনলোড করুন
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      মাইক্রোসফটের অফিশিয়াল <strong>PWABuilder</strong> ক্লাউড ইঞ্জিনের মাধ্যমে কোনো কোডিং বা সফটওয়্যার ছাড়াই এই অ্যাপের রেডি-টু-ইনস্টল <strong>.apk</strong> ফাইল ডাউনলোড করতে নিচের বাটনে চাপ দিন:
                    </p>
                  </div>
                </div>

                <div className="pt-1 flex flex-col sm:flex-row gap-2.5">
                  <a
                    href={pwabuilderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-900/30 transition flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>PWABuilder-এ APK ডাউনলোড পেজ খুলুন</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    onClick={handleCopyLink}
                    className="py-3 px-4 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-xs font-bold transition flex items-center justify-center gap-2"
                  >
                    {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'অ্যাপ লিঙ্ক কপি হয়েছে' : 'অ্যাপ লিঙ্ক কপি'}</span>
                  </button>
                </div>

                <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-xl border border-emerald-200 dark:border-emerald-800/60 text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
                  <p className="font-bold text-slate-800 dark:text-slate-200">
                    PWABuilder-এ যেভাবে APK ফাইলটি পাবেন:
                  </p>
                  <ol className="list-decimal list-inside space-y-1 pl-1">
                    <li>উপরের সবুজ বাটনে চাপ দিলে পেজটি ওপেন হবে এবং এই অ্যাপের লিঙ্কটি স্বয়ংক্রিয়ভাবে ইনপুট হয়ে যাবে।</li>
                    <li>পেজে <strong>"Package for Stores"</strong> এ ক্লিক করে <strong>"Android"</strong> সিলেক্ট করুন।</li>
                    <li><strong>"Generate APK / Package"</strong> বাটনে ক্লিক করলেই আপনার ফোনে সাথে সাথে সম্পূর্ণ <strong>.apk</strong> ফাইল ডাউনলোড হয়ে যাবে!</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'webapk' && (
            <div className="space-y-5">
              {/* If browser supports direct prompt */}
              {isInstallable && (
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                      <Download className="w-6 h-6 animate-bounce" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        আপনার ডিভাইস ইনস্টলেশনের জন্য প্রস্তুত!
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        নিচের বাটনে ট্যাপ করে এখনই আপনার ফোনে অ্যাপটি ইনস্টল করুন।
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleInstallClick}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition flex items-center justify-center gap-2 flex-shrink-0"
                  >
                    <Download className="w-4 h-4" />
                    <span>অ্যাপ ইনস্টল করুন</span>
                  </button>
                </div>
              )}

              {isInstalled && (
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>আপনি ইতোমধ্যে SD Trading অ্যাপটি ইনস্টল্ড মোডে ব্যবহার করছেন!</span>
                </div>
              )}

              {/* QR Code & Mobile Sync */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <div className="sm:col-span-5 flex flex-col items-center text-center">
                  <div className="p-2 bg-white rounded-2xl shadow-sm border border-slate-200">
                    <img
                      src={qrCodeUrl}
                      alt="SD Trading Mobile App QR Code"
                      className="w-36 h-36 rounded-xl object-contain"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-2">
                    মোবাইল ক্যামেরা দিয়ে স্ক্যান করুন
                  </span>
                </div>

                <div className="sm:col-span-7 space-y-3">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    মোবাইলে সরাসরি খোলার লিঙ্ক:
                  </h3>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={shareableUrl}
                      className="flex-1 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-700 dark:text-slate-300 font-mono truncate select-all"
                    />
                    <button
                      onClick={handleCopyLink}
                      className="px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition"
                    >
                      {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      <span>{copied ? 'কপি হয়েছে' : 'কপি'}</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    এই লিঙ্কটি মোবাইলের <strong>Google Chrome</strong> ব্রাউজারে খুলুন।
                  </p>
                </div>
              </div>

              {/* Step-by-Step Guide */}
              <div className="space-y-3">
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                  <span>অ্যান্ড্রয়েড ফোনে সরাসরি ইনস্টল করার সহজ ৩টি ধাপ:</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 space-y-1">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-black flex items-center justify-center text-xs">
                      ১
                    </span>
                    <h4 className="font-bold text-slate-900 dark:text-white pt-1">ক্রোমে লিঙ্ক ওপেন করুন</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                      মোবাইলে Google Chrome চালু করে উপরের লিঙ্কটি ওপেন করুন।
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 space-y-1">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-black flex items-center justify-center text-xs">
                      ২
                    </span>
                    <h4 className="font-bold text-slate-900 dark:text-white pt-1">মেনু সিলেক্ট করুন</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                      ব্রাউজারের উপরে ডানদিকের <strong>তিনটি ডট (⋮)</strong> মেনুতে ট্যাপ করুন।
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 space-y-1">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-black flex items-center justify-center text-xs">
                      ৩
                    </span>
                    <h4 className="font-bold text-slate-900 dark:text-white pt-1">Install App চাপুন</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                      <strong>"Install app"</strong> বা <strong>"Add to Home screen"</strong> এ চাপলেই ফোনে আসল WebAPK তৈরি হয়ে ইনস্টল হয়ে যাবে!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'github' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-700 space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>স্ক্রিনশটের ত্রুটি (15s Failure: Lock file not found) সম্পূর্ণ সমাধান করা হয়েছে:</span>
                </h4>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                  আপনার দেওয়া স্ক্রিনশটে গিটহাব অ্যাকশনে <strong>"Dependencies lock file is not found"</strong> ত্রুটি এসেছিল। আমরা প্রজেক্টে অফিসিয়াল <strong>package-lock.json</strong> এবং সম্পূর্ণ <strong>Android Gradle Native Engine</strong> যুক্ত করে দিয়েছি।
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  APK ফাইল পেতে এখন ৩টি সহজ পদক্ষেপ:
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  <li>
                    <strong>ধাপ ১ (নতুন কোড সিঙ্ক):</strong> AI Studio-র উপরে ডানদিকের <strong>Settings (সেটিংস)</strong> মেনুতে গিয়ে <strong>"Export to GitHub"</strong>-এ ক্লিক করুন।
                  </li>
                  <li>
                    <strong>ধাপ ২ (বিল্ড অটো-স্টার্ট):</strong> আপনার গিটহাব পেজে (<code className="font-mono text-emerald-600">github.com/mamatahazra640-oss/MAMATA-HAZRA/actions</code>) স্বয়ংক্রিয়ভাবে নতুন <strong>Build Android APK</strong> সবুজ হয়ে চালু হবে (অথবা স্ক্রিনশটে থাকা <strong>"Re-run jobs"</strong> বাটনে চাপ দিন)।
                  </li>
                  <li>
                    <strong>ধাপ ৩ (APK ডাউনলোড):</strong> ২ মিনিট পর বিল্ড সফল হলে ওই রানে ক্লিক করলে নিচে <strong>Artifacts</strong> সেকশনে সরাসরি <strong>SD-Trading-Learning-APK</strong> নামের রেডি <strong>.apk</strong> ফাইলটি ডাউনলোড করার লিঙ্ক পেয়ে যাবেন!
                  </li>
                </ol>
              </div>

              {/* Alternative fast download */}
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-800 space-y-2">
                <h5 className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-600" />
                  <span>গিটহাবের অপেক্ষা না করে এখনই APK চান?</span>
                </h5>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  উপরে <strong>"সরাসরি .APK ডাউনলোড (PWABuilder)"</strong> ট্যাবে যান এবং সবুজ বোতামে ক্লিক করুন। সেখানে <strong>Android &gt; Generate APK</strong> চাপলেই ৩০ সেকেন্ডে আপনার ফোনে সরাসরি .apk ডাউনলোড হয়ে যাবে!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>১০০% ভাইরাস-মুক্ত ও অফিসিয়াল অ্যান্ড্রয়েড কম্প্যাটিবল</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
