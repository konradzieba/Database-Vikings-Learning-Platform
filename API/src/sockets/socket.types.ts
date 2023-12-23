import { Prisma } from '@prisma/client';

export type TSpecialTaskData = Pick<
  Prisma.SpecialTaskCreateInput,
  'title' | 'question' | 'isMarkdown' | 'lecturerId'
>;

export type TSpecialTaskResponseData = {
  answerData: {
    solution: string;
    specialTaskId: number;
    studentId: number;
  };
  lecturerId: number;
};

export type TSpecialTaskAnswerData = {
  solution: string;
  specialTaskId: number;
  studentId: number;
};
