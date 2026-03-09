import {
  MapPin,
  PhilippinePeso,
  ArrowLeft,
  Building2,
  Clock,
} from "lucide-react";
import { CATEGORIES, JOB_TYPES } from "../../utils/data";
import { useAuth } from "../../context/AuthContext";
import { formatINR } from "../../utils/helper";

const JobPostingPreview = ({ formData, setIsPreview }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0f0f0f] to-[#121212] py-10 px-6">
      <div className="max-w-4xl mx-auto">

        <div className="bg-[#141414]/90 border border-white/10 rounded-2xl shadow-2xl p-8">

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">
              Job Preview
            </h2>

            <button
              onClick={() => setIsPreview(false)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#1a1a1a] border border-white/10 text-gray-300 hover:bg-orange-500 hover:text-white transition cursor-pointer"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
          </div>

          <h1 className="text-2xl font-bold text-white mb-2">
            {formData.jobTitle}
          </h1>

          <div className="flex items-center text-gray-400 space-x-3 mb-4">
            <MapPin size={16} />
            <span>{formData.location}</span>
          </div>

          <div className="flex gap-3 mb-6">

            <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm">
              {CATEGORIES.find((c) => c.value === formData.category)?.label}
            </span>

            <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
              {JOB_TYPES.find((j) => j.value === formData.jobType)?.label}
            </span>

            <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm flex items-center gap-1">
              <Clock size={14} />
              Posted Today
            </span>

          </div>

          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5 mb-6">
            <div className="flex items-center space-x-2 text-orange-400 mb-2">
              <PhilippinePeso size={18} />
              <span className="font-semibold">Salary</span>
            </div>

            <div className="text-white text-lg font-semibold">
              {formatINR(formData.salaryMin)} - {formatINR(formData.salaryMax)} / year
            </div>
          </div>

          <div className="space-y-6">

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Job Description
              </h3>

              <p className="text-gray-400 whitespace-pre-wrap">
                {formData.description}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Requirements
              </h3>

              <p className="text-gray-400 whitespace-pre-wrap">
                {formData.requirements}
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default JobPostingPreview;