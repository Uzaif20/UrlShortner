import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../component/Navbar";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:8080/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log("PROFILE:", response.data);

        setUser(response.data.user);
      } catch (error) {
        console.log("PROFILE ERROR:", error.response?.data);

        setError(error.response?.data?.msg || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />

        <div className="flex justify-center items-center py-20">
          <p className="text-slate-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />

        <div className="flex justify-center items-center py-20">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-10">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>

          <p className="text-slate-500 mt-2">View your account information.</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-4xl font-bold text-blue-600">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-4">
              {user?.name}
            </h2>

            <p className="text-slate-500 mt-1">{user?.email}</p>
          </div>

          {/* User Information */}
          <div className="mt-8 border-t border-slate-200 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-slate-500">Full Name</p>

                <p className="text-lg font-semibold text-slate-800 mt-1">
                  {user?.name}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Email Address</p>

                <p className="text-lg font-semibold text-slate-800 mt-1 break-all">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
