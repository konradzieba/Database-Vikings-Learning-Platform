import { Router } from 'express';
import { validateRequest } from '../../middlewares';
import * as AnswersControllers from './answers.controllers';
import * as AnswerSchemas from './answers.schemas';
import { paramsWithIdSchema } from '../../interfaces/ParamsWithId';

const router = Router();

router.post(
  '/createAnswer',
  validateRequest({ body: AnswerSchemas.answerInputSchema }),
  AnswersControllers.createAnswer
);

router.patch(
  '/answerReply/:id',
  validateRequest({
    params: paramsWithIdSchema,
    body: AnswerSchemas.answerReplySchema,
  }),
  AnswersControllers.answerReply
);

router.patch(
  '/updateAnswer/:id',
  validateRequest({
    params: paramsWithIdSchema,
    body: AnswerSchemas.answerUpdateSchema,
  }),
  AnswersControllers.updateAnswer
);

export default router;
