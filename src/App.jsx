import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Sparkles, 
  BookOpen, 
  Cpu, 
  ShieldCheck, 
  Code2, 
  ArrowRight,
  Zap,
  RotateCcw
} from 'lucide-react';
import { translations } from './data/translations';
import ConstellationCanvas from './components/ConstellationCanvas';
import Toast from './components/Toast';
import AudioButton from './components/AudioButton';
import Module03Container from './components/module3/Module03Container';
import QuizSection from './components/QuizSection';
import Footer from './components/Footer';

export default function DeepLearningApp() {
  const [lang, setLang] = useState('en'); // 'en' or 'te'
  const [activeStep, setActiveStep] = useState(3); // Default to Module 3 as requested, or easy switch
  const [toast, setToast] = useState(null);

  // Module 2 Interactive States
  const [fruitColor, setFruitColor] = useState('Red');
  const [fruitShape, setFruitShape] = useState('Round');
  const [actInputValue, setActInputValue] = useState(1.5);
  const [selectedActivation, setSelectedActivation] = useState('ReLU');

  const t = translations[lang] || translations.en;

  // Fruit Classifier Inference logic (Module 2)
  const calculateFruitPrediction = () => {
    if (fruitColor === 'Red' && fruitShape === 'Round') {
      return { label: lang === 'en' ? 'Apple 🍎' : 'ఆపిల్ 🍎', confidence: 96, alt: 'Strawberry (4%)' };
    }
    if (fruitColor === 'Yellow' && fruitShape === 'Crescent') {
      return { label: lang === 'en' ? 'Banana 🍌' : 'అరటిపండు 🍌', confidence: 98, alt: 'Mango (2%)' };
    }
    if (fruitColor === 'Yellow' && (fruitShape === 'Round' || fruitShape === 'Oval')) {
      return { label: lang === 'en' ? 'Lemon 🍋' : 'నిమ్మకాయ 🍋', confidence: 92, alt: 'Sweet Lime (8%)' };
    }
    if (fruitColor === 'Green' && fruitShape === 'Round') {
      return { label: lang === 'en' ? 'Watermelon 🍉' : 'పుచ్చకాయ 🍉', confidence: 94, alt: 'Guava (6%)' };
    }
    return { label: lang === 'en' ? 'Exotic Fruit 🥝' : 'ప్రత్యేక పండు 🥝', confidence: 88, alt: 'Kiwi (12%)' };
  };

  const prediction = calculateFruitPrediction();

  // Activation calculation (Module 2)
  const computeActivation = (func, x) => {
    if (func === 'ReLU') {
      return Math.max(0, x).toFixed(2);
    }
    if (func === 'Sigmoid') {
      return (1 / (1 + Math.exp(-x))).toFixed(3);
    }
    if (func === 'Softmax') {
      const exp1 = Math.exp(x);
      const exp2 = Math.exp(0);
      const exp3 = Math.exp(-x);
      const sum = exp1 + exp2 + exp3;
      return `${((exp1 / sum) * 100).toFixed(1)}%`;
    }
    return x;
  };

  const getStepIcon = (id) => {
    switch (id) {
      case 1: return BookOpen;
      case 2: return Cpu;
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

      {/* Top Glassmorphism Navigation Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between transition-all shadow-xl shadow-black/30">
        <div className="flex items-center space-x-3.5">
          <div className="bg-gradient-to-tr from-indigo-600 via-purple-600 to-teal-400 p-2.5 rounded-2xl text-white shadow-lg shadow-indigo-500/25 flex items-center justify-center shrink-0">
            <Brain className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base sm:text-lg font-black bg-gradient-to-r from-indigo-400 via-teal-300 to-purple-400 bg-clip-text text-transparent">
                {t.title}
              </h1>
              <span className="hidden sm:inline-block px-2.5 py-0.5 text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full">
                {t.portalTag}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">{t.subtitle}</p>
          </div>
        </div>

        {/* Global Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Read Aloud Global Button */}
          <AudioButton 
            text={`${t.title}. ${t.subtitle}`}
            lang={lang}
            labelEn="Listen"
            labelTe="వినండి"
            size="compact"
          />

          {/* Bilingual Language Switcher */}
          <button
            onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
            className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-indigo-600/30 transition-all active:scale-95 border border-indigo-400/30"
            title="Switch Language / భాష మార్చండి"
          >
            <span className="text-sm">🌐</span>
            <span>{t.toggleText}</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-10 relative z-10">
        
        {/* Step Navigation Tabs */}
        <nav aria-label="Learning Progression" className="grid grid-cols-3 gap-2.5 sm:gap-4">
          {t.steps.map((s) => {
            const Icon = getStepIcon(s.id);
            const isActive = activeStep === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveStep(s.id)}
                className={`p-3.5 sm:p-4 rounded-2xl text-left transition-all border relative overflow-hidden group ${
                  isActive
                    ? 'glass-panel-glow border-indigo-500 text-indigo-200 shadow-xl shadow-indigo-950/50'
                    : 'glass-panel border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-teal-400 to-purple-500" />
                )}
                <div className="flex items-center space-x-2 mb-1">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                  <div className="font-bold text-xs sm:text-sm tracking-wide">{s.title}</div>
                </div>
                <div className="text-[11px] sm:text-xs opacity-75 hidden sm:block truncate">{s.subtitle}</div>
              </button>
            );
          })}
        </nav>

        {/* ======================================================== */}
        {/* STEP 1: BASICS */}
        {/* ======================================================== */}
        {activeStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            {/* Hero Card */}
            <div className="glass-panel-glow border border-indigo-500/30 p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="max-w-2xl">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Module 01</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                  {t.step1Header}
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {t.step1Desc}
                </p>
              </div>
            </div>

            {/* Side-by-Side: Definition & Child Learning Analogy */}
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Definition */}
              <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center space-x-2.5 mb-3">
                    <span className="p-2 rounded-xl bg-teal-500/10 text-teal-400 text-lg">📖</span>
                    <h3 className="text-lg font-bold text-teal-300">{t.defTitle}</h3>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    {t.defText}
                  </p>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80 space-y-3">
                  <div className="flex items-start space-x-2 text-xs">
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-bold shrink-0">
                      {t.mlVsDl.mlTitle}
                    </span>
                    <span className="text-slate-400">{t.mlVsDl.mlDesc}</span>
                  </div>
                  <div className="flex items-start space-x-2 text-xs">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-bold shrink-0">
                      {t.mlVsDl.dlTitle}
                    </span>
                    <span className="text-slate-300">{t.mlVsDl.dlDesc}</span>
                  </div>
                </div>
              </div>

              {/* Child Learning Analogy */}
              <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center space-x-2.5 mb-3">
                    <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 text-lg">👶</span>
                    <h3 className="text-lg font-bold text-amber-300">{t.howTitle}</h3>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    {t.howText}
                  </p>
                </div>

                <div className="space-y-2 bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/80">
                  <div className="flex items-center space-x-3 text-xs text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-indigo-600/30 text-indigo-300 flex items-center justify-center font-bold text-[10px]">1</span>
                    <span>{t.analogyStep1}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-teal-600/30 text-teal-300 flex items-center justify-center font-bold text-[10px]">2</span>
                    <span>{t.analogyStep2}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs text-emerald-300">
                    <span className="w-5 h-5 rounded-full bg-emerald-600/30 text-emerald-300 flex items-center justify-center font-bold text-[10px]">3</span>
                    <span>{t.analogyStep3}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Applications Grid */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-indigo-300 flex items-center space-x-2">
                  <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">🚀</span>
                  <span>{t.appsTitle}</span>
                </h3>
                <span className="text-xs text-slate-400 font-medium">Everyday Tech</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {t.apps.map((app, idx) => (
                  <div 
                    key={idx} 
                    className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 hover:border-indigo-500/40 transition-all hover:translate-y-[-2px] group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="font-bold text-white text-sm group-hover:text-indigo-300 transition-colors">{app.name}</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 text-indigo-300 border border-slate-800">{app.tag}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{app.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 2: INTERMEDIATE */}
        {/* ======================================================== */}
        {activeStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            {/* Hero Card */}
            <div className="glass-panel-glow border border-teal-500/30 p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="max-w-2xl">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-3">
                  <Cpu className="w-3.5 h-3.5 text-teal-400" />
                  <span>Module 02</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                  {t.step2Header}
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {t.step2Desc}
                </p>
              </div>
            </div>

            {/* NEURAL NETWORK FRUIT CLASSIFIER SIMULATOR */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-indigo-300">{t.nnTitle}</h3>
                <p className="text-xs text-slate-400 mt-1">{t.nnSubtitle}</p>
              </div>

              {/* Interactive Inputs & Live Prediction Card */}
              <div className="grid md:grid-cols-2 gap-6 bg-slate-950/80 p-5 rounded-2xl border border-slate-800/80">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                      1. Fruit Color:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Red', 'Yellow', 'Green', 'Purple'].map((color) => (
                        <button
                          key={color}
                          onClick={() => setFruitColor(color)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                            fruitColor === color
                              ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                      2. Fruit Shape:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Round', 'Crescent', 'Oval'].map((shape) => (
                        <button
                          key={shape}
                          onClick={() => setFruitShape(shape)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                            fruitShape === shape
                              ? 'bg-teal-600 text-white border-teal-400 shadow-md shadow-teal-600/30'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {shape}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
                      Output Layer Prediction:
                    </div>
                    <div className="text-2xl font-black text-white flex items-center space-x-2">
                      <span>{prediction.label}</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                      <span>Top Prediction: {prediction.confidence}%</span>
                      <span>Alternative: {prediction.alt}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 transition-all duration-500 rounded-full"
                        style={{ width: `${prediction.confidence}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Layer Explanations */}
              <div className="grid md:grid-cols-3 gap-3 pt-2">
                {t.nnLayers.map((layer, idx) => (
                  <div key={idx} className="bg-slate-950/50 p-3.5 rounded-2xl border border-slate-800/80">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="w-5 h-5 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-bold flex items-center justify-center">
                        0{idx + 1}
                      </span>
                      <h4 className="font-bold text-slate-200 text-xs">{layer.name}</h4>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{layer.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ACTIVATION FUNCTIONS PLAYGROUND */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-bold text-amber-300">{t.actTitle}</h3>
                </div>
                <p className="text-xs text-slate-400">{t.actDesc}</p>
              </div>

              <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex space-x-2">
                    {['ReLU', 'Sigmoid', 'Softmax'].map((fn) => (
                      <button
                        key={fn}
                        onClick={() => setSelectedActivation(fn)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                          selectedActivation === fn
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {fn}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center space-x-3 text-xs">
                    <span className="text-slate-400">Input (x):</span>
                    <input
                      type="range"
                      min="-5"
                      max="5"
                      step="0.5"
                      value={actInputValue}
                      onChange={(e) => setActInputValue(parseFloat(e.target.value))}
                      className="w-32 accent-amber-400 cursor-pointer"
                    />
                    <span className="font-mono font-bold text-amber-300 w-10 text-right">
                      {actInputValue > 0 ? `+${actInputValue}` : actInputValue}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="text-xs">
                    <span className="text-slate-400 font-mono">
                      Calculation: {selectedActivation}({actInputValue}) = 
                    </span>
                    <span className="font-mono font-bold text-amber-300 text-base ml-2">
                      {computeActivation(selectedActivation, actInputValue)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {t.activations.map((act, idx) => (
                  <div key={idx} className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs bg-amber-500/15 text-amber-300 font-bold px-2 py-0.5 rounded-md border border-amber-500/20">
                          {act.name}
                        </span>
                        <code className="text-[10px] text-slate-400 font-mono bg-slate-900 px-1.5 py-0.5 rounded">
                          {act.formula}
                        </code>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed mb-3">{act.desc}</p>
                    </div>
                    <div className="text-[11px] text-amber-400/90 bg-amber-950/20 border border-amber-500/20 p-2.5 rounded-xl flex items-start space-x-1.5">
                      <span>🛡️</span>
                      <span>{act.guard}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PYTHON LIBRARIES LEGO BOX */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-teal-300 flex items-center space-x-2">
                    <Code2 className="w-5 h-5 text-teal-400" />
                    <span>{t.libTitle}</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">{t.libDesc}</p>
                </div>
                <span className="text-xs text-teal-400 font-semibold hidden sm:inline">Python 3.x Ecosystem</span>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {t.libraries.map((lib, idx) => (
                  <div key={idx} className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 hover:border-teal-500/40 transition-all flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-extrabold text-teal-200 text-sm">{lib.name}</h4>
                        <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
                          {lib.creator}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed mt-2">{lib.desc}</p>
                    </div>
                    
                    <pre className="text-[10px] font-mono bg-slate-900/90 text-teal-300 p-2.5 rounded-xl border border-slate-800 overflow-x-auto">
                      <code>{lib.codeSnippet}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 3: ADVANCED AI REVOLUTION (MODULE 03) */}
        {/* ======================================================== */}
        {activeStep === 3 && (
          <Module03Container lang={lang} t={t} />
        )}

        {/* ======================================================== */}
        {/* INTERACTIVE KNOWLEDGE CHECK QUIZ HUB */}
        {/* ======================================================== */}
        <div className="pt-6">
          <QuizSection 
            lang={lang} 
            t={t} 
            onTriggerToast={(toastObj) => setToast(toastObj)} 
          />
        </div>

        {/* Footer */}
        <Footer lang={lang} t={t} />

      </main>

      {/* Floating Toast Notification System */}
      <Toast toast={toast} onClose={() => setToast(null)} />

    </div>
  );
}
