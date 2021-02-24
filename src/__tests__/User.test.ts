import request from 'supertest';
import app from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm/database';

describe('Users', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it('Should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      email: 'User@example.com',
      name: 'User example',
    });

    expect(response.status).toBe(201);
  });

  it('Should not be able to create a new user with existis email', async () => {
    const response = await request(app).post('/users').send({
      email: 'User@example.com',
      name: 'User example',
    });

    expect(response.status).toBe(400);
  });
});
