import React, { useEffect, useState } from 'react';
import Button from '../../components/common/Button';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function MarkAttendance() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({}); // studentId -> status
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  useEffect(() => {
    // Fetch classes list
    fetch(`${API_URL}/classes`, { headers })
      .then(res => res.json())
      .then(json => {
        if (json.success) setClasses(json.data);
      });
  }, []);

  const handleFetchGrid = async () => {
    if (!selectedClass) return;
    setLoading(true);
    try {
      // 1. Fetch all students of selected class
      const stdRes = await fetch(`${API_URL}/students?classId=${selectedClass}&limit=100`, { headers });
      const stdJson = await stdRes.json();
      const stdData = stdJson.data || [];
      setStudents(stdData);

      // 2. Fetch attendance for this class and date
      const attRes = await fetch(`${API_URL}/attendance?classId=${selectedClass}&date=${date}`, { headers });
      const attJson = await attRes.json();
      const attData = attJson.data || [];

      // Map existing records
      const initialMap = {};
      stdData.forEach(s => {
        initialMap[s._id] = 'Present'; // Default to Present
      });
      attData.forEach(record => {
        initialMap[record.student._id] = record.status;
      });
      setAttendance(initialMap);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkStatus = (studentId, status) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    const attendanceData = Object.keys(attendance).map(sId => ({
      student: sId,
      status: attendance[sId]
    }));

    try {
      const res = await fetch(`${API_URL}/attendance/bulk`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ date, attendanceData })
      });
      const data = await res.json();
      if (data.success) {
        alert('Attendance sheet updated successfully!');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold font-display text-white">Daily Attendance Logger</h1>
        <p className="text-[10px] text-slate-500 font-sans tracking-wide uppercase mt-0.5">Log daily class rosters</p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl items-end">
        <div className="flex flex-col gap-1.5 flex-grow">
          <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Class Grade</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg py-2.5 px-3 text-slate-400 text-xs focus:outline-none focus:border-brand-gold w-full"
          >
            <option value="">Select Grade</option>
            {classes.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5 flex-grow">
          <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Calendar Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg py-2.5 px-3 text-slate-200 text-xs focus:outline-none w-full"
          />
        </div>

        <Button variant="primary" onClick={handleFetchGrid} className="py-2.5 w-full sm:w-auto">
          Load Roster Sheet
        </Button>
      </div>

      {/* Roster Sheet */}
      {selectedClass && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden p-6 flex flex-col gap-6">
          {loading ? (
            <div className="text-center py-12 text-slate-500 text-xs">Loading roster...</div>
          ) : students.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">No students registered in this class.</div>
          ) : (
            <>
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="text-sm font-bold text-white font-display uppercase tracking-wider">Roster List</span>
                <span className="text-xs text-brand-gold">{students.length} Students</span>
              </div>

              <div className="flex flex-col gap-3">
                {students.map((student) => {
                  const status = attendance[student._id] || 'Present';
                  return (
                    <div key={student._id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-3 bg-slate-950/40 border border-slate-850 rounded-lg">
                      <div>
                        <span className="font-bold text-white text-xs block">{student.firstName} {student.lastName}</span>
                        <span className="text-[10px] text-slate-500 font-mono block">Roll #{student.rollNumber} • ID: {student.studentId}</span>
                      </div>
                      
                      {/* Attendance status toggles */}
                      <div className="flex gap-2">
                        {['Present', 'Absent', 'Late', 'Leave'].map((st) => (
                          <button
                            key={st}
                            onClick={() => handleMarkStatus(student._id, st)}
                            className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider transition-all ${
                              status === st
                                ? st === 'Present' ? 'bg-emerald-500 text-white' :
                                  st === 'Absent' ? 'bg-rose-500 text-white' :
                                  st === 'Late' ? 'bg-amber-500 text-white' : 'bg-blue-500 text-white'
                                : 'bg-slate-850 text-slate-500 hover:bg-slate-800 hover:text-slate-300'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-800">
                <Button variant="secondary" onClick={handleSave} isLoading={saving}>
                  Save Attendance Sheet
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
