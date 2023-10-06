import { Response, Request, NextFunction } from 'express';
import MessageResponse from 'interfaces/MessageResponse';
import { ParamsWithId } from 'interfaces/ParamsWithId';
import { AnswerInput, AnswerReply } from './answers.schemas';
import * as AnswerServices from './answers.services';
import { ParsedQs } from 'qs';

export async function createAnswer(
  req: Request<{}, MessageResponse, AnswerInput>,
  res: Response<MessageResponse>,
  next: NextFunction
) {
  try {
    const { solution, taskId, studentId } = req.body;

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

    res.json({
      message: `Answer id:${answer.id} for task id: ${answer.taskId} by student id ${answer.studentId} created successfully.`,
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
    const { id } = req.params;

    const answerReply = await AnswerServices.answerReply(
      +id,
      replyStatus,
      replyDesc,
      replyDate,
      grantedScore
    );

    res.json({
      message: `Answer id:${answerReply.id} for task id:${answerReply.taskId} (student id:${answerReply.studentId}) was updated with ${answerReply.replyStatus} and score: ${grantedScore} successfully.`,
    });
  } catch (error) {
    next(error);
  }
}
