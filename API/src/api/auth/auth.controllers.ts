import { Response, Request, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

import { TokensResponseInterface } from '../../interfaces/TokensResponse';
import { generateTokens, verifyRefreshToken } from '../../utils/jwt';
import { sendRefreshToken } from '../../utils/sendRefreshToken';
import { generatePasswordByCredentials } from '../../utils/generatePassword';
import { hashToken } from '../../utils/hashToken';
import MessageResponse from 'interfaces/MessageResponse';
import * as UserServices from '../users/users.services';
import * as AuthSchemas from './auth.schemas';
import * as AuthServices from './auth.services';

export async function registerStudent(
  req: Request<
    {},
    TokensResponseInterface,
    AuthSchemas.RegisterStudentInput,
    AuthSchemas.RegisterQuerySchema
  >,
  res: Response<TokensResponseInterface>,
  next: NextFunction
) {
  try {
    const { firstName, lastName, indexNumber } = req.body;
    const { refreshTokenInCookie } = req.query;

    const existingUser =
      await UserServices.findStudentByIndexNumber(indexNumber);

    if (existingUser) {
      res.status(400);
      throw new Error('This student already exists.');
    }
    const generatedPassword = generatePasswordByCredentials(
      firstName,
      lastName,
      indexNumber
    );
    const user = await UserServices.createUser({
      email: `${indexNumber}@student.uwm.edu.pl`,
      password: generatedPassword,
      firstName,
      lastName,
    });

    if (user) {
      await UserServices.createStudent({
        indexNumber,
        User: { connect: { id: user.id } },
      });
    }

    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(user, jti);

    await AuthServices.addRefreshTokenToWhitelist({
      jti,
      refreshToken,
      userId: user.id,
    });

    if (refreshTokenInCookie === 'true') {
      sendRefreshToken(res, refreshToken);
      res.json({
        access_token: accessToken,
      });
    } else {
      res.json({
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    }
  } catch (error) {
    next(error);
  }
}

export async function registerLecturer(
  req: Request<
    {},
    TokensResponseInterface,
    AuthSchemas.RegisterLecturerInput,
    AuthSchemas.RegisterQuerySchema
  >,
  res: Response<TokensResponseInterface & Partial<MessageResponse>>,
  next: NextFunction
) {
  try {
    const { email, password, firstName, lastName, isAdmin } = req.body;
    const { refreshTokenInCookie } = req.query;

    const existingUser = await UserServices.findUserByEmail(email);

    if (existingUser) {
      res.status(400);
      throw new Error('Lecturer with this email is already in use.');
    }

    const user = await UserServices.createUser({
      email,
      password,
      firstName,
      lastName,
    });

    if (user) {
      await UserServices.createLecturer({
        isAdmin,
        User: { connect: { id: user.id } },
      });
    }

    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(user, jti);

    await AuthServices.addRefreshTokenToWhitelist({
      jti,
      refreshToken,
      userId: user.id,
    });

    if (refreshTokenInCookie === 'true') {
      sendRefreshToken(res, refreshToken);
      res.json({
        access_token: accessToken,
      });
    } else {
      res.json({
        message: `Lecturer ${user.firstName} ${user.lastName} created successfully.`,
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    }
  } catch (error) {
    next(error);
  }
}

export async function login(
  req: Request<
    {},
    TokensResponseInterface,
    AuthSchemas.LoginInput,
    AuthSchemas.LoginQuerySchema
  >,
  res: Response<TokensResponseInterface>,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;
    const { refreshTokenInCookie } = req.query;

    const existingUser = await UserServices.findUserByEmail(email);

    if (!existingUser) {
      res.status(401);
      throw new Error('Invalid login credentials.');
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      res.status(401);
      throw new Error('Invalid login credentials.');
    }

    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(existingUser, jti);

    await AuthServices.addRefreshTokenToWhitelist({
      jti,
      refreshToken,
      userId: existingUser.id,
    });

    if (refreshTokenInCookie === 'true') {
      sendRefreshToken(res, refreshToken);
      res.json({
        access_token: accessToken,
      });
    } else {
      res.json({
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    }
  } catch (error) {
    next(error);
  }
}

export async function refreshTokens(
  req: Request<{}, TokensResponseInterface, AuthSchemas.RefreshInput>,
  res: Response<TokensResponseInterface>,
  next: NextFunction
) {
  try {
    const refreshToken = req.body.refresh_token || req.cookies?.refresh_token;
    if (!refreshToken) {
      res.status(400);
      throw new Error('Missing refresh token.');
    }
    const payload = verifyRefreshToken(refreshToken) as {
      userId: number;
      jti: string;
    };

    const savedRefreshToken = await AuthServices.findRefreshTokenById(
      payload.jti
    );
    if (!savedRefreshToken || savedRefreshToken.revoked === true) {
      res.status(401);
      throw new Error('Unauthorized');
    }

    const hashedToken = hashToken(refreshToken);
    if (hashedToken !== savedRefreshToken.hashedToken) {
      res.status(401);
      throw new Error('Unauthorized');
    }
    const user = await UserServices.findUserById(payload.userId);

    if (!user) {
      res.status(401);
      throw new Error('Unauthorized');
    }

    await AuthServices.deleteRefreshToken(savedRefreshToken.id);
    const jti = uuidv4();
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      user,
      jti
    );
    await AuthServices.addRefreshTokenToWhitelist({
      jti,
      refreshToken: newRefreshToken,
      userId: user.id,
    });

    const { refreshTokenInCookie } = req.query;

    if (refreshTokenInCookie === 'true') {
      sendRefreshToken(res, newRefreshToken);
      res.json({
        access_token: accessToken,
      });
    } else {
      res.json({
        access_token: accessToken,
        refresh_token: newRefreshToken,
      });
    }
  } catch (error) {
    if (
      error instanceof Error &&
      (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError')
    ) {
      res.status(401);
    }
    next(error);
  }
}
