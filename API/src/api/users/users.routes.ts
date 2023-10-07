import { Router } from 'express';
import { requireUser, validateRequest } from '../../middlewares';
import * as UserController from './users.controllers';
import * as UserSchemas from './users.schemas';
import { paramsWithIdSchema } from '../../interfaces/ParamsWithId';

const router = Router();

router.get('/me', requireUser, UserController.me);

router.patch(
  '/updateUser',
  validateRequest({
    params: paramsWithIdSchema,
    body: UserSchemas.updateUserSchema,
  }),
  UserController.updateUser
);

router.delete(
  '/deleteUser/:id',
  validateRequest({ params: paramsWithIdSchema }),
  UserController.deleteUser
);

export default router;
