import { useState, useEffect } from "react";
import { LayoutGrid, List } from "lucide-react";
import LoadingSpinner from "../../components/LoadingSpinner";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import FilterContent from "./components/FilterContent";
import SearchHeader from "./components/SearchHeader";
import Navbar from "../../components/layout/Navbar";
import JobCard from "../../components/Cards/JobCard";

const JobSeekerDashboard = () => {

  const { user } = useAuth();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  const [layout, setLayout] = useState("grid");

  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    category: "",
    type: "",
    minSalary: "",
    maxSalary: ""
  });

  const [expandedSections, setExpandedSections] = useState({
    jobType: true,
    salary: true,
    categories: true
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const clearAllFilters = () => {
    const cleared = {
      keyword: "",
      location: "",
      category: "",
      type: "",
      minSalary: "",
      maxSalary: ""
    };

    setFilters(cleared);
    fetchJobs(cleared);
  };

  const fetchJobs = async (filterParams = {}) => {

    try {

      setLoading(true);

      const params = new URLSearchParams();

      if (filterParams.keyword) params.append("keyword", filterParams.keyword);
      if (filterParams.location) params.append("location", filterParams.location);
      if (filterParams.minSalary) params.append("minSalary", filterParams.minSalary);
      if (filterParams.maxSalary) params.append("maxSalary", filterParams.maxSalary);
      if (filterParams.type) params.append("type", filterParams.type);
      if (filterParams.category) params.append("category", filterParams.category);

      if (user?._id) {
        params.append("userId", user._id);
      }

      const res = await axiosInstance.get(
        `${API_PATHS.JOBS.GET_ALL_JOBS}?${params.toString()}`
      );

      const jobsData = Array.isArray(res.data)
        ? res.data
        : res.data.jobs || [];

      setJobs(jobsData);

    } catch (err) {

      console.error(err);
      setJobs([]);

    } finally {

      setLoading(false);

    }

  };

  const fetchMyApplications = async () => {

    try {

      const res = await axiosInstance.get("/api/applications/my");

      const apps = Array.isArray(res.data)
        ? res.data
        : res.data.applications || [];

      setApplications(apps);

    } catch (err) {

      console.error(err);
      setApplications([]);

    }

  };

  useEffect(() => {

    if (user) {
      fetchJobs(filters);
      fetchMyApplications();
    }

  }, [user]);

  const applyToJob = async (jobId) => {

    try {

      await axiosInstance.post(API_PATHS.APPLICATIONS.APPLY_TO_JOB(jobId));

      toast.success("Applied successfully");

      fetchJobs(filters);
      fetchMyApplications();

    } catch (err) {

      toast.error(err?.response?.data?.message || "Error applying");

    }

  };

  const toggleSaveJob = async (jobId) => {

    try {

      await axiosInstance.post(`/api/save-jobs/${jobId}`);

      toast.success("Saved jobs updated");

      fetchJobs(filters);

    } catch (err) {

      console.error(err);
      toast.error("Error saving job");

    }

  };

  const handleFilterChange = (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
  };

  if (loading) return <LoadingSpinner />;

  return (

    <div className="bg-[#0f0f0f] min-h-screen">

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10">

        <SearchHeader
          filters={filters}
          handleFilterChange={handleFilterChange}
          onSearch={() => fetchJobs(filters)}
        />

        <div className="flex gap-8 mt-8">

          <div className="w-72 flex-shrink-0 bg-[#141414] border border-white/10 rounded-xl p-6 h-fit sticky top-24">

            <FilterContent
              filters={filters}
              handleFilterChange={handleFilterChange}
              expandedSections={expandedSections}
              toggleSection={toggleSection}
              clearAllFilters={clearAllFilters}
            />

          </div>

          <div className="flex-1">

            <div className="flex justify-end mb-6 gap-2">

              <button
                onClick={() => setLayout("grid")}
                className={`p-2 rounded-lg border ${
                  layout === "grid"
                    ? "bg-orange-500 border-orange-500 text-white"
                    : "bg-[#1a1a1a] border-white/10 text-gray-400"
                }`}
              >
                <LayoutGrid size={18} />
              </button>

              <button
                onClick={() => setLayout("list")}
                className={`p-2 rounded-lg border ${
                  layout === "list"
                    ? "bg-orange-500 border-orange-500 text-white"
                    : "bg-[#1a1a1a] border-white/10 text-gray-400"
                }`}
              >
                <List size={18} />
              </button>

            </div>

            <div
              className={
                layout === "grid"
                  ? "grid md:grid-cols-2 xl:grid-cols-2 gap-6"
                  : "flex flex-col gap-6"
              }
            >

              {jobs.map((job) => (

                <JobCard
                  key={job._id}
                  job={job}
                  saved={job.isSaved}
                  onClick={() => navigate(`/job/${job._id}`)}
                  onApply={() => applyToJob(job._id)}
                  onToggleSave={() => toggleSaveJob(job._id)}
                />

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default JobSeekerDashboard;