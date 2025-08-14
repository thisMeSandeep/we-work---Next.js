"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";

// get user profile
export const getUserProfileAction = async () => {
  try {
    const { userId, role } = await auth();

    let user;

    if (role == "FREELANCER") {
      user = await db.user.findUnique({
        where: { id: userId },
        omit: {
          password: true,
          emailOTP: true,
          otpExpiresAt: true,
          emailVerified: true,
        },
        include: {
          freelancerProfile: {
            include: {
              savedJobs: true,
              proposals: true,
              hiredJobs: true,
            },
          },
        },
      });
    } else {
      user = await db.user.findUnique({
        where: { id: userId },
        omit: {
          password: true,
          emailOTP: true,
          otpExpiresAt: true,
          emailVerified: true,
        },
        include: {
          clientProfile: {
            include: {
              postedJobs: true,
            },
          },
        },
      });
    }

    if (!user) {
      return { success: false, message: "User profile not found" };
    }

    return { success: true, user };
  } catch (err) {
    console.error("Error fetching User profile:", err);
    return {
      success: false,
      message: err instanceof Error ? err.message : "Internal server error",
    };
  }
};

// update user profile image
export const updateUserProfileImage = async (file: File) => {
  const { userId } = await auth();

  if (!file) {
    return {
      success: false,
      message: "No file provided",
    };
  }

  try {
    const profileUrl = await uploadToCloudinary(file, "user-profile-image");

    if (!profileUrl) throw new Error("url not found");

    // update the profile link in DB
    await db.user.update({
      where: { id: userId },
      data: {
        profileImage: profileUrl,
      },
    });

    return {
      success: true,
      message: "Profile image updated successfully",
    };
  } catch (err: any) {
    console.error("error in image upload:", err);
    return {
      success: false,
      message: err.message || "Internal server error",
    };
  }
};
