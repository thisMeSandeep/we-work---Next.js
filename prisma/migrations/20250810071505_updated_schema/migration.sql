/*
  Warnings:

  - You are about to drop the column `noOfJobPosted` on the `ClientProfile` table. All the data in the column will be lost.
  - You are about to drop the column `freelancerId` on the `Proposal` table. All the data in the column will be lost.
  - Made the column `freelancerProfileId` on table `Proposal` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Job" DROP CONSTRAINT "Job_clientId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Proposal" DROP CONSTRAINT "Proposal_freelancerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Proposal" DROP CONSTRAINT "Proposal_freelancerProfileId_fkey";

-- DropIndex
DROP INDEX "public"."Job_clientId_idx";

-- DropIndex
DROP INDEX "public"."Job_hiredFreelancerId_idx";

-- DropIndex
DROP INDEX "public"."Proposal_freelancerId_idx";

-- DropIndex
DROP INDEX "public"."Proposal_jobId_idx";

-- AlterTable
ALTER TABLE "public"."ClientProfile" DROP COLUMN "noOfJobPosted";

-- AlterTable
ALTER TABLE "public"."Proposal" DROP COLUMN "freelancerId",
ALTER COLUMN "freelancerProfileId" SET NOT NULL;

-- CreateTable
CREATE TABLE "public"."_SavedJobs" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SavedJobs_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_SavedJobs_B_index" ON "public"."_SavedJobs"("B");

-- AddForeignKey
ALTER TABLE "public"."Job" ADD CONSTRAINT "Job_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "public"."ClientProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Proposal" ADD CONSTRAINT "Proposal_freelancerProfileId_fkey" FOREIGN KEY ("freelancerProfileId") REFERENCES "public"."FreelancerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_SavedJobs" ADD CONSTRAINT "_SavedJobs_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."FreelancerProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_SavedJobs" ADD CONSTRAINT "_SavedJobs_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;
