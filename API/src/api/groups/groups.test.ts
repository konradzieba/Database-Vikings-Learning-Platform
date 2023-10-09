import request from 'supertest';
import app from '../../app';
import { globalGroupCredentials } from '../../globalSetup';

describe('POST /api/v1/groups/createGroup', () => {
  let lecturerId = +process.env.LECTURER_ID_FOR_TESTING!;
  let validLecturerToken = process.env.VALID_LECTURER_TOKEN_FOR_TESTING!;
  it('should create a group', async () => {
    const res = await request(app)
      .post('/api/v1/groups/createGroup')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${validLecturerToken}`)
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
      .set('Authorization', `Bearer ${validLecturerToken}`)
      .send({
        name: globalGroupCredentials.name,
      });
    expect(res.statusCode).toBe(400);
  });

  it('should respond an error if name is missing ', async () => {
    const res = await request(app)
      .post('/api/v1/groups/createGroup')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${validLecturerToken}`)
      .send({
        lecturerId: lecturerId,
      });
    expect(res.statusCode).toBe(400);
  });

  it('should respond an error if name is too short', async () => {
    const res = await request(app)
      .post('/api/v1/groups/createGroup')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${validLecturerToken}`)
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
      .set('Authorization', `Bearer ${validLecturerToken}`)
      .send({
        name: `${globalGroupCredentials.name}${globalGroupCredentials.name}${globalGroupCredentials.name}${globalGroupCredentials.name}`,
        lecturerId: lecturerId,
      });
    expect(res.statusCode).toBe(400);
  });

  it('should respond an error if group already exists', async () => {
    const res = await request(app)
      .post('/api/v1/groups/createGroup')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${validLecturerToken}`)
      .send({
        name: 'Test Group 2',
        lecturerId: lecturerId,
      });
    expect(res.statusCode).toBe(400);
  });
});

describe('DELETE /api/v1/groups/deleteGroup/:id', () => {
  let validLecturerToken = process.env.VALID_LECTURER_TOKEN_FOR_TESTING!;
  let groupId = +process.env.GROUP_ID_TO_DELETE_TESTING!;
  it('should delete group successfully', async () => {
    const res = await request(app)
      .delete(`/api/v1/groups/deleteGroup/${groupId}`)
      .set('Authorization', `Bearer ${validLecturerToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('deleted successfully.');
  });

  it(`should respond an error if group doesn't exist`, async () => {
    const res = await request(app)
      .delete(`/api/v1/groups/deleteGroup/9999`)
      .set('Authorization', `Bearer ${validLecturerToken}`);
    expect(res.statusCode).toBe(404);
  });
});

describe('PATCH /api/v1/groups/renameGroup/:id', () => {
  let validLecturerToken = process.env.VALID_LECTURER_TOKEN_FOR_TESTING!;
  let groupId = +process.env.GROUP_ID_FOR_TESTING!;
  it('should update group name successfully', async () => {
    const res = await request(app)
      .patch(`/api/v1/groups/renameGroup/${groupId}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${validLecturerToken}`)
      .send({
        name: 'Test PATCH name',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('updated successfully.');
  });

  it(`should respond an error if group doesn't exist`, async () => {
    const res = await request(app)
      .patch(`/api/v1/groups/renameGroup/9999`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${validLecturerToken}`)
      .send({
        name: 'Test PATCH name',
      });
    expect(res.statusCode).toBe(404);
  });

  it(`should respond an error if new groupname is not passed in request body`, async () => {
    const res = await request(app)
      .patch(`/api/v1/groups/renameGroup/${groupId}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${validLecturerToken}`);

    expect(res.statusCode).toBe(400);
  });
});
