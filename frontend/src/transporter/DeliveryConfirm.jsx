import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, ClipboardCheck, User, MapPin, Package, PenTool, Map as MapIcon, Send } from 'lucide-react';

const DeliveryConfirm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);
  const [gpsLocked, setGpsLocked] = useState(true);
  const [formData, setFormData] = useState({
    shipment_id: '',
    receiver_name: '',
    delivery_notes: '',
    condition: 'Optimal'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hasSigned) return alert('Please provide a digital signature.');
    setIsSubmitting(true);
    // Simulate Blockchain Transaction
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-emerald-200">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-black text-slate-800">Delivery Confirmed</h2>
        <p className="text-slate-500 font-medium mt-2 max-w-md text-center">
          Proof of Delivery (PoD) has been cryptographically signed and anchored to the ledger with GPS metadata.
        </p>
        <div className="mt-8 p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center gap-2">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Digital Receipt Anchor</span>
          <code className="font-mono text-xs text-indigo-600">TX_0x77d2...e8a1_POD</code>
          <div className="flex gap-2 mt-4">
             <div className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-500">LAT: 34.0522</div>
             <div className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-500">LON: -118.2437</div>
          </div>
        </div>
        <button 
          onClick={() => setSuccess(false)}
          className="mt-10 px-8 py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center gap-2"
        >
          Process Next Shipment <Send className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in-up pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-800">Final Proof of Delivery</h2>
          <p className="text-slate-500 font-medium mt-1">Legally binding blockchain signature and GPS verification.</p>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold ${gpsLocked ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-red-50 border-red-100 text-red-600'}`}>
          <MapPin className="w-4 h-4" />
          {gpsLocked ? 'GPS SIGNAL LOCKED' : 'GPS SIGNAL LOST'}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="bg-white rounded-[40px] p-10 shadow-sm border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Package className="w-3 h-3" /> Shipment ID
                </label>
                <input 
                  type="text" 
                  name="shipment_id" 
                  required 
                  value={formData.shipment_id}
                  onChange={handleChange}
                  placeholder="VTX-XXXX" 
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-bold text-slate-700" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <User className="w-3 h-3" /> Receiver Name
                </label>
                <input 
                  type="text" 
                  name="receiver_name" 
                  required 
                  value={formData.receiver_name}
                  onChange={handleChange}
                  placeholder="Authorized Personnel" 
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-bold text-slate-700" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-3 h-3" /> Cargo Condition Report
              </label>
              <div className="grid grid-cols-3 gap-4">
                {['Optimal', 'Alert', 'Damaged'].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setFormData({ ...formData, condition: status })}
                    className={`py-4 rounded-2xl border font-black text-xs uppercase tracking-widest transition-all ${
                      formData.condition === status 
                      ? 'bg-slate-900 border-slate-900 text-white shadow-xl' 
                      : 'bg-white border-slate-200 text-slate-500 hover:border-indigo-300'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <ClipboardCheck className="w-3 h-3" /> Final Handover Notes
              </label>
              <textarea 
                name="delivery_notes" 
                rows="3"
                value={formData.delivery_notes}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm font-medium" 
                placeholder="Details of receipt, storage location, etc."
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting || !hasSigned}
              className={`w-full py-5 rounded-[24px] font-black text-white shadow-2xl transition-all flex items-center justify-center gap-3 ${
                isSubmitting || !hasSigned
                ? 'bg-slate-300 cursor-not-allowed' 
                : 'bg-gradient-to-r from-indigo-600 to-blue-700 hover:scale-[1.02] shadow-indigo-200'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Anchoring Proof of Delivery...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-6 h-6" /> Anchor to Mainnet
                </>
              )}
            </button>
          </form>
        </div>

        {/* Signature Pad Column */}
        <div className="flex flex-col gap-8">
           <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700"><PenTool className="w-24 h-24" /></div>
              <h3 className="text-xl font-black mb-2 flex items-center gap-2"><PenTool className="w-5 h-5 text-indigo-400" /> Receiver Signature</h3>
              <p className="text-slate-400 text-xs mb-8">Sign within the area below to authorize custody transfer.</p>
              
              <div 
                className="h-[250px] bg-white rounded-3xl border-4 border-slate-800 cursor-crosshair relative group/pad"
                onClick={() => setHasSigned(true)}
              >
                {!hasSigned && (
                   <div className="absolute inset-0 flex flex-col items-center justify-center opacity-40 group-hover/pad:opacity-100 transition-opacity">
                      <p className="font-mono text-slate-400 text-xs">AWAITING DIGITAL SIGNATURE</p>
                      <span className="text-[10px] text-slate-300 mt-2 italic">(Click or touch to simulate signature)</span>
                   </div>
                )}
                {hasSigned && (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-48 h-24 text-slate-900 opacity-80" viewBox="0 0 100 50">
                      <path d="M10 40 Q 30 10 50 40 T 90 20" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-between items-center">
                <button onClick={() => setHasSigned(false)} className="text-xs font-bold text-slate-500 hover:text-white transition-colors">Clear Pad</button>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${hasSigned ? 'bg-emerald-500 animate-pulse' : 'bg-slate-700'}`}></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{hasSigned ? 'Signature Captured' : 'Ready'}</span>
                </div>
              </div>
           </div>

           <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100 flex-1">
             <h4 className="font-black text-slate-800 mb-6 flex items-center gap-2"><MapIcon className="w-5 h-5 text-indigo-600" /> Handoff Location Proof</h4>
             <div className="h-48 rounded-2xl bg-slate-100 relative overflow-hidden flex items-center justify-center border border-slate-200">
                <div className="absolute inset-0 opacity-20 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-118.2437,34.0522,12/400x200?access_token=mock')] bg-cover"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <MapPin className="w-8 h-8 text-indigo-600 animate-bounce" />
                  <p className="text-[10px] font-black mt-2 text-slate-900 tracking-tighter">CALIFORNIA HUB AREA 04</p>
                </div>
             </div>
             <p className="text-[10px] text-slate-400 font-medium mt-4 leading-relaxed">
               Timestamped location coordinates will be hashed into the block header to prevent fraudulent off-site confirmations.
             </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryConfirm;
