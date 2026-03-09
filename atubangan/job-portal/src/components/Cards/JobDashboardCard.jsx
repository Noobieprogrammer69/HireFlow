import { Briefcase } from "lucide-react";
import moment from "moment";

const JobDashboardCard = ({ job }) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-[#141414] hover:border-orange-500/40 hover:bg-[#181818] transition-all duration-300">

      <div className="flex items-center space-x-4">

        <div className="h-10 w-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
          <Briefcase className="h-5 w-5 text-orange-400" />
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white">
            {job.title || "Untitled Job"}
          </h4>

          <p className="text-xs text-gray-400">
            {job.location || "Remote"} •{" "}
            {moment(job.createdAt).format("Do MMM YYYY")}
          </p>
        </div>

      </div>

      <div>
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${
            !job.isClosed
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
          }`}
        >
          {job.isClosed ? "Closed" : "Active"}
        </span>
      </div>

    </div>
  );
};

export default JobDashboardCard;