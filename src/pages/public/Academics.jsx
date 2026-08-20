import React from 'react';
import GlassCard from '../../components/common/GlassCard';
import Academics3D from '../../three/Academics3D';
import { BookCheck, Terminal, Lightbulb, Landmark } from 'lucide-react';

export default function Academics() {
  return (
    <div className="pt-32 pb-24 px-6 bg-brand-alabaster min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-3">
          <span className="text-xs uppercase tracking-widest text-brand-gold font-bold">Curriculum Framework</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-navy font-display tracking-tight leading-tight">
            Academic Programs
          </h1>
          <p className="text-slate-500 text-xs md:text-sm font-sans leading-relaxed">
            Aligned with the Central Board of Secondary Education (CBSE) criteria, designed to engage critical thinking and practical skills.
          </p>
        </div>

        {/* 3D Visual + Streams Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 3D Frame */}
          <div className="h-[400px] w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden relative">
            <Academics3D />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold font-display text-brand-navy">Streams & Specializations</h2>
            <p className="text-slate-600 text-xs md:text-sm font-sans leading-relaxed">
              For grades XI and XII, we offer three core academic streams led by industry-trained educators and backed by modern laboratories.
            </p>
            
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center text-brand-royal flex-shrink-0">
                  <Terminal className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-navy text-xs uppercase tracking-wide">Science & Technology Stream</h4>
                  <span className="text-[11px] text-slate-500 font-sans block mt-0.5">Core: Physics, Chemistry, Mathematics, Biology, Computer Science</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full bg-yellow-50 flex items-center justify-center text-brand-gold flex-shrink-0">
                  <Landmark className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-navy text-xs uppercase tracking-wide">Commerce Stream</h4>
                  <span className="text-[11px] text-slate-500 font-sans block mt-0.5">Core: Accountancy, Business Studies, Economics, Mathematics</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
                  <Lightbulb className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-navy text-xs uppercase tracking-wide">Humanities Stream</h4>
                  <span className="text-[11px] text-slate-500 font-sans block mt-0.5">Core: History, Geography, Political Science, Psychology, Sociology</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divisions Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <GlassCard className="flex flex-col gap-3">
            <h3 className="font-bold text-brand-navy text-sm uppercase tracking-wide">Primary Wing</h3>
            <span className="text-[10px] uppercase text-brand-gold tracking-widest block font-bold">Grades I - V</span>
            <p className="text-xs text-slate-500 leading-relaxed font-sans mt-2">
              Focusing on fundamental language literacy, numeracy, creative coloring arts, and environmental awareness.
            </p>
          </GlassCard>

          <GlassCard className="flex flex-col gap-3">
            <h3 className="font-bold text-brand-navy text-sm uppercase tracking-wide">Middle School</h3>
            <span className="text-[10px] uppercase text-brand-gold tracking-widest block font-bold">Grades VI - VIII</span>
            <p className="text-xs text-slate-500 leading-relaxed font-sans mt-2">
              Introduction to formal physics, chemical sciences, historical studies, computer logic, and geometry.
            </p>
          </GlassCard>

          <GlassCard className="flex flex-col gap-3">
            <h3 className="font-bold text-brand-navy text-sm uppercase tracking-wide">Secondary School</h3>
            <span className="text-[10px] uppercase text-brand-gold tracking-widest block font-bold">Grades IX - X</span>
            <p className="text-xs text-slate-500 leading-relaxed font-sans mt-2">
              Rigorous preparation for board formats. Emphasis on experimental labs, analytical algebra, and literature.
            </p>
          </GlassCard>

          <GlassCard className="flex flex-col gap-3">
            <h3 className="font-bold text-brand-navy text-sm uppercase tracking-wide">Innovation Lab</h3>
            <span className="text-[10px] uppercase text-brand-gold tracking-widest block font-bold">All Batches</span>
            <p className="text-xs text-slate-500 leading-relaxed font-sans mt-2">
              Extracurricular training in robotics engineering, Arduino microcontroller systems, 3D printing, and scratch coding.
            </p>
          </GlassCard>
        </div>

      </div>
    </div>
  );
}
