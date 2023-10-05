import { Response, Request, NextFunction } from 'express';
import MessageResponse from 'interfaces/MessageResponse';
import { GroupInput } from './groups.schemas';
import { findGroupByName } from './groups.services';
import { createGroup as createGroupByName } from './groups.services';

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

    const group = await createGroupByName({
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
