import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyUrls from "../pages/myUrls";


const Navbar = () => {
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">U</span>
          </div>

          <h1 className="text-xl font-bold text-slate-800">
            URL<span className="text-blue-600">Short</span>
          </h1>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate("/")}
            className="text-sm font-medium text-slate-600 hover:text-blue-600 hover:underline"
          >
            Home
          </button>

          <button
            onClick={() => navigate("/MyUrls")}
            className="text-sm font-medium text-slate-600 hover:text-blue-600 hover:underline"
          >
            My URLs
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2"
            >
              <div
                className="w-9 h-9 rounded-full bg-blue-100
              flex items-center justify-center"
              >
                <span className="text-blue-600 font-semibold">U</span>
              </div>

              <span className="text-sm font-medium text-slate-700">
                Profile
              </span>

              <span className="text-slate-400">▼</span>
            </button>

            {/* Profile dropdown */}
            {showProfile && (
              <div
                className="absolute right-0 mt-3 w-48 bg-white
              border border-slate-200 rounded-xl shadow-lg py-2 z-50"
              >
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full text-left px-4 py-2 text-sm
                  text-slate-700 hover:bg-slate-50"
                >
                  Profile
                </button>

                <button
                  onClick={() => navigate("/myUrls")}
                  className="w-full text-left px-4 py-2 text-sm
                  text-slate-700 hover:bg-slate-50"
                >
                  My URLs
                </button>

                <div className="border-t border-slate-100 my-2"></div>

                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm
                  text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
