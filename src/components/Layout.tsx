import { useEffect, useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import SidebarFooter from "./SidebarFooter";
import { useTheme } from "../contexts/ThemeContext";
import { getThemeColors } from "../utils/theme";

interface NavItem {
  path: string;
  icon: string;
  label: string;
}

export default function Layout() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const colors = getThemeColors(theme);
  const [userRole, setUserRole] = useState<"admin" | "employee" | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserEmail(user.email || "");
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          const data = userDoc.data();
          const role = data?.role;
          setUserRole(role);
          setUserName(data?.name || (user.email?.split("@")[0] || "User"));
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showUserMenu]);

  const isActive = (path: string) => location.pathname === path;

  // Admin navigation
  const adminNavItems: NavItem[] = [
    { path: "/admin/home", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: "Dashboard" },
    { path: "/admin/users", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z", label: "Users" },
    { path: "/admin/geofence", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z", label: "Geofence" },
    { path: "/admin/attendance", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", label: "Attendance" },
    { path: "/admin/reports", icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", label: "Reports" },
    { path: "/admin/profile", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", label: "Profile" },
  ];

  // Employee navigation
  const employeeNavItems: NavItem[] = [
    { path: "/employee", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: "Dashboard" },
    { path: "/employee/profile", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", label: "Profile" },
    {path: "/employee/reports", icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", label: "Reports"}
  ];

  const navItems = userRole === "admin" ? adminNavItems : employeeNavItems;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen" style={{ background: colors.bgPrimary }}>
        <div className="w-10 h-10 border-4 rounded-full animate-spin" style={{ borderColor: colors.accent, borderRightColor: "transparent" }}></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: colors.bgSecondary }}>
      {/* Navbar */}
      <nav
        className="px-6 py-3 flex items-center justify-between z-20 flex-shrink-0 border-b-2"
        style={{
          background: colors.bgCard,
          borderColor: colors.borderPrimary,
          borderBottom: `2px solid ${colors.borderPrimary}`
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center font-semibold" style={{ background: colors.accent, color: colors.accentText, borderRadius: "4px" }}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span className="text-xl font-bold" style={{ color: colors.textPrimary }}>Geo-Attendance</span>
        </div>
        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center transition-all hover:opacity-80"
            style={{ background: colors.bgTertiary, borderRadius: "4px" }}
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: colors.textPrimary }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: colors.textPrimary }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>

          <div className="user-menu-container relative">
            <div
              className="w-10 h-10 flex items-center justify-center font-semibold cursor-pointer transition-all hover:opacity-80"
              style={{ background: colors.accent, color: colors.accentText, borderRadius: "4px" }}
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              {(userEmail || "U").charAt(0).toUpperCase()}
            </div>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <div
                className="absolute right-0 mt-2 w-64 shadow-lg z-50"
                style={{ borderRadius: "4px", border: `1px solid ${colors.borderPrimary}`, background: colors.bgCard }}
              >
                <div className="p-4 border-b" style={{ borderColor: colors.borderSecondary }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 flex items-center justify-center font-semibold" style={{ background: colors.accent, color: colors.accentText, borderRadius: "4px" }}>
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate" style={{ color: colors.textPrimary }}>
                        {userName}
                      </p>
                      <p className="text-xs truncate" style={{ color: colors.textSecondary }}>
                        {userRole === "admin" ? "Administrator" : "Employee"}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs break-all" style={{ color: colors.textTertiary }}>
                    {userEmail}
                  </p>
                </div>
                <div className="p-2">
                  <Link
                    to={userRole === "admin" ? "/admin/profile" : "/employee/profile"}
                    className="flex items-center gap-3 px-3 py-2 rounded transition-colors"
                    style={{ borderRadius: "4px" }}
                    onMouseEnter={(e) => e.currentTarget.style.background = colors.bgTertiary}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    onClick={() => setShowUserMenu(false)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: colors.textSecondary }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-sm" style={{ color: colors.textPrimary }}>Profile Settings</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className="w-60 shadow-md flex flex-col py-5 px-3 border-r border-solid flex-shrink-0"
          style={{ background: colors.bgCard, borderColor: colors.borderSecondary }}
        >
          <div className="space-y-1 flex-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 ${
                  isActive(item.path)
                    ? ""
                    : ""
                }`}
                style={isActive(item.path)
                  ? { background: colors.accent, color: colors.accentText, borderRadius: "4px" }
                  : { borderRadius: "4px", color: colors.textPrimary }
                }
                onMouseEnter={(e) => {
                  if (!isActive(item.path)) {
                    e.currentTarget.style.background = colors.bgTertiary;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.path)) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" style={{ color: isActive(item.path) ? colors.accentText : colors.textPrimary }}>
                  <path
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d={item.icon}
                    stroke="currentColor"
                  />
                </svg>
                <span className="font-medium text-sm" style={{ color: isActive(item.path) ? colors.accentText : colors.textPrimary }}>{item.label}</span>
              </Link>
            ))}
          </div>

          <SidebarFooter
            name={userRole === "admin" ? "Admin" : "Employee"}
            email={userEmail}
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
