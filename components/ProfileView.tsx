
import React from 'react';
import { User, UserStats, OfficeTool } from '@/types';
import { TOOLS_CONFIG, INITIAL_LESSONS } from '@/constants';
import { motion } from 'motion/react';
import { 
  Trophy, 
  Flame, 
  Calendar, 
  Settings, 
  LogOut, 
  Camera, 
  Medal, 
  Target,
  Zap
} from 'lucide-react';

const MotionDiv = motion.div as any;

interface ProfileViewProps {
  user: User;
  stats: UserStats;
  onLogout: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ user, stats, onLogout }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <MotionDiv 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-900 rounded-[2.5rem] border-2 border-gray-100 dark:border-gray-800 p-8 shadow-sm flex flex-col items-center text-center"
          >
            <div className="relative group mb-6">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-full flex items-center justify-center overflow-hidden border-4 border-white dark:border-gray-700 shadow-xl">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.fullname} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl font-black text-blue-600 dark:text-blue-400">{user.fullname[0]}</span>
                )}
              </div>
              <button className="absolute bottom-1 right-1 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white border-4 border-white dark:border-gray-700 shadow-lg hover:scale-110 transition-transform">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <h2 className="text-2xl font-black text-gray-800 dark:text-white mb-1">{user.fullname}</h2>
            <p className="text-gray-400 dark:text-gray-500 font-bold mb-6">{user.email}</p>

            <div className="w-full grid grid-cols-2 gap-3 mb-8">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-center gap-2 text-orange-500 mb-1">
                  <Flame className="w-4 h-4 fill-current" />
                  <span className="text-lg font-black">{stats.streak}</span>
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Day Streak</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
                  <Zap className="w-4 h-4 fill-current" />
                  <span className="text-lg font-black">{stats.xp}</span>
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total XP</p>
              </div>
            </div>

            <div className="w-full space-y-3">
              <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-all">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="text-sm">Joined {user.joinedDate}</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-all">
                <Medal className="w-5 h-5 text-gray-400" />
                <span className="text-sm">Achievement Progress</span>
              </div>
            </div>

            <hr className="w-full my-8 border-gray-100 dark:border-gray-800" />

            <div className="w-full flex gap-3">
              <button className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                <Settings className="w-4 h-4" /> Edit
              </button>
              <button 
                onClick={onLogout}
                className="flex-1 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Exit
              </button>
            </div>
          </MotionDiv>
        </div>

        {/* Stats & Progress */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black text-gray-800 dark:text-white">Your Statistics</h2>
            <div className="flex gap-2">
               <div className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2">
                  <Target className="w-3.5 h-3.5" /> High Performance
               </div>
            </div>
          </div>

          {/* Detailed Mastery Bars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(['Excel', 'Word', 'PowerPoint'] as OfficeTool[]).map(tool => {
              const config = TOOLS_CONFIG[tool as keyof typeof TOOLS_CONFIG];
              const toolLessons = INITIAL_LESSONS.filter(l => l.tool === tool);
              const completed = stats.completedLessons.filter(id => {
                const lesson = INITIAL_LESSONS.find(l => l.id === id);
                return lesson && lesson.tool === tool;
              }).length;
              const progress = toolLessons.length > 0 ? (completed / toolLessons.length) * 100 : 0;

              return (
                <div key={tool} className="bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm hover:border-blue-100 dark:hover:border-blue-900 transition-colors">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-10 h-10 ${config.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                      {config.icon}
                    </div>
                    <div>
                      <h4 className="font-black text-gray-800 dark:text-white">{tool}</h4>
                      <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Mastery</p>
                    </div>
                  </div>
                  <div className="flex items-end justify-between mb-2">
                    <span className="text-sm font-black text-gray-800 dark:text-gray-200">{completed} Lessons</span>
                    <span className="text-xs font-black text-gray-400">{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden border border-gray-50 dark:border-gray-700">
                    <MotionDiv 
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      className={`h-full ${config.color}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Achievements Section */}
          <div className="bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center">
             <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                <Trophy className="w-10 h-10 text-gray-200 dark:text-gray-700" />
             </div>
             <h3 className="text-xl font-black text-gray-800 dark:text-white mb-2">
               {stats.completedLessons.length >= 5 ? 'Rising Star' : 'No Achievements Yet'}
             </h3>
             <p className="text-gray-400 dark:text-gray-500 font-bold max-w-sm mb-8">
               {stats.completedLessons.length >= 5 
                 ? "You've completed more than 5 lessons! Keep going to unlock the Office Guru badge." 
                 : "Keep learning to earn badges and special office tool honors! Finish your first stage in any tool to get started."}
             </p>
             <button className="px-8 py-4 bg-blue-600 dark:bg-blue-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-[0_4px_0_0_#1d4ed8] dark:shadow-[0_4px_0_0_#2563eb] active:scale-95 transition-transform">
                Go to Learning Path
             </button>
          </div>

        </div>
      </div>
    </div>
  );
};
