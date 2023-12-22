import { Response, Request, NextFunction } from 'express';
import MessageResponse from 'interfaces/MessageResponse';
import { ParamsWithId } from 'interfaces/ParamsWithId';
import {
  AnswerInput,
  AnswerReply,
  AnswerReplyUpdate,
  AnswerUpdate,
} from './answers.schemas';
import * as AnswerServices from './answers.services';
import * as UserServices from '../users/users.services';
import * as TaskServices from '../tasks/tasks.services';
import { Answer, PrismaClient } from '@prisma/client';

export async function createAnswer(
  req: Request<{}, MessageResponse, AnswerInput>,
  res: Response<MessageResponse>,
  next: NextFunction
) {
  try {
    const { solution, taskId, studentId } = req.body;

    const student = await UserServices.findStudentByStudentId(studentId);

    if (!student) {
      res.status(404);
      throw new Error('Student with given id does not exist.');
    }

    const task = await TaskServices.findTaskById(taskId);

    if (!task) {
      res.status(404);
      throw new Error('Task with given id does not exist.');
    }

    const existingAnswer = await AnswerServices.findAnswerByTaskIdAndStudentId(
      taskId,
      studentId
    );

    if (existingAnswer.length !== 0) {
      res.status(400);
      throw new Error('Answer for this task already exists.');
    }

    const answer = await AnswerServices.createAnswer({
      solution,
      Task: { connect: { id: taskId } },
      Student: { connect: { id: studentId } },
    });

    await AnswerServices.assignAnswerToStudent(studentId, answer.id);

    await UserServices.updateAggregatedSendTime(studentId, task.openDate);

    res.json({
      message: `Answer id:${answer.id} for task id: ${answer.taskId} by student id ${answer.studentId} created successfully.`,
    });
  } catch (error) {
    next(error);
  }
}

export async function getEditReplyAnswerData(
  req: Request<ParamsWithId, { answerData: Answer }, {}>,
  res: Response<{ answerData: Answer }>,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const existingAnswer = await AnswerServices.findAnswerById(+id);

    if (!existingAnswer) {
      res.status(404);
      throw new Error('Answer with this id does not exist.');
    }

    res.json({
      answerData: existingAnswer,
    });
  } catch (error) {
    next(error);
  }
}

export async function answerReply(
  req: Request<ParamsWithId, MessageResponse, AnswerReply>,
  res: Response<MessageResponse>,
  next: NextFunction
) {
  try {
    const { replyStatus, replyDate, replyDesc, grantedScore } = req.body;
    const { id: answerId } = req.params;

    const existingAnswer = await AnswerServices.findAnswerById(+answerId);

    if (!existingAnswer) {
      res.status(404);
      throw new Error('Answer with this id does not exist.');
    }

    await AnswerServices.answerReply(
      +answerId,
      replyStatus,
      replyDesc,
      replyDate,
      grantedScore
    );

    res.json({
      message: `Answer id: ${answerId} replied successfully, student score has been increased by ${grantedScore}.`,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateAnswerReply(
  req: Request<ParamsWithId, MessageResponse, AnswerReplyUpdate>,
  res: Response<MessageResponse>,
  next: NextFunction
) {
  try {
    const { replyStatus, replyDesc, grantedScore: newGrantedScore } = req.body;
    const { id } = req.params;

    const existingAnswer = await AnswerServices.findAnswerById(+id);

    if (!existingAnswer) {
      res.status(404);
      throw new Error('Answer with this id does not exist.');
    }
    console.log('przed servicem');
    await AnswerServices.updateAnswerReply(
      +id,
      existingAnswer.grantedScore,
      replyStatus,
      replyDesc,
      newGrantedScore
    );
    console.log('po servicie');

    res.json({
      message: `Answer id: ${existingAnswer.id} reply updated successfully.`,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateAnswer(
  req: Request<ParamsWithId, MessageResponse, AnswerUpdate>,
  res: Response<MessageResponse>,
  next: NextFunction
) {
  try {
    const { replyDesc, grantedScore } = req.body;
    const { id } = req.params;

    const existingAnswer = await AnswerServices.findAnswerById(+id);

    if (!existingAnswer) {
      res.status(404);
      throw new Error('Answer with this id does not exist.');
    }

    const answer = await AnswerServices.updateAnswer(
      +id,
      replyDesc,
      grantedScore
    );

    res.json({
      message: `Answer id:${answer.id} for task id:${answer.taskId} (student id:${answer.studentId}) was updated successfully.`,
    });
  } catch (error) {
    next(error);
  }
}
