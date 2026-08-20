import React, { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import Button from '../../components/common/Button';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function TeachersList() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await fetch(`${API_URL}/teachers`, { headers });
      const json = await res.json();
      if (json.success) {
        setTeachers(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this teacher profile?')) return;
    try {
      const res = await fetch(`${API_URL}/teachers/${id}`, {
        method: 'DELETE',
        headers
      });
      const data = await res.json();
      if (data.success) {
        setTeachers(teachers.filter(t => t._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.target);
    const body = {
      name: formData.get('name'),
      designation: formData.get('designation'),
      department: formData.get('department'),
      experience: Number(formData.get('experience')),
      subjects: formData.get('subjects'),
      email: formData.get('email'),
      bio: formData.get('bio')
    };

    try {
      const res = await fetch(`${API_URL}/teachers`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      });
      const json = await res.json();
      if (json.success) {
        setIsModalOpen(false);
        fetchTeachers();
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
          <h1 className="text-xl font-bold font-display text-white">Faculty Directory</h1>
          <p className="text-[10px] text-slate-500 font-sans tracking-wide uppercase mt-0.5">Manage teaching staff credentials</p>
        </div>
        <Button variant="secondary" onClick={() => setIsModalOpen(true)} className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Add Teacher
        </Button>
      </div>

      {/* Teachers list table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="text-center py-12 text-slate-500 text-xs">Loading records...</div>
        ) : teachers.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs">No educators registered.</div>
        ) : (
          <table className="w-full border-collapse text-left text-xs text-slate-300">
            <thead>
              <tr className="border-b border-slate-850 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                <th className="p-4">Educator Name</th>
                <th className="p-4">Designation</th>
                <th className="p-4">Department</th>
                <th className="p-4">Experience</th>
                <th className="p-4">Email</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {teachers.map((t) => (
                <tr key={t._id} className="hover:bg-slate-850/30">
                  <td className="p-4 font-semibold text-slate-800">
                    <div className="flex items-center gap-2.5">
                      <img 
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${t.name}`} 
                        alt="Teacher Profile" 
                        className="h-7 w-7 rounded-full object-cover border border-slate-200/80 bg-slate-50"
                      />
                      <span className="text-white">{t.name}</span>
                    </div>
                  </td>
                  <td className="p-4">{t.designation}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded bg-slate-800 text-[10px] text-brand-gold font-bold uppercase">
                      {t.department}
                    </span>
                  </td>
                  <td className="p-4">{t.experience} Years</td>
                  <td className="p-4 text-slate-400">{t.email}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="p-1.5 rounded hover:bg-slate-800 text-rose-400 hover:text-rose-300 transition-colors"
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Teacher Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-xl p-8 relative max-h-[90vh] overflow-y-auto no-scrollbar">
            <h3 className="font-bold text-white text-base border-b border-slate-800 pb-3 mb-5 uppercase tracking-wider">
              Register Educator Profile
            </h3>
            
            <form onSubmit={handleAddTeacher} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Full Name</label>
                  <input
                    name="name"
                    required
                    placeholder="e.g. Dr. Anand Verma"
                    className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="e.g. anand.verma@goshenschool.demo"
                    className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Designation</label>
                  <input
                    name="designation"
                    required
                    placeholder="e.g. Chemistry Instructor"
                    className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none focus:border-brand-gold"
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
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Experience (Years)</label>
                  <input
                    name="experience"
                    type="number"
                    required
                    placeholder="e.g. 12"
                    className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Subjects Taught (comma separated)</label>
                <input
                  name="subjects"
                  required
                  placeholder="e.g. Organic Chemistry, Physical Chemistry"
                  className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Short Biography</label>
                <textarea
                  name="bio"
                  rows="3"
                  placeholder="Tell us about the educator's academic background and highlights..."
                  className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none"
                ></textarea>
              </div>

              <div className="flex gap-4 justify-end mt-4">
                <Button variant="outline" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white border-slate-800">
                  Cancel
                </Button>
                <Button variant="secondary" type="submit" isLoading={submitting}>
                  Register Faculty
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
