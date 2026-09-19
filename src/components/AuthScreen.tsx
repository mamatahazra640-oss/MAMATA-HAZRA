import React, { useState } from 'react';
import { 
  Lock, User, Mail, Phone, Eye, EyeOff, LogIn, UserPlus, 
  TrendingUp, ShieldCheck, Sparkles, CheckCircle2, AlertCircle, 
  ArrowRight, KeyRound 
} from 'lucide-react';
import { AuthUser, UserProfile } from '../types';

interface AuthScreenProps {
  onLoginSuccess: (user: AuthUser) => void;
  registeredUsers: AuthUser[];
  onRegisterUser: (newUser: AuthUser) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  onLoginSuccess,
  registeredUsers,
  onRegisterUser,
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  // Login form state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Register form state
  const [regName, setRegName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPhoneOrEmail, setRegPhoneOrEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regError, setRegError] = useState<string | null>(null);
  const [regSuccess, setRegSuccess] = useState<string | null>(null);

  // Handle Login Submit
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const cleanUsername = loginUsername.trim().toLowerCase();
    const cleanPassword = loginPassword.trim();

    if (!cleanUsername || !cleanPassword) {
      setLoginError('দয়া করে ইউজারনেম এবং পাসওয়ার্ড উভয়ই পূরণ করুন।');
      return;
    }

    // Find user in registered list (match username, email, or phone)
    const matchedUser = registeredUsers.find(
      (u) => 
        (u.username.toLowerCase() === cleanUsername || 
         u.email.toLowerCase() === cleanUsername || 
         u.phone.replace(/\s+/g, '') === cleanUsername.replace(/\s+/g, '')) &&
        u.passwordHash === cleanPassword
    );

