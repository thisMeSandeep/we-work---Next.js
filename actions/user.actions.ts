"use server"

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

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
