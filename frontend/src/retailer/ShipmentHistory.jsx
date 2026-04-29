import React from 'react';
import { History, Search, Filter, ArrowUpRight, Download, Box, ShieldCheck, MapPin, Truck, Warehouse, CheckCircle2 } from 'lucide-react';

const ShipmentHistory = () => {
  const history = [
    { id: 'VTX-001', product: 'Bio-Vial Gamma', status: 'Delivered', trust: 99.8, lastEvent: 'Customer Receipt', time: '2h ago' },
    { id: 'VTX-002', product: 'Cryo-Pack 44', status: 'In Transit', trust: 94.2, lastEvent: 'Regional Hub D', time: '5h ago' },
    { id: 'VTX-003', product: 'Plasma Supply', status: 'Delivered', trust: 100, lastEvent: 'Hospital Storage', time: 'Yesterday' },
    { id: 'VTX-004', product: 'Vaccine Batch B', status: 'Flagged', trust: 42.0, lastEvent: 'Temp Deviation @ Port', time: '2 days ago' },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 flex items-center gap-3">
             <History className="w-10 h-10 text-indigo-600" /> Inventory Journey Ledger
          </h2>
          <p className="text-slate-500 font-medium mt-1">Comprehensive archival of all physical movements and cryptographic handoffs.</p>
        </div>
        <div className="flex gap-3">
           <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search Shipment ID..." className="pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
           </div>
           <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:text-indigo-600 shadow-sm transition-all">
              <Filter className="w-5 h-5" />
           </button>
           <button className="p-3 bg-slate-900 text-white rounded-2xl shadow-xl shadow-slate-200 hover:bg-black transition-all">
              <Download className="w-5 h-5" />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {history.map((item, i) => (
          <div key={i} className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 group hover:shadow-xl hover:shadow-slate-200/50 transition-all overflow-hidden relative">
            
            {/* Visual Progress Bar */}
            <div className="absolute bottom-0 left-0 h-1.5 bg-slate-100 w-full">
               <div className={`h-full transition-all duration-1000 ${item.trust > 90 ? 'bg-emerald-500' : item.trust > 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${item.trust}%` }}></div>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center shrink-0 ${item.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' : item.status === 'Flagged' ? 'bg-red-50 text-red-600' : 'bg-indigo-50 text-indigo-600'}`}>
                   <Box className="w-8 h-8" />
                </div>
                <div>
                   <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl font-black text-slate-800">{item.id}</span>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg uppercase tracking-widest ${
                        item.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
                        item.status === 'Flagged' ? 'bg-red-100 text-red-700' : 'bg-indigo-100 text-indigo-700'
                      }`}>
                        {item.status}
                      </span>
                   </div>
                   <p className="text-sm font-bold text-slate-500">{item.product}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-8 lg:gap-12">
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Last Custody Point</p>
                    <div className="flex items-center gap-2">
                       <MapPin className="w-4 h-4 text-slate-400" />
                       <span className="text-sm font-bold text-slate-700">{item.lastEvent}</span>
                    </div>
                 </div>

                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Trust Integrity</p>
                    <div className="flex items-center gap-2">
                       <ShieldCheck className={`w-4 h-4 ${item.trust > 90 ? 'text-emerald-500' : 'text-amber-500'}`} />
                       <span className="text-sm font-black text-slate-800">{item.trust}%</span>
                    </div>
                 </div>

                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Blockchain Hash</p>
                    <code className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded">0x77d...2e1a</code>
                 </div>
              </div>

              <div className="flex items-center gap-4 ml-auto">
                 <div className="text-right">
                    <p className="text-xs font-black text-slate-800">{item.time}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Event Locked</p>
                 </div>
                 <button className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center group-hover:scale-110">
                    <ArrowUpRight className="w-6 h-6" />
                 </button>
              </div>
            </div>

            {/* Micro Journey Preview */}
            <div className="mt-8 pt-8 border-t border-slate-50 flex items-center gap-4 opacity-40 group-hover:opacity-100 transition-opacity overflow-x-auto pb-2 custom-scrollbar">
               {[Truck, Warehouse, Truck, Warehouse, CheckCircle2].map((Icon, idx) => (
                  <React.Fragment key={idx}>
                    <Icon className="w-4 h-4 text-slate-400 shrink-0" />
                    {idx < 4 && <div className="h-0.5 w-8 bg-slate-100 shrink-0"></div>}
                  </React.Fragment>
               ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShipmentHistory;
