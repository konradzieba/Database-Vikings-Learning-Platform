/*
  Warnings:

  - Made the column `groupId` on table `Student` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Student_groupId_key";

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "groupId" SET NOT NULL;
