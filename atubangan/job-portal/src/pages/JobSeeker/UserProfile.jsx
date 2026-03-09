import { Save, X, Trash2, Upload, FileText, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../utils/axios";
import { API_PATHS } from "../../utils/api";
import toast from "react-hot-toast";
import uploadImage from "../../utils/uploadImage";
import Navbar from "../../components/layout/Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
    resume: user?.resume || "",
  });

  const [formData, setFormData] = useState({ ...profileData });

  const [uploading, setUploading] = useState({
    avatar: false,
    resume: false,
  });

  const [saving, setSaving] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = async (file, type) => {
    setUploading((prev) => ({ ...prev, [type]: true }));

    try {
      const uploadRes = await uploadImage(file);

      const url =
        uploadRes?.imageUrl ||
        uploadRes?.fileUrl ||
        uploadRes?.url ||
        "";

      handleInputChange(type, url);
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Upload failed");
    } finally {
      setUploading((prev) => ({ ...prev, [type]: false }));
    }
  };

  const handleImageChange = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadRes = await uploadImage(file);

    handleInputChange(type, uploadRes.imageUrl);

    handleImageUpload(file, type);
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      const res = await axiosInstance.put(
        API_PATHS.AUTH.UPDATE_PROFILE,
        formData
      );

      if (res.status === 200) {
        toast.success("Profile updated successfully");

        setProfileData({ ...formData });
        updateUser({ ...formData });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({ ...profileData });
  };

  const deleteResume = async () => {
    try {
      const res = await axiosInstance.post(API_PATHS.AUTH.DELETE_RESUME, {
        resumeUrl: formData.resume || "",
      });

      if (res.status === 200) {
        toast.success("Resume deleted successfully");

        const updated = { ...formData, resume: "" };

        setFormData(updated);
        setProfileData(updated);
        updateUser(updated);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete resume");
    }
  };

  useEffect(() => {
    const userData = {
      name: user?.name || "",
      email: user?.email || "",
      avatar: user?.avatar || "",
      resume: user?.resume || "",
    };

    setProfileData(userData);
    setFormData(userData);
  }, [user]);

  return (
    <div className="bg-[#0f0f0f] min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
          <button
            onClick={() => navigate(-1)}
            className="flex cursor-pointer items-center gap-2 text-gray-400 hover:text-white mb-6 transition"
          >
            <ArrowLeft size={18} />
            Back
          </button>

        <div className="bg-[#141414] border border-white/10 rounded-xl p-8">

          <div className="border-b border-white/10 pb-6 mb-8">
            <h1 className="text-xl font-semibold text-white">
              Your Profile
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Manage your personal information and resume
            </p>
          </div>

          <div className="flex items-center gap-6 mb-8">

            <div className="relative">
              <img
                src={formData.avatar || "../../assets/hireflow-bg.png"}
                alt="avatar"
                className="w-20 h-20 rounded-full object-cover border border-white/10"
              />

              {uploading.avatar && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            <label className="cursor-pointer flex items-center gap-2 text-sm text-gray-300 bg-[#1a1a1a] px-4 py-2 rounded-lg border border-white/10 hover:bg-[#222] transition">
              <Upload size={16} />
              Upload Photo
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => handleImageChange(e, "avatar")}
              />
            </label>

          </div>

          <div className="mb-6">
            <label className="text-sm text-gray-400 block mb-2">
              Full Name
            </label>

            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                handleInputChange("name", e.target.value)
              }
              className="w-full bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 rounded-lg outline-none"
            />
          </div>

          <div className="mb-8">
            <label className="text-sm text-gray-400 block mb-2">
              Email Address
            </label>

            <input
              type="email"
              value={formData.email}
              disabled
              className="w-full bg-[#1a1a1a] border border-white/10 text-gray-500 px-4 py-3 rounded-lg"
            />
          </div>

          <div className="mb-8">
            <h3 className="text-white font-semibold mb-4">
              Resume
            </h3>

            {formData.resume ? (
              <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-4 flex justify-between items-center">

                <div className="flex items-center gap-3">
                  <FileText className="text-gray-400" size={20} />

                  <a
                    href={formData.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-300 text-sm underline"
                  >
                    View Resume
                  </a>
                </div>

                <button
                  onClick={deleteResume}
                  className="text-red-400 hover:text-red-500 cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>

              </div>
            ) : (
              <label className="cursor-pointer flex items-center gap-2 text-sm text-gray-300 bg-[#1a1a1a] px-4 py-3 rounded-lg border border-white/10 hover:bg-[#222] transition">
                <Upload size={16} />
                Upload Resume
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  hidden
                  onChange={(e) => handleImageChange(e, "resume")}
                />
              </label>
            )}
          </div>

         <div className="flex justify-end gap-4 border-t border-white/10 pt-6">

            <Link
              to="/find-jobs"
              onClick={handleCancel}
              className="px-5 py-2.5 border border-white/10 text-gray-300 rounded-lg hover:bg-[#1a1a1a] flex items-center gap-2"
            >
              <X size={16} />
              Cancel
            </Link>

            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 cursor-pointer"
            >
              {saving ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Save size={16} />
              )}
              {saving ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default UserProfile;