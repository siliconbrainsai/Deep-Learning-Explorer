import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  Layers, 
  Sliders, 
  Activity, 
  Car, 
  ScanFace, 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  ChevronRight, 
  Binary, 
  Cpu, 
  CheckCircle2 
} from 'lucide-react';
import AudioButton from '../AudioButton';

// Sample 8x8 input image bitmaps
const IMAGE_DATA = {
  cat: {
    labelEn: "Cat Portrait 🐱",
    labelTe: "పిల్లి ముఖం 🐱",
    matrix: [
      [0, 180, 0,   0,   0,   0, 180, 0],
      [180, 220, 180, 0, 0, 180, 220, 180],
      [180, 255, 255, 200, 200, 255, 255, 180],
      [180, 60,  255, 255, 255, 255, 60,  180], // eyes at (3,1) and (3,6)
      [180, 255, 255, 255, 255, 255, 255, 180],
      [100, 255, 80,  255, 255, 80,  255, 100], // nose/whiskers
      [0,   180, 255, 120, 120, 255, 180, 0],   // mouth
      [0,   0,   180, 180, 180, 180, 0,   0]
    ],
    predClass: "Cat (Felis catus)",
    predProb: "98.4%",
    featureSummaryEn: "Retina filters detect ear triangles, eye circular contrast, and whisker ridges.",
    featureSummaryTe: "చెవుల త్రిభుజాకారాలు, కళ్ల గుండ్రని కాంట్రాస్ట్ మరియు మీసాల గీతలను గుర్తిస్తుంది."
  },
  digit8: {
    labelEn: "Handwritten Digit '8' 🔢",
    labelTe: "చేతిరాత సంఖ్య '8' 🔢",
    matrix: [
      [0,   0, 180, 240, 240, 180, 0,   0],
      [0, 220, 255, 80,  80,  255, 220, 0],
      [0, 220, 255, 0,   0,   255, 220, 0],
      [0,   0, 200, 255, 255, 200, 0,   0], // waist
      [0, 230, 255, 0,   0,   255, 230, 0],
      [0, 240, 255, 0,   0,   255, 240, 0],
      [0, 220, 255, 90,  90,  255, 220, 0],
      [0,   0, 180, 250, 250, 180, 0,   0]
    ],
    predClass: "Digit 8 (MNIST)",
    predProb: "99.1%",
    featureSummaryEn: "Top loop, bottom loop, and central crossing intersection detected.",
    featureSummaryTe: "పై లూప్, క్రింది లూప్ మరియు మధ్యలో కలిసే క్రాసింగ్ జంక్షన్‌ను గుర్తిస్తుంది."
  },
  face: {
    labelEn: "Human Face 👤",
    labelTe: "మనిషి ముఖం 👤",
    matrix: [
      [0,   120, 200, 220, 220, 200, 120, 0],
      [140, 240, 240, 240, 240, 240, 240, 140],
      [180, 255, 60,  240, 240, 60,  255, 180], // eyes
      [180, 255, 240, 100, 100, 240, 255, 180], // nose bridge
      [180, 255, 240, 240, 240, 240, 255, 180],
      [160, 255, 80,  120, 120, 80,  255, 160], // lips
      [0,   180, 255, 240, 240, 255, 180, 0],
      [0,   0,   160, 220, 220, 160, 0,   0]
    ],
    predClass: "Human Face (FaceID)",
    predProb: "97.8%",
    featureSummaryEn: "Inter-pupillary distance, cheek contours, and jawline boundary detected.",
    featureSummaryTe: "కళ్ల మధ్య దూరం, బుగ్గల ఆకారం మరియు దవడ సరిహద్దులను గుర్తిస్తుంది."
  }
};

