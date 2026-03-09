import DashboardLayout from "../../components/layout/DashboardLayout";
import { useState, useMemo, useEffect } from "react";
import { Search, Plus, Edit, X, Trash2, ChevronUp, ChevronDown, Users } from "lucide-react";
import axiosInstance from "../../utils/axios";
import { API_PATHS } from "../../utils/api";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ManageJobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("title");
  const [sortDirection, setSortDirection] = useState("asc");
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 8;

  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  const filteredAndSortedJobs = useMemo(() => {
    let filtered = jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || job.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === "applicants") {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }

      if (sortDirection === "asc") return aValue > bValue ? 1 : -1;
      else return aValue < bValue ? 1 : -1;
    });

    return filtered;
  }, [jobs, searchTerm, statusFilter, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredAndSortedJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedJobs = filteredAndSortedJobs.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSort = (field) => {
    if (sortField === field)
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleStatusChange = async (jobId) => {
    try {
      await axiosInstance.put(API_PATHS.JOBS.TOGGLE_CLOSE(jobId));
      getPostedJobs(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await axiosInstance.delete(API_PATHS.JOBS.DELETE_JOB(jobId));
      setJobs(jobs.filter((job) => job.id !== jobId));
      toast.success("Job deleted");
    } catch (error) {
      console.error(error);
    }
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field)
      return <ChevronUp className="w-4 h-4 text-gray-500" />;

    return sortDirection === "asc" ? (
      <ChevronUp className="w-4 h-4 text-orange-400" />
    ) : (
      <ChevronDown className="w-4 h-4 text-orange-400" />
    );
  };

  const getPostedJobs = async (disableLoader) => {
    setIsLoading(!disableLoader);

    try {
      const response = await axiosInstance.get(
        API_PATHS.JOBS.GET_JOBS_EMPLOYER
      );

      if (response.status === 200 && response.data?.length > 0) {
        const formatted = response.data.map((job) => ({
          id: job._id,
          title: job.title,
          company: job.company?.name,
          status: job.isClosed ? "Closed" : "Active",
          applicants: job.applicationCount || 0,
          datePosted: moment(job.createdAt).format("DD-MM-YYYY"),
        }));

        setJobs(formatted);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPostedJobs();
  }, []);

  return (
    <DashboardLayout activeMenu="manage-jobs">
      <div className="min-h-screen p-4 sm:p-6 bg-gradient-to-br from-black via-[#0f0f0f] to-[#121212]">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-white">Job Management</h1>
              <p className="text-gray-400 text-sm">Manage your job postings</p>
            </div>

            <button
              onClick={() => navigate("/post-job")}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/20 transition cursor-pointer w-full md:w-auto"
            >
              <Plus size={18} />
              Add Job
            </button>
          </div>

          <div className="bg-[#141414]/90 border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl">

            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 text-gray-500 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#1a1a1a] border border-white/10 text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 rounded-lg bg-[#1a1a1a] border border-white/10 text-white focus:ring-2 focus:ring-orange-500 outline-none"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            <div className="grid gap-4 md:hidden">
              {paginatedJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-4 rounded-xl bg-[#1a1a1a] border border-white/10"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-white font-semibold">{job.title}</p>
                      <p className="text-xs text-gray-400">{job.company}</p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        job.status === "Active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <button
                      onClick={() =>
                        navigate("/applicants", {
                          state: { jobId: job.id },
                        })
                      }
                      className="flex items-center gap-1 text-orange-400 text-sm"
                    >
                      <Users size={16} />
                      {job.applicants}
                    </button>

                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          navigate("/post-job", {
                            state: { jobId: job.id },
                          })
                        }
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 cursor-pointer"
                      >
                        <Edit size={16} />
                      </button>

                      <button
                        onClick={() => handleStatusChange(job.id)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-orange-400 cursor-pointer"
                      >
                        <X size={16} />
                      </button>

                      <button
                        onClick={() => handleDeleteJob(job.id)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-red-400 cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400 text-sm">
                    <th
                      onClick={() => handleSort("title")}
                      className="px-6 py-4 text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-1">
                        Job Title
                        <SortIcon field="title" />
                      </div>
                    </th>

                    <th
                      onClick={() => handleSort("status")}
                      className="px-6 py-4 text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-1">
                        Status
                        <SortIcon field="status" />
                      </div>
                    </th>

                    <th
                      onClick={() => handleSort("applicants")}
                      className="px-6 py-4 text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-1">
                        Applicants
                        <SortIcon field="applicants" />
                      </div>
                    </th>

                    <th className="px-6 py-4 text-left">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedJobs.map((job) => (
                    <tr
                      key={job.id}
                      className="border-b border-white/10 hover:bg-white/5 transition"
                    >
                      <td className="px-6 py-4">
                        <p className="text-white font-semibold">{job.title}</p>
                        <p className="text-xs text-gray-400">{job.company}</p>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-xs rounded-full ${
                            job.status === "Active"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-gray-500/20 text-gray-400"
                          }`}
                        >
                          {job.status}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <button
                          onClick={() =>
                            navigate("/applicants", {
                              state: { jobId: job.id },
                            })
                          }
                          className="flex items-center gap-1 text-orange-400 hover:text-orange-300 cursor-pointer"
                        >
                          <Users size={16} />
                          {job.applicants}
                        </button>
                      </td>

                      <td className="px-6 py-4 flex gap-2">
                        <button
                          onClick={() =>
                            navigate("/post-job", {
                              state: { jobId: job.id },
                            })
                          }
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 cursor-pointer"
                        >
                          <Edit size={16} />
                        </button>

                        <button
                          onClick={() => handleStatusChange(job.id)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-orange-400 cursor-pointer"
                        >
                          <X size={16} />
                        </button>

                        <button
                          onClick={() => handleDeleteJob(job.id)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-red-400 cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageJobs;