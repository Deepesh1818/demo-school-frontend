import React, { useEffect, useState } from 'react';
import Button from '../../components/common/Button';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function UploadResults() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [students, setStudents] = useState([]);
  const [scores, setScores] = useState({}); // studentId -> { marks: 0, remarks: '' }
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

  // Sync exams & subjects when class selection changes
  useEffect(() => {
    if (!selectedClass) return;
    
    // Fetch exams scheduled for this class
    fetch(`${API_URL}/exams?classId=${selectedClass}`, { headers })
      .then(res => res.json())
      .then(json => {
        if (json.success) setExams(json.data);
      });

    // Populate subjects of the class
    const matchedClass = classes.find(c => c._id === selectedClass);
    if (matchedClass) {
      setSubjects(matchedClass.subjects || []);
    }
  }, [selectedClass, classes]);

  const handleFetchGrid = async () => {
    if (!selectedClass || !selectedExam || !selectedSubject) return;
    setLoading(true);
    try {
      // 1. Fetch all students
      const stdRes = await fetch(`${API_URL}/students?classId=${selectedClass}&limit=100`, { headers });
      const stdJson = await stdRes.json();
      const stdData = stdJson.data || [];
      setStudents(stdData);

      // 2. Fetch existing results
      const resRes = await fetch(`${API_URL}/results?classId=${selectedClass}&examId=${selectedExam}`, { headers });
      const resJson = await resRes.json();
      const resData = resJson.data || [];

      // Map scores
      const initialMap = {};
      stdData.forEach(s => {
        initialMap[s._id] = { marks: '', remarks: '' };
      });
      resData.forEach(item => {
        if (item.subject?._id === selectedSubject) {
          initialMap[item.student._id] = { marks: item.marks, remarks: item.remarks };
        }
      });
      setScores(initialMap);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleScoreChange = (studentId, field, val) => {
    setScores(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: val
      }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    let failedCount = 0;

    try {
      for (let sId of Object.keys(scores)) {
        const item = scores[sId];
        if (item.marks === '') continue; // Skip unentered scores

        const body = {
          student: sId,
          exam: selectedExam,
          subject: selectedSubject,
          marks: Number(item.marks),
          remarks: item.remarks
        };

        const res = await fetch(`${API_URL}/results`, {
          method: 'POST',
          headers,
          body: JSON.stringify(body)
        });
        const data = await res.json();
        if (!data.success) failedCount++;
      }

      if (failedCount === 0) {
        alert('All grades uploaded successfully!');
      } else {
        alert(`Finished, but ${failedCount} updates returned errors.`);
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
        <h1 className="text-xl font-bold font-display text-white">Academic Scorecard Console</h1>
        <p className="text-[10px] text-slate-500 font-sans tracking-wide uppercase mt-0.5">Upload and publish student marks</p>
      </div>

      {/* Filter panel */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl items-end">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Class Grade</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg py-2.5 px-3 text-slate-400 text-xs focus:outline-none w-full"
          >
            <option value="">Select Grade</option>
            {classes.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Select Scheduled Exam</label>
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            disabled={!selectedClass}
            className="bg-slate-950 border border-slate-800 rounded-lg py-2.5 px-3 text-slate-400 text-xs focus:outline-none w-full disabled:opacity-50"
          >
            <option value="">Select Exam</option>
            {exams.map(ex => (
              <option key={ex._id} value={ex._id}>{ex.name} ({ex.type})</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Select Course Subject</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            disabled={!selectedClass}
            className="bg-slate-950 border border-slate-800 rounded-lg py-2.5 px-3 text-slate-400 text-xs focus:outline-none w-full disabled:opacity-50"
          >
            <option value="">Select Subject</option>
            {subjects.map(sub => (
              <option key={sub._id} value={sub._id}>{sub.name}</option>
            ))}
          </select>
        </div>

        <Button variant="primary" onClick={handleFetchGrid} className="py-2.5 w-full">
          Load Score Sheet
        </Button>
      </div>

      {/* Grade grid inputs */}
      {selectedClass && selectedExam && selectedSubject && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden p-6 flex flex-col gap-6">
          {loading ? (
            <div className="text-center py-12 text-slate-500 text-xs">Loading sheet...</div>
          ) : students.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">No students registered in this class.</div>
          ) : (
            <>
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="text-sm font-bold text-white font-display uppercase tracking-wider">Score Sheet</span>
                <span className="text-xs text-slate-400">Class Max Marks: 100</span>
              </div>

              <div className="flex flex-col gap-3">
                {students.map((student) => {
                  const data = scores[student._id] || { marks: '', remarks: '' };
                  return (
                    <div key={student._id} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center p-3 bg-slate-950/40 border border-slate-850 rounded-lg">
                      <div>
                        <span className="font-bold text-white text-xs block">{student.firstName} {student.lastName}</span>
                        <span className="text-[10px] text-slate-500 font-mono">Roll #{student.rollNumber} • ID: {student.studentId}</span>
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] uppercase text-slate-500 font-semibold tracking-wider">Marks Scored</label>
                        <input
                          type="number"
                          value={data.marks}
                          onChange={(e) => handleScoreChange(student._id, 'marks', e.target.value)}
                          placeholder="e.g. 85"
                          className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200 text-xs focus:outline-none"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] uppercase text-slate-500 font-semibold tracking-wider">Remarks / Comments</label>
                        <input
                          type="text"
                          value={data.remarks}
                          onChange={(e) => handleScoreChange(student._id, 'remarks', e.target.value)}
                          placeholder="Excellent performance..."
                          className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200 text-xs focus:outline-none"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-800">
                <Button variant="secondary" onClick={handleSave} isLoading={saving}>
                  Publish Student Grades
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
