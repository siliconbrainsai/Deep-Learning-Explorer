import React, { useEffect } from 'react';
import { CheckCircle2, XCircle, Lightbulb, X, Sparkles } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 6000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full px-4 pointer-events-auto animate-fadeIn">
      <div
        className={`p-4 rounded-2xl glass-panel border backdrop-blur-xl shadow-2xl flex items-start space-x-3.5 transition-all ${
          isSuccess
            ? 'border-emerald-500/50 bg-slate-900/90 shadow-emerald-950/50 text-emerald-100'
            : isError
            ? 'border-rose-500/50 bg-slate-900/90 shadow-rose-950/50 text-rose-100'
            : 'border-indigo-500/50 bg-slate-900/90 shadow-indigo-950/50 text-indigo-100'
        }`}
      >
        <div className="shrink-0 mt-0.5">
          {isSuccess ? (
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          ) : isError ? (
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400">
              <XCircle className="w-5 h-5" />
            </div>
          ) : (
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
          )}
        </div>

        <div className="flex-1 pr-2">
          <div className="font-bold text-sm text-white flex items-center space-x-2">
            <span>{toast.title}</span>
          </div>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">{toast.message}</p>
          {toast.detail && (
            <div className="mt-2 text-[11px] text-slate-400 bg-slate-950/60 p-2 rounded-xl border border-white/5 flex items-start space-x-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>{toast.detail}</span>
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
