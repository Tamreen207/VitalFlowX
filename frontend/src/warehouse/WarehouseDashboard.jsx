import React from 'react';
import { Warehouse, Package, Activity, AlertTriangle, Truck, ShieldCheck, ThermometerSnowflake, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

<<<<<<< Updated upstream
const tempLogs = [
  { time: '00:00', temp: -72 }, { time: '04:00', temp: -71 },
  { time: '08:00', temp: -70 }, { time: '12:00', temp: -73 },
  { time: '16:00', temp: -72 }, { time: '20:00', temp: -71 },
];

const SLAComplianceData = [
  { name: 'Node 1', score: 98 }, { name: 'Node 2', score: 85 },
  { name: 'Node 3', score: 100 }, { name: 'Node 4', score: 92 },
];
=======
const WarehouseDashboard = () => {
>>>>>>> Stashed changes

const WarehouseDashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in-up pb-12">
      {/* Header with KPI */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800">Cold-Storage Command Center</h2>
          <p className="text-slate-500 font-medium mt-1">Real-time facility monitoring and autonomous handoff protocols.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
             <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center"><Package className="w-6 h-6"/></div>
             <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Stock</p>
               <p className="text-xl font-black text-slate-800">1,240 Units</p>
             </div>
          </div>
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
             <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center"><ShieldCheck className="w-6 h-6"/></div>
             <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Trust Score</p>
               <p className="text-xl font-black text-emerald-600">99.4%</p>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sensor Intelligence Panel */}
        <div className="lg:col-span-2 bg-white rounded-[40px] p-8 shadow-sm border border-slate-100">
           <div className="flex justify-between items-center mb-8">
             <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
               <ThermometerSnowflake className="w-6 h-6 text-blue-500" /> Sensor Intelligence Panel
             </h3>
             <div className="flex gap-2">
               <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-lg">OPTIMAL</span>
               <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black rounded-lg">ID: WH-99A</span>
             </div>
           </div>

           <div className="h-[300px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={tempLogs}>
                 <defs>
                   <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                 <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                 <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                 <Area type="monotone" dataKey="temp" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorTemp)" />
               </AreaChart>
             </ResponsiveContainer>
           </div>
           
           <div className="mt-8 pt-8 border-t border-slate-50 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Humidity', val: '12%', status: 'optimal' },
                { label: 'CO2 Levels', val: '410ppm', status: 'optimal' },
                { label: 'Power Grid', val: 'Stable', status: 'optimal' },
                { label: 'SLA Breach', val: '0', status: 'safe' }
              ].map((stat, i) => (
                <div key={i}>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                   <p className="text-lg font-black text-slate-800">{stat.val}</p>
                </div>
              ))}
           </div>
        </div>

        {/* Alerts & Exception Summary */}
        <div className="bg-slate-900 rounded-[40px] p-8 text-white flex flex-col">
           <h3 className="text-xl font-black mb-6 flex items-center gap-2">
             <AlertTriangle className="w-6 h-6 text-amber-400" /> Exceptions Summary
           </h3>
           <div className="space-y-4 flex-1">
              {[
                { id: 'AL-101', type: 'Temp Deviation', level: 'Critical', time: '12m ago' },
                { id: 'AL-102', type: 'Sensor Sync', level: 'Low', time: '1h ago' },
                { id: 'AL-103', type: 'Gate Breach', level: 'High', time: '2h ago' }
              ].map((alert, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center justify-between group hover:bg-white/10 transition-colors cursor-pointer">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm">{alert.type}</span>
                      <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter ${alert.level === 'Critical' ? 'bg-red-500' : 'bg-amber-500'}`}>{alert.level}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-widest">{alert.id} • {alert.time}</p>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Activity className="w-4 h-4" />
                  </button>
                </div>
              ))}
           </div>
           <button className="mt-8 w-full py-4 bg-indigo-600 rounded-2xl font-black text-sm hover:bg-indigo-700 shadow-xl shadow-indigo-900/50 transition-all">
             View All Incidents
           </button>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Real-Time Shipment View (Timeline) */}
        <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100">
           <h3 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-2">
             <Truck className="w-6 h-6 text-indigo-500" /> Inbound Logistics Timeline
           </h3>
           <div className="relative pl-8 space-y-12 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              {[
                { actor: 'Transporter A', event: 'Arrival @ Gate 4', time: '09:42', status: 'complete', icon: Truck },
                { actor: 'Warehouse Op', event: 'Unloading & Scan', time: '10:15', status: 'in-progress', icon: Warehouse },
                { actor: 'System', event: 'Blockchain Hash Anchor', time: 'Pending', status: 'pending', icon: ShieldCheck }
              ].map((step, i) => (
                <div key={i} className="relative">
                  <div className={`absolute -left-11 w-6 h-6 rounded-full border-4 border-white shadow-md flex items-center justify-center z-10 ${step.status === 'complete' ? 'bg-emerald-500' : step.status === 'in-progress' ? 'bg-indigo-600' : 'bg-slate-200'}`}>
                    <step.icon className="w-3 h-3 text-white" />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-black text-slate-800">{step.event}</p>
                      <p className="text-xs font-bold text-slate-400 mt-0.5 uppercase tracking-widest">{step.actor}</p>
                    </div>
                    <span className="text-xs font-black text-slate-500 tabular-nums">{step.time}</span>
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* Compliance Charts */}
        <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100">
           <h3 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-2">
             <TrendingUp className="w-6 h-6 text-emerald-500" /> Compliance & SLA Analytics
           </h3>
           <div className="h-[250px]">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={SLAComplianceData}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                 <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                 <Bar dataKey="score" fill="#4f46e5" radius={[6, 6, 0, 0]} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  );
};

export default WarehouseDashboard;
