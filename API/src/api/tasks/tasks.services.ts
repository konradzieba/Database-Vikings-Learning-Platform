import { Lesson, Prisma, Task } from '@prisma/client';
import { db } from '../../db';

export function getLessonTaskById(id: Task['id']) {
  return db.task.findUnique({
    where: {
      id
    },
    select : {
      id: true,
      number: true,
      question: true,
      openDate: true,
      closeDate: true,
      lessonId: true,
    }
  })
}

export function findTaskById(id: Task['id']) {
  return db.task.findUnique({
    where: {
      id,
    },
  });
}


export function createTask(task: Prisma.TaskCreateInput) {
  return db.task.create({
    data: task,
  });
}

export function updateTask(
  id: Task['id'],
  task: Pick<Prisma.TaskUpdateInput, 'number' | 'question' | 'closeDate'>
) {
  return db.task.update({
    where: {
      id,
    },
    data: task,
  });
}

export function deleteTask(id: Task['id']) {
  return db.task.delete({
    where: {
      id,
    },
  });
}
