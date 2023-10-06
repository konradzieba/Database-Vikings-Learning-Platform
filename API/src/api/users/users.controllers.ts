import { Response, Request, NextFunction } from 'express';
import { ParsedToken } from '../../../typings/token';
import * as UserServices from './users.services';
import { ParamsWithId } from 'interfaces/ParamsWithId';
import MessageResponse from 'interfaces/MessageResponse';

export async function me(req: Request, res: Response, next: NextFunction) {
  try {
    const parsedToken: ParsedToken = req.user;
    const user = await UserServices.findUserById(parsedToken.userId);

    if (!user) {
      res.status(404);
      throw new Error('User not found.');
    }

    res.json({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(
  req: Request<{}, MessageResponse, {}, ParamsWithId>,
  res: Response<MessageResponse>,
  next: NextFunction
) {
  try {
    const { id } = req.query;

    await UserServices.deleteUser(+id);

    res.json({
      message: `User with id: ${id} was deleted successfully.`,
    });
  } catch (error) {
    next(error);
  }
}
