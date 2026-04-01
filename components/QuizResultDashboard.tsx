
import React from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, 
  Target, 
  Clock, 
  Zap, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Star,
  TrendingUp,
  Award,
  Brain
} from 'lucide-react';
import { Lesson, Question } from '@/types';

const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

interface QuizResultDashboardProps {
  lesson: Lesson;
  xpEarned: number;
  correctCount: number;
  totalCount: number;
  timeSpent: number; // in seconds
  missedQuestions: Question[];
  onFinish: () => void;
}

export const QuizResultDashboard: React.FC<QuizResultDashboardProps> = ({
  lesson,
  xpEarned,
  correctCount,
  totalCount,
  timeSpent,
  missedQuestions,
  onFinish
}) => {
  const accuracy = Math.round((correctCount / totalCount) * 100);
  const minutes = Math.floor(timeSpent / 60);
  const seconds = timeSpent % 60;

  const performanceLevel = accuracy >= 90 ? 'Exceptional' : accuracy >= 70 ? 'Great' : accuracy >= 50 ? 'Good' : 'Needs Practice';
  const performanceColor = accuracy >= 90 ? 'text-green-500' : accuracy >= 70 ? 'text-blue-500' : accuracy >= 50 ? 'text-yellow-500' : 'text-orange-500';

  return (
    <MotionDiv 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="fixed inset-0 bg-white dark:bg-gray-950 z-[120] flex flex-col overflow-y-auto no-scrollbar"
    >
      <div className="max-w-4xl mx-auto w-full p-6 py-12 sm:py-20">
        {/* Header Section */}
        <div className="text-center mb-12">
          <MotionDiv 
            initial={{ scale: 0, rotate: -10 }} 
            animate={{ scale: 1, rotate: 0 }} 
            className="w-24 h-24 bg-yellow-400 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl ring-8 ring-yellow-50 dark:ring-yellow-900/20"
          >
            <Trophy className="w-12 h-12 text-white" />
          </MotionDiv>
          <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
            {lesson.isChallenge ? 'Challenge Crushed! 🏆' : 'Lesson Mastered!'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-bold text-lg">
            {lesson.isChallenge 
              ? `You've completed the ${lesson.title} challenge!` 
              : `You've successfully completed "${lesson.title}"`}
          </p>
        </div>

        {lesson.isChallenge && (
          <MotionDiv 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 p-6 bg-gradient-to-r from-amber-500 to-orange-600 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden"
          >
            <div className="relative z-10 flex items-center gap-6">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0">
                <Award size={32} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black mb-1 uppercase tracking-tight">Elite Performance!</h3>
                <p className="text-amber-100 font-bold text-sm leading-tight">
                  You've earned double XP for completing this real-life simulation. Your skills are truly practical!
                </p>
              </div>
            </div>
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          </MotionDiv>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-[2rem] border-2 border-blue-100 dark:border-blue-900/40 text-center">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white mx-auto mb-3">
              <Zap size={20} />
            </div>
            <p className="text-[10px] font-black uppercase text-blue-400 tracking-widest mb-1">XP Earned</p>
            <p className="text-2xl font-black text-blue-600">+{xpEarned}</p>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-[2rem] border-2 border-green-100 dark:border-green-900/40 text-center">
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white mx-auto mb-3">
              <Target size={20} />
            </div>
            <p className="text-[10px] font-black uppercase text-green-400 tracking-widest mb-1">Accuracy</p>
            <p className="text-2xl font-black text-green-600">{accuracy}%</p>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-[2rem] border-2 border-purple-100 dark:border-purple-900/40 text-center">
            <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white mx-auto mb-3">
              <Clock size={20} />
            </div>
            <p className="text-[10px] font-black uppercase text-purple-400 tracking-widest mb-1">Time Taken</p>
            <p className="text-2xl font-black text-purple-600">{minutes}m {seconds}s</p>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-[2rem] border-2 border-amber-100 dark:border-amber-900/40 text-center">
            <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center text-white mx-auto mb-3">
              <TrendingUp size={20} />
            </div>
            <p className="text-[10px] font-black uppercase text-amber-400 tracking-widest mb-1">Performance</p>
            <p className={`text-lg font-black ${performanceColor}`}>{performanceLevel}</p>
          </div>
        </div>

        {/* Detailed Feedback Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <Brain className="w-5 h-5 text-blue-600" />
              <h3 className="text-xl font-black text-gray-800 dark:text-white">Knowledge Breakdown</h3>
            </div>
            
            <div className="bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-[2.5rem] p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-green-100 dark:bg-green-900/40 rounded-lg flex items-center justify-center text-green-600">
                      <CheckCircle2 size={18} />
                   </div>
                   <span className="font-bold text-gray-700 dark:text-gray-200">Correct Concepts</span>
                </div>
                <span className="font-black text-green-600">{correctCount}</span>
              </div>
              <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <MotionDiv initial={{ width: 0 }} animate={{ width: `${accuracy}%` }} className="h-full bg-green-500" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-red-100 dark:bg-red-900/40 rounded-lg flex items-center justify-center text-red-600">
                      <XCircle size={18} />
                   </div>
                   <span className="font-bold text-gray-700 dark:text-gray-200">Areas for Improvement</span>
                </div>
                <span className="font-black text-red-600">{missedQuestions.length}</span>
              </div>
              <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <MotionDiv initial={{ width: 0 }} animate={{ width: `${100 - accuracy}%` }} className="h-full bg-red-500" />
              </div>
            </div>

            {missedQuestions.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">Review Missed Topics</h4>
                <div className="space-y-3">
                  {missedQuestions.slice(0, 3).map((q, i) => (
                    <div key={i} className="bg-gray-50 dark:bg-gray-900/50 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 flex gap-4">
                      <div className="w-8 h-8 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center text-red-500 shrink-0 shadow-sm">
                        <Star size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-1">{q.prompt}</p>
                        <p className="text-xs text-gray-400 font-medium leading-relaxed">{q.explanation}</p>
                      </div>
                    </div>
                  ))}
                  {missedQuestions.length > 3 && (
                    <p className="text-center text-[10px] font-black text-gray-400 uppercase tracking-widest py-2">
                      + {missedQuestions.length - 3} more topics to review
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="text-xl font-black text-gray-800 dark:text-white">Next Steps</h3>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-100 dark:border-amber-900/40 rounded-[2.5rem] p-8 text-center">
              <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Star className="w-8 h-8 text-amber-500 fill-current" />
              </div>
              <h4 className="text-lg font-black text-amber-900 dark:text-amber-200 mb-2">Keep the Momentum!</h4>
              <p className="text-sm font-bold text-amber-800/70 dark:text-amber-300/70 mb-8 leading-relaxed">
                You're doing great. Complete the next lesson in the roadmap to maintain your streak and earn more XP.
              </p>
              <MotionButton 
                whileTap={{ scale: 0.95 }}
                onClick={onFinish}
                className="w-full py-4 bg-amber-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-[0_4px_0_0_#b45309] flex items-center justify-center gap-2"
              >
                Continue Path <ArrowRight size={16} />
              </MotionButton>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="flex justify-center">
           <MotionButton 
            whileTap={{ scale: 0.95 }}
            onClick={onFinish}
            className="w-full max-w-sm py-5 bg-blue-600 text-white rounded-[2rem] font-black text-xl shadow-[0_6px_0_0_#1d4ed8] hover:brightness-105 transition-all"
          >
            BACK TO ROADMAP
          </MotionButton>
        </div>
      </div>
    </MotionDiv>
  );
};
