import React from 'react';
import { useNavigate } from 'react-router-dom';

const PickupEvent = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      alert('Pickup recorded successfully');
      navigate('/transporter');
    }, 500);
  };

  return (
    <div className="space-y-8 animate-fade-in-up pb-12">
      <h2 className="text-3xl font-black text-slate-800">Pickup Event</h2>
      <p className="text-slate-500">Capture cargo pickup details before departure.</p>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-1">Shipment ID</label>
          <input type="text" required className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g., 102" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-1">Origin Location</label>
          <input type="text" required className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Facility address" />
        </div>
        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-md transition-colors">
          Record Pickup
        </button>
      </form>
    </div>
  );
};

export default PickupEvent;
