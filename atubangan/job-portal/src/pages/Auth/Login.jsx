import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";
import { validateEmail } from "../../utils/helper";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { API_PATHS } from "../../utils/api";
import axiosInstance from "../../utils/axios";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [formState, setFormState] = useState({
    loading: false,
    errors: {},
    showPassword: false,
    success: false,
  });

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    return "";
  };

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

  const validateForm = () => {
    const errors = {};

    const emailErrors = validateEmail(formData.email);
    if (emailErrors.length > 0) errors.email = emailErrors[0];

    const passwordError = validatePassword(formData.password);
    if (passwordError) errors.password = passwordError;

    setFormState((prev) => ({ ...prev, errors }));

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setFormState((prev) => ({ ...prev, loading: true }));

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
      });

      setFormState((prev) => ({
        ...prev,
        loading: false,
        success: true,
        errors: {},
      }));

      const { token, role } = response.data;

      if (token) {
        login(response.data, token);

        setTimeout(() => {
        navigate(
          role === "employer"
            ? "/employer-dashboard"
            : "/find-jobs"
        )}, 1500);
      }
    } catch (error) {
      setFormState((prev) => ({
        ...prev,
        loading: false,
        errors: {
          submit:
            error.response?.data?.message ||
            "Login Failed. Please Try Again",
        },
      }));
    }
  };

  const handleGoogleLogin = async () => {
  try {

    const result = await signInWithPopup(auth, googleProvider);

    const firebaseToken = await result.user.getIdToken();

    const response = await axiosInstance.post(
      "/api/auth/firebase-login",
      {
        idToken: firebaseToken,
        role: "jobseeker"
      }
    );

    const { token, user } = response.data;

    login(user, token);

    navigate(
      user.role === "employer"
        ? "/employer-dashboard"
        : "/find-jobs"
    );

  } catch (error) {
    console.error("Google Login Failed", error);
  }
};

  if (formState.success) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0f0f0f] to-[#121212] px-4 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-[#141414]/90 border border-white/10 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center"
        >
          <CheckCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Welcome Back!
          </h2>
          <p className="text-gray-400 mb-4">
            You have been successfully logged in
          </p>

          <div className="animate-spin w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full mx-auto"></div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0f0f0f] to-[#121212] px-4 overflow-hidden">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#141414]/90 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl max-w-md w-full"
      >

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-400">
            Sign in to your Job Portal account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Email Address
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#1a1a1a] border border-white/10 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
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
                className="w-full pl-10 pr-12 py-3 rounded-lg bg-[#1a1a1a] border border-white/10 text-white"
              />

              <button
                type="button"
                onClick={() =>
                  setFormState((prev) => ({
                    ...prev,
                    showPassword: !prev.showPassword,
                  }))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {formState.showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {formState.errors.submit && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-red-400 text-sm flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                {formState.errors.submit}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={formState.loading}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold"
          >
            {formState.loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin inline mr-2" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full mt-3 bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Continue with Google
          </button>

          <div className="text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-orange-400 hover:text-orange-300 font-medium"
              >
                Create Here
              </Link>
            </p>
          </div>

        </form>
      </motion.div>
    </div>
  );
};

export default Login;