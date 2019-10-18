const request = require('supertest');

const server = require('../api/server');

describe('GET /api/jokes', () => {
  // should require authorization
  it('should require authorization', () => {
    return request(server)
      .get('/api/jokes')
      .then(res => {
        expect(res.status).toBe(401);
      });
  });

  it('should return 200 when authorized', async () => {
    var auth = await request(server)
      .post('/api/auth/login')
      .send({ username: 'Test', password: 'pass' });

    expect(auth.status).toBe(200);

    const jokes = await request(server)
      .get('/api/jokes')
      .set('authorization', auth.body.token);

    expect(jokes.status).toBe(200);
    expect(jokes.type).toMatch(/json/i);
  });
});

// function loginUser(auth) {
//   return function(done) {
//     request(server)
//       .post('/api/auth/login')
//       .send({ username: 'Test', password: 'pass' })
//       .expect(200)
//       .end(onResponse);

//     function onResponse(err, res) {
//       auth.token = res.body.token;
//       return done();
//     }
//   };
// }
