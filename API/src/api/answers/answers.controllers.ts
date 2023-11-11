import { Response, Request, NextFunction } from 'express';
import MessageResponse from 'interfaces/MessageResponse';
import { ParamsWithId } from 'interfaces/ParamsWithId';
import { AnswerInput, AnswerReply, AnswerUpdate } from './answers.schemas';
import * as AnswerServices from './answers.services';

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

    await AnswerServices.assignAnswerToStudent(studentId, answer.id);

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
    const { id: answerId } = req.params;

    const existingAnswer = await AnswerServices.findAnswerById(+answerId);

    if (!existingAnswer) {
      res.status(404);
      throw new Error('Answer with this id does not exist.');
    }

    const answerReply = await AnswerServices.answerReply(
      +answerId,
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
