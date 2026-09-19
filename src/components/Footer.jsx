import React from 'react';
import { Brain, Heart, Sparkles, Terminal } from 'lucide-react';

export default function Footer({ lang = 'en', t }) {
  return (
    <footer className="mt-20 border-t border-slate-900/80 pt-12 pb-8 text-center relative z-10">
      <div className="max-w-4xl mx-auto px-4 space-y-4">
        
        {/* Siliconbrainsai Brandmark */}
        <div className="flex items-center justify-center space-x-2">
          <div className="p-1.5 rounded-xl bg-gradient-to-tr from-indigo-600 to-teal-500 text-white shadow-md shadow-indigo-500/30">
            <Brain className="w-4 h-4" />
          </div>
          <span className="font-black text-sm tracking-wide bg-gradient-to-r from-indigo-400 via-teal-300 to-purple-400 bg-clip-text text-transparent">
            Siliconbrainsai
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-xs font-semibold text-slate-400">
            Defense & Academic Labs • AI Odyssey: ML & DL Explorer
          </span>
        </div>

        {/* Required Tagline */}
        <p className="text-xs sm:text-sm font-semibold text-slate-300">
          {t.footerTagline}
        </p>

        {/* Required Tech Stack */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 font-mono">
          <Terminal className="w-3 h-3 text-teal-400" />
          <span>{t.footerTech}</span>
        </div>

        <p className="text-[10px] text-slate-600 pt-2">
          © {new Date().getFullYear()} Siliconbrainsai. All rights reserved. English & తెలుగు Educational Platform.
        </p>
      </div>
    </footer>
  );
}
