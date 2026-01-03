import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // 🔑 REDIRECT AFTER LOGIN
  useEffect(() => {
  if (user) {
    navigate("/tasks");
  }
}, [user, navigate]);


  const submit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="page">
  <div className="card">
    <form onSubmit={submit}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>

      <p style={{ textAlign: "center", marginTop: "10px" }}>
        New user? <Link to="/register">Register here</Link>
      </p>
    </form>
  </div>
</div>

  );
}
