import supertest from 'supertest';
import { connect, disconect, cleanup } from '../db';
import app from '../app';
import UserModel from '../models/User.model';

describe('app', () => {
  beforeAll(async () => {
    await connect();
  });

  beforeEach(async () => {
    await cleanup();
  });

  afterAll(async () => {
    await cleanup();
    await disconect();
  });

  it('should create a user correctly', async () => {
    const user = {
      name: 'John Doe',
      email: 'jhondoe@email.com',
      password: 'Clave123*',
    };

    const res = await supertest(app).post('/auth/local/signup').send(user);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.token).toMatch(
      /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
    );
  });

  it('should not create user when email already exists', async () => {
    const user = {
      name: 'John Doe',
      email: 'jhondoe@email.com',
      password: 'Clave123*',
    };

    await supertest(app).post('/auth/local/signup').send(user);
    const res = await supertest(app).post('/auth/local/signup').send(user);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('ok', false);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toMatch(
      /Ya existe un usuario registrado con ese correo/
    );
  });

  it('should not not create user with insecure password', async () => {
    const user = {
      name: 'John Doe',
      email: 'jhondoe@email.com',
      password: '1234',
    };

    const res = await supertest(app).post('/auth/local/signup').send(user);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('ok', false);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toMatch(/La contraseña no es segura/);
  });

  it('should signin user correctly', async () => {
    const user = {
      name: 'John Doe',
      email: 'jhondoe@email.com',
      password: 'Clave123*',
    };

    await UserModel.create(user);

    const res = await supertest(app).post('/auth/local/login').send(user);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.token).toMatch(
      /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
    );
  });

  it('should not sigin if incorrect password', async () => {
    const user = {
      name: 'John Doe',
      email: 'jhondoe@email.com',
      password: 'Clave123*',
    };

    await UserModel.create(user);

    const res = await supertest(app)
      .post('/auth/local/login')
      .send({ ...user, password: '1234' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('ok', false);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toMatch(/Correo o contraseña invalido/);
  });
  it('should not signin user if email does not exist', async () => {
    const user = {
      name: 'John Doe',
      email: 'jhondoe@email.com',
      password: 'Clave123*',
    };

    await UserModel.create(user);

    const res = await supertest(app)
      .post('/auth/local/login')
      .send({ ...user, email: 'email falso' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('ok', false);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toMatch(/Correo o contraseña invalido/);
  });
});
