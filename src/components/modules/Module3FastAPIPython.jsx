import React, { useState } from 'react';
import { 
  Server, 
  Terminal, 
  Layers, 
  Play, 
  Copy, 
  CheckCircle2, 
  Activity, 
  Box, 
  Cpu, 
  Sparkles, 
  Code2, 
  ChevronRight, 
  Brain 
} from 'lucide-react';
import AudioButton from '../AudioButton';
import Module03Container from '../module3/Module03Container';

export default function Module3FastAPIPython({ lang = 'en', t, onTriggerToast }) {
  const [subTab, setSubTab] = useState('fastapi'); // 'fastapi', 'deeplearning', 'mlflow', 'docker'
  const [requestPayload, setRequestPayload] = useState(
    JSON.stringify({
      model_id: "siliconbrains-classifier-v3",
      features: [4.8, 3.2, 1.4, 0.2],
      temperature: 0.1
    }, null, 2)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [responseOutput, setResponseOutput] = useState({
    status: 200,
    latency: "1.2ms",
    prediction: "Iris-Setosa (Confidence: 99.4%)",
    tensor_logits: [0.9942, 0.0031, 0.0027],
    runtime: "uvicorn ASGI worker [PID: 4092]"
  });

  const handleSendInference = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      try {
        const parsed = JSON.parse(requestPayload);
        setResponseOutput({
          status: 200,
          latency: `${(1.1 + Math.random() * 0.3).toFixed(2)}ms`,
          prediction: parsed.features?.[0] > 5 ? "Class-High-Risk (Confidence: 94.8%)" : "Iris-Setosa (Confidence: 99.2%)",
          tensor_logits: [0.9921, 0.0048, 0.0031],
          runtime: "uvicorn ASGI worker [PID: 4092]"
        });
        if (onTriggerToast) {
          onTriggerToast({
            type: 'success',
            title: 'FastAPI 200 OK',
            message: 'Inference completed in 1.2ms on ASGI worker.',
            detail: 'JSON payload validated against Pydantic schema.'
          });
        }
      } catch (err) {
        setResponseOutput({
          status: 422,
          latency: "0.4ms",
          error: "Unprocessable Entity: Invalid JSON payload format."
        });
      }
    }, 400);
  };

  const mlflowRuns = [
    { id: "run-104", name: "ai-odyssey-student-classifier", valAcc: "91.2%", mse: "0.1894", lr: "0.001", optimizer: "Adam", status: "ACTIVE" },
    { id: "run-103", name: "transformer-attention-eval", valAcc: "89.7%", mse: "0.2140", lr: "0.0005", optimizer: "AdamW", status: "FINISHED" },
    { id: "run-102", name: "cnn-spatial-filter-resnet", valAcc: "88.4%", mse: "0.2415", lr: "0.001", optimizer: "SGD", status: "FINISHED" }
  ];

  const dockerfileCode = `FROM python:3.11-slim AS builder

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Expose high-performance ASGI port
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]`;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-teal-500/30 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-bold mb-3">
              <Server className="w-3.5 h-3.5 text-teal-400" />
              <span>{lang === 'te' ? 'మాడ్యూల్ 03: పైథాన్ & ఫాస్ట్‌ఏపీఐ' : 'Module 03: Python & FastAPI'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {lang === 'te' ? 'ప్రొడక్షన్ ఇంజనీరింగ్, ఫాస్ట్‌ఏపీఐ & డీప్ లెర్నింగ్' : 'FastAPI Microservice • MLflow Tracking • Deep Learning Studio'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              {lang === 'te'
                ? 'మెషిన్ లెర్నింగ్ మోడల్స్‌ను కేవలం ల్యాబ్‌కే పరిమితం చేయకుండా లైవ్ ఫాస్ట్‌ఏపీఐ ASGI మైక్రోసర్వీస్, MLflow ఎక్స్‌పెరిమెంట్ ట్రాకింగ్ మరియు డీప్ లెర్నింగ్ విజువలైజర్స్ ద్వారా ప్రొడక్షన్‌లోకి ఎలా తీసుకెళ్లాలో నేర్చుకోండి.'
                : 'Bridge the gap between model training and low-latency microservice serving using asynchronous FastAPI endpoints, MLflow metrics logging, and frontier Deep Learning visualizers.'}
            </p>
          </div>

          <AudioButton
            text={lang === 'te' ? 'మాడ్యూల్ 03: పైథాన్ మరియు ఫాస్ట్‌ఏపీఐ మైక్రోసర్వీస్ టెస్ట్‌బెంచ్, మరియు డీప్ లెర్నింగ్ స్టూడియో.' : 'Module 03: Python and FastAPI microservice testbench, MLflow tracking, and deep learning studio.'}
            lang={lang}
          />
        </div>
      </div>

      {/* Sub-Navigation Switcher */}
      <div className="flex flex-wrap gap-2 p-1.5 glass-panel rounded-2xl border border-slate-800">
        <button
          onClick={() => setSubTab('fastapi')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            subTab === 'fastapi'
              ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Server className="w-4 h-4" />
          <span>{lang === 'te' ? '1. లైవ్ ఫాస్ట్‌ఏపీఐ ఇన్ఫరెన్స్' : '1. Live FastAPI Testbench'}</span>
        </button>
        <button
          onClick={() => setSubTab('deeplearning')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            subTab === 'deeplearning'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Brain className="w-4 h-4" />
          <span>{lang === 'te' ? '2. అడ్వాన్స్‌డ్ డీప్ లెర్నింగ్ (CNN, RNN, GenAI)' : '2. Deep Learning Studio (CNN/RNN/GenAI)'}</span>
        </button>
        <button
          onClick={() => setSubTab('mlflow')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            subTab === 'mlflow'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>{lang === 'te' ? '3. MLflow ఎక్స్‌పెరిమెంట్ ట్రాకింగ్' : '3. MLflow Experiment Tracker'}</span>
        </button>
        <button
          onClick={() => setSubTab('docker')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            subTab === 'docker'
              ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Box className="w-4 h-4" />
          <span>{lang === 'te' ? '4. డాకర్ కంటెయినరైజేషన్' : '4. Containerization (Docker)'}</span>
        </button>
      </div>

      {/* SUBTAB 1: LIVE FASTAPI TESTBENCH */}
      {subTab === 'fastapi' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <span>{lang === 'te' ? 'లైవ్ ఇన్ఫరెన్స్ API టెస్ట్‌బెంచ్ (POST /api/v1/predict)' : 'FastAPI ASGI Microservice Live Testbench'}</span>
              </h3>
              <p className="text-xs text-slate-400">
                Simulates asynchronous high-concurrency model inference served by Uvicorn.
              </p>
            </div>
            <div className="flex items-center space-x-2 text-xs font-mono text-teal-300 bg-teal-950/40 px-3 py-1 rounded-xl border border-teal-500/30">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
              <span>POST http://localhost:8000/api/v1/predict</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            
            {/* Request JSON Box */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300 font-bold">HTTP Request Body (JSON Payload):</span>
                <span className="text-[11px] text-slate-500">Pydantic BaseSchema</span>
              </div>
              <textarea
                rows={8}
                value={requestPayload}
                onChange={(e) => setRequestPayload(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-slate-950 font-mono text-xs text-teal-300 border border-slate-800 focus:outline-none focus:border-teal-500 shadow-inner"
              />
              <button
                onClick={handleSendInference}
                disabled={isLoading}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-teal-600/25 transition-all flex items-center justify-center space-x-2 active:scale-[0.99]"
              >
                {isLoading ? <Activity className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                <span>{isLoading ? 'Executing Inference...' : 'Send Live Inference Request'}</span>
              </button>
            </div>

            {/* Response Output Box */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300 font-bold">FastAPI Response:</span>
                <span className="text-emerald-400 font-bold">Status: {responseOutput.status} OK</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2 min-h-[220px]">
                <div className="text-slate-500 text-[11px] pb-1 border-b border-slate-900 flex justify-between">
                  <span>Server: {responseOutput.runtime}</span>
                  <span className="text-teal-400 font-bold">Latency: {responseOutput.latency}</span>
                </div>
                <pre className="text-slate-200 overflow-x-auto text-[11px]">
                  {JSON.stringify(responseOutput, null, 2)}
                </pre>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* SUBTAB 2: DEEP LEARNING STUDIO (EMBEDDED MODULE 03) */}
      {subTab === 'deeplearning' && (
        <div className="space-y-6 animate-fadeIn">
          <Module03Container lang={lang} t={t} />
        </div>
      )}

      {/* SUBTAB 3: MLFLOW TRACKING */}
      {subTab === 'mlflow' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <Activity className="w-5 h-5 text-purple-400" />
                <span>{lang === 'te' ? 'MLflow ప్రొడక్షన్ ఎక్స్‌పెరిమెంట్ ట్రాకింగ్' : 'MLflow Production Experiment Tracking'}</span>
              </h3>
              <p className="text-xs text-slate-400">
                Logs parameters, loss gradients, validation accuracies, and model weights artifacts.
              </p>
            </div>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/40 px-2.5 py-1 rounded-lg border border-purple-500/20">
              mlflow server: localhost:5000
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">Run ID</th>
                  <th className="p-3">Experiment Name</th>
                  <th className="p-3">Val Accuracy</th>
                  <th className="p-3">Loss (MSE)</th>
                  <th className="p-3">Optimizer</th>
                  <th className="p-3">Learning Rate</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                {mlflowRuns.map((r, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                    <td className="p-3 text-purple-400 font-bold">{r.id}</td>
                    <td className="p-3 text-white">{r.name}</td>
                    <td className="p-3 text-emerald-400 font-bold">{r.valAcc}</td>
                    <td className="p-3 text-teal-300">{r.mse}</td>
                    <td className="p-3">{r.optimizer}</td>
                    <td className="p-3 text-slate-400">{r.lr}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${r.status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 animate-pulse' : 'bg-slate-800 text-slate-400'}`}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBTAB 4: DOCKER CONTAINERIZATION */}
      {subTab === 'docker' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <Box className="w-5 h-5 text-sky-400" />
                <span>{lang === 'te' ? 'ప్రొడక్షన్ డాకర్ కంటెయినరైజేషన్' : 'Production Docker Containerization'}</span>
              </h3>
              <p className="text-xs text-slate-400">
                Multi-stage slim container packaging FastAPI ASGI application with GPU CUDA dependencies.
              </p>
            </div>
            <span className="text-xs font-mono text-sky-400 bg-sky-950/40 px-2.5 py-1 rounded-lg border border-sky-500/20">
              Docker Engine v26.1
            </span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs text-sky-200">
            <pre className="overflow-x-auto leading-relaxed">
              <code>{dockerfileCode}</code>
            </pre>
          </div>
        </div>
      )}

    </div>
  );
}
