import { Lesson, Prisma } from '@prisma/client';
import { db } from '../../db';

export function createLessonByName(lesson: Prisma.LessonCreateInput) {
  return db.lesson.create({
    data: lesson,
  });
}

export function findLessonById(id: Lesson['id']) {
  return db.lesson.findUnique({
    where: {
      id,
    },
  });
}

export function findLessonsByGroupId(groupId: Lesson['groupId']) {
  return db.lesson.findMany({
    where: {
      groupId,
    },
  });
}

export function deleteLesson(id: Lesson['id']) {
  return db.lesson.delete({
    where: {
      id,
    },
  });
}
