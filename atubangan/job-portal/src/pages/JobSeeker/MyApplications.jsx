import { useEffect, useState } from "react";
import { MessageCircle, ArrowLeft } from "lucide-react";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";

const MyApplications = () => {

  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);

  useEffect(() => {

    const fetchMyApplications = async () => {

      try {

        const res = await axiosInstance.get("/api/applications/my");

        const apps = Array.isArray(res.data)
          ? res.data
          : res.data.applications || [];

        setApplications(apps);

      } catch (err) {

        console.error(err);

      }

    };

    fetchMyApplications();

  }, []);

  return (

    <div className="bg-[#0f0f0f] min-h-screen">

      <Navbar />

      <div className="max-w-6xl mx-auto pt-24 pb-10 px-4">


        <button
          onClick={() => navigate(-1)}
          className="cursor-pointer flex items-center gap-2 text-gray-400 hover:text-white mb-6"
        >
          <ArrowLeft size={18} />
          Back
        </button>


        <h1 className="text-white text-2xl font-semibold mb-8">
          My Applications
        </h1>

        {applications.length === 0 ? (

          <p className="text-gray-400">
            You have not applied to any jobs yet.
          </p>

        ) : (

          <div className="space-y-4">

            {applications.map((app) => (

              <div
                key={app._id}
                className="bg-[#141414] border border-white/10 rounded-xl p-5 flex justify-between items-center"
              >

                <div>

                  <h3 className="text-white font-semibold">
                    {app.job?.title}
                  </h3>

                  <p className="text-gray-400 text-sm">
                    {app.job?.location}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Status: {app.status}
                  </p>

                </div>

                {app.status === "Accepted" && (

                  <button
                    onClick={() => navigate(`/chat/${app._id}`)}
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-white"
                  >

                    <MessageCircle size={16} />
                    Chat

                  </button>

                )}

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

};

export default MyApplications;