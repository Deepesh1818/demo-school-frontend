import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import Button from '../../components/common/Button';
import GlassCard from '../../components/common/GlassCard';
import { GraduationCap, Lock, Mail, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const { user, isAuthenticated, login, error: authError } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      const role = user.role;
      if (role === 'admin' || role === 'superadmin' || role === 'teacher') {
        navigate('/admin');
      } else if (role === 'student') {
        navigate('/student');
      } else if (role === 'parent') {
        navigate('/parent');
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormError(null);

    const result = await login(email, password);

    if (result.success) {
      const role = result.user.role;
      if (role === 'admin' || role === 'superadmin' || role === 'teacher') {
        navigate('/admin');
      } else if (role === 'student') {
        navigate('/student');
      } else if (role === 'parent') {
        navigate('/parent');
      }
    } else {
      setFormError(result.error || 'Invalid username or password');
      setLoading(false);
    }
  };

  const handleLoadCredentials = (role) => {
    const creds = {
      admin: ['admin@goshenschool.demo', 'Admin@123'],
      teacher: ['teacher@goshenschool.demo', 'Teacher@123'],
      student: ['student@goshenschool.demo', 'Student@123'],
      parent: ['parent@goshenschool.demo', 'Parent@123']
    };
    
    if (creds[role]) {
      setEmail(creds[role][0]);
      setPassword(creds[role][1]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fcfbf9] via-[#f5f3ed] to-[#eae7dc] flex flex-col justify-center py-12 px-6 relative overflow-hidden">
      {/* Background Subtle Effects */}
      <div className="absolute inset-0 bg-grain opacity-[0.03] pointer-events-none"></div>
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-brand-gold/5 blur-[130px] pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-brand-navy/5 blur-[130px] pointer-events-none"></div>

      {/* Back to Home Link */}
      <div className="absolute top-6 left-6 z-20">
        <Link 
          to="/" 
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-slate-200/80 bg-white/80 backdrop-blur-md text-[10px] uppercase font-bold tracking-widest text-slate-500 hover:text-brand-navy hover:border-slate-300 transition-all shadow-sm"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Website
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 flex flex-col items-center gap-4">
        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#0a0f1d] to-[#1e2942] flex items-center justify-center shadow-lg border border-white/10">
          <GraduationCap className="h-8 w-8 text-brand-gold" />
        </div>
        <div className="text-center flex flex-col gap-1.5">
          <h2 className="text-3xl font-extrabold text-brand-navy font-display tracking-tight leading-none">
            Goshen Portals
          </h2>
          <p className="text-[10px] text-brand-gold font-sans tracking-widest uppercase font-semibold">
            Secure Academy Administration Gateway
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <GlassCard className="bg-white border border-slate-100 p-8 shadow-[0_20px_50px_rgba(197,168,128,0.15)] rounded-2xl" hoverEffect={false}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            
            {/* Error notifications */}
            {(formError || authError) && (
              <div className="p-4 rounded-lg bg-rose-500/5 border border-rose-500/15 flex items-center gap-3 text-rose-600 text-xs">
                <AlertCircle className="h-4.5 w-4.5 flex-shrink-0" />
                <span>{formError || authError}</span>
              </div>
            )}

            {/* Email field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] uppercase text-slate-500 font-bold tracking-widest">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. student@goshenschool.demo"
                  className="bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-xs pl-10 pr-3 py-3 rounded-lg w-full focus:outline-none focus:bg-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/15 hover:border-slate-300 transition-all font-sans"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] uppercase text-slate-500 font-bold tracking-widest">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-xs pl-10 pr-3 py-3 rounded-lg w-full focus:outline-none focus:bg-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/15 hover:border-slate-300 transition-all font-sans"
                />
              </div>
            </div>

            <Button variant="secondary" type="submit" isLoading={loading} className="w-full mt-2 py-3.5 !bg-brand-navy hover:!bg-brand-navy/90 text-white hover:scale-[1.01] transition-transform shadow-md font-sans">
              Sign In to Portal
            </Button>
          </form>

          {/* Quick Demo Credentials Strip */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <span className="block text-[9px] uppercase text-slate-400 font-bold tracking-widest text-center mb-4">
              Demo Credentials Quick Load
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleLoadCredentials('admin')}
                className="py-2.5 px-3 bg-slate-50 hover:bg-brand-gold/10 hover:text-brand-navy border border-slate-100 hover:border-brand-gold/30 rounded text-[9px] font-bold text-slate-600 uppercase tracking-widest transition-all"
              >
                Administrator
              </button>
              <button
                type="button"
                onClick={() => handleLoadCredentials('teacher')}
                className="py-2.5 px-3 bg-slate-50 hover:bg-brand-gold/10 hover:text-brand-navy border border-slate-100 hover:border-brand-gold/30 rounded text-[9px] font-bold text-slate-600 uppercase tracking-widest transition-all"
              >
                Teacher
              </button>
              <button
                type="button"
                onClick={() => handleLoadCredentials('student')}
                className="py-2.5 px-3 bg-slate-50 hover:bg-brand-gold/10 hover:text-brand-navy border border-slate-100 hover:border-brand-gold/30 rounded text-[9px] font-bold text-slate-600 uppercase tracking-widest transition-all"
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => handleLoadCredentials('parent')}
                className="py-2.5 px-3 bg-slate-50 hover:bg-brand-gold/10 hover:text-brand-navy border border-slate-100 hover:border-brand-gold/30 rounded text-[9px] font-bold text-slate-600 uppercase tracking-widest transition-all"
              >
                Parent
              </button>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
