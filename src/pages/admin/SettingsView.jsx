import React from 'react';
import { useAuthStore } from '../../store/authStore';
import GlassCard from '../../components/common/GlassCard';

export default function SettingsView() {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h1 className="text-xl font-bold font-display text-white">System Settings</h1>
        <p className="text-[10px] text-slate-500 font-sans tracking-wide uppercase mt-0.5">Manage console preferences and credentials</p>
      </div>

      <div className="flex flex-col gap-5 bg-slate-900 border border-slate-800 p-6 rounded-xl text-slate-350 text-xs font-sans">
        <h3 className="font-bold text-white text-sm uppercase tracking-wider border-b border-slate-850 pb-3">
          Authenticated Profile
        </h3>
        
        <div className="flex flex-col gap-4">
          <div className="flex justify-between py-1 border-b border-slate-850/50">
            <span className="text-slate-500">Sign-in Email:</span>
            <span className="text-white font-semibold font-mono">{user?.email}</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-850/50">
            <span className="text-slate-500">Assigned Privilege Role:</span>
            <span className="text-brand-gold font-bold uppercase tracking-wider">{user?.role}</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-850/50">
            <span className="text-slate-500">Account Reference ID:</span>
            <span className="text-slate-400 font-mono">{user?.id}</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl text-slate-350 text-xs font-sans">
        <h3 className="font-bold text-white text-sm uppercase tracking-wider border-b border-slate-850 pb-3 mb-4">
          Platform Info
        </h3>
        <p className="leading-relaxed text-slate-400">
          This Goshen Administration Portal is running on the MERN container. Connected to local database `goshen_school`. Security settings Helmet, CORS header verification, and rate limiter are active on the backend.
        </p>
      </div>
    </div>
  );
}
