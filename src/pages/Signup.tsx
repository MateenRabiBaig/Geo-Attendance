import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import "../styles/auth.css";

export default function Signup() {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);

  const handleSignup = async () => {
    try {
      console.log('Attempting signup with:', email, 'role:', role);
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Signup successful:', user);
      await setDoc(doc(db, "users", user.user.uid), { email, role });
      console.log('User document created');
      alert("Signup successful");
    } catch (err: any) {
      console.error('Signup error:', err);
      console.error('Error code:', err.code);
      console.error('Error message:', err.message);
      alert(`Signup failed: ${err.message}\n\nCode: ${err.code}`);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">Geo Attendance</div>
          <h1 className="auth-title">Create account</h1>
          <p className="auth-subtitle">Get started with Geo Attendance</p>
        </div>

        <div className="auth-form">
          <div className="form-group">
            <label htmlFor="signup-email" className="form-label">Email</label>
            <input
              id="signup-email"
              className="form-input"
              type="email"
              placeholder="you@company.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="signup-password" className="form-label">Password</label>
            <input
              id="signup-password"
              className="form-input"
              type="password"
              placeholder="Create a password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="signup-role" className="form-label">Role</label>
            <select
              id="signup-role"
              className="form-select"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button className="submit-btn" type="button" onClick={handleSignup}>
            Create account
          </button>
        </div>

        <div className="auth-footer">
          Already have an account? <Link to="/">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
