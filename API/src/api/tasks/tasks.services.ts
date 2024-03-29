import {
  Group,
  Lesson,
  Prisma,
  SpecialTask,
  SpecialTaskAnswer,
  Student,
  Task,
} from '@prisma/client';
import { db } from '../../db';

export function getSpecialTaskAnswerWithStudentAndTaskID(
  specialTaskId: SpecialTask['id'],
  studentId: Student['id']
) {
  return db.specialTaskAnswer.findMany({
    where: {
      specialTaskId: specialTaskId,
      studentId: studentId,
    },
  });
}

export async function getSpecialTasksToEvaluate(
  lecturerId: SpecialTask['lecturerId']
) {
  const lecturerSpecialTasks = await db.specialTask.findMany({
    where: {
      lecturerId: lecturerId,
    },
    select: {
      id: true,
      title: true,
    },
  });

  const allSpecialTasksAnswers = await db.specialTaskAnswer.findMany({
    where: {
      specialTaskId: {
        in: lecturerSpecialTasks.map((task) => task.id),
      },
    },
  });

  const studentsIdFromSpecialTasksAnswers = await db.student.findMany({
    where: {
      id: {
        in: allSpecialTasksAnswers.map((answer) => answer.studentId),
      },
    },
    select: {
      id: true,
      userId: true,
      indexNumber: true,
    },
  });

  const userCredentialsFromSpecialTasksAnswers = await db.user.findMany({
    where: {
      id: {
        in: studentsIdFromSpecialTasksAnswers.map((student) => student.userId),
      },
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });

  const studentCredentials = userCredentialsFromSpecialTasksAnswers.map(
    (user) => {
      const correspondingStudent = studentsIdFromSpecialTasksAnswers.find(
        (student) => student.userId === user.id
      );

      return {
        userId: user.id,
        studentId: correspondingStudent?.id,
        firstName: user.firstName,
        lastName: user.lastName,
        indexNumber: correspondingStudent?.indexNumber,
      };
    }
  );

  const specialTasksAnswersWithStudentCredentials = lecturerSpecialTasks.map(
    (task) => {
      const correspondingAnswers = allSpecialTasksAnswers.filter(
        (answer) => answer.specialTaskId === task.id
      );

      const answerInfo = correspondingAnswers.map((answer) => {
        const correspondingStudent = studentCredentials.find(
          (student) => student.studentId === answer.studentId
        );

        return {
          ...correspondingStudent,
          ...answer,
        };
      });

      return {
        taskInfo: {
          ...task,
        },
        answerInfo: answerInfo,
      };
    }
  );

  return specialTasksAnswersWithStudentCredentials;
}

export async function getStudentSpecialTaskAnswers(
  studentId: SpecialTaskAnswer['studentId']
) {
  const answers = await db.specialTaskAnswer.findMany({
    where: {
      studentId,
    },
    select: {
      id: true,
      solution: true,
      replyStatus: true,
      sendDate: true,
      replyDesc: true,
      replyDate: true,
      grantedScore: true,
      specialTaskId: true,
    },
  });

  const tasksQuestions = await db.specialTask.findMany({
    where: {
      id: {
        in: answers.map((answer) => answer.specialTaskId),
      },
    },
    select: {
      id: true,
      question: true,
    },
  });

  const matchedAnswers = tasksQuestions.map((question) => {
    const correspondingAnswer = answers.find(
      (answer) => answer.specialTaskId === question.id
    );

    return {
      question: question.question,
      answer: correspondingAnswer,
    };
  });

  return matchedAnswers;
}

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

export async function getSpecialTasks(lecturerId: number) {
  return await db.specialTask.findMany({
    where: {
      lecturerId,
      numberOfAnswers: {
        gt: 0,
      },
    },
    select: {
      id: true,
      title: true,
      question: true,
      isMarkdown: true,
      openDate: true,
      numberOfAnswers: true,
    },
  });
}

export async function getSpecialTaskById(id: SpecialTask['id']) {
  return await db.specialTask.findUnique({
    where: {
      id,
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

export function deleteTasksByLessonId(lessonId: Lesson['id']) {
  return db.task.deleteMany({
    where: {
      lessonId,
    },
  });
}

export function deleteTask(id: Task['id']) {
  return db.task.delete({
    where: {
      id,
    },
  });
}
