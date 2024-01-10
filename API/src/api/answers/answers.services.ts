import { Answer, Prisma, SpecialTaskAnswer, Student } from '@prisma/client';
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

export function findAnswerByTaskIds(taskIds: Answer['taskId'][]) {
  return db.answer.findMany({
    where: {
      taskId: {
        in: taskIds,
      },
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

export function findSpecialTaskAnswerById(id: SpecialTaskAnswer['id']) {
  return db.specialTaskAnswer.findUnique({
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

export async function specialTaskAnswerReply(
  id: SpecialTaskAnswer['id'],
  replyStatus: SpecialTaskAnswer['replyStatus'],
  replyDesc: SpecialTaskAnswer['replyDesc'] | null = null,
  replyDate: SpecialTaskAnswer['replyDate'],
  grantedScore: SpecialTaskAnswer['grantedScore']
) {
  if (grantedScore === null) {
    return null;
  }

  const updatedSpecialTaskAnswer = await db.specialTaskAnswer.update({
    where: { id },
    data: {
      replyStatus,
      replyDesc: replyDesc || undefined,
      replyDate,
      grantedScore,
    },
  });

  if (!updatedSpecialTaskAnswer) {
    throw new Error(`Unable to find the answer with ID ${id}.`);
  }

  const student = await db.student.findUnique({
    where: { id: updatedSpecialTaskAnswer.studentId },
    select: { score: true },
  });

  if (!student) {
    throw new Error(
      `The student with ID ${updatedSpecialTaskAnswer.studentId} was not found.`
    );
  }

  const newScore = student.score + grantedScore;

  await db.student.update({
    where: { id: updatedSpecialTaskAnswer.studentId },
    data: { score: newScore },
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

export async function updateAnswerReply(
  answerId: Answer['id'],
  oldGrantedScore: Answer['grantedScore'],
  replyStatus: Answer['replyStatus'] | null = null,
  replyDesc: Answer['replyDesc'] | null = null,
  newGrantedScore: Answer['grantedScore'] | null = null
) {
  const answer = await db.answer.findUnique({
    where: { id: answerId },
    select: {
      studentId: true,
      Student: {
        select: {
          score: true,
        },
      },
    },
  });

  //find student by answerId

  if (!answer) {
    throw new Error(`Unable to find the answer with ID ${answerId}.`);
  }

  if (
    newGrantedScore === null ||
    newGrantedScore === undefined ||
    oldGrantedScore === null ||
    oldGrantedScore === undefined
  ) {
    return null;
  }

  const newStudentScore =
    answer.Student.score - oldGrantedScore + newGrantedScore;

  return await db.$transaction([
    db.answer.update({
      where: { id: answerId },
      data: {
        replyStatus: replyStatus || undefined,
        replyDesc: replyDesc || undefined,
        grantedScore: newGrantedScore || undefined,
      },
    }),
    db.student.update({
      where: { id: answer.studentId },
      data: { score: { set: newStudentScore } },
    }),
  ]);
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
