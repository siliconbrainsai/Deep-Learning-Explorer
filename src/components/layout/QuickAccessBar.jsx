import React from 'react';
import { 
  TrendingUp, 
  Server, 
  Boxes, 
  GitFork, 
  HelpCircle, 
  BookOpen, 
  ChevronRight, 
  Sparkles 
} from 'lucide-react';

export default function QuickAccessBar({ onSelectModule, t }) {
  const items = [
    { id: 'reg', labelEn: 'Linear Regression Playground', labelTe: 'లీనియర్ రిగ్రెషన్ ప్లేగ్రౌండ్', module: 2, icon: TrendingUp, color: 'text-indigo-400' },
    { id: 'fastapi', labelEn: 'FastAPI ASGI Microservice', labelTe: 'ఫాస్ట్‌ఏపీఐ మైక్రోసర్వీస్', module: 3, icon: Server, color: 'text-teal-400' },
    { id: 'kmeans', labelEn: 'K-Means Clustering Lab', labelTe: 'K-మీన్స్ క్లస్టరింగ్ ల్యాబ్', module: 2, icon: Boxes, color: 'text-purple-400' },
    { id: 'rf', labelEn: 'Random Forest Ensembles', labelTe: 'రాండమ్ ఫారెస్ట్ ఎంసెంబుల్స్', module: 2, icon: GitFork, color: 'text-amber-400' },
    { id: 'quiz', labelEn: 'Bilingual Assessment Quiz', labelTe: 'ద్విభాషా క్విజ్ పరీక్ష', module: 4, icon: HelpCircle, color: 'text-emerald-400' },
    { id: 'glossary', labelEn: 'ML Concept Glossary', labelTe: 'ఎమ్‌ఎల్ నిఘంటువు', module: 5, icon: BookOpen, color: 'text-rose-400' },
  ];

  return (
    <div className="space-y-2">
      <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 flex items-center space-x-1.5">
        <Sparkles className="w-3 h-3 text-indigo-400" />
        <span>{t.quickAccessTitle || "QUICK ACCESS TOPICS // INTERACTIVE DIRECT JUMP"}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSelectModule(item.module)}
              className="px-3 py-1.5 rounded-xl glass-panel hover:bg-slate-800/80 border border-slate-800 hover:border-indigo-500/40 text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center space-x-1.5 group shadow-sm active:scale-95"
            >
              <Icon className={`w-3.5 h-3.5 ${item.color} group-hover:scale-110 transition-transform`} />
              <span>{t.langCode === 'te-IN' ? item.labelTe : item.labelEn}</span>
              <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
