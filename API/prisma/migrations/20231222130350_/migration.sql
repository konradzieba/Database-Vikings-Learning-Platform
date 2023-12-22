/*
  Warnings:

  - You are about to drop the column `isExtra` on the `SpecialTask` table. All the data in the column will be lost.
  - You are about to drop the column `isExtra` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SpecialTask" DROP COLUMN "isExtra",
ADD COLUMN     "numberOfAnswers" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "isExtra";
