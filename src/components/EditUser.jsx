import DashboardLayout from "./DashboardLayout";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function EditUser() {
    const { id } = useParams();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname]   = useState("");
    const [email, setEmail]         = useState("");
    const [username, setUsername]   = useState("");
    const [status, setStatus]       = useState("");
    const [loading, setLoading]     = useState(true);
    const [password, setPassword]   = useState("");
    const [confirmpassword, setConfirm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserDetail();
    }, [id]);

    const fetchUserDetail = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/users/${id}`);
            const userData = response?.data?.data;

            if(response?.data?.success && userData) {
                setFirstname(userData.first_name || "");
                setLastname(userData.last_name  || "");
                setEmail(userData.email  || "");
                setUsername(userData.user_name  || "");
                setStatus(userData.status  || "");
            } else {
                console.log("User not found");
            }

        } catch(err) {
            console.error("Error fetching user:", err?.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    }

    const handleCancle = () => {
        navigate('/user-list');
        return;
    }

return (
        <>
        <DashboardLayout>
            <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl">
            <h2 className="text-2xl font-bold mb-6">Edit User</h2>
            
            <form>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block mb-1 text-gray-600">First Name</label>
                        <input type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="First Name" value={firstname} onChange={(e) => { setFirstname(e.targate.value) } } />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-600">Last Name</label>
                        <input type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Last Name" value={lastname} onChange={(e) => { setLastname(e.targate.value) } } />
                    </div>
                    </div>

                    <div className="mb-4">
                    <label className="block mb-1 text-gray-600">Email</label>
                    <input type="email"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Email" value={email} onChange={(e) => { setEmail(e.targate.value) } } />
                    </div>

                    <div className="mb-4">
                    <label className="block mb-1 text-gray-600">Username</label>
                    <input type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Username" value={username} disabled />
                    </div>

                    <div className="mb-6">
                    <label className="block mb-1 text-gray-600">Status</label>
                        <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" value={status} onChange={(e) => { setStatus(e.targate.value) } } >
                            <option value="">Select Status</option>
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                    </div>

                    <div className="mb-4">
                    <label className="block mb-1 text-gray-600">Change Password</label>
                    <input type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Password" value={password} onChange={(e) => { setPassword(e.targate.value) } } />
                    </div>

                    <div className="mb-4">
                    <label className="block mb-1 text-gray-600">Confirm Password</label>
                    <input type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Confirm Password" value={confirmpassword} onChange={(e) => { setConfirm(e.targate.value) } } />
                    </div>


                    <div className="flex justify-end gap-4">
                    <button type="button" className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={ handleCancle }>
                        Cancel
                    </button>

                    <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Update
                    </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    </>
    )
}

export default EditUser;