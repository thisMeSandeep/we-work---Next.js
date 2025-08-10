/*
  Warnings:

  - You are about to drop the column `noOfProposals` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Job" DROP COLUMN "noOfProposals",
ADD COLUMN     "numberOfProposals" INTEGER NOT NULL DEFAULT 0;
