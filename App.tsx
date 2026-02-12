
import React, { useState, useEffect } from 'react';
import { 
  UserProgress, 
  Quest, 
  ModuleData,
  User as UserType
} from './types';
import { 
  INITIAL_PROGRESS, 
  INITIAL_QUESTS,
  GEAR_ITEMS
} from './constants';
import Sidebar from './components/Sidebar';
import Dashboard from './views/Dashboard';
import QuizView from './views/QuizView';
import Learn from './views/Learn';
import Quests from './views/Quests';
import Profile from './views/Profile';
import AuthView from './views/AuthView';
import { Menu, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserType | null>(() => {
    const saved = localStorage.getItem('quickoffice_user_v1');
    return saved ? JSON.parse(saved) : null;
  });

  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [selectedModule, setSelectedModule] = useState<ModuleData | null>(null);
  const [quizType, setQuizType] = useState<'pre' | 'post' | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('quickoffice_progress_v2');
    if (saved) return JSON.parse(saved);
    return INITIAL_PROGRESS;
  });

  const [quests, setQuests] = useState<Quest[]>(() => {
    const saved = localStorage.getItem('quickoffice_quests_v2');
    return saved ? JSON.parse(saved) : INITIAL_QUESTS;
  });

  useEffect(() => {
    localStorage.setItem('quickoffice_progress_v2', JSON.stringify(progress));
    localStorage.setItem('quickoffice_quests_v2', JSON.stringify(quests));
    if (currentUser) {
      localStorage.setItem('quickoffice_user_v1', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('quickoffice_user_v1');
    }
  }, [progress, quests, currentUser]);

  useEffect(() => {
    syncAllGear();
  }, []);

  const syncAllGear = () => {
    setProgress(prev => {
      const newUnlocked = new Set(prev.unlockedGear);
      GEAR_ITEMS.filter(item => item.unlockedBy === 'default').forEach(item => newUnlocked.add(item.id));
      (['word', 'excel', 'powerpoint'] as const).forEach(key => {
        if (prev[key].isCompleted) {
          GEAR_ITEMS.filter(item => item.unlockedBy === key).forEach(item => newUnlocked.add(item.id));
        }
      });
      quests.filter(q => q.isCompleted).forEach(q => {
        GEAR_ITEMS.filter(item => item.unlockedBy === q.id).forEach(item => newUnlocked.add(item.id));
      });
      return { ...prev, unlockedGear: Array.from(newUnlocked) };
    });
  };

  const unlockGear = (sourceId: string) => {
    setProgress(prev => {
      const newUnlocked = new Set(prev.unlockedGear);
      GEAR_ITEMS.filter(item => item.unlockedBy === sourceId).forEach(item => newUnlocked.add(item.id));
      (['word', 'excel', 'powerpoint'] as const).forEach(moduleId => {
        if (prev[moduleId].isCompleted) {
          GEAR_ITEMS.filter(item => item.unlockedBy === moduleId).forEach(item => newUnlocked.add(item.id));
        }
      });
      return { ...prev, unlockedGear: Array.from(newUnlocked) };
    });
  };

  const updateQuestStatus = (questId: string, status: boolean) => {
    setQuests(prev => prev.map(q => {
      if (q.id === questId && !q.isCompleted && status) {
        addXP(q.xpReward);
        unlockGear(q.id);
        return { ...q, isCompleted: true };
      }
      return q;
    }));
  };

  const addXP = (amount: number) => {
    setProgress(prev => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / 1000) + 1;
      return { ...prev, xp: newXP, level: newLevel };
    });
  };

  const handleEquip = (gearId: string) => {
    const gear = GEAR_ITEMS.find(i => i.id === gearId);
    if (!gear) return;
    setProgress(prev => ({
      ...prev,
      selectedGear: {
        ...prev.selectedGear,
        [gear.type]: prev.selectedGear[gear.type as keyof typeof prev.selectedGear] === gearId ? null : gearId
      }
    }));
  };

  const handleUpdateAvatar = (base: string, color: string) => {
    setProgress(prev => ({ ...prev, avatarBase: base, avatarColor: color }));
  };

  const handleNavigate = (view: string, data?: any) => {
    if (view === 'logout') {
      setCurrentUser(null);
      setCurrentView('dashboard');
      return;
    }
    if (view === 'quiz') {
      setSelectedModule(data.module);
      setQuizType(data.type);
    } else if (view === 'learn') {
      setSelectedModule(data);
    }
    setCurrentView(view);
    setIsSidebarOpen(false);
    window.scrollTo(0, 0);
  };

  const handleQuizComplete = (score: number) => {
    if (!selectedModule || !quizType) return;
    const moduleId = selectedModule.id;
    addXP(score * 2);
    setProgress(prev => {
      const updated = { ...prev };
      const currentModule = (updated as any)[moduleId];
      if (quizType === 'pre') {
        (updated as any)[moduleId] = { ...currentModule, preTestScore: score };
      } else {
        const isMastered = score >= 80;
        if (isMastered) setTimeout(() => unlockGear(moduleId), 0);
        (updated as any)[moduleId] = { 
          ...currentModule, 
          postTestScore: score, 
          isCompleted: isMastered ? true : currentModule.isCompleted 
        };
      }
      return updated;
    });
    if (quizType === 'pre') updateQuestStatus('q1', true);
    if (quizType === 'post' && score === 100 && moduleId === 'word') updateQuestStatus('q2', true);
    if (quizType === 'post' && score >= 80) {
      if (moduleId === 'excel') updateQuestStatus('q3', true);
      if (moduleId === 'powerpoint') updateQuestStatus('q4', true);
    }
    setCurrentView('dashboard');
    setSelectedModule(null);
    setQuizType(null);
  };

  if (!currentUser) {
    return <AuthView onLogin={(user) => setCurrentUser(user)} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard progress={progress} onNavigate={handleNavigate} />;
      case 'quiz': return selectedModule && quizType ? <QuizView module={selectedModule} type={quizType} onComplete={handleQuizComplete} onCancel={() => setCurrentView('dashboard')} /> : <Dashboard progress={progress} onNavigate={handleNavigate} />;
      case 'learn': return selectedModule ? <Learn module={selectedModule} onBack={() => setCurrentView('dashboard')} /> : <Dashboard progress={progress} onNavigate={handleNavigate} />;
      case 'quests': return <Quests quests={quests} />;
      case 'profile': return <Profile progress={progress} quests={quests} user={currentUser} onEquip={handleEquip} onUpdateAvatar={handleUpdateAvatar} />;
      case 'logout': return (
        <div className="flex flex-col items-center justify-center py-24 text-center px-6">
          <h2 className="text-4xl font-black text-white mb-4 italic uppercase">Abandon Quest?</h2>
          <p className="text-slate-500 mb-10 font-bold uppercase tracking-[0.3em] opacity-50">Local archives will be purged.</p>
          <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="px-16 py-6 bg-rose-600 text-white rounded-[2rem] font-black shadow-2xl shadow-rose-600/20 active:scale-95 transition-all uppercase tracking-widest text-sm btn-press">Purge Database</button>
        </div>
      );
      default: return <Dashboard progress={progress} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] relative">
      {/* Sidebar Toggle Overlay (Mobile) */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <Sidebar 
        currentView={currentView} 
        onNavigate={handleNavigate} 
        level={progress.level} 
        xp={progress.xp} 
        user={currentUser}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-[40]">
           <button 
             onClick={() => setIsSidebarOpen(true)}
             className="p-2 -ml-2 text-slate-400 hover:text-white transition-colors"
           >
             <Menu size={24} />
           </button>
           <div className="flex items-center gap-2">
              <Zap size={20} className="text-indigo-500" fill="currentColor" />
              <span className="text-sm font-black text-white tracking-tighter uppercase italic">QuickQuest</span>
           </div>
           <div className="w-8"></div> {/* Spacer for alignment */}
        </header>

        <main className="p-4 sm:p-8 md:p-12 overflow-y-auto pb-12">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;
