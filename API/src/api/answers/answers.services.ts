import { Answer, Prisma, Student } from '@prisma/client';
import { db } from '../../db';

export function createAnswer(answer: Prisma.AnswerCreateInput) {
  return db.answer.create({
    data: answer,
  });
}

export async function assignAnswerToStudent(
  id: Student['id'],
  answerId: Answer['id']
) {
  const student = await db.student.findUnique({
    where: { id },
    include: { Answers: { select: { id: true } } },
  });

  if (!student) {
    throw new Error(`Student with ID ${id} not found.`);
  }

  const currentAnswerIds = student.Answers.map((answer) => answer.id);

  if (!currentAnswerIds.includes(answerId)) {
    currentAnswerIds.push(answerId);
  }

  await db.student.update({
    where: { id: id },
    data: {
      answersId: {
        set: currentAnswerIds,
      },
    },
    include: { Answers: { select: { id: true } } },
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

export function findCompletedTaskByStudent(ids: Answer['id'][]) {
  return db.answer.findMany({
    where: {
      id: {
        in: ids,
      },
    },
    select: {
      taskId: true,
    },
  });
}

export async function answerReply(
  id: Answer['id'],
  replyStatus: Answer['replyStatus'],
  replyDesc: Answer['replyDesc'] | null = null,
  replyDate: Answer['replyDate'],
  grantedScore: Answer['grantedScore']
) {
  if (grantedScore === null) {
    return null;
  }

  const updatedAnswer = await db.answer.update({
    where: { id },
    data: {
      replyStatus,
      replyDesc: replyDesc || undefined,
      replyDate,
      grantedScore,
    },
  });

  if (!updatedAnswer) {
    throw new Error(`Unable to find the answer with ID ${id}.`);
  }

  const student = await db.student.findUnique({
    where: { id: updatedAnswer.studentId },
    select: { score: true },
  });

  if (!student) {
    throw new Error(
      `The student with ID ${updatedAnswer.studentId} was not found.`
    );
  }

  const newScore = student.score + grantedScore;

  await db.student.update({
    where: { id: updatedAnswer.studentId },
    data: { score: newScore },
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
