
import React from 'react';
import { Quest } from '../types';
import { Trophy, CheckCircle, Lock, Award, Zap } from 'lucide-react';

interface QuestsProps {
  quests: Quest[];
}

const Quests: React.FC<QuestsProps> = ({ quests }) => {
  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <header className="mb-14 text-center">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6">
          <Trophy size={14} /> Master Achievement System
        </div>
        <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">Hall of Fame</h1>
        <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
          Complete modules and score perfectly to unlock professional badges and climb the productivity rankings.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {quests.map((quest) => (
          <div 
            key={quest.id} 
            className={`group p-8 rounded-[2.5rem] border-2 transition-all-custom flex flex-col ${
              quest.isCompleted 
                ? 'bg-white border-indigo-100 shadow-2xl shadow-indigo-50 ring-1 ring-indigo-50' 
                : 'bg-slate-50 border-slate-100 opacity-90'
            }`}
          >
            <div className="flex justify-between items-start mb-8">
              <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 shadow-inner relative transition-transform group-hover:scale-110 ${
                quest.isCompleted ? 'bg-indigo-600 text-white shadow-indigo-200' : 'bg-slate-200 text-slate-400'
              }`}>
                {quest.isCompleted ? <Award size={40} /> : <Lock size={40} />}
                {quest.isCompleted && (
                   <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-400 text-white rounded-full flex items-center justify-center border-4 border-white">
                      <Zap size={14} fill="white" />
                   </div>
                )}
              </div>
              <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                quest.isCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'
              }`}>
                {quest.isCompleted ? 'Unlocked' : 'Locked'}
              </div>
            </div>

            <div className="flex-1 mb-8">
              <h3 className={`text-2xl font-black mb-2 tracking-tight ${quest.isCompleted ? 'text-slate-900' : 'text-slate-500'}`}>
                {quest.title}
              </h3>
              <p className="text-slate-500 font-medium leading-relaxed">{quest.description}</p>
            </div>

            <div className="mt-auto flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reward</span>
                <span className={`text-sm font-bold ${quest.isCompleted ? 'text-indigo-600' : 'text-slate-400'}`}>
                  {quest.reward}
                </span>
              </div>
              {quest.isCompleted && <CheckCircle size={24} className="text-emerald-500" />}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 bg-gradient-to-br from-slate-900 to-indigo-900 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
         <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
               <path d="M0 100 C 20 0 50 0 100 100" stroke="white" fill="none" strokeWidth="2" />
            </svg>
         </div>
         <h2 className="text-3xl font-black mb-4 relative z-10">Want more challenges?</h2>
         <p className="text-indigo-200 mb-8 max-w-md mx-auto relative z-10">Pro members unlock weekly speed challenges and advanced integration workflows.</p>
         <button className="bg-white text-indigo-900 px-10 py-4 rounded-2xl font-black shadow-xl hover:bg-slate-100 transition-all-custom relative z-10">
            Upgrade to Pro
         </button>
      </div>
    </div>
  );
};

export default Quests;
