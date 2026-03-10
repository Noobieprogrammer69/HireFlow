import { MapPin, IndianRupee, Building2, Clock, Users } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { API_PATHS } from "../../utils/api";
import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import moment from "moment";
import StatusBadge from "../../components/StatusBadge";
import toast from "react-hot-toast";
import { formatINR } from "../../utils/helper";

const JobDetails = () => {
  const { user } = useAuth();
  const { jobId } = useParams();

  const [jobDetails, setJobDetails] = useState(null);

  const getJobDetailById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.JOBS.GET_JOB_BY_ID(jobId),
        {
          params: { userId: user?._id || null },
        }
      );

      setJobDetails(response.data);
    } catch (error) {
      console.error("Fetching Job Details:", error);
    }
  };

  const applyToJob = async () => {
    try {
      if (jobId) {
        await axiosInstance.post(API_PATHS.APPLICATIONS.APPLY_TO_JOB(jobId));
        toast.success("Applied to job successfully");
      }

      getJobDetailById();
    } catch (error) {
      const errMsg = error?.response?.data?.message;
      toast.error(errMsg || "Something went wrong");
    }
  };

  useEffect(() => {
    if (jobId && user) {
      getJobDetailById();
    }
  }, [jobId, user]);

  return (
    <div className="bg-[#0f0f0f] min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 pt-24 pb-12">

        {jobDetails && (
          <div className="bg-[#141414] border border-white/10 rounded-xl p-8">

            <div className="border-b border-white/10 pb-8 mb-8">

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

                <div className="flex items-center gap-5">

                  {jobDetails?.company?.companyLogo ? (
                    <img
                      src={jobDetails.company.companyLogo}
                      alt="Company Logo"
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-[#1a1a1a] rounded-xl flex items-center justify-center">
                      <Building2 className="text-gray-400" size={28} />
                    </div>
                  )}

                  <div>
                    <h1 className="text-xl font-semibold text-white mb-1">
                      {jobDetails.title}
                    </h1>

                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <MapPin size={16} />
                      {jobDetails.location}
                    </div>
                  </div>

                </div>

                {jobDetails?.applicationStatus ? (
                  <StatusBadge status={jobDetails.applicationStatus} />
                ) : (
                  <button
                    onClick={applyToJob}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg font-semibold cursor-pointer"
                  >
                    Apply Now
                  </button>
                )}

              </div>

              <div className="flex flex-wrap gap-3 mt-6">

                <span className="bg-[#1a1a1a] text-gray-300 px-4 py-1.5 rounded-full text-sm">
                  {jobDetails.category}
                </span>

                <span className="bg-[#1a1a1a] text-gray-300 px-4 py-1.5 rounded-full text-sm">
                  {jobDetails.type}
                </span>

                <span className="flex items-center gap-2 bg-[#1a1a1a] text-gray-300 px-4 py-1.5 rounded-full text-sm">
                  <Clock size={14} />
                  {jobDetails?.createdAt
                    ? moment(jobDetails.createdAt).format("Do MMM YYYY")
                    : "N/A"}
                </span>

              </div>

            </div>

            <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 mb-8">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <div className="bg-orange-500 p-3 rounded-lg">
                    <IndianRupee className="text-white" size={20} />
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">Compensation</p>

                    <h3 className="text-lg font-semibold text-white">
                      {formatINR(jobDetails.salaryMin)} -{" "}
                      {formatINR(jobDetails.salaryMax)}
                      <span className="text-gray-400 ml-2 text-sm">
                        per year
                      </span>
                    </h3>
                  </div>

                </div>

                <div className="flex items-center gap-2 bg-[#0f0f0f] px-3 py-1 rounded-full text-gray-400 text-sm">
                  <Users size={16} />
                  Competitive
                </div>

              </div>

            </div>

            <div className="mb-10">

              <h3 className="text-lg font-semibold text-white mb-4">
                About This Role
              </h3>

              <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 text-gray-400 leading-relaxed whitespace-pre-wrap text-sm">
                {jobDetails.description}
              </div>

            </div>

            <div>

              <h3 className="text-lg font-semibold text-white mb-4">
                Requirements
              </h3>

              <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 text-gray-400 leading-relaxed whitespace-pre-wrap text-sm">
                {jobDetails.requirements}
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default JobDetails;