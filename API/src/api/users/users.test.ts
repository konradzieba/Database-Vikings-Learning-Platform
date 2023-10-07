import request from 'supertest';
import app from '../../app';
import { globalUserCredentials } from '../../globalSetup';

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
      .set('Authorization', `Bearer ${validAccessToken}`)
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
      .set('Authorization', `Bearer ${invalidAccessToken}`);
    expect(res.statusCode).toBe(404);
  });
});

describe('DELETE /api/v1/users/deleteUser/:id', () => {
  let userId = +process.env.USER_ID_TO_DELETE_TESTING!;
  it('should delete user successfully', async () => {
    const res = await request(app).delete(`/api/v1/users/deleteUser/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('deleted successfully.');
  });

  it(`should respond an error if user doesn't exist`, async () => {
    const res = await request(app).delete(`/api/v1/users/deleteUser/999`);
    expect(res.statusCode).toBe(404);
  });
});
