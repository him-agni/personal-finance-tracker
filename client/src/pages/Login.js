import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../utils/axios";
import { AuthContext } from "../context/AuthContext";
import FormWrapper from "../components/FormWrapper";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      login(res.data);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <FormWrapper title="Welcome Back" onSubmit={handleSubmit}>
      <input
        name="email"
        type="email"
        placeholder="Email Address"
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <button type="submit">Log In</button>
      <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
        Don't have an account? <Link to="/register" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>Register here</Link>
      </p>
    </FormWrapper>
  );
}
