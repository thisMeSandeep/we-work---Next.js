/*
  Warnings:

  - Made the column `emailOTP` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `otpExpiresAt` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "emailOTP" SET NOT NULL,
ALTER COLUMN "otpExpiresAt" SET NOT NULL;
