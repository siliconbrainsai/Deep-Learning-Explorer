import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ChevronRight, 
  Lightbulb, 
  Sparkles, 
  Award, 
  HelpCircle 
} from 'lucide-react';

export default function QuizSection({ lang = 'en', t, onTriggerToast }) {
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});

  const handleOptionClick = (qIdx, optIdx) => {
    const question = t.quizQuestions[qIdx];
    const isCorrect = optIdx === question.correct;
    
    const updatedAnswers = { ...answers, [qIdx]: optIdx };
    setAnswers(updatedAnswers);

    const feedbackMsg = isCorrect ? t.correctMsg : t.incorrectMsg;
    setFeedback({
      ...feedback,
      [qIdx]: feedbackMsg
    });

    // Trigger toast notification
    if (onTriggerToast) {
      onTriggerToast({
        type: isCorrect ? 'success' : 'error',
        title: isCorrect ? t.toastTitles.correct : t.toastTitles.incorrect,
        message: `${isCorrect ? '✅' : '❌'} ${question.options[optIdx]}`,
        detail: question.explanation
      });
    }

    // Check for celebration (4/4)
    const allAnswered = Object.keys(updatedAnswers).length === t.quizQuestions.length;
    if (allAnswered) {
      const allCorrect = t.quizQuestions.every((q, idx) => updatedAnswers[idx] === q.correct);
      if (allCorrect) {
        triggerCelebration();
      }
    }
  };

  const triggerCelebration = () => {
    // Canvas-confetti multi-burst celebration
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#818cf8', '#2dd4bf', '#c084fc', '#f43f5e', '#fbbf24'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const resetQuiz = () => {
    setAnswers({});
    setFeedback({});
  };

  const calculateScore = () => {
    let score = 0;
    t.quizQuestions.forEach((q, idx) => {
      if (answers[idx] === q.correct) score++;
    });
    return score;
  };

  const score = calculateScore();
  const totalQuestions = t.quizQuestions.length;
  const allAnswered = Object.keys(answers).length === totalQuestions;
  const isPerfectScore = allAnswered && score === totalQuestions;

  return (
    <section aria-label="Knowledge Quiz" className="glass-panel-glow border border-indigo-500/30 p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Quiz Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2.5">
            <span className="p-2.5 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xl">
              🎯
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {t.quizTitle}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
            {t.quizSubtitle}
          </p>
        </div>

        {/* Score Display & Reset */}
        <div className="flex items-center space-x-3 shrink-0">
          <div className="px-4 py-2 rounded-2xl bg-slate-950/90 border border-slate-800 flex items-center space-x-2 text-sm font-bold shadow-inner">
            <span className="text-slate-400">{t.scoreText}:</span>
            <span className={isPerfectScore ? 'text-emerald-400 text-base font-black' : 'text-indigo-400 text-base font-black'}>
              {score}
            </span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300">{totalQuestions}</span>
          </div>

          {Object.keys(answers).length > 0 && (
            <button
              onClick={resetQuiz}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold transition-all border border-slate-800"
              title="Reset Quiz"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.tryAgain}</span>
            </button>
          )}
        </div>
      </div>

      {/* 4/4 Perfect Score Celebration Banner */}
      {isPerfectScore && (
        <div className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-emerald-950/90 via-teal-900/60 to-indigo-950/90 border border-emerald-500/50 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl shadow-emerald-950/40 animate-fadeIn">
          <div className="flex items-center space-x-3.5">
            <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-300 shrink-0">
              <Award className="w-8 h-8 animate-bounce" />
            </div>
            <div>
              <div className="text-base font-extrabold text-emerald-200">
                {t.perfectScoreMsg}
              </div>
              <p className="text-xs text-emerald-300/80 mt-0.5">
                {lang === 'te'
                  ? 'మీరు CNN, RNN, LSTM మరియు ట్రాన్స్‌ఫార్మర్స్ కాన్సెప్టులను పూర్తిగా నేర్చుకున్నారు!'
                  : 'You have demonstrated complete mastery across CNN, RNN, LSTM, and Transformer concepts!'}
              </p>
            </div>
          </div>

          <button
            onClick={triggerCelebration}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/30 transition-all shrink-0 active:scale-95"
          >
            🎉 {lang === 'te' ? 'సంబరం చేసుకోండి' : 'Re-trigger Confetti'}
          </button>
        </div>
      )}

      {/* Quiz Questions List */}
      <div className="space-y-6">
        {t.quizQuestions.map((q, qIdx) => {
          const hasAnswered = answers[qIdx] !== undefined;
          const isSelectedCorrect = hasAnswered && answers[qIdx] === q.correct;

          return (
            <div
              key={qIdx}
              className="bg-slate-950/70 p-5 sm:p-6 rounded-2xl border border-slate-800/90 hover:border-slate-700 transition-all space-y-4 shadow-md"
            >
              {/* Question text */}
              <div className="flex items-start justify-between gap-3">
                <p className="font-bold text-white text-sm sm:text-base leading-snug">
                  <span className="text-indigo-400 mr-2 font-mono">Q{qIdx + 1}.</span>
                  {q.q}
                </p>
                {hasAnswered && (
                  <span className="shrink-0 mt-0.5">
                    {isSelectedCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-400" />
                    )}
                  </span>
                )}
              </div>

              {/* Options 2x2 Grid */}
              <div className="grid sm:grid-cols-2 gap-3">
                {q.options.map((opt, optIdx) => {
                  const isSelected = answers[qIdx] === optIdx;
                  let btnStyle = 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/90 hover:border-slate-700';

                  if (isSelected) {
                    if (optIdx === q.correct) {
                      btnStyle = 'bg-emerald-600/30 border-emerald-500 text-emerald-100 shadow-lg shadow-emerald-950/50 font-bold';
                    } else {
                      btnStyle = 'bg-rose-600/30 border-rose-500 text-rose-100 shadow-lg shadow-rose-950/50 font-bold';
                    }
                  } else if (hasAnswered && optIdx === q.correct) {
                    // Highlight the correct one if user picked wrong
                    btnStyle = 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 font-semibold';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleOptionClick(qIdx, optIdx)}
                      className={`p-3.5 rounded-xl text-left text-xs sm:text-sm transition-all border flex items-center justify-between group active:scale-[0.99] ${btnStyle}`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <span className="w-5 h-5 rounded-lg bg-slate-950/60 border border-white/10 flex items-center justify-center font-mono text-[10px] text-slate-400 group-hover:text-white">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </button>
                  );
                })}
              </div>

              {/* Instant Inline Explanation Box */}
              {feedback[qIdx] && (
                <div
                  className={`p-3.5 rounded-xl text-xs sm:text-sm font-semibold border flex items-start space-x-3 animate-fadeIn ${
                    answers[qIdx] === q.correct
                      ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-200'
                      : 'bg-rose-950/50 border-rose-500/40 text-rose-200'
                  }`}
                >
                  <Lightbulb className="w-4 h-4 shrink-0 mt-0.5 text-amber-300" />
                  <div className="space-y-1">
                    <div className="font-bold">{feedback[qIdx]}</div>
                    <div className="text-[11px] sm:text-xs font-normal leading-relaxed text-slate-300">
                      {q.explanation}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
}
