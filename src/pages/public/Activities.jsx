import React, { useEffect, useState } from 'react';
import GlassCard from '../../components/common/GlassCard';
import { Calendar, MapPin, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Activities() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetch(`${API_URL}/events`)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          setEvents(json.data);
        }
      })
      .catch(() => {
        // Fallback static entries
        setEvents([
          { title: 'Science & Robotics Exhibition 2026', description: 'Displaying innovative smart models, autonomous robots, and experimental models designed by students from Science and IT streams.', category: 'Academic', date: '2026-09-08', time: '09:00 AM - 03:00 PM', location: 'Open Grounds & Robotics Lab' },
          { title: 'Inter-School Football Championship', description: 'Goshen School is hosting 16 regional school teams for the prestigious championship shield.', category: 'Sports', date: '2026-10-18', time: '08:30 AM - 05:00 PM', location: 'Main Sports Complex' },
          { title: 'Independence Day Cultural Gala', description: 'Choreographed dances, drama, and classical choir performances paying tribute to our national heritage.', category: 'Cultural', date: '2026-08-15', time: '08:00 AM - 12:00 PM', location: 'Auditorium Main Wing' },
          { title: 'Annual Art & Literary Festival', description: 'Encouraging young artists and writers through painting showcases, creative essay writing competitions, and panel debates.', category: 'Cultural', date: '2026-11-05', time: '10:00 AM - 04:00 PM', location: 'Auditorium Wing B & Arts Room' },
          { title: 'STEAM Coding Hackathon', description: 'A 24-hour coding challenge where students develop software prototypes and web apps resolving local community problems.', category: 'Academic', date: '2026-12-12', time: '09:00 AM onwards', location: 'Advanced Computing Laboratory' },
          { title: 'Annual Inter-School Athletics Meet', description: 'Track and field events including sprints, relays, hurdles, high jumps, and shot put competitions on our standard turf grounds.', category: 'Sports', date: '2026-11-20', time: '08:00 AM - 04:00 PM', location: 'Athletic Track Arena' }
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  const getEventImage = (category) => {
    const images = {
      Academic: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600&auto=format&fit=crop',
      Sports: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600&auto=format&fit=crop',
      Cultural: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop'
    };
    return images[category] || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-alabaster pt-32 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-brand-navy"></div>
      </div>
    );
  }

  const filteredEvents = events.filter(ev => {
    if (selectedCategory === 'All') return true;
    return ev.category === selectedCategory;
  });

  return (
    <div className="pt-32 pb-24 px-6 bg-brand-alabaster min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-3">
          <span className="text-xs uppercase tracking-widest text-brand-gold font-bold">Life at Goshen</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-navy font-display tracking-tight leading-tight">
            Events & Activities
          </h1>
          <p className="text-slate-500 text-xs md:text-sm font-sans leading-relaxed">
            From technical exhibitions to inter-school sports championships, our students engage in a rich array of co-curricular achievements.
          </p>
        </div>

        {/* Filter categories tabs */}
        <div className="flex justify-center items-center gap-3 border-b border-slate-200 pb-6">
          {['All', 'Academic', 'Sports', 'Cultural'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-brand-navy text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Events list */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((ev) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                key={ev.title}
              >
                <GlassCard className="flex flex-col overflow-hidden !p-0 h-full" hoverEffect={true}>
                  <div className="relative h-44 w-full overflow-hidden">
                    <img 
                      src={getEventImage(ev.category)} 
                      alt={ev.title} 
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-950/80 backdrop-blur-md text-brand-gold text-[9px] font-bold uppercase tracking-wider w-fit">
                      <Sparkles className="h-3 w-3" /> {ev.category}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col gap-3 flex-grow justify-between">
                    <div className="flex flex-col gap-3">
                      <h3 className="font-bold text-brand-navy text-base font-display leading-tight">{ev.title}</h3>
                      <p className="text-xs text-slate-500 font-sans leading-relaxed line-clamp-3">
                        {ev.description}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-slate-100 flex flex-col gap-2 text-slate-400 mt-4">
                      <div className="flex items-center gap-2 text-[10px] font-sans">
                        <Calendar className="h-3.5 w-3.5 text-brand-gold" />
                        <span>{new Date(ev.date).toLocaleDateString()} ({ev.time})</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-sans">
                        <MapPin className="h-3.5 w-3.5 text-brand-gold" />
                        <span>{ev.location}</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}
