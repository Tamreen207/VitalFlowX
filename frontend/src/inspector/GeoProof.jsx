import { useState } from 'react';

import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import { MapPin, CheckCircle, AlertTriangle, Shield } from 'lucide-react';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const checkpoints = [
  { id: 'CP-001', name: 'NYC Distribution Hub', lat: 40.7128, lng: -74.006, status: 'verified', lastCheck: '2026-04-29 14:22', inspector: 'John Doe' },
  { id: 'CP-002', name: 'Boston General Warehouse', lat: 42.3601, lng: -71.0589, status: 'verified', lastCheck: '2026-04-29 11:05', inspector: 'Jane Smith' },
  { id: 'CP-003', name: 'Philadelphia Relay Point', lat: 39.9526, lng: -75.1652, status: 'pending', lastCheck: 'Awaiting', inspector: 'Unassigned' },
  { id: 'CP-004', name: 'Chicago Cold Storage', lat: 41.8781, lng: -87.6298, status: 'flagged', lastCheck: '2026-04-28 09:30', inspector: 'Mike Chen' },
];

const geofenceZones = [
  { name: 'NYC Zone', coords: [[40.73, -74.02], [40.73, -73.98], [40.70, -73.98], [40.70, -74.02]], color: '#10b981' },
  { name: 'Boston Zone', coords: [[42.38, -71.08], [42.38, -71.04], [42.34, -71.04], [42.34, -71.08]], color: '#10b981' },
  { name: 'Chicago Zone', coords: [[41.90, -87.65], [41.90, -87.61], [41.86, -87.61], [41.86, -87.65]], color: '#ef4444' },
];

const GeoProof = () => {
  const [selected, setSelected] = useState(null);
  const center = [40.7, -75.5];

  const statusConfig = {
    verified: { color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle, iconColor: 'text-emerald-500' },
    pending: { color: 'bg-amber-100 text-amber-700', icon: AlertTriangle, iconColor: 'text-amber-500' },
    flagged: { color: 'bg-red-100 text-red-700', icon: AlertTriangle, iconColor: 'text-red-500' },
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Geo-Proof Verification</h2>
          <p className="text-slate-500 text-sm mt-1">Blockchain-anchored geographic checkpoints & geofence zones</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-red-50 rounded-xl border border-red-200">
          <Shield className="w-4 h-4 text-red-600" />
          <span className="text-sm font-semibold text-red-700">Inspector Mode</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden" style={{height: '500px'}}>
          <MapContainer center={center} zoom={6} style={{height: '100%', width: '100%'}} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {geofenceZones.map((zone, i) => (
              <Polygon key={i} positions={zone.coords} pathOptions={{ color: zone.color, fillOpacity: 0.15, weight: 2 }} />
            ))}
            {checkpoints.map((cp, i) => (
              <Marker key={i} position={[cp.lat, cp.lng]} eventHandlers={{ click: () => setSelected(cp) }}>
                <Popup>
                  <div className="text-center">
                    <p className="font-bold text-sm">{cp.name}</p>
                    <p className="text-xs capitalize mt-1">{cp.status}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-slate-800 flex items-center gap-2"><MapPin className="w-4 h-4" /> Checkpoints</h3>
          {checkpoints.map((cp, i) => {
            const cfg = statusConfig[cp.status];
            return (
              <div
                key={i}
                onClick={() => setSelected(cp)}
                className={`bg-white rounded-xl p-4 border cursor-pointer transition-all duration-200 ${
                  selected?.id === cp.id ? 'border-red-300 bg-red-50/30 shadow-md' : 'border-slate-100 hover:border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-slate-800">{cp.id}</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${cfg.color}`}>{cp.status}</span>
                </div>
                <p className="text-sm text-slate-700">{cp.name}</p>
                <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
                  <span>Inspector: {cp.inspector}</span>
                  <span>{cp.lastCheck}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GeoProof;
