import { Router } from 'express';
import { validateRequest } from '../../middlewares';
import * as AnswersControllers from './answers.controllers';
import { answerInputSchema, answerReplySchema } from './answers.schemas';
import { paramsWithIdSchema } from '../../interfaces/ParamsWithId';

const router = Router();

router.post(
  '/createAnswer',
  validateRequest({ body: answerInputSchema }),
  AnswersControllers.createAnswer
);

router.patch(
  '/answerReply/:id',
  validateRequest({ params: paramsWithIdSchema, body: answerReplySchema }),
  AnswersControllers.answerReply
);

export default router;
