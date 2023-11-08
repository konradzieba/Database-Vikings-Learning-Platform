import dayjs from 'dayjs';
import { Response, Request, NextFunction } from 'express';
import * as TaskSchemas from './tasks.schemas';
import { ParamsWithId, ParamsWithLessonId } from 'interfaces/ParamsWithId';
import MessageResponse from 'interfaces/MessageResponse';
import * as TaskServices from './tasks.services';
import * as LessonServices from '../lessons/lessons.services';
import { ParsedToken } from '../../../typings/token';

export async function getLessonTaksById(
  req: Request<ParamsWithLessonId>,
  res: Response,
  next: NextFunction
) {
  try {
    const { id, lessonId } = req.params;
    const parsedToken: ParsedToken = req.user;

    const student = await LessonServices.findStudentById(parsedToken.userId);

    if (!student) {
      res.status(404);
      throw new Error('Student with given userId does not exist.');
    }

    const existingLesson = await TaskServices.findLessonById(+lessonId);

    if (!existingLesson) {
      res.status(404);
      throw new Error('Lesson with this id does not exist');
    }

    const existingLessonTask = await TaskServices.getLessonTaskById(+id);

    if (!existingLessonTask) {
      res.status(404);
      throw new Error('Task with this id does not exist');
    }

    res.json({
      message: 'success',
      lessonNumber: existingLesson.number,
      taskInfo: existingLessonTask,
      student: student
    });
  } catch (error) {
    next(error);
  }
}

export async function createTask(
  req: Request<{}, MessageResponse, TaskSchemas.TaskInput>,
  res: Response<MessageResponse>,
  next: NextFunction
) {
  try {
    const { number, question, closeDate, isExtra, lessonId } = req.body;

    const task = await TaskServices.createTask({
      number,
      question,
      closeDate: dayjs(closeDate).toDate(),
      isExtra: isExtra || false,
      Lesson: {
        connect: {
          id: lessonId,
        },
      },
    });

    res.json({
      message: `Task with ${task.id}, number ${task.number} created successfully. Close time is: ${task.closeDate}`,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateTask(
  req: Request<ParamsWithId, MessageResponse, TaskSchemas.UpdateTaskInput>,
  res: Response<MessageResponse>,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { number, question, closeDate } = req.body;

    const existingTask = await TaskServices.findTaskById(+id);

    if (!existingTask) {
      res.status(404);
      throw new Error('Task with this id does not exist.');
    }

    const task = await TaskServices.updateTask(+id, {
      number,
      question,
      closeDate: dayjs(closeDate).toDate(),
    });

    res.json({
      message: `Task with ${task.id}, number ${task.number} updated successfully.`,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteTask(
  req: Request<ParamsWithId, MessageResponse>,
  res: Response<MessageResponse>,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const task = await TaskServices.findTaskById(+id);

    if (!task) {
      res.status(404);
      throw new Error(`Task with given id doesn't exists.`);
    }

    await TaskServices.deleteTask(+id);

    res.json({
      message: `Task with ${task.id}, number ${task.number} deleted successfully.`,
    });
  } catch (error) {
    next(error);
  }
}
