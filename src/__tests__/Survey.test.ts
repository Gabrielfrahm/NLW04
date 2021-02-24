import request from 'supertest';
import app from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm/database';

describe('Surveys', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it('Should be able to create a new survey', async () => {
    const response = await request(app).post('/surveys').send({
      title: 'title survey',
      description: 'survey example',
    });

    expect(response.status).toBe(201);
  });

  it('Should not be able to create a new survey with existis name', async () => {
    const response = await request(app).post('/surveys').send({
      title: 'title survey',
      description: 'survey example',
    });

    expect(response.status).toBe(400);
  });

  it('Should be able to get all surveys', async () => {
    await request(app).post('/surveys').send({
      title: 'title survey2',
      description: 'survey example2',
    });

    const response = await request(app).get('/surveys');

    expect(response.body.length).toBe(2);
  });
});
