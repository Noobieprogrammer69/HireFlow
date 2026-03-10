import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader,
  AlertCircle,
  CheckCircle,
  User,
  Upload,
  UserCheck,
  Building2,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  validateAvatar,
  validateEmail,
  validatePassword,
} from "../../utils/helper";
import { API_PATHS } from "../../utils/api";
import axiosInstance from "../../utils/axios";
import uploadImage from "../../utils/uploadImage";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
    avatar: null,
  });

  const [formState, setFormState] = useState({
    loading: false,
    errors: {},
    showPassword: false,
    avatarPreview: null,
    success: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formState.errors[name]) {
      setFormState((prev) => ({
        ...prev,
        errors: { ...prev.errors, [name]: "" },
      }));
    }
  };

  const handleRoleChange = (role) => {
    setFormData((prev) => ({ ...prev, role }));

    if (formState.errors.role) {
      setFormState((prev) => ({
        ...prev,
        errors: { ...prev.errors, role: "" },
      }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const error = validateAvatar(file);

    if (error) {
      setFormState((prev) => ({
        ...prev,
        errors: { ...prev.errors, avatar: error },
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, avatar: file }));

    const reader = new FileReader();

    reader.onload = (e) => {
      setFormState((prev) => ({
        ...prev,
        avatarPreview: e.target.result,
        errors: { ...prev.errors, avatar: "" },
      }));
    };

    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.fullName) errors.fullName = "Enter full name";

    const emailErrors = validateEmail(formData.email);
    if (emailErrors.length > 0) errors.email = emailErrors[0];

    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) errors.password = passwordErrors[0];

    if (!formData.role) errors.role = "Please select a role";

    setFormState((prev) => ({ ...prev, errors }));

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setFormState((prev) => ({ ...prev, loading: true }));

    try {
      let avatarUrl = "";

      if (formData.avatar) {
        const imgUploadRes = await uploadImage(formData.avatar);
        avatarUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        avatar: avatarUrl,
      });

      setFormState((prev) => ({
        ...prev,
        loading: false,
        success: true,
        errors: {},
      }));

      const { token } = response.data;

      if (token) {
        login(response.data, token);

        setTimeout(() => {
        navigate(
          formData.role === "employer"
            ? "/employer-dashboard"
            : "/find-jobs"
        )}, 2000);
      }
    } catch (error) {
      setFormState((prev) => ({
        ...prev,
        loading: false,
        errors: {
          submit:
            error.response?.data?.message ||
            "Register failed. Please try again",
        },
      }));
    }
  };

  if (formState.success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0f0f0f] to-[#121212] px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#141414]/90 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center"
        >
          <CheckCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />

          <h2 className="text-2xl font-bold text-white mb-2">
            Welcome!
          </h2>

          <p className="text-gray-400 mb-4">
            Your account has been successfully created.
          </p>

          <div className="animate-spin w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full mx-auto"></div>

          <p className="text-sm text-gray-500 mt-2">
            Redirecting to your dashboard...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0f0f0f] to-[#121212] px-4 py-24">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#141414]/90 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl max-w-md w-full"
      >

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            Create Account
          </h2>

          <p className="text-gray-400">
            Join thousands of professionals finding their dream jobs
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="text-sm text-gray-400 mb-2 block">
              Full Name
            </label>

            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#1a1a1a] border border-white/10 text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>

            {formState.errors.fullName && (
              <p className="text-red-400 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {formState.errors.fullName}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">
              Email
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#1a1a1a] border border-white/10 text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>

            {formState.errors.email && (
              <p className="text-red-400 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {formState.errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">
              Password
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />

              <input
                type={formState.showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full pl-10 pr-12 py-3 rounded-lg bg-[#1a1a1a] border border-white/10 text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setFormState((prev) => ({
                    ...prev,
                    showPassword: !prev.showPassword,
                  }))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white cursor-pointer"
              >
                {formState.showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {formState.errors.password && (
              <p className="text-red-400 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {formState.errors.password}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-3 block">
              I am a
            </label>

            <div className="grid grid-cols-2 gap-4">

              <button
                type="button"
                onClick={() => handleRoleChange("jobseeker")}
                className={`cursor-pointer p-4 rounded-xl border transition ${
                  formData.role === "jobseeker"
                    ? "border-orange-500 bg-orange-500/10"
                    : "border-white/10 hover:border-orange-500/40"
                }`}
              >
                <UserCheck className="w-7 h-7 mx-auto mb-2 text-orange-400" />
                <div className="text-sm text-white font-medium">
                  Job Seeker
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange("employer")}
                className={`cursor-pointer p-4 rounded-xl border transition ${
                  formData.role === "employer"
                    ? "border-orange-500 bg-orange-500/10"
                    : "border-white/10 hover:border-orange-500/40"
                }`}
              >
                <Building2 className="w-7 h-7 mx-auto mb-2 text-orange-400" />
                <div className="text-sm text-white font-medium">
                  Employer
                </div>
              </button>

            </div>

            {formState.errors.role && (
              <p className="text-red-400 text-sm mt-2 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {formState.errors.role}
              </p>
            )}
          </div>

          {formState.errors.submit && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <p className="text-red-400 text-sm flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                {formState.errors.submit}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={formState.loading}
            className="cursor-pointer w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition shadow-lg shadow-orange-500/30 flex justify-center items-center gap-2"
          >
            {formState.loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>

          <div className="text-center text-gray-400 text-sm">
            Already have an account?
            <a
              href="/login"
              className="text-orange-400 hover:text-orange-300 ml-1"
            >
              Sign in
            </a>
          </div>

        </form>
      </motion.div>

    </div>
  );
};

export default Register;