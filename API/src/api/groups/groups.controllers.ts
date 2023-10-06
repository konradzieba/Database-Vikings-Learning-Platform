import { Response, Request, NextFunction } from 'express';
import MessageResponse from 'interfaces/MessageResponse';
import { GroupInput } from './groups.schemas';
import { findGroupByName } from './groups.services';
import * as GroupServices from './groups.services';
import { ParamsWithId } from 'interfaces/ParamsWithId';

export async function createGroup(
  req: Request<{}, MessageResponse, GroupInput>,
  res: Response<MessageResponse>,
  next: NextFunction
) {
  try {
    const { name, lecturerId } = req.body;

    const existingGroup = await findGroupByName(name);

    if (existingGroup) {
      res.status(400);
      throw new Error('Group with this name already exists.');
    }

    const group = await GroupServices.createGroup({
      name,
      Lecturer: { connect: { id: lecturerId } },
    });

    res.json({
      message: `Group ${group.name} created successfully.`,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteGroup(
  req: Request<{}, MessageResponse, {}, ParamsWithId>,
  res: Response<MessageResponse>,
  next: NextFunction
) {
  try {
    const { id } = req.query;

    const group = await GroupServices.deleteGroup(+id);

    res.json({
      message: `Group with ${group.id}, number ${group.name} deleted successfully.`,
    });
  } catch (error) {
    next(error);
  }
}
