
import React from 'react';
import * as LucideIcons from 'lucide-react';
import { ModuleData, UserProgress, ModuleType } from '../types';
import ProgressBar from './ProgressBar';

interface ModuleCardProps {
  module: ModuleData;
  // Use ModuleType to correctly index UserProgress
  progress: UserProgress[ModuleType];
  onStartPreTest: () => void;
  onStartPostTest: () => void;
  onLearn: () => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module, progress, onStartPreTest, onStartPostTest, onLearn }) => {
  const Icon = (LucideIcons as any)[module.icon] || LucideIcons.File;
  const completionPercentage = progress.isCompleted ? 100 : progress.preTestScore !== null ? 50 : 0;
  
  const colorMap: Record<string, { base: string, glow: string, text: string }> = {
    blue: { base: 'indigo-500', glow: 'rgba(99, 102, 241, 0.4)', text: 'text-indigo-400' },
    green: { base: 'emerald-500', glow: 'rgba(16, 185, 129, 0.4)', text: 'text-emerald-400' },
    orange: { base: 'orange-500', glow: 'rgba(245, 158, 11, 0.4)', text: 'text-orange-400' }
  };
  const theme = colorMap[module.color] || colorMap.blue;

  // Calculate Rank based on postTestScore
  const getRank = () => {
    if (!progress.postTestScore) return null;
    if (progress.postTestScore === 100) return { label: 'S', color: 'text-yellow-400 border-yellow-400' };
    if (progress.postTestScore >= 90) return { label: 'A', color: 'text-indigo-400 border-indigo-400' };
    if (progress.postTestScore >= 80) return { label: 'B', color: 'text-emerald-400 border-emerald-400' };
    return { label: 'C', color: 'text-slate-400 border-slate-400' };
  };
  const rank = getRank();

  return (
    <div className={`game-card rounded-[2.5rem] p-8 flex flex-col relative overflow-hidden group border-2 border-slate-800`}>
      {/* Dynamic Background Background */}
      <div className={`absolute -top-24 -right-24 w-64 h-64 bg-${theme.base}/5 rounded-full blur-3xl group-hover:bg-${theme.base}/10 transition-colors duration-500`} />
      
      {/* Header */}
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div className={`w-16 h-16 rounded-2xl bg-slate-950 border border-${theme.base}/30 flex items-center justify-center ${theme.text} shadow-inner group-hover:shadow-[0_0_20px_${theme.glow}] transition-all duration-300 animate-float`}>
          <Icon size={32} strokeWidth={2.5} />
        </div>
        
        {rank ? (
           <div className={`rank-badge border-2 bg-slate-950 ${rank.color} shadow-lg`}>
             {rank.label}
           </div>
        ) : (
           <div className="bg-slate-950 px-4 py-1.5 rounded-full border border-slate-800">
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Trial I</span>
           </div>
        )}
      </div>

      {/* Content */}
      <div className="mb-8 relative z-10">
        <h3 className="text-2xl font-black text-white mb-2 tracking-tight group-hover:translate-x-1 transition-transform">{module.title}</h3>
        <p className="text-slate-400 text-sm font-medium leading-relaxed line-clamp-2">
          {module.description}
        </p>
      </div>

      {/* Progress & Actions */}
      <div className="mt-auto space-y-6 relative z-10">
        <ProgressBar progress={completionPercentage} color={module.color} label="Gate Completion" />

        <div className="space-y-3">
          {progress.preTestScore === null ? (
            <button 
              onClick={onStartPreTest}
              className={`w-full py-4 bg-${theme.base} hover:brightness-110 text-slate-950 rounded-2xl font-black shadow-lg shadow-${theme.base}/20 transition-all btn-press uppercase tracking-widest text-xs flex items-center justify-center gap-2`}
            >
              <LucideIcons.LockOpen size={16} /> Unlock World
            </button>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={onLearn}
                className="py-4 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 rounded-2xl font-black text-xs transition-all btn-press uppercase tracking-widest"
              >
                Study
              </button>
              <button 
                onClick={onStartPostTest}
                className={`py-4 bg-${theme.base} hover:brightness-110 text-slate-950 rounded-2xl font-black text-xs shadow-lg shadow-${theme.base}/20 transition-all btn-press uppercase tracking-widest`}
              >
                Boss Run
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;
