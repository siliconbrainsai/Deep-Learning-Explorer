import React, { useState, useEffect } from 'react';
import { Activity, Zap, Cpu, TrendingDown, CheckCircle2, Clock, Play, Pause } from 'lucide-react';

export default function LiveTelemetryMonitor({ t, lang }) {
  const [isLive, setIsLive] = useState(true);
  const [lossValue, setLossValue] = useState(0.1894);
  const [step, setStep] = useState(104);
  const [throughput, setThroughput] = useState(1.28);
  const [points, setPoints] = useState([
    0.48, 0.42, 0.38, 0.33, 0.29, 0.25, 0.22, 0.20, 0.192, 0.1894
  ]);

  useEffect(() => {
    let interval = null;
    if (isLive) {
      interval = setInterval(() => {
        setStep((s) => s + 1);
        const delta = (Math.random() - 0.52) * 0.0025;
        setLossValue((prev) => {
          const next = Math.max(0.11, Number((prev + delta).toFixed(4)));
          setPoints((prevPts) => [...prevPts.slice(1), next]);
          return next;
        });
        setThroughput(Number((1.25 + Math.random() * 0.08).toFixed(2)));
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isLive]);

  const tele = t.telemetry || {};

  // Build SVG path for loss curve
  const svgWidth = 260;
  const svgHeight = 45;
  const minVal = 0.1;
  const maxVal = 0.5;

  const pathD = points
    .map((val, idx) => {
      const x = (idx / (points.length - 1)) * svgWidth;
      const normalizedY = 1 - (val - minVal) / (maxVal - minVal);
      const y = Math.max(4, Math.min(svgHeight - 4, normalizedY * svgHeight));
      return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <div className="glass-panel p-4 rounded-2xl border border-indigo-500/20 bg-slate-950/70 shadow-lg relative overflow-hidden">
      
      {/* Top Telemetry Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
            {t.telemetryTitle || "LIVE ML MODEL TRAINING MONITOR"}
          </span>
          <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-500/30">
            {t.telemetryRun || `Active Run #${step} • ai-odyssey-student-classifier`}
          </span>
        </div>

        <div className="flex items-center space-x-2 self-end sm:self-auto">
          <button
            onClick={() => setIsLive(!isLive)}
            className="flex items-center space-x-1 text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          >
            {isLive ? <Pause className="w-2.5 h-2.5 text-amber-400" /> : <Play className="w-2.5 h-2.5 text-emerald-400" />}
            <span>{isLive ? 'LIVE' : 'PAUSED'}</span>
          </button>
        </div>
      </div>

      {/* Real-time Telemetry Grid & Loss Curve */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-3 items-center">
        
        {/* Metric 1: Optimizer */}
        <div className="space-y-0.5">
          <div className="text-[10px] font-mono text-slate-400 flex items-center space-x-1">
            <Cpu className="w-3 h-3 text-indigo-400" />
            <span>Optimizer:</span>
          </div>
          <div className="text-xs font-mono font-bold text-white">
            {tele.optimizer || "Adam (η = 0.001)"}
          </div>
        </div>

        {/* Metric 2: Live Loss Curve SVG */}
        <div className="col-span-2 sm:col-span-1 lg:col-span-2 space-y-1">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-slate-400 flex items-center space-x-1">
              <TrendingDown className="w-3 h-3 text-teal-400" />
              <span>Loss Curve (MSE):</span>
            </span>
            <span className="text-emerald-400 font-bold">
              {lossValue} (↓ -14.2%)
            </span>
          </div>
          {/* Mini Sparkline SVG */}
          <svg
            className="w-full h-8 overflow-visible"
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="lossGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d={pathD}
              fill="none"
              stroke="#2dd4bf"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Pulsing head */}
            <circle
              cx={svgWidth}
              cy={
                Math.max(
                  4,
                  Math.min(
                    svgHeight - 4,
                    (1 - (lossValue - minVal) / (maxVal - minVal)) * svgHeight
                  )
                )
              }
              r="3.5"
              fill="#2dd4bf"
              className="animate-ping"
            />
          </svg>
        </div>

        {/* Metric 3: Val Accuracy */}
        <div className="space-y-0.5">
          <div className="text-[10px] font-mono text-slate-400 flex items-center space-x-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>Val Accuracy:</span>
          </div>
          <div className="text-xs font-mono font-bold text-emerald-300">
            {tele.valAccuracy || "91.2% (Top-1)"}
          </div>
        </div>

        {/* Metric 4: Batch Latency */}
        <div className="space-y-0.5">
          <div className="text-[10px] font-mono text-slate-400 flex items-center space-x-1">
            <Clock className="w-3 h-3 text-sky-400" />
            <span>Latency:</span>
          </div>
          <div className="text-xs font-mono font-bold text-sky-300">
            1.2ms <span className="text-[10px] text-slate-500">(P99: 1.4ms)</span>
          </div>
        </div>

        {/* Metric 5: Throughput */}
        <div className="space-y-0.5">
          <div className="text-[10px] font-mono text-slate-400 flex items-center space-x-1">
            <Zap className="w-3 h-3 text-amber-400" />
            <span>Throughput:</span>
          </div>
          <div className="text-xs font-mono font-bold text-amber-300">
            {throughput}k Req/sec
          </div>
        </div>

      </div>
    </div>
  );
}
