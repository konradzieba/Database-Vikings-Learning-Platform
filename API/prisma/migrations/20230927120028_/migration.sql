/*
  Warnings:

  - The `replyStatus` column on the `Answear` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `name` on the `Group` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(25)`.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(25)`.
  - You are about to alter the column `firstName` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(25)`.
  - You are about to alter the column `lastName` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(45)`.
  - A unique constraint covering the columns `[taskId]` on the table `Answear` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId]` on the table `Answear` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lecturerId]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[groupId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lessonId]` on the table `Task` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `studentId` to the `Answear` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taskId` to the `Answear` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lecturerId` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lessonId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ReplyStatus" AS ENUM ('CORRECT', 'PARTLY_CORRECT', 'INCORRECT', 'PENDING');

-- AlterTable
ALTER TABLE "Answear" ADD COLUMN     "replyDate" TIMESTAMP(3),
ADD COLUMN     "sendDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "studentId" INTEGER NOT NULL,
ADD COLUMN     "taskId" INTEGER NOT NULL,
DROP COLUMN "replyStatus",
ADD COLUMN     "replyStatus" "ReplyStatus" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "replyDesc" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "lecturerId" INTEGER NOT NULL,
ADD COLUMN     "lessonsId" INTEGER[],
ALTER COLUMN "name" SET DATA TYPE CHAR(25);

-- AlterTable
ALTER TABLE "Lecturer" ADD COLUMN     "groupsId" INTEGER[];

-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "groupId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "answearsId" INTEGER[],
ADD COLUMN     "groupId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "lessonId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET DATA TYPE CHAR(25),
ALTER COLUMN "firstName" SET DATA TYPE CHAR(25),
ALTER COLUMN "lastName" SET DATA TYPE CHAR(45);

-- CreateIndex
CREATE UNIQUE INDEX "Answear_taskId_key" ON "Answear"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "Answear_studentId_key" ON "Answear"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Group_name_key" ON "Group"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Group_lecturerId_key" ON "Group"("lecturerId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_groupId_key" ON "Student"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "Task_lessonId_key" ON "Task"("lessonId");

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_lecturerId_fkey" FOREIGN KEY ("lecturerId") REFERENCES "Lecturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answear" ADD CONSTRAINT "Answear_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answear" ADD CONSTRAINT "Answear_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