// 3x3 Convolution Kernels
const KERNELS = {
  edge: {
    name: "Edge Detection (Sobel)",
    weights: [
      [-1, -1, -1],
      [-1,  8, -1],
      [-1, -1, -1]
    ],
    descEn: "Highlights rapid pixel intensity transitions (outlines/edges).",
    descTe: "పిక్సెల్స్ మధ్య మార్పులను వెతికి వస్తువు అంచులను హైలైట్ చేస్తుంది."
  },
  sharpen: {
    name: "Sharpen Filter",
    weights: [
      [ 0, -1,  0],
      [-1,  5, -1],
      [ 0, -1,  0]
    ],
    descEn: "Amplifies contrast differences between adjacent pixels.",
    descTe: "పక్కపక్కనే ఉండే పిక్సెల్స్ తేడాలను పెంచి ఇమేజ్‌ను షార్ప్‌గా చేస్తుంది."
  },
  blur: {
    name: "Gaussian Blur",
    weights: [
      [1/16, 2/16, 1/16],
      [2/16, 4/16, 2/16],
      [1/16, 2/16, 1/16]
    ],
    descEn: "Averages neighboring pixels to suppress high-frequency noise.",
    descTe: "పక్క పిక్సెల్స్ సగటు తీసుకొని నాయిస్ ను తగ్గిస్తుంది."
  },
  ridge: {
    name: "Ridge / Contour",
    weights: [
      [-1, -2, -1],
      [ 0,  0,  0],
      [ 1,  2,  1]
    ],
    descEn: "Detects horizontal contours and horizontal gradient shifts.",
    descTe: "క్షితిజ సమాంతర సరిహద్దులు మరియు కాంతి మార్పులను గుర్తిస్తుంది."
  }
};

