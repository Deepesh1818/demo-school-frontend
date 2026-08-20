import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../components/common/GlassCard';
import { Target, Compass, Eye, ShieldAlert } from 'lucide-react';
import ScrollReveal from '../../components/common/ScrollReveal';

export default function About() {
  return (
    <div className="pt-32 pb-24 px-6 bg-brand-alabaster min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-3">
          <span className="text-xs uppercase tracking-widest text-brand-gold font-bold">Goshen Legacy</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-navy font-display tracking-tight leading-tight">
            Our Story & Values
          </h1>
          <p className="text-slate-500 text-xs md:text-sm font-sans leading-relaxed">
            Founded in 2001, Goshen School is dedicated to providing high-quality educational instruction combined with personal character development.
          </p>
        </div>

        {/* Mission Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GlassCard className="flex flex-col gap-4">
            <div className="h-10 w-10 rounded-full bg-yellow-50 flex items-center justify-center text-brand-gold">
              <Target className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-brand-navy text-sm uppercase tracking-wide">Our Mission</h3>
            <p className="text-xs text-slate-500 font-sans leading-relaxed">
              To inspire students to pursue knowledge, develop personal discipline, and lead with empathy, confidence and responsibility in their respective communities.
            </p>
          </GlassCard>

          <GlassCard className="flex flex-col gap-4">
            <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-brand-royal">
              <Eye className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-brand-navy text-sm uppercase tracking-wide">Our Vision</h3>
            <p className="text-xs text-slate-500 font-sans leading-relaxed">
              To be a global benchmark in early childhood and secondary education, integrating state-of-the-art technological systems with a value-driven curriculum.
            </p>
          </GlassCard>

          <GlassCard className="flex flex-col gap-4">
            <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Compass className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-brand-navy text-sm uppercase tracking-wide">Our Values</h3>
            <p className="text-xs text-slate-500 font-sans leading-relaxed">
              Rigorous integrity, respect for diverse viewpoints, commitment to continuous learning, and fostering self-confidence.
            </p>
          </GlassCard>
        </div>

        {/* Immersive Narrative history */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-grain opacity-40"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 flex flex-col gap-6">
              <h2 className="text-3xl font-bold font-display text-brand-gold">25 Years of Academic Stature</h2>
              <p className="text-slate-300 text-xs md:text-sm font-sans leading-relaxed">
                Starting as a primary nursery block with 120 children, Goshen Academy has grown into a major campus hosting over 5,000 students. Our alumni are currently attending leading world universities like Stanford, Oxford, and IITs.
              </p>
              <div className="flex gap-8 mt-4">
                <div>
                  <span className="block text-2xl font-bold text-white font-display">2001</span>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500">Foundation Laid</span>
                </div>
                <div>
                  <span className="block text-2xl font-bold text-white font-display">2012</span>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500">Senior Sec Added</span>
                </div>
                <div>
                  <span className="block text-2xl font-bold text-white font-display">2026</span>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500">3D Campus Relaunch</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Legacy Timeline */}
        <div className="flex flex-col gap-10 mt-6">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-3">
            <span className="text-xs uppercase tracking-widest text-brand-gold font-bold font-sans">Milestones</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy font-display tracking-tight leading-tight">
              Our Legacy Timeline
            </h2>
            <p className="text-slate-500 text-xs md:text-sm font-sans leading-relaxed">
              Tracing our growth from a small institution to a benchmark CBSE center of excellence.
            </p>
          </div>

          <div className="relative ml-4 md:ml-12 pl-6 md:pl-10 py-4 flex flex-col gap-10">
            {/* Progressive timeline line growth */}
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="absolute left-0 top-0 w-[2px] bg-gradient-to-b from-brand-gold via-blue-500 to-purple-500 origin-top"
            />

            {/* Year 1 */}
            <ScrollReveal variant="fadeLeft" delay={0.1}>
              <div className="relative">
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 h-4 w-4 rounded-full bg-brand-gold border-4 border-white shadow-sm flex items-center justify-center"></div>
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center gap-6 hover:shadow-md transition-shadow duration-300">
                  <div className="font-display text-2xl font-bold text-brand-gold shrink-0 md:w-20">1999</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800 text-sm font-sans uppercase tracking-wider">Foundation Stones</h3>
                    <p className="text-xs text-slate-500 font-sans leading-relaxed mt-1">
                      Laid the initial bricks of Goshen School with a small cohort of 50 students, focused on core CBSE methodologies.
                    </p>
                  </div>
                  <img src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=300" alt="1999" className="h-20 w-32 rounded-lg object-cover border border-slate-100 shrink-0" />
                </div>
              </div>
            </ScrollReveal>

            {/* Year 2 */}
            <ScrollReveal variant="fadeLeft" delay={0.25}>
              <div className="relative">
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 h-4 w-4 rounded-full bg-blue-500 border-4 border-white shadow-sm flex items-center justify-center"></div>
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center gap-6 hover:shadow-md transition-shadow duration-300">
                  <div className="font-display text-2xl font-bold text-blue-600 shrink-0 md:w-20">2005</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800 text-sm font-sans uppercase tracking-wider">CBSE Affiliation</h3>
                    <p className="text-xs text-slate-500 font-sans leading-relaxed mt-1">
                      Acquired secondary-level school status and full national affiliation credentials from CBSE Delhi board.
                    </p>
                  </div>
                  <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=300" alt="2005" className="h-20 w-32 rounded-lg object-cover border border-slate-100 shrink-0" />
                </div>
              </div>
            </ScrollReveal>

            {/* Year 3 */}
            <ScrollReveal variant="fadeLeft" delay={0.4}>
              <div className="relative">
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 h-4 w-4 rounded-full bg-emerald-500 border-4 border-white shadow-sm flex items-center justify-center"></div>
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center gap-6 hover:shadow-md transition-shadow duration-300">
                  <div className="font-display text-2xl font-bold text-emerald-600 shrink-0 md:w-20">2014</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800 text-sm font-sans uppercase tracking-wider">Senior Sec Expansion</h3>
                    <p className="text-xs text-slate-500 font-sans leading-relaxed mt-1">
                      Launched Senior Secondary blocks (Science, Commerce, Humanities) alongside modern physics, chemistry, and biology labs.
                    </p>
                  </div>
                  <img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=300" alt="2014" className="h-20 w-32 rounded-lg object-cover border border-slate-100 shrink-0" />
                </div>
              </div>
            </ScrollReveal>

            {/* Year 4 */}
            <ScrollReveal variant="fadeLeft" delay={0.55}>
              <div className="relative">
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 h-4 w-4 rounded-full bg-purple-500 border-4 border-white shadow-sm flex items-center justify-center"></div>
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center gap-6 hover:shadow-md transition-shadow duration-300">
                  <div className="font-display text-2xl font-bold text-purple-600 shrink-0 md:w-20">2020</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800 text-sm font-sans uppercase tracking-wider">Digital Infrastructure Hub</h3>
                    <p className="text-xs text-slate-500 font-sans leading-relaxed mt-1">
                      Equipped classrooms with interactive projector screens, modern virtual learning servers, and robust robotic toolkits.
                    </p>
                  </div>
                  <img src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=300" alt="2020" className="h-20 w-32 rounded-lg object-cover border border-slate-100 shrink-0" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

      </div>
    </div>
  );
}
