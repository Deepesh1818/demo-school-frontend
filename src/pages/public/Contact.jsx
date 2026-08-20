import React, { useState } from 'react';
import GlassCard from '../../components/common/GlassCard';
import Button from '../../components/common/Button';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    e.target.reset();
  };

  return (
    <div className="pt-32 pb-24 px-6 bg-brand-alabaster min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-3">
          <span className="text-xs uppercase tracking-widest text-brand-gold font-bold">Get In Touch</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-navy font-display tracking-tight leading-tight">
            Contact Goshen School
          </h1>
          <p className="text-slate-500 text-xs md:text-sm font-sans leading-relaxed">
            Have questions regarding admissions, routing services, curriculum details, or fee charts? Send us a message.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info Column */}
          <div className="flex flex-col gap-8">
            <GlassCard className="flex items-center gap-4 hover:translate-y-[-2.5px] hover:shadow-md transition-all duration-300" hoverEffect={true}>
              <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-brand-gold flex-shrink-0">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-brand-navy text-xs uppercase tracking-wider font-sans">Campus Address</h4>
                <p className="text-xs text-slate-500 font-sans mt-0.5">Goshen Campus, Rohini Sector-24, New Delhi, Pin-110085</p>
              </div>
            </GlassCard>

            <GlassCard className="flex items-center gap-4 hover:translate-y-[-2.5px] hover:shadow-md transition-all duration-300" hoverEffect={true}>
              <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-brand-gold flex-shrink-0">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-brand-navy text-xs uppercase tracking-wider font-sans">Helpdesk Numbers</h4>
                <p className="text-xs text-slate-500 font-sans mt-0.5">Admissions: +91 (011) 2701 4321 • General: +91 (011) 2701 9876</p>
              </div>
            </GlassCard>

            <GlassCard className="flex items-center gap-4 hover:translate-y-[-2.5px] hover:shadow-md transition-all duration-300" hoverEffect={true}>
              <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-brand-gold flex-shrink-0">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-brand-navy text-xs uppercase tracking-wider font-sans">Email Communication</h4>
                <p className="text-xs text-slate-500 font-sans mt-0.5">General Office: office@goshenschool.demo • Registrar: admissions@goshenschool.demo</p>
              </div>
            </GlassCard>
          </div>

          {/* Form Column */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 luxury-shadow">
            {success ? (
              <div className="text-center py-12 flex flex-col items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl font-bold">
                  ✓
                </div>
                <h3 className="font-bold text-brand-navy text-base">Message Sent Successfully</h3>
                <p className="text-xs text-slate-500 max-w-xs leading-normal">
                  Thank you for contacting us. We will review your message and reply via email as soon as possible.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="text-xs uppercase font-bold tracking-widest text-brand-gold hover:underline mt-4"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h3 className="font-bold text-slate-800 text-base font-display border-b pb-3 uppercase tracking-wider">
                  Leave a Message
                </h3>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Your Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Ramesh Kumar"
                    className="border border-slate-200 text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:border-brand-gold transition-all duration-300 focus:ring-2 focus:ring-brand-gold/10"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Email Address</label>
                    <input
                      required
                      type="email"
                      placeholder="e.g. name@domain.com"
                      className="border border-slate-200 text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:border-brand-gold transition-all duration-300 focus:ring-2 focus:ring-brand-gold/10"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Phone Number</label>
                    <input
                      required
                      type="tel"
                      placeholder="e.g. 9876543210"
                      className="border border-slate-200 text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:border-brand-gold transition-all duration-300 focus:ring-2 focus:ring-brand-gold/10"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Message Description</label>
                  <textarea
                    required
                    rows="4"
                    placeholder="Write details of your message..."
                    className="border border-slate-200 text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:border-brand-gold transition-all duration-300 focus:ring-2 focus:ring-brand-gold/10"
                  ></textarea>
                </div>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-full mt-2 py-3 hover:translate-y-[-2px] active:translate-y-[0px] transition-all duration-300"
                >
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
