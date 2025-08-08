/*
  Warnings:

  - You are about to drop the column `open` on the `Job` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."JobStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "public"."Job" DROP COLUMN "open",
ADD COLUMN     "status" "public"."JobStatus" NOT NULL DEFAULT 'OPEN';

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "emailOTP" TEXT,
ADD COLUMN     "otpExpiresAt" TIMESTAMP(3);
