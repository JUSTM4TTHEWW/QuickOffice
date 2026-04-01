
import React from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  Trophy, 
  Target, 
  TrendingUp, 
  Clock, 
  Calendar, 
  ChevronRight, 
  Star, 
  Flame,
  Award,
  BookOpen,
  ArrowUpRight,
  Map as MapIcon,
  Brain
} from 'lucide-react';
import { UserStats, User, OfficeTool } from '../types';
import { TOOLS_CONFIG, INITIAL_LESSONS, REAL_LIFE_CHALLENGES } from '../constants';

const MotionDiv = motion.div as any;

interface StudentDashboardProps {
  user: User;
  stats: UserStats;
  onNavigate: (tab: string) => void;
  onStartLesson: (lessonId: string) => void;
  onStartChallenge: (challengeId: string) => void;
  onToggleBeginnerMode: (enabled: boolean) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ 
  user, 
  stats, 
  onNavigate,
  onStartLesson,
  onStartChallenge,
  onToggleBeginnerMode
}) => {
  const totalLessons = INITIAL_LESSONS.length;
  const completedCount = stats.completedLessons.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  // Calculate tool-specific progress
  const toolProgress = (['Excel', 'Word', 'PowerPoint'] as OfficeTool[]).map(tool => {
    const total = INITIAL_LESSONS.filter(l => l.tool === tool).length;
    const completed = INITIAL_LESSONS.filter(l => l.tool === tool && stats.completedLessons.includes(l.id)).length;
    return {
      tool,
      completed,
      total,
      percent: Math.round((completed / total) * 100)
    };
  });

  // Get next recommended lesson
  const getNextLesson = () => {
    for (const tool of ['Excel', 'Word', 'PowerPoint'] as OfficeTool[]) {
      const lessons = INITIAL_LESSONS.filter(l => l.tool === tool);
      const next = lessons.find(l => !stats.completedLessons.includes(l.id));
      if (next) return next;
    }
    return null;
  };

  const nextLesson = getNextLesson();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <MotionDiv 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-2"
          >
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
              Student Dashboard
            </div>
          </MotionDiv>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            Welcome back, <span className="text-blue-600">{user.name}</span>! 👋
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium mt-2">
            You're on a {stats.streak} day streak. Keep the momentum going!
          </p>
        </div>

        <div className="flex gap-4">
          <div className="bg-white dark:bg-gray-900 p-4 rounded-3xl border-4 border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center text-orange-600">
              <Flame size={24} fill="currentColor" />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Streak</p>
              <p className="text-xl font-black text-gray-900 dark:text-white">{stats.streak} Days</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-4 rounded-3xl border-4 border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl flex items-center justify-center text-yellow-600">
              <Zap size={24} fill="currentColor" />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total XP</p>
              <p className="text-xl font-black text-gray-900 dark:text-white">{stats.xp.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Progress Card */}
        <MotionDiv 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-500/20"
        >
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-2xl font-black mb-2">Overall Progress</h2>
                <p className="text-blue-100 font-medium">You've completed {completedCount} out of {totalLessons} lessons.</p>
              </div>
              <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl">
                <TrendingUp size={24} />
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-5xl font-black">{progressPercent}%</span>
                <span className="text-blue-100 font-bold uppercase tracking-widest text-xs">Mastery Level</span>
              </div>
              <div className="h-4 bg-white/20 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-10">
              {toolProgress.map(tp => (
                <div key={tp.tool} className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-100 mb-1">{tp.tool}</p>
                  <p className="text-lg font-black">{tp.percent}%</p>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl" />
        </MotionDiv>

        {/* Next Lesson Card */}
        <MotionDiv 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border-4 border-gray-100 dark:border-gray-800 shadow-xl flex flex-col"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-purple-600">
              <Target size={20} />
            </div>
            <h2 className="text-xl font-black text-gray-900 dark:text-white">Next Mission</h2>
          </div>

          {nextLesson ? (
            <div className="flex-1 flex flex-col">
              <div className={`p-6 rounded-3xl ${TOOLS_CONFIG[nextLesson.tool].lightColor} dark:bg-opacity-10 mb-6 border-2 ${TOOLS_CONFIG[nextLesson.tool].borderColor} border-opacity-20`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-8 h-8 ${TOOLS_CONFIG[nextLesson.tool].color} rounded-lg flex items-center justify-center text-white scale-75`}>
                    {TOOLS_CONFIG[nextLesson.tool].icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{nextLesson.tool}</span>
                </div>
                <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2">{nextLesson.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{nextLesson.description}</p>
              </div>

              <button 
                onClick={() => onStartLesson(nextLesson.id)}
                className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                Start Now
                <ChevronRight size={18} />
              </button>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 mb-4">
                <Trophy size={32} />
              </div>
              <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2">All Caught Up!</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">You've completed all available lessons. Check back soon for more!</p>
            </div>
          )}
        </MotionDiv>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Lessons Done', value: completedCount, icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-100' },
          { label: 'Achievements', value: Math.floor(stats.xp / 500), icon: Award, color: 'text-purple-600', bg: 'bg-purple-100' },
          { label: 'Avg Accuracy', value: '88%', icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-100' },
          { label: 'Study Time', value: '12.4h', icon: Clock, color: 'text-green-600', bg: 'bg-green-100' },
        ].map((stat, i) => (
          <MotionDiv
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-3xl border-4 border-gray-100 dark:border-gray-800 shadow-sm"
          >
            <div className={`w-10 h-10 ${stat.bg} dark:bg-opacity-20 rounded-xl flex items-center justify-center ${stat.color} mb-4`}>
              <stat.icon size={20} />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-2xl font-black text-gray-900 dark:text-white">{stat.value}</p>
          </MotionDiv>
        ))}
      </div>

      {/* Quick Actions / Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border-4 border-gray-100 dark:border-gray-800 shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-gray-900 dark:text-white">Recent Activity</h2>
            <button 
              onClick={() => onNavigate('profile')}
              className="text-blue-600 font-black text-xs uppercase tracking-widest hover:underline"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {stats.completedLessons.slice(-3).reverse().map((lessonId, i) => {
              const lesson = INITIAL_LESSONS.find(l => l.id === lessonId);
              if (!lesson) return null;
              return (
                <div key={lessonId} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                  <div className={`w-12 h-12 ${TOOLS_CONFIG[lesson.tool].color} rounded-xl flex items-center justify-center text-white`}>
                    {TOOLS_CONFIG[lesson.tool].icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-black text-gray-900 dark:text-white">{lesson.title}</h4>
                    <p className="text-xs text-gray-500 font-medium">Completed recently • +{lesson.xpReward} XP</p>
                  </div>
                  <ArrowUpRight className="text-gray-300 group-hover:text-blue-600 transition-colors" size={20} />
                </div>
              );
            })}
            {stats.completedLessons.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-400 font-medium">No activity yet. Start your first lesson!</p>
              </div>
            )}
          </div>
        </section>

        <section className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border-4 border-gray-100 dark:border-gray-800 shadow-xl">
          <h2 className="text-xl font-black text-gray-900 dark:text-white mb-8">Quick Navigation</h2>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => onNavigate('learn')}
              className="p-6 rounded-3xl bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-100 dark:border-blue-800 text-left group hover:border-blue-400 transition-all"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                <MapIcon size={20} />
              </div>
              <h4 className="font-black text-gray-900 dark:text-white mb-1">Learning Roadmap</h4>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Follow the path</p>
            </button>
            <button 
              onClick={() => onNavigate('tutorials')}
              className="p-6 rounded-3xl bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-100 dark:border-purple-800 text-left group hover:border-purple-400 transition-all"
            >
              <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                <BookOpen size={20} />
              </div>
              <h4 className="font-black text-gray-900 dark:text-white mb-1">Tutorial Library</h4>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Browse all topics</p>
            </button>
          </div>
        </section>
      </div>

      {/* Real-Life Challenges Section */}
      <section className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border-4 border-gray-100 dark:border-gray-800 shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Real-Life Challenges 💡</h2>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Apply your skills to practical situations.</p>
          </div>
          <div className="hidden sm:block px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-[10px] font-black uppercase tracking-widest">
            High XP Rewards
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REAL_LIFE_CHALLENGES.map((challenge, idx) => {
            const config = TOOLS_CONFIG[challenge.tool as keyof typeof TOOLS_CONFIG];
            return (
              <MotionDiv
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-gray-50 dark:bg-gray-800/50 rounded-[2rem] p-6 border-2 border-transparent hover:border-blue-500 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${config.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    {config.icon}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">+{challenge.xpReward} XP</span>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{challenge.difficulty}</span>
                  </div>
                </div>
                <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2 leading-tight">{challenge.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-6 line-clamp-2">{challenge.description}</p>
                <button 
                  onClick={() => onStartChallenge(challenge.id)}
                  className="w-full py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl font-black text-xs uppercase tracking-widest border-2 border-gray-200 dark:border-gray-700 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all"
                >
                  Start Challenge
                </button>
              </MotionDiv>
            );
          })}
        </div>
      </section>

      {/* Preferences Section */}
      <section className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border-4 border-gray-100 dark:border-gray-800 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-green-600">
              <Brain size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900 dark:text-white">Beginner-Friendly Mode</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Get more detailed explanations and helpful hints during lessons.</p>
            </div>
          </div>
          <button 
            onClick={() => onToggleBeginnerMode(!stats.isBeginnerMode)}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none ${stats.isBeginnerMode ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-800'}`}
          >
            <span
              className={`${
                stats.isBeginnerMode ? 'translate-x-7' : 'translate-x-1'
              } inline-block h-6 w-6 transform rounded-full bg-white transition-transform`}
            />
          </button>
        </div>
      </section>
    </div>
  );
};
