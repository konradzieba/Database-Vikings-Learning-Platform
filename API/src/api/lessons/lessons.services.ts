import { Prisma } from '@prisma/client';
import { db } from '../../db';

export function createLessonByName(lesson: Prisma.LessonCreateInput) {
  return db.lesson.create({
    data: lesson,
  });
}

export function findLessonById(id: number) {
  return db.lesson.findUnique({
    where: {
      id,
    },
  });
}

export function findLessonsByGroupId(groupId: number) {
  return db.lesson.findMany({
    where: {
      groupId,
    },
  });
}
