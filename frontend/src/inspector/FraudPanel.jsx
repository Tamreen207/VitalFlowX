import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, Fingerprint, ShieldCheck, Search, Activity, Gauge, ExternalLink, Filter } from 'lucide-react';

const FraudPanel = () => {
  const [activeTab, setActiveTab] = useState('Anomalies');

  const alerts = [
    { id: 'FR-991', type: 'Signature Mismatch', actor: 'Actor_0x221', severity: 'High', trustImpact: -15, status: 'Flagged', time: '10 mins ago' },
    { id: 'FR-992', type: 'Time-Travel Sync', actor: 'Sensor_882', severity: 'Critical', trustImpact: -40, status: 'In Review', time: '45 mins ago' },
    { id: 'FR-993', type: 'Hash Collision', actor: 'Unknown', severity: 'Critical', trustImpact: -50, status: 'Escalated', time: '2 hours ago' },
    { id: 'FR-994', type: 'Geofence Bypass', actor: 'Fleet_09', severity: 'Medium', trustImpact: -8, status: 'Dismissed', time: 'Yesterday' },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 flex items-center gap-3">
             <Fingerprint className="w-10 h-10 text-indigo-600" /> Fraud & Anomaly Detection
          </h2>
          <p className="text-slate-500 font-medium mt-1">Cross-referencing blockchain hashes with sensor telemetry for forensic audit.</p>
        </div>
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
          {['Anomalies', 'Verified', 'Escalated'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Trust Score Health */}
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-125 transition-transform duration-1000">
                <Gauge className="w-48 h-48" />
              </div>
              <h3 className="text-lg font-black mb-2 flex items-center gap-2">Network Health</h3>
              <p className="text-slate-400 text-xs mb-8 uppercase tracking-widest font-bold">Global Trust Aggregate</p>
              
              <div className="flex flex-col items-center">
                 <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                       <path className="text-white/10" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                       <path className="text-indigo-400" strokeDasharray="82, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    <span className="absolute text-3xl font-black italic">82%</span>
                 </div>
                 <p className="mt-6 text-sm font-bold text-slate-300">Decreased by 4.2% <span className="text-red-400">↓</span></p>
              </div>
           </div>

           <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100">
              <h4 className="font-black text-slate-800 mb-6 flex items-center gap-2"><Filter className="w-4 h-4" /> Quick Analysis</h4>
              <div className="space-y-4">
                 {[
                   { label: 'Unchecked Blocks', val: '24', icon: ShieldAlert, color: 'text-amber-500' },
                   { label: 'Security Breaches', val: '0', icon: ShieldCheck, color: 'text-emerald-500' },
                   { label: 'Active Forensics', val: '3', icon: Activity, color: 'text-indigo-600' },
                 ].map((item, i) => (
                   <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-3">
                        <item.icon className={`w-4 h-4 ${item.color}`} />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                      </div>
                      <span className="font-black text-slate-800">{item.val}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Anomaly Table */}
        <div className="lg:col-span-3 bg-white rounded-[40px] p-8 shadow-sm border border-slate-100 overflow-hidden">
           <div className="flex justify-between items-center mb-8 px-2">
             <h3 className="text-xl font-black text-slate-800">Anomaly Detection Queue</h3>
             <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" placeholder="Search Hash or Actor..." className="pl-11 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
             </div>
           </div>

           <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead>
                 <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                   <th className="pb-4 px-4">Event ID</th>
                   <th className="pb-4 px-4">Type</th>
                   <th className="pb-4 px-4">Actor</th>
                   <th className="pb-4 px-4">Impact</th>
                   <th className="pb-4 px-4">Status</th>
                   <th className="pb-4 px-4 text-right">Action</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                 {alerts.map((alert, i) => (
                   <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                     <td className="py-5 px-4 font-bold text-slate-800">{alert.id}</td>
                     <td className="py-5 px-4">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className={`w-3 h-3 ${alert.severity === 'Critical' ? 'text-red-500' : 'text-amber-500'}`} />
                          <span className="font-bold text-slate-700 text-sm">{alert.type}</span>
                        </div>
                     </td>
                     <td className="py-5 px-4 font-mono text-xs text-slate-500">{alert.actor}</td>
                     <td className="py-5 px-4">
                        <span className={`font-black text-xs ${alert.trustImpact < -20 ? 'text-red-600' : 'text-amber-600'}`}>
                          {alert.trustImpact}% Trust
                        </span>
                     </td>
                     <td className="py-5 px-4">
                        <span className={`text-[9px] font-black px-2 py-1 rounded uppercase tracking-widest ${
                          alert.status === 'Flagged' ? 'bg-amber-100 text-amber-700' :
                          alert.status === 'Escalated' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {alert.status}
                        </span>
                     </td>
                     <td className="py-5 px-4 text-right">
                        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                           <ExternalLink className="w-4 h-4" />
                        </button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>

      </div>
    </div>
  );
};

export default FraudPanel;
