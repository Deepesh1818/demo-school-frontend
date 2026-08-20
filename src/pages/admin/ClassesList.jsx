import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import Button from '../../components/common/Button';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function ClassesList() {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  useEffect(() => {
    fetchClasses();
    fetchTeachers();
    fetchSubjects();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await fetch(`${API_URL}/classes`, { headers });
      const json = await res.json();
      if (json.success) setClasses(json.data);
    } catch (e) {}
    setLoading(false);
  };

  const fetchTeachers = async () => {
    try {
      const res = await fetch(`${API_URL}/teachers`, { headers });
      const json = await res.json();
      if (json.success) setTeachers(json.data);
    } catch (e) {}
  };

  const fetchSubjects = async () => {
    try {
      const res = await fetch(`${API_URL}/subjects`, { headers });
      const json = await res.json();
      if (json.success) setSubjects(json.data);
    } catch (e) {}
  };

  const handleAddClass = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.target);
    const selectedSubjects = Array.from(formData.getAll('subjects'));

    const body = {
      name: formData.get('name'),
      code: formData.get('code'),
      section: formData.get('section'),
      room: formData.get('room'),
      classTeacher: formData.get('classTeacher'),
      subjects: selectedSubjects
    };

    try {
      const res = await fetch(`${API_URL}/classes`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      });
      const json = await res.json();
      if (json.success) {
        setIsModalOpen(false);
        fetchClasses();
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
          <h1 className="text-xl font-bold font-display text-white">Classrooms & Batches</h1>
          <p className="text-[10px] text-slate-500 font-sans tracking-wide uppercase mt-0.5">Manage classes structure and course lines</p>
        </div>
        <Button variant="secondary" onClick={() => setIsModalOpen(true)} className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Add Class
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          <div className="text-center py-12 text-slate-500 text-xs col-span-3">Loading classes...</div>
        ) : classes.map((c) => (
          <div key={c._id} className="bg-white border border-slate-200/80 rounded-2xl p-6 flex flex-col justify-between gap-5 shadow-sm hover:shadow-md transition-all duration-300">
            <div>
              {/* Header Title & Code */}
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <div className="flex flex-col">
                  <h3 className="font-bold text-slate-800 text-lg font-display tracking-tight">{c.name}</h3>
                  <span className="text-[10px] text-slate-400 font-sans mt-0.5">Section: {c.section}</span>
                </div>
                <span className="text-[10px] bg-amber-50 text-brand-gold border border-amber-100/50 px-2.5 py-1 rounded-full font-bold uppercase tracking-widest">
                  {c.code}
                </span>
              </div>
              
              {/* Modern Info Grid */}
              <div className="grid grid-cols-2 gap-3 mt-5">
                <div className="bg-slate-50/50 border border-slate-100 p-3 rounded-xl flex flex-col justify-center">
                  <span className="text-[8px] uppercase font-bold text-slate-400 tracking-widest">Class Teacher</span>
                  <span className="text-xs font-bold text-slate-700 mt-1.5 truncate max-w-full">
                    {c.classTeacher?.name || 'N/A'}
                  </span>
                </div>
                <div className="bg-slate-50/50 border border-slate-100 p-3 rounded-xl flex flex-col justify-center">
                  <span className="text-[8px] uppercase font-bold text-slate-400 tracking-widest">Room Location</span>
                  <span className="text-xs font-bold font-mono text-brand-navy mt-1.5">{c.room}</span>
                </div>
              </div>
            </div>

            {/* Subjects Pill Badges */}
            <div className="border-t border-slate-100 pt-4">
              <span className="block text-[8px] uppercase text-slate-400 tracking-widest font-bold mb-3">Curriculum Subjects</span>
              <div className="flex flex-wrap gap-1.5">
                {c.subjects?.map((s) => (
                  <span key={s._id} className="px-2.5 py-1 rounded-full bg-blue-50/60 text-blue-600 text-[9px] font-semibold border border-blue-100/40">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Class Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-lg p-8 relative max-h-[90vh] overflow-y-auto no-scrollbar">
            <h3 className="font-bold text-white text-base border-b border-slate-800 pb-3 mb-5 uppercase tracking-wider">
              Create Class Group
            </h3>
            
            <form onSubmit={handleAddClass} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Class Name</label>
                  <input
                    name="name"
                    required
                    placeholder="e.g. Class XII Science"
                    className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Class Code</label>
                  <input
                    name="code"
                    required
                    placeholder="e.g. C12S"
                    className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Section</label>
                  <input
                    name="section"
                    required
                    placeholder="A"
                    className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Room Number</label>
                  <input
                    name="room"
                    required
                    placeholder="e.g. 201"
                    className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Class Teacher</label>
                  <select
                    name="classTeacher"
                    required
                    className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-450 text-xs focus:outline-none"
                  >
                    <option value="">Select Teacher</option>
                    {teachers.map(t => (
                      <option key={t._id} value={t._id}>{t.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Subjects multiselect */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Select Subjects</label>
                <div className="grid grid-cols-2 gap-2 bg-slate-950 p-4 border border-slate-850 rounded-lg max-h-[150px] overflow-y-auto no-scrollbar">
                  {subjects.map(s => (
                    <label key={s._id} className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer hover:text-white">
                      <input
                        type="checkbox"
                        name="subjects"
                        value={s._id}
                        className="rounded accent-brand-gold border-slate-800"
                      />
                      <span>{s.name} ({s.code})</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 justify-end mt-4">
                <Button variant="outline" onClick={() => setIsModalOpen(false)} className="text-slate-400 border-slate-800">
                  Cancel
                </Button>
                <Button variant="secondary" type="submit" isLoading={submitting}>
                  Create Class
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
