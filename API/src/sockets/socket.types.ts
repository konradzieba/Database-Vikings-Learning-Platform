import { Prisma } from '@prisma/client';

export type TSpecialTaskData = Pick<
  Prisma.SpecialTaskCreateInput,
  'number' | 'question' | 'isMarkdown' | 'lecturerId'
>;

export type TSpecialTaskAnswerData = Pick<
  Prisma.SpecialTaskAnswerCreateInput,
  'solution' | 'SpecialTask' | 'Student' | 'sendDate'
>;
