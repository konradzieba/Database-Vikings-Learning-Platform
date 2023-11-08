import { Answer, Group, Lesson, Prisma, Student, User } from '@prisma/client';
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

export async function getTasksByLessonId(id: Lesson['id']) {
  return db.task.findMany({
    where: {
      lessonId: id,
    },
    select: {
      id: true,
      number: true,
      question: true,
      closeDate: true,
    },
    orderBy: {
      id: 'asc',
    },
  });
}

export async function getStudentLessonInfo(
  id: Group['id'],
  studentId: Student['id']
) {
  const lessons = await db.lesson.findMany({
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

  const studentAnswers = await db.answer.findMany({
    where: {
      studentId: studentId,
    },
    select: {
      id: true,
      taskId: true,
      studentId: true,
    },
  });

  const studentLessonResponse = [];

  for (const lesson of lessons) {
    const tasksDone = studentAnswers.filter((answer) =>
      lesson.tasks.some((task) => task.id === answer.taskId)
    ).length;

    studentLessonResponse.push({
      id: lesson.id,
      number: lesson.number,
      image: lesson.image,
      tasksDone: tasksDone,
      tasksAmount: lesson.tasks.length,
      groupId: lesson.groupId,
    });
  }

  return studentLessonResponse;
}

export async function getLessonInfoByGroupAndLessonId(
  groupId: number,
  lessonId: number
) {
  const lesson = await db.lesson.findUnique({
    where: {
      id: lessonId,
      groupId: groupId,
    },
    include: {
      tasks: {
        include: {
          answers: {
            include: {
              Student: {
                select: {
                  User: {
                    select: {
                      firstName: true,
                      lastName: true,
                    },
                  },
                  indexNumber: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!lesson) {
    return null;
  }

  const lessonNumber = lesson.number;
  const taskList = await Promise.all(
    lesson.tasks.map(async (task) => {
      const taskNumber = task.number;
      const endDate = task.closeDate.toISOString();
      const studentsWithoutAnswer = await findStudentsWithoutAnswer(
        groupId,
        task.id
      );
      const answers = task.answers.map((answer) => ({
        firstName: answer.Student.User.firstName,
        lastName: answer.Student.User.lastName,
        index: answer.Student.indexNumber,
        answer: answer.solution,
        sendDate: answer.sendDate.toISOString(),
      }));
      return {
        taskNumber,
        endDate,
        studentsWithoutAnswer,
        answers,
      };
    })
  );

  return {
    lessonNumber,
    tasks: taskList,
  };
}

async function findStudentsWithoutAnswer(groupId: number, taskId: number) {
  const taskAnswers = await db.answer.findMany({
    where: {
      taskId: taskId,
    },
    select: {
      studentId: true,
    },
  });

  const answeredStudentIds = taskAnswers.map(
    (taskAnswer) => taskAnswer.studentId
  );

  const students = await db.student.findMany({
    where: {
      groupId: groupId,
      NOT: {
        id: {
          in: answeredStudentIds,
        },
      },
    },
    select: {
      User: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      indexNumber: true,
    },
  });

  return students;
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

export function findStudentById(id: User['id']) {
  return db.student.findUnique({
    where: {
      userId: id,
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
