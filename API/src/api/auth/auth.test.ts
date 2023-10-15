import request from 'supertest';
import app from '../../app';
import { db } from '../../db';
import * as bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt';
import { v4 as uuidv4 } from 'uuid';
import { hashToken } from '../../utils/hashToken';
import {
  globalLecturerCredentials,
  globalUserCredentials,
} from '../../mocks/globalCredentials';
import { Role } from '@prisma/client';

describe('POST /api/v1/auth/register', () => {
  it('responds with an error if payload is missing', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);

    expect(response.statusCode).toBe(400);
  });

  it('responds with an error if payload firstName is missing ', async () => {
    const payload = {
      email: 'mihai@mihai.com',
      lastName: 'Rambo',
      indexNumber: globalUserCredentials.indexNumber,
    };

    const response = await request(app)
      .post('/api/v1/auth/register')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send(payload);

    expect(response.statusCode).toBe(400);
  });

  it('responds with an error if payload lastName is missing ', async () => {
    const payload = {
      email: 'mihai@mihai.com',
      firstName: 'John',
      indexNumber: globalUserCredentials.indexNumber,
    };

    const response = await request(app)
      .post('/api/v1/auth/register')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send(payload);

    expect(response.statusCode).toBe(400);
  });

  it('responds with an message', async () => {
    const payload = {
      firstName: 'John',
      lastName: 'Rambo',
      indexNumber: 628425,
    };

    const response = await request(app)
      .post('/api/v1/auth/register')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send(payload);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toContain('created successfully.');
  });

  it('responds with an error if student already exists', async () => {
    const payload = {
      firstName: 'John',
      lastName: 'Rambo',
      indexNumber: 628425,
    };

    const response = await request(app)
      .post('/api/v1/auth/register')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send(payload);

    expect(response.statusCode).toBe(400);
  });
});

describe('POST /api/v1/auth/registerLecturer', () => {
  let validLecturerToken = process.env.VALID_LECTURER_TOKEN_FOR_TESTING!;
  it('responds with an error if payload is missing', async () => {
    const response = await request(app)
      .post('/api/v1/auth/registerLecturer')
      .set('Accept', 'application/json')
      .set('Cookie', `access_token=${validLecturerToken}`)
      .expect('Content-Type', /json/);

    expect(response.statusCode).toBe(400);
  });

  it('responds with an error if payload firstName is missing ', async () => {
    const payload = {
      email: 'lecturer@test.com',
      lastName: 'Lecturer',
      password: 'Test1@123',
      isAdmin: true,
    };
    const response = await request(app)
      .post('/api/v1/auth/registerLecturer')
      .set('Accept', 'application/json')
      .set('Cookie', `access_token=${validLecturerToken}`)
      .expect('Content-Type', /json/)
      .send(payload);
    expect(response.statusCode).toBe(400);
  });

  it('responds with an error if payload lastName is missing ', async () => {
    const payload = {
      email: 'lecturer@test.com',
      firstName: 'Test',
      password: 'Test1@123',
      isAdmin: true,
    };
    const response = await request(app)
      .post('/api/v1/auth/registerLecturer')
      .set('Accept', 'application/json')
      .set('Cookie', `access_token=${validLecturerToken}`)
      .expect('Content-Type', /json/)
      .send(payload);
    expect(response.statusCode).toBe(400);
  });
  it('responds with an error if payload password is missing ', async () => {
    const payload = {
      email: 'lecturer@test.com',
      firstName: 'Test',
      lastName: 'Lecturer',
      isAdmin: true,
    };
    const response = await request(app)
      .post('/api/v1/auth/registerLecturer')
      .set('Accept', 'application/json')
      .set('Cookie', `access_token=${validLecturerToken}`)
      .expect('Content-Type', /json/)
      .send(payload);
    expect(response.statusCode).toBe(400);
  });
  it('responds with an error if payload isAdmin is missing ', async () => {
    const payload = {
      email: 'lecturer@test.com',
      firstName: 'Test',
      lastName: 'Lecturer',
      password: 'Test1@123',
    };
    const response = await request(app)
      .post('/api/v1/auth/registerLecturer')
      .set('Accept', 'application/json')
      .set('Cookie', `access_token=${validLecturerToken}`)
      .expect('Content-Type', /json/)
      .send(payload);
    expect(response.statusCode).toBe(400);
  });
  it('responds with an error if email is already in use', async () => {
    const payload = {
      email: globalLecturerCredentials.email,
      firstName: globalLecturerCredentials.firstName,
      lastName: globalLecturerCredentials.lastName,
      password: globalLecturerCredentials.password,
      isAdmin: globalLecturerCredentials.isAdmin,
    };
    const response = await request(app)
      .post('/api/v1/auth/registerLecturer')
      .set('Accept', 'application/json')
      .set('Cookie', `access_token=${validLecturerToken}`)
      .expect('Content-Type', /json/)
      .send(payload);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe(
      'Lecturer with this email is already in use.'
    );
  });
  it('responds with an access_token and refresh_token', async () => {
    const payload = {
      email: `success.test${globalLecturerCredentials.email}`,
      firstName: `success${globalLecturerCredentials.firstName}`,
      lastName: `success${globalLecturerCredentials.lastName}`,
      password: globalLecturerCredentials.password,
      isAdmin: globalLecturerCredentials.isAdmin,
    };
    const response = await request(app)
      .post('/api/v1/auth/registerLecturer')
      .set('Accept', 'application/json')
      .set('Cookie', `access_token=${validLecturerToken}`)
      .expect('Content-Type', /json/)
      .send(payload);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toContain('created successfully.');
  });
});

