import { useEffect, useState } from "react";
import Map from "../../components/Map";
import { db } from "../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { LatLngLiteral } from "leaflet";
import { Navigate, useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { getThemeColors } from "../../utils/theme";

interface Geofence {
  lat: number;
  lng: number;
  radius: number;
}



export default function AdminGeofence() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const [center, setCenter] = useState<LatLngLiteral | null>(null);
  const [radius, setRadius] = useState<number>(200);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchGeofence = async () => {
      const snap = await getDoc(doc(db, "geofence", "office"));
      if (snap.exists()) {
        const data = snap.data() as Geofence;
        setCenter({ lat: data.lat, lng: data.lng });
        setRadius(data.radius);
      }
      setLoading(false);
    };
    fetchGeofence();
  }, []);

  const saveGeofence = async () => {
    if (!center) {
      alert("Please click on map to select center");
      return;
    }

    await setDoc(doc(db, "geofence", "office"), {
      lat: center.lat,
      lng: center.lng,
      radius,
    });
    navigate("/admin/home")

    alert("Geofence saved successfully");
    
  };

  return (
    <div className="p-6 space-y-5">
      <div className="p-5 shadow-md flex items-center justify-between" style={{ borderRadius: "4px", background: colors.bgCard }}>
        <div>
          <h1 className="text-xl font-bold" style={{ color: colors.textPrimary }}>Geofence Configuration</h1>
          <p className="text-gray-500 text-sm mt-0.5" style={{ color: colors.textSecondary }}>Manage office location and attendance radius</p>
        </div>
        <button
          onClick={saveGeofence}
          disabled={!center}
          className="px-6 py-2.5 text-white font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm hover:opacity-80"
          style={{ background: colors.accent, borderRadius: "4px" }}
        >
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-1 space-y-4">
          <div className="p-5 shadow-md" style={{ borderRadius: "4px", background: colors.bgCard }}>
            <label className="block text-sm font-bold mb-2" style={{ color: colors.textPrimary }}>Geofence Radius</label>
            <div className="relative">
              <input
                type="number"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="w-full px-4 py-3 border focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                style={{
                  borderRadius: "4px",
                  borderColor: colors.borderSecondary,
                  background: colors.inputBg,
                  color: colors.textPrimary
                }}
                placeholder="Radius in meters"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" style={{ color: colors.textTertiary }}>meters</span>
            </div>
            <p className="text-xs mt-2" style={{ color: colors.textSecondary }}>Recommended: 100-500 meters</p>
          </div>

          <div className="p-5 shadow-md" style={{ borderRadius: "4px", background: colors.bgCard }}>
            <label className="block text-sm font-bold mb-2" style={{ color: colors.textPrimary }}>Center Point</label>
            <div className="flex items-center gap-2 p-3 border" style={{ borderRadius: "4px", borderColor: colors.borderSecondary, background: colors.bgSecondary }}>
              <div className={`w-2.5 h-2.5 rounded-full ${center ? "bg-green-500" : "bg-gray-300"}`}></div>
              <span className="font-mono text-xs" style={{ color: colors.textTertiary }}>
                {center ? `${center.lat.toFixed(6)}, ${center.lng.toFixed(6)}` : "Not selected"}
              </span>
            </div>
            <p className="text-xs mt-2" style={{ color: colors.textSecondary }}>Click on the map to set the center point.</p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="p-2 shadow-md h-[480px] overflow-hidden relative" style={{ borderRadius: "4px", background: colors.bgCard }}>
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center z-10" style={{ background: colors.bgCard }}>
                <div className="w-10 h-10 border-4 rounded-full animate-spin" style={{ borderColor: colors.accent, borderRightColor: "transparent" }}></div>
              </div>
            ) : (
              <Map
                center={center}
                setCenter={setCenter}
                geofence={center ? { lat: center.lat, lng: center.lng, radius } : null}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
