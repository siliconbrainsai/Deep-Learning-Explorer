import React, { useState } from 'react';
import { 
  Brain, 
  Sparkles, 
  BookOpen, 
  Cpu, 
  Layers, 
  Server, 
  HelpCircle, 
  ShieldCheck, 
  Terminal, 
  Zap, 
  GraduationCap 
} from 'lucide-react';
import { translations } from './data/translations';
import ConstellationCanvas from './components/ConstellationCanvas';
import Toast from './components/Toast';
import DefenseNavbar from './components/layout/DefenseNavbar';
import SecurityAuthModal from './components/layout/SecurityAuthModal';
import LiveTelemetryMonitor from './components/layout/LiveTelemetryMonitor';
import QuickAccessBar from './components/layout/QuickAccessBar';
import Module1Foundations from './components/modules/Module1Foundations';
import Module2AlgorithmLab from './components/modules/Module2AlgorithmLab';
import Module3FastAPIPython from './components/modules/Module3FastAPIPython';
import Module4Quiz from './components/modules/Module4Quiz';
import Module5Glossary from './components/modules/Module5Glossary';
import Footer from './components/Footer';

export default function App() {
  const [lang, setLang] = useState('en'); // 'en' or 'te'
  const [activeModule, setActiveModule] = useState(1); // 1 to 5
  const [audienceTrack, setAudienceTrack] = useState('fastapi'); // 'fastapi', 'student', 'engineer'
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default with Level-4 clearance for convenience
  const [toast, setToast] = useState(null);

  const t = translations[lang] || translations.en;

  const getModuleIcon = (id) => {
    switch (id) {
      case 1: return BookOpen;
      case 2: return Cpu;
      case 3: return Server;
      case 4: return HelpCircle;
      case 5: return Layers;
      default: return Sparkles;
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white pb-16 relative overflow-x-hidden">
      
      {/* Deep Space Constellation Canvas Background */}
      <ConstellationCanvas />

      {/* Dynamic Ambient Nebulae */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed top-1/3 right-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 left-10 w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Defense Tactical Navbar */}
      <DefenseNavbar
        lang={lang}
        onToggleLang={() => setLang(lang === 'en' ? 'te' : 'en')}
        t={t}
        onOpenAuth={() => setIsAuthOpen(true)}
        isAuthenticated={isAuthenticated}
      />

      {/* Master Container */}
      <main className="max-w-6xl mx-auto px-3 sm:px-6 pt-6 space-y-8 relative z-10">
        
        {/* Top Operational Status Bar: Live Telemetry Monitor */}
        <LiveTelemetryMonitor t={t} lang={lang} />

        {/* Target Audience Track Selector */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-400">
              {t.audienceTracks?.label || "TARGET AUDIENCE TRACK"}
            </div>
            <div className="text-xs text-slate-300 font-medium">
              {lang === 'te' ? 'మీ అభ్యాస శైలిని ఎంచుకోండి:' : 'Select your engineering & conceptual focus:'}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 bg-slate-900/90 p-1 rounded-2xl border border-slate-800">
            <button
              onClick={() => setAudienceTrack('fastapi')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                audienceTrack === 'fastapi'
                  ? 'bg-gradient-to-r from-teal-600 to-indigo-600 text-white shadow-md shadow-teal-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>{t.audienceTracks?.fastapi || "FastAPI + Math Rigor"}</span>
            </button>
            <button
              onClick={() => setAudienceTrack('student')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                audienceTrack === 'student'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{t.audienceTracks?.student || "Student Mode"}</span>
            </button>
            <button
              onClick={() => setAudienceTrack('engineer')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                audienceTrack === 'engineer'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>{t.audienceTracks?.engineer || "Engineer Mode"}</span>
            </button>
          </div>
        </div>

        {/* Quick Access Topics Direct Jump Bar */}
        <QuickAccessBar 
          onSelectModule={(modId) => setActiveModule(modId)} 
          t={t} 
        />

        {/* Core Exploration 5 Modules Tabs */}
        <nav aria-label="Exploration Modules" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
          {t.steps.map((s) => {
            const Icon = getModuleIcon(s.id);
            const isActive = activeModule === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveModule(s.id)}
                className={`p-3.5 rounded-2xl text-left transition-all border relative overflow-hidden group ${
                  isActive
                    ? 'glass-panel-glow border-indigo-500 text-indigo-200 shadow-xl shadow-indigo-950/50 scale-[1.02] z-10'
                    : 'glass-panel border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-teal-400 to-purple-500" />
                )}
                <div className="flex items-center space-x-2 mb-1">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                  <div className="font-bold text-xs sm:text-sm tracking-wide truncate">{s.title}</div>
                </div>
                <div className="text-[10px] sm:text-[11px] opacity-75 hidden sm:block truncate">{s.subtitle}</div>
              </button>
            );
          })}
        </nav>

        {/* MODULE CONTENT AREA */}
        <div className="min-h-[500px]">
          
          {/* Module 1: Foundations */}
          {activeModule === 1 && (
            <Module1Foundations lang={lang} t={t} />
          )}

          {/* Module 2: Algorithm Lab */}
          {activeModule === 2 && (
            <Module2AlgorithmLab 
              lang={lang} 
              t={t} 
              onSelectDeepLearning={() => setActiveModule(3)} 
            />
          )}

          {/* Module 3: Python & FastAPI (with embedded Deep Learning studio) */}
          {activeModule === 3 && (
            <Module3FastAPIPython 
              lang={lang} 
              t={t} 
              onTriggerToast={(tObj) => setToast(tObj)} 
            />
          )}

          {/* Module 4: Knowledge Quiz */}
          {activeModule === 4 && (
            <Module4Quiz 
              lang={lang} 
              t={t} 
              onTriggerToast={(tObj) => setToast(tObj)} 
            />
          )}

          {/* Module 5: ML Glossary */}
          {activeModule === 5 && (
            <Module5Glossary lang={lang} t={t} />
          )}

        </div>

        {/* Footer */}
        <Footer lang={lang} t={t} />

      </main>

      {/* Level-4 Security Authenticator Modal */}
      <SecurityAuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthenticate={(val) => {
          setIsAuthenticated(val);
          setToast({
            type: 'success',
            title: 'Level-4 Clearance Active',
            message: 'Cryptographic session verified.',
            detail: 'Defense & Academic Labs Level-4 Access Granted.'
          });
        }}
        isAuthenticated={isAuthenticated}
        t={t}
        lang={lang}
      />

      {/* Floating Toast Notification Alert */}
      <Toast toast={toast} onClose={() => setToast(null)} />

    </div>
  );
}
