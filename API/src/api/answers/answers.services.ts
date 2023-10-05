import { Answer, Prisma } from '@prisma/client';
import { db } from '../../db';

export function createAnswer(answer: Prisma.AnswerCreateInput) {
  return db.answer.create({
    data: answer,
  });
}

export function deleteAnswer(id: Answer['id']) {
  return db.answer.delete({
    where: {
      id,
    },
  });
}

export function findAnswerByTaskIdAndStudentId(
  taskId: Answer['taskId'],
  studentId: Answer['studentId']
) {
  return db.answer.findUnique({
    where: {
      taskId,
      studentId,
    },
  });
}

export function answerReply(
  id: Answer['id'],
  replyStatus: Answer['replyStatus'],
  replyDesc: Answer['replyDesc'] = '',
  replyDate: Answer['replyDate']
) {
  return db.answer.update({
    where: {
      id,
    },
    data: {
      replyStatus,
      replyDate,
      replyDesc: replyDesc,
    },
  });
}
