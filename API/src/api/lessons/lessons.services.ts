import { Group, Lesson, Prisma } from '@prisma/client';
import { db } from '../../db';

export async function getLessonsByGroupId(id: Group['id']) {
  const lessonsInfo = await db.lesson.findMany({
    where: {
      groupId: id,
    },
    include: {
      tasks: {
        select: {
          id: true,
        },
      },
    },
  });

  const lessonsFromGroup = lessonsInfo.map((lesson) => ({
    id: lesson.id,
    number: lesson.number,
    image: lesson.image,
    isFrequencyChecked: lesson.isFrequencyChecked,
    taskAmount: lesson.tasks.length,
    groupId: lesson.isFrequencyChecked,
  }));

  return lessonsFromGroup;
}

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

export function findGroupById(id: Group['id']) {
  return db.group.findUnique({
    where: {
      id,
    },
  });
}

export function updateLesson(
  id: Lesson['id'],
  lesson: Pick<Prisma.LessonUpdateInput, 'number' | 'image'>
) {
  return db.lesson.update({
    where: {
      id,
    },
    data: lesson,
  });
}

export function deleteLesson(id: Lesson['id']) {
  return db.lesson.delete({
    where: {
      id,
    },
  });
}
