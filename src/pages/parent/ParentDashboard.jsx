import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { Award, CalendarCheck, Clock, CreditCard, LogOut, Compass } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function ParentDashboard() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [child, setChild] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [results, setResults] = useState([]);
  const [fees, setFees] = useState([]);
  const [transport, setTransport] = useState([]);

  const token = localStorage.getItem('token');
  const headers = { 'Authorization': `Bearer ${token}` };

  useEffect(() => {
    // Parent's referenceId points to the Student record
    if (!user?.referenceId) return;
    fetchChildDetails();
  }, [user]);

  const fetchChildDetails = async () => {
    try {
      // 1. Fetch Student profile
      const stdRes = await fetch(`${API_URL}/students/${user.referenceId}`, { headers });
      const stdJson = await stdRes.json();
      if (stdJson.success) {
        setChild(stdJson.data);
      }

      // 2. Fetch attendance
      const attRes = await fetch(`${API_URL}/attendance?studentId=${user.referenceId}`, { headers });
      const attJson = await attRes.json();
      setAttendance(attJson.data || []);

      // 3. Fetch results
      const resRes = await fetch(`${API_URL}/results?studentId=${user.referenceId}`, { headers });
      const resJson = await resRes.json();
      setResults(resJson.data || []);

      // 4. Fetch fees
      const feeRes = await fetch(`${API_URL}/fees?studentId=${user.referenceId}`, { headers });
      const feeJson = await feeRes.json();
      setFees(feeJson.data || []);

      // 5. Fetch transport
      const trRes = await fetch(`${API_URL}/transport`, { headers });
      const trJson = await trRes.json();
      setTransport(trJson.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handlePayInvoice = async (invId) => {
    try {
      const res = await fetch(`${API_URL}/fees/${invId}/pay`, {
        method: 'PUT',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ paymentMethod: 'UPI' })
      });
      const data = await res.json();
      if (data.success) {
        alert('Receipt generated. Billing marked Paid!');
        fetchChildDetails();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-navy flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand-gold"></div>
      </div>
    );
  }

  const totalDays = attendance.length;
  const presentDays = attendance.filter(a => a.status === 'Present' || a.status === 'Late').length;
  const attendanceRate = totalDays ? Math.round((presentDays / totalDays) * 100) : 100;

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-200 p-4 sm:p-6 md:p-12 font-sans relative overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col gap-10 relative z-10">
        
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full border border-brand-gold bg-brand-gold/10 flex items-center justify-center font-display font-semibold text-brand-gold text-2xl">
              P
            </div>
            <div>
              <h1 className="text-xl font-bold font-display text-white">
                Parent Workspace Dashboard
              </h1>
              <span className="text-[10px] text-brand-gold font-sans font-medium uppercase tracking-wider block mt-0.5 animate-pulse">
                Child Link: {child?.firstName} {child?.lastName} ({child?.studentId})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 border border-white/10 hover:bg-white/5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
            >
              Website Home
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 border border-white/10 hover:bg-[#ef4444]/15 hover:text-rose-400 hover:border-rose-500/30 rounded-lg text-[10px] font-bold uppercase tracking-wider text-slate-400 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign Out
            </button>
          </div>
        </div>

        {/* Child Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-slate-900/60 border border-white/5 rounded-xl p-5 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold">Child Attendance</span>
              <span className="text-2xl font-bold font-display text-white">{attendanceRate}%</span>
            </div>
            <div className="h-10 w-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <CalendarCheck className="h-5 w-5" />
            </div>
          </div>

          <div className="bg-slate-900/60 border border-white/5 rounded-xl p-5 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold">Pending Invoices</span>
              <span className="text-2xl font-bold font-display text-white">
                {fees.filter(f => f.status !== 'Paid').length} Invoices
              </span>
            </div>
            <div className="h-10 w-10 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <CreditCard className="h-5 w-5" />
            </div>
          </div>

          <div className="bg-slate-900/60 border border-white/5 rounded-xl p-5 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold">Class Roster Rank</span>
              <span className="text-2xl font-bold font-display text-white">#1</span>
            </div>
            <div className="h-10 w-10 rounded-lg bg-yellow-500/10 text-brand-gold flex items-center justify-center">
              <Award className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Detail Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Module 1: Grades Report Card */}
          <div className="bg-slate-900/40 border border-white/5 rounded-xl p-6 flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-gold flex items-center gap-2 border-b border-white/5 pb-3">
              <Award className="h-4.5 w-4.5" /> Child Report Card Sheet
            </h3>

            <div className="flex flex-col gap-3">
              {results.length === 0 ? (
                <div className="text-center py-6 text-slate-500 text-xs">No grades submitted yet.</div>
              ) : results.map((resItem) => (
                <div key={resItem._id} className="flex items-center justify-between p-3 bg-slate-950/40 border border-white/5 rounded-lg text-xs">
                  <div>
                    <span className="font-bold text-white block">{resItem.subject?.name}</span>
                    <span className="text-[10px] text-slate-500 font-mono block">{resItem.exam?.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-bold text-brand-gold font-display block">{resItem.marks} / 100</span>
                    <span className="text-[10px] text-slate-450 uppercase block font-semibold">Grade {resItem.grade}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Module 2: Fees invoices ledger */}
          <div className="bg-slate-900/40 border border-white/5 rounded-xl p-6 flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-gold flex items-center gap-2 border-b border-white/5 pb-3">
              <CreditCard className="h-4.5 w-4.5" /> Fees & Dues Status
            </h3>

            <div className="flex flex-col gap-3">
              {fees.map((inv) => (
                <div key={inv._id} className="flex items-center justify-between p-3 bg-slate-950/40 border border-white/5 rounded-lg text-xs">
                  <div>
                    <span className="font-semibold text-white block">{inv.feeType}</span>
                    <span className="text-[10px] text-slate-500 font-mono block">Invoice: {inv.invoiceNumber}</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="font-bold text-white block">₹{inv.expectedAmount.toLocaleString()}</span>
                      <span className={`text-[9px] uppercase font-bold tracking-wider ${
                        inv.status === 'Paid' ? 'text-emerald-400' : 'text-amber-400'
                      }`}>
                        {inv.status}
                      </span>
                    </div>

                    {inv.status !== 'Paid' && (
                      <button
                        onClick={() => handlePayInvoice(inv._id)}
                        className="py-1.5 px-3 rounded bg-brand-gold hover:bg-brand-goldlight text-brand-navy font-bold uppercase text-[9px] tracking-wide"
                      >
                        Simulate Pay
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Module 3: Timetable Schedule */}
          <div className="bg-slate-900/40 border border-white/5 rounded-xl p-6 flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-gold flex items-center gap-2 border-b border-white/5 pb-3">
              <Clock className="h-4.5 w-4.5" /> Today's Roster Timetable
            </h3>

            <div className="flex flex-col gap-3 text-xs">
              <div className="flex justify-between items-center p-3 bg-slate-950/40 border border-white/5 rounded-lg">
                <div>
                  <span className="font-bold text-white block">Physics - Wave Mechanics</span>
                  <span className="text-[10px] text-slate-500 block">Room 301</span>
                </div>
                <span className="text-[10px] text-brand-gold font-mono">08:45 AM - 09:30 AM</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-950/40 border border-white/5 rounded-lg">
                <div>
                  <span className="font-bold text-white block">Mathematics - Calculus A</span>
                  <span className="text-[10px] text-slate-500 block">Room 301</span>
                </div>
                <span className="text-[10px] text-brand-gold font-mono">09:30 AM - 10:15 AM</span>
              </div>
            </div>
          </div>

          {/* Module 4: Transport and bus locations */}
          <div className="bg-slate-900/40 border border-white/5 rounded-xl p-6 flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-gold flex items-center gap-2 border-b border-white/5 pb-3">
              <Compass className="h-4.5 w-4.5" /> Transit Bus Routing
            </h3>

            {transport.length > 0 && (
              <div className="p-3 bg-slate-950/40 border border-white/5 rounded-lg text-xs flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Bus Assigned:</span>
                  <span className="text-white font-semibold">{transport[0].routeName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">License Number:</span>
                  <span className="text-brand-gold font-mono font-bold">{transport[0].busNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Driver Roster Name:</span>
                  <span className="text-slate-350">{transport[0].driverName} ({transport[0].driverPhone})</span>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
