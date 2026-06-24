import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { getThemeColors } from "../utils/theme";

interface Props {
  name: string;
  email: string;
}

export default function SidebarFooter({ name, email }: Props) {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="mt-auto pt-4 border-t border-solid" style={{ borderColor: colors.borderSecondary }}>
      <div className="flex items-center gap-3 px-4 py-3">
        <div
          className="w-10 h-10 flex items-center justify-center font-semibold"
          style={{ background: colors.accent, color: colors.accentText, borderRadius: "4px" }}
        >
          {name.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate" style={{ color: colors.textPrimary }}>
            {name}
          </p>
          <p className="text-xs truncate" style={{ color: colors.textTertiary }}>{email}</p>
        </div>
      </div>

      <button
        onClick={logout}
        className="w-full flex items-center gap-3 px-4 py-3 mt-2 transition-all text-sm font-medium"
        style={{ borderRadius: "4px", color: colors.textPrimary }}
        onMouseEnter={(e) => e.currentTarget.style.background = colors.bgTertiary}
        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: colors.textSecondary }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Logout
      </button>
    </div>
  );
}
