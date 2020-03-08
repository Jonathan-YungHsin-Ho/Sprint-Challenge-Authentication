const request = require('supertest');

const server = require('../api/server');
const db = require('../database/dbConfig');

describe('GET /api/jokes', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });

  it('should require authorization', () => {
    return request(server)
      .get('/api/jokes')
      .then(res => {
        expect(res.status).toBe(401);
      });
  });

  it('should return 200 when authorized', async () => {
    const auth = await request(server)
      .post('/api/auth/register')
      .send({ username: 'Test', password: 'pass' });

    expect(auth.status).toBe(201);

    const jokes = await request(server)
      .get('/api/jokes')
      .set('authorization', auth.body.token);

    expect(jokes.status).toBe(200);
    expect(jokes.type).toMatch(/json/i);
  });
});
