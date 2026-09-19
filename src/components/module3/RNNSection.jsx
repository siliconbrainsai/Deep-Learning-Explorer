import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  RotateCcw, 
  Play, 
  Pause, 
  Keyboard, 
  Languages, 
  Mic, 
  ArrowRight, 
  Cpu, 
  Layers, 
  Sparkles, 
  ShieldAlert, 
  ShieldCheck 
} from 'lucide-react';
import AudioButton from '../AudioButton';

export default function RNNSection({ lang = 'en', audience = 'student', rnnData }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modelType, setModelType] = useState('lstm'); // 'rnn' or 'lstm'

  const sentenceTokens = rnnData.sampleSentence; // ["The", "quick", "brown", "fox", "jumps", "over", "the"]

  // Auto-play through sentence tokens
  useEffect(() => {
    let timer = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= sentenceTokens.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1200);
    }
    return () => clearInterval(timer);
  }, [isPlaying, sentenceTokens.length]);

  // Calculate memory strength / gradient decay
  // In Vanilla RNN, decay is exponential: (0.65)^t
  // In LSTM, cell state preserves ~90-95% memory
  const getMemoryRetention = (stepIndex, totalSteps) => {
    const distance = totalSteps - stepIndex;
    if (modelType === 'rnn') {
      return Math.max(12, Math.round(Math.pow(0.68, distance) * 100));
    }
    // LSTM maintains high retention due to additive cell state
    return Math.max(75, Math.round(100 - distance * 3.5));
  };

  const getRealWorldIcon = (iconName) => {
    switch (iconName) {
      case 'Keyboard': return <Keyboard className="w-6 h-6 text-indigo-400" />;
      case 'Languages': return <Languages className="w-6 h-6 text-teal-400" />;
      case 'Mic': return <Mic className="w-6 h-6 text-rose-400" />;
      default: return <Clock className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <section className="glass-panel rounded-3xl p-6 sm:p-8 space-y-8 relative overflow-hidden transition-all border border-indigo-500/20">
      
      {/* Glow decorative corner */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div className="flex items-start space-x-3.5">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-teal-600 to-indigo-700 text-white shadow-lg shadow-teal-500/20 shrink-0">
            <Clock className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {rnnData.title}
              </h3>
              <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                {rnnData.badge}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
              {rnnData.description}
            </p>
          </div>
        </div>

        <div className="shrink-0 flex items-center space-x-2">
          <AudioButton 
            text={rnnData.ttsText}
            lang={lang}
            labelEn="Listen (Audio)"
            labelTe="వినండి (ఆడియో)"
          />
        </div>
      </div>

      {/* Student / Engineer Perspective Banner */}
      {audience === 'student' ? (
        <div className="p-4 sm:p-5 rounded-2xl bg-teal-950/40 border border-teal-500/30 text-teal-100 flex items-start space-x-3.5 shadow-md">
          <span className="text-2xl mt-0.5">📖</span>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-teal-300 mb-1">
              {lang === 'te' ? 'కథకుడి డైరీ పోలిక (Student Analogy)' : 'Storyteller Diary Analogy'}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {rnnData.studentAnalogy}
            </p>
          </div>
        </div>
      ) : (
        <div className="p-4 sm:p-5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-100 flex items-start space-x-3.5 shadow-md">
          <Cpu className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-1">
              {lang === 'te' ? 'గ్రేడియంట్ ప్రవాహం & BPTT' : 'Gradient Flow & BPTT'}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <span className="font-mono text-indigo-300 font-bold bg-slate-900 px-2 py-0.5 rounded border border-indigo-500/30">
                h_t = tanh(W_hh · h_(t-1) + W_xh · x_t + b_h)
              </span>. During Backpropagation Through Time (BPTT), repeated matrix multiplications cause eigenvalues &lt; 1 to vanish exponentially. LSTMs introduce an additive gradient highway (C_t).
            </p>
          </div>
        </div>
      )}

      {/* Interactive Controls: Architecture Toggle & Playback */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        
        {/* Architecture Comparison Switch */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
            {lang === 'te' ? 'ఆర్కిటెక్చర్:' : 'Architecture:'}
          </span>
          <div className="flex space-x-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setModelType('rnn')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                modelType === 'rnn'
                  ? 'bg-rose-500/30 text-rose-200 border border-rose-500/50 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Vanilla RNN (Vanishing)
            </button>
            <button
              onClick={() => setModelType('lstm')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                modelType === 'lstm'
                  ? 'bg-teal-500/30 text-teal-200 border border-teal-500/50 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              LSTM (Long Memory)
            </button>
          </div>
        </div>

        {/* Step Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              if (currentStep >= sentenceTokens.length - 1) {
                setCurrentStep(0);
              }
              setIsPlaying(!isPlaying);
            }}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
              isPlaying
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md'
                : 'bg-teal-600 hover:bg-teal-500 text-white border-teal-400/50 shadow-md shadow-teal-600/30'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? (lang === 'te' ? 'పాజ్' : 'Pause') : (lang === 'te' ? 'సీక్వెన్స్ ప్లే' : 'Play Sequence')}</span>
          </button>

          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentStep(0);
            }}
            title="Reset to token 1"
            className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Unrolled Cell Visualization Across Time Steps */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center space-x-2">
              <span>{lang === 'te' ? 'అన్‌రోల్డ్ RNN సెల్ విజువలైజేషన్:' : 'Unrolled Time-Step Chain (t = 0 to 6):'}</span>
              <span className="text-xs font-mono text-teal-400 bg-teal-950/40 px-2 py-0.5 rounded border border-teal-500/30">
                Step {currentStep + 1} of {sentenceTokens.length}
              </span>
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {lang === 'te'
                ? 'ప్రతి టోకెన్ పై క్లిక్ చేసి సమయ క్రమాన్ని మరియు మెమరీ నిలుపుదల శాతాన్ని చూడండి.'
                : 'Click any token step to observe recurrent hidden state transmission across time.'}
            </p>
          </div>

          {/* Model Status Indicator */}
          <div className="flex items-center space-x-2 text-xs">
            {modelType === 'rnn' ? (
              <span className="px-2.5 py-1 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 flex items-center space-x-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                <span>Vanishing Gradient Alert</span>
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Additive Highway Protected</span>
              </span>
            )}
          </div>
        </div>

        {/* Tokens Chain Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {sentenceTokens.map((token, idx) => {
            const isCurrent = idx === currentStep;
            const isProcessed = idx <= currentStep;
            const retention = getMemoryRetention(idx, currentStep);

            return (
              <button
                key={idx}
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStep(idx);
                }}
                className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between space-y-2 ${
                  isCurrent
                    ? 'bg-teal-950/60 border-teal-400 text-white ring-2 ring-teal-400/40 shadow-lg shadow-teal-950/50 scale-105 z-10'
                    : isProcessed
                    ? 'bg-slate-900/80 border-slate-700 text-slate-200 hover:border-slate-600'
                    : 'bg-slate-950/40 border-slate-800/60 text-slate-500 opacity-60'
                }`}
              >
                {isCurrent && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-indigo-400 to-teal-400" />
                )}

                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>t = {idx}</span>
                  {isCurrent && <span className="text-teal-400 font-bold">Active</span>}
                </div>

                <div className="font-extrabold text-sm sm:text-base text-white truncate">
                  "{token}"
                </div>

                {/* Memory Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] font-mono text-slate-400">
                    <span>Mem:</span>
                    <span className={retention < 30 ? 'text-rose-400 font-bold' : 'text-teal-300'}>
                      {isProcessed ? `${retention}%` : '--'}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 rounded-full ${
                        modelType === 'rnn'
                          ? retention < 30 ? 'bg-rose-500' : 'bg-amber-400'
                          : 'bg-emerald-400'
                      }`}
                      style={{ width: `${isProcessed ? retention : 0}%` }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Loop Diagram Card */}
        <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: Mathematical / Architecture State */}
          <div className="space-y-3 flex-1">
            <div className="text-xs font-bold text-slate-300 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
              <span>
                {lang === 'te'
                  ? `ప్రస్తుత సమయం (t=${currentStep}): పదం "${sentenceTokens[currentStep]}" ప్రాసెస్ అవుతోంది`
                  : `Current Time-Step (t=${currentStep}): Ingesting token "${sentenceTokens[currentStep]}"`}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-300 space-y-1.5">
              <div>
                <span className="text-teal-400">Input Vector (x_t):</span> One-hot/dense embedding of "{sentenceTokens[currentStep]}"
              </div>
              <div>
                <span className="text-indigo-400">Hidden State (h_t):</span>{' '}
                {currentStep === 0 ? 'Initialized h_0 = [0, 0, 0...]' : `Updated via W_hh · h_${currentStep - 1} + W_xh · x_${currentStep}`}
              </div>
              {modelType === 'lstm' && (
                <div className="text-emerald-300">
                  <span>Cell State (C_t):</span> Additive highway preserving long-term tokens across {currentStep} steps
                </div>
              )}
            </div>
          </div>

          {/* Right: Next Word Prediction Probabilities Box */}
          <div className="w-full md:w-80 bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2.5 shrink-0">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
              <span className="font-bold text-white">
                {lang === 'te' ? 'తదుపరి పదం ప్రిడిక్షన్:' : 'Next Token Prediction:'}
              </span>
              <span className="text-[10px] text-teal-400 font-mono">Softmax Logits</span>
            </div>

            {currentStep === sentenceTokens.length - 1 ? (
              <div className="space-y-2 pt-1">
                {rnnData.predictedWords.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-white font-mono">
                        "{item.word}"
                      </span>
                      <span className="font-bold text-teal-400">{item.prob}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-teal-400 to-indigo-500 rounded-full"
                        style={{ width: item.prob }}
                      />
                    </div>
                    <div className="text-[9px] text-slate-500">{item.match}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-4 text-center text-xs text-slate-500 italic">
                {lang === 'te'
                  ? 'పూర్తి వాక్యం ప్రిడిక్షన్ చూడటానికి చివరి స్టెప్ (Step 7) కి వెళ్ళండి.'
                  : `Advance to step 7 ("the") to view the final sentence completion predictions.`}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Vanishing Gradient & LSTM Gating Mechanics */}
      <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-4">
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <Layers className="w-4 h-4 text-teal-400" />
            <span>{rnnData.vanishingGradientExp.title}</span>
          </h4>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            {rnnData.vanishingGradientExp.problem}
          </p>
        </div>

        {/* 4 LSTM Gates Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          {rnnData.lstmGates.map((gate, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-2">
              <div>
                <div className="text-xs font-bold text-teal-300">{gate.name}</div>
                <code className="text-[10px] text-slate-400 font-mono bg-slate-950 px-1.5 py-0.5 rounded block mt-1">
                  {gate.formula}
                </code>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {gate.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Real-World Examples */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {lang === 'te' ? 'నిజ జీవితంలో అనువర్తనాలు' : 'Sequential AI in Production'}
          </h4>
          <span className="text-[11px] text-teal-400 font-semibold">Temporal Data Applications</span>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {rnnData.realWorld.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-teal-500/40 transition-all flex flex-col justify-between space-y-3 group hover:translate-y-[-2px]"
            >
              <div className="flex items-start space-x-3">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 shrink-0 group-hover:scale-105 transition-transform">
                  {getRealWorldIcon(item.icon)}
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm group-hover:text-teal-200 transition-colors">
                    {item.name}
                  </h5>
                  <span className="text-[10px] text-indigo-400 font-medium">
                    {item.role}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
