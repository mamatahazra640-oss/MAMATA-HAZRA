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
  const [activeTab, setActiveTab] = useState<'pwa' | 'apk'>('pwa');

  // App URLs
  const currentAppUrl = window.location.href.split('?')[0].replace(/\/$/, '');
  const shareableUrl = currentAppUrl.includes('run.app') 
    ? currentAppUrl 
    : 'https://ais-pre-b2f52zow3st4ihfhqbwbfl-949110010761.asia-southeast1.run.app';

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
                অ্যান্ড্রয়েড ও মোবাইল গাইড
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">
                মোবাইলে SD Trading অ্যাপ / APK ইনস্টল করুন
              </h2>
            </div>
          </div>
          <p className="text-xs text-emerald-100/90 leading-relaxed max-w-xl">
            আপনার অ্যান্ড্রয়েড বা আইফোনে সরাসরি আসল অ্যাপ হিসেবে ইনস্টল করুন। কোনো থার্ড-পার্টি ক্ষতিকর সাইটে না গিয়ে সরাসরি নিরাপদ ও দ্রুত উপায়ে ফোনে পান।
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 px-4 pt-2">
          <button
            onClick={() => setActiveTab('pwa')}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'pwa'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>১-ক্লিকে ইনস্টল (WebAPK) - প্রস্তাবিত</span>
          </button>
          <button
            onClick={() => setActiveTab('apk')}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'apk'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>স্ট্যান্ডঅ্যালোন .APK ফাইল বিল্ড (Developers)</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {activeTab === 'pwa' ? (
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
                    এই লিঙ্কটি মোবাইলের <strong>Google Chrome</strong> ব্রাউজারে পাঠাতে পারেন (যেমন হোয়াটসঅ্যাপে বা ব্রাউজারে লিখে)।
                  </p>
                </div>
              </div>

              {/* Step-by-Step Guide */}
              <div className="space-y-3">
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                  <span>অ্যান্ড্রয়েড ফোনে ইনস্টল করার সহজ ৩টি ধাপ:</span>
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

              {/* Benefits of WebAPK */}
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 text-xs space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>কেন এটি সাধারণ APK ফাইলের চেয়ে বেশি নিরাপদ?</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  গুগলের অফিসিয়াল WebAPK টেকনোলজি নিশ্চিত করে যে আপনার ফোনে কোনো ভাইরাস বা ম্যালওয়্যার ঢুকবে না। অ্যাপটি স্বয়ংক্রিয়ভাবে আপডেট পাবে এবং কোনো অতিরিক্ত মেমোরি খরচ না করে অফলাইনেও চলবে।
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-600" />
                  <span>গুগল বাবলর‍্যাপ (Google Bubblewrap) দিয়ে ১-মিনিটে সরাসরি .APK ও .AAB তৈরি:</span>
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  গুগল তাদের ক্রোম ও অ্যান্ড্রয়েড টিমের মাধ্যমে <strong>Bubblewrap</strong> নামক অফিসিয়াল টুল সরবরাহ করে, যা যেকোনো PWA অ্যাপকে সরাসরি Google Play Store উপযোগী সাইন্ড <strong>.APK</strong> ও <strong>.AAB (Android App Bundle)</strong> ফাইলে রূপান্তর করে:
                </p>

                <div className="p-3 rounded-xl bg-slate-900 text-emerald-400 font-mono text-[11px] space-y-1.5 overflow-x-auto">
                  <div className="text-slate-500"># ১. Google Bubblewrap CLI ইনস্টল করুন:</div>
                  <div>npm install -g @bubblewrap/cli</div>
                  <div className="text-slate-500 pt-1"># ২. এই অ্যাপের ম্যানিফেস্ট দিয়ে প্রজেক্ট ইনিশিয়ালাইজ করুন:</div>
                  <div>bubblewrap init --manifest={shareableUrl}/manifest.webmanifest</div>
                  <div className="text-slate-500 pt-1"># ৩. সরাসরি APK বিল্ড করুন:</div>
                  <div>bubblewrap build</div>
                </div>

                <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                  ব্যাস! <code className="text-emerald-600 dark:text-emerald-400 font-mono">app-release-signed.apk</code> ফাইল তৈরি হয়ে যাবে যা আপনি যেকোনো অ্যান্ড্রয়েড মোবাইলে পেনড্রাইভ বা ব্লুটুথ দিয়ে দিয়ে ইনস্টল করতে পারবেন।
                </p>
              </div>

              {/* Method 2: Android Studio / Capacitor */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span>পদ্ধতি ২: সোর্স কোড এক্সপোর্ট ও Android Studio (Capacitor):</span>
                </h4>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  <li>AI Studio-র উপরের ডানদিকের সেটিংস ড্রপডাউন থেকে <strong>Export to ZIP</strong> বা <strong>Export to GitHub</strong> এ ক্লিক করুন।</li>
                  <li>আপনার কম্পিউটারে ফোল্ডারটি ওপেন করে টার্মিনালে চালান:
                    <code className="block mt-1 p-2 rounded bg-slate-900 text-emerald-400 font-mono text-[10px]">
                      npm install<br />
                      npm install @capacitor/core @capacitor/android<br />
                      npx cap init "SD Trading" "com.sdtrading.learning"<br />
                      npm run build<br />
                      npx cap add android<br />
                      npx cap open android
                    </code>
                  </li>
                  <li>Android Studio খুললে <strong>Build &gt; Build Bundle(s) / APK(s) &gt; Build APK(s)</strong> চাপলেই তৈরি হয়ে যাবে আপনার সম্পূর্ণ নিজস্ব APK ফাইল!</li>
                </ol>
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
