import supertest from 'supertest';
import { connect, disconect, cleanup } from './db';
import app from './app';

describe('app', () => {
  beforeAll(async () => {
    await connect();
  });

  beforeEach(async () => {
    await cleanup();
  });

  afterAll(async () => {
    await disconect();
  });

  it('should app', () => {
    expect(true).toBeTruthy();
  });

  it('Should GET /docs with success code', async () => {
    const res = await supertest(app).get('/docs');
    expect(res.statusCode).toBe(301);
  });
});
