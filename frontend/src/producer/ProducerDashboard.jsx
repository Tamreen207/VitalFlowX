<<<<<<< Updated upstream
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
=======
import React from 'react';
import { useNavigate } from 'react-router-dom';
>>>>>>> Stashed changes
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Activity, ShieldCheck, AlertTriangle, Zap, Leaf, Anchor, Settings, Globe, Package, Navigation, Network, CheckSquare, Search, Download, Truck } from 'lucide-react';
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
  { name: 'Batch Genealogy Tracking', icon: Network, desc: 'Trace ingredients to sub-suppliers', path: '/producer/productbatchconfig' },
  { name: 'Dynamic QR Generation', icon: Search, desc: 'Generate verifiable tokens', path: '/producer/qrgenerator' },
  { name: 'Smart Contract Automation', icon: Zap, desc: 'Auto-deploy SLA conditions', path: '/producer/onchainregister' },
  { name: 'IoT Sensor Provisioning', icon: Activity, desc: 'Pair MAC addresses to shipments', path: '/producer/sensorbinding' },
  { name: 'Cold-Chain Rule Engine', icon: Settings, desc: 'Customize safe temp ranges', path: '/producer/temprulesconfig' },
<<<<<<< Updated upstream
  { name: 'Digital Twin Dashboard', icon: Package, desc: 'Visual sensor placement', path: '/producer/documentpreview' },
  { name: 'Document Hasher', icon: Anchor, desc: 'Anchor invoices to ledger', path: '/producer/uploaddocs' },
  { name: 'Predictive Analytics', icon: Activity, desc: 'AI-based SLA breach prediction', path: '/producer/riskassessment' },
  { name: 'Producer Trust Score', icon: ShieldCheck, desc: 'Historical success metrics', path: '/producer/ledgerview' },
  { name: 'Multi-Signature Approvals', icon: CheckSquare, desc: 'QA sign-off requirement', path: '/producer/actorkeysetup' },
  { name: 'Recall Management System', icon: AlertTriangle, desc: 'Flag tokens globally', path: '/producer/exceptioncase' },
  { name: 'Carbon Footprint Estimator', icon: Leaf, desc: 'Calculate emissions by route', path: '/producer/routeplan' },
  { name: 'Real-Time Fleet API', icon: Navigation, desc: 'Live transporter telemetry', path: '/producer/alertsmonitor' },
  { name: 'Geofence Origin Setup', icon: Globe, desc: 'Define facility coordinates', path: '/producer/createshipment' },
  { name: 'Audit Export Module', icon: Download, desc: 'PDF generation for regulators', path: '/producer/producerdashboard' },
];