describe('POST /api/v1/auth/registerSuperUser', () => {
  let validAccessToken = process.env.VALID_SUPERUSER_TOKEN_FOR_TESTING!;
  it('responds with an error if payload is missing', async () => {
    const res = await request(app)
      .post('/api/v1/auth/registerSuperUser')
      .set('Accept', 'application/json')
      .set('Cookie', `access_token=${validAccessToken}`)
      .expect('Content-Type', /json/);

    expect(res.statusCode).toBe(400);
  });

  it('responds with an error if payload firstName is missing', async () => {
    const res = await request(app)
      .post('/api/v1/auth/registerSuperUser')
      .set('Accept', 'application/json')
      .set('Cookie', `access_token=${validAccessToken}`)
      .expect('Content-Type', /json/)
      .send({
        email: 'customSuper@user.com',
        password: 'superUser123',
        lastName: 'User',
        isAdmin: true,
      });

    expect(res.statusCode).toBe(400);
  });

  it('responds with an error if payload lastName is missing', async () => {
    const res = await request(app)
      .post('/api/v1/auth/registerSuperUser')
      .set('Accept', 'application/json')
      .set('Cookie', `access_token=${validAccessToken}`)
      .expect('Content-Type', /json/)
      .send({
        email: 'customSuper@user.com',
        password: 'superUser123',
        firstName: 'Super',
        isAdmin: true,
      });

    expect(res.statusCode).toBe(400);
  });

  it('responds with an access_token and refresh_token', async () => {
    const payload = {
      email: 'superUser@gmail.com',
      password: 'superUserPassword123',
      firstName: 'John',
      lastName: 'Bambo',
      isAdmin: true,
    };
    const response = await request(app)
      .post('/api/v1/auth/registerSuperUser')
      .set('Accept', 'application/json')
      .set('Cookie', `access_token=${validAccessToken}`)
      .expect('Content-Type', /json/)
      .send(payload);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toContain('created successfully.');
  });

  it('responds with an error if superuser already exists', async () => {
    const payload = {
      email: 'superuser@superuser.pl',
      password: 'superUserPassword123',
      firstName: 'John',
      lastName: 'Bambo',
      isAdmin: true,
    };

    const res = await request(app)
      .post('/api/v1/auth/registerSuperUser')
      .set('Accept', 'application/json')
      .set('Cookie', `access_token=${validAccessToken}`)
      .expect('Content-Type', /json/)
      .send(payload);

    expect(res.statusCode).toBe(400);
  });
});

