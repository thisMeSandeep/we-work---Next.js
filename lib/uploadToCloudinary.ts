import { v2 as cloudinary } from "cloudinary";

//  Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

//  Upload Function (No Streams)
export const uploadToCloudinary = async (
  file: File,
  folder: string
): Promise<string> => {
  if (!file) throw new Error("No file provided");

  // Convert File → Buffer → Base64
  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

  // Upload directly
  const result = await cloudinary.uploader.upload(base64, { folder });

  return result.secure_url;
};
