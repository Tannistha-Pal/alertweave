import React, { useState } from 'react';
import { Shield, Sparkles, Send, CheckCircle, Lock, User, Mail, Key, KeyRound, Clock, Settings, LogOut, Check, ArrowLeft } from 'lucide-react';
import UserProfileView from './UserProfileView';

interface AuthViewProps {
  userEmail: string;
  isLoggedIn: boolean;
  onLoginSuccess: () => void;
  onLogout: () => void;
  onUpdateEmail: (email: string) => void;
  onBack?: () => void;
}

export default function AuthView({ userEmail, isLoggedIn, onLoginSuccess, onLogout, onUpdateEmail, onBack }: AuthViewProps) {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot' | 'otp' | 'reset' | 'profile'>('login');
  const [emailInput, setEmailInput] = useState(userEmail || 'senabby420@gmail.com');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [profileUpdated, setProfileUpdated] = useState(false);

  // If already logged in, show the comprehensive user profile page directly
  if (isLoggedIn) {
    return (
      <UserProfileView 
        userEmail={userEmail}
        onLogout={onLogout}
        onUpdateEmail={onUpdateEmail}
        onBack={onBack}
      />
    );
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !password) return;
    // Enter OTP screen for secure Multi-Factor Authentication (MFA) bypass simulation!
    setMode('otp');
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful login!
    onLoginSuccess();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setMode('otp');
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    setMode('otp');
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setMode('login');
  };

  const handleOtpValueChange = (idx: number, val: string) => {
    if (val.length > 1) return;
    const newOtp = [...otpCode];
    newOtp[idx] = val;
    setOtpCode(newOtp);

    // Auto-focus next input
    if (val && idx < 5) {
      const nextInput = document.getElementById(`otp-input-${idx + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="min-h-[580px] flex items-center justify-center py-6 px-4 relative overflow-hidden">
      
      {/* Background visual graphics */}
      <div className="absolute inset-0 bg-slate-950/40 pointer-events-none rounded-2xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyber-purple/5 rounded-full blur-[80px] pointer-events-none" />

      {/* INNER COCKPIT SHELL */}
      <div className="glass-panel max-w-md w-full rounded-2xl border border-white/10 p-6 md:p-8 space-y-6 shadow-2xl relative">
        
        {onBack && (
          <button
            onClick={onBack}
            className="absolute top-4 left-4 p-1.5 bg-slate-900 hover:bg-slate-800 rounded-lg border border-white/5 text-cyber-blue hover:text-white transition-all flex items-center justify-center cursor-pointer active:scale-95"
            title="Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}
        
        {/* Dynamic header depending on authorization state */}
        <div className="text-center space-y-2">
          <div className="relative w-12 h-12 bg-gradient-to-tr from-cyber-blue to-cyber-purple rounded-xl flex items-center justify-center shadow-lg mx-auto mb-4">
            <Shield className="w-6 h-6 text-slate-950" />
            <div className="absolute -inset-0.5 rounded-xl bg-cyber-blue/40 blur opacity-30" />
          </div>

          <h2 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight uppercase font-display">
            {mode === 'login' && 'Authorize Session'}
            {mode === 'register' && 'Enroll Domain Account'}
            {mode === 'forgot' && 'Reset Session Tokens'}
            {mode === 'otp' && 'OTP Multi-Factor Core'}
            {mode === 'reset' && 'Confirm Session Token'}
            {mode === 'profile' && 'Authorized Session'}
          </h2>
          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            {mode === 'login' && 'RESTRICTED TO ENROLLED IDENTITY DIRECTORIES'}
            {mode === 'register' && 'GENERATE SECURITY CERTIFICATE TOKENS'}
            {mode === 'forgot' && 'MFA CONFIRMATION RE-SYNCHRONIZER'}
            {mode === 'otp' && 'SECURE SYSTEM VERIFICATION CODES'}
            {mode === 'reset' && 'UPDATE CRYPTOGRAPHIC ACCOUNT PASSWORDS'}
            {mode === 'profile' && 'ACTIVE CONSOLE SESSION PROPERTIES'}
          </p>
        </div>

        {/* LOGIN MODE FORM */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4 font-mono text-xs text-left">
            <div className="space-y-1">
              <label className="block text-slate-400">CORPORATE EMAIL PRINCIPAL *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="email" 
                  required
                  placeholder="e.g. analyst@alertweave.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-white/5 rounded-xl text-white focus:outline-none focus:border-cyber-blue font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center text-[10px]">
                <label className="text-slate-400 uppercase">SESSION PASSWORD *</label>
                <button 
                  type="button" 
                  onClick={() => setMode('forgot')}
                  className="text-cyber-blue hover:underline"
                >
                  FORGOT TOKEN?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-white/5 rounded-xl text-white focus:outline-none focus:border-cyber-blue font-mono"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyber-blue to-cyber-purple text-slate-950 font-bold rounded-xl hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Request Access Token
            </button>

            <div className="text-center pt-2 text-[11px]">
              <span className="text-slate-500">Not enrolled yet? </span>
              <button 
                type="button" 
                onClick={() => setMode('register')}
                className="text-cyber-blue hover:underline font-bold"
              >
                Enroll Node
              </button>
            </div>
          </form>
        )}

        {/* REGISTER MODE FORM */}
        {mode === 'register' && (
          <form onSubmit={handleRegister} className="space-y-4 font-mono text-xs text-left">
            <div className="space-y-1">
              <label className="block text-slate-400">ANALYST FULL NAME *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Dr. Helen Vance"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-white/5 rounded-xl text-white focus:outline-none focus:border-cyber-blue"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-slate-400">CORPORATE EMAIL PRINCIPAL *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="email" 
                  required
                  placeholder="e.g. helen.vance@alertweave.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-white/5 rounded-xl text-white focus:outline-none focus:border-cyber-blue"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyber-blue to-cyber-purple text-slate-950 font-bold rounded-xl hover:shadow-[0_0_15px_rgba(139,92,246,0.4)] transition-all flex items-center justify-center gap-2"
            >
              Register Domain Account
            </button>

            <div className="text-center pt-2 text-[11px]">
              <span className="text-slate-500">Already authorized? </span>
              <button 
                type="button" 
                onClick={() => setMode('login')}
                className="text-cyber-blue hover:underline font-bold"
              >
                Sign In
              </button>
            </div>
          </form>
        )}

        {/* FORGOT PASSWORD FORM */}
        {mode === 'forgot' && (
          <form onSubmit={handleForgot} className="space-y-4 font-mono text-xs text-left">
            <p className="text-slate-400 text-[11px] leading-relaxed text-center">
              Provide your enrolled corporate identity email below. If verified in Active Directory, we will broadcast a multi-factor session validation code.
            </p>

            <div className="space-y-1">
              <label className="block text-slate-400">CORPORATE EMAIL *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="email" 
                  required
                  placeholder="e.g. helen.vance@alertweave.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-white/5 rounded-xl text-white focus:outline-none focus:border-cyber-blue"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-3 bg-cyber-blue text-slate-950 font-bold rounded-xl hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-all flex items-center justify-center gap-2"
            >
              Verify Identity Email
            </button>

            <button 
              type="button" 
              onClick={() => setMode('login')}
              className="w-full py-2 bg-slate-900 border border-white/5 text-slate-400 hover:text-white rounded-xl text-center"
            >
              Back to Authorization
            </button>
          </form>
        )}

        {/* OTP VERIFICATION MODE */}
        {mode === 'otp' && (
          <form onSubmit={handleOtpSubmit} className="space-y-6 font-mono text-xs text-center">
            <p className="text-slate-400 text-[11px] leading-relaxed max-w-xs mx-auto">
              We broadcasted a 6-digit session verification key to <strong className="text-white">{emailInput}</strong>. Confirm passcode below.
            </p>

            {/* OTP input sequence boxes */}
            <div className="flex justify-between items-center gap-2 max-w-sm mx-auto">
              {otpCode.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-input-${idx}`}
                  type="text"
                  maxLength={1}
                  required
                  value={digit}
                  onChange={(e) => handleOtpValueChange(idx, e.target.value)}
                  className="w-10 h-12 bg-slate-950 border-2 border-white/10 rounded-xl text-center text-lg font-bold font-mono text-cyber-blue focus:outline-none focus:border-cyber-blue focus:shadow-[0_0_10px_rgba(0,229,255,0.2)]"
                />
              ))}
            </div>

            <div className="text-[10px] text-slate-500 flex items-center justify-center gap-1.5 font-mono">
              <Clock className="w-3.5 h-3.5" />
              <span>Token expires in 04:32</span>
            </div>

            <button 
              type="submit"
              className="w-full py-3 bg-cyber-purple text-white font-bold rounded-xl hover:shadow-[0_0_15px_rgba(139,92,246,0.4)] transition-all flex items-center justify-center gap-2"
            >
              Confirm OTP and Enter
            </button>

            <button 
              type="button" 
              onClick={() => setMode('login')}
              className="w-full py-2 bg-slate-900 border border-white/5 text-slate-400 hover:text-white rounded-xl text-center"
            >
              Cancel Login
            </button>
          </form>
        )}

        {/* ACTIVE PROFILE/SETTINGS STATE IN THE COCKPIT */}
        {mode === 'profile' && (
          <div className="space-y-6 text-left text-xs font-mono">
            {profileUpdated && (
              <div className="p-3 bg-cyber-green/10 border border-cyber-green/30 text-cyber-green rounded-xl flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Sensor integration token rolled over</span>
              </div>
            )}

            <div className="space-y-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-white/5 space-y-2">
                <span className="block text-[9px] text-slate-500 uppercase">ACTIVE ANALYST PROFILE</span>
                <span className="block text-white font-bold text-sm truncate">{emailInput}</span>
                <span className="block text-[9px] text-cyber-blue font-bold">DIRECTORY ACCESS: GLOBAL_ADMIN</span>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-white/5 space-y-3">
                <span className="block text-[9px] text-slate-500 uppercase">SECURITY INTEGRATION SECRET KEYS</span>
                <div className="space-y-1 text-[10px]">
                  <span className="text-slate-500 block">LOCAL SENSOR TOKEN:</span>
                  <p className="text-cyber-green font-bold truncate bg-slate-900 p-1.5 rounded select-all font-mono">
                    aw_live_9042b10098a58f921d3e2d8479e
                  </p>
                </div>
                <button 
                  onClick={() => {
                    setProfileUpdated(true);
                    setTimeout(() => setProfileUpdated(false), 3000);
                  }}
                  className="w-full py-1.5 bg-slate-900 hover:bg-slate-800 rounded border border-white/5 text-slate-400 hover:text-white transition-colors text-[10px]"
                >
                  Regenerate Active Secret Token
                </button>
              </div>
            </div>

            <button 
              onClick={() => setMode('login')}
              className="w-full py-3 bg-cyber-red/15 hover:bg-cyber-red text-cyber-red hover:text-slate-950 border border-cyber-red/20 font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Terminate Active Session
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
