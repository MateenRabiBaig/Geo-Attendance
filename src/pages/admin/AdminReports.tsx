import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useTheme } from "../../contexts/ThemeContext";
import { getThemeColors } from "../../utils/theme";

interface AttendanceRecord {
  id: string;
  email: string;
  date: string;
  timestamp: any;
  status: string;
}

export default function AdminReports() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    fetchAttendanceRecords();
  }, []);

  const fetchAttendanceRecords = async () => {
    setLoading(true);
    try {
      const attendanceRef = collection(db, "attendance");
      const snapshot = await getDocs(attendanceRef);
      const records: AttendanceRecord[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        records.push({
          id: doc.id,
          email: data.email,
          date: data.date,
          timestamp: data.timestamp,
          status: data.status,
        });
      });
      // Sort by timestamp descending
      records.sort((a, b) => b.timestamp.toDate() - a.timestamp.toDate());
      setAttendanceRecords(records);
    } catch (error) {
      console.error("Error fetching attendance records:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRecords = filterDate
    ? attendanceRecords.filter((record) => record.date === filterDate)
    : attendanceRecords;

  const stats = {
    total: attendanceRecords.length,
    present: attendanceRecords.filter((r) => r.status === "Present").length,
    uniqueDays: new Set(attendanceRecords.map((r) => r.date)).size,
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl">
        <div className="p-5 shadow-md" style={{ borderRadius: "4px", background: colors.bgCard }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold" style={{ color: colors.textPrimary }}>Attendance Reports</h1>
              <p className="text-sm mt-0.5" style={{ color: colors.textSecondary }}>View all employee attendance records</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4" style={{ borderRadius: "4px", background: colors.bgSecondary }}>
              <p className="text-sm" style={{ color: colors.textSecondary }}>Total Records</p>
              <p className="text-2xl font-bold mt-1" style={{ color: colors.accent }}>{stats.total}</p>
            </div>
            <div className="p-4" style={{ borderRadius: "4px", background: colors.bgSecondary }}>
              <p className="text-sm" style={{ color: colors.textSecondary }}>Present Today</p>
              <p className="text-2xl font-bold mt-1" style={{ color: colors.textPrimary }}>{stats.present}</p>
            </div>
            <div className="p-4" style={{ borderRadius: "4px", background: colors.bgSecondary }}>
              <p className="text-sm" style={{ color: colors.textSecondary }}>Active Days</p>
              <p className="text-2xl font-bold mt-1" style={{ color: colors.textPrimary }}>{stats.uniqueDays}</p>
            </div>
          </div>

          {/* Filter */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" style={{ color: colors.textPrimary }}>Filter by Date</label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="px-4 py-2 border focus:outline-none transition-all"
              style={{ borderRadius: "4px", borderColor: colors.borderSecondary, background: colors.inputBg, color: colors.textPrimary }}
            />
          </div>

          {/* Records Table */}
          {loading ? (
            <div className="text-center py-8">
              <div className="w-10 h-10 border-4 rounded-full animate-spin mx-auto" style={{ borderColor: colors.accent, borderRightColor: "transparent" }}></div>
              <p className="mt-3" style={{ color: colors.textSecondary }}>Loading records...</p>
            </div>
          ) : filteredRecords.length === 0 ? (
            <div className="text-center py-8">
              <p style={{ color: colors.textSecondary }}>No attendance records found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b" style={{ borderColor: colors.borderSecondary }}>
                    <th className="text-left py-3 px-4 font-bold text-sm" style={{ color: colors.textPrimary }}>Email</th>
                    <th className="text-left py-3 px-4 font-bold text-sm" style={{ color: colors.textPrimary }}>Date</th>
                    <th className="text-left py-3 px-4 font-bold text-sm" style={{ color: colors.textPrimary }}>Time</th>
                    <th className="text-left py-3 px-4 font-bold text-sm" style={{ color: colors.textPrimary }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record) => (
                    <tr key={record.id} className="border-b transition-colors" style={{ borderColor: colors.borderSecondary, hover: { background: colors.bgSecondary } }}>
                      <td className="py-3 px-4 text-sm" style={{ color: colors.textPrimary }}>{record.email}</td>
                      <td className="py-3 px-4 text-sm" style={{ color: colors.textPrimary }}>{record.date}</td>
                      <td className="py-3 px-4 text-sm" style={{ color: colors.textPrimary }}>
                        {record.timestamp?.toDate()?.toLocaleTimeString()}
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium"
                          style={{ background: colors.bgSecondary, borderRadius: "4px", color: "#16a34a" }}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