    if (matchedUser) {
      onLoginSuccess(matchedUser);
    } else {
      setLoginError('ভুল ইউজারনেম বা পাসওয়ার্ড! অনুগ্রহ করে সঠিক তথ্য দিন অথবা নতুন একাউন্ট তৈরি করুন।');
    }
  };

  // Quick Demo Login Helper
  const handleQuickDemo = (demoUsername: string, demoPass: string) => {
    setLoginUsername(demoUsername);
    setLoginPassword(demoPass);
    setLoginError(null);
    const matchedUser = registeredUsers.find(
      (u) => u.username.toLowerCase() === demoUsername.toLowerCase() && u.passwordHash === demoPass
    );
    if (matchedUser) {
      onLoginSuccess(matchedUser);
    }
  };

  // Handle Register Submit
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);
    setRegSuccess(null);

    const cleanName = regName.trim();
    const cleanUsername = regUsername.trim().toLowerCase().replace(/\s+/g, '_');
    const cleanContact = regPhoneOrEmail.trim();
    const cleanPassword = regPassword.trim();
    const cleanConfirm = regConfirmPassword.trim();

    if (!cleanName || !cleanUsername || !cleanPassword) {
      setRegError('সবগুলো আবশ্যক তথ্য (নাম, ইউজারনেম ও পাসওয়ার্ড) পূরণ করুন।');
      return;
    }

    if (cleanUsername.length < 3) {
      setRegError('ইউজারনেম অন্তত ৩ অক্ষরের হতে হবে।');
      return;
    }

    if (cleanPassword.length < 4) {
      setRegError('পাসওয়ার্ডটি অন্তত ৪ অক্ষরের দিন।');
      return;
    }

    if (cleanPassword !== cleanConfirm) {
      setRegError('উভয় পাসওয়ার্ড হুবহু মিলছে না। অনুগ্রহ করে যাচাই করুন।');
      return;
    }

    // Check if username already exists
    const exists = registeredUsers.some(
      (u) => u.username.toLowerCase() === cleanUsername
    );

    if (exists) {
      setRegError(`'${cleanUsername}' ইউজারনেমটি আগে থেকেই নিবন্ধিত। দয়া করে অন্য একটি নাম দিন।`);
      return;
    }

    // Determine if phone or email
    const isEmail = cleanContact.includes('@');
    const emailVal = isEmail ? cleanContact : `${cleanUsername}@sdtrading.com`;
    const phoneVal = !isEmail && cleanContact ? cleanContact : '+৯১ ৯৮৭৬৫ ৪৩২১০';

    const newProfile: UserProfile = {
      name: cleanName,
      email: emailVal,
      phone: phoneVal,
      avatarUrl: '',
      isPremium: false,
      completedLessonIds: [],
      bookmarkedLessonIds: [],
      quizResults: [],
      joinedDate: new Date().toLocaleDateString('bn-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    };

    const newUser: AuthUser = {
      id: `user-${Date.now()}`,
      username: cleanUsername,
      passwordHash: cleanPassword,
      name: cleanName,
      email: emailVal,
      phone: phoneVal,
      role: 'student',
      createdAt: new Date().toISOString(),
      profile: newProfile,
    };

    onRegisterUser(newUser);
    setRegSuccess('অভিনন্দন! আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে। স্বয়ংক্রিয়ভাবে প্রবেশ করানো হচ্ছে...');
    setTimeout(() => {
      onLoginSuccess(newUser);
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-slate-950 relative overflow-hidden font-sans">
      {/* Background glowing effects */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-teal-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-900/50 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container Card */}
      <div className="relative w-full max-w-lg bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl shadow-black/80 overflow-hidden z-10">
        {/* Brand Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-b from-slate-800/90 to-transparent border-b border-slate-800/80 text-center relative">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 shadow-xl shadow-emerald-600/30 text-white mb-3">
            <TrendingUp className="w-9 h-9" />
          </div>

          <div className="inline-block">
            <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-2 inline-flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              বাংলা ট্রেডিং একাডেমি
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            SD Trading Learning
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
            শেয়ার মার্কেট ও ট্রেডিং শেখার জন্য আপনার ইউজারনেম ও পাসওয়ার্ড দিয়ে লগইন করুন।
          </p>
        </div>

        {/* Tab switcher: Login vs Register */}
        <div className="grid grid-cols-2 p-1.5 mx-6 mt-6 bg-slate-950/80 rounded-2xl border border-slate-800/80">
          <button
            type="button"
            onClick={() => {
              setActiveTab('login');
              setLoginError(null);
            }}
            className={`py-2.5 text-xs sm:text-sm font-bold rounded-xl transition flex items-center justify-center gap-2 ${
              activeTab === 'login'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>লগইন করুন</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('register');
              setRegError(null);
            }}
            className={`py-2.5 text-xs sm:text-sm font-bold rounded-xl transition flex items-center justify-center gap-2 ${
              activeTab === 'register'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>নতুন অ্যাকাউন্ট</span>
          </button>
        </div>

        {/* Body Form */}
        <div className="p-6 sm:p-8 pt-6">
          {activeTab === 'login' ? (
            /* Login Form */
            <form onSubmit={handleLogin} className="space-y-4">
              {loginError && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 animate-shake">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-400" />
                  <span className="leading-relaxed">{loginError}</span>
                </div>
              )}

              {/* Username field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>ইউজারনেম / ইমেইল / মোবাইল</span>
                  <span className="text-[10px] text-slate-500 font-normal">যেমন: demo বা আপনার ইউজারনেম</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    placeholder="ইউজারনেম লিখুন (যেমন: demo)"
                    className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>পাসওয়ার্ড</span>
                  <span className="text-[10px] text-slate-500 font-normal">ডেমো পাসওয়ার্ড: 123456</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="পাসওয়ার্ড লিখুন"
                    className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300"
                    title={showLoginPassword ? 'লুকান' : 'দেখুন'}
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-bold shadow-lg shadow-emerald-900/40 transition flex items-center justify-center gap-2 mt-2"
              >
                <LogIn className="w-4 h-4" />
                <span>লগইন করুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Quick Demo Login Option */}
              <div className="pt-4 border-t border-slate-800/80">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <KeyRound className="w-3 h-3 text-amber-400" />
                    দ্রুত ডেমো অ্যাকাউন্টে প্রবেশ:
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('demo', '123456')}
                    className="p-2.5 rounded-xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/70 text-left transition group"
                  >
                    <div className="text-xs font-bold text-slate-200 group-hover:text-emerald-400 flex items-center gap-1.5">
                      <span>👤 শিক্ষার্থী ডেমো</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                      demo / 123456
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemo('admin', 'admin123')}
                    className="p-2.5 rounded-xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/70 text-left transition group"
                  >
                    <div className="text-xs font-bold text-slate-200 group-hover:text-emerald-400 flex items-center gap-1.5">
                      <span>👑 অ্যাডমিন ডেমো</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                      admin / admin123
                    </div>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* Registration Form */
            <form onSubmit={handleRegister} className="space-y-3.5">
              {regError && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-400" />
                  <span className="leading-relaxed">{regError}</span>
                </div>
              )}

              {regSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-400" />
                  <span className="leading-relaxed">{regSuccess}</span>
                </div>
              )}

              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  আপনার পুরো নাম *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="যেমন: অনিক রায় বা রাহুল শর্মা"
                    className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                  />
                </div>
              </div>

              {/* Desired Username */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>ইউজারনেম (Username) *</span>
                  <span className="text-[10px] text-slate-500 font-normal">লগইন করার আইডি</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    placeholder="যেমন: sourav_99 বা আপনার নাম"
                    className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                  />
                </div>
              </div>

              {/* Phone or Email */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  মোবাইল নম্বর অথবা ইমেইল (ঐচ্ছিক)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={regPhoneOrEmail}
                    onChange={(e) => setRegPhoneOrEmail(e.target.value)}
                    placeholder="যেমন: 017xxxxxxxx বা ইমেইল"
                    className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">
                    পাসওয়ার্ড *
                  </label>
                  <div className="relative">
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="কমপক্ষে ৪ অক্ষর"
                      className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">
                    পাসওয়ার্ড নিশ্চিত করুন *
                  </label>
                  <div className="relative">
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      required
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="পুনরায় লিখুন"
                      className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-400 hover:text-slate-300">
                  <input
                    type="checkbox"
                    checked={showRegPassword}
                    onChange={(e) => setShowRegPassword(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-900 text-emerald-600 focus:ring-0"
                  />
                  <span>পাসওয়ার্ড দেখুন</span>
                </label>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-bold shadow-lg shadow-emerald-900/40 transition flex items-center justify-center gap-2 mt-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>নতুন অ্যাকাউন্ট খুলুন ও শুরু করুন</span>
              </button>
            </form>
          )}
        </div>

        {/* Footer Guarantee */}
        <div className="p-4 bg-slate-950/90 border-t border-slate-800 text-center">
          <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>১০০% নিরাপদ ও সুরক্ষিত বাংলা ট্রেডিং প্ল্যাটফর্ম</span>
          </div>
        </div>
      </div>
    </div>
  );
};
