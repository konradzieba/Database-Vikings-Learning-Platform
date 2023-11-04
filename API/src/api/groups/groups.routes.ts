import { Router } from 'express';
import { validateRequestAndCheckRole } from '../../middlewares';
import * as GroupsControllers from './groups.controllers';
import * as GroupSchemas from './groups.schemas';
import { paramsWithIdSchema } from '../../interfaces/ParamsWithId';
import { EnumRole } from '../../../typings/token';

const router = Router();

router.get(
  '/getGroupsByLecturerId/:id',
  validateRequestAndCheckRole(
    { params: paramsWithIdSchema },
    EnumRole.LECTURER
  ),
  GroupsControllers.getGroups
);

router.post(
  '/createGroup',
  validateRequestAndCheckRole(
    { body: GroupSchemas.groupSchema },
    EnumRole.LECTURER
  ),
  GroupsControllers.createGroup
);

router.patch(
  '/renameGroup/:id',
  validateRequestAndCheckRole(
    {
      params: paramsWithIdSchema,
      body: GroupSchemas.renameGroupInput,
    },
    EnumRole.LECTURER
  ),
  GroupsControllers.renameGroup
);

router.delete(
  '/deleteGroup/:id',
  validateRequestAndCheckRole(
    { params: paramsWithIdSchema },
    EnumRole.LECTURER
  ),
  GroupsControllers.deleteGroup
);

export default router;
