import request from 'supertest';
import app from '../../app';

describe('POST /api/v1/answers/createAnswer', () => {
  let taskId = +process.env.TASK_ID_FOR_TESTING!;
  let studentId = +process.env.STUDENT_ID_FOR_TESTING!;

  it('should create an answer', async () => {
    const res = await request(app)
      .post('/api/v1/answers/createAnswer')
      .set('Accept', 'application/json')
      .send({
        solution: 'SELECT * FROM test;',
        taskId: taskId,
        studentId: studentId,
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('successfully.')
  });

  it('should respond an error if solution is missing', async () => {
    const res = await request(app)
      .post('/api/v1/answers/createAnswer')
      .set('Accept', 'application/json')
      .send({
        taskId: taskId,
        studentId: studentId,
      });
    expect(res.statusCode).toBe(400);
  });

  it('should respond an error if taskId is missing', async () => {
    const res = await request(app)
      .post('/api/v1/answers/createAnswer')
      .set('Accept', 'application/json')
      .send({
        solution: 'SELECT * FROM test;',
        studentId: studentId,
      });
    expect(res.statusCode).toBe(400);
  });

  it('should respond an error if studentId is missing', async () => {
    const res = await request(app)
      .post('/api/v1/answers/createAnswer')
      .set('Accept', 'application/json')
      .send({
        solution: 'SELECT * FROM test;',
        taskId: taskId,
      });
    expect(res.statusCode).toBe(400);
  });
});
