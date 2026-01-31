import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin, X, Activity, Droplets, Thermometer, Wind } from "lucide-react";
import L from "leaflet";
import Gauge from "../components/Gauge";

// Fix for default Leaflet icon issues in React
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom Marker styling would be better with DivIcon, but sticking to basics for stability first.

const stations = [
  {
    id: 1,
    name: "Station Alpha",
    lat: 18.5204,
    lng: 73.8567,
    status: "safe",
    wqi: 92,
    pH: 7.2,
    tur: 1.5,
    temp: 28,
  },
  {
    id: 2,
    name: "Industrial Zone B",
    lat: 18.5304,
    lng: 73.8467,
    status: "warning",
    wqi: 75,
    pH: 8.1,
    tur: 3.5,
    temp: 32,
  },
  {
    id: 3,
    name: "River Outlet X",
    lat: 18.5104,
    lng: 73.8667,
    status: "critical",
    wqi: 45,
    pH: 9.3,
    tur: 6.8,
    temp: 35,
  },
];

const MapView = () => {
  const [selectedStation, setSelectedStation] = useState(null);

  return (
    <div className="glass-panel p-0 overflow-hidden flex h-[calc(100vh-140px)] relative">
      {/* Map Area */}
      <div className="flex-1 relative h-full">
        <div className="absolute top-4 left-4 z-[400] glass-panel p-3">
          <h2 className="text-lg font-bold">Network Status</h2>
          <div className="flex gap-4 text-sm mt-2">
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-success shadow-[0_0_10px_var(--color-success)]"></span>{" "}
              Safe
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-warning shadow-[0_0_10px_var(--color-warning)]"></span>{" "}
              Warning
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-danger shadow-[0_0_10px_var(--color-danger)]"></span>{" "}
              Critical
            </div>
          </div>
        </div>

        <MapContainer
          center={[18.5204, 73.8567]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          {stations.map((station) => (
            <Marker
              key={station.id}
              position={[station.lat, station.lng]}
              eventHandlers={{
                click: () => {
                  setSelectedStation(station);
                },
              }}
            ></Marker>
          ))}
        </MapContainer>
      </div>

      {/* Slide-in Panel */}
      <div
        className={`absolute top-0 right-0 h-full w-[350px] glass-panel border-l border-white/10 z-[500] transition-transform duration-300 transform ${selectedStation ? "translate-x-0" : "translate-x-full"}`}
        style={{ borderRadius: "0", background: "rgba(11, 15, 25, 0.95)" }}
      >
        {selectedStation && (
          <div className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {selectedStation.name}
                </h2>
                <span
                  className={`inline-block px-2 py-1 rounded text-xs font-bold mt-2 ${
                    selectedStation.status === "safe"
                      ? "bg-success/20 text-success"
                      : selectedStation.status === "warning"
                        ? "bg-warning/20 text-warning"
                        : "bg-danger/20 text-danger"
                  }`}
                >
                  {selectedStation.status.toUpperCase()}
                </span>
              </div>
              <button
                onClick={() => setSelectedStation(null)}
                className="text-muted hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6 overflow-y-auto flex-1">
              {/* Mini Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-muted text-xs mb-1">
                    <Activity size={12} /> WQI
                  </div>
                  <div className="text-xl font-bold">{selectedStation.wqi}</div>
                </div>
                <div className="bg-white/5 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-muted text-xs mb-1">
                    <Thermometer size={12} /> Temp
                  </div>
                  <div className="text-xl font-bold">
                    {selectedStation.temp}°C
                  </div>
                </div>
              </div>

              {/* Gauges */}
              <div className="bg-white/5 p-4 rounded-lg">
                <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                  <Droplets size={14} className="text-primary" /> Live
                  Parameters
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted">pH Level</span>
                      <span
                        className={
                          selectedStation.pH > 8.5
                            ? "text-warning"
                            : "text-success"
                        }
                      >
                        {selectedStation.pH}
                      </span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${selectedStation.pH > 8.5 ? "bg-warning" : "bg-success"}`}
                        style={{ width: `${(selectedStation.pH / 14) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted">Turbidity</span>
                      <span
                        className={
                          selectedStation.tur > 5
                            ? "text-danger"
                            : "text-success"
                        }
                      >
                        {selectedStation.tur} NTU
                      </span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${selectedStation.tur > 5 ? "bg-danger" : "bg-success"}`}
                        style={{
                          width: `${(selectedStation.tur / 10) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full py-3 bg-primary text-black font-bold rounded-lg hover:bg-primary-hover transition-colors shadow-[0_0_15px_var(--color-primary-dim)]">
                Full Analytics Report
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default MapView;
