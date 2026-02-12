
import React, { useState, useRef } from 'react';
import { UserProgress, Quest, GearItem, User as UserType } from '../types';
import { GEAR_ITEMS, OFFICE_PALETTE } from '../constants';
import { 
  Award, Target, Zap, Clock, Shield, Star, Crown, Flame, Settings, 
  User, Sword, Edit3, Info, Camera, Palette, Box, Bot, Cpu, Ghost, Hexagon,
  Check, Lock, Package, HelpCircle
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import ProgressBar from '../components/ProgressBar';

interface ProfileProps {
  progress: UserProgress;
  quests: Quest[];
  user: UserType;
  onEquip: (gearId: string) => void;
  onUpdateAvatar: (base: string, color: string) => void;
}

const Profile: React.FC<ProfileProps> = ({ progress, quests, user, onEquip, onUpdateAvatar }) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'gear' | 'avatar'>('stats');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const completedModulesCount = (['word', 'excel', 'powerpoint'] as const)
    .filter(key => progress[key].isCompleted).length;
  const completedQuestsCount = quests.filter(q => q.isCompleted).length;
  
  const stats = [
    { label: 'Gate Master', value: `${completedModulesCount}/3`, icon: Crown, color: 'indigo' },
    { label: 'Battle Medals', value: completedQuestsCount, icon: Award, color: 'emerald' },
    { label: 'Hot Streak', value: '3 Days', icon: Flame, color: 'orange' },
    { label: 'Active Play', value: '4.5H', icon: Clock, color: 'slate' },
  ];

  const avatarPresets = [
    { id: 'User', icon: User, label: 'Standard' },
    { id: 'Bot', icon: Bot, label: 'Automator' },
    { id: 'Cpu', icon: Cpu, label: 'Logic' },
    { id: 'Ghost', icon: Ghost, label: 'Anon' },
    { id: 'Hexagon', icon: Hexagon, label: 'Grid' },
  ];

  const getGearIcon = (itemId: string | null) => {
    if (!itemId) return null;
    const gear = GEAR_ITEMS.find(i => i.id === itemId);
    if (!gear) return null;
    const Icon = (LucideIcons as any)[gear.icon] || HelpCircle;
    return <Icon className="w-5 h-5 md:w-7 md:h-7 text-white" />;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateAvatar(reader.result as string, progress.avatarColor);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const AvatarDisplay = ({ size = "lg" }: { size?: "sm" | "lg" }) => {
    const isLarge = size === "lg";
    const dim = isLarge ? "w-36 h-36 md:w-52 md:h-52" : "w-16 h-16 md:w-24 md:h-24";
    const iconSize = isLarge ? (window.innerWidth < 768 ? 72 : 120) : 32;

    return (
      <div className={`relative ${dim} group`}>
        {progress.selectedGear.cape && (
          <div className={`absolute -inset-5 md:-inset-8 bg-indigo-500/20 blur-xl md:blur-2xl animate-pulse rounded-full`} />
        )}
        
        <div className={`absolute inset-0 rounded-[2rem] md:rounded-[3.5rem] border-4 border-white/10 shadow-2xl overflow-hidden flex items-center justify-center ${progress.avatarColor} transition-colors duration-500`}>
          {progress.avatarBase.startsWith('data:') ? (
              <img src={progress.avatarBase} className="w-full h-full object-cover mix-blend-overlay opacity-80" alt="Avatar" />
          ) : (
              <div className="w-full h-full flex items-center justify-center opacity-40">
                {(() => {
                  const PresetIcon = avatarPresets.find(p => p.id === progress.avatarBase)?.icon || User;
                  return <PresetIcon size={iconSize} className="text-white" />;
                })()}
              </div>
          )}
        </div>

        <div className={`absolute ${isLarge ? '-top-4 md:-top-7' : '-top-2'} left-1/2 -translate-x-1/2 ${isLarge ? 'w-10 h-10 md:w-16 md:h-16' : 'w-8 h-8'} bg-slate-900 border-2 border-indigo-400 rounded-xl md:rounded-2xl flex items-center justify-center shadow-2xl z-20`}>
          {getGearIcon(progress.selectedGear.head) || <Box size={isLarge ? 14 : 10} className="text-slate-700" />}
        </div>
        
        <div className={`absolute top-1/2 ${isLarge ? '-right-4 md:-right-10' : '-right-3'} -translate-y-1/2 ${isLarge ? 'w-10 h-10 md:w-16 md:h-16' : 'w-8 h-8'} bg-slate-900 border-2 border-emerald-400 rounded-xl md:rounded-2xl flex items-center justify-center shadow-2xl rotate-12 z-20`}>
          {getGearIcon(progress.selectedGear.weapon) || <Sword size={isLarge ? 14 : 10} className="text-slate-800" />}
        </div>
        
        <div className={`absolute top-1/2 ${isLarge ? '-left-4 md:-left-10' : '-left-3'} -translate-y-1/2 ${isLarge ? 'w-10 h-10 md:w-16 md:h-16' : 'w-8 h-8'} bg-slate-900 border-2 border-orange-400 rounded-xl md:rounded-2xl flex items-center justify-center shadow-2xl -rotate-12 z-20`}>
          {getGearIcon(progress.selectedGear.shield) || <Shield size={isLarge ? 14 : 10} className="text-slate-800" />}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto py-2 md:py-8 animate-in slide-in-from-right-10 duration-700">
      <div className="bg-slate-900 rounded-[1.75rem] md:rounded-[3.5rem] border-2 border-slate-800 overflow-hidden shadow-2xl mb-8 md:mb-12 relative">
        <div className="h-44 md:h-72 bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 relative overflow-hidden">
           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-[length:15px_15px] md:bg-[length:25px_25px]" />
           <div className="absolute -bottom-1 left-0 w-full h-20 md:h-32 bg-gradient-to-t from-slate-900 to-transparent" />
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-2 md:mt-6">
              <AvatarDisplay />
           </div>
        </div>

        <div className="px-6 md:px-12 pb-8 md:pb-16 relative z-10 flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2 md:mb-4">
               <span className="px-3 py-1 bg-indigo-500 text-slate-950 font-black text-[8px] md:text-xs rounded-full uppercase tracking-widest">Level {progress.level}</span>
               <span className="text-indigo-400 font-black mono text-[9px] md:text-sm uppercase tracking-[0.3em]">Agent ID: #{user.userid.substr(0,4)}</span>
            </div>
            <h1 className="text-3xl md:text-6xl font-black text-white tracking-tighter mb-1 md:mb-2 uppercase leading-none">{user.first_name} {user.last_name}</h1>
            <p className="text-slate-400 text-sm md:text-xl font-bold uppercase tracking-[0.2em] md:tracking-[0.4em] opacity-60">Master of Protocol: {user.url_address}</p>
          </div>
          
          <div className="flex w-full md:w-auto bg-slate-950/80 p-1.5 md:p-3 rounded-2xl md:rounded-3xl border border-slate-800 backdrop-blur-md overflow-x-auto no-scrollbar">
            {[
              { id: 'stats', label: 'Stats', icon: Target },
              { id: 'avatar', label: 'Identity', icon: Palette },
              { id: 'gear', label: 'Gear', icon: Sword },
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 md:flex-none px-4 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-[9px] md:text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <tab.icon size={16} className="hidden lg:block" /> {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-12">
          <div className="lg:col-span-3 bg-slate-900/40 p-6 md:p-12 rounded-[2rem] md:rounded-[4rem] border-2 border-slate-800 shadow-xl backdrop-blur-md">
            <h2 className="text-xl md:text-3xl font-black text-white mb-8 md:mb-12 flex items-center gap-4 md:gap-6 uppercase tracking-tighter">
               <Target className="text-indigo-500 w-6 h-6 md:w-8 md:h-8" /> Attributes Breakdown
            </h2>
            <div className="space-y-5 md:space-y-8">
              <div className="p-5 md:p-8 rounded-2xl md:rounded-[2.5rem] bg-slate-950/50 border border-slate-800">
                <ProgressBar label="Fortress Logic (Word)" progress={progress.word.isCompleted ? 100 : progress.word.preTestScore ? 50 : 0} color="blue" />
              </div>
              <div className="p-5 md:p-8 rounded-2xl md:rounded-[2.5rem] bg-slate-950/50 border border-slate-800">
                <ProgressBar label="Alchemist Math (Excel)" progress={progress.excel.isCompleted ? 100 : progress.excel.preTestScore ? 50 : 0} color="green" />
              </div>
              <div className="p-5 md:p-8 rounded-2xl md:rounded-[2.5rem] bg-slate-950/50 border border-slate-800">
                <ProgressBar label="Visionary Arts (Slides)" progress={progress.powerpoint.isCompleted ? 100 : progress.powerpoint.preTestScore ? 50 : 0} color="orange" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-8 mt-8 md:mt-12">
               {stats.map((stat, i) => (
                 <div key={i} className="p-5 md:p-10 bg-slate-950/50 rounded-2xl md:rounded-[3rem] border border-slate-800">
                   <div className="text-indigo-400 mb-3 md:mb-5"><stat.icon className="w-6 h-6 md:w-8 md:h-8" /></div>
                   <div className="text-xl md:text-4xl font-black text-white mono">{stat.value}</div>
                   <div className="text-[8px] md:text-xs text-slate-500 font-black uppercase tracking-widest mt-1">{stat.label}</div>
                 </div>
               ))}
            </div>
          </div>

          <div className="lg:col-span-2 bg-slate-900/40 p-6 md:p-12 rounded-[2rem] md:rounded-[4rem] border-2 border-slate-800 shadow-xl backdrop-blur-md">
            <h2 className="text-xl md:text-3xl font-black text-white mb-8 md:mb-12 flex items-center gap-4 md:gap-6 uppercase tracking-tighter">
               <Star className="text-yellow-400 w-6 h-6 md:w-8 md:h-8" fill="currentColor" /> Earned Medals
            </h2>
            <div className="grid grid-cols-3 gap-5 md:gap-8">
              {quests.filter(q => q.isCompleted).map(q => (
                <div key={q.id} className="group relative flex flex-col items-center">
                  <div className="w-14 h-14 md:w-20 md:h-20 bg-indigo-500/10 text-indigo-400 rounded-xl md:rounded-3xl border-2 border-indigo-500/30 flex items-center justify-center hover:rotate-12 transition-all shadow-lg mb-2 md:mb-3">
                     <Award className="w-7 h-7 md:w-10 md:h-10" />
                  </div>
                  <span className="text-[7px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest text-center truncate w-full">{q.reward.split(': ')[1]}</span>
                </div>
              ))}
              {quests.filter(q => !q.isCompleted).length < 6 && [...Array(3)].map((_, i) => (
                 <div key={i} className="flex flex-col items-center opacity-10">
                    <div className="w-14 h-14 md:w-20 md:h-20 bg-slate-800 rounded-xl md:rounded-3xl flex items-center justify-center border-2 border-slate-700 mb-2">
                       <Shield className="w-5 h-5 md:w-8 md:h-8" />
                    </div>
                 </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'avatar' && (
        <div className="bg-slate-900/40 p-6 md:p-12 rounded-[2rem] md:rounded-[4rem] border-2 border-slate-800 shadow-xl backdrop-blur-md animate-in fade-in duration-500">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
              <div className="space-y-10 md:space-y-16">
                 <div>
                   <h2 className="text-xl md:text-3xl font-black text-white flex items-center gap-4 uppercase tracking-tighter mb-6">
                     <Palette className="text-indigo-500 w-6 h-6 md:w-8 md:h-8" /> Morphology Core
                   </h2>
                   <div className="flex flex-wrap gap-3 md:gap-6 mb-8">
                     {avatarPresets.map((preset) => (
                       <button
                         key={preset.id}
                         onClick={() => onUpdateAvatar(preset.id, progress.avatarColor)}
                         className={`w-16 h-16 md:w-24 md:h-24 rounded-xl md:rounded-[2rem] border-2 transition-all flex flex-col items-center justify-center gap-1.5 ${progress.avatarBase === preset.id ? 'bg-indigo-500/10 border-indigo-500 text-indigo-400' : 'bg-slate-950/50 border-slate-800 text-slate-600'}`}
                       >
                         <preset.icon className="w-7 h-7 md:w-9 md:h-9" />
                         <span className="text-[7px] md:text-[10px] font-black uppercase tracking-widest">{preset.label}</span>
                       </button>
                     ))}
                     <button 
                        onClick={triggerUpload}
                        className={`w-16 h-16 md:w-24 md:h-24 rounded-xl md:rounded-[2rem] border-2 border-dashed flex flex-col items-center justify-center gap-1.5 transition-all ${progress.avatarBase.startsWith('data:') ? 'bg-indigo-500/10 border-indigo-500 text-indigo-400' : 'border-slate-800 text-slate-600'}`}
                     >
                       <Camera className="w-7 h-7 md:w-9 md:h-9" />
                       <span className="text-[7px] md:text-[10px] font-black uppercase tracking-widest">Inject</span>
                       <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                     </button>
                   </div>
                 </div>

                 <div>
                   <h2 className="text-xl md:text-3xl font-black text-white flex items-center gap-4 uppercase tracking-tighter mb-8">
                     <Settings size={24} className="text-indigo-500 md:w-8 md:h-8" /> Corporate Palette
                   </h2>
                   <div className="grid grid-cols-4 md:grid-cols-4 gap-4 md:gap-6">
                      {OFFICE_PALETTE.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => onUpdateAvatar(progress.avatarBase, color.class)}
                          className={`group relative flex flex-col items-center gap-2 md:gap-4 transition-all ${progress.avatarColor === color.class ? 'scale-110' : 'opacity-40'}`}
                        >
                          <div className={`w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-[1.5rem] ${color.class} border-2 md:border-4 ${progress.avatarColor === color.class ? 'border-white' : 'border-transparent'} shadow-xl`} />
                          <span className="text-[7px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">{color.name.split(' ')[0]}</span>
                        </button>
                      ))}
                   </div>
                 </div>
              </div>

              <div className="bg-slate-950/50 rounded-[1.5rem] md:rounded-[3.5rem] border-2 border-slate-800 p-8 md:p-16 flex flex-col items-center justify-center text-center">
                 <div className="mb-8 md:mb-12 scale-110 md:scale-125">
                    <AvatarDisplay />
                 </div>
                 <h3 className="text-xl md:text-3xl font-black text-white mb-2 md:mb-4 uppercase tracking-tighter">Live Preview</h3>
                 <p className="text-slate-500 text-[10px] md:text-sm font-bold uppercase tracking-[0.3em]">Protocol Verified</p>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'gear' && (
        <div className="bg-slate-900/40 p-6 md:p-12 rounded-[2rem] md:rounded-[4rem] border-2 border-slate-800 shadow-xl backdrop-blur-md animate-in fade-in duration-500">
           <div className="flex items-center justify-between mb-10 md:mb-16">
             <h2 className="text-xl md:text-3xl font-black text-white flex items-center gap-4 uppercase tracking-tighter">
               <Sword size={24} className="text-indigo-500 md:w-8 md:h-8" /> Gear Arsenal
             </h2>
             <span className="text-[9px] md:text-xs font-black text-slate-500 uppercase tracking-widest">{progress.unlockedGear.length} Items Found</span>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-10">
              {['head', 'weapon', 'shield', 'cape'].map((type) => (
                <div key={type} className="space-y-4 md:space-y-6">
                  <h3 className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2 border-b border-slate-800 pb-3">
                    {type} Slot
                  </h3>
                  <div className="grid grid-cols-1 gap-3 md:gap-4">
                    {GEAR_ITEMS.filter(item => item.type === type).map(item => {
                      const isUnlocked = progress.unlockedGear.includes(item.id);
                      const isEquipped = Object.values(progress.selectedGear).includes(item.id);
                      const GearIcon = (LucideIcons as any)[item.icon] || Package;

                      return (
                        <button
                          key={item.id}
                          onClick={() => isUnlocked && onEquip(item.id)}
                          className={`p-3 md:p-5 rounded-xl md:rounded-[2rem] border-2 transition-all text-left flex items-center gap-4 relative ${
                            !isUnlocked ? 'opacity-30 border-slate-800 cursor-not-allowed grayscale' :
                            isEquipped ? 'border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/20' :
                            'border-slate-800 hover:border-slate-700 bg-slate-950/50'
                          }`}
                        >
                          <div className={`w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-2xl flex items-center justify-center shrink-0 ${isEquipped ? 'bg-indigo-500 text-slate-950' : 'bg-slate-900 text-slate-500'}`}>
                            <GearIcon className="w-5 h-5 md:w-8 md:h-8" />
                          </div>
                          <div className="overflow-hidden">
                            <div className="text-[10px] md:text-sm font-black text-white truncate">{item.name}</div>
                            <div className="text-[7px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest truncate">{item.description}</div>
                          </div>
                          {!isUnlocked && (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                               <Lock className="text-slate-600 w-3.5 h-3.5 md:w-5 md:h-5" />
                            </div>
                          )}
                          {isEquipped && (
                             <div className="absolute top-2 right-2 md:top-3 md:right-3">
                                <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-indigo-400 animate-pulse shadow-glow" />
                             </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
           </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
