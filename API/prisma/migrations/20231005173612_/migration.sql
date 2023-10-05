/*
  Warnings:

  - You are about to drop the column `answearsId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the `Answear` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Answear" DROP CONSTRAINT "Answear_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Answear" DROP CONSTRAINT "Answear_taskId_fkey";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "answearsId",
ADD COLUMN     "answersId" INTEGER[];

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "openDate" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "isExtra" SET DEFAULT false;

-- DropTable
DROP TABLE "Answear";

-- CreateTable
CREATE TABLE "Answer" (
    "id" SERIAL NOT NULL,
    "solution" TEXT NOT NULL,
    "replyStatus" "ReplyStatus" NOT NULL DEFAULT 'PENDING',
    "sendDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "replyDesc" TEXT,
    "replyDate" TIMESTAMP(3),
    "taskId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Answer_taskId_key" ON "Answer"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "Answer_studentId_key" ON "Answer"("studentId");

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
