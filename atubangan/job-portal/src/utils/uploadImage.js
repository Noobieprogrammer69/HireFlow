import axiosInstance from "./axios";

const uploadImage = async (file) => {

  try {

    const formData = new FormData();
    formData.append("image", file);

    const res = await axiosInstance.post(
      "/api/auth/upload-image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    return res.data;

  } catch (error) {

    console.error("Error Uploading the image", error);
    throw error;

  }

};

export default uploadImage;