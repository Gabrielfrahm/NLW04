import request from 'supertest';
import app from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm/database';
import { getConnection } from 'typeorm';

describe('NPS', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to create a new nps', async () => {
    const response = await request(app).get('/nps/:survey_id').send({
      survey_id: 'survey example',
    });

    expect(response.status).toBe(201);
  });
});
