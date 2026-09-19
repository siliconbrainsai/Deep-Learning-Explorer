import React, { useState } from 'react';
import { 
  Wand2, 
  Sparkles, 
  Bot, 
  Code2, 
  Palette, 
  Cpu, 
  Layers, 
  Zap, 
  Eye, 
  Flame, 
  CheckCircle2 
} from 'lucide-react';
import AudioButton from '../AudioButton';

export default function TransformerSection({ lang = 'en', audience = 'student', transformerData }) {
  const [selectedSentenceId, setSelectedSentenceId] = useState(1);
  const [hoveredWord, setHoveredWord] = useState('it');
  const [selectedHead, setSelectedHead] = useState(1); // Multi-head attention head 1 to 4

  const currentSentence = transformerData.sampleSentences.find(s => s.id === selectedSentenceId) || transformerData.sampleSentences[0];
  const words = currentSentence.text.split(' ');

  // Dynamic attention score generator based on active head & words
  const getAttentionScore = (fromWord, toWord) => {
    // If hovering on current focus word ("it")
    if (fromWord.toLowerCase() === currentSentence.focusWord.toLowerCase()) {
      const w = currentSentence.keyWeights[toWord];
      if (w !== undefined) return w;
    }
    // Self-attention diagonal is high
    if (fromWord.toLowerCase() === toWord.toLowerCase()) return 0.88;
    // Adjacent words have moderate attention
    const fromIdx = words.indexOf(fromWord);
    const toIdx = words.indexOf(toWord);
    const dist = Math.abs(fromIdx - toIdx);
    if (dist === 1) return 0.35;
    if (dist === 2) return 0.18;
    return 0.06;
  };

  const activeFocus = hoveredWord || currentSentence.focusWord;

  const getRealWorldIcon = (iconName) => {
    switch (iconName) {
      case 'Bot': return <Bot className="w-6 h-6 text-purple-400" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-indigo-400" />;
      case 'Code2': return <Code2 className="w-6 h-6 text-teal-400" />;
      case 'Palette': return <Palette className="w-6 h-6 text-amber-400" />;
      default: return <Wand2 className="w-6 h-6 text-purple-400" />;
    }
  };

  return (
    <section className="glass-panel rounded-3xl p-6 sm:p-8 space-y-8 relative overflow-hidden transition-all border border-purple-500/20">
      
      {/* Glow decorative corner */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div className="flex items-start space-x-3.5">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-700 text-white shadow-lg shadow-purple-500/20 shrink-0">
            <Wand2 className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {transformerData.title}
              </h3>
              <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {transformerData.badge}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
              {transformerData.description}
            </p>
          </div>
        </div>

        <div className="shrink-0 flex items-center space-x-2">
          <AudioButton 
            text={transformerData.ttsText}
            lang={lang}
            labelEn="Listen (Audio)"
            labelTe="వినండి (ఆడియో)"
          />
        </div>
      </div>

      {/* Student / Engineer Perspective Banner */}
      {audience === 'student' ? (
        <div className="p-4 sm:p-5 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-purple-100 flex items-start space-x-3.5 shadow-md">
          <span className="text-2xl mt-0.5">💡</span>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-1">
              {lang === 'te' ? 'హైలైటర్ మరియు స్పాట్‌లైట్ పోలిక' : 'Highlighter & Spotlight Analogy'}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {transformerData.studentAnalogy}
            </p>
          </div>
        </div>
      ) : (
        <div className="p-4 sm:p-5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-100 flex items-start space-x-3.5 shadow-md">
          <Cpu className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-1">
              {lang === 'te' ? 'స్కేల్డ్ డాట్-ప్రాడక్ట్ సెల్ఫ్-అటెన్షన్' : 'Scaled Dot-Product Self-Attention Math'}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <span className="font-mono text-purple-300 font-bold bg-slate-900 px-2 py-0.5 rounded border border-purple-500/30">
                {transformerData.mathBreakdown.formula}
              </span>. Computes pairwise all-to-all token contextual affinities in O(1) sequential steps, fully utilizing GPU tensor cores.
            </p>
          </div>
        </div>
      )}

      {/* Sentence Switcher & Attention Head Selector */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        
        {/* Select Sentence */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
            {lang === 'te' ? 'వాక్యం:' : 'Sentence:'}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {transformerData.sampleSentences.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setSelectedSentenceId(s.id);
                  setHoveredWord(s.focusWord);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  selectedSentenceId === s.id
                    ? 'bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-600/30'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {s.id === 1 ? '1. Bank & Flooded' : '2. Animal & Street'}
              </button>
            ))}
          </div>
        </div>

        {/* Multi-Head Attention Head Selector */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
            {lang === 'te' ? 'అటెన్షన్ హెడ్:' : 'Attention Head:'}
          </span>
          <div className="flex space-x-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
            {[1, 2, 3, 4].map((head) => (
              <button
                key={head}
                onClick={() => setSelectedHead(head)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedHead === head
                    ? 'bg-purple-500/30 text-purple-300 border border-purple-500/50'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Head {head}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Interactive Self-Attention Interactive Ribbon */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>{lang === 'te' ? 'లైవ్ సెల్ఫ్-అటెన్షన్ వెబ్ (Hover to Inspect):' : 'Dynamic Self-Attention Beam Web:'}</span>
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {lang === 'te'
                ? `ఏదైనా పదంపై కర్సర్ ఉంచండి. ముఖ్యంగా "${currentSentence.focusWord}" పదం ఇతర పదాలతో ఎలా కనెక్ట్ అవుతోందో గమనించండి.`
                : `Hover or click any word (e.g., "${currentSentence.focusWord}") to reveal active contextual attention weights.`}
            </p>
          </div>

          <div className="px-3 py-1 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-mono">
            Active Query: <span className="font-bold text-white">"{activeFocus}"</span>
          </div>
        </div>

        {/* Words Interactive Ribbon with Glowing Heatmap Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-6 px-4 bg-slate-950/90 rounded-2xl border border-slate-800/80 min-h-[110px]">
          {words.map((word, idx) => {
            const score = getAttentionScore(activeFocus, word);
            const isFocusWord = word.toLowerCase() === activeFocus.toLowerCase();
            const isStrongAttention = score >= 0.5 && !isFocusWord;

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredWord(word)}
                className={`relative group cursor-pointer select-none transition-all duration-300 px-3.5 py-2.5 rounded-2xl border flex flex-col items-center justify-center ${
                  isFocusWord
                    ? 'bg-purple-600 text-white border-purple-300 ring-4 ring-purple-500/30 scale-110 z-20 shadow-xl shadow-purple-950/80 font-black'
                    : isStrongAttention
                    ? 'bg-purple-950/80 text-purple-100 border-purple-400/80 shadow-lg shadow-purple-900/40 scale-105 z-10 font-bold'
                    : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
                style={{
                  boxShadow: isStrongAttention
                    ? `0 0 20px -2px rgba(168, 85, 247, ${score * 0.7})`
                    : undefined
                }}
              >
                {/* Attention Weight Pill Above Word */}
                <div
                  className={`text-[9px] font-mono mb-1 transition-opacity ${
                    isFocusWord ? 'text-purple-200' : isStrongAttention ? 'text-purple-300 font-bold' : 'text-slate-500 opacity-60 group-hover:opacity-100'
                  }`}
                >
                  {score.toFixed(2)}
                </div>

                <span className="text-sm sm:text-base tracking-wide">
                  {word}
                </span>

                {/* Pulsing indicator under strongly connected words */}
                {isStrongAttention && (
                  <div className="absolute -bottom-1 w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                )}
              </div>
            );
          })}
        </div>

        {/* Insight Explanation for Current Focus */}
        <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/30 flex items-start space-x-3 text-xs sm:text-sm text-purple-200">
          <Zap className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-white mb-0.5">
              {lang === 'te' ? 'కోరెఫరెన్స్ రిజల్యూషన్ విశ్లేషణ:' : 'Contextual Coreference Insight:'}
            </div>
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
              {currentSentence.explanation}
            </p>
          </div>
        </div>

      </div>

      {/* Full N x N Attention Matrix Heatmap */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center space-x-2">
              <Layers className="w-4 h-4 text-teal-400" />
              <span>{lang === 'te' ? 'పూర్తి అటెన్షన్ మ్యాట్రిక్స్ హీట్‌మ్యాప్ (N x N):' : 'Pairwise Attention Matrix Heatmap (N x N):'}</span>
            </h4>
            <p className="text-[11px] text-slate-400">
              {lang === 'te'
                ? 'ఏదైనా సెల్ పై కర్సర్ ఉంచి టోకెన్ల మధ్య అటెన్షన్ స్కోరును చూడండి.'
                : 'Hover any cell (i, j) to inspect Query-to-Key softmax attention score.'}
            </p>
          </div>
          <span className="text-[11px] text-teal-400 font-mono hidden sm:inline">Head #{selectedHead} Active</span>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto pb-2">
          <div className="min-w-[500px]">
            {/* Header row with keys */}
            <div className="grid gap-1 pb-1" style={{ gridTemplateColumns: `80px repeat(${words.length}, minmax(40px, 1fr))` }}>
              <div className="text-[10px] font-mono text-slate-500 text-right pr-2">Q \ K</div>
              {words.map((w, colIdx) => (
                <div key={colIdx} className="text-[10px] font-mono text-slate-400 text-center truncate px-1">
                  {w}
                </div>
              ))}
            </div>

            {/* Matrix rows with queries */}
            {words.map((rowWord, rowIdx) => (
              <div
                key={rowIdx}
                className="grid gap-1 py-0.5 items-center"
                style={{ gridTemplateColumns: `80px repeat(${words.length}, minmax(40px, 1fr))` }}
              >
                <div className="text-[10px] font-mono font-bold text-slate-300 text-right pr-2 truncate">
                  {rowWord}
                </div>
                {words.map((colWord, colIdx) => {
                  const score = getAttentionScore(rowWord, colWord);
                  const isHovered = activeFocus.toLowerCase() === rowWord.toLowerCase() || activeFocus.toLowerCase() === colWord.toLowerCase();
                  return (
                    <div
                      key={colIdx}
                      onMouseEnter={() => setHoveredWord(rowWord)}
                      title={`Attention(${rowWord} -> ${colWord}) = ${score.toFixed(2)}`}
                      className={`h-7 rounded flex items-center justify-center text-[9px] font-mono font-bold transition-all cursor-pointer ${
                        isHovered ? 'ring-1 ring-white/50 scale-105 z-10' : ''
                      }`}
                      style={{
                        backgroundColor: `rgba(168, 85, 247, ${Math.max(0.12, score)})`,
                        color: score > 0.4 ? '#ffffff' : '#94a3b8'
                      }}
                    >
                      {score.toFixed(2)}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mathematical Breakdown (Q, K, V) */}
      <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-4">
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-purple-400" />
            <span>{transformerData.mathBreakdown.title}</span>
          </h4>
          <code className="text-xs text-purple-300 font-mono bg-slate-900 px-2.5 py-1 rounded-lg border border-purple-500/20 inline-block mt-2">
            {transformerData.mathBreakdown.formula}
          </code>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 pt-1">
          {transformerData.mathBreakdown.qkv.map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="text-xs font-bold text-purple-300">{item.name}</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-300 leading-relaxed">
          <strong>Multi-Head Parallelism:</strong> {transformerData.mathBreakdown.multiHead}
        </div>
      </div>

      {/* Real-World Generative AI Examples */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {lang === 'te' ? 'GenAI విప్లవం - లైవ్ ఉదాహరణలు' : 'GenAI Revolution in Production'}
          </h4>
          <span className="text-[11px] text-purple-400 font-semibold">Frontier Transformer Models</span>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {transformerData.realWorld.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-purple-500/40 transition-all flex flex-col justify-between space-y-3 group hover:translate-y-[-2px]"
            >
              <div className="flex items-start space-x-3">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 shrink-0 group-hover:scale-105 transition-transform">
                  {getRealWorldIcon(item.icon)}
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm group-hover:text-purple-200 transition-colors">
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
