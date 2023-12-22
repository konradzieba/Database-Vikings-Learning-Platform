-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "specialTaskAnswerId" INTEGER[];

-- CreateTable
CREATE TABLE "SpecialTask" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "openDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isExtra" BOOLEAN NOT NULL DEFAULT false,
    "isMarkdown" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "SpecialTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpecialTaskAnswer" (
    "id" SERIAL NOT NULL,
    "solution" TEXT NOT NULL,
    "replyStatus" "ReplyStatus" NOT NULL DEFAULT 'PENDING',
    "sendDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "replyDesc" TEXT,
    "replyDate" TIMESTAMP(3),
    "grantedScore" INTEGER,
    "specialTaskId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "SpecialTaskAnswer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SpecialTaskAnswer" ADD CONSTRAINT "SpecialTaskAnswer_specialTaskId_fkey" FOREIGN KEY ("specialTaskId") REFERENCES "SpecialTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecialTaskAnswer" ADD CONSTRAINT "SpecialTaskAnswer_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
