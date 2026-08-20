import React, { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Award, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../../components/common/GlassCard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const COLORS = ['#c5a880', '#2563eb', '#10b981', '#f59e0b'];

export default function Results() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState('All');

  useEffect(() => {
    fetch(`${API_URL}/results/analytics`)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          setAnalytics(json.data);
        }
      })
      .catch(() => {
        // Fallback static metrics
        setAnalytics({
          years: ['2022', '2023', '2024', '2025', '2026'],
          classXPassRate: [98.2, 99.1, 98.9, 99.5, 100],
          classXIIPassRate: [97.5, 98.4, 98.7, 99.2, 99.8],
          streamPerformance: [
            { name: 'Science', average: 88 },
            { name: 'Commerce', average: 85 },
            { name: 'Humanities', average: 89 }
          ],
          toppers: [
            { 
              name: 'Aarav Sharma', 
              class: 'XII Science', 
              score: '98.6%', 
              rank: 1, 
              year: '2026',
              image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400'
            },
            { 
              name: 'Ananya Verma', 
              class: 'X General', 
              score: '97.8%', 
              rank: 2, 
              year: '2026',
              image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400'
            },
            { 
              name: 'Rohan Mehta', 
              class: 'XII Commerce', 
              score: '97.4%', 
              rank: 3, 
              year: '2026',
              image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'
            }
          ]
        });
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

  // Formatting historical pass percentage timeline data for Recharts
  const historyData = analytics?.years.map((yr, idx) => ({
    year: yr,
    'Class X': analytics.classXPassRate[idx],
    'Class XII': analytics.classXIIPassRate[idx]
  })) || [];

  const filteredToppers = analytics?.toppers.filter(topper => {
    if (selectedClass === 'All') return true;
    if (selectedClass === 'Class XII') return topper.class.includes('XII');
    if (selectedClass === 'Class X') return topper.class.includes('X') && !topper.class.includes('XII');
    return true;
  }) || [];

  return (
    <div className="pt-32 pb-24 px-6 bg-brand-alabaster min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-3">
          <span className="text-xs uppercase tracking-widest text-brand-gold font-bold font-sans">
            Academic Performance
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-navy font-display tracking-tight leading-tight">
            Board Results Analytics
          </h1>
          <p className="text-slate-500 text-xs md:text-sm font-sans leading-relaxed">
            Consistently achieving peak results across central CBSE zones. Explore our five-year performance timelines and current toppers list.
          </p>
        </div>

        {/* Dynamic Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart 1: Historical Timeline Line Chart */}
          <GlassCard className="flex flex-col gap-4" hoverEffect={false}>
            <h3 className="font-bold text-brand-navy text-sm uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="h-4.5 w-4.5 text-brand-gold" /> Five-Year Pass Percentage Timeline
            </h3>
            <div className="h-[300px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="year" tickLine={false} />
                  <YAxis domain={[95, 100]} tickLine={false} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Class X" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} isAnimationActive={true} animationDuration={1500} />
                  <Line type="monotone" dataKey="Class XII" stroke="#c5a880" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} isAnimationActive={true} animationDuration={1500} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Chart 2: Streams averages Bar Chart */}
          <GlassCard className="flex flex-col gap-4" hoverEffect={false}>
            <h3 className="font-bold text-brand-navy text-sm uppercase tracking-wider flex items-center gap-2">
              <Award className="h-4.5 w-4.5 text-brand-gold" /> Subject Stream Wise Average Scores (Class XII)
            </h3>
            <div className="h-[300px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics?.streamPerformance || []}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} />
                  <YAxis domain={[0, 100]} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="average" fill="#1e293b" radius={[6, 6, 0, 0]} isAnimationActive={true} animationDuration={1500}>
                    {(analytics?.streamPerformance || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Toppers Cards List Section */}
        <div className="flex flex-col gap-6 mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-3 gap-4">
            <h2 className="text-2xl font-bold text-brand-navy font-display">
              Academic Toppers
            </h2>
            
            {/* Filter buttons */}
            <div className="flex items-center gap-2">
              {['All', 'Class XII', 'Class X'].map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedClass(category)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                    selectedClass === category
                      ? 'bg-brand-gold text-brand-navy shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredToppers.map((topper) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  key={topper.name}
                  className="bg-white border border-slate-200 rounded-2xl p-6 relative overflow-hidden flex flex-col gap-4 luxury-shadow hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="absolute top-0 right-0 bg-brand-gold text-brand-navy font-display font-extrabold px-4 py-1.5 text-xs rounded-bl-xl">
                    Rank {topper.rank}
                  </div>
                  {(() => {
                    const studentImg = topper.image || {
                      'Priyanjali Sharma': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
                      'Aarav Sharma': 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
                      'Ananya Verma': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
                      'Ananya Iyer': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
                      'Rohan Malhotra': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
                      'Rohan Mehta': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'
                    }[topper.name] || `https://api.dicebear.com/7.x/initials/svg?seed=${topper.name}`;
                    
                    return (
                      <div className="overflow-hidden h-14 w-14 rounded-full border border-slate-200">
                        <img src={studentImg} alt={topper.name} className="h-full w-full object-cover transition-transform duration-500 hover:scale-110" />
                      </div>
                    );
                  })()}
                  <div>
                    <h3 className="font-bold text-slate-800 text-base">{topper.name}</h3>
                    <span className="text-[11px] text-slate-400 font-sans block">{topper.class} • Year {topper.year}</span>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-[10px] uppercase text-slate-400 tracking-wider">Board Score</span>
                    <span className="text-2xl font-bold text-brand-gold font-display">{topper.score}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
