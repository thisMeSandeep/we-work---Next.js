"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  freelancerProfileSchema,
  proposalSchema,
  ProposalType,
  type FreelancerProfileType,
} from "@/lib/validation";



// create freelancer profile
export const fillFreelancerProfileAction = async (
  data: FreelancerProfileType
) => {
  // validate data
  const result = freelancerProfileSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      message: result.error.issues.map((issue) => issue.message).join(", "),
    };
  }

  try {
    // get userId from auth
    const { userId } = await auth();

    // Use upsert to create or update the profile
    await db.freelancerProfile.upsert({
      where: { userId },
      update: data,
      create: {
        ...data,
        userId,
      },
    });

    return {
      success: true,
      message: "Profile created successfully",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: err instanceof Error ? err.message : "Authentication failed",
    };
  }
};

// get freelancer profile
export const getFreelancerProfileAction = async () => {
  try {
    const { userId } = await auth();

    const freelancer = await db.user.findUnique({
      where: { id: userId },
      omit: {
        password: true,
        emailOTP: true,
        otpExpiresAt: true,
        emailVerified: true,
      },
      include: {
        freelancerProfile: true,
      },
    });

    if (!freelancer) {
      return { success: false, message: "Freelancer profile not found" };
    }

    return { success: true, user: freelancer };
  } catch (err) {
    console.error("Error fetching freelancer profile:", err);
    return {
      success: false,
      message: err instanceof Error ? err.message : "Internal server error",
    };
  }
};

// save a job
export const saveJobAction = async (jobId: string) => {
  try {
    const { userId } = await auth();

    await db.freelancerProfile.update({
      where: { userId },
      data: {
        savedJobs: {
          connect: { id: jobId },
        },
      },
    });

    return { success: true, message: "Job saved successfully" };
  } catch (err) {
    console.error("Failed to save job:", err);
    return {
      success: false,
      message: err instanceof Error ? err.message : "Internal server error",
    };
  }
};

// remove a saved job
export const removeSavedJob = async (jobId: string) => {
  try {
    const { userId } = await auth();

    await db.freelancerProfile.update({
      where: { userId },
      data: {
        savedJobs: {
          disconnect: { id: jobId },
        },
      },
    });

    return { success: true, message: "Saved job removed successfully" };
  } catch (err) {
    console.error("Failed to remove saved job:", err);
    return {
      success: false,
      message: err instanceof Error ? err.message : "Internal server error",
    };
  }
};

// make a proposal
export const makeProposalAction = async (data: unknown) => {
  // Validate proposal data
  const result = proposalSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      message: result.error.issues.map((issue) => issue.message).join(", "),
    };
  }
  const proposalData = result.data;

  try {
    // Get authenticated userId
    const { userId } = await auth();

    // Verify freelancerProfile belongs to this user
    const freelancerProfile = await db.freelancerProfile.findUnique({
      where: { id: proposalData.freelancerProfileId },
    });
    if (!freelancerProfile || freelancerProfile.userId !== userId) {
      return { success: false, message: "Unauthorized freelancer profile" };
    }

    // Validate job exists and is OPEN
    const job = await db.job.findUnique({ where: { id: proposalData.jobId } });
    if (!job) {
      return { success: false, message: "Job not found or deleted" };
    }
    if (job.status !== "OPEN") {
      return { success: false, message: "Application for this job has closed" };
    }

    // Create proposal
    await db.proposal.create({
      data: {
        coverLetter: proposalData.coverLetter,
        message: proposalData.message,
        rate: proposalData.rate,
        freelancerProfileId: proposalData.freelancerProfileId,
        jobId: proposalData.jobId,
        status: "PENDING",
      },
    });

    // Increment number of proposals atomically
    await db.job.update({
      where: { id: proposalData.jobId },
      data: { numberOfProposals: { increment: 1 } },
    });

    return { success: true, message: "Proposal sent successfully" };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: err instanceof Error ? err.message : "Internal server error",
    };
  }
};

// withdraw a proposal
export const withdrawProposalAction = async (proposalId: string) => {
  try {
    const { userId } = await auth();

    // Verify the proposal belongs to the authenticated user's freelancer profile
    const proposal = await db.proposal.findUnique({
      where: { id: proposalId },
      select: {
        freelancerProfile: {
          select: {
            userId: true,
          },
        },
        status: true,
      },
    });

    if (!proposal) {
      return { success: false, message: "Proposal not found" };
    }

    if (proposal.freelancerProfile.userId !== userId) {
      return {
        success: false,
        message: "Unauthorized to withdraw this proposal",
      };
    }

    if (proposal.status === "WITHDRAWN") {
      return { success: false, message: "Proposal is already withdrawn" };
    }

    // Update status to WITHDRAWN
    await db.proposal.update({
      where: { id: proposalId },
      data: { status: "WITHDRAWN" },
    });

    return { success: true, message: "Proposal withdrawn successfully" };
  } catch (error) {
    console.error("Failed to withdraw proposal:", error);
    return { success: false, message: "Internal server error" };
  }
};
