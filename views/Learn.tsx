
import React from 'react';
import { ModuleData } from '../types';
import { ChevronLeft, Info, HelpCircle, FileSearch, Database, Terminal, Zap } from 'lucide-react';

interface LearnProps {
  module: ModuleData;
  onBack: () => void;
}

const Learn: React.FC<LearnProps> = ({ module, onBack }) => {
  const tools = module.questions.filter(q => q.category === 'Tools');
  const features = module.questions.filter(q => q.category === 'Features');

  return (
    <div className="max-w-5xl mx-auto py-8 animate-in fade-in duration-700">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-indigo-400 mb-8 transition-colors font-black uppercase tracking-widest text-xs">
        <ChevronLeft size={18} /> Disconnect from Archive
      </button>

      <div className={`relative p-12 rounded-[3.5rem] bg-slate-900 border-2 border-slate-800 overflow-hidden mb-16 shadow-2xl`}>
        <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12">
           <Database size={200} />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-6">
             <Terminal size={14} /> Knowledge Ingestion Protocol
          </div>
          <h1 className="text-5xl font-black text-white mb-4 tracking-tighter uppercase">{module.title} Manual</h1>
          <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">{module.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <section>
          <div className="flex items-center gap-4 mb-10">
            <div className={`p-4 bg-indigo-500/10 text-indigo-400 rounded-2xl border border-indigo-500/20`}>
              <FileSearch size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight uppercase">Basic Functions</h2>
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Entry Level Tools</p>
            </div>
          </div>
          <div className="space-y-6">
            {tools.map((q) => (
              <div key={q.id} className="bg-slate-900/40 p-8 rounded-3xl border border-slate-800 hover:border-indigo-500/30 transition-all group">
                <h3 className="font-black text-lg text-white mb-3 group-hover:text-indigo-400 transition-colors uppercase tracking-tight">
                  {q.text.replace('Which tool is used to ', '').replace('Which tool ', '').replace('?', '')}
                </h3>
                <p className="text-slate-500 text-sm font-medium mb-6 leading-relaxed">
                  Key Command: <span className="text-indigo-400 font-bold px-2 py-0.5 bg-indigo-500/5 rounded border border-indigo-500/10">{q.options[q.correctAnswer]}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                   {q.options.map((opt, i) => (
                     <span key={i} className={`text-[10px] font-black px-3 py-1.5 rounded-lg border uppercase tracking-wider ${i === q.correctAnswer ? 'bg-indigo-500 text-slate-950 border-indigo-500' : 'bg-slate-950 text-slate-600 border-slate-800'}`}>
                       {opt}
                     </span>
                   ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-4 mb-10">
            <div className={`p-4 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/20`}>
              <Zap size={32} fill="currentColor" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight uppercase">Advanced Skillset</h2>
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Expert Level Features</p>
            </div>
          </div>
          <div className="space-y-6">
            {features.map((q) => (
              <div key={q.id} className="bg-slate-900/40 p-8 rounded-3xl border border-slate-800 hover:border-emerald-500/30 transition-all group">
                <h3 className="font-black text-lg text-white mb-3 group-hover:text-emerald-400 transition-colors uppercase tracking-tight">
                  {q.text.replace('Which feature ', '').replace('What feature ', '').replace('?', '')}
                </h3>
                <p className="text-slate-500 text-sm font-medium mb-6 leading-relaxed">
                  Master the protocol: <span className="text-emerald-400 font-bold px-2 py-0.5 bg-emerald-500/5 rounded border border-emerald-500/10">{q.options[q.correctAnswer]}</span>
                </p>
                <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em] border ${q.difficulty === 'Hard' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
                   Threat Level: {q.difficulty}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
      
      <div className="mt-20 bg-indigo-600 rounded-[3.5rem] p-16 text-center text-slate-950 relative overflow-hidden group">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
        <h2 className="text-4xl font-black mb-4 uppercase italic tracking-tighter">Ready to Strike?</h2>
        <p className="text-indigo-100 text-lg font-bold mb-10 max-w-md mx-auto">The final evaluation is the only way to prove your dominance in this world.</p>
        <button 
          onClick={onBack}
          className="bg-slate-950 text-white font-black py-5 px-16 rounded-3xl hover:scale-105 transition-transform shadow-2xl uppercase tracking-widest text-sm btn-press"
        >
          Initiate Final Boss Fight
        </button>
      </div>
    </div>
  );
};

export default Learn;
