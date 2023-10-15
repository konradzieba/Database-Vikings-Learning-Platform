import request from 'supertest';
import app from '../../app';
import { EnumRole } from '../../../typings/token';

describe('GET /api/v1/users/me', () => {
  let validAccessToken = process.env.VALID_ACCESS_TOKEN_FOR_TESTING!;
  let invalidAccessToken = process.env.INVALID_ACCESS_TOKEN_FOR_TESTING!;
  it('responds with an error if token is missing', async () => {
    const response = await request(app)
      .get('/api/v1/users/me')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);

    expect(response.statusCode).toBe(401);
  });

  it('responds with id and email', async () => {
    const response = await request(app)
      .get('/api/v1/users/me')
      .set('Accept', 'application/json')
      .set('Cookie', `access_token=${validAccessToken}`)
      .expect('Content-Type', /json/);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('email');
    expect(typeof response.body.id).toBe('number');
    expect(response.body.email).toBe('user@example.com');
  });

  it(`should respond an error if user doesn't exist`, async () => {
    const res = await request(app)
      .get('/api/v1/users/me')
      .set('Accept', 'application/json')
      .set('Cookie', `access_token=${invalidAccessToken}`);
    expect(res.statusCode).toBe(404);
  });
});

describe('PATCH /api/v1/users/updateUser/:id', () => {
  let superUserValidAccessToken =
    process.env.VALID_SUPERUSER_TOKEN_FOR_TESTING!;
  let studentValidAccessToken = process.env.VALID_STUDENT_TOKEN_FOR_TESTING!;
  let userId = +process.env.USER_ID_TO_DELETE_TESTING!;

  it('should response with error when not authorized', async () => {
    const res = await request(app)
      .patch(`/api/v1/users/updateUser/${userId}`)
      .set('Accept', 'application/json')
      .set('Cookie', `access_token=${studentValidAccessToken}`)
      .send({
        firstName: 'Mark',
        lastName: 'Kowalski',
        password: 'NewPassword123!x',
        role: EnumRole.LECTURER,
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe('Forbidden.');
  });

  it(`should response with error when user doesn't exist`, async () => {
    const res = await request(app)
      .patch(`/api/v1/users/updateUser/9999`)
      .set('Accept', 'application/json')
      .set('Cookie', `access_token=${superUserValidAccessToken}`)
      .send({
        firstName: 'Mark',
        lastName: 'Kowalski',
        password: 'NewPassword123!x',
        role: EnumRole.LECTURER,
      });
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe(`User with given id doesn't exists.`);
  });

  it('should update user successfully', async () => {
    const res = await request(app)
      .patch(`/api/v1/users/updateUser/${userId}`)
      .set('Accept', 'application/json')
      .set('Cookie', `access_token=${superUserValidAccessToken}`)
      .send({
        firstName: 'Mark',
        lastName: 'Kowalski',
        password: 'NewPassword123!x',
        role: EnumRole.LECTURER,
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain(`was updated successfully.`);
  });

  it('should update user successfully without password', async () => {
    const res = await request(app)
      .patch(`/api/v1/users/updateUser/${userId}`)
      .set('Accept', 'application/json')
      .set('Cookie', `access_token=${superUserValidAccessToken}`)
      .send({
        lastName: 'Nowak',
        role: EnumRole.LECTURER,
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain(`was updated successfully.`);
  });
});

describe('DELETE /api/v1/users/deleteUser/:id', () => {
  let userId = +process.env.USER_ID_TO_DELETE_TESTING!;
  let validAccessToken = process.env.VALID_ACCESS_TOKEN_FOR_TESTING!;
  it('should delete user successfully', async () => {
    const res = await request(app)
      .delete(`/api/v1/users/deleteUser/${userId}`)
      .set('Cookie', `access_token=${validAccessToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('deleted successfully.');
  });

  it(`should respond an error if user doesn't exist`, async () => {
    const res = await request(app)
      .delete(`/api/v1/users/deleteUser/999`)
      .set('Cookie', `access_token=${validAccessToken}`);
    expect(res.statusCode).toBe(404);
  });
});
