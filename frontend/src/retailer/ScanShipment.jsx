import { useState } from 'react';
import { ledger } from '../utils/blockchain';
<<<<<<< Updated upstream
import { ShieldCheck, Activity, MapPin, FileText, AlertTriangle, Search, Anchor } from 'lucide-react';
=======
import { ShieldCheck, Activity, MapPin, Truck, Warehouse, Store, AlertTriangle, FileText, CheckCircle2, Search, Anchor } from 'lucide-react';
>>>>>>> Stashed changes
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockSensorData = [
  { time: '10:00', temp: -70 }, { time: '11:00', temp: -72 }, { time: '12:00', temp: -69 },
  { time: '13:00', temp: -71 }, { time: '14:00', temp: -70 }, { time: '15:00', temp: -68 },
];

const ScanShipment = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [chainStatus, setChainStatus] = useState(null);

  const simulateScan = async () => {
    setIsScanning(true);
    try {
      const chain = await ledger.getChain();
      const txs = chain.filter(b => b.data && b.data.token);
      
      if (txs.length > 0) {
        const latest = txs[txs.length - 1].data;
        const isValid = await ledger.isChainValid();
        
        setTimeout(() => {
          setIsScanning(false);
          setScanResult(latest);
          setChainStatus(isValid ? 'VERIFIED' : 'TAMPERED');
        }, 1500);
      } else {
        setTimeout(() => {
          setIsScanning(false);
          setScanResult({ error: 'No shipment found on ledger' });
        }, 1500);
      }
<<<<<<< Updated upstream
    } catch (_error) {
      setIsScanning(false);
      setScanResult({ error: 'Failed to connect to blockchain network' });
    }
=======
       } catch {
         setIsScanning(false);
         setScanResult({ error: 'Failed to connect to blockchain network' });
       }
