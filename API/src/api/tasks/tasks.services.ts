import { Group, Lesson, Prisma, Student, Task } from '@prisma/client';
import { db } from '../../db';

export function getLessonTaskById(id: Task['id']) {
  return db.task.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      number: true,
      question: true,
      openDate: true,
      closeDate: true,
      lessonId: true,
      isMarkdown: true,
    },
  });
}

export async function getStudentTasks(
  studentId: Student['id'],
  groupId: Group['id']
) {
  const lessons = await db.lesson.findMany({
    where: {
      groupId,
    },
    select: {
      id: true,
      number: true,
    },
  });

  const tasksFromLessons = await db.task.findMany({
    where: {
      lessonId: {
        in: lessons.map((lesson) => lesson.id),
      },
    },
    select: {
      id: true,
      number: true,
      question: true,
      lessonId: true,
    },
  });

  const answers = await db.answer.findMany({
    where: {
      studentId,
      taskId: {
        in: tasksFromLessons.map((task) => task.id),
      },
    },
  });

  const lessonsData = lessons.map((lesson) => {
    return {
      lessonNumber: lesson.number,
      tasks: tasksFromLessons
        .filter((task) => task.lessonId === lesson.id)
        .map((task) => {
          const correspondingAnswer = answers.find(
            (answer) => answer.taskId === task.id
          );

          return {
            taskNumber: task.number,
            taskQuestion: task.question,
            replyStatus: correspondingAnswer?.replyStatus,
            replyDesc: correspondingAnswer?.replyDesc,
            solution: correspondingAnswer?.solution,
            grantedScore: correspondingAnswer?.grantedScore,
            sendDate: correspondingAnswer?.sendDate,
            replyDate: correspondingAnswer?.replyDate,
          };
        })
        .filter(
          (task) => task.replyStatus !== null && task.replyStatus !== undefined
        ),
    };
  });

  return lessonsData;
}

export function findTaskById(taskId: Task['id']) {
  return db.task.findUnique({
    where: {
      id: taskId,
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
  task: Pick<Prisma.TaskUpdateInput, 'question' | 'closeDate' | 'isMarkdown'>
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
