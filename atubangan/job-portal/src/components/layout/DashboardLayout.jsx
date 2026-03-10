import { useEffect, useState } from "react";
import {
  Briefcase,
  Building2,
  LogOut,
  Menu,
  X,
  Bell
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { NAVIGATION_MENU } from "../../utils/data";
import ProfileDropDown from "./ProfileDropDown";
import { useNotification } from "../../context/NotificationContext";
import bg from '../../assets/hireflow-bg.png'

const NavigationItem = ({ item, isActive, onClick, isCollapsed }) => {

  const Icon = item.icon;

  return (
    <button
      onClick={() => onClick(item)}
      className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 group ${
        isActive
          ? "bg-orange-500/20 text-orange-400 shadow-[0_0_12px_rgba(255,115,0,0.3)]"
          : "text-gray-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      <Icon
        className={`h-5 w-5 flex-shrink-0 ${
          isActive ? "text-orange-400" : "text-gray-500"
        }`}
      />

      {!isCollapsed && <span className="ml-3 truncate">{item.name}</span>}
    </button>
  );

};

const DashboardLayout = ({ children }) => {

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const notificationContext = useNotification();
  const notifications = notificationContext?.notifications || [];

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropDownOpen, setProfileDropDownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {

    const handleResize = () => {

      const mobile = window.innerWidth < 768;

      setIsMobile(mobile);

      if (!mobile) setSidebarOpen(false);

    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);

  }, []);

  useEffect(() => {

    const handleClickOutside = () => {

      if (profileDropDownOpen) {
        setProfileDropDownOpen(false);
      }

    };

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);

  }, [profileDropDownOpen]);

  const handleNavigation = (item) => {

    navigate(item.path);

    if (isMobile) setSidebarOpen(false);

  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const sidebarCollapsed = !isMobile && false;

  return (

    <div className="relative flex h-screen bg-gradient-to-br from-black via-[#0f0f0f] to-[#121212] text-white overflow-hidden">

      <div className="absolute inset-0 pointer-events-none">

        <div className="absolute top-[-200px] left-[15%] w-[500px] h-[500px] bg-orange-500/20 blur-[140px] rounded-full"></div>

        <div className="absolute bottom-[-200px] right-[10%] w-[500px] h-[500px] bg-purple-500/20 blur-[140px] rounded-full"></div>

        <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px] bg-blue-500/20 blur-[140px] rounded-full"></div>

      </div>

      {/* SIDEBAR */}

      <div
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ${
          isMobile
            ? sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : "translate-x-0"
        } ${sidebarCollapsed ? "w-16" : "w-64"}
        bg-[#0f0f0f] border-r border-white/10`}
      >

        <div className="flex items-center h-16 border-b border-white/10 pl-6">

          {!sidebarCollapsed ? (

            <Link className="flex items-center space-x-3" to="/">

            <div className="w-14 h-14 bg-zinc-900 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
              <img 
                src={bg} 
                alt="logo"
                className="w-11 h-11 object-contain"
              />
            </div>

              <span className="text-white font-bold text-xl">
                HireFlow
              </span>

            </Link>

          ) : (

            <div className="h-8 w-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Building2 className="h-5 w-5 text-white" />
            </div>

          )}

        </div>

        <nav className="p-4 space-y-2">

          {NAVIGATION_MENU.map((item) => (

            <NavigationItem
              key={item.id}
              item={item}
              isActive={location.pathname === item.path}
              onClick={handleNavigation}
              isCollapsed={sidebarCollapsed}
            />

          ))}

        </nav>

        <div className="absolute bottom-4 left-4 right-4">

          <button
            className="w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all duration-200"
            onClick={() => {

              logout();
              navigate("/login");

            }}
          >

            <LogOut className="h-5 w-5 flex-shrink-0 text-gray-500" />

            {!sidebarCollapsed && (
              <span className="ml-3 cursor-pointer">
                Logout
              </span>
            )}

          </button>

        </div>

      </div>

      {/* MOBILE OVERLAY */}

      {isMobile && sidebarOpen && (

        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        />

      )}

      {/* MAIN */}

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isMobile ? "ml-0" : sidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >

        <header className="bg-[#111]/80 backdrop-blur-xl border-b border-white/10 h-16 flex items-center justify-between px-6 sticky top-0 z-30">

          <div className="relative mr-4">

            <Bell className="h-5 w-5 text-gray-300 cursor-pointer" />

            {notifications.length > 0 && (

              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                {notifications.length}
              </span>

            )}

          </div>

          <div>

            <h1 className="text-base font-semibold text-white">
              Welcome back, {user?.name?.split(" ")[0]}
            </h1>

            <p className="text-sm text-gray-400 hidden sm:block">
              Here's what's happening with your jobs today
            </p>

          </div>

          <div className="flex items-center space-x-3">

            {isMobile && (

              <button
                onClick={toggleSidebar}
                className="p-2 rounded-xl hover:bg-white/5"
              >

                {sidebarOpen ? (
                  <X className="h-5 w-5 text-gray-400" />
                ) : (
                  <Menu className="h-5 w-5 text-gray-400" />
                )}

              </button>

            )}

            <ProfileDropDown
              isOpen={profileDropDownOpen}
              onToggle={(e) => {

                e.stopPropagation();
                setProfileDropDownOpen(!profileDropDownOpen);

              }}
              avatar={user?.avatar || ""}
              companyName={user?.name || ""}
              email={user?.email || ""}
              userRole={user?.role || ""}
              onLogout={() => {

                logout();
                navigate("/login");

              }}
            />

          </div>

        </header>

        <main className="flex-1 overflow-auto p-6 relative z-10">

          {children}

        </main>

      </div>

    </div>

  );

};

export default DashboardLayout;