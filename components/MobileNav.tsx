
import React from 'react';
import { Sword, Map as MapIcon, Trophy, User as UserIcon } from 'lucide-react';

interface MobileNavProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ currentView, onNavigate }) => {
  const menuItems = [
    { id: 'dashboard', icon: Sword, label: 'Quest' },
    { id: 'learn', icon: MapIcon, label: 'Tree' },
    { id: 'quests', icon: Trophy, label: 'Medals' },
    { id: 'profile', icon: UserIcon, label: 'Char' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 w-full h-20 bg-[#020617]/90 backdrop-blur-xl border-t border-slate-800 flex items-center justify-around z-[100] px-4">
      {menuItems.map((item) => {
        const isActive = currentView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center justify-center gap-1 transition-all flex-1 ${
              isActive ? 'text-indigo-400' : 'text-slate-500'
            }`}
          >
            <div className={`p-2 rounded-xl transition-all ${isActive ? 'bg-indigo-600/10' : ''}`}>
               <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default MobileNav;