describe('POST /api/v1/auth/login', () => {
  it('responds with an error if payload is missing', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);

    expect(response.statusCode).toBe(400);
  });

  it('responds with an error if payload email is missing ', async () => {
    const payload = {
      password: 'Test1@123',
    };

    const response = await request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send(payload);

    expect(response.statusCode).toBe(400);
  });

  it('responds with an error if password is missing ', async () => {
    const payload = {
      email: 'mihai@mihai.com',
    };
    const response = await request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send(payload);

    expect(response.statusCode).toBe(400);
  });

  it('responds with unauthorized if user is missing from db', async () => {
    const payload = {
      email: 'test@test.com',
      password: 'Test1@123',
    };
    const response = await request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send(payload);

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Invalid login credentials.');
  });

  it('responds with unauthorized if password is wrong', async () => {
    const payload = {
      ...globalUserCredentials,
      password: 'wrongPassw0rd',
    };
    const response = await request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send(payload);

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Invalid login credentials.');
  });

  it('responds with an Logged in successfully message', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        email: globalUserCredentials.email,
        password: globalUserCredentials.password,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Logged in successfully.');
  });
});

describe('POST /api/v1/auth/refreshToken', () => {
  const userCredentials = {
    email: 'mihai@refresh.com',
    password: 'Test1@123',
  };

  let userId: number;
  let expiredRefreshToken = '';
  let validRefreshToken = '';
  let refreshTokenNotPresentInDb = '';
  let refreshTokenWithDifferentUserId = '';
  let tokenWithNotExistingUser = '';

  beforeAll(async () => {
    const user = await db.user.create({
      data: {
        email: userCredentials.email,
        password: bcrypt.hashSync(userCredentials.password, 12),
        firstName: 'John',
        lastName: 'Rambo',
      },
    });

    userId = user.id;

    expiredRefreshToken = generateRefreshToken(
      { userId: user.id, jti: uuidv4(), role: Role.LECTURER },
      '1s'
    );

    const jti = uuidv4();
    const jtiForNotExistingUser = uuidv4();
    validRefreshToken = generateRefreshToken(
      { userId: user.id, jti, role: Role.LECTURER },
      '5m'
    );

    tokenWithNotExistingUser = generateRefreshToken(
      {
        userId: 99999,
        jti: jtiForNotExistingUser,
        role: Role.LECTURER,
      },
      '5m'
    );

    refreshTokenWithDifferentUserId = generateRefreshToken(
      { userId: user.id + 1, jti, role: Role.LECTURER },
      '5m'
    );

    refreshTokenNotPresentInDb = generateRefreshToken(
      { userId: user.id, jti: uuidv4(), role: Role.LECTURER },
      '5m'
    );

    await db.refreshToken.create({
      data: {
        id: jtiForNotExistingUser,
        hashedToken: hashToken(tokenWithNotExistingUser),
        userId: user.id,
      },
    });

    await db.refreshToken.create({
      data: {
        id: jti,
        hashedToken: hashToken(validRefreshToken),
        userId: user.id,
      },
    });
  });

  afterAll(async () => {
    await db.user.delete({
      where: {
        email: userCredentials.email,
      },
    });
  });

  it('responds with error if refresh_token is missing ( cookie case )', async () => {
    const response = await request(app)
      .post('/api/v1/auth/refreshToken')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Missing refresh token.');
  });

  it('responds with Unauthorized if token is not match with hashed token', async () => {
    const response = await request(app)
      .post('/api/v1/auth/refreshToken')
      .set('Accept', 'application/json')
      .set('Cookie', `refresh_token=${refreshTokenWithDifferentUserId}`)
      .expect('Content-Type', /json/);

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Unauthorized');
  });

  it(`responds with Unauthorized if used doesn't exists`, async () => {
    const response = await request(app)
      .post('/api/v1/auth/refreshToken')
      .set('Accept', 'application/json')
      .set('Cookie', `refresh_token=${tokenWithNotExistingUser}`)
      .expect('Content-Type', /json/);

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Unauthorized');
  });

  it('responds with Unauthorized if token is expired ( cookie case ) ', async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await request(app)
      .post('/api/v1/auth/refreshToken')
      .set('Accept', 'application/json')
      .set('Cookie', `refresh_token=${expiredRefreshToken}`)
      .expect('Content-Type', /json/);

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('jwt expired');
  });

  it('responds with Unauthorized if token is not present in db ( cookie case ) ', async () => {
    const response = await request(app)
      .post('/api/v1/auth/refreshToken')
      .set('Accept', 'application/json')
      .set('Cookie', `refresh_token=${refreshTokenNotPresentInDb}`)
      .expect('Content-Type', /json/);

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Unauthorized');
  });

  it('responds with an access_token and refresh_token ( cookie case )', async () => {
    const response = await request(app)
      .post('/api/v1/auth/refreshToken')
      .set('Accept', 'application/json')
      .set('Cookie', `refresh_token=${validRefreshToken}`)
      .expect('Content-Type', /json/);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toContain('successfully.');
    validRefreshToken = response.body.refresh_token;
  });

  //
  it('responds with jwt malformed if refresh token is revoked', async () => {
    const response = await request(app)
      .post('/api/v1/auth/refreshToken')
      .set('Accept', 'application/json')
      .set('Cookie', `refresh_token=${validRefreshToken}`)
      .expect('Content-Type', /json/);

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('jwt malformed');
  });

  it('responds with Unauthorized if user does not exist', async () => {
    const refreshTokenWithNotExistingUser = generateRefreshToken(
      { userId: 999999, jti: uuidv4(), role: Role.LECTURER },
      '5m'
    );

    const user = await db.user.findUnique({ where: { id: 999999 } });
    expect(user).toBeNull();

    const response = await request(app)
      .post('/api/v1/auth/refreshToken')
      .set('Accept', 'application/json')
      .set('Cookie', `refresh_token=${refreshTokenWithNotExistingUser}`)
      .expect('Content-Type', /json/);

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Unauthorized');
  });
  //
});

