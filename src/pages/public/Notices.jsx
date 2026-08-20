import React, { useEffect, useState } from 'react';
import GlassCard from '../../components/common/GlassCard';
import { Bell, Info, Megaphone } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Notices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/notices`)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          setNotices(json.data);
        }
      })
      .catch(() => {
        // Fallbacks
        setNotices([
          { title: 'Admission Open for Session 2026-27', category: 'Admission', priority: 'High', description: 'Registrations are open for classes Nursery to IX and XI. Please visit the portal or submit inquiries on our website.', publishDate: new Date() },
          { title: 'First Term Examination Schedule', category: 'Exam', priority: 'High', description: 'The schedule and syllabus for the upcoming First Term Exam scheduled from Sept 15th has been posted in respective portal folders.', publishDate: new Date() },
          { title: 'Annual Sports Meet 2026', category: 'Activity', priority: 'Medium', description: 'The Sports meet will commence from November 12th. Registrations close next week.', publishDate: new Date() }
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-alabaster pt-32 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-brand-navy"></div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 bg-brand-alabaster min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-3">
          <span className="text-xs uppercase tracking-widest text-brand-gold font-bold">News & Announcements</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-navy font-display tracking-tight leading-tight">
            Notice Board CMS
          </h1>
          <p className="text-slate-500 text-xs md:text-sm font-sans leading-relaxed">
            Latest circulars, meetings dates, examination routines, and guidelines from Goshen Administration desk.
          </p>
        </div>

        {/* Notices list */}
        <div className="flex flex-col gap-6">
          {notices.map((n, idx) => {
            const isHigh = n.priority === 'High';
            return (
              <div 
                key={idx} 
                className={`bg-white border rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-300 ${
                  isHigh ? 'border-l-4 border-l-rose-500 border-slate-200' : 'border-l-4 border-l-blue-500 border-slate-200'
                }`}
              >
                <div className="flex items-start gap-4 flex-grow">
                  <div className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 ${
                    isHigh ? 'bg-rose-50 text-rose-500' : 'bg-blue-50 text-blue-500'
                  }`}>
                    {isHigh ? <Megaphone className="h-5 w-5" /> : <Info className="h-5 w-5" />}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="font-bold text-slate-800 text-sm font-sans tracking-tight leading-none">{n.title}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        isHigh ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {n.category}
                      </span>
                      {isHigh && (
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 font-sans leading-relaxed mt-2.5">
                      {n.description}
                    </p>
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 font-mono flex-shrink-0 bg-slate-50 px-3 py-1 rounded border border-slate-100">
                  Posted: {new Date(n.publishDate).toLocaleDateString()}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
