const ColdMonitoring = () => {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Cold Chain Monitoring</h2>
          <p className="text-slate-500 text-sm mt-1">Warehouse module — blockchain verified</p>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="space-y-3">
          {[
            {t:'16:45',v:92,c:'teal'}, {t:'16:30',v:88,c:'teal'}, {t:'16:15',v:95,c:'teal'},
            {t:'16:00',v:85,c:'teal'}, {t:'15:45',v:90,c:'teal'}, {t:'15:30',v:87,c:'teal'}
          ].map((point, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="text-xs text-slate-500 w-12 font-mono">{point.t}</span>
              <div className="flex-1 bg-slate-100 rounded-full h-3">
                <div className={`bg-teal-500 h-3 rounded-full transition-all duration-500`} style={{width: point.v + '%'}}></div>
              </div>
              <span className="text-xs font-semibold text-slate-700 w-10 text-right">{point.v}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColdMonitoring;
