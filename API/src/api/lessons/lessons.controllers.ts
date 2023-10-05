import { NextFunction, Request, Response } from 'express';
import MessageResponse from 'interfaces/MessageResponse';
import { createLessonByName } from './lessons.services';
import { LessonInput } from './lessons.schemas';

export async function createLesson(
  req: Request<{}, MessageResponse, LessonInput>,
  res: Response<MessageResponse>,
  next: NextFunction
) {
  try {
    const { number, image, groupId } = req.body;

    const lesson = await createLessonByName({
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
