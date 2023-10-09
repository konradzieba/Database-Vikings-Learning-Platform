import request from 'supertest';
import app from '../../app';
import dayjs from 'dayjs';

describe('POST /api/v1/answers/createAnswer', () => {
  let taskId = +process.env.TASK_ID_FOR_TESTING!;
  let studentId = +process.env.STUDENT_ID_FOR_TESTING!;
  let validStudentToken = process.env.VALID_STUDENT_TOKEN_FOR_TESTING!;

  it('should create an answer', async () => {
    const res = await request(app)
      .post('/api/v1/answers/createAnswer')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${validStudentToken}`)
      .send({
        solution: 'SELECT * FROM test;',
        taskId: taskId,
        studentId: studentId,
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('successfully.');
  });

  it('should respond an error if solution already exists', async () => {
    const res = await request(app)
      .post('/api/v1/answers/createAnswer')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${validStudentToken}`)
      .send({
        solution: 'SELECT * FROM test;',
        taskId: taskId,
        studentId: studentId,
      });
    expect(res.statusCode).toBe(400);
  });

  it('should respond an error if solution is missing', async () => {
    const res = await request(app)
      .post('/api/v1/answers/createAnswer')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${validStudentToken}`)
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
      .set('Authorization', `Bearer ${validStudentToken}`)
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
      .set('Authorization', `Bearer ${validStudentToken}`)
      .send({
        solution: 'SELECT * FROM test;',
        taskId: taskId,
      });
    expect(res.statusCode).toBe(400);
  });
});

describe('PATCH /api/v1/answers/answerReply/:id', () => {
  let answerId = +process.env.ANSWER_ID_FOR_UPDATE_TESTING!;
  let validLecturerToken = process.env.VALID_LECTURER_TOKEN_FOR_TESTING!;
  it('should patch an answer', async () => {
    const res = await request(app)
      .patch(`/api/v1/answers/answerReply/${answerId}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${validLecturerToken}`)
      .send({
        replyStatus: 'CORRECT',
        replyDate: dayjs().add(7, 'day').toDate(),
        replyDesc: 'Excellent work!',
        grantedScore: 70,
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain(
      'was updated with CORRECT and score: 70 successfully.'
    );
  });

  it('should patch an answer without replyDesc', async () => {
    const res = await request(app)
      .patch(`/api/v1/answers/answerReply/${answerId}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${validLecturerToken}`)
      .send({
        replyStatus: 'INCORRECT',
        replyDate: dayjs().add(7, 'day').toDate(),
        grantedScore: 70,
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain(
      'was updated with INCORRECT and score: 70 successfully.'
    );
  });

  it('should respond an error if replyStatus is PENDING', async () => {
    const res = await request(app)
      .patch(`/api/v1/answers/answerReply/${answerId}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${validLecturerToken}`)
      .send({
        replyStatus: 'PENDING',
        replyDate: dayjs().add(7, 'day').toDate(),
        replyDesc: 'Excellent work!',
        grantedScore: 100,
      });
    expect(res.statusCode).toBe(400);
  });

  it('should respond an error if replyStatus is not enum value', async () => {
    const res = await request(app)
      .patch(`/api/v1/answers/answerReply/${answerId}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${validLecturerToken}`)
      .send({
        replyStatus: 'WAITING',
        replyDate: dayjs().add(7, 'day').toDate(),
        replyDesc: 'Excellent work!',
        grantedScore: 100,
      });
    expect(res.statusCode).toBe(400);
  });

  it('should respond an error if replyStatus is empty', async () => {
    const res = await request(app)
      .patch(`/api/v1/answers/answerReply/${answerId}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${validLecturerToken}`)
      .send({
        replyDate: dayjs().add(7, 'day').toDate(),
        replyDesc: 'Excellent work!',
        grantedScore: 100,
      });
    expect(res.statusCode).toBe(400);
  });

  it('should respond an error if replyDate is empty', async () => {
    const res = await request(app)
      .patch(`/api/v1/answers/answerReply/${answerId}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${validLecturerToken}`)
      .send({
        replyStatus: 'INCORRECT',
        replyDesc: 'Excellent work!',
        grantedScore: 100,
      });
    expect(res.statusCode).toBe(400);
  });

  it('should respond an error if grantedScore is empty', async () => {
    const res = await request(app)
      .patch(`/api/v1/answers/answerReply/${answerId}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${validLecturerToken}`)
      .send({
        replyStatus: 'INCORRECT',
        replyDate: dayjs().add(7, 'day').toDate(),
        replyDesc: 'Excellent work!',
      });
    expect(res.statusCode).toBe(400);
  });

  it(`should respond an error if answerId doesn't exist`, async () => {
    const res = await request(app)
      .patch(`/api/v1/answers/answerReply/9999`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${validLecturerToken}`)
      .send({
        replyStatus: 'INCORRECT',
        replyDate: dayjs().add(7, 'day').toDate(),
        replyDesc: 'Excellent work!',
        grantedScore: 100,
      });
    expect(res.statusCode).toBe(404);
  });
});

describe('PATCH /api/v1/answers/updateAnswer/:id', () => {
  let answerId = +process.env.ANSWER_ID_FOR_UPDATE_TESTING!;
  let validLecturerToken = process.env.VALID_LECTURER_TOKEN_FOR_TESTING!;

  it('should patch an answer with replyDesc and grantedScore', async () => {
    const res = await request(app)
      .patch(`/api/v1/answers/updateAnswer/${answerId}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${validLecturerToken}`)
      .send({
        replyDesc: 'Great work!',
        grantedScore: 45,
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('was updated successfully.');
  });

  it('should patch an answer with replyDesc', async () => {
    const res = await request(app)
      .patch(`/api/v1/answers/updateAnswer/${answerId}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${validLecturerToken}`)
      .send({
        replyDesc: 'Great work!',
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('was updated successfully.');
  });

  it('should patch an answer with grantedScore', async () => {
    const res = await request(app)
      .patch(`/api/v1/answers/updateAnswer/${answerId}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${validLecturerToken}`)
      .send({
        grantedScore: 45,
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('was updated successfully.');
  });

  it(`should respond an error if answerId doesn't exist`, async () => {
    const res = await request(app)
      .patch(`/api/v1/answers/updateAnswer/9999`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${validLecturerToken}`)
      .send({
        replyDesc: 'Great work!',
        grantedScore: 45,
      });
    expect(res.statusCode).toBe(404);
  });
});
