import { v2 as cloudinary } from "cloudinary";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const uploadToCloudinary = async (
  file: File,
  folder: string
): Promise<string> => {
  if (!file) throw new Error("No file provided");

  const ext = path.extname(file.name).replace(".", "").toLowerCase();
  const baseName = path.basename(file.name, path.extname(file.name));
  const mimeType = file.type || "application/octet-stream";
  const isPDF = ext === "pdf" || mimeType === "application/pdf";

  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = `data:${mimeType};base64,${buffer.toString("base64")}`;

  const result = await cloudinary.uploader.upload(base64, {
    folder,
    public_id: baseName,
    resource_type: "auto", 
    format: isPDF ? "pdf" : ext || undefined,
    overwrite: true,
  });

  return result.secure_url;
};
