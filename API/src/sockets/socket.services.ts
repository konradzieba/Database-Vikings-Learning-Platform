import { SpecialTask } from '@prisma/client';
import { db } from '../db';
import { TSpecialTaskAnswerData, TSpecialTaskData } from './socket.types';

export async function createSpecialTask(specialTaskData: TSpecialTaskData) {
  return await db.specialTask.create({
    data: specialTaskData,
  });
}

export async function createSpecialTaskAnswer(
  specialTaskAnswerData: TSpecialTaskAnswerData
) {
  return await db.specialTaskAnswer.create({
    data: {
      solution: specialTaskAnswerData.solution,
      specialTaskId: specialTaskAnswerData.specialTaskId,
      studentId: specialTaskAnswerData.studentId,
    },
  });
}

export async function findSpecialTaskById(id: SpecialTask['id']) {
  return await db.specialTask.findUnique({
    where: { id },
  });
}

export async function decreaseAmountOfSpecialTaskAnswers(
  id: SpecialTask['id']
) {
  const currentAmountOfAnswers = await db.specialTask.findUnique({
    where: { id },
    select: { numberOfAnswers: true },
  });

  if (
    currentAmountOfAnswers?.numberOfAnswers &&
    currentAmountOfAnswers.numberOfAnswers > 0
  ) {
    return db.specialTask.update({
      where: { id },
      data: {
        numberOfAnswers: {
          decrement: 1,
        },
      },
    });
  } else {
    return Promise.resolve({});
  }
}
