import { motion } from "framer-motion";
import { Search, ArrowRight, Users, Building2, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const Hero = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { icon: Users, label: "Active Users", value: "2.4M+" },
    { icon: Building2, label: "Companies", value: "50K+" },
    { icon: TrendingUp, label: "Jobs Posted", value: "150K+" },
  ];

  return (
    <section className="pt-28 pb-24 bg-gradient-to-br from-black via-[#0f0f0f] to-[#121212] text-white min-h-screen flex items-center relative overflow-hidden">

      <div className="absolute top-[-200px] left-[10%] w-[500px] h-[500px] bg-orange-500/20 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-[-200px] right-[10%] w-[500px] h-[500px] bg-purple-500/20 blur-[150px] rounded-full"></div>

      <div className="container mx-auto px-4 relative z-10">

        <div className="max-w-4xl mx-auto text-center">

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Find Your Dream Job
            <span className="block bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Or Perfect Hire
            </span>
          </motion.h1>

          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
            Connect talented professionals with innovative companies.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">

            <button
              onClick={() => navigate("/find-jobs")}
              className="cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition shadow-lg shadow-orange-500/30 flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              Find Jobs
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() =>
                navigate(
                  isAuthenticated && user?.role === "employer"
                    ? "/employer-dashboard"
                    : "/login"
                )
              }
              className="cursor-pointer border border-white/10 bg-[#141414] px-8 py-4 rounded-xl font-semibold hover:border-orange-500/40 hover:shadow-[0_0_20px_rgba(255,115,0,0.25)] transition"
            >
              Post a Job
            </button>

          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-2xl mx-auto">

            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-[#141414]/80 border border-white/10"
              >
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-2">
                  <stat.icon className="w-6 h-6 text-orange-400" />
                </div>

                <div className="text-2xl font-bold">{stat.value}</div>

                <div className="text-sm text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;