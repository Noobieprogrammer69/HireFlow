import { useState, useEffect } from "react";
import { Bookmark, Bell } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ProfileDropDown from "./ProfileDropDown";
import bg from '../../assets/hireflow-bg.png'

const Navbar = () => {

  const [profileDropDown, setProfileDropDown] = useState(false);

  const navigate = useNavigate();

  const { user, logout, isAuthenticated } = useAuth();

  useEffect(() => {

    const handleClickOutside = () => {

      if (profileDropDown) {
        setProfileDropDown(false);
      }

    };

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);

  }, [profileDropDown]);

  return (

    <header className="fixed top-0 left-0 right-0 z-50 bg-[#111]/80 backdrop-blur-xl border-b border-white/10">

      <div className="container mx-auto px-4">

        <div className="flex items-center justify-between h-16">

          <Link
            to="/"
            className="flex items-center space-x-3 cursor-pointer"
          >

          <div className="w-14 h-14 bg-zinc-900 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
            <img 
              src={bg} 
              alt="logo"
              className="w-11 h-11 object-contain"
            />
          </div>

            <span className="text-lg text-white font-bold tracking-tight">
              HireFlow
            </span>

          </Link>

          <div className="flex items-center space-x-3">

            {user && user.role === "jobseeker" && (

              <button
                onClick={() => navigate("/saved-jobs")}
                className="cursor-pointer p-2 rounded-xl hover:bg-white/5 transition-colors duration-200"
              >

                <Bookmark className="h-5 w-5 text-gray-400 hover:text-orange-400 transition-colors" />

              </button>

            )}

            {user && user.role === "jobseeker" && (

              <button
                onClick={() => navigate("/my-applications")}
                className="cursor-pointer px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >

                My Applications

              </button>

            )}

            {isAuthenticated && (

              <div
                onClick={() => navigate("/notifications")}
                className="relative cursor-pointer p-2 rounded-xl hover:bg-white/5"
              >

                <Bell className="h-5 w-5 text-gray-400 hover:text-orange-400 transition-colors" />

                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-[1px] rounded-full">
                  1
                </span>

              </div>

            )}

            {isAuthenticated ? (

              <ProfileDropDown
                isOpen={profileDropDown}
                onToggle={(e) => {

                  e.stopPropagation();

                  setProfileDropDown(!profileDropDown);

                }}
                avatar={user?.avatar || null}
                companyName={user?.name || ""}
                email={user?.email || ""}
                userRole={user?.role || ""}
                onLogout={() => {

                  logout();
                  navigate("/login");

                }}
              />

            ) : (

              <>

                <Link
                  to="/login"
                  className="cursor-pointer text-gray-400 hover:text-white transition-colors font-medium px-4 py-2 rounded-lg hover:bg-white/5"
                >
                  Login
                </Link>

                <Link
                  to="/signUp"
                  className="cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40"
                >
                  Sign Up
                </Link>

              </>

            )}

          </div>

        </div>

      </div>

    </header>

  );

};

export default Navbar;