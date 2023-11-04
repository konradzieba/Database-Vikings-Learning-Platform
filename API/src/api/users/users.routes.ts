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
  '/changePassword',
  validateRequest({
    params: paramsWithIdSchema,
    body: UserSchemas.changePasswordSchema,
  }),
  UserController.changePassword
);

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

router.delete(
  '/deleteUser/:id',
  validateRequestAndCheckRole(
    { params: paramsWithIdSchema },
    EnumRole.SUPERUSER
  ),
  UserController.deleteUser
);

export default router;
