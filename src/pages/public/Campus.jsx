import React from 'react';
import GlassCard from '../../components/common/GlassCard';
import { ShieldCheck, School, Library, Award, Cpu, Music } from 'lucide-react';

export default function Campus() {
  const facilities = [
    {
      title: 'Smart Classrooms',
      description: 'Every room has a high-definition smartboard system, central heating/air conditioning, ergonomic sitting benches, and high-speed Wi-Fi.',
      icon: School,
      bgIcon: 'bg-blue-50 text-brand-royal',
      img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=600&auto=format&fit=crop'
    },
    {
      title: 'Central Media Library',
      description: 'Housing over 15,000 physical volumes, reference guides, research encyclopedias, and a quiet reading section with digital search consoles.',
      icon: Library,
      bgIcon: 'bg-yellow-50 text-brand-gold',
      img: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=600&auto=format&fit=crop'
    },
    {
      title: 'Science & Computer Labs',
      description: 'Equipped with analytical instruments, safety equipment, and individual student workstations running modeling packages and coding software.',
      icon: ShieldCheck,
      bgIcon: 'bg-green-50 text-emerald-600',
      img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop'
    },
    {
      title: 'Athletics & Sports Complex',
      description: 'Includes a standard size turf football ground, clay tennis courts, indoor badminton courts, and an Olympic size swimming pool.',
      icon: Award,
      bgIcon: 'bg-purple-50 text-purple-600',
      img: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?q=80&w=600&auto=format&fit=crop'
    },
    {
      title: 'Auditorium & Arts Center',
      description: 'An air-conditioned 800-seat theater with digital acoustics, soundboards, and professional lighting for debates, classical music concerts, and annual drama productions.',
      icon: Music,
      bgIcon: 'bg-rose-50 text-rose-600',
      img: 'https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=600&auto=format&fit=crop'
    },
    {
      title: 'Robotics & STEAM Hub',
      description: 'A dedicated innovation workspace featuring robotic kits, 3D printers, IoT modules, and high-performance computing grids to train future innovators.',
      icon: Cpu,
      bgIcon: 'bg-cyan-50 text-cyan-600',
      img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600&auto=format&fit=crop'
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6 bg-brand-alabaster min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-3">
          <span className="text-xs uppercase tracking-widest text-brand-gold font-bold">Infrastructure</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-navy font-display tracking-tight leading-tight">
            Campus & Facilities
          </h1>
          <p className="text-slate-500 text-xs md:text-sm font-sans leading-relaxed">
            Spanning over 6 acres, our campus provides a secure, fully-equipped, modern environment designed to foster academic and physical growth.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {facilities.map((fac, i) => {
            const Icon = fac.icon;
            return (
              <GlassCard key={i} className="flex flex-col overflow-hidden !p-0" hoverEffect={true}>
                <div className="relative h-56 w-full overflow-hidden">
                  <img 
                    src={fac.img} 
                    alt={fac.title} 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 to-transparent"></div>
                </div>
                <div className="p-6 md:p-8 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${fac.bgIcon}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-brand-navy text-lg font-display tracking-wide">{fac.title}</h3>
                  </div>
                  <p className="text-xs text-slate-500 font-sans leading-relaxed">
                    {fac.description}
                  </p>
                </div>
              </GlassCard>
            );
          })}
        </div>

      </div>
    </div>
  );
}
