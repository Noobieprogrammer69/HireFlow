// import { useState, useEffect, useMemo } from "react";
// import {
//   Users,
//   Calendar,
//   MapPin,
//   Briefcase,
//   Download,
//   Eye,
//   ArrowLeft,
// } from "lucide-react";
// import axiosInstance from "../../utils/axios";
// import { API_PATHS } from "../../utils/api";
// import { useLocation, useNavigate } from "react-router-dom";
// import moment from "moment";
// import { getInitials } from "../../utils/helper";
// import DashboardLayout from "../../components/layout/DashboardLayout";
// import StatusBadge from "../../components/StatusBadge";
// import ApplicantProfilePreview from "../../components/Cards/ApplicantProfilePreview";

// const ApplicationViewer = () => {
//   const location = useLocation();
//   const jobId = location.state?.jobId || null;

//   const navigate = useNavigate();

//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedApplicant, setSelectedApplicant] = useState(null);

//   const fetchApplications = async () => {
//   if (!jobId) return;

//   try {
//     setLoading(true);

//     const response = await axiosInstance.get(
//       API_PATHS.APPLICATIONS.GET_ALL_APPLICATIONS(jobId)
//     );

//     setApplications(response.data);

//   } catch (error) {
//     console.error("Failed to fetch applications", error);
//   } finally {
//     setLoading(false);
//   }
// };

//   useEffect(() => {
//     fetchApplications();
//   }, []);

//   const groupedApplications = useMemo(() => {
//     return applications.reduce((acc, app) => {
//       const jobId = app.job._id;
//       if (!acc[jobId]) {
//         acc[jobId] = {
//           job: app.job,
//           applications: [],
//         };
//       }
//       acc[jobId].applications.push(app);
//       return acc;
//     }, {});
//   }, [applications]);

//   const handleDownloadResume = (resumeUrl) => {
//     window.open(resumeUrl, "_blank");
//   };

//   return (
//     <DashboardLayout activeMenu="manage-jobs">
//       <div className="min-h-screen bg-gradient-to-br from-black via-[#0f0f0f] to-[#121212] p-4 sm:p-6">
//         {loading && (
//           <div className="flex items-center justify-center h-[60vh]">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-2 border-orange-500 border-t-transparent mx-auto"></div>
//               <p className="mt-4 text-gray-400">Loading applications...</p>
//             </div>
//           </div>
//         )}

//         <div className="max-w-7xl mx-auto">

//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={() => navigate("/manage-jobs")}
//                 className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a1a1a] border border-white/10 text-gray-300 hover:bg-orange-500 hover:text-white transition cursor-pointer"
//               >
//                 <ArrowLeft size={16} />
//                 Back
//               </button>
//               <h1 className="text-xl md:text-2xl font-semibold text-white">
//                 Applications Overview
//               </h1>
//             </div>
//           </div>

//           <div className="space-y-6">

//             {Object.keys(groupedApplications).length === 0 ? (
//               <div className="text-center py-16">
//                 <Users className="mx-auto h-24 w-24 text-gray-600" />
//                 <h3 className="mt-4 text-lg font-medium text-white">
//                   No applications available
//                 </h3>
//                 <p className="mt-2 text-gray-400">
//                   No applications found at the moment
//                 </p>
//               </div>
//             ) : (
//               Object.values(groupedApplications).map(
//                 ({ job, applications }) => (
//                   <div
//                     key={job._id}
//                     className="bg-[#141414] border border-white/10 rounded-2xl shadow-xl overflow-hidden"
//                   >

//                     <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
//                       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//                         <div>
//                           <h2 className="text-lg font-semibold text-white">
//                             {job.title}
//                           </h2>
//                           <div className="flex flex-wrap items-center gap-4 mt-2 text-orange-100">
//                             <div className="flex items-center gap-1 text-sm">
//                               <MapPin size={14} />
//                               {job.location}
//                             </div>
//                             <div className="flex items-center gap-1 text-sm">
//                               <Briefcase size={14} />
//                               {job.type}
//                             </div>
//                             <div className="text-sm">{job.category}</div>
//                           </div>
//                         </div>

//                         <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-white text-sm font-semibold">
//                           {applications.length} Application
//                           {applications.length !== 1 ? "s" : ""}
//                         </div>
//                       </div>
//                     </div>

//                     <div className="p-4 sm:p-6 space-y-4">

