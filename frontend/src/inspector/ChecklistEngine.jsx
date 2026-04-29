import React, { useState } from 'react';
import { ClipboardCheck, ShieldCheck, Camera, CheckCircle2, AlertCircle, Info, Send, Save } from 'lucide-react';

const ChecklistEngine = () => {
  const [items, setItems] = useState([
    { id: 1, text: 'Seal integrity verified physically', status: 'pending' },
    { id: 2, text: 'Internal container cleanliness', status: 'pending' },
    { id: 3, text: 'Secondary sensor probe calibrated', status: 'pending' },
    { id: 4, text: 'Label QR matches digital token', status: 'pending' },
    { id: 5, text: 'Driver credentials validated', status: 'pending' },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const toggleStatus = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, status: item.status === 'complete' ? 'pending' : 'complete' } : item
    ));
  };

  const handleFinalize = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Inspection report hashed and uploaded to ledger.');
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in-up pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 flex items-center gap-3">
             <ClipboardCheck className="w-10 h-10 text-indigo-600" /> Professional Inspection Engine
          </h2>
          <p className="text-slate-500 font-medium mt-1">Multi-point physical audit with blockchain attestation.</p>
        </div>
        <div className="flex gap-2">
           <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl font-black text-sm text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2">
             <Save className="w-4 h-4" /> Save Draft
           </button>
           <button 
            onClick={handleFinalize}
            disabled={isSubmitting}
            className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2"
           >
             {isSubmitting ? 'Hashing...' : <><Send className="w-4 h-4" /> Finalize Audit</>}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Inspection Form */}
        <div className="lg:col-span-2 bg-white rounded-[40px] p-10 shadow-sm border border-slate-100">
           <div className="space-y-4">
              {items.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => toggleStatus(item.id)}
                  className={`group flex items-center justify-between p-6 rounded-3xl border-2 cursor-pointer transition-all ${item.status === 'complete' ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-transparent hover:border-slate-200'}`}
                >
                   <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${item.status === 'complete' ? 'bg-emerald-100 text-emerald-600' : 'bg-white text-slate-300 group-hover:text-slate-400'}`}>
                         {item.status === 'complete' ? <CheckCircle2 className="w-6 h-6" /> : <ClipboardCheck className="w-6 h-6" />}
                      </div>
                      <span className={`font-bold transition-colors ${item.status === 'complete' ? 'text-emerald-800' : 'text-slate-600'}`}>{item.text}</span>
                   </div>
                   <div className={`w-6 h-6 rounded-full border-2 transition-all ${item.status === 'complete' ? 'bg-emerald-500 border-emerald-500 scale-110' : 'border-slate-200 bg-white'}`}></div>
                </div>
              ))}
           </div>
           
           <div className="mt-8 pt-8 border-t border-slate-100">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-4">Inspection Evidence (Required)</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {[1, 2, 3].map(i => (
                   <div key={i} className="aspect-square bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300 hover:border-indigo-300 hover:text-indigo-300 transition-all cursor-pointer">
                      <Camera className="w-6 h-6 mb-2" />
                      <span className="text-[10px] font-black uppercase tracking-tighter">Upload</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Audit Metadata */}
        <div className="space-y-6">
           <div className="bg-slate-900 rounded-[40px] p-8 text-white">
              <h3 className="text-lg font-black mb-6 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-indigo-400" /> Forensic Compliance</h3>
              <div className="space-y-6">
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Assigned Inspector</p>
                    <p className="font-bold text-sm">John Doe (Cert #8821)</p>
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Time Window</p>
                    <p className="font-bold text-sm">Expiring in 14 mins</p>
                 </div>
                 <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 w-[70%]"></div>
                 </div>
              </div>
           </div>

           <div className="bg-amber-50 border border-amber-100 p-8 rounded-[40px]">
              <div className="flex items-center gap-3 mb-4">
                 <AlertCircle className="w-6 h-6 text-amber-600" />
                 <h4 className="font-black text-amber-900">Legal Disclaimer</h4>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed font-medium">
                 Physical inspection data is hashed using SHA-256 and linked to the shipment ID. 
                 Fraudulent reporting is a breach of the Digital Logistics Treaty (Section 4.2).
              </p>
              <div className="mt-6 flex items-center gap-2 text-[10px] font-black text-amber-700 uppercase tracking-widest">
                 <Info className="w-3 h-3" /> Digital Handshake Required
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default ChecklistEngine;
