import { NextFunction, Request, Response } from 'express';
import MessageResponse from 'interfaces/MessageResponse';
import * as LessonServices from './lessons.services';
import * as LessonSchemas from './lessons.schemas';
import {
  ParamsWithId,
  ParamsWithLessonId,
} from '../../interfaces/ParamsWithId';
import { ParsedToken } from '../../../typings/token';

export async function getLessonsByGroupId(
  req: Request<ParamsWithId>,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const existingGroup = await LessonServices.findGroupById(+id);

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

export async function getTasksByLessonId(
  req: Request<ParamsWithId>,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const parsedToken: ParsedToken = req.user;

    const student = await LessonServices.findStudentById(parsedToken.userId);

    if (!student) {
      res.status(404);
      throw new Error('Student with given userId does not exist.');
    }

    const tasksWithStudentAnswers =
      await LessonServices.findCompletedTaskByStudent(student.answersId);

    const existingLesson = await LessonServices.findLessonById(+id);

    if (!existingLesson) {
      res.status(404);
      throw new Error('Lesson with this id does not exist.');
    }

    const tasks = await LessonServices.getTasksByLessonId(+id);

    const taskReturn = tasks.map((task) => {
      const taskId = task.id
      if (tasksWithStudentAnswers.some(answer => answer.taskId === taskId)) {
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

    const student = await LessonServices.findStudentById(parsedToken.userId);

    if (!student) {
      res.status(404);
      throw new Error('User not found');
    }

    const group = await LessonServices.findGroupById(student.groupId);

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

    const existingGroup = await LessonServices.findGroupById(+groupId);

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
    const { number, image, groupId } = req.body;

    const lesson = await LessonServices.createLessonByName({
      number,
      image,
      Group: {
        connect: {
          id: groupId,
        },
      },
    });

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

export async function deleteLesson(
  req: Request<ParamsWithId, MessageResponse>,
  res: Response<MessageResponse>,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const existingLesson = await LessonServices.findLessonById(+id);

    if (!existingLesson) {
      res.status(404);
      throw new Error('Lesson with this id does not exist.');
    }

    const lesson = await LessonServices.deleteLesson(+id);

    res.json({
      message: `Lesson with ${lesson.id}, number ${lesson.number} deleted successfully.`,
    });
  } catch (error) {
    next(error);
  }
}
