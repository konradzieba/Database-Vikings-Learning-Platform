/*
  Warnings:

  - Added the required column `lecturerId` to the `SpecialTask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SpecialTask" ADD COLUMN     "lecturerId" INTEGER NOT NULL;
