import { ArrowLeft, Grid, Bookmark, List } from "lucide-react";
import { API_PATHS } from "../../utils/api";
import axiosInstance from "../../utils/axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import JobCard from "../../components/Cards/JobCard";
import toast from "react-hot-toast";

const SavedJobs = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [savedJobList, setSavedJobList] = useState([]);
  const [viewMode, setViewMode] = useState("grid");

  const getSavedJobs = async () => {
    try {
    const response = await axiosInstance.get(API_PATHS.JOBS.GET_SAVED_JOB);

    const jobs = Array.isArray(response.data)
      ? response.data
      : response.data.savedJobs || response.data.jobs || [];

    setSavedJobList(jobs);
    } catch (error) {
      console.error("Error fetching saved jobs:", error);
    }
  };

  const handleUnsaveJobs = async (jobId) => {
    try {
      await axiosInstance.delete(API_PATHS.JOBS.UNSAVE_JOB(jobId));
      toast.success("Job removed from saved list");
      getSavedJobs();
    } catch {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (user) {
      getSavedJobs();
    }
  }, [user]);

  return (
    <div className="bg-[#0f0f0f] min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">

        <div className="bg-[#141414] border border-white/10 rounded-xl p-8">

          <div className="flex items-center justify-between mb-8">

            <div className="flex items-center gap-4">

              <button
                onClick={() => navigate(-1)}
                className="cursor-pointer p-2 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition"
              >
                <ArrowLeft size={18} />
              </button>

              <h1 className="text-xl font-semibold text-white">
                Saved Jobs
              </h1>

            </div>

            <div className="flex border border-white/10 rounded-lg p-1">

              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md ${
                  viewMode === "grid"
                    ? "bg-orange-500 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Grid size={18} />
              </button>

              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md ${
                  viewMode === "list"
                    ? "bg-orange-500 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <List size={18} />
              </button>

            </div>
          </div>

          {savedJobList.length === 0 ? (
            <div className="text-center py-24">

              <Bookmark
                size={60}
                className="mx-auto mb-6 text-gray-600"
              />

              <h3 className="text-xl text-white font-semibold mb-2">
                No saved jobs yet
              </h3>

              <p className="text-gray-400 mb-6">
                Save jobs that interest you and access them later
              </p>

              <button
                onClick={() => navigate("/find-jobs")}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold cursor-pointer"
              >
                Browse Jobs
              </button>

            </div>
          ) : (

            <div
              className={
                viewMode === "grid"
                  ? "grid md:grid-cols-2 xl:grid-cols-2 gap-6"
                  : "space-y-6"
              }
            >
              {savedJobList.map((savedJob) => (
                <JobCard
                  key={savedJob._id}
                  job={savedJob?.job}
                  onClick={() => navigate(`/job/${savedJob?.job._id}`)}
                  onToggleSave={() =>
                    handleUnsaveJobs(savedJob?.job._id)
                  }
                  saved
                />
              ))}
            </div>

          )}

        </div>

      </div>
    </div>
  );
};

export default SavedJobs;