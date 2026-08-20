import React, { useEffect, useState } from 'react';
import { Search, Plus, Trash2, Edit } from 'lucide-react';
import Button from '../../components/common/Button';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function StudentsList() {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [classId, setClassId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  useEffect(() => {
    fetchStudents();
    fetchClasses();
  }, [classId]);

  const fetchStudents = async () => {
    try {
      const url = `${API_URL}/students?search=${search}&classId=${classId}&limit=50`;
      const res = await fetch(url, { headers });
      const json = await res.json();
      if (json.success) {
        setStudents(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchClasses = async () => {
    try {
      const res = await fetch(`${API_URL}/classes`, { headers });
      const json = await res.json();
      if (json.success) {
        setClasses(json.data);
      }
    } catch (e) {}
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student and their login credentials?')) return;
    try {
      const res = await fetch(`${API_URL}/students/${id}`, {
        method: 'DELETE',
        headers
      });
      const data = await res.json();
      if (data.success) {
        setStudents(students.filter(s => s._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.target);
    const body = {
      studentId: formData.get('studentId'),
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      dateOfBirth: formData.get('dateOfBirth'),
      gender: formData.get('gender'),
      class: formData.get('class'),
      rollNumber: Number(formData.get('rollNumber')),
      parentName: formData.get('parentName'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      address: formData.get('address')
    };

    try {
      const res = await fetch(`${API_URL}/students`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      });
      const json = await res.json();
      if (json.success) {
        setIsModalOpen(false);
        fetchStudents();
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
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold font-display text-white">Student Registry</h1>
          <p className="text-[10px] text-slate-500 font-sans tracking-wide uppercase mt-0.5">Manage and audit student profiles</p>
        </div>
        <Button variant="secondary" onClick={() => setIsModalOpen(true)} className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Add Student
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search by name or student ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchStudents()}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 pl-9 pr-4 text-slate-200 text-xs focus:outline-none focus:border-brand-gold transition-colors"
          />
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
        </div>
        <select
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-slate-400 text-xs focus:outline-none focus:border-brand-gold transition-colors"
        >
          <option value="">All Classes</option>
          {classes.map(c => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
        <Button variant="primary" onClick={fetchStudents} className="py-2">
          Apply Search
        </Button>
      </div>

      {/* Roster Data Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="text-center py-12 text-slate-500 text-xs">Loading records...</div>
        ) : students.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs">No students found.</div>
        ) : (
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-850 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                <th className="p-4">Student ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Class</th>
                <th className="p-4">Roll No.</th>
                <th className="p-4">Parent Name</th>
                <th className="p-4">Phone</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs text-slate-300">
              {students.map((s) => (
                <tr key={s._id} className="hover:bg-slate-800/30">
                  <td className="p-4 text-brand-gold font-mono">{s.studentId}</td>
                  <td className="p-4 font-semibold text-slate-800">
                    <div className="flex items-center gap-2.5">
                      <img 
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${s.firstName}%20${s.lastName}`} 
                        alt="Student Profile" 
                        className="h-7 w-7 rounded-full object-cover border border-slate-200/80 bg-slate-50"
                      />
                      <span>{s.firstName} {s.lastName}</span>
                    </div>
                  </td>
                  <td className="p-4">{s.class?.name || 'N/A'}</td>
                  <td className="p-4">{s.rollNumber}</td>
                  <td className="p-4">{s.parentName}</td>
                  <td className="p-4">{s.phone}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(s._id)}
                      className="p-1.5 rounded hover:bg-slate-800 text-rose-400 hover:text-rose-300 transition-colors ml-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Student Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-2xl p-8 relative max-h-[90vh] overflow-y-auto no-scrollbar">
            <h3 className="font-bold text-white text-base border-b border-slate-800 pb-3 mb-5 uppercase tracking-wider">
              Register New Student
            </h3>
            
            <form onSubmit={handleAddStudent} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Student ID</label>
                  <input
                    name="studentId"
                    required
                    placeholder="GS-2026-110"
                    className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">First Name</label>
                  <input
                    name="firstName"
                    required
                    placeholder="e.g. Sneha"
                    className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Last Name</label>
                  <input
                    name="lastName"
                    required
                    placeholder="e.g. Patel"
                    className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Date of Birth</label>
                  <input
                    name="dateOfBirth"
                    type="date"
                    required
                    className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Gender</label>
                  <select
                    name="gender"
                    required
                    className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-400 text-xs focus:outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Class Grade</label>
                  <select
                    name="class"
                    required
                    className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-400 text-xs focus:outline-none"
                  >
                    <option value="">Select Class</option>
                    {classes.map(c => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Roll Number</label>
                  <input
                    name="rollNumber"
                    type="number"
                    required
                    placeholder="e.g. 15"
                    className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Parent / Guardian Name</label>
                  <input
                    name="parentName"
                    required
                    placeholder="e.g. Amit Patel"
                    className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Phone Number</label>
                  <input
                    name="phone"
                    required
                    placeholder="e.g. 9876543210"
                    className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="e.g. parent.name@domain.com"
                    className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Residential Address</label>
                <textarea
                  name="address"
                  required
                  rows="2"
                  placeholder="Street address details..."
                  className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none"
                ></textarea>
              </div>

              <div className="flex gap-4 justify-end mt-4">
                <Button variant="outline" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white border-slate-800">
                  Cancel
                </Button>
                <Button variant="secondary" type="submit" isLoading={submitting}>
                  Register Student
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
