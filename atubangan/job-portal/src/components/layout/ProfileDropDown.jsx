import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileDropDown = ({
  isOpen,
  onToggle,
  avatar,
  companyName,
  email,
  userRole,
  onLogout
}) => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="cursor-pointer flex items-center space-x-3 p-2 rounded-xl hover:bg-white/5 transition-colors duration-200"
      >
        {avatar ? (
          <img
            src={avatar}
            alt="avatar"
            className="h-9 w-9 object-cover rounded-xl border border-white/10"
          />
        ) : (
          <div className="h-9 w-9 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
            <span className="text-white font-semibold text-sm">
              {companyName?.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium text-white">{companyName}</p>
          <p className="text-xs text-gray-400">
            {userRole === "jobseeker" ? "Job Seeker" : "Employer"}
          </p>
        </div>

        <ChevronDown className="h-4 w-4 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-60 bg-[#141414]/90 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 py-2 z-50">
          <div className="px-4 py-3 border-b border-white/10">
            <p className="text-sm font-medium text-white">{companyName}</p>
            <p className="text-xs text-gray-400 truncate">{email}</p>
          </div>

          <button
            onClick={() =>
              navigate(
                userRole === "jobseeker" ? "/profile" : "/employer-profile"
              )
            }
            className="cursor-pointer w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-orange-400 transition-colors"
          >
            View Profile
          </button>

          <div className="border-t border-white/10 mt-2 pt-2">
            <button
              onClick={() => {
                onLogout();
                navigate("/login");
              }}
              className="cursor-pointer w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropDown;