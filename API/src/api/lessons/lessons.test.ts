import request from 'supertest';
import app from '../../app';

describe('POST /api/v1/lessons/createLesson', () => {
  let validLecturerToken = process.env.VALID_LECTURER_TOKEN_FOR_TESTING!;
  let groupId = +process.env.GROUP_ID_FOR_TESTING!;
  it('should create a lesson without photo parameter', async () => {
    const res = await request(app)
      .post('/api/v1/lessons/createLesson')
      .set('Accept', 'application/json')
      .set('Cookie', `access_token=${validLecturerToken}`)
      .send({
        number: 11,
        groupId: groupId,
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe(
      `Lesson 11 for groupId ${groupId} created successfully.`
    );
  });
  it('should create a lesson with photo parameter', async () => {
    const res = await request(app)
      .post('/api/v1/lessons/createLesson')
      .set('Accept', 'application/json')
      .set('Cookie', `access_token=${validLecturerToken}`)
      .send({
        number: 12,
        photo: 'example photo url',
        groupId: groupId,
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe(
      `Lesson 12 for groupId ${groupId} created successfully.`
    );
  });
  it('should respond an error if number is missing', async () => {
    const res = await request(app)
      .post('/api/v1/lessons/createLesson')
      .set('Accept', 'application/json')
      .set('Cookie', `access_token=${validLecturerToken}`)
      .send({
        groupId: groupId,
      });
    expect(res.statusCode).toBe(400);
  });
  it('should respond an error if groupId is missing', async () => {
    const res = await request(app)
      .post('/api/v1/lessons/createLesson')
      .set('Accept', 'application/json')
      .set('Cookie', `access_token=${validLecturerToken}`)
      .send({
        number: 13,
      });
    expect(res.statusCode).toBe(400);
  });
});

describe('PATCH /api/v1/lessons/updateLesson/:id', () => {
  let validLecturerToken = process.env.VALID_LECTURER_TOKEN_FOR_TESTING!;
  let lessonId = +process.env.LESSON_ID_FOR_TESTING!;
  it('should update lesson with number and image successfully', async () => {
    const res = await request(app)
      .patch(`/api/v1/lessons/updateLesson/${lessonId}`)
      .set('Accept', 'application/json')
      .set('Cookie', `access_token=${validLecturerToken}`)
      .send({
        number: 113,
        image: 'viking.png',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('updated successfully.');
  });

  it('should update lesson with number successfully', async () => {
    const res = await request(app)
      .patch(`/api/v1/lessons/updateLesson/${lessonId}`)
      .set('Accept', 'application/json')
      .set('Cookie', `access_token=${validLecturerToken}`)
      .send({
        number: 133,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('updated successfully.');
  });

  it('should update lesson with image successfully', async () => {
    const res = await request(app)
      .patch(`/api/v1/lessons/updateLesson/${lessonId}`)
      .set('Accept', 'application/json')
      .set('Cookie', `access_token=${validLecturerToken}`)
      .send({
        image: 'viking.png',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('updated successfully.');
  });

  it(`should respond an error if lesson doesn't exist`, async () => {
    const res = await request(app)
      .patch(`/api/v1/lessons/updateLesson/999`)
      .set('Accept', 'application/json')
      .set('Cookie', `access_token=${validLecturerToken}`)
      .send({
        image: 'viking.png',
      });

    expect(res.statusCode).toBe(404);
  });
});

describe('DELETE /api/v1/lessons/deleteLesson/:id', () => {
  let validLecturerToken = process.env.VALID_LECTURER_TOKEN_FOR_TESTING!;
  let lessonId = +process.env.LESSON_ID_TO_DELETE_TESTING!;
  it('should delete lesson successfully', async () => {
    const res = await request(app)
      .delete(`/api/v1/lessons/deleteLesson/${lessonId}`)
      .set('Cookie', `access_token=${validLecturerToken}`)
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('deleted successfully.');
  });

  it(`should respond an error if lesson doesn't exist`, async () => {
    const res = await request(app)
      .delete(`/api/v1/lessons/deleteLesson/9999`)
      .set('Cookie', `access_token=${validLecturerToken}`)
    expect(res.statusCode).toBe(404);
  });
  it('should handle errors with catch(next())', async () => {
    const payload = {
      number: 1,
      image: 'example_photo.png',
      groupId: 9999,
    };

    const res = await request(app)
      .post('/api/v1/lessons/createLesson')
      .set('Accept', 'application/json')
      .set('Cookie', `access_token=${validLecturerToken}`)
      .send(payload);

    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('stack');
    expect(res.body.stack).toContain(
      `An operation failed because it depends on one or more records that were required but not found. No 'Group' record(s) (needed to inline the relation on 'Lesson' record(s)) was found for a nested connect on one-to-many relation 'GroupToLesson'.`
    );
  });
});
