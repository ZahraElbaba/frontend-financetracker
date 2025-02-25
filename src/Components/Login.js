import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../Components/Login.css";

const Login = ({ setAdminName }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const url = isSignup ? "http://localhost:5001/api/signup" : "http://localhost:5001/api/login";
      const data = isSignup ? { name, email, password } : { email, password };
      const res = await axios.post(url, data);

      const { token, user } = res.data;
      localStorage.setItem("token", token);
      setAdminName(user.name);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <h2>{isSignup ? "Admin Sign Up" : "Admin Login"}</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        {isSignup && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
      </form>

      <p className="toggle-text" onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? "Already have an account? Login" : "Don't have an account? Sign up"}
      </p>
    </div>
  );
};

export default Login;
