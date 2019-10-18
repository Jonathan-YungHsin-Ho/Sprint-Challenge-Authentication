const request = require('supertest');

const server = require('../api/server');
const db = require('../database/dbConfig');

describe('POST /api/auth/register', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });

  it('should return 201 when registered', async () => {
    const auth = await request(server)
      .post('/api/auth/register')
      .send({
        username: 'Test',
        password: 'pass',
      });

    expect(auth.status).toBe(201);
  });

  it('should return json when registered', async () => {
    const auth = await request(server)
      .post('/api/auth/register')
      .send({
        username: 'Test',
        password: 'pass',
      });

    expect(auth.type).toMatch(/json/i);
  });
});

describe('POST /api/auth/login', () => {
  it('should return 200 when logged in', async () => {
    await request(server)
      .post('/api/auth/register')
      .send({
        username: 'Test',
        password: 'pass',
      });

    const auth = await request(server)
      .post('/api/auth/login')
      .send({
        username: 'Test',
        password: 'pass',
      });

    expect(auth.status).toBe(200);
  });

  it('should return json when logged in', async () => {
    await request(server)
      .post('/api/auth/register')
      .send({
        username: 'Test',
        password: 'pass',
      });

    const auth = await request(server)
      .post('/api/auth/login')
      .send({
        username: 'Test',
        password: 'pass',
      });

    expect(auth.type).toMatch(/json/i);
  });
});
