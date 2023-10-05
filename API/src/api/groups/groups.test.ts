import request from 'supertest';
import app from '../../app';
import { globalGroupCredentials } from '../../globalSetup';

describe('POST /api/v1/groups/createGroup', () => {
  let lecturerId = +process.env.LECTURER_ID_FOR_TESTING!;
  it('should create a group', async () => {
    const res = await request(app)
      .post('/api/v1/groups/createGroup')
      .set('Accept', 'application/json')
      .send({
        name: globalGroupCredentials.name,
        lecturerId: lecturerId,
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Group Test Group created successfully.');
  });
  it('should respond an error if lecturerId is missing ', async () => {
    const res = await request(app)
      .post('/api/v1/groups/createGroup')
      .set('Accept', 'application/json')
      .send({
        name: globalGroupCredentials.name,
      });
    expect(res.statusCode).toBe(400);
  });
  it('should respond an error if name is missing ', async () => {
    const res = await request(app)
      .post('/api/v1/groups/createGroup')
      .set('Accept', 'application/json')
      .send({
        lecturerId: lecturerId,
      });
    expect(res.statusCode).toBe(400);
  });
  it('should respond an error if name is too short', async () => {
    const res = await request(app)
      .post('/api/v1/groups/createGroup')
      .set('Accept', 'application/json')
      .send({
        name: globalGroupCredentials.name.substring(0, 2),
        lecturerId: lecturerId,
      });
    expect(res.statusCode).toBe(400);
  });
  it('should respond an error if name is too long', async () => {
    const res = await request(app)
      .post('/api/v1/groups/createGroup')
      .set('Accept', 'application/json')
      .send({
        name: `${globalGroupCredentials.name}${globalGroupCredentials.name}${globalGroupCredentials.name}${globalGroupCredentials.name}`,
        lecturerId: lecturerId,
      });
    expect(res.statusCode).toBe(400);
  });
});
