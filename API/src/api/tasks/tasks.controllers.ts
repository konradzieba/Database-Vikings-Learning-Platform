import { Response, Request, NextFunction } from 'express';
import MessageResponse from 'interfaces/MessageResponse';
import { TaskInput } from './tasks.schemas';
import { createTask as createTaskService } from './tasks.services';
import dayjs from 'dayjs';

export async function createTask(
  req: Request<{}, MessageResponse, TaskInput>,
  res: Response<MessageResponse>,
  next: NextFunction
) {
  try {
    const { number, question, closeDate, isExtra, lessonId } = req.body;

    const task = await createTaskService({
        number,
        question,
        closeDate,
        openDate: dayjs().toDate(),
        isExtra: isExtra || false,
        Lesson: {
            connect: {
                id: req.body.lessonId,
            },
        }
      });

    res.json({
      message: `Task with ${task.id}, number ${task.number} created successfully. Close time is: ${task.closeDate}`,
    });
  } catch (error) {
    next(error);
  }
}
