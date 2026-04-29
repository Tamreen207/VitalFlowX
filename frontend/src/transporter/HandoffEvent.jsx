import React, { useState } from 'react';
import { ArrowRight, UserPlus, ShieldCheck, MapPin, Search } from 'lucide-react';

const HandoffEvent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 1800);
  };

  return (
    <div className="space-y-8 animate-fade-in-up pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800">Custody Handoff</h2>
          <p className="text-slate-500 font-medium mt-1">Multi-signature verification for logistics transfers.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {success && (
          <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-3xl mb-8 flex items-center gap-4 animate-bounce-subtle">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-emerald-800">Handoff Validated</h3>
              <p className="text-emerald-600 text-sm">The digital custody of this shipment has been securely transferred on the ledger.</p>
            </div>
            <button onClick={() => setSuccess(false)} className="ml-auto text-emerald-800 font-bold text-sm">Close</button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-indigo-500" /> Handoff Details
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Shipment ID</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="text" required placeholder="e.g., 102" className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Target Actor ID</label>
                <input type="text" required placeholder="WH-HUB-CHICAGO" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Current Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="text" required placeholder="Logistics Hub 01" className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                </div>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-slate-900 hover:bg-black text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 mt-4"
              >
                {isSubmitting ? 'Verifying Hashes...' : 'Authorize Handoff'}
              </button>
            </form>
          </div>

          <div className="bg-indigo-600 rounded-3xl p-8 text-white flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-black mb-4">Transfer Logic</h3>
              <p className="text-indigo-100 text-sm leading-relaxed">
                Custody handoffs require a cryptographic handshake between the current transporter and the receiving party. 
                Both actors' private keys sign the block to ensure immutable ownership tracking.
              </p>
            </div>
            
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/10">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">A</div>
                <ArrowRight className="w-5 h-5 text-indigo-300" />
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">B</div>
                <div className="ml-auto text-xs font-bold text-indigo-200">2-Way Sign Off</div>
              </div>
              <p className="text-[10px] uppercase font-black tracking-widest text-indigo-300 text-center opacity-70">
                Anchored on Mainnet Ledger
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandoffEvent;
