import { useState } from "react";
import api from '../services/api';
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    const [first_name, setFName] = useState("");
    const [last_name, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async function(e) {
            e.preventDefault();
            
            if(loading) return;

        setLoading(true);
        setError("");
        
        try {
            const url = "/users/regestration";
            const payload = { first_name, last_name, username, email, password };
            const response = await api.post(url, payload);
            
            if(response?.data?.success) {
                setSuccess(response?.data?.message);
                setError("");
                setTimeout(() => navigate("/"), 1000);
                return;
            } else {
                setError(response?.data?.error);
                setSuccess("");
            }

        } catch(err) {
            setError(err.response?.data?.message || "Registration Failed!");
            setSuccess("");
        }
        setLoading(false);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
                {error && <p className="text-red-500">{error}</p> }
                {success && <p className="text-green-500">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="First Name" value={first_name} onChange={(e) => setFName(e.target.value) } className="w-full border p-2 mb-4 rounded"/>
                    <input type="text" placeholder="Last Name" value={last_name} onChange={(e) => setLName(e.target.value) } className="w-full border p-2 mb-4 rounded"/>
                    <input type="text" placeholder="User Name" value={username} onChange={(e) => {setError(""); setUsername(e.target.value)}} className="w-full border p-2 mb-4 rounded" />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => {setError(""); setEmail(e.target.value)}} className="w-full border p-2 mb-4 rounded" />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-2 mb-4 rounded" />
                    <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Register</button>
                </form>
                <p className="text-center mt-3">
                    Already have an account? 
                    <Link to="/" className="text-blue-500 ml-1">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Register;