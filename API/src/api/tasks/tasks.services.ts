import { Prisma } from '@prisma/client';
import { db } from '../../db';

export function createTask(task: Prisma.TaskCreateInput) {
  return db.task.create({
    data: task,
  });
}
