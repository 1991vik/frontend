import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Sidebar() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
      };

    return (
        <>
            <div className="w-64 bg-gray-800 text-white min-h-screen p-5">
            <ul className="space-y-3">
                
                <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
                    <NavLink to="/dashboard" className={({ isActive }) => `block p-2 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}` } >Dashboard</NavLink>
                </li>

                <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
                    <NavLink to="/user-list" className={({ isActive }) => `block p-2 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}` } >Users</NavLink>
                </li>

                <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Settings</li>
                <li className="hover:bg-red-600 p-2 rounded cursor-pointer" onClick={handleLogout} >Logout</li>
            </ul>
            </div>
        </>
    )
}

export default Sidebar;