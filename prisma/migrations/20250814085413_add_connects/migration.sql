/*
  Warnings:

  - Added the required column `duration` to the `Proposal` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."EstimatedDuration" AS ENUM ('ONE_TO_THREE_MONTHS', 'THREE_TO_SIX_MONTHS', 'MORE_THAN_SIX_MONTHS', 'LESS_THEN_ONE_MONTHS');

-- AlterTable
ALTER TABLE "public"."FreelancerProfile" ADD COLUMN     "connects" INTEGER NOT NULL DEFAULT 200;

-- AlterTable
ALTER TABLE "public"."Job" ADD COLUMN     "connectsRequired" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "public"."Proposal" ADD COLUMN     "attachedFile" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "duration" "public"."EstimatedDuration" NOT NULL;
