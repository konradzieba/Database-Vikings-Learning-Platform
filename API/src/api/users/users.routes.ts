import { Router } from 'express';
import {
  requireUser,
  validateRequest,
  validateRequestAndCheckRole,
} from '../../middlewares';
import * as UserController from './users.controllers';
import * as UserSchemas from './users.schemas';
import { paramsWithIdSchema } from '../../interfaces/ParamsWithId';
import { EnumRole } from '../../../typings/token';

const router = Router();

router.get('/me', requireUser, UserController.me);

router.patch(
  '/changeDefaultPassword',
  [
    validateRequest({
      body: UserSchemas.changeDefaultPasswordSchema,
    }),
    requireUser,
  ],
  UserController.changeDefaultPassword
);

router.get(
  '/getStudentDefaultPasswordState',
  requireUser,
  UserController.getStudentDefaultPasswordState
);

router.get(
  '/getStudentPreviewData/:id',
  validateRequestAndCheckRole(
    {
      params: paramsWithIdSchema,
    },
    EnumRole.LECTURER
  ),
  UserController.getStudentPreviewData
);

router.get('/getScoreBoard', requireUser, UserController.getScoreBoard);

router.patch(
  '/updateUser/:id',
  validateRequestAndCheckRole(
    {
      params: paramsWithIdSchema,
      body: UserSchemas.updateUserSchema,
    },
    EnumRole.SUPERUSER
  ),
  UserController.updateUser
);

router.patch(
  '/updateStudent/:id',
  validateRequestAndCheckRole(
    {
      params: paramsWithIdSchema,
      body: UserSchemas.updateStudentSchema,
    },
    EnumRole.LECTURER
  ),
  UserController.updateStudent
);

router.patch(
  '/restoreDefaultPassword/:id',
  validateRequestAndCheckRole(
    {
      params: paramsWithIdSchema,
    },
    EnumRole.LECTURER
  ),
  UserController.restoreDefaultPassword
);

router.delete(
  '/deleteUser/:id',
  validateRequestAndCheckRole(
    { params: paramsWithIdSchema },
    EnumRole.LECTURER
  ),
  UserController.deleteUser
);

export default router;
