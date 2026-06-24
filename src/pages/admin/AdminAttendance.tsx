import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useTheme } from "../../contexts/ThemeContext";
import { getThemeColors } from "../../utils/theme";

interface User {
  id: string;
  email: string;
  role: string;
}

interface AttendanceRecord {
  id: string;
  uid: string;
  email: string;
  timestamp: Date;
  status: string;
}

export default function AdminAttendance() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const [users, setUsers] = useState<User[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(false);

  const fetchUsers = async () => {
    try {
      const usersRef = collection(db, "users");
      const snapshot = await getDocs(usersRef);
      const usersData: User[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.role === "employee") {
          usersData.push({
            id: doc.id,
            email: data.email,
            role: data.role,
          });
        }
      });
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const today = new Date().toDateString();
      const attendanceRef = collection(db, "attendance");
      const q = query(
        attendanceRef,
        where("date", "==", today)
      );
      const snapshot = await getDocs(q);
      const attendanceData: AttendanceRecord[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        attendanceData.push({
          id: doc.id,
          uid: data.uid,
          email: data.email || "",
          timestamp: data.timestamp?.toDate() || new Date(),
          status: data.status,
        });
      });
      attendanceData.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      setAttendance(attendanceData);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    } finally {
      setLoading(false);
      setInitialLoad(true);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchAttendance();
  }, []);

  return (
    <div className="p-6 space-y-5">
      <div className="p-5 shadow-md flex items-center justify-between" style={{ borderRadius: "4px", background: colors.bgCard }}>
        <div>
          <h1 className="text-xl font-bold" style={{ color: colors.textPrimary }}>Today's Attendance</h1>
          <p className="text-sm mt-0.5" style={{ color: colors.textSecondary }}>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <button
          onClick={fetchAttendance}
          className="px-6 py-2.5 text-white font-semibold shadow-md hover:opacity-90 transition-opacity text-sm"
          style={{ background: colors.accent, borderRadius: "4px" }}
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 shadow-md" style={{ borderRadius: "4px", background: colors.bgCard }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 flex items-center justify-center" style={{ background: colors.bgSecondary, borderRadius: "4px" }}>
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#16a34a" }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-xs" style={{ color: colors.textSecondary }}>Present</p>
              <p className="text-xl font-bold" style={{ color: colors.textPrimary }}>{new Set(attendance.map(a => a.uid)).size}</p>
            </div>
          </div>
        </div>
        <div className="p-5 shadow-md" style={{ borderRadius: "4px", background: colors.bgCard }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 flex items-center justify-center" style={{ background: colors.bgSecondary, borderRadius: "4px" }}>
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#dc2626" }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
              <p className="text-xs" style={{ color: colors.textSecondary }}>Absent</p>
              <p className="text-xl font-bold" style={{ color: colors.textPrimary }}>{users.length - new Set(attendance.map(a => a.uid)).size}</p>
            </div>
          </div>
        </div>
        <div className="p-5 shadow-md" style={{ borderRadius: "4px", background: colors.bgCard }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 flex items-center justify-center" style={{ background: colors.accent, borderRadius: "4px" }}>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "white" }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs" style={{ color: colors.textSecondary }}>Total Employees</p>
              <p className="text-xl font-bold" style={{ color: colors.textPrimary }}>{users.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="shadow-md overflow-hidden" style={{ borderRadius: "4px", background: colors.bgCard }}>
        {loading || !initialLoad ? (
          <div className="p-12 flex items-center justify-center">
            <div className="w-10 h-10 border-4 rounded-full animate-spin" style={{ borderColor: colors.accent, borderRightColor: "transparent" }}></div>
          </div>
        ) : users.length === 0 ? (
          <div className="p-12 text-center">
            <p style={{ color: colors.textSecondary }}>No employees found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b" style={{ background: colors.bgSecondary, borderColor: colors.borderSecondary }}>
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: colors.textSecondary }}>Employee</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: colors.textSecondary }}>Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: colors.textSecondary }}>Time</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: colors.borderSecondary }}>
                {users.map((user) => {
                  const presentAttendance = attendance.find(a => a.uid === user.id);
                  return (
                    <tr key={user.id} className="transition-colors" style={{ hover: { background: colors.bgSecondary } }}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold" style={{ background: colors.accent }}>
                            {user.email.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-sm" style={{ color: colors.textTertiary }}>{user.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {presentAttendance ? (
                          <span className="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit" style={{ background: colors.bgSecondary, color: "#16a34a" }}>
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Present
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit" style={{ background: colors.bgSecondary, color: "#dc2626" }}>
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            Absent
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {presentAttendance ? (
                          <span className="text-sm" style={{ color: colors.textTertiary }}>
                            {presentAttendance.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        ) : (
                          <span className="text-sm" style={{ color: colors.borderSecondary }}>-</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
