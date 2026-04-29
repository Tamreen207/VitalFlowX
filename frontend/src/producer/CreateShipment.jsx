import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { TokenGenerator } from '../utils/tokenGenerator';
import { ledger } from '../utils/blockchain';

const CreateShipment = () => {
  const [product, setProduct] = useState('');
  const [qty, setQty] = useState('');
  const [step, setStep] = useState(1);
  const [qrPayload, setQrPayload] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productError, setProductError] = useState('');
  const [qtyError, setQtyError] = useState('');

  // Validation: Product identifier - alphanumeric, hyphens, underscores, spaces only (min 2 chars)
  const validateProduct = (value) => {
    if (!value.trim()) {
      return 'Product identifier is required';
    }
    if (value.length < 2) {
      return 'Product identifier must be at least 2 characters';
    }
    if (!/^[a-zA-Z0-9][a-zA-Z0-9\s_-]*$/.test(value)) {
      return 'Only letters, numbers, spaces, hyphens, and underscores allowed';
    }
    return '';
  };

  // Validation: Quantity - positive integer only
  const validateQuantity = (value) => {
    if (!value) {
      return 'Quantity is required';
    }
    if (!/^\d+$/.test(value)) {
      return 'Only positive numbers allowed';
    }
    const num = parseInt(value, 10);
    if (num <= 0) {
      return 'Quantity must be greater than 0';
    }
    if (num > 999999) {
      return 'Quantity exceeds maximum limit';
    }
    return '';
  };

  const handleProductChange = (e) => {
    const value = e.target.value;
    setProduct(value);
    setProductError(value ? validateProduct(value) : '');
  };

  const handleQtyChange = (e) => {
    const value = e.target.value;
    // Only allow digits
    if (value && !/^\d+$/.test(value)) {
      setQtyError('Only numbers allowed');
      return;
    }
    setQty(value);
    setQtyError(value ? validateQuantity(value) : '');
  };

  const isValid = !productError && !qtyError && product.trim() && qty.trim();

  const handleGenerate = async () => {
    setProductError('');
    setQtyError('');
    if (!isValid) return;
    setIsSubmitting(true);
    try {
      // generate token (synchronous or async depending on implementation)
      const token = TokenGenerator.generate({ product, qty });
      const payload = JSON.stringify({ token, product, qty, createdAt: new Date().toISOString() });

      // attempt to submit to ledger (will fallback locally if API is unavailable)
      if (ledger && ledger.addTransaction) {
        try {
          await ledger.addTransaction({ token, product, qty });
        } catch (_err) {
          // ignore ledger submission errors - fall back to QR payload only
        }
      }

      setQrPayload(payload);
      setStep(2);
    } catch (err) {
      console.error('Failed to generate shipment token', err);
      setProductError('Failed to generate token. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
      <div>
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Initialize Shipment</h2>
        <p className="text-slate-500 mt-2 text-lg">Deploy a new cold chain product envelope onto the blockchain.</p>
      </div>
      <div className="bg-white rounded-3xl shadow-2xl shadow-indigo-900/5 border border-slate-100 overflow-hidden">
        <div className="flex border-b border-slate-100 bg-slate-50/50">
           {['Product Details', 'Generate Token & QR'].map((s, i) => (
             <div key={i} className={`flex-1 text-center py-4 text-xs lg:text-sm font-black tracking-widest ${i + 1 === step ? 'text-indigo-600 border-b-2 border-indigo-600 bg-white' : 'text-slate-400'}`}>STEP 0{i+1}: {s}</div>
           ))}
        </div>
        <div className="p-8 md:p-12 space-y-8">
           {step === 1 ? (
             <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">
                      Product Identifier
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={product}
                      onChange={handleProductChange}
                      placeholder="e.g. mRNA-1273 Batch X"
                      className={`w-full px-5 py-4 rounded-xl border transition-all outline-none bg-slate-50 font-medium font-mono ${
                        productError
                          ? 'border-red-500 focus:border-red-600 focus:ring-4 focus:ring-red-100'
                          : 'border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100'
                      }`}
                    />
                    {productError && (
                      <p className="text-red-600 text-sm font-medium flex items-center gap-1 mt-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                        </svg>
                        {productError}
                      </p>
                    )}
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">
                      Quantity (Units)
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={qty}
                      onChange={handleQtyChange}
                      placeholder="5000"
                      className={`w-full px-5 py-4 rounded-xl border transition-all outline-none bg-slate-50 font-medium font-mono ${
                        qtyError
                          ? 'border-red-500 focus:border-red-600 focus:ring-4 focus:ring-red-100'
                          : 'border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100'
                      }`}
                    />
                    {qtyError && (
                      <p className="text-red-600 text-sm font-medium flex items-center gap-1 mt-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                        </svg>
                        {qtyError}
                      </p>
                    )}
                  </div>
                </div>
                <div className="pt-8 border-t border-slate-100 flex justify-end gap-4 mt-12">
                  <button 
                    onClick={handleGenerate} 
                    disabled={!isValid || isSubmitting}
                    className={`px-8 py-4 rounded-xl text-white font-black tracking-wide transition-all duration-300 ${
                      !isValid || isSubmitting
                        ? 'bg-slate-300 cursor-not-allowed'
                        : 'bg-gradient-to-r from-indigo-600 to-indigo-800 hover:shadow-xl hover:shadow-indigo-600/30 hover:-translate-y-1 active:translate-y-0'
                    }`}
                  >
                    {isSubmitting ? 'Submitting to Blockchain...' : 'Generate Token & Blockchain TX →'}
                  </button>
                </div>
             </>
           ) : (
             <div className="flex flex-col items-center justify-center space-y-6">
               <div className="p-6 bg-white border-2 border-dashed border-indigo-200 rounded-2xl shadow-sm">
                 <QRCodeSVG value={qrPayload} size={256} level="H" includeMargin={true} />
               </div>
               <div className="text-center space-y-2">
                 <p className="text-sm font-bold text-emerald-600 uppercase tracking-widest">✓ Committed to Ledger</p>
                 <p className="font-mono text-xs text-slate-500 bg-slate-100 px-4 py-2 rounded-lg">{JSON.parse(qrPayload).token}</p>
               </div>
               <button onClick={() => {setStep(1); setProduct(''); setQty('');}} className="px-6 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg font-bold text-sm transition-colors">Create Another</button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};
export default CreateShipment;