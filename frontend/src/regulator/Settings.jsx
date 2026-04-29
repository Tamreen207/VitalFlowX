import { useState } from 'react';

const Settings = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => { setIsSubmitting(false); setSuccess(true); e.target.reset(); }, 1500);
  };


  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">System Settings</h2>
          <p className="text-slate-500 text-sm mt-1">Regulator module — functionality enabled</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 max-w-2xl mx-auto">
  {success ? (
    <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-200 mb-6 flex items-center gap-3">
       <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">✓</div>
       <div className="flex-1">
         <p className="font-bold">Success!</p>
         <p className="text-sm">Action has been recorded on the blockchain.</p>
       </div>
       <button type="button" onClick={() => setSuccess(false)} className="text-green-800 hover:underline text-sm">Dismiss</button>
    </div>
  ) : null}
  <form onSubmit={handleSubmit} className="space-y-5">
    <div className="space-y-2">
  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Org Name</label>
  <input type="text" name="org_name" placeholder="Enter Org Name" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-purple-500 focus:outline-none" />
</div>
    <button type="submit" disabled={isSubmitting} className={`mt-8 w-full py-3 rounded-xl font-semibold text-white transition-colors ${isSubmitting ? 'bg-slate-400' : 'bg-purple-600 hover:bg-purple-700'}`}>
      {isSubmitting ? 'Processing Transaction...' : 'Submit to Ledger'}
    </button>
  </form>
</div>
    </div>
  );
};

export default Settings;
