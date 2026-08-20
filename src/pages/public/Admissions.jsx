import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../../components/common/GlassCard';
import Button from '../../components/common/Button';
import { UserPlus, FileText, CheckSquare, CreditCard, Download, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import ScrollReveal from '../../components/common/ScrollReveal';

export default function Admissions() {
  const [activeFaq, setActiveFaq] = useState(null);

  const steps = [
    {
      step: '01',
      title: 'Online Enquiry',
      desc: 'Fill out the digital inquiry sheet specifying candidate details and previous academic standings.',
      icon: UserPlus,
      color: 'text-blue-600 bg-blue-50 border-blue-100'
    },
    {
      step: '02',
      title: 'Counseling Session',
      desc: 'Schedule a physical or virtual dialogue with our pedagogical guidance counselor and tour our facilities.',
      icon: FileText,
      color: 'text-amber-600 bg-amber-50 border-amber-100'
    },
    {
      step: '03',
      title: 'Aptitude Screening',
      desc: 'Candidates for Grade VI and upwards take a basic assessment in core logic and languages.',
      icon: CheckSquare,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100'
    },
    {
      step: '04',
      title: 'Document & Fees',
      desc: 'Submit birth credentials, transfer certificate sheets, and clear the registration fee invoice.',
      icon: CreditCard,
      color: 'text-purple-600 bg-purple-50 border-purple-100'
    }
  ];

  const faqs = [
    { q: 'What is the syllabus for the entrance assessment?', a: 'The assessment evaluates core mathematical reasoning, English communication, and analytical logic based on the syllabus of the student\'s previous academic grade.' },
    { q: 'Are midterm/transfer admissions supported?', a: 'Yes, admissions are open mid-term subject to vacancies in the corresponding classroom grade and submission of a valid Transfer Certificate (TC) signed by previous boards.' },
    { q: 'Does Goshen School offer transport facilities?', a: 'Yes, we operate a fleet of GPS-equipped, air-conditioned school buses covering the entire municipal radius, tracked in real-time by the transport hub.' },
    { q: 'What is the teacher-to-student ratio?', a: 'We maintain an optimized teacher-to-student ratio of 1:25 to ensure personalized attention and structural mentorship for every child.' }
  ];

  return (
    <div className="pt-32 pb-24 px-6 bg-brand-alabaster min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-3">
          <span className="text-xs uppercase tracking-widest text-brand-gold font-bold font-sans">Enrollment Open</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-navy font-display tracking-tight leading-tight">
            Admissions Guidelines (2026-27)
          </h1>
          <p className="text-slate-500 text-xs md:text-sm font-sans leading-relaxed">
            Everything you need to know about eligibility structures, roadmap stages, and required documentation.
          </p>
        </div>

        {/* Stepper Roadmap */}
        <div className="flex flex-col gap-6">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-2xl font-bold text-brand-navy font-display">Registration Steps</h2>
            <p className="text-slate-400 text-xs mt-1">Our structured roadmap for admission and class allocations.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((st, idx) => {
              const Icon = st.icon;
              return (
                <ScrollReveal key={idx} variant="fadeUp" delay={idx * 0.1}>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-all duration-300 relative group hover:translate-y-[-4px]">
                    <div className="absolute top-4 right-4 text-xs font-bold text-slate-300 group-hover:text-brand-gold transition-colors font-mono">
                      {st.step}
                    </div>
                    <div className={`h-11 w-11 rounded-xl flex items-center justify-center border ${st.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">{st.title}</h3>
                      <p className="text-xs text-slate-500 font-sans leading-relaxed mt-2">{st.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* Mid Section: Eligibility & Brochure Download */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Eligibility Cards Grid */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-brand-navy font-display border-b border-slate-200 pb-3">
              Age Limits & Requirements
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ScrollReveal variant="fadeUp" delay={0.05}>
                <div className="bg-white border border-slate-200 p-5 rounded-xl flex flex-col justify-center hover:shadow-sm hover:translate-y-[-2px] transition-all duration-300">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Nursery / Preparatory</span>
                  <span className="text-sm font-bold text-brand-navy mt-1">3+ Years of age</span>
                  <span className="text-[10px] text-slate-500 font-sans mt-1">Calculated as of April 1st of enrollment year.</span>
                </div>
              </ScrollReveal>
              <ScrollReveal variant="fadeUp" delay={0.15}>
                <div className="bg-white border border-slate-200 p-5 rounded-xl flex flex-col justify-center hover:shadow-sm hover:translate-y-[-2px] transition-all duration-300">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Primary Grade I - V</span>
                  <span className="text-sm font-bold text-brand-navy mt-1">5+ Years of age</span>
                  <span className="text-[10px] text-slate-500 font-sans mt-1">Completion of preparatory kindergarten block.</span>
                </div>
              </ScrollReveal>
              <ScrollReveal variant="fadeUp" delay={0.25}>
                <div className="bg-white border border-slate-200 p-5 rounded-xl flex flex-col justify-center hover:shadow-sm hover:translate-y-[-2px] transition-all duration-300">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Secondary Grade VI - X</span>
                  <span className="text-sm font-bold text-brand-navy mt-1">Based on School Transcript</span>
                  <span className="text-[10px] text-slate-500 font-sans mt-1">Submission of past character reports.</span>
                </div>
              </ScrollReveal>
              <ScrollReveal variant="fadeUp" delay={0.35}>
                <div className="bg-white border border-slate-200 p-5 rounded-xl flex flex-col justify-center hover:shadow-sm hover:translate-y-[-2px] transition-all duration-300">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Senior Sec Grade XI - XII</span>
                  <span className="text-sm font-bold text-brand-navy mt-1">Grades & Assessment Score</span>
                  <span className="text-[10px] text-slate-500 font-sans mt-1">Cut-off score based on secondary board results.</span>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-6 shadow-sm">
            <h3 className="font-bold text-brand-navy text-sm uppercase tracking-wide border-b border-slate-100 pb-3">
              Prospectus & Materials
            </h3>
            <p className="text-xs text-slate-500 font-sans leading-relaxed">
              Download the complete brochure containing fee components, scholarship details, and curricular outlines.
            </p>
            <div className="flex flex-col gap-3">
              <Button 
                variant="primary" 
                onClick={() => alert('Download Started: Goshen Prospectus.pdf')} 
                className="w-full flex items-center justify-center gap-2 py-3 hover:translate-y-[-2px] active:translate-y-[0px] transition-all duration-300"
              >
                <Download className="h-4 w-4" /> Download Prospectus
              </Button>
              <a href="#/contact" className="w-full">
                <Button 
                  variant="outline" 
                  className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 py-3 hover:translate-y-[-2px] active:translate-y-[0px] transition-all duration-300"
                >
                  Contact Admission Desk
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="flex flex-col gap-6">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-2xl font-bold text-brand-navy font-display flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-brand-gold" /> Frequently Asked Questions
            </h2>
            <p className="text-slate-400 text-xs mt-1">Common answers to clear up your queries.</p>
          </div>

          <div className="flex flex-col gap-3.5 max-w-4xl font-sans">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-slate-200 rounded-xl overflow-hidden cursor-pointer hover:border-slate-300 transition-all"
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              >
                <div className="p-4 flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-xs md:text-sm">{faq.q}</span>
                  {activeFaq === idx ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                </div>
                <AnimatePresence initial={false}>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-600 font-sans leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
