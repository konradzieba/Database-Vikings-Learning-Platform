import dayjs from 'dayjs';
import { Response, Request, NextFunction } from 'express';
import * as TaskSchemas from './tasks.schemas';
import {
  ParamsWithGroupId,
  ParamsWithId,
  ParamsWithLessonId,
} from 'interfaces/ParamsWithId';
import MessageResponse from 'interfaces/MessageResponse';
import * as TaskServices from './tasks.services';
import * as LessonServices from '../lessons/lessons.services';
import * as AnswersServices from '../answers/answers.services';
import * as UserServices from '../users/users.services';
import { ParsedToken } from '../../../typings/token';

export async function getTaskInfoById(
  req: Request<ParamsWithId>,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: taskId } = req.params;

    const existingTask = await TaskServices.findTaskById(+taskId);
    if (!existingTask) {
      res.status(404);
      throw new Error('Task with this id does not exist.');
    }

    res.json({
      message: 'success',
      taskInfo: existingTask,
    });
  } catch (error) {
    next(error);
  }
}

export async function getSpecialTaskById(
  req: Request<ParamsWithId>,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: specialTaskId } = req.params;
    const parsedToken: ParsedToken = req.user;

    const student = await UserServices.findStudentByUserId(parsedToken.userId);

    if (!student) {
      res.status(404);
      throw new Error('Student with given userId does not exist.');
    }

    const specialTask = await TaskServices.getSpecialTaskById(+specialTaskId);

    if (!specialTask) {
      res.status(404);
      throw new Error('Special task with given ID does not exist.');
    }

    const specialTaskAnswer =
      await TaskServices.getSpecialTaskAnswerWithStudentAndTaskID(
        +specialTaskId,
        student.id
      );

    if (specialTaskAnswer) {
      res.json({
        message: 'success',
        specialTaskInfo: specialTask,
        answer: { ...specialTaskAnswer[0] },
      });
    } else {
      res.json({
        message: 'success',
        specialTaskInfo: specialTask,
        answer: {}
      });
    }
  } catch (error) {
    next(error);
  }
}

export async function getLessonTaksById(
  req: Request<ParamsWithLessonId>,
  res: Response,
  next: NextFunction
) {
  try {
    const { id, lessonId } = req.params;
    const parsedToken: ParsedToken = req.user;

    const student = await UserServices.findStudentByUserId(parsedToken.userId);

    if (!student) {
      res.status(404);
      throw new Error('Student with given userId does not exist.');
    }

    const tasksWithStudentAnswers =
      await AnswersServices.findCompletedTaskByStudent(student.answersId);

    const existingLesson = await LessonServices.findLessonById(+lessonId);

    if (!existingLesson) {
      res.status(404);
      throw new Error('Lesson with this id does not exist');
    }

    const existingLessonTask = await TaskServices.getLessonTaskById(+id);

    if (!existingLessonTask) {
      res.status(404);
      throw new Error('Task with this id does not exist');
    }

    if (
      tasksWithStudentAnswers.some(
        (task) => task.taskId === existingLessonTask.id
      )
    ) {
      const answer = await AnswersServices.findAnswerByTaskIdAndStudentId(
        existingLessonTask.id,
        student.id
      );
      res.json({
        message: 'success',
        lessonNumber: existingLesson.number,
        taskInfo: existingLessonTask,
        answer: { ...answer[0] },
      });
    } else {
      res.json({
        message: 'success',
        lessonNumber: existingLesson.number,
        taskInfo: existingLessonTask,
        answer: {},
      });
    }
  } catch (error) {
    next(error);
  }
}

export async function getStudentTasks(
  req: Request<
    ParamsWithGroupId,
    MessageResponse,
    TaskSchemas.GetStudentTasksInput
  >,
  res: Response,
  next: NextFunction
) {
  try {
    const parsedToken: ParsedToken = req.user;
    const student = await UserServices.findStudentByUserId(parsedToken.userId);
    const { groupId } = req.params;

    if (!student) {
      res.status(404);
      throw new Error('Student with given id does not exist.');
    }

    const allTasks = await TaskServices.getStudentTasks(student.id, +groupId);

    res.json({
      message: 'success',
      tasks: allTasks,
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
    const { number, question, closeDate, lessonId, isMarkdown } = req.body;

    const existingLesson = await LessonServices.findLessonById(lessonId);

    if (!existingLesson) {
      res.status(404);
      throw new Error('Lesson with given id does not exist.');
    }

    const task = await TaskServices.createTask({
      number,
      question,
      closeDate: dayjs(closeDate).toDate(),
      isMarkdown,
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

export async function getSpecialTasks(
  req: Request<ParamsWithId>,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: lecturerId } = req.params;
    const lecturer = await UserServices.findLecturerById(+lecturerId);

    if (!lecturer) {
      res.status(404);
      throw new Error('Lecturer with given id does not exist.');
    }

    const specialTasks = (await TaskServices.getSpecialTasks(+lecturerId)).sort(
      (a, b) => a.id - b.id
    );

    res.json({
      message: 'success',
      specialTasks,
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
    const { id: taskId } = req.params;
    const { question, closeDate, isMarkdown } = req.body;

    const existingTask = await TaskServices.findTaskById(+taskId);

    if (!existingTask) {
      res.status(404);
      throw new Error('Task with this id does not exist.');
    }

    const task = await TaskServices.updateTask(+taskId, {
      question,
      closeDate: dayjs(closeDate).toDate(),
      isMarkdown,
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
