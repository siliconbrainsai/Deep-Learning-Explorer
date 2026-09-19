import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Mic } from 'lucide-react';

export default function AudioButton({ text, lang = 'en', labelEn = 'Listen', labelTe = 'వినండి (ఆడియో)', size = 'normal' }) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // When text or lang changes, reset playing state if stopped
    const handleStop = () => setIsPlaying(false);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.addEventListener('voiceschanged', handleStop);
    }
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.removeEventListener('voiceschanged', handleStop);
      }
    };
  }, [text, lang]);

  const toggleSpeech = (e) => {
    e.stopPropagation();

    if (!('speechSynthesis' in window)) {
      alert(lang === 'te' ? 'ఈ బ్రౌజర్‌లో స్పీచ్ సింథసిస్ సపోర్ట్ లేదు.' : 'Speech synthesis is not supported in this browser.');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    // Cancel existing speeches before starting new one
    window.speechSynthesis.cancel();

    const cleanText = text
      .replace(/[\*\#\`\_]/g, '')
      .replace(/[^\w\s\u0C00-\u0C7F\.\,\?\!\:\-\(\)]/g, ' ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang === 'te' ? 'te-IN' : 'en-US';
    utterance.rate = lang === 'te' ? 0.9 : 0.95;
    utterance.pitch = 1.0;

    // Try finding best matched voice
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(v => lang === 'te' ? (v.lang.startsWith('te') || v.name.toLowerCase().includes('telugu')) : v.lang.startsWith('en'));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const label = lang === 'te' ? labelTe : labelEn;

  if (size === 'compact') {
    return (
      <button
        onClick={toggleSpeech}
        title={isPlaying ? (lang === 'te' ? 'ఆడియో ఆపండి' : 'Stop Audio') : label}
        className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold border transition-all ${
          isPlaying
            ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 shadow-md shadow-rose-950/40 animate-pulse'
            : 'bg-slate-900/80 hover:bg-slate-800 border-indigo-500/30 text-indigo-300 hover:text-white'
        }`}
      >
        {isPlaying ? (
          <>
            <VolumeX className="w-3.5 h-3.5 text-rose-400" />
            <span className="text-[11px] font-bold">{lang === 'te' ? 'ఆపండి' : 'Stop'}</span>
            <span className="flex space-x-0.5 ml-1">
              <span className="w-1 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1 h-3 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </span>
          </>
        ) : (
          <>
            <Volume2 className="w-3.5 h-3.5 text-teal-400" />
            <span className="text-[11px]">{label}</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={toggleSpeech}
      title={isPlaying ? (lang === 'te' ? 'ఆడియో ఆపండి' : 'Stop Audio') : label}
      className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
        isPlaying
          ? 'bg-rose-500/20 border-rose-500/60 text-rose-300 shadow-lg shadow-rose-950/50 animate-pulse'
          : 'bg-slate-900/80 hover:bg-slate-800/90 border-indigo-500/30 text-indigo-300 hover:text-white shadow-sm'
      }`}
    >
      {isPlaying ? (
        <>
          <VolumeX className="w-4 h-4 text-rose-400" />
          <span>{lang === 'te' ? 'ఆపండి' : 'Stop Audio'}</span>
          <span className="flex items-center space-x-0.5 ml-1">
            <span className="w-1 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1 h-3.5 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </span>
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4 text-teal-400" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
