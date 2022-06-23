import supertest, { Response } from 'supertest';
import { connect, disconect, cleanup } from '../db';
import app from '../app';
import UserModel from '../models/User.model';
import createToken from '../utils/createToken';
import FavListModel from '../models/FavList.model';

let authHeader: string = 'Bearer';

describe('app', () => {
  beforeAll(async () => {
    await connect();
  });

  beforeEach(async () => {
    await cleanup();

    // create new user
    const user = await UserModel.create({
      name: 'John Doe',
      email: 'jhondoe@email.com',
      password: 'Clave123*',
    });

    // create a valid token
    const token = createToken(user.id);
    authHeader = `Bearer ${token}`;
  });

  afterAll(async () => {
    await disconect();
  });

  it('should routes are protected', async () => {
    const server = supertest(app);
    const responses: Response[] = [];

    responses.push(await server.get('/api/favs'));
    responses.push(await server.post('/api/favs'));
    responses.push(await server.delete('/api/favs/62b249acea3ba9d820a73764'));

    responses.forEach((res) => {
      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('ok', false);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toMatch(/Su sesión expiró/);
    });
  });

  it('should get all favs', async () => {
    const res = await supertest(app)
      .get('/api/favs')
      .set('Authorization', authHeader);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('favList');
    expect(res.body.favList).toBeInstanceOf(Array);
  });

  it('should not delete fav list if user is not the owner', async () => {
    // create new user
    const user = await UserModel.create({
      name: 'John Doe Fake',
      email: 'jhondoe@fake.com',
      password: 'Clave123*',
    });

    // create new fav list
    const favList = await FavListModel.create({
      user: user.id,
      name: 'Favorite list of other user',
    });

    const res = await supertest(app)
      .delete(`/api/favs/${favList.id}`)
      .set('Authorization', authHeader);

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('ok', false);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toMatch(/No se encontró la lista a eliminar./);
  });
});
