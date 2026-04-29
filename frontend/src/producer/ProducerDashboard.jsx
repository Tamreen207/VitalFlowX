import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Activity, ShieldCheck, AlertTriangle, Zap, Leaf, Anchor, Settings, Globe, Package, Navigation, CheckSquare, Download, Truck } from 'lucide-react';
import { useShipments } from '../context/ShipmentContext';

const analyticsData = [
  { name: 'Mon', compliance: 100, tempAnomalies: 0 },
  { name: 'Tue', compliance: 98, tempAnomalies: 2 },
  { name: 'Wed', compliance: 99, tempAnomalies: 1 },
  { name: 'Thu', compliance: 100, tempAnomalies: 0 },
  { name: 'Fri', compliance: 95, tempAnomalies: 5 },
  { name: 'Sat', compliance: 100, tempAnomalies: 0 },
  { name: 'Sun', compliance: 100, tempAnomalies: 0 },
];

const producerFeatures = [
  { name: 'Batch Genealogy Tracking', icon: Navigation, desc: 'Trace ingredients to sub-suppliers', path: '/producer/productbatchconfig' },
  { name: 'Dynamic QR Generation', icon: CheckSquare, desc: 'Generate verifiable tokens', path: '/producer/qrgenerator' },
  { name: 'Smart Contract Automation', icon: Zap, desc: 'Auto-deploy SLA conditions', path: '/producer/onchainregister' },
  { name: 'IoT Sensor Provisioning', icon: Activity, desc: 'Pair MAC addresses to shipments', path: '/producer/sensorbinding' },
  { name: 'Cold-Chain Rule Engine', icon: Settings, desc: 'Customize safe temp ranges', path: '/producer/temprulesconfig' },
  { name: 'Digital Twin Dashboard', icon: Package, desc: 'Visual sensor placement', path: '/producer/documentpreview' },
  { name: 'Document Hasher', icon: Anchor, desc: 'Anchor invoices to ledger', path: '/producer/uploaddocs' },
  { name: 'Predictive Analytics', icon: Activity, desc: 'AI-based SLA breach prediction', path: '/producer/riskassessment' },
  { name: 'Producer Trust Score', icon: ShieldCheck, desc: 'Historical success metrics', path: '/producer/ledgerview' },
  { name: 'Multi-Signature Approvals', icon: CheckSquare, desc: 'QA sign-off requirement', path: '/producer/actorkeysetup' },
  { name: 'Recall Management System', icon: AlertTriangle, desc: 'Flag tokens globally', path: '/producer/exceptioncase' },
  { name: 'Carbon Footprint Estimator', icon: Leaf, desc: 'Calculate emissions by route', path: '/producer/routeplan' },
  { name: 'Real-Time Fleet API', icon: Navigation, desc: 'Live transporter telemetry', path: '/producer/alertsmonitor' },
  { name: 'Geofence Origin Setup', icon: Globe, desc: 'Define facility coordinates', path: '/producer/createshipment' },
  { name: 'Audit Export Module', icon: Download, desc: 'PDF generation for regulators', path: '/producer/documentpreview' },
];

const iconStyles = [
  'from-blue-500 to-cyan-500',
  'from-purple-500 to-pink-500',
  'from-amber-500 to-orange-500',
  'from-emerald-500 to-teal-500',
  'from-indigo-500 to-violet-500',
];

const textColors = [
  'text-cyan-300', 'text-pink-300', 'text-orange-300', 'text-teal-300', 'text-violet-300',
];

const borderColors = [
  'border-blue-500/30', 'border-purple-500/30', 'border-amber-500/30', 'border-emerald-500/30', 'border-indigo-500/30',
];

const ProducerDashboard = () => {
  const navigate = useNavigate();
  const { fetchShipments, shipments, loading } = useShipments();

  useEffect(() => {
    fetchShipments();
  }, [fetchShipments]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'in_transit': return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'delivered': return 'bg-green-50 border-green-200 text-green-700';
      case 'received': return 'bg-green-50 border-green-200 text-green-700';
      default: return 'bg-slate-50 border-slate-200 text-slate-700';
    }
  };

  const activeShipments = shipments.filter(s => s.status === 'in_transit' || s.status === 'pending').length;
  const deliveredShipments = shipments.filter(s => s.status === 'delivered' || s.status === 'received').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden p-8">
      <div className="relative z-10 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-2">Producer Command Center</h1>
            <p className="text-slate-300 font-medium">Origin point for cold-chain intelligence and blockchain integrity</p>
          </div>
          <div className="group relative">
            <div className="relative bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 px-6 py-4 rounded-3xl shadow-2xl min-w-[220px]">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-slate-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                    <path className="text-emerald-400" strokeLinecap="round" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center"><span className="text-emerald-400 font-bold text-sm">98%</span></div>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.15em] text-slate-400 mb-1">Network Trust Score</p>
                  <p className="text-white font-bold text-lg leading-tight">Highly Trusted Origin</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-2xl p-6 border border-slate-700/20">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Shipments</p>
            <p className="text-3xl font-black text-slate-100">{shipments.length}</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-6 border border-slate-700/20">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">In Transit</p>
            <p className="text-3xl font-black text-blue-400">{activeShipments}</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-6 border border-slate-700/20">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Delivered</p>
            <p className="text-3xl font-black text-green-400">{deliveredShipments}</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-6 border border-slate-700/20">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Compliance Rate</p>
            <p className="text-3xl font-black text-emerald-400">98%</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-800/60 rounded-3xl p-6">
            <h3 className="text-lg font-black text-white mb-4">SLA Compliance & Exceptions</h3>
            <div className="h-[260px]"><ResponsiveContainer width="100%" height="100%"><AreaChart data={analyticsData}><defs><linearGradient id="colorCompliance" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.5}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/></linearGradient><linearGradient id="colorAnomalies" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4}/><stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#374151" /><XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 13}} /><YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 13}} /><Tooltip /><Legend /><Area type="monotone" dataKey="compliance" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorCompliance)" name="Compliance %" /><Area type="monotone" dataKey="tempAnomalies" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorAnomalies)" name="Temp Anomalies" /></AreaChart></ResponsiveContainer></div>
          </div>

          <div className="bg-slate-800/60 rounded-3xl p-6">
            <h3 className="text-lg font-black text-white mb-4">Active Exceptions</h3>
            <div className="space-y-3">
              {[{ severity: 'CRITICAL', msg: 'Temp breach (-5°C) on 102', status: 'UNRESOLVED', color: 'rose' }].map((alert, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-700/50 border border-slate-600/50">
                  <div className="flex justify-between items-center mb-2"><span className="text-[10px] font-black tracking-widest px-3 py-1 rounded-full bg-rose-500/20 text-rose-300">{alert.severity}</span><span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{alert.status}</span></div>
                  <p className="text-sm font-medium text-slate-200">{alert.msg}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl">Resolve All</button>
          </div>
        </div>

        <div className="mt-8 bg-slate-800/60 rounded-3xl p-6">
          <h3 className="text-xl font-black text-white mb-3 text-center">Advanced Producer Capabilities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {producerFeatures.map((feat, i) => (
              <div key={i} onClick={() => navigate(feat.path)} className="group p-5 rounded-2xl cursor-pointer bg-slate-800/60 border border-slate-700/50 hover:shadow-xl">
                <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${iconStyles[i % iconStyles.length]} ${borderColors[i % borderColors.length]} ${textColors[i % textColors.length]}`}>
                  <feat.icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-white text-sm mb-1">{feat.name}</h4>
                <p className="text-xs text-slate-400">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProducerDashboard;
