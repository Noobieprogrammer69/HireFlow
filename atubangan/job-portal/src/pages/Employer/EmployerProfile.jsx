import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { ArrowLeft, Edit } from "lucide-react";

const EmployerProfile = () => {

  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    try {

      const res = await axiosInstance.get("/api/auth/me");

      setProfile(res.data);

    } catch (err) {

      console.error(err);

    }
  };

  useEffect(() => {

    fetchProfile();

  }, []);

  if (!profile) {

    return (
      <DashboardLayout>
        <div className="text-white text-center py-20">
          Loading profile...
        </div>
      </DashboardLayout>
    );

  }

  return (

    <DashboardLayout activeMenu="company-profile">

      <div className="max-w-5xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="bg-[#141414]/90 border border-white/10 rounded-2xl shadow-xl overflow-hidden">

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-5 flex justify-between items-center">

            <h1 className="text-white text-lg font-semibold">
              Company Profile
            </h1>

            <button
              onClick={() => navigate("/company-profile")}
              className="flex items-center gap-2 px-4 py-2 bg-black/30 hover:bg-black/50 rounded-lg text-white"
            >
              <Edit size={16} />
              Edit
            </button>

          </div>

          <div className="p-8 space-y-8">

            <div className="flex items-center gap-6">

              <img
                src={profile.avatar || "/default-avatar.png"}
                className="w-24 h-24 rounded-full object-cover border border-white/10"
              />

              <div>

                <h2 className="text-xl font-semibold text-white">
                  {profile.name}
                </h2>

                <p className="text-gray-400">
                  {profile.email}
                </p>

              </div>

            </div>

            <div>

              <h3 className="text-white font-semibold mb-2">
                Company Name
              </h3>

              <p className="text-gray-400">
                {profile.companyName || "Not added yet"}
              </p>

            </div>

            <div>

              <h3 className="text-white font-semibold mb-2">
                Company Description
              </h3>

              <p className="text-gray-400">
                {profile.companyDescription || "No description yet"}
              </p>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>

  );

};

export default EmployerProfile;