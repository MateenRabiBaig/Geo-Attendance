import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useTheme } from "../../contexts/ThemeContext";
import { getThemeColors } from "../../utils/theme";

interface User {
  id: string;
  email: string;
  role: string;
}

export default function AdminUsers() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 space-y-5">
      <div className="p-5 shadow-md flex items-center justify-between" style={{ borderRadius: "4px", background: colors.bgCard }}>
        <div>
          <h1 className="text-xl font-bold" style={{ color: colors.textPrimary }}>Employee Management</h1>
          <p className="text-sm mt-0.5" style={{ color: colors.textSecondary }}>View and manage all employees</p>
        </div>
        <button
          onClick={fetchUsers}
          className="px-6 py-2.5 text-white font-semibold shadow-md hover:opacity-90 transition-opacity text-sm"
          style={{ background: colors.accent, borderRadius: "4px" }}
        >
          Refresh
        </button>
      </div>

      <div className="shadow-md overflow-hidden" style={{ borderRadius: "4px", background: colors.bgCard }}>
        {loading ? (
          <div className="p-12 flex items-center justify-center">
            <div className="w-10 h-10 border-4 rounded-full animate-spin" style={{ borderColor: colors.accent, borderRightColor: "transparent" }}></div>
          </div>
        ) : users.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: colors.borderSecondary }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <p style={{ color: colors.textSecondary }}>No employees found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b" style={{ background: colors.bgSecondary, borderColor: colors.borderSecondary }}>
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: colors.textSecondary }}>Employee</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: colors.textSecondary }}>Email</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: colors.textSecondary }}>Role</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: colors.borderSecondary }}>
                {users.map((user) => (
                  <tr key={user.id} className="transition-colors" style={{ hover: { background: colors.bgSecondary } }}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold" style={{ background: colors.accent }}>
                          {user.email.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-sm" style={{ color: colors.textPrimary }}>Employee</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm" style={{ color: colors.textTertiary }}>{user.email}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: colors.bgSecondary, color: colors.accent }}>
                        {user.role}
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
  );
}
