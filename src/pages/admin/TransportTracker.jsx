import React, { useEffect, useState } from 'react';
import { Compass, Plus } from 'lucide-react';
import Button from '../../components/common/Button';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function TransportTracker() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const res = await fetch(`${API_URL}/transport`, { headers });
      const json = await res.json();
      if (json.success) setRoutes(json.data);
    } catch (e) {}
    setLoading(false);
  };

  const handleAddRoute = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.target);
    const body = {
      routeName: formData.get('routeName'),
      busNumber: formData.get('busNumber'),
      driverName: formData.get('driverName'),
      driverPhone: formData.get('driverPhone'),
      cost: Number(formData.get('cost')),
      stops: formData.get('stops').split(',')
    };

    try {
      const res = await fetch(`${API_URL}/transport`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      });
      const json = await res.json();
      if (json.success) {
        setIsModalOpen(false);
        fetchRoutes();
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
          <h1 className="text-xl font-bold font-display text-white">Transport Hub Routes</h1>
          <p className="text-[10px] text-slate-500 font-sans tracking-wide uppercase mt-0.5">Manage bus routing networks and driver rosters</p>
        </div>
        <Button variant="secondary" onClick={() => setIsModalOpen(true)} className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Add Route
        </Button>
      </div>

      {/* Routes list cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="text-center py-12 text-slate-500 text-xs col-span-2">Loading routes...</div>
        ) : routes.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs col-span-2">No bus routes scheduled.</div>
        ) : routes.map((route) => (
          <div key={route._id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between gap-4">
            <div>
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 className="font-bold text-white text-base font-display">{route.routeName}</h3>
                <span className="text-[10px] bg-brand-gold/15 text-brand-gold px-2.5 py-0.5 rounded font-mono font-bold">
                  {route.busNumber}
                </span>
              </div>
              
              <div className="flex flex-col gap-2 mt-4 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Bus Driver:</span>
                  <span className="text-slate-300 font-semibold">{route.driverName} ({route.driverPhone})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Monthly Fare Cost:</span>
                  <span className="text-brand-gold font-bold">₹{route.cost.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-4">
              <span className="block text-[9px] uppercase text-slate-500 tracking-wider font-semibold mb-2">Transit Stops</span>
              <div className="flex flex-wrap gap-1.5">
                {route.stops?.map((stop, sIdx) => (
                  <span key={sIdx} className="px-2.5 py-0.5 rounded bg-slate-850 text-slate-400 text-[10px] font-medium border border-slate-800">
                    {stop}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Route Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-md p-8 relative">
            <h3 className="font-bold text-white text-base border-b border-slate-800 pb-3 mb-5 uppercase tracking-wider">
              Add Transport Route
            </h3>
            
            <form onSubmit={handleAddRoute} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Route Name</label>
                <input
                  name="routeName"
                  required
                  placeholder="e.g. Route Gamma - South Delhi"
                  className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Bus Number Plate</label>
                  <input
                    name="busNumber"
                    required
                    placeholder="DL-1PC-8899"
                    className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Monthly Fare (INR)</label>
                  <input
                    name="cost"
                    type="number"
                    required
                    placeholder="3500"
                    className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Driver Name</label>
                  <input
                    name="driverName"
                    required
                    placeholder="e.g. Sukhdev Singh"
                    className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Driver Contact Phone</label>
                  <input
                    name="driverPhone"
                    required
                    placeholder="e.g. 9812345678"
                    className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Stops (comma separated)</label>
                <input
                  name="stops"
                  required
                  placeholder="e.g. Saket Metro, Mehrauli Bypass, School Gate"
                  className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none"
                />
              </div>

              <div className="flex gap-4 justify-end mt-4">
                <Button variant="outline" onClick={() => setIsModalOpen(false)} className="text-slate-400 border-slate-800">
                  Cancel
                </Button>
                <Button variant="secondary" type="submit" isLoading={submitting}>
                  Create Route
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
