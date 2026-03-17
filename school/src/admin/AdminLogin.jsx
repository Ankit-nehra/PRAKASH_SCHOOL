import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });

      // Save JWT token in localStorage
      localStorage.setItem("adminToken", data.token);

      // Navigate to admin dashboard
      navigate("/admin");
    } catch (err) {
      // Handle API errors safely
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-6 border rounded"
          required
        />

        <button className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800 transition">
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;