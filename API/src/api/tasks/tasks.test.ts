import request from 'supertest';
import app from '../../app';
import dayjs from 'dayjs';

describe('POST /api/v1/tasks/createTask', () => {
  let lessonId = +process.env.LESSON_ID_FOR_TESTING!;
  it('should create a task for lesson', async () => {
    const res = await request(app)
      .post('/api/v1/tasks/createTask')
      .set('Accept', 'application/json')
      .send({
        number: 5,
        question: 'Is kot pies?',
        closeDate: dayjs().add(7, 'day').toDate(),
        isExtra: false,
        lessonId: lessonId,
      });
    expect(res.statusCode).toBe(200);
  });

  it('should respond an error if number is missing', async () => {
    const res = await request(app)
      .post('/api/v1/tasks/createTask')
      .set('Accept', 'application/json')
      .send({
        question: 'Is kot pies?',
        closeDate: dayjs().add(7, 'day').toDate(),
        isExtra: false,
        lessonId: lessonId,
      });
    expect(res.statusCode).toBe(400);
  });

  it('should respond an error if question is missing', async () => {
    const res = await request(app)
      .post('/api/v1/tasks/createTask')
      .set('Accept', 'application/json')
      .send({
        number: 5,
        closeDate: dayjs().add(7, 'day').toDate(),
        isExtra: false,
        lessonId: lessonId,
      });
    expect(res.statusCode).toBe(400);
  });

  it('should respond an error if closeDate is missing', async () => {
    const res = await request(app)
      .post('/api/v1/tasks/createTask')
      .set('Accept', 'application/json')
      .send({
        number: 5,
        question: 'Is kot pies?',
        isExtra: false,
        lessonId: lessonId,
      });
    expect(res.statusCode).toBe(400);
  });

  it('should respond an error if isExtra is missing', async () => {
    const res = await request(app)
      .post('/api/v1/tasks/createTask')
      .set('Accept', 'application/json')
      .send({
        number: 5,
        question: 'Is kot pies?',
        closeDate: dayjs().add(7, 'day').toDate(),
        lessonId: lessonId,
      });
    expect(res.statusCode).toBe(400);
  });

  it('should respond an error if lessonId is missing', async () => {
    const res = await request(app)
      .post('/api/v1/tasks/createTask')
      .set('Accept', 'application/json')
      .send({
        number: 5,
        question: 'Is kot pies?',
        closeDate: dayjs().add(7, 'day').toDate(),
        isExtra: false,
      });
    expect(res.statusCode).toBe(400);
  });

  it('should respond an error if closeDate is before today', async () => {
    const res = await request(app)
      .post('/api/v1/tasks/createTask')
      .set('Accept', 'application/json')
      .send({
        number: 5,
        question: 'Is kot pies?',
        closeDate: dayjs().subtract(7, 'day').toDate(),
        isExtra: false,
        lessonId: lessonId,
      });
    expect(res.statusCode).toBe(400);
  });

  it('should handle errors with catch(next())', async () => {
    const payload = {
      number: 5,
      question: 'Get all data from Users table',
      closeDate: dayjs().add(7, 'day').toDate(),
      isExtra: false,
      lessonId: 9999, // invalid lessonId
    };

    const res = await request(app)
      .post('/api/v1/tasks/createTask')
      .set('Accept', 'application/json')
      .send(payload);

    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('stack');
    expect(res.body.stack).toContain(
      `An operation failed because it depends on one or more records that were required but not found. No 'Lesson' record(s) (needed to inline the relation on 'Task' record(s)) was found for a nested connect on one-to-many relation 'LessonToTask'.`
    );
  });
});

describe('DELETE /api/v1/tasks/deleteTask/:id', () => {
  let taskId = +process.env.TASK_ID_TO_DELETE_TESTING!;
  it('should delete task successfully', async () => {
    const res = await request(app).delete(`/api/v1/tasks/deleteTask/${taskId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('deleted successfully.');
  });
  it(`should respond an error if task doesn't exist`, async () => {
    const res = await request(app).delete(`/api/v1/tasks/deleteTask/999`);
    expect(res.statusCode).toBe(404);
  });
});
