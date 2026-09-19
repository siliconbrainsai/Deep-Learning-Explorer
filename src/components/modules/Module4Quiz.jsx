import React from 'react';
import QuizSection from '../QuizSection';
import AudioButton from '../AudioButton';
import { HelpCircle, Award, Sparkles } from 'lucide-react';

export default function Module4Quiz({ lang = 'en', t, onTriggerToast }) {
  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-emerald-500/30 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-3">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'te' ? 'మాడ్యూల్ 04: జ్ఞాన పరీక్ష క్విజ్' : 'Module 04: Knowledge Assessment'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {lang === 'te' ? 'అడ్వాన్స్‌డ్ AI జ్ఞాన పరీక్ష & సర్టిఫికేషన్' : 'Bilingual Knowledge Check & Interactive Assessment'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              {lang === 'te'
                ? 'న్యూరల్ నెట్‌వర్క్స్, CNN, ReLU మరియు ట్రాన్స్‌ఫార్మర్స్ కాన్సెప్టులపై మీ పరిజ్ఞానాన్ని పరీక్షించుకోండి. 4/4 స్కోర్ సాధించి కాన్ఫెట్టి సంబరం చేసుకోండి!'
                : 'Test your understanding across Neural Networks, CNN, ReLU activations, and modern Transformers. Score 4/4 to unlock the confetti celebration!'}
            </p>
          </div>

          <AudioButton
            text={lang === 'te' ? 'మాడ్యూల్ 04 జ్ఞాన పరీక్ష క్విజ్. అన్ని ప్రశ్నలకు సరైన సమాధానాలు ఇవ్వండి.' : 'Module 04 Knowledge Assessment Quiz. Answer questions to test your deep learning mastery.'}
            lang={lang}
          />
        </div>
      </div>

      {/* Embedded Quiz Section */}
      <QuizSection 
        lang={lang} 
        t={t} 
        onTriggerToast={onTriggerToast} 
      />

    </div>
  );
}
