import { useEffect, useState } from "react";
import Map from "../../components/Map";
import { db, auth } from "../../firebase";
import { doc, getDoc, addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { LatLngLiteral } from "leaflet";
import { useTheme } from "../../contexts/ThemeContext";
import { getThemeColors } from "../../utils/theme";

interface Geofence {
  lat: number;
  lng: number;
  radius: number;
}

export default function EmployeeDashboard() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const [position, setPosition] = useState<LatLngLiteral | null>(null);
  const [geofence, setGeofence] = useState<Geofence | null>(null);
  const [inside, setInside] = useState<boolean>(false);
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [loadingAttendance, setLoadingAttendance] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setPosition({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });

    const fetchGeofence = async () => {
      const geofenceDoc = await getDoc(doc(db, "geofence", "office"));
      setGeofence(geofenceDoc.data());
    };
    fetchGeofence();

    checkAttendanceStatus();
  }, []);

  useEffect(() => {
    if(position && geofence) {
      const d = distance(position.lat, position.lng, geofence.lat, geofence.lng);
      setInside(d <= geofence.radius);
    }
  }, [position, geofence]);

  const checkAttendanceStatus = async () => {
    if (!auth.currentUser?.uid) {
      console.log("No user logged in");
      setLoadingAttendance(false);
      return;
    }

    setLoadingAttendance(true);
    try {
      const today = new Date().toDateString();
      const q = query(
        collection(db, "attendance"),
        where("uid", "==", auth.currentUser.uid),
        where("date", "==", today)
      );
      const querySnapshot = await getDocs(q);
      console.log("Attendance check - records found:", querySnapshot.size);

      if (!querySnapshot.empty) {
        setAttendanceMarked(true);
      } else {
        setAttendanceMarked(false);
      }
    } catch (error) {
      console.error("Error checking attendance:", error);
      setAttendanceMarked(false);
    } finally {
      setLoadingAttendance(false);
    }
  };

  const distance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371000;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  const markAttendance = async () => {
    if (!position) return;

    const attendanceData = {
      uid: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      date: new Date().toDateString(),
      timestamp: new Date(),
      lat: position.lat,
      lng: position.lng,
      status: "Present"
    };

    console.log("Marking attendance with data:", attendanceData);

    await addDoc(collection(db, "attendance"), attendanceData);
    setAttendanceMarked(true);
    alert("Attendance marked successfully!");

    // Wait till attendance is saved 
    setTimeout(() => {
      checkAttendanceStatus();
    }, 1000);
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        <div className="p-5 shadow-md" style={{ borderRadius: "4px", background: colors.bgCard }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 flex items-center justify-center" style={{ background: inside ? colors.accent : colors.borderSecondary, borderRadius: "4px" }}>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "white" }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs" style={{ color: colors.textSecondary }}>Status</p>
              <p className={`text-base font-bold`} style={{ color: inside ? colors.accent : "#EF4444" }}>
                {inside ? "Inside Geofence" : "Outside Geofence"}
              </p>
            </div>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: colors.bgSecondary }}>
            <div className={`h-full transition-all duration-500 ${inside ? "w-full" : "w-1/4"}`} style={{ background: inside ? colors.accent : "#EF4444" }}></div>
          </div>
        </div>

        <div className="p-5 shadow-md" style={{ borderRadius: "4px", background: colors.bgCard }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 flex items-center justify-center" style={{ background: colors.borderSecondary, borderRadius: "4px" }}>
              <svg className="w-5 h-5" style={{ color: colors.textPrimary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <div>
              <p className="text-xs" style={{ color: colors.textSecondary }}>Your Location</p>
              <p className="font-mono text-xs font-medium" style={{ color: colors.textPrimary }}>
                {position ? `${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}` : "Locating..."}
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 shadow-md" style={{ borderRadius: "4px", background: colors.bgCard }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 flex items-center justify-center" style={{ background: colors.accent, borderRadius: "4px" }}>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "white" }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs" style={{ color: colors.textSecondary }}>Today's Date</p>
              <p className="font-medium text-xs" style={{ color: colors.textPrimary }}>{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
            </div>
          </div>
          <button
            disabled={!inside || attendanceMarked || loadingAttendance}
            onClick={markAttendance}
            className={`w-full text-white py-3 font-semibold transition-all duration-200 text-sm ${!inside || attendanceMarked ? "cursor-not-allowed opacity-50" : "hover:opacity-80"}`}
            style={{ background: (inside && !attendanceMarked) ? colors.accent : colors.borderSecondary, borderRadius: "4px" }}
          >
            {loadingAttendance ? "Loading..." : attendanceMarked ? "✓ Marked" : "Mark Attendance"}
          </button>
        </div>
      </div>

      <div className="p-5 shadow-md" style={{ borderRadius: "4px", background: colors.bgCard }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 flex items-center justify-center" style={{ background: colors.accent, borderRadius: "4px" }}>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "white" }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <div>
            <h2 className="text-base font-bold" style={{ color: colors.textPrimary }}>Live Location Map</h2>
            <p className="text-xs" style={{ color: colors.textSecondary }}>View your current position and geofence area</p>
          </div>
        </div>

        <div className="h-[450px] overflow-hidden border-2 shadow-inner" style={{ borderColor: colors.borderSecondary, borderRadius: "4px" }}>
          {position && geofence ? (
            <Map center={position} geofence={geofence} />
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ background: colors.bgSecondary }}>
              <div className="text-center">
                <div className="w-12 h-12 border-4 rounded-full animate-spin mx-auto mb-3" style={{ borderColor: colors.accent, borderRightColor: "transparent" }}></div>
                <p className="text-sm" style={{ color: colors.textSecondary }}>Loading map...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
