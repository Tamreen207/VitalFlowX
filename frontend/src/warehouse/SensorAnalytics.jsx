import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Activity, ThermometerSnowflake, Droplets, AlertTriangle, Battery, Signal, Zap } from 'lucide-react';

const mockSensorData = [
  { time: '00:00', temp: -70.5, humidity: 12, target: -70 },
  { time: '04:00', temp: -71.2, humidity: 11, target: -70 },
  { time: '08:00', temp: -69.8, humidity: 12, target: -70 },
  { time: '12:00', temp: -68.5, humidity: 14, target: -70 },
  { time: '16:00', temp: -65.1, humidity: 18, target: -70, breach: true }, // Breach!
  { time: '20:00', temp: -69.0, humidity: 13, target: -70 },
  { time: '24:00', temp: -70.1, humidity: 12, target: -70 },
];

const activeSensors = [
  { id: 'SN-991A', zone: 'Zone A - Ultra Cold', temp: '-70.5°C', status: 'Optimal', battery: '98%', signal: 'Strong' },
  { id: 'SN-992B', zone: 'Zone B - Standard', temp: '4.2°C', status: 'Optimal', battery: '85%', signal: 'Good' },
  { id: 'SN-993C', zone: 'Zone A - Ultra Cold', temp: '-65.1°C', status: 'Warning', battery: '42%', signal: 'Weak' },
];

const SensorAnalytics = () => {
  return (
    <div className="space-y-8 animate-fade-in-up pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800">Sensor Intelligence</h2>
          <p className="text-slate-500 font-medium mt-1">Continuous telemetry, anomaly detection, and SLA enforcement.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl border border-emerald-100 flex items-center gap-2 font-bold text-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Sensors Online: 1,204
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4"><ThermometerSnowflake className="w-6 h-6"/></div>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Avg Temp (Zone A)</p>
          <p className="text-3xl font-black text-slate-800 mt-1">-70.2°C</p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-cyan-50 text-cyan-600 rounded-2xl flex items-center justify-center mb-4"><Droplets className="w-6 h-6"/></div>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Avg Humidity</p>
          <p className="text-3xl font-black text-slate-800 mt-1">12.4%</p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-4"><AlertTriangle className="w-6 h-6"/></div>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Temp Anomalies</p>
          <p className="text-3xl font-black text-slate-800 mt-1">1 <span className="text-sm text-slate-400 font-medium">/ 24h</span></p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-4"><Zap className="w-6 h-6"/></div>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Active Alerts</p>
          <p className="text-3xl font-black text-slate-800 mt-1">3</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2"><Activity className="w-5 h-5 text-indigo-500"/> Zone A (Ultra Cold) Telemetry</h3>
            <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg uppercase tracking-widest">Last 24 Hours</span>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockSensorData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <YAxis domain={[-75, -60]} axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                
                {/* SLA Threshold Line */}
                <ReferenceLine y={-68} label={{ position: 'top', value: 'SLA Max: -68°C', fill: '#ef4444', fontSize: 12, fontWeight: 'bold' }} stroke="#ef4444" strokeDasharray="3 3" />
                
                <Area type="monotone" dataKey="temp" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorTemp)" 
                  activeDot={{ r: 8, strokeWidth: 0, fill: '#0ea5e9' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-lg font-black text-slate-800 mb-6">Active Sensor Nodes</h3>
          <div className="space-y-4 flex-1">
            {activeSensors.map((sensor, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="font-bold text-slate-800">{sensor.id}</span>
                    <p className="text-xs text-slate-500">{sensor.zone}</p>
                  </div>
                  <span className={`px-2 py-1 text-[10px] font-black uppercase tracking-widest rounded-md ${sensor.status === 'Optimal' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {sensor.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-200">
                   <div>
                     <p className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Temp</p>
                     <p className="font-mono text-sm font-bold text-slate-700">{sensor.temp}</p>
                   </div>
                   <div>
                     <p className="text-[10px] uppercase text-slate-400 font-bold tracking-wider"><Battery className="w-3 h-3 inline mr-1"/>Bat</p>
                     <p className="font-mono text-sm font-bold text-slate-700">{sensor.battery}</p>
                   </div>
                   <div>
                     <p className="text-[10px] uppercase text-slate-400 font-bold tracking-wider"><Signal className="w-3 h-3 inline mr-1"/>Sig</p>
                     <p className="font-mono text-sm font-bold text-slate-700">{sensor.signal}</p>
                   </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 border-2 border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors">View All 1,204 Sensors</button>
        </div>
      </div>
    </div>
  );
};

export default SensorAnalytics;
