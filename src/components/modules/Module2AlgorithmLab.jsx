import React, { useState } from 'react';
import { 
  TrendingUp, 
  Boxes, 
  GitFork, 
  Brain, 
  Sliders, 
  Activity, 
  RotateCcw, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles 
} from 'lucide-react';
import AudioButton from '../AudioButton';

export default function Module2AlgorithmLab({ lang = 'en', t, onSelectDeepLearning }) {
  const [activeTab, setActiveTab] = useState('regression'); // 'regression', 'kmeans', 'randomforest'

  // --- Linear Regression State ---
  const [slope, setSlope] = useState(1.4); // m
  const [intercept, setIntercept] = useState(12); // b

  // Fixed sample points: (x, actual_y)
  const regressionPoints = [
    { x: 10, y: 25 },
    { x: 20, y: 40 },
    { x: 30, y: 52 },
    { x: 40, y: 68 },
    { x: 50, y: 82 },
    { x: 60, y: 95 },
    { x: 70, y: 110 }
  ];

  // Calculate Mean Squared Error (MSE)
  const calculateMSE = () => {
    let sumSq = 0;
    regressionPoints.forEach((pt) => {
      const predY = slope * pt.x + intercept;
      const err = pt.y - predY;
      sumSq += err * err;
    });
    return (sumSq / regressionPoints.length).toFixed(2);
  };

  const currentMSE = calculateMSE();

  // --- K-Means State ---
  const [clustersK, setClustersK] = useState(3);
  const [kmeansStep, setKmeansStep] = useState(1);

  // K-Means sample 2D data points
  const clusterPoints = [
    { x: 20, y: 30, cluster: 0 }, { x: 25, y: 25, cluster: 0 }, { x: 30, y: 35, cluster: 0 },
    { x: 70, y: 75, cluster: 1 }, { x: 75, y: 80, cluster: 1 }, { x: 80, y: 70, cluster: 1 },
    { x: 25, y: 80, cluster: 2 }, { x: 35, y: 85, cluster: 2 }, { x: 30, y: 75, cluster: 2 },
    { x: 75, y: 25, cluster: 3 }, { x: 80, y: 30, cluster: 3 }
  ];

  const clusterColors = ['#818cf8', '#2dd4bf', '#f43f5e', '#fbbf24', '#c084fc'];

  // --- Random Forest Ensemble State ---
  const [sampleIncome, setSampleIncome] = useState(65); // in $k
  const [sampleCreditScore, setSampleCreditScore] = useState(720);

  // 5 Trees vote
  const getTreeVotes = () => {
    const t1 = sampleIncome > 50 && sampleCreditScore > 680;
    const t2 = sampleIncome > 60 || sampleCreditScore > 740;
    const t3 = sampleCreditScore > 700;
    const t4 = sampleIncome > 45 && sampleCreditScore > 650;
    const t5 = sampleIncome > 70;
    const votes = [t1, t2, t3, t4, t5];
    const approveCount = votes.filter(Boolean).length;
    return { votes, approveCount, majority: approveCount >= 3 };
  };

  const forestResult = getTreeVotes();

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-indigo-500/30 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>{lang === 'te' ? 'మాడ్యూల్ 02: అల్గారిథమ్ ల్యాబ్' : 'Module 02: Algorithm Lab'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {lang === 'te' ? 'రిగ్రెషన్, క్లస్టరింగ్ & ఎన్‌సెంబుల్ ల్యాబ్' : 'Linear/Logistic Regression • K-Means • Random Forest'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              {lang === 'te'
                ? 'మెషిన్ లెర్నింగ్ ప్రధాన అల్గారిథమ్‌లను ఇంటరాక్టివ్‌గా పరీక్షించండి: స్లోప్ మరియు ఇంటర్‌సెప్ట్ మార్చి MSE గణన, K-Means సెంట్రాయిడ్స్ మరియు రాండమ్ ఫారెస్ట్ ఓటింగ్.'
                : 'Interact with core ML statistical engines: live regression parameter tuning with MSE minimization, K-Means centroid clustering, and ensemble bagging decision trees.'}
            </p>
          </div>

          <AudioButton
            text={lang === 'te' ? 'మాడ్యూల్ 02 అల్గారిథమ్ ల్యాబ్. లీనియర్ రిగ్రెషన్, కె-మీన్స్ క్లస్టరింగ్ మరియు రాండమ్ ఫారెస్ట్.' : 'Module 02 Algorithm Lab. Linear and logistic regression, K-Means clustering, and random forest ensembles.'}
            lang={lang}
          />
        </div>
      </div>

      {/* Algorithm Lab Navigation Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 glass-panel rounded-2xl border border-slate-800">
        <button
          onClick={() => setActiveTab('regression')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'regression'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>{lang === 'te' ? '1. లీనియర్ & లాజిస్టిక్ రిగ్రెషన్' : '1. Linear & Logistic Regression'}</span>
        </button>
        <button
          onClick={() => setActiveTab('kmeans')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'kmeans'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Boxes className="w-4 h-4" />
          <span>{lang === 'te' ? '2. K-Means క్లస్టరింగ్ & ఎల్బో మెథడ్' : '2. K-Means & Elbow Method'}</span>
        </button>
        <button
          onClick={() => setActiveTab('randomforest')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'randomforest'
              ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <GitFork className="w-4 h-4" />
          <span>{lang === 'te' ? '3. రాండమ్ ఫారెస్ట్ ఎన్‌సెంబుల్స్' : '3. Random Forest Ensembles'}</span>
        </button>
      </div>

      {/* TAB 1: LINEAR & LOGISTIC REGRESSION */}
      {activeTab === 'regression' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <span>{lang === 'te' ? 'ఇంటరాక్టివ్ లీనియర్ రిగ్రెషన్ ప్లేగ్రౌండ్' : 'Interactive Linear Regression Playground'}</span>
              </h3>
              <p className="text-xs text-slate-400">
                Formula: <span className="font-mono text-indigo-300 font-bold">ŷ = mx + b</span> | Objective: Minimize Mean Squared Error (MSE)
              </p>
            </div>

            <div className="px-3 py-1 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-bold">
              Current MSE: <span className={Number(currentMSE) < 15 ? 'text-emerald-400' : 'text-amber-400'}>{currentMSE}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-6 items-center">
            
            {/* SVG 2D Scatter & Regression Line Plot */}
            <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
              <svg className="w-full max-w-[420px] aspect-[4/3]" viewBox="0 0 320 240">
                {/* Grid lines */}
                <line x1="30" y1="210" x2="300" y2="210" stroke="#334155" strokeWidth="1.5" />
                <line x1="30" y1="20" x2="30" y2="210" stroke="#334155" strokeWidth="1.5" />
                
                {/* Labels */}
                <text x="160" y="232" fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="monospace">Feature Input (x)</text>
                <text x="12" y="115" fill="#64748b" fontSize="10" textAnchor="middle" transform="rotate(-90 12 115)" fontFamily="monospace">Target (y)</text>

                {/* Regression Line: y = mx + b */}
                {/* Map x: 0..80 to canvas: 30..290, y: 0..140 to canvas: 210..30 */}
                {(() => {
                  const x1 = 0;
                  const y1 = slope * x1 + intercept;
                  const x2 = 80;
                  const y2 = slope * x2 + intercept;

                  const cx1 = 30 + (x1 / 80) * 260;
                  const cy1 = 210 - (y1 / 140) * 180;
                  const cx2 = 30 + (x2 / 80) * 260;
                  const cy2 = 210 - (y2 / 140) * 180;

                  return (
                    <line
                      x1={cx1}
                      y1={cy1}
                      x2={cx2}
                      y2={cy2}
                      stroke="#818cf8"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  );
                })()}

                {/* Scatter Data Points & Residual Error Bars */}
                {regressionPoints.map((pt, idx) => {
                  const cx = 30 + (pt.x / 80) * 260;
                  const cy = 210 - (pt.y / 140) * 180;
                  const predY = slope * pt.x + intercept;
                  const predCy = 210 - (predY / 140) * 180;

                  return (
                    <g key={idx}>
                      {/* Residual dashed line */}
                      <line
                        x1={cx}
                        y1={cy}
                        x2={cx}
                        y2={predCy}
                        stroke="#f43f5e"
                        strokeWidth="1"
                        strokeDasharray="2,2"
                      />
                      <circle cx={cx} cy={cy} r="5" fill="#2dd4bf" stroke="#0f172a" strokeWidth="1.5" />
                    </g>
                  );
                })}
              </svg>

              <div className="flex items-center space-x-4 text-[11px] text-slate-400 mt-2 font-mono">
                <span className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-400 inline-block" />
                  <span>Actual Observations</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-3 h-0.5 bg-indigo-400 inline-block" />
                  <span>Fitted Line (ŷ)</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-3 h-0.5 border-t border-dashed border-rose-400 inline-block" />
                  <span>Residual Loss (e)</span>
                </span>
              </div>
            </div>

            {/* Parameter Tuning Controls */}
            <div className="lg:col-span-5 space-y-5 p-5 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold font-mono">
                  <span className="text-indigo-300">Slope Parameter (m): {slope}</span>
                  <span className="text-slate-400">Rate of change</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.2"
                  step="0.05"
                  value={slope}
                  onChange={(e) => setSlope(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold font-mono">
                  <span className="text-teal-300">Bias / Intercept (b): {intercept}</span>
                  <span className="text-slate-400">Base offset</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="35"
                  step="1"
                  value={intercept}
                  onChange={(e) => setIntercept(parseInt(e.target.value))}
                  className="w-full accent-teal-500 cursor-pointer"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 text-xs">
                <div className="font-bold text-white">Gradient Descent Tip:</div>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  {lang === 'te'
                    ? 'స్లోప్ మరియు ఇంటర్‌సెప్ట్‌ను అడ్జస్ట్ చేసి రెడ్ డాష్డ్ ఎర్రర్ లైన్లను అతి తక్కువగా (MSE < 15) చేయడమే మెషిన్ లెర్నింగ్ లక్ష్యం.'
                    : 'Adjust parameters to minimize the red residual lines. Optimal fit occurs around m = 1.45, b = 10, driving MSE to minimum.'}
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: K-MEANS CLUSTERING */}
      {activeTab === 'kmeans' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <span>{lang === 'te' ? 'K-Means క్లస్టరింగ్ & ఎల్బో మెథడ్ ల్యాబ్' : 'K-Means Clustering & The Elbow Method'}</span>
              </h3>
              <p className="text-xs text-slate-400">
                Unsupervised partitioning into K cohesive clusters by iteratively updating centroids.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono text-slate-400">Clusters (K):</span>
              {[2, 3, 4].map((k) => (
                <button
                  key={k}
                  onClick={() => setClustersK(k)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    clustersK === k
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  K = {k}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-6 items-center">
            
            {/* 2D Clustering Scatter Plot */}
            <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
              <svg className="w-full max-w-[400px] aspect-square" viewBox="0 0 100 100">
                {/* 2D Grid */}
                <line x1="5" y1="95" x2="95" y2="95" stroke="#1e293b" strokeWidth="1" />
                <line x1="5" y1="5" x2="5" y2="95" stroke="#1e293b" strokeWidth="1" />

                {/* Points */}
                {clusterPoints.map((pt, idx) => {
                  const assignedColor = clusterColors[idx % clustersK];
                  return (
                    <circle
                      key={idx}
                      cx={pt.x}
                      cy={100 - pt.y}
                      r="3.5"
                      fill={assignedColor}
                      stroke="#020617"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Centroids */}
                {Array.from({ length: clustersK }).map((_, cIdx) => {
                  // synthetic centroid positions
                  const cx = cIdx === 0 ? 25 : cIdx === 1 ? 75 : cIdx === 2 ? 30 : 78;
                  const cy = cIdx === 0 ? 30 : cIdx === 1 ? 75 : cIdx === 2 ? 80 : 28;
                  return (
                    <g key={`c-${cIdx}`}>
                      <polygon
                        points={`${cx},${100 - cy - 5} ${cx + 5},${100 - cy + 4} ${cx - 5},${100 - cy + 4}`}
                        fill={clusterColors[cIdx]}
                        stroke="#fff"
                        strokeWidth="1"
                      />
                    </g>
                  );
                })}
              </svg>

              <div className="text-[11px] text-slate-400 mt-2 font-mono flex items-center space-x-3">
                <span className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
                  <span>Data Points</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="text-amber-300">▲</span>
                  <span>Cluster Centroid (μ_k)</span>
                </span>
              </div>
            </div>

            {/* Elbow Method Insight Card */}
            <div className="lg:col-span-5 space-y-4 p-5 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="font-bold text-sm text-purple-300">
                The Elbow Method (Optimal K Selection):
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {lang === 'te'
                  ? 'K విలువను పెంచే కొద్దీ ఇనెర్షియా (Inertia - క్లస్టర్ లోపలి దూరం) తగ్గుతుంది. ఇనెర్షియా తగ్గే వేగం ఆగిపోయే మోచేయి వంపు లాంటి పాయింట్‌నే (Elbow point) ఆప్టిమల్ K అంటారు.'
                  : 'As K increases, Within-Cluster Sum of Squares (WCSS inertia) drops. The optimal number of clusters is the "elbow point" where the rate of decrease abruptly bends.'}
              </p>

              <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-200 space-y-1">
                <div className="font-bold">Recommendation for this dataset:</div>
                <div>Optimal K = 3 (Balances cluster cohesion without overfitting single points).</div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 3: RANDOM FOREST ENSEMBLES */}
      {activeTab === 'randomforest' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <span>{lang === 'te' ? 'రాండమ్ ఫారెస్ట్ ఎన్‌సెంబుల్ ఓటింగ్ ల్యాబ్' : 'Random Forest Bagging & Ensemble Voting'}</span>
              </h3>
              <p className="text-xs text-slate-400">
                Multiple uncorrelated decision trees aggregate votes to reduce variance and eliminate overfitting.
              </p>
            </div>
            <span className="text-xs font-mono text-teal-400 bg-teal-950/40 px-2.5 py-1 rounded-lg border border-teal-500/20">
              5 Decision Trees Active
            </span>
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            
            {/* Input Sliders */}
            <div className="lg:col-span-5 space-y-5 p-5 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Applicant Loan Evaluation Features:
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-teal-300">Annual Income: ${sampleIncome}k</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  step="5"
                  value={sampleIncome}
                  onChange={(e) => setSampleIncome(parseInt(e.target.value))}
                  className="w-full accent-teal-500 cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-indigo-300">Credit Score: {sampleCreditScore}</span>
                </div>
                <input
                  type="range"
                  min="550"
                  max="850"
                  step="10"
                  value={sampleCreditScore}
                  onChange={(e) => setSampleCreditScore(parseInt(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>
            </div>

            {/* 5 Trees Voting Box */}
            <div className="lg:col-span-7 space-y-4 p-5 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                  Individual Tree Classifications:
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {forestResult.votes.map((vote, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        vote
                          ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300'
                          : 'bg-rose-950/50 border-rose-500/40 text-rose-300'
                      }`}
                    >
                      <div className="text-[10px] font-mono opacity-80">Tree #{idx + 1}</div>
                      <div className="text-xs font-bold mt-1">{vote ? 'APPROVED' : 'REJECT'}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ensemble Consensus Output */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-mono text-slate-400">Ensemble Majority Vote:</div>
                  <div className={`text-base font-black ${forestResult.majority ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {forestResult.majority ? 'LOAN APPROVED (Majority ≥ 3)' : 'LOAN REJECTED (Insufficient Votes)'}
                  </div>
                </div>
                <div className="text-right text-xs font-mono font-bold text-slate-300">
                  {forestResult.approveCount} / 5 Trees Voting Yes
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Gateway to Deep Learning Visualizers */}
      <div className="p-6 rounded-3xl glass-panel-glow border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-300 shrink-0">
            <Brain className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">
              {lang === 'te' ? 'డీప్ లెర్నింగ్ ఆర్కిటెక్చర్స్ (CNN, RNN, ట్రాన్స్‌ఫార్మర్స్)' : 'Advance to Deep Learning Visualizers (CNN, RNN, Transformers)'}
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              {lang === 'te' ? '3x3 కన్వొల్యూషన్ ఫిల్టర్లు, LSTM గేట్లు మరియు సెల్ఫ్-అటెన్షన్ హీట్‌మ్యాప్స్ చూడండి.' : 'Explore 3x3 convolution filters, LSTM gating loops, and Self-Attention heatmaps.'}
            </p>
          </div>
        </div>

        {onSelectDeepLearning && (
          <button
            onClick={onSelectDeepLearning}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center space-x-1.5 shrink-0 active:scale-95 transition-all"
          >
            <span>{lang === 'te' ? 'డీప్ లెర్నింగ్ ఓపెన్ చేయండి' : 'Launch Deep Learning Studio'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

    </div>
  );
}
