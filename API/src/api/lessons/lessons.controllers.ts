import { NextFunction, Request, Response } from 'express';
import MessageResponse from 'interfaces/MessageResponse';
import * as LessonServices from './lessons.services';
import * as LessonSchemas from './lessons.schemas';
import * as UserServices from '../users/users.services';
import * as GroupServices from '../groups/groups.services';
import * as AnswerServices from '../answers/answers.services';
import * as TaskServices from '../tasks/tasks.services';
import {
  ParamsWithId,
  ParamsWithLessonId,
} from '../../interfaces/ParamsWithId';
import { ParsedToken } from '../../../typings/token';
import dayjs from 'dayjs';

export async function getLessonsByGroupId(
  req: Request<ParamsWithId>,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const existingGroup = await GroupServices.findGroupById(+id);

    if (!existingGroup) {
      res.status(404);
      throw new Error('Group with this id does not exist.');
    }

    const lessons = await LessonServices.getLessonsByGroupId(+id);

    res.json({ message: 'success', lessons: lessons });
  } catch (error) {
    next(error);
  }
}

export async function getPreviousLessonsImages(
  req: Request<ParamsWithId>,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const existingGroup = await GroupServices.findGroupById(+id);

    if (!existingGroup) {
      res.status(404);
      throw new Error('Group with this id does not exist.');
    }

    const previousLessonsImages = await LessonServices.getPreviousLessonsImages(
      +id
    );

    res.json({
      message: 'success',
      previousLessonsImages: previousLessonsImages,
    });
  } catch (error) {
    next(error);
  }
}

export async function getTasksByLessonId(
  req: Request<ParamsWithId>,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const parsedToken: ParsedToken = req.user;

    const student = await UserServices.findStudentByUserId(parsedToken.userId);

    if (!student) {
      res.status(404);
      throw new Error('Student with given userId does not exist.');
    }

    const tasksWithStudentAnswers =
      await AnswerServices.findCompletedTaskByStudent(student.answersId);

    const existingLesson = await LessonServices.findLessonById(+id);

    if (!existingLesson) {
      res.status(404);
      throw new Error('Lesson with this id does not exist.');
    }

    const tasks = await LessonServices.getTasksByLessonId(+id);

    const taskReturn = tasks.map((task) => {
      const taskId = task.id;
      if (tasksWithStudentAnswers.some((answer) => answer.taskId === taskId)) {
        return { ...task, answerSend: true };
      } else {
        return { ...task, answerSend: false };
      }
    });

    res.json({
      message: 'success',
      lessonNumber: existingLesson.number,
      lessonId: existingLesson.id,
      tasks: taskReturn,
    });
  } catch (error) {
    next(error);
  }
}

export async function getStudentLessonsInfo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const parsedToken: ParsedToken = req.user;

    const student = await UserServices.findStudentByUserId(parsedToken.userId);

    if (!student) {
      res.status(404);
      throw new Error('User not found');
    }

    const group = await GroupServices.findGroupById(student.groupId);

    if (!group) {
      res.status(404);
      throw new Error('Group not found');
    }

    const studentLessonsInfo = await LessonServices.getStudentLessonInfo(
      student.groupId,
      student.id
    );

    res.json({
      message: 'success',
      lessons: studentLessonsInfo,
    });
  } catch (error) {
    next(error);
  }
}

export async function getLessonInfoByGroupAndLessonId(
  req: Request<ParamsWithLessonId>,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: groupId, lessonId } = req.params;

    const existingGroup = await GroupServices.findGroupById(+groupId);

    if (!existingGroup) {
      res.status(404);
      throw new Error('Group with this id does not exist.');
    }

    const existingLesson = await LessonServices.findLessonById(+lessonId);

    if (!existingLesson) {
      res.status(404);
      throw new Error('Lesson with this id does not exist.');
    }

    const lessonInfo = await LessonServices.getLessonInfoByGroupAndLessonId(
      +groupId,
      +lessonId
    );

    if (!lessonInfo) {
      res.status(404);
      throw new Error('Lesson with this id does not exist.');
    }

    res.json({ message: 'success', lessonInfo });
  } catch (error) {
    next(error);
  }
}

