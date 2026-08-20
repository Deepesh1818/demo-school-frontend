import React, { useEffect, useState } from 'react';
import { Calendar, Plus, Trash2 } from 'lucide-react';
import Button from '../../components/common/Button';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function EventCMS() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${API_URL}/events`, { headers });
      const json = await res.json();
      if (json.success) setEvents(json.data);
    } catch (e) {}
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this event?')) return;
    try {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
        headers
      });
      const data = await res.json();
      if (data.success) {
        setEvents(events.filter(e => e._id !== id));
      }
    } catch (e) {}
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.target);
    const body = {
      title: formData.get('title'),
      description: formData.get('description'),
      category: formData.get('category'),
      date: formData.get('date'),
      time: formData.get('time'),
      location: formData.get('location')
    };

    try {
      const res = await fetch(`${API_URL}/events`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      });
      const json = await res.json();
      if (json.success) {
        setIsModalOpen(false);
        fetchEvents();
      } else {
        alert(json.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold font-display text-white">Event Scheduler CMS</h1>
          <p className="text-[10px] text-slate-500 font-sans tracking-wide uppercase mt-0.5">Schedule and catalog school assemblies</p>
        </div>
        <Button variant="secondary" onClick={() => setIsModalOpen(true)} className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Schedule Event
        </Button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="text-center py-12 text-slate-500 text-xs col-span-2">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs col-span-2">No scheduled school events.</div>
        ) : events.map((ev) => (
          <div key={ev._id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between gap-4">
            <div>
              <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                <div>
                  <h3 className="font-bold text-white text-base font-display">{ev.title}</h3>
                  <span className="text-[9px] text-slate-500 font-sans block mt-1 uppercase font-semibold tracking-wider">
                    {ev.category}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(ev._id)}
                  className="p-1.5 rounded hover:bg-slate-800 text-rose-400 hover:text-rose-300 transition-colors"
                >
                  <Trash2 className="h-4.5 w-4.5" />
                </button>
              </div>

              <p className="text-xs text-slate-400 font-sans leading-relaxed mt-4">{ev.description}</p>
            </div>

            <div className="border-t border-slate-800 pt-4 flex flex-col gap-1 text-[11px] text-slate-500 font-sans">
              <div className="flex gap-2 items-center">
                <Calendar className="h-3.5 w-3.5 text-brand-gold" />
                <span>Date: {new Date(ev.date).toLocaleDateString()} ({ev.time})</span>
              </div>
              <div className="flex gap-2 items-center mt-1">
                <span className="text-brand-gold font-bold">@</span>
                <span>{ev.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-md p-8 relative">
            <h3 className="font-bold text-white text-base border-b border-slate-800 pb-3 mb-5 uppercase tracking-wider">
              Schedule Event Gala
            </h3>
            
            <form onSubmit={handleAddEvent} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Event Title</label>
                <input
                  name="title"
                  required
                  placeholder="e.g. Annual Inter-School Science Fair"
                  className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Event Description</label>
                <textarea
                  name="description"
                  required
                  rows="3"
                  placeholder="Provide activity details..."
                  className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Category</label>
                  <select
                    name="category"
                    required
                    className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-400 text-xs focus:outline-none"
                  >
                    <option value="Academic">Academic</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Sports">Sports</option>
                    <option value="National">National</option>
                    <option value="Excursion">Excursion</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Event Date</label>
                  <input
                    name="date"
                    type="date"
                    required
                    className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Timing Schedule</label>
                  <input
                    name="time"
                    required
                    placeholder="e.g. 09:00 AM - 02:00 PM"
                    className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Location / Venue</label>
                  <input
                    name="location"
                    required
                    placeholder="e.g. Science Wing Block B"
                    className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-4 justify-end mt-4">
                <Button variant="outline" onClick={() => setIsModalOpen(false)} className="text-slate-400 border-slate-800">
                  Cancel
                </Button>
                <Button variant="secondary" type="submit" isLoading={submitting}>
                  Schedule Event
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
