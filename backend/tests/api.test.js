const request = require('supertest');
const app = require('../app');

describe('Sweet Management API - Integration Tests', () => {
  let adminToken;
  let userToken;
  let createdSweetId;

  test('GET /api/health should return 200', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });

  test('POST /api/auth/login (admin) should return token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@sweetshop.com', password: 'admin123' });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    adminToken = res.body.token;
  });

  test('POST /api/auth/login (user) should return token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'user@sweetshop.com', password: 'user123' });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    userToken = res.body.token;
  });

  test('GET /api/sweets should return array', async () => {
    const res = await request(app).get('/api/sweets');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/sweets should allow admin to create a sweet', async () => {
    const res = await request(app)
      .post('/api/sweets')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Test Sweet', category: 'Test', price: 1.5, quantity: 10 });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    createdSweetId = res.body.id;
  });

  test('POST /api/sweets/:id/restock should allow admin to restock', async () => {
    const res = await request(app)
      .post('/api/sweets/3/restock')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ amount: 5 });

    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBeGreaterThanOrEqual(5);
  });

  test('POST /api/sweets/:id/purchase should allow authenticated user to purchase', async () => {
    const res = await request(app)
      .post('/api/sweets/3/purchase')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('quantity');
  });

  test('DELETE /api/sweets/:id should allow admin to delete a sweet', async () => {
    const res = await request(app)
      .delete(`/api/sweets/${createdSweetId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(204);
  });

  test('GET /api/sweets/search should return filtered results', async () => {
    const res = await request(app).get('/api/sweets/search').query({ query: 'Chocolate' });
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/auth/register should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: `testuser_${Date.now()}@example.com`, password: 'pass1234' });

    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
  });
});
