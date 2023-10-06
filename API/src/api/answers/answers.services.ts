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

export function findAnswerById(id: Answer['id']) {
  return db.answer.findUnique({
    where: {
      id,
    },
  });
}

export function findAnswerByTaskIdAndStudentId(
  taskId: Answer['taskId'],
  studentId: Answer['studentId']
) {
  return db.answer.findMany({
    where: {
      taskId,
      studentId,
    },
  });
}

export function answerReply(
  id: Answer['id'],
  replyStatus: Answer['replyStatus'],
  replyDesc: Answer['replyDesc'] = null,
  replyDate: Answer['replyDate'],
  grantedScore: Answer['grantedScore']
) {
  return db.answer.update({
    where: {
      id,
    },
    data: {
      replyStatus,
      replyDate,
      replyDesc: replyDesc || undefined,
      grantedScore,
    },
  });
}

export function updateAnswer(
  id: Answer['id'],
  replyDesc: Answer['replyDesc'] = null,
  grantedScore: Answer['grantedScore'] = null
) {
  return db.answer.update({
    where: {
      id,
    },
    data: {
      replyDesc: replyDesc || undefined,
      grantedScore: grantedScore || undefined,
    },
  });
}
