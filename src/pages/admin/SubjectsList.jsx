import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import Button from '../../components/common/Button';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function SubjectsList() {
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
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const res = await fetch(`${API_URL}/subjects`, { headers });
      const json = await res.json();
      if (json.success) setSubjects(json.data);
    } catch (e) {}
    setLoading(false);
  };

  const handleAddSubject = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.target);
    const body = {
      name: formData.get('name'),
      code: formData.get('code'),
      department: formData.get('department')
    };

    try {
      const res = await fetch(`${API_URL}/subjects`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      });
      const json = await res.json();
      if (json.success) {
        setIsModalOpen(false);
        fetchSubjects();
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
          <h1 className="text-xl font-bold font-display text-white">Academic Subjects</h1>
          <p className="text-[10px] text-slate-500 font-sans tracking-wide uppercase mt-0.5">Manage school curriculum courses</p>
        </div>
        <Button variant="secondary" onClick={() => setIsModalOpen(true)} className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Add Subject
        </Button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="text-center py-12 text-slate-500 text-xs">Loading records...</div>
        ) : (
          <table className="w-full border-collapse text-left text-xs text-slate-300">
            <thead>
              <tr className="border-b border-slate-850 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                <th className="p-4">Subject Name</th>
                <th className="p-4">Subject Code</th>
                <th className="p-4">Department</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {subjects.map((s) => (
                <tr key={s._id} className="hover:bg-slate-850/30">
                  <td className="p-4 font-semibold text-white">{s.name}</td>
                  <td className="p-4 font-mono text-brand-gold">{s.code}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-slate-850 border border-slate-800 text-[10px] text-slate-400 font-medium">
                      {s.department}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Subject Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-sm p-8 relative">
            <h3 className="font-bold text-white text-base border-b border-slate-800 pb-3 mb-5 uppercase tracking-wider">
              Add Subject Course
            </h3>
            
            <form onSubmit={handleAddSubject} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Subject Name</label>
                <input
                  name="name"
                  required
                  placeholder="e.g. Physics"
                  className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Subject Code</label>
                <input
                  name="code"
                  required
                  placeholder="e.g. PHYS101"
                  className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Department</label>
                <select
                  name="department"
                  required
                  className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-400 text-xs focus:outline-none"
                >
                  <option value="Science">Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Languages">Languages</option>
                  <option value="Humanities">Humanities</option>
                  <option value="Computer Science">Computer Science</option>
                </select>
              </div>

              <div className="flex gap-4 justify-end mt-4">
                <Button variant="outline" onClick={() => setIsModalOpen(false)} className="text-slate-400 border-slate-800">
                  Cancel
                </Button>
                <Button variant="secondary" type="submit" isLoading={submitting}>
                  Add Course
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