const ProducerDashboard = () => {
  const { fetchShipments, shipments, loading } = useShipments();

  useEffect(() => {
    fetchShipments();
  }, [fetchShipments]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'in_transit':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'delivered':
        return 'bg-green-50 border-green-200 text-green-700';
      case 'received':
        return 'bg-green-50 border-green-200 text-green-700';
      default:
        return 'bg-slate-50 border-slate-200 text-slate-700';
    }
  };

  const activeShipments = shipments.filter(s => s.status === 'in_transit' || s.status === 'pending').length;
  const deliveredShipments = shipments.filter(s => s.status === 'delivered' || s.status === 'received').length;

  return (
    <div className="space-y-8 animate-fade-in-up pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800">Producer Command Center</h2>
          <p className="text-slate-500 font-medium mt-1">Origin point for cold-chain intelligence and blockchain integrity.</p>
        </div>
        <div className="flex items-center gap-3 bg-indigo-50 px-5 py-3 rounded-2xl border border-indigo-100 shadow-sm shadow-indigo-100">
           <div className="w-12 h-12 rounded-full relative">
             <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-indigo-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                <path className="text-indigo-600 animate-[dash_2s_ease-out_forwards]" strokeDasharray="98, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
             </svg>
             <div className="absolute inset-0 flex items-center justify-center font-bold text-xs text-indigo-800">98%</div>
           </div>
           <div>
             <p className="text-xs font-black uppercase tracking-widest text-indigo-400">Network Trust Score</p>
             <p className="font-bold text-indigo-900">Highly Trusted Origin</p>
           </div>
        </div>
      </div>

      {/* Live Shipments Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Shipments</p>
              <p className="text-3xl font-black text-slate-800">{shipments.length}</p>
            </div>
            <Package className="w-8 h-8 text-indigo-600 opacity-30" />
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">In Transit</p>
              <p className="text-3xl font-black text-blue-600">{activeShipments}</p>
            </div>
            <Truck className="w-8 h-8 text-blue-600 opacity-30" />
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Delivered</p>
              <p className="text-3xl font-black text-green-600">{deliveredShipments}</p>
            </div>
            <CheckSquare className="w-8 h-8 text-green-600 opacity-30" />
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Compliance Rate</p>
              <p className="text-3xl font-black text-emerald-600">98%</p>
            </div>
            <ShieldCheck className="w-8 h-8 text-emerald-600 opacity-30" />
          </div>
        </div>
      </div>
=======
  { name: 'Digital Twin Dashboard', icon: Package, desc: 'Visual sensor placement', path: '/producer/producerdashboard' },
  { name: 'Document Hasher', icon: Anchor, desc: 'Anchor invoices to ledger', path: '/producer/uploaddocs' },
  { name: 'Predictive Analytics', icon: Activity, desc: 'AI-based SLA breach prediction', path: '/producer/riskassessment' },
  { name: 'Producer Trust Score', icon: ShieldCheck, desc: 'Historical success metrics', path: '/producer/ledgerview' },
  { name: 'Multi-Signature Approvals', icon: CheckSquare, desc: 'QA sign-off requirement', path: '/producer/exceptioncase' },
  { name: 'Recall Management System', icon: AlertTriangle, desc: 'Flag tokens globally', path: '/producer/alertsmonitor' },
  { name: 'Carbon Footprint Estimator', icon: Leaf, desc: 'Calculate emissions by route', path: '/producer/routeplan' },
  { name: 'Real-Time Fleet API', icon: Navigation, desc: 'Live transporter telemetry', path: '/producer/producerdashboard' },
  { name: 'Geofence Origin Setup', icon: Globe, desc: 'Define facility coordinates', path: '/producer/actorkeysetup' },
  { name: 'Audit Export Module', icon: Download, desc: 'PDF generation for regulators', path: '/producer/documentpreview' },
];

const iconStyles = [
  'from-blue-500 to-cyan-500',
  'from-purple-500 to-pink-500',
  'from-amber-500 to-orange-500',
  'from-emerald-500 to-teal-500',
  'from-indigo-500 to-violet-500',
  'from-rose-500 to-red-500',
  'from-sky-500 to-blue-500',
  'from-lime-500 to-green-500',
  'from-fuchsia-500 to-purple-500',
  'from-yellow-500 to-amber-500',
  'from-teal-500 to-cyan-500',
  'from-orange-500 to-red-500',
  'from-cyan-500 to-sky-500',
  'from-violet-500 to-fuchsia-500',
  'from-green-500 to-lime-500',
];
>>>>>>> Stashed changes

const textColors = [
  'text-cyan-300',
  'text-pink-300',
  'text-orange-300',
  'text-teal-300',
  'text-violet-300',
  'text-red-300',
  'text-blue-300',
  'text-green-300',
  'text-purple-300',
  'text-amber-300',
  'text-cyan-300',
  'text-red-300',
  'text-sky-300',
  'text-fuchsia-300',
  'text-lime-300',
];

const borderColors = [
  'border-blue-500/30',
  'border-purple-500/30',
  'border-amber-500/30',
  'border-emerald-500/30',
  'border-indigo-500/30',
  'border-rose-500/30',
  'border-sky-500/30',
  'border-lime-500/30',
  'border-fuchsia-500/30',
  'border-yellow-500/30',
  'border-teal-500/30',
  'border-orange-500/30',
  'border-cyan-500/30',
  'border-violet-500/30',
  'border-green-500/30',
];

const ProducerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

<<<<<<< Updated upstream
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col">
        <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-amber-500"/> Recent Shipments</h3>
        <div className="space-y-3 flex-1 overflow-y-auto max-h-[300px]">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : shipments.length === 0 ? (
            <p className="text-slate-500 text-sm">No shipments yet</p>
          ) : (
            shipments.slice(0, 5).map((ship, i) => (
              <div key={i} className={`p-3 rounded-xl border ${getStatusColor(ship.status)} flex flex-col gap-1`}>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xs">SHP-{ship.id}</span>
                  <span className="text-[10px] font-bold capitalize">{ship.status?.replace('_', ' ')}</span>
                </div>
                <p className="text-xs text-slate-600 truncate">{ship.destination}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>

    {/* 15 Features Grid */}
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
      <div className="mb-8">
        <h3 className="text-xl font-black text-slate-800">Advanced Producer Capabilities (15 Modules)</h3>
        <p className="text-slate-500">Comprehensive toolset for origin-point verification and logistics orchestration.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {producerFeatures.map((feat, i) => (
          <Link key={i} to={feat.path} className="p-5 rounded-2xl border border-slate-100 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100 transition-all cursor-pointer bg-gradient-to-b from-white to-slate-50 group block">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <feat.icon className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm mb-1">{feat.name}</h4>
            <p className="text-xs text-slate-500">{feat.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  </div>
);
=======
      <div className="relative z-10 space-y-8 p-8 pb-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-2">
              Producer Command Center
            </h1>
            <p className="text-slate-300 font-medium text-lg">Origin point for cold-chain intelligence and blockchain integrity</p>
          </div>

          {/* Trust Score Card */}
          <div className="group relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-3xl opacity-30 group-hover:opacity-50 blur-lg transition-all duration-300"></div>

            <div className="relative bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 px-8 py-5 rounded-3xl shadow-2xl min-w-[220px]">
              <div className="flex items-center gap-4">
                {/* Animated circular progress */}
                <div className="relative w-16 h-16">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-700"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                    <path
                      className="text-emerald-400 animate-dash"
                      strokeLinecap="round"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-emerald-400 font-bold text-sm">98%</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.15em] text-slate-400 mb-1">Network Trust Score</p>
                  <p className="text-white font-bold text-lg leading-tight">Highly Trusted<br />Origin</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics & Exception Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* SLA Compliance Chart */}
          <div className="lg:col-span-2 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-lg font-black text-white mb-6 flex items-center gap-3">
              <div className="p-2 bg-indigo-500/20 rounded-lg border border-indigo-500/30">
                <Activity className="w-5 h-5 text-indigo-400" />
              </div>
              SLA Compliance & Exceptions
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analyticsData}>
                  <defs>
                    <linearGradient id="colorCompliance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorAnomalies" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#374151" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 13}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 13}} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '16px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      background: 'rgba(17, 24, 39, 0.95)',
                      backdropFilter: 'blur(12px)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                      color: '#fff'
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="compliance"
                    stroke="#818cf8"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorCompliance)"
                    name="Compliance %"
                  />
                  <Area
                    type="monotone"
                    dataKey="tempAnomalies"
                    stroke="#f43f5e"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorAnomalies)"
                    name="Temp Anomalies"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Active Exceptions */}
          <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl flex flex-col animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <h3 className="text-lg font-black text-white mb-6 flex items-center gap-3">
              <div className="p-2 bg-amber-500/20 rounded-lg border border-amber-500/30">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              </div>
              Active Exceptions
            </h3>
            <div className="space-y-3 flex-1">
              {[
                { severity: 'CRITICAL', msg: 'Temp breach (-5°C) on 102', status: 'UNRESOLVED', color: 'rose' },
                { severity: 'WARNING', msg: 'Missing QA Document for 110', status: 'PENDING', color: 'amber' },
                { severity: 'INFO', msg: 'Transporter delayed by 2 hours', status: 'ACKNOWLEDGED', color: 'blue' }
              ].map((alert, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-slate-700/50 border border-slate-600/50 hover:bg-slate-700/70 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-[10px] font-black tracking-widest px-3 py-1 rounded-full ${
                      alert.color === 'rose' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                      alert.color === 'amber' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    }`}>
                      {alert.severity}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{alert.status}</span>
                  </div>
                  <p className="text-sm font-medium text-slate-200">{alert.msg}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-indigo-500/25 transform hover:-translate-y-0.5">
              Resolve All
            </button>
          </div>
        </div>

        {/* 15 Features Grid */}
        <div className="relative animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          {/* Section Header */}
          <div className="mb-8 text-center">
            <h3 className="text-2xl lg:text-3xl font-black text-white mb-3 tracking-tight">
              Advanced Producer Capabilities
              <span className="block text-sm font-normal text-slate-400 mt-2 tracking-wider uppercase">15 Professional Modules</span>
            </h3>
            <p className="text-slate-300 max-w-2xl mx-auto">Comprehensive toolset for origin-point verification and logistics orchestration</p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {producerFeatures.map((feat, i) => {
              const gradientClass = iconStyles[i % iconStyles.length];
              const textColorClass = textColors[i % textColors.length];
              const borderColorClass = borderColors[i % borderColors.length];

              return (
                <div
                  key={i}
                  onClick={() => navigate(feat.path)}
                  className="group relative p-6 rounded-2xl cursor-pointer bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-300 ease-out hover:scale-[1.03] hover:-translate-y-1 before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {/* Icon container */}
                  <div className={`
                    relative z-10 w-12 h-12 rounded-xl mb-4 flex items-center justify-center border
                    bg-gradient-to-br ${gradientClass}
                    ${borderColorClass}
                    ${textColorClass}
                    group-hover:scale-110 group-hover:rotate-3
                    transition-all duration-300 ease-out
                    shadow-lg group-hover:shadow-xl
                  `}>
                    <feat.icon className="w-6 h-6" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h4 className="font-bold text-white text-sm mb-2 leading-tight group-hover:text-indigo-300 transition-colors">
                      {feat.name}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
                  </div>

                  {/* Hover glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 pointer-events-none"></div>

                  {/* Corner accent */}
                  <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
>>>>>>> Stashed changes
};

export default ProducerDashboard;
