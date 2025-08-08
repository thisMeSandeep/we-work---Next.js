-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "emailOTP" DROP NOT NULL,
ALTER COLUMN "otpExpiresAt" DROP NOT NULL;
