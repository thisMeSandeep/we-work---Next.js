/*
  Warnings:

  - You are about to drop the column `country` on the `ClientProfile` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `FreelancerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `User` table. All the data in the column will be lost.
  - Added the required column `country` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."ClientProfile" DROP COLUMN "country";

-- AlterTable
ALTER TABLE "public"."FreelancerProfile" DROP COLUMN "country";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "fullName",
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;
