import DashboardLayout from '../../components/layout/DashboardLayout';
import { useState, useEffect } from "react";
import {
  AlertCircle,
  MapPin,
  IndianRupee,
  Briefcase,
  Users,
  Eye,
  Send,
} from "lucide-react";
import { API_PATHS } from "../../utils/api";
import { useLocation, useNavigate } from "react-router-dom";
import { CATEGORIES, JOB_TYPES } from "../../utils/data";
import axiosInstance from "../../utils/axios";
import toast from "react-hot-toast";
import InputField from "../../components/Input/InputField";
import SelectField from "../../components/Input/SelectField";
import TextAreaField from "../../components/Input/TextAreaField";
import JobPostingPreview from "../../components/Cards/JobPostingPreview";

const JobPostingForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const jobId = location.state?.jobId || null;

  const [formData, setFormData] = useState({
    jobTitle: "",
    location: "",
    category: "",
    jobType: "",
    description: "",
    requirements: "",
    salaryMin: "",
    salaryMax: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = (formData) => {
    const errors = {};

    if (!formData.jobTitle.trim()) errors.jobTitle = "Job title is required";
    if (!formData.category) errors.category = "Please select a category";
    if (!formData.jobType) errors.jobType = "Please select a job type";
    if (!formData.description.trim())
      errors.description = "Job description is required";
    if (!formData.requirements.trim())
      errors.requirements = "Job requirements are required";

    if (!formData.salaryMin || !formData.salaryMax)
      errors.salary = "Both minimum and maximum salary are required";
    else if (parseInt(formData.salaryMin) >= parseInt(formData.salaryMax))
      errors.salary = "Maximum salary must be greater than minimum salary";

    return errors;
  };

  const isFormValid = () => {
    const validationErrors = validateForm(formData);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    const jobPayload = {
      title: formData.jobTitle,
      description: formData.description,
      requirements: formData.requirements,
      location: formData.location,
      category: formData.category,
      type: formData.jobType,
      salaryMin: formData.salaryMin,
      salaryMax: formData.salaryMax,
    };

    try {
      const response = jobId
        ? await axiosInstance.put(API_PATHS.JOBS.UPDATE_JOB(jobId), jobPayload)
        : await axiosInstance.post(API_PATHS.JOBS.POST_JOB, jobPayload);

      if (response.status === 200 || response.status === 201) {
        toast.success(
          jobId ? "Job Updated Successfully!" : "Job Posted Successfully!"
        );

        navigate("/employer-dashboard");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to post job");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!jobId) return;

    const fetchJob = async () => {
      try {
        const response = await axiosInstance.get(
          API_PATHS.JOBS.GET_JOB_BY_ID(jobId)
        );

        const job = response.data;

        setFormData({
          jobTitle: job.title,
          location: job.location,
          category: job.category,
          jobType: job.type,
          description: job.description,
          requirements: job.requirements,
          salaryMin: job.salaryMin,
          salaryMax: job.salaryMax,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchJob();
  }, []);

  if (isPreview) {
    return (
      <DashboardLayout activeMenu="post-job">
        <JobPostingPreview formData={formData} setIsPreview={setIsPreview} />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeMenu="post-job">
      <div className="min-h-screen bg-gradient-to-br from-black via-[#0f0f0f] to-[#121212] py-10 px-6">
        <div className="max-w-4xl mx-auto">

          <div className="bg-[#141414]/90 border border-white/10 rounded-2xl shadow-2xl p-8">

            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Post a New Job
                </h2>
                <p className="text-sm text-gray-400">
                  Fill out the form below to create your job posting
                </p>
              </div>

              <button
                onClick={() => setIsPreview(true)}
                disabled={!isFormValid()}
                className="flex items-center space-x-2 px-5 py-2 rounded-lg bg-[#1a1a1a] border border-white/10 text-gray-300 hover:bg-orange-500 hover:text-white transition cursor-pointer"
              >
                <Eye size={16} />
                <span>Preview</span>
              </button>
            </div>

            <div className="space-y-6">

              <InputField
                label="Job Title"
                id="jobTitle"
                placeholder="Senior Frontend Developer"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                error={errors.jobTitle}
                required
                icon={Briefcase}
              />

              <InputField
                label="Location"
                id="location"
                placeholder="City, Country"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                error={errors.location}
                required
                icon={MapPin}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <SelectField
                  label="Category"
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  options={CATEGORIES}
                  placeholder="Select category"
                  error={errors.category}
                  required
                  icon={Users}
                />

                <SelectField
                  label="Job Type"
                  id="jobType"
                  value={formData.jobType}
                  onChange={(e) =>
                    handleInputChange("jobType", e.target.value)
                  }
                  options={JOB_TYPES}
                  placeholder="Select job type"
                  error={errors.jobType}
                  required
                  icon={Briefcase}
                />

              </div>

              <TextAreaField
                label="Job Description"
                id="description"
                placeholder="Describe the role..."
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                error={errors.description}
                required
              />

              <TextAreaField
                label="Requirements"
                id="requirements"
                placeholder="Required skills..."
                value={formData.requirements}
                onChange={(e) =>
                  handleInputChange("requirements", e.target.value)
                }
                error={errors.requirements}
                required
              />

              <div>

                <label className="text-sm text-gray-300 mb-2 block">
                  Salary Range
                </label>

                <div className="grid grid-cols-2 gap-4">

                  <input
                    type="number"
                    placeholder="Min"
                    value={formData.salaryMin}
                    onChange={(e) =>
                      handleInputChange("salaryMin", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-lg bg-[#1a1a1a] border border-white/10 text-white focus:ring-2 focus:ring-orange-500 outline-none"
                  />

                  <input
                    type="number"
                    placeholder="Max"
                    value={formData.salaryMax}
                    onChange={(e) =>
                      handleInputChange("salaryMax", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-lg bg-[#1a1a1a] border border-white/10 text-white focus:ring-2 focus:ring-orange-500 outline-none"
                  />

                </div>

                {errors.salary && (
                  <div className="flex items-center text-red-400 text-sm mt-2">
                    <AlertCircle size={16} className="mr-2" />
                    {errors.salary}
                  </div>
                )}
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !isFormValid()}
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-lg font-medium bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white transition cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-5 w-5 border-b-2 border-white animate-spin"></div>
                    <span>Publishing...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Publish Job</span>
                  </>
                )}
              </button>

            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JobPostingForm;