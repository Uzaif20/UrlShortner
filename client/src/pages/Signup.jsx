import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Popup from "../component/Popup";


const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {error && <Popup message={error} onClose={() => setError("")} />}
      {success && <Popup message={success} onClose={() => {setSuccess("");  navigate("/signin");}}/>}

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Start shortening your URLs today
        </p>

        <form
          className="mt-8"
          onSubmit={(e) => {
            e.preventDefault();

            setError("");

            if (!formData.name || !formData.email || !formData.password) {
              setError("Please fill all fields");
              return;
            }
            if (formData.password.length < 8) {
              setError("Password must be at least 6 characters");
              return;
            }
            axios
              .post("http://localhost:8080/api/auth/signup", formData)
              .then((response) => {
                console.log("SUCCESS:", response.data);
                setSuccess(response.data.msg);
              })
              .catch((error) => {
                console.log("ERROR:", error.response?.data);
              });
          }}
        >
        
          {/* Name */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none
               focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg
             hover:bg-blue-700 transition duration-200"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?
          <button
            onClick={() => navigate("/signin")}
            className="text-blue-600 font-medium ml-1 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
