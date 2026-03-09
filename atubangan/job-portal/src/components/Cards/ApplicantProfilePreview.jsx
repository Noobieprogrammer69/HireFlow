import { Download, X } from "lucide-react";
import { useState } from "react";
import { getInitials } from "../../utils/helper";
import { API_PATHS } from "../../utils/api";
import axiosInstance from "../../utils/axios";
import moment from "moment";
import toast from "react-hot-toast";
import StatusBadge from "../StatusBadge";
import "../../index.css";

const statusOptions = ["Applied", "In Review", "Rejected", "Accepted"];

const ApplicantProfilePreview = ({
  selectedApplicant,
  setSelectedApplicant,
  handleDownloadResume,
  handleClose,
}) => {
  const [currentStatus, setCurrentStatus] = useState(selectedApplicant.status);
  const [loading, setLoading] = useState(false);

  const onChangeStatus = async (e) => {
    const newStatus = e.target.value;
    setCurrentStatus(newStatus);
    setLoading(true);

    try {
      const response = await axiosInstance.put(
        API_PATHS.APPLICATIONS.UPDATE_STATUS(selectedApplicant._id),
        { status: newStatus }
      );

      if (response.status === 200) {
        setSelectedApplicant({ ...selectedApplicant, status: newStatus });
        toast.success("Application status updated successfully");
      }
    } catch (error) {
      console.error(error);
      setCurrentStatus(selectedApplicant.status);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[#141414] border border-white/10 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto hide-scrollbar">

        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h3 className="text-lg font-semibold text-white">
            Applicant Profile
          </h3>
          <button
            onClick={() => handleClose()}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition cursor-pointer"
          >
            <X className="h-5 w-5 text-gray-300" />
          </button>
        </div>

        <div className="p-6">

          <div className="text-center mb-6">
            {selectedApplicant.applicant.avatar ? (
              <img
                src={selectedApplicant.applicant.avatar}
                alt={selectedApplicant.applicant.name}
                className="h-20 w-20 rounded-full object-cover mx-auto"
              />
            ) : (
              <div className="h-20 w-20 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto">
                <span className="text-orange-400 font-semibold text-xl">
                  {getInitials(selectedApplicant.applicant.name)}
                </span>
              </div>
            )}

            <h4 className="mt-4 text-xl font-semibold text-white">
              {selectedApplicant.applicant.name}
            </h4>

            <p className="text-gray-400 text-sm">
              {selectedApplicant.applicant.email}
            </p>
          </div>

          <div className="space-y-4">

            <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4">
              <h5 className="font-medium text-white mb-2">
                Applied Position
              </h5>

              <p className="text-gray-300">
                {selectedApplicant.job.title}
              </p>

              <p className="text-gray-500 text-sm mt-1">
                {selectedApplicant.job.location} – {selectedApplicant.job.type}
              </p>
            </div>

            <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4">
              <h5 className="font-medium text-white mb-3">
                Application Details
              </h5>

              <div className="space-y-2">

                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">
                    Status
                  </span>
                  <StatusBadge status={currentStatus} />
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">
                    Applied Date
                  </span>

                  <span className="text-gray-300 text-sm">
                    {moment(selectedApplicant.createdAt).format("Do MMM YYYY")}
                  </span>
                </div>

              </div>
            </div>

            <button
              onClick={() =>
                handleDownloadResume(selectedApplicant.applicant.resume)
              }
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-xl transition cursor-pointer"
            >
              <Download size={16} />
              Download Resume
            </button>

            <div>
              <label className="block mb-2 text-sm text-gray-400 font-medium">
                Change Application Status
              </label>

              <select
                value={currentStatus}
                onChange={onChangeStatus}
                disabled={loading}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-orange-500 outline-none"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              {loading && (
                <p className="text-xs text-gray-500 mt-2">
                  Updating status...
                </p>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ApplicantProfilePreview;