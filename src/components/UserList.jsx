import { useEffect, useState } from 'react';
import api from '../services/api';
import DashboardLayout from "./DashboardLayout";
import { NavLink } from 'react-router-dom';

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
          const response = await api.get("/users/all");

          if (response?.data?.success) {
            setUsers(response.data.data);
          } else {
            setError("Failed to fetch users");
          }
        } catch (err) {
          setError(err?.response?.data?.message || "Error fetching users");
        } finally {
          setLoading(false);
        }
      };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
            <div className="bg-white p-6 rounded shadow">
                <table className="w-full border">
                <thead>
                    <tr className="bg-gray-200">
                    <th className="p-2 border">ID</th>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Email</th>
                    </tr>
                </thead>

                <tbody>
                    {users.length > 0 ? (
                        users.map((user, index) => (
                        <tr key={user.id || index}>
                            <td className="p-2 border text-center"><NavLink to={`/edit/${user.id}`} className={({ isActive }) =>
                            isActive
                                ? "text-blue-600 font-bold underline"
                                : "text-blue-500 hover:underline"
                            } >{index + 1}</NavLink></td>
                            <td className="p-2 border text-center">{user.first_name}</td>
                            <td className="p-2 border text-center">{user.email}</td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                        <td colSpan="3" className="text-center p-4">
                            No users found
                        </td>
                        </tr>
                    )}
                </tbody>
                </table>
            </div>
      )}
    </DashboardLayout>
  );
}

export default UserList;