-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "absentStudents" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