//                       {applications.map((application) => (
//                         <div
//                           key={application._id}
//                           className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-xl border border-white/10 bg-[#1a1a1a] hover:bg-[#222] transition"
//                         >

//                           <div className="flex items-center gap-4">

//                             {application.applicant.avatar ? (
//                               <img
//                                 src={application.applicant.avatar}
//                                 alt={application.applicant.name}
//                                 className="h-12 w-12 rounded-full object-cover"
//                               />
//                             ) : (
//                               <div className="h-12 w-12 rounded-full bg-orange-500/20 flex items-center justify-center">
//                                 <span className="text-orange-400 font-semibold">
//                                   {getInitials(application.applicant.name)}
//                                 </span>
//                               </div>
//                             )}

//                             <div className="min-w-0">
//                               <h3 className="font-semibold text-white">
//                                 {application.applicant.name}
//                               </h3>

//                               <p className="text-sm text-gray-400">
//                                 {application.applicant.email}
//                               </p>

//                               <div className="flex items-center gap-1 mt-1 text-gray-500 text-xs">
//                                 <Calendar size={12} />
//                                 Applied{" "}
//                                 {moment(application.createdAt).format(
//                                   "Do MMM YYYY"
//                                 )}
//                               </div>
//                             </div>
//                           </div>

//                           <div className="flex flex-wrap items-center gap-3">

//                             <StatusBadge status={application.status} />

//                             <button
//                               onClick={() =>
//                                 handleDownloadResume(
//                                   application.applicant.resume
//                                 )
//                               }
//                               className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-lg transition cursor-pointer"
//                             >
//                               <Download size={16} />
//                               Resume
//                             </button>

//                             <button
//                               onClick={() =>
//                                 setSelectedApplicant(application)
//                               }
//                               className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-gray-200 text-sm rounded-lg transition cursor-pointer"
//                             >
//                               <Eye size={16} />
//                               View
//                             </button>

//                           </div>

//                         </div>
//                       ))}

//                     </div>
//                   </div>
//                 )
//               )
//             )}
//           </div>
//         </div>

//         {selectedApplicant && (
//           <ApplicantProfilePreview
//             selectedApplicant={selectedApplicant}
//             setSelectedApplicant={setSelectedApplicant}
//             handleDownloadResume={handleDownloadResume}
//             handleClose={() => {
//               setSelectedApplicant(null);
//               fetchApplications();
//             }}
//           />
//         )}
//       </div>
//     </DashboardLayout>
//   );
// };

// export default ApplicationViewer;

import { useState, useEffect, useMemo } from "react";
import {
  Users,
  Calendar,
  MapPin,
  Briefcase,
  Download,
  Eye,
  ArrowLeft,
  MessageCircle
} from "lucide-react";
import axiosInstance from "../../utils/axios";
import { API_PATHS } from "../../utils/api";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { getInitials } from "../../utils/helper";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatusBadge from "../../components/StatusBadge";
import ApplicantProfilePreview from "../../components/Cards/ApplicantProfilePreview";