export default function CNNSection({ lang = 'en', audience = 'student', cnnData }) {
  const [selectedImageKey, setSelectedImageKey] = useState('cat');
  const [selectedKernelKey, setSelectedKernelKey] = useState('edge');
  const [kernelPos, setKernelPos] = useState({ r: 2, c: 2 });
  const [isScanning, setIsScanning] = useState(false);
  const [activePipelineStage, setActivePipelineStage] = useState(1);

  const currentImg = IMAGE_DATA[selectedImageKey];
  const currentKernel = KERNELS[selectedKernelKey];

  // Auto scanning convolution filter simulation
  useEffect(() => {
    let interval = null;
    if (isScanning) {
      interval = setInterval(() => {
        setKernelPos((prev) => {
          let nextC = prev.c + 1;
          let nextR = prev.r;
          if (nextC > 5) {
            nextC = 0;
            nextR = prev.r + 1;
            if (nextR > 5) {
              nextR = 0;
            }
          }
          return { r: nextR, c: nextC };
        });
      }, 700);
    }
    return () => clearInterval(interval);
  }, [isScanning]);

  // Compute 3x3 dot product at current kernel position
  const computeKernelDotProduct = (r, c) => {
    let sum = 0;
    const details = [];
    for (let kr = 0; kr < 3; kr++) {
      for (let kc = 0; kc < 3; kc++) {
        const pixelVal = currentImg.matrix[r + kr][c + kc];
        const weight = currentKernel.weights[kr][kc];
        const prod = pixelVal * weight;
        sum += prod;
        details.push({ pixelVal, weight, prod });
      }
    }
    const relu = Math.max(0, sum);
    return { raw: Math.round(sum), relu: Math.round(relu), details };
  };

  const currentComputation = computeKernelDotProduct(kernelPos.r, kernelPos.c);

  // Compute 6x6 Convolved Feature Map
  const convolvedMap = [];
  for (let r = 0; r <= 5; r++) {
    const row = [];
    for (let c = 0; c <= 5; c++) {
      let sum = 0;
      for (let kr = 0; kr < 3; kr++) {
        for (let kc = 0; kc < 3; kc++) {
          sum += currentImg.matrix[r + kr][c + kc] * currentKernel.weights[kr][kc];
        }
      }
      row.push(Math.max(0, Math.round(sum)));
    }
    convolvedMap.push(row);
  }

  // Compute 3x3 Max Pooled Map from 6x6 (stride 2, pool size 2)
  const pooledMap = [];
  for (let pr = 0; pr < 6; pr += 2) {
    const pRow = [];
    for (let pc = 0; pc < 6; pc += 2) {
      const maxVal = Math.max(
        convolvedMap[pr][pc],
        convolvedMap[pr][pc + 1] || 0,
        convolvedMap[pr + 1]?.[pc] || 0,
        convolvedMap[pr + 1]?.[pc + 1] || 0
      );
      pRow.push(maxVal);
    }
    pooledMap.push(pRow);
  }

  const isKernelCell = (r, c) => {
    return r >= kernelPos.r && r < kernelPos.r + 3 && c >= kernelPos.c && c < kernelPos.c + 3;
  };

  const getRealWorldIcon = (iconName) => {
    switch (iconName) {
      case 'Activity': return <Activity className="w-6 h-6 text-emerald-400" />;
      case 'Car': return <Car className="w-6 h-6 text-sky-400" />;
      case 'ScanFace': return <ScanFace className="w-6 h-6 text-purple-400" />;
      default: return <Sparkles className="w-6 h-6 text-indigo-400" />;
    }
  };

  return (
    <section className="glass-panel rounded-3xl p-6 sm:p-8 space-y-8 relative overflow-hidden transition-all border border-indigo-500/20">
      
      {/* Glow decorative corner */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div className="flex items-start space-x-3.5">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-800 text-white shadow-lg shadow-indigo-500/20 shrink-0">
            <Eye className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {cnnData.title}
              </h3>
              <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {cnnData.badge}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
              {cnnData.description}
            </p>
          </div>
        </div>

        <div className="shrink-0 flex items-center space-x-2">
          <AudioButton 
            text={cnnData.ttsText}
            lang={lang}
            labelEn="Listen (Audio)"
            labelTe="వినండి (ఆడియో)"
          />
        </div>
      </div>

      {/* Audience Perspective Callout */}
      {audience === 'student' ? (
        <div className="p-4 sm:p-5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-100 flex items-start space-x-3.5 shadow-md">
          <span className="text-2xl mt-0.5">👁️</span>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-1">
              {lang === 'te' ? 'విద్యార్థి విజువల్ పోలిక (Analogy)' : 'Student Intuitive Analogy'}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {cnnData.studentAnalogy}
            </p>
          </div>
        </div>
      ) : (
        <div className="p-4 sm:p-5 rounded-2xl bg-teal-950/40 border border-teal-500/30 text-teal-100 flex items-start space-x-3.5 shadow-md">
          <Cpu className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-teal-300 mb-1">
              {lang === 'te' ? 'ఇంజనీరింగ్ కోర్ ఆర్కిటెక్చర్' : 'Engineering Core Architecture'}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {cnnData.engineeringDetails.formula.name}: <span className="font-mono text-teal-300 font-bold bg-slate-900 px-2 py-0.5 rounded border border-teal-500/30">{cnnData.engineeringDetails.formula.math}</span>. {cnnData.engineeringDetails.formula.desc}
            </p>
          </div>
        </div>
      )}

      {/* Interactive Controls Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        
        {/* Input Image Selector */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
            {lang === 'te' ? 'ఇమేజ్:' : 'Image:'}
          </span>
          <div className="flex space-x-1.5">
            {Object.keys(IMAGE_DATA).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedImageKey(key);
                  setKernelPos({ r: 2, c: 2 });
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  selectedImageKey === key
                    ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
                }`}
              >
                {lang === 'te' ? IMAGE_DATA[key].labelTe : IMAGE_DATA[key].labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Kernel Selector */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
            {lang === 'te' ? 'ఫిల్టర్:' : 'Kernel:'}
          </span>
          <select
            value={selectedKernelKey}
            onChange={(e) => setSelectedKernelKey(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-200 text-xs font-semibold rounded-xl px-3 py-1.5 focus:outline-none focus:border-indigo-500"
          >
            {Object.keys(KERNELS).map((k) => (
              <option key={k} value={k}>
                {KERNELS[k].name}
              </option>
            ))}
          </select>
        </div>

        {/* Auto Scan Play / Pause & Reset */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsScanning(!isScanning)}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
              isScanning
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-400/50 shadow-md shadow-indigo-600/30'
            }`}
          >
            {isScanning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isScanning ? (lang === 'te' ? 'పాజ్' : 'Pause Scan') : (lang === 'te' ? 'ఆటో స్కాన్' : 'Auto Scan')}</span>
          </button>
          <button
            onClick={() => {
              setIsScanning(false);
              setKernelPos({ r: 0, c: 0 });
            }}
            title="Reset to (0,0)"
            className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Visualizer Canvas / Grid Display */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: 8x8 Input Image with 3x3 Sliding Window Overlay */}
        <div className="lg:col-span-4 glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col items-center space-y-4">
          <div className="w-full flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200">
              1. {lang === 'te' ? 'ఇన్‌పుట్ పిక్సెల్స్ (8x8)' : 'Input Image Grid (8x8)'}
            </span>
            <span className="text-[10px] text-indigo-400 font-mono">
              Window @ ({kernelPos.r}, {kernelPos.c})
            </span>
          </div>

          {/* 8x8 Grid */}
          <div className="grid grid-cols-8 gap-1 p-2 bg-slate-950 rounded-2xl border border-slate-800 w-full max-w-[280px] aspect-square shadow-inner">
            {currentImg.matrix.map((row, r) =>
              row.map((val, c) => {
                const inKernel = isKernelCell(r, c);
                const isCenter = r === kernelPos.r + 1 && c === kernelPos.c + 1;
                return (
                  <div
                    key={`${r}-${c}`}
                    onClick={() => {
                      if (r <= 5 && c <= 5) {
                        setKernelPos({ r, c });
                        setIsScanning(false);
                      }
                    }}
                    title={`Pixel (${r},${c}) = ${val}`}
                    className={`rounded transition-all cursor-pointer flex items-center justify-center text-[8px] font-mono select-none relative ${
                      inKernel
                        ? 'ring-2 ring-indigo-400 z-10 scale-105 shadow-md shadow-indigo-500/50'
                        : 'hover:opacity-80'
                    }`}
                    style={{
                      backgroundColor: `rgb(${val}, ${val}, ${val})`,
                      color: val > 140 ? '#000' : '#fff'
                    }}
                  >
                    {inKernel && (
                      <span className={`text-[7px] font-bold ${isCenter ? 'text-rose-500' : 'text-indigo-400'}`}>
                        •
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>

          <div className="text-[11px] text-slate-400 text-center leading-tight">
            {lang === 'te'
              ? 'గ్రిడ్‌లోని ఏదైనా సెల్‌పై క్లిక్ చేసి 3x3 ఫిల్టర్‌ను అక్కడికి తరలించండి.'
              : 'Click any cell inside the 8x8 grid to position the 3x3 kernel.'}
          </div>
        </div>

        {/* Middle Column: Mathematical Dot-Product & Kernel Weights */}
        <div className="lg:col-span-4 glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-teal-300">
                2. {lang === 'te' ? '3x3 కర్నల్ డాట్ ప్రాడక్ట్' : '3x3 Kernel Calculation'}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {currentKernel.name}
              </span>
            </div>

            {/* 3x3 Kernel weights view */}
            <div className="grid grid-cols-3 gap-1.5 p-2 bg-slate-950/80 rounded-xl border border-slate-800/80 max-w-[200px] mx-auto my-2">
              {currentKernel.weights.map((kRow, kr) =>
                kRow.map((w, kc) => (
                  <div
                    key={`${kr}-${kc}`}
                    className="p-2 rounded bg-indigo-950/30 border border-indigo-500/20 text-center font-mono text-xs font-bold text-indigo-300"
                  >
                    {w}
                  </div>
                ))
              )}
            </div>

            <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
              {lang === 'te' ? currentKernel.descTe : currentKernel.descEn}
            </p>
          </div>

          {/* Real-time Math Output Card */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/90 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono">Convolution Sum (Σ):</span>
              <span className="font-mono font-bold text-indigo-300 text-sm">
                {currentComputation.raw}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono">After ReLU [max(0, Σ)]:</span>
              <span className="font-mono font-bold text-emerald-400 text-sm">
                {currentComputation.relu}
              </span>
            </div>
            <div className="text-[10px] text-slate-500 italic pt-1 border-t border-slate-900">
              {currentComputation.raw <= 0 
                ? (lang === 'te' ? 'నెగటివ్ విలువ సున్నా (0) కి తగ్గించబడింది.' : 'Negative signal clamped to 0 by ReLU.')
                : (lang === 'te' ? 'ఫీచర్ యాక్టివేట్ అయ్యింది, ముందుకు వెళ్తుంది.' : 'Strong spatial edge feature detected.')}
            </div>
          </div>
        </div>

        {/* Right Column: Convolved Map (6x6) & Max Pooled Map (3x3) */}
        <div className="lg:col-span-4 glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col items-center justify-between space-y-4">
          <div className="w-full flex items-center justify-between">
            <span className="text-xs font-bold text-purple-300">
              3. {lang === 'te' ? 'ఫీచర్ మ్యాప్ & పూలింగ్' : 'Feature Map & Max Pooling'}
            </span>
            <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30">
              Downsampled 75%
            </span>
          </div>

          {/* 6x6 Convolved Feature Map */}
          <div className="w-full space-y-1">
            <div className="text-[10px] text-slate-400 font-medium">
              {lang === 'te' ? 'కన్వొల్యూషన్ మ్యాప్ (6x6):' : 'Convolved Map (6x6):'}
            </div>
            <div className="grid grid-cols-6 gap-1 p-2 bg-slate-950 rounded-xl border border-slate-800 max-w-[200px] mx-auto aspect-square">
              {convolvedMap.map((cRow, cr) =>
                cRow.map((cVal, cc) => {
                  const isCurrent = cr === kernelPos.r && cc === kernelPos.c;
                  const normalized = Math.min(255, Math.floor(cVal * 0.25));
                  return (
                    <div
                      key={`c-${cr}-${cc}`}
                      title={`Convolved (${cr},${cc}) = ${cVal}`}
                      className={`rounded transition-all flex items-center justify-center text-[7px] font-mono ${
                        isCurrent ? 'ring-2 ring-emerald-400 scale-110 z-10' : ''
                      }`}
                      style={{
                        backgroundColor: `rgb(${normalized}, ${Math.floor(normalized * 0.7)}, ${Math.floor(normalized * 1.2)})`,
                        color: normalized > 120 ? '#000' : '#fff'
                      }}
                    >
                      {isCurrent ? '★' : ''}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* 3x3 Max Pooled Map */}
          <div className="w-full space-y-1">
            <div className="text-[10px] text-slate-400 font-medium">
              {lang === 'te' ? 'మ్యాక్స్ పూలింగ్ (3x3 - Stride 2):' : 'Max Pooled Map (3x3 - Stride 2):'}
            </div>
            <div className="grid grid-cols-3 gap-1.5 p-2 bg-slate-950 rounded-xl border border-slate-800 max-w-[140px] mx-auto aspect-square">
              {pooledMap.map((pRow, pr) =>
                pRow.map((pVal, pc) => {
                  const pNorm = Math.min(255, Math.floor(pVal * 0.25));
                  return (
                    <div
                      key={`p-${pr}-${pc}`}
                      title={`Max Pooled (${pr},${pc}) = ${pVal}`}
                      className="rounded bg-indigo-900/60 border border-indigo-500/30 flex items-center justify-center text-[9px] font-mono font-bold text-indigo-200"
                      style={{
                        backgroundColor: `rgba(99, 102, 241, ${Math.max(0.2, pNorm / 255)})`
                      }}
                    >
                      {pVal}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Final Softmax Prediction */}
          <div className="w-full bg-slate-950/90 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">
                {lang === 'te' ? 'చివరి ప్రిడిక్షన్:' : 'Final Prediction:'}
              </div>
              <div className="font-bold text-white text-xs">
                {currentImg.predClass}
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-extrabold text-emerald-400">
                {currentImg.predProb}
              </span>
              <div className="text-[9px] text-slate-500">Softmax Confidence</div>
            </div>
          </div>
        </div>

      </div>

      {/* Engineering Details (Tabs & Formulas) */}
      <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-4">
        <div className="flex items-center space-x-2">
          <Sliders className="w-4 h-4 text-indigo-400" />
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            {cnnData.engineeringDetails.title}
          </h4>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="text-xs font-bold text-indigo-300 mb-1">
              {cnnData.engineeringDetails.stride.name}
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {cnnData.engineeringDetails.stride.desc}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="text-xs font-bold text-teal-300 mb-1">
              {cnnData.engineeringDetails.padding.name}
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {cnnData.engineeringDetails.padding.desc}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="text-xs font-bold text-purple-300 mb-1">
              {cnnData.engineeringDetails.pooling.name}
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {cnnData.engineeringDetails.pooling.desc}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="text-xs font-bold text-emerald-300 mb-1">
              {cnnData.engineeringDetails.dense.name}
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {cnnData.engineeringDetails.dense.desc}
            </p>
          </div>
        </div>
      </div>

      {/* Real-world Examples */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {lang === 'te' ? 'నిజ జీవితంలో అనువర్తనాలు (Real-World Applications)' : 'Real-World Production Applications'}
          </h4>
          <span className="text-[11px] text-indigo-400 font-semibold">Computer Vision in Production</span>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {cnnData.realWorld.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-3 group hover:translate-y-[-2px]"
            >
              <div className="flex items-start space-x-3">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 shrink-0 group-hover:scale-105 transition-transform">
                  {getRealWorldIcon(item.icon)}
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm group-hover:text-indigo-200 transition-colors">
                    {item.name}
                  </h5>
                  <span className="text-[10px] text-teal-400 font-medium">
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
