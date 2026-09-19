import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  GraduationCap, 
  Cpu, 
  Sparkles, 
  Lightbulb, 
  Layers, 
  Tag 
} from 'lucide-react';
import AudioButton from '../AudioButton';
import { glossaryItems } from '../../data/glossaryData';

export default function Module5Glossary({ lang = 'en', t }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Pillars', 'Optimization', 'Evaluation', 'Deep Learning', 'Transformers', 'Production'];

  const filteredItems = glossaryItems.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const termStr = `${item.term} ${item.termTe} ${item.studentAnalogyEn} ${item.studentAnalogyTe} ${item.engineerMathEn}`.toLowerCase();
    const matchesSearch = termStr.includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-rose-500/30 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold mb-3">
              <BookOpen className="w-3.5 h-3.5 text-rose-400" />
              <span>{lang === 'te' ? 'మాడ్యూల్ 05: ML నిఘంటువు' : 'Module 05: Concept Intel Glossary'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {lang === 'te' ? 'విద్యార్థి పోలికలు vs ఇంజనీరింగ్ గణిత నిర్వచనాలు' : 'Student Analogies vs Engineering Mathematical Definitions'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              {lang === 'te'
                ? 'ఏఐ మరియు మెషిన్ లెర్నింగ్ కీలక పదాలను ఒకవైపు సరళమైన జీవిత ఉదాహరణలతో, మరోవైపు కచ్చితమైన గణిత సూత్రాలతో పోల్చి చదవండి.'
                : 'Bridge comprehension gaps with dual-perspective explanations: side-by-side student analogies paired with rigorous mathematical equations.'}
            </p>
          </div>

          <AudioButton
            text={lang === 'te' ? 'మాడ్యూల్ 05 మెషిన్ లెర్నింగ్ నిఘంటువు. విద్యార్థి పోలికలు మరియు ఇంజనీరింగ్ నిర్వచనాలు.' : 'Module 05 Machine Learning Glossary. Side by side student analogies and engineering mathematical definitions.'}
            lang={lang}
          />
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={lang === 'te' ? 'పదాన్ని వెతకండి (Search concept)...' : 'Search concepts, equations, terms...'}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-white focus:outline-none focus:border-rose-500"
          />
        </div>

        {/* Categories Chips */}
        <div className="flex flex-wrap gap-1.5 self-start sm:self-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all border ${
                activeCategory === cat
                  ? 'bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-950/50'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Glossary Items List */}
      <div className="space-y-4">
        {filteredItems.map((item, idx) => (
          <div
            key={idx}
            className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-rose-500/40 transition-all space-y-4 shadow-md"
          >
            {/* Term Title & Category Tag */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
              <div className="flex items-center space-x-2.5">
                <span className="w-7 h-7 rounded-xl bg-rose-500/20 text-rose-300 font-mono text-xs font-bold flex items-center justify-center">
                  0{idx + 1}
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    {lang === 'te' ? item.termTe : item.term}
                  </h3>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {lang === 'te' ? item.term : item.termTe}
                  </span>
                </div>
              </div>

              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-900 text-rose-300 border border-slate-800">
                {item.category}
              </span>
            </div>

            {/* Dual Perspective Grid: Student vs Engineer */}
            <div className="grid md:grid-cols-2 gap-4">
              
              {/* Student Analogy */}
              <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-xs font-bold text-indigo-300 mb-1">
                    <GraduationCap className="w-4 h-4 text-indigo-400" />
                    <span>{lang === 'te' ? 'విద్యార్థి దృక్కోణం (Intuitive Analogy)' : 'Student Intuitive Analogy'}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lang === 'te' ? item.studentAnalogyTe : item.studentAnalogyEn}
                  </p>
                </div>
              </div>

              {/* Engineer Math Definition */}
              <div className="p-4 rounded-2xl bg-teal-950/30 border border-teal-500/20 space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-xs font-bold text-teal-300 mb-1">
                    <Cpu className="w-4 h-4 text-teal-400" />
                    <span>{lang === 'te' ? 'ఇంజనీరింగ్ గణిత సూత్రం (Mathematical Rigor)' : 'Engineering Mathematical Rigor'}</span>
                  </div>
                  <code className="text-xs font-mono text-teal-200 bg-slate-950/80 p-2.5 rounded-xl border border-teal-500/20 block leading-relaxed">
                    {lang === 'te' ? item.engineerMathTe : item.engineerMathEn}
                  </code>
                </div>
              </div>

            </div>

          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="p-12 text-center text-slate-500 glass-panel rounded-3xl border border-slate-800">
            No terms found matching "{searchTerm}". Try a different keyword!
          </div>
        )}
      </div>

    </div>
  );
}