const ApplicationViewer = () => {

  const location = useLocation();
  const jobId = location.state?.jobId || null;
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const fetchApplications = async () => {

    if (!jobId) return;

    try {

      setLoading(true);

      const response = await axiosInstance.get(
        API_PATHS.APPLICATIONS.GET_ALL_APPLICATIONS(jobId)
      );

      setApplications(response.data);

    } catch (error) {

      console.error("Failed to fetch applications", error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const groupedApplications = useMemo(() => {

    return applications.reduce((acc, app) => {

      const jobId = app.job._id;

      if (!acc[jobId]) {

        acc[jobId] = {
          job: app.job,
          applications: [],
        };

      }

      acc[jobId].applications.push(app);

      return acc;

    }, {});

  }, [applications]);

  const handleDownloadResume = (resumeUrl) => {

    window.open(resumeUrl, "_blank");

  };

  const handleOpenChat = (applicationId) => {

    navigate(`/chat/${applicationId}`);

  };

  return (

    <DashboardLayout activeMenu="manage-jobs">

      <div className="min-h-screen bg-gradient-to-br from-black via-[#0f0f0f] to-[#121212] p-4 sm:p-6">

        {loading && (

          <div className="flex items-center justify-center h-[60vh]">

            <div className="text-center">

              <div className="animate-spin rounded-full h-12 w-12 border-2 border-orange-500 border-t-transparent mx-auto"></div>

              <p className="mt-4 text-gray-400">Loading applications...</p>

            </div>

          </div>

        )}

        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

            <div className="flex items-center gap-4">

              <button
                onClick={() => navigate("/manage-jobs")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a1a1a] border border-white/10 text-gray-300 hover:bg-orange-500 hover:text-white transition cursor-pointer"
              >
                <ArrowLeft size={16} />
                Back
              </button>

              <h1 className="text-xl md:text-2xl font-semibold text-white">
                Applications Overview
              </h1>

            </div>

          </div>

          <div className="space-y-6">

            {Object.keys(groupedApplications).length === 0 ? (

              <div className="text-center py-16">

                <Users className="mx-auto h-24 w-24 text-gray-600" />

                <h3 className="mt-4 text-lg font-medium text-white">
                  No applications available
                </h3>

                <p className="mt-2 text-gray-400">
                  No applications found at the moment
                </p>

              </div>

            ) : (

              Object.values(groupedApplications).map(
                ({ job, applications }) => (

                  <div
                    key={job._id}
                    className="bg-[#141414] border border-white/10 rounded-2xl shadow-xl overflow-hidden"
                  >

                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">

                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                        <div>

                          <h2 className="text-lg font-semibold text-white">
                            {job.title}
                          </h2>

                          <div className="flex flex-wrap items-center gap-4 mt-2 text-orange-100">

                            <div className="flex items-center gap-1 text-sm">
                              <MapPin size={14} />
                              {job.location}
                            </div>

                            <div className="flex items-center gap-1 text-sm">
                              <Briefcase size={14} />
                              {job.type}
                            </div>

                            <div className="text-sm">
                              {job.category}
                            </div>

                          </div>

                        </div>

                        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-white text-sm font-semibold">
                          {applications.length} Application
                          {applications.length !== 1 ? "s" : ""}
                        </div>

                      </div>

                    </div>

                    <div className="p-4 sm:p-6 space-y-4">

                      {applications.map((application) => {

                        const status = application.status?.toLowerCase();

                        return (

                          <div
                            key={application._id}
                            className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-xl border border-white/10 bg-[#1a1a1a] hover:bg-[#222] transition"
                          >

                            <div className="flex items-center gap-4">

                              {application.applicant.avatar ? (

                                <img
                                  src={application.applicant.avatar}
                                  alt={application.applicant.name}
                                  className="h-12 w-12 rounded-full object-cover"
                                />

                              ) : (

                                <div className="h-12 w-12 rounded-full bg-orange-500/20 flex items-center justify-center">

                                  <span className="text-orange-400 font-semibold">

                                    {getInitials(application.applicant.name)}

                                  </span>

                                </div>

                              )}

                              <div className="min-w-0">

                                <h3 className="font-semibold text-white">
                                  {application.applicant.name}
                                </h3>

                                <p className="text-sm text-gray-400">
                                  {application.applicant.email}
                                </p>

                                <div className="flex items-center gap-1 mt-1 text-gray-500 text-xs">

                                  <Calendar size={12} />

                                  Applied{" "}

                                  {moment(application.createdAt).format(
                                    "Do MMM YYYY"
                                  )}

                                </div>

                              </div>

                            </div>

                            <div className="flex flex-wrap items-center gap-3">

                              <StatusBadge status={application.status} />

                              <button
                                onClick={() =>
                                  handleDownloadResume(
                                    application.applicant.resume
                                  )
                                }
                                className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-lg transition cursor-pointer"
                              >
                                <Download size={16} />
                                Resume
                              </button>

                              <button
                                onClick={() =>
                                  setSelectedApplicant(application)
                                }
                                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-gray-200 text-sm rounded-lg transition cursor-pointer"
                              >
                                <Eye size={16} />
                                View
                              </button>

                              {status === "accepted" && (

                                <button
                                  onClick={() =>
                                    handleOpenChat(application._id)
                                  }
                                  className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition cursor-pointer"
                                >
                                  <MessageCircle size={16} />
                                  Chat
                                </button>

                              )}

                            </div>

                          </div>

                        );

                      })}

                    </div>

                  </div>

                )
              )
            )}

          </div>

        </div>

        {selectedApplicant && (

          <ApplicantProfilePreview
            selectedApplicant={selectedApplicant}
            setSelectedApplicant={setSelectedApplicant}
            handleDownloadResume={handleDownloadResume}
            handleClose={() => {
              setSelectedApplicant(null);
              fetchApplications();
            }}
          />

        )}

      </div>

    </DashboardLayout>

  );

};

export default ApplicationViewer;