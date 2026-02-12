
import React from 'react';

interface ProgressBarProps {
  progress: number;
  color: string;
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, color, label }) => {
  const colorMap: Record<string, string> = {
    blue: 'indigo',
    green: 'emerald',
    orange: 'orange'
  };
  const themeColor = colorMap[color] || 'indigo';

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-slate-500 text-[10px] uppercase tracking-widest">{label}</span>
          <span className={`text-xs font-black text-${themeColor}-400`}>{Math.round(progress)}%</span>
        </div>
      )}
      <div className="w-full h-3 bg-slate-900 rounded-full border border-slate-700/50 p-0.5 overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r from-${themeColor}-600 to-${themeColor}-400 rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(0,0,0,0.5)] relative overflow-hidden`}
          style={{ width: `${progress}%` }}
        >
          {/* Animated Highlight Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" 
               style={{ animation: 'shimmer 2s infinite linear' }}
          />
        </div>
      </div>
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default ProgressBar;
