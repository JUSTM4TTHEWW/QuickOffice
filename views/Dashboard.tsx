
import React from 'react';
import { MODULES } from '../constants';
import { UserProgress } from '../types';
import ModuleCard from '../components/ModuleCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Zap, Crown, Flame, Trophy, LayoutGrid, Target } from 'lucide-react';

interface DashboardProps {
  progress: UserProgress;
  onNavigate: (view: string, module?: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ progress, onNavigate }) => {
  const chartData = [
    { name: 'Word', score: progress.word.postTestScore || progress.word.preTestScore || 0 },
    { name: 'Excel', score: progress.excel.postTestScore || progress.excel.preTestScore || 0 },
    { name: 'Slides', score: progress.powerpoint.postTestScore || progress.powerpoint.preTestScore || 0 },
  ];

  const totalMastered = (['word', 'excel', 'powerpoint'] as const)
    .filter(key => progress[key].isCompleted).length;

  return (
    <div className="space-y-6 md:space-y-12 max-w-7xl mx-auto pb-6 md:pb-10 animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative rounded-[1.5rem] md:rounded-[3rem] bg-indigo-600 p-6 md:p-14 lg:p-16 overflow-hidden border-2 md:border-4 border-indigo-500 shadow-[0_0_50px_rgba(99,102,241,0.3)]">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:15px_15px] md:bg-[length:20px_20px]" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-10">
          <div className="max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-slate-950/40 border border-white/20 px-3 py-1.5 rounded-full text-white text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] mb-4 md:mb-8 backdrop-blur-xl">
              <Flame size={14} className="text-orange-400" fill="currentColor" /> Session: Active Protocol
            </div>
            <h1 className="text-3xl md:text-6xl font-black text-white mb-4 md:mb-8 leading-tight tracking-tighter uppercase italic">THE WORLD IS <br className="hidden md:block" />YOURS TO MASTER.</h1>
            <p className="text-indigo-100 text-sm md:text-lg font-bold leading-relaxed opacity-80 max-w-md mx-auto md:mx-0">
              Complete quests, extract knowledge, and ascend to the rank of <span className="text-white underline decoration-white/30 font-black">Office Architect</span>.
            </p>
          </div>

          <div className="flex w-full md:w-auto justify-center gap-3 md:gap-6">
            <div className="bg-slate-950/40 backdrop-blur-2xl border border-white/10 p-4 md:p-10 rounded-[1.25rem] md:rounded-[2.5rem] text-center flex-1 md:flex-none min-w-[100px] md:min-w-[170px] animate-float shadow-xl">
               <Trophy className="text-yellow-400 mx-auto mb-2 md:mb-6 w-8 h-8 md:w-12 md:h-12" />
               <div className="text-xl md:text-5xl font-black text-white mono">{progress.level}</div>
               <div className="text-[8px] md:text-[10px] font-black text-indigo-300 uppercase tracking-widest mt-1">Power Level</div>
            </div>
            <div className="bg-slate-950/40 backdrop-blur-2xl border border-white/10 p-4 md:p-10 rounded-[1.25rem] md:rounded-[2.5rem] text-center flex-1 md:flex-none min-w-[100px] md:min-w-[170px] animate-float shadow-xl" style={{ animationDelay: '0.2s' }}>
               <Crown className="text-white mx-auto mb-2 md:mb-6 w-8 h-8 md:w-12 md:h-12" />
               <div className="text-xl md:text-5xl font-black text-white mono">{totalMastered}</div>
               <div className="text-[8px] md:text-[10px] font-black text-indigo-300 uppercase tracking-widest mt-1">Gates Won</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Quest Board */}
      <section>
        <div className="flex items-center justify-between mb-8 md:mb-10 px-1">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="p-2 md:p-3 bg-indigo-500/10 rounded-xl md:rounded-2xl text-indigo-400 border border-indigo-500/20">
               {/* Fixed non-standard md:size prop by using Tailwind classes */}
               <LayoutGrid className="w-5 h-5 md:w-7 md:h-7" />
            </div>
            <div>
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight uppercase">Quest Selection</h2>
              <p className="text-slate-500 font-bold uppercase text-[8px] md:text-[10px] tracking-[0.3em] mt-1">Available Skill Domains</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {MODULES.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              progress={(progress as any)[module.id]}
              onStartPreTest={() => onNavigate('quiz', { module, type: 'pre' })}
              onStartPostTest={() => onNavigate('quiz', { module, type: 'post' })}
              onLearn={() => onNavigate('learn', module)}
            />
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        <section className="lg:col-span-2 bg-slate-900/40 p-6 md:p-12 rounded-[2rem] md:rounded-[3.5rem] border border-slate-800 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-8 md:mb-12">
             <h2 className="text-lg md:text-2xl font-black text-white flex items-center gap-3 md:gap-4 uppercase tracking-tighter">
               <Target className="text-indigo-500 w-6 h-6 md:w-8 md:h-8" /> Proficiency Matrix
             </h2>
             <span className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">Real-time Telemetry</span>
          </div>
          <div className="h-[220px] md:h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontWeight: 900, fontSize: 10, letterSpacing: '1px' }} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} hide />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.03)', radius: 15 }}
                  contentStyle={{ backgroundColor: '#020617', borderRadius: '15px', border: '1px solid #1e293b', padding: '15px', color: '#fff' }}
                />
                <Bar dataKey="score" radius={[8, 8, 8, 8]} barSize={32}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#6366f1', '#10b981', '#f59e0b'][index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-gradient-to-br from-indigo-900/40 to-slate-900/40 p-8 md:p-12 rounded-[2rem] md:rounded-[3.5rem] border border-indigo-500/20 shadow-xl flex flex-col items-center justify-center text-center">
           <div className="w-14 h-14 md:w-20 md:h-20 bg-indigo-500 rounded-full flex items-center justify-center mb-6 md:mb-10 shadow-[0_0_30px_rgba(99,102,241,0.5)]">
              {/* Fixed non-standard md:size prop by using Tailwind classes */}
              <Zap fill="white" className="text-white w-7 h-7 md:w-10 md:h-10" />
           </div>
           <h3 className="text-xl md:text-3xl font-black text-white mb-2 md:mb-4 uppercase tracking-tighter italic">Daily Multiplier</h3>
           <p className="text-slate-400 text-sm md:text-lg font-medium mb-8 md:mb-12 leading-relaxed max-w-[200px] md:max-w-none">
             Finish any Boss Run today to earn <span className="text-indigo-400 font-black">2.5x XP</span> bonus.
           </p>
           <button className="w-full py-4 md:py-6 bg-indigo-500 text-slate-900 font-black rounded-xl md:rounded-[2rem] text-xs md:text-sm uppercase tracking-widest shadow-xl btn-press">
             Claim Booster
           </button>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
