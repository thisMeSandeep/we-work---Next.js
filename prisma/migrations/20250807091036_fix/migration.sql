-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('FREELANCER', 'CLIENT');

-- CreateEnum
CREATE TYPE "public"."ExperienceLevel" AS ENUM ('EXPERT', 'INTERMEDIATE', 'ENTRY');

-- CreateEnum
CREATE TYPE "public"."Category" AS ENUM ('ACCOUNTING', 'ADMIN_SUPPORT', 'CUSTOMER_SERVICE', 'DATA_SCIENCE', 'DESIGN_CREATIVE', 'ENGINEERING', 'IT_NETWORKING', 'LEGAL', 'SALES_MARKETING', 'TRANSLATION', 'SOFTWARE_DEV', 'WRITING');

-- CreateEnum
CREATE TYPE "public"."Speciality" AS ENUM ('ECOMMERCE', 'DESKTOP_SOFTWARE', 'SCRIPTING_AUTOMATION', 'MANUAL_TESTING', 'AUTOMATION_TESTING', 'AI_CHATBOT', 'AI_INTEGRATION', 'PROTOTYPING', 'MOBILE_DESIGN', 'WEB_DESIGN', 'UX_UI', 'MOBILE_APP', 'MOBILE_GAME', 'CRYPTO_TOKENS', 'BLOCKCHAIN_NFT', 'CRYPTO_WALLET', 'SCRUM', 'PRODUCT_MANAGEMENT', 'FIRMWARE', 'EMERGING_TECH', 'AR_VR', 'CODING_TUTORING', 'DATABASE_DEV', 'BACKEND_DEV', 'FRONTEND_DEV', 'FULLSTACK_DEV', 'CMS_DEV', 'GAME_DEV');

-- CreateEnum
CREATE TYPE "public"."ScopeSize" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "public"."ScopeDuration" AS ENUM ('ONE_TO_THREE_MONTHS', 'THREE_TO_SIX_MONTHS', 'MORE_THAN_SIX_MONTHS');

-- CreateEnum
CREATE TYPE "public"."ProposalStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'WITHDRAWN');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "role" "public"."Role" NOT NULL,
    "profileImage" TEXT,
    "country" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FreelancerProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "profession" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "skills" TEXT[],
    "perHourRate" DOUBLE PRECISION NOT NULL,
    "languages" TEXT NOT NULL,
    "portfolioLink" TEXT,
    "otherLink" TEXT,
    "experienceLevel" "public"."ExperienceLevel" NOT NULL,
    "file" TEXT,

    CONSTRAINT "FreelancerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ClientProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "websiteLink" TEXT,
    "location" TEXT NOT NULL,
    "noOfJobPosted" INTEGER NOT NULL DEFAULT 0,
    "rating" DOUBLE PRECISION,

    CONSTRAINT "ClientProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Job" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "public"."Category" NOT NULL,
    "speciality" "public"."Speciality" NOT NULL,
    "skills" TEXT[],
    "budget" DOUBLE PRECISION NOT NULL,
    "open" BOOLEAN NOT NULL DEFAULT true,
    "noOfProposals" INTEGER NOT NULL DEFAULT 0,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "scopeSize" "public"."ScopeSize" NOT NULL,
    "duration" "public"."ScopeDuration" NOT NULL,
    "experience" "public"."ExperienceLevel" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientId" TEXT NOT NULL,
    "hiredFreelancerId" TEXT,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Proposal" (
    "id" TEXT NOT NULL,
    "coverLetter" TEXT NOT NULL,
    "message" TEXT,
    "rate" DOUBLE PRECISION NOT NULL,
    "status" "public"."ProposalStatus" NOT NULL DEFAULT 'PENDING',
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "freelancerId" TEXT NOT NULL,
    "freelancerProfileId" TEXT,
    "jobId" TEXT NOT NULL,

    CONSTRAINT "Proposal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "FreelancerProfile_userId_key" ON "public"."FreelancerProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ClientProfile_userId_key" ON "public"."ClientProfile"("userId");

-- CreateIndex
CREATE INDEX "Job_clientId_idx" ON "public"."Job"("clientId");

-- CreateIndex
CREATE INDEX "Job_hiredFreelancerId_idx" ON "public"."Job"("hiredFreelancerId");

-- CreateIndex
CREATE INDEX "Proposal_freelancerId_idx" ON "public"."Proposal"("freelancerId");

-- CreateIndex
CREATE INDEX "Proposal_jobId_idx" ON "public"."Proposal"("jobId");

-- AddForeignKey
ALTER TABLE "public"."FreelancerProfile" ADD CONSTRAINT "FreelancerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ClientProfile" ADD CONSTRAINT "ClientProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Job" ADD CONSTRAINT "Job_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Job" ADD CONSTRAINT "Job_hiredFreelancerId_fkey" FOREIGN KEY ("hiredFreelancerId") REFERENCES "public"."FreelancerProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Proposal" ADD CONSTRAINT "Proposal_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Proposal" ADD CONSTRAINT "Proposal_freelancerProfileId_fkey" FOREIGN KEY ("freelancerProfileId") REFERENCES "public"."FreelancerProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Proposal" ADD CONSTRAINT "Proposal_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "public"."Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