>>>>>>> Stashed changes
  };

  return (
    <div className="space-y-6 animate-fade-in-up pb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800">Final Verification Passport</h2>
          <p className="text-slate-500 font-medium mt-1">End-to-End Cryptographic Validation and Journey History.</p>
        </div>
      </div>
      
      {!scanResult ? (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-12 max-w-2xl mx-auto text-center mt-12">
          <div className="space-y-8">
            <div className="w-56 h-56 mx-auto border-4 border-dashed border-slate-200 rounded-3xl flex items-center justify-center bg-slate-50 relative overflow-hidden group">
              {isScanning ? (
                <div className="absolute inset-0 bg-teal-500/20 animate-pulse flex items-center justify-center">
                  <div className="w-full h-1 bg-teal-500 animate-[bounce_1s_infinite]"></div>
                </div>
              ) : (
                <div className="flex flex-col items-center opacity-50 group-hover:opacity-100 transition-opacity">
                  <Search className="w-10 h-10 text-teal-600 mb-2" />
                  <span className="text-teal-600 font-bold tracking-widest uppercase text-sm">Align QR Code</span>
                </div>
              )}
            </div>
            <button onClick={simulateScan} disabled={isScanning} className={`px-10 py-4 rounded-xl font-black tracking-wide text-white transition-all hover:-translate-y-1 ${isScanning ? 'bg-slate-400' : 'bg-gradient-to-r from-teal-600 to-teal-800 hover:shadow-xl hover:shadow-teal-600/30'}`}>
              {isScanning ? 'Validating Block Hashes...' : 'Simulate Scanner Input'}
            </button>
          </div>
        </div>
      ) : scanResult.error ? (
        <div className="text-red-500 font-bold p-8 bg-red-50 rounded-xl">{scanResult.error}</div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Main Verification Card */}
          <div className="xl:col-span-2 space-y-8">
            
            <div className={`p-8 rounded-3xl border-2 flex flex-col md:flex-row items-center gap-8 ${chainStatus === 'VERIFIED' ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
               <div className={`w-24 h-24 rounded-full flex items-center justify-center shrink-0 ${chainStatus === 'VERIFIED' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                 {chainStatus === 'VERIFIED' ? <ShieldCheck className="w-12 h-12" /> : <AlertTriangle className="w-12 h-12" />}
               </div>
               <div className="flex-1 text-center md:text-left">
                 <p className="text-sm font-black tracking-widest uppercase text-slate-500 mb-1">Blockchain Trust Verification</p>
                 <h3 className={`text-3xl font-black ${chainStatus === 'VERIFIED' ? 'text-emerald-800' : 'text-red-800'}`}>
                   {chainStatus === 'VERIFIED' ? 'AUTHENTIC & VERIFIED' : 'TAMPERED OR INVALID'}
                 </h3>
                 <p className="font-mono text-xs text-slate-600 mt-3 p-2 bg-white/50 rounded-lg inline-block border border-slate-200">
                   Token: {scanResult.token}
                 </p>
               </div>
               
               {/* Trust Score Gauge */}
               <div className="w-32 h-32 relative shrink-0">
                 <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-slate-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                    <path className={`${chainStatus === 'VERIFIED' ? 'text-emerald-500' : 'text-red-500'} animate-[dash_2s_ease-out_forwards]`} strokeDasharray={`${chainStatus === 'VERIFIED' ? '99' : '20'}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                   <span className="font-black text-xl text-slate-800">{chainStatus === 'VERIFIED' ? '99%' : '20%'}</span>
                   <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400 mt-1">Trust Score</span>
                 </div>
               </div>
            </div>

            {/* Document Integrity & Ledger Proof */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <h4 className="font-black text-slate-800 mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-teal-600" /> Document Integrity</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-sm font-medium text-slate-600">Origin Certificate</span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded">Hash Match</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-sm font-medium text-slate-600">Quality Assurance</span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded">Hash Match</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-sm font-medium text-slate-600">Customs Invoice</span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded">Hash Match</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <h4 className="font-black text-slate-800 mb-4 flex items-center gap-2"><Anchor className="w-5 h-5 text-teal-600" /> Ledger Proof</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-1">Transaction ID</p>
                    <p className="font-mono text-xs bg-slate-50 border border-slate-100 p-2 rounded-lg text-slate-700 truncate">0x8f2a...391e</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-1">Block Hash</p>
                    <p className="font-mono text-xs bg-slate-50 border border-slate-100 p-2 rounded-lg text-slate-700 truncate">0000abc1923f...</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-1">Consensus Nodes</p>
                    <div className="flex gap-1 mt-1">
                      {[1,2,3,4,5].map(n => <div key={n} className="w-2 h-2 rounded-full bg-emerald-500"></div>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sensor Intelligence Panel */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
               <h4 className="font-black text-slate-800 mb-6 flex items-center gap-2"><Activity className="w-5 h-5 text-teal-600" /> Sensor Intelligence Summary</h4>
               <div className="h-[250px]">
                 <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={mockSensorData}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} domain={[-80, -60]} />
                     <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                     <Line type="monotone" dataKey="temp" stroke="#0d9488" strokeWidth={3} dot={{ fill: '#0d9488', strokeWidth: 2 }} activeDot={{ r: 8 }} />
                   </LineChart>
                 </ResponsiveContainer>
               </div>
            </div>

          </div>

          {/* Right Column: Real-Time Timeline */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
             <h3 className="text-lg font-black text-slate-800 mb-8 flex items-center gap-2"><MapPin className="w-5 h-5 text-teal-600"/> Custody Timeline</h3>
             
             <div className="relative border-l-2 border-slate-100 ml-4 space-y-10 pb-4">
               {/* Genesis Event */}
               <div className="relative pl-8">
                 <div className="absolute -left-3.5 top-1 w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                   <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full"></div>
                 </div>
                 <p className="text-xs font-bold text-slate-400 mb-1">08:00 AM • Origin Facility</p>
                 <h4 className="font-bold text-slate-800">Shipment Initialized</h4>
                 <p className="text-sm text-slate-500 mt-1">Token generated and anchored by Producer QA.</p>
               </div>

               {/* Transport Event */}
               <div className="relative pl-8">
                 <div className="absolute -left-3.5 top-1 w-7 h-7 bg-amber-100 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                   <div className="w-2.5 h-2.5 bg-amber-500 rounded-full"></div>
                 </div>
                 <p className="text-xs font-bold text-slate-400 mb-1">09:15 AM • Route 66</p>
                 <h4 className="font-bold text-slate-800">Handoff to Transporter</h4>
                 <p className="text-sm text-slate-500 mt-1">IoT sensors activated. Telemetry sync started.</p>
               </div>

               {/* Warehouse Event */}
               <div className="relative pl-8">
                 <div className="absolute -left-3.5 top-1 w-7 h-7 bg-cyan-100 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                   <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full"></div>
                 </div>
                 <p className="text-xs font-bold text-slate-400 mb-1">01:30 PM • Hub Delta</p>
                 <h4 className="font-bold text-slate-800">Cold Storage Entry</h4>
                 <p className="text-sm text-slate-500 mt-1">SLA compliant throughout transit. Stored in Zone C.</p>
               </div>

               {/* Retail Event */}
               <div className="relative pl-8">
                 <div className="absolute -left-3.5 top-1 w-7 h-7 bg-teal-100 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                   <div className="w-2.5 h-2.5 bg-teal-500 rounded-full animate-pulse"></div>
                 </div>
                 <p className="text-xs font-bold text-teal-600 mb-1">Current Status</p>
                 <h4 className="font-bold text-teal-800">Ready for Verification</h4>
                 <p className="text-sm text-slate-500 mt-1">Awaiting final retailer scan and acceptance.</p>
               </div>
             </div>

             <button onClick={() => setScanResult(null)} className="w-full mt-8 py-4 bg-slate-50 text-slate-600 font-black rounded-xl border border-slate-200 hover:bg-slate-100 hover:text-slate-800 transition-colors">
               Scan Another QR
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScanShipment;
