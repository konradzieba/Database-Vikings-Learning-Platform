import { NextFunction, Request, Response } from 'express';
import MessageResponse from 'interfaces/MessageResponse';
import * as LessonServices from './lessons.services';
import { LessonInput } from './lessons.schemas';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

export async function createLesson(
  req: Request<{}, MessageResponse, LessonInput>,
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
