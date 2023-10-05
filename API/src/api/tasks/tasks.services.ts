import { Prisma } from '@prisma/client';
import { db } from '../../db';

export function createTask(task: Prisma.TaskCreateInput) {
  return db.task.create({
    data: task,
  });
}

export function deleteTask(id: number) {
  return db.task.delete({
    where: {
      id,
    },
  });
}
