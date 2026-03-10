import { Bookmark, Building2, Calendar, MapPin } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import moment from "moment";
import StatusBadge from "../StatusBadge";

const JobCard = ({ job, onClick, onToggleSave, onApply, saved, hideApply }) => {
  const { user } = useAuth();

  const formatSalary = (min, max) => {
    const formatNumber = (num) => {
      if (num >= 1000) return `₱${(num / 1000).toFixed(0)}k`;
      return `₱${Math.round(num)}`;
    };

    const monthlyMin = min / 12;
    const monthlyMax = max ? max / 12 : null;

    if (monthlyMax) return `${formatNumber(monthlyMin)} – ${formatNumber(monthlyMax)} /mo`;
    return `${formatNumber(monthlyMin)} /mo`;
  };

  return (
    <div
      onClick={onClick}
      className="bg-[#141414] border border-white/10 rounded-xl p-6 hover:border-orange-500 transition cursor-pointer"
    >

      <div className="flex justify-between mb-4">

        <div className="flex gap-4">

          {job?.company?.companyLogo ? (
            <img
              src={job.company.companyLogo}
              className="w-12 h-12 rounded-lg object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-[#1a1a1a] rounded-lg flex items-center justify-center">
              <Building2 className="text-gray-400" size={22} />
            </div>
          )}

          <div>
            <h3 className="text-white font-semibold">
              {job?.title}
            </h3>

            <p className="text-gray-400 text-sm flex items-center gap-2">
              <Building2 size={14} />
              {job?.company?.companyName}
            </p>
          </div>

        </div>

        {user && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave();
            }}
            className="cursor-pointer text-gray-400 hover:text-orange-500"
          >
            <Bookmark
              className={job?.isSaved ? "text-orange-500" : ""}
            />
          </button>
        )}

      </div>

      <div className="flex gap-2 text-xs mb-4">
        <span className="bg-[#1a1a1a] px-3 py-1 rounded-full text-gray-400">
          {job.location}
        </span>
        <span className="bg-[#1a1a1a] px-3 py-1 rounded-full text-gray-400">
          {job.type}
        </span>
        <span className="bg-[#1a1a1a] px-3 py-1 rounded-full text-gray-400">
          {job.category}
        </span>
      </div>

      <div className="flex justify-between items-center text-sm border-t border-white/10 pt-4">

        <span className="text-gray-400 flex items-center gap-2">
          <Calendar size={14} />
          {moment(job.createdAt).format("Do MMM YYYY")}
        </span>

        <span className="text-orange-500 font-semibold">
          {formatSalary(job.salaryMin, job.salaryMax)}
        </span>

      </div>

      {!saved && (
        <div className="mt-4 flex justify-end">

          {job?.applicationStatus ? (
            <StatusBadge status={job.applicationStatus} />
          ) : (
            !hideApply && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onApply();
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg text-sm cursor-pointer"
              >
                Apply
              </button>
            )
          )}

        </div>
      )}

    </div>
  );
};

export default JobCard;