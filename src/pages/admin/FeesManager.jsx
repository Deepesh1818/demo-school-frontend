import React, { useEffect, useState } from 'react';
import { CreditCard, Plus } from 'lucide-react';
import Button from '../../components/common/Button';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function FeesManager() {
  const [invoices, setInvoices] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  useEffect(() => {
    fetchInvoices();
    fetchStudents();
  }, []);

  const fetchInvoices = async () => {
    try {
      const res = await fetch(`${API_URL}/fees`, { headers });
      const json = await res.json();
      if (json.success) setInvoices(json.data);
    } catch (e) {}
    setLoading(false);
  };

  const fetchStudents = async () => {
    try {
      const res = await fetch(`${API_URL}/students?limit=150`, { headers });
      const json = await res.json();
      if (json.success) setStudents(json.data);
    } catch (e) {}
  };

  const handleSimulatePayment = async (invId) => {
    try {
      const res = await fetch(`${API_URL}/fees/${invId}/pay`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ paymentMethod: 'UPI' })
      });
      const data = await res.json();
      if (data.success) {
        alert('Receipt generated. Invoice marked Paid!');
        fetchInvoices();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddInvoice = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.target);
    const body = {
      student: formData.get('student'),
      feeType: formData.get('feeType'),
      expectedAmount: Number(formData.get('expectedAmount')),
      dueDate: formData.get('dueDate')
    };

    try {
      const res = await fetch(`${API_URL}/fees`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      });
      const json = await res.json();
      if (json.success) {
        setIsModalOpen(false);
        fetchInvoices();
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
          <h1 className="text-xl font-bold font-display text-white">Billing & Fees Ledgers</h1>
          <p className="text-[10px] text-slate-500 font-sans tracking-wide uppercase mt-0.5">Generate invoices and track collections</p>
        </div>
        <Button variant="secondary" onClick={() => setIsModalOpen(true)} className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Create Invoice
        </Button>
      </div>

      {/* Invoices list */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="text-center py-12 text-slate-500 text-xs">Loading records...</div>
        ) : invoices.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs">No fee ledgers generated yet.</div>
        ) : (
          <table className="w-full border-collapse text-left text-xs text-slate-300 font-sans">
            <thead>
              <tr className="border-b border-slate-850 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                <th className="p-4">Invoice #</th>
                <th className="p-4">Student</th>
                <th className="p-4">Fee Component</th>
                <th className="p-4">Due Date</th>
                <th className="p-4">Expected</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {invoices.map((inv) => (
                <tr key={inv._id} className="hover:bg-slate-850/30">
                  <td className="p-4 font-mono text-brand-gold">{inv.invoiceNumber}</td>
                  <td className="p-4">
                    <span className="block font-semibold text-white">{inv.student?.firstName} {inv.student?.lastName}</span>
                    <span className="block text-[10px] text-slate-500 font-mono">{inv.student?.studentId}</span>
                  </td>
                  <td className="p-4">{inv.feeType}</td>
                  <td className="p-4 text-slate-400">{new Date(inv.dueDate).toLocaleDateString()}</td>
                  <td className="p-4 font-semibold text-white">₹{inv.expectedAmount.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                      inv.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400' :
                      inv.status === 'Overdue' ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {inv.status !== 'Paid' && (
                      <button
                        onClick={() => handleSimulatePayment(inv._id)}
                        className="py-1 px-2.5 rounded bg-brand-gold hover:bg-brand-goldlight text-brand-navy font-bold uppercase text-[9px] tracking-wide transition-colors"
                      >
                        Simulate Pay
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Invoice Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-sm p-8 relative">
            <h3 className="font-bold text-white text-base border-b border-slate-800 pb-3 mb-5 uppercase tracking-wider">
              Generate Student Invoice
            </h3>
            
            <form onSubmit={handleAddInvoice} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Select Student</label>
                <select
                  name="student"
                  required
                  className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-400 text-xs focus:outline-none"
                >
                  <option value="">Select Student</option>
                  {students.map(s => (
                    <option key={s._id} value={s._id}>{s.firstName} {s.lastName} ({s.studentId})</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Fee Type Component</label>
                <select
                  name="feeType"
                  required
                  className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-400 text-xs focus:outline-none"
                >
                  <option value="Tuition Fee">Tuition Fee</option>
                  <option value="Admission Fee">Admission Fee</option>
                  <option value="Transport Fee">Transport Fee</option>
                  <option value="Library Fee">Library Fee</option>
                  <option value="Exam Fee">Exam Fee</option>
                  <option value="Activity Fee">Activity Fee</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Invoice Amount (INR)</label>
                <input
                  name="expectedAmount"
                  type="number"
                  required
                  placeholder="e.g. 18000"
                  className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Payment Due Date</label>
                <input
                  name="dueDate"
                  type="date"
                  required
                  className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none"
                />
              </div>

              <div className="flex gap-4 justify-end mt-4">
                <Button variant="outline" onClick={() => setIsModalOpen(false)} className="text-slate-400 border-slate-800">
                  Cancel
                </Button>
                <Button variant="secondary" type="submit" isLoading={submitting}>
                  Generate Invoice
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
