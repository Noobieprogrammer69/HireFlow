import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Save, X, ArrowLeft } from "lucide-react";
import axiosInstance from "../../utils/axios";
import { useAuth } from "../../context/AuthContext";

const EditProfileDetails = () => {

  const navigate = useNavigate();
  const { updateUser } = useAuth();

  const [saving, setSaving] = useState(false);

  const [uploading, setUploading] = useState({
    avatar: false,
    logo: false
  });

  const [formData, setFormData] = useState({
    avatar: "",
    name: "",
    email: "",
    companyLogo: "",
    companyName: "",
    companyDescription: ""
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {

    try {

      const res = await axiosInstance.get("/api/auth/me");

      setFormData({
        name: res.data.name || "",
        email: res.data.email || "",
        avatar: res.data.avatar || "",
        companyName: res.data.companyName || "",
        companyDescription: res.data.companyDescription || "",
        companyLogo: res.data.companyLogo || ""
      });

    } catch (err) {
      console.error(err);
    }

  };

  const handleInputChange = (field, value) => {

    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

  };

  const uploadImage = async (file, type) => {

    const data = new FormData();
    data.append("image", file);

    const res = await axiosInstance.post("/api/auth/upload-image", data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    return res.data.imageUrl;

  };

  const handleImageChange = async (e, field) => {

    const file = e.target.files[0];
    if (!file) return;

    try {

      if (field === "avatar") {
        setUploading(prev => ({ ...prev, avatar: true }));
      } else {
        setUploading(prev => ({ ...prev, logo: true }));
      }

      const imageUrl = await uploadImage(file);

      setFormData(prev => ({
        ...prev,
        [field === "avatar" ? "avatar" : "companyLogo"]: imageUrl
      }));

    } catch (err) {

      console.error("Upload failed", err);

    } finally {

      if (field === "avatar") {
        setUploading(prev => ({ ...prev, avatar: false }));
      } else {
        setUploading(prev => ({ ...prev, logo: false }));
      }

    }

  };

  const handleSave = async () => {

    try {

      setSaving(true);

      const res = await axiosInstance.put(
        "/api/user/profile",
        formData
      );

      updateUser(res.data);

      alert("Profile updated successfully");

      navigate(-1);

    } catch (err) {

      console.error(err);

    } finally {

      setSaving(false);

    }

  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (

    <DashboardLayout activeMenu="company-profile">

      <div className="max-w-5xl mx-auto px-4 py-8">

        <div className="mb-4">

          <button
            onClick={() => navigate(-1)}
            className="cursor-pointer flex items-center gap-2 text-gray-400 hover:text-white transition"
          >
            <ArrowLeft size={18}/>
            Back
          </button>

        </div>

        <div className="bg-[#141414]/90 border border-white/10 rounded-2xl shadow-xl overflow-hidden">

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-5">
            <h1 className="text-white text-lg font-semibold">
              Edit Profile
            </h1>
          </div>

          <div className="p-6 space-y-8">

            <div className="grid md:grid-cols-2 gap-8">

              {/* EMPLOYER INFO */}
              <div className="space-y-6">

                <h2 className="text-white font-semibold border-b border-white/10 pb-2">
                  Employer Information
                </h2>

                <div className="flex items-center gap-4">

                  <div className="relative">

                    <img
                      src={formData.avatar || "/default-avatar.png"}
                      className="w-20 h-20 rounded-full object-cover border border-white/10"
                    />

                    {uploading.avatar && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}

                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e)=>handleImageChange(e,"avatar")}
                    className="text-sm text-gray-400"
                  />

                </div>

                <div>

                  <label className="text-sm text-gray-400">
                    Full Name
                  </label>

                  <input
                    value={formData.name}
                    onChange={(e)=>handleInputChange("name",e.target.value)}
                    className="w-full mt-2 bg-[#1a1a1a] border border-white/10 text-white px-4 py-2 rounded-lg"
                  />

                </div>

                <div>

                  <label className="text-sm text-gray-400">
                    Email
                  </label>

                  <input
                    value={formData.email}
                    disabled
                    className="w-full mt-2 bg-[#1a1a1a] border border-white/10 text-gray-500 px-4 py-2 rounded-lg"
                  />

                </div>

              </div>

              {/* COMPANY INFO */}
              <div className="space-y-6">

                <h2 className="text-white font-semibold border-b border-white/10 pb-2">
                  Company Information
                </h2>

                <div className="flex items-center gap-4">

                  <img
                    src={formData.companyLogo || "/default-avatar.png"}
                    className="w-20 h-20 rounded-lg object-cover border border-white/10"
                  />

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e)=>handleImageChange(e,"logo")}
                    className="text-sm text-gray-400"
                  />

                </div>

                <input
                  value={formData.companyName}
                  onChange={(e)=>handleInputChange("companyName",e.target.value)}
                  placeholder="Company Name"
                  className="w-full bg-[#1a1a1a] border border-white/10 text-white px-4 py-2 rounded-lg"
                />

                <textarea
                  rows={4}
                  value={formData.companyDescription}
                  onChange={(e)=>handleInputChange("companyDescription",e.target.value)}
                  placeholder="Company Description"
                  className="w-full bg-[#1a1a1a] border border-white/10 text-white px-4 py-2 rounded-lg"
                />

              </div>

            </div>

            <div className="flex justify-end gap-4 pt-6 border-t border-white/10">

              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-5 py-2 rounded-lg border border-white/10 text-gray-400"
              >
                <X size={16}/>
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white"
              >
                {saving ? "Saving..." : <><Save size={16}/>Save Changes</>}
              </button>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>

  );

};

export default EditProfileDetails;