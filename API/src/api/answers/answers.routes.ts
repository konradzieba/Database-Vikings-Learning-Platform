import { Router } from 'express';
import {
  validateRequest,
  validateRequestAndCheckRole,
} from '../../middlewares';
import * as AnswersControllers from './answers.controllers';
import * as AnswerSchemas from './answers.schemas';
import { paramsWithIdSchema } from '../../interfaces/ParamsWithId';
import { EnumRole } from '../../../typings/token';

const router = Router();

router.get(
  '/getEditReplyAnswerData/:id',
  validateRequestAndCheckRole(
    {
      params: paramsWithIdSchema,
    },
    EnumRole.LECTURER
  ),
  AnswersControllers.getEditReplyAnswerData
);

router.get(
  '/getEditSpecialTaskAnswerData/:id',
  validateRequestAndCheckRole(
    {
      params: paramsWithIdSchema
    },
    EnumRole.LECTURER
  ),
  AnswersControllers.getEditSpecialTaskAnswerReplyData
)

router.post(
  '/createAnswer',
  validateRequestAndCheckRole(
    { body: AnswerSchemas.answerInputSchema },
    EnumRole.STUDENT
  ),
  AnswersControllers.createAnswer
);

router.patch(
  '/specialTaskAnswerReply/:id',
  validateRequestAndCheckRole(
    {
      params: paramsWithIdSchema,
      body: AnswerSchemas.answerReplySchema,
    },
    EnumRole.LECTURER
  ),
  AnswersControllers.specialTaskAnswerReply
)

router.patch(
  '/answerReply/:id',
  validateRequestAndCheckRole(
    {
      params: paramsWithIdSchema,
      body: AnswerSchemas.answerReplySchema,
    },
    EnumRole.LECTURER
  ),
  AnswersControllers.answerReply
);

router.patch(
  '/updateAnswerReply/:id',
  validateRequestAndCheckRole(
    {
      params: paramsWithIdSchema,
      body: AnswerSchemas.answerReplyUpdateSchema,
    },
    EnumRole.LECTURER
  ),
  AnswersControllers.updateAnswerReply
);

router.patch(
  '/updateSpecialTaskAnswerReply/:id',
  validateRequestAndCheckRole(
    {
      params: paramsWithIdSchema,
      body: AnswerSchemas.answerReplyUpdateSchema,
    },
    EnumRole.LECTURER
  ),
  AnswersControllers.updateSpecialTaskAnswerReply
)

router.patch(
  '/updateAnswer/:id',
  validateRequestAndCheckRole(
    {
      params: paramsWithIdSchema,
      body: AnswerSchemas.answerUpdateSchema,
    },
    EnumRole.LECTURER
  ),
  AnswersControllers.updateAnswer
);

export default router;
