/*
  Warnings:

  - You are about to drop the column `number` on the `SpecialTask` table. All the data in the column will be lost.
  - Added the required column `title` to the `SpecialTask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SpecialTask" DROP COLUMN "number",
ADD COLUMN     "title" TEXT NOT NULL;
