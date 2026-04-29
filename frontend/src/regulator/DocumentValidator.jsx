import { useState } from 'react';
import { FileText, ShieldCheck, AlertTriangle, Upload, CheckCircle2, XCircle, Search, RefreshCw } from 'lucide-react';

const mockDocuments = [
  { id: 'DOC-001', name: 'Origin Certificate 102.pdf', uploader: 'Producer Admin', date: '2026-04-28', hash: '0x3f8a9e...1b2c', status: 'VERIFIED' },
  { id: 'DOC-002', name: 'Customs Invoice TR-55B.pdf', uploader: 'Transporter Lead', date: '2026-04-29', hash: '0x991bce...4d5f', status: 'VERIFIED' },
  { id: 'DOC-003', name: 'QA Inspection Report.pdf', uploader: 'Warehouse QA', date: '2026-04-29', hash: '0x1a2b3c...4d5e', status: 'TAMPERED' },
  { id: 'DOC-004', name: 'Vaccine Batch Details.csv', uploader: 'Producer Admin', date: '2026-04-28', hash: '0x5f6a7b...8c9d', status: 'VERIFIED' },
];

const DocumentValidator = () => {
  const [isUploading, setIsUploading] = useState(false);
  
  const handleSimulateValidate = () => {
    setIsUploading(true);
    setTimeout(() => setIsUploading(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in-up pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800">Document Integrity Report</h2>
          <p className="text-slate-500 font-medium mt-1">Regulator tool for comparing off-chain files against on-chain cryptographic hashes.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Upload Validator Panel */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6 text-indigo-600">
             {isUploading ? <RefreshCw className="w-10 h-10 animate-spin" /> : <Upload className="w-10 h-10" />}
          </div>
          <h3 className="text-xl font-black text-slate-800 mb-2">Validate File Integrity</h3>
          <p className="text-slate-500 text-sm mb-8">Upload a physical file. The system will generate its SHA-256 hash and compare it with the blockchain ledger.</p>
          
          <div className="w-full relative group cursor-pointer" onClick={handleSimulateValidate}>
            <div className="absolute inset-0 bg-indigo-600/5 border-2 border-dashed border-indigo-300 rounded-2xl group-hover:bg-indigo-600/10 transition-colors"></div>
            <div className="p-8 relative z-10 flex flex-col items-center">
               <span className="font-bold text-indigo-600">Drag & Drop File Here</span>
               <span className="text-xs text-slate-400 mt-2">or click to browse</span>
            </div>
          </div>
        </div>

        {/* Recent Validations */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
           <div className="flex justify-between items-center mb-6">
             <h3 className="text-lg font-black text-slate-800 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-indigo-500"/> Hash Status Ledger</h3>
             <div className="relative">
               <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
               <input type="text" placeholder="Search hash or doc ID..." className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-64" />
             </div>
           </div>

           <div className="overflow-x-auto">
             <table className="w-full text-left text-sm">
               <thead className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                 <tr>
                   <th className="pb-3 px-4">Document</th>
                   <th className="pb-3 px-4">Ledger Hash</th>
                   <th className="pb-3 px-4">Date / Source</th>
                   <th className="pb-3 px-4 text-right">Integrity Status</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                 {mockDocuments.map((doc, i) => (
                   <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                     <td className="py-4 px-4">
                       <div className="flex items-center gap-3">
                         <FileText className={`w-5 h-5 ${doc.status === 'VERIFIED' ? 'text-slate-400' : 'text-red-400'}`} />
                         <div>
                           <p className="font-bold text-slate-800">{doc.name}</p>
                           <p className="text-xs text-slate-500">{doc.id}</p>
                         </div>
                       </div>
                     </td>
                     <td className="py-4 px-4 font-mono text-xs text-slate-600 bg-slate-50 rounded px-2">{doc.hash}</td>
                     <td className="py-4 px-4">
                       <p className="text-slate-800">{doc.date}</p>
                       <p className="text-xs text-slate-500">{doc.uploader}</p>
                     </td>
                     <td className="py-4 px-4 text-right">
                       <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black tracking-widest ${doc.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                         {doc.status === 'VERIFIED' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                         {doc.status}
                       </span>
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

export default DocumentValidator;
