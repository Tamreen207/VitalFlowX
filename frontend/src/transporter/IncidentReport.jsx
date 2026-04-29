import React, { useState } from 'react';
import { Camera, Send, ShieldAlert } from 'lucide-react';

const IncidentReport = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in-up pb-12">
      <div>
        <h2 className="text-3xl font-black text-slate-800">Incident Report</h2>
        <p className="text-slate-500 font-medium mt-1">Log equipment failures or logistics disruptions directly to the ledger.</p>
      </div>

      <div className="max-w-3xl mx-auto">
        {success && (
          <div className="bg-red-50 border border-red-100 p-6 rounded-3xl mb-8 flex items-center gap-4 animate-fade-in">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-red-800">Incident Logged</h3>
              <p className="text-red-600 text-sm">The report has been hashed and flagged across the network.</p>
            </div>
            <button onClick={() => setSuccess(false)} className="ml-auto text-red-800 font-bold text-sm">Close</button>
          </div>
        )}

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Type of Incident</label>
              <select className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-medium text-slate-700">
                <option>Mechanical Breakdown</option>
                <option>Temperature Deviation</option>
                <option>Security Breach</option>
                <option>Route Obstruction</option>
                <option>Other</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Severity</label>
                <div className="flex gap-2">
                  {['Low', 'Medium', 'High', 'Critical'].map(level => (
                    <button key={level} type="button" className="flex-1 py-2 text-xs font-bold rounded-lg border border-slate-200 hover:border-red-300 hover:bg-red-50 transition-all text-slate-600">
                      {level}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Evidence</label>
                <button type="button" className="w-full py-2.5 rounded-xl border border-dashed border-slate-300 text-slate-400 flex items-center justify-center gap-2 text-sm font-bold hover:bg-slate-50 transition-all">
                  <Camera className="w-4 h-4" /> Upload Photo
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Description</label>
              <textarea rows="4" required className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all" placeholder="Provide detailed information about the incident..."></textarea>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-red-200 flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'Syncing Alert...' : (
                <>
                  <Send className="w-5 h-5" /> Broadcast Incident Alert
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IncidentReport;
