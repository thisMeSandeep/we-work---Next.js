/*
  Warnings:

  - You are about to drop the column `country` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `mobile` on the `User` table. All the data in the column will be lost.
  - Added the required column `country` to the `ClientProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobile` to the `ClientProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `FreelancerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobile` to the `FreelancerProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."ClientProfile" ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "mobile" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."FreelancerProfile" ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "mobile" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "country",
DROP COLUMN "mobile";
