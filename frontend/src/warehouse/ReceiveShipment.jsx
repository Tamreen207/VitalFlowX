import React, { useState } from 'react';
import { PackageOpen, QrCode, ShieldCheck, ThermometerSnowflake, User, MapPin, Database, Send, Plus, CheckCircle2 } from 'lucide-react';

const ReceiveShipment = () => {
<<<<<<< Updated upstream
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    shipmentId: '',
    tempAtArrival: '',
    storageZone: 'Cold-A',
    sealStatus: 'Intact'
  });

  const handleNext = () => setStep(step + 1);
  const handleProcess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(4);
    }, 2000);
  };
=======
  const [searchTerm, setSearchTerm] = useState('');
  const mockData = Array(5).fill(0).map((_,i) => ({id: 'Sample ' + i, shipmentId: 'Sample ' + i, product: 'Sample ' + i, zone: 'Sample ' + i, qty: 'Sample ' + i, tempOnArrival: 'Sample ' + i, status: 'Sample ' + i}));
  const filteredData = mockData.filter(row => Object.values(row).some(val => String(val).toLowerCase().includes(searchTerm.toLowerCase())));
>>>>>>> Stashed changes

  return (
    <div className="space-y-8 animate-fade-in-up pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 flex items-center gap-3">
             <PackageOpen className="w-10 h-10 text-indigo-600" /> Inbound Intake Portal
          </h2>
          <p className="text-slate-500 font-medium mt-1">Custody transfer and environmental verification at warehouse entry.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Multi-Step Wizard */}
        <div className="flex items-center justify-between mb-12 relative">
           <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -z-10 -translate-y-1/2"></div>
           {[1, 2, 3].map(i => (
             <div key={i} className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all ${step >= i ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'bg-white text-slate-300 border-2 border-slate-100'}`}>
                {i}
             </div>
           ))}
        </div>

        <div className="bg-white rounded-[40px] p-10 shadow-sm border border-slate-100">
           {step === 1 && (
             <div className="space-y-8 animate-fade-in">
                <div className="text-center">
                   <h3 className="text-2xl font-black text-slate-800">Scan Inbound Cargo</h3>
                   <p className="text-slate-500 font-medium mt-2">Initialize the digital handoff by scanning the shipment token.</p>
                </div>
                <div className="w-64 h-64 mx-auto bg-slate-50 border-4 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-slate-400 group hover:border-indigo-300 hover:text-indigo-600 transition-all cursor-pointer">
                   <QrCode className="w-16 h-16 mb-4" />
                   <span className="text-xs font-black uppercase tracking-widest">Connect Scanner</span>
                </div>
                <div className="max-w-sm mx-auto space-y-4">
                   <input 
                    type="text" 
                    placeholder="Manual ID: VTX-XXXX-XXXX" 
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold" 
                    onChange={(e) => setFormData({...formData, shipmentId: e.target.value})}
                   />
                   <button onClick={handleNext} className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-black transition-all shadow-xl shadow-slate-200">
                     Initialize Handoff
                   </button>
                </div>
             </div>
           )}

           {step === 2 && (
             <div className="space-y-8 animate-fade-in">
                <h3 className="text-xl font-black text-slate-800 flex items-center gap-2"><ThermometerSnowflake className="w-6 h-6 text-blue-500" /> Arrival Verification</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Arrival Temperature (°C)</label>
                      <input type="number" placeholder="-70.0" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 font-bold" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Seal Condition</label>
                      <select className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-slate-700">
                         <option>Intact & Sealed</option>
                         <option>Tampered</option>
                         <option>Missing Seal</option>
                      </select>
                   </div>
                </div>
                <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100 flex items-center gap-4">
                   <ShieldCheck className="w-8 h-8 text-blue-600" />
                   <p className="text-sm font-medium text-blue-800">System is cross-referencing this data with the active IoT stream SN-991A. <span className="font-black">Matches Found.</span></p>
                </div>
                <button onClick={handleNext} className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 transition-all">
                  Confirm Data Accuracy
                </button>
             </div>
           )}

           {step === 3 && (
             <div className="space-y-8 animate-fade-in">
                <h3 className="text-xl font-black text-slate-800 flex items-center gap-2"><Database className="w-6 h-6 text-indigo-500" /> Storage Allocation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {[
                     { zone: 'Ultra-Cold-A1', space: '14 Slots', temp: '-72°C', status: 'optimal' },
                     { zone: 'Ultra-Cold-B2', space: '2 Slots', temp: '-75°C', status: 'optimal' },
                     { zone: 'Deep-Freeze-C', space: 'Full', temp: '-20°C', status: 'full' },
                   ].map((zone, i) => (
                     <div key={i} className={`p-6 rounded-3xl border-2 transition-all cursor-pointer ${zone.status === 'full' ? 'opacity-50 cursor-not-allowed border-slate-100' : 'hover:border-indigo-500 bg-slate-50'}`}>
                        <div className="flex justify-between items-start mb-4">
                           <span className="font-black text-slate-800">{zone.zone}</span>
                           <span className="text-[10px] font-black bg-white px-2 py-1 rounded-lg text-indigo-600 border border-indigo-50">{zone.temp}</span>
                        </div>
                        <p className="text-xs font-bold text-slate-400">{zone.space} available</p>
                     </div>
                   ))}
                </div>
                <button onClick={handleProcess} disabled={isProcessing} className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-slate-200">
                  {isProcessing ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Syncing Blockchain...</> : <><Send className="w-5 h-5" /> Anchor Handoff & Store</>}
                </button>
             </div>
           )}

           {step === 4 && (
             <div className="text-center py-12 animate-bounce-subtle">
                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-100">
                   <CheckCircle2 className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-black text-slate-800">Shipment Secured</h3>
                <p className="text-slate-500 font-medium mt-2">Inventory updated. Blockchain record anchored: <span className="font-mono text-indigo-600">0x77d2...e8a1</span></p>
                <button onClick={() => setStep(1)} className="mt-10 px-8 py-3 bg-slate-100 text-slate-600 font-black rounded-xl hover:bg-slate-200 transition-all">
                  Process New Intake
                </button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default ReceiveShipment;
