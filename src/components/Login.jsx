import { useContext, useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/users/login", { username, password });

      const token = response?.data?.data?.token;

      if (response?.data?.success && token) {
        login(token);
        navigate("/dashboard");
        return;
      }
      
      setError(response?.data?.error || "Login failed");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                setError("");
                setUsername(e.target.value);
                }}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            </div>

            <div className="mb-4">
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                setError("");
                setPassword(e.target.value);
                }}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            </div>

            <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
            {loading ? "Logging in..." : "Login"}
            </button>
        </form>

        <p className="text-center mt-3">
            Don't have an account?
            <Link to="/register" className="text-blue-500 ml-1">
            Register
            </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;