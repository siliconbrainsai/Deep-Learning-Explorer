import React from 'react';
import { ShieldCheck, Radio, Volume2, Globe, Lock, Brain, Terminal } from 'lucide-react';
import AudioButton from '../AudioButton';

export default function DefenseNavbar({ 
  lang = 'en', 
  onToggleLang, 
  t, 
  onOpenAuth, 
  isAuthenticated = false 
}) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/85 border-b border-indigo-500/20 px-3 sm:px-6 py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xl shadow-black/50">
      
      {/* Brand & Tactical Classification */}
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-teal-400 text-white shadow-lg shadow-indigo-500/30 flex items-center justify-center shrink-0 border border-indigo-400/30">
          <Brain className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono font-black tracking-widest text-indigo-400 uppercase bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-500/30">
              {t.defenseHeader || "SILICONBRAINSAI // DEFENSE & ACADEMIC LABS"}
            </span>
            <span className="hidden sm:inline-flex items-center space-x-1 text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>{t.statusBeacon || "SYSTEM ONLINE"}</span>
            </span>
          </div>

          <h1 className="text-sm sm:text-base font-black bg-gradient-to-r from-white via-indigo-200 to-teal-300 bg-clip-text text-transparent tracking-tight mt-0.5">
            {t.defenseTitle || "AI ODYSSEY: MACHINE LEARNING & DEEP LEARNING EXPLORER"}
          </h1>
        </div>
      </div>

      {/* Right Controls: Clearance Authenticator, Audio TTS, Bilingual Switch */}
      <div className="flex items-center space-x-2 sm:space-x-3 shrink-0 self-end md:self-center">
        
        {/* Level-4 Clearance Button */}
        <button
          onClick={onOpenAuth}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all ${
            isAuthenticated
              ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 shadow-sm shadow-emerald-950/50'
              : 'bg-amber-500/15 border-amber-500/40 text-amber-300 hover:bg-amber-500/25'
          }`}
          title="Level-4 Security Clearance Protocol"
        >
          {isAuthenticated ? (
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Lock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          )}
          <span>{isAuthenticated ? 'LEVEL-4 SECURE' : (t.clearanceBadge || 'LEVEL-4 RESTRICTED')}</span>
        </button>

        {/* Global Speech Narration */}
        <AudioButton
          text={`${t.defenseHeader}. ${t.defenseTitle}. ${t.defenseSubtitle}`}
          lang={lang}
          labelEn="Listen"
          labelTe="వినండి"
          size="compact"
        />

        {/* Bilingual Switcher */}
        <button
          onClick={onToggleLang}
          className="flex items-center space-x-1.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-md shadow-indigo-600/30 transition-all active:scale-95 border border-indigo-400/30"
          title="Switch Language / భాష మార్చండి"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>{t.toggleText}</span>
        </button>

      </div>
    </header>
  );
}
