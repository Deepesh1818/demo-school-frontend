import React, { useEffect, useState } from 'react';
import GlassCard from '../../components/common/GlassCard';
import { Mail } from 'lucide-react';
import { StaggerContainer, StaggerItem } from '../../components/common/ScrollReveal';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Faculty() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/teachers`)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          setTeachers(json.data);
        }
      })
      .catch(() => {
        // Fallbacks
        setTeachers([
          { name: 'Dr. Ramesh Sharma', designation: 'Senior Physics Faculty', department: 'Science', experience: 15, email: 'ramesh.sharma@goshenschool.demo', bio: 'Specialist in kinematics and quantum mechanics.', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400' },
          { name: 'Mrs. Sunita Iyer', designation: 'Head of Mathematics', department: 'Mathematics', experience: 18, email: 'sunita.iyer@goshenschool.demo', bio: 'Expert in complex algebraic theories and calculus.', image: 'https://images.unsplash.com/photo-1580894732444-8febeb28a57b?auto=format&fit=crop&q=80&w=400' },
          { name: 'Mr. Rajesh Gupta', designation: 'Computer Science Instructor', department: 'Computer Science', experience: 10, email: 'teacher@goshenschool.demo', bio: 'Robotics guide and full-stack software guide.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400' },
          { name: 'Mrs. Anjali Sen', designation: 'Senior Chemistry Faculty', department: 'Science', experience: 12, email: 'anjali.sen@goshenschool.demo', bio: 'Focus on organic structures and laboratory experiments.', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400' },
          { name: 'Mr. Sandeep Malhotra', designation: 'Business Studies Professor', department: 'Commerce', experience: 14, email: 'sandeep.malhotra@goshenschool.demo', bio: 'Mentoring scholars in trade dynamics and accountancy.', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400' },
          { name: 'Dr. Vikram Rao', designation: 'Senior English Literature Faculty', department: 'Humanities', experience: 16, email: 'vikram.rao@goshenschool.demo', bio: 'Specialize in Shakespearean plays and editorial poetry.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400' }
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
          <span className="text-xs uppercase tracking-widest text-brand-gold font-bold">Educators</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-navy font-display tracking-tight leading-tight">
            Our Faculty Profile
          </h1>
          <p className="text-slate-500 text-xs md:text-sm font-sans leading-relaxed">
            Our classrooms are guided by a team of credentialed academics and certified instructors dedicated to personal mentoring.
          </p>
        </div>

        {/* Teachers Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teachers.map((t, idx) => (
            <StaggerItem key={idx}>
              <GlassCard className="flex flex-col gap-4 h-full" hoverEffect={true}>
                {(() => {
                  const teacherImg = t.image || {
                    'Dr. Ramesh Sharma': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
                    'Mrs. Sunita Iyer': 'https://images.unsplash.com/photo-1580894732444-8febeb28a57b?auto=format&fit=crop&q=80&w=400',
                    'Mr. Rajesh Gupta': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
                    'Mrs. Anjali Sen': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
                    'Mr. Sandeep Malhotra': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
                    'Dr. Vikram Rao': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
                    'Mr. John Dsouza': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
                    'Mr. Anil Kumar': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400'
                  }[t.name] || `https://api.dicebear.com/7.x/initials/svg?seed=${t.name}`;
                  
                  return (
                    <div className="overflow-hidden h-16 w-16 rounded-full border border-slate-200">
                      <img src={teacherImg} alt={t.name} className="h-full w-full object-cover transition-transform duration-500 hover:scale-110" />
                    </div>
                  );
                })()}
                <div>
                  <h3 className="font-bold text-brand-navy text-base font-display">{t.name}</h3>
                  <span className="text-xs text-slate-400 font-sans block">{t.designation} • {t.department}</span>
                  <span className="text-[10px] text-brand-gold font-sans block mt-1 uppercase font-semibold tracking-wider">
                    {t.experience} Years Experience
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-sans leading-relaxed border-t border-slate-100 pt-3">
                  {t.bio || 'Dedicated to student achievement and modern education techniques.'}
                </p>
                <div className="flex items-center gap-2 text-slate-400 hover:text-brand-navy cursor-pointer transition-colors pt-1">
                  <Mail className="h-4 w-4" />
                  <span className="text-[11px] font-sans">{t.email}</span>
                </div>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </div>
  );
}
