import request from 'supertest';
import app from '../../app';

describe('POST /api/v1/lessons/createLesson', () => {
  let groupId = +process.env.GROUP_ID_FOR_TESTING!;
  it('should create a lesson without photo parameter', async () => {
    const res = await request(app)
      .post('/api/v1/lessons/createLesson')
      .set('Accept', 'application/json')
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
      .send({
        groupId: groupId,
      });
    expect(res.statusCode).toBe(400);
  });
  it('should respond an error if groupId is missing', async () => {
    const res = await request(app)
      .post('/api/v1/lessons/createLesson')
      .set('Accept', 'application/json')
      .send({
        number: 13,
      });
    expect(res.statusCode).toBe(400);
  });
});

describe('DELETE /api/v1/lessons/deleteLesson/:id', () => {
  let lessonId = +process.env.LESSON_ID_TO_DELETE_TESTING!;
  it('should delete lesson successfully', async () => {
    const res = await request(app).delete(
      `/api/v1/lessons/deleteLesson/${lessonId}`
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('deleted successfully.');
  });

  it(`should respond an error if lesson doesn't exist`, async () => {
    const res = await request(app).delete(`/api/v1/lessons/deleteLesson/9999`);
    expect(res.statusCode).toBe(404);
  });
});
