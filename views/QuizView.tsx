
import React, { useState } from 'react';
import { ModuleData } from '../types';
import { ChevronRight, ChevronLeft, CheckCircle2, Skull, Swords, Zap, Heart, Target } from 'lucide-react';

interface QuizViewProps {
  module: ModuleData;
  type: 'pre' | 'post';
  onComplete: (score: number) => void;
  onCancel: () => void;
}

const QuizView: React.FC<QuizViewProps> = ({ module, type, onComplete, onCancel }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = module.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === module.questions.length - 1;

  const handleSelectAnswer = (optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionIndex }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    module.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    return Math.round((correctCount / module.questions.length) * 100);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setShowResults(true);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentQuestionIndex(prev => prev - 1);
  };

  if (showResults) {
    const score = calculateScore();
    const isSuccess = score >= 80;

    return (
      <div className="max-w-4xl mx-auto py-8 md:py-20 px-4 md:px-10 animate-in zoom-in duration-500">
        <div className="bg-slate-900 p-8 md:p-20 rounded-[2.5rem] md:rounded-[4.5rem] border-4 border-slate-800 shadow-2xl text-center relative overflow-hidden">
          <div className={`absolute top-0 left-0 w-full h-2 md:h-4 ${isSuccess ? 'bg-emerald-500 shadow-glow' : 'bg-rose-600 shadow-glow'}`} />
          
          <div className={`w-24 h-24 md:w-36 md:h-36 ${isSuccess ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'} rounded-full flex items-center justify-center mx-auto mb-8 md:mb-14 shadow-inner border-2 ${isSuccess ? 'border-emerald-500/30' : 'border-rose-500/30'} animate-float`}>
            {isSuccess ? <CheckCircle2 size={window.innerWidth < 768 ? 48 : 80} /> : <Skull size={window.innerWidth < 768 ? 48 : 80} />}
          </div>
          
          <h2 className="text-3xl md:text-6xl font-black text-white mb-4 md:mb-6 tracking-tighter italic uppercase">
            {isSuccess ? 'CONQUEST COMPLETE' : 'TRIAL ABORTED'}
          </h2>
          <p className="text-slate-400 mb-10 md:mb-16 text-sm md:text-2xl font-bold leading-relaxed max-w-2xl mx-auto">
            {isSuccess 
              ? `You extracted vital knowledge from the ${module.title} domain.`
              : `The data corrupted. Review the knowledge archives and try again.`}
          </p>
          
          <div className="inline-block p-10 md:p-16 bg-slate-950 rounded-[2rem] md:rounded-[3.5rem] border border-slate-800 mb-10 md:mb-16 relative">
            <div className="text-[10px] md:text-xs font-black text-slate-600 uppercase tracking-[0.5em] mb-4 md:mb-6">Output Accuracy</div>
            <div className={`text-6xl md:text-9xl font-black mono ${isSuccess ? 'text-emerald-500' : 'text-rose-500'} neon-text-indigo`}>
              {score}%
            </div>
          </div>
          
          <div className="grid gap-4 md:gap-6 max-w-md mx-auto">
            <button 
              onClick={() => onComplete(score)}
              className={`w-full py-5 md:py-7 ${isSuccess ? 'bg-emerald-500 text-slate-950' : 'bg-indigo-600 text-white'} rounded-2xl md:rounded-[2.5rem] font-black shadow-2xl transition-all btn-press text-sm md:text-xl uppercase tracking-widest`}
            >
              Sync Final Progress
            </button>
            {!isSuccess && (
               <button 
                  onClick={onCancel}
                  className="w-full py-4 text-slate-500 font-black uppercase tracking-widest hover:text-white transition-colors text-xs md:text-sm"
               >
                 Retreat to Tactical Hub
               </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-4 md:py-16 px-4 md:px-8 animate-in fade-in slide-in-from-bottom-10 duration-500">
      <header className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-10 mb-10 md:mb-16">
        <div className="flex items-center gap-4 md:gap-8 w-full md:w-auto">
          <button 
            onClick={onCancel} 
            className="w-12 h-12 md:w-16 md:h-16 bg-slate-900 border border-slate-800 rounded-xl md:rounded-[1.75rem] flex items-center justify-center text-slate-500 hover:text-white transition-all shadow-xl"
          >
            <ChevronLeft size={28} />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-1.5 md:mb-2">
               <Zap size={14} className="text-indigo-500" fill="currentColor" />
               <div className="text-[8px] md:text-xs font-black text-indigo-500 uppercase tracking-[0.3em] md:tracking-[0.4em]">{module.title} Protocol</div>
            </div>
            <h2 className="text-xl md:text-4xl font-black text-white tracking-tighter uppercase italic">Data Extraction</h2>
          </div>
        </div>

        <div className="flex gap-4 w-full md:w-auto justify-between md:justify-end">
          <div className="bg-slate-900 px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-[2rem] border border-slate-800 flex items-center gap-3 md:gap-5 flex-1 md:flex-none">
             <div className="flex gap-1 md:gap-1.5">
                {[...Array(5)].map((_, i) => (
                  /* Fixed non-standard md:size prop by using Tailwind classes */
                  <Heart key={i} className={`w-3.5 h-3.5 md:w-4.5 md:h-4.5 ${i < 5 - (currentQuestionIndex / 2) ? 'text-rose-500 shadow-glow' : 'text-slate-800'}`} fill="currentColor" />
                ))}
             </div>
             <span className="text-[8px] md:text-xs font-black text-slate-500 uppercase tracking-widest">Lives</span>
          </div>
          <div className="bg-slate-950 text-white px-6 md:px-10 py-3 md:py-4 rounded-xl md:rounded-[2rem] border-2 border-indigo-500/50 font-black mono text-lg md:text-3xl shadow-[0_0_20px_rgba(99,102,241,0.3)]">
            {currentQuestionIndex + 1}<span className="text-slate-700 mx-1 md:mx-2">/</span>{module.questions.length}
          </div>
        </div>
      </header>

      <div className="bg-slate-900 p-8 md:p-24 rounded-[3rem] md:rounded-[5rem] border-2 border-slate-800 shadow-2xl mb-10 md:mb-12 min-h-[450px] md:min-h-[650px] flex flex-col relative">
        <div className="absolute top-0 left-0 w-full h-1.5 md:h-2 bg-slate-800 overflow-hidden rounded-t-full">
           <div 
             className="h-full bg-indigo-500 transition-all duration-500 shadow-[0_0_20px_rgba(99,102,241,0.6)]"
             style={{ width: `${((currentQuestionIndex + 1) / module.questions.length) * 100}%` }}
           />
        </div>

        <div className="mb-8 md:mb-12 flex items-center gap-4">
          <div className={`text-[9px] md:text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] md:tracking-[0.3em] border shadow-sm ${
            currentQuestion.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
            currentQuestion.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'
          }`}>
            Threat: {currentQuestion.difficulty}
          </div>
          <div className="text-[9px] md:text-xs font-black text-slate-600 uppercase tracking-widest">{currentQuestion.category} Matrix</div>
        </div>

        <h3 className="text-2xl md:text-5xl font-black text-white mb-10 md:mb-20 leading-tight md:leading-[1.1] tracking-tighter">
          {currentQuestion.text}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-auto">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = answers[currentQuestion.id] === idx;
            return (
              <button
                key={idx}
                onClick={() => handleSelectAnswer(idx)}
                className={`text-left p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border-2 transition-all flex items-center gap-4 md:gap-8 btn-press ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-500/10 text-white shadow-[0_0_40px_rgba(99,102,241,0.2)] scale-[1.02]'
                    : 'border-slate-800 hover:border-slate-700 text-slate-500 hover:bg-slate-800/50'
                }`}
              >
                <div className={`w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-[1.25rem] flex items-center justify-center font-black mono text-lg md:text-3xl shrink-0 transition-all ${
                  isSelected ? 'bg-indigo-500 text-slate-950 scale-110 shadow-glow' : 'bg-slate-950 text-slate-700'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </div>
                <span className="font-bold text-lg md:text-2xl tracking-tight leading-tight">{option}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-10">
        <button
          onClick={handleBack}
          disabled={currentQuestionIndex === 0}
          className={`w-full md:w-auto px-12 py-5 rounded-[2rem] font-black uppercase tracking-widest text-[10px] md:text-sm transition-all ${
            currentQuestionIndex === 0 ? 'text-slate-800 cursor-not-allowed opacity-0' : 'text-slate-500 hover:text-white'
          }`}
        >
          Previous Sector
        </button>
        <button
          onClick={handleNext}
          disabled={answers[currentQuestion.id] === undefined}
          className={`w-full md:flex-1 flex items-center justify-center gap-4 md:gap-6 font-black px-10 py-6 md:py-8 rounded-[2rem] md:rounded-[3.5rem] transition-all text-sm md:text-2xl uppercase tracking-[0.3em] ${
            answers[currentQuestion.id] === undefined
              ? 'bg-slate-800 text-slate-600 cursor-not-allowed opacity-50'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_40px_rgba(99,102,241,0.4)]'
          }`}
        >
          {isLastQuestion ? <><Target size={28} /> Finalize Upload</> : <>Advance Protocol <ChevronRight size={28} /></>}
        </button>
      </div>
    </div>
  );
};

export default QuizView;
