import { Router } from 'express';
import { validateRequest } from '../../middlewares';
import * as GroupsControllers from './groups.controllers';
import { groupSchema } from './groups.schemas';

const router = Router();

router.post(
  '/createGroup',
  validateRequest({ body: groupSchema }),
  GroupsControllers.createGroup
);

export default router;
