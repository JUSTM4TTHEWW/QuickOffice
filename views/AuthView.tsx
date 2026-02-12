
import React, { useState } from 'react';
import { Zap, Shield, Mail, Lock, User, UserPlus, Fingerprint, ChevronRight } from 'lucide-react';
import { User as UserType } from '../types';

interface AuthViewProps {
  onLogin: (user: UserType) => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Simulation of the PHP evaluate() and create_user() logic
    if (isLogin) {
      // Mock Login Logic
      if (formData.email && formData.password) {
        // In a real app, this would be a fetch to login.php
        const mockUser: UserType = {
          userid: Math.random().toString(36).substr(2, 9),
          first_name: 'Office',
          last_name: 'Knight',
          email: formData.email,
          url_address: 'office.knight'
        };
        onLogin(mockUser);
      } else {
        setError('Invalid credentials protocol.');
      }
    } else {
      // Mock Signup Logic (PHP Signup class rules)
      if (!formData.first_name || !formData.last_name || !formData.email || !formData.password) {
        setError('Fields cannot be empty!');
        return;
      }
      if (/\d/.test(formData.first_name) || /\s/.test(formData.first_name)) {
        setError('First name invalid format!');
        return;
      }
      
      const mockUser: UserType = {
        userid: Math.floor(Math.random() * 1000000000).toString(),
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        url_address: `${formData.first_name.toLowerCase()}.${formData.last_name.toLowerCase()}`
      };
      onLogin(mockUser);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#020617] relative overflow-hidden">
      {/* Background FX */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#6366f133_0%,transparent_50%)]" />
      </div>

      <div className="w-full max-w-xl relative z-10 animate-in fade-in zoom-in duration-700">
        <div className="bg-slate-900/80 backdrop-blur-2xl p-8 md:p-14 rounded-[2.5rem] md:rounded-[4rem] border-2 border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          
          <div className="flex flex-col items-center mb-10 md:mb-14">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white shadow-[0_0_30px_rgba(99,102,241,0.5)] mb-6 animate-float">
              <Zap size={40} fill="currentColor" />
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase italic text-center">
              {isLogin ? 'Access Gate' : 'Create Identity'}
            </h1>
            <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px] mt-4">
              {isLogin ? 'Establish Link with Database' : 'Register New Agent Profile'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">First Name</label>
                  <div className="relative group">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={18} />
                    <input 
                      type="text" 
                      placeholder="AGENT"
                      className="w-full bg-slate-950/50 border-2 border-slate-800 rounded-2xl py-4 pl-14 pr-6 text-white font-bold placeholder:text-slate-700 focus:border-indigo-500 focus:outline-none transition-all"
                      value={formData.first_name}
                      onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Last Name</label>
                  <div className="relative group">
                    <Fingerprint className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={18} />
                    <input 
                      type="text" 
                      placeholder="ID"
                      className="w-full bg-slate-950/50 border-2 border-slate-800 rounded-2xl py-4 pl-14 pr-6 text-white font-bold placeholder:text-slate-700 focus:border-indigo-500 focus:outline-none transition-all"
                      value={formData.last_name}
                      onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Comm-Link (Email)</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={18} />
                <input 
                  type="email" 
                  placeholder="name@agency.com"
                  className="w-full bg-slate-950/50 border-2 border-slate-800 rounded-2xl py-4 pl-14 pr-6 text-white font-bold placeholder:text-slate-700 focus:border-indigo-500 focus:outline-none transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Security Key</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-slate-950/50 border-2 border-slate-800 rounded-2xl py-4 pl-14 pr-6 text-white font-bold placeholder:text-slate-700 focus:border-indigo-500 focus:outline-none transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-500 text-xs font-bold text-center">
                {error}
              </div>
            )}

            <button 
              type="submit"
              className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.3em] shadow-2xl shadow-indigo-600/20 transition-all active:scale-95 flex items-center justify-center gap-4"
            >
              {isLogin ? 'Initiate Link' : 'Register Identity'} <ChevronRight size={18} />
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-800/50 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-slate-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest flex items-center justify-center gap-3 mx-auto"
            >
              {isLogin ? <><UserPlus size={16} /> Need New Identity?</> : <><Fingerprint size={16} /> Return to Login</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthView;
