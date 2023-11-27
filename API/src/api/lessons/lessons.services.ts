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
    orderBy: {
      number: 'asc',
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
      openDate: true,
      closeDate: true,
      isMarkdown: true,
    },
    orderBy: {
      id: 'asc',
    },
  });
}

export function getPreviousLessonsImages(id: Group['id']) {
  return db.lesson.findMany({
    where: {
      groupId: id,
    },
    select: {
      number: true,
      image: true,
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
    orderBy: {
      number: 'asc',
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
                  id: true,
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
      const taskId = task.id;
      const endDate = task.closeDate.toISOString();
      const studentsWithoutAnswer = await findStudentsWithoutAnswer(
        groupId,
        task.id
      );
      const answers = task.answers.map((answer) => ({
        answerId: answer.id,
        studentId: answer.Student.id,
        firstName: answer.Student.User.firstName,
        lastName: answer.Student.User.lastName,
        index: answer.Student.indexNumber,
        answer: answer.solution,
        sendDate: answer.sendDate.toISOString(),
        grantedScore: answer.grantedScore,
      }));
      return {
        taskId,
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

export function updateLessonsOrder(
  lessons: {
    id: Lesson['id'];
    number: Lesson['number'];
  }[],
) {
  const promises = lessons.map((lesson) => {
    return db.lesson.update({
      where: {
        id: lesson.id,
      },
      data: {
        number: lesson.number,
      },
    });
  });

  return Promise.all(promises);
}

export async function getPreDeleteLessonInfo(id: Lesson['id']) {
  const lessonInfo = await db.lesson.findUnique({
    where: {
      id,
    },
    select: {
      number: true,
      groupId: true,
      tasks: {
        select: {
          id: true,
          answers: {
            select: {
              id: true,
              Student: {
                select: {
                  id: true,
                  User: {
                    select: {
                      firstName: true,
                      lastName: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!lessonInfo) {
    return null;
  }

  const studentsWithAnswersSet = new Set<string>();
  const studentsWithAnswers: {
    studentId: Student['id'];
    firstName: User['firstName'];
    lastName: User['lastName'];
  }[] = [];

  lessonInfo.tasks.forEach((task) => {
    task.answers.forEach((answer) => {
      const studentId = answer.Student.id;
      const firstName = answer.Student.User.firstName;
      const lastName = answer.Student.User.lastName;
      const key = `${studentId}_${firstName}_${lastName}`;

      if (!studentsWithAnswersSet.has(key)) {
        studentsWithAnswersSet.add(key);
        studentsWithAnswers.push({
          studentId,
          firstName,
          lastName,
        });
      }
    });
  });

  const formattedLessonInfo = {
    lessonNumber: lessonInfo.number,
    taskAmount: lessonInfo.tasks.length,
    sendAnswersAmount: lessonInfo.tasks.reduce(
      (acc, task) => acc + task.answers.length,
      0
    ),
    studentsWithAnswers,
  };

  return formattedLessonInfo;
}

export function deleteLesson(id: Lesson['id']) {
  return db.lesson.delete({
    where: {
      id,
    },
  });
}
