import { useEffect, useState } from "react";
import {
  Plus,
  Briefcase,
  Users,
  Building2,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { API_PATHS } from "../../utils/api";
import DashboardLayout from "../../components/layout/DashboardLayout";
import LoadingSpinner from "../../components/LoadingSpinner";
import JobDashboardCard from "../../components/cards/JobDashboardCard";
import ApplicantDashboardCard from "../../components/cards/ApplicantDashboardCard";

const Card = ({ title, headerAction, subtitle, className, children }) => {
  return (
    <div
      className={`bg-[#141414]/70 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg hover:shadow-[0_0_20px_rgba(255,115,0,0.2)] transition-all duration-300 ${className}`}
    >
      {(title || headerAction) && (
        <div className="flex text-white items-center justify-between p-6 pb-4">
          <div>
            {title && (
              <h3 className="text-lg font-semibold text-white">{title}</h3>
            )}
            {subtitle && (
              <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
            )}
          </div>
          {headerAction}
        </div>
      )}
      <div className={title ? "px-6 pb-6" : "p-6"}>{children}</div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, trendValue }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#151515] border border-orange-500/20 p-6 shadow-lg hover:shadow-[0_0_25px_rgba(255,115,0,0.35)] transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <h3 className="text-3xl font-bold text-white mt-1">{value}</h3>

          <div className="flex items-center mt-2 text-sm text-orange-400">
            <TrendingUp className="h-4 w-4 mr-1" />
            {trendValue} this month
          </div>
        </div>

        <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

const EmployerDashboard = () => {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getDashboardOverview = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.OVERVIEW);
      if (response.status === 200) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDashboardOverview();
  }, []);

  return (
    <DashboardLayout activeMenu="employer-dashboard">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="max-w-7xl mx-auto space-y-8">

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-600 via-orange-500 to-red-500 p-8 text-white shadow-lg">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold">Employer Dashboard</h2>
                <p className="text-white/80 mt-1">
                  Track your job posts and manage applicants efficiently
                </p>
              </div>

              <button
                onClick={() => navigate("/post-job")}
                className="cursor-pointer mt-4 md:mt-0 bg-black/30 backdrop-blur px-6 py-2 rounded-xl hover:bg-black/50 transition"
              >
                Post New Job
              </button>
            </div>

            <div className="absolute -right-10 -top-10 h-40 w-40 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -left-10 bottom-0 h-40 w-40 bg-white/10 rounded-full blur-2xl"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
              title="Active Jobs"
              value={dashboardData?.counts?.totalActiveJobs || 0}
              icon={Briefcase}
              trendValue={`${dashboardData?.trends?.activeJobs}%`}
            />
            <StatCard
              title="Total Applicants"
              value={dashboardData?.counts?.totalApplications || 0}
              icon={Users}
              trendValue={`${dashboardData?.trends?.totalApplicants}%`}
            />
            <StatCard
              title="Hired"
              value={dashboardData?.counts?.totalHired || 0}
              icon={CheckCircle2}
              trendValue={`${dashboardData?.trends?.totalHired}%`}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            <Card
              title="Recent Job Posts"
              subtitle="Your latest job postings"
              headerAction={
                <button
                  className="cursor-pointer text-sm text-orange-400 hover:text-orange-300 font-medium"
                  onClick={() => navigate("/manage-jobs")}
                >
                  View all
                </button>
              }
            >
              <div className="space-y-3">
                {dashboardData?.data?.recentJobs
                  ?.slice(0, 3)
                  ?.map((job, index) => (
                    <JobDashboardCard key={index} job={job} />
                  ))}
              </div>
            </Card>

            <Card
              title="Recent Applications"
              subtitle="Latest candidate applications"
              headerAction={
                <button
                  className="cursor-pointer text-sm text-orange-400 hover:text-orange-300 font-medium"
                  // onClick={() => navigate("/applicants")}
                  onClick={() => navigate("/manage-jobs")}
                >
                  View all
                </button>
              }
            >
              <div className="space-y-3">
                {dashboardData?.data?.recentApplications
                  ?.slice(0, 3)
                  ?.map((data, index) => (
                    <ApplicantDashboardCard
                      key={index}
                      applicant={data?.applicant || ""}
                      position={data?.job?.title || ""}
                      time={moment(data?.updatedAt).fromNow()}
                    />
                  ))}
              </div>
            </Card>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: "Post New Job",
                description: "Create a new job listing",
                icon: Plus,
                path: "/post-job",
              },
              {
                title: "Review Applications",
                description: "Check candidates applying",
                icon: Users,
                path: "/manage-jobs",
              },
              {
                title: "Company Settings",
                description: "Update company details",
                icon: Building2,
                path: "/company-profile",
              },
            ].map((action, index) => (
              <button
                key={index}
                onClick={() => navigate(action.path)}
                className="group relative rounded-2xl border border-white/10 bg-[#161616] p-6 text-left hover:border-orange-500/40 hover:shadow-[0_0_25px_rgba(255,115,0,0.25)] transition"
              >
                <div className="h-12 w-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30">
                  <action.icon className="h-6 w-6 cursor-pointer" />
                </div>

                <h3 className="mt-4 font-semibold text-white">
                  {action.title}
                </h3>

                <p className="text-sm text-gray-400">
                  {action.description}
                </p>
              </button>
            ))}
          </div>

        </div>
      )}
    </DashboardLayout>
  );
};

export default EmployerDashboard;