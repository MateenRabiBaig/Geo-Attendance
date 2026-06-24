import { Navigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useTheme } from "../contexts/ThemeContext";
import { getThemeColors } from "../utils/theme";

interface Props {
  children: React.JSX.Element;
  requiredRole?: "admin" | "employee";
}

export default function ProtectedRoute({ children, requiredRole }: Props) {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setAuthorized(false);
        setLoading(false);
        return;
      }

      if (requiredRole) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          const userRole = userDoc.data()?.role;
          setAuthorized(userRole === requiredRole);
        } catch (error) {
          console.error("Error checking user role:", error);
          setAuthorized(false);
        }
      } else {
        setAuthorized(true);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [requiredRole]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen" style={{ background: colors.bgPrimary }}>
        <div className="text-center">
          <div className="w-12 h-12 border-4 rounded-full animate-spin mx-auto mb-4" style={{ borderColor: colors.accent, borderRightColor: "transparent" }}></div>
          <p style={{ color: colors.textSecondary }}>Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return <Navigate to="/" replace />;
  }

  return children;
}
