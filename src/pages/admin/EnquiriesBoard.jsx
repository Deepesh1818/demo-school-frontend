import React, { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function EnquiriesBoard() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const res = await fetch(`${API_URL}/admissions/enquiries`, { headers });
      const json = await res.json();
      if (json.success) setEnquiries(json.data);
    } catch (e) {}
    setLoading(false);
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_URL}/admissions/enquiry/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        alert('Enquiry status updated successfully.');
        fetchEnquiries();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col gap-6 font-sans">
      <div>
        <h1 className="text-xl font-bold font-display text-white">Admissions CRM Funnel</h1>
        <p className="text-[10px] text-slate-500 font-sans tracking-wide uppercase mt-0.5">Audit parent queries and conversion funnel status</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="text-center py-12 text-slate-500 text-xs">Loading circulars...</div>
        ) : enquiries.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs">No pending admission enquiries.</div>
        ) : (
          <div className="w-full overflow-x-auto -webkit-overflow-scrolling-touch">
            <table className="w-full min-w-[700px] border-collapse text-left text-xs text-slate-300">
              <thead>
                <tr className="border-b border-slate-850 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                  <th className="p-4">Student Candidate</th>
                  <th className="p-4">Parent Name</th>
                  <th className="p-4">Contact Info</th>
                  <th className="p-4">Target Class</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Update Progression</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {enquiries.map((enq) => (
                  <tr key={enq._id} className="hover:bg-slate-850/30">
                    <td className="p-4 font-semibold text-white">{enq.studentName}</td>
                    <td className="p-4 text-slate-400">{enq.parentName}</td>
                    <td className="p-4">
                      <span className="block">{enq.phone}</span>
                      <span className="block text-[10px] text-slate-500">{enq.email}</span>
                    </td>
                    <td className="p-4 text-brand-gold font-mono">{enq.targetClass}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                        enq.status === 'Converted' ? 'bg-emerald-500/10 text-emerald-400' :
                        enq.status === 'New' ? 'bg-blue-500/10 text-blue-400' :
                        enq.status === 'Rejected' ? 'bg-rose-500/10 text-rose-450' : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {enq.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <select
                        value={enq.status}
                        onChange={(e) => handleUpdateStatus(enq._id, e.target.value)}
                        className="bg-slate-950 border border-slate-800 text-slate-400 text-[10px] py-1.5 px-2.5 rounded focus:outline-none"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Follow-up">Follow-up</option>
                        <option value="Converted">Converted</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
