import React, { useEffect, useState } from 'react';
import { Megaphone, Plus, Trash2 } from 'lucide-react';
import Button from '../../components/common/Button';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function NoticeCMS() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await fetch(`${API_URL}/notices/all`, { headers });
      const json = await res.json();
      if (json.success) setNotices(json.data);
    } catch (e) {}
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this notice?')) return;
    try {
      const res = await fetch(`${API_URL}/notices/${id}`, {
        method: 'DELETE',
        headers
      });
      const data = await res.json();
      if (data.success) {
        setNotices(notices.filter(n => n._id !== id));
      }
    } catch (e) {}
  };

  const handleAddNotice = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.target);
    const body = {
      title: formData.get('title'),
      description: formData.get('description'),
      category: formData.get('category'),
      priority: formData.get('priority'),
      status: formData.get('status')
    };

    try {
      const res = await fetch(`${API_URL}/notices`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      });
      const json = await res.json();
      if (json.success) {
        setIsModalOpen(false);
        fetchNotices();
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
          <h1 className="text-xl font-bold font-display text-white">Notice Board Circulars</h1>
          <p className="text-[10px] text-slate-500 font-sans tracking-wide uppercase mt-0.5">Publish bulletins and announcements</p>
        </div>
        <Button variant="secondary" onClick={() => setIsModalOpen(true)} className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Post Notice
        </Button>
      </div>

      {/* Notices lists */}
      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="text-center py-12 text-slate-500 text-xs">Loading circulars...</div>
        ) : notices.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs">No notice circulars drafted yet.</div>
        ) : notices.map((notice) => (
          <div key={notice._id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row justify-between gap-6 items-start md:items-center">
            <div className="flex gap-4 items-start flex-grow">
              <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-brand-gold flex-shrink-0">
                <Megaphone className={`h-5 w-5 ${notice.priority === 'High' ? 'text-rose-500' : 'text-slate-400'}`} />
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-3">
                  <h4 className="font-bold text-white text-base">{notice.title}</h4>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                    notice.status === 'Draft' ? 'bg-slate-800 text-slate-500 border border-slate-700' : 'bg-brand-gold/10 text-brand-gold'
                  }`}>
                    {notice.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed max-w-2xl">{notice.description}</p>
                <div className="flex gap-4 text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-1">
                  <span>Category: {notice.category}</span>
                  <span>•</span>
                  <span>Priority: {notice.priority}</span>
                  <span>•</span>
                  <span>Posted: {new Date(notice.publishDate || notice.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleDelete(notice._id)}
              className="p-2 rounded hover:bg-slate-800 text-rose-400 hover:text-rose-300 transition-colors self-end md:self-center"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>

      {/* Add Notice Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-md p-8 relative">
            <h3 className="font-bold text-white text-base border-b border-slate-800 pb-3 mb-5 uppercase tracking-wider">
              Post Announcement Notice
            </h3>
            
            <form onSubmit={handleAddNotice} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Notice Title</label>
                <input
                  name="title"
                  required
                  placeholder="e.g. Science Lab Timings Change"
                  className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Description Details</label>
                <textarea
                  name="description"
                  required
                  rows="4"
                  placeholder="Provide circular details..."
                  className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Category</label>
                  <select
                    name="category"
                    required
                    className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-400 text-xs focus:outline-none"
                  >
                    <option value="General">General</option>
                    <option value="Admission">Admission</option>
                    <option value="Exam">Exam</option>
                    <option value="Activity">Activity</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Priority</label>
                  <select
                    name="priority"
                    required
                    className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-400 text-xs focus:outline-none"
                  >
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Status</label>
                  <select
                    name="status"
                    required
                    className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-400 text-xs focus:outline-none"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 justify-end mt-4">
                <Button variant="outline" onClick={() => setIsModalOpen(false)} className="text-slate-400 border-slate-800">
                  Cancel
                </Button>
                <Button variant="secondary" type="submit" isLoading={submitting}>
                  Post Bulletin
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
