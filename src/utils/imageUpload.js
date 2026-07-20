import toast from "react-hot-toast";

export const uploadImage = async (imageFile) => {
  const imageData = new FormData();
  imageData.append("image", imageFile);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
    {
      method: "POST",
      body: imageData,
    },
  );
  const imageResult = await response.json();

  if (!imageResult.success) {
    toast.error("Image upload failed");
  }
  return imageResult.data.url;
};
