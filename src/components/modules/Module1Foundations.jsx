import React, { useState } from 'react';
import { 
  GitBranch, 
  Cpu, 
  PieChart, 
  Layers, 
  Sliders, 
  ShieldAlert, 
  CheckCircle2, 
  Award, 
  BookOpen, 
  Zap, 
  Sparkles 
} from 'lucide-react';
import AudioButton from '../AudioButton';

export default function Module1Foundations({ lang = 'en', t }) {
  const [activePillar, setActivePillar] = useState('supervised');
  const [trainPercent, setTrainPercent] = useState(70);
  const [valPercent, setValPercent] = useState(15);
  
  // Test is remaining
  const testPercent = Math.max(5, 100 - trainPercent - valPercent);
  const totalSamples = 1200;

  const trainSamples = Math.round((trainPercent / 100) * totalSamples);
  const valSamples = Math.round((valPercent / 100) * totalSamples);
  const testSamples = totalSamples - trainSamples - valSamples;

  const pillars = {
    supervised: {
      nameEn: "1. Supervised Learning",
      nameTe: "1. పర్యవేక్షక అభ్యాసం (Supervised)",
      badgeEn: "Labeled Targets",
      badgeTe: "లేబుల్ చేసిన డేటా",
      icon: "🎯",
      descEn: "Algorithms learn from paired inputs and ground-truth targets (X -> Y). Features are mapped to continuous numbers (Regression) or discrete classes (Classification).",
      descTe: "ఇన్‌పుట్ డేటాతో పాటు సరైన సమాధానం (లేబుల్స్) కూడా ఇచ్చి కంప్యూటర్‌కు నేర్పిస్తారు. ఉదాహరణకు ఫోటోలు మరియు వాటి పేర్లు.",
      examplesEn: ["Email Spam Filtering", "Medical Disease Diagnosis", "House Price Prediction"],
      examplesTe: ["ఈమెయిల్ స్పామ్ గుర్తింపు", "మెడికల్ వ్యాధి నిర్ధారణ", "ఇళ్ల ధరల అంచనా"],
      mathEn: "argmin_θ Σ L(f_θ(x_i), y_i) + λ Ω(θ)",
      mathTe: "లాస్ ఫంక్షన్‌ను మినిమైజ్ చేస్తూ పెనాల్టీ టర్మ్ ద్వారా మోడల్ పారామీటర్లను నేర్చుకోవడం."
    },
    unsupervised: {
      nameEn: "2. Unsupervised Learning",
      nameTe: "2. స్వయంప్రతిపత్తి అభ్యాసం (Unsupervised)",
      badgeEn: "Hidden Patterns",
      badgeTe: "అంతర్గత నమూనాలు",
      icon: "🔍",
      descEn: "Finds latent clusters, intrinsic manifolds, and hidden structure in raw unlabeled data (X only) without any external teacher or human labels.",
      descTe: "ఎటువంటి లేబుల్స్ లేని ముడి డేటాను విశ్లేషించి సమాన లక్షణాలు గల అంశాలను స్వయంగా గ్రూపులుగా (క్లస్టర్స్) విభజిస్తుంది.",
      examplesEn: ["Customer Market Segmentation", "DNA Sequence Clustering", "Credit Card Anomaly Detection"],
      examplesTe: ["కస్టమర్ మార్కెట్ విభజన", "డిఎన్‌ఎ సీక్వెన్స్ క్లస్టరింగ్", "క్రెడిట్ కార్డ్ మోసాల గుర్తింపు"],
      mathEn: "min_C Σ_{i=1}^k Σ_{x ∈ C_i} ||x - μ_i||^2",
      mathTe: "సెంట్రాయిడ్స్ మరియు డేటా పాయింట్ల మధ్య యూక్లిడియన్ దూరాన్ని తగ్గించడం (K-Means)."
    },
    reinforcement: {
      nameEn: "3. Reinforcement Learning",
      nameTe: "3. రీఇన్‌ఫోర్స్‌మెంట్ లెర్నింగ్ (RL)",
      badgeEn: "Trial & Reward",
      badgeTe: "రివార్డ్ & పెనాల్టీ",
      icon: "🎮",
      descEn: "An autonomous agent interacts with a dynamic environment, taking actions to maximize cumulative mathematical rewards over time via Markov Decision Processes.",
      descTe: "ఒక రోబోట్ లేదా ఏజెంట్ స్వయంగా ప్రయోగాలు చేస్తూ, తప్పులకు శిక్ష (పెనాల్టీ), విజయాలకు బహుమతి (రివార్డ్) పొందుతూ సరైన నిర్ణయాలు నేర్చుకుంటుంది.",
      examplesEn: ["AlphaGo Game Playing", "Autonomous Drone Navigation", "High-Frequency Algorithmic Trading"],
      examplesTe: ["ఆల్ఫాగో చెస్ గేమింగ్", "స్వయంప్రతిపత్తి డ్రోన్ నావిగేషన్", "ఆల్గో ట్రేడింగ్ బాట్స్"],
      mathEn: "Q(s, a) ← Q(s, a) + α [R + γ max_a' Q(s', a') - Q(s, a)]",
      mathTe: "బెల్‌మన్ ఈక్వేషన్ ద్వారా భవిష్యత్ రివార్డులను లెక్కించి పాలసీని అప్‌డేట్ చేయడం."
    }
  };

  const curPillar = pillars[activePillar];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Module Header Card */}
      <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-indigo-500/30 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>{lang === 'te' ? 'మాడ్యూల్ 01: ప్రాథమిక భావనలు' : 'Module 01: Foundations'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {lang === 'te' ? 'రూల్-బేస్డ్ vs మెషిన్ లెర్నింగ్ & డేటా స్ప్లిటింగ్' : 'Rule-Based vs ML • 3 Pillars • Data Splitting'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              {lang === 'te'
                ? 'సాఫ్ట్‌వేర్ ఇంజనీరింగ్ 1.0 (హార్డ్‌కోడెడ్ నియమాలు) నుండి సాఫ్ట్‌వేర్ 2.0 (డేటా ఆధారిత బరువులు) వరకు పరివర్తనను మరియు డేటా సెట్‌లను సరైన నిష్పత్తిలో ఎలా విభజించాలో తెలుసుకోండి.'
                : 'Master the paradigm shift from Software 1.0 (hardcoded IF-ELSE heuristics) to Software 2.0 (data-driven weights), and test live dataset partition splitting.'}
            </p>
          </div>

          <AudioButton
            text={lang === 'te' ? 'మాడ్యూల్ 01: ప్రాథమిక భావనలు. రూల్ బేస్డ్ వర్సెస్ మెషిన్ లెర్నింగ్ మరియు డేటా స్ప్లిటింగ్.' : 'Module 01 Foundations: Rule-based versus machine learning, three pillars, and data splitting.'}
            lang={lang}
          />
        </div>
      </div>

      {/* SECTION 1: Rule-Based Systems vs Machine Learning */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300">
              <GitBranch className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              {lang === 'te' ? '1. రూల్-బేస్డ్ సిస్టమ్స్ vs మెషిన్ లెర్నింగ్' : '1. Rule-Based (Heuristics) vs Machine Learning'}
            </h3>
          </div>
          <span className="text-xs font-mono text-teal-400 bg-teal-950/40 px-2.5 py-1 rounded-lg border border-teal-500/20">
            Software 1.0 vs 2.0
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Rule-Based Card */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-amber-300 text-sm flex items-center space-x-2">
                <span>⚙️</span>
                <span>{lang === 'te' ? 'రూల్-బేస్డ్ సాఫ్ట్‌వేర్ (సాంప్రదాయ కోడింగ్)' : 'Rule-Based Programming (Classical)'}</span>
              </h4>
              <span className="text-[10px] font-mono text-amber-400/80 bg-amber-950/30 px-2 py-0.5 rounded border border-amber-500/20">
                IF / ELSE Trees
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {lang === 'te'
                ? 'ఇంజనీర్లే స్వయంగా ప్రతి నియమాన్ని రాస్తారు (ఉదా: IF ఉష్ణోగ్రత > 100 THEN అలారం ఆన్ చేయి). నియమాలు పెరిగే కొద్దీ కోడ్ సంక్లిష్టమై నిర్వహించడం కష్టమవుతుంది.'
                : 'Human engineers manually craft static deterministic logic rules. The system accepts Input + Rules and executes output, failing when edge cases grow.'}
            </p>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 font-mono text-[11px] text-amber-300 space-y-1">
              <div>Input Data + Hardcoded Rules ➔ Final Output</div>
            </div>
          </div>

          {/* Machine Learning Card */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-indigo-500/30 space-y-3 shadow-md shadow-indigo-950/50">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-teal-300 text-sm flex items-center space-x-2">
                <span>🧠</span>
                <span>{lang === 'te' ? 'మెషిన్ లెర్నింగ్ (డేటా ఆధారిత మోడల్స్)' : 'Machine Learning (Data-Driven)'}</span>
              </h4>
              <span className="text-[10px] font-mono text-teal-400 bg-teal-950/30 px-2 py-0.5 rounded border border-teal-500/20">
                Learned Weights (W)
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {lang === 'te'
                ? 'కంప్యూటర్‌కు ఇన్‌పుట్ మరియు అవుట్‌పుట్ డేటా రెండింటినీ చూపిస్తే, వాటి మధ్య ఉన్న నియమాలను (మ్యాథమెటికల్ మోడల్‌ను) అది స్వయంగా నేర్చుకుంటుంది.'
                : 'Algorithms ingest Input Data + Desired Outputs, and automatically formulate statistical weight mappings via loss optimization and backpropagation.'}
            </p>
            <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 font-mono text-[11px] text-teal-300 space-y-1">
              <div>Input Data + Historic Answers ➔ Learned Algorithm Rules</div>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 2: 3 Pillars of Machine Learning */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-teal-500/20 text-teal-300">
              <Layers className="w-5 h-5 text-teal-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              {lang === 'te' ? '2. మెషిన్ లెర్నింగ్ 3 ప్రధాన స్తంభాలు' : '2. The 3 Pillars of Machine Learning'}
            </h3>
          </div>

          {/* Pillar Switcher */}
          <div className="flex space-x-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
            {Object.keys(pillars).map((key) => (
              <button
                key={key}
                onClick={() => setActivePillar(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activePillar === key
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {key.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Active Pillar Card */}
        <div className="p-6 rounded-2xl bg-slate-950/80 border border-indigo-500/20 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{curPillar.icon}</span>
              <div>
                <h4 className="text-base font-bold text-white">
                  {lang === 'te' ? curPillar.nameTe : curPillar.nameEn}
                </h4>
                <span className="text-[11px] font-mono text-indigo-400">
                  {lang === 'te' ? curPillar.badgeTe : curPillar.badgeEn}
                </span>
              </div>
            </div>

            <code className="text-xs font-mono text-teal-300 bg-slate-900 px-3 py-1 rounded-lg border border-teal-500/20">
              {curPillar.mathEn}
            </code>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {lang === 'te' ? curPillar.descTe : curPillar.descEn}
          </p>

          <div className="pt-2">
            <div className="text-[11px] font-mono text-slate-400 uppercase mb-2">
              {lang === 'te' ? 'వాస్తవ జీవిత ఉదాహరణలు:' : 'Real-World Production Applications:'}
            </div>
            <div className="grid sm:grid-cols-3 gap-2">
              {(lang === 'te' ? curPillar.examplesTe : curPillar.examplesEn).map((ex, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-200 flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>{ex}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Interactive Data Splitting Simulator */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300">
              <Sliders className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {lang === 'te' ? '3. ఇంటరాక్టివ్ డేటా స్ప్లిటింగ్ సిమ్యులేటర్' : '3. Interactive Data Splitting Simulator'}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'te' ? 'ట్రైనింగ్, వ్యాలిడేషన్ మరియు టెస్ట్ నిష్పత్తులను లైవ్‌గా సర్దుబాటు చేయండి:' : 'Tune Train, Validation, and Test split distributions across 1,200 sample observations:'}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-purple-300 bg-purple-950/40 px-2.5 py-1 rounded-lg border border-purple-500/30">
            N = {totalSamples} Samples
          </span>
        </div>

        {/* Sliders Box */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-5">
          <div className="grid sm:grid-cols-2 gap-6">
            
            {/* Train Split Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-indigo-400">1. Training Set: {trainPercent}%</span>
                <span className="text-slate-400 font-mono">({trainSamples} samples)</span>
              </div>
              <input
                type="range"
                min="50"
                max="85"
                step="5"
                value={trainPercent}
                onChange={(e) => setTrainPercent(parseInt(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <p className="text-[10px] text-slate-500">Used by gradient descent to fit model weights.</p>
            </div>

            {/* Validation Split Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-teal-400">2. Validation Set: {valPercent}%</span>
                <span className="text-slate-400 font-mono">({valSamples} samples)</span>
              </div>
              <input
                type="range"
                min="5"
                max="25"
                step="5"
                value={valPercent}
                onChange={(e) => setValPercent(parseInt(e.target.value))}
                className="w-full accent-teal-500 cursor-pointer"
              />
              <p className="text-[10px] text-slate-500">Used for hyperparameter tuning & early stopping check.</p>
            </div>

          </div>

          {/* Visual Distribution Bar */}
          <div className="space-y-1.5 pt-2">
            <div className="text-[11px] font-mono text-slate-400 flex justify-between">
              <span>Data Split Distribution:</span>
              <span>Test Holdout: {testPercent}% ({testSamples} samples)</span>
            </div>

            <div className="w-full h-6 bg-slate-900 rounded-xl overflow-hidden flex border border-slate-800">
              <div
                className="bg-indigo-600 flex items-center justify-center text-[10px] font-mono font-bold text-white transition-all duration-300"
                style={{ width: `${trainPercent}%` }}
                title={`Train: ${trainPercent}%`}
              >
                Train {trainPercent}%
              </div>
              <div
                className="bg-teal-500 flex items-center justify-center text-[10px] font-mono font-bold text-slate-950 transition-all duration-300"
                style={{ width: `${valPercent}%` }}
                title={`Val: ${valPercent}%`}
              >
                Val {valPercent}%
              </div>
              <div
                className="bg-purple-500 flex items-center justify-center text-[10px] font-mono font-bold text-white transition-all duration-300"
                style={{ width: `${testPercent}%` }}
                title={`Test: ${testPercent}%`}
              >
                Test {testPercent}%
              </div>
            </div>
          </div>

          {/* Golden Rule Callout */}
          <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/20 flex items-start space-x-2.5 text-xs text-amber-200">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-300 font-mono">Data Leakage Prevention:</strong>{' '}
              {lang === 'te'
                ? 'టెస్ట్ సెట్‌ను మోడల్ ట్రైనింగ్ పూర్తయ్యే వరకు ఎప్పుడూ చూడకూడదు. టెస్ట్ డేటా ద్వారా మోడల్ నేర్చుకుంటే రియల్ వరల్డ్‌లో మోడల్ ఫెయిల్ అవుతుంది (Data Leakage).'
                : 'The Test Set must NEVER be touched during training, feature scaling, or hyperparameter selection. Contaminating feature scaling with test data causes catastrophic data leakage.'}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
