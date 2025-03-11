import React, { useState } from "react";
import axios from "axios";
import "./LoginRegister.css";

const LoginRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";

    try {
      const { data } = await axios.post(`http://localhost:4000${endpoint}`, {
        name: isLogin ? undefined : name,
        email,
        password,
      });

      alert(isLogin ? "✅ Login Successful!" : "✅ Registered Successfully!");
      if (isLogin) {
        localStorage.setItem("token", data.token);
        window.location.href = "/Home"; // Redirect to home page (corrected path)
      }
    } catch (error) {
      setError(error.response?.data?.error || "❌ Something went wrong");
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h3>{isLogin ? "LOGIN" : "REGISTER"}</h3>
        <p>{isLogin ? "Login to access your account" : "Create a new account"}</p>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-box">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="input-box">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {!isLogin ? (
            <div className="checkbox-container">
              <input type="checkbox" required />
              <span>
                I accept{" "}
                <button type="button" className="link-btn" onClick={() => alert("Show terms & conditions")}>
                  Terms & Conditions
                </button>
              </span>
            </div>
          ) : (
            <div className="checkbox-container">
              <input type="checkbox" />
              <span>Remember me</span>
              <button type="button" className="link-btn" onClick={() => alert("Forgot password process")}>
                Forgot Password?
              </button>
            </div>
          )}
          <button type="submit" className="btn">{isLogin ? "LOGIN" : "REGISTER"}</button>
        </form>
        <p onClick={() => setIsLogin(!isLogin)} className="toggle-text">
          {isLogin ? "Don't have an account? Register Here" : "Already have an account? Login Here"}
        </p>
      </div>
    </div>
  );
};

export default LoginRegister;
