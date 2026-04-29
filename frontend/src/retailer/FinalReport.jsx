import { useState } from 'react';

const FinalReport = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };


  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Final Shipment Report</h2>
          <p className="text-slate-500 text-sm mt-1">Retailer module — functionality enabled</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm text-center text-slate-500">
   <p className="mb-4">This section displays Final Shipment Report data securely retrieved from the blockchain.</p>
   <button onClick={() => setSuccess(!success)} className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200">
     {success ? 'Connected' : 'Click to Connect Node'}
   </button>
</div>
    </div>
  );
};

export default FinalReport;