export async function createLesson(
  req: Request<{}, MessageResponse, LessonSchemas.LessonInput>,
  res: Response<MessageResponse>,
  next: NextFunction
) {
  try {
    const {
      number,
      image,
      groupId,
      isFrequencyChecked,
      tasks,
      absentStudents,
    } = req.body;

    const lesson = await LessonServices.createLessonByName({
      number,
      image,
      absentStudents: absentStudents,
      isFrequencyChecked: isFrequencyChecked,
      Group: {
        connect: {
          id: groupId,
        },
      },
    });

    const taskPromises = tasks.map(async (task) => {
      await TaskServices.createTask({
        number: task.number,
        question: task.question,
        closeDate: dayjs(task.closeDate).toDate(),
        isExtra: task.isExtra,
        isMarkdown: task.isMarkdown,
        Lesson: {
          connect: {
            id: lesson.id,
          },
        },
      });
    });

    const healthPromises = absentStudents.map(async (student) => {
      await UserServices.decrementStudentHealth(student);
    });

    await Promise.all([...taskPromises, ...healthPromises]);

    res.json({
      message: `Lesson ${lesson.number} for groupId ${lesson.groupId} created successfully.`,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateLesson(
  req: Request<ParamsWithId, MessageResponse, LessonSchemas.UpdateLessonInput>,
  res: Response<MessageResponse>,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { number, image } = req.body;

    const existingLesson = await LessonServices.findLessonById(+id);

    if (!existingLesson) {
      res.status(404);
      throw new Error('Lesson with this id does not exist.');
    }

    const lesson = await LessonServices.updateLesson(+id, {
      number,
      image,
    });

    res.json({
      message: `Lesson with ${lesson.id}, number ${lesson.number} updated successfully.`,
    });
  } catch (error) {
    next(error);
  }
}

export async function getPreDeleteLessonInfo(
  req: Request<ParamsWithId>,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: lessonId } = req.params;

    const existingLesson = await LessonServices.findLessonById(+lessonId);

    if (!existingLesson) {
      res.status(404);
      throw new Error('Lesson with this lessonId does not exist.');
    }

    const lessonInfo = await LessonServices.getPreDeleteLessonInfo(+lessonId);

    res.json({ message: 'success', lessonInfo });
  } catch (error) {
    next(error);
  }
}

export async function deleteLesson(
  req: Request<ParamsWithId, MessageResponse>,
  res: Response<MessageResponse>,
  next: NextFunction
) {
  try {
    const { id: lessonId } = req.params;

    const existingLesson = await LessonServices.findLessonById(+lessonId);

    if (!existingLesson) {
      res.status(404);
      throw new Error('Lesson with this id does not exist.');
    }

    const tasks = await LessonServices.getTasksByLessonId(+lessonId);

    const answers = await AnswerServices.findAnswerByTaskIds(
      tasks.map((task) => task.id)
    );

    const assignedStudents = await GroupServices.getStudentsFromGroup(
      existingLesson.groupId
    );

    const assignedStudentsIds = assignedStudents.map((student) => student.id);

    const studentsWithAnswersInfo = assignedStudentsIds.map((studentId) => {
      const studentAnswers = answers.filter(
        (answer) => answer.studentId === studentId
      );

      const studentAnswersIds = studentAnswers.map((answer) => answer.id);
      const taskAssignedToAnswers = tasks.filter((task) =>
        studentAnswersIds.includes(task.id)
      );

      return {
        studentId,
        isStudentAbsent: existingLesson.absentStudents.includes(studentId),
        grantedScore: studentAnswers.reduce((acc, curr) => {
          if (curr.grantedScore) {
            return acc + curr.grantedScore;
          } else {
            return acc;
          }
        }, 0),
        aggregatedSendTime: studentAnswers.reduce((acc, curr) => {
          const assignedTask = taskAssignedToAnswers.find(
            (task) => task.id === curr.taskId
          );
          const openDateTimezone = dayjs(assignedTask?.openDate);
          const closeDateTimezone = dayjs(curr.sendDate);
          const differenceInSeconds = openDateTimezone.diff(
            closeDateTimezone,
            'second'
          );
          const calculatedDifference = Number(
            (differenceInSeconds / 1_000_000).toFixed(6)
          );
          if (curr.sendDate) {
            return acc + calculatedDifference;
          } else {
            return acc;
          }
        }, 0),
      };
    });

    await UserServices.updateStudentDuringLessonDelete(studentsWithAnswersInfo);
    await TaskServices.deleteTasksByLessonId(existingLesson.id);
    const lessonInfo = await LessonServices.deleteLesson(existingLesson.id);

    const allLessons = await GroupServices.findLessonsByGroupId(
      existingLesson.groupId
    ).then((lessons) => lessons.sort((a, b) => a.number - b.number));

    const lessonsWithNewOrder = allLessons
      .map((lesson, index) => {
        if (lesson.number === index + 1) return lesson;
        return {
          ...lesson,
          number: index + 1,
        };
      })
      .map((lesson) => ({
        id: lesson.id,
        number: lesson.number,
      }));

    await LessonServices.updateLessonsOrder(
      lessonsWithNewOrder,
      existingLesson.groupId
    );

    res.json({
      message: `Lesson with ${lessonInfo.id}, number ${lessonInfo.number} deleted successfully.`,
    });
  } catch (error) {
    next(error);
  }
}
