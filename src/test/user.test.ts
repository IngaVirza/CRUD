import request from 'supertest';
import { server } from '../index';

let testServer: any;
let userId: string;

beforeAll((done) => {
  testServer = server.listen(0, () => {
    done();
  });
});

afterAll((done) => {
  testServer.close(done);
});

describe('User API', () => {
  it('GET /api/users should return an empty array initially', async () => {
    const res = await request(testServer).get('/api/users');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /api/users should create a new user', async () => {
    const res = await request(testServer)
      .post('/api/users')
      .send({ username: 'JohnDoe', age: 30, hobbies: ['reading'] });

    expect(res.status).toBe(201);
    expect(res.body.username).toBe('JohnDoe');
    userId = res.body.id;
  });

  it('GET /api/users/:id should return the created user', async () => {
    const res = await request(testServer).get(`/api/users/${userId}`);
    expect(res.status).toBe(200);
    expect(res.body.username).toBe('JohnDoe');
  });

  it('PUT /api/users/:id should update the user', async () => {
    const res = await request(testServer)
      .put(`/api/users/${userId}`)
      .send({ username: 'JohnUpdated', age: 35, hobbies: ['coding'] });

    expect(res.status).toBe(200);
    expect(res.body.username).toBe('JohnUpdated');
    expect(res.body.age).toBe(35);
  });
});