describe('POST /api/v1/auth/logout', () => {
  const userCredentials = {
    email: 'mihai@testrefresh.com',
    password: 'Test1@ 123',
  };

  let userId: number;
  let expiredRefreshToken = '';
  let validRefreshToken = '';
  let refreshTokenNotPresentInDb = '';
  let accessToken = '';

  beforeAll(async () => {
    const user = await db.user.create({
      data: {
        email: userCredentials.email,
        password: bcrypt.hashSync(userCredentials.password, 12),
        firstName: 'John',
        lastName: 'Rambo',
      },
    });

    userId = user.id;

    accessToken = generateAccessToken(
      {
        userId: user.id,
        role: Role.LECTURER,
      },
      '5m'
    );

    const jti = uuidv4();

    expiredRefreshToken = generateRefreshToken(
      { userId: user.id + 1, jti, role: Role.LECTURER },
      '5m'
    );

    validRefreshToken = generateRefreshToken(
      { userId: user.id, jti, role: Role.LECTURER },
      '5m'
    );
    refreshTokenNotPresentInDb = generateRefreshToken(
      { userId: user.id, jti: uuidv4(), role: Role.LECTURER },
      '5m'
    );

    await db.refreshToken.create({
      data: {
        id: jti,
        hashedToken: hashToken(validRefreshToken),
        userId: user.id,
      },
    });
  });

  afterAll(async () => {
    await db.user.delete({
      where: {
        email: userCredentials.email,
      },
    });
  });

  it('responds with an error if refresh token is missing', async () => {
    const response = await request(app)
      .post('/api/v1/auth/logout')
      .set('Accept', 'application/json')
      .set('Cookie', [`access_token=${accessToken}`])
      .expect('Content-Type', /json/);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Missing refresh token.');
  });

  it('responds with an error if refresh token is not in data base', async () => {
    const response = await request(app)
      .post('/api/v1/auth/logout')
      .set('Accept', 'application/json')
      .set('Cookie', [
        `refresh_token=${refreshTokenNotPresentInDb}`,
        `access_token=${accessToken}`,
      ])
      .expect('Content-Type', /json/);

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Unauthorized');
  });

  it('responds with an error if refresh token is not equal to hashed token', async () => {
    const response = await request(app)
      .post('/api/v1/auth/logout')
      .set('Accept', 'application/json')
      .set('Cookie', [
        `refresh_token=${expiredRefreshToken}`,
        `access_token=${accessToken}`,
      ])
      .expect('Content-Type', /json/);

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Unauthorized');
  });

  it('responds with a success message if refresh token is valid', async () => {
    const response = await request(app)
      .post('/api/v1/auth/logout')
      .set('Accept', 'application/json')
      .set('Cookie', [
        `refresh_token=${validRefreshToken}`,
        `access_token=${accessToken}`,
      ])
      .expect('Content-Type', /json/);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Logged out successfully.');
  });
});
