import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Popup from "../component/Popup";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState();

  const navigate = useNavigate();
   return (
     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
       {error && <Popup message={error} onClose={() => setError("")} />}

       <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
         <h1 className="text-3xl font-bold text-center text-gray-800">
           Login to Account
         </h1>

         <p className="text-center text-gray-500 mt-2">
           Start shortening your URLs today
         </p>

         <form
           className="mt-8"
           onSubmit={(e) => {
             e.preventDefault();

             setError("");
             if (!formData.email || !formData.password) {
               setError("Please fill all fields");
               return;
             }
             if (formData.password.length < 8) {
               setError("Password must be at least 8 characters");
               return;
             }
             axios
               .post("http://localhost:8080/api/auth/signIn", formData)
               .then((response) => {
                 console.log("SUCCESS:", response.data);

                 localStorage.setItem("token", response.data.token);
                 navigate("/");
               })
               .catch((error) => {
                 console.log("ERROR:", error.response?.data);
                 setError(error.response?.data?.msg || "Login failed");
               });
           }}
         >
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
             Sign in
           </button>
         </form>

         <p className="text-center text-sm text-gray-500 mt-6">
           Create an account?
           <button
             onClick={() => navigate("/signup")}
             className="text-blue-600 font-medium ml-1 hover:underline"
           >
             Sign up
           </button>
         </p>
       </div>
     </div>
   );
};

export default Signin;
