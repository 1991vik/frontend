import DashboardLayout from "./DashboardLayout";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { useForm } from "react-hook-form";

function EditUser() {
    const { id } = useParams();
   
    const [loading, setLoading]     = useState(true);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
      } = useForm({
        defaultValues: {
          firstname: "",
          lastname: "",
          email: "",
          username: "",
          status: "",
        },
      });

    useEffect(() => {
        fetchUserDetail();
    }, [id]);

    const fetchUserDetail = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/users/${id}`);
            const userData = response?.data?.data;

            if(response?.data?.success && userData) {
                reset({
                    firstname: userData.first_name || "",
                    lastname: userData.last_name || "",
                    email: userData.email || "",
                    username: userData.user_name || "",
                    status: userData.status || "",
                  });
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

    const onSubmit = async (data) => {

    }

return (
        <>
        <DashboardLayout>
            <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl">
            <h2 className="text-2xl font-bold mb-6">Edit User</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block mb-1 text-gray-600">First Name</label>
                        <input {...register("firstname", { required: "First name is required" })} type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="First Name" />
                        {errors.firstname && (
                            <p className="text-red-500 text-sm">{errors.firstname.message}</p>
                            )}
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-600">Last Name</label>
                        <input {...register("lastname", { required: "Last name is required" })} type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Last Name" />
                        {errors.lastname && (
                            <p className="text-red-500 text-sm">{errors.lastname.message}</p>
                            )}
                    </div>
                    </div>

                    <div className="mb-4">
                    <label className="block mb-1 text-gray-600">Email</label>
                    <input {...register("email", {
                                required: "Email is required",
                                pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Invalid email",
                                },
                            })} type="email"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Email" />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                            )}
                    </div>

                    <div className="mb-4">
                    <label className="block mb-1 text-gray-600">Username</label>
                    <input {...register("username")} type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Username" readOnly />
                    </div>

                    <div className="mb-6">
                    <label className="block mb-1 text-gray-600">Status</label>
                        <select {...register("status", { required: "Status is required" })} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" >
                            <option value="">Select Status</option>
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                        {errors.status && (
                            <p className="text-red-500 text-sm">{errors.status.message}</p>
                            )}
                    </div>

                    <div className="mb-4">
                    <label className="block mb-1 text-gray-600">Change Password</label>
                    <input {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                        },
                        pattern: {
                            value: /^(?=.*[A-Z])(?=.*[0-9]).{6,}$/,
                            message: "Must contain uppercase & number",
                          }
                        })} type="password"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Password" />
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}
                    </div>

                    <div className="mb-4">
                    <label className="block mb-1 text-gray-600">Confirm Password</label>
                    <input {...register("confirmPassword", {
                            required: "Confirm password is required",
                            validate: (value) =>
                                value === watch("password") || "Passwords do not match",
                            })}type="password"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Confirm Password" />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm">
                            {errors.confirmPassword.message}
                            </p>
                        )}
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