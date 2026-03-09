import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import bg from '../../../assets/hireflow-bg.png'

const Header = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f0f]/80 backdrop-blur-xl border-b border-white/10"
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          <div
            onClick={() => navigate("/")}
            className="flex items-center space-x-3 cursor-pointer"
          >
          <div className="w-14 h-14 bg-zinc-900 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
            <img 
              src={bg} 
              alt="logo"
              className="w-11 h-11 object-contain"
            />
          </div>

            <span className="text-lg font-bold text-white">
              HireFlow
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">

            <button
              onClick={() => navigate("/find-jobs")}
              className="text-gray-400 hover:text-orange-400 transition cursor-pointer font-medium"
            >
              Find Jobs
            </button>

            <button
              onClick={() =>
                navigate(
                  isAuthenticated && user?.role === "employer"
                    ? "/employer-dashboard"
                    : "/login"
                )
              }
              className="text-gray-400 hover:text-orange-400 transition cursor-pointer font-medium"
            >
              For Employers
            </button>

          </nav>

          <div className="flex items-center space-x-4">

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">

                <span className="text-gray-400 text-sm">
                  Welcome, {user?.fullname}
                </span>

                <button
                  onClick={() =>
                    navigate(
                      user?.role === "employer"
                        ? "/employer-dashboard"
                        : "/find-jobs"
                    )
                  }
                  className="cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition shadow-lg shadow-orange-500/30"
                >
                  Dashboard
                </button>

              </div>
            ) : (
              <div className="flex items-center space-x-3">

                <button
                  onClick={() => navigate("/login")}
                  className="cursor-pointer text-gray-400 hover:text-white transition px-4 py-2"
                >
                  Login
                </button>

                <button
                  onClick={() => navigate("/register")}
                  className="cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition shadow-lg shadow-orange-500/30"
                >
                  Register
                </button>

              </div>
            )}

          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;