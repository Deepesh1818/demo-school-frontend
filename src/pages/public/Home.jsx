import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Award, 
  BookOpen, 
  Sparkles, 
  ChevronDown, 
  UserCheck, 
  TrendingUp, 
  MapPin, 
  Phone, 
  Mail,
  GraduationCap
} from 'lucide-react';
import CampusHero3D from '../../three/CampusHero3D';
import Achievements3D from '../../three/Achievements3D';
import GlassCard from '../../components/common/GlassCard';
import Button from '../../components/common/Button';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../../components/common/ScrollReveal';
import AnimatedCounter from '../../components/common/AnimatedCounter';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Home() {
  const [stats, setStats] = useState({
    years: '25+',
    students: '5000+',
    faculty: '150+',
    boardResults: '98%+'
  });

  const [toppers, setToppers] = useState([]);
  const [notices, setNotices] = useState([]);
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [enquiryLoading, setEnquiryLoading] = useState(false);

  // Fetch metrics & dashboard notices on load
  useEffect(() => {
    // Fetch toppers
    fetch(`${API_URL}/results/analytics`)
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data.toppers) {
          setToppers(json.data.toppers);
        }
      })
      .catch(() => {
        // Fallback static data
        setToppers([
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
        ]);
      });

    // Fetch latest notices
    fetch(`${API_URL}/notices?limit=3`)
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data) {
          setNotices(json.data.slice(0, 3));
        }
      })
      .catch(() => {
        setNotices([
          { title: 'Admission Open for Session 2026-27', category: 'Admission', priority: 'High', description: 'Registrations are open for classes Nursery to IX and XI.' },
          { title: 'First Term Examination Schedule', category: 'Exam', priority: 'High', description: 'The schedule and syllabus for the upcoming exam is posted.' }
        ]);
      });
  }, []);

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setEnquiryLoading(true);
    const formData = new FormData(e.target);
    const body = {
      parentName: formData.get('parentName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      studentName: formData.get('studentName'),
      class: formData.get('class'),
      message: formData.get('message')
    };

    try {
      const res = await fetch(`${API_URL}/admissions/enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (data.success) {
        setEnquirySuccess(true);
        e.target.reset();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setEnquiryLoading(false);
    }
  };

  return (
    <div className="bg-brand-alabaster">
      {/* 1. Cinematic Full-Screen 3D Hero Section */}
      <section className="relative min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#111625] via-[#05070e] to-[#020306] flex flex-col justify-center items-center pt-24 overflow-hidden">
        {/* Full-Screen 3D WebGL Canvas Backdrop */}
        <div className="absolute inset-0 z-0 opacity-80">
          <CampusHero3D />
        </div>

        {/* Cinematic Overlays and Grain */}
        <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-gold/5 blur-[120px] pointer-events-none animate-pulse"></div>

        {/* Centered Floating Content Glass Panel */}
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-start z-10 pointer-events-none">
          {(() => {
            const containerVariants = {
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.2
                }
              }
            };

            const itemVariants = {
              hidden: { opacity: 0, y: 30 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
              }
            };

            return (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="flex flex-col gap-6 max-w-2xl bg-[#090e1a]/85 p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-md pointer-events-auto shadow-[0_0_50px_rgba(0,0,0,0.8)]"
              >
                <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 w-fit">
                  <Sparkles className="h-4 w-4 text-brand-gold animate-spin" />
                  <span className="text-[10px] uppercase tracking-widest text-brand-gold font-sans font-semibold">
                    Admissions Now Open • Session 2026-27
                  </span>
                </motion.div>
                
                <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-white to-brand-gold bg-clip-text text-transparent leading-tight font-display tracking-tight">
                  Where Excellence <br />
                  <span className="text-brand-gold font-serif italic">Becomes</span> Character.
                </motion.h1>
                
                <motion.p variants={itemVariants} className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-lg font-sans">
                  A future-ready learning environment built around academic excellence, character building, curiosity and self-confidence. Guided by CBSE guidelines and state-of-the-art labs.
                </motion.p>

                <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mt-2">
                  <Link to="/admissions">
                    <Button variant="secondary" hasShine={true}>Apply for Admission</Button>
                  </Link>
                  <Link to="/about">
                    <Button variant="ghost" className="text-white hover:bg-white/5 border border-white/10">
                      Explore School
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            );
          })()}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/45 z-10 pointer-events-none">
          <span className="text-[9px] uppercase tracking-[0.25em] font-sans">Scroll to Discover</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </div>
      </section>

      {/* 2. Trust / Accreditation Strip */}
      <section className="bg-slate-900 border-y border-white/5 py-8 text-white relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-around gap-8 text-center">
          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-widest text-slate-500 font-sans">Board Association</span>
            <span className="text-sm font-bold tracking-wide text-brand-gold uppercase">CBSE Affiliation</span>
          </div>
          <div className="h-8 w-[1px] bg-white/10 hidden md:block"></div>
          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-widest text-slate-500 font-sans">Recognition</span>
            <span className="text-sm font-bold tracking-wide text-white uppercase">Grade-A Quality Certified</span>
          </div>
          <div className="h-8 w-[1px] bg-white/10 hidden md:block"></div>
          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-widest text-slate-500 font-sans">Academic Model</span>
            <span className="text-sm font-bold tracking-wide text-brand-gold uppercase">STEAM Focus Integrated</span>
          </div>
        </div>
      </section>

      {/* 3. About & Counters Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.7 }}
        className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
      >
        <div>
          <span className="text-xs uppercase tracking-widest text-brand-gold font-sans font-bold block mb-3">Immersive Narrative</span>
          <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6 font-display tracking-tight leading-tight">
            Nurturing Minds, <br />
            Inspiring Leadership.
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6 font-sans">
            At Goshen School, education isn't just about reading textbooks. We deliver a cinematic educational experience, providing students with advanced engineering robotics labs, extensive sports facilities, global classrooms, and dedicated art divisions.
          </p>
          <StaggerContainer className="grid grid-cols-2 gap-8 mt-10">
            <StaggerItem className="border-l-2 border-brand-gold pl-5">
              <AnimatedCounter value={25} suffix="+" className="block text-3xl font-extrabold text-brand-navy font-display" />
              <span className="text-xs text-slate-500 uppercase tracking-widest font-sans">Educational Legacy</span>
            </StaggerItem>
            <StaggerItem className="border-l-2 border-brand-gold pl-5">
              <AnimatedCounter value={5000} suffix="+" className="block text-3xl font-extrabold text-brand-navy font-display" />
              <span className="text-xs text-slate-500 uppercase tracking-widest font-sans">Active Students</span>
            </StaggerItem>
            <StaggerItem className="border-l-2 border-brand-gold pl-5">
              <AnimatedCounter value={150} suffix="+" className="block text-3xl font-extrabold text-brand-navy font-display" />
              <span className="text-xs text-slate-500 uppercase tracking-widest font-sans">Certified Educators</span>
            </StaggerItem>
            <StaggerItem className="border-l-2 border-brand-gold pl-5">
              <AnimatedCounter value={98} suffix="%+" className="block text-3xl font-extrabold text-brand-navy font-display" />
              <span className="text-xs text-slate-500 uppercase tracking-widest font-sans">Board Success Rate</span>
            </StaggerItem>
          </StaggerContainer>
        </div>
        
        {/* Dynamic Card showcasing why choose us */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <GlassCard className="flex flex-col gap-3" delay={0}>
            <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-brand-royal">
              <BookOpen className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-brand-navy text-sm uppercase tracking-wide">STEAM Curriculum</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              Rigorous and interactive science, math, and coding courses aligned with CBSE criteria.
            </p>
          </GlassCard>

          <GlassCard className="flex flex-col gap-3" delay={0.1}>
            <div className="h-10 w-10 rounded-lg bg-yellow-50 flex items-center justify-center text-brand-gold">
              <Award className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-brand-navy text-sm uppercase tracking-wide">Laurels & Glory</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              Outstanding track record in national level olympiads, athletics, and cultural events.
            </p>
          </GlassCard>

          <GlassCard className="flex flex-col gap-3" delay={0.2}>
            <div className="h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center text-emerald-600">
              <UserCheck className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-brand-navy text-sm uppercase tracking-wide">Personal Mentoring</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              A 1:15 teacher-student ratio ensures every pupil is supported.
            </p>
          </GlassCard>

          <GlassCard className="flex flex-col gap-3" delay={0.3}>
            <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
              <TrendingUp className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-brand-navy text-sm uppercase tracking-wide">Future Careers</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              Personalized stream alignment, university counsel guides, and digital portfolios.
            </p>
          </GlassCard>
        </div>
      </motion.section>

      {/* 4. Board Toppers & Results Segment */}
      <motion.section 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.7 }}
        className="py-24 bg-slate-900 text-white border-t border-slate-800"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-brand-gold font-sans font-semibold">Excellence in Action</span>
              <h2 className="text-4xl font-bold font-display mt-2">Board Achievers Hall</h2>
            </div>
            <Link to="/results">
              <Button variant="ghost" className="text-brand-gold hover:bg-white/5 border border-brand-gold/30">
                View Performance Analytics <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {toppers.slice(0, 3).map((topper, idx) => (
              <div key={idx} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 relative overflow-hidden flex flex-col gap-4">
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
                    <img src={studentImg} alt={topper.name} className="h-14 w-14 rounded-full object-cover border border-slate-600 shadow-sm" />
                  );
                })()}

                <div>
                  <h3 className="font-bold text-white text-lg">{topper.name}</h3>
                  <span className="text-xs text-slate-400 font-sans block">{topper.class} • Year {topper.year}</span>
                </div>

                <div className="pt-4 border-t border-slate-700 flex justify-between items-center">
                  <span className="text-[10px] uppercase text-slate-500 tracking-wider">Board Score</span>
                  <span className="text-2xl font-bold text-brand-gold font-display">{topper.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 5. Achievement Timeline Section (3D) */}
      <motion.section 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.7 }}
        className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
      >
        {/* Achievements list */}
        <div>
          <span className="text-xs uppercase tracking-widest text-brand-gold font-sans font-bold block mb-3">Milestones</span>
          <h2 className="text-4xl font-bold text-brand-navy mb-8 font-display">Laurels Timeline</h2>
          
          <StaggerContainer className="relative flex flex-col gap-8 pl-8 border-l border-brand-gold/30 ml-4">
            <StaggerItem className="relative">
              <div className="absolute -left-[45px] top-0.5 h-8 w-8 rounded-full bg-brand-navy text-brand-gold flex items-center justify-center text-xs font-bold font-display border border-brand-gold/40 shadow-md">
                1
              </div>
              <div>
                <h3 className="font-bold text-brand-navy text-sm uppercase tracking-wide">Olympiad Gold (2026)</h3>
                <p className="text-xs text-slate-500 font-sans leading-relaxed mt-1">
                  Placed 1st in physics & robotics categories in National Science Congress segments.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem className="relative">
              <div className="absolute -left-[45px] top-0.5 h-8 w-8 rounded-full bg-brand-navy text-brand-gold flex items-center justify-center text-xs font-bold font-display border border-brand-gold/40 shadow-md">
                2
              </div>
              <div>
                <h3 className="font-bold text-brand-navy text-sm uppercase tracking-wide">District Soccer Shield (2025)</h3>
                <p className="text-xs text-slate-500 font-sans leading-relaxed mt-1">
                  Lifted the championship trophy with an unbeaten streak across 12 inter-school matches.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem className="relative">
              <div className="absolute -left-[45px] top-0.5 h-8 w-8 rounded-full bg-brand-navy text-brand-gold flex items-center justify-center text-xs font-bold font-display border border-brand-gold/40 shadow-md">
                3
              </div>
              <div>
                <h3 className="font-bold text-brand-navy text-sm uppercase tracking-wide">CBSE Regional Topper (2025)</h3>
                <p className="text-xs text-slate-500 font-sans leading-relaxed mt-1">
                  First position rank in regional commerce boards with 99.4% average marks.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>

        {/* 3D trophy mesh card */}
        <div className="h-[350px] w-full rounded-2xl overflow-hidden glass-panel border border-slate-200">
          <Achievements3D />
        </div>
      </motion.section>

      {/* 6. Admissions CTA & Enquiry Form */}
      <motion.section 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.7 }}
        className="py-24 bg-brand-navy text-white relative overflow-hidden" 
        id="admission-enquiry"
      >
        <div className="absolute inset-0 bg-grain opacity-40"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-gold/5 blur-[120px]"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs uppercase tracking-widest text-brand-gold font-sans font-semibold">Join Goshen Academy</span>
            <h2 className="text-4xl md:text-5xl font-bold font-display leading-tight tracking-tight mt-3 mb-6">
              Begin Your Child's <br />
              Journey To Excellence.
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Admissions are open for the current and upcoming sessions. Please submit the form to request prospectus information, transport routing, details on fees schedules, or arrange an interview.
            </p>
            
            {/* Short notice ticker */}
            <div className="mt-8 p-5 bg-white/5 border border-white/10 rounded-xl flex flex-col gap-3">
              <span className="text-xs font-bold uppercase text-brand-gold tracking-wider">Latest Announcement Bulletin</span>
              {notices.map((notice, idx) => (
                <div key={idx} className="text-xs text-slate-300 leading-normal border-b border-white/5 pb-2 last:border-b-0 last:pb-0">
                  • <span className="font-bold text-white">{notice.title}</span> - {notice.description?.slice(0, 80)}...
                </div>
              ))}
            </div>
          </div>

          {/* Inquiry form */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 luxury-shadow">
            {enquirySuccess ? (
              <div className="text-center py-12 flex flex-col items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-2xl font-bold">
                  ✓
                </div>
                <h3 className="font-bold text-lg text-white">Enquiry Submitted Successfully</h3>
                <p className="text-xs text-slate-400 max-w-xs leading-normal">
                  Thank you for your interest in Goshen School. Our admissions coordinator will reach out to you within 24 working hours.
                </p>
                <button
                  onClick={() => setEnquirySuccess(false)}
                  className="text-xs uppercase font-bold tracking-widest text-brand-gold hover:underline mt-4"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="flex flex-col gap-5">
                <h3 className="font-bold text-lg text-white font-display border-b border-slate-800 pb-3 uppercase tracking-wider">
                  Admission Enquiry Form
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase text-slate-400 tracking-wider font-semibold">Parent / Guardian Name</label>
                    <input
                      name="parentName"
                      required
                      type="text"
                      placeholder="e.g. Vikram Seth"
                      className="bg-slate-950 border border-slate-800 text-slate-200 text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all duration-300"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase text-slate-400 tracking-wider font-semibold">Student Full Name</label>
                    <input
                      name="studentName"
                      required
                      type="text"
                      placeholder="e.g. Karan Seth"
                      className="bg-slate-950 border border-slate-800 text-slate-200 text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase text-slate-400 tracking-wider font-semibold">Email Address</label>
                    <input
                      name="email"
                      required
                      type="email"
                      placeholder="e.g. name@gmail.com"
                      className="bg-slate-950 border border-slate-800 text-slate-200 text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all duration-300"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase text-slate-400 tracking-wider font-semibold">Phone Number</label>
                    <input
                      name="phone"
                      required
                      type="tel"
                      placeholder="e.g. 9876543210"
                      className="bg-slate-950 border border-slate-800 text-slate-200 text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-400 tracking-wider font-semibold">Target Class for Admission</label>
                  <select
                    name="class"
                    required
                    className="bg-slate-950 border border-slate-800 text-slate-200 text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all duration-300"
                  >
                    <option value="">Select Target Class</option>
                    <option value="Nursery">Nursery / Prep</option>
                    <option value="Class I - V">Primary School (I - V)</option>
                    <option value="Class VI - VIII">Middle School (VI - VIII)</option>
                    <option value="Class IX - X">Secondary School (IX - X)</option>
                    <option value="Class XI - XII Science">Senior Secondary (XI - XII Science)</option>
                    <option value="Class XI - XII Commerce">Senior Secondary (XI - XII Commerce)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-400 tracking-wider font-semibold">Optional Message / Questions</label>
                  <textarea
                    name="message"
                    rows="3"
                    placeholder="Provide details of past academics, queries on school transport, hostel, etc."
                    className="bg-slate-950 border border-slate-800 text-slate-200 text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all duration-300"
                  ></textarea>
                </div>

                <Button variant="secondary" type="submit" isLoading={enquiryLoading} className="w-full mt-2">
                  Submit Admission Inquiry
                </Button>
              </form>
            )}
          </div>
        </div>
      </motion.section>

      {/* 7. Contact Details Row */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.7 }}
        className="py-16 bg-brand-alabaster max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <GlassCard className="flex items-center gap-4" hoverEffect={false}>
          <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-brand-gold">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-bold text-brand-navy text-xs uppercase tracking-wider">Campus Location</h4>
            <p className="text-xs text-slate-500 font-sans mt-0.5">Rohini Sector-24, New Delhi, India</p>
          </div>
        </GlassCard>

        <GlassCard className="flex items-center gap-4" hoverEffect={false}>
          <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-brand-gold">
            <Phone className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-bold text-brand-navy text-xs uppercase tracking-wider">Admissions Hotline</h4>
            <p className="text-xs text-slate-500 font-sans mt-0.5">+91 (011) 2701 4321</p>
          </div>
        </GlassCard>

        <GlassCard className="flex items-center gap-4" hoverEffect={false}>
          <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-brand-gold">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-bold text-brand-navy text-xs uppercase tracking-wider">Registrar Office</h4>
            <p className="text-xs text-slate-500 font-sans mt-0.5">office@goshenschool.demo</p>
          </div>
        </GlassCard>
      </motion.section>
    </div>
  );
}
