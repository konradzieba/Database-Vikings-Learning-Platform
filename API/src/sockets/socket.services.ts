import { db } from 'db';
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
    data: specialTaskAnswerData,
  });
}
