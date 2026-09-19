import React, { useState } from 'react';
import { Sparkles, GraduationCap, Cpu, Layers, Eye, Clock, Wand2 } from 'lucide-react';
import CNNSection from './CNNSection';
import RNNSection from './RNNSection';
import TransformerSection from './TransformerSection';
import AudioButton from '../AudioButton';

export default function Module03Container({ lang = 'en', t }) {
  const [audience, setAudience] = useState('student'); // 'student' or 'engineer'

  return (
    <div className="space-y-10 animate-fadeIn">
      
      {/* Module 03 Hero Header Card */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 glass-panel-glow border border-indigo-500/30">
        
        {/* Glow ambient spots */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>{lang === 'te' ? 'మాడ్యూల్ 03' : 'Module 03'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              {t.step3Header}
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {t.step3Subtitle}
            </p>
          </div>

          {/* Perspective & TTS Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            {/* Perspective Toggle: Student vs Engineer */}
            <div className="bg-slate-900/90 p-1 rounded-2xl border border-slate-800 flex items-center shadow-lg">
              <button
                onClick={() => setAudience('student')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  audience === 'student'
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>{lang === 'te' ? 'విద్యార్థి మోడ్' : 'Student Mode'}</span>
              </button>
              <button
                onClick={() => setAudience('engineer')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  audience === 'engineer'
                    ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-md shadow-teal-600/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Cpu className="w-4 h-4" />
                <span>{lang === 'te' ? 'ఇంజనీర్ మోడ్' : 'Engineer Mode'}</span>
              </button>
            </div>

            {/* Read Aloud Module Header */}
            <AudioButton
              text={`${t.step3Header}. ${t.step3Subtitle}`}
              lang={lang}
              labelEn="Listen (Audio)"
              labelTe="వినండి (ఆడియో)"
            />
          </div>
        </div>

        {/* Section Quick-Jump Pills */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-800/80">
          <a
            href="#cnn-section"
            className="px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-indigo-500/20 text-indigo-300 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-indigo-400" />
            <span>{t.mod3Nav.cnn}</span>
          </a>
          <a
            href="#rnn-section"
            className="px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-teal-500/20 text-teal-300 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
          >
            <Clock className="w-3.5 h-3.5 text-teal-400" />
            <span>{t.mod3Nav.rnn}</span>
          </a>
          <a
            href="#transformer-section"
            className="px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-purple-500/20 text-purple-300 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
          >
            <Wand2 className="w-3.5 h-3.5 text-purple-400" />
            <span>{t.mod3Nav.transformer}</span>
          </a>
        </div>

      </div>

      {/* Section 1: CNN (Computer Vision - Eye Sight) */}
      <div id="cnn-section">
        <CNNSection 
          lang={lang} 
          audience={audience} 
          cnnData={t.cnn} 
        />
      </div>

      {/* Section 2: RNN & LSTM (Memory & Sequence) */}
      <div id="rnn-section">
        <RNNSection 
          lang={lang} 
          audience={audience} 
          rnnData={t.rnn} 
        />
      </div>

      {/* Section 3: Transformers & GenAI (Creative Leap) */}
      <div id="transformer-section">
        <TransformerSection 
          lang={lang} 
          audience={audience} 
          transformerData={t.transformer} 
        />
      </div>

    </div>
  );
}
