import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useTheme } from "../../contexts/ThemeContext";
import { getThemeColors } from "../../utils/theme";

interface AttendanceRecord {
  id: string;
  date: string;
  timestamp: any;
  status: string;
}

export default function EmployeeReport() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyAttendance();
  }, []);

  const fetchMyAttendance = async () => {
    if (!auth.currentUser?.uid) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const attendanceRef = collection(db, "attendance");
      const q = query(attendanceRef, where("uid", "==", auth.currentUser.uid));
      const snapshot = await getDocs(q);
      const records: AttendanceRecord[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        records.push({
          id: doc.id,
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

  const stats = {
    total: attendanceRecords.length,
    present: attendanceRecords.filter((r) => r.status === "Present").length,
    thisMonth: attendanceRecords.filter((r) => {
      const date = r.timestamp.toDate();
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length,
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl">
        <div className="p-5 shadow-md" style={{ borderRadius: "4px", background: colors.bgCard }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 flex items-center justify-center" style={{ background: colors.accent, borderRadius: "4px" }}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "white" }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold" style={{ color: colors.textPrimary }}>My Attendance Report</h1>
              <p className="text-sm mt-0.5" style={{ color: colors.textSecondary }}>View your attendance history</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4" style={{ borderRadius: "4px", background: colors.bgSecondary }}>
              <p className="text-sm" style={{ color: colors.textSecondary }}>Total Days</p>
              <p className="text-2xl font-bold mt-1" style={{ color: colors.accent }}>{stats.total}</p>
            </div>
            <div className="p-4" style={{ borderRadius: "4px", background: colors.bgSecondary }}>
              <p className="text-sm" style={{ color: colors.textSecondary }}>Present</p>
              <p className="text-2xl font-bold mt-1" style={{ color: colors.textPrimary }}>{stats.present}</p>
            </div>
            <div className="p-4" style={{ borderRadius: "4px", background: colors.bgSecondary }}>
              <p className="text-sm" style={{ color: colors.textSecondary }}>This Month</p>
              <p className="text-2xl font-bold mt-1" style={{ color: colors.textPrimary }}>{stats.thisMonth}</p>
            </div>
          </div>

          {/* Records Table */}
          {loading ? (
            <div className="text-center py-8">
              <div className="w-10 h-10 border-4 rounded-full animate-spin mx-auto" style={{ borderColor: colors.accent, borderRightColor: "transparent" }}></div>
              <p className="mt-3" style={{ color: colors.textSecondary }}>Loading records...</p>
            </div>
          ) : attendanceRecords.length === 0 ? (
            <div className="text-center py-8">
              <p style={{ color: colors.textSecondary }}>No attendance records found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b" style={{ borderColor: colors.borderSecondary }}>
                    <th className="text-left py-3 px-4 font-bold text-sm" style={{ color: colors.textPrimary }}>Date</th>
                    <th className="text-left py-3 px-4 font-bold text-sm" style={{ color: colors.textPrimary }}>Time</th>
                    <th className="text-left py-3 px-4 font-bold text-sm" style={{ color: colors.textPrimary }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceRecords.map((record) => (
                    <tr key={record.id} className="border-b transition-colors" style={{ borderColor: colors.borderSecondary, hover: { background: colors.bgSecondary } }}>
                      <td className="py-3 px-4 text-sm" style={{ color: colors.textPrimary }}>{record.date}</td>
                      <td className="py-3 px-4 text-sm" style={{ color: colors.textPrimary }}>
                        {record.timestamp?.toDate()?.toLocaleString()}
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
