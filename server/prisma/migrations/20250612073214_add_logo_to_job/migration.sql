/*
  Warnings:

  - Added the required column `logo` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" ADD COLUMN "logo" TEXT NOT NULL DEFAULT 'logo1.png';

