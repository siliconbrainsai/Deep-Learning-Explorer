import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  User, 
  X, 
  Terminal, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  Cpu 
} from 'lucide-react';

export default function SecurityAuthModal({ isOpen, onClose, onAuthenticate, isAuthenticated, t, lang }) {
  const [operatorId, setOperatorId] = useState('');
  const [token, setToken] = useState('');
  const [authSuccess, setAuthSuccess] = useState(false);

  if (!isOpen) return null;

  const sec = t.security || {};

  const handleAutofillAnalyst = () => {
    setOperatorId('analyst-07@siliconbrainsai.mil');
    setToken('SB-DEF-LEVEL4-SECURE-9042');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthSuccess(true);
    setTimeout(() => {
      onAuthenticate(true);
      onClose();
    }, 900);
  };

  const handleInstantGuest = () => {
    setOperatorId('guest-evaluator@defense.labs');
    setToken('SB-EVAL-SANDBOX-PASS');
    setAuthSuccess(true);
    setTimeout(() => {
      onAuthenticate(true);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-lg glass-panel-glow rounded-3xl border border-indigo-500/40 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <Lock className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold text-teal-400 tracking-wider">
                {sec.protocol || "SECURE ACCESS PROTOCOL // LEVEL-4"}
              </div>
              <h3 className="text-base sm:text-lg font-black text-white">
                {sec.status || "AUTHENTICATOR ACTIVE"}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {authSuccess ? (
          <div className="py-8 text-center space-y-3 animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="font-mono text-sm font-bold text-emerald-300">
              AUTHENTICATION SUCCESSFUL
            </div>
            <p className="text-xs text-slate-400 font-mono">
              {sec.clearanceMsg || "Operator Clearance Granted: Level-4 Top Secret / Academic Lab Access."}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* SSO Providers */}
            <div className="space-y-2">
              <div className="text-[10px] font-mono uppercase text-slate-400">
                Single Sign-On (SSO):
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleInstantGuest}
                  className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center justify-center space-x-2 transition-all hover:border-slate-700"
                >
                  <span>🐙</span>
                  <span className="truncate">{sec.githubSSO || "GitHub SSO"}</span>
                </button>
                <button
                  type="button"
                  onClick={handleInstantGuest}
                  className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center justify-center space-x-2 transition-all hover:border-slate-700"
                >
                  <span>🌐</span>
                  <span className="truncate">{sec.googleSSO || "Google SSO"}</span>
                </button>
              </div>
            </div>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="flex-shrink mx-2 text-[10px] text-slate-500 uppercase font-mono">Or Operator Credentials</span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>

            {/* Operator ID */}
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-slate-300 flex items-center space-x-1.5">
                <User className="w-3 h-3 text-indigo-400" />
                <span>{sec.operatorIdLabel || "Operator ID / Corporate Email"}</span>
              </label>
              <input
                type="text"
                required
                value={operatorId}
                onChange={(e) => setOperatorId(e.target.value)}
                placeholder="operator@siliconbrainsai.mil"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Access Key / Token */}
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-slate-300 flex items-center space-x-1.5">
                <Key className="w-3 h-3 text-teal-400" />
                <span>{sec.tokenLabel || "Access Key / Cryptographic Token"}</span>
              </label>
              <input
                type="password"
                required
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="SB-DEF-••••••••••••"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            {/* Quick Autofill Buttons for Evaluators */}
            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <button
                type="button"
                onClick={handleAutofillAnalyst}
                className="flex-1 px-3 py-1.5 rounded-xl bg-indigo-950/40 hover:bg-indigo-900/50 border border-indigo-500/30 text-[11px] font-mono text-indigo-300 transition-colors flex items-center justify-center space-x-1"
              >
                <Sparkles className="w-3 h-3 text-indigo-400" />
                <span>{sec.autofillBtn || "Autofill Analyst"}</span>
              </button>
              <button
                type="button"
                onClick={handleInstantGuest}
                className="flex-1 px-3 py-1.5 rounded-xl bg-teal-950/40 hover:bg-teal-900/50 border border-teal-500/30 text-[11px] font-mono text-teal-300 transition-colors flex items-center justify-center space-x-1"
              >
                <Zap className="w-3 h-3 text-teal-400" />
                <span>{sec.guestBtn || "Guest Sandbox"}</span>
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all active:scale-[0.99]"
            >
              {sec.loginBtn || "Authenticate Session"}
            </button>

          </form>
        )}

      </div>
    </div>
  );
}
