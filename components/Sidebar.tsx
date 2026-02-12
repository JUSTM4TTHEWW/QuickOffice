
import React from 'react';
import { 
  Shield, 
  Map as MapIcon, 
  Trophy, 
  User as UserIcon, 
  Settings, 
  HelpCircle, 
  LogOut,
  Zap,
  Sword,
  X
} from 'lucide-react';
import { User as UserType } from '../types';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  level: number;
  xp: number;
  user: UserType;
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, level, xp, user, isOpen, onClose }) => {
  const menuItems = [
    { id: 'dashboard', icon: Sword, label: 'Quest Hub' },
    { id: 'learn', icon: MapIcon, label: 'Skill Tree' },
    { id: 'quests', icon: Trophy, label: 'Medals' },
    { id: 'profile', icon: UserIcon, label: 'Character' },
  ];

  const bottomItems = [
    { id: 'settings', icon: Settings, label: 'Config' },
    { id: 'logout', icon: LogOut, label: 'Exit Game' },
  ];

  const levelProgress = (xp % 1000) / 10;

  return (
    <aside className={`
      w-72 h-screen bg-[#020617] border-r border-slate-800 flex flex-col z-[60] p-6
      fixed left-0 top-0 transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      {/* Mobile Close Button */}
      <button 
        onClick={onClose}
        className="lg:hidden absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors"
      >
        <X size={24} />
      </button>

      <div className="flex items-center gap-3 mb-10 group cursor-pointer" onClick={() => onNavigate('dashboard')}>
        <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-[0_0_20px_rgba(99,102,241,0.4)] group-hover:rotate-12 transition-transform duration-300">
          <Zap size={24} fill="currentColor" />
        </div>
        <div>
          <span className="text-xl font-black text-white block leading-none tracking-tighter uppercase italic">QuickQuest</span>
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.3em]">v2.5.0</span>
        </div>
      </div>

      <div className="mb-10 p-5 bg-slate-900/50 rounded-2xl border border-slate-800/50 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">
           <Shield size={40} />
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
             <UserIcon size={24} className="text-indigo-400" />
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-black text-slate-500 uppercase tracking-widest">Lv. {level}</div>
            <div className="text-sm font-bold text-white truncate">{user.first_name} {user.last_name}</div>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] font-black text-indigo-400 uppercase">
             <span>Experience</span>
             <span>{xp % 1000}/1000</span>
          </div>
          <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div 
              className="h-full bg-indigo-500 rounded-full transition-all duration-700 xp-bar-glow"
              style={{ width: `${levelProgress}%` }}
            />
          </div>
        </div>
      </div>

      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              onNavigate(item.id);
              if (onClose) onClose();
            }}
            className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all btn-press ${
              currentView === item.id 
                ? 'bg-indigo-600/10 border border-indigo-600/50 text-indigo-400 font-black shadow-[0_0_15px_rgba(99,102,241,0.1)]' 
                : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <item.icon size={20} />
            <span className="text-sm font-bold tracking-tight uppercase tracking-wider">{item.label}</span>
            {currentView === item.id && (
               <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            )}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-800/50 space-y-1">
        {bottomItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              onNavigate(item.id);
              if (onClose) onClose();
            }}
            className="w-full flex items-center gap-4 px-5 py-3 rounded-xl text-slate-600 hover:text-white hover:bg-slate-800 transition-all text-xs font-black uppercase tracking-widest"
          >
            <item.icon size={16} />
            {item.label}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
