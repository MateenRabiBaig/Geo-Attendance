import { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useTheme } from "../../contexts/ThemeContext";
import { getThemeColors } from "../../utils/theme";

export default function AdminProfile() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("Admin");
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        setUserEmail(auth.currentUser.email || "");
        try {
          const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserName(data.name || "Admin");
            setNewName(data.name || "Admin");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  }, []);

  const handleSaveName = async () => {
    if (auth.currentUser && newName.trim()) {
      try {
        await updateDoc(doc(db, "users", auth.currentUser.uid), {
          name: newName.trim()
        });
        setUserName(newName.trim());
        setEditing(false);
      } catch (error) {
        console.error("Error updating name:", error);
        alert("Failed to update name");
      }
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl">
        <div className="p-8 shadow-md" style={{ borderRadius: "4px", background: colors.bgCard }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 flex items-center justify-center text-2xl font-bold" style={{ background: colors.accent, color: colors.accentText, borderRadius: "4px" }}>
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: colors.textPrimary }}>Admin Profile</h1>
              <p style={{ color: colors.textSecondary }}>Manage your account settings</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: colors.textPrimary }}>Display Name</label>
              <div className="flex gap-3">
                {editing ? (
                  <>
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="flex-1 px-4 py-3 border focus:outline-none transition-all"
                      style={{ borderRadius: "4px", borderColor: colors.borderSecondary, background: colors.inputBg, color: colors.textPrimary }}
                    />
                    <button
                      onClick={handleSaveName}
                      className="px-6 py-3 text-white font-semibold transition-all hover:opacity-80"
                      style={{ background: colors.accent, borderRadius: "4px" }}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditing(false);
                        setNewName(userName);
                      }}
                      className="px-6 py-3 font-semibold transition-all"
                      style={{ borderRadius: "4px", color: colors.textPrimary, hover: { background: colors.bgSecondary } }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex-1 px-4 py-3" style={{ borderRadius: "4px", background: colors.bgSecondary, color: colors.textPrimary }}>
                      {userName}
                    </div>
                    <button
                      onClick={() => setEditing(true)}
                      className="px-6 py-3 font-semibold transition-all hover:opacity-80"
                      style={{ background: colors.accent, color: colors.accentText, borderRadius: "4px" }}
                    >
                      Edit
                    </button>
                  </>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: colors.textPrimary }}>Email Address</label>
              <div className="px-4 py-3" style={{ borderRadius: "4px", background: colors.bgSecondary, color: colors.textPrimary }}>
                {userEmail}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: colors.textPrimary }}>Role</label>
              <div className="inline-flex items-center gap-2 px-4 py-2" style={{ background: colors.bgSecondary, borderRadius: "4px" }}>
                <div className="w-2 h-2 rounded-full" style={{ background: colors.accent }}></div>
                <span className="font-medium" style={{ color: colors.accent }}>Administrator</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
